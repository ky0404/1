import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, BarChart, BookOpen, Heart, User, TrendingUp, Wrench, Palette, ArrowRight, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import EmergencyButton from '../components/EmergencyButton';
import MoodCheckIn from '../components/MoodCheckIn';
import GrowthReview from '../components/GrowthReview';

interface IndexPageProps {
  onNavigate?: (path: string) => void;
}

const features = [
  { icon: MessageCircle, title: '开始陪伴对话', description: '与AI进行深度情绪交流', path: '/chat', color: 'from-pink-400 to-pink-600' },
  { icon: BarChart, title: '我的情绪花园', description: '查看你的情绪可视化仪表板', path: '/dashboard', color: 'from-purple-400 to-purple-600' },
  { icon: BookOpen, title: '知识花园', description: '探索心理学知识宝库', path: '/library', color: 'from-blue-400 to-blue-600' },
  { icon: User, title: '查看我的心理画像', description: '了解你的专属心理镜像', path: '/profile', color: 'from-amber-300 to-amber-500' },
  { icon: TrendingUp, title: '情绪成长轨迹', description: '记录你的心理成长历程', path: '/growth', color: 'from-indigo-400 to-indigo-600' },
  { icon: Wrench, title: '专业心理工具', description: '使用科学的心理调节工具', path: '/tools', color: 'from-green-400 to-green-600' },
  { icon: Heart, title: '疗愈百宝箱', description: '你的专属心理工具箱', path: '/healing-tools', color: 'from-pink-400 to-purple-600' },
  { icon: Palette, title: '灵魂调音台', description: '个性化设置你的陪伴方式', path: '/personalization', color: 'from-orange-400 to-orange-600' },
];

const IndexPage: React.FC<IndexPageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A153A] via-[#3D2C5E] to-[#1A153A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <EmergencyButton />
      
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 py-8 px-6 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gradient mb-2">媛心烨语</h1>
          <p className="text-lg text-[#F5F0EB]/80">日落星空下的心灵花园</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-8 pb-24 relative z-10">
        <div className={`text-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative">
            <div className="mx-auto w-full h-48 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-pink-300" />
            </div>
          </div>
          <p className="mt-4 text-[#F5F0EB]/70">欢迎回到你的专属心灵花园</p>
        </div>

        <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={index}
                onClick={() => handleNavigate(feature.path)}
                className="glass-card p-6 hover:bg-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl text-left group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-[#F5F0EB] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#F5F0EB]/70 mb-3">{feature.description}</p>
                <div className="flex items-center text-pink-300 group-hover:text-pink-200 transition-colors">
                  <span className="text-sm">进入</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <MoodCheckIn />
        </div>

        <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <GrowthReview />
        </div>

        <div className={`text-center text-sm text-[#F5F0EB]/60 space-y-2 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p>全国心理援助热线：400-161-9995</p>
        </div>
      </div>

      <Navigation currentPath="/" onNavigate={handleNavigate} />
    </div>
  );
};

export default IndexPage;