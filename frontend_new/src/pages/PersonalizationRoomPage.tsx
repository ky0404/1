import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import { settingsApi } from '../lib/api';

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
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await settingsApi.get();
        if (res.data?.code === 200 && res.data?.data) {
          const s = res.data.data;
          setAiName(s.ai_name);
          setResponseStyle(s.response_style);
          setNotifications(s.notifications_enabled);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await settingsApi.update({
        ai_name: aiName,
        response_style: responseStyle,
        notifications_enabled: notifications,
      });
      
      if (res.data?.code === 200) {
        toast.success('设置已保存');
      } else {
        toast.error('保存失败');
      }
    } catch (error) {
      toast.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">🎨 灵魂调音台</h1>
          <p className="text-sm text-[#F5F0EB]/80">个性化你的AI陪伴体验</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        <div className="glass-card p-6">
          <h3 className="font-medium text-[#F5F0EB] mb-4">AI称呼</h3>
          <input
            type="text"
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            className="w-full p-3 bg-white/10 rounded-2xl text-[#F5F0EB] border-none outline-none"
            placeholder="给你的AI起个名字"
            disabled={loading}
          />
        </div>

        <div className="glass-card p-6">
          <h3 className="font-medium text-[#F5F0EB] mb-4">回复风格</h3>
          <div className="space-y-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setResponseStyle(style.id)}
                disabled={loading}
                className={`w-full p-4 rounded-2xl text-left transition-colors ${
                  responseStyle === style.id
                    ? 'bg-pink-500/30 border border-pink-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <p className="font-medium text-[#F5F0EB]">{style.label}</p>
                <p className="text-sm text-[#F5F0EB]/60">{style.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-medium text-[#F5F0EB] mb-4">通知设置</h3>
          <button
            onClick={() => setNotifications(!notifications)}
            disabled={loading}
            className="w-full p-4 rounded-2xl flex items-center justify-between"
          >
            <span className="text-[#F5F0EB]">接收关怀提醒</span>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-green-500' : 'bg-white/20'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : ''}`} />
            </div>
          </button>
        </div>

        <button 
          onClick={handleSave}
          disabled={saving || loading}
          className="w-full py-4 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-2xl text-white font-bold disabled:opacity-50"
        >
          {saving ? '保存中...' : '保存设置'}
        </button>
      </div>

      <Navigation currentPath="/personalization" />
    </div>
  );
};

export default PersonalizationRoomPage;