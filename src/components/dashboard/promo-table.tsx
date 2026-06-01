'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PromoSummary } from '@/lib/api-types';

type PromoStatus = 'active' | 'completed' | 'upcoming';

interface PromoTableProps {
  /** Array of promos to display */
  promos: PromoSummary[];
  /** Which columns to show based on promo status */
  variant: 'active' | 'completed';
  /** Optional empty state message */
  emptyMessage?: string;
  className?: string;
}

function deriveStatus(promo: PromoSummary): PromoStatus {
  const now = new Date();
  const start = new Date(promo.start_date);
  const end = new Date(promo.end_date);
  if (now < start) return 'upcoming';
  if (now > end) return 'completed';
  return 'active';
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = end.toLocaleDateString('en-US', { ...options, year: 'numeric' });
  return `${startStr} - ${endStr}`;
}

function formatDiscount(promo: PromoSummary): string {
  if (!promo.promo_type || promo.promo_type === 'percentage_off') {
    return `${promo.promo_value}% off`;
  }
  if (promo.promo_type === 'fixed_amount') {
    return `$${promo.promo_value.toFixed(2)} off`;
  }
  if (promo.promo_type === 'bogo') {
    return promo.promo_value === 100
      ? 'Buy 1 Get 1 Free'
      : `Buy 1 Get 1 ${promo.promo_value}% off`;
  }
  if (promo.promo_type === 'bundle') {
    return `${promo.promo_value}% bundle`;
  }
  return `${promo.promo_value}% off`;
}

/**
 * Reusable promo table component for Dashboard.
 * Supports both active (no metrics) and completed (with metrics) variants.
 */
function PromoTable({
  promos,
  variant,
  emptyMessage = 'No promotions found',
  className,
}: PromoTableProps) {
  const router = useRouter();

  const handleRowClick = (promoId: string) => {
    router.push(`/chat/new?promo_id=${encodeURIComponent(promoId)}&autostart=true`);
  };

  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Promo</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead className="text-center">SKUs</TableHead>
            {variant === 'active' ? (
              <TableHead>Status</TableHead>
            ) : (
              <TableHead className="text-right">Duration</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {promos.length === 0 ? (
            <TableEmpty
              colSpan={6}
              message={emptyMessage}
            />
          ) : (
            promos.map((promo) => {
              const status = deriveStatus(promo);
              const durationDays = Math.ceil(
                (new Date(promo.end_date).getTime() - new Date(promo.start_date).getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1;

              return (
                <TableRow
                  key={promo.promo_id}
                  onClick={() => handleRowClick(promo.promo_id)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">
                        {promo.name || promo.promo_id}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {promo.promo_id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {promo.campaign_id || '-'}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDateRange(promo.start_date, promo.end_date)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="muted" size="sm">
                      {formatDiscount(promo)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" size="sm">
                      {promo.sku_ids.length}
                    </Badge>
                  </TableCell>
                  {variant === 'active' ? (
                    <TableCell>
                      <StatusBadge status={status} />
                    </TableCell>
                  ) : (
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {durationDays}d
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Status badge with appropriate color
 */
function StatusBadge({ status }: { status: PromoStatus }) {
  const variants: Record<PromoStatus, { variant: 'success' | 'warning' | 'muted'; label: string }> = {
    active: { variant: 'success', label: 'Active' },
    upcoming: { variant: 'warning', label: 'Upcoming' },
    completed: { variant: 'muted', label: 'Completed' },
  };

  const { variant, label } = variants[status];

  return (
    <Badge variant={variant} size="sm" dot>
      {label}
    </Badge>
  );
}

export { PromoTable };
export type { PromoTableProps };
