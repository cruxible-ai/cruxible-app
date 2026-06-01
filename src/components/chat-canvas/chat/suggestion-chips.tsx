'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Suggestion {
  id: string;
  /** Button text */
  label: string;
  /** Full prompt to insert/send (defaults to label) */
  prompt?: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

interface SuggestionChipsProps {
  /** Array of suggestions to display */
  suggestions: Suggestion[];
  /** Called when user clicks a suggestion */
  onSelect: (suggestion: Suggestion) => void;
  /** Disable all chips */
  disabled?: boolean;
  className?: string;
}

/**
 * Horizontal row of suggestion chips above chat input.
 * Quick actions for common queries.
 */
function SuggestionChips({
  suggestions,
  onSelect,
  disabled = false,
  className,
}: SuggestionChipsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted',
        className
      )}
    >
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
            'text-sm font-medium whitespace-nowrap',
            'bg-muted/50 text-foreground',
            'border border-border/50',
            'hover:bg-muted hover:border-border',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {suggestion.icon && (
            <span className="w-4 h-4 flex-shrink-0">{suggestion.icon}</span>
          )}
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}

export { SuggestionChips };
export type { Suggestion, SuggestionChipsProps };
