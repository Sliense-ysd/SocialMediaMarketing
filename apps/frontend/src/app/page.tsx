'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 短暂延迟后重定向到launches页面
    const redirectTimer = setTimeout(() => {
      router.push('/launches');
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">欢迎使用Postiz应用</h1>
      <p className="text-xl mb-8">正在跳转到应用主页...</p>
      <Link 
        href="/launches"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        如果没有自动跳转，请点击这里
      </Link>
    </div>
  );
} 