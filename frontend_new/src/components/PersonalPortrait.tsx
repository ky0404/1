import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import { profileApi, type UserProfile } from '@/lib/api';

interface PersonalPortraitProps {
  userData?: UserProfile;
}

const PersonalPortrait: React.FC<PersonalPortraitProps> = ({ userData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (userData) {
      setProfile(userData);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await profileApi.get();
        if (res.data?.code === 200 && res.data?.data) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userData]);

  const defaultData: UserProfile = {
    enabled: true,
    stressors: ['学业压力', '人际关系', '未来迷茫'],
    recent_state: '需要更多理解和支持',
    interests: ['阅读', '音乐', '运动'],
    response_hints: '喜欢鼓励式的对话',
    avg_score: 6.5,
    recent_crisis_count: 0
  };

  const data = profile || defaultData;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        你的心理画像
        {loading && <span className="text-xs text-gray-400 ml-2">加载中...</span>}
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-[#F5F0EB]/60 mb-2">当前压力源</p>
          <div className="flex flex-wrap gap-2">
            {(data.stressors || []).length > 0 ? (
              data.stressors?.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                  {s}
                </span>
              ))
            ) : (
              <span className="text-[#F5F0EB]/40 text-sm">暂无数据</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-[#F5F0EB]/60 mb-2">近期状态</p>
          <p className="text-[#F5F0EB]">{data.recent_state || '暂无记录'}</p>
        </div>

        <div>
          <p className="text-sm text-[#F5F0EB]/60 mb-2">兴趣爱好</p>
          <div className="flex flex-wrap gap-2">
            {(data.interests || []).length > 0 ? (
              data.interests?.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {s}
                </span>
              ))
            ) : (
              <span className="text-[#F5F0EB]/40 text-sm">暂无数据</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-[#F5F0EB]/60">情绪均分</span>
          </div>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{ width: `${(data.avg_score / 10) * 100}%` }}
            />
          </div>
          <span className="text-pink-300 font-bold">{data.avg_score}</span>
        </div>
      </div>

      <button 
        onClick={() => navigate('/profile')}
        className="mt-4 w-full py-3 bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-amber-300 rounded-2xl hover:from-amber-500/30 hover:to-pink-500/30 transition-all"
      >
        查看完整画像 →
      </button>
    </div>
  );
};

export default PersonalPortrait;