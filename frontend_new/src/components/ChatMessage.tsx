import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import AIStatus from './AIStatus';

interface ChatMessageProps {
  message: {
    id: number;
    type: 'user' | 'ai';
    content: string;
    emotion?: string;
    timestamp: Date;
  };
  isDarkMode: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDarkMode }) => {
  const isAI = message.type === 'ai';

  const getEmotionColor = (emotion?: string): string => {
    switch (emotion) {
      case 'anxious':
        return 'from-blue-400 to-purple-500';
      case 'happy':
        return 'from-orange-400 to-yellow-500';
      case 'sad':
        return 'from-purple-300 to-gray-400';
      case 'angry':
        return 'from-red-400 to-orange-500';
      case 'calm':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-cyan-400 to-blue-500';
    }
  };

  const getEmotionEmoji = (emotion?: string): string => {
    switch (emotion) {
      case 'anxious':
        return '😰';
      case 'happy':
        return '😊';
      case 'sad':
        return '😔';
      case 'angry':
        return '😠';
      case 'calm':
        return '😌';
      default:
        return '😐';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <motion.div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isAI
              ? `bg-gradient-to-br ${getEmotionColor(message.emotion)}`
              : 'bg-gradient-to-br from-gray-400 to-gray-600'
          } shadow-lg`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {isAI ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bot className="h-5 w-5 text-white" />
            </motion.div>
          ) : (
            <User className="h-5 w-5 text-white" />
          )}
        </motion.div>

        {/* Message Content */}
        <div className={`mx-3 ${isAI ? 'text-left' : 'text-right'}`}>
          {isAI && <AIStatus status="online" isDarkMode={isDarkMode} />}

          {/* Message Bubble */}
          <motion.div
            className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
              isAI
                ? isDarkMode
                  ? 'bg-slate-700/80 text-white border border-slate-600'
                  : 'bg-white/80 text-gray-900 border border-gray-200'
                : isDarkMode
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            }`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>

            {/* Emotion Tag */}
            {message.emotion && message.emotion !== 'neutral' && (
              <div className="flex items-center mt-2">
                <span className="text-xs opacity-75">
                  {getEmotionEmoji(message.emotion)} {message.emotion}
                </span>
              </div>
            )}
          </motion.div>

          {/* Timestamp */}
          <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;