// JSON-LD Structured Data Generators for SEO

export interface Address {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export interface GeoCoordinates {
  latitude: number
  longitude: number
}

// Organization/LocalBusiness Schema
export const generateLocalBusinessSchema = (lang: 'en' | 'zh-CN' | 'zh-TW' = 'en') => {
  const descriptions = {
    en: 'Careby Solutions Inc. provides comprehensive home care services including caregiver matching, 24/7 telehealth access, medical accompaniment, and pain management in Ontario, Canada.',
    'zh-CN': 'Careby Solutions Inc. 提供全面的家庭护理服务，包括护工匹配、24/7远程医疗、医疗陪诊和疼痛管理。服务覆盖加拿大安大略省。',
    'zh-TW': 'Careby Solutions Inc. 提供全面的家庭護理服務，包括護工匹配、24/7遠程醫療、醫療陪診和疼痛管理。服務覆蓋加拿大安大略省。'
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://getcareby.ca/#organization',
    name: 'Careby Solutions Inc.',
    alternateName: 'Careby',
    description: descriptions[lang],
    url: 'https://getcareby.ca',
    logo: 'https://getcareby.ca/carebylogo_white.svg',
    image: 'https://getcareby.ca/Hero.png',
    telephone: '+1-646-578-9920',
    email: 'hello@getcareby.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '205 Placer Court, Suite 513',
      addressLocality: 'North York',
      addressRegion: 'ON',
      postalCode: 'M2H 0A9',
      addressCountry: 'CA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.8112,
      longitude: -79.3632
    },
    areaServed: {
      '@type': 'State',
      name: 'Ontario',
      '@id': 'https://en.wikipedia.org/wiki/Ontario'
    },
    priceRange: '$$-$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    sameAs: [
      // Add social media profiles here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-646-578-9920',
      contactType: 'Customer Service',
      email: 'hello@getcareby.ca',
      availableLanguage: ['English', 'Chinese (Simplified)', 'Chinese (Traditional)']
    }
  }
}

// MedicalOrganization Schema
export const generateMedicalOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Careby Solutions Inc.',
    url: 'https://getcareby.ca',
    medicalSpecialty: ['Geriatrics', 'HomeHealthCare', 'PainManagement'],
    isAcceptingNewPatients: true,
    hasCredential: 'Careby Gold Standard 10/10 Vetting Process'
  }
}

// FAQ Schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Service Schema
export const generateServiceSchema = (
  serviceName: string,
  description: string,
  price?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description: description,
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Careby Solutions Inc.',
      url: 'https://getcareby.ca'
    },
    areaServed: {
      '@type': 'State',
      name: 'Ontario'
    },
    ...(price && { offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'CAD'
    }})
  }
}

// Membership/Offer Schema
export const generateOfferSchema = (
  name: string,
  price: string,
  description: string,
  validFrom?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: name,
    price: price,
    priceCurrency: 'CAD',
    description: description,
    seller: {
      '@type': 'Organization',
      name: 'Careby Solutions Inc.'
    },
    availability: 'https://schema.org/InStock',
    ...(validFrom && { validFrom: validFrom })
  }
}

// Breadcrumb Schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// WebSite Schema with SearchAction
export const generateWebsiteSchema = (lang: 'en' | 'zh-CN' | 'zh-TW' = 'en') => {
  const names = {
    en: 'Careby - Premium Home Care Services',
    'zh-CN': 'Careby - 优质家庭护理服务',
    'zh-TW': 'Careby - 優質家庭護理服務'
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://getcareby.ca/#website',
    url: 'https://getcareby.ca',
    name: names[lang],
    publisher: {
      '@id': 'https://getcareby.ca/#organization'
    },
    inLanguage: lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : 'en-CA',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://getcareby.ca/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}

// Review/Rating Schema (for testimonials)
export const generateReviewSchema = (
  author: string,
  reviewBody: string,
  rating: number,
  datePublished: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'MedicalBusiness',
      name: 'Careby Solutions Inc.'
    },
    author: {
      '@type': 'Person',
      name: author
    },
    reviewBody: reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5
    },
    datePublished: datePublished
  }
}

// Generate all service schemas
export const generateServiceSchemas = (lang: 'en' | 'zh-CN' | 'zh-TW' = 'en') => {
  const services = [
    {
      name: 'Professional Home Care',
      description: lang === 'en' 
        ? 'Gold Standard certified caregivers providing post-surgical home care, medical accompaniment, and daily living support (PSW services) in Toronto and Ontario.'
        : lang === 'zh-CN'
        ? '黄金标准认证护工，提供术后家庭护理、医疗陪诊和日常生活支持（PSW服务），服务覆盖多伦多和安大略省。'
        : '黃金標準認證護工，提供術後家庭護理、醫療陪診和日常生活支持（PSW服務），服務覆蓋多倫多和安大略省。',
      price: '$35-$65/hour'
    },
    {
      name: 'Advanced Fall Detection & Health Monitoring',
      description: lang === 'en'
        ? 'AI-powered radar technology for fall detection and health monitoring. Contactless sensors analyze gait, balance, and movement patterns 24/7.'
        : lang === 'zh-CN'
        ? 'AI驱动的雷达技术用于跌倒检测和健康监测。无接触传感器24/7分析步态、平衡和运动模式。'
        : 'AI驅動的雷達技術用於跌倒檢測和健康監測。無接觸傳感器24/7分析步態、平衡和運動模式。',
      price: '$79-$99/month'
    },
    {
      name: 'Instant Telehealth Access',
      description: lang === 'en'
        ? 'On-demand access to Ontario-licensed physicians via video consultations. Same-day appointments, prescription refills, and specialist referrals.'
        : lang === 'zh-CN'
        ? '通过视频咨询按需访问安大略省持牌医生。当日预约、处方续药和专科转诊。'
        : '通過視頻諮詢按需訪問安大略省持牌醫生。當日預約、處方續藥和專科轉診。',
      price: '$49-$99/month'
    },
    {
      name: 'Regenerative Medicine & Longevity',
      description: lang === 'en'
        ? 'Stem cell and exosome banking services for future regenerative treatments and anti-aging therapies.'
        : lang === 'zh-CN'
        ? '干细胞和外泌体储存服务，用于未来的再生治疗和抗衰老疗法。'
        : '幹細胞和外泌體儲存服務，用於未來的再生治療和抗衰老療法。',
      price: '$2,500-$6,000'
    },
    {
      name: 'Complete Care Coordination',
      description: lang === 'en'
        ? 'Comprehensive care coordination including medical team communication, family updates, and insurance navigation.'
        : lang === 'zh-CN'
        ? '全面的护理协调，包括医疗团队沟通、家庭更新和保险导航。'
        : '全面的護理協調，包括醫療團隊溝通、家庭更新和保險導航。',
      price: 'Included in membership'
    },
    {
      name: 'Benefits Application & Financial Support',
      description: lang === 'en'
        ? 'Assistance with government benefits navigation, insurance claims, and healthcare funding maximization.'
        : lang === 'zh-CN'
        ? '协助政府福利导航、保险理赔和医疗资金最大化。'
        : '協助政府福利導航、保險理賠和醫療資金最大化。',
      price: 'Consultation-based'
    }
  ]

  return services.map(service => generateServiceSchema(service.name, service.description, service.price))
}

// Generate Review Schemas from testimonials
export const generateReviewSchemas = (testimonials: Array<{
  name: string
  text: string
  rating: number
  location: string
  datePublished?: string
}>) => {
  return testimonials.map(testimonial => 
    generateReviewSchema(
      testimonial.name,
      testimonial.text,
      testimonial.rating,
      testimonial.datePublished || new Date().toISOString().split('T')[0]
    )
  )
}

// Generate Breadcrumb Schema for homepage sections
export const generateHomepageBreadcrumbSchema = () => {
  return generateBreadcrumbSchema([
    { name: 'Home', url: 'https://getcareby.ca/' },
    { name: 'Services', url: 'https://getcareby.ca/#services' },
    { name: 'Technology', url: 'https://getcareby.ca/#technology' },
    { name: 'Partners', url: 'https://getcareby.ca/#partners' },
    { name: 'Impact', url: 'https://getcareby.ca/#impact' },
    { name: 'Membership', url: 'https://getcareby.ca/#membership' },
    { name: 'FAQ', url: 'https://getcareby.ca/#faq' }
  ])
}

// Combined/Aggregate Schema for Homepage
export const generateHomepageSchema = (
  lang: 'en' | 'zh-CN' | 'zh-TW' = 'en',
  faqs?: Array<{ question: string; answer: string }>,
  testimonials?: Array<{
    name: string
    text: string
    rating: number
    location: string
    datePublished?: string
  }>
) => {
  const schemas: any[] = [
    generateWebsiteSchema(lang),
    generateLocalBusinessSchema(lang),
    generateMedicalOrganizationSchema(),
    generateHomepageBreadcrumbSchema(),
    ...generateServiceSchemas(lang)
  ]
  
  // Add FAQ Schema if FAQs are provided
  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs))
  }
  
  // Add Review Schemas if testimonials are provided
  if (testimonials && testimonials.length > 0) {
    schemas.push(...generateReviewSchemas(testimonials))
  }
  
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  }
}
