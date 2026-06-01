'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { RiskSuggestion } from '@/lib/demo-data';

interface SuggestionCardProps {
  suggestions: RiskSuggestion[];
  onApply: (suggestionId: string) => void;
  className?: string;
}

/**
 * Interactive suggestion cards for minimizing risk.
 * Each suggestion has an Apply button that updates the promo in real-time.
 */
function SuggestionCard({ suggestions, onApply, className }: SuggestionCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 bg-primary/5 border-b flex items-center gap-2">
        <LightbulbIcon className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium">Suggestions to Reduce Risk</h3>
      </div>

      {/* Suggestions List */}
      <div className="divide-y divide-border">
        {suggestions.map((suggestion) => (
          <SuggestionItem
            key={suggestion.id}
            suggestion={suggestion}
            onApply={() => onApply(suggestion.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface SuggestionItemProps {
  suggestion: RiskSuggestion;
  onApply: () => void;
}

function SuggestionItem({ suggestion, onApply }: SuggestionItemProps) {
  const getCategoryIcon = (category: RiskSuggestion['category']) => {
    switch (category) {
      case 'discount':
        return <PercentIcon className="w-4 h-4" />;
      case 'skus':
        return <BoxIcon className="w-4 h-4" />;
      case 'duration':
        return <ClockIcon className="w-4 h-4" />;
      case 'timing':
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={cn(
        'px-4 py-3 flex items-start gap-3 transition-colors',
        suggestion.applied && 'bg-success/5'
      )}
    >
      {/* Checkbox / Check */}
      <div className="mt-0.5 flex-shrink-0">
        {suggestion.applied ? (
          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
            <CheckIcon className="w-3 h-3 text-success" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded border-2 border-muted-foreground/30" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-muted-foreground">{getCategoryIcon(suggestion.category)}</span>
          <span className="text-sm font-medium">
            {suggestion.suggestion}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Impact: {suggestion.impact}
        </p>
      </div>

      {/* Apply Button */}
      <div className="flex-shrink-0">
        {suggestion.applied ? (
          <span className="text-xs text-success font-medium px-2 py-1">Applied</span>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onApply}
            className="h-7 text-xs"
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  );
}

// Icons

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function PercentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export { SuggestionCard };
