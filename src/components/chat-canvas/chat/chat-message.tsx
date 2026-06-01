'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const chatMessageVariants = cva(
  'py-4 px-4 transition-colors',
  {
    variants: {
      role: {
        user: 'flex justify-end',
        assistant: 'w-full',
        system: 'w-full text-center',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  }
);

export interface ChatMessageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof chatMessageVariants> {
  /** Message role determines styling */
  role: 'user' | 'assistant' | 'system';
  /** Message content (alternative to children) */
  content?: string;
  /** Optional timestamp */
  timestamp?: Date;
  /** Optional status indicator */
  status?: 'sending' | 'thinking' | 'streaming' | 'complete' | 'error';
  /** Show role label */
  showLabel?: boolean;
  /** Custom label text (overrides default role labels) */
  label?: string;
  /** Agent name (alias for label, used for assistant messages) */
  agentName?: string;
}

/**
 * Full-width chat message with role-based styling.
 *
 * User messages: Primary left border, subtle background
 * Assistant messages: Muted left border, card background
 * System messages: No border, centered text
 */
function ChatMessage({
  role,
  content,
  timestamp,
  status,
  showLabel = true,
  label,
  agentName,
  className,
  children,
  ...props
}: ChatMessageProps) {
  const defaultLabels = {
    user: 'You',
    assistant: 'Cruxible',
    system: 'System',
  };

  // agentName takes precedence for assistant messages
  const displayLabel = agentName || label || defaultLabels[role];

  // Support both content prop and children
  const messageContent = content || children;

  // User messages: right-aligned bubble
  if (role === 'user') {
    return (
      <div
        className={cn(chatMessageVariants({ role }), className)}
        {...props}
      >
        <div className="max-w-[80%] bg-background text-foreground border border-border rounded-2xl rounded-br-sm px-4 py-2.5">
          <div className="text-sm leading-relaxed">{messageContent}</div>
          {timestamp && (
            <div className="text-xs opacity-70 mt-1 text-right">
              {formatTime(timestamp)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // System messages: centered, muted
  if (role === 'system') {
    return (
      <div
        className={cn(chatMessageVariants({ role }), className)}
        {...props}
      >
        <div className="text-xs text-muted-foreground">{messageContent}</div>
      </div>
    );
  }

  // Assistant messages: full width, no bubble, no header
  return (
    <div
      className={cn(chatMessageVariants({ role }), className)}
      {...props}
    >
      {/* Message content */}
      {messageContent && (
        <div className="text-sm leading-relaxed text-foreground prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2">
          <ReactMarkdown>{String(messageContent)}</ReactMarkdown>
        </div>
      )}

      {/* Status indicator */}
      {status && status !== 'complete' && status !== 'sending' && (
        <div className="mt-2">
          <MessageStatus status={status} />
        </div>
      )}
    </div>
  );
}

interface MessageStatusProps {
  status: 'sending' | 'thinking' | 'streaming' | 'error';
}

function MessageStatus({ status }: MessageStatusProps) {
  if (status === 'sending') {
    return (
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
        Sending...
      </span>
    );
  }

  if (status === 'thinking') {
    return (
      <span className="text-xs text-muted-foreground flex items-center gap-2">
        <span className="flex gap-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
        Thinking...
      </span>
    );
  }

  if (status === 'streaming') {
    return (
      <span className="text-xs text-primary flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Responding...
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span className="text-xs text-destructive flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
        Error occurred
      </span>
    );
  }

  return null;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export { ChatMessage, chatMessageVariants };
