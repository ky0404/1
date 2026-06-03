import { motion } from 'framer-motion';
import AIStatus from '@/components/AIStatus';

interface WelcomeSectionProps {
  aiStatus: 'online' | 'thinking' | 'listening';
  isDarkMode: boolean;
}

export function WelcomeSection({ aiStatus, isDarkMode }: WelcomeSectionProps) {
  return (
    <div className="text-center py-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 mb-4"
      >
        <span className="text-4xl">💗</span>
      </motion.div>
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
        欢迎来到媛心烨语
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-4">
        你的 AI 情绪陪伴站，随时倾听你的心声
      </p>
      <AIStatus status={aiStatus} isDarkMode={isDarkMode} />
    </div>
  );
}