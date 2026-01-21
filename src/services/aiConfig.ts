export interface QuestionConfig {
  question: string
  response: string
  action?: {
    type: 'navigate' | 'book' | 'contact'
    target?: string
  }
}

export const quickQuestions: Record<'en' | 'zh-CN' | 'zh-TW', QuestionConfig[]> = {
  'en': [
    {
      question: 'How do I book a consultation?',
      response: 'You can book a free consultation by clicking the button below or visiting https://app.getcareby.ca/',
      action: {
        type: 'book',
        target: 'https://app.getcareby.ca/'
      }
    },
    {
      question: 'What services do you offer?',
      response: 'We offer premium home care coordination, AI-powered fall detection, instant telehealth access, regenerative medicine partnerships, and 24/7 coordination services.',
      action: {
        type: 'navigate',
        target: '#services'
      }
    },
    {
      question: 'What are your membership plans?',
      response: 'We offer three membership tiers: Basic ($99/month), Premium ($199/month), and Elite ($299/month). Each includes different levels of care coordination and support.',
      action: {
        type: 'navigate',
        target: '#membership'
      }
    },
    {
      question: 'How much does it cost?',
      response: 'Our membership plans start at $99/month for the Basic plan. We also offer Premium ($199/month) and Elite ($299/month) plans with additional features.',
      action: {
        type: 'navigate',
        target: '#membership'
      }
    }
  ],
  'zh-CN': [
    {
      question: '如何预约咨询？',
      response: '您可以点击下方按钮或访问 https://app.getcareby.ca/ 预约免费咨询。',
      action: {
        type: 'book',
        target: 'https://app.getcareby.ca/'
      }
    },
    {
      question: '你们提供哪些服务？',
      response: '我们提供高端家庭护理协调、AI 驱动的跌倒检测、即时远程医疗访问、再生医学合作和 24/7 协调服务。',
      action: {
        type: 'navigate',
        target: '#services'
      }
    },
    {
      question: '会员方案有哪些？',
      response: '我们提供三种会员方案：基础方案（$99/月）、高级方案（$199/月）和精英方案（$299/月）。每个方案包含不同级别的护理协调和支持。',
      action: {
        type: 'navigate',
        target: '#membership'
      }
    },
    {
      question: '费用是多少？',
      response: '我们的会员方案从基础方案的 $99/月起。我们还提供高级方案（$199/月）和精英方案（$299/月），包含更多功能。',
      action: {
        type: 'navigate',
        target: '#membership'
      }
    }
  ],
  'zh-TW': [
    {
      question: '如何預約諮詢？',
      response: '您可以點擊下方按鈕或訪問 https://app.getcareby.ca/ 預約免費諮詢。',
      action: {
        type: 'book',
        target: 'https://app.getcareby.ca/'
      }
    },
    {
      question: '你們提供哪些服務？',
      response: '我們提供高端家庭護理協調、AI 驅動的跌倒檢測、即時遠程醫療訪問、再生醫學合作和 24/7 協調服務。',
      action: {
        type: 'navigate',
        target: '#services'
      }
    },
    {
      question: '會員方案有哪些？',
      response: '我們提供三種會員方案：基礎方案（$99/月）、高級方案（$199/月）和精英方案（$299/月）。每個方案包含不同級別的護理協調和支持。',
      action: {
        type: 'navigate',
        target: '#membership'
      }
    },
    {
      question: '費用是多少？',
      response: '我們的會員方案從基礎方案的 $99/月起。我們還提供高級方案（$199/月）和精英方案（$299/月），包含更多功能。',
      action: {
        type: 'navigate',
        target: '#membership'
      }
    }
  ]
}

export function findMatchingConfig(question: string, lang: 'en' | 'zh-CN' | 'zh-TW'): QuestionConfig | null {
  const questions = quickQuestions[lang]
  const lowerQuestion = question.toLowerCase().trim()
  
  for (const config of questions) {
    if (config.question.toLowerCase().includes(lowerQuestion) || lowerQuestion.includes(config.question.toLowerCase())) {
      return config
    }
  }
  
  return null
}
