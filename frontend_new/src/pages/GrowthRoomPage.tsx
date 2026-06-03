import React from 'react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import GrowthMilestones from '../components/GrowthMilestones';

const GrowthRoomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <EmergencyButton />
      
      <div className="glass-card border-b border-white/20 px-6 py-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gradient mb-1">📈 成长轨迹</h1>
          <p className="text-sm text-[#F5F0EB]/80">记录你的每一次进步</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24 relative z-10">
        <GrowthMilestones />
      </div>

      <Navigation currentPath="/growth" />
    </div>
  );
};

export default GrowthRoomPage;