'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SlashCommand {
  /** Command identifier (e.g., "analyze") */
  command: string;
  /** Display label (e.g., "Analyze Promotion") */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon */
  icon?: React.ReactNode;
}

interface SlashCommandMenuProps {
  /** Available commands */
  commands: SlashCommand[];
  /** Whether menu is open */
  isOpen: boolean;
  /** Current filter text (after /) */
  filter: string;
  /** Currently selected index */
  selectedIndex: number;
  /** Called when command is selected */
  onSelect: (command: SlashCommand) => void;
  /** Called when menu should close */
  onClose: () => void;
  /** Called when selected index changes */
  onSelectedIndexChange: (index: number) => void;
  className?: string;
}

/**
 * Slash command popup menu with keyboard navigation.
 * Appears when user types "/" in chat input.
 */
function SlashCommandMenu({
  commands,
  isOpen,
  filter,
  selectedIndex,
  onSelect,
  onClose,
  onSelectedIndexChange,
  className,
}: SlashCommandMenuProps) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const selectedRef = React.useRef<HTMLButtonElement>(null);

  // Filter commands based on input
  const filteredCommands = React.useMemo(() => {
    if (!filter) return commands;
    const lowerFilter = filter.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.command.toLowerCase().includes(lowerFilter) ||
        cmd.label.toLowerCase().includes(lowerFilter)
    );
  }, [commands, filter]);

  // Keep selected index in bounds
  React.useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      onSelectedIndexChange(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex, onSelectedIndexChange]);

  // Scroll selected item into view (within container only, not page)
  React.useEffect(() => {
    if (selectedRef.current) {
      const container = selectedRef.current.closest('[data-radix-scroll-area-viewport]');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedRef.current.getBoundingClientRect();

        if (elementRect.bottom > containerRect.bottom) {
          container.scrollTop += elementRect.bottom - containerRect.bottom + 8;
        } else if (elementRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - elementRect.top + 8;
        }
      }
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          onSelectedIndexChange(
            Math.min(selectedIndex + 1, filteredCommands.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          onSelectedIndexChange(Math.max(selectedIndex - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onSelect(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onSelect, onClose, onSelectedIndexChange]);

  if (!isOpen || filteredCommands.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        'absolute bottom-full left-0 right-0 mb-2',
        'bg-popover border border-border rounded-lg shadow-lg',
        'overflow-hidden z-50',
        className
      )}
    >
      <div className="px-3 py-2 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground">
          Commands {filter && `· "${filter}"`}
        </p>
      </div>
      <ScrollArea className="max-h-[240px]">
        <div className="p-1">
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.command}
              ref={index === selectedIndex ? selectedRef : null}
              type="button"
              onClick={() => onSelect(cmd)}
              className={cn(
                'w-full flex items-start gap-3 px-3 py-2 rounded-md text-left',
                'transition-colors',
                index === selectedIndex
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50'
              )}
            >
              {cmd.icon ? (
                <span className="w-5 h-5 flex-shrink-0 mt-0.5">{cmd.icon}</span>
              ) : (
                <CommandIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">/{cmd.command}</span>
                  <span className="text-sm text-muted-foreground truncate">
                    {cmd.label}
                  </span>
                </div>
                {cmd.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {cmd.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
      <div className="px-3 py-1.5 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground">
          <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">↑↓</kbd> navigate
          <span className="mx-2">·</span>
          <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Enter</kbd> select
          <span className="mx-2">·</span>
          <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Esc</kbd> close
        </p>
      </div>
    </div>
  );
}

function CommandIcon({ className }: { className?: string }) {
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

/**
 * Hook to manage slash command menu state
 */
function useSlashCommands() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const open = React.useCallback((initialFilter: string = '') => {
    setFilter(initialFilter);
    setSelectedIndex(0);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
    setFilter('');
    setSelectedIndex(0);
  }, []);

  const updateFilter = React.useCallback((newFilter: string) => {
    setFilter(newFilter);
    setSelectedIndex(0);
  }, []);

  return {
    isOpen,
    filter,
    selectedIndex,
    setSelectedIndex,
    open,
    close,
    updateFilter,
  };
}

export { SlashCommandMenu, useSlashCommands };
export type { SlashCommand, SlashCommandMenuProps };
