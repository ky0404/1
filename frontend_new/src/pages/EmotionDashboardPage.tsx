import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Edit } from 'lucide-react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import EmotionGarden from '../components/EmotionGarden';
import EmotionWave from '../components/EmotionWave';
import PersonalPortrait from '../components/PersonalPortrait';
import GrowthMilestones from '../components/GrowthMilestones';
import TonightRecommendations from '../components/TonightRecommendations';
import { authApi } from '../lib/api';
import type { AuthUser } from '@/types';

const EmotionDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    authApi.me()
      .then(res => {
        if (res.data?.code === 200) setUser(res.data.data);
      })
      .catch(() => {})
      .finally(() => setAuthLoading(false));
  }, []);

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-sm mx-4">
          <p className="text-4xl mb-4">🌸</p>
          <h2 className="text-lg font-medium text-[#F5F0EB] mb-2">登录后查看情绪花园</h2>
          <p className="text-sm text-[#F5F0EB]/60 mb-4">登录后你的情绪数据会在这里可视化展示</p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-3 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-2xl text-white"
          >
            去登录 →
          </button>
        </div>
      </div>
    );
  }

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
      
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient mb-1">🌸 你的情绪花园</h1>
            <p className="text-sm text-[#F5F0EB]/80">每一次情绪的起伏，都是花园里花开的声音</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-2xl text-sm text-purple-300">
              <Download className="w-4 h-4" />
              <span>导出报告</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-2xl text-sm text-pink-300">
              <Edit className="w-4 h-4" />
              <span>编辑画像</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <EmotionGarden />
          </div>
          <div>
            <EmotionWave />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalPortrait />
          <TonightRecommendations />
        </div>
        
        <GrowthMilestones />
      </div>

      <Navigation currentPath="/dashboard" />
    </div>
  );
};

export default EmotionDashboardPage;