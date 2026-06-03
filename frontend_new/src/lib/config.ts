import type { EmotionConfig } from '@/types';

export const EMOTION_CONFIG: Record<string, EmotionConfig> = {
  happy: {
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    label: '开心',
    glow: 'rgba(251, 191, 36, 0.4)',
    tagColor: '#f59e0b',
  },
  sad: {
    gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    label: '低落',
    glow: 'rgba(96, 165, 250, 0.4)',
    tagColor: '#3b82f6',
  },
  anxious: {
    gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    label: '焦虑',
    glow: 'rgba(167, 139, 250, 0.4)',
    tagColor: '#8b5cf6',
  },
  angry: {
    gradient: 'linear-gradient(135deg, #f87171, #ef4444)',
    label: '愤怒',
    glow: 'rgba(248, 113, 113, 0.4)',
    tagColor: '#ef4444',
  },
  calm: {
    gradient: 'linear-gradient(135deg, #34d399, #10b981)',
    label: '平静',
    glow: 'rgba(52, 211, 153, 0.4)',
    tagColor: '#10b981',
  },
  neutral: {
    gradient: 'linear-gradient(135deg, #9ca3af, #6b7280)',
    label: '中性',
    glow: 'rgba(156, 163, 175, 0.4)',
    tagColor: '#6b7280',
  },
};

export const MODE_CONFIG: Record<string, { label: string; icon: string; prefix: string; desc: string; gradient: string }> = {
  smart: {
    label: '智能分析',
    icon: 'brain',
    prefix: '✨',
    desc: '更懂情绪，也更会接住你',
    gradient: 'from-cyan-500 to-blue-500',
  },
  praise: {
    label: '暖心夸夸',
    icon: 'heart',
    prefix: '🌈',
    desc: '放大你的闪光点和价值感',
    gradient: 'from-orange-500 to-yellow-500',
  },
  comfort: {
    label: '温柔安慰',
    icon: 'shield',
    prefix: '☁️',
    desc: '先陪着你，不急着给答案',
    gradient: 'from-purple-500 to-pink-500',
  },
};

export const CATEGORY_MAP: Record<number, string> = {
  1: '正向',
  2: '负向',
  3: '复杂混合',
  4: '中性',
  5: '不相关',
};

export function mapEmotion(category: number, text: string): string {
  if (category === 1) return 'happy';
  if (category === 2) {
    const keywords = ['焦虑', '紧张', '担心', '压力', '不安', '失眠'];
    if (keywords.some((w) => text.includes(w))) return 'anxious';
    const angryKeywords = ['生气', '愤怒', '讨厌', '烦', '委屈', '火大'];
    if (angryKeywords.some((w) => text.includes(w))) return 'angry';
    return 'sad';
  }
  if (category === 4) return 'calm';
  return 'neutral';
}

export function stripPrefix(text: string): string {
  return text.replace(/^[✨🌈☁️]\s*/, '');
}