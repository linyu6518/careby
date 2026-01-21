import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface RequestBody {
  messages: ChatMessage[]
  lang: 'en' | 'zh-CN' | 'zh-TW'
}

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }

  if (limit.count >= 10) { // 10 requests per minute
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
    const { messages, lang } = req.body as RequestBody

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Using GPT-3.5 for cost efficiency
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('OpenAI API error:', errorData)
      return res.status(openaiResponse.status).json({ 
        error: 'Failed to get response from AI',
        details: errorData 
      })
    }

    const data = await openaiResponse.json()
    const message = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'

    return res.status(200).json({
      message,
      model: data.model,
      usage: data.usage
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
