import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import ComingSoon from './ComingSoon'
import SEO from './components/SEO'
import { generateHomepageSchema } from './utils/structuredData'
import { convertObjectToTraditional } from './utils/convertToTraditional'
// import AIChatbot from './components/AIChatbot' // Hidden - using Elfsight AI Chatbot instead
// import VoiceInputButton from './components/VoiceInputButton' // Hidden

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const content = {
  en: {
    nav: {
      switchLang: '中文',
    },
    hero: {
      tagline: 'Smarter Healthcare Closer to Home',
      headline: 'Care by People Who Truly Care',
      headlinePrefix: 'Care by',
      headlineSuffix: 'Who Truly Care',
      subheadline: 'Premium in-home care, health navigation, and support services for Toronto seniors and their families.',
      slogan: 'Premium home care coordination • Advanced fall detection • Instant telehealth access • Regenerative medicine • Because your health deserves more than basic support.',
      ctaPrimary: 'Book Your Free Consultation',
      ctaSecondary: 'Call Us',
      trustBadges: [
        'Gold Standard™ Certified Care Professionals',
        'AI-Powered Fall Detection & Monitoring',
        '2,000+ Patients & Families Served',
        'On-Demand Physician Access',
        'Regenerative Medicine Partnership',
        '24/7 Coordination Team',
      ],
      cloudTitle: 'Careby AI Health Cloud',
      realtime: 'Real-time',
      monitoring: 'Smart Monitoring',
      dataSync: 'Health Data Real-Time Sync',
      hrv: 'Heart Rate Variability',
      sleep: 'Sleep Quality',
      risk: 'Risk Alert',
      stable: 'Stable',
      good: 'Good',
      monitoring2: 'Monitoring',
      cloudDesc: 'Powered by millimeter-wave radar and AI physical examination models to protect family health.',
    },
    services: {
      sectionTitle: 'Our Core Services',
      title: 'Comprehensive Health and Care Services',
      subtitle: 'AI-powered technology connecting quality medical and life resources.',
      service1: {
        title: 'Healthcare Access & System Navigation',
        subtitle: 'Skip the Wait. Get Treatment Now.',
        desc: '6-month waits for specialists. 12-month waits for MRIs. No family doctor accepting patients. We navigate Ontario\'s healthcare system to get you the care you need—fast.',
        details: {
          problem: {
            title: 'The Problem',
            items: [
              '6-month waits for specialists',
              '12-month waits for MRIs',
              'No family doctor accepting patients',
            ],
          },
          solutions: {
            title: 'Our Solution',
            items: [
              'Same-day virtual doctors - English, Mandarin, Cantonese (via GoToDoctor)',
              'Specialist Wait-Time Navigator - We find OHIP-covered specialists with 2-4 week waits instead of 6-12 months',
              'Fast-track diagnostic testing - MRI, ultrasound, CT scans in 2-4 weeks (not 6-12 months)',
              'Medical accompaniment - Bilingual staff attend appointments with you, translate, take notes',
              'Prescription delivery - Medications to your door, auto-refills',
            ],
          },
          realExample: 'Real Example: Family doctor refers to psychiatrist → 6-month public waitlist → We found OHIP-covered option → 3-week wait',
          result: 'Get into the system fast. Get treatment now.',
        },
      },
      service2: {
        title: 'Trusted In-Home Care Professionals',
        subtitle: 'Qualified Professionals You Actually Trust in Your Home',
        desc: 'Need help at home but terrified of hiring strangers from Kijiji. Agencies send whoever\'s available. We send professionals you can trust.',
        details: {
          problem: {
            title: 'The Problem',
            items: [
              'Need help at home but terrified of hiring strangers from Kijiji',
              'Agencies send whoever\'s available',
            ],
          },
          solutions: {
            title: 'Our Solution',
            items: [
              'Rigorous screening - Criminal checks, license verification, skills testing, reference checks - Only 1 in 8 pass',
              'Personal Support Workers - Help with bathing, dressing, meals, mobility',
              'Registered Nurses & Practical Nurses - Wound care, medication management, health monitoring',
              'Therapists - Physiotherapy, massage therapy, occupational therapy',
              'Specialized support - Nutritionists, social workers, mental health counselors',
              'Perfect matching - Cultural fit, language, personality, skills',
              '48-hour replacement - Not working out? We find someone new, no questions asked',
            ],
          },
          result: 'Qualified professionals you actually trust in your home.',
        },
      },
      service3: {
        title: 'AI Health Monitoring + Expert Analysis',
        subtitle: 'Know What Your Body Is Telling You. Know What to Do About It.',
        desc: 'Your smartwatch tracks everything but nobody tells you what it means or what to do. We combine AI monitoring with expert healthcare analysis.',
        details: {
          problem: {
            title: 'The Problem',
            items: [
              'Your smartwatch tracks everything but nobody tells you what it means or what to do',
            ],
          },
          solutions: {
            title: 'Our Solution',
            items: [
              'AI monitoring technology - Fall detection, walking patterns, sleep quality, heart health, 60+ health markers',
              'Monthly expert review - Real healthcare professionals analyze your data',
              'Actionable recommendations - Specific nutrition plans, exercise protocols, lifestyle changes',
              'East meets West - Combines Western medicine diagnostics with Traditional Chinese Medicine approach',
              'Early warning system - Catch health decline before it becomes a crisis',
            ],
          },
          result: 'Know what your body is telling you. Know what to do about it.',
        },
      },
      service4: {
        title: 'Benefits Navigation & Medical Verification',
        subtitle: 'Stop Leaving Money on the Table. Make Informed Decisions.',
        desc: 'Leaving $5,000-$15,000 in benefits unclaimed. Insurance denies claims. Don\'t know if that "miracle treatment" is real or a scam. We help you navigate the system and verify what\'s legitimate.',
        details: {
          problem: {
            title: 'The Problem',
            items: [
              'Leaving $5,000-$15,000 in benefits unclaimed',
              'Insurance denies claims',
              'Don\'t know if that "miracle treatment" is real or a scam',
            ],
          },
          solutions: {
            title: 'Our Solution',
            items: [
              'Benefits detective work - Find every government program you qualify for (OHIP+, disability support, assistive devices, tax credits)',
              'Insurance optimization - We submit claims properly, appeal denials (70% success rate)',
              'Care financing - Reverse mortgage consultations, payment options',
              'Second opinion coordination - Connect you with top specialists, handle all logistics',
              'Medical fact-checking - Is that treatment legitimate? We verify so you don\'t waste money on scams',
            ],
          },
          result: 'Stop leaving money on the table. Make informed decisions.',
        },
      },
      service5: {
        title: 'Automated Wellness Hub Solutions',
        subtitle: 'For Business Owners & Entrepreneurs',
        desc: 'Traditional wellness businesses need expensive staff. Limited hours = limited revenue. We provide AI-powered wellness equipment solutions—exclusive in Canada.',
        details: {
          problem: {
            title: 'The Problem',
            items: [
              'Traditional wellness businesses need expensive staff',
              'Limited hours = limited revenue',
            ],
          },
          solutions: {
            title: 'Our Solution - Exclusive in Canada',
            items: [
              'AI-powered wellness equipment - Proven technology from 2,000+ locations in China',
              'Zero employees needed - Intelligent massage chairs, automated acupuncture beds, robotic massage tables, health testing stations',
              '24/7 operation - Customers pay and use equipment themselves',
              'Two options: Buy equipment to add to your existing clinic, gym, spa, or hotel | Launch complete automated wellness center with our turnkey support',
            ],
          },
          whatWeProvide: {
            title: 'What We Provide',
            items: [
              'Equipment (self-service payment, AI customization, auto-sanitization)',
              'Marketing and branding support',
              'Site selection and setup guidance',
              'Operations training',
              'Ongoing technical support',
            ],
          },
          roi: 'Typical ROI: 15-24 months',
          operatingCosts: 'Operating Costs: Minimal (no payroll, just rent and cleaning)',
          result: 'Passive wellness income with proven technology.',
        },
      },
      service6: {
        title: 'Benefits Application & Financial Support',
        subtitle: 'Maximize Your Healthcare Funding',
        desc: 'Navigating benefits and insurance is overwhelming. We handle the paperwork so you get the care you need.',
        details: {
          services: [
            {
              category: 'Government Benefits Navigation',
              items: [
                'OHIP+ and Trillium Drug Program applications',
                'Assistive Devices Program (ADP) funding',
                'Ontario Disability Support Program (ODSP) guidance',
                'Home Care funding through LHIN/Ontario Health Teams',
                'Canada Pension Plan Disability (CPP-D) applications',
                'Veterans Affairs benefits coordination',
              ],
            },
            {
              category: 'Private Insurance Claims',
              items: [
                'Extended health benefit maximization',
                'Long-term care insurance coordination',
                'Life insurance living benefits access',
                'Critical illness insurance claims',
                'Pre-authorization and documentation support',
                'Appeals and dispute resolution assistance',
              ],
            },
            {
              category: 'Financial Planning & Assistance',
              items: [
                'Cost analysis and care budget planning',
                'Tax credit identification (Medical Expense Tax Credit, Disability Tax Credit)',
                'Payment plan and financing options',
                'Charitable foundation grant applications',
                'Equipment rental vs. purchase analysis',
                'Care cost vs. benefit optimization',
              ],
            },
          ],
          howItWorks: 'Initial consultation to assess your situation → We identify all eligible benefits and funding sources → Complete and submit all applications on your behalf → Follow up with agencies and insurers → Coordinate payments and reimbursements → Ongoing support for renewals and appeals',
          whatWeHandle: [
            'Application forms and documentation',
            'Medical assessments and physician reports',
            'Follow-up calls and status tracking',
            'Appeals and reauthorizations',
            'Payment coordination with providers',
            'Annual renewals and reassessments',
          ],
          pricing: [
            'Initial Assessment: Free with any Careby care package',
            'Application Support (per program): $150-$300',
            'Comprehensive Benefits Management: $99/month (includes all applications, claims, and ongoing support)',
            'Insurance Claims Only: $50 per claim submission',
            'Tax Credit Assistance: $200 (one-time, annual)',
          ],
          idealFor: 'Seniors eligible for government programs • Families navigating complex benefit systems • Post-surgery patients requiring equipment funding • Chronic condition patients with ongoing medication costs • Anyone overwhelmed by healthcare paperwork',
        },
      },
    },
    technology: {
      sectionTitle: 'WHY CAREBY WORKS',
      title: 'Technology Enables Care. Humans Deliver It.',
      subtitle: 'Most home care companies are stuck in 1995:',
      oldWay: [
        'Paper timesheets',
        'No family visibility',
        'Zero health monitoring',
        'Reactive (not proactive) care',
        'No medical coordination',
      ],
      newWay: [
        'Real-time family portal - Know what\'s happening, always',
        'AI fall detection - Prevent emergencies before they happen',
        'Integrated telehealth - Medical access in minutes',
        'Regenerative medicine - Future-proof your health',
        'Gold Standard caregivers - Only the best make it through',
        'Complete coordination - One team managing everything',
      ],
      result: 'The result? Fewer hospitalizations. Faster recovery. Better quality of life. Peace of mind for families.',
    },
    newSection: {
      title: 'Healthcare Stops at the Hospital Door. It Shouldn\'t.',
      intro: 'You\'ve just been discharged after surgery. Or your parent fell and you\'re terrified it\'ll happen again. Or you\'re managing a chronic condition and can\'t get your doctor on the phone for weeks.',
      subtitle: 'The current system is broken:',
      problems: [
        'Home care agencies send whoever\'s available with minimal training, zero technology, and no medical coordination.',
        'You\'re on your own for follow-up care, monitoring, and knowing when something\'s wrong before it becomes an emergency.',
        'Preventive care doesn\'t exist—you wait for falls to happen, infections to develop, conditions to worsen.',
        'Anti-aging and longevity medicine? Good luck navigating that maze yourself.',
      ],
      solution: 'You deserve integrated care that actually works.',
      conclusion: 'When you leave the hospital, when you\'re recovering at home, when you\'re preventing problems instead of reacting to them—that\'s when you need support most.',
      cta: 'That\'s why we built Careby.',
    },
    platformSection: {
      title: 'Five Integrated Services. One Seamless Platform.',
      description: 'Careby isn\'t a home care agency. We\'re a complete health coordination platform combining professional caregivers, predictive AI technology, on-demand medical access, and cutting-edge longevity medicine.',
      conclusion: 'Most agencies offer caregivers. We offer a complete health ecosystem.',
    },
    partners: {
      sectionTitle: 'Trusted Partnerships',
      title: 'Partnering with Industry Leaders to Build a Smart Healthcare Ecosystem',
      subtitle: 'We collaborate deeply with leading Canadian and international medical institutions.',
      quote: 'Careby Platform works with partners like GoToDoctor to create a rapid medical matching system, integrating telemedicine, home care, and health management services to provide users with safe and efficient one-stop solutions.',
    },
    impact: {
      sectionTitle: 'Our Vision',
      title: 'Technology Empowers Healthy Living',
      subtitle: 'Enabling every family to enjoy smart, caring health care.',
      metric1: 'People Served',
      metric2: 'Certified Caregivers',
      metric3: 'User Satisfaction',
      testimonial: 'Careby Platform has made post-surgery care for my parents more reassuring. I can see health changes in the app in real time.',
      author: 'Anna, Toronto',
    },
    cta: {
      quote: 'Technology and care go hand in hand, bringing health closer.',
      title: 'Careby Platform — Smarter Healthcare, Closer to Home.',
      subtitle: 'Careby Platform — Smart Healthcare at Your Fingertips.',
      button: 'Get Started',
    },
    footer: {
      copyright: '© 2025 Careby Platform | Smarter Healthcare, Closer to Home.',
      address: 'Address',
      contact: 'Contact',
      links: 'Links',
      businessHours: 'Business Hours',
      home: 'Home',
      aboutUs: 'About Us',
      ourServices: 'Our Services',
      partnerships: 'Partnerships',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      phone: 'Phone',
      email: 'Email',
      privacy: 'Privacy',
      billing: 'Billing',
      support247: '24/7 Support',
      emergencySupport: '24/7 Emergency Support Available',
      allRightsReserved: 'All rights reserved. Licensed and insured in Ontario, Canada.',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    faq: {
      sectionTitle: 'FAQ',
      title: 'Frequently Asked Questions',
    },
    membership: {
      sectionTitle: 'Membership Tiers',
      title: 'Choose Your Care Level',
      mostPopular: 'Most Popular',
      bookConsultation: 'Book Free Consultation',
    },
  },
  zh: {
    nav: {
      switchLang: 'English',
    },
    hero: {
      tagline: '高端家庭护理、AI监测与再生医学——无缝整合，守护您的长期健康。',
      headline: '由真正关心的人提供护理',
      headlinePrefix: '由',
      headlineSuffix: '真正的提供您呵护',
      subheadline: '为多伦多老年人及其家庭提供优质上门护理、健康导航和支持服务。',
      slogan: '高端家庭护理 • 智能跌倒检测 • 即时远程医疗 • 再生疗法 • 超越基础支持。',
      ctaPrimary: '探索平台',
      ctaSecondary: '预约咨询',
      trustBadges: [
        '黄金标准™认证护理专业人员',
        'AI驱动的跌倒检测与监测',
        '2,000+ 患者与家庭服务',
        '按需医生访问',
        '再生医学合作伙伴',
        '24/7 协调团队',
      ],
      cloudTitle: 'Careby AI Health Cloud',
      realtime: 'Real-time',
      monitoring: '智能监测',
      dataSync: '健康数据实时同步',
      hrv: '心率变异性',
      sleep: '睡眠质量',
      risk: '风险预警',
      stable: '稳定',
      good: '良好',
      monitoring2: '观察中',
      cloudDesc: '通过毫米波雷达与AI体检模型，全程守护家庭健康。',
    },
    services: {
      sectionTitle: '我们的核心服务',
      title: '全方位的健康与照护服务',
      subtitle: '以AI科技为核心，连接优质医疗与生活资源。',
      service1: {
        title: '医疗系统导航与快速就医',
        subtitle: '跳过等待。立即获得治疗。',
        desc: '专科医生等待6个月。MRI等待12个月。没有家庭医生接受新患者。我们帮您导航安大略省的医疗系统，快速获得您需要的护理。',
        details: {
          problem: {
            title: '面临的问题',
            items: [
              '专科医生等待6个月',
              'MRI等待12个月',
              '没有家庭医生接受新患者',
            ],
          },
          solutions: {
            title: '我们的解决方案',
            items: [
              '当日虚拟医生 - 英语、普通话、粤语（通过GoToDoctor）',
              '专科等待时间导航 - 我们找到OHIP覆盖的专科医生，等待时间2-4周，而不是6-12个月',
              '快速诊断检查 - MRI、超声、CT扫描在2-4周内完成（而不是6-12个月）',
              '医疗陪同 - 双语工作人员陪同您就诊，翻译，做笔记',
              '处方配送 - 药物送到您家门口，自动续药',
            ],
          },
          realExample: '真实案例：家庭医生转诊精神科医生 → 公共等待名单6个月 → 我们找到OHIP覆盖的选项 → 3周等待',
          result: '快速进入医疗系统。立即获得治疗。',
        },
      },
      service2: {
        title: '值得信赖的家庭护理专业人员',
        subtitle: '您真正信任的合格专业人员在家中服务',
        desc: '需要家庭帮助，但害怕从Kijiji雇佣陌生人。机构派来任何可用的人。我们派来您可以信任的专业人员。',
        details: {
          problem: {
            title: '面临的问题',
            items: [
              '需要家庭帮助，但害怕从Kijiji雇佣陌生人',
              '机构派来任何可用的人',
            ],
          },
          solutions: {
            title: '我们的解决方案',
            items: [
              '严格筛选 - 犯罪背景检查、执照验证、技能测试、推荐人检查 - 只有八分之一通过',
              '个人支持工作者 - 协助洗澡、穿衣、用餐、行动',
              '注册护士和实用护士 - 伤口护理、用药管理、健康监测',
              '治疗师 - 物理治疗、按摩治疗、职业治疗',
              '专业支持 - 营养师、社会工作者、心理健康咨询师',
              '完美匹配 - 文化契合、语言、性格、技能',
              '48小时替换 - 不合适？我们找新人，无需任何问题',
            ],
          },
          result: '您真正信任的合格专业人员在家中服务。',
        },
      },
      service3: {
        title: 'AI健康监测 + 专家分析',
        subtitle: '了解您的身体在告诉您什么。知道该怎么做。',
        desc: '您的智能手表追踪一切，但没有人告诉您这意味着什么或该做什么。我们将AI监测与专业医疗分析相结合。',
        details: {
          problem: {
            title: '面临的问题',
            items: [
              '您的智能手表追踪一切，但没有人告诉您这意味着什么或该做什么',
            ],
          },
          solutions: {
            title: '我们的解决方案',
            items: [
              'AI监测技术 - 跌倒检测、步行模式、睡眠质量、心脏健康、60+健康指标',
              '月度专家审查 - 真正的医疗专业人员分析您的数据',
              '可执行的建议 - 具体的营养计划、运动方案、生活方式改变',
              '东西方结合 - 结合西医诊断与中医方法',
              '早期预警系统 - 在健康下降成为危机之前抓住它',
            ],
          },
          result: '了解您的身体在告诉您什么。知道该怎么做。',
        },
      },
      service4: {
        title: '福利导航与医疗验证',
        subtitle: '停止把钱留在桌上。做出明智的决定。',
        desc: '未申请的福利$5,000-$15,000。保险拒绝理赔。不知道那个"奇迹治疗"是真是假。我们帮您导航系统并验证什么是合法的。',
        details: {
          problem: {
            title: '面临的问题',
            items: [
              '未申请的福利$5,000-$15,000',
              '保险拒绝理赔',
              '不知道那个"奇迹治疗"是真是假',
            ],
          },
          solutions: {
            title: '我们的解决方案',
            items: [
              '福利侦探工作 - 找到您有资格的所有政府项目（OHIP+、残疾支持、辅助设备、税收抵免）',
              '保险优化 - 我们正确提交理赔，对拒绝提出上诉（70%成功率）',
              '护理融资 - 反向抵押贷款咨询、付款选项',
              '第二意见协调 - 将您与顶级专家联系，处理所有后勤工作',
              '医疗事实核查 - 那个治疗合法吗？我们验证，这样您就不会在骗局上浪费钱',
            ],
          },
          result: '停止把钱留在桌上。做出明智的决定。',
        },
      },
      service5: {
        title: '自动化健康中心解决方案',
        subtitle: '面向企业主和创业者',
        desc: '传统健康业务需要昂贵的员工。有限的时间 = 有限的收入。我们提供AI驱动的健康设备解决方案——加拿大独家。',
        details: {
          problem: {
            title: '面临的问题',
            items: [
              '传统健康业务需要昂贵的员工',
              '有限的时间 = 有限的收入',
            ],
          },
          solutions: {
            title: '我们的解决方案 - 加拿大独家',
            items: [
              'AI驱动的健康设备 - 来自中国2,000+地点的成熟技术',
              '零员工需求 - 智能按摩椅、自动化针灸床、机器人按摩台、健康检测站',
              '24/7运营 - 客户自行付费和使用设备',
              '两种选择：购买设备添加到您现有的诊所、健身房、水疗中心或酒店 | 在我们的交钥匙支持下启动完整的自动化健康中心',
            ],
          },
          whatWeProvide: {
            title: '我们提供什么',
            items: [
              '设备（自助支付、AI定制、自动消毒）',
              '营销和品牌支持',
              '场地选择和设置指导',
              '运营培训',
              '持续技术支持',
            ],
          },
          roi: '典型投资回报率：15-24个月',
          operatingCosts: '运营成本：最低（无工资支出，只需租金和清洁）',
          result: '使用成熟技术的被动健康收入。',
        },
      },
      service6: {
        title: '福利申请与金融支持',
        subtitle: '最大化您的医疗资金',
        desc: '福利和保险申请令人困惑。我们处理文书工作，让您获得所需的护理。',
        details: {
          services: [
            {
              category: '政府福利导航',
              items: [
                'OHIP+ 和 Trillium 药物计划申请',
                '辅助设备计划 (ADP) 资金',
                '安大略残疾支持计划 (ODSP) 指导',
                '通过 LHIN/安大略健康团队申请家庭护理资金',
                '加拿大退休金计划残疾 (CPP-D) 申请',
                '退伍军人事务福利协调',
              ],
            },
            {
              category: '私人保险索赔',
              items: [
                '扩展健康福利最大化',
                '长期护理保险协调',
                '人寿保险生活福利获取',
                '重大疾病保险索赔',
                '预授权和文件支持',
                '上诉和争议解决协助',
              ],
            },
            {
              category: '财务规划与协助',
              items: [
                '成本分析和护理预算规划',
                '税收抵免识别（医疗费用税收抵免、残疾税收抵免）',
                '付款计划和融资选项',
                '慈善基金会拨款申请',
                '设备租赁与购买分析',
                '护理成本与福利优化',
              ],
            },
          ],
          howItWorks: '初步咨询评估您的情况 → 我们识别所有符合条件的福利和资金来源 → 代表您完成并提交所有申请 → 跟进机构和保险公司 → 协调付款和报销 → 持续支持续期和上诉',
          whatWeHandle: [
            '申请表格和文件',
            '医疗评估和医生报告',
            '跟进电话和状态跟踪',
            '上诉和重新授权',
            '与提供商的付款协调',
            '年度续期和重新评估',
          ],
          pricing: [
            '初步评估：任何 Careby 护理套餐免费',
            '申请支持（每个项目）：$150-$300',
            '综合福利管理：$99/月（包括所有申请、索赔和持续支持）',
            '仅保险索赔：每次索赔提交 $50',
            '税收抵免协助：$200（一次性，年度）',
          ],
          idealFor: '符合政府项目的老年人 • 导航复杂福利系统的家庭 • 需要设备资金的术后患者 • 持续用药成本的慢性病患者 • 被医疗文书工作压倒的任何人',
        },
      },
    },
    technology: {
      sectionTitle: '为什么选择 CAREBY',
      title: '科技赋能护理。人文传递关怀。',
      subtitle: '大多数家庭护理公司仍停留在1995年：',
      oldWay: [
        '纸质时间表',
        '家人无法了解情况',
        '零健康监测',
        '被动（非主动）护理',
        '无医疗协调',
      ],
      newWay: [
        '实时家庭门户 - 随时了解情况',
        'AI跌倒检测 - 在紧急情况发生前预防',
        '集成远程医疗 - 几分钟内获得医疗访问',
        '再生医学 - 为未来保障您的健康',
        '黄金标准护理人员 - 只有最优秀的人才能通过',
        '完整协调 - 一个团队管理一切',
      ],
      result: '结果如何？更少的住院。更快的康复。更好的生活质量。家人的安心。',
      highlight1: 'AI算法识别健康风险并生成个性化方案',
      highlight2: '数据分析与健康预测报告',
      highlight3: '多语言支持（中 / 英 / 法）',
      highlight4: '医疗级隐私保护与认证服务商体系',
      flowTitle: '智慧健康流程',
      flowDesc: 'Careby AI将多模态数据整合进健康云，智能匹配医疗资源与护理服务。',
      step1: '用户',
      step2: 'AI健康云',
      step3: '医疗资源网络',
      step4: '医生 / 护理服务',
    },
    newSection: {
      title: '医疗止步于医院门口。这不应该。',
      intro: '您刚做完手术出院。或者您的父母跌倒了，您担心会再次发生。或者您正在管理慢性疾病，却几周都联系不上您的医生。',
      subtitle: '当前的系统已经崩溃：',
      problems: [
        '家庭护理机构派遣任何可用的人，培训最少，没有技术，也没有医疗协调。',
        '您只能独自处理后续护理、监测，以及知道何时出现问题，直到它变成紧急情况。',
        '预防性护理不存在——您只能等待跌倒发生、感染发展、病情恶化。',
        '抗衰老和长寿医学？祝您自己在这迷宫中好运。',
      ],
      solution: '您值得拥有真正有效的整合护理。',
      conclusion: '当您离开医院时，当您在家康复时，当您预防问题而不是被动应对时——这正是您最需要支持的时候。',
      cta: '这就是我们创建 Careby 的原因。',
    },
    platformSection: {
      title: '五大整合服务。一个无缝平台。',
      description: 'Careby 不是一个家庭护理机构。我们是一个完整的健康协调平台，结合专业护理人员、预测性 AI 技术、按需医疗访问和前沿长寿医学。',
      conclusion: '大多数机构提供护理人员。我们提供完整的健康生态系统。',
    },
    partners: {
      sectionTitle: '权威合作',
      title: '携手行业领军者，共建智慧医疗生态',
      subtitle: '我们与加拿大本地及国际领先医疗机构深度合作。',
      quote: 'Careby Platform 与 GoToDoctor 等合作伙伴共同打造快速医疗匹配系统，整合远程问诊、上门护理与健康管理服务，为用户提供安全高效的一站式解决方案。',
    },
    impact: {
      sectionTitle: '我们的愿景',
      title: '科技赋能健康生活',
      subtitle: '让每个家庭都能享受智慧、贴心的健康照护。',
      metric1: '服务覆盖人数',
      metric2: '平台认证护理师',
      metric3: '用户满意度',
      testimonial: 'Careby Platform 让我父母的术后照护更安心，我能实时在App中看到健康变化。',
      author: '— Anna, Toronto',
    },
    cta: {
      quote: '科技与关怀同行，让健康更近一步。',
      title: 'Careby Platform — 智慧医疗，让健康触手可及。',
      subtitle: 'Careby Platform — Smarter Healthcare, Closer to Home.',
      button: '马上体验',
    },
    footer: {
      copyright: '© 2025 Careby Platform | 智慧医疗，让健康触手可及。',
      address: '地址',
      contact: '联系方式',
      links: '链接',
      businessHours: '营业时间',
      home: '首页',
      aboutUs: '关于我们',
      ourServices: '我们的服务',
      partnerships: '合作伙伴',
      privacyPolicy: '隐私政策',
      termsOfService: '服务条款',
      phone: '电话',
      email: '邮箱',
      privacy: '隐私',
      billing: '账单',
      support247: '24/7 支持',
      emergencySupport: '24/7 紧急支持',
      allRightsReserved: '版权所有。在安大略省和加拿大获得许可和保险。',
      mondayFriday: '周一 - 周五',
      saturday: '周六',
      sunday: '周日',
    },
    faq: {
      sectionTitle: '常见问题',
      title: '常见问题',
    },
    membership: {
      sectionTitle: '会员等级',
      title: '选择您的护理级别',
      mostPopular: '最受欢迎',
      bookConsultation: '预约免费咨询',
    },
  },
}

const partners = [
  { 
    name: 'GoToDoctor', 
    logo: '/partners/gotodoctor.png',
    description: '24/7 telehealth consultations in English, Mandarin, and Cantonese'
  },
  { 
    name: 'HomeEquity Bank', 
    logo: '/partners/he-twocolour-large.png',
    description: 'Reverse mortgage options and financial planning'
  },
  { 
    name: 'Progenics', 
    logo: '/partners/Progenics.jpg',
    description: 'Regenerative medicine and advanced treatments'
  },
  { 
    name: 'Ebovir', 
    logo: '/partners/Ebovir .png', // File has a space in the name
    description: 'Advanced health solutions'
  },
]

const testimonials = [
  {
    name: 'Anna',
    location: 'Toronto',
    rating: 5,
    text: 'Careby Platform has made post-surgery care for my parents more reassuring. I can see health changes in the app in real time.',
    avatar: '/avatars/anna.jpg'
  },
  {
    name: 'Michael Chen',
    location: 'Vancouver',
    rating: 5,
    text: 'The AI health monitoring is incredible. It detected my irregular heartbeat before I even noticed symptoms.',
    avatar: '/avatars/michael.jpg'
  },
  {
    name: 'Sarah Johnson',
    location: 'Montreal',
    rating: 5,
    text: 'Professional caregivers and seamless communication. My elderly mother feels safe and cared for.',
    avatar: '/avatars/sarah.jpg'
  },
]
const contactInfo = {
  addressLines: ['Careby Solutions Inc.', '205 Placer Court, Suite 513', 'North York, ON M2H 0A9', 'Canada'],
  phone: '1-646-578-9920',
  email: 'hr@getcareby.ca',
  privacyEmail: 'privacy@getcareby.ca',
  billingEmail: 'billing@getcareby.ca',
  businessHours: [
    { label: 'Monday - Friday', value: '8:00 AM - 8:00 PM' },
    { label: 'Saturday', value: '9:00 AM - 5:00 PM' },
    { label: 'Sunday', value: '10:00 AM - 4:00 PM' },
  ],
}
const faqItems = {
  en: [
    {
      question: 'How much does Careby cost?',
      answer:
        'Our annual memberships range from $1,200 to $5,500 depending on the level of service. Individual services can also be purchased as needed without membership.',
    },
    {
      question: 'Do you only serve Chinese-speaking families?',
      answer:
        "No. We serve all Toronto families seeking premium senior care. Our caregivers and staff are equipped to serve diverse communities throughout the GTA, with particular expertise in English, Mandarin, and Cantonese.",
    },
    {
      question: 'How do you vet your PSWs?',
      answer:
        'Every caregiver goes through our Careby Gold Standard™ 10/10 vetting process including background checks, reference verification, skills assessment, reliability scoring, and ongoing performance monitoring.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We currently serve Toronto and the Greater Toronto Area (GTA).',
    },
    {
      question: 'How quickly can I get a caregiver?',
      answer:
        'Depending on availability and your specific needs, we can typically match you with a caregiver within 48-72 hours.',
    },
    {
      question: 'Is Careby covered by OHIP or insurance?',
      answer:
        'Most Careby services are private pay and not covered by OHIP. However, we help members navigate what benefits they do have and maximize coverage where available.',
    },
    {
      question: 'What makes Careby different?',
      answer:
        'Our rigorous Gold Standard vetting process, curated healthcare partnerships, membership model providing comprehensive support, and data-driven health monitoring (100+ datapoints per visit).',
    },
    {
      question: 'Can I meet my caregiver before committing?',
      answer: 'Yes, we facilitate introductory meetings to ensure the match is right for both you and your family member.',
    },
  ],
  zh: [
    {
      question: 'Careby 的费用是多少？',
      answer:
        '我们的年度会员费用从 $1,200 到 $5,500 不等，具体取决于服务级别。也可以根据需要单独购买服务，无需会员资格。',
    },
    {
      question: '你们只为中文家庭服务吗？',
      answer:
        '不是。我们为所有寻求优质老年护理的多伦多家庭服务。我们的护理人员和员工能够为整个大多伦多地区的多元化社区提供服务，特别擅长英语、普通话和粤语。',
    },
    {
      question: '你们如何审查护理人员？',
      answer:
        '每位护理人员都经过我们的 Careby 黄金标准™ 10/10 审查流程，包括背景调查、推荐人验证、技能评估、可靠性评分和持续绩效监控。',
    },
    {
      question: '你们服务哪些地区？',
      answer: '我们目前服务多伦多和大多伦多地区（GTA）。',
    },
    {
      question: '我多久能获得护理人员？',
      answer:
        '根据可用性和您的具体需求，我们通常可以在 48-72 小时内为您匹配护理人员。',
    },
    {
      question: 'Careby 是否由 OHIP 或保险覆盖？',
      answer:
        '大多数 Careby 服务是自费服务，不在 OHIP 覆盖范围内。但是，我们帮助会员了解他们拥有的福利，并在可用的情况下最大化覆盖范围。',
    },
    {
      question: 'Careby 有什么不同？',
      answer:
        '我们严格的黄金标准审查流程、精选的医疗保健合作伙伴关系、提供全面支持的会员模式，以及数据驱动的健康监测（每次访问 100+ 数据点）。',
    },
    {
      question: '我可以在承诺之前与护理人员见面吗？',
      answer: '是的，我们促进介绍性会议，以确保匹配对您和您的家人都合适。',
    },
  ],
}

function App() {
  const [lang, setLang] = useState<'en' | 'zh' | 'zh-TW'>('en')
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'about'>('home')
  
  // Get base content (English or Chinese)
  const contentLang = lang === 'en' ? 'en' : 'zh'
  const baseContent = content[contentLang]
  
  // Convert to traditional Chinese if needed
  const t = useMemo(() => {
    if (lang === 'zh-TW') {
      return convertObjectToTraditional(baseContent) as typeof content.en
    }
    return baseContent
  }, [lang, baseContent])

  // Map to proper lang codes for SEO
  const seoLang: 'en' | 'zh-CN' | 'zh-TW' = lang === 'en' ? 'en' : lang === 'zh-TW' ? 'zh-TW' : 'zh-CN'

  // Read page from URL hash on mount and when hash changes
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Remove the '#'
    if (hash === 'privacy' || hash === 'terms' || hash === 'about') {
      setCurrentPage(hash as 'privacy' | 'terms' | 'about')
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1)
      if (newHash === 'privacy' || newHash === 'terms' || newHash === 'about') {
        setCurrentPage(newHash as 'privacy' | 'terms' | 'about')
      } else if (newHash === '' || newHash === 'home') {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentPage === 'privacy') {
  return (
    <>
      <SEO
        title={seoLang === 'en' ? 'Privacy Policy - Careby' : '隐私政策 - Careby'}
        description={seoLang === 'en' ? 'Careby Privacy Policy - Learn how we protect your personal and health information in compliance with PIPEDA and Ontario healthcare regulations.' : 'Careby隐私政策 - 了解我们如何根据PIPEDA和安大略省医疗法规保护您的个人和健康信息。'}
        lang={seoLang}
        canonical="https://getcareby.ca/#privacy"
      />
      <div className="min-h-screen w-full bg-soft text-midnight relative">
        <LanguageSwitcher lang={lang} setLang={setLang} />
          <PrivacyPolicyPage onBack={() => {
            setCurrentPage('home')
            window.location.hash = ''
          }} />
          <Footer setCurrentPage={setCurrentPage} t={t as typeof content.en} />
        </div>
      </>
    )
  }

  if (currentPage === 'terms') {
    return (
      <>
        <SEO
          title={seoLang === 'en' ? 'Terms of Service - Careby' : '服务条款 - Careby'}
          description={seoLang === 'en' ? 'Careby Terms of Service - Read our membership terms, cancellation policies, and service agreements for home care services in Ontario.' : 'Careby服务条款 - 阅读我们在安大略省提供家庭护理服务的会员条款、取消政策和服务协议。'}
          lang={seoLang}
          canonical="https://getcareby.ca/#terms"
        />
        <div className="min-h-screen w-full bg-soft text-midnight relative">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <TermsOfServicePage onBack={() => {
            setCurrentPage('home')
            window.location.hash = ''
          }} />
          <Footer setCurrentPage={setCurrentPage} t={t as typeof content.en} />
        </div>
      </>
    )
  }

  if (currentPage === 'about') {
    return (
      <>
        <SEO
          title={seoLang === 'en' ? 'About Us - Careby' : '关于我们 - Careby'}
          description={seoLang === 'en' ? 'Learn about Careby Solutions Inc. - Our mission to provide premium home care services and health navigation for Toronto seniors and families.' : '了解Careby Solutions Inc. - 我们致力于为多伦多老年人和家庭提供优质家庭护理服务和健康导航。'}
          lang={seoLang}
          canonical="https://getcareby.ca/#about"
        />
        <div className="min-h-screen w-full bg-soft text-midnight relative">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <AboutUsPage onBack={() => setCurrentPage('home')} />
          <Footer setCurrentPage={setCurrentPage} t={t as typeof content.en} />
        </div>
      </>
    )
  }

  // Get FAQ items for current language
  const currentFAQs = faqItems[lang === 'zh-TW' ? 'zh' : lang] || faqItems.en
  
  // Prepare testimonials for Review Schema (add datePublished if missing)
  const testimonialsWithDates = testimonials.map(t => ({
    ...t,
    datePublished: new Date().toISOString().split('T')[0] // Use current date as fallback
  }))
  
  return (
    <>
      <SEO
        lang={seoLang}
        canonical="https://getcareby.ca/"
        structuredData={generateHomepageSchema(seoLang, currentFAQs, testimonialsWithDates)}
      />
      <div className="min-h-screen w-full bg-soft text-midnight relative">
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <HeroSection t={t as typeof content.en} lang={lang} />
        {/* Temporarily hidden - uncomment to restore */}
        {/* <NewSection t={t as typeof content.en} lang={lang} /> */}
        {/* <PlatformSection t={t as typeof content.en} lang={lang} /> */}
        <ServiceSection t={t as typeof content.en} lang={lang} />
        <TechnologySection t={t as typeof content.en} lang={lang} onHowItWorks={() => setShowHowItWorks(true)} />
        <PartnersSection t={t as typeof content.en} />
        <ImpactSection t={t as typeof content.en} />
        <MembershipTiersSection t={t as typeof content.en} lang={lang} />
        <FAQSection t={t as typeof content.en} lang={lang} />
        <FinalCTASection t={t as typeof content.en} />
        <Footer setCurrentPage={setCurrentPage} t={t as typeof content.en} />
      </div>

      <AnimatePresence>
        {showComingSoon && <ComingSoon onClose={() => setShowComingSoon(false)} />}
        {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} lang={lang} />}
      </AnimatePresence>
      
      {/* AI Chatbot - Desktop: bottom-right, Mobile: bottom-right (alongside CTA) */}
      {/* <AIChatbot lang={lang} /> */}
      
      {/* Elfsight AI Chatbot | Careby Assistant */}
      <div className="elfsight-app-a97596aa-6ea7-4ebd-b608-a9f22fc19f4d" data-elfsight-app-lazy></div>
      
      {/* Voice Input Button for Elfsight Chatbot - Hidden */}
      {/* <VoiceInputButton lang={lang} /> */}
      
      {/* Fixed button for mobile - outside all containers to ensure it sticks at bottom */}
      {/* Updated to work alongside AI Chatbot button with 15px gap */}
      <a
        href="https://app.getcareby.ca/"
        className="animated-gradient-button fixed bottom-[30px] left-[30px] z-[9999] sm:hidden inline-flex items-center justify-center px-7 py-4 text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-full"
        style={{ 
          position: 'fixed', 
          bottom: '30px', 
          left: '30px', 
          right: 'auto', 
          width: 'calc(100vw - 30px - 56px - 15px - 30px)' // left margin - AI button width - gap - right margin
        }}
        onFocus={(e) => {
          e.currentTarget.style.outlineColor = '#3B8C75'
        }}
      >
        <span className="sparkle"></span>
        <span className="sparkle"></span>
        <span className="sparkle"></span>
        <span className="sparkle"></span>
        <span className="sparkle"></span>
        <span className="relative z-10">
          {lang === 'en' ? 'Free Consultation' : lang === 'zh' ? '免费咨询' : '免費諮詢'}
        </span>
      </a>
    </>
  )
}


function LanguageSwitcher({ lang, setLang }: { lang: 'en' | 'zh' | 'zh-TW', setLang: (lang: 'en' | 'zh' | 'zh-TW') => void }) {
  const getNextLang = () => {
    if (lang === 'en') return 'zh'
    if (lang === 'zh') return 'zh-TW'
    return 'en'
  }

  const getLangLabel = () => {
    if (lang === 'en') return '简体中文'
    if (lang === 'zh') return '繁體中文'
    return 'English'
  }

  return (
    <div className="absolute right-6 top-6 z-50 flex items-center gap-3">
      {!contactInfo.phone.includes('XXX') && (
        <a
          href={`tel:+1${contactInfo.phone.replace(/\D/g, '')}`}
          className="rounded-full border border-white/30 bg-white/10 p-2.5 text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Call Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>
      )}
      <button
        onClick={() => setLang(getNextLang())}
        className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {getLangLabel()}
      </button>
    </div>
  )
}

function HeroSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const typingWords = {
    en: ['Heart', 'Professionals', 'People', 'Speed', 'Innovation', 'Respect', 'Love'],
    zh: ['爱心', '专业人士', '人们', '速度', '创新', '尊重', '关爱'],
    'zh-TW': ['愛心', '專業人士', '人們', '速度', '創新', '尊重', '關愛'],
  }
  const currentTypingWords = typingWords[lang] || typingWords.en
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState(currentTypingWords[2] || 'People')
  const [isDeleting, setIsDeleting] = useState(false)
  // Adjust speed based on language: Chinese needs slower speed
  const baseTypingSpeed = lang === 'zh' ? 250 : 150
  const baseDeletingSpeed = lang === 'zh' ? 150 : 100
  const [typingSpeed, setTypingSpeed] = useState(baseTypingSpeed)
  const [isInitial, setIsInitial] = useState(true)
  const [videoPosition, setVideoPosition] = useState('center 20%')
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const [isWeChat, setIsWeChat] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Detect WeChat browser
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isWeChatBrowser = /micromessenger/i.test(ua)
    setIsWeChat(isWeChatBrowser)
  }, [])

  // Handle video playback for WeChat browser and mobile devices
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Reset video state
    setVideoCanPlay(false)

    // Detect mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    // Ensure video is muted for autoplay (required by browsers)
    video.muted = true
    video.setAttribute('muted', 'true')
    video.volume = 0 // Also set volume to 0
    
    // Set mobile-specific attributes for inline playback
    if (isMobile || isWeChat) {
      video.setAttribute('webkit-playsinline', 'true')
      video.setAttribute('playsinline', 'true')
      video.setAttribute('x5-playsinline', 'true')
      video.setAttribute('x5-video-player-type', 'h5')
      video.setAttribute('x5-video-player-fullscreen', 'false')
    }

    // Ensure no controls are shown - do this aggressively
    video.controls = false
    video.removeAttribute('controls')
    video.setAttribute('playsinline', 'true') // Critical for iOS
    
    // Remove any play button overlays
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x-webkit-airplay', 'deny')
    
    // Force remove controls repeatedly to ensure they stay hidden
    const removeControls = () => {
      video.controls = false
      video.removeAttribute('controls')
      // Remove any overlay elements that might show play button
      const overlays = video.querySelectorAll('*')
      overlays.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none'
        }
      })
    }
    
    // Remove controls immediately and on various events
    removeControls()
    video.addEventListener('loadstart', removeControls)
    video.addEventListener('loadedmetadata', removeControls)
    video.addEventListener('loadeddata', removeControls)

    // Aggressive autoplay function - try multiple times
    let playAttempts = 0
    const maxPlayAttempts = 100 // Try up to 100 times (10 seconds)
    let isPlaying = false
    
    const tryPlay = async () => {
      if (isPlaying || !video.paused) {
        setVideoCanPlay(true)
        return true
      }
      
      if (video.readyState < 2) {
        // Video not ready yet
        return false
      }
      
      try {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          isPlaying = true
          setVideoCanPlay(true)
          return true
        }
      } catch (error) {
        // If autoplay fails, continue trying
        playAttempts++
        return false
      }
      return false
    }

    // Show video when it's ready to play - even if autoplay fails
    const handleLoadedData = () => {
      // Show video immediately when data is loaded, even if not playing
      setVideoCanPlay(true)
      if (isMobile || isWeChat) {
        tryPlay()
      }
    }

    const handleCanPlay = () => {
      // Show video immediately when it can play, even if not playing
      setVideoCanPlay(true)
      tryPlay()
    }

    const handleCanPlayThrough = () => {
      // Video can play through without buffering - show it and try to play
      setVideoCanPlay(true)
      tryPlay()
    }

    const handlePlaying = () => {
      // Video is actually playing now
      isPlaying = true
      setVideoCanPlay(true)
    }

    const handlePlay = () => {
      // Video started playing
      isPlaying = true
      setVideoCanPlay(true)
    }

    const handlePause = () => {
      isPlaying = false
    }

    const handleError = () => {
      setVideoCanPlay(false)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    // For mobile devices, aggressively try to play
    if (isMobile || isWeChat) {
      // Show video as soon as it has data, even if not playing
      const showVideoInterval = setInterval(() => {
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
          setVideoCanPlay(true)
          clearInterval(showVideoInterval)
        }
      }, 50) // Check every 50ms

      // Try to play repeatedly with requestAnimationFrame for better timing
      let rafId: number | null = null
      const tryPlayWithRAF = () => {
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
          tryPlay()
        }
        if (!isPlaying && playAttempts < maxPlayAttempts) {
          rafId = requestAnimationFrame(tryPlayWithRAF)
        }
      }
      
      // Start trying to play when video is ready
      const playInterval = setInterval(() => {
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
          if (!isPlaying && rafId === null) {
            rafId = requestAnimationFrame(tryPlayWithRAF)
          }
          if (isPlaying || playAttempts >= maxPlayAttempts) {
            clearInterval(playInterval)
            if (rafId !== null) {
              cancelAnimationFrame(rafId)
            }
          }
        }
      }, 50) // Check every 50ms

      // Also try on page visibility change (when user switches back to tab)
      const handleVisibilityChange = () => {
        if (!document.hidden && video.readyState >= 2) {
          tryPlay()
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      // Try on first user interaction (as fallback)
      if (!userInteracted) {
        const handleUserInteraction = () => {
          setUserInteracted(true)
          tryPlay()
        }
        document.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true })
        document.addEventListener('click', handleUserInteraction, { once: true })
        document.addEventListener('scroll', handleUserInteraction, { once: true, passive: true })
        document.addEventListener('touchend', handleUserInteraction, { once: true, passive: true })
        document.addEventListener('mousedown', handleUserInteraction, { once: true })
        
        return () => {
          clearInterval(showVideoInterval)
          clearInterval(playInterval)
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
          }
          video.removeEventListener('loadeddata', handleLoadedData)
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('canplaythrough', handleCanPlayThrough)
          video.removeEventListener('playing', handlePlaying)
          video.removeEventListener('play', handlePlay)
          video.removeEventListener('pause', handlePause)
          video.removeEventListener('error', handleError)
          document.removeEventListener('visibilitychange', handleVisibilityChange)
          document.removeEventListener('touchstart', handleUserInteraction)
          document.removeEventListener('click', handleUserInteraction)
          document.removeEventListener('scroll', handleUserInteraction)
          document.removeEventListener('touchend', handleUserInteraction)
          document.removeEventListener('mousedown', handleUserInteraction)
        }
      }

      return () => {
        clearInterval(showVideoInterval)
        clearInterval(playInterval)
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('canplaythrough', handleCanPlayThrough)
        video.removeEventListener('playing', handlePlaying)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('error', handleError)
      }
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [isWeChat, userInteracted])

  useEffect(() => {
    // Use requestAnimationFrame to batch DOM reads/writes and avoid forced reflow
    let rafId: number | null = null
    
    const updateVideoPosition = () => {
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        // Batch DOM reads
        const width = window.innerWidth
        if (width < 640) {
          setVideoPosition('calc(50% - 100px) 20%')
        } else {
          setVideoPosition('center 20%')
        }
        
        // Batch DOM writes
        if (buttonRef.current) {
          if (width >= 640) {
            buttonRef.current.style.marginTop = '20px'
          } else {
            buttonRef.current.style.marginTop = '0'
          }
        }
      })
    }
    
    // Initial update
    updateVideoPosition()
    
    // Throttle resize events to avoid excessive reflows
    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateVideoPosition, 150)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(resizeTimeout)
    }
  }, [buttonRef])

  // Reset when language changes
  useEffect(() => {
    setCurrentWordIndex(0)
    setDisplayText(currentTypingWords[2] || 'People')
    setIsDeleting(false)
    setTypingSpeed(baseTypingSpeed)
    setIsInitial(true)
  }, [lang])

  useEffect(() => {
    // Initial delay before starting typing effect
    if (isInitial) {
      const initialDelay = lang === 'zh' ? 4000 : 3000
      const initialTimer = setTimeout(() => {
        setIsInitial(false)
        setIsDeleting(true)
      }, initialDelay) // Show initial word longer for Chinese
      return () => clearTimeout(initialTimer)
    }

    const currentWord = currentTypingWords[currentWordIndex]
    if (!currentWord) return
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1))
          setTypingSpeed(baseTypingSpeed)
        } else {
          // Finished typing, wait then start deleting
          const waitTime = lang === 'zh' ? 3000 : 2000
          setTimeout(() => setIsDeleting(true), waitTime)
          setTypingSpeed(baseDeletingSpeed)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1))
          setTypingSpeed(baseDeletingSpeed)
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % currentTypingWords.length)
          setTypingSpeed(baseTypingSpeed)
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWordIndex, typingSpeed, isInitial, lang, currentTypingWords, baseTypingSpeed, baseDeletingSpeed])

  return (
    <section
      id="hero"
      className="relative px-6 pb-32 pt-6 text-soft sm:px-10 md:px-16 lg:px-24 sm:pt-20 min-h-screen sm:min-h-[60vh] pb-24 sm:pb-32 sm:overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Video */}
      <div className="absolute inset-0 bg-midnight overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoCanPlay ? 'opacity-100' : 'opacity-0'}`}
          style={{
            objectPosition: videoPosition,
            opacity: videoCanPlay ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback background color overlay */}
        <div className="absolute inset-0 bg-midnight/30" />
      </div>
      
      {/* Header with Logo */}
      <div className="absolute top-6 left-6 right-6 mx-auto max-w-6xl flex justify-between items-center z-40 sm:relative sm:top-auto sm:left-auto sm:right-auto sm:mx-auto sm:mb-8 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center"
        >
          <img 
            src={lang === 'en' ? "/carebylogo_white.svg" : "/logo-zh.png"} 
            alt={lang === 'en' ? "Careby Solutions Inc. - Premium Home Care Services in Toronto and Ontario" : "康伴解决方案 - 多伦多和安大略省高端家庭护理服务"} 
            className="h-11 w-auto sm:h-[70px]"
            itemProp="logo"
          />
        </motion.div>
        {/* Spacer to align with right side buttons (phone icon + language switcher ~120px) */}
        <div className="w-[120px] sm:w-0"></div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 sm:gap-12 lg:gap-16 lg:flex-row lg:items-center mt-[60px] sm:mt-20 lg:mt-[100px]">
        <motion.div
          className="text-balance lg:max-w-xl absolute top-[calc(50%+165px)] left-[-10px] right-0 -translate-y-1/2 px-6 pb-[100px] sm:relative sm:top-auto sm:translate-y-0 sm:left-auto sm:px-0 sm:pb-0 [&>*:not(:last-child)]:mb-6 sm:[&>*:not(:last-child)]:mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className={`block text-yellow-400 text-sm font-medium tracking-wide text-left mt-[10px] mb-[-10px] ${lang !== 'en' ? 'leading-tight' : ''}`}>
            {lang === 'en' ? (
              <>
                Smarter Healthcare<br />Closer to Home
              </>
            ) : (
              <span className="block">{t.hero.tagline}</span>
            )}
          </span>
          <h1
            id="hero-heading"
            className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            itemProp="headline"
          >
            {lang === 'en' ? (
              <>
                <span className="whitespace-nowrap">
                  {t.hero.headlinePrefix}{' '}
                  <span className="relative inline-block min-w-[180px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] text-left">
                    <span className="hand-drawn-underline">
                      {displayText}
                    </span>
                    {!isInitial && (
                      <span className="inline-block w-0.5 h-5 sm:h-6 bg-yellow-400 ml-1 animate-pulse" />
                    )}
                  </span>
                </span>
                {' '}
                <span className="whitespace-normal break-words">
                  {t.hero.headlineSuffix}
                </span>
              </>
            ) : (
              <>
                <span className="block">
                  {t.hero.headlinePrefix}
                  <span className="relative inline-block mx-1 text-left">
                    <span className="hand-drawn-underline">
                      {displayText}
                    </span>
                    {!isInitial && (
                      <span className="inline-block w-0.5 h-5 sm:h-6 bg-yellow-400 ml-1 animate-pulse" />
                    )}
                  </span>
                </span>
                <span className="block">
                  {t.hero.headlineSuffix}
                </span>
              </>
            )}
          </h1>
          <p className="text-base text-white/85 sm:text-lg lg:text-xl mb-6 sm:mb-[87px]">
            {t.hero.subheadline}
          </p>
          <a
            ref={buttonRef}
            href="https://app.getcareby.ca/"
            className="animated-gradient-button sm:inline-flex sm:items-center sm:justify-center hidden sm:inline-flex items-center justify-center px-7 py-4 sm:px-7 sm:py-3 text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto rounded-full sm:!mt-5"
            onFocus={(e) => {
              e.currentTarget.style.outlineColor = '#3B8C75'
            }}
          >
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="relative z-10">{t.hero.ctaPrimary}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}


function ServiceModal({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: typeof content.en.services.service1 | typeof content.en.services.service2 | typeof content.en.services.service3 | typeof content.en.services.service4 | typeof content.en.services.service5 | typeof content.en.services.service6 | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!service || !service.details) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              className="relative max-h-[90vh] w-full max-w-4xl rounded-3xl bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-600 shadow-lg transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>

              {/* Content */}
              <div className="max-h-[90vh] overflow-y-auto p-8 sm:p-12">
                <h2 className="mb-2 text-3xl font-semibold text-midnight">
                  {service.title}
                </h2>
                {service.subtitle && (
                  <p className="mb-8 text-lg text-primary">
                    {service.subtitle}
                  </p>
                )}

                {/* Problem Section - for service1 */}
                {('problem' in service.details && service.details.problem) ? (
                  <div className="mb-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      {(service.details.problem as { title: string; items: string[] }).title}
                    </h3>
                    <ul className="space-y-2">
                      {((service.details.problem as { title: string; items: string[] }).items as string[]).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-slate-700">
                          <span className="mt-1 text-red-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Solutions Section - for service1 */}
                {('solutions' in service.details && service.details.solutions) ? (
                  <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      {(service.details.solutions as { title: string; items: string[] }).title}
                    </h3>
                    <ul className="space-y-3">
                      {((service.details.solutions as { title: string; items: string[] }).items as string[]).map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700">
                          <span className="mt-0.5 text-green-600 font-bold">✅</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Real Example Section - for service1 */}
                {('realExample' in service.details && service.details.realExample) ? (
                  <div className="mb-8 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-midnight">
                      Real Example:
                    </h3>
                    <p className="text-lg font-medium text-slate-700">{String(service.details.realExample)}</p>
                  </div>
                ) : null}

                {/* Result Section - for service1 */}
                {('result' in service.details && service.details.result) ? (
                  <div className="mb-8 rounded-2xl border-2 border-green-200 bg-green-50 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-midnight">
                      The Result:
                    </h3>
                    <p className="text-lg font-medium text-slate-700">{String(service.details.result)}</p>
                  </div>
                ) : null}

                {/* Services Section - for service3, service4, service5 */}
                {'services' in service.details && service.details.services && !('problem' in service.details) && (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      {service.details.services[0]?.category === 'Services available' ? 'Services available:' : 'Our services include:'}
                    </h3>
                    <div className="space-y-6">
                      {service.details.services.map((category, index) => (
                        <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                          <h4 className="mb-3 text-lg font-semibold text-primary">
                            {category.category}:
                          </h4>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2 text-slate-700">
                                <span className="mt-1 text-primary">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* How It Works - for service2, service3 */}
                {'howItWorks' in service.details && service.details.howItWorks && (
                  <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      How it works:
                    </h3>
                    {Array.isArray(service.details.howItWorks) ? (
                      <ul className="space-y-3">
                        {(service.details.howItWorks as string[]).map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-slate-700">
                            <span className="mt-1 text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-700">{String(service.details.howItWorks)}</p>
                    )}
                  </div>
                )}

                {/* What We Monitor - for service2 */}
                {(() => {
                  const details = service.details as any
                  if (!('whatWeMonitor' in details) || !details.whatWeMonitor || !Array.isArray(details.whatWeMonitor)) {
                    return null
                  }
                  const items: string[] = details.whatWeMonitor as string[]
                  return (
                    <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <h3 className="mb-4 text-xl font-semibold text-midnight">
                        What we monitor:
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {items.map((item: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="mt-0.5 text-primary">✓</span>
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) as any
                })() as any}

                {/* Family Portal - for service2 */}
                {('familyPortal' in service.details && service.details.familyPortal) ? (
                  <div className="mb-8 rounded-2xl border-2 border-accent/20 bg-accent/5 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-midnight">
                      Family Portal Access:
                    </h3>
                    <p className="text-slate-700">{String(service.details.familyPortal)}</p>
                  </div>
                ) : null}

                {/* Languages - for service3 */}
                {'languages' in service.details && service.details.languages && (
                  <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-midnight">
                      Languages:
                    </h3>
                    <p className="text-slate-700">{String(service.details.languages)}</p>
                  </div>
                )}

                {/* Why Bank - for service4 */}
                {'whyBank' in service.details && service.details.whyBank && (
                  <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-midnight">
                      Why bank now?
                    </h3>
                    <p className="text-slate-700">{String(service.details.whyBank)}</p>
                  </div>
                )}

                {/* Coming Soon - for service4 */}
                {'comingSoon' in service.details && service.details.comingSoon && (
                  <div className="mb-8 rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-midnight">
                      Coming soon:
                    </h3>
                    <p className="text-slate-700">{String(service.details.comingSoon)}</p>
                  </div>
                )}

                {/* Integrated Platform - for service5 (old structure) */}
                {'integratedPlatform' in service.details && service.details.integratedPlatform && (
                  <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      Integrated Data Platform:
                    </h3>
                    <p className="mb-4 text-slate-700">{String(service.details.integratedPlatform)}</p>
                    {(() => {
                      const details = service.details as any
                      if ('platformFeatures' in details && details.platformFeatures && Array.isArray(details.platformFeatures)) {
                        return (
                          <ul className="space-y-2">
                            {(details.platformFeatures as string[]).map((feature: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-slate-700">
                                <span className="mt-1 text-primary">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )
                      }
                      return null
                    })()}
                  </div>
                )}

                {/* Differentiators Section - for service1 (old structure) */}
                {'differentiators' in service.details && service.details.differentiators && Array.isArray(service.details.differentiators) && (
                  <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      What makes us different:
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.details.differentiators.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="mt-0.5 text-yellow-400">✅</span>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What We Handle - for service6 */}
                {'whatWeHandle' in service.details && service.details.whatWeHandle && Array.isArray(service.details.whatWeHandle) && (
                  <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="mb-4 text-xl font-semibold text-midnight">
                      What we handle for you:
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.details.whatWeHandle.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ideal For - for service2, service4, service6 */}
                {'idealFor' in service.details && service.details.idealFor && (
                  <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-midnight">
                      Ideal for:
                    </h3>
                    <p className="text-slate-700">{service.details.idealFor}</p>
                  </div>
                )}

                {/* Pricing Section */}
                {'pricing' in service.details && service.details.pricing && (
                <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-white via-primary/5 to-accent/5 p-8 shadow-lg">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-primary">payments</span>
                    <h3 className="text-2xl font-bold text-midnight">
                      Pricing
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.details.pricing.map((price, index) => {
                      // Split by | if it contains multiple price options
                      const priceParts = price.split('|').map(p => p.trim())
                      
                      return (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-primary/5" />
                          <div className="relative">
                            {priceParts.map((part, partIndex) => {
                              // Extract price range (e.g., $35-$45/hour)
                              const priceRangeMatch = part.match(/(\$[\d,]+(?:-\$[\d,]+)?(?:\/hour|\/day)?)/)
                              const priceRange = priceRangeMatch?.[0] || ''
                              const description = part.replace(priceRange, '').replace(/^[:\s]+|[:\s]+$/g, '').trim()
                              
                              return (
                                <div key={partIndex} className={partIndex > 0 ? 'mt-3 border-t border-slate-100 pt-3' : ''}>
                                  <div className="mb-2 flex flex-wrap items-baseline gap-2">
                                    {priceRange && (
                                      <span className="text-2xl font-bold text-primary">
                                        {priceRange}
                                      </span>
                                    )}
                                  </div>
                                  {description && (
                                    <p className="text-sm font-medium text-slate-600">
                                      {description}
                                    </p>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-primary">Note:</span> All prices are in CAD. Custom packages available upon request.
                    </p>
                  </div>
                </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function HowItWorksModal({ onClose, lang }: { onClose: () => void, lang: 'en' | 'zh' | 'zh-TW' }) {
  const isEnglish = lang === 'en'
  const steps = isEnglish ? [
    {
      step: 1,
      title: 'Free Consultation (20 minutes)',
      description: "Tell us your needs, health situation, and preferences. We'll recommend the right combination of services.",
    },
    {
      step: 2,
      title: 'Care Plan & Matching (24-48 hours)',
      description: "Our clinical team designs your personalized care plan. We match you with Gold Standard caregivers who fit your needs and language preferences.",
    },
    {
      step: 3,
      title: 'Technology Setup (If applicable)',
      description: 'Fall detection sensors installed. Family portal activated. Telehealth access configured.',
    },
    {
      step: 4,
      title: 'Care Begins',
      description: 'Your caregiver starts. Monitoring begins. Medical team is looped in. You get real-time updates.',
    },
    {
      step: 5,
      title: 'Ongoing Coordination',
      description: 'We adjust as needs change. Monitor health trends. Coordinate with doctors. Keep family informed.',
    },
  ] : [
    {
      step: 1,
      title: '免费咨询（20分钟）',
      description: '告诉我们您的需求、健康状况和偏好。我们将推荐合适的服务组合。',
    },
    {
      step: 2,
      title: '护理计划与匹配（24-48小时）',
      description: '我们的临床团队设计您的个性化护理计划。我们为您匹配符合您需求和语言偏好的黄金标准护理人员。',
    },
    {
      step: 3,
      title: '技术设置（如适用）',
      description: '安装跌倒检测传感器。激活家庭门户。配置远程医疗访问。',
    },
    {
      step: 4,
      title: '开始护理',
      description: '您的护理人员开始工作。监测开始。医疗团队参与。您获得实时更新。',
    },
    {
      step: 5,
      title: '持续协调',
      description: '我们根据需求变化进行调整。监测健康趋势。与医生协调。保持家人知情。',
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <motion.div
          className="relative max-h-[90vh] w-full max-w-4xl rounded-3xl bg-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-600 shadow-lg transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Content */}
          <div className="max-h-[90vh] overflow-y-auto p-8 sm:p-12">
            <h2 className="mb-8 text-3xl font-bold text-midnight">
              {lang === 'en' ? 'HOW IT WORKS' : '运作方式'}
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative flex gap-6 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 p-6 transition hover:border-primary/40 hover:shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Step Number */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white shadow-lg">
                    {step.step}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-midnight">
                      {step.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 h-6 w-0.5 bg-gradient-to-b from-primary to-accent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

// @ts-ignore - Temporarily hidden component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NewSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const scenarios = [
    { icon: 'local_hospital', text: lang === 'en' ? 'Post-Surgery Discharge' : '术后出院' },
    { icon: 'elderly_woman', text: lang === 'en' ? 'Fall Prevention Concerns' : '跌倒担忧' },
    { icon: 'medication', text: lang === 'en' ? 'Chronic Condition Management' : '慢性病管理' },
  ]

  const problemIcons = ['person_off', 'shield_with_heart', 'warning', 'spa']

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-red-500 blur-3xl" style={{ animationDuration: '4s' }} />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-primary blur-3xl" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {/* Main Title */}
          <motion.h2
            variants={fadeUp}
            className="mb-8 text-center text-3xl font-bold leading-tight text-midnight lg:text-5xl"
          >
            {t.newSection.title}
          </motion.h2>

          {/* Scenarios Cards */}
          <motion.div
            variants={fadeUp}
            className="mb-16 grid gap-6 md:grid-cols-3"
          >
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all hover:border-red-300 hover:shadow-md"
              >
                <div className="mb-4">
                  <span className="material-symbols-outlined text-5xl text-red-600" style={{ fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 48' }}>
                    {scenario.icon}
                  </span>
                </div>
                <p className="text-lg font-medium text-midnight">{scenario.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Intro Text */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-16 max-w-4xl text-center text-lg leading-relaxed text-slate-700 lg:text-xl"
          >
            {t.newSection.intro}
          </motion.p>

          {/* Problems Section - Grid Layout */}
          <motion.div variants={fadeUp} className="mb-16">
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full bg-red-50 px-6 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200">
                {t.newSection.subtitle}
              </span>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {t.newSection.problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-red-200 bg-red-50/50 p-6 transition-all hover:border-red-300 hover:shadow-md"
                >
                  {/* Icon - No Background */}
                  <div className="mb-4">
                    <span className="material-symbols-outlined text-5xl text-red-600" style={{ fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 48' }}>
                      {problemIcons[index]}
                    </span>
                  </div>
                  
                  {/* Problem Text */}
                  <p className="text-base leading-relaxed text-slate-800 lg:text-lg">
                    {problem}
                  </p>
                  
                  {/* Decorative Corner */}
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-100/30 blur-2xl transition-all group-hover:bg-red-100/50" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="mb-16 flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="mx-4 text-3xl text-primary">→</span>
            <div className="h-px w-16 bg-gradient-to-r from-primary via-accent to-transparent" />
          </motion.div>

          {/* Solution Section */}
          <motion.div
            variants={fadeUp}
            className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-1 shadow-lg"
          >
            <div className="rounded-3xl bg-white p-8 lg:p-12">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
                  <span className="material-symbols-outlined text-5xl text-white">
                    verified
                  </span>
                </div>
              </div>
              
              {/* Solution Text */}
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mb-6 text-center text-2xl font-semibold text-primary lg:text-3xl"
              >
                {t.newSection.solution}
              </motion.p>
              
              {/* Conclusion */}
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-slate-700 lg:text-xl"
              >
                {t.newSection.conclusion}
              </motion.p>
            </div>
          </motion.div>

          {/* CTA with Icon */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
              <span className="material-symbols-outlined text-3xl text-white">
                favorite
              </span>
            </div>
            <p className="text-2xl font-bold text-primary lg:text-3xl">
              {t.newSection.cta}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// @ts-ignore - Temporarily hidden component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PlatformSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const services = [
    { 
      icon: 'elderly', 
      label: lang === 'en' ? 'Pro-caregivers' : '专业护理人员',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: 'sensors', 
      label: lang === 'en' ? 'Predictive AI' : '预测性 AI',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: 'health_and_safety', 
      label: lang === 'en' ? 'On-Demand Medical' : '按需医疗',
      color: 'from-primary to-accent'
    },
    { 
      icon: 'spa', 
      label: lang === 'en' ? 'Longevity Medicine' : '长寿医学',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: 'integration_instructions', 
      label: lang === 'en' ? 'Care Coordination' : '护理协调',
      color: 'from-orange-500 to-amber-600'
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary py-20 lg:py-32">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[15%] top-[60%] h-48 w-48 rounded-full bg-white/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[60%] h-56 w-56 rounded-full bg-accent/20 blur-3xl"
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#ffffff15,transparent)]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="mb-8 text-center text-3xl font-bold text-white lg:text-5xl"
          >
            {t.platformSection.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-16 max-w-4xl text-center text-lg leading-relaxed text-white/90 lg:text-xl"
          >
            {t.platformSection.description}
          </motion.p>

          {/* Services - Hexagon Layout */}
          <div className="relative mb-20">
            {/* Center Platform Circle with Simple Orbiting System */}
            <div className="relative mx-auto mb-12 h-[400px] w-[400px] lg:h-[480px] lg:w-[480px]">
              {/* Orbit Rings (perfect circles) */}
              <div className="absolute inset-0">
                {/* Outer Orbit Ring */}
                <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20 lg:h-[460px] lg:w-[460px]" />
                {/* Middle Orbit Ring */}
                <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20 lg:h-[360px] lg:w-[360px]" />
                {/* Inner Orbit Ring */}
                <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20 lg:h-[260px] lg:w-[260px]" />
              </div>

              {/* Orbiting Satellites Container */}
              <div className="absolute inset-0">
                {/* Outer Orbit - 6 satellites */}
                {[0, 60, 120, 180, 240, 300].map((startAngle, i) => (
                  <motion.div
                    key={`outer-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      rotate: [startAngle, startAngle + 360],
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="h-3 w-3 rounded-full bg-yellow-400 blur-sm shadow-lg shadow-yellow-400/50 lg:h-4 lg:w-4"
                      style={{
                        position: 'absolute',
                        left: '190px',
                        top: '-6px',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  </motion.div>
                ))}

                {/* Middle Orbit - 5 satellites (reverse) */}
                {[0, 72, 144, 216, 288].map((startAngle, i) => (
                  <motion.div
                    key={`middle-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      rotate: [startAngle, startAngle - 360],
                    }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="h-2.5 w-2.5 rounded-full bg-cyan-400 blur-sm shadow-lg shadow-cyan-400/50 lg:h-3 lg:w-3"
                      style={{
                        position: 'absolute',
                        left: '150px',
                        top: '-5px',
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  </motion.div>
                ))}

                {/* Inner Orbit - 4 satellites */}
                {[0, 90, 180, 270].map((startAngle, i) => (
                  <motion.div
                    key={`inner-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      rotate: [startAngle, startAngle + 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="h-2 w-2 rounded-full bg-white blur-sm shadow-lg shadow-white/50"
                      style={{
                        position: 'absolute',
                        left: '110px',
                        top: '-4px',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Main Planet Circle - Background Element with Float Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute z-0 flex h-48 w-48 items-center justify-center rounded-full bg-white/30 backdrop-blur-md lg:h-56 lg:w-56"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: ['-50%', '-48%', '-52%', '-50%'],
                  y: ['-50%', '-48%', '-52%', '-50%'],
                  scale: [1, 1.02, 0.98, 1],
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="text-center">
                  <span className="material-symbols-outlined mb-2 text-5xl text-white/60 lg:text-6xl">
                    hub
                  </span>
                  <p className="text-sm font-bold text-white/70 lg:text-base">
                    {lang === 'en' ? 'CAREBY' : 'CAREBY'}
                  </p>
                  <p className="text-xs text-white/50 lg:text-sm">
                    {lang === 'en' ? 'Platform' : '平台'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Services Cards - Positioned around center */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  {/* Card - Glassmorphism */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl transition-all group-hover:bg-white/15 group-hover:border-white/30">
                    {/* Number Badge */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Large Icon - No Background */}
                    <div className="mb-4 flex justify-center">
                      <span className="material-symbols-outlined text-6xl text-white transition-transform group-hover:scale-110 lg:text-7xl" style={{ fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 48' }}>
                        {service.icon}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <p className="text-center text-sm font-semibold text-white lg:text-base">
                      {service.label}
                    </p>

                    {/* Decorative Bottom Border */}
                    <div className="absolute -bottom-1 left-0 h-1 w-full bg-white/30 transition-all group-hover:h-1.5 group-hover:bg-white/50" />
                    
                    {/* Glass Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VS Divider */}
          <motion.div
            variants={fadeUp}
            className="mb-12 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24 bg-white/30" />
            <span className="text-2xl font-bold text-white">VS</span>
            <div className="h-px w-24 bg-white/30" />
          </motion.div>

          {/* Conclusion - Split View */}
          <motion.div
            variants={fadeUp}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Others */}
            <div className="rounded-2xl border-2 border-white/20 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-red-400">
                  close
                </span>
                <h3 className="text-xl font-bold text-white lg:text-2xl">
                  {lang === 'en' ? 'Most Agencies' : '大多数机构'}
                </h3>
              </div>
              <p className="text-base text-white/80 lg:text-lg">
                {lang === 'en' ? 'Offer caregivers' : '提供护理人员'}
              </p>
            </div>

            {/* Careby */}
            <div className="rounded-2xl border-2 border-white bg-white p-6 shadow-2xl lg:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-primary">
                  check_circle
                </span>
                <h3 className="text-xl font-bold text-primary lg:text-2xl">
                  Careby
                </h3>
              </div>
              <p className="text-base text-midnight lg:text-lg">
                {t.platformSection.conclusion}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const [selectedService, setSelectedService] = useState<typeof content.en.services.service1 | typeof content.en.services.service2 | typeof content.en.services.service3 | typeof content.en.services.service4 | typeof content.en.services.service5 | typeof content.en.services.service6 | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = lang === 'en' ? [
    { icon: 'elderly', service: t.services.service1, keyword: 'Healthcare' },
    { icon: 'home_health', service: t.services.service2, keyword: 'Trusted' },
    { icon: 'psychology', service: t.services.service3, keyword: 'AI' },
    { icon: 'spa', service: t.services.service4, keyword: 'Benefits' },
    { icon: 'health_and_safety', service: t.services.service5, keyword: 'Complete' },
    { icon: 'account_balance', service: t.services.service6, keyword: 'Financial' },
  ] : [
    { icon: 'elderly', service: t.services.service1, keyword: '医疗' },
    { icon: 'home_health', service: t.services.service2, keyword: '值得信赖' },
    { icon: 'psychology', service: t.services.service3, keyword: 'AI' },
    { icon: 'spa', service: t.services.service4, keyword: '福利' },
    { icon: 'health_and_safety', service: t.services.service5, keyword: '完整' },
    { icon: 'account_balance', service: t.services.service6, keyword: '金融' },
  ]

  const getTitleWithUnderline = (title: string, keyword: string) => {
    const keywordIndex = title.indexOf(keyword)
    if (keywordIndex !== -1) {
      const before = title.substring(0, keywordIndex)
      const after = title.substring(keywordIndex + keyword.length)
      return (
        <>
          {before}
          <span className="hand-drawn-underline">{keyword}</span>
          {after}
        </>
      )
    }
    return title
  }

  const handleViewMore = (service: typeof content.en.services.service1 | typeof content.en.services.service2 | typeof content.en.services.service3 | typeof content.en.services.service4 | typeof content.en.services.service5 | typeof content.en.services.service6) => {
    if (service.details) {
      setSelectedService(service)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedService(null), 300)
  }

  return (
    <section
      id="services"
      className="mx-auto max-w-6xl px-6 py-20 sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="services-heading"
    >
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {t.services.sectionTitle}
        </p>
        <h2
          id="services-heading"
          className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl"
          itemProp="name"
        >
          {t.services.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          {t.services.subtitle}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <motion.article
            key={service.service.title}
            className="group flex flex-col rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="material-symbols-outlined mb-4 text-5xl text-primary">
              {service.icon}
            </span>
              <h3 className="text-lg font-semibold text-midnight">
                {getTitleWithUnderline(service.service.title, service.keyword)}
              </h3>
              {service.service.subtitle && (
                <p className="mt-2 text-sm font-medium text-primary">
                  {service.service.subtitle}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.service.desc}
              </p>
              {service.service.details && (
                <button
                  onClick={() => handleViewMore(service.service)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary bg-white px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span>{lang === 'en' ? 'Learn More' : '了解更多'}</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              )}
              {!service.service.details && (
                <div className="mt-6 h-0.5 w-16 rounded-full bg-accent/60 transition group-hover:w-24 group-hover:bg-primary" />
              )}
          </motion.article>
        ))}
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

function TechnologySection({ t, lang, onHowItWorks }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW', onHowItWorks: () => void }) {
  // Keep original design for Chinese
  const highlights = [
    ('highlight1' in t.technology ? t.technology.highlight1 : 'AI算法识别健康风险并生成个性化方案'),
    ('highlight2' in t.technology ? t.technology.highlight2 : '数据分析与健康预测报告'),
    ('highlight3' in t.technology ? t.technology.highlight3 : '多语言支持（中 / 英 / 法）'),
    ('highlight4' in t.technology ? t.technology.highlight4 : '医疗级隐私保护与认证服务商体系'),
  ]
  const steps = [
    ('step1' in t.technology ? t.technology.step1 : '用户'),
    ('step2' in t.technology ? t.technology.step2 : 'AI健康云'),
    ('step3' in t.technology ? t.technology.step3 : '医疗资源网络'),
    ('step4' in t.technology ? t.technology.step4 : '医生 / 护理服务'),
  ]

  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-slate-900 px-6 py-20 text-soft sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="technology-heading"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Circuit Board Lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20">
          <defs>
            <linearGradient id="techLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.5)" />
              <stop offset="100%" stopColor="rgba(20, 184, 166, 0.5)" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          {[20, 40, 60, 80].map((y, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0%"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="url(#techLineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
          {/* Vertical lines */}
          {[25, 50, 75].map((x, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${x}%`}
              y1="0%"
              x2={`${x}%`}
              y2="100%"
              stroke="url(#techLineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>

        {/* Data Flow Particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
          />
        ))}

        {/* Pulsing Nodes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute h-3 w-3 rounded-full border-2 border-cyan-400/60 bg-cyan-400/20"
            style={{
              left: `${15 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 60}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Rotating Gradient Rings */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full border-2 border-cyan-400/20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full border-2 border-teal-400/20"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-cyan-500/15 to-teal-500/15 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-teal-500/15 to-emerald-500/15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="absolute inset-0 -skew-y-2 bg-gradient-to-br from-teal-800/60 via-cyan-800/40 to-slate-900/80" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent mb-4">
            {t.technology.sectionTitle}
          </p>
          <h2
            id="technology-heading"
            className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl mb-6"
            itemProp="name"
          >
            {String(t.technology.title)}
          </h2>
        </motion.div>

        {'oldWay' in t.technology && t.technology.oldWay ? (
          <>
            {/* Comparison Section */}
            <div className="grid gap-8 lg:grid-cols-2 mb-12">
              {/* Old Way - 1995 */}
              <motion.div
                className="rounded-3xl border-2 border-red-500/30 bg-red-900/20 p-8 backdrop-blur"
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-200 mb-3">
                    1995
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lang === 'en' ? 'Most home care companies are stuck in 1995:' : '大多数家庭护理公司仍停留在1995年：'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {t.technology.oldWay.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-white/80"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <span className="mt-1 text-red-400 text-xl">✗</span>
                      <span>{String(item)}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* New Way - 2025 */}
              <motion.div
                className="rounded-3xl border-2 border-primary/40 bg-primary/20 p-8 backdrop-blur"
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-primary/30 px-4 py-2 text-sm font-semibold text-white mb-3">
                    2025
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lang === 'en' ? 'Careby operates in 2025:' : 'Careby 在2025年运营：'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {t.technology.newWay.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-white/90"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <span className="mt-0.5 text-yellow-400 text-lg">✅</span>
                      <span>{String(item)}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Result */}
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            >
              <p className="text-xl font-semibold text-white leading-relaxed mb-6">
                {String(t.technology.result)}
              </p>
              <button
                onClick={onHowItWorks}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>{lang === 'en' ? 'How it works' : '运作方式'}</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </motion.div>
          </>
        ) : (
          /* Original design for Chinese */
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className="text-base text-white/80">
                {t.technology.subtitle}
              </p>
              <ul className="space-y-4 text-sm text-white/75">
                {highlights.map((highlight, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <span className="mt-1 text-lg text-accent">✦</span>
                    <span>{String(highlight)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <h3 className="text-lg font-semibold text-white/90">
                  {'flowTitle' in t.technology ? String(t.technology.flowTitle) : '智慧健康流程'}
                </h3>
                <p className="mt-3 text-sm text-white/70">
                  {'flowDesc' in t.technology ? String(t.technology.flowDesc) : 'Careby AI将多模态数据整合进健康云，智能匹配医疗资源与护理服务。'}
                </p>
                <div className="mt-8 space-y-6">
                  {steps.map((node, index) => (
                    <motion.div
                      key={index}
                      className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/30 text-base font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{String(node)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

function PartnersSection({ t }: { t: typeof content.en }) {
  return (
    <section
      id="partners"
      className="mx-auto max-w-6xl px-6 py-20 sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="partners-heading"
    >
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {t.partners.sectionTitle}
        </p>
        <h2
          id="partners-heading"
          className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl"
          itemProp="name"
        >
          {t.partners.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
          {t.partners.subtitle}
        </p>
      </motion.div>

      <motion.blockquote
        className="mx-auto mt-12 max-w-3xl rounded-3xl border border-primary/10 bg-white/80 p-8 text-center text-base leading-relaxed text-slate-600 shadow-soft"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.4 }}
      >
        "{t.partners.quote}"
      </motion.blockquote>

      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm transition hover:shadow-md hover:border-primary/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          >
            <img 
              src={partner.logo} 
              alt={`${partner.name} Logo - Careby Healthcare Partner`}
              className="h-16 w-auto object-contain"
              loading="eager"
              decoding="async"
              onError={(e) => {
                console.error(`Failed to load partner logo: ${partner.logo}`, e);
                // Fallback to text if image fails to load
                const img = e.currentTarget as HTMLImageElement;
                const text = img.nextElementSibling as HTMLElement;
                img.style.display = 'none';
                if (text) text.style.display = 'block';
              }}
              onLoad={() => {
                console.log(`Partner logo loaded successfully: ${partner.logo}`);
              }}
            />
            {partner.description && (
              <p className="text-sm text-slate-600 leading-relaxed">{partner.description}</p>
            )}
            <p className="hidden text-sm font-semibold text-slate-700">{partner.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ImpactSection({ t }: { t: typeof content.en }) {
  return (
    <section
      id="impact"
      className="bg-white px-6 py-20 sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="impact-heading"
    >
      <motion.div
        className="mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {t.impact.sectionTitle}
          </p>
          <h2
            id="impact-heading"
            className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl"
            itemProp="name"
          >
            {t.impact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            {t.impact.subtitle}
          </p>
        </div>


        {/* Testimonials Carousel */}
        <div className="mt-16 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -100 * testimonials.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="min-w-[350px] rounded-3xl border border-primary/10 bg-gradient-to-br from-white via-soft to-primary/5 p-6 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              >
                {/* Rating Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-xl text-yellow-400">★</span>
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="mb-6 text-sm leading-relaxed text-slate-700">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar}
                    alt={`${testimonial.name} - Careby Home Care Client Testimonial`}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                    loading="eager"
                    width="48"
                    height="48"
                    onError={(e) => {
                      console.error(`Failed to load testimonial avatar: ${testimonial.avatar}`, e);
                      // Fallback to initials if image fails
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = 'none';
                      const fallback = img.nextElementSibling as HTMLElement;
                      if (!fallback || !fallback.classList.contains('avatar-fallback')) {
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'avatar-fallback h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm';
                        fallbackDiv.textContent = testimonial.name.charAt(0);
                        img.parentNode?.insertBefore(fallbackDiv, img.nextSibling);
                      }
                    }}
                    onLoad={() => {
                      console.log(`Testimonial avatar loaded: ${testimonial.avatar}`);
                    }}
                  />
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function MembershipTiersSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const tiers = {
    en: [
      {
        name: 'Essential Membership',
        price: '$1,200',
        period: '/year',
        features: [
          '12 annual telehealth consultations',
          '$400 in-home service credit',
          'Gold Standard caregiver matching',
          'Basic benefits navigation',
          'Standard support',
          '5% member discount',
        ],
        popular: false,
      },
      {
        name: 'Complete Care Membership',
        price: '$3,200',
        period: '/year',
        features: [
          'Unlimited telehealth consultations',
          '$1,500 in-home service allowance',
          'Priority caregiver matching',
          'Full benefits navigation',
          'Quarterly care reviews',
          'Priority support',
          '10% member discount',
          '2 FREE medical accompaniment visits',
        ],
        popular: true,
      },
      {
        name: 'Platinum Membership',
        price: '$5,500',
        period: '/year',
        features: [
          'Unlimited telehealth access',
          '$2,500 in-home service allowance',
          'VIP caregiver matching',
          'Dedicated care coordinator',
          'Comprehensive benefits navigation',
          'Advanced health monitoring (100+ datapoints)',
          'Monthly care optimization',
          '24/7 priority support',
          '15% member discount',
          '4 FREE medical accompaniment visits',
          'Family portal access',
        ],
        popular: false,
      },
    ],
    zh: [
      {
        name: '基础会员',
        price: '$1,200',
        period: '/年',
        features: [
          '12次年度远程医疗咨询',
          '$400 上门服务积分',
          '黄金标准护理人员匹配',
          '基本福利导航',
          '标准支持',
          '5% 会员折扣',
        ],
        popular: false,
      },
      {
        name: '完整护理会员',
        price: '$3,200',
        period: '/年',
        features: [
          '无限远程医疗咨询',
          '$1,500 上门服务津贴',
          '优先护理人员匹配',
          '完整福利导航',
          '季度护理审查',
          '优先支持',
          '10% 会员折扣',
          '2次免费医疗陪同访问',
        ],
        popular: true,
      },
      {
        name: '白金会员',
        price: '$5,500',
        period: '/年',
        features: [
          '无限远程医疗访问',
          '$2,500 上门服务津贴',
          'VIP 护理人员匹配',
          '专属护理协调员',
          '综合福利导航',
          '高级健康监测（100+ 数据点）',
          '月度护理优化',
          '24/7 优先支持',
          '15% 会员折扣',
          '4次免费医疗陪同访问',
          '家庭门户访问',
        ],
        popular: false,
      },
    ],
  }
  
  const currentLangForTiers = lang === 'zh-TW' ? 'zh' : lang
  const currentTiers = tiers[currentLangForTiers as 'en' | 'zh'] || tiers.en

  return (
    <section id="membership" className="bg-gradient-to-br from-primary/5 via-white to-accent/5 px-6 py-20 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{t.membership.sectionTitle}</p>
          <h2 id="membership-heading" className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl" itemProp="name">{t.membership.title}</h2>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {currentTiers.map((tier: any, index: number) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-3xl border-2 p-8 shadow-lg transition hover:shadow-xl ${
                tier.popular
                  ? 'border-primary bg-white scale-105 z-10'
                  : 'border-slate-200 bg-white'
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {t.membership.mostPopular}
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-midnight">{tier.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  <span className="text-slate-600">{tier.period}</span>
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    </span>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://app.getcareby.ca/"
            className="animated-gradient-button inline-flex items-center justify-center rounded-full px-9 py-3 text-base font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 relative z-10"
            onFocus={(e) => {
              e.currentTarget.style.outlineColor = '#3B8C75'
            }}
          >
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="sparkle"></span>
            <span className="relative z-10">{t.membership.bookConsultation}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function FAQSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const currentLangForFaq = lang === 'zh-TW' ? 'zh' : lang
  const items = faqItems[currentLangForFaq as 'en' | 'zh'] || faqItems.en

  return (
    <section id="faq" className="bg-white px-6 py-20 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{t.faq.sectionTitle}</p>
          <h2 id="faq-heading" className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl" itemProp="name">{t.faq.title}</h2>
        </div>
        <div className="mt-12 space-y-6">
          {items.map((item: any, index: number) => (
            <div key={item.question} className="border-b border-slate-200 pb-6 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between text-left transition"
              >
                <p className="text-lg font-semibold text-midnight pr-4">{item.question}</p>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-xl text-primary">expand_more</span>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-base text-slate-600 leading-relaxed">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PrivacyPolicyPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <section id="privacy" className="bg-white px-6 py-20 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-8 text-slate-700">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-primary transition hover:text-accent"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-semibold">Back to Home</span>
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Privacy Policy</p>
            <h2 className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl">Privacy Policy</h2>
            <p className="mt-4 text-base">
              Careby Solutions Inc. (&quot;Careby,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and personal
              information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and
              Canada&apos;s Anti-Spam Legislation (CASL).
            </p>
          </div>
        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <h3 className="text-lg font-semibold text-midnight">1. Information We Collect</h3>
            <p>We collect and process the following types of personal information:</p>
            <p className="mt-3 font-semibold">Personal Identification Information:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Full name, date of birth, gender</li>
              <li>Contact details (address, phone number, email address)</li>
              <li>Government-issued identification numbers (for verification purposes only)</li>
              <li>Emergency contact information</li>
            </ul>
            <p className="mt-3 font-semibold">Health Information:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Medical history and current health conditions</li>
              <li>Medication lists and treatment plans</li>
              <li>Mobility and functional assessment data</li>
              <li>Care needs and preferences</li>
              <li>Health monitoring data collected during caregiver visits (100+ datapoints including mobility patterns, vitals, cognitive function)</li>
            </ul>
            <p className="mt-3 font-semibold">Financial Information:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Payment and billing information</li>
              <li>Insurance coverage details</li>
              <li>Government benefit program information</li>
            </ul>
            <p className="mt-3 font-semibold">Service Preferences:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Language preferences</li>
              <li>Cultural preferences</li>
              <li>Care history and feedback</li>
              <li>Communication preferences</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">2. How We Use Your Information</h3>
            <p className="mt-3 font-semibold">To Provide Care Services:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Match you with appropriate caregivers</li>
              <li>Coordinate healthcare appointments and services</li>
              <li>Communicate with healthcare providers on your behalf</li>
              <li>Monitor health trends and adjust care plans</li>
              <li>Provide medical accompaniment and translation services</li>
            </ul>
            <p className="mt-3 font-semibold">For Account Management:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Process membership applications and payments</li>
              <li>Maintain accurate records</li>
              <li>Send service notifications and updates</li>
              <li>Provide customer support</li>
            </ul>
            <p className="mt-3 font-semibold">For Email and SMS Verification:</p>
            <p className="mt-1">
              We will only use your email address and phone number for account verification, service notifications, appointment reminders, caregiver updates, important account and billing communications.
            </p>
            <p className="mt-3">
              We will NEVER sell, rent, or share your email address or phone number with third parties for marketing purposes.
            </p>
            <p className="mt-3 font-semibold">To Improve Our Services:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Analyze service quality and outcomes</li>
              <li>Conduct satisfaction surveys</li>
              <li>Develop new services and features</li>
            </ul>
            <p className="mt-3 font-semibold">For Legal Compliance:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Comply with applicable laws and regulations</li>
              <li>Respond to legal requests from authorities</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">3. Information Sharing</h3>
            <p>We only share your personal information with:</p>
            <p className="mt-3 font-semibold">Healthcare Providers:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Caregivers and Personal Support Workers (PSWs) directly involved in your care</li>
              <li>Licensed physicians through our GoToDoctor telehealth partnership</li>
              <li>Specialists and diagnostic centers (with your consent)</li>
              <li>Traditional Chinese Medicine practitioners (with your consent)</li>
            </ul>
            <p className="mt-3 font-semibold">Service Partners:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Payment processors for billing purposes (encrypted and secure)</li>
              <li>Technology service providers who assist with our platform operations (subject to strict confidentiality agreements)</li>
            </ul>
            <p className="mt-3 font-semibold">Legal Authorities:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>When required by law or court order</li>
              <li>To protect the safety and wellbeing of our clients</li>
            </ul>
            <p className="mt-3">
              We NEVER sell your personal information to third parties, share your information for marketing purposes without explicit consent, or disclose your health information without proper authorization.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">4. Email and SMS Communications</h3>
            <p>In compliance with CASL (Canada&apos;s Anti-Spam Legislation):</p>
            <p className="mt-3 font-semibold">Express Consent:</p>
            <p>
              By creating an account or purchasing services, you provide express consent to receive account verification emails and SMS, service-related notifications, appointment reminders, care updates, important health information, billing and payment confirmations.
            </p>
            <p className="mt-3 font-semibold">Marketing Communications:</p>
            <p>
              We will obtain separate explicit consent before sending marketing emails or SMS. You can opt out at any time by clicking &quot;unsubscribe&quot; in any marketing email, replying &quot;STOP&quot; to marketing SMS messages, or contacting us at privacy@getcareby.ca.
            </p>
            <p className="mt-3">
              You cannot opt out of essential service communications (account verification, appointment confirmations, critical health updates) as these are necessary for service delivery.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">5. Data Security</h3>
            <p>We implement industry-standard security measures to protect your information:</p>
            <p className="mt-3 font-semibold">Technical Safeguards:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>256-bit SSL/TLS encryption for data transmission</li>
              <li>Encrypted storage of sensitive information</li>
              <li>Secure, password-protected access controls</li>
              <li>Regular security audits and updates</li>
              <li>Firewall protection and intrusion detection</li>
            </ul>
            <p className="mt-3 font-semibold">Administrative Safeguards:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>All staff and caregivers sign confidentiality agreements</li>
              <li>Role-based access controls</li>
              <li>Regular privacy and security training</li>
              <li>Background checks for all employees with access to personal information</li>
            </ul>
            <p className="mt-3 font-semibold">Physical Safeguards:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Secure office facilities with controlled access</li>
              <li>Locked storage for physical documents</li>
              <li>Secure disposal of documents containing personal information</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">6. Data Retention</h3>
            <p>We retain your personal information only as long as necessary:</p>
            <p className="mt-3 font-semibold">Active Clients:</p>
            <p>Information retained throughout the service relationship; health records maintained for continuity of care.</p>
            <p className="mt-3 font-semibold">Former Clients:</p>
            <p>Records retained for 7 years after service termination; financial records retained for 7 years as required by law.</p>
            <p className="mt-3 font-semibold">After Retention Period:</p>
            <p>Information is securely destroyed or anonymized. Health records transferred to you upon request.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">7. Your Rights</h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <span className="font-semibold">Access:</span> Request a copy of all personal information we hold about you.
              </li>
              <li>
                <span className="font-semibold">Correction:</span> Request corrections to inaccurate or incomplete information.
              </li>
              <li>
                <span className="font-semibold">Withdrawal of Consent:</span> Withdraw consent for non-essential communications at any time.
              </li>
              <li>
                <span className="font-semibold">Deletion:</span> Request deletion of your personal information (subject to legal retention requirements).
              </li>
              <li>
                <span className="font-semibold">File a Complaint:</span> Contact our Privacy Officer or the Office of the Privacy Commissioner of Canada.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">8. Cookies and Website Tracking</h3>
            <p>
              Our website uses cookies to remember your preferences, analyze website traffic and usage, and improve user experience. You can control cookies through your browser settings. Disabling cookies may affect website functionality.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">9. Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites. Please review their privacy policies independently.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">10. Children&apos;s Privacy</h3>
            <p>
              Careby services are designed for seniors and their adult caregivers. We do not knowingly collect information from individuals under 18 years of age.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">11. Changes to This Privacy Policy</h3>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Significant changes will be communicated via email to active members.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">12. Contact Us</h3>
            <p>
              For privacy questions, to exercise your rights, or to file a complaint: Careby Solutions Inc. 205 Placer Court, Suite 513, North York, ON M2H 0A9, Canada.
            </p>
            <p>Email: privacy@getcareby.ca | Phone: 1-646-578-9920</p>
            <p>Office of the Privacy Commissioner of Canada: www.priv.gc.ca | 1-800-282-1376</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

function TermsOfServicePage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <section id="terms" className="bg-soft px-6 py-20 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-8 text-slate-700">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-primary transition hover:text-accent"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-semibold">Back to Home</span>
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Terms of Service</p>
            <h2 className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl">Terms of Service</h2>
          </div>
        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using Careby&apos;s services. By accessing our website, purchasing membership, or using our services, you agree to be bound by these Terms.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-midnight">1. Definitions</h3>
            <p>
              &quot;Careby,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot; refers to Careby Solutions Inc., an Ontario corporation. &quot;Services&quot; refers to all care coordination, caregiver matching, telehealth access, health navigation, pain management, and related services provided by Careby. &quot;Client,&quot; &quot;you,&quot; &quot;your&quot; refers to the person receiving services or the authorized representative. &quot;Member&quot; refers to clients who have purchased an annual membership. &quot;Caregiver&quot; refers to Personal Support Workers (PSWs) and healthcare providers in Careby&apos;s network.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">2. Services Provided</h3>
            <p>
              Careby provides care coordination and navigation services including premium caregiver matching and placement, health navigation and advocacy, access to telehealth services through GoToDoctor, in-home support services, medical accompaniment (peizhun), pain management treatments, financial and benefits navigation, and care planning. Careby is a care coordination platform, not a direct healthcare provider. Medical services are provided by licensed third-party practitioners.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">3. Eligibility</h3>
            <p>
              To use Careby services, you must be 18 years of age or older, be a resident of Ontario, provide accurate and complete information, and have legal authority to make healthcare decisions (or have appointed Power of Attorney).
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">4. Membership Terms</h3>
            <p className="font-semibold">Membership Plans:</p>
            <p>Essential Membership: $1,200/year | Complete Care Membership: $3,200/year | Platinum Membership: $5,500/year</p>
            <p className="mt-3 font-semibold">Membership Benefits:</p>
            <p>
              Memberships are valid for 12 months from purchase date. Service credits must be used within the membership year. Unused credits do not roll over and are non-refundable. Member discounts apply only during active membership period.
            </p>
            <p className="mt-3 font-semibold">Payment Terms:</p>
            <p>
              Memberships are billed annually in advance. Payment accepted by credit card, debit, or e-transfer. HST/GST applies to all services. Failed payment may result in service suspension.
            </p>
            <p className="mt-3 font-semibold">Cancellation and Refunds:</p>
            <p>
              30-Day Money-Back Guarantee: Full refund if cancelled within 30 days of purchase and no services have been used. After 30 days, membership fees are non-refundable. Service credits are non-refundable upon cancellation. Pro-rated refunds are not available except in cases of death or permanent relocation outside service area.
            </p>
            <p className="mt-3 font-semibold">Renewal:</p>
            <p>
              Memberships auto-renew unless cancelled 30 days before expiration. Renewal rates may change with 60 days notice. You may opt out of auto-renewal at any time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">5. À La Carte Services</h3>
            <p>
              Services may be purchased individually without membership. Hourly rates and package prices as posted. Payment due at time of service or as invoiced. Cancellation policies apply.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">6. Caregiver Matching and Placement</h3>
            <p>
              We match clients with caregivers based on needs, preferences, and availability. All caregivers complete our Careby Gold Standard™ 10/10 vetting process. Caregivers are independent contractors, not Careby employees. While we strive for excellent matches, we cannot guarantee specific outcomes or timelines.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">7. Telehealth Services</h3>
            <p>
              Telehealth services are provided through GoToDoctor and subject to their terms. Telehealth is not appropriate for emergencies. Prescriptions are subject to physician discretion and pharmacy availability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">8. Cancellation Policies</h3>
            <p>
              Caregiver visits require 24 hours notice for cancellation to avoid a $50 fee. Telehealth requires 2 hours notice; pain management requires 24 hours; medical accompaniment requires 48 hours. Package purchases are non-refundable once treatment begins.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">9. Payment and Billing</h3>
            <p>
              Accepted payment methods include credit cards, debit cards, EFT, and cheque (for invoices over $1,000). Membership fees are charged annually, hourly services billed weekly or bi-weekly, and packages billed 50% upfront & 50% upon completion. Accounts overdue by 30+ days may incur 2% monthly interest.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">10. Privacy and Confidentiality</h3>
            <p>Your personal and health information is protected under our Privacy Policy and PIPEDA. Please review our Privacy Policy for details.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">11. Limitation of Liability</h3>
            <p>
              Careby provides coordination, not direct medical care. We are not liable for medical outcomes, caregiver performance, or third-party provider actions. Our liability is limited to the amount paid for services in the preceding 12 months.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">12. Health and Safety</h3>
            <p>
              Clients must provide accurate health information, inform us of changes, and maintain a safe home environment. Infectious conditions must be disclosed. We have zero tolerance for abuse or neglect.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">13. Intellectual Property</h3>
            <p>
              All content on getcareby.ca is the property of Careby Solutions Inc. and protected by Canadian copyright law. You may not reproduce, distribute, or misuse our intellectual property.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">14. Dispute Resolution</h3>
            <p>
              Contact us first to resolve concerns (hr@getcareby.ca). If unresolved, disputes may be referred to mediation. These Terms are governed by the laws of Ontario and Canada.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">15. Modifications to Terms</h3>
            <p>
              We may update these Terms periodically. Changes will be posted with 30 days notice, and continued use constitutes acceptance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">16. Severability</h3>
            <p>If any provision is unenforceable, the remaining provisions remain in full effect.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">17. Entire Agreement</h3>
            <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Careby.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">18. Contact Information</h3>
            <p>
              Careby Solutions Inc. 205 Placer Court, Suite 513, North York, ON M2H 0A9, Canada | Email: hr@getcareby.ca | Phone: 1-646-578-9920
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">19. Acknowledgment</h3>
            <p>By using Careby services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-midnight">20. Communications Consent</h3>
            <p>
              By creating an account or using Careby&apos;s services, you expressly consent to receive electronic communications from Careby Solutions Inc. via email, SMS, or other electronic means for the following purposes:
            </p>
            <p className="mt-3 font-semibold">1. Service-Related Communications</p>
            <p>
              You agree to receive transactional and operational messages necessary for your use of our platform, including but not limited to:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Account verification codes and authentication messages</li>
              <li>Password reset and security notifications</li>
              <li>Booking confirmations and appointment reminders</li>
              <li>Service updates and changes affecting your account</li>
              <li>Billing statements and payment confirmations</li>
              <li>Legal notices and policy updates</li>
            </ul>
            <p className="mt-3 font-semibold">2. Nature of Communications</p>
            <p>
              These communications are essential to providing our services and are not marketing materials. You cannot opt out of these service-related messages while maintaining an active account.
            </p>
            <p className="mt-3 font-semibold">3. Contact Information Accuracy</p>
            <p>
              You are responsible for maintaining accurate email and phone contact information in your account settings. Careby is not liable for missed communications due to outdated or incorrect contact information.
            </p>
            <p className="mt-3 font-semibold">4. Marketing Communications (Optional)</p>
            <p>
              If you separately opt in to receive marketing communications, newsletters, or promotional content, you may unsubscribe at any time using the unsubscribe link provided in such communications. This opt-out does not affect service-related messages described above.
            </p>
            <p className="mt-3 font-semibold">5. Consent Modification</p>
            <p>
              By continuing to use our services, you reaffirm your consent to receive these communications. If you wish to withdraw consent, you must close your account.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

function AboutUsPage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <section id="about" className="bg-white px-6 py-20 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-8 text-slate-700">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-primary transition hover:text-accent"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-semibold">Back to Home</span>
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About Us</p>
            <h2 className="mt-4 text-3xl font-semibold text-midnight sm:text-4xl">About Us</h2>
          </div>
          <div className="space-y-8 text-base leading-relaxed">
            <div>
              <p className="mb-4">
                We are a Toronto-based senior care company with deep roots in the community. Our team has extensive experience in healthcare coordination, community services, and understanding the unique needs of Toronto&apos;s diverse population.
              </p>
              <p className="mb-4">
                After seeing how families struggled to find quality care they could trust, we created Careby as the solution: premium senior care that combines technology, rigorous standards, and genuine personal service.
              </p>
              <p className="mb-4">
                We&apos;re not just another care agency - we&apos;re your family&apos;s partner in navigating every aspect of aging.
              </p>
              <p>
                Based in North York, we serve Toronto and the GTA with a network of Gold Standard caregivers and healthcare partners who share our commitment to excellence.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-8">
              <h3 className="mb-4 text-2xl font-semibold text-midnight">Our Vision</h3>
              <p className="mb-4">
                We believe every senior deserves care that truly understands them.
              </p>
              <p className="mb-4">
                Careby combines premium service standards with genuine personal attention to deliver senior care that gives families confidence and gives seniors independence.
              </p>
              <p>
                We&apos;re building the most trusted name in senior care by making quality, personalized support accessible when and where it&apos;s needed most.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Footer({ setCurrentPage, t }: { setCurrentPage: (page: 'home' | 'privacy' | 'terms' | 'about') => void, t: typeof content.en }) {
  return (
    <footer className="bg-midnight px-6 py-12 text-soft sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.address}</p>
          <div className="mt-3 space-y-1 text-sm text-white/60">
            {contactInfo.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.contact}</p>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <p>{t.footer.phone}: {contactInfo.phone} ({t.footer.support247})</p>
            <p>{t.footer.email}: {contactInfo.email}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.links}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>
              <button onClick={() => setCurrentPage('home')} className="transition hover:text-accent text-left">{t.footer.home}</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('about')} className="transition hover:text-accent text-left">{t.footer.aboutUs}</button>
            </li>
            <li>
              <a href="#services" className="transition hover:text-accent" aria-label="View our home care services">{t.footer.ourServices}</a>
            </li>
            <li>
              <a href="#partners" className="transition hover:text-accent" aria-label="View our healthcare partners">{t.footer.partnerships}</a>
            </li>
            <li>
              <a 
                href="#privacy" 
                onClick={(e) => {
                  e.preventDefault()
                  window.open(`${window.location.origin}${window.location.pathname}#privacy`, '_blank', 'noopener,noreferrer')
                }}
                className="transition hover:text-accent cursor-pointer"
                aria-label="Read our privacy policy"
              >
                {t.footer.privacyPolicy}
              </a>
            </li>
            <li>
              <a 
                href="#terms" 
                onClick={(e) => {
                  e.preventDefault()
                  window.open(`${window.location.origin}${window.location.pathname}#terms`, '_blank', 'noopener,noreferrer')
                }}
                className="transition hover:text-accent cursor-pointer"
                aria-label="Read our terms of service"
              >
                {t.footer.termsOfService}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.businessHours}</p>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <p>
              <span className="font-semibold">{t.footer.mondayFriday}:</span> {contactInfo.businessHours[0].value}
            </p>
            <p>
              <span className="font-semibold">{t.footer.saturday}:</span> {contactInfo.businessHours[1].value}
            </p>
            <p>
              <span className="font-semibold">{t.footer.sunday}:</span> {contactInfo.businessHours[2].value}
            </p>
            <p className="text-xs text-primary">{t.footer.emergencySupport}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/50">
        <p>© 2025 Careby Solutions Inc. {t.footer.allRightsReserved}</p>
      </div>
    </footer>
  )
}

function FinalCTASection({ t }: { t: typeof content.en }) {
  return (
    <section
      id="cta"
      className="relative w-screen overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 px-6 py-20 text-center text-soft sm:px-10 md:px-16"
      aria-labelledby="cta-heading"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Diagonal Light Streaks */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
            style={{ top: `${30 + i * 20}%` }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Expanding Hexagons */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '200px',
                height: '200px',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                border: '2px solid rgba(20, 184, 166, 0.3)',
              }}
              animate={{
                scale: [0.5, 2],
                opacity: [0.6, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 2.5,
              }}
            />
          ))}
        </div>

        {/* Glowing Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Rotating Gradient Orbs */}
        <motion.div
          className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-teal-500/20 via-cyan-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [360, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      <motion.div
        className="relative mx-auto max-w-4xl space-y-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-lg font-medium text-white/90" id="cta-heading">
          "{t.cta.quote}"
        </p>
        <div className="space-y-3">
          <p className="text-2xl font-semibold text-white">
            {t.cta.title}
          </p>
          <p className="text-base text-white/80">
            {t.cta.subtitle}
          </p>
        </div>
        <a
          href="https://app.getcareby.ca/"
          className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-yellow-400/50 transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-yellow-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
        >
          {t.cta.button}
        </a>
      </motion.div>
    </section>
  )
}

export default App
