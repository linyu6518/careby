import { motion } from 'framer-motion'

interface MessageBubbleProps {
  message: string
  isUser: boolean
  timestamp: Date
  action?: {
    type: 'navigate' | 'book' | 'contact'
    target?: string
    label?: string
  }
}

export default function MessageBubble({ message, isUser, timestamp, action }: MessageBubbleProps) {
  const timeString = timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout={false}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[80%] sm:max-w-[75%]
          rounded-2xl px-4 py-3
          ${isUser 
            ? 'bg-primary text-white rounded-br-sm' 
            : 'bg-white border border-slate-200 rounded-bl-sm shadow-sm'
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-slate-500'}`}>
          {timeString}
        </div>
        {action && action.label && (
          <button
            onClick={() => {
              // Use requestAnimationFrame to avoid forced reflow
              requestAnimationFrame(() => {
                if (action?.type === 'navigate' && action.target) {
                  const element = document.querySelector(action.target)
                  if (element) {
                    // Batch DOM operations
                    requestAnimationFrame(() => {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                  }
                } else if (action?.type === 'book' && action.target) {
                  window.open(action.target, '_blank')
                } else if (action?.type === 'contact') {
                  const phone = '1-646-578-9920'
                  const email = 'hello@getcareby.ca'
                  alert(`Phone: ${phone}\nEmail: ${email}`)
                }
              })
            }}
            className={`
              mt-2 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-colors
              ${isUser 
                ? 'bg-white/20 text-white hover:bg-white/30' 
                : 'bg-primary/10 text-primary hover:bg-primary/20'
              }
            `}
          >
            {action.label}
          </button>
        )}
      </div>
    </motion.div>
  )
}
