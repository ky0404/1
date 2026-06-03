import axios from 'axios';
import type { AnalysisPayload, HistoryItem, ReplyMode, AuthUser, Message } from '@/types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  me: () => api.get<{ code: number; data: AuthUser }>('/auth/me'),
  
  register: (email: string, password: string, username?: string) =>
    api.post<{ code: number; data: AuthUser }>('/auth/register', { email, password, username }),
  
  passwordLogin: (email: string, password: string) =>
    api.post<{ code: number; data: AuthUser }>('/auth/login', { email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  sendEmailCode: (email: string) =>
    api.post<{ code: number; data: { sent: boolean } }>('/auth/send-email-code', { email }),
  
  emailLogin: (email: string, code: string) =>
    api.post<{ code: number; data: AuthUser }>('/auth/email-login', { email, code }),
  
  resetPassword: (email: string) =>
    api.post<{ code: number; data: { sent: boolean } }>('/auth/reset-password', { email }),
  
  githubLogin: () => api.get('/auth/github'),
};

export const emotionApi = {
  analyze: (text: string, mode: ReplyMode, history: HistoryItem[]) =>
    api.post<{ code: number; data: AnalysisPayload }>('/emo_analysis', { text, mode, history }),

  analyzeStream: (text: string, mode: ReplyMode, history: HistoryItem[], signal?: AbortSignal) =>
    fetch('/api/emo_analysis_stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ text, mode, history }),
      signal,
      credentials: 'include',
    }),

  getTrends: (limit: number = 14) =>
    api.get<{ code: number; data: { records: EmotionTrendRecord[]; stats: EmotionStats } }>(
      '/emotion/trends',
      { params: { limit } }
    ),

  clearRecords: () =>
    api.delete<{ code: number; data: { cleared: boolean; count: number } }>('/emotion/records'),

  trends: (params: { days?: number; limit?: number }) =>
    api.get<{ code: number; data: any }>('/emotion/trends', { params }),
};

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

export const historyApi = {
  get: () =>
    api.get<{ code: number; data: { messages: Message[]; mode: string } }>('/history'),

  save: (messages: Message[], mode: string) =>
    api.post<{ code: number; data: { saved: boolean; count: number } }>('/history', {
      messages,
      mode,
    }),

  delete: () =>
    api.delete<{ code: number; data: { cleared: boolean } }>('/history'),
};

export interface FeedbackRequest {
  user_input: string;
  ai_reply: string;
  rating: 'like' | 'dislike' | 'regenerate';
  emotion_mode?: ReplyMode;
  sentiment_score?: number;
  sentiment_label?: string;
  session_id?: string;
  feedback_text?: string;
}

export interface FeedbackStats {
  total: number;
  breakdown: Record<string, number>;
  positive: number;
  negative: number;
  quality_rate: number;
  note?: string;
}

export const feedbackApi = {
  submit: (data: FeedbackRequest) =>
    api.post<{ code: number; data: { saved: boolean; id: number } }>('/feedback', data),

  stats: () =>
    api.get<{ code: number; data: FeedbackStats }>('/feedback/stats'),
};

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

export const profileApi = {
  get: () =>
    api.get<{ code: number; data: UserProfile }>('/profile'),

  update: (data: Partial<UserProfile>) =>
    api.put<{ code: number; data: UserProfile }>('/profile', data),

  reset: () =>
    api.delete<{ code: number; data: { cleared: boolean; user_id?: number } }>('/profile/reset'),
};

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

export interface UserSettings {
  ai_name: string;
  response_style: string;
  notifications_enabled: boolean;
  theme: string;
  language: string;
  crisis_alert_enabled: boolean;
  daily_reminder_enabled: boolean;
  reminder_time: string;
}

export const settingsApi = {
  get: () =>
    api.get<{ code: number; data: UserSettings }>('/settings'),

  update: (data: Partial<UserSettings>) =>
    api.put<{ code: number; data: UserSettings }>('/settings', data),

  reset: () =>
    api.post<{ code: number; data: UserSettings }>('/settings/reset'),
};

export interface MemoryCapsule {
  id: number;
  title: string;
  content: string;
  mood: string;
  tags: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const capsuleApi = {
  getAll: () =>
    api.get<{ code: number; data: { capsules: MemoryCapsule[]; total: number } }>('/memory-capsules'),

  get: (id: number) =>
    api.get<{ code: number; data: MemoryCapsule }>(`/memory-capsules/${id}`),

  create: (data: { title: string; content: string; mood?: string; tags?: string; is_public?: boolean }) =>
    api.post<{ code: number; data: MemoryCapsule }>('/memory-capsules', data),

  update: (id: number, data: Partial<{ title: string; content: string; mood: string; tags: string; is_public: boolean }>) =>
    api.put<{ code: number; data: MemoryCapsule }>(`/memory-capsules/${id}`, data),

  delete: (id: number) =>
    api.delete<{ code: number; data: { deleted: boolean; id: number } }>(`/memory-capsules/${id}`),
};

export interface KnowledgeArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  read_time: number;
  tags: string;
  view_count: number;
  created_at: string;
}

export interface KnowledgeCategory {
  name: string;
  count: number;
}

export const knowledgeApi = {
  getArticles: (params?: { category?: string; page?: number; page_size?: number }) =>
    api.get<{ code: number; data: { articles: KnowledgeArticle[]; total: number; page: number; page_size: number } }>('/knowledge/articles', { params }),

  getArticle: (id: number) =>
    api.get<{ code: number; data: KnowledgeArticle }>(`/knowledge/articles/${id}`),

  getCategories: () =>
    api.get<{ code: number; data: { categories: KnowledgeCategory[] } }>('/knowledge/categories'),
};

export interface ToolUsageRecord {
  id: number;
  tool_name: string;
  duration_seconds: number;
  extra_data: string;
  created_at: string;
}

export interface ToolUsageStats {
  total_usage: number;
  total_duration_seconds: number;
  by_tool: Array<{
    tool_name: string;
    usage_count: number;
    total_duration_seconds: number;
  }>;
}

export const toolUsageApi = {
  getRecords: (params?: { tool_name?: string; page?: number; page_size?: number }) =>
    api.get<{ code: number; data: { records: ToolUsageRecord[]; total: number; page: number; page_size: number } }>('/tool-usage', { params }),

  record: (data: { tool_name: string; duration_seconds?: number; metadata?: string }) =>
    api.post<{ code: number; data: { id: number } }>('/tool-usage', data),

  getStats: (days?: number) =>
    api.get<{ code: number; data: ToolUsageStats }>('/tool-usage/stats', { params: { days } }),
};

export const systemApi = {
  health: () =>
    api.get<{ code: number; data: HealthStatus }>('/health'),

  cacheStats: () =>
    api.get<{ code: number; data: CacheStats }>('/cache/stats'),

  cacheClear: () =>
    api.delete<{ code: number; data: { cleared: boolean } }>('/cache/clear'),
};

export default api;