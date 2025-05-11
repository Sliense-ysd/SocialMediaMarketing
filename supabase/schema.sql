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