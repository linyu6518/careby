import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useMemo, Fragment } from 'react'
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
      eyebrow: 'Toronto · Mandarin & Cantonese · Doctor-Reviewed · PHIPA Compliant',
      tagline: 'Smarter Healthcare Closer to Home',
      headline: 'Care by Trust, Experts, Love.',
      headlinePrefix: 'Care by',
      headlineSuffix: '',
      subheadline: 'Premium in-home care, health navigation, and support services for Toronto seniors and their families.',
      subheadlineStrong: 'AI-powered diagnostics. Same-day virtual doctors. Vetted caregivers at your door. One team that handles everything your family doctor doesn\'t.',
      slogan: 'Premium home care coordination • Advanced fall detection • Instant telehealth access • Regenerative medicine • Because your health deserves more than basic support.',
      ctaPrimary: 'Book Your Free Consultation',
      ctaSecondary: 'Call Us',
      secondaryConsult: 'Not sure? Talk to us first',
      plansLink: 'See all plans ↓',
      trustChips: [
        'No referral needed',
        'No waiting room',
        'Same-day virtual doctor',
        'We come to your door',
        'Doctor-reviewed results — not a PDF',
        'Mandarin & Cantonese',
      ],
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
    painPoints: {
      sectionTitle: 'Who Careby is built for',
      title: 'Three gaps the system left open.',
      titleEm: 'We close all of them.',
      problems: [
        {
          situation: "The system won't monitor you",
          fear: '"My doctor sees me once a year. In between — I\'m on my own. I have no idea what\'s actually happening in my body."',
          answer: "Careby's AI-powered diagnostics test the biomarkers that actually matter for your age and risk profile — zero filler. Every result reviewed by a doctor who explains what it means and what to do next. Preventative, not reactive. Management, not guesswork.",
          answerEm: 'zero filler',
        },
        {
          situation: "Canada's healthcare system won't send anyone to your door",
          fear: '"She started a new medication. I\'m at work. She lives alone. Canada\'s healthcare system has nobody to send to her door. I have nobody to call."',
          answer: "Careby sends vetted, culturally matched caregivers directly to your parents' home — background checked, data-briefed, and speaking their language before they walk through the door. PSW visits, medical accompaniment 陪診, companion visits, therapy. All coordinated. All tracked. Nobody falls through the cracks.",
          answerEm: 'speaking their language',
        },
        {
          situation: 'The wait never ends',
          fear: '"30 weeks for a specialist. 5 hours at a walk-in. My family doctor isn\'t taking new patients. Every door I try is closed."',
          answer: "GoToDoctor gives your family same-day physician access — Mandarin, Cantonese, or English, prescription sent to your pharmacy the same day. Our credit system is interchangeable: PSW visit, therapist, nutritionist, companion, 陪診 escort. Whatever the household needs this month — that's what you use it for.",
          answerEm: 'Whatever the household needs this month',
        },
      ],
    },
    weCloseAll: {
      eyebrow: 'Simple by design',
      title: 'We close all of them.',
      steps: [
        { title: 'Choose your plan', desc: 'Buy online in minutes. Start with a diagnostic, a care package, or a Companion subscription — or all three.' },
        { title: 'Meet your coordinator', desc: 'A dedicated bilingual care coordinator is assigned to your family. They learn your situation before anything else happens.' },
        { title: 'We match & brief your team', desc: 'Every professional — caregiver, companion, NP, specialist — is matched to your family and briefed with your data before day one.' },
        { title: 'You stay informed', desc: 'Monthly reports. Real-time alerts. One coordinator who handles everything so you don\'t have to manage a roster of strangers.' },
      ],
    },
    carebyMeaning: {
      headline: 'What Careby means',
      items: [
        {
          label: 'Care by',
          word: 'Experts',
          def: 'Doctor-stamped diagnostics. Zero filler biomarkers. Age-specific panels designed for your actual risk profile — not a generic 100-marker list built to look impressive.',
        },
        {
          label: 'Care by',
          word: 'Love',
          def: "Caregivers who speak your parents' language, remember their routines, and treat them like family — because data briefings mean nothing without genuine human warmth.",
        },
        {
          label: 'Care by',
          word: 'Trust',
          def: 'Only 1 in 8 applicants pass our vetting. Background checked, reference verified, culturally matched. If the fit isn\'t right, we replace them in 48 hours — no questions asked.',
        },
      ],
      result: 'A healthcare experience that\'s personal, proactive, and built around your family — not the system.',
      resultEm: 'your family',
    },
    whyCarebyExists: {
      eyebrow: 'Why Careby exists',
      title: 'The gaps are real.',
      titleEm: 'So is the fix.',
      stats: [
        {
          num: '6.5',
          numEm: 'M',
          title: 'Canadians without a family doctor',
          body: 'The system wasn\'t built for everyone. Careby coordinates healthcare for the families it left behind.',
          source: 'Source: Statistics Canada',
        },
        {
          num: 'Up to ',
          numEm: '90%',
          title: 'Reduction in healthcare wait times',
          body: 'Powered by our GoToDoctor partnership — cutting waits for physicians, specialists, and diagnostic imaging.',
          source: 'Source: GoToDoctor',
        },
        {
          num: '',
          numEm: '#1',
          title: 'Longest wait times of 11 peer nations',
          body: 'Canada ranks last for access to family doctors, specialists, and emergency care. We\'re fixing that — for your household.',
          source: 'Source: Commonwealth Fund',
        },
        {
          num: 'Only ',
          numEm: '43%',
          title: 'Of Canadians can see a doctor same-day',
          body: 'The OECD average is 57%. In the Netherlands it\'s 77%. Every Careby member gets same-day virtual physician access — no referral, no waiting room.',
          source: 'Source: Commonwealth Fund',
        },
        {
          num: '1 ',
          numEm: 'in',
          numAfter: ' 8',
          title: 'Caregivers pass our vetting',
          body: 'Background checked, reference checked, culturally matched, data-briefed. The other 7 never meet your family.',
          source: 'Careby Gold Standard',
        },
      ],
      guarantee: {
        title: '48-Hour Replacement Guarantee',
        body: 'If your caregiver isn\'t right, we replace them within 48 hours. No fees. No guilt. No questions asked. Only 1 in 8 applicants pass our vetting — that\'s why we can make this promise.',
        cta: 'Get Started →',
      },
    },
    services: {
      sectionTitle: 'Our Core Services',
      title: 'Comprehensive Health and Care Services',
      subtitle: 'AI-powered technology connecting quality medical and life resources.',
      service1: {
        title: 'Virtual Doctors & Fast Access',
        subtitle: 'Skip long wait times and complicated healthcare systems.',
        desc: 'Reduce specialist and diagnostic wait times by over 50% through guided care navigation. Virtual care supported by nationwide clinic and pharmacy network.',
        details: {
          solutions: {
            title: 'Our Solution',
            items: [
              'Reduce specialist and diagnostic wait times by over 50% on average through guided care navigation',
              'Virtual care supported by a nationwide network of clinic location and pharmacy for blood work, diagnostics, and physical assessments',
              'Same-day and extended-hour appointments, including evenings and weekends',
              'Doctor consultations, on-site testing, and prescription pickup coordinated in a single visit',
              'Integrated e-prescribing with medications sent directly to your preferred pharmacy or delivered to your home',
            ],
          },
          result: 'Save time, reduce time off work, and get care when virtual works — with physical backup when it doesn\'t.',
        },
      },
      service2: {
        title: 'Trusted In-Home Care Services',
        subtitle: 'Professional care, delivered safely in your home.',
        desc: 'Carefully vetted personal support workers, therapists, nutritionists, and home care professionals. Personalized in-home care plans for seniors and families.',
        details: {
          solutions: {
            title: 'Our Solution',
            items: [
              'Carefully vetted personal support workers, therapists, nutritionists, and home care professionals',
              'Personalized in-home care plans for seniors and families',
              'Flexible support for daily care, recovery, and long-term wellness',
              'Multilingual support available',
            ],
          },
          result: 'Reliable care for seniors, families, and anyone who needs support at home.',
        },
      },
      service3: {
        title: 'Innovative Health Solutions',
        subtitle: 'Proactive care powered by advanced technology and medical expertise.',
        desc: 'AI smart wearables and contactless health monitoring. Advanced health testing with personalized reports combining Western medicine and TCM insights.',
        details: {
          solutions: {
            title: 'Our Solution',
            items: [
              'AI smart wearables and contactless health monitoring',
              'Advanced genetic and comprehensive health testing',
              'Personalized reports combining Western medicine and TCM insights',
              'Ongoing expert review with lifestyle, nutrition, and wellness guidance',
            ],
          },
          result: 'Monitor your health, understand your body, and prevent problems before they start.',
        },
      },
      service4: {
        title: 'Benefits & Financial Assistance',
        subtitle: 'Expert support to help you access the benefits and financial support you deserve.',
        desc: 'Guidance on government benefits and senior financial assistance programs. Insurance and coverage support for long-term care and retirement needs.',
        details: {
          solutions: {
            title: 'Our Solution',
            items: [
              'Guidance on government benefits and senior financial assistance programs',
              'Insurance and coverage support',
              'Support exploring home-based financial options to fund long-term care and retirement needs',
            ],
          },
          result: 'Reduce financial stress and make sure you receive every benefit and support option available to you.',
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
      title: 'Partnering with Industry Leaders for Smart Healthcare',
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
      colCareby: 'Careby',
      colCompany: 'Company',
      colServices: 'Services',
      colLegal: 'Legal',
      colConnect: 'Connect',
      plansPricing: 'Plans & Pricing',
      bookConsultation: 'Book Consultation',
      faqs: 'FAQs',
      trustLine: 'Trusted by families across the GTA. Doctor-reviewed care, bilingual support.',
      certified: 'PHIPA Compliant',
      licensedOntario: 'Licensed in Ontario',
    },
    faq: {
      sectionTitle: 'FAQ',
      title: 'Frequently Asked Questions',
    },
    membership: {
      sectionTitle: 'Plans & Pricing',
      title: 'Start with one thing. Add what you need.',
      mostPopular: 'Most Popular',
      bookConsultation: 'Book Free Consultation',
    },
    divisions: {
      sectionTitle: 'Our Divisions',
      title: 'Who We Serve',
      subtitle: 'Three primary sectors, one trusted partner.',
      health: {
        title: 'Careby Health',
        desc: 'Bloodwork, diagnostics, and AI-powered health analytics software.',
        image: '/careby-health-card.png',
      },
      home: {
        title: 'Careby Home',
        desc: 'Structured packages integrating home services with telehealth support.',
        image: '/home-care.jpg',
      },
      corporate: {
        title: 'Careby Corporate',
        desc: 'Teledoctor and workplace support for companies.',
        image: '/corporate.jpg',
      },
    },
  },
  zh: {
    nav: {
      switchLang: 'English',
    },
    hero: {
      eyebrow: '多伦多 · 中英粤语 · 医生审核 · PHIPA 合规',
      tagline: '康伴，家庭健康常陪伴',
      headline: '康伴，家庭健康常陪伴',
      headlinePrefix: '',
      headlineSuffix: '',
      subheadline: '为多伦多老年人及其家庭提供优质上门护理、健康导航和支持服务。',
      subheadlineStrong: 'AI 驱动诊断、当日远程医生、上门认证护理员。家庭医生做不到的，我们一站式搞定。',
      slogan: '高端家庭护理 • 智能跌倒检测 • 即时远程医疗 • 再生疗法 • 超越基础支持。',
      ctaPrimary: '探索平台',
      ctaSecondary: '预约咨询',
      secondaryConsult: '不确定？先和我们聊聊',
      plansLink: '查看全部方案 ↓',
      trustChips: [
        '无需转介',
        '无需候诊',
        '当日远程医生',
        '上门服务',
        '医生解读报告，非 PDF 了事',
        '中英粤语',
      ],
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
    painPoints: {
      sectionTitle: '康伴 为谁而建',
      title: '体制留下的三个缺口。',
      titleEm: '我们全部补齐。',
      problems: [
        {
          situation: '体制不会持续监测你',
          fear: '「医生一年才见我一回。中间全靠自己。我根本不知道身体在发生什么。」',
          answer: '康伴 的 AI 诊断只测与你年龄和风险真正相关的生物标志物，零凑数。每份结果都由医生解读并给出下一步建议。预防优先，管理清晰，不再靠猜。',
          answerEm: '零凑数',
        },
        {
          situation: '加拿大医疗系统不会派人上门',
          fear: '「她换了新药。我在上班。她一个人住。医疗系统没人能上门。我不知道该找谁。」',
          answer: '康伴 把经过背调、文化匹配的护理员直接派到父母家——进门之前就掌握情况、会讲他们的语言。PSW 上门、陪診、康伴、治疗，全程协调、有记录，不会漏掉任何人。',
          answerEm: '会讲他们的语言',
        },
        {
          situation: '等待没有尽头',
          fear: '「专科要等 30 周。walk-in 排 5 小时。家庭医生不收新病人。每扇门都关着。」',
          answer: 'GoToDoctor 让您家当天就能看医生——普通话、粤语或英语，处方同日发到药房。我们的积分可通用：PSW、治疗师、营养师、康伴、陪診。家里这个月需要什么，就用在什么上。',
          answerEm: '家里这个月需要什么',
        },
      ],
    },
    weCloseAll: {
      eyebrow: '简单易行',
      title: '我们全部补齐。',
      steps: [
        { title: '选择您的方案', desc: '在线几分钟完成购买。从血检、护理套餐或康伴订阅开始，或三者组合。' },
        { title: '与协调员对接', desc: '我们为您的家庭指派专属双语护理协调员，先了解您的情况再安排后续。' },
        { title: '我们匹配并培训您的团队', desc: '护理员、康伴、护士、专科等每位成员都会与您的家庭匹配，并在上岗前掌握您的资料。' },
        { title: '您随时掌握动态', desc: '月度报告、实时提醒。一位协调员统筹一切，您无需面对一长串陌生人。' },
      ],
    },
    carebyMeaning: {
      headline: '康伴 意味着什么',
      items: [
        {
          label: 'Care by',
          word: 'Experts',
          def: '医生签名的诊断。零凑数生物标志物。为你的年龄和风险定制的检测方案，而不是一份看起来很长实际没用的100项清单。',
        },
        {
          label: 'Care by',
          word: 'Love',
          def: '会讲父母语言的护理员，记住他们的习惯，待他们如家人——因为数据简报再好，也比不上真诚的温暖。',
        },
        {
          label: 'Care by',
          word: 'Trust',
          def: '仅 1/8 的申请者通过我们的审核。背景调查、推荐人核实、文化匹配。48 小时内可无条件更换。',
        },
      ],
      result: '一份围绕你的家庭而非围绕体制运转的、个性化的、主动的医疗健康体验。',
      resultEm: '你的家庭',
    },
    whyCarebyExists: {
      eyebrow: '康伴 为何存在',
      title: '差距真实存在。',
      titleEm: '解决方案也是。',
      stats: [
        {
          num: '650',
          numEm: '万',
          title: '加拿大人没有家庭医生',
          body: '医疗系统并非为每个人设计。康伴 为被遗漏的家庭协调健康服务。',
          source: '来源：加拿大统计局',
        },
        {
          num: '最高减少 ',
          numEm: '90%',
          title: '医疗候诊时间',
          body: '通过我们的 GoToDoctor 合作伙伴，大幅缩短医生、专科及影像诊断的等待时间。',
          source: '来源：GoToDoctor',
        },
        {
          num: '',
          numEm: '#1',
          title: '11 个同行国家中等待最久',
          body: '加拿大在家庭医生、专科及急诊获取方面排名倒数第一。我们正在为您的家庭改变这一现状。',
          source: '来源：Commonwealth Fund',
        },
        {
          num: '仅 ',
          numEm: '43%',
          title: '加拿大人能当天看到医生',
          body: 'OECD 平均为 57%，荷兰为 77%。康伴 会员当天即可虚拟问诊，无需转介或排队。',
          source: '来源：Commonwealth Fund',
        },
        {
          num: '仅 ',
          numEm: '1/8',
          numAfter: '',
          title: '护理员通过我们的筛选',
          body: '背景调查、推荐人核实、文化匹配、数据培训。其余七人永远不会接触您的家人。',
          source: '康伴 金牌标准',
        },
      ],
      guarantee: {
        title: '48 小时更换保障',
        body: '如果护理员不合适，48 小时内免费更换。无费用、无压力、无需解释。仅 1/8 的申请者通过筛选——这就是我们敢做出承诺的底气。',
        cta: '立即开始 →',
      },
    },
    services: {
      sectionTitle: '我们的核心服务',
      title: '全方位的健康与照护服务',
      subtitle: '以AI科技为核心，连接优质医疗与生活资源。',
      service1: {
        title: '虚拟医生与快速访问',
        subtitle: '跳过漫长的等待时间和复杂的医疗系统。',
        desc: '通过引导式护理导航，减少超过50%的专科医生和诊断等待时间。虚拟护理由全国诊所和药房网络支持。',
        details: {
          solutions: {
            title: '我们的解决方案',
            items: [
              '通过引导式护理导航，平均减少超过50%的专科医生和诊断等待时间',
              '虚拟护理由全国诊所和药房网络支持，提供血液检查、诊断和身体评估',
              '当日和延长时段预约，包括晚上和周末',
              '医生咨询、现场检测和处方取药在一次访问中协调完成',
              '集成电子处方，药物直接发送到您首选的药房或配送到家',
            ],
          },
          result: '节省时间，减少工作时间损失，在虚拟医疗可行时获得护理——在需要时提供实体支持。',
        },
      },
      service2: {
        title: '值得信赖的家庭护理服务',
        subtitle: '专业护理，安全送到您家。',
        desc: '经过严格筛选的个人支持工作者、治疗师、营养师和家庭护理专业人员。为老年人和家庭提供个性化的家庭护理计划。',
        details: {
          solutions: {
            title: '我们的解决方案',
            items: [
              '经过严格筛选的个人支持工作者、治疗师、营养师和家庭护理专业人员',
              '为老年人和家庭提供个性化的家庭护理计划',
              '灵活的日常护理、康复和长期健康支持',
              '提供多语言支持',
            ],
          },
          result: '为老年人、家庭和任何需要家庭支持的人提供可靠的护理。',
        },
      },
      service3: {
        title: '创新健康解决方案',
        subtitle: '由先进技术和医疗专业知识驱动的主动护理。',
        desc: 'AI智能可穿戴设备和非接触式健康监测。先进的健康检测，提供结合西医和中医见解的个性化报告。',
        details: {
          solutions: {
            title: '我们的解决方案',
            items: [
              'AI智能可穿戴设备和非接触式健康监测',
              '先进的基因和综合健康检测',
              '结合西医和中医见解的个性化报告',
              '持续专家审查，提供生活方式、营养和健康指导',
            ],
          },
          result: '监测您的健康，了解您的身体，在问题出现之前预防。',
        },
      },
      service4: {
        title: '福利与财务援助',
        subtitle: '专家支持，帮助您获得应得的福利和财务支持。',
        desc: '政府福利和老年人财务援助计划指导。保险和保障支持，为长期护理和退休需求提供资金。',
        details: {
          solutions: {
            title: '我们的解决方案',
            items: [
              '政府福利和老年人财务援助计划指导',
              '保险和保障支持',
              '支持探索基于家庭的财务选项，为长期护理和退休需求提供资金',
            ],
          },
          result: '减少财务压力，确保您获得所有可用的福利和支持选项。',
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
            '初步评估：任何 康伴 护理套餐免费',
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
      flowDesc: '康伴 AI将多模态数据整合进健康云，智能匹配医疗资源与护理服务。',
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
      cta: '这就是我们创建 康伴 的原因。',
    },
    platformSection: {
      title: '五大整合服务。一个无缝平台。',
      description: '康伴 不是一个家庭护理机构。我们是一个完整的健康协调平台，结合专业护理人员、预测性 AI 技术、按需医疗访问和前沿长寿医学。',
      conclusion: '大多数机构提供护理人员。我们提供完整的健康生态系统。',
    },
    partners: {
      sectionTitle: '权威合作',
      title: '携手行业领军者，共建智慧医疗生态',
      subtitle: '我们与加拿大本地及国际领先医疗机构深度合作。',
      quote: '康伴 平台 与 GoToDoctor 等合作伙伴共同打造快速医疗匹配系统，整合远程问诊、上门护理与健康管理服务，为用户提供安全高效的一站式解决方案。',
    },
    impact: {
      sectionTitle: '我们的愿景',
      title: '科技赋能健康生活',
      subtitle: '让每个家庭都能享受智慧、贴心的健康照护。',
      metric1: '服务覆盖人数',
      metric2: '平台认证护理师',
      metric3: '用户满意度',
      testimonial: '康伴 平台 让我父母的术后照护更安心，我能实时在App中看到健康变化。',
      author: '— Anna, Toronto',
    },
    cta: {
      quote: '科技与关怀同行，让健康更近一步。',
      title: '康伴 平台 — 智慧医疗，让健康触手可及。',
      subtitle: '康伴 平台 — Smarter Healthcare, Closer to Home.',
      button: '马上体验',
    },
    footer: {
      copyright: '© 2025 康伴 平台 | 智慧医疗，让健康触手可及。',
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
      colCareby: '康伴',
      colCompany: '公司',
      colServices: '服务',
      colLegal: '法律',
      colConnect: '联系',
      plansPricing: '方案与价格',
      bookConsultation: '预约咨询',
      faqs: '常见问题',
      trustLine: '深受 GTA 家庭信赖。医生解读、中英粤语支持。',
      certified: '符合 PHIPA',
      licensedOntario: '安大略省持牌',
    },
    faq: {
      sectionTitle: '常见问题',
      title: '常见问题',
    },
    membership: {
      sectionTitle: '方案与价格',
      title: '从一项开始，按需添加。',
      mostPopular: '最受欢迎',
      bookConsultation: '预约免费咨询',
    },
    divisions: {
      sectionTitle: '我们的业务板块',
      title: '我们服务谁',
      subtitle: '三大板块，一个值得信赖的伙伴。',
      health: {
        title: '康伴 健康',
        desc: '血检、诊断与 AI 驱动的健康分析软件。',
        image: '/careby-health-card.png',
      },
      home: {
        title: '康伴 居家',
        desc: '居家服务与远程医疗相结合的结构化套餐。',
        image: '/home-care.jpg',
      },
      corporate: {
        title: '康伴 企业',
        desc: '企业远程医生与职场健康支持。',
        image: '/corporate.jpg',
      },
    },
  },
}

const partners: { name: string; logo: string; description?: string; url?: string }[] = [
  { 
    name: 'GoToDoctor', 
    logo: '/partners/gotodoctor.png',
    description: '24/7 telehealth consultations in English, Mandarin, and Cantonese',
    url: 'https://gotodoctor.ca/careby/'
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
    logo: '/partners/Ebovir .png',
    description: 'Advanced health solutions'
  },
  {
    name: 'Longevity AI',
    logo: '/partners/longevity-ai.png',
    description: 'AI-powered health analytics and biological age tracking'
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
  email: 'hello@getcareby.ca',
  privacyEmail: 'hello@getcareby.ca',
  billingEmail: 'hello@getcareby.ca',
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
        'Plans start with The Essentialist at $399/yr for blood diagnostics. Home care from $1,499/mo, Companion from $199/mo, and Family Health Hub at $2,499/yr for up to 6 people. Individual services and credits also available.',
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
      question: '康伴 的费用是多少？',
      answer:
        '血检入门方案 The Essentialist $399/年；居家护理从 $1,499/月起，康伴从 $199/月起，家庭健康中心 $2,499/年（最多6人）。也可单独购买服务或积分。',
    },
    {
      question: '你们只为中文家庭服务吗？',
      answer:
        '不是。我们为所有寻求优质老年护理的多伦多家庭服务。我们的护理人员和员工能够为整个大多伦多地区的多元化社区提供服务，特别擅长英语、普通话和粤语。',
    },
    {
      question: '你们如何审查护理人员？',
      answer:
        '每位护理人员都经过我们的 康伴 黄金标准™ 10/10 审查流程，包括背景调查、推荐人验证、技能评估、可靠性评分和持续绩效监控。',
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
      question: '康伴 是否由 OHIP 或保险覆盖？',
      answer:
        '大多数 康伴 服务是自费服务，不在 OHIP 覆盖范围内。但是，我们帮助会员了解他们拥有的福利，并在可用的情况下最大化覆盖范围。',
    },
    {
      question: '康伴 有什么不同？',
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
        title={seoLang === 'en' ? 'Privacy Policy - Careby' : '隐私政策 - 康伴'}
        description={seoLang === 'en' ? 'Careby Privacy Policy - Learn how we protect your personal and health information in compliance with PIPEDA and Ontario healthcare regulations.' : '康伴隐私政策 - 了解我们如何根据PIPEDA和安大略省医疗法规保护您的个人和健康信息。'}
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
          title={seoLang === 'en' ? 'Terms of Service - Careby' : '服务条款 - 康伴'}
          description={seoLang === 'en' ? 'Careby Terms of Service - Read our membership terms, cancellation policies, and service agreements for home care services in Ontario.' : '康伴服务条款 - 阅读我们在安大略省提供家庭护理服务的会员条款、取消政策和服务协议。'}
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
          title={seoLang === 'en' ? 'About Us - Careby' : '关于我们 - 康伴'}
          description={seoLang === 'en' ? 'Learn about Careby Solutions Inc. - Our mission to provide premium home care services and health navigation for Toronto seniors and families.' : '了解康伴 - 我们致力于为多伦多老年人和家庭提供优质家庭护理服务和健康导航。'}
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
      <div className="min-h-screen w-full bg-[#FDFAF5] text-midnight relative overflow-x-hidden pb-[100px] sm:pb-0">
        <StickyNav lang={lang} setLang={setLang} />
        <HeroSection t={t as typeof content.en} lang={lang} />
        <WhoWeServeSection t={t as typeof content.en} />
        {/* Temporarily hidden - uncomment to restore */}
        {/* <NewSection t={t as typeof content.en} lang={lang} /> */}
        {/* <PlatformSection t={t as typeof content.en} lang={lang} /> */}
        <PainPointsSection t={t as typeof content.en} lang={lang} />
        <WeCloseAllSection t={t as typeof content.en} />
        <CarebyMeaningSection t={t as typeof content.en} />
        {/* <ServiceSection t={t as typeof content.en} lang={lang} /> */}
        {/* <TechnologySection t={t as typeof content.en} lang={lang} onHowItWorks={() => setShowHowItWorks(true)} /> */}
        <PartnersSection t={t as typeof content.en} />
        <ImpactSection t={t as typeof content.en} />
        <MembershipTiersSection t={t as typeof content.en} lang={lang} />
        <FAQSection t={t as typeof content.en} lang={lang} />
        {/* <FinalCTASection t={t as typeof content.en} /> */}
        <WhyCarebyExistsSection t={t as typeof content.en} />
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
        className="bg-primary hover:bg-primary/90 fixed z-[9999] sm:hidden inline-flex items-center justify-center min-h-[48px] py-3.5 px-5 text-white text-[15px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-full shadow-lg"
        style={{ 
          position: 'fixed', 
          bottom: 'max(30px, env(safe-area-inset-bottom))', 
          left: 'max(16px, env(safe-area-inset-left))', 
          right: 'calc(56px + 15px + max(16px, env(safe-area-inset-right)))',
        }}
        onFocus={(e) => {
          e.currentTarget.style.outlineColor = '#3B8C75'
        }}
      >
        <span>
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

function StickyNav({ lang, setLang }: { lang: 'en' | 'zh' | 'zh-TW'; setLang: (l: 'en' | 'zh' | 'zh-TW') => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isEn = lang === 'en' || lang === 'zh-TW'

  const getNextLang = () => {
    if (lang === 'en') return 'zh'
    if (lang === 'zh') return 'zh-TW'
    return 'en'
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = isEn ? [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Plans & Pricing', href: 'https://app.getcareby.ca/' },
    { label: 'FAQs', href: '#faq' },
  ] : [
    { label: '服务介绍', href: '#how-it-works' },
    { label: '方案与价格', href: 'https://app.getcareby.ca/' },
    { label: '常见问题', href: '#faq' },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  return (
    <motion.nav
      className="fixed left-0 right-0 z-[999] pt-[max(12px,env(safe-area-inset-top,0px))] px-4 pb-2 sm:pt-5 sm:px-10 md:px-16 lg:px-24"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mx-auto max-w-6xl w-full flex flex-col items-stretch min-w-0">
      <div className={`w-full rounded-full backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] pl-4 pr-2 py-2.5 sm:pl-5 sm:pr-3 sm:py-3 flex items-center justify-between transition-all duration-500 min-w-0 ${
        scrolled
          ? 'bg-[#0f172a]/75'
          : 'bg-white/10'
      }`}>
        {/* Left: Logo */}
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className="shrink-0 flex items-center justify-center min-w-0">
          <img
            src={lang === 'en' ? '/carebylogo_white.svg' : '/logo-zh.png'}
            alt="Careby"
            className="h-7 w-auto sm:h-8 object-center"
          />
        </a>

        {/* Center: Nav links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-1 min-w-0 mx-4 self-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="px-4 py-2 text-[14px] font-medium text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: 桌面 CTA；手机 语言+电话+汉堡（在汉堡左侧） */}
        <div className="hidden md:flex items-center justify-center gap-2 shrink-0 self-center">
          <a
            href="https://app.getcareby.ca/"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white text-[14px] font-semibold px-6 py-2.5 rounded-full transition-all hover:shadow-[0_4px_16px_rgba(42,139,98,0.4)]"
          >
            {isEn ? 'Get Started' : '立即开始'}
          </a>
        </div>

        <div className="md:hidden flex items-center justify-center gap-2 shrink-0 self-center">
          <button
            onClick={() => setLang(getNextLang())}
            className="p-2.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition min-touch"
            aria-label={lang === 'en' ? 'Switch to 简体中文' : lang === 'zh' ? 'Switch to 繁體中文' : 'Switch to English'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </button>
          {!contactInfo.phone.includes('XXX') && (
            <a
              href={`tel:+1${contactInfo.phone.replace(/\D/g, '')}`}
              className="p-2.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition"
              aria-label="Call"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/70 hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mt-2 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-4 flex flex-col gap-1"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all min-touch"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 mt-2 border-t border-white/10">
              <button
                onClick={() => { setLang(getNextLang()); setMobileOpen(false); }}
                className="p-2.5 text-white/70 hover:text-white rounded-xl bg-white/10 min-touch"
                aria-label={lang === 'en' ? 'Switch to 简体中文' : lang === 'zh' ? 'Switch to 繁體中文' : 'Switch to English'}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
              {!contactInfo.phone.includes('XXX') && (
                <a href={`tel:+1${contactInfo.phone.replace(/\D/g, '')}`} className="p-2.5 text-white/70 rounded-xl bg-white/10" aria-label="Call">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
              )}
            </div>
            <a
              href="https://app.getcareby.ca/"
              className="flex items-center justify-center bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all mt-1"
            >
              {isEn ? 'Get Started' : '立即开始'}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.nav>
  )
}

function HeroSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const typingWords = {
    en: ['Trust', 'Experts', 'Love'],
    zh: ['康伴', '家庭健康常陪伴'],
    'zh-TW': ['康伴', '家庭健康常陪伴'],
  }
  const currentTypingWords = typingWords[lang] || typingWords.en
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState(currentTypingWords[0] || 'Trust')
  const [isDeleting, setIsDeleting] = useState(false)
  // Adjust speed based on language: Chinese needs slower speed
  const baseTypingSpeed = lang === 'zh' ? 250 : 150
  const baseDeletingSpeed = lang === 'zh' ? 150 : 100
  const [typingSpeed, setTypingSpeed] = useState(baseTypingSpeed)
  const [isInitial, setIsInitial] = useState(true)
  const [videoPosition, setVideoPosition] = useState('center 20%')
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const introVideoRef = useRef<HTMLVideoElement>(null)   // 1: agent
  const intro2VideoRef = useRef<HTMLVideoElement>(null) // 2: girl
  const loopVideoRef = useRef<HTMLVideoElement>(null)   // 3: original
  const [currentVideo, setCurrentVideo] = useState(0)   // 0=agent, 1=girl, 2=original → cycle
  const [canPlay0, setCanPlay0] = useState(false)
  const [canPlay1, setCanPlay1] = useState(false)
  const [canPlay2, setCanPlay2] = useState(false)
  const [isWeChat, setIsWeChat] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Detect WeChat browser
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isWeChatBrowser = /micromessenger/i.test(ua)
    setIsWeChat(isWeChatBrowser)
  }, [])

  // Handle video playback for WeChat browser and mobile (third video in cycle)
  useEffect(() => {
    if (currentVideo !== 2) return
    const video = loopVideoRef.current
    if (!video) return

    setCanPlay2(false)

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
        setCanPlay2(true)
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
          setCanPlay2(true)
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
      setCanPlay2(true)
      if (isMobile || isWeChat) {
        tryPlay()
      }
    }

    const handleCanPlay = () => {
      setCanPlay2(true)
      tryPlay()
    }

    const handleCanPlayThrough = () => {
      setCanPlay2(true)
      tryPlay()
    }

    const handlePlaying = () => {
      isPlaying = true
      setCanPlay2(true)
    }

    const handlePlay = () => {
      isPlaying = true
      setCanPlay2(true)
    }

    const handlePause = () => {
      isPlaying = false
    }

    const handleError = () => {
      setCanPlay2(false)
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
        if (video.readyState >= 2) {
          setCanPlay2(true)
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
  }, [currentVideo, isWeChat, userInteracted])

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
    setDisplayText(currentTypingWords[0] || 'Trust')
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
      className="relative px-4 pb-12 pt-[calc(56px+env(safe-area-inset-top,0px))] text-soft sm:px-10 md:px-16 lg:px-24 sm:pt-16 sm:pb-24 min-h-[calc(67vh+80px)] sm:min-h-[calc(55vh+100px)] overflow-x-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Video: 1 agent → 2 girl → 3 original → 1 … (three-video cycle) */}
      <div className="absolute inset-0 bg-midnight overflow-hidden">
        <video
          ref={introVideoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentVideo === 0 && canPlay0 ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectPosition: videoPosition, pointerEvents: 'none' }}
          onCanPlay={() => setCanPlay0(true)}
          onEnded={() => {
            setCurrentVideo(1)
            intro2VideoRef.current?.play()
          }}
          onError={() => {
            setCurrentVideo(1)
            intro2VideoRef.current?.play()
          }}
        >
          <source src="/hero-intro-agent.mp4" type="video/mp4" />
        </video>
        <video
          ref={intro2VideoRef}
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentVideo === 1 && canPlay1 ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectPosition: videoPosition, pointerEvents: 'none' }}
          onCanPlay={() => setCanPlay1(true)}
          onEnded={() => {
            setCurrentVideo(2)
            loopVideoRef.current?.play()
          }}
          onError={() => {
            setCurrentVideo(2)
            loopVideoRef.current?.play()
          }}
        >
          <source src="/hero-intro-portrait.mp4" type="video/mp4" />
        </video>
        <video
          ref={loopVideoRef}
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentVideo === 2 && canPlay2 ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectPosition: videoPosition, pointerEvents: 'none' }}
          onCanPlay={() => setCanPlay2(true)}
          onEnded={() => {
            setCurrentVideo(0)
            const v = introVideoRef.current
            if (v) {
              v.currentTime = 0
              v.play()
            }
          }}
          onError={() => {
            setCurrentVideo(0)
            const v = introVideoRef.current
            if (v) {
              v.currentTime = 0
              v.play()
            }
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback background color overlay */}
        <div className="absolute inset-0 bg-midnight/30" />
      </div>
      
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 sm:gap-12 lg:gap-16 lg:flex-row lg:items-end lg:justify-start min-h-[calc(60vh+100px)] sm:min-h-[calc(48vh+100px)] pt-8 sm:pt-20 lg:pt-12 text-left justify-end">
        <motion.div
          className="text-left lg:max-w-xl w-full relative px-0 pb-8 sm:pb-0 space-y-4 sm:space-y-5 mt-auto lg:mt-0"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {'eyebrow' in t.hero && t.hero.eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-yellow-400">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shrink-0" />
              <span className="break-words">{(t.hero as { eyebrow?: string }).eyebrow}</span>
            </div>
          )}
          <h1
            id="hero-heading"
            className="text-left font-bold text-white"
            itemProp="headline"
          >
            {lang === 'en' ? (
              <span className="block text-5xl leading-[1.15] sm:text-6xl sm:leading-[1.12] md:text-7xl lg:text-8xl xl:text-9xl">
                <span>{t.hero.headlinePrefix}</span>
                {' '}
                <span className="relative inline-block min-w-[140px] sm:min-w-[220px] md:min-w-[280px] lg:min-w-[320px] align-baseline">
                  <span className="hand-drawn-underline">
                    {displayText}
                  </span>
                  {!isInitial && (
                    <span className="inline-block w-0.5 h-3 sm:h-5 bg-yellow-400 ml-0.5 align-middle animate-pulse" aria-hidden />
                  )}
                </span>
                {t.hero.headlineSuffix ? (
                  <span> {t.hero.headlineSuffix}</span>
                ) : null}
              </span>
            ) : (
              <span className="block text-white font-bold text-5xl leading-[1.4] sm:text-6xl sm:leading-[1.3] md:text-7xl lg:text-8xl">
                <span className="hand-drawn-underline">康伴</span>
                <br />
                <span className="block mt-0.5 sm:mt-1">家庭健康</span>
                <span className="block leading-tight">常陪伴</span>
              </span>
            )}
          </h1>
          {'subheadlineStrong' in t.hero && (t.hero as { subheadlineStrong?: string }).subheadlineStrong && (
            <p className="text-sm sm:text-base text-white/80 leading-relaxed text-left max-w-xl">
              <span className="font-medium text-white/95">{(t.hero as { subheadlineStrong: string }).subheadlineStrong}</span>
            </p>
          )}
          {(t.hero as Record<string, unknown>).secondaryConsult != null && (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="https://app.getcareby.ca/" className="inline-flex items-center gap-2 text-white hover:text-white/90 text-sm transition">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs">💬</span>
                {(t.hero as { secondaryConsult: string }).secondaryConsult}
              </a>
              <span className="h-4 w-px bg-white/15" aria-hidden />
              <a href="https://app.getcareby.ca/" className="text-sm text-white hover:text-emerald-400 transition">
                {(t.hero as { plansLink?: string }).plansLink}
              </a>
            </div>
          )}
          {'trustChips' in t.hero && Array.isArray((t.hero as { trustChips?: string[] }).trustChips) && (
            <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-2 pt-4 sm:pt-6 border-t border-white/10">
              {((t.hero as { trustChips: string[] }).trustChips).map((chip, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[11.5px] text-white">
                  <span className="h-0.75 w-0.75 rounded-full bg-yellow-400" />
                  {chip}
                </span>
              ))}
            </div>
          )}
          <a
            ref={buttonRef}
            href="https://app.getcareby.ca/"
            className="bg-primary hover:bg-primary/90 hidden sm:inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 text-lg sm:text-xl font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto rounded-full shadow-lg"
            onFocus={(e) => {
              e.currentTarget.style.outlineColor = '#3B8C75'
            }}
          >
            {t.hero.ctaPrimary}
          </a>
        </motion.div>
      </div>
    </section>
  )
}


function ServiceModal({ 
  service, 
  isOpen, 
  onClose,
  lang
}: { 
  service: typeof content.en.services.service1 | typeof content.en.services.service2 | typeof content.en.services.service3 | typeof content.en.services.service4 | null, 
  isOpen: boolean, 
  onClose: () => void,
  lang?: 'en' | 'zh' | 'zh-TW'
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
                {(() => {
                  const details = service.details as any
                  if (!('services' in details) || !details.services || !Array.isArray(details.services) || ('problem' in details)) {
                    return null
                  }
                  const services = details.services as Array<{ category: string; items: string[] }>
                  return (
                    <div className="mb-8">
                      <h3 className="mb-4 text-xl font-semibold text-midnight">
                        {services[0]?.category === 'Services available' ? 'Services available:' : 'Our services include:'}
                      </h3>
                      <div className="space-y-6">
                        {services.map((category, index) => (
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
                  ) as any
                })() as any}

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
                    <p className="text-slate-700">{String(service.details.idealFor)}</p>
                  </div>
                )}

                {/* Pricing Section */}
                {(() => {
                  const details = service.details as any
                  if (!('pricing' in details) || !details.pricing || !Array.isArray(details.pricing)) {
                    return null
                  }
                  const pricing = details.pricing as string[]
                  return (
                    <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-white via-primary/5 to-accent/5 p-8 shadow-lg">
                      <div className="mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-primary">payments</span>
                        <h3 className="text-2xl font-bold text-midnight">
                          {lang === 'zh' ? '价格' : 'Pricing'}
                        </h3>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {pricing.map((price: string, index: number) => {
                          // Split by | if it contains multiple price options
                          const priceParts = price.split('|').map((p: string) => p.trim())
                          
                          return (
                            <div
                              key={index}
                              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                            >
                              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-primary/5" />
                              <div className="relative">
                                {priceParts.map((part: string, partIndex: number) => {
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
                          {lang === 'zh' ? (
                            <><span className="font-semibold text-primary">说明：</span>所有价格均为加元。可根据需求定制套餐。</>
                          ) : (
                            <><span className="font-semibold text-primary">Note:</span> All prices are in CAD. Custom packages available upon request.</>
                          )}
                        </p>
                      </div>
                    </div>
                  ) as any
                })() as any}
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
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:py-32 sm:px-10 md:px-16 lg:px-24">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-red-500 blur-3xl" style={{ animationDuration: '4s' }} />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-primary blur-3xl" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-6xl">
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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary px-6 py-20 lg:py-32 sm:px-10 md:px-16 lg:px-24">
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

      <div className="relative mx-auto max-w-6xl">
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

function WhoWeServeSection({ t }: { t: typeof content.en }) {
  const isEn = !t.divisions.sectionTitle.includes('板块')
  const divisions = [
    {
      key: 'health' as const,
      features: isEn
        ? ['Doctor-reviewed bloodwork panels', 'AI-powered health analytics (Longevity AI)', 'Mobile blood draw — we come to you', 'Bilingual NP consultation included']
        : ['医生审核血检方案', 'AI驱动健康分析（Longevity AI）', '上门采血', '中英粤语护理师咨询'],
      cta: isEn ? 'Explore Health →' : '了解健康服务 →',
    },
    {
      key: 'home' as const,
      imgPosition: 'object-top',
      featured: true,
      features: isEn
        ? ['Dedicated bilingual PSW matched to your family', 'Flexible service credits system', 'Weekly coordinator check-ins', 'GoToDoctor virtual doctor access']
        : ['专属双语护理员匹配', '灵活服务积分系统', '协调员每周跟进', 'GoToDoctor远程医生'],
      cta: isEn ? 'Explore Home Care →' : '了解居家护理 →',
    },
    {
      key: 'corporate' as const,
      features: isEn
        ? ['Teledoctor for employees', 'Workplace health support programs', 'Scalable plans from $8/employee/mo', 'Bilingual service across Canada']
        : ['员工远程医生', '职场健康支持计划', '灵活方案 $8/人/月起', '全加拿大双语服务'],
      cta: isEn ? 'Explore Corporate →' : '了解企业方案 →',
    },
  ]

  return (
    <section
      id="divisions"
      className="relative w-full bg-[#FDFAF5] px-6 pt-14 lg:pt-20 pb-16 lg:pb-24 overflow-hidden sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="divisions-heading"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12 lg:mb-14"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            {t.divisions.sectionTitle}
          </p>
          <h2
            id="divisions-heading"
            className="text-3xl font-bold text-midnight sm:text-4xl lg:text-5xl leading-tight"
          >
            {isEn ? (
              <>Who We Serve <em className="font-semibold not-italic text-primary">— Three sectors.</em></>
            ) : (
              t.divisions.title
            )}
          </h2>
          {t.divisions.subtitle && (
            <p className="mt-4 text-[15px] text-slate-500 max-w-[520px] mx-auto leading-relaxed">
              {t.divisions.subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {divisions.map((d, index) => {
            const data = t.divisions[d.key]
            const num = String(index + 1).padStart(2, '0')
            return (
              <motion.article
                key={d.key}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-white overflow-hidden flex flex-col"
              >
                <div className="relative h-40 overflow-hidden rounded-t-2xl bg-slate-100">
                  <img
                    src={data.image}
                    alt={data.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${d.key === 'health' ? 'brightness-125 contrast-[1.03]' : ''} ${(d as any).imgPosition === 'object-top' ? 'object-top' : 'object-center'}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/600x320?text=' + encodeURIComponent(data.title)
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-3 left-4 text-primary font-bold text-lg tracking-tight text-white drop-shadow-sm">{num}</span>
                  {(d as any).featured && (
                    <span className="absolute top-3 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {isEn ? 'Most Popular' : '最受欢迎'}
                    </span>
                  )}
                </div>
                <div className="p-6 lg:p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-midnight mb-1.5">{data.title}</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-5">{data.desc}</p>
                  <ul className="space-y-2.5 flex-1">
                    {d.features.map((feat, fi) => (
                      <li key={fi} className="flex gap-2 items-start text-[13px] text-slate-600 leading-relaxed">
                        <span className="text-primary shrink-0 mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://app.getcareby.ca/"
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors mt-5"
                  >
                    {d.cta}
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <a
            href="https://app.getcareby.ca/"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold text-[15px] px-6 py-3 rounded-full transition-all shadow-[0_4px_16px_rgba(42,139,98,0.25)]"
          >
            {isEn ? 'View plans & pricing' : '查看方案与价格'}
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-[15px] px-6 py-3 rounded-full transition-all"
          >
            {isEn ? 'See how it works' : '了解流程'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function WeCloseAllSection({ t }: { t: typeof content.en }) {
  const ringColors = [
    'border-blue-400 text-blue-600',
    'border-primary text-primary',
    'border-primary text-primary',
    'border-amber-400 text-amber-600',
  ]
  const _dotColors = ['bg-blue-400', 'bg-primary', 'bg-primary', 'bg-amber-400']

  return (
    <section id="how-it-works" className="w-full bg-[#FDFAF5] px-6 py-20 lg:py-28 sm:px-10 md:px-16 lg:px-24" aria-labelledby="we-close-all-heading">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-3">
            {t.weCloseAll.eyebrow}
          </p>
          <h2
            id="we-close-all-heading"
            className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl leading-tight"
          >
            {t.weCloseAll.title}
          </h2>
        </motion.div>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* connector line between step dots */}
          <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] pointer-events-none" aria-hidden>
            <div className="h-px w-full border-t border-dashed border-slate-300" />
          </div>
          {t.weCloseAll.steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-5 w-14 h-14 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-2 ${ringColors[index]} opacity-25`} />
                <div className={`w-10 h-10 rounded-full border-2 ${ringColors[index]} bg-white flex items-center justify-center text-lg font-semibold`}>
                  {index + 1}
                </div>
              </div>
              <h3 className="text-base font-semibold text-midnight mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoWatermark({ className = '', opacity = 0.03, stroke = 'white' }: { className?: string; opacity?: number; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 2008 2267"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <path d="M1445.9 1292.43C1535.38 1292.43 1607.92 1220.16 1607.92 1131C1607.92 1041.85 1535.38 969.575 1445.9 969.575C1356.43 969.575 1283.89 1041.85 1283.89 1131C1283.89 1220.16 1356.43 1292.43 1445.9 1292.43Z" stroke={stroke} strokeWidth="4" />
      <path d="M1878.62 736.233C1949.61 736.233 2007.15 678.894 2007.15 608.163C2007.15 537.432 1949.61 480.093 1878.62 480.093C1807.63 480.093 1750.08 537.432 1750.08 608.163C1750.08 678.894 1807.63 736.233 1878.62 736.233Z" stroke={stroke} strokeWidth="4" />
      <path d="M1878.62 1763.98C1949.61 1763.98 2007.15 1706.64 2007.15 1635.9C2007.15 1565.17 1949.61 1507.83 1878.62 1507.83C1807.63 1507.83 1750.08 1565.17 1750.08 1635.9C1750.08 1706.64 1807.63 1763.98 1878.62 1763.98Z" stroke={stroke} strokeWidth="4" />
      <path d="M1004.95 2266.53C1075.94 2266.53 1133.49 2209.19 1133.49 2138.46C1133.49 2067.73 1075.94 2010.39 1004.95 2010.39C933.966 2010.39 876.419 2067.73 876.419 2138.46C876.419 2209.19 933.966 2266.53 1004.95 2266.53Z" stroke={stroke} strokeWidth="4" />
      <path d="M131.279 1763.98C202.267 1763.98 259.814 1706.64 259.814 1635.9C259.814 1565.17 202.267 1507.83 131.279 1507.83C60.2912 1507.83 2.74414 1565.17 2.74414 1635.9C2.74414 1706.64 60.2912 1763.98 131.279 1763.98Z" stroke={stroke} strokeWidth="4" />
      <path d="M129.096 756.684C200.084 756.684 257.631 699.346 257.631 628.615C257.631 557.884 200.084 500.545 129.096 500.545C58.1083 500.545 0.561157 557.884 0.561157 628.615C0.561157 699.346 58.1083 756.684 129.096 756.684Z" stroke={stroke} strokeWidth="4" />
      <path d="M1005.46 256.139C1076.45 256.139 1134 198.8 1134 128.069C1134 57.338 1076.45 0 1005.46 0C934.473 0 876.926 57.338 876.926 128.069C876.926 198.8 934.473 256.139 1005.46 256.139Z" stroke={stroke} strokeWidth="4" />
      <path d="M1561.15 398.793C1575.11 350.012 1551.22 293.186 1506.64 268.711C1462.06 244.237 1400.98 254.798 1367.17 292.85C1311.99 354.706 1325.78 498.868 1283.89 570.447C1233.92 655.938 1191.69 644.54 1078.47 646.552C1004.44 647.893 938.662 665.829 866.824 648.227C830.82 639.511 811.977 634.817 782.535 612.69C752.925 590.563 726.512 546.308 712.548 515.129C651.477 378.677 703.295 344.313 619.175 277.261C568.703 243.735 500.734 277.261 484.247 299.388C410.558 404.995 501.407 466.18 562.647 515.967C612.109 563.741 640.541 593.412 649.795 617.719C696.397 740.424 656.692 805.8 604.033 892.465C548.851 983.154 441.177 1077.86 334.85 1072.5C245.178 1067.97 157.862 996.229 73.9101 1027.91C29.6631 1044.51 -1.46123 1090.94 0.0529294 1138.04C1.56709 1185.15 35.5516 1229.4 80.6399 1243.32C163.246 1268.63 269.741 1196.88 356.048 1191.69C518.736 1181.8 542.962 1266.62 598.986 1367.36C610.258 1387.48 620.352 1410.28 628.932 1434.42C637.681 1461.4 644.579 1488.56 648.785 1517.9C698.248 1703.46 526.979 1728.44 460.188 1868.58C458.338 1891.88 442.018 1915.68 462.375 1960.77C471.965 1982.06 491.986 1997.49 513.184 2007.04C534.55 2016.6 558.777 2018.94 581.657 2014.58C604.538 2010.23 637.008 1972.51 653.327 1955.75C721.296 1795.83 714.903 1636.41 919.819 1625.68C949.093 1621.32 978.535 1619.48 1006.8 1619.31C1131.97 1618.31 1285.07 1655.18 1317.2 1775.71C1332.17 1831.7 1315.86 1894.73 1341.6 1946.69C1365.82 1995.47 1427.73 2021.96 1479.89 2005.87C1532.04 1989.78 1568.05 1932.95 1560.14 1878.97C1552.06 1823.32 1507.65 1785.6 1464.41 1746.38C1431.1 1716.2 1398.63 1685.02 1383.99 1644.29C1357.41 1570.53 1394.93 1478 1347.32 1415.81C1314.34 1372.73 1289.1 1355.63 1234.6 1355.63C1215.92 1355.63 1179.58 1366.36 1159.73 1378.93C1117.67 1402.9 1069.05 1416.81 1017.23 1416.81C858.412 1416.81 729.708 1288.58 729.708 1130.33C729.708 972.09 858.412 843.852 1017.23 843.852C1071.07 843.852 1121.2 858.772 1164.1 884.419C1228.71 899.171 1290.79 906.211 1335.2 862.292C1421.51 778.477 1360.44 684.1 1390.55 601.626C1392.24 597.267 1393.92 592.742 1396.11 588.551C1434.13 512.447 1537.76 480.261 1561.15 398.793Z" stroke={stroke} strokeWidth="4" />
    </svg>
  )
}

function CarebyMeaningSection({ t }: { t: typeof content.en }) {
  const wordColors = ['text-[#7BBFF5]', 'text-primary', 'text-[#C49A3C]']
  const strokeColors = ['stroke-[#7BBFF5]', 'stroke-primary', 'stroke-[#C49A3C]']
  const data = t.carebyMeaning

  const icons = [
    // Experts — stethoscope
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14" key="icon-experts">
      <path d="M18 30c0 5.523 4.477 10 10 10h2a6 6 0 0 0 6-6v-6" className={strokeColors[0]} />
      <path d="M36 22a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" className={strokeColors[0]} />
      <path d="M12 8v16a8 8 0 0 0 8 8" className={strokeColors[0]} />
      <path d="M20 8v16" className={strokeColors[0]} />
      <path d="M12 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" className={strokeColors[0]} />
      <path d="M20 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" className={strokeColors[0]} />
    </svg>,
    // Love — heart
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14" key="icon-love">
      <path d="M24 42s-16-9.2-16-21a9 9 0 0 1 16-5.7A9 9 0 0 1 40 21c0 11.8-16 21-16 21z" className={strokeColors[1]} />
    </svg>,
    // Trust — shield-check
    <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14" key="icon-trust">
      <path d="M24 4 6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" className={strokeColors[2]} />
      <path d="M16 24l6 6 10-12" className={strokeColors[2]} />
    </svg>,
  ]

  return (
    <section className="relative w-full bg-[#0f172a] px-6 py-24 lg:py-28 overflow-hidden sm:px-10 md:px-16 lg:px-24" aria-labelledby="careby-meaning-heading">
      <LogoWatermark className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] lg:w-[600px]" opacity={0.08} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          id="careby-meaning-heading"
          className="text-3xl font-bold text-white text-center sm:text-4xl lg:text-5xl mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          {data.headline}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-start gap-y-10 md:gap-y-0 mb-10 lg:mb-12">
          {data.items.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div className="hidden md:flex items-center justify-center pt-14 text-4xl font-light text-white/10 select-none" aria-hidden>
                  +
                </div>
              )}
              <motion.div
                className="text-center px-4"
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="flex justify-center mb-4">
                  {icons[i]}
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-white/25 mb-1">
                  {item.label}
                </p>
                <p className={`text-5xl lg:text-6xl font-light italic leading-none mb-5 ${wordColors[i]}`}>
                  {item.word}
                </p>
                <p className="text-[13px] text-white/45 leading-[1.7] font-light max-w-[320px] mx-auto">
                  {item.def}
                </p>
              </motion.div>
            </Fragment>
          ))}
        </div>

        <motion.div
          className="border-t border-white/[0.06] pt-9 text-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-3xl text-white/10 mb-3" aria-hidden>=</p>
          <p className="text-xl lg:text-2xl font-light italic text-white/80 max-w-[700px] mx-auto leading-relaxed">
            {data.result.split(data.resultEm).map((part, i, arr) => (
              <Fragment key={i}>
                {part}
                {i < arr.length - 1 && <em className="not-italic text-primary">{data.resultEm}</em>}
              </Fragment>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function WhyCarebyExistsSection({ t }: { t: typeof content.en }) {
  const d = t.whyCarebyExists
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 px-6 py-24 lg:py-28 sm:px-10 md:px-16 lg:px-24" aria-labelledby="why-careby-heading">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
            style={{ top: `${25 + i * 25}%` }}
            animate={{ x: ['-100%', '200%'], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: '200px', height: '200px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', border: '2px solid rgba(20, 184, 166, 0.3)' }}
              animate={{ scale: [0.5, 2], opacity: [0.6, 0], rotate: [0, 180] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: i * 2.5 }}
            />
          ))}
        </div>
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, filter: 'blur(1px)' }}
            animate={{ y: [0, -80, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }}
          />
        ))}
        <motion.div
          className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-teal-500/20 via-cyan-500/15 to-transparent blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl"
          animate={{ scale: [1, 1.4, 1], rotate: [360, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            {d.eyebrow}
          </p>
          <h2
            id="why-careby-heading"
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight"
          >
            {d.title}
            <br />
            <em className="italic text-white">{d.titleEm}</em>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] rounded-[20px] overflow-hidden mb-12 lg:mb-14"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.2 }}
        >
          {d.stats.map((stat, i) => (
            <div
              key={i}
              className={`p-7 lg:p-6 xl:p-7 transition-colors duration-200 hover:bg-white/[0.025] ${
                i === 2 ? 'bg-primary/[0.06] sm:col-span-2 lg:col-span-1' : 'bg-[#0c2a2a]'
              }`}
            >
              <p className="text-4xl font-light text-white leading-none mb-2.5">
                {stat.num}<em className="italic text-yellow-400">{stat.numEm}</em>{(stat as any).numAfter || ''}
              </p>
              <p className="text-[13px] font-semibold text-white leading-snug mb-2">{stat.title}</p>
              <p className="text-xs text-white/40 leading-relaxed mb-3">{stat.body}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/20">{stat.source}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="rounded-2xl border border-primary/20 bg-primary/[0.05] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="shrink-0" aria-hidden>
            <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
              <path d="M24 4 6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" className="stroke-yellow-400" />
              <path d="M16 24l6 6 10-12" className="stroke-yellow-400" />
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-bold text-white mb-1">{d.guarantee.title}</p>
            <p className="text-sm text-white/50 leading-relaxed">{d.guarantee.body}</p>
          </div>
          <a
            href="https://app.getcareby.ca/"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-yellow-400/50 transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-yellow-300/60"
          >
            {d.guarantee.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function PainPointsSection({ t }: { t: typeof content.en; lang?: 'en' | 'zh' | 'zh-TW' }) {
  const problems = t.painPoints.problems
  const numColors = ['text-blue-400', 'text-primary', 'text-amber-400']

  return (
    <section
      id="pain-points"
      className="relative w-full bg-midnight py-20 lg:py-24 overflow-hidden"
      aria-labelledby="pain-points-heading"
    >
      <LogoWatermark className="absolute -left-24 top-1/2 -translate-y-1/2 w-[450px] lg:w-[550px]" opacity={0.07} />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            {t.painPoints.sectionTitle}
          </p>
          <h2
            id="pain-points-heading"
            className="text-3xl font-bold text-white text-center leading-tight mx-auto whitespace-nowrap sm:text-4xl lg:text-5xl"
          >
            {t.painPoints.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden bg-white/10">
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-midnight p-8 lg:p-9 hover:bg-white/[0.02] transition-colors"
            >
              <div className={`text-4xl lg:text-5xl font-light italic leading-none mb-4 ${numColors[index]}`}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-3">
                {prob.situation}
              </p>
              <p className="text-lg sm:text-xl font-light italic text-white/85 leading-snug mb-4">
                {prob.fear}
              </p>
              <p className="text-sm text-white/45 leading-relaxed pt-4 border-t border-white/10">
                {prob.answerEm && prob.answer.includes(prob.answerEm)
                  ? (() => {
                      const parts = prob.answer.split(prob.answerEm)
                      return parts.map((part, i) => (
                        <span key={i}>
                          {part}
                          {i < parts.length - 1 && <span className="font-medium text-primary">{prob.answerEm}</span>}
                        </span>
                      ))
                    })()
                  : prob.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function _ServiceSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const [selectedService, setSelectedService] = useState<typeof content.en.services.service1 | typeof content.en.services.service2 | typeof content.en.services.service3 | typeof content.en.services.service4 | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = lang === 'en' ? [
    { icon: 'medical_services', service: t.services.service1, keyword: 'Virtual' },
    { icon: 'home_health', service: t.services.service2, keyword: 'Trusted' },
    { icon: 'psychology', service: t.services.service3, keyword: 'Innovative' },
    { icon: 'account_balance', service: t.services.service4, keyword: 'Benefit' },
  ] : [
    { icon: 'medical_services', service: t.services.service1, keyword: '虚拟' },
    { icon: 'home_health', service: t.services.service2, keyword: '值得信赖' },
    { icon: 'psychology', service: t.services.service3, keyword: '创新' },
    { icon: 'account_balance', service: t.services.service4, keyword: '福利' },
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

  const handleViewMore = (service: typeof content.en.services.service1 | typeof content.en.services.service2 | typeof content.en.services.service3 | typeof content.en.services.service4) => {
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
      className="mx-auto max-w-6xl px-6 py-32 lg:py-40 sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="services-heading"
    >
      <motion.div
        className="text-center mb-20 lg:mb-24"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
          {t.services.sectionTitle}
        </p>
        <h2
          id="services-heading"
          className="mt-6 text-4xl font-bold text-midnight sm:text-5xl lg:text-6xl leading-tight"
          itemProp="name"
        >
          {t.services.title}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-slate-600 leading-relaxed">
          {t.services.subtitle}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-3xl overflow-hidden">
        {services.map((service) => (
          <motion.article
            key={service.service.title}
            className="group flex flex-col rounded-none border-r border-slate-200 bg-white/70 p-10 lg:p-12 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl last:border-r-0"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="material-symbols-outlined mb-6 text-6xl lg:text-7xl text-primary transition-transform duration-300 group-hover:scale-110">
              {service.icon}
            </span>
              <h3 className="text-xl sm:text-2xl font-bold text-midnight whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                {getTitleWithUnderline(service.service.title, service.keyword)}
              </h3>
              {service.service.subtitle && (
                <p className="mt-2 text-base sm:text-lg font-semibold text-primary mb-4">
                  {service.service.subtitle}
                </p>
              )}
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600 flex-grow mb-8">
                {service.service.desc}
              </p>
              {service.service.details && (
                <button
                  onClick={() => handleViewMore(service.service)}
                  className="mt-auto inline-flex items-center gap-2 rounded-full border border-primary bg-white px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
        lang={lang}
      />
    </section>
  )
}

function _TechnologySection({ t, lang, onHowItWorks }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW', onHowItWorks: () => void }) {
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
          className="text-center mb-20 lg:mb-24"
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
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6 leading-tight"
            itemProp="name"
          >
            {lang === 'en' ? (
              <>
                <span className="block">Technology Enables Care.</span>
                <span className="block">Humans Deliver It.</span>
              </>
            ) : (
              <>
                <span className="block">科技赋能护理。</span>
                <span className="block">人文传递关怀。</span>
              </>
            )}
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
                    {lang === 'en' ? 'Careby operates in 2025:' : '康伴 在2025年运营：'}
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
                  {'flowDesc' in t.technology ? String(t.technology.flowDesc) : '康伴 AI将多模态数据整合进健康云，智能匹配医疗资源与护理服务。'}
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
      className="bg-[#FDFAF5] px-6 py-32 lg:py-40 sm:px-10 md:px-16 lg:px-24"
      aria-labelledby="partners-heading"
    >
      <motion.div
        className="text-center mb-20 lg:mb-24"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
          {t.partners.sectionTitle}
        </p>
        <h2
          id="partners-heading"
          className="mt-6 text-4xl font-bold text-midnight sm:text-5xl lg:text-6xl leading-tight"
          itemProp="name"
        >
          {t.partners.title}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-slate-600 leading-relaxed">
          {t.partners.subtitle}
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-10 max-w-2xl text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
          <svg className="w-5 h-5 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
        </div>
        <p className="text-[15px] italic text-slate-500 leading-relaxed">
          "{t.partners.quote}"
        </p>
      </motion.div>

      <motion.div
        className="mt-12 mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            className={`flex flex-col items-center justify-center gap-3 py-8 px-6 text-center ${
              index < partners.length - 1 ? 'border-r border-slate-200' : ''
            } ${index < partners.length - 2 ? 'max-lg:border-b max-lg:border-slate-200' : ''} ${index % 2 === 0 ? 'max-lg:border-r' : 'max-lg:border-r-0'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          >
            {partner.url ? (
              <a href={partner.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo - Careby Healthcare Partner`}
                  className="h-14 w-auto object-contain mix-blend-multiply hover:opacity-90 transition"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    const text = img.nextElementSibling as HTMLElement;
                    img.style.display = 'none';
                    if (text) text.style.display = 'block';
                  }}
                />
              </a>
            ) : (
              <img 
                src={partner.logo} 
                alt={`${partner.name} Logo - Careby Healthcare Partner`}
                className="h-14 w-auto object-contain mix-blend-multiply"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  const text = img.nextElementSibling as HTMLElement;
                  img.style.display = 'none';
                  if (text) text.style.display = 'block';
                }}
              />
            )}
            {partner.description && (
              <p className="text-[13px] text-slate-500 leading-relaxed">{partner.description}</p>
            )}
            <p className="hidden text-sm font-semibold text-slate-700">{partner.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ImpactSection({ t }: { t: typeof content.en }) {
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]
  return (
    <section
      id="impact"
      className="bg-white px-6 py-24 lg:py-28 sm:px-10 md:px-16 lg:px-24 overflow-hidden"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            {t.impact.sectionTitle}
          </p>
          <h2
            id="impact-heading"
            className="text-3xl font-bold text-midnight sm:text-4xl lg:text-5xl leading-tight"
          >
            {t.impact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] text-slate-500 leading-relaxed">
            {t.impact.subtitle}
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: [0, -((360 + 1) * testimonials.length)] }}
            transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' } }}
          >
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative min-w-[360px] px-8 py-6 flex flex-col border-r border-slate-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 text-primary/10">
                    <path d="M8 12a4 4 0 014-4h1a1 1 0 010 2h-1a2 2 0 00-2 2v1a1 1 0 001 1h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6zm10 0a4 4 0 014-4h1a1 1 0 010 2h-1a2 2 0 00-2 2v1a1 1 0 001 1h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-6z" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-[14px] leading-relaxed text-slate-600 mb-6 flex-1">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/15 shrink-0"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement
                      el.style.display = 'none'
                      if (el.nextElementSibling?.classList.contains('avatar-fb')) return
                      const fb = document.createElement('div')
                      fb.className = 'avatar-fb w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0'
                      fb.textContent = testimonial.name.charAt(0)
                      el.parentNode?.insertBefore(fb, el.nextSibling)
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-midnight">{testimonial.name}</p>
                    <p className="text-[11px] text-slate-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PlanDetailModal({ plan, onClose }: { plan: any; onClose: () => void }) {
  if (!plan) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur px-8 py-5">
            <div>
              {plan.badge && <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{plan.badge}</p>}
              <h3 className="text-2xl font-bold text-midnight">{plan.title}</h3>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-light text-midnight">{plan.price}<sub className="text-sm text-slate-400">{plan.period}</sub></p>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 transition">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="px-8 py-6 space-y-6">
            {plan.tagline && <p className="text-[15px] text-slate-600 leading-relaxed">{plan.tagline}</p>}
            {plan.detailSections?.map((section: any, si: number) => (
              <div key={si}>
                <h4 className="text-sm font-bold text-midnight uppercase tracking-wide mb-3 pb-2 border-b border-slate-100">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item: string, ii: number) => (
                    <li key={ii} className="flex gap-2.5 items-start text-[13px] text-slate-600 leading-relaxed">
                      <span className="text-primary shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {plan.notes && (
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
                <p className="text-[13px] text-slate-600 leading-relaxed">{plan.notes}</p>
              </div>
            )}
            <div className="pt-4">
              <a href="https://app.getcareby.ca/" className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-8 py-3 rounded-full transition-all hover:-translate-y-0.5">
                {plan.cta || 'Get Started →'}
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function MembershipTiersSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const [activeTab, setActiveTab] = useState(0)
  const [detailPlan, setDetailPlan] = useState<any>(null)

  const tabs = lang === 'en' || lang === 'zh-TW' ? [
    { icon: 'science', label: 'Careby Health', key: 'diagnostics' },
    { icon: 'home', label: 'Careby Home', key: 'home' },
    { icon: 'family_restroom', label: 'Careby Complete', key: 'family' },
    { icon: 'apartment', label: 'Careby Corporate', key: 'corporate' },
  ] : [
    { icon: 'science', label: '康伴 健康', key: 'diagnostics' },
    { icon: 'home', label: '康伴 居家', key: 'home' },
    { icon: 'family_restroom', label: '康伴 全家', key: 'family' },
    { icon: 'apartment', label: '康伴 企业', key: 'corporate' },
  ]

  const isEn = lang === 'en' || lang === 'zh-TW'

  const heroPlans: Record<string, any> = {
    diagnostics: {
      badge: isEn ? 'Tier 1 · Ages 25–45 · Entry Product' : 'Tier 1 · 25–45岁 · 入门产品',
      title: 'The Essentialist',
      tagline: isEn
        ? '~45 biomarkers. The lowest-friction entry point. A complete, doctor-reviewed blood panel built specifically for adults 25–45 — every marker chosen for clinical relevance.'
        : '约45项生物标志物。专为25–45岁成人设计的完整医生审核血检方案——每项指标均具临床意义。',
      features: isEn ? [
        { icon: '✓', text: 'CBC, metabolic panel, heart health (incl. ApoB), organ function, thyroid' },
        { icon: '★', text: 'Hepatitis B panel — HBV prevalence is 10× higher in Chinese-Canadian adults', highlight: true },
        { icon: '✓', text: 'Results through AI-powered Longevity platform with biological age tracking' },
        { icon: '✓', text: 'Bilingual NP consultation — Mandarin, Cantonese, or English' },
        { icon: '✓', text: 'Doctor-reviewed results + personalized action plan' },
      ] : [
        { icon: '✓', text: '血常规、代谢、心血管（含ApoB）、器官功能、甲状腺' },
        { icon: '★', text: '乙肝筛查——华裔HBV感染率高10倍', highlight: true },
        { icon: '✓', text: 'AI平台解读结果，含生物年龄追踪' },
        { icon: '✓', text: '中英粤语护理师咨询' },
        { icon: '✓', text: '医生审核结果 + 个性化行动方案' },
      ],
      priceLabel: isEn ? 'Annual plan' : '年度方案',
      price: '399',
      pricePeriod: isEn ? '/yr' : '/年',
      priceNote: isEn ? '~$33/month · Less than one walk-in visit' : '约$33/月 · 低于一次门诊费用',
      cta: isEn ? 'Get The Essentialist →' : '获取基础版 →',
      upgradeNote: isEn ? 'Need more biomarkers? See upgrade tiers below ↓' : '需要更多标志物？查看下方升级 ↓',
      detailSections: isEn ? [
        { title: 'Complete Blood Count (CBC)', items: ['Red blood cells, white blood cells, hemoglobin, hematocrit, platelets', 'MCV, MCH, MCHC, RDW — detailed red cell indices', 'Baseline picture of immune health, anemia risk, infection response, and blood oxygen capacity'] },
        { title: 'Metabolic Panel', items: ['Glucose (fasting), HbA1c, insulin', 'Blood sugar regulation and diabetes risk — HbA1c catches 3-month average glucose trends your doctor\'s annual visit misses'] },
        { title: 'Heart Health', items: ['ApoB — superior cardiovascular risk marker; most panels don\'t include it', 'LDL cholesterol, HDL cholesterol, total cholesterol, triglycerides, non-HDL cholesterol', 'Cardiovascular risk profiling beyond the standard lipid panel'] },
        { title: 'Organ Function', items: ['Kidney: Creatinine, eGFR', 'Liver: ALT, AST, GGT, bilirubin, albumin, total protein'] },
        { title: 'Thyroid', items: ['TSH — thyroid stimulating hormone, foundational screen for hypo/hyperthyroidism'] },
        { title: 'Iron & Nutrients', items: ['Ferritin, serum iron, TIBC, Vitamin D (25-OH)'] },
        { title: 'Inflammation', items: ['CRP (C-reactive protein) — general inflammation marker'] },
        { title: 'Infectious Disease', items: ['Hepatitis B surface antigen (HBsAg)', 'Hepatitis B surface antibody (anti-HBs)', 'Hepatitis B core antibody (anti-HBc)'] },
        { title: 'Included with Every Tier', items: ['Blood draw', 'Doctor-reviewed — physician reads your full panel, not just flags abnormals', 'Comprehensive lab result visualization and interpretation through an integrated AI platform', 'Built-in AI insights to help translate complex lab data into actionable health recommendations', 'Bilingual NP consultation — results explained in Mandarin, Cantonese, or English', 'Personalized action plan — tells you what to do next, not just what the numbers are'] },
      ] : [
        { title: '全血细胞计数 (CBC)', items: ['红细胞、白细胞、血红蛋白、红细胞压积、血小板', 'MCV、MCH、MCHC、RDW — 红细胞指数', '免疫健康、贫血风险、感染反应基线'] },
        { title: '代谢面板', items: ['空腹血糖、HbA1c、胰岛素', '血糖调节和糖尿病风险评估'] },
        { title: '心脏健康', items: ['ApoB — 大多数检查不包含的优越心血管风险标志物', 'LDL、HDL、总胆固醇、甘油三酯、非HDL胆固醇'] },
        { title: '器官功能', items: ['肾脏: 肌酐、eGFR', '肝脏: ALT、AST、GGT、胆红素、白蛋白、总蛋白'] },
        { title: '甲状腺', items: ['TSH — 甲状腺功能基础筛查'] },
        { title: '铁和营养素', items: ['铁蛋白、血清铁、TIBC、维生素D (25-OH)'] },
        { title: '炎症', items: ['CRP（C-反应蛋白）'] },
        { title: '传染病', items: ['乙肝表面抗原 (HBsAg)', '乙肝表面抗体 (anti-HBs)', '乙肝核心抗体 (anti-HBc)'] },
        { title: '每层级均含', items: ['上门采血', '医生全面审核', 'AI平台可视化解读', '双语护理师咨询', '个性化行动方案'] },
      ],
    },
    family: {
      badge: isEn ? 'Best Value — Up to 6 People' : '超值 — 最多6人',
      title: 'Careby Complete — Family Health Hub',
      tagline: isEn
        ? 'One plan that coordinates your whole household\'s health. Blood diagnostics for the seniors. Virtual doctor access for the adults. Service credits already loaded. One coordinator who knows everyone.'
        : '一个方案协调全家健康。长者血检、成人远程医生、服务积分已加载。一个了解所有人的协调员。',
      features: isEn ? [
        { icon: '✓', text: '100-biomarker blood panels 2×/year for both seniors' },
        { icon: '✓', text: 'GoToDoctor unlimited telehealth for up to 4 members' },
        { icon: '✓', text: '4 Careby Home service credits included' },
        { icon: '✓', text: 'Dedicated bilingual care coordinator' },
        { icon: '✓', text: 'Monthly family health summary report' },
        { icon: '✓', text: 'Priority booking across all Careby services' },
      ] : [
        { icon: '✓', text: '两位长者每年2次100项生物标志物血检' },
        { icon: '✓', text: '4位成员无限次GoToDoctor远程医生' },
        { icon: '✓', text: '含4次康伴居家服务积分' },
        { icon: '✓', text: '专属双语护理协调员' },
        { icon: '✓', text: '每月家庭健康摘要报告' },
        { icon: '✓', text: '所有康伴服务优先预约' },
      ],
      priceLabel: isEn ? 'Annual plan' : '年度方案',
      price: '2,499',
      pricePeriod: isEn ? '/yr' : '/年',
      priceNote: isEn ? 'Up to 6 people: 2 seniors + 2 adults + 2 kids' : '最多6人：2位长者 + 2位成人 + 2位儿童',
      cta: isEn ? 'Get Family Health Hub →' : '获取家庭中心 →',
      detailSections: isEn ? [
        { title: 'What\'s Included', items: [
          '100-biomarker blood panels 2×/year for both seniors',
          'GoToDoctor unlimited telehealth for up to 4 members',
          '4 Careby Home service credits included',
          'Dedicated bilingual care coordinator',
          'Monthly family health summary report',
          'Priority booking across all Careby services',
        ]},
      ] : [
        { title: '包含内容', items: ['两位长者每年2次100项血检', '4位成员无限远程医生', '含4次服务积分', '专属双语协调员', '每月健康摘要', '优先预约'] },
      ],
    },
    home: {
      badge: isEn ? 'Monthly Plan · Most Popular' : '月度计划 · 最受欢迎',
      title: 'Independent Living',
      tagline: isEn
        ? 'Built for seniors who want to stay at home — safely, comfortably, and with family peace of mind. Your parent gets consistent, vetted care from someone who speaks their language and knows their history.'
        : '专为希望安全舒适居家的长者设计。固定的、经过审核的护理人员，讲他们的语言，了解他们的历史。',
      features: isEn ? [
        { icon: '✓', text: 'Dedicated bilingual PSW — same caregiver, consistent visits' },
        { icon: '✓', text: '12 Careby Home credits per month, usable across any home service' },
        { icon: '✓', text: 'Benefits navigation — we find every government & insurance benefit' },
        { icon: '✓', text: 'GoToDoctor virtual physician access for urgent health concerns' },
        { icon: '✓', text: 'Cultural and language matching + replacement guarantee' },
      ] : [
        { icon: '✓', text: '专属双语护理员——固定护工、持续上门' },
        { icon: '✓', text: '每月12次服务积分，适用于任何居家服务' },
        { icon: '✓', text: '福利导航——找到所有政府和保险福利' },
        { icon: '✓', text: 'GoToDoctor虚拟医生' },
        { icon: '✓', text: '文化语言匹配 + 替换保证' },
      ],
      priceLabel: isEn ? 'Monthly plan' : '月度方案',
      price: '1,499',
      pricePeriod: isEn ? '/mo' : '/月',
      priceNote: isEn ? '12 credits/month · Best for seniors living at home' : '12积分/月 · 适合居家长者',
      cta: isEn ? 'Get Independent Living →' : '获取独立生活 →',
      detailSections: isEn ? [
        { title: 'What\'s Included', items: [
          'Dedicated bilingual PSW — same caregiver, consistent visits',
          '12 Careby Home credits per month, usable across any home service',
          'Benefits navigation — we find and activate every government and insurance benefit your parent is entitled to',
          'GoToDoctor virtual physician access — rapid consultations for urgent health concerns, helping reduce specialist referral wait times',
          'Cultural and language matching — Mandarin, Cantonese, English',
          'Replacement guarantee',
        ]},
      ] : [
        { title: '包含内容', items: ['专属双语护理员', '每月12次积分', '福利导航', 'GoToDoctor虚拟医生', '文化语言匹配', '替换保证'] },
      ],
    },
    corporate: {
      badge: isEn ? 'Enhanced Tier · 201+ Employees' : '增强版 · 201+员工',
      title: 'Workforce Wellness+',
      tagline: isEn
        ? 'For employers who understand that a sick employee spends hours scheduling care and waiting. Careby gives your team proactive virtual physician care, reduced time for specialists, and quarterly wellness check-ins.'
        : '面向理解员工生病需要耗费大量时间排队就诊的雇主。康伴为您的团队提供主动的虚拟医生服务、缩短专科等待时间，以及季度健康检查。',
      features: isEn ? [
        { icon: '✓', text: 'GoToDoctor virtual physician access with coordinated specialist referrals' },
        { icon: '✓', text: 'Quarterly workforce culture coaching and employee check-ins' },
        { icon: '✓', text: 'Benefits navigation support' },
        { icon: '✓', text: 'PHIPA compliant' },
      ] : [
        { icon: '✓', text: 'GoToDoctor虚拟医生 + 协调专科转介' },
        { icon: '✓', text: '季度职场文化辅导和员工健康检查' },
        { icon: '✓', text: '福利导航支持' },
        { icon: '✓', text: 'PHIPA合规' },
      ],
      priceLabel: isEn ? 'Per employee' : '每位员工',
      price: '12',
      pricePeriod: isEn ? '/emp/mo' : '/人/月',
      priceNote: isEn ? 'For organizations with 201+ employees' : '适用于201名以上员工的企业',
      cta: isEn ? 'Contact Us →' : '联系我们 →',
      detailSections: isEn ? [
        { title: 'What\'s Included', items: [
          'GoToDoctor virtual physician access with coordinated specialist referrals to reduce wait times',
          'Quarterly workforce culture coaching and employee check-ins',
          'Benefits navigation support',
          'PHIPA compliant',
        ]},
      ] : [
        { title: '包含内容', items: ['GoToDoctor虚拟医生+专科转介', '季度职场辅导', '福利导航', 'PHIPA合规'] },
      ],
    },
  }

  const upgradeTiers: Record<string, any[]> = {
    diagnostics: [
      {
        badge: isEn ? 'Tier 2 · Ages 45–60' : 'Tier 2 · 45–60岁',
        title: 'Longevity Audit',
        tagline: isEn ? '~80 biomarkers. Everything in Essentialist, plus deeper cardiovascular, hormonal, and metabolic profiling for the decade when risk quietly builds.' : '约80项。含基础版全部，更深入的心血管、激素、代谢检测。',
        price: '$699', period: isEn ? '/yr' : '/年',
        features: isEn ? [
          'Everything in The Essentialist',
          'Advanced cardiovascular: Lp(a), LDL particle size, ApoA1, Homocysteine',
          'Full hormone panel: testosterone, estradiol, cortisol, DHEA-S',
          'hs-CRP + Fibrinogen (advanced inflammation)',
          'HOMA-IR insulin resistance index',
        ] : ['含基础版全部', '高级心血管: Lp(a)、LDL颗粒、ApoA1', '全套激素面板', '高敏CRP + 纤维蛋白原', 'HOMA-IR胰岛素抵抗指数'],
        featured: false, cta: isEn ? 'Get Longevity Audit →' : '获取长寿审计 →',
        detailSections: isEn ? [
          { title: 'Advanced Cardiovascular', items: ['Lp(a) — lipoprotein(a), a genetically determined cardiovascular risk marker most doctors never order', 'LDL particle size — small dense LDL is 3× more atherogenic than standard LDL', 'ApoA1 — protective lipoprotein, HDL functionality marker', 'Homocysteine — elevated levels linked to heart disease, stroke, and cognitive decline'] },
          { title: 'Full Hormone Panel', items: ['Total testosterone, free testosterone, SHBG (sex hormone binding globulin)', 'Estradiol, DHEA-S, cortisol (AM)', 'Hormonal drivers of energy, body composition, mood, libido, and metabolic function'] },
          { title: 'Advanced Inflammation', items: ['hs-CRP (high-sensitivity C-reactive protein) — predictive of cardiovascular events years in advance', 'Fibrinogen — clotting protein; elevated levels linked to chronic inflammation and thrombosis risk'] },
          { title: 'Expanded Metabolic', items: ['Fasting insulin + HOMA-IR (insulin resistance index) — catches insulin resistance years before HbA1c flags it', 'Uric acid — metabolic syndrome marker; gout risk'] },
          { title: 'Expanded Thyroid', items: ['Free T3, Free T4, TSH — full thyroid function picture beyond the basic TSH screen'] },
          { title: 'Vitamins & Minerals', items: ['Vitamin B12, folate, magnesium, zinc'] },
        ] : [
          { title: '高级心血管', items: ['Lp(a)、LDL颗粒大小、ApoA1、同型半胱氨酸'] },
          { title: '全套激素', items: ['总/游离睾酮、SHBG、雌二醇、DHEA-S、皮质醇'] },
          { title: '高级炎症', items: ['高敏CRP、纤维蛋白原'] },
          { title: '扩展代谢', items: ['空腹胰岛素 + HOMA-IR、尿酸'] },
          { title: '扩展甲状腺', items: ['游离T3、游离T4、TSH'] },
          { title: '维生素与矿物质', items: ['维生素B12、叶酸、镁、锌'] },
        ],
      },
      {
        badge: isEn ? 'Tier 3 · Ages 60+ · Featured' : 'Tier 3 · 60岁以上 · 推荐',
        title: 'Vitality 60+',
        tagline: isEn ? "~105 biomarkers. Everything in Longevity Audit, plus senior-specific markers your family doctor won't order until something's already wrong." : '约105项。含长寿审计全部，加长者专属标志物。',
        price: '$999', period: isEn ? '/yr' : '/年',
        saving: isEn ? '★ Imaging Add-On from $299' : '★ 影像加购 $299起',
        features: isEn ? [
          'Everything in Longevity Audit',
          'Cystatin C — superior kidney function marker for seniors',
          'Prealbumin — early frailty detection before it\'s visible',
          'Bone health panel: Vitamin D, calcium, PTH',
          'NT-proBNP — cardiac stress / early heart failure detection',
        ] : ['含长寿审计全部', '胱抑素C — 优越肾功能标志', '前白蛋白 — 早期衰弱检测', '骨健康面板', 'NT-proBNP心脏应激'],
        featured: true, cta: isEn ? 'Get Vitality 60+ →' : '获取活力60+ →',
        detailSections: isEn ? [
          { title: 'Superior Kidney Function', items: ['Cystatin C — more accurate kidney function marker for seniors', 'Standard creatinine-based eGFR systematically overestimates kidney function in older adults'] },
          { title: 'Frailty & Nutritional Status', items: ['Prealbumin (transthyretin) — more sensitive than albumin for detecting nutritional decline and frailty onset', 'Albumin — retested at senior-specific thresholds', 'Prealbumin drops 2–4 weeks before clinical frailty becomes visible'] },
          { title: 'Bone Health Panel', items: ['Vitamin D (25-OH), calcium (serum), phosphate', 'PTH (parathyroid hormone), alkaline phosphatase', 'Bone density and fracture risk — falls are the leading cause of injury death in Canadian seniors over 65'] },
          { title: 'Cognitive & Neurological Risk', items: ['Vitamin B12 (elevated threshold for seniors)', 'Folate, homocysteine', 'B12 deficiency and elevated homocysteine are strongly linked to cognitive decline'] },
          { title: 'Cardiac Stress', items: ['NT-proBNP — cardiac stress marker; early heart failure detection before symptoms appear'] },
          { title: 'Expanded Inflammatory', items: ['ESR (erythrocyte sedimentation rate), fibrinogen'] },
          { title: 'Imaging Add-On — From $299', items: ['Abdominal ultrasound', 'Carotid artery scan (intima-media thickness, plaque detection)', 'DEXA bone density scan', 'Pelvic ultrasound (women) / Prostate ultrasound (men)', 'Vascular flow studies', 'Chest X-ray'] },
        ] : [
          { title: '优越肾功能', items: ['胱抑素C — 比肌酐更精准'] },
          { title: '衰弱和营养状态', items: ['前白蛋白、白蛋白'] },
          { title: '骨健康', items: ['维生素D、钙、PTH、碱性磷酸酶'] },
          { title: '认知风险', items: ['维生素B12、叶酸、同型半胱氨酸'] },
          { title: '心脏应激', items: ['NT-proBNP'] },
          { title: '影像加购 $299起', items: ['腹部超声、颈动脉扫描、DEXA骨密度等'] },
        ],
      },
      {
        badge: isEn ? 'Tier 4 · All Ages · Executive / HNW' : 'Tier 4 · 全年龄 · 行政/高净值',
        title: 'Careby Infinity',
        tagline: isEn ? '150+ biomarkers. Everything in Vitality 60+, plus cancer screening, heavy metals, advanced hormonal, gut markers, and full imaging suite.' : '150+项。含活力60+全部，加癌症筛查、重金属、高级激素、肠道标志物及全套影像。',
        price: '$2,499', period: isEn ? '/yr' : '/年',
        saving: isEn ? 'Most complete health picture in Canada' : '加拿大最全面的健康画像',
        features: isEn ? [
          'Everything in Vitality 60+',
          'Cancer screening: PSA, CA-125, CEA, AFP, CA 19-9',
          'Heavy metals: lead, mercury, arsenic, cadmium',
          'Full imaging: ECG, echocardiogram, ultrasound, DEXA',
          'Concierge coordinator — same-day response, priority access',
        ] : ['含活力60+全部', '癌症筛查: PSA、CA-125、CEA、AFP', '重金属检测', '全套影像: 心电图、超声心动图等', '尊享协调员当日响应'],
        featured: false, dark: true, cta: isEn ? 'Get Careby Infinity →' : '获取 Infinity →',
        detailSections: isEn ? [
          { title: 'Advanced Cancer Screening Markers', items: ['PSA (prostate-specific antigen) — men', 'CA-125 (ovarian marker) — women', 'CEA — colorectal cancer marker', 'AFP (alpha-fetoprotein) — liver/hepatocellular; elevated priority given HBV history', 'CA 19-9 — pancreatic cancer marker'] },
          { title: 'Heavy Metals & Environmental Toxins', items: ['Lead, mercury, arsenic, cadmium', 'Elevated exposure risk in certain occupational and geographic profiles'] },
          { title: 'Advanced Hormonal', items: ['IGF-1 (growth hormone proxy) — key longevity marker', 'Prolactin, LH, FSH'] },
          { title: 'Gut & Microbiome Markers', items: ['Calprotectin — intestinal inflammation marker', 'H. pylori antibodies — stomach cancer and ulcer risk; higher prevalence in Chinese-Canadian adults'] },
          { title: 'Cardiovascular Deep Dive', items: ['Oxidized LDL — more predictive than standard LDL for arterial damage', 'MPO (myeloperoxidase) — arterial inflammation marker', 'PLAC test (Lp-PLA2) — plaque vulnerability assessment'] },
          { title: 'Full Imaging Suite', items: ['All Vitality 60+ imaging options, plus:', 'ECG (12-lead)', 'Echocardiogram — heart structure and function', 'Mammogram — women', 'Full abdominal + pelvic ultrasound'] },
          { title: 'Concierge Services', items: ['Dedicated care coordinator — same-day response, priority access', 'Priority booking across all Careby services'] },
        ] : [
          { title: '癌症筛查', items: ['PSA、CA-125、CEA、AFP、CA 19-9'] },
          { title: '重金属', items: ['铅、汞、砷、镉'] },
          { title: '高级激素', items: ['IGF-1、催乳素、LH、FSH'] },
          { title: '肠道标志物', items: ['钙卫蛋白、幽门螺杆菌抗体'] },
          { title: '深度心血管', items: ['氧化LDL、MPO、PLAC测试'] },
          { title: '全套影像', items: ['心电图、超声心动图、乳房X光、全腹超声'] },
          { title: '尊享服务', items: ['专属协调员当日响应', '所有服务优先预约'] },
        ],
      },
    ],
    home: [
      {
        badge: isEn ? 'Healthy Living · 2 Visits/Month' : '健康生活 · 每月2次',
        title: 'Companion Plan',
        tagline: isEn ? 'The same familiar faces, every month. Exercise Companion guides mobility and strength. Nutrition Companion cooks healthy meals and builds better eating patterns.' : '每月固定的熟悉面孔。运动康伴指导活动，营养康伴烹饪健康膳食。',
        price: '$329', period: isEn ? '/mo' : '/月',
        saving: isEn ? '2 visits/month · 2 hrs per visit' : '每月2次 · 每次2小时',
        features: isEn ? [
          'Same companion every visit — relationship builds over time',
          'Pre-visit data review: gait trends, biomarkers, visit history',
          'Healthy behaviours together: exercise, cooking, walks, social outings',
          'Post-visit log to care coordinator and family',
        ] : ['固定康伴——关系逐渐建立', '访前数据审阅', '一起运动、烹饪、散步', '访后日志同步'],
        featured: false, cta: isEn ? 'Get Companion Plan →' : '获取康伴计划 →',
        detailSections: isEn ? [
          { title: 'How It Works', items: [
            'Careby Companion sends two types of vetted specialists to your parent\'s door on a recurring schedule',
            'The Exercise Companion guides your senior through movements built for their ability — mobility, strength, balance',
            'The Nutrition Companion cooks a healthy meal with your parent, reviews what\'s in the pantry, and makes gradual improvements under the guidance of a registered dietician',
            'This service is for families who want to make sure mom and dad are actually moving and eating well — but can\'t always be there',
          ]},
          { title: 'Every Visit Includes', items: [
            'Same companion every visit — relationship builds over time',
            'Pre-visit data review: gait trends, biomarkers, visit history if applicable',
            'Healthy behaviours together: exercise, cooking, walks, social outings',
            'Post-visit log to care coordinator and family',
          ]},
        ] : [
          { title: '运作方式', items: ['运动康伴指导活动能力、力量、平衡', '营养康伴健康烹饪、渐进式改善饮食', '适合无法时刻陪伴的家庭'] },
          { title: '每次访问包含', items: ['固定康伴', '访前数据审阅', '运动/烹饪/散步', '访后日志'] },
        ],
      },
    ],
  }

  const creditsInfo = {
    title: isEn ? 'Flexible Credit Packages' : '灵活积分套餐',
    badge: isEn ? '💳 Careby Home Credits' : '💳 康伴居家 积分',
    desc: isEn
      ? 'Credits are interchangeable across all Careby Home services and expire 2 years from purchase. Use for PSW visits, companion, nutritionist, hospital accompaniment, therapy, cleaning — whatever your family needs.'
      : '积分可在所有康伴居家服务间互换，自购买起2年有效。用于护理员、康伴、营养师、陪诊、治疗、清洁等。',
    packages: [
      { name: 'Essential', price: '$900', credits: isEn ? '12 credits' : '12积分', save: isEn ? '25% off retail' : '零售价75折' },
      { name: isEn ? '★ Balanced' : '★ 均衡', price: '$2,100', credits: isEn ? '30 credits' : '30积分', save: isEn ? '33% off retail' : '零售价67折', popular: true },
      { name: 'Premium', price: '$4,000', credits: isEn ? '60 credits' : '60积分', save: isEn ? '45% off retail' : '零售价55折' },
    ],
    serviceRates: isEn ? [
      { service: 'PSW Home Visit', duration: '3 hours', credits: '2 credits' },
      { service: 'Exercise Companion Visit', duration: '2 hours', credits: '2 credits' },
      { service: 'Nutritionist / Personal Cook Visit', duration: '2 hours', credits: '2 credits' },
      { service: 'Hospital Companion', duration: '10 hours', credits: '6 credits' },
      { service: 'Escort + Transportation', duration: '3 hours', credits: '3 credits' },
      { service: 'Escort + Transportation + Translation', duration: '3 hours', credits: '4 credits' },
      { service: 'Psychology / Mental Health Visit', duration: '1 hour', credits: '3 credits' },
      { service: 'Professional Cleaning', duration: '1 hour', credits: '1 credit' },
      { service: 'Translation / Interpretation', duration: '1 hour', credits: '1 credit' },
    ] : [
      { service: '护理员上门', duration: '3小时', credits: '2积分' },
      { service: '运动康伴', duration: '2小时', credits: '2积分' },
      { service: '营养师/厨师', duration: '2小时', credits: '2积分' },
      { service: '陪诊', duration: '10小时', credits: '6积分' },
      { service: '陪同+交通', duration: '3小时', credits: '3积分' },
      { service: '陪同+交通+翻译', duration: '3小时', credits: '4积分' },
      { service: '心理健康', duration: '1小时', credits: '3积分' },
      { service: '专业清洁', duration: '1小时', credits: '1积分' },
      { service: '翻译/口译', duration: '1小时', credits: '1积分' },
    ],
  }

  const currentTabKey = tabs[activeTab].key
  const hero = heroPlans[currentTabKey]
  const cards = upgradeTiers[currentTabKey] || []

  return (
    <section id="membership" className="bg-[#FDFAF5] px-4 py-16 sm:px-10 md:px-16 lg:px-24 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">{t.membership.sectionTitle}</p>
          <h2 id="membership-heading" className="text-3xl font-bold text-midnight sm:text-4xl lg:text-5xl leading-tight">
            {t.membership.title.split('.').filter(Boolean).map((part, i) => (
              <Fragment key={i}>
                {i === 0 ? part + '.' : <><br /><em className="italic text-primary/90">{part.trim()}.</em></>}
              </Fragment>
            ))}
          </h2>
          <p className="mt-4 text-[15px] text-slate-500 max-w-[580px] mx-auto leading-relaxed">
            {isEn
              ? 'Every plan includes a dedicated bilingual care coordinator. Credits are interchangeable across all Careby Home services and expire 2 years from purchase.'
              : '每个方案均包含专属双语护理协调员。积分可在所有 康伴居家 服务间互换，自购买起2年内有效。'}
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true, amount: 0.3 }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-200 min-touch ${
                activeTab === i
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/40 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Hero plan (diagnostics & family) */}
        {hero && (
          <motion.div
            key={currentTabKey + '-hero'}
            className="rounded-[20px] bg-[#0f172a] p-8 sm:p-10 lg:p-12 mb-5 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(42,139,98,0.15)_0%,transparent_65%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wide mb-4">
                {hero.badge}
              </span>
              <h3 className="text-3xl lg:text-4xl font-light text-white mb-2">{hero.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">{hero.tagline}</p>
              <div className="flex flex-col gap-2.5">
                {hero.features.map((f: any, i: number) => (
                  <div key={i} className="flex gap-2.5 items-start text-[13px] text-white/65 leading-relaxed">
                    <span className="text-primary text-sm shrink-0 mt-0.5">{f.icon}</span>
                    <span>{f.highlight ? <em className="not-italic text-white/90 font-medium">{f.text}</em> : f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 text-right">
              <p className="text-[11px] text-white/30 tracking-wide mb-1">{hero.priceLabel}</p>
              <p className="text-6xl lg:text-7xl font-light text-white leading-none">
                <sup className="text-2xl align-top">$</sup>{hero.price}<sub className="text-lg text-white/40">{hero.pricePeriod}</sub>
              </p>
              <p className="text-xs text-white/30 mt-2 mb-7">{hero.priceNote}</p>
              <div className="flex flex-col items-end gap-2">
                <a href="https://app.getcareby.ca/" className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold text-[15px] px-10 py-3.5 rounded-full shadow-[0_6px_28px_rgba(42,139,98,0.4)] transition-all hover:-translate-y-0.5">
                  {hero.cta}
                </a>
                {hero.detailSections && (
                  <a href="https://app.getcareby.ca/" className="text-[13px] text-white/50 hover:text-white transition underline underline-offset-2">
                    {isEn ? 'View full details →' : '查看完整详情 →'}
                  </a>
                )}
              </div>
              {hero.upgradeNote && (
                <p className="text-[11.5px] text-white/25 mt-3">{hero.upgradeNote}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Upgrade / tier cards */}
        {cards.length > 0 && (
          <>
            <motion.div
              key={currentTabKey + '-cards'}
              className={`grid gap-4 mb-5 ${cards.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {cards.map((card: any, i: number) => (
                <div
                  key={i}
                  className={`rounded-2xl p-7 border transition-all hover:-translate-y-0.5 flex flex-col relative ${
                    card.dark
                      ? 'bg-[#0f172a] border-yellow-400/30 hover:border-yellow-400 hover:shadow-[0_8px_32px_rgba(250,204,21,0.12)]'
                      : card.featured
                        ? 'bg-gradient-to-br from-white to-primary/5 border-primary border-2 shadow-[0_8px_32px_rgba(42,139,98,0.15)] scale-[1.03] z-10'
                        : 'bg-white border-slate-200 hover:border-primary/40 hover:shadow-lg'
                  }`}
                >
                  {card.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                        {isEn ? 'Recommended' : '推荐'}
                      </span>
                    </div>
                  )}
                  <p className={`text-[9.5px] font-bold uppercase tracking-wider mb-2.5 ${card.dark ? 'text-yellow-400' : 'text-primary'}`}>{card.badge}</p>
                  <h4 className={`text-[22px] mb-1 ${card.dark ? 'text-white font-bold' : 'text-midnight font-light'}`}>{card.title}</h4>
                  <p className={`text-[12.5px] leading-relaxed mb-4 ${card.dark ? 'text-white/50' : 'text-slate-500'}`}>{card.tagline}</p>
                  <p className={`text-3xl font-light mb-1 ${card.dark ? 'text-white' : 'text-midnight'}`}>
                    {card.price}<sub className={`text-sm ${card.dark ? 'text-white/35' : 'text-slate-400'}`}>{card.period}</sub>
                  </p>
                  {card.saving && (
                    <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-lg mb-4 ${
                      card.dark ? 'bg-yellow-400/15 text-yellow-400' : 'bg-primary/10 text-primary'
                    }`}>{card.saving}</span>
                  )}
                  <div className="flex flex-col gap-2 mb-5 flex-1">
                    {card.features.map((f: string, fi: number) => (
                      <div key={fi} className={`flex gap-2 text-[12.5px] leading-relaxed ${card.dark ? 'text-white/60' : 'text-slate-500'}`}>
                        <span className={`shrink-0 ${card.dark ? 'text-yellow-400' : 'text-primary'}`}>✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://app.getcareby.ca/"
                    className={`block text-center py-2.5 rounded-[20px] text-[13px] font-semibold transition-all ${
                      card.dark
                        ? 'bg-yellow-400 text-[#0f172a] font-extrabold hover:bg-yellow-300'
                        : card.featured
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'border-[1.5px] border-slate-200 text-midnight hover:border-primary hover:text-primary'
                    }`}
                  >
                    {card.cta}
                  </a>
                  {card.detailSections && (
                    <a
                      href="https://app.getcareby.ca/"
                      className={`block w-full text-center mt-2 text-[12px] transition underline underline-offset-2 ${
                        card.dark ? 'text-white/40 hover:text-white/70' : 'text-slate-400 hover:text-primary'
                      }`}
                    >
                      {isEn ? 'View full details →' : '查看完整详情 →'}
                    </a>
                  )}
                </div>
              ))}
            </motion.div>
          </>
        )}

        {/* Diagnostic tier comparison table */}
        {currentTabKey === 'diagnostics' && (
          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 mt-4 overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-midnight uppercase tracking-wide mb-4">
              {isEn ? 'Diagnostic Tier Comparison' : '诊断方案对比'}
            </h4>
            {(() => {
              const compRows = isEn ? [
                { label: 'Biomarkers', vals: ['~45', '~80', '~105', '150+'] },
                { label: 'Target Age', vals: ['25-45', '45-60', '60+', 'All ages'] },
                { label: 'CBC + Metabolic', vals: ['✓', '✓', '✓', '✓'] },
                { label: 'Heart Health (ApoB+)', vals: ['✓', '✓', '✓', '✓'] },
                { label: 'HBV Panel', vals: ['✓', '✓', '✓', '✓'] },
                { label: 'Full Hormone Panel', vals: ['—', '✓', '✓', '✓'] },
                { label: 'Advanced Lipids (Lp(a))', vals: ['—', '✓', '✓', '✓'] },
                { label: 'Cystatin C (kidney)', vals: ['—', '—', '✓', '✓'] },
                { label: 'Prealbumin (frailty)', vals: ['—', '—', '✓', '✓'] },
                { label: 'Bone Health Panel', vals: ['—', '—', '✓', '✓'] },
                { label: 'Cancer Screening', vals: ['—', '—', '—', '✓'] },
                { label: 'Heavy Metals', vals: ['—', '—', '—', '✓'] },
                { label: 'Imaging Suite', vals: ['Add-on', 'Add-on', 'From $299', 'Included'] },
                { label: 'Bilingual NP Consult', vals: ['✓', '✓', '✓', '✓'] },
                { label: 'Doctor-Reviewed', vals: ['✓', '✓', '✓', '✓'] },
              ] : [
                { label: '生物标志物', vals: ['~45', '~80', '~105', '150+'] },
                { label: '目标年龄', vals: ['25-45', '45-60', '60+', '全年龄'] },
                { label: 'CBC + 代谢', vals: ['✓', '✓', '✓', '✓'] },
                { label: '心血管 (ApoB+)', vals: ['✓', '✓', '✓', '✓'] },
                { label: '乙肝面板', vals: ['✓', '✓', '✓', '✓'] },
                { label: '全套激素', vals: ['—', '✓', '✓', '✓'] },
                { label: '高级脂质 Lp(a)', vals: ['—', '✓', '✓', '✓'] },
                { label: '胱抑素C', vals: ['—', '—', '✓', '✓'] },
                { label: '前白蛋白', vals: ['—', '—', '✓', '✓'] },
                { label: '骨健康', vals: ['—', '—', '✓', '✓'] },
                { label: '癌症筛查', vals: ['—', '—', '—', '✓'] },
                { label: '重金属', vals: ['—', '—', '—', '✓'] },
                { label: '影像', vals: ['加购', '加购', '$299起', '包含'] },
                { label: '双语咨询', vals: ['✓', '✓', '✓', '✓'] },
                { label: '医生审核', vals: ['✓', '✓', '✓', '✓'] },
              ]
              const tierHeaders = ['Essentialist', 'Longevity', 'Vitality 60+', 'Infinity']
              const tierPrices = isEn ? ['$399/yr', '$699/yr', '$999/yr', '$2,499/yr'] : ['$399/年', '$699/年', '$999/年', '$2,499/年']
              return (
                <table className="w-full text-[12.5px]">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="pb-3 text-left font-semibold text-midnight w-[180px]"></th>
                      {tierHeaders.map((h, i) => (
                        <th key={i} className={`pb-3 text-center font-semibold ${i === 2 ? 'text-primary' : 'text-midnight'}`}>
                          <div>{h}</div>
                          <div className="text-[10px] font-normal text-slate-400 mt-0.5">{tierPrices[i]}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compRows.map((row, ri) => (
                      <tr key={ri} className={`border-b border-slate-100 ${ri % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2 text-slate-600 font-medium">{row.label}</td>
                        {row.vals.map((v, vi) => (
                          <td key={vi} className={`py-2 text-center ${v === '✓' ? 'text-primary font-semibold' : v === '—' ? 'text-slate-300' : 'text-slate-500'}`}>
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            })()}
          </motion.div>
        )}

        {/* Credits row (shown for Home Care tab) */}
        {currentTabKey === 'home' && (
          <motion.div
            className="rounded-2xl border border-slate-200 bg-[#FAF8F5] p-7 sm:p-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center mt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C49A3C] bg-[#C49A3C]/10 px-2.5 py-0.5 rounded-lg mb-3">{creditsInfo.badge}</span>
              <h4 className="text-[22px] font-light text-midnight mb-2">{creditsInfo.title}</h4>
              <p className="text-[13px] text-slate-500 leading-relaxed">{creditsInfo.desc}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {creditsInfo.packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 text-center border transition-all hover:-translate-y-0.5 ${
                    pkg.popular ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white hover:border-primary'
                  }`}
                >
                  <p className="text-xs font-semibold text-midnight mb-1">{pkg.name}</p>
                  <p className="text-[22px] font-light text-midnight">{pkg.price}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{pkg.credits}</p>
                  <p className={`text-[10px] font-bold mt-1 ${pkg.popular ? 'text-primary' : 'text-primary'}`}>{pkg.save}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Service rate card (shown for Home Care tab) */}
        {currentTabKey === 'home' && creditsInfo.serviceRates && (
          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-midnight uppercase tracking-wide mb-4">
              {isEn ? 'Credit Service Rate Card' : '积分服务费率表'}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="pb-2 font-semibold text-midnight">{isEn ? 'Service' : '服务'}</th>
                    <th className="pb-2 font-semibold text-midnight text-center">{isEn ? 'Duration' : '时长'}</th>
                    <th className="pb-2 font-semibold text-midnight text-center">{isEn ? 'Credits' : '积分'}</th>
                  </tr>
                </thead>
                <tbody>
                  {creditsInfo.serviceRates.map((rate: any, ri: number) => (
                    <tr key={ri} className="border-b border-slate-100 last:border-0">
                      <td className="py-2.5 text-slate-600">{rate.service}</td>
                      <td className="py-2.5 text-slate-500 text-center">{rate.duration}</td>
                      <td className="py-2.5 text-primary font-semibold text-center">{rate.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Bottom note */}
        <motion.p
          className="text-center mt-5 text-[13px] text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isEn ? 'Not sure where to start? ' : '不确定从哪开始？'}
          <a href={contactInfo.phone.includes('XXX') ? '#' : `tel:+1${contactInfo.phone.replace(/\D/g, '')}`} className="text-primary hover:underline">{isEn ? 'Talk to us →' : '联系我们 →'}</a>
          {isEn ? ' · All plans include a dedicated bilingual care coordinator.' : ' · 所有方案均含专属双语护理协调员。'}
        </motion.p>
      </div>
      <PlanDetailModal plan={detailPlan} onClose={() => setDetailPlan(null)} />
    </section>
  )
}

function FAQSection({ t, lang }: { t: typeof content.en, lang: 'en' | 'zh' | 'zh-TW' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const currentLangForFaq = lang === 'zh-TW' ? 'zh' : lang
  const items = faqItems[currentLangForFaq as 'en' | 'zh'] || faqItems.en

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-10 md:px-16 lg:px-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-20 lg:mb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">{t.faq.sectionTitle}</p>
          <h2 id="faq-heading" className="mt-6 text-4xl font-bold text-midnight sm:text-5xl lg:text-6xl leading-tight" itemProp="name">{t.faq.title}</h2>
        </div>
        <div className="mt-12 space-y-6">
          {items.map((item: any, index: number) => (
            <div key={item.question} className="border-b border-slate-200 pb-6 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between text-left transition min-touch py-2"
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
              We will obtain separate explicit consent before sending marketing emails or SMS. You can opt out at any time by clicking &quot;unsubscribe&quot; in any marketing email, replying &quot;STOP&quot; to marketing SMS messages, or contacting us at hello@getcareby.ca.
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
            <p>Email: hello@getcareby.ca | Phone: 1-646-578-9920</p>
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
            <p>Diagnostics (e.g. The Essentialist): from $399/year. Home care (e.g. Independent Living): from $1,499/month. Companion: from $199/month. Family Health Hub: $2,499/year. Other tiers and credits as posted.</p>
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
              Contact us first to resolve concerns (hello@getcareby.ca). If unresolved, disputes may be referred to mediation. These Terms are governed by the laws of Ontario and Canada.
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
              Careby Solutions Inc. 205 Placer Court, Suite 513, North York, ON M2H 0A9, Canada | Email: hello@getcareby.ca | Phone: 1-646-578-9920
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
    <footer className="relative bg-midnight px-4 pt-0 pb-24 text-soft sm:px-10 sm:pb-10 md:px-16 lg:px-24 overflow-hidden pb-safe">
      <LogoWatermark className="absolute -left-10 bottom-8 w-[350px] lg:w-[420px] -rotate-6" opacity={0.06} />
      {/* Giant CAREBY text — deep slow gradient shift */}
      <div className="relative mx-auto max-w-6xl mb-10 pt-10 select-none overflow-hidden" aria-hidden>
        <motion.p
          className="text-[clamp(95px,22vw,275px)] font-extrabold uppercase leading-none tracking-tight"
          style={{
            background: 'linear-gradient(135deg, rgba(6,78,59,0.5) 0%, rgba(13,148,136,0.45) 25%, rgba(15,118,110,0.4) 50%, rgba(4,47,46,0.5) 75%, rgba(17,94,89,0.45) 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        >
          CAREBY
        </motion.p>
        {/* Sparkle particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-400"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.address}</p>
          <div className="mt-3 space-y-1 text-xs text-white/60">
            {contactInfo.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.contact}</p>
          <div className="mt-3 space-y-2 text-xs text-white/60">
            <p>{t.footer.phone}: {contactInfo.phone} ({t.footer.support247})</p>
            <p>{t.footer.email}: {contactInfo.email}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.links}</p>
          <ul className="mt-3 space-y-2 text-xs text-white/60">
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
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">{t.footer.businessHours}</p>
          <div className="mt-3 space-y-2 text-xs text-white/60">
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
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-5 text-xs text-white/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p>© 2025 Careby Solutions Inc. {t.footer.allRightsReserved}</p>
        <div className="flex items-center gap-4 justify-end">
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
        </div>
      </div>
    </footer>
  )
}

function _FinalCTASection({ t }: { t: typeof content.en }) {
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
