# Hero Video 更新说明

## ✅ 视频已成功更新

### 📹 新视频文件
- **源文件**: `/Users/lin/Careby promot2/Hero video 2.mp4`
- **目标位置**: `public/hero-video.mp4`
- **文件大小**: 4.2 MB
- **更新时间**: 2026-01-12

### 🔄 已更新的位置

1. ✅ **开发环境**: `public/hero-video.mp4`
2. ✅ **生产构建**: `dist/hero-video.mp4`

### 🌐 如何查看新视频

#### 方法 1：开发服务器（推荐）
开发服务器正在运行：**http://localhost:5173/**

步骤：
1. 打开浏览器访问 http://localhost:5173/
2. **刷新页面**（Ctrl+R 或 Cmd+R）
3. 清除缓存刷新（Ctrl+Shift+R 或 Cmd+Shift+R）
4. 新的 Hero 视频应该立即显示

#### 方法 2：重新构建（如需生产环境测试）
```bash
npm run build
npm run preview
```

### 📝 技术细节

#### 视频引用位置
文件：`src/App.tsx` (第 1316 行)
```tsx
<video ...>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

#### 视频配置
当前配置保持不变：
- **自动播放**: 是
- **循环播放**: 是
- **静音**: 是
- **内联播放**: 是（移动端）
- **预加载**: auto（已在 index.html 中配置）

### 🎯 视频优化建议

#### 1. 性能优化
如果视频文件较大，建议：
```bash
# 使用 FFmpeg 压缩（可选）
ffmpeg -i "Hero video 2.mp4" -vcodec h264 -acodec aac -b:v 2M hero-video-compressed.mp4
```

#### 2. 多格式支持
为了更好的兼容性，可以添加 WebM 格式：
```tsx
<video ...>
  <source src="/hero-video.webm" type="video/webm" />
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

#### 3. 海报图片
添加视频封面（在视频加载前显示）：
```tsx
<video poster="/hero-poster.jpg" ...>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>
```

### 📊 文件对比

| 项目 | 旧视频 | 新视频 |
|------|--------|--------|
| 文件名 | hero-video.mp4 | Hero video 2.mp4 |
| 大小 | - | 4.2 MB |
| 位置 | public/ | public/ |
| 格式 | MP4 | MP4 |

### 🔍 验证清单

测试新视频是否正常工作：
- [ ] 视频在桌面端正常播放
- [ ] 视频在移动端正常播放
- [ ] 视频自动循环播放
- [ ] 视频静音（不干扰用户）
- [ ] 视频覆盖整个 Hero 区域
- [ ] 视频加载速度可接受
- [ ] 视频不影响页面性能

### 🚨 常见问题

#### Q: 浏览器还显示旧视频？
**A**: 清除浏览器缓存：
- Chrome: Ctrl+Shift+Delete (或 Cmd+Shift+Delete)
- 或使用无痕模式测试

#### Q: 视频不播放？
**A**: 检查：
1. 浏览器控制台是否有错误
2. 视频文件是否完整
3. 浏览器是否支持 MP4 格式
4. 自动播放策略限制（通常需要静音才能自动播放）

#### Q: 视频太大影响加载速度？
**A**: 考虑：
1. 压缩视频文件
2. 使用 CDN 托管视频
3. 添加 loading="lazy" 属性
4. 使用较低分辨率版本

### 📱 移动端优化

当前配置已优化移动端：
```tsx
playsInline  // iOS 内联播放
muted        // 允许自动播放
autoPlay     // 自动开始
```

### 🎨 视觉效果

视频配置包含：
- 对象适配：`object-cover`（填充整个容器）
- 位置调整：动态计算（响应式）
- 覆盖层：`bg-midnight/30`（30% 深色蒙版）
- 过渡效果：平滑淡入淡出

### 📈 性能监控

建议监控：
1. **LCP (Largest Contentful Paint)**: 应 < 2.5s
2. **视频加载时间**: 应在可接受范围内
3. **带宽使用**: 确保不影响整体页面加载

---

**更新日期**: 2026-01-12  
**状态**: ✅ 视频已成功更新  
**测试状态**: 待用户验证  
**下一步**: 请在浏览器中刷新页面查看新视频
