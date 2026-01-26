# Gmail 阻止 ZIP 文件的解决方案

## 问题说明
Gmail 出于安全考虑，会自动阻止 ZIP 文件附件，显示 "Blocked for security reasons!"。

## 解决方案

### 方案 1: 使用云存储分享链接（推荐）⭐

#### Google Drive
1. 上传 ZIP 文件到 Google Drive
2. 右键文件 → "获取链接" → 设置为"知道链接的任何人"
3. 在邮件中提供下载链接

#### Dropbox
1. 上传 ZIP 文件到 Dropbox
2. 创建分享链接
3. 在邮件中提供下载链接

#### WeTransfer（临时分享）
1. 访问 https://wetransfer.com
2. 上传文件（最大 2GB 免费）
3. 获取分享链接（7天有效）
4. 在邮件中提供下载链接

### 方案 2: 更改文件扩展名（临时方案）

```bash
# 将 .zip 改为 .zipx 或其他扩展名
mv Careby-Website-Project-Client-20260121.zip Careby-Website-Project-Client-20260121.zipx

# 或改为 .dat
mv Careby-Website-Project-Client-20260121.zip Careby-Website-Project-Client-20260121.dat
```

**注意**: 需要告知收件人将文件扩展名改回 .zip 后再解压

### 方案 3: 使用密码保护的 ZIP

```bash
# 创建密码保护的 ZIP（macOS）
zip -e Careby-Website-Project-Client-20260121-protected.zip -r src/ public/ *.json *.ts *.js *.md *.html vercel.json "logo zh.png" README-FOR-CLIENT.md
```

然后在邮件中提供密码。

### 方案 4: 分卷压缩

```bash
# 将大文件分割成多个小文件（每个 5MB）
zip -s 5m Careby-Website-Project-Client-20260121.zip --out Careby-Website-Project-Client-20260121-part.zip
```

### 方案 5: 使用其他压缩格式

```bash
# 使用 tar.gz（Linux/Mac 常用）
tar -czf Careby-Website-Project-Client-20260121.tar.gz src/ public/ *.json *.ts *.js *.md *.html vercel.json "logo zh.png" README-FOR-CLIENT.md

# 或使用 7z（如果安装了）
7z a Careby-Website-Project-Client-20260121.7z src/ public/ *.json *.ts *.js *.md *.html vercel.json "logo zh.png" README-FOR-CLIENT.md
```

## 推荐方案

**最佳方案**: 使用 Google Drive 或 Dropbox 分享链接

**优点**:
- ✅ 不会被邮件系统阻止
- ✅ 文件大小不受限制
- ✅ 可以设置访问权限
- ✅ 可以追踪下载情况
- ✅ 专业且安全

**操作步骤**:
1. 上传 ZIP 文件到云存储
2. 创建分享链接
3. 在邮件中提供链接
4. 可选：设置访问密码或有效期

## 邮件模板更新

我已经更新了 `EMAIL-DELIVERY-SHORT.md`，将附件改为云存储链接的方式。

## 快速操作命令

### 上传到 Google Drive（需要安装 gdrive CLI）
```bash
# 如果已安装 gdrive
gdrive upload Careby-Website-Project-Client-20260121.zip
```

### 或手动操作
1. 访问 https://drive.google.com
2. 点击"新建" → "文件上传"
3. 选择 ZIP 文件
4. 右键文件 → "获取链接"
5. 复制链接到邮件中
