import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EmotionEnergyBallProps {
  emotion: string;
  score: number;
  keywords: string[];
  isDarkMode: boolean;
}

const EmotionEnergyBall: React.FC<EmotionEnergyBallProps> = ({
  emotion,
  score,
  keywords,
  isDarkMode,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const getEmotionColor = (emotion: string): string => {
    switch (emotion) {
      case '开心':
        return 'from-orange-400 to-orange-600';
      case '焦虑':
        return 'from-blue-400 to-purple-500';
      case '低落':
        return 'from-purple-300 to-gray-400';
      case '愤怒':
        return 'from-red-400 to-orange-500';
      case '平静':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-cyan-400 to-blue-500';
    }
  };

  const getIntensityScale = (score: number): number => {
    return 0.8 + (score / 100) * 0.4;
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div className="relative">
      {/* Main Energy Ball */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        animate={{
          scale: getIntensityScale(score),
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Outer Glow */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${getEmotionColor(emotion)} opacity-30 blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main Sphere */}
        <motion.div
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${getEmotionColor(emotion)} shadow-2xl relative overflow-hidden`}
          animate={{
            scale: isClicked ? 0.95 : 1,
          }}
          transition={{
            duration: 0.15,
          }}
        >
          {/* Inner Highlight */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-sm" />
          <div className="absolute top-4 left-4 w-4 h-4 bg-white/20 rounded-full blur-xs" />

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-2xl font-bold text-white drop-shadow-lg">{Math.round(score)}</div>
              <div className="text-xs text-white/80 drop-shadow">{emotion}</div>
            </motion.div>
          </div>

          {/* Liquid Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Keyword Bubbles */}
      {keywords.slice(0, 6).map((keyword, index) => (
        <motion.div
          key={keyword}
          className={`absolute px-3 py-1 rounded-full text-xs font-medium ${
            isDarkMode ? 'bg-slate-700/80 text-gray-200' : 'bg-white/80 text-gray-700'
          } shadow-lg backdrop-blur-sm`}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.cos((index * 60 * Math.PI) / 180) * 80,
            y: Math.sin((index * 60 * Math.PI) / 180) * 80,
            opacity: [0, 1, 0.7],
          }}
          transition={{
            duration: 2,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {keyword}
        </motion.div>
      ))}

      {/* Detail Popup */}
      <motion.div
        className={`absolute top-40 left-1/2 transform -translate-x-1/2 p-4 rounded-xl shadow-xl backdrop-blur-sm ${
          isDarkMode ? 'bg-slate-800/90 text-white' : 'bg-white/90 text-gray-900'
        } ${isClicked ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>情绪强度:</span>
            <span className="font-medium">{Math.round(score)}/100</span>
          </div>
          <div className="flex justify-between">
            <span>关键词:</span>
            <span className="font-medium">{keywords.join(', ')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${getEmotionColor(emotion)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmotionEnergyBall;