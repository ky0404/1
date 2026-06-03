import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, TrendingUp, Settings, Heart } from 'lucide-react';

interface NavItem {
  path: string;
  icon: React.ComponentType<any>;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/chat', icon: MessageCircle, label: '对话' },
  { path: '/dashboard', icon: Heart, label: '情绪' },
  { path: '/growth', icon: TrendingUp, label: '成长' },
  { path: '/settings', icon: Settings, label: '我的' },
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