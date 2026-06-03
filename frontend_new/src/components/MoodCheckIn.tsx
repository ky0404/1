import React, { useState } from 'react';
import { Frown, Meh, Smile, Laugh, Heart } from 'lucide-react';

interface MoodCheckInProps {
  onCheckIn?: (moodId: number) => void;
}

const moods = [
  { id: 1, icon: Frown, label: '崩溃', color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 2, icon: Meh, label: '难过', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { id: 3, icon: Smile, label: '平静', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 4, icon: Laugh, label: '开心', color: 'text-green-400', bg: 'bg-green-500/20' },
  { id: 5, icon: Heart, label: '愉悦', color: 'text-pink-400', bg: 'bg-pink-500/20' },
];

const healingMessages: Record<number, string> = {
  1: "每个人都会有崩溃的时候，这很正常。我在这里陪着你，一切都会好起来的。",
  2: "难过是很正常的情绪，不用强迫自己开心，我在这里陪着你。",
  3: "平静是一种美好的状态，享受当下的宁静时光，你做得很好。",
  4: "看到你开心我也很开心！继续保持这份美好，让快乐延续下去。",
  5: "愉悦的感觉真棒！记住这份美好，它会成为你内心的力量源泉。"
};

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onCheckIn }) => {
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood);
    setShowMessage(true);
    onCheckIn?.(mood.id);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 text-center">今日情绪签到</h3>
      
      <div className="flex justify-center gap-4 mb-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              className={`p-3 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${
                selectedMood?.id === mood.id 
                  ? `${mood.bg} ${mood.color} -translate-y-1` 
                  : 'bg-white/10 text-[#F5F0EB]/50 hover:bg-white/20'
              }`}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className="text-center">
          <p className="text-sm text-[#F5F0EB]/70 mb-2">你选择了：{selectedMood.label}</p>
        </div>
      )}

      {showMessage && selectedMood && (
        <div className="mt-4 p-4 bg-purple-500/20 rounded-2xl animate-fade-in">
          <p className="text-sm text-pink-200 text-center">{healingMessages[selectedMood.id]}</p>
        </div>
      )}
    </div>
  );
};

export default MoodCheckIn;