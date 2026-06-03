import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import { knowledgeApi, type KnowledgeArticle, type KnowledgeCategory } from '../lib/api';

const KnowledgeLibraryPage: React.FC = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [categories, setCategories] = useState<KnowledgeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await knowledgeApi.getCategories();
      if (res.data?.code === 200 && res.data?.data) {
        setCategories(res.data.data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params: any = { page: 1, page_size: 20 };
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      const res = await knowledgeApi.getArticles(params);
      if (res.data?.code === 200 && res.data?.data) {
        setArticles(res.data.data.articles || []);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = async (article: KnowledgeArticle) => {
    try {
      const res = await knowledgeApi.getArticle(article.id);
      if (res.data?.code === 200 && res.data?.data) {
        setSelectedArticle(res.data.data);
      }
    } catch (error) {
      toast.error('加载文章失败');
    }
  };

  const defaultArticles = [
    { id: 1, title: '如何应对焦虑', category: '情绪管理', read_time: 5, content: '焦虑是面对压力时的正常反应...', tags: '', view_count: 0, created_at: '' },
    { id: 2, title: '睡眠与心理健康', category: '生活习惯', read_time: 8, content: '良好的睡眠是心理健康的基础...', tags: '', view_count: 0, created_at: '' },
    { id: 3, title: '建立健康人际关系', category: '社交心理', read_time: 6, content: '人际关系对心理健康至关重要...', tags: '', view_count: 0, created_at: '' },
    { id: 4, title: '压力管理技巧', category: '情绪管理', read_time: 7, content: '学会管理压力是成长的重要一课...', tags: '', view_count: 0, created_at: '' },
  ];

  const displayArticles = articles.length > 0 ? articles : defaultArticles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">📚 知识花园</h1>
          <p className="text-sm text-[#F5F0EB]/80">探索心理学知识宝库</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 pb-24 relative z-10">
        {selectedArticle ? (
          <div className="glass-card p-6 space-y-4">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="text-pink-300 text-sm"
            >
              ← 返回列表
            </button>
            <h2 className="text-xl font-bold text-[#F5F0EB]">{selectedArticle.title}</h2>
            <div className="flex gap-3 text-xs text-[#F5F0EB]/60">
              <span className="text-pink-300">{selectedArticle.category}</span>
              <span>{selectedArticle.read_time}分钟阅读</span>
              <span>👁 {selectedArticle.view_count}</span>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-[#F5F0EB]/80 whitespace-pre-wrap">{selectedArticle.content}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  !selectedCategory 
                    ? 'bg-pink-500/50 text-white' 
                    : 'bg-white/10 text-[#F5F0EB]/60'
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === cat.name 
                      ? 'bg-pink-500/50 text-white' 
                      : 'bg-white/10 text-[#F5F0EB]/60'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-8 text-[#F5F0EB]/60">加载中...</div>
            ) : displayArticles.length === 0 ? (
              <div className="text-center py-8 text-[#F5F0EB]/60">暂无文章</div>
            ) : (
              displayArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="glass-card p-4 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#F5F0EB]">{article.title}</h3>
                    <span className="text-xs text-pink-300">{article.category}</span>
                  </div>
                  <p className="text-xs text-[#F5F0EB]/50">{article.read_time}分钟阅读</p>
                </div>
              ))
            )}
          </>
        )}
      </div>

      <Navigation currentPath="/library" />
    </div>
  );
};

export default KnowledgeLibraryPage;