import React, { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';
import { emotionApi } from '@/lib/api';

interface Milestone {
  id: number;
  title: string;
  achieved: boolean;
  date?: string;
  achieved_at?: string;
}

interface GrowthMilestonesProps {
  milestones?: Milestone[];
}

const GrowthMilestones: React.FC<GrowthMilestonesProps> = ({ milestones }) => {
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState<Milestone[]>(milestones || []);

  useEffect(() => {
    if (milestones) {
      setAchievements(milestones);
      return;
    }

    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const res = await emotionApi.getTrends(30);
        if (res.data?.code === 200 && res.data?.data) {
          const { records, stats } = res.data.data;
          
          const sortedRecords = [...records].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          
          let streak3Days = false;
          let streak7Days = false;
          let currentStreak = 0;
          let lastDate = '';
          
          for (const record of sortedRecords) {
            const recordDate = new Date(record.created_at).toDateString();
            if (recordDate !== lastDate) {
              if (lastDate && new Date(lastDate).getTime() - new Date(recordDate).getTime() === 86400000) {
                currentStreak++;
              } else {
                currentStreak = 1;
              }
              lastDate = recordDate;
              
              if (currentStreak >= 3) streak3Days = true;
              if (currentStreak >= 7) streak7Days = true;
            }
          }

          const newMilestones: Milestone[] = [
            { 
              id: 1, 
              title: '初次对话', 
              achieved: records.length > 0, 
              date: records.length > 0 ? records[0].created_at.split('T')[0] : undefined 
            },
            { 
              id: 2, 
              title: '连续3天打卡', 
              achieved: streak3Days 
            },
            { 
              id: 3, 
              title: '情绪记录突破10次', 
              achieved: records.length >= 10,
              date: records.length >= 10 ? records[records.length - 10]?.created_at?.split('T')[0] : undefined
            },
            { 
              id: 4, 
              title: '连续7天打卡', 
              achieved: streak7Days 
            },
            { 
              id: 5, 
              title: '正面情绪占比超50%', 
              achieved: stats && stats.positive_rate > 50 
            },
            { 
              id: 6, 
              title: '记录突破30次', 
              achieved: records.length >= 30 
            },
          ];

          setAchievements(newMilestones);
        }
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [milestones]);

  const defaultMilestones: Milestone[] = [
    { id: 1, title: '初次对话', achieved: false, achieved_at: undefined },
    { id: 2, title: '连续3天打卡', achieved: false, achieved_at: undefined },
    { id: 3, title: '情绪记录突破10次', achieved: false, achieved_at: undefined },
    { id: 4, title: '连续7天打卡', achieved: false, achieved_at: undefined },
    { id: 5, title: '正面情绪占比超50%', achieved: false, achieved_at: undefined },
    { id: 6, title: '记录突破30次', achieved: false, achieved_at: undefined },
  ];

  const displayMilestones = achievements.length > 0 ? achievements : defaultMilestones;
  const achieved = displayMilestones.filter(m => m.achieved).length;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        成长里程碑
        {loading && <span className="text-xs text-gray-400 ml-2">加载中...</span>}
      </h3>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle 
              cx="48" cy="48" r="40" 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="8"
              strokeDasharray={`${(achieved / displayMilestones.length) * 251} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold text-yellow-400">{achieved}</span>
            <span className="text-xs text-[#F5F0EB]/60">/ {displayMilestones.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {displayMilestones.slice(0, 4).map((m) => (
          <div key={m.id} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              m.achieved ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-[#F5F0EB]/40'
            }`}>
              {m.achieved ? <Star className="w-4 h-4" /> : <span className="text-xs">{m.id}</span>}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${m.achieved ? 'text-[#F5F0EB]' : 'text-[#F5F0EB]/40'}`}>
                {m.title}
              </p>
              {m.achieved && m.achieved_at && (
                <p className="text-xs text-[#F5F0EB]/40">{m.achieved_at}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl">
        <p className="text-sm text-yellow-200 text-center">
          {displayMilestones.length - achieved === 0 
            ? '太棒了！你已完成所有里程碑！' 
            : `再完成 ${displayMilestones.length - achieved} 个里程碑，就能解锁更多成就！`}
        </p>
      </div>
    </div>
  );
};

export default GrowthMilestones;