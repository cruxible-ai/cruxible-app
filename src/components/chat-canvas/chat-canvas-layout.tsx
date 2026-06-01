'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChatCanvasLayoutProps {
  children?: React.ReactNode;
  className?: string;
  /** Default width of chat panel in pixels */
  defaultChatWidth?: number;
  /** Minimum width of chat panel */
  minChatWidth?: number;
  /** Maximum width of chat panel */
  maxChatWidth?: number;
  /** Chat panel content */
  chatPanel?: React.ReactNode;
  /** Canvas panel content */
  canvasPanel?: React.ReactNode;
}

/**
 * Split-screen layout with resizable chat and canvas panels.
 *
 * Chat panel is on the left (fixed width, resizable).
 * Canvas panel is on the right (flexible, fills remaining space).
 */
function ChatCanvasLayout({
  className,
  defaultChatWidth = 720,
  minChatWidth = 360,
  maxChatWidth = 720,
  chatPanel,
  canvasPanel,
}: ChatCanvasLayoutProps) {
  const [chatWidth, setChatWidth] = React.useState(defaultChatWidth);
  const [isResizing, setIsResizing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleResizeStart = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizeEnd = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleResize = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = clientX - containerRect.left;

      setChatWidth(Math.min(maxChatWidth, Math.max(minChatWidth, newWidth)));
    },
    [minChatWidth, maxChatWidth]
  );

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleResize(e.clientX);
    };

    const handleMouseUp = () => {
      handleResizeEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleResize, handleResizeEnd]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex h-full w-full overflow-hidden',
        isResizing && 'select-none cursor-col-resize',
        className
      )}
    >
      {/* Chat Panel */}
      <div
        className="flex-shrink-0 flex flex-col h-full border-r bg-background"
        style={{ width: chatWidth }}
      >
        {chatPanel}
      </div>

      {/* Resize Handle */}
      <ResizeHandle
        onResizeStart={handleResizeStart}
        isResizing={isResizing}
      />

      {/* Canvas Panel */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-muted/30">
        {canvasPanel}
      </div>
    </div>
  );
}

interface ResizeHandleProps {
  onResizeStart: () => void;
  isResizing: boolean;
}

/**
 * Draggable divider between chat and canvas panels.
 */
function ResizeHandle({ onResizeStart, isResizing }: ResizeHandleProps) {
  return (
    <div
      className={cn(
        'relative flex-shrink-0 w-1 cursor-col-resize group',
        'hover:bg-primary/20 transition-colors',
        isResizing && 'bg-primary/30'
      )}
      onMouseDown={(e) => {
        e.preventDefault();
        onResizeStart();
      }}
    >
      {/* Visual indicator */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-1 h-8 rounded-full bg-border',
          'group-hover:bg-primary/50 transition-colors',
          isResizing && 'bg-primary'
        )}
      />
    </div>
  );
}

export { ChatCanvasLayout, ResizeHandle };
