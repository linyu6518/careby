import { motion } from 'framer-motion'
import { useState } from 'react'

interface ChatButtonProps {
  onClick: () => void
  isOpen: boolean
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      className={`
        fixed z-[9998]
        bottom-[29px] right-6
        sm:bottom-[30px] sm:right-[30px]
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full
        flex items-center justify-center
        shadow-2xl
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
        ${isOpen ? 'bg-yellow-500' : 'bg-yellow-400 hover:bg-yellow-500'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout={false}
      aria-label="Open AI Assistant"
    >
      {/* Avatar with notification dot */}
      <div className="relative">
        {!imageError ? (
          <img
            src="/ai-assistant-avatar.png"
            alt="Careby AI Health Assistant - Get Help with Home Care Services"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-yellow-600 object-cover"
            loading="eager"
            width="48"
            height="48"
            onError={(e) => {
              console.error('Failed to load AI assistant avatar:', e);
              setImageError(true);
            }}
            onLoad={() => {
              console.log('AI assistant avatar loaded successfully');
            }}
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-500 border-2 border-yellow-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
            AI
          </div>
        )}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </div>
    </motion.button>
  )
}
