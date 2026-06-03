import { useRef, useEffect } from 'react';
import { ChatMessages } from './ChatMessages';
import { WelcomeSection } from './WelcomeSection';
import type { Message } from '@/types';

interface ChatContainerProps {
  messages: Message[];
  onFeedback?: (messageId: number, rating: 'like' | 'dislike' | 'regenerate') => void;
  aiStatus: 'online' | 'thinking' | 'listening';
  isDarkMode: boolean;
}

export function ChatContainer({
  messages,
  onFeedback,
  aiStatus,
  isDarkMode,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.length > 0 ? (
        <ChatMessages messages={messages} onFeedback={onFeedback} />
      ) : (
        <WelcomeSection aiStatus={aiStatus} isDarkMode={isDarkMode} />
      )}
      <div ref={bottomRef} />
    </div>
  );
}