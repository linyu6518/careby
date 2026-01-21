#!/bin/bash

# Careby 快速部署脚本
# 使用方法: ./deploy.sh [message]

set -e  # 遇到错误立即退出

echo "🚀 Careby 部署脚本"
echo "=================="

# 检查是否提供了提交信息
if [ -z "$1" ]; then
    COMMIT_MESSAGE="🚀 Deploy updates"
else
    COMMIT_MESSAGE="$1"
fi

echo ""
echo "📝 提交信息: $COMMIT_MESSAGE"
echo ""

# 1. 运行 linter
echo "🔍 步骤 1/5: 检查代码质量..."
npm run lint || {
    echo "❌ Linter 检查失败"
    exit 1
}

# 2. 构建
echo ""
echo "🏗️  步骤 2/5: 构建生产版本..."
npm run build || {
    echo "❌ 构建失败"
    exit 1
}

# 3. Git 操作
echo ""
echo "📦 步骤 3/5: 提交更改到 Git..."

# 添加所有文件
git add .

# 检查是否有更改
if git diff --staged --quiet; then
    echo "ℹ️  没有新的更改需要提交"
else
    # 提交
    git commit -m "$COMMIT_MESSAGE"
    echo "✅ 更改已提交"
fi

# 4. 推送到 Git
echo ""
echo "⬆️  步骤 4/5: 推送到远程仓库..."
git push origin main || {
    echo "⚠️  推送失败，请检查远程仓库配置"
    echo "提示: 如果是首次推送，请先设置远程仓库："
    echo "  git remote add origin YOUR_REPO_URL"
    exit 1
}

# 5. 部署到 Vercel
echo ""
echo "🌐 步骤 5/5: 部署到 Vercel..."
if command -v vercel &> /dev/null; then
    vercel --prod --yes || {
        echo "⚠️  Vercel 部署失败"
        echo "提示: 请确保已安装并登录 Vercel CLI"
        echo "  npm install -g vercel"
        echo "  vercel login"
        exit 1
    }
else
    echo "ℹ️  Vercel CLI 未安装"
    echo "如果您使用 Git 集成，Vercel 将自动部署"
    echo "如需手动部署，请安装 Vercel CLI："
    echo "  npm install -g vercel"
fi

echo ""
echo "========================================="
echo "✅ 部署完成！"
echo "========================================="
echo ""
echo "📊 下一步："
echo "1. 访问 https://vercel.com/dashboard 查看部署状态"
echo "2. 访问 https://getcareby.ca 验证网站"
echo "3. 使用 Google Search Console 提交 sitemap"
echo ""
echo "📄 详细指南请参考: DEPLOYMENT_GUIDE.md"
echo ""
