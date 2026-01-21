export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  message: string
  action?: {
    type: 'navigate' | 'book' | 'contact'
    target?: string
    label?: string
  }
  model?: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export async function sendMessage(
  messages: ChatMessage[],
  lang: 'en' | 'zh-CN' | 'zh-TW'
): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        lang
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to get response from AI')
    }

    const data = await response.json()
    
    // Parse action from message if present
    let action: ChatResponse['action'] | undefined
    const message = data.message || ''
    
    // Check for action keywords in the response
    if (message.includes('https://app.getcareby.ca/') || message.toLowerCase().includes('book') || message.includes('预约') || message.includes('預約')) {
      action = {
        type: 'book',
        target: 'https://app.getcareby.ca/',
        label: lang === 'en' ? 'Book Consultation' : lang === 'zh-CN' ? '预约咨询' : '預約諮詢'
      }
    } else if (message.toLowerCase().includes('service') || message.includes('服务') || message.includes('服務')) {
      action = {
        type: 'navigate',
        target: '#services',
        label: lang === 'en' ? 'View Services' : lang === 'zh-CN' ? '查看服务' : '查看服務'
      }
    } else if (message.toLowerCase().includes('contact') || message.includes('联系') || message.includes('聯繫') || message.includes('电话') || message.includes('電話')) {
      action = {
        type: 'contact',
        label: lang === 'en' ? 'Contact Us' : lang === 'zh-CN' ? '联系我们' : '聯繫我們'
      }
    }

    return {
      message,
      action,
      model: data.model,
      usage: data.usage
    }
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error)
    throw error
  }
}
