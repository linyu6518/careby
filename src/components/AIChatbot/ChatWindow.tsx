import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import MessageList from './MessageList'
import InputArea from './InputArea'
import ActionButtons from './ActionButtons'
import type { Message } from '../../hooks/useChatbot'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  messages: Message[]
  isLoading: boolean
  onSendMessage: (message: string) => void
  lang: 'en' | 'zh' | 'zh-TW'
}

export default function ChatWindow({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSendMessage,
  lang
}: ChatWindowProps) {
  const [imageError, setImageError] = useState(false)

  if (!isOpen) return null

  const placeholders = {
    en: 'Type your message...',
    zh: '输入消息...',
    'zh-TW': '輸入消息...'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            layout={false}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997] sm:bg-black/40"
          />
          
          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            layout={false}
            className={`
              fixed z-[9999]
              bottom-[90px] left-[1.5rem] right-[1.5rem]
              sm:bottom-6 sm:right-6 sm:left-auto
              w-[calc(100vw-3rem)] h-[calc(100vh-10rem)]
              sm:w-[400px] sm:h-[600px]
              bg-white rounded-2xl shadow-2xl
              flex flex-col
              overflow-hidden
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-primary to-primary/80">
              <div className="flex items-center gap-3">
                {!imageError ? (
                  <img
                    src="/ai-assistant-avatar.png"
                    alt="Careby AI Health Assistant"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    loading="eager"
                    width="32"
                    height="32"
                    onError={(e) => {
                      console.error('Failed to load AI assistant avatar:', e);
                      setImageError(true);
                    }}
                    onLoad={() => {
                      console.log('AI assistant avatar loaded successfully');
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                    AI
                  </div>
                )}
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {lang === 'en' ? 'Careby Assistant' : lang === 'zh' ? '小护' : '小護'}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {lang === 'en' ? 'Online' : lang === 'zh' ? '在线' : '在線'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="
                  w-8 h-8
                  rounded-full
                  bg-white/20 hover:bg-white/30
                  flex items-center justify-center
                  transition-colors
                  text-white
                "
                aria-label={lang === 'en' ? 'Close' : lang === 'zh' ? '关闭' : '關閉'}
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Messages */}
            <MessageList messages={messages} isLoading={isLoading} lang={lang} />

            {/* Action Buttons */}
            <ActionButtons onQuestionClick={onSendMessage} lang={lang} />

            {/* Input Area */}
            <InputArea
              onSend={onSendMessage}
              disabled={isLoading}
              placeholder={placeholders[lang]}
              lang={lang}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
