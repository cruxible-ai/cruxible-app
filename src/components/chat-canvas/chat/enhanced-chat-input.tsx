'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SlashCommandMenu, useSlashCommands } from './slash-command-menu';
import { EntityPicker, useEntityPicker } from './entity-picker';
import { COMMAND_FORMS } from './command-forms';
import type { SlashCommand } from '@/lib/slash-commands';
import type { Entity, EntityType } from './entity-picker';

// Textarea auto-resize constraints
const TEXTAREA_MAX_HEIGHT_PX = 200;

interface EnhancedChatInputProps {
  /** Called when user sends a message */
  onSend: (content: string, mentions?: Entity[]) => void;
  /** Called when a slash command form is submitted (bypasses LLM) */
  onCommandSubmit?: (request: { intent_type: string; entities: Record<string, unknown>; raw_query?: string }) => void;
  /** Called when a slash command is selected */
  onSlashCommand?: (command: SlashCommand) => void;
  /** Available slash commands */
  commands?: SlashCommand[];
  /** Available entities for @ mentions */
  availableEntities?: {
    promos: Entity[];
    skus: Entity[];
    campaigns: Entity[];
  };
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
 * Enhanced chat input with slash command and entity mention support.
 *
 * Features:
 * - Auto-resize as user types (up to max height)
 * - Send on Enter (Shift+Enter for newline)
 * - "/" trigger shows SlashCommandMenu
 * - "@" trigger shows EntityPicker
 * - Parses entity mentions on submit
 */
function EnhancedChatInput({
  onSend,
  onCommandSubmit,
  onSlashCommand,
  commands = [],
  availableEntities,
  disabled = false,
  placeholder = 'Type your message...',
  isStreaming = false,
  onAbort,
  maxLength,
  className,
}: EnhancedChatInputProps) {
  const [value, setValue] = React.useState('');
  const [mentions, setMentions] = React.useState<Entity[]>([]);
  const [activeCommand, setActiveCommand] = React.useState<string | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Slash command state
  const slashCommands = useSlashCommands();

  // Entity picker state
  const entityPicker = useEntityPicker();

  // Track cursor position for @ trigger
  const [atTriggerPos, setAtTriggerPos] = React.useState<number | null>(null);

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, TEXTAREA_MAX_HEIGHT_PX)}px`;
    }
  }, [value]);

  // Handle input change - detect / and @ triggers
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const cursorPos = e.target.selectionStart;

      setValue(newValue);

      // Detect slash command trigger at start of input or after newline
      if (newValue === '/' || (newValue.endsWith('/') && (newValue.length === 1 || newValue[newValue.length - 2] === '\n'))) {
        slashCommands.open();
        entityPicker.close();
        return;
      }

      // Update slash command filter if menu is open
      if (slashCommands.isOpen) {
        const lastSlashIndex = newValue.lastIndexOf('/');
        if (lastSlashIndex !== -1) {
          const filterText = newValue.slice(lastSlashIndex + 1);
          // Close menu if user types space or newline
          if (filterText.includes(' ') || filterText.includes('\n')) {
            slashCommands.close();
          } else {
            slashCommands.updateFilter(filterText);
          }
        } else {
          slashCommands.close();
        }
      }

      // Detect @ trigger
      const lastAtIndex = newValue.lastIndexOf('@');
      if (lastAtIndex !== -1 && (lastAtIndex === 0 || /\s/.test(newValue[lastAtIndex - 1]))) {
        const textAfterAt = newValue.slice(lastAtIndex + 1);
        // Only trigger if no space after @ or very recent @
        if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
          if (!entityPicker.isOpen) {
            setAtTriggerPos(lastAtIndex);
            entityPicker.open('promo'); // Default to promo picker
            slashCommands.close();
          }
          entityPicker.setFilter(textAfterAt);
        } else if (entityPicker.isOpen) {
          entityPicker.close();
          setAtTriggerPos(null);
        }
      } else if (entityPicker.isOpen && atTriggerPos !== null) {
        // Check if @ was deleted
        if (!newValue.includes('@')) {
          entityPicker.close();
          setAtTriggerPos(null);
        }
      }
    },
    [slashCommands, entityPicker, atTriggerPos]
  );

  // Handle slash command selection
  const handleSlashCommandSelect = React.useCallback(
    (command: SlashCommand) => {
      slashCommands.close();
      setValue(''); // Clear input

      // Check if this command has a form
      if (COMMAND_FORMS[command.command]) {
        setActiveCommand(command.command);
      } else {
        // No form - just notify parent
        if (onSlashCommand) {
          onSlashCommand(command);
        }
        textareaRef.current?.focus();
      }
    },
    [slashCommands, onSlashCommand]
  );

  // Handle command form submission
  const handleCommandFormSubmit = React.useCallback(
    (request: { intent_type: string; entities: Record<string, unknown>; raw_query?: string }) => {
      setActiveCommand(null);
      if (onCommandSubmit) {
        onCommandSubmit(request);
      }
      textareaRef.current?.focus();
    },
    [onCommandSubmit]
  );

  // Handle command form cancel
  const handleCommandFormCancel = React.useCallback(() => {
    setActiveCommand(null);
    textareaRef.current?.focus();
  }, []);

  // Handle entity selection
  const handleEntitySelect = React.useCallback(
    (entity: Entity) => {
      if (atTriggerPos !== null) {
        // Replace @filter with @EntityName
        const beforeAt = value.slice(0, atTriggerPos);
        const afterFilter = value.slice(atTriggerPos).replace(/@[^\s]*/, '');
        const newValue = `${beforeAt}@${entity.label}${afterFilter}`;
        setValue(newValue);

        // Track the mention
        setMentions((prev) => [...prev.filter((m) => m.id !== entity.id), entity]);
      }

      entityPicker.close();
      setAtTriggerPos(null);

      // Focus back on textarea
      textareaRef.current?.focus();
    },
    [value, atTriggerPos, entityPicker]
  );

  // Handle send
  const handleSend = React.useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && !disabled && !isStreaming) {
      onSend(trimmed, mentions.length > 0 ? mentions : undefined);
      setValue('');
      setMentions([]);
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [value, disabled, isStreaming, onSend, mentions]);

  // Handle keydown
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Let the menus handle their own keyboard events
      if (slashCommands.isOpen || entityPicker.isOpen) {
        if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
          return; // Let the menu handle these
        }
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend, slashCommands.isOpen, entityPicker.isOpen]
  );

  // Get entities for picker based on type
  const getEntitiesForType = (type: EntityType): Entity[] => {
    if (!availableEntities) return [];
    switch (type) {
      case 'promo':
        return availableEntities.promos;
      case 'sku':
        return availableEntities.skus;
      case 'campaign':
        return availableEntities.campaigns;
      default:
        return [];
    }
  };

  const canSend = value.trim().length > 0 && !disabled && !isStreaming;

  // Get active command form component
  const ActiveCommandForm = activeCommand ? COMMAND_FORMS[activeCommand] : null;

  return (
    <div ref={containerRef} className={cn('bg-background relative', className)}>
      {/* Command Form (deterministic path - no LLM) */}
      {ActiveCommandForm && (
        <div className="mb-2">
          <ActiveCommandForm
            onSubmit={handleCommandFormSubmit}
            onCancel={handleCommandFormCancel}
          />
        </div>
      )}

      {/* Slash Command Menu */}
      <SlashCommandMenu
        commands={commands}
        isOpen={slashCommands.isOpen && !activeCommand}
        filter={slashCommands.filter}
        selectedIndex={slashCommands.selectedIndex}
        onSelect={handleSlashCommandSelect}
        onClose={slashCommands.close}
        onSelectedIndexChange={slashCommands.setSelectedIndex}
      />

      {/* Entity Picker */}
      <EntityPicker
        entityType={entityPicker.entityType}
        entities={getEntitiesForType(entityPicker.entityType)}
        isOpen={entityPicker.isOpen}
        filter={entityPicker.filter}
        selectedIndex={entityPicker.selectedIndex}
        onSelect={handleEntitySelect}
        onClose={() => {
          entityPicker.close();
          setAtTriggerPos(null);
        }}
        onSelectedIndexChange={entityPicker.setSelectedIndex}
        onFilterChange={entityPicker.setFilter}
      />

      {/* Input area */}
      <div className="flex items-end gap-2 rounded-2xl bg-background p-2 ring-1 ring-[#A4A6AA]/50 transition-all focus-within:ring-[#A4A6AA]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
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

      {/* Footer hints */}
      <div className="flex justify-between items-center mt-2 px-2">
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground/60">/</span> commands
          <span className="mx-2">·</span>
          <span className="text-foreground/60">@</span> mention
          <span className="mx-2">·</span>
          Enter to send
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
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

export { EnhancedChatInput };
export type { EnhancedChatInputProps };
