'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CanvasEmptyProps {
  /** Main title */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom icon */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Empty state for canvas when no artifacts are present.
 */
function CanvasEmpty({
  title = 'No artifacts yet',
  description = 'Start a conversation to generate charts, metrics, and insights.',
  icon,
  className,
}: CanvasEmptyProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-full min-h-[300px] text-center px-6',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        {icon || <DefaultIcon className="w-8 h-8 text-muted-foreground/50" />}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[280px]">{description}</p>
    </div>
  );
}

function DefaultIcon({ className }: { className?: string }) {
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
        strokeWidth={1.5}
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export { CanvasEmpty };
export type { CanvasEmptyProps };
