import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import { capsuleApi, type MemoryCapsule } from '../lib/api';

const CAPSULE_STORAGE_KEY = 'yuanxin_capsules';

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

const defaultCapsules: MemoryCapsule[] = [
  { id: 1, title: '第一次被理解', content: '今天终于有人认真听我说话了，感觉很温暖...', mood: 'grateful', tags: '被理解', is_public: false, created_at: '2024-04-20', updated_at: '2024-04-20' },
  { id: 2, title: '突破自我的时刻', content: '鼓起勇气做了之前不敢做的事，为自己骄傲！', mood: 'proud', tags: '成长', is_public: false, created_at: '2024-04-18', updated_at: '2024-04-18' },
];

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
        return;
      }
    } catch (error) {
      console.error('Failed to fetch capsules:', error);
    }
    
    // fallback to localStorage
    const stored = localStorage.getItem(CAPSULE_STORAGE_KEY);
    if (stored) {
      try {
        setCapsules(JSON.parse(stored));
      } catch {
        setCapsules(defaultCapsules);
      }
    } else {
      setCapsules(defaultCapsules);
    }
    setLoading(false);
  };

  const saveToLocalStorage = (newCapsules: MemoryCapsule[]) => {
    localStorage.setItem(CAPSULE_STORAGE_KEY, JSON.stringify(newCapsules));
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
        fetchCapsules();
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      // fallback: save to localStorage
      const newCapsule: MemoryCapsule = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        mood: newMood,
        tags: '',
        is_public: false,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
      };
      const updated = [newCapsule, ...capsules];
      setCapsules(updated);
      saveToLocalStorage(updated);
      toast.success('胶囊已创建（本地存储）');
    } finally {
      setSaving(false);
      setShowForm(false);
      setNewTitle('');
      setNewContent('');
      setNewMood('happy');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个记忆胶囊吗？')) return;

    try {
      const res = await capsuleApi.delete(id);
      if (res.data?.code === 200) {
        toast.success('已删除');
        fetchCapsules();
        return;
      }
    } catch {
      // fallback: delete from localStorage
    }
    
    const updated = capsules.filter(c => c.id !== id);
    setCapsules(updated);
    saveToLocalStorage(updated);
    toast.success('已删除（本地存储）');
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
              placeholder="给胶囊起个标题"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-[#F5F0EB] placeholder-[#F5F0EB]/50 focus:outline-none focus:border-pink-500/50"
            />
            
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="记录此刻的感受..."
              rows={4}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-[#F5F0EB] placeholder-[#F5F0EB]/50 focus:outline-none focus:border-pink-500/50 resize-none"
            />
            
            <div className="flex gap-2 flex-wrap">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setNewMood(mood.id)}
                  className={`px-3 py-1 rounded-2xl text-sm ${
                    newMood === mood.id
                      ? 'bg-pink-500/50 text-white'
                      : 'bg-white/10 text-[#F5F0EB]/70'
                  }`}
                >
                  {moodEmojis[mood.id]} {mood.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 bg-white/10 rounded-2xl text-[#F5F0EB]"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl text-white disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-[#F5F0EB]/60">加载中...</div>
        ) : capsules.length === 0 ? (
          <div className="text-center py-8 text-[#F5F0EB]/60">还没有记忆胶囊，点击上方创建第一个吧</div>
        ) : (
          capsules.map((capsule) => (
            <div key={capsule.id} className="glass-card p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{moodEmojis[capsule.mood] || '💭'}</span>
                  <h3 className="font-medium text-[#F5F0EB]">{capsule.title}</h3>
                </div>
                <button
                  onClick={() => handleDelete(capsule.id)}
                  className="text-red-400/70 hover:text-red-400 text-sm"
                >
                  删除
                </button>
              </div>
              <p className="text-sm text-[#F5F0EB]/70 mb-2 line-clamp-3">{capsule.content}</p>
              <p className="text-xs text-[#F5F0EB]/50">{capsule.created_at}</p>
            </div>
          ))
        )}
      </div>

      <Navigation currentPath="/memory-capsules" />
    </div>
  );
};

export default MemoryCapsuleWallPage;