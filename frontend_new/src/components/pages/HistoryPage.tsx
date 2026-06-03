import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { historyApi } from '@/lib/api';

interface HistoryItem {
  id: number;
  user_message: string;
  ai_response: string;
  sentiment_category: number;
  sentiment_score: number;
  keywords: string[];
  created_at: string;
}

interface HistoryPageProps {
  isDarkMode: boolean;
  onBack: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ isDarkMode, onBack }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await historyApi.get();
      if (res.data?.code === 200 && res.data?.data?.messages) {
        setHistory(res.data.data.messages.map((m, idx) => ({
          id: idx,
          user_message: m.text || '',
          ai_response: '',
          sentiment_category: m.sentimentLabel === '积极' ? 1 : m.sentimentLabel === '消极' ? 2 : 0,
          sentiment_score: m.intensity || 5,
          keywords: m.keywords || [],
          created_at: m.time || new Date().toISOString(),
        })));
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await historyApi.delete();
      setHistory([]);
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const getEmotionLabel = (category: number) => {
    const labels: Record<number, string> = {
      0: '中性',
      1: '积极',
      2: '消极',
    };
    return labels[category] || '未知';
  };

  const getEmotionColor = (category: number) => {
    const colors: Record<number, string> = {
      0: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
      1: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      2: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[category] || colors[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20"
    >
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">历史记录</h1>

        {loading ? (
          <div className="text-center py-12 text-slate-500">加载中...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">暂无历史记录</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEmotionColor(
                          item.sentiment_category
                        )}`}
                      >
                        {getEmotionLabel(item.sentiment_category)}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.created_at).toLocaleString('zh-CN')}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                      {item.user_message}
                    </p>

                    {expandedId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700"
                      >
                        <p className="text-xs text-slate-500 mb-2">AI 回复：</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.ai_response}
                        </p>
                        {item.keywords && item.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.keywords.map((kw, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded text-xs"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                    >
                      {expandedId === item.id ? '收起' : '展开'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setHistory((prev) => prev.filter((h) => h.id !== item.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryPage;