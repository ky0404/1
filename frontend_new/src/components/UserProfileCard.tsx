import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import type { UserProfile as UserProfileType } from '@/types';

interface UserProfileCardProps {
  profile: UserProfileType;
  isDarkMode: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ profile, isDarkMode }) => {
  if (!profile.enabled) {
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
          <Brain className={`h-6 w-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            心理画像
          </h3>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {profile.msg || '用户画像功能未启用'}
        </p>
      </motion.div>
    );
  }

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
        <Brain className={`h-6 w-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          心理画像
        </h3>
      </div>

      <div className="space-y-4">
        {/* 情绪均值 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              平均情绪强度
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded-full bg-slate-700 dark:bg-slate-600">
              <div
                className={`h-full rounded-full ${
                  profile.avg_score >= 7
                    ? 'bg-red-500'
                    : profile.avg_score >= 5
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${profile.avg_score * 10}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {profile.avg_score.toFixed(1)}/10
            </span>
          </div>
        </div>

        {/* 近期危机次数 */}
        {profile.recent_crisis_count > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-500">
              近期有 {profile.recent_crisis_count} 次高风险情绪记录，建议关注心理健康
            </span>
          </div>
        )}

        {/* 主要压力源 */}
        {profile.stressors && profile.stressors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className={`h-4 w-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                主要压力源
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.stressors.map((stressor, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}
                >
                  {stressor}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 兴趣爱好 */}
        {profile.interests && profile.interests.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className={`h-4 w-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                兴趣标签
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : 'bg-pink-100 text-pink-700 border border-pink-200'
                  }`}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI 回复提示 */}
        {profile.response_hints && (
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="font-medium">AI 回复偏好：</span>
              {profile.response_hints}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfileCard;