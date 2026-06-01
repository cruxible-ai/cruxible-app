'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  type PromoWithProducts,
  type SkuResult,
  formatDiscount,
  formatPercent,
  formatROI,
  formatCurrency,
  formatDateRange,
  getDurationDays,
  formatPromoType,
  getSkuDiscount,
} from '@/lib/demo-data';
import { SkuCard } from './sku-card';
import { KPIArtifactContent } from '@/components/chat-canvas/canvas/kpi-artifact';
import { ChartArtifactContent } from '@/components/chat-canvas/canvas/chart-artifact';
import { TableArtifactContent } from '@/components/chat-canvas/canvas/table-artifact';
import { GraphArtifactContent } from '@/components/chat-canvas/canvas/graph-artifact';
import { MarginWaterfallArtifactContent } from '@/components/chat-canvas/canvas/margin-waterfall-artifact';
import type { AnalysisArtifact, KPIData, ChartData, TableData, GraphData, MarginWaterfallData } from '@/hooks/use-promo-analysis';

export type PromoExpansionState = 'collapsed' | 'partial' | 'full';

interface PromoCardProps {
  promo: PromoWithProducts;
  promoArtifacts: AnalysisArtifact[]; // Promo-level artifacts
  skuArtifacts: Record<string, AnalysisArtifact[]>; // Per-SKU artifacts
  expansionState: PromoExpansionState;
  skuExpansion: Record<string, boolean>; // Per-SKU expansion toggle
  onExpansionChange: (state: PromoExpansionState) => void;
  onSkuToggle: (skuId: string) => void;
  onRemove: () => void;
  forceFullExpansion?: boolean; // For PDF export
}

/**
 * PromoCard with 3 expansion states:
 * 1. Collapsed: Single row summary
 * 2. Partial: Header + collapsed children
 * 3. Full: Everything expanded with all metadata
 */
function PromoCard({
  promo,
  promoArtifacts,
  skuArtifacts,
  expansionState,
  skuExpansion,
  onExpansionChange,
  onSkuToggle,
  onRemove,
  forceFullExpansion = false,
}: PromoCardProps) {
  const effectiveState = forceFullExpansion ? 'full' : expansionState;

  const cycleExpansion = () => {
    if (forceFullExpansion) return;
    const next: Record<PromoExpansionState, PromoExpansionState> = {
      collapsed: 'partial',
      partial: 'full',
      full: 'collapsed',
    };
    onExpansionChange(next[expansionState]);
  };

  // STATE 1: Collapsed (single row)
  if (effectiveState === 'collapsed') {
    return (
      <div className="border rounded-lg bg-card overflow-hidden">
        <button
          type="button"
          onClick={cycleExpansion}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
        >
          <ExpansionIcon state="collapsed" className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="font-medium truncate">{promo.name || promo.promo_id}</span>
            <span className="text-sm text-muted-foreground">
              {formatDiscount(promo)}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDateRange(promo.start_date, promo.end_date)}
            </span>
          </div>
          {promo.aggregate_lift_percent !== undefined && (
            <span className={cn(
              'text-sm font-medium',
              promo.aggregate_lift_percent >= 0 ? 'text-success' : 'text-destructive'
            )}>
              {formatPercent(promo.aggregate_lift_percent)}
            </span>
          )}
          {promo.aggregate_roi !== undefined && (
            <span className="text-sm text-muted-foreground">
              {formatROI(promo.aggregate_roi)}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {promo.products.length} SKU{promo.products.length !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors print:hidden"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </button>
      </div>
    );
  }

  // STATE 2 & 3: Partial or Full
  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 border-b">
        <button
          type="button"
          onClick={cycleExpansion}
          className={cn(
            'p-1 rounded hover:bg-muted transition-colors',
            forceFullExpansion && 'cursor-default pointer-events-none'
          )}
        >
          <ExpansionIcon
            state={effectiveState}
            className="w-4 h-4 text-muted-foreground"
          />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{promo.name || promo.promo_id}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDateRange(promo.start_date, promo.end_date)} &middot;{' '}
            {promo.products.length} SKU{promo.products.length !== 1 ? 's' : ''} &middot;{' '}
            {formatDiscount(promo)}
          </p>
        </div>
        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
          {promo.promo_id}
        </code>
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors print:hidden"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Promo Metadata (Full state only) */}
        {effectiveState === 'full' && (
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Promo Metadata
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              {promo.campaign_name && (
                <MetadataRow label="Campaign" value={promo.campaign_name} />
              )}
              <MetadataRow
                label="Dates"
                value={`${formatDateRange(promo.start_date, promo.end_date)} (${getDurationDays(promo.start_date, promo.end_date)} days)`}
              />
              <MetadataRow label="Promo Type" value={formatPromoType(promo.promo_type)} />
              <MetadataRow label="Discount" value={formatDiscount(promo)} />
              <MetadataRow label="SKUs" value={`${promo.products.length} products participating`} />
              {promo.sku_overrides && Object.keys(promo.sku_overrides).length > 0 && (
                <MetadataRow
                  label="Overrides"
                  value={`${Object.keys(promo.sku_overrides).length} SKU-specific discounts`}
                />
              )}
            </div>
          </div>
        )}

        {/* Aggregate Results (if completed) */}
        {promo.status === 'completed' && (
          promo.aggregate_lift_percent !== undefined ||
          promo.aggregate_roi !== undefined
        ) && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Aggregate Results
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {promo.aggregate_lift_percent !== undefined && (
                <ResultCard
                  label="Lift"
                  value={formatPercent(promo.aggregate_lift_percent)}
                  variant={promo.aggregate_lift_percent >= 0.20 ? 'success' : 'default'}
                />
              )}
              {promo.total_incremental_revenue !== undefined && (
                <ResultCard
                  label="Revenue"
                  value={formatCurrency(promo.total_incremental_revenue)}
                  variant="success"
                />
              )}
              {promo.total_incremental_units !== undefined && (
                <ResultCard
                  label="Units"
                  value={`+${promo.total_incremental_units.toLocaleString()}`}
                />
              )}
              {promo.aggregate_roi !== undefined && (
                <ResultCard
                  label="ROI"
                  value={formatROI(promo.aggregate_roi)}
                  variant={promo.aggregate_roi >= 2 ? 'success' : 'default'}
                />
              )}
            </div>
          </div>
        )}

        {/* Promo-level Artifacts */}
        {promoArtifacts.length > 0 && (
          <div className="space-y-3">
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
                  <PromoArtifactContent artifact={artifact} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SKU Breakdown */}
        <div className="space-y-3">
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
                  isExpanded={forceFullExpansion || effectiveState === 'full' || skuExpansion[product.sku_id] || false}
                  onToggle={() => onSkuToggle(product.sku_id)}
                  forceExpanded={forceFullExpansion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Metadata row helper
 */
function MetadataRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground flex-shrink-0">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

/**
 * Result card for aggregate metrics
 */
function ResultCard({
  label,
  value,
  variant = 'default',
}: {
  label: string;
  value: string;
  variant?: 'default' | 'success';
}) {
  return (
    <div className="bg-muted/30 rounded-lg p-3 text-center">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={cn(
        'text-xl font-bold',
        variant === 'success' && 'text-success'
      )}>
        {value}
      </div>
    </div>
  );
}

/**
 * Render promo-level artifact content
 */
function PromoArtifactContent({ artifact }: { artifact: AnalysisArtifact }) {
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

/**
 * Expansion state icon
 */
function ExpansionIcon({
  state,
  className,
}: {
  state: PromoExpansionState;
  className?: string;
}) {
  if (state === 'collapsed') {
    // Right-pointing triangle
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    );
  }
  if (state === 'partial') {
    // Horizontal bar (partial expansion indicator)
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  }
  // Full: downward triangle
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

export { PromoCard };
export type { PromoCardProps };
