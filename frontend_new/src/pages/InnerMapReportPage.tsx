import React from 'react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';

const InnerMapReportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">🔍 内心地图</h1>
          <p className="text-sm text-[#F5F0EB]/80">探索你的内心世界</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        <div className="glass-card p-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center">
            <span className="text-4xl">🧭</span>
          </div>
          <h2 className="text-lg font-medium text-[#F5F0EB] mb-2">探索你的内心地图</h2>
          <p className="text-sm text-[#F5F0EB]/60 mb-4">
            通过分析你的对话和情绪记录，生成你的专属内心地图
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500/80 to-purple-500/80 rounded-2xl text-white font-medium">
            开始探索
          </button>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-medium text-[#F5F0EB] mb-4">内心地图维度</h3>
          <div className="space-y-3">
            {['情绪模式', '压力来源', '人际关系的自己', '理想与现实的差距', '自我认知'].map((dim, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-sm text-[#F5F0EB]">{dim}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation currentPath="/report" />
    </div>
  );
};

export default InnerMapReportPage;