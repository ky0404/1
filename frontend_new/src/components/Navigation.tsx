import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User, TrendingUp, Wrench, Shield, Settings, BarChart, Search, BookOpen, Heart, Palette, Archive } from 'lucide-react';

interface NavItem {
  path: string;
  icon: React.ComponentType<any>;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: Home, label: '小屋玄关' },
  { path: '/chat', icon: MessageCircle, label: '陪伴对话' },
  { path: '/dashboard', icon: BarChart, label: '情绪花园' },
  { path: '/report', icon: Search, label: '内心地图' },
  { path: '/library', icon: BookOpen, label: '知识花园' },
  { path: '/healing-tools', icon: Heart, label: '疗愈百宝箱' },
  { path: '/profile', icon: User, label: '心理画像' },
  { path: '/growth', icon: TrendingUp, label: '成长轨迹' },
  { path: '/tools', icon: Wrench, label: '心理工具' },
  { path: '/safety', icon: Shield, label: '安全守护' },
  { path: '/personalization', icon: Palette, label: '灵魂调音台' },
  { path: '/memory-capsules', icon: Archive, label: '治愈胶囊墙' },
  { path: '/settings', icon: Settings, label: '个人中心' },
];

interface NavigationProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath = '/', onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const isActive = (path: string) => location.pathname === path || currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/20 z-50">
      <div className="flex justify-around items-center py-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-500 ${
                active 
                  ? 'bg-white/20 text-pink-300' 
                  : 'text-[#F5F0EB]/70 hover:text-pink-300 hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;