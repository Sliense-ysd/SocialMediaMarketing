'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '../../utils/supabase';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user } = await auth.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Postiz
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/launches" className="text-gray-700 hover:text-blue-600">
                发布日历
              </Link>
              {user && (
                <>
                  <Link href="/analytics" className="text-gray-700 hover:text-blue-600">
                    数据分析
                  </Link>
                  <Link href="/settings" className="text-gray-700 hover:text-blue-600">
                    设置
                  </Link>
                </>
              )}
            </nav>
            
            <div>
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm hidden md:inline">{user.email}</span>
                  <button
                    onClick={() => auth.signOut().then(() => window.location.reload())}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    退出
                  </button>
                </div>
              ) : (
                <Link 
                  href="/auth/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  登录
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* 主要内容 */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-50 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Postiz. 保留所有权利。
        </div>
      </footer>
    </div>
  );
}
