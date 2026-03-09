import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// TypeScript declarations for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: any) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface VoiceInputButtonProps {
  lang?: 'en' | 'zh' | 'zh-TW'
}

export default function VoiceInputButton({ lang = 'en' }: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const positionRef = useRef<{ x: number; y: number } | null>(null)

  // Check if Web Speech API is supported
  useEffect(() => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    
    setIsSupported(!!SpeechRecognition)
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (!isSupported) return

    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    
    // Configure recognition
    recognition.continuous = false
    recognition.interimResults = false
    
    // Set language based on current lang
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'zh': 'zh-CN',
      'zh-TW': 'zh-TW'
    }
    recognition.lang = langMap[lang] || 'en-US'

    // Handle results
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      if (transcript) {
        insertTextIntoElfsightInput(transcript)
      }
      setIsListening(false)
    }

    // Handle errors
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    // Handle end
    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isSupported, lang])

  // Function to insert text into Elfsight chat input
  const insertTextIntoElfsightInput = (text: string) => {
    // Try multiple selectors to find Elfsight input
    const selectors = [
      '.elfsight-app-7c5e6ac9-b586-4e1f-beb9-3b7a4e89a0bc textarea',
      '.elfsight-app-7c5e6ac9-b586-4e1f-beb9-3b7a4e89a0bc input[type="text"]',
      '.elfsight-app-7c5e6ac9-b586-4e1f-beb9-3b7a4e89a0bc input',
      'textarea[placeholder*="message" i]',
      'textarea[placeholder*="输入" i]',
      'textarea[placeholder*="訊息" i]',
      'textarea'
    ]

    let inputElement: HTMLTextAreaElement | HTMLInputElement | null = null

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector)
      for (const el of Array.from(elements)) {
        const rect = el.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          const isInElfsight = el.closest('.elfsight-app-7c5e6ac9-b586-4e1f-beb9-3b7a4e89a0bc') || 
                              el.closest('[class*="elfsight"]') ||
                              el.closest('[id*="elfsight"]')
          if (isInElfsight || selector.includes('elfsight')) {
            inputElement = el as HTMLTextAreaElement | HTMLInputElement
            break
          }
        }
      }
      if (inputElement) break
    }

    if (inputElement) {
      // Set the value
      inputElement.value = text
      
      // Trigger input event to notify Elfsight
      const inputEvent = new Event('input', { bubbles: true })
      inputElement.dispatchEvent(inputEvent)
      
      // Trigger change event
      const changeEvent = new Event('change', { bubbles: true })
      inputElement.dispatchEvent(changeEvent)
      
      // Focus the input
      inputElement.focus()
      
      return true
    }

    return false
  }

  // Monitor Elfsight chat window position
  useEffect(() => {
    const updatePosition = () => {
      // Try to find Elfsight chat window
      const chatWindow = document.querySelector('.elfsight-app-7c5e6ac9-b586-4e1f-beb9-3b7a4e89a0bc')
      if (chatWindow) {
        const rect = chatWindow.getBoundingClientRect()
        const isVisible = rect.width > 0 && rect.height > 0
        
        if (isVisible) {
          setChatOpen(true)
          // Try to find input area to position button nearby
          const inputArea = chatWindow.querySelector('textarea, input[type="text"]')
          if (inputArea) {
            const inputRect = inputArea.getBoundingClientRect()
            positionRef.current = {
              x: inputRect.right - 50,
              y: inputRect.top + (inputRect.height / 2)
            }
          } else {
            // Fallback: position near chat window
            positionRef.current = {
              x: rect.right - 50,
              y: rect.bottom - 50
            }
          }
        } else {
          setChatOpen(false)
        }
      } else {
        setChatOpen(false)
      }
    }

    // Initial check
    updatePosition()

    // Watch for changes
    const observer = new MutationObserver(updatePosition)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    // Also check on scroll/resize
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const handleToggle = () => {
    if (!isSupported) {
      console.warn('Speech recognition is not supported in your browser')
      return
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
    } else {
      // Start listening
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start()
          setIsListening(true)
        }
      } catch (err) {
        console.error('Failed to start speech recognition:', err)
        setIsListening(false)
      }
    }
  }

  if (!isSupported) {
    return null
  }

  const labels = {
    en: {
      tooltip: 'Voice input',
      listening: 'Listening...'
    },
    zh: {
      tooltip: '语音输入',
      listening: '正在聆听...'
    },
    'zh-TW': {
      tooltip: '語音輸入',
      listening: '正在聆聽...'
    }
  }

  const t = labels[lang]

  // Position button dynamically based on chat window position
  const buttonStyle: React.CSSProperties = chatOpen && positionRef.current
    ? {
        position: 'fixed',
        left: `${positionRef.current.x}px`,
        top: `${positionRef.current.y}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10000
      }
    : {
        position: 'fixed',
        bottom: '90px',
        right: '30px',
        zIndex: 9998
      }

  return (
    <motion.button
      onClick={handleToggle}
      style={buttonStyle}
      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
      title={isListening ? t.listening : t.tooltip}
      aria-label={isListening ? t.listening : t.tooltip}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      layout={false}
    >
      {isListening ? (
        <span className="material-symbols-outlined text-white text-xl">
          mic
        </span>
      ) : (
        <span className="material-symbols-outlined text-white text-xl">
          keyboard_voice
        </span>
      )}
    </motion.button>
  )
}
