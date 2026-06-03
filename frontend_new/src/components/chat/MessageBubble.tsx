import { motion } from 'framer-motion';
import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
  onFeedback?: (messageId: number, rating: 'like' | 'dislike' | 'regenerate') => void;
}

export function MessageBubble({ message, onFeedback }: MessageBubbleProps) {
  const isUser = message.isUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
          isUser
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
        }`}
      >
        {isUser ? '😊' : '💗'}
      </div>

      {/* Content */}
      <div className={`flex-1 max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-tr-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-sm'
          } shadow-sm`}
        >
          {message.text}
          {message.guide && (
            <div className="mt-2 pt-2 border-t border-white/20 text-sm opacity-80">
              💡 {message.guide}
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
          <span>{message.time}</span>
          {message.emotion && <span>{message.emotion}</span>}
        </div>

        {/* Feedback buttons for AI messages */}
        {!isUser && onFeedback && (
          <div className="flex gap-1 mt-1">
            <button
              onClick={() => onFeedback(message.id, 'like')}
              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${
                message.feedback === 'like' ? 'text-green-500' : 'text-slate-400'
              }`}
            >
              👍
            </button>
            <button
              onClick={() => onFeedback(message.id, 'dislike')}
              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${
                message.feedback === 'dislike' ? 'text-red-500' : 'text-slate-400'
              }`}
            >
              👎
            </button>
            <button
              onClick={() => onFeedback(message.id, 'regenerate')}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
            >
              🔄
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}