/** Shared Careby Health / Home / etc. hero plan copy for pricing section and detail pages */
export function buildHeroPlans(isEn: boolean): Record<string, any> {
  return {
    diagnostics: {
      badge: isEn ? 'Tier 1 · Ages 25–45 · Entry Product' : 'Tier 1 · 25–45岁 · 入门产品',
      title: 'The Essentialist',
      tagline: isEn
        ? '~45 biomarkers. The lowest-friction entry point. A complete, doctor-reviewed blood panel built specifically for adults 25–45 — every marker chosen for clinical relevance.'
        : '约45项生物标志物。专为25–45岁成人设计的完整医生审核血检方案——每项指标均具临床意义。',
      features: isEn
        ? [
            { icon: '✓', text: 'CBC, metabolic panel, heart health (incl. ApoB), organ function, thyroid' },
            { icon: '★', text: 'Hepatitis B panel — HBV prevalence is 10× higher in Chinese-Canadian adults', highlight: true },
            { icon: '✓', text: 'Results through AI-powered Longevity platform with biological age tracking' },
            { icon: '✓', text: 'Bilingual NP consultation — Mandarin, Cantonese, or English' },
            { icon: '✓', text: 'Doctor-reviewed results + personalized action plan' },
          ]
        : [
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
      detailSections: isEn
        ? [
            { title: 'Complete Blood Count (CBC)', items: ['Red blood cells, white blood cells, hemoglobin, hematocrit, platelets', 'MCV, MCH, MCHC, RDW — detailed red cell indices', 'Baseline picture of immune health, anemia risk, infection response, and blood oxygen capacity'] },
            { title: 'Metabolic Panel', items: ['Glucose (fasting), HbA1c, insulin', 'Blood sugar regulation and diabetes risk — HbA1c catches 3-month average glucose trends your doctor\'s annual visit misses'] },
            { title: 'Heart Health', items: ['ApoB — superior cardiovascular risk marker; most panels don\'t include it', 'LDL cholesterol, HDL cholesterol, total cholesterol, triglycerides, non-HDL cholesterol', 'Cardiovascular risk profiling beyond the standard lipid panel'] },
            { title: 'Organ Function', items: ['Kidney: Creatinine, eGFR', 'Liver: ALT, AST, GGT, bilirubin, albumin, total protein'] },
            { title: 'Thyroid', items: ['TSH — thyroid stimulating hormone, foundational screen for hypo/hyperthyroidism'] },
            { title: 'Iron & Nutrients', items: ['Ferritin, serum iron, TIBC, Vitamin D (25-OH)'] },
            { title: 'Inflammation', items: ['CRP (C-reactive protein) — general inflammation marker'] },
            { title: 'Infectious Disease', items: ['Hepatitis B surface antigen (HBsAg)', 'Hepatitis B surface antibody (anti-HBs)', 'Hepatitis B core antibody (anti-HBc)'] },
            { title: 'Included with Every Tier', items: ['Blood draw', 'Doctor-reviewed — physician reads your full panel, not just flags abnormals', 'Comprehensive lab result visualization and interpretation through an integrated AI platform', 'Built-in AI insights to help translate complex lab data into actionable health recommendations', 'Bilingual NP consultation — results explained in Mandarin, Cantonese, or English', 'Personalized action plan — tells you what to do next, not just what the numbers are'] },
          ]
        : [
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
      features: isEn
        ? [
            { icon: '✓', text: '100-biomarker blood panels 2×/year for both seniors' },
            { icon: '✓', text: 'GoToDoctor unlimited telehealth for up to 4 members' },
            { icon: '✓', text: '4 Careby Home service credits included' },
            { icon: '✓', text: 'Dedicated bilingual care coordinator' },
            { icon: '✓', text: 'Monthly family health summary report' },
            { icon: '✓', text: 'Priority booking across all Careby services' },
          ]
        : [
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
      detailSections: isEn
        ? [
            {
              title: "What's Included",
              items: [
                '100-biomarker blood panels 2×/year for both seniors',
                'GoToDoctor unlimited telehealth for up to 4 members',
                '4 Careby Home service credits included',
                'Dedicated bilingual care coordinator',
                'Monthly family health summary report',
                'Priority booking across all Careby services',
              ],
            },
          ]
        : [{ title: '包含内容', items: ['两位长者每年2次100项血检', '4位成员无限远程医生', '含4次服务积分', '专属双语协调员', '每月健康摘要', '优先预约'] }],
    },
    home: {
      badge: isEn ? 'Monthly Plan · Most Popular' : '月度计划 · 最受欢迎',
      title: 'Independent Living',
      tagline: isEn
        ? 'Built for seniors who want to stay at home — safely, comfortably, and with family peace of mind. Your parent gets consistent, vetted care from someone who speaks their language and knows their history.'
        : '专为希望安全舒适居家的长者设计。固定的、经过审核的护理人员，讲他们的语言，了解他们的历史。',
      features: isEn
        ? [
            { icon: '✓', text: 'Dedicated bilingual PSW — same caregiver, consistent visits' },
            { icon: '✓', text: '12 Careby Home credits per month, usable across any home service' },
            { icon: '✓', text: 'Benefits navigation — we find every government & insurance benefit' },
            { icon: '✓', text: 'GoToDoctor virtual physician access for urgent health concerns' },
            { icon: '✓', text: 'Cultural and language matching + replacement guarantee' },
          ]
        : [
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
      detailSections: isEn
        ? [
            {
              title: "What's Included",
              items: [
                'Dedicated bilingual PSW — same caregiver, consistent visits',
                '12 Careby Home credits per month, usable across any home service',
                'Benefits navigation — we find and activate every government and insurance benefit your parent is entitled to',
                'GoToDoctor virtual physician access — rapid consultations for urgent health concerns, helping reduce specialist referral wait times',
                'Cultural and language matching — Mandarin, Cantonese, English',
                'Replacement guarantee',
              ],
            },
          ]
        : [{ title: '包含内容', items: ['专属双语护理员', '每月12次积分', '福利导航', 'GoToDoctor虚拟医生', '文化语言匹配', '替换保证'] }],
    },
    corporate: {
      badge: isEn ? 'Enhanced Tier · 201+ Employees' : '增强版 · 201+员工',
      title: 'Workforce Wellness+',
      tagline: isEn
        ? 'For employers who understand that a sick employee spends hours scheduling care and waiting. Careby gives your team proactive virtual physician care, reduced time for specialists, and quarterly wellness check-ins.'
        : '面向理解员工生病需要耗费大量时间排队就诊的雇主。康伴为您的团队提供主动的虚拟医生服务、缩短专科等待时间，以及季度健康检查。',
      features: isEn
        ? [
            { icon: '✓', text: 'GoToDoctor virtual physician access with coordinated specialist referrals' },
            { icon: '✓', text: 'Quarterly workforce culture coaching and employee check-ins' },
            { icon: '✓', text: 'Benefits navigation support' },
            { icon: '✓', text: 'PHIPA compliant' },
          ]
        : [
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
      detailSections: isEn
        ? [
            {
              title: "What's Included",
              items: [
                'GoToDoctor virtual physician access with coordinated specialist referrals to reduce wait times',
                'Quarterly workforce culture coaching and employee check-ins',
                'Benefits navigation support',
                'PHIPA compliant',
              ],
            },
          ]
        : [{ title: '包含内容', items: ['GoToDoctor虚拟医生+专科转介', '季度职场辅导', '福利导航', 'PHIPA合规'] }],
    },
  }
}
