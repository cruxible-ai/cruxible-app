'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const METRIC_TOOLTIPS: Record<string, string> = {
  'Gross Margin': 'Incremental Revenue - (COGS + Discount Cost) for promo SKUs only. Discount Cost = baseline units \u00D7 price \u00D7 discount %.',
  'Gross Lift': 'Incremental Revenue - (COGS + Discount Cost) for promo SKUs only. Discount Cost = baseline units \u00D7 price \u00D7 discount %.',
  'Cannibalization': 'Lost margin from substitute SKUs that sold fewer units during the promo period.',
  'Halo': 'Gained margin from complement SKUs that sold more units during the promo period.',
  'Halo Effect': 'Gained margin from complement SKUs that sold more units during the promo period.',
  'Net Margin': 'Gross Margin - Cannibalization + Halo. The true portfolio-level profit impact.',
  'Net Impact': 'Gross Margin - Cannibalization + Halo. The true portfolio-level profit impact.',
  'Net Profit': 'Incremental Revenue - Promo Cost.',
  'Incremental Revenue': 'Revenue from extra units sold due to the promo, at the discounted price.',
  'Promo Cost': 'COGS for incremental units + discount foregone on baseline units (units that would have sold at full price).',
};

interface WaterfallBar {
  label: string;
  value: number;
  color: 'positive' | 'negative';
  isTotal?: boolean;
}

interface NetworkEffectItem {
  name: string;
  lift: string;
  impact: string;
}

interface SummaryItem {
  label: string;
  value: string;
  trend: 'positive' | 'negative';
  roi?: string;
}

interface MarginWaterfallData {
  summary: {
    gross_revenue: { value: string; trend: 'positive' | 'negative' };
    promo_cost: { value: string; trend: 'positive' | 'negative' };
    gross_margin: { value: string; trend: 'positive' | 'negative'; roi?: string };
    net_margin: { value: string; trend: 'positive' | 'negative'; roi?: string };
  };
  summary_items?: SummaryItem[];
  waterfall: {
    bars: WaterfallBar[];
  };
  cannibalized_skus?: NetworkEffectItem[];
  halo_skus?: NetworkEffectItem[];
}

interface MarginWaterfallArtifactContentProps {
  data: MarginWaterfallData;
  className?: string;
}

/**
 * Combined KPI + Waterfall chart showing margin breakdown
 */
function MarginWaterfallArtifactContent({
  data,
  className,
}: MarginWaterfallArtifactContentProps) {
  const [expanded, setExpanded] = React.useState(false);

  // Calculate max absolute value for scaling
  const maxValue = Math.max(...data.waterfall.bars.map((b) => Math.abs(b.value)));

  return (
    <div className={cn('space-y-4', className)}>
      {/* KPI Summary */}
      <div className="grid grid-cols-4 gap-3">
        {data.summary_items ? (
          data.summary_items.map((item, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center">
                {item.label}
                {METRIC_TOOLTIPS[item.label] && <InfoTooltip text={METRIC_TOOLTIPS[item.label]} />}
              </p>
              <p
                className={cn(
                  'text-lg font-bold tracking-tight',
                  item.trend === 'positive' && 'text-success',
                  item.trend === 'negative' && 'text-destructive'
                )}
              >
                {item.value}
              </p>
              {item.roi && (
                <p className="text-xs text-muted-foreground">{item.roi} ROI</p>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center">
                Incremental Revenue
                <InfoTooltip text={METRIC_TOOLTIPS['Incremental Revenue']} />
              </p>
              <p
                className={cn(
                  'text-lg font-bold tracking-tight',
                  data.summary.gross_revenue.trend === 'positive' && 'text-success',
                  data.summary.gross_revenue.trend === 'negative' && 'text-destructive'
                )}
              >
                {data.summary.gross_revenue.value}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center">
                Promo Cost
                <InfoTooltip text={METRIC_TOOLTIPS['Promo Cost']} />
              </p>
              <p
                className={cn(
                  'text-lg font-bold tracking-tight',
                  data.summary.promo_cost.trend === 'positive' && 'text-success',
                  data.summary.promo_cost.trend === 'negative' && 'text-destructive'
                )}
              >
                {data.summary.promo_cost.value}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center">
                Gross Margin
                <InfoTooltip text={METRIC_TOOLTIPS['Gross Margin']} />
              </p>
              <p
                className={cn(
                  'text-lg font-bold tracking-tight',
                  data.summary.gross_margin.trend === 'positive' && 'text-success',
                  data.summary.gross_margin.trend === 'negative' && 'text-destructive'
                )}
              >
                {data.summary.gross_margin.value}
              </p>
              {data.summary.gross_margin.roi && (
                <p className="text-xs text-muted-foreground">{data.summary.gross_margin.roi} ROI</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center">
                Net Margin
                <InfoTooltip text={METRIC_TOOLTIPS['Net Margin']} />
              </p>
              <p
                className={cn(
                  'text-lg font-bold tracking-tight',
                  data.summary.net_margin.trend === 'positive' && 'text-success',
                  data.summary.net_margin.trend === 'negative' && 'text-destructive'
                )}
              >
                {data.summary.net_margin.value}
              </p>
              {data.summary.net_margin.roi && (
                <p className="text-xs text-muted-foreground">{data.summary.net_margin.roi} ROI</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Waterfall Chart */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Margin Breakdown</p>
        <div className="space-y-2">
          {data.waterfall.bars.map((bar, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={cn('flex items-center', bar.isTotal && 'font-medium')}>
                  {bar.label}
                  {METRIC_TOOLTIPS[bar.label] && <InfoTooltip text={METRIC_TOOLTIPS[bar.label]} />}
                </span>
                <span
                  className={cn(
                    'font-medium',
                    bar.value >= 0 ? 'text-success' : 'text-destructive'
                  )}
                >
                  {bar.value >= 0 ? '+' : ''}${Math.abs(bar.value).toLocaleString()}
                </span>
              </div>
              <div className="h-5 w-full bg-muted/30 rounded overflow-hidden relative">
                {/* Center line for reference */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                {/* Bar */}
                <div
                  className={cn(
                    'absolute top-0.5 bottom-0.5 rounded',
                    bar.value >= 0 ? 'bg-success' : 'bg-destructive',
                    bar.isTotal && 'opacity-80'
                  )}
                  style={{
                    width: `${(Math.abs(bar.value) / maxValue) * 45}%`,
                    left: bar.value >= 0 ? '50%' : undefined,
                    right: bar.value < 0 ? '50%' : undefined,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Effects (expandable) - shows both halo and cannibalization */}
      {((data.halo_skus && data.halo_skus.length > 0) ||
        (data.cannibalized_skus && data.cannibalized_skus.length > 0)) && (
        <div className="space-y-2 pt-2 border-t border-border/50">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronIcon className={cn('w-3 h-3 transition-transform', expanded && 'rotate-90')} />
            Network Effects ({(data.halo_skus?.length || 0) + (data.cannibalized_skus?.length || 0)})
          </button>
          {expanded && (
            <div className="space-y-2 pl-5">
              {/* Halo products (positive) */}
              {data.halo_skus?.map((sku, index) => (
                <div key={`halo-${index}`} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckIcon className="w-3 h-3 text-success" />
                    {sku.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-success">{sku.lift}</span>
                    <span className="text-success font-medium">{sku.impact}</span>
                  </div>
                </div>
              ))}
              {/* Cannibalized products (negative) */}
              {data.cannibalized_skus?.map((sku, index) => (
                <div key={`cannib-${index}`} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <XIcon className="w-3 h-3 text-destructive" />
                    {sku.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-destructive">{sku.lift}</span>
                    <span className="text-destructive font-medium">{sku.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex items-center group/tip ml-1">
      <svg
        className="w-3 h-3 text-muted-foreground/50 group-hover/tip:text-muted-foreground cursor-help transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
        <path strokeLinecap="round" strokeWidth={2} d="M12 16v-4M12 8h.01" />
      </svg>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 text-[10px] leading-tight font-normal text-popover-foreground bg-popover border border-border rounded shadow-md w-48 opacity-0 pointer-events-none group-hover/tip:opacity-100 group-hover/tip:pointer-events-auto transition-opacity z-50 whitespace-normal">
        {text}
      </span>
    </span>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export { MarginWaterfallArtifactContent };
export type { MarginWaterfallArtifactContentProps, MarginWaterfallData };
