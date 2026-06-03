import React from 'react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';

const SafetyRoomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">🛡️ 安全守护</h1>
          <p className="text-sm text-[#F5F0EB]/80">你的安全是我们最大的牵挂</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        <div className="glass-card p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30">
          <h2 className="text-lg font-medium text-red-300 mb-2">需要帮助？</h2>
          <p className="text-sm text-[#F5F0EB]/80 mb-4">如果你正在经历心理危机，请立即寻求帮助</p>
          <a href="tel:4001619995" className="block w-full py-3 bg-red-500 text-white text-center rounded-2xl font-bold">
            拨打心理援助热线
          </a>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-medium text-[#F5F0EB]">自助资源</h2>
          <div className="glass-card p-4">
            <h3 className="font-medium text-[#F5F0EB]">情绪自我检测</h3>
            <p className="text-sm text-[#F5F0EB]/60">使用专业量表了解自己的情绪状态</p>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-medium text-[#F5F0EB]">放松练习</h3>
            <p className="text-sm text-[#F5F0EB]/60">学习实用的情绪调节技巧</p>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-medium text-[#F5F0EB]">危机应对预案</h3>
            <p className="text-sm text-[#F5F0EB]/60">制定个人危机应对计划</p>
          </div>
        </div>
      </div>

      <Navigation currentPath="/safety" />
    </div>
  );
};

export default SafetyRoomPage;