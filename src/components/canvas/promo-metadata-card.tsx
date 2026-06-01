'use client';

import * as React from 'react';
import type { PromoWithProducts } from '@/lib/demo-data';
import { formatDiscount } from '@/lib/demo-data';
import { SkuCard } from './sku-card';
import { KPIArtifactContent } from '@/components/chat-canvas/canvas/kpi-artifact';
import { ChartArtifactContent } from '@/components/chat-canvas/canvas/chart-artifact';
import { TableArtifactContent } from '@/components/chat-canvas/canvas/table-artifact';
import { GraphArtifactContent } from '@/components/chat-canvas/canvas/graph-artifact';
import { MarginWaterfallArtifactContent } from '@/components/chat-canvas/canvas/margin-waterfall-artifact';
import type { AnalysisArtifact, KPIData, ChartData, TableData, GraphData, MarginWaterfallData } from '@/hooks/use-promo-analysis';

interface PromoMetadataCardProps {
  promo: PromoWithProducts;
  /** Promo-level artifacts */
  promoArtifacts?: AnalysisArtifact[];
  /** Per-SKU artifacts */
  skuArtifacts?: Record<string, AnalysisArtifact[]>;
  /** Callback when clear is clicked */
  onClear?: () => void;
}

/**
 * Clean metadata card showing key promo information with optional artifacts
 * Merged version that combines promo metadata + artifact display
 */
function PromoMetadataCard({
  promo,
  promoArtifacts = [],
  skuArtifacts = {},
  onClear,
}: PromoMetadataCardProps) {
  // Track which SKUs are expanded
  const [skuExpansion, setSkuExpansion] = React.useState<Record<string, boolean>>({});

  // Auto-expand SKUs when they get new artifacts
  React.useEffect(() => {
    const skusWithArtifacts = Object.keys(skuArtifacts).filter(
      (skuId) => skuArtifacts[skuId]?.length > 0
    );
    if (skusWithArtifacts.length > 0) {
      setSkuExpansion((prev) => {
        const updates: Record<string, boolean> = {};
        for (const skuId of skusWithArtifacts) {
          if (!prev[skuId]) {
            updates[skuId] = true;
          }
        }
        if (Object.keys(updates).length === 0) return prev;
        return { ...prev, ...updates };
      });
    }
  }, [skuArtifacts]);

  const handleSkuToggle = (skuId: string) => {
    setSkuExpansion((prev) => ({
      ...prev,
      [skuId]: !prev[skuId],
    }));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDiscountDisplay = () => {
    switch (promo.promo_type) {
      case 'percentage_off':
        return `${promo.promo_value}% off`;
      case 'fixed_amount':
        return `$${promo.promo_value} off`;
      case 'bogo':
        return 'Buy One Get One';
      case 'bundle':
        return `Bundle: $${promo.promo_value}`;
      default:
        return `${promo.promo_value}% off`;
    }
  };

  const dateRange = `${formatDate(promo.start_date)} - ${formatDate(promo.end_date)}`;
  const hasArtifacts = promoArtifacts.length > 0 || Object.keys(skuArtifacts).some(k => skuArtifacts[k]?.length > 0);

  return (
    <div className="rounded-lg border-2 border-primary/20 bg-card overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TagIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{promo.name || promo.promo_id}</h3>
              {promo.campaign_name && (
                <p className="text-xs text-muted-foreground">{promo.campaign_name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={promo.status} />
            {onClear && hasArtifacts && (
              <button
                type="button"
                onClick={onClear}
                className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors print:hidden"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Discount */}
          <MetadataItem
            icon={<PercentIcon className="w-3.5 h-3.5" />}
            label="Discount"
            value={formatDiscountDisplay()}
          />

          {/* Dates */}
          <MetadataItem
            icon={<CalendarIcon className="w-3.5 h-3.5" />}
            label="Dates"
            value={dateRange}
          />

          {/* SKU Count */}
          <MetadataItem
            icon={<BoxIcon className="w-3.5 h-3.5" />}
            label="Products"
            value={`${promo.sku_ids.length} SKU${promo.sku_ids.length !== 1 ? 's' : ''}`}
          />

          {/* Duration */}
          <MetadataItem
            icon={<ClockIcon className="w-3.5 h-3.5" />}
            label="Duration"
            value={calculateDuration(promo.start_date, promo.end_date)}
          />
        </div>

        {/* SKU List (brief) - only if no artifacts */}
        {!hasArtifacts && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Products in Promo:</p>
            <p className="text-xs">{promo.products.map(p => p.name).join(', ')}</p>
          </div>
        )}
      </div>

      {/* Promo-level Artifacts */}
      {promoArtifacts.length > 0 && (
        <div className="px-4 pb-4 space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Promo Analysis
          </h4>
          {promoArtifacts.map((artifact) => (
            <div key={artifact.id} className="border rounded-lg bg-background overflow-hidden">
              <div className="px-3 py-2 bg-muted/30 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{artifact.title}</span>
                  {artifact.agentName && (
                    <span className="text-xs text-muted-foreground">
                      from {artifact.agentName}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3">
                <ArtifactContent artifact={artifact} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SKU Breakdown (with artifacts) */}
      {hasArtifacts && (
        <div className="px-4 pb-4 space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            SKU Breakdown
          </h4>
          <div className="space-y-2">
            {promo.products.map((product) => {
              const skuResult = promo.sku_results?.[product.sku_id];
              const artifacts = skuArtifacts[product.sku_id] || [];
              const isOverride = promo.sku_overrides?.[product.sku_id] !== undefined;
              const discount = formatDiscount(promo, product.sku_id);

              return (
                <SkuCard
                  key={product.sku_id}
                  product={product}
                  result={skuResult}
                  discount={discount}
                  isOverride={isOverride}
                  artifacts={artifacts}
                  isExpanded={skuExpansion[product.sku_id] || false}
                  onToggle={() => handleSkuToggle(product.sku_id)}
                  forceExpanded={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    active: 'bg-success/10 text-success border-success/20',
    completed: 'bg-muted text-muted-foreground border-muted-foreground/20',
    upcoming: 'bg-warning/10 text-warning border-warning/20',
  };

  const colorClass = colors[status as keyof typeof colors] || colors.completed;

  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${colorClass} capitalize`}>
      {status}
    </span>
  );
}

/**
 * Render artifact content based on type
 */
function ArtifactContent({ artifact }: { artifact: AnalysisArtifact }) {
  switch (artifact.type) {
    case 'kpi': {
      const kpiData = artifact.data as KPIData;
      return <KPIArtifactContent kpis={kpiData.items} />;
    }
    case 'chart': {
      const chartData = artifact.data as ChartData;
      return <ChartArtifactContent figure={{ data: chartData.data, layout: chartData.layout }} />;
    }
    case 'table': {
      const tableData = artifact.data as TableData;
      const columns = tableData.columns.map((col) => ({
        key: col,
        label: col,
      }));
      return <TableArtifactContent columns={columns} rows={tableData.rows} />;
    }
    case 'graph': {
      const graphData = artifact.data as GraphData;
      return <GraphArtifactContent graph={graphData} height={350} />;
    }
    case 'margin-waterfall': {
      const marginData = artifact.data as MarginWaterfallData;
      return <MarginWaterfallArtifactContent data={marginData} />;
    }
    default:
      return null;
  }
}

function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${days} day${days !== 1 ? 's' : ''}`;
}

// Icons

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export { PromoMetadataCard };
