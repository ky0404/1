import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';

const STORAGE_KEY = 'yuanxin_settings';

interface UserSettings {
  ai_name: string;
  response_style: string;
  notifications_enabled: boolean;
}

const defaultSettings: UserSettings = {
  ai_name: '小语',
  response_style: 'gentle',
  notifications_enabled: true,
};

const PersonalizationRoomPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiName, setAiName] = useState('小语');
  const [responseStyle, setResponseStyle] = useState('gentle');
  const [notifications, setNotifications] = useState(true);

  const styles = [
    { id: 'gentle', label: '温柔鼓励', desc: '轻声细语，给你力量' },
    { id: 'direct', label: '直接建议', desc: '高效直接，给出方案' },
    { id: 'humor', label: '幽默风趣', desc: '轻松有趣，缓解压力' },
  ];

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const s = JSON.parse(stored);
        setAiName(s.ai_name || '小语');
        setResponseStyle(s.response_style || 'gentle');
        setNotifications(s.notifications_enabled !== false);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    try {
      const settings: UserSettings = {
        ai_name: aiName,
        response_style: responseStyle,
        notifications_enabled: notifications,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      toast.success('设置已保存');
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error('保存失败');
    } finally {
      setSaving(false);
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
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">🎹 灵魂调音台</h1>
          <p className="text-sm text-[#F5F0EB]/80">打造专属你的AI陪伴风格</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        {/* AI 名字 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">AI 昵称</h3>
          <input
            type="text"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            placeholder="给你的AI起个名字"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-[#F5F0EB] placeholder-[#F5F0EB]/50 focus:outline-none focus:border-pink-500/50"
          />
        </div>

        {/* 回复风格 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">回复风格</h3>
          <div className="space-y-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setResponseStyle(style.id)}
                className={`w-full p-4 rounded-2xl transition-all text-left ${
                  responseStyle === style.id
                    ? 'bg-pink-500/30 border-2 border-pink-500/50'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <p className="font-medium text-[#F5F0EB]">{style.label}</p>
                <p className="text-sm text-[#F5F0EB]/60">{style.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 通知设置 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">通知设置</h3>
          <div className="flex items-center justify-between">
            <span className="text-[#F5F0EB]/90">接收推送通知</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-pink-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 保存按钮 */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-2xl text-white font-medium disabled:opacity-50"
        >
          {saving ? '保存中...' : '保存设置'}
        </button>

        {/* 预览 */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium text-[#F5F0EB] mb-4">预览</h3>
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-sm text-[#F5F0EB]/60 mb-2">AI 名字：{aiName}</p>
            <p className="text-sm text-[#F5F0EB]/60 mb-2">回复风格：{styles.find(s => s.id === responseStyle)?.label}</p>
            <p className="text-sm text-[#F5F0EB]/60">通知：{notifications ? '已开启' : '已关闭'}</p>
          </div>
        </div>
      </div>

      <Navigation currentPath="/personalization" />
    </div>
  );
};

export default PersonalizationRoomPage;