'use client';

import { useEffect, useState } from 'react';
import { dataService, auth } from '../../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function LaunchesPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 检查用户登录状态
    const checkAuth = async () => {
      const { user, error } = await auth.getCurrentUser();
      if (user) {
        setUser(user);
      }
    };

    // 获取帖子列表
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await dataService.getPosts();
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('获取帖子失败:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">社交媒体发布日历</h1>
        {!user ? (
          <button 
            onClick={() => router.push('/auth/login')} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            登录
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <span>欢迎, {user.email}</span>
            <button 
              onClick={async () => {
                await auth.signOut();
                window.location.reload();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              退出登录
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{post.title || '无标题'}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content || '无内容'}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>计划发布: {new Date(post.scheduled_at || post.created_at).toLocaleString()}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{post.platform || '未指定平台'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-6">暂无发布计划</p>
          {user && (
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              创建新帖子
            </button>
          )}
        </div>
      )}
    </div>
  );
}
