'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarPickerProps {
  /** Whether picker is open */
  isOpen: boolean;
  /** Currently selected date */
  selectedDate?: Date;
  /** Called when date is selected */
  onSelect: (date: Date) => void;
  /** Called when picker should close */
  onClose: () => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  className?: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Calendar date picker popup.
 * Simple month view with navigation.
 */
function CalendarPicker({
  isOpen,
  selectedDate,
  onSelect,
  onClose,
  minDate,
  maxDate,
  className,
}: CalendarPickerProps) {
  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());

  // Reset view when opened
  React.useEffect(() => {
    if (isOpen) {
      setViewDate(selectedDate || new Date());
    }
  }, [isOpen, selectedDate]);

  // Handle keyboard
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Navigation
  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Check if date is selectable
  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  // Check if date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (!isOpen) return null;

  // Generate calendar grid
  const days: (Date | null)[] = [];

  // Empty cells before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return (
    <div
      className={cn(
        'absolute bottom-full left-0 mb-2',
        'bg-popover border border-border rounded-lg shadow-lg',
        'overflow-hidden z-50 w-[280px]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={prevMonth}
          className="h-7 w-7"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {MONTHS[month]} {year}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={nextMonth}
          className="h-7 w-7"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="p-2">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div key={index} className="h-8">
              {date && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isDateDisabled(date)) {
                      onSelect(date);
                    }
                  }}
                  disabled={isDateDisabled(date)}
                  className={cn(
                    'w-full h-full rounded-md text-sm',
                    'transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isDateSelected(date)
                      ? 'bg-primary text-primary-foreground'
                      : isToday(date)
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50',
                    isDateDisabled(date) && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {date.getDate()}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-border bg-muted/30 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            if (!isDateDisabled(today)) {
              onSelect(today);
            }
          }}
        >
          Today
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Hook to manage calendar picker state
 */
function useCalendarPicker() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const select = React.useCallback((date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    selectedDate,
    open,
    close,
    select,
  };
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export { CalendarPicker, useCalendarPicker, formatDate };
export type { CalendarPickerProps };
