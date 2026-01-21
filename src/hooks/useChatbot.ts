import { useState, useCallback } from 'react'
import type { ChatMessage, ChatResponse } from '../services/chatgpt'
import { sendMessage } from '../services/chatgpt'
import { getSystemPrompt } from '../services/promptTemplates'
import { handleAction } from '../services/actionHandler'
import { findMatchingConfig } from '../services/aiConfig'

export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  action?: {
    type: 'navigate' | 'book' | 'contact'
    target?: string
    label?: string
  }
}

export function useChatbot(lang: 'en' | 'zh' | 'zh-TW') {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const langCode: 'en' | 'zh-CN' | 'zh-TW' = lang === 'zh' ? 'zh-CN' : lang === 'zh-TW' ? 'zh-TW' : 'en'

  const sendUserMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Check if there's a matching quick question
      const matchingConfig = findMatchingConfig(text, langCode)
      
      if (matchingConfig) {
        // Use predefined response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: matchingConfig.response,
          isUser: false,
          timestamp: new Date(),
          action: matchingConfig.action
        }
        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
        
        // Handle action if present
        if (matchingConfig.action) {
          setTimeout(() => handleAction(matchingConfig.action!), 100)
        }
        return
      }

      // Build message history
      const messageHistory: ChatMessage[] = [
        {
          role: 'system',
          content: getSystemPrompt(langCode)
        },
        ...messages.slice(-10).map(msg => ({
          role: (msg.isUser ? 'user' : 'assistant') as 'user' | 'assistant',
          content: msg.text
        })),
        {
          role: 'user',
          content: text.trim()
        }
      ]

      // Call ChatGPT API
      const response: ChatResponse = await sendMessage(messageHistory, langCode)

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        action: response.action
      }

      setMessages(prev => [...prev, assistantMessage])

      // Handle action if present
      if (response.action) {
        setTimeout(() => handleAction(response.action!), 100)
      }
    } catch (error) {
      console.error('Error in chatbot:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: lang === 'en' 
          ? 'Sorry, I encountered an error. Please try again.' 
          : lang === 'zh'
          ? '抱歉，我遇到了错误。请重试。'
          : '抱歉，我遇到了錯誤。請重試。',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading, langCode, lang])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    sendMessage: sendUserMessage,
    clearMessages
  }
}
