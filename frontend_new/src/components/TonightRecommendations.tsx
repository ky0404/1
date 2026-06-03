import React from 'react';
import { Moon, Music, Book, Coffee, Heart } from 'lucide-react';

interface TonightRecommendationsProps {
  recommendations?: Array<{ id: number; type: string; title: string; desc: string }>;
}

const defaultRecommendations = [
  { id: 1, type: 'music', title: '睡前冥想', desc: '15分钟冥想放松' },
  { id: 2, type: 'book', title: '阅读疗愈', desc: '《活出生命的意义》' },
  { id: 3, type: 'coffee', title: '温暖饮品', desc: '热牛奶有助睡眠' },
  { id: 4, type: 'heart', title: '自我接纳', desc: '写下今天的3个优点' },
];

const icons: Record<string, React.ComponentType<any>> = {
  music: Music,
  book: Book,
  coffee: Coffee,
  heart: Heart,
};

const TonightRecommendations: React.FC<TonightRecommendationsProps> = ({ 
  recommendations = defaultRecommendations 
}) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-[#F5F0EB] mb-4 flex items-center gap-2">
        <Moon className="w-5 h-5 text-indigo-400" />
        今晚推荐
      </h3>

      <div className="space-y-3">
        {recommendations.map((item) => {
          const Icon = icons[item.type] || Heart;
          return (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F0EB]">{item.title}</p>
                <p className="text-xs text-[#F5F0EB]/60">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TonightRecommendations;