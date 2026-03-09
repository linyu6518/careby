import { useState, useRef, useCallback, useEffect } from 'react'

interface UseWhisperRecognitionOptions {
  lang: 'en' | 'zh' | 'zh-TW'
  onResult?: (transcript: string) => void
  onError?: (error: string) => void
}

export function useWhisperRecognition({ lang, onResult, onError }: UseWhisperRecognitionOptions) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  // Check if MediaRecorder is supported
  useEffect(() => {
    const supported = 
      typeof MediaRecorder !== 'undefined' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    
    setIsSupported(!!supported)
  }, [])

  const startListening = useCallback(async () => {
    // Check support again in case it wasn't initialized
    const supported = 
      typeof MediaRecorder !== 'undefined' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia

    if (!supported) {
      setError('Audio recording is not supported in your browser.')
      if (onError) {
        onError('Audio recording is not supported')
      }
      return
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Create MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : 'audio/webm' // fallback

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      })

      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        // Update state immediately
        setIsListening(false)
        setIsProcessing(true)

        // Stop all tracks after a brief delay to ensure recording is complete
        setTimeout(() => {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
          }
        }, 100)

        // Process audio
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
          
          // Convert to base64
          const reader = new FileReader()
          reader.onloadend = async () => {
            const result = reader.result as string
            if (!result) {
              throw new Error('Failed to read audio file')
            }
            // Remove data URL prefix (e.g., "data:audio/webm;base64,")
            const base64Audio = result.includes(',') ? result.split(',')[1] : result

            // Send to backend for transcription
            const langCode: 'en' | 'zh-CN' | 'zh-TW' = lang === 'zh' ? 'zh-CN' : lang === 'zh-TW' ? 'zh-TW' : 'en'
            
            try {
              const response = await fetch('/api/transcribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  audio: base64Audio,
                  lang: langCode
                })
              })

              if (!response.ok) {
                let errorMessage = 'Transcription failed'
                try {
                  const errorData = await response.json()
                  errorMessage = errorData.error || errorData.message || 'Transcription failed'
                } catch (jsonError) {
                  // If response is not JSON, try to get text
                  const errorText = await response.text()
                  errorMessage = errorText || `Server error: ${response.status} ${response.statusText}`
                }
                throw new Error(errorMessage)
              }

              // Parse response JSON
              let data
              try {
                const responseText = await response.text()
                if (!responseText) {
                  throw new Error('Empty response from server')
                }
                data = JSON.parse(responseText)
              } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError)
                throw new Error('Invalid response from server')
              }

              const transcript = data.transcript || ''

              // Always call onResult, even if transcript is empty (to update UI)
              if (onResult) {
                onResult(transcript)
              }
            } catch (fetchError) {
              const errorMsg = fetchError instanceof Error ? fetchError.message : 'Failed to transcribe audio'
              setError(errorMsg)
              if (onError) {
                onError(errorMsg)
              }
            } finally {
              setIsProcessing(false)
            }
          }
          reader.readAsDataURL(audioBlob)
        } catch (processError) {
          const errorMsg = processError instanceof Error ? processError.message : 'Failed to process audio'
          setError(errorMsg)
          setIsProcessing(false)
          if (onError) {
            onError(errorMsg)
          }
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsListening(true)
      setError(null)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to start recording'
      setError(errorMsg)
      setIsListening(false)
      if (onError) {
        onError(errorMsg)
      }
    }
  }, [lang, onResult, onError])

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && isListening) {
      // Stop recording - this will automatically trigger onstop which processes the audio
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
        // isListening will be set to false in onstop handler
      } else {
        setIsListening(false)
      }
    }

    // Stream will be stopped in onstop handler after processing completes
  }, [isListening])

  const reset = useCallback(() => {
    setError(null)
    audioChunksRef.current = []
  }, [])

  return {
    isListening,
    isProcessing,
    error,
    isSupported,
    startListening,
    stopListening,
    reset
  }
}
