import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatWindow from './ChatWindow'
import { useChatbot } from '../../hooks/useChatbot'

interface AIChatbotProps {
  lang: 'en' | 'zh' | 'zh-TW'
}

export default function AIChatbot({ lang }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isLoading, sendMessage } = useChatbot(lang)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <ChatButton onClick={handleToggle} isOpen={isOpen} />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        lang={lang}
      />
    </>
  )
}
