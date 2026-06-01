'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { SimilarPromo } from '@/lib/demo-data';

interface SimilarPromosArtifactContentProps {
  promos: SimilarPromo[];
  className?: string;
}

/**
 * Displays similar promos in a table with similarity and success scores.
 * Used when user asks about creating a new promo.
 */
function SimilarPromosArtifactContent({
  promos,
  className,
}: SimilarPromosArtifactContentProps) {
  return (
    <div className={cn('overflow-auto', className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
              Promo
            </th>
            <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">
              Similarity
            </th>
            <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">
              Success
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
              Discount
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
              Dates
            </th>
            <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground">
              SKUs
            </th>
          </tr>
        </thead>
        <tbody>
          {promos.map((promo, index) => (
            <tr
              key={promo.promo_id}
              className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-3 py-2.5">
                <div>
                  <span className="font-medium">{promo.name}</span>
                  {promo.category && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {promo.category}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-3 py-2.5 text-center">
                <ScoreBadge score={promo.similarity_score} type="similarity" />
              </td>
              <td className="px-3 py-2.5 text-center">
                <ScoreBadge score={promo.success_score} type="success" />
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">
                {promo.discount}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                {promo.date_range}
              </td>
              <td className="px-3 py-2.5 text-center text-muted-foreground">
                {promo.sku_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ScoreBadgeProps {
  score: number;
  type: 'similarity' | 'success';
}

function ScoreBadge({ score, type }: ScoreBadgeProps) {
  const getColorClass = (score: number, type: 'similarity' | 'success') => {
    if (type === 'similarity') {
      // Higher similarity = more blue/purple
      if (score >= 8) return 'bg-primary/20 text-primary border-primary/30';
      if (score >= 6) return 'bg-primary/10 text-primary/80 border-primary/20';
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
    } else {
      // Success: green gradient
      if (score >= 8) return 'bg-success/20 text-success border-success/30';
      if (score >= 6) return 'bg-success/10 text-success/80 border-success/20';
      if (score >= 4) return 'bg-warning/10 text-warning border-warning/20';
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium border',
        getColorClass(score, type)
      )}
    >
      {score}/10
    </span>
  );
}

export { SimilarPromosArtifactContent };
export type { SimilarPromosArtifactContentProps };
