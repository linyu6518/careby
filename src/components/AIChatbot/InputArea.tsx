import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useWhisperRecognition } from '../../hooks/useWhisperRecognition'

interface InputAreaProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
  lang?: 'en' | 'zh' | 'zh-TW'
}

export default function InputArea({ 
  onSend, 
  disabled, 
  placeholder = '输入消息...',
  lang = 'en'
}: InputAreaProps) {
  const [input, setInput] = useState('')

  const {
    isListening,
    isProcessing,
    error: speechError,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    reset: resetSpeech
  } = useWhisperRecognition({
    lang,
    onResult: (transcript) => {
      // Append transcript to input immediately when result is received
      if (transcript) {
        setInput(prev => {
          const trimmed = prev.trim()
          return trimmed ? `${trimmed} ${transcript}` : transcript
        })
      }
      resetSpeech()
    },
    onError: (error) => {
      console.error('Speech recognition error:', error)
      // Stop listening on error
      if (isListening) {
        stopListening()
      }
    }
  })

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
      resetSpeech()
      if (isListening) {
        stopListening()
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop recording - it will automatically process and display result
      stopListening()
    } else {
      // Clear input only if empty before starting
      if (!input.trim()) {
        setInput('')
      }
      // Start recording
      startListening()
    }
  }

  const labels = {
    en: {
      send: 'Send message',
      voice: 'Voice input',
      listening: 'Listening...',
      notSupported: 'Voice input not supported',
      stopListening: 'Stop listening'
    },
    zh: {
      send: '发送消息',
      voice: '语音输入',
      listening: '正在聆听...',
      notSupported: '不支持语音输入',
      stopListening: '停止聆听'
    },
    'zh-TW': {
      send: '發送消息',
      voice: '語音輸入',
      listening: '正在聆聽...',
      notSupported: '不支持語音輸入',
      stopListening: '停止聆聽'
    }
  }

  const currentLabels = labels[lang]

  return (
    <div className="border-t border-slate-200 p-4 bg-white">
      {/* Error message */}
      {speechError && (
        <div className="mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs">
          {speechError}
        </div>
      )}
      
      {/* Listening/Processing indicator */}
      {(isListening || isProcessing) && (
        <div className="mb-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            {isListening 
              ? currentLabels.listening
              : lang === 'en'
              ? 'Processing audio...'
              : lang === 'zh'
              ? '正在处理音频...'
              : '正在處理音頻...'
            }
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 relative">
        {/* Voice input button */}
        {isSpeechSupported && (
          <button
            onClick={handleVoiceToggle}
            disabled={disabled}
            className={`
              w-11 h-11 sm:w-10 sm:h-10
              flex-shrink-0
              rounded-lg
              flex items-center justify-center
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
              touch-manipulation
              ${
                isListening
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-600 animate-pulse shadow-lg shadow-yellow-500/50'
                  : 'bg-yellow-400 text-white hover:bg-yellow-500 active:bg-yellow-500 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/50'
              }
            `}
            aria-label={currentLabels.voice}
            title={isListening ? currentLabels.stopListening : currentLabels.voice}
          >
            <span className={`material-symbols-outlined text-xl sm:text-lg ${isListening ? 'animate-pulse' : ''}`}>
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>
        )}
        
        {/* Text input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled || isListening}
          placeholder={placeholder}
          rows={1}
          className="
            flex-1
            px-4 py-3
            border border-slate-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            resize-none
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            text-sm
          "
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
        
        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim() || isListening}
          className="
            w-11 h-11 sm:w-10 sm:h-10
            flex-shrink-0
            rounded-lg
            bg-primary text-white
            hover:bg-primary/90
            active:bg-primary/80
            disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed
            flex items-center justify-center
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          "
          aria-label={currentLabels.send}
        >
          <span className="material-symbols-outlined text-lg">send</span>
        </button>
      </div>
    </div>
  )
}
