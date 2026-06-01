'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { NewPromo } from '@/lib/types/promo';

interface NewPromoCardProps {
  promo: NewPromo;
  className?: string;
  /** Status of the promo: draft (editable), approved (submitted), passed (discarded) */
  status?: 'draft' | 'approved' | 'passed';
  /** Callback when user approves the promo */
  onApprove?: () => void;
  /** Callback when user passes on the promo */
  onPass?: () => void;
}

/**
 * Displays a draft promo being created with real-time updates.
 */
function NewPromoCard({ promo, className, status = 'draft', onApprove, onPass }: NewPromoCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDiscount = () => {
    switch (promo.discount_type) {
      case 'percentage_off':
        return `${promo.discount_value}% off`;
      case 'fixed_amount':
        return `$${promo.discount_value} off`;
      case 'bogo':
        return 'Buy One Get One';
      default:
        return `${promo.discount_value}% off`;
    }
  };

  const dateRange = `${formatDate(promo.start_date)} - ${formatDate(promo.end_date)}`;

  // Use SKU IDs directly as product names (no product lookup available)
  const skuNames = promo.sku_ids.join(', ');

  // Calculate duration
  const start = new Date(promo.start_date);
  const end = new Date(promo.end_date);
  const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Get status-specific styling
  const getStatusStyles = () => {
    switch (status) {
      case 'approved':
        return {
          border: 'border-success/40',
          iconBg: 'bg-success/10',
          iconColor: 'text-success',
          icon: <ApproveIcon className="w-4 h-4" />,
          badgeBg: 'bg-success/10',
          badgeText: 'text-success',
          badgeBorder: 'border-success/20',
          badgeLabel: 'Submitted',
          subtitle: 'Awaiting Admin Approval',
        };
      case 'passed':
        return {
          border: 'border-muted-foreground/30',
          iconBg: 'bg-muted',
          iconColor: 'text-muted-foreground',
          icon: <PassIcon className="w-4 h-4" />,
          badgeBg: 'bg-muted',
          badgeText: 'text-muted-foreground',
          badgeBorder: 'border-muted-foreground/20',
          badgeLabel: 'Passed',
          subtitle: 'Draft Discarded',
        };
      default:
        return {
          border: 'border-primary/40',
          iconBg: 'bg-warning/10',
          iconColor: 'text-warning',
          icon: <DraftIcon className="w-4 h-4" />,
          badgeBg: 'bg-warning/10',
          badgeText: 'text-warning',
          badgeBorder: 'border-warning/20',
          badgeLabel: 'Draft',
          subtitle: 'New Promotion',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={cn('rounded-lg border-2 border-dashed bg-card p-4', styles.border, className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', styles.iconBg)}>
          <span className={styles.iconColor}>{styles.icon}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{promo.name}</h3>
            <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', styles.badgeBg, styles.badgeText, styles.badgeBorder)}>
              {styles.badgeLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{styles.subtitle}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Discount */}
        <DetailItem
          icon={<PercentIcon className="w-3.5 h-3.5" />}
          label="Discount"
          value={formatDiscount()}
        />

        {/* Dates */}
        <DetailItem
          icon={<CalendarIcon className="w-3.5 h-3.5" />}
          label="Dates"
          value={dateRange}
        />

        {/* SKU Count */}
        <DetailItem
          icon={<BoxIcon className="w-3.5 h-3.5" />}
          label="Products"
          value={`${promo.sku_ids.length} SKU${promo.sku_ids.length !== 1 ? 's' : ''}`}
        />

        {/* Duration */}
        <DetailItem
          icon={<ClockIcon className="w-3.5 h-3.5" />}
          label="Duration"
          value={`${durationDays} day${durationDays !== 1 ? 's' : ''}`}
        />
      </div>

      {/* SKU List */}
      <div className="mb-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground mb-1">Products:</p>
        <p className="text-xs">{skuNames}</p>
      </div>

      {/* Projections */}
      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Projections:</p>
        <div className="flex items-center gap-6 text-sm flex-wrap">
          <div>
            <span className="text-muted-foreground">Est. Lift:</span>{' '}
            <span className="font-medium text-success">+{(promo.estimated_lift * 100).toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Est. ROI:</span>{' '}
            <span className="font-medium">{promo.estimated_roi.toFixed(1)}x</span>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue:</span>{' '}
            <span className="font-medium">${promo.estimated_revenue.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Net Margin:</span>{' '}
            <span className={cn('font-medium', promo.estimated_net_margin >= 0 ? 'text-success' : 'text-destructive')}>
              {promo.estimated_net_margin >= 0 ? '+' : ''}${promo.estimated_net_margin.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons - only show when draft */}
      {status === 'draft' && (onApprove || onPass) && (
        <div className="pt-4 mt-4 border-t border-border flex gap-3">
          {onApprove && (
            <button
              onClick={onApprove}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-success/10 text-success hover:bg-success/20 border border-success/30 transition-colors font-medium text-sm"
            >
              <ApproveIcon className="w-4 h-4" />
              Approve
            </button>
          )}
          {onPass && (
            <button
              onClick={onPass}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted hover:bg-muted/80 border border-border transition-colors font-medium text-sm text-muted-foreground"
            >
              <PassIcon className="w-4 h-4" />
              Pass
            </button>
          )}
        </div>
      )}
    </div>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}

// Icons

function DraftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ApproveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export { NewPromoCard };
