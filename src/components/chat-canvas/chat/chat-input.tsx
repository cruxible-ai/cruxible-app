'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  /** Called when user sends a message */
  onSend: (content: string) => void;
  /** Disable input */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Show streaming indicator and abort button */
  isStreaming?: boolean;
  /** Called when user aborts streaming */
  onAbort?: () => void;
  /** Maximum character length */
  maxLength?: number;
  className?: string;
}

/**
 * Chat input with auto-resize textarea and send button.
 *
 * Features:
 * - Auto-resize as user types (up to max height)
 * - Send on Enter (Shift+Enter for newline)
 * - Abort button when streaming
 */
function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
  isStreaming = false,
  onAbort,
  maxLength,
  className,
}: ChatInputProps) {
  const [value, setValue] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSend = React.useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && !disabled && !isStreaming) {
      onSend(trimmed);
      setValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [value, disabled, isStreaming, onSend]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const canSend = value.trim().length > 0 && !disabled && !isStreaming;

  return (
    <div className={cn('bg-background p-4', className)}>
      <div className="flex items-end gap-2 rounded-2xl bg-background p-2 ring-1 ring-[#A4A6AA]/50 transition-all focus-within:ring-[#A4A6AA]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isStreaming}
          maxLength={maxLength}
          rows={1}
          className={cn(
            'flex-1 resize-none bg-transparent px-2 py-1',
            'text-sm placeholder:text-muted-foreground',
            'focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'min-h-[24px] max-h-[200px]'
          )}
        />
        {isStreaming ? (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={onAbort}
            className="flex-shrink-0 h-8 w-8 rounded-xl"
          >
            <StopIcon className="h-4 w-4" />
            <span className="sr-only">Stop</span>
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            onClick={handleSend}
            disabled={!canSend}
            className="flex-shrink-0 h-8 w-8 rounded-xl"
          >
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 px-2">
        <p className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
        {maxLength && (
          <p className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

export { ChatInput };
export type { ChatInputProps };
