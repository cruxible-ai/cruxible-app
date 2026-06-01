'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat-message';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  status?: 'sending' | 'streaming' | 'complete' | 'error';
  agentName?: string;
}

interface MessageListProps {
  /** Array of messages to display */
  messages: Message[];
  /** Custom render function for each message (optional - uses ChatMessage by default) */
  renderMessage?: (message: Message, index: number) => React.ReactNode;
  /** Auto-scroll to bottom on new messages */
  autoScroll?: boolean;
  /** Empty state content */
  emptyState?: React.ReactNode;
  className?: string;
}

/**
 * Scrollable message list with auto-scroll to bottom.
 */
// Default render function using ChatMessage
const defaultRenderMessage = (message: Message) => (
  <ChatMessage
    role={message.role}
    content={message.content}
    timestamp={message.timestamp}
    status={message.status}
    agentName={message.agentName}
  />
);

function MessageList({
  messages,
  renderMessage = defaultRenderMessage,
  autoScroll = true,
  emptyState,
  className,
}: MessageListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = React.useState(false);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (autoScroll && !userScrolled && bottomRef.current && scrollRef.current) {
      // Use scrollTop on the container instead of scrollIntoView to avoid
      // scrolling ancestor containers (like the page itself in showcase)
      const container = scrollRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, autoScroll, userScrolled]);

  // Detect user scroll
  const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 50;
    setUserScrolled(!isAtBottom);
  }, []);

  // Reset user scroll when new message from user
  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      setUserScrolled(false);
    }
  }, [messages]);

  if (messages.length === 0 && emptyState) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <ScrollArea
      className={cn('flex-1 bg-card', className)}
      onScrollCapture={handleScroll}
    >
      <div ref={scrollRef} className="flex flex-col">
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            {renderMessage(message, index)}
          </React.Fragment>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}

/**
 * Empty state for message list
 */
interface MessageListEmptyProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

function MessageListEmpty({
  title = 'Start a conversation',
  description = 'Ask a question to begin analyzing promotions',
  icon,
  className,
}: MessageListEmptyProps) {
  return (
    <div className={cn('text-center px-8 py-12', className)}>
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export { MessageList, MessageListEmpty };
export type { Message, MessageListProps };
