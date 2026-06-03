import { AnimatePresence } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import type { Message } from '@/types';

interface ChatMessagesProps {
  messages: Message[];
  onFeedback?: (messageId: number, rating: 'like' | 'dislike' | 'regenerate') => void;
}

export function ChatMessages({ messages, onFeedback }: ChatMessagesProps) {
  return (
    <div className="space-y-1">
      <AnimatePresence mode="popLayout">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={msg.id || idx}
            message={msg}
            onFeedback={onFeedback}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}