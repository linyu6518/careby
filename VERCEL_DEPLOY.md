# Vercel 部署说明

本仓库根目录和 `careby/` 下各有一套前端，**线上站点的代码在 `careby/` 里**。

请在 Vercel 项目里把 **Root Directory** 设为 **`careby`**，否则会构建到旧版本。

1. 打开 [Vercel Dashboard](https://vercel.com) → 进入项目 **careby-platform**
2. 顶部 **Settings** → 左侧 **General**
3. 找到 **Root Directory**，点击 **Edit**
4. 填写 **`careby`**，保存
5. 到 **Deployments** 里点最新一次部署的 **Redeploy**，或推一次空 commit 触发重新部署

保存后新部署会使用 `careby/` 下的最新代码（纯色 CTA 按钮、压缩视频等）。
