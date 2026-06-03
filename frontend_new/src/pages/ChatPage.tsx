import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';

import ParticleBackground from '@/components/ParticleBackground';
import CrisisAlert from '@/components/CrisisAlert';
import AuthModal from '@/components/AuthModal';
import SlideCaptcha from '@/components/SlideCaptcha';
import Navigation from '@/components/Navigation';
import { Header } from '@/components/layout/Header';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { authApi } from '@/lib/api';

const CAPTCHA_STORAGE_KEY = 'dukkha_slide_verify_v1';
const CAPTCHA_STORAGE_TTL = 30 * 60 * 1000;

export default function ChatPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTrend, setShowTrend] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [resetCap, setResetCap] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [aiStatus, setAiStatus] = useState<'online' | 'thinking' | 'listening'>('online');

  const {
    messages,
    input,
    setInput,
    loading,
    analysis,
    verified,
    setVerified,
    authUser,
    setAuthUser,
    sendMessage,
    handleFeedback,
    clearChat,
  } = useChat();

  const toggleTheme = useCallback(() => setIsDarkMode((p) => !p), []);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch { /* empty */ }
    setAuthUser(null);
    toast.success('已退出登录', { duration: 2000 });
  }, [setAuthUser]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const res = await authApi.me();
        if (res.data?.code === 200 && res.data?.data) {
          setAuthUser(res.data.data);
        }
      } catch {
        setAuthUser(null);
      }
    };
    loadCurrentUser();
  }, [setAuthUser]);

  useEffect(() => {
    const readCaptchaState = () => {
      try {
        const raw = localStorage.getItem(CAPTCHA_STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw) as { verified?: boolean; expiresAt?: number };
        if (!parsed?.verified || !parsed?.expiresAt || parsed.expiresAt <= Date.now()) {
          localStorage.removeItem(CAPTCHA_STORAGE_KEY);
          return false;
        }
        return true;
      } catch {
        return false;
      }
    };
    setVerified(readCaptchaState());
  }, [setVerified]);

  useEffect(() => {
    if (!verified) return;
    const timer = window.setInterval(() => {
      const readCaptchaState = () => {
        try {
          const raw = localStorage.getItem(CAPTCHA_STORAGE_KEY);
          if (!raw) return false;
          const parsed = JSON.parse(raw) as { verified?: boolean; expiresAt?: number };
          if (!parsed?.verified || !parsed?.expiresAt || parsed.expiresAt <= Date.now()) {
            localStorage.removeItem(CAPTCHA_STORAGE_KEY);
            return false;
          }
          return true;
        } catch {
          return false;
        }
      };
      if (!readCaptchaState()) {
        setVerified(false);
        setResetCap((p) => !p);
        toast.info('滑块验证已过期，请重新验证', { duration: 2000 });
      }
    }, 15000);
    return () => window.clearInterval(timer);
  }, [verified, setVerified]);

  useEffect(() => {
    if (analysis && analysis.sentiment_category === 2 && (analysis.sentiment_score || 0) <= 3) {
      setShowCrisisAlert(true);
    }
  }, [analysis]);

  useEffect(() => {
    if (loading) {
      setAiStatus('thinking');
    } else if (messages.length > 0 && messages[messages.length - 1]?.isUser) {
      setAiStatus('listening');
    } else {
      setAiStatus('online');
    }
  }, [loading, messages]);

  const handleCaptchaVerify = (value: boolean) => {
    setVerified(value);
    if (value) {
      try {
        localStorage.setItem(
          CAPTCHA_STORAGE_KEY,
          JSON.stringify({
            verified: true,
            expiresAt: Date.now() + CAPTCHA_STORAGE_TTL,
          })
        );
      } catch { /* empty */ }
    } else {
      try {
        localStorage.removeItem(CAPTCHA_STORAGE_KEY);
      } catch { /* empty */ }
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Toaster position="top-center" richColors />

      <ParticleBackground isDarkMode={isDarkMode} />

      <CrisisAlert isVisible={showCrisisAlert} onClose={() => setShowCrisisAlert(false)} />

      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={(userData) => {
          setAuthUser(userData);
          setShowAuth(false);
          toast.success(`欢迎，${userData.username || userData.email} `);
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <Header
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          authUser={authUser}
          onLogout={handleLogout}
          onLoginClick={() => setShowAuth(true)}
        />

        <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
          <ChatContainer
            messages={messages}
            onFeedback={handleFeedback}
            aiStatus={aiStatus}
            isDarkMode={isDarkMode}
          />

          {!verified && (
            <div className="mt-4">
              <SlideCaptcha
                onVerify={handleCaptchaVerify}
                resetTrigger={resetCap}
                verified={verified}
              />
            </div>
          )}

          <div className="mt-4">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={sendMessage}
              onClear={clearChat}
              onToggleTrend={() => setShowTrend(!showTrend)}
              showTrend={showTrend}
              loading={loading}
              disabled={!verified || input.trim().length < 5}
            />
          </div>
        </main>

        <Navigation />
      </div>
    </div>
  );
}