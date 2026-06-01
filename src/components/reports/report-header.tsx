'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { formatDateRange } from '@/lib/report-types';

interface ReportHeaderProps {
  retailerName: string;
  promoName: string;
  promoPeriod: { start: string; end: string };
  generatedAt: string;
  className?: string;
}

/**
 * Report header with logo, retailer name, and report metadata.
 * Designed for print-first display.
 */
function ReportHeader({
  retailerName,
  promoName,
  promoPeriod,
  generatedAt,
  className,
}: ReportHeaderProps) {
  const generatedDate = new Date(generatedAt);
  const formattedGenerated = generatedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className={cn('flex items-start justify-between pb-6 border-b border-border', className)}>
      {/* Logo and title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neon-ice flex items-center justify-center print:bg-[#4FF2E3]">
          <span className="text-onyx font-bold text-xl print:text-black">C</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{retailerName}</h1>
          <p className="text-lg text-muted-foreground">Network Impact Report</p>
        </div>
      </div>

      {/* Metadata */}
      <div className="text-right text-sm">
        <div className="space-y-1">
          <div>
            <span className="text-muted-foreground">Promo: </span>
            <span className="font-medium">{promoName}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Period: </span>
            <span className="font-medium">{formatDateRange(promoPeriod.start, promoPeriod.end)}</span>
          </div>
          <div className="text-muted-foreground text-xs pt-2">
            Generated {formattedGenerated}
          </div>
        </div>
      </div>
    </header>
  );
}

export { ReportHeader };
export type { ReportHeaderProps };
