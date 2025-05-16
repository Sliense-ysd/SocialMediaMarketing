# Supabase 配置指南

## 环境变量设置

在 `apps/frontend` 目录下创建 `.env.local` 文件，并添加以下环境变量：

```
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥

# 前端 URL 配置
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## 获取 Supabase 凭据

1. 登录 [Supabase 控制台](https://app.supabase.com)
2. 选择您的项目
3. 进入项目设置 → API
4. 复制 "项目 URL" 作为 `NEXT_PUBLIC_SUPABASE_URL`
5. 复制 "匿名公钥" 作为 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 配置 Google OAuth

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建一个新项目或选择现有项目
3. 在左侧菜单中，导航到 "API 和服务" → "凭据"
4. 点击 "创建凭据" 按钮，然后选择 "OAuth 客户端 ID"
5. 如果这是您第一次创建 OAuth 客户端 ID，您需要先配置同意屏幕
6. 创建 OAuth 客户端 ID：
   - 应用类型选择 "Web 应用"
   - 添加授权的重定向 URI：`https://[YOUR_SUPABASE_PROJECT].supabase.co/auth/v1/callback`
7. 记下生成的 **客户端 ID** 和 **客户端密钥**
8. 在 Supabase 控制台中，进入身份验证 → 提供商
9. 找到 Google 提供商并点击启用
10. 填入您从 Google Cloud Console 获取的客户端 ID 和客户端密钥
11. 在 Supabase 的 URL 配置中添加您的应用 URL 作为重定向 URL：
    - 本地开发：`http://localhost:3000/auth/callback`
    - 生产环境：`https://your-app-url.com/auth/callback`

## 配置 GitHub OAuth

1. 在 Supabase 控制台中，进入身份验证 → 提供商
2. 启用 GitHub 提供商
3. 从 GitHub 开发者设置获取 OAuth 应用凭据：
   - 访问 https://github.com/settings/developers
   - 创建新的 OAuth 应用
   - 设置回调 URL 为 `https://[YOUR_SUPABASE_PROJECT].supabase.co/auth/v1/callback`
4. 将 Client ID 和 Client Secret 填入 Supabase 的 GitHub 配置中
5. 在 Supabase 的 URL 配置中添加您的应用 URL 作为重定向 URL：
   - 本地开发：`http://localhost:3000/auth/callback`
   - 生产环境：`https://your-app-url.com/auth/callback`

## 数据库迁移

1. 在 Supabase 控制台中，进入 SQL 编辑器
2. 运行 `supabase/schema.sql` 文件中的 SQL 脚本来创建必要的表和权限

```sql
-- 从 supabase/schema.sql 文件复制
-- 启用行级安全性
ALTER DATABASE postgres SET timezone TO 'Asia/Shanghai';

-- 创建profiles表
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 创建posts表 (社交媒体帖子)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  platform TEXT, -- 例如: 'twitter', 'instagram', 'facebook'等
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
  scheduled_for TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 启用行级安全性
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 索引
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles (id);
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON public.posts (user_id);
CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts (status);
CREATE INDEX IF NOT EXISTS posts_scheduled_for_idx ON public.posts (scheduled_for);

-- 行级安全策略
-- Profiles表策略
CREATE POLICY "用户可查看所有配置文件" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "用户只能更新自己的配置文件" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "用户只能插入自己的配置文件" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Posts表策略
CREATE POLICY "用户可查看所有帖子" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "用户只能更新自己的帖子" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "用户只能插入自己的帖子" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能删除自己的帖子" ON public.posts
  FOR DELETE USING (auth.uid() = user_id);

-- 触发器函数: 用户创建后创建配置文件
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 触发器: 用户创建后创建配置文件
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

3. 如果需要从现有数据库迁移数据，可以使用 SQL 导出数据，然后在 Supabase 中导入

## 存储配置

1. 在 Supabase 控制台中，进入存储 → 存储桶
2. 创建一个名为 `media` 的新存储桶
3. 设置适当的访问权限（公共或私有）

## 本地开发

确保在本地开发时设置了正确的环境变量，然后运行：

```bash
cd apps/frontend
npm run dev
```

## 生产部署

在 Vercel 或其他部署平台上，添加以下环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_FRONTEND_URL`

## 验证配置

1. 启动应用后，尝试使用 Google 或 GitHub 登录
2. 登录成功后，应该会自动重定向到 `/auth/callback`，然后再重定向到主页或仪表板
3. 检查 Supabase 控制台中的身份验证 → 用户，确认用户已成功创建 