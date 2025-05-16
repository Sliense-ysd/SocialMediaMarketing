'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // 处理认证回调
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('认证错误:', error.message);
        router.push('/auth/login?error=认证失败');
        return;
      }

      if (session) {
        // 认证成功，重定向到主页或仪表板
        router.push('/launches');
      } else {
        // 没有会话，重定向到登录页
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">认证中...</h2>
        <p>请稍候，正在处理您的登录...</p>
      </div>
    </div>
  );
} 