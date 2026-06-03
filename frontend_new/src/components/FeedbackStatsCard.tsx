import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, RefreshCw, TrendingUp, BarChart3 } from 'lucide-react';
import type { FeedbackStats } from '@/types';

interface FeedbackStatsCardProps {
  stats: FeedbackStats;
  isDarkMode: boolean;
}

const FeedbackStatsCard: React.FC<FeedbackStatsCardProps> = ({ stats, isDarkMode }) => {
  const { total, breakdown = {}, quality_rate } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl backdrop-blur-sm ${
        isDarkMode
          ? 'bg-slate-800/90 border border-slate-700'
          : 'bg-white/90 border border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 className={`h-6 w-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          反馈统计
        </h3>
      </div>

      {total === 0 ? (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>暂无反馈数据</p>
          <p className="text-sm mt-1">AI 还在成长中，期待你的反馈</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 总数 */}
          <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {total}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              总反馈数
            </p>
          </div>

          {/* 分类统计 */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-green-500/10' : 'bg-green-50'}`}>
              <ThumbsUp className="h-5 w-5 mx-auto text-green-500 mb-1" />
              <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {breakdown.like || 0}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>点赞</p>
            </div>
            <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
              <ThumbsDown className="h-5 w-5 mx-auto text-red-500 mb-1" />
              <p className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {breakdown.dislike || 0}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>点踩</p>
            </div>
            <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <RefreshCw className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <p className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {breakdown.regenerate || 0}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>重试</p>
            </div>
          </div>

          {/* 质量评分 */}
          <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className={`h-4 w-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  AI 回复质量
                </span>
              </div>
              <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {quality_rate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-600">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${quality_rate}%` }}
              />
            </div>
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              正样本可直接用于 DPO/RLHF 微调数据集
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FeedbackStatsCard;