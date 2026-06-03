import React from 'react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';

const SafetyCenterPage: React.FC = () => {
  const hotlines = [
    { name: '全国心理援助热线', phone: '400-161-9995', available: '24小时', desc: '专业心理咨询师在线' },
    { name: '北京心理危机研究与干预中心', phone: '010-82951332', available: '24小时', desc: '危机干预热线' },
    { name: '生命热线', phone: '400-821-1215', available: '24小时', desc: '预防自杀热线' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">🛡️ 安全守护</h1>
          <p className="text-sm text-[#F5F0EB]/80">你并不孤单，我们一直都在</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        <div className="glass-card p-6 bg-red-500/20 border-red-500/30">
          <h2 className="text-lg font-medium text-red-300 mb-4">如果你现在感到危险</h2>
          <p className="text-sm text-[#F5F0EB]/80 mb-4">
            请立即拨打以下热线，或者拨打110报警、120就医。
          </p>
          <a href="tel:4001619995" className="block w-full py-4 bg-red-500 text-white text-center rounded-2xl font-bold text-lg">
            400-161-9995
          </a>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-[#F5F0EB]">常用热线</h2>
          {hotlines.map((item, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-[#F5F0EB]">{item.name}</h3>
                <span className="text-xs text-green-400">{item.available}</span>
              </div>
              <p className="text-sm text-[#F5F0EB]/60 mb-3">{item.desc}</p>
              <a href={`tel:${item.phone}`} className="text-pink-300 font-medium">
                📞 {item.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-[#F5F0EB] mb-4">自我保护提示</h2>
          <ul className="space-y-2 text-sm text-[#F5F0EB]/70">
            <li>• 情绪低落时，避免独处</li>
            <li>• 保持规律作息和充足睡眠</li>
            <li>• 适量运动有助于改善情绪</li>
            <li>• 与信任的人分享你的感受</li>
            <li>• 必要时寻求专业帮助</li>
          </ul>
        </div>
      </div>

      <Navigation currentPath="/safety" />
    </div>
  );
};

export default SafetyCenterPage;