'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Entity } from '@/components/chat-canvas/chat/entity-picker';

interface EmptyPromoCanvasProps {
  /** Available promos to select from */
  promos: Entity[];
  /** Called when a promo is selected */
  onSelectPromo: (promoId: string) => void;
}

/**
 * Empty state canvas shown when no promo is selected.
 * Allows user to pick a promo to start analysis.
 */
function EmptyPromoCanvas({ promos, onSelectPromo }: EmptyPromoCanvasProps) {
  const [filter, setFilter] = React.useState('');

  const filteredPromos = React.useMemo(() => {
    if (!filter) return promos;
    const lowerFilter = filter.toLowerCase();
    return promos.filter(
      (p) =>
        p.label.toLowerCase().includes(lowerFilter) ||
        p.id.toLowerCase().includes(lowerFilter) ||
        p.description?.toLowerCase().includes(lowerFilter)
    );
  }, [promos, filter]);

  // Group promos by status (recent, active, completed - simulated)
  const recentPromos = filteredPromos.slice(0, 3);
  const otherPromos = filteredPromos.slice(3);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b bg-background/50">
        <h2 className="text-sm font-medium">Audit Canvas</h2>
        <p className="text-xs text-muted-foreground">Select a promotion to begin</p>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Hero section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-neon-ice/10 flex items-center justify-center mx-auto mb-4">
              <PromoIcon className="w-8 h-8 text-neon-ice" />
            </div>
            <h3 className="text-lg font-medium mb-2">Select a Promotion</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Choose a promotion to analyze, or use <span className="text-neon-ice">@mention</span> in the chat to select one.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search promotions..."
              className={cn(
                'w-full px-4 py-2.5 rounded-lg',
                'text-sm bg-muted/50 border border-input',
                'placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-neon-ice/50 focus:border-neon-ice/50'
              )}
            />
          </div>

          {/* Recent promos */}
          {recentPromos.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Recent Promotions
              </h4>
              <div className="space-y-2">
                {recentPromos.map((promo) => (
                  <PromoCard
                    key={promo.id}
                    promo={promo}
                    onSelect={() => onSelectPromo(promo.id)}
                    featured
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other promos */}
          {otherPromos.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                All Promotions
              </h4>
              <div className="space-y-2">
                {otherPromos.map((promo) => (
                  <PromoCard
                    key={promo.id}
                    promo={promo}
                    onSelect={() => onSelectPromo(promo.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredPromos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No promotions found matching "{filter}"
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface PromoCardProps {
  promo: Entity;
  onSelect: () => void;
  featured?: boolean;
}

function PromoCard({ promo, onSelect, featured }: PromoCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 rounded-lg border transition-all',
        'hover:border-neon-ice/50 hover:bg-neon-ice/5',
        featured
          ? 'border-border bg-card'
          : 'border-border/50 bg-background'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
          featured ? 'bg-neon-ice/10' : 'bg-muted'
        )}>
          <PromoIcon className={cn(
            'w-5 h-5',
            featured ? 'text-neon-ice' : 'text-muted-foreground'
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{promo.label}</span>
            {featured && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neon-ice/10 text-neon-ice font-medium">
                Recent
              </span>
            )}
          </div>
          {promo.description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {promo.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground/60 font-mono mt-1">
            {promo.id}
          </p>
        </div>
        <ArrowIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}

function PromoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export { EmptyPromoCanvas };
