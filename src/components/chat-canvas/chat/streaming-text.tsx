'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface StreamingTextProps {
  /** The full text to display */
  text: string;
  /** Whether text is still streaming */
  isStreaming: boolean;
  /** Delay between characters in ms */
  typingSpeed?: number;
  /** Show blinking cursor at end */
  showCursor?: boolean;
  /** Called when streaming animation completes */
  onComplete?: () => void;
  className?: string;
}

/**
 * Text component that simulates typing animation.
 *
 * When isStreaming is true:
 * - Displays text character by character
 * - Shows blinking cursor at the end
 *
 * When isStreaming is false:
 * - Displays full text immediately
 * - Hides cursor
 */
function StreamingText({
  text,
  isStreaming,
  typingSpeed = 15,
  showCursor = true,
  onComplete,
  className,
}: StreamingTextProps) {
  const [displayedLength, setDisplayedLength] = React.useState(
    isStreaming ? 0 : text.length
  );

  // Typing animation effect
  React.useEffect(() => {
    if (!isStreaming) {
      setDisplayedLength(text.length);
      return;
    }

    if (displayedLength < text.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => Math.min(prev + 1, text.length));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (displayedLength === text.length && onComplete) {
      onComplete();
    }
  }, [displayedLength, text.length, typingSpeed, isStreaming, onComplete]);

  // Reset when text changes (new streaming started)
  React.useEffect(() => {
    if (isStreaming) {
      setDisplayedLength(0);
    }
  }, [text, isStreaming]);

  const displayedText = text.slice(0, displayedLength);
  const showStreamingCursor = showCursor && isStreaming && displayedLength < text.length;

  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {displayedText}
      {showStreamingCursor && <StreamingCursor />}
    </span>
  );
}

/**
 * Blinking cursor for streaming text
 */
function StreamingCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block w-[2px] h-[1em] bg-foreground ml-0.5 align-text-bottom',
        'animate-pulse',
        className
      )}
      aria-hidden="true"
    />
  );
}

/**
 * Hook for streaming text state management
 */
function useStreamingText(initialText: string = '') {
  const [text, setText] = React.useState(initialText);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const startStreaming = React.useCallback((newText: string) => {
    setText(newText);
    setIsStreaming(true);
  }, []);

  const appendText = React.useCallback((chunk: string) => {
    setText((prev) => prev + chunk);
  }, []);

  const stopStreaming = React.useCallback(() => {
    setIsStreaming(false);
  }, []);

  const reset = React.useCallback(() => {
    setText('');
    setIsStreaming(false);
  }, []);

  return {
    text,
    isStreaming,
    startStreaming,
    appendText,
    stopStreaming,
    reset,
  };
}

export { StreamingText, StreamingCursor, useStreamingText };
export type { StreamingTextProps };
