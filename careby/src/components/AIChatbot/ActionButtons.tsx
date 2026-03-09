import { quickQuestions } from '../../services/aiConfig'

interface ActionButtonsProps {
  onQuestionClick: (question: string) => void
  lang?: 'en' | 'zh' | 'zh-TW'
}

export default function ActionButtons({ onQuestionClick, lang = 'en' }: ActionButtonsProps) {
  const langCode: 'en' | 'zh-CN' | 'zh-TW' = lang === 'zh' ? 'zh-CN' : lang === 'zh-TW' ? 'zh-TW' : 'en'
  const questions = quickQuestions[langCode]

  return (
    <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
      <p className="text-xs text-slate-600 mb-2 font-medium">
        {lang === 'en' ? 'Quick questions:' : lang === 'zh' ? '快捷问题：' : '快捷問題：'}
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(q.question)}
            className="
              px-3 py-1.5
              text-xs
              bg-white border border-slate-300 rounded-lg
              hover:bg-slate-50 hover:border-primary
              active:bg-slate-100
              transition-colors
              text-slate-700
            "
          >
            {q.question}
          </button>
        ))}
      </div>
    </div>
  )
}
