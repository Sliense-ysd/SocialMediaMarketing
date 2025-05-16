# Google 登录配置指南

## 在 Google Cloud Platform 创建 OAuth 凭据

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建一个新项目或选择现有项目
3. 在左侧菜单中，导航到 "API 和服务" → "凭据"
4. 点击 "创建凭据" 按钮，然后选择 "OAuth 客户端 ID"
5. 如果这是您第一次创建 OAuth 客户端 ID，您需要先配置同意屏幕：
   - 点击 "配置同意屏幕"
   - 选择适当的用户类型（外部或内部）
   - 填写应用名称、用户支持电子邮件和开发者联系信息
   - 点击 "保存并继续"
   - 在 "范围" 页面上，添加必要的范围（通常只需 email 和 profile）
   - 完成其余步骤并返回到凭据页面

6. 创建 OAuth 客户端 ID：
   - 应用类型选择 "Web 应用"
   - 命名您的客户端（例如：Postiz App）
   - 添加授权的 JavaScript 来源：
     - 本地开发：`http://localhost:3000`
     - 生产环境：`https://your-app-url.com`
   - 添加授权的重定向 URI：
     - `https://[YOUR_SUPABASE_PROJECT].supabase.co/auth/v1/callback`
   - 点击 "创建" 按钮

7. 记下生成的 **客户端 ID** 和 **客户端密钥**

## 在 Supabase 中配置 Google 提供商

1. 登录 [Supabase 控制台](https://app.supabase.com/)
2. 选择您的项目
3. 在左侧菜单中，导航到 "身份验证" → "提供商"
4. 找到 Google 提供商并点击启用
5. 填入您从 Google Cloud Console 获取的客户端 ID 和客户端密钥
6. 确保 "重定向 URL" 与您在 Google Cloud Console 中设置的相匹配
7. 点击 "保存" 按钮

## 配置应用重定向 URL

在 Supabase 控制台中：

1. 导航到 "身份验证" → "URL 配置"
2. 在 "网站 URL" 字段中，确保您的应用 URL 已添加：
   - 本地开发：`http://localhost:3000`
   - 生产环境：`https://your-app-url.com`
3. 在 "重定向 URL" 部分，添加：
   - 本地开发：`http://localhost:3000/auth/callback`
   - 生产环境：`https://your-app-url.com/auth/callback`
4. 点击 "保存" 按钮

## 测试 Google 登录

1. 确保您的应用正在运行
2. 点击 "Continue with Google" 按钮
3. 您应该被重定向到 Google 登录页面
4. 登录后，您应该被重定向回您的应用

## 常见问题排查

如果遇到登录问题，请检查：

1. Google Cloud Console 中的凭据配置是否正确
2. Supabase 中的 Google 提供商配置是否正确
3. 重定向 URL 是否正确设置
4. 环境变量是否正确设置：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. 浏览器控制台中是否有任何错误消息 