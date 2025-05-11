# Supabase + Vercel 部署指南

本指南将帮助您使用Supabase和Vercel部署社交媒体营销应用。

## 第一步：创建Supabase项目

1. 访问 [Supabase官网](https://supabase.com) 并注册或登录
2. 创建新项目，设置一个项目名称（例如：social-media-marketing）
3. 选择免费计划和最接近您的区域
4. 设置一个安全的数据库密码，并记下来
5. 点击"创建新项目"

## 第二步：设置数据库

1. 项目创建完成后，前往 SQL编辑器
2. 复制并粘贴 `supabase/schema.sql` 文件中的内容
3. 点击"运行"以创建必要的表和权限

## 第三步：配置身份验证

1. 在Supabase仪表板，前往"身份验证"→"提供商"
2. 启用"谷歌"提供商
3. 从Google Cloud Console获取OAuth凭据：
   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 创建项目或使用现有项目
   - 前往"API和服务"→"凭据"
   - 创建OAuth客户端ID
   - 添加重定向URI: `https://你的项目ID.supabase.co/auth/v1/callback`
   - 复制客户端ID和客户端密钥

4. 在Supabase中填入谷歌OAuth凭据
5. 在"URL配置"中，添加您的域名作为重定向URL，例如：
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:4200/auth/callback`（用于本地开发）

## 第四步：获取API凭据

1. 在Supabase仪表板，前往"项目设置"→"API"
2. 复制"项目URL"和"匿名密钥"（anon key），稍后将用于Vercel部署

## 第五步：部署前端到Vercel

1. 将项目推送到GitHub仓库（如果尚未推送）：
   ```bash
   git add .
   git commit -m "准备Supabase和Vercel部署"
   git push
   ```

2. 访问 [Vercel](https://vercel.com) 并登录
3. 点击"新建项目"并导入您的GitHub仓库
4. 配置项目：
   - 设置构建命令：`cd ../.. && pnpm install && cd apps/frontend && pnpm build`
   - 设置输出目录：`.next`
   - 设置根目录：`apps/frontend`
Base directory: apps/frontend
Build Command: npm run build
Output Directory: .next
Install Command: cd ../.. && npm install
   - 添加环境变量：
     - `NEXT_PUBLIC_SUPABASE_URL`：您的Supabase项目URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`：您的Supabase匿名密钥

5. 点击"部署"

## 第六步：配置部署后的重定向URL

1. 部署完成后，获取您的Vercel域名（例如：social-media-marketing-xyz123.vercel.app）
2. 返回Supabase仪表板，前往"身份验证"→"URL配置"
3. 添加新的重定向URL：`https://your-vercel-domain.vercel.app/auth/callback`
4. 保存更改

## 第七步：测试部署

1. 访问您的Vercel域名
2. 尝试使用Google登录
3. 创建帖子并测试功能

## 本地开发设置

1. 创建`.env.local`文件在`apps/frontend`目录下：
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. 启动本地开发服务器：
   ```bash
   cd apps/frontend
   pnpm dev
   ```

## 故障排除

- **身份验证错误**：确保重定向URL正确配置，包括正确的协议（http/https）和路径（/auth/callback）
- **数据库权限问题**：检查RLS策略是否正确设置
- **Supabase连接问题**：确保环境变量正确设置在Vercel中

## 下一步

- 添加社交媒体API集成
- 实现高级分析功能
- 添加AI内容生成功能 