import React, { useState } from 'react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import { toolUsageApi } from '../lib/api';

const healingTools = [
  { id: 'asmr', title: 'ASMR放松', desc: '轻柔声音助眠放松', icon: '🎧' },
  { id: 'whitenoise', title: '白噪音', desc: '自然环境声音', icon: '🌊' },
  { id: 'meditation', title: '引导想象', desc: '可视化放松训练', icon: '🌈' },
  { id: 'music', title: '音乐疗愈', desc: '治愈系音乐播放', icon: '🎵' },
  { id: 'color', title: '色彩冥想', desc: '色彩放松训练', icon: '🎨' },
  { id: 'nature', title: '自然声音', desc: '森林、海浪声', icon: '🌲' },
];

const HealingToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleToolClick = async (toolId: string) => {
    setActiveTool(toolId);
    
    try {
      await toolUsageApi.record({
        tool_name: toolId,
        duration_seconds: 0,
      });
    } catch (error) {
      console.error('Failed to record tool usage:', error);
    }

    const tool = healingTools.find(t => t.id === toolId);
    toast.info(`${tool?.title || '工具'} 功能开发中，敬请期待！`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">💝 疗愈百宝箱</h1>
          <p className="text-sm text-[#F5F0EB]/80">放松身心，治愈心灵</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 pb-24 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          {healingTools.map((tool) => (
            <div 
              key={tool.id} 
              className={`glass-card p-4 text-center hover:bg-white/10 transition-colors cursor-pointer ${
                activeTool === tool.id ? 'ring-2 ring-pink-400' : ''
              }`}
              onClick={() => handleToolClick(tool.id)}
            >
              <div className="text-4xl mb-2">{tool.icon}</div>
              <h3 className="font-medium text-[#F5F0EB]">{tool.title}</h3>
              <p className="text-xs text-[#F5F0EB]/60">{tool.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <h3 className="font-medium text-[#F5F0EB] mb-3">使用说明</h3>
          <ul className="text-sm text-[#F5F0EB]/60 space-y-2">
            <li>• 点击任意工具开始使用</li>
            <li>• 建议在安静的环境中使用</li>
            <li>• 可配合耳机获得更好体验</li>
            <li>• 每次使用5-15分钟效果最佳</li>
          </ul>
        </div>
      </div>

      <Navigation currentPath="/healing-tools" />
    </div>
  );
};

export default HealingToolsPage;