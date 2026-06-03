import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, ChevronDown, Settings, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import type { AuthUser } from '@/types';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  authUser: AuthUser | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export function Header({
  isDarkMode,
  toggleTheme,
  authUser,
  onLogout,
  onLoginClick,
}: HeaderProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 dark:border-slate-700/30">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
            <span className="text-xl">💗</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">
              温柔情绪陪伴站
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              媛心烨语 AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {authUser ? (
            <UserMenu
              user={authUser}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              onLogout={onLogout}
            />
          ) : (
            <Button variant="ghost" size="sm" onClick={onLoginClick}>
              <LogIn className="w-4 h-4 mr-1" />
              登录
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function UserMenu({
  user,
  showMenu,
  setShowMenu,
  onLogout,
}: {
  user: AuthUser;
  showMenu: boolean;
  setShowMenu: (v: boolean) => void;
  onLogout: () => void;
}) {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: '个人资料',
      icon: Settings,
      onClick: () => {
        setShowMenu(false);
        navigate('/profile');
      },
    },
    {
      label: '设置',
      icon: Settings,
      onClick: () => {
        setShowMenu(false);
        navigate('/settings');
      },
    },
    {
      label: '退出登录',
      icon: LogOut,
      onClick: onLogout,
      isDanger: true,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
          {(user.username || user.email)[0].toUpperCase()}
        </div>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 glass rounded-2xl overflow-hidden"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-white/10 ${
                item.isDanger
                  ? 'text-red-500 hover:bg-red-500/10'
                  : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}