import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (userData: { id: number; email: string; username: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleGitHubLogin = () => {
    setLoading('github');
    window.location.href = '/api/auth/github';
  };

  const handleEmailLogin = () => {
    console.log('Email login not implemented yet');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md">
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl text-center">欢迎来到</CardTitle>
                <CardTitle className="text-2xl text-center gradient-text">媛心烨语</CardTitle>
                <CardDescription className="text-center mt-2">
                  登录后享受云端同步、无限对话次数
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={handleGitHubLogin}
                  disabled={!!loading}
                >
                  {loading === 'github' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Github className="mr-2 h-5 w-5" />
                      使用 GitHub 账号登录
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">或</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full h-12 text-base"
                  onClick={handleEmailLogin}
                  disabled={!!loading}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  使用邮箱注册/登录
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  登录即表示同意{' '}
                  <a href="/terms" className="underline hover:text-primary">
                    用户协议
                  </a>{' '}
                  和{' '}
                  <a href="/privacy" className="underline hover:text-primary">
                    隐私政策
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;