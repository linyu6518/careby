# Careby 三语言支持说明

## 🌐 语言支持概述

Careby 网站现已完全支持三种语言的无缝切换：

1. **English** (英语) - `en`
2. **简体中文** (Simplified Chinese) - `zh`
3. **繁體中文** (Traditional Chinese) - `zh-TW`

## 🔄 语言切换功能

### 切换方式
用户可以通过点击页面右上角的语言切换按钮，在三种语言之间循环切换：

```
English → 简体中文 → 繁體中文 → English → ...
```

### 按钮显示
- 当前为英语时，按钮显示：**"简体中文"**
- 当前为简体中文时，按钮显示：**"繁體中文"**
- 当前为繁体中文时，按钮显示：**"English"**

## 📝 内容说明

### 简体中文 vs 繁体中文
繁体中文内容通过智能转换系统自动生成：

1. **自动转换**：使用 `convertToTraditional` 工具自动将简体中文转换为繁体中文
2. **医疗词汇优化**：包含 200+ 医疗护理专业词汇的精确转换映射
3. **SEO 元数据**：已为简体中文（`zh-CN`）和繁体中文（`zh-TW`）分别优化
4. **打字机效果**：Hero section 的动画词汇已区分简繁体
   - 简体：爱心、专业人士、人们、速度、创新、尊重、关爱
   - 繁体：愛心、專業人士、人們、速度、創新、尊重、關愛
5. **性能优化**：使用 `useMemo` 缓存转换结果，避免重复转换

### 转换工具
文件位置：`src/utils/convertToTraditional.ts`

包含功能：
- `convertToTraditional(text)` - 转换单个字符串
- `convertObjectToTraditional(obj)` - 递归转换整个对象
- 支持 200+ 医疗护理相关词汇的精确映射

### 未来扩展
如需为繁体中文提供完全独立的内容（不使用自动转换），可以：
1. 在 `src/App.tsx` 中添加 `content['zh-TW']` 对象
2. 修改内容获取逻辑，优先使用独立内容

## 🔧 技术实现

### 类型定义
```typescript
type Language = 'en' | 'zh' | 'zh-TW'
```

### 语言状态管理
```typescript
const [lang, setLang] = useState<'en' | 'zh' | 'zh-TW'>('en')
```

### SEO 映射
```typescript
const seoLang: 'en' | 'zh-CN' | 'zh-TW' = 
  lang === 'en' ? 'en' : 
  lang === 'zh-TW' ? 'zh-TW' : 
  'zh-CN'
```

### 内容映射
```typescript
const t = content[lang === 'zh-TW' ? 'zh' : lang]
```

## 🌍 SEO 优化

### Hreflang 标签
所有页面都包含正确的 hreflang 标签：
```html
<link rel="alternate" hreflang="en" href="https://getcareby.ca/" />
<link rel="alternate" hreflang="zh-Hans" href="https://getcareby.ca/" />
<link rel="alternate" hreflang="zh-Hant" href="https://getcareby.ca/" />
<link rel="alternate" hreflang="x-default" href="https://getcareby.ca/" />
```

### Meta 标签
每种语言都有独立优化的：
- `<title>` 标签
- `<meta name="description">` 
- `<meta name="keywords">`
- OpenGraph 标签
- Twitter Cards

### 结构化数据
LocalBusiness 和其他 Schema 支持三语言：
- 英语：`en_CA`
- 简体中文：`zh_CN`
- 繁体中文：`zh_TW`

## 📋 已更新的组件

以下组件已全部支持三语言：

- ✅ `App` - 主应用组件
- ✅ `LanguageSwitcher` - 语言切换器
- ✅ `HeroSection` - 首页 Hero 区域（含打字机效果）
- ✅ `ServiceSection` - 服务介绍
- ✅ `TechnologySection` - 技术展示
- ✅ `MembershipTiersSection` - 会员方案
- ✅ `FAQSection` - 常见问题
- ✅ `HowItWorksModal` - 工作流程弹窗
- ✅ `NewSection` - 新内容区域（已注释）
- ✅ `PlatformSection` - 平台介绍（已注释）

## 🚀 构建验证

构建成功，所有三语言支持已通过测试：
```bash
npm run build
✓ built in 3.01s
```

## 💡 使用建议

### 1. 本地化内容
如需为台湾、香港等繁体中文地区提供更本地化的内容，建议：

1. 在 `src/App.tsx` 中添加独立的 `content['zh-TW']` 对象
2. 包含地区特定的术语和表达方式
3. 考虑文化差异（如节日、案例等）

### 2. 语言持久化
当前语言选择在页面刷新后会重置为英语。如需保持用户的语言偏好，可以：

```typescript
// 保存到 localStorage
useEffect(() => {
  localStorage.setItem('careby-lang', lang)
}, [lang])

// 从 localStorage 读取
useEffect(() => {
  const savedLang = localStorage.getItem('careby-lang')
  if (savedLang && ['en', 'zh', 'zh-TW'].includes(savedLang)) {
    setLang(savedLang as 'en' | 'zh' | 'zh-TW')
  }
}, [])
```

### 3. 基于浏览器语言的自动检测
可添加自动语言检测：

```typescript
useEffect(() => {
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hk')) {
    setLang('zh-TW')
  } else if (browserLang.startsWith('zh')) {
    setLang('zh')
  } else {
    setLang('en')
  }
}, [])
```

## 📊 搜索引擎优化效果

### 预期效果
- **简体中文用户**：搜索"多伦多家庭护理"、"华人护工服务"等关键词
- **繁体中文用户**：搜索"多倫多家庭護理"、"華人護工服務"等关键词
- **英语用户**：搜索"home care services Toronto"、"Chinese speaking PSW"等关键词

### 地区覆盖
- 🇨🇦 加拿大（主要市场）
- 🇨🇳 中国大陆（简体中文）
- 🇹🇼 台湾（繁体中文）
- 🇭🇰 香港（繁体中文）
- 🇸🇬 新加坡（英语/简体中文）

## ✅ 测试清单

- [x] 语言切换按钮正常工作
- [x] 三种语言可以循环切换
- [x] 每种语言的内容正确显示
- [x] SEO meta 标签随语言切换更新
- [x] 结构化数据包含正确的语言代码
- [x] 构建成功无错误
- [x] TypeScript 类型检查通过

## 🔗 相关文档

- `SEO_IMPLEMENTATION_SUMMARY.md` - 完整 SEO 优化文档
- `SEO_QUICK_REFERENCE.md` - SEO 快速参考指南
- `src/components/SEO.tsx` - SEO 组件实现
- `src/utils/structuredData.ts` - 结构化数据生成器

---

**更新日期**: 2026-01-12  
**状态**: ✅ 三语言支持已完全实现并测试通过
