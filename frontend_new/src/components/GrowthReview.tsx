import React from 'react';
import { Calendar, TrendingUp, Award } from 'lucide-react';

interface GrowthReviewProps {
  weeklyData?: {
    conversations: number;
    moodTrend: string;
    achievement: string;
  };
}

const GrowthReview: React.FC<GrowthReviewProps> = ({ 
  weeklyData = { conversations: 0, moodTrend: 'stable', achievement: '暂无记录' }
}) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        本周成长回顾
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-2xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#F5F0EB]">对话次数</p>
            <p className="text-lg font-bold text-purple-300">{weeklyData.conversations} 次</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#F5F0EB]">情绪趋势</p>
            <p className="text-lg font-bold text-green-300">
              {weeklyData.moodTrend === 'improving' ? '持续改善' : '保持稳定'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#F5F0EB]">本周成就</p>
            <p className="text-lg font-bold text-yellow-300">{weeklyData.achievement}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl">
        <p className="text-sm text-pink-200 text-center">
          记录你的情绪成长，每一步都值得被看见。
        </p>
      </div>
    </div>
  );
};

export default GrowthReview;