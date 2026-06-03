import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Archive, FileText, Settings, Shield, Bell, HelpCircle, LogOut, Trash2, Palette } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import { authApi, historyApi } from '../lib/api';
import type { AuthUser } from '@/types';

const SettingsRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.me()
      .then(res => {
        if (res.data?.code === 200) setUser(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayName = user?.username || user?.email?.split('@')[0] || '未登录';
  const displayAvatar = user?.avatar || 'https://photo.bj.ide.test.sankuai.com/?keyword=girl,avatar,cute&width=80&height=80';

  const stats = [
    { label: '对话次数', value: '128', icon: MessageCircle, color: 'purple' },
    { label: '记忆胶囊', value: '23', icon: Archive, color: 'orange' },
    { label: '测评报告', value: '8', icon: FileText, color: 'green' }
  ];

  const menuItems = [
    {
      category: '个性化设置',
      items: [
        { label: '灵魂调音台', icon: Palette, action: () => navigate('/personalization') },
        { label: '主题设置', icon: Settings, action: () => toast.info('功能开发中') },
        { label: '字体大小', icon: Settings, action: () => toast.info('功能开发中') },
        { label: '语言设置', icon: Settings, action: () => toast.info('功能开发中') }
      ]
    },
    {
      category: '隐私与安全',
      items: [
        { label: '隐私设置', icon: Shield, action: () => navigate('/privacy') },
        { label: '数据导出', icon: Shield, action: () => toast.info('功能开发中') },
        { label: '账号安全', icon: Shield, action: () => toast.info('功能开发中') }
      ]
    },
    {
      category: '通知设置',
      items: [
        { label: '推送通知', icon: Bell, action: () => toast.info('功能开发中') },
        { label: '邮件通知', icon: Bell, action: () => toast.info('功能开发中') },
        { label: '短信通知', icon: Bell, action: () => toast.info('功能开发中') }
      ]
    },
    {
      category: '帮助与反馈',
      items: [
        { label: '使用帮助', icon: HelpCircle, action: () => toast.info('功能开发中') },
        { label: '意见反馈', icon: HelpCircle, action: () => toast.info('功能开发中') },
        { label: '联系客服', icon: HelpCircle, action: () => toast.info('功能开发中') }
      ]
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('确定要退出登录吗？')) {
      try {
        await authApi.logout();
        toast.success('已退出登录');
        window.location.href = '/';
      } catch (error) {
        toast.error('退出失败');
      }
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('确定要注销账号吗？此操作不可恢复！')) {
      toast.info('注销账号功能开发中');
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('确定要清空所有对话历史吗？此操作不可恢复。')) return;
    try {
      await historyApi.delete();
      toast.success('对话历史已清空');
    } catch (error) {
      toast.error('清空失败');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <EmergencyButton />
      
      {/* 用户信息卡片 */}
      <div className="glass-card border-b border-white/20 px-6 py-8 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <img 
            src={displayAvatar} 
            alt="用户头像" 
            className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/20 shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold text-gradient mb-2">{displayName}</h1>
          <p className="text-[#F5F0EB]/90">{user?.email || '点击登录开启专属陪伴'}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        {/* 数据统计 */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-card p-4 text-center">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-2xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-300`} />
                </div>
                <p className="text-2xl font-bold text-[#F5F0EB]">{stat.value}</p>
                <p className="text-sm text-[#F5F0EB]/70">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* 核心入口 */}
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => navigate('/history')}
            className="glass-card p-4 hover:bg-white/10 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium text-[#F5F0EB]">我的对话历史</h3>
                <p className="text-sm text-[#F5F0EB]/70">查看所有对话记录</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/memory-capsules')}
            className="glass-card p-4 hover:bg-white/10 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                <Archive className="w-6 h-6 text-orange-300" />
              </div>
              <div>
                <h3 className="font-medium text-[#F5F0EB]">我的记忆胶囊</h3>
                <p className="text-sm text-[#F5F0EB]/70">珍贵的成长记忆</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className="glass-card p-4 hover:bg-white/10 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="font-medium text-[#F5F0EB]">我的心理画像</h3>
                <p className="text-sm text-[#F5F0EB]/70">AI 生成的性格分析</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/personalization')}
            className="glass-card p-4 hover:bg-white/10 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-pink-300" />
              </div>
              <div>
                <h3 className="font-medium text-[#F5F0EB]">灵魂调音台</h3>
                <p className="text-sm text-[#F5F0EB]/70">个性化设置你的陪伴方式</p>
              </div>
            </div>
          </button>
        </div>

        {/* 设置菜单 */}
        <div className="space-y-4">
          {menuItems.map((category, categoryIndex) => (
            <div key={categoryIndex} className="glass-card p-6">
              <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">{category.category}</h3>
              
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-[#F5F0EB]/70" />
                      <span className="text-[#F5F0EB]/90">{item.label}</span>
                      <div className="ml-auto">
                        <span className="text-[#F5F0EB]/50">›</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 数据管理 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">数据管理</h3>
          
          <div className="space-y-3">
            <button
              onClick={handleClearHistory}
              className="w-full flex items-center gap-3 p-3 text-orange-300 hover:bg-orange-500/10 rounded-2xl transition-colors text-left"
            >
              <Trash2 className="w-5 h-5" />
              <span>清空对话历史</span>
            </button>
          </div>
        </div>

        {/* 危险操作 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">账号管理</h3>
          
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 text-orange-300 hover:bg-orange-500/10 rounded-2xl transition-colors text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>退出登录</span>
            </button>
            
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center gap-3 p-3 text-red-300 hover:bg-red-500/10 rounded-2xl transition-colors text-left"
            >
              <Trash2 className="w-5 h-5" />
              <span>注销账号</span>
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-red-500/10 rounded-2xl">
            <p className="text-sm text-red-300">
              <strong>注意：</strong>注销账号将永久删除所有数据，此操作不可恢复。请谨慎操作。
            </p>
          </div>
        </div>

        {/* 版本信息 */}
        <div className="text-center text-sm text-[#F5F0EB]/60">
          <p>媛心烨语 v1.0.0</p>
          <p className="mt-1">你的情绪，我一直都在 ❤️</p>
        </div>
      </div>

      <Navigation currentPath="/settings" />
    </div>
  );
};

export default SettingsRoomPage;