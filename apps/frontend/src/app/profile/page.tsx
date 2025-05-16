'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useSupabase';
import { supabase, auth } from '../../utils/supabase';

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  useEffect(() => {
    // 如果用户未登录且加载完成，重定向到登录页面
    if (!userLoading && !user) {
      router.push('/login');
    } else if (user) {
      // 获取用户个人资料
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setName(data.name || '');
        }
      };

      fetchProfile();
    }
  }, [user, userLoading, router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setMessage({ text: '', type: '' });

      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          name,
          updated_at: new Date().toISOString() 
        });

      if (error) throw error;
      
      setMessage({ text: '配置文件已更新', type: 'success' });
    } catch (err) {
      console.error('更新配置文件出错:', err);
      setMessage({ text: '更新配置文件失败', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // 重定向处理
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">我的账户</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">个人资料</h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">电子邮件</label>
          <input 
            type="text"
            value={user.email || ''}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">电子邮件地址无法更改</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">用户名</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入您的用户名"
          />
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {saving ? '保存中...' : '保存更改'}
          </button>
          
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
} 