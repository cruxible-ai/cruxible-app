'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type EntityType = 'sku' | 'promo' | 'campaign';

interface Entity {
  /** Unique identifier */
  id: string;
  /** Display name */
  label: string;
  /** Additional info (dates, etc.) */
  description?: string;
  /** Entity type */
  type: EntityType;
}

interface EntityPickerProps {
  /** Type of entity being picked */
  entityType: EntityType;
  /** Available entities */
  entities: Entity[];
  /** Whether picker is open */
  isOpen: boolean;
  /** Current search/filter text */
  filter: string;
  /** Currently selected index */
  selectedIndex: number;
  /** Called when entity is selected */
  onSelect: (entity: Entity) => void;
  /** Called when picker should close */
  onClose: () => void;
  /** Called when selected index changes */
  onSelectedIndexChange: (index: number) => void;
  /** Called when filter changes */
  onFilterChange: (filter: string) => void;
  className?: string;
}

const entityLabels: Record<EntityType, string> = {
  sku: 'SKUs',
  promo: 'Promotions',
  campaign: 'Campaigns',
};

const entityIcons: Record<EntityType, React.FC<{ className?: string }>> = {
  sku: SKUIcon,
  promo: PromoIcon,
  campaign: CampaignIcon,
};

/**
 * Entity picker popup for selecting SKUs, Promos, or Campaigns.
 * Keyboard navigable with search filtering.
 */
function EntityPicker({
  entityType,
  entities,
  isOpen,
  filter,
  selectedIndex,
  onSelect,
  onClose,
  onSelectedIndexChange,
  onFilterChange,
  className,
}: EntityPickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const selectedRef = React.useRef<HTMLButtonElement>(null);

  // Filter entities based on search
  const filteredEntities = React.useMemo(() => {
    if (!filter) return entities;
    const lowerFilter = filter.toLowerCase();
    return entities.filter(
      (entity) =>
        entity.id.toLowerCase().includes(lowerFilter) ||
        entity.label.toLowerCase().includes(lowerFilter) ||
        entity.description?.toLowerCase().includes(lowerFilter)
    );
  }, [entities, filter]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keep selected index in bounds
  React.useEffect(() => {
    if (selectedIndex >= filteredEntities.length) {
      onSelectedIndexChange(Math.max(0, filteredEntities.length - 1));
    }
  }, [filteredEntities.length, selectedIndex, onSelectedIndexChange]);

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
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          onSelectedIndexChange(
            Math.min(selectedIndex + 1, filteredEntities.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          onSelectedIndexChange(Math.max(selectedIndex - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredEntities[selectedIndex]) {
            onSelect(filteredEntities[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [selectedIndex, filteredEntities, onSelect, onClose, onSelectedIndexChange]
  );

  if (!isOpen) return null;

  const Icon = entityIcons[entityType];

  return (
    <div
      className={cn(
        'absolute bottom-full left-0 right-0 mb-2',
        'bg-popover border border-border rounded-lg shadow-lg',
        'overflow-hidden z-50',
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {/* Header with search */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium">Select {entityLabels[entityType]}</p>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder={`Search ${entityLabels[entityType].toLowerCase()}...`}
          className={cn(
            'w-full px-3 py-1.5 rounded-md',
            'text-sm bg-muted/50 border border-input',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring'
          )}
        />
      </div>

      {/* Entity list */}
      <ScrollArea className="max-h-[240px]">
        <div className="p-1">
          {filteredEntities.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground text-center">
              No {entityLabels[entityType].toLowerCase()} found
            </p>
          ) : (
            filteredEntities.map((entity, index) => (
              <button
                key={entity.id}
                ref={index === selectedIndex ? selectedRef : null}
                type="button"
                onClick={() => onSelect(entity)}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 rounded-md text-left',
                  'transition-colors',
                  index === selectedIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{entity.label}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {entity.id}
                    </span>
                  </div>
                  {entity.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {entity.description}
                    </p>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
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

// Entity type icons
function SKUIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function PromoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  );
}

function CampaignIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

/**
 * Hook to manage entity picker state
 */
function useEntityPicker() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [entityType, setEntityType] = React.useState<EntityType>('sku');
  const [filter, setFilter] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const open = React.useCallback((type: EntityType) => {
    setEntityType(type);
    setFilter('');
    setSelectedIndex(0);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
    setFilter('');
    setSelectedIndex(0);
  }, []);

  return {
    isOpen,
    entityType,
    filter,
    selectedIndex,
    setFilter,
    setSelectedIndex,
    open,
    close,
  };
}

export { EntityPicker, useEntityPicker };
export type { Entity, EntityType, EntityPickerProps };
