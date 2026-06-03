export type ReplyMode = 'smart' | 'praise' | 'comfort';

export interface Message {
  id: number;
  text: string;
  guide?: string;
  keywords?: string[];
  isUser: boolean;
  time: string;
  emotion?: EmotionType;
  intensity?: number;
  sentimentLabel?: string;
  mode?: ReplyMode;
  isStreaming?: boolean;
  feedback?: FeedbackRating;
}

export type EmotionType = 'happy' | 'sad' | 'anxious' | 'angry' | 'calm' | 'neutral';

export type FeedbackRating = 'like' | 'dislike' | 'regenerate' | null;

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  avatar?: string;
}

export interface AnalysisPayload {
  sentiment_category: number;
  sentiment_score: number;
  sentiment_label?: string;
  reply?: string;
  guide?: string;
  keywords?: string[];
  mode?: ReplyMode;
  originalText?: string;
}

export interface HistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface StreamEvent {
  type: 'thinking' | 'token' | 'analysis' | 'guide' | 'done' | 'error';
  content?: string;
  msg?: string;
  code?: number;
  data?: AnalysisPayload;
  text?: string;
  score?: number;
}

export interface EmotionConfig {
  gradient: string;
  label: string;
  glow: string;
  tagColor: string;
}

export interface EmotionTrendRecord {
  id: number;
  score: number;
  label: string;
  category: number;
  emotion_type?: string;
  is_crisis: number;
  created_at: string;
}

export interface EmotionStats {
  avg_score: number;
  crisis_count: number;
  negative_rate: number;
  positive_rate: number;
  total: number;
}

export interface UserProfile {
  enabled: boolean;
  user_id?: number;
  stressors: string[];
  recent_state: string;
  interests: string[];
  response_hints: string;
  avg_score: number;
  recent_crisis_count: number;
  msg?: string;
  _error?: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
}

export interface HealthStatus {
  status: string;
  version: string;
  cache: CacheStats;
}

export interface FeedbackStats {
  total: number;
  breakdown: Record<string, number>;
  positive: number;
  negative: number;
  quality_rate: number;
  note?: string;
}