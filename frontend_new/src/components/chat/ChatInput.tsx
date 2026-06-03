import { useRef, useEffect } from 'react';
import { Send, Trash2, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onClear: () => void;
  onToggleTrend: () => void;
  showTrend: boolean;
  loading: boolean;
  disabled: boolean;
}

const MIN_LEN = 5;
const MAX_LEN = 500;

export function ChatInput({
  value,
  onChange,
  onSend,
  onClear,
  onToggleTrend,
  showTrend,
  loading,
  disabled,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder={`今天心情怎么样？（至少 ${MIN_LEN} 字，Shift+Enter 换行）`}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_LEN))}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={1}
        />
        <div className="text-xs text-slate-400 mt-1 text-right">
          {value.length} / {MAX_LEN}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleTrend}
        className={showTrend ? 'bg-cyan-100 dark:bg-cyan-900' : ''}
      >
        <LineChart className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Trash2 className="h-5 w-5" />
      </Button>

      <Button
        size="icon"
        onClick={onSend}
        disabled={disabled}
        className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}