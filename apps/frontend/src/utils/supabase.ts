import { createClient } from '@supabase/supabase-js';

// 从环境变量获取Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 检查是否配置了环境变量
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('缺少Supabase配置。请设置NEXT_PUBLIC_SUPABASE_URL和NEXT_PUBLIC_SUPABASE_ANON_KEY环境变量。');
}

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 用户认证相关函数
export const auth = {
  // 使用Google登录
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },
  
  // 使用GitHub登录
  signInWithGithub: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },
  
  // 获取当前用户
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { 
      user: data?.session?.user || null,
      error 
    };
  },
  
  // 登出
  signOut: async () => {
    return await supabase.auth.signOut();
  }
};

// 数据操作相关函数
export const dataService = {
  // 获取用户信息
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },
  
  // 获取帖子列表
  getPosts: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },
  
  // 创建新帖子
  createPost: async (postData: any) => {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select();
    return { data, error };
  },
  
  // 更新帖子
  updatePost: async (id: string, postData: any) => {
    const { data, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', id)
      .select();
    return { data, error };
  },
  
  // 删除帖子
  deletePost: async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// 媒体文件处理
export const mediaService = {
  // 上传文件
  uploadFile: async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file);
      
    return { 
      data: data ? {
        path: filePath,
        url: data ? `${supabaseUrl}/storage/v1/object/public/media/${filePath}` : null
      } : null, 
      error 
    };
  },
  
  // 获取文件列表
  listFiles: async (path: string) => {
    const { data, error } = await supabase.storage
      .from('media')
      .list(path);
    return { data, error };
  }
};

export default supabase; 