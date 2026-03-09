#!/bin/bash

# Careby 项目打包脚本 - 用于发送给客户
# 创建日期: 2026-01-21

PROJECT_NAME="Careby-Website-Project"
VERSION=$(date +%Y%m%d)
OUTPUT_FILE="${PROJECT_NAME}-${VERSION}.zip"

echo "📦 开始打包 Careby 项目..."
echo ""

# 创建临时目录
TEMP_DIR=$(mktemp -d)
PROJECT_DIR="${TEMP_DIR}/${PROJECT_NAME}"

# 创建项目目录结构
mkdir -p "${PROJECT_DIR}"

echo "📁 复制项目文件..."

# 复制源代码
echo "  - 复制源代码..."
mkdir -p "${PROJECT_DIR}/src"
cp -r src/* "${PROJECT_DIR}/src/"

# 复制公共资源（排除 node_modules）
echo "  - 复制公共资源..."
mkdir -p "${PROJECT_DIR}/public"
cp -r public/* "${PROJECT_DIR}/public/" 2>/dev/null || true

# 复制配置文件
echo "  - 复制配置文件..."
cp package.json "${PROJECT_DIR}/"
cp package-lock.json "${PROJECT_DIR}/" 2>/dev/null || true
cp tsconfig.json "${PROJECT_DIR}/"
cp tsconfig.app.json "${PROJECT_DIR}/"
cp tsconfig.node.json "${PROJECT_DIR}/"
cp vite.config.ts "${PROJECT_DIR}/"
cp tailwind.config.js "${PROJECT_DIR}/"
cp postcss.config.js "${PROJECT_DIR}/"
cp eslint.config.js "${PROJECT_DIR}/"
cp vercel.json "${PROJECT_DIR}/"
cp index.html "${PROJECT_DIR}/"

# 复制文档
echo "  - 复制文档..."
cp README.md "${PROJECT_DIR}/"
cp PROJECT_SUMMARY.md "${PROJECT_DIR}/"
cp DEPLOYMENT_GUIDE.md "${PROJECT_DIR}/"
cp SEO_IMPLEMENTATION_SUMMARY.md "${PROJECT_DIR}/"
cp SEO_QUICK_REFERENCE.md "${PROJECT_DIR}/" 2>/dev/null || true
cp LANGUAGE_SUPPORT.md "${PROJECT_DIR}/"
cp PRE_DEPLOYMENT_CHECKLIST.md "${PROJECT_DIR}/" 2>/dev/null || true
cp VIDEO_UPDATE.md "${PROJECT_DIR}/" 2>/dev/null || true
cp TRADITIONAL_CHINESE_FIX.md "${PROJECT_DIR}/" 2>/dev/null || true

# 复制中文 Logo（如果存在）
if [ -f "logo zh.png" ]; then
  echo "  - 复制 Logo 文件..."
  cp "logo zh.png" "${PROJECT_DIR}/"
fi

# 创建说明文件
echo "  - 创建说明文件..."
cat > "${PROJECT_DIR}/README-FOR-CLIENT.md" << 'EOF'
# Careby 网站项目交付包

## 📋 项目信息

**项目名称**: Careby Solutions Inc. 官方网站  
**项目类型**: 企业官网 / 医疗健康服务平台  
**技术栈**: React 19 + TypeScript + Vite + Tailwind CSS  
**部署平台**: Vercel  
**生产环境**: https://getcareby.ca

## 📁 文件结构说明

### 核心文件
- `src/` - 源代码目录
  - `App.tsx` - 主应用组件（包含所有页面内容）
  - `components/` - React 组件
  - `utils/` - 工具函数
  - `services/` - 服务层代码
- `public/` - 公共资源（图片、Logo、视频等）
- `index.html` - HTML 入口文件

### 配置文件
- `package.json` - 项目依赖和脚本
- `vite.config.ts` - Vite 构建配置
- `tailwind.config.js` - Tailwind CSS 配置
- `tsconfig.json` - TypeScript 配置
- `vercel.json` - Vercel 部署配置

### 文档
- `PROJECT_SUMMARY.md` - **项目完成总结（重要）**
- `DEPLOYMENT_GUIDE.md` - 部署指南
- `SEO_IMPLEMENTATION_SUMMARY.md` - SEO 优化总结
- `LANGUAGE_SUPPORT.md` - 多语言支持说明

## 🚀 快速开始

### 安装依赖
```bash
npm install --legacy-peer-deps
```

### 本地开发
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 部署到 Vercel
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

## 📖 重要文档

1. **PROJECT_SUMMARY.md** - 完整的项目总结，包含所有功能说明
2. **DEPLOYMENT_GUIDE.md** - 详细的部署指南和后续配置
3. **SEO_IMPLEMENTATION_SUMMARY.md** - SEO 优化实施详情

## ⚠️ 注意事项

1. **Node.js 版本**: 需要 Node.js >= 18.0.0
2. **依赖安装**: 使用 `--legacy-peer-deps` 标志安装依赖
3. **环境变量**: 部署后需要配置 Google Analytics 和 GTM ID
4. **域名配置**: 在 Vercel 中配置自定义域名 getcareby.ca

## 📞 技术支持

如有问题，请参考项目文档或联系开发团队。

---
**打包日期**: $(date +%Y-%m-%d)
**项目版本**: 1.0
EOF

# 创建 .gitignore（如果需要）
if [ -f ".gitignore" ]; then
  cp .gitignore "${PROJECT_DIR}/"
fi

echo ""
echo "📦 创建压缩包..."

# 进入临时目录并创建 zip
cd "${TEMP_DIR}"
zip -r "${OUTPUT_FILE}" "${PROJECT_NAME}" -q

# 移动回原目录
mv "${OUTPUT_FILE}" "${OLDPWD}/"

# 清理临时目录
rm -rf "${TEMP_DIR}"

echo ""
echo "✅ 打包完成！"
echo ""
echo "📦 输出文件: ${OUTPUT_FILE}"
echo "📊 文件大小: $(du -h "${OUTPUT_FILE}" | cut -f1)"
echo ""
echo "📧 可以将此文件发送给客户"
