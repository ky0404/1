import React from 'react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';

const tools = [
  { id: 1, title: '呼吸练习', desc: '4-7-8 呼吸法放松身心', icon: '🌬️' },
  { id: 2, title: '正念冥想', desc: '5分钟冥想引导', icon: '🧘' },
  { id: 3, title: '情绪书写', desc: '用文字疗愈内心', icon: '✍️' },
  { id: 4, title: '放松训练', desc: '渐进式肌肉放松', icon: '💆' },
];

const ToolsRoomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">🔧 心理工具</h1>
          <p className="text-sm text-[#F5F0EB]/80">科学有效的心理调节工具</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 pb-24 relative z-10">
        {tools.map((tool) => (
          <div key={tool.id} className="glass-card p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{tool.icon}</div>
              <div>
                <h3 className="font-medium text-[#F5F0EB]">{tool.title}</h3>
                <p className="text-sm text-[#F5F0EB]/60">{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navigation currentPath="/tools" />
    </div>
  );
};

export default ToolsRoomPage;