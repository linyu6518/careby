import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import type { Message } from '../../hooks/useChatbot'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  lang?: 'en' | 'zh' | 'zh-TW'
}

export default function MessageList({ messages, isLoading, lang = 'en' }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const welcomeMessages = {
    en: "Let's start a conversation! I can help you answer questions, navigate pages, or book a consultation.",
    zh: "开始对话吧！我可以帮您解答问题、导航页面或预约咨询。",
    'zh-TW': "開始對話吧！我可以幫您解答問題、導航頁面或預約諮詢。"
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-slate-400 text-sm text-center px-4">
          <p>{welcomeMessages[lang]}</p>
        </div>
      )}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message.text}
          isUser={message.isUser}
          timestamp={message.timestamp}
          action={message.action}
        />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
