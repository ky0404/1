import { useState, useRef, useCallback, useEffect } from 'react';
import type { Message, ReplyMode, HistoryItem, StreamEvent, AnalysisPayload, EmotionType } from '@/types';
import { emotionApi, historyApi } from '@/lib/api';
import { mapEmotion, stripPrefix } from '@/lib/config';

const SESSION_ID = Math.random().toString(36).slice(2, 10);
const MIN_LEN = 5;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<ReplyMode>('smart');
  const [analysis, setAnalysis] = useState<AnalysisPayload | null>(null);
  const [verified, setVerified] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [guestCount, setGuestCount] = useState(0);
  const [emotionTrends, setEmotionTrends] = useState<any[]>([]);

  const abortRef = useRef<AbortController | null>(null);
  const msgUserInputRef = useRef<Record<number, string>>({});

  const loadTrends = useCallback(async () => {
    if (!authUser) return;
    try {
      const res = await emotionApi.getTrends(14);
      if (res.data?.code === 200 && res.data?.data?.records) {
        setEmotionTrends(res.data.data.records);
      }
    } catch (err) {
      console.error('Failed to load trends:', err);
    }
  }, [authUser]);

  const buildHistory = useCallback((): HistoryItem[] => {
    return messages.slice(-6).map((m) => ({
      role: m.isUser ? 'user' : 'assistant',
      content: m.isUser ? m.text : stripPrefix(m.text),
    }));
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (loading) return;

    const text = input.trim();
    if (text.length < MIN_LEN) return;
    if (!verified) {
      console.warn('请先完成滑块验证');
      return;
    }

    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    const prefix = { smart: '✨', praise: '🌈', comfort: '☁️' }[mode];

    const userMsg: Message = {
      id: Date.now(),
      text,
      isUser: true,
      time: now,
      emotion: 'neutral',
      intensity: 5,
    };
    const aiMsgId = Date.now() + 1;
    const aiMsgPlaceholder: Message = {
      id: aiMsgId,
      text: '',
      isUser: false,
      time: now,
      emotion: 'neutral',
      intensity: 5,
      mode,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, aiMsgPlaceholder]);
    msgUserInputRef.current = { ...msgUserInputRef.current, [aiMsgId]: text };
    setInput('');
    setLoading(true);

    try {
      const history = buildHistory();
      const res = await emotionApi.analyzeStream(text, mode, history, abort.signal);

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullReply = '';
      let analysisData: AnalysisPayload | null = null;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setMessages((prev) =>
            prev.map((m) => (m.id === aiMsgId ? { ...m, isStreaming: false } : m))
          );
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line || !line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const event: StreamEvent = JSON.parse(jsonStr);

            if (event.type === 'thinking' && event.content) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsgId ? { ...m, text: event.content || '', isStreaming: true } : m
                )
              );
            } else if (event.type === 'token' && event.content) {
              fullReply += event.content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsgId
                    ? { ...m, text: `${prefix} ${fullReply}`, isStreaming: true }
                    : m
                )
              );
              await new Promise((r) => setTimeout(r, 0));
            } else if (event.type === 'analysis' && event.data) {
              analysisData = event.data;
              setAnalysis({ ...event.data, originalText: text });
              const mappedEmotion = mapEmotion(event.data.sentiment_category, text) as EmotionType;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === userMsg.id
                    ? {
                        ...m,
                        emotion: mappedEmotion,
                        intensity: Math.min(10, Math.max(1, Math.round(event.data!.sentiment_score || 5))),
                      }
                    : m
                )
              );
            } else if (event.type === 'done') {
              const finalText = fullReply ? `${prefix} ${fullReply}` : `${prefix} 我在这里，慢慢说。`;
              const emotion = analysisData ? mapEmotion(analysisData.sentiment_category, text) as EmotionType : 'neutral';
              const intensity = analysisData
                ? Math.min(10, Math.max(1, Math.round(analysisData.sentiment_score || 5)))
                : 5;

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMsgId
                    ? {
                        ...m,
                        text: finalText,
                        guide: analysisData?.guide,
                        keywords: analysisData?.keywords || [],
                        emotion,
                        intensity,
                        sentimentLabel: analysisData?.sentiment_label,
                        isStreaming: false,
                      }
                    : m
                )
              );
            } else if (event.type === 'error') {
              throw new Error(event.msg || '服务错误');
            }
          } catch (e: any) {
            if (e.message?.includes('试用额度已达上限')) {
              setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
              reader.cancel();
              abort.abort();
              return;
            }
            console.warn('SSE 解析失败:', e);
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;

      try {
        const response = await emotionApi.analyze(text, mode, buildHistory());
        const result = response.data;
        if (result.code !== 200) throw new Error((result as any).msg || '分析失败');

        const d = result.data || {};
        const emotion = mapEmotion(d.sentiment_category, text) as EmotionType;
        const intensity = Math.min(10, Math.max(1, Math.round(d.sentiment_score || 5)));
        const aiText = d.reply ? `${prefix} ${d.reply}` : `${prefix} 我在这里，慢慢说。`;

        setAnalysis({ ...d, originalText: text });
        setMessages((prev) => {
          const upd = prev.map((m) =>
            m.id === userMsg.id ? { ...m, emotion, intensity } : m
          );
          return upd.map((m) =>
            m.id === aiMsgId
              ? {
                  ...m,
                  text: aiText,
                  guide: d.guide,
                  keywords: d.keywords || [],
                  emotion,
                  intensity,
                  sentimentLabel: d.sentiment_label,
                  isStreaming: false,
                }
              : m
          );
        });
      } catch (fallbackErr: any) {
        const errMsg = fallbackErr.response?.data?.msg || fallbackErr.message || '请稍后再试';
        console.error('分析失败:', errMsg);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? { ...m, text: `${prefix} 我听见你了，虽然这次没有顺利分析，但我还在这里陪着你。`, isStreaming: false }
              : m
          )
        );
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [input, loading, mode, verified, buildHistory]);

  const handleFeedback = useCallback(async (msgId: number, rating: 'like' | 'dislike' | 'regenerate') => {
    const aiMsg = messages.find((m) => m.id === msgId && !m.isUser);
    const userInput = msgUserInputRef.current[msgId];
    if (!aiMsg || !userInput) return;

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_input: userInput,
          ai_reply: aiMsg.text,
          rating,
          emotion_mode: mode,
          sentiment_score: aiMsg.intensity,
          sentiment_label: aiMsg.sentimentLabel,
          session_id: SESSION_ID,
        }),
        credentials: 'include',
      });

      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, feedback: rating } : m))
      );
    } catch (err) {
      console.error('反馈提交失败:', err);
    }
  }, [messages, mode]);

  const clearChat = useCallback(async () => {
    if (authUser) {
      try {
        await historyApi.delete();
      } catch {}
    }
    const cacheKey = authUser ? `dukkha_${authUser.id}` : 'dukkha_guest';
    localStorage.removeItem(cacheKey);
    setMessages([]);
    setAnalysis(null);
    msgUserInputRef.current = {};
  }, [authUser]);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  return {
    messages,
    setMessages,
    input,
    setInput,
    loading,
    setLoading,
    mode,
    setMode,
    analysis,
    setAnalysis,
    verified,
    setVerified,
    authUser,
    setAuthUser,
    sendMessage,
    handleFeedback,
    clearChat,
    buildHistory,
    guestCount,
    setGuestCount,
    emotionTrends,
  };
}