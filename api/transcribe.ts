import type { VercelRequest, VercelResponse } from '@vercel/node'

interface RequestBody {
  audio: string // Base64 encoded audio data
  lang?: 'en' | 'zh-CN' | 'zh-TW' // Language hint
}

// Rate limiting (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }

  if (limit.count >= 20) { // 20 requests per minute for transcription
    return false
  }

  limit.count++
  return true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  if (!checkRateLimit(clientIp as string)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  try {
    const { audio, lang } = req.body as RequestBody

    if (!audio) {
      return res.status(400).json({ error: 'Audio data is required' })
    }

    // Convert base64 to buffer
    let audioBuffer: Buffer
    try {
      audioBuffer = Buffer.from(audio, 'base64')
      if (audioBuffer.length === 0) {
        return res.status(400).json({ error: 'Invalid audio data: empty buffer' })
      }
      // Check file size (Whisper API has a 25MB limit)
      if (audioBuffer.length > 25 * 1024 * 1024) {
        return res.status(400).json({ error: 'Audio file too large (max 25MB)' })
      }
    } catch (bufferError) {
      console.error('Failed to decode base64 audio:', bufferError)
      return res.status(400).json({ error: 'Invalid audio data format' })
    }

    // Map language codes for Whisper
    const languageMap: Record<string, string> = {
      'en': 'en',
      'zh-CN': 'zh',
      'zh-TW': 'zh'
    }
    const whisperLang = lang ? languageMap[lang] || undefined : undefined

    // Determine file extension based on audio format
    // Try to detect format from buffer header, default to webm
    let fileExtension = 'webm'
    let contentType = 'audio/webm'
    
    // Check for common audio format signatures
    if (audioBuffer[0] === 0xFF && audioBuffer[1] === 0xFB) {
      // MP3
      fileExtension = 'mp3'
      contentType = 'audio/mpeg'
    } else if (audioBuffer[0] === 0x4F && audioBuffer[1] === 0x67 && audioBuffer[2] === 0x67) {
      // OGG
      fileExtension = 'ogg'
      contentType = 'audio/ogg'
    } else if (audioBuffer[0] === 0x52 && audioBuffer[1] === 0x49 && audioBuffer[2] === 0x46 && audioBuffer[3] === 0x46) {
      // WAV
      fileExtension = 'wav'
      contentType = 'audio/wav'
    }

    // Create multipart/form-data manually for Node.js
    const boundary = `----WebKitFormBoundary${Math.random().toString(36).substring(2)}`
    const formDataParts: Buffer[] = []

    // Add file field
    formDataParts.push(Buffer.from(`--${boundary}\r\n`))
    formDataParts.push(Buffer.from(`Content-Disposition: form-data; name="file"; filename="audio.${fileExtension}"\r\n`))
    formDataParts.push(Buffer.from(`Content-Type: ${contentType}\r\n\r\n`))
    formDataParts.push(audioBuffer)
    formDataParts.push(Buffer.from(`\r\n`))

    // Add model field
    formDataParts.push(Buffer.from(`--${boundary}\r\n`))
    formDataParts.push(Buffer.from(`Content-Disposition: form-data; name="model"\r\n\r\n`))
    formDataParts.push(Buffer.from(`whisper-1\r\n`))

    // Add language field if specified
    if (whisperLang) {
      formDataParts.push(Buffer.from(`--${boundary}\r\n`))
      formDataParts.push(Buffer.from(`Content-Disposition: form-data; name="language"\r\n\r\n`))
      formDataParts.push(Buffer.from(`${whisperLang}\r\n`))
    }

    // Add response_format field
    formDataParts.push(Buffer.from(`--${boundary}\r\n`))
    formDataParts.push(Buffer.from(`Content-Disposition: form-data; name="response_format"\r\n\r\n`))
    formDataParts.push(Buffer.from(`json\r\n`))

    // Close boundary
    formDataParts.push(Buffer.from(`--${boundary}--\r\n`))

    const formDataBuffer = Buffer.concat(formDataParts)

    // Call OpenAI Whisper API
    const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`
      },
      body: formDataBuffer
    })

    if (!openaiResponse.ok) {
      let errorMessage = 'Failed to transcribe audio'
      try {
        const errorData = await openaiResponse.json()
        errorMessage = errorData.error?.message || errorData.error || 'Failed to transcribe audio'
        console.error('OpenAI Whisper API error:', errorData)
      } catch (jsonError) {
        const errorText = await openaiResponse.text()
        errorMessage = errorText || `Server error: ${openaiResponse.status} ${openaiResponse.statusText}`
        console.error('OpenAI Whisper API error (non-JSON):', errorText)
      }
      return res.status(openaiResponse.status).json({ 
        error: errorMessage
      })
    }

    // Parse response JSON
    let data
    try {
      const responseText = await openaiResponse.text()
      if (!responseText) {
        return res.status(500).json({ 
          error: 'Empty response from OpenAI API'
        })
      }
      data = JSON.parse(responseText)
    } catch (jsonError) {
      console.error('Failed to parse OpenAI response:', jsonError)
      return res.status(500).json({ 
        error: 'Invalid response from OpenAI API'
      })
    }

    const transcript = data.text || ''

    return res.status(200).json({
      transcript,
      language: data.language
    })
  } catch (error) {
    console.error('Error in transcribe API:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
