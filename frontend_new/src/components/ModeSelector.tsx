import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Shield } from 'lucide-react';
import type { ReplyMode } from '@/types';

interface ModeSelectorProps {
  currentMode: ReplyMode;
  onModeChange: (mode: ReplyMode) => void;
  isDarkMode: boolean;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange, isDarkMode }) => {
  const modes: Array<{
    id: ReplyMode;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
  }> = [
    {
      id: 'smart',
      name: '智能',
      icon: Brain,
      color: 'from-cyan-500 to-blue-500',
      description: '理性分析',
    },
    {
      id: 'praise',
      name: '夸夸',
      icon: Heart,
      color: 'from-orange-500 to-yellow-500',
      description: '积极鼓励',
    },
    {
      id: 'comfort',
      name: '安慰',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      description: '温暖陪伴',
    },
  ];

  return (
    <div className="flex justify-center mb-6">
      <div
        className={`flex p-1 rounded-2xl shadow-lg backdrop-blur-sm ${
          isDarkMode
            ? 'bg-slate-800/80 border border-slate-700'
            : 'bg-white/80 border border-gray-200'
        }`}
      >
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;

          return (
            <motion.button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                isActive
                  ? 'text-white'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeModeBackground"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${mode.color} shadow-lg`}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              <div className="relative flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span>{mode.name}</span>
              </div>

              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;