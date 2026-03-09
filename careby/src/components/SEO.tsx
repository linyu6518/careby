import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonical?: string
  lang?: 'en' | 'zh-CN' | 'zh-TW'
  noindex?: boolean
  structuredData?: object
}

const defaultMeta = {
  en: {
    title: 'Careby - Premium Home Care Services in Toronto & Ontario | Gold Standard Caregivers',
    description: 'Careby provides premium home care services in Toronto and Ontario. Gold Standard certified caregivers, 24/7 telehealth access, medical accompaniment, fall detection, and pain management. Bilingual care in English, Mandarin, and Cantonese.',
    keywords: 'home care services Ontario, personal support worker Toronto, caregiver matching Canada, 24/7 telehealth Ontario, bilingual home care, Chinese speaking PSW, senior care Toronto, in-home care services GTA, certified caregivers Ontario, medical accompaniment Toronto, fall detection home care, pain management services, post-surgical home care, PSW services Toronto, home health care Ontario, elderly care services, caregiver services Toronto, private home care, home care coordination, telehealth access Ontario',
    ogImage: 'https://getcareby.ca/Hero.png'
  },
  'zh-CN': {
    title: 'Careby - 多伦多和安大略省优质家庭护理服务 | 黄金标准认证护工',
    description: 'Careby提供多伦多和安大略省的优质家庭护理服务。黄金标准认证护工、24/7远程医疗、医疗陪诊、跌倒检测和疼痛管理。提供英语、普通话和粤语双语护理服务。',
    keywords: '多伦多家庭护理, 安大略私人护理, 华人护工服务, 多伦多中文护工, 加拿大居家养老服务, 安省医疗陪诊, 多伦多老年护理, 大多伦多地区家庭护理, 认证护工安大略, 医疗陪诊多伦多, 家庭跌倒检测, 疼痛管理服务, 术后家庭护理, PSW服务多伦多, 家庭健康护理安大略, 老年人护理服务, 护工服务多伦多, 私人家庭护理, 家庭护理协调, 远程医疗安大略',
    ogImage: 'https://getcareby.ca/Hero.png'
  },
  'zh-TW': {
    title: 'Careby - 多倫多和安大略省優質家庭護理服務 | 黃金標準認證護工',
    description: 'Careby提供多倫多和安大略省的優質家庭護理服務。黃金標準認證護工、24/7遠程醫療、醫療陪診、跌倒檢測和疼痛管理。提供英語、普通話和粵語雙語護理服務。',
    keywords: '多倫多家庭護理, 安大略私人護理, 華人護工服務, 多倫多中文護工, 加拿大居家養老服務, 安省醫療陪診, 多倫多老年護理, 大多倫多地區家庭護理, 認證護工安大略, 醫療陪診多倫多, 家庭跌倒檢測, 疼痛管理服務, 術後家庭護理, PSW服務多倫多, 家庭健康護理安大略, 老年人護理服務, 護工服務多倫多, 私人家庭護理, 家庭護理協調, 遠程醫療安大略',
    ogImage: 'https://getcareby.ca/Hero.png'
  }
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical,
  lang = 'en',
  noindex = false,
  structuredData
}: SEOProps) {
  const meta = defaultMeta[lang]
  const finalTitle = title || meta.title
  const finalDescription = description || meta.description
  const finalKeywords = keywords || meta.keywords
  const finalOgImage = ogImage || meta.ogImage

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : 'en'} />
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || finalTitle} />
      <meta property="og:description" content={ogDescription || finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content={lang === 'zh-CN' ? 'zh_CN' : lang === 'zh-TW' ? 'zh_TW' : 'en_CA'} />
      <meta property="og:site_name" content="Careby Solutions Inc." />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:title" content={ogTitle || finalTitle} />
      <meta property="twitter:description" content={ogDescription || finalDescription} />
      <meta property="twitter:image" content={finalOgImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
