import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Trash2,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
  user: { id: number; email: string; username: string } | null;
  onLogout: () => void;
  onClearData: () => void;
}

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  rightElement,
  danger,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors ${
      danger
        ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400'
        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
    }`}
  >
    <div className={`p-2 rounded-lg ${danger ? 'bg-red-100 dark:bg-red-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
      {icon}
    </div>
    <div className="flex-1 text-left">
      <p className={`font-medium ${danger ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
        {title}
      </p>
      {subtitle && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
    {rightElement || <ChevronRight className="h-5 w-5 text-slate-400" />}
  </button>
);

const SettingsPage: React.FC<SettingsPageProps> = ({
  isDarkMode,
  onToggleTheme,
  onBack,
  user,
  onLogout,
  onClearData,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearData = () => {
    onClearData();
    setShowClearConfirm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20"
    >
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← 返回
        </Button>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">设置</h1>

        {/* 账号信息 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              账号
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {user ? (
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {(user.username || user.email)[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {user.username || '未设置用户名'}
                    </p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-slate-500 dark:text-slate-400 mb-3">未登录</p>
                <Button variant="outline" size="sm">
                  登录后可查看更多设置
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 外观 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              外观
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SettingItem
              icon={isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              title={isDarkMode ? '深色模式' : '浅色模式'}
              subtitle="切换主题颜色"
              onClick={onToggleTheme}
              rightElement={
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  isDarkMode ? 'bg-cyan-500' : 'bg-slate-300'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </div>
              }
            />
          </CardContent>
        </Card>

        {/* 通知 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              通知
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SettingItem
              icon={<Bell className="h-4 w-4" />}
              title="推送通知"
              subtitle="接收消息提醒"
              rightElement={
                <div className="w-12 h-6 rounded-full bg-slate-300 p-1">
                  <div className="w-4 h-4 rounded-full bg-white translate-x-0" />
                </div>
              }
            />
          </CardContent>
        </Card>

        {/* 隐私与安全 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              隐私与安全
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SettingItem
              icon={<Shield className="h-4 w-4" />}
              title="隐私政策"
              subtitle="了解我们如何保护你的数据"
              onClick={() => window.location.href = '/privacy'}
            />
            <SettingItem
              icon={<Shield className="h-4 w-4" />}
              title="用户协议"
              subtitle="使用条款和条件"
              onClick={() => window.location.href = '/terms'}
            />
            <SettingItem
              icon={<Shield className="h-4 w-4" />}
              title="免责声明"
              subtitle="服务限制说明"
              onClick={() => window.location.href = '/disclaimer'}
            />
          </CardContent>
        </Card>

        {/* 数据管理 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              数据管理
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {user && (
              <SettingItem
                icon={<Trash2 className="h-4 w-4" />}
                title="清空情绪记录"
                subtitle="删除所有历史情绪数据"
                danger
                onClick={() => setShowClearConfirm(true)}
              />
            )}
            <SettingItem
              icon={<Trash2 className="h-4 w-4" />}
              title="清空聊天记录"
              subtitle="删除所有对话历史"
              danger
              onClick={onClearData}
            />
          </CardContent>
        </Card>

        {/* 账号操作 */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              账号
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {user ? (
              <SettingItem
                icon={<LogOut className="h-4 w-4" />}
                title="退出登录"
                subtitle="返回游客模式"
                danger
                onClick={onLogout}
              />
            ) : (
              <SettingItem
                icon={<User className="h-4 w-4" />}
                title="登录/注册"
                subtitle="登录享受更多功能"
              />
            )}
          </CardContent>
        </Card>

        {/* 版本信息 */}
        <div className="text-center text-sm text-slate-400 dark:text-slate-500 py-4">
          <p>媛心烨语 v1.0.0</p>
          <p>基于 AI 的情绪陪伴系统</p>
        </div>
      </div>

      {/* 确认弹窗 */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              确认清空
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              此操作将永久删除你的所有情绪记录，且无法恢复。确定要继续吗？
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowClearConfirm(false)}>
                取消
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleClearData}>
                确认删除
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SettingsPage;