'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { Product, SkuResult } from '@/lib/types/promo';
import { formatCurrency, formatPercent, formatROI } from '@/lib/utils/formatters';
import { Artifact } from '@/components/chat-canvas/canvas/artifact';
import { KPIArtifactContent } from '@/components/chat-canvas/canvas/kpi-artifact';
import { ChartArtifactContent } from '@/components/chat-canvas/canvas/chart-artifact';
import type { AnalysisArtifact, KPIData, ChartData } from '@/hooks/use-promo-analysis';

interface SkuCardProps {
  product: Product;
  result?: SkuResult;
  discount: string; // Pre-formatted discount string
  isOverride?: boolean; // Whether this SKU has a discount override
  artifacts: AnalysisArtifact[];
  isExpanded: boolean;
  onToggle: () => void;
  forceExpanded?: boolean; // For PDF export
}

/**
 * SKU detail card within a PromoCard
 * Two states: collapsed (row) or expanded (full details + artifacts)
 */
function SkuCard({
  product,
  result,
  discount,
  isOverride = false,
  artifacts,
  isExpanded,
  onToggle,
  forceExpanded = false,
}: SkuCardProps) {
  const expanded = forceExpanded || isExpanded;

  if (!expanded) {
    // Collapsed state: single row
    return (
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <ChevronIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <code className="text-xs bg-background/50 px-1.5 py-0.5 rounded font-mono">
          {product.sku_id}
        </code>
        <span className="text-sm flex-1 truncate">{product.name}</span>
        {result && (
          <span className={cn(
            'text-sm font-medium',
            result.lift_percent >= 0 ? 'text-success' : 'text-destructive'
          )}>
            {formatPercent(result.lift_percent)}
          </span>
        )}
      </button>
    );
  }

  // Expanded state: full details
  return (
    <div className="border rounded-lg bg-muted/20 overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 text-left',
          'bg-muted/40 hover:bg-muted/60 transition-colors border-b',
          forceExpanded && 'cursor-default pointer-events-none print:pointer-events-none'
        )}
      >
        <ChevronDownIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm font-medium flex-1">{product.name}</span>
        <code className="text-xs bg-background/70 px-1.5 py-0.5 rounded font-mono">
          {product.sku_id}
        </code>
      </button>

      <div className="p-4 space-y-4">
        {/* SKU Metadata */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <MetadataRow label="SKU ID" value={product.sku_id} mono />
          {product.category && (
            <MetadataRow label="Category" value={product.category} />
          )}
          {product.unit_price !== undefined && (
            <MetadataRow label="Unit Price" value={`$${product.unit_price.toFixed(2)}`} />
          )}
          {product.unit_cost !== undefined && (
            <MetadataRow label="Unit Cost" value={`$${product.unit_cost.toFixed(2)}`} />
          )}
          <MetadataRow
            label="Discount"
            value={
              <span>
                {discount}
                {isOverride && (
                  <span className="text-xs text-warning ml-1">(override)</span>
                )}
              </span>
            }
          />
          {product.unit_price !== undefined && product.unit_cost !== undefined && (
            <MetadataRow
              label="Margin"
              value={`${(((product.unit_price - product.unit_cost) / product.unit_price) * 100).toFixed(1)}%`}
            />
          )}
        </div>

        {/* SKU Results (if completed) */}
        {result && (
          <>
            <div className="border-t pt-4">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Analysis Results
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <ResultMetric
                  label="Baseline"
                  value={result.baseline_units.toLocaleString()}
                  subtext="units"
                />
                <ResultMetric
                  label="Actual"
                  value={result.actual_units.toLocaleString()}
                  subtext="units"
                />
                <ResultMetric
                  label="Incremental"
                  value={`+${result.incremental_units.toLocaleString()}`}
                  subtext="units"
                  highlight
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <ResultMetric
                  label="Lift"
                  value={formatPercent(result.lift_percent)}
                  variant={result.lift_percent >= 0.20 ? 'success' : 'default'}
                />
                <ResultMetric
                  label="Revenue"
                  value={formatCurrency(result.incremental_revenue)}
                  variant="success"
                />
                <ResultMetric
                  label="ROI"
                  value={formatROI(result.roi)}
                  subtext={product.unit_cost !== undefined ? `($${product.unit_cost.toFixed(2)} cost)` : undefined}
                  variant={result.roi >= 2 ? 'success' : 'default'}
                />
              </div>
            </div>
          </>
        )}

        {/* SKU-level Artifacts */}
        {artifacts.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            {artifacts.map((artifact) => (
              <div key={artifact.id} className="bg-background rounded-lg p-3">
                <SkuArtifactContent artifact={artifact} />
              </div>
            ))}
          </div>
        )}
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
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}:</span>
      <span className={cn('font-medium', mono && 'font-mono text-xs')}>{value}</span>
    </div>
  );
}

/**
 * Result metric display
 */
function ResultMetric({
  label,
  value,
  subtext,
  variant = 'default',
  highlight = false,
}: {
  label: string;
  value: string;
  subtext?: string;
  variant?: 'default' | 'success';
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      'text-center p-2 rounded-md',
      highlight && 'bg-primary/5'
    )}>
      <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
      <div className={cn(
        'text-lg font-semibold',
        variant === 'success' && 'text-success'
      )}>
        {value}
      </div>
      {subtext && (
        <div className="text-xs text-muted-foreground">{subtext}</div>
      )}
    </div>
  );
}

/**
 * Render artifact content for SKU card
 */
function SkuArtifactContent({ artifact }: { artifact: AnalysisArtifact }) {
  switch (artifact.type) {
    case 'kpi': {
      const kpiData = artifact.data as KPIData;
      return <KPIArtifactContent kpis={kpiData.items} />;
    }
    case 'chart': {
      const chartData = artifact.data as ChartData;
      return <ChartArtifactContent figure={{ data: chartData.data, layout: chartData.layout }} />;
    }
    default:
      return null;
  }
}

// Icons

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export { SkuCard };
export type { SkuCardProps };
