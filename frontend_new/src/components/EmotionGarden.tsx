import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Leaf, Flame, Droplets } from 'lucide-react';
import { emotionApi } from '@/lib/api';

interface EmotionGardenProps {
  stats?: {
    totalDays: number;
    streakDays: number;
    avgScore: number;
  };
}

interface GardenStats {
  totalDays: number;
  streakDays: number;
  avgScore: number;
}

const EmotionGarden: React.FC<EmotionGardenProps> = ({ stats }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gardenStats, setGardenStats] = useState<GardenStats | null>(null);

  useEffect(() => {
    if (stats) {
      setGardenStats(stats);
      return;
    }

    const fetchTrends = async () => {
      setLoading(true);
      try {
        const res = await emotionApi.getTrends(30);
        if (res.data?.code === 200 && res.data?.data) {
          const { records, stats: emotionStats } = res.data.data;
          const totalDays = records.length;
          const avgScore = emotionStats?.avg_score || 5.0;
          
          let streakDays = 0;
          const today = new Date().toDateString();
          const sortedRecords = [...records].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          
          for (let i = 0; i < sortedRecords.length; i++) {
            const recordDate = new Date(sortedRecords[i].created_at).toDateString();
            const expectedDate = new Date(Date.now() - i * 86400000).toDateString();
            if (recordDate === expectedDate || recordDate === today) {
              streakDays++;
            } else {
              break;
            }
          }

          setGardenStats({ totalDays, streakDays, avgScore });
        }
      } catch (error) {
        console.error('Failed to fetch emotion trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [stats]);

  const data = gardenStats || { totalDays: 0, streakDays: 0, avgScore: 0 };

  const plants = [
    { type: 'happy', label: '快乐种子', count: Math.floor(data.avgScore * 2), icon: Leaf, color: 'text-green-400' },
    { type: 'sad', label: '忧伤水滴', count: Math.floor((10 - data.avgScore)), icon: Droplets, color: 'text-blue-400' },
    { type: 'energy', label: '能量火焰', count: data.streakDays, icon: Flame, color: 'text-orange-400' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-green-400" />
        情绪花园
        {loading && <span className="text-xs text-gray-400 ml-2">加载中...</span>}
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {plants.map((plant, i) => {
          const Icon = plant.icon;
          return (
            <div key={i} className="text-center p-3 bg-white/5 rounded-2xl">
              <Icon className={`w-6 h-6 ${plant.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-[#F5F0EB]">{plant.count}</p>
              <p className="text-xs text-[#F5F0EB]/60">{plant.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-sm text-[#F5F0EB]/60">
        <span>记录 {data.totalDays} 天</span>
        <span>连续 {data.streakDays} 天</span>
      </div>

      <button 
        onClick={() => navigate('/growth')}
        className="mt-4 w-full py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 rounded-2xl hover:from-green-500/30 hover:to-blue-500/30 transition-all"
      >
        查看成长轨迹 →
      </button>
    </div>
  );
};

export default EmotionGarden;