import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, History, X, Phone, Heart, Send } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useChat } from '../hooks/useChat';

const ChatRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { messages, input, setInput, loading, sendMessage, handleFeedback } = useChat();
  const [showThinking, setShowThinking] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [emotionTag, setEmotionTag] = useState('随便聊聊');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emotionTags = ['随便聊聊', '焦虑', '孤独', '压力', '迷茫', '喜悦'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const thinkingProcess = [
    { title: '💜 情绪识别', description: '我感受到你现在正处于某种情绪中', color: 'purple' },
    { title: '🔍 知识检索', description: '我参考了心理学相关专业知识', color: 'blue' },
    { title: '🤝 多维度分析', description: '我从多个维度为你考量', color: 'green' },
  ];

  const historyConversations = [
    { id: 1, title: '关于工作压力的对话', date: '2024-04-25', preview: '今天工作压力很大...' },
    { id: 2, title: '情绪低落时的陪伴', date: '2024-04-24', preview: '感觉最近心情不太好...' },
    { id: 3, title: '焦虑情绪的疏导', date: '2024-04-23', preview: '我总是担心很多事情...' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <div className="fixed top-0 left-0 right-0 glass-card border-b border-white/20 px-6 py-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold text-gradient">媛心烨语</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHistory(true)} className="flex items-center gap-2 text-pink-300 hover:text-pink-200">
              <History className="w-4 h-4" />
            </button>
            <button onClick={() => setShowThinking(!showThinking)} className="flex items-center gap-2 text-pink-300 hover:text-pink-200">
              <Lightbulb className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/safety')} className="bg-red-500/80 p-2 rounded-2xl">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-32 relative z-10 pt-20">
        <div className="space-y-4 mb-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#F5F0EB]/70">你好，我是你的专属情绪陪伴AI。</p>
              <p className="text-[#F5F0EB]/50 text-sm mt-2">在这里，你可以放心地分享任何想法和感受。</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isUser 
                    ? 'bg-pink-500/30 text-white' 
                    : 'bg-white/10 text-[#F5F0EB]'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  {!message.isUser && (
                    <button
                      onClick={() => handleFeedback(message.id, 'like')}
                      className="mt-2 p-1 rounded-full hover:bg-pink-500/30"
                    >
                      <Heart className="w-4 h-4 text-pink-300" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/20 p-4 z-40">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => {
                const currentIndex = emotionTags.indexOf(emotionTag);
                const nextIndex = (currentIndex + 1) % emotionTags.length;
                setEmotionTag(emotionTags[nextIndex]);
              }}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-2xl text-[#F5F0EB]/80"
            >
              <span className="text-sm">{emotionTag}</span>
            </button>
            
            <div className="flex-1">
              <textarea
                placeholder="此刻，你想和我分享什么..."
                className="w-full p-3 bg-transparent border-none outline-none resize-none text-[#F5F0EB] placeholder-[#F5F0EB]/50"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="p-3 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-2xl disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="text-center text-xs text-[#F5F0EB]/60">
            全国心理援助热线：400-161-9995
          </div>
        </div>
      </div>

      {showThinking && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end" onClick={() => setShowThinking(false)}>
          <div className="glass-card rounded-t-3xl p-6 w-full max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#F5F0EB]">思考过程</h3>
              <button onClick={() => setShowThinking(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {thinkingProcess.map((process, index) => (
                <div key={index} className={`p-4 bg-${process.color}-500/20 rounded-2xl`}>
                  <h4 className={`font-medium text-${process.color}-300 mb-2`}>{process.title}</h4>
                  <p className="text-sm text-[#F5F0EB]/80">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end" onClick={() => setShowHistory(false)}>
          <div className="glass-card rounded-t-3xl p-6 w-full max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-[#F5F0EB]">历史对话</h3>
              <button onClick={() => setShowHistory(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {historyConversations.map((conversation) => (
                <div key={conversation.id} className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-medium text-[#F5F0EB]">{conversation.title}</h4>
                  <p className="text-sm text-[#F5F0EB]/70">{conversation.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Navigation currentPath="/chat" />
    </div>
  );
};

export default ChatRoomPage;