'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface KPIItem {
  label: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  change?: string;
}

interface KPIArtifactContentProps {
  /** Array of KPIs to display */
  kpis: KPIItem[];
  /** Layout style */
  layout?: 'row' | 'grid';
  className?: string;
}

/**
 * Displays KPI metrics inside an artifact.
 * Compact version of KPIGrid for canvas display.
 */
function KPIArtifactContent({
  kpis,
  layout = 'grid',
  className,
}: KPIArtifactContentProps) {
  return (
    <div
      className={cn(
        layout === 'grid'
          ? 'grid grid-cols-2 gap-4'
          : 'flex flex-wrap gap-6',
        className
      )}
    >
      {kpis.map((kpi, index) => (
        <KPIItem key={index} {...kpi} />
      ))}
    </div>
  );
}

function KPIItem({ label, value, trend, change }: KPIItem) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={cn(
          'text-2xl font-bold tracking-tight',
          trend === 'positive' && 'text-success',
          trend === 'negative' && 'text-destructive'
        )}
      >
        {formatValue(value)}
      </p>
      {change && (
        <p
          className={cn(
            'text-xs',
            trend === 'positive' && 'text-success',
            trend === 'negative' && 'text-destructive',
            trend === 'neutral' && 'text-muted-foreground',
            !trend && 'text-muted-foreground'
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}

function formatValue(value: string | number): string {
  if (typeof value === 'number') {
    // Format large numbers with commas
    if (Math.abs(value) >= 1000) {
      return value.toLocaleString();
    }
    // Format percentages or small numbers
    return value.toString();
  }
  return value;
}

export { KPIArtifactContent };
export type { KPIArtifactContentProps, KPIItem };
