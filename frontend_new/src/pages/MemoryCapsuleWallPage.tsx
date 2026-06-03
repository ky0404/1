import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import { capsuleApi, type MemoryCapsule } from '../lib/api';

const moodEmojis: Record<string, string> = {
  happy: '😊',
  calm: '😌',
  grateful: '🙏',
  hopeful: '🌟',
  loved: '💕',
  proud: '💪',
  excited: '🎉',
  peaceful: '🕊️',
};

const MemoryCapsuleWallPage: React.FC = () => {
  const [capsules, setCapsules] = useState<MemoryCapsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState('happy');
  const [saving, setSaving] = useState(false);

  const moods = [
    { id: 'happy', label: '快乐' },
    { id: 'calm', label: '平静' },
    { id: 'grateful', label: '感恩' },
    { id: 'hopeful', label: '希望' },
    { id: 'loved', label: '被爱' },
    { id: 'proud', label: '自豪' },
    { id: 'excited', label: '兴奋' },
    { id: 'peaceful', label: '安宁' },
  ];

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    setLoading(true);
    try {
      const res = await capsuleApi.getAll();
      if (res.data?.code === 200 && res.data?.data) {
        setCapsules(res.data.data.capsules || []);
      }
    } catch (error) {
      console.error('Failed to fetch capsules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error('请填写标题和内容');
      return;
    }

    setSaving(true);
    try {
      const res = await capsuleApi.create({
        title: newTitle,
        content: newContent,
        mood: newMood,
      });

      if (res.data?.code === 200) {
        toast.success('胶囊已创建');
        setShowForm(false);
        setNewTitle('');
        setNewContent('');
        setNewMood('happy');
        fetchCapsules();
      } else {
        toast.error('创建失败');
      }
    } catch (error) {
      toast.error('创建失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个记忆胶囊吗？')) return;

    try {
      const res = await capsuleApi.delete(id);
      if (res.data?.code === 200) {
        toast.success('已删除');
        fetchCapsules();
      }
    } catch (error) {
      toast.error('删除失败');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">💊 治愈胶囊墙</h1>
          <p className="text-sm text-[#F5F0EB]/80">收藏每一次治愈的时刻</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 pb-24 relative z-10">
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl text-pink-300 font-medium"
          >
            + 创建新的记忆胶囊
          </button>
        ) : (
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-medium text-[#F5F0EB]">创建新胶囊</h3>
            
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 bg-white/10 rounded-2xl text-[#F5F0EB] border-none outline-none"
              placeholder="给这个时刻起个标题"
            />
            
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-3 bg-white/10 rounded-2xl text-[#F5F0EB] border-none outline-none resize-none"
              placeholder="记录这个让你感到治愈的时刻..."
              rows={4}
            />
            
            <div>
              <p className="text-sm text-[#F5F0EB]/60 mb-2">选择心情</p>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setNewMood(m.id)}
                    className={`px-3 py-2 rounded-full text-sm ${
                      newMood === m.id 
                        ? 'bg-pink-500/50 text-white' 
                        : 'bg-white/10 text-[#F5F0EB]/60'
                    }`}
                  >
                    {moodEmojis[m.id]} {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 bg-white/10 rounded-2xl text-[#F5F0EB]"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl text-white font-medium disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-2 text-center py-8 text-[#F5F0EB]/60">
              加载中...
            </div>
          ) : capsules.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-[#F5F0EB]/60">
              还没有记忆胶囊，快创建一个吧！
            </div>
          ) : (
            capsules.map((capsule) => (
              <div 
                key={capsule.id} 
                className="glass-card p-4 text-center hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => handleDelete(capsule.id)}
              >
                <div className="text-4xl mb-2">{moodEmojis[capsule.mood] || '💝'}</div>
                <h3 className="font-medium text-[#F5F0EB] text-sm">{capsule.title}</h3>
                <p className="text-xs text-[#F5F0EB]/50 mt-1">
                  {capsule.created_at?.split('T')[0]}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-sm text-[#F5F0EB]/60">
            记忆胶囊可以保存那些让你感到被治愈的时刻，
            在需要的时候打开，重温那份温暖。
          </p>
        </div>
      </div>

      <Navigation currentPath="/memory-capsules" />
    </div>
  );
};

export default MemoryCapsuleWallPage;