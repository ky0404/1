import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Activity, Target } from 'lucide-react';

interface EmotionAnalysisCardProps {
  keywords: string[];
  tendency: string;
  intensity: number;
  isDarkMode: boolean;
}

const EmotionAnalysisCard: React.FC<EmotionAnalysisCardProps> = ({
  keywords,
  tendency,
  intensity,
  isDarkMode,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: Brain, text: 'AI正在理解你的情绪...', duration: 500 },
    { icon: Target, text: '识别关键词中...', duration: 500 },
    { icon: TrendingUp, text: '分析情绪倾向...', duration: 500 },
    { icon: Activity, text: '计算情绪强度...', duration: 500 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`p-6 rounded-2xl shadow-xl backdrop-blur-sm ${
        isDarkMode
          ? 'bg-slate-800/90 border border-slate-700'
          : 'bg-white/90 border border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mr-3"
        >
          <Brain className={`h-6 w-6 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
        </motion.div>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          AI情绪分析中...
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {progress}%
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-4">
        <div className="flex items-center">
          {React.createElement(steps[currentStep].icon, {
            className: `h-4 w-4 mr-2 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`,
          })}
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {steps[currentStep].text}
          </span>
        </div>
      </div>

      {/* Analysis Results Preview */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: progress > 50 ? 1 : 0, height: progress > 50 ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 overflow-hidden"
      >
        {/* Keywords */}
        <div>
          <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            关键词识别
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'bg-orange-100 text-orange-700 border border-orange-200'
                }`}
              >
                {keyword}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Emotion Tendency */}
        <div>
          <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            情绪倾向
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                tendency === '正向'
                  ? 'bg-green-500'
                  : tendency === '负向'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
            />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {tendency}
            </span>
          </div>
        </div>

        {/* Emotion Intensity */}
        <div>
          <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            情绪强度
          </div>
          <div className="flex items-center">
            <div className={`flex-1 h-2 rounded-full mr-3 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(intensity / 10) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {intensity.toFixed(1)}/10
            </span>
          </div>
        </div>

        {/* Emotion Tag */}
        <div>
          <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            情绪标签
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-purple-100 text-purple-700 border border-purple-200'
              }`}
            >
              {tendency === '正向'
                ? '积极向上'
                : tendency === '负向'
                ? '需要关注'
                : '平稳状态'}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmotionAnalysisCard;