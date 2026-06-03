import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Shield, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HelpPageProps {
  onBack: () => void;
}

interface HelpItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const HelpItem: React.FC<HelpItemProps> = ({ icon, title, content }) => (
  <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50">
    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-slate-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{content}</p>
    </div>
  </div>
);

const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">帮助中心</h1>

        <div className="space-y-4">
          <HelpItem
            icon={<MessageCircle className="h-5 w-5" />}
            title="如何开始聊天？"
            content="在输入框中输入你的心情或想法，按发送按钮或 Enter 键即可开始对话。AI 会分析你的情绪并给出温暖的回应。"
          />

          <HelpItem
            icon={<Zap className="h-5 w-5" />}
            title="什么是验证码？"
            content="为防止滥用，每次会话需要通过滑块验证。验证成功后 30 分钟内无需再次验证。"
          />

          <HelpItem
            icon={<Shield className="h-5 w-5" />}
            title="我的数据安全吗？"
            content="我们高度重视隐私保护。所有对话数据都会加密存储，你可以随时在设置中查看或删除个人数据。"
          />

          <HelpItem
            icon={<FileText className="h-5 w-5" />}
            title="AI 能替代心理咨询吗？"
            content="不能。媛心烨语是 AI 情绪陪伴工具，不替代专业心理咨询。如有严重情绪问题，请寻求专业帮助。"
          />

          <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl mt-6">
            <h3 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">需要更多帮助？</h3>
            <p className="text-sm text-cyan-600 dark:text-cyan-300">
              如有其他问题，欢迎通过项目 GitHub 提交 Issue 或联系开发者。
            </p>
          </div>

          <div className="text-center text-sm text-slate-400 dark:text-slate-500 mt-8">
            <p>媛心烨语 v1.0.0</p>
            <p className="mt-1">基于 AI 的情绪陪伴系统</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpPage;