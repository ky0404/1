import React from 'react';
import { motion } from 'framer-motion';

interface AIStatusProps {
  status: 'online' | 'thinking' | 'listening';
  isDarkMode: boolean;
}

const AIStatus: React.FC<AIStatusProps> = ({ status, isDarkMode }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return {
          text: '● Mo在线',
          color: 'text-green-500',
          bgColor: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
        };
      case 'thinking':
        return {
          text: '● 正在思考...',
          color: 'text-yellow-500',
          bgColor: isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100',
        };
      case 'listening':
        return {
          text: '● Mo正在倾听',
          color: 'text-blue-500',
          bgColor: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
        };
      default:
        return {
          text: '● Mo在线',
          color: 'text-green-500',
          bgColor: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${
        config.bgColor
      } ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
    >
      <motion.span
        className={`mr-1 ${config.color}`}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ●
      </motion.span>
      {config.text}
    </motion.div>
  );
};

export default AIStatus;