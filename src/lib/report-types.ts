/**
 * TypeScript types for NetworkReport component.
 * These mirror the Python NetworkReportData model from src/reports/data.py
 *
 * IMPORTANT: Product vs SKU Hierarchy
 * ------------------------------------
 * In retail, different colors/sizes of the same item are different SKUs.
 * Product relationships are SIZE/COLOR AGNOSTIC — we care that "Slim Fit Jeans"
 * cannibalizes "Relaxed Fit Jeans", not that "Blue Jeans Size 32" cannibalizes
 * "Blue Jeans Size 34".
 *
 * - `product_id`: The parent product (e.g., "V-Neck Tee") — used for relationships
 * - `sku` / `variant`: The specific size/color (e.g., "V-Neck Tee - Blue - M") — used for sales
 *
 * Effects are aggregated at the PRODUCT level, with optional variant drill-down.
 */

import type { PlotlyFigure } from './api-types';

/**
 * Individual SKU/variant within a product (for drill-down detail)
 */
export interface VariantEffect {
  sku: string;
  variant_name?: string; // e.g., "Blue - Medium"
  baseline_units: number;
  actual_units: number;
  effect_units: number; // positive for halo, negative for cannibalization
}

export interface SubstituteEffect {
  product_id: string;
  product_name?: string;
  /** The promo product that caused this cannibalization */
  caused_by_product: string;
  /** Edge confidence 0-1 */
  confidence: number;
  baseline_units: number;
  actual_units: number;
  cannibalization_units: number;
  /** Margin impact in dollars (negative for cannibalization) */
  margin_impact?: number;
  /** Optional SKU-level breakdown for drill-down */
  variants?: VariantEffect[];
}

/**
 * Second-order effect: when a halo product cannibalizes another product
 */
export interface SecondaryCannibalization {
  product_id: string;
  product_name: string;
  units_lost: number;
  margin_impact?: number;
  confidence?: number;
}

export interface ComplementEffect {
  product_id: string;
  product_name?: string;
  /** The promo product that caused this halo effect */
  boosted_by_product: string;
  /** Edge confidence 0-1 */
  confidence: number;
  baseline_units: number;
  actual_units: number;
  halo_units: number;
  /** Margin impact in dollars (positive for halo) */
  margin_impact?: number;
  /** Second-order cannibalization caused by this halo */
  secondary_cannibalization?: SecondaryCannibalization[];
  /** Optional SKU-level breakdown for drill-down */
  variants?: VariantEffect[];
}

export interface IngestionReport {
  date_range: [string, string]; // ISO dates
  sku_count: number;
  rows_after_aggregation: number;
  column_mapping: Record<string, string>;
}

export type MaterialityLabel = 'Material impact' | 'Moderate impact' | 'Low impact';

/**
 * Key Learning: observation or historical comparison (replaces prescriptive recommendations)
 */
export interface KeyLearning {
  type: 'observation' | 'historical_comparison';
  text: string;
  /** Optional context for historical comparisons, e.g., "vs. avg apparel promo" */
  comparison_basis?: string;
}

export interface NetworkReportData {
  // Identity
  retailer_name: string;
  promo_name: string;
  promo_period: { start: string; end: string };
  generated_at: string;

  // Key metrics
  gross_lift_units: number;
  gross_lift_margin: number;
  reported_margin: number; // What merchant would have reported (revenue - COGS, no network effects)
  cannibalization_margin: number;
  halo_margin: number;
  net_impact_margin: number;

  // Percentages
  cannibalization_pct_of_gross: number;
  halo_pct_of_gross: number;
  true_roi_vs_gross_pct: number;

  // Effects
  substitute_effects: SubstituteEffect[];
  complement_effects: ComplementEffect[];

  // Computed fields
  materiality_label: MaterialityLabel;
  key_learnings: KeyLearning[];
  limitations: string[];
  improvement_suggestions: string[];
  has_cost_data: boolean;

  // Methodology
  model_version: string;
  confidence_level: string;
  edges_consulted: number;
  avg_edge_confidence: number;

  // Data quality
  ingestion_report?: IngestionReport;

  // Counterfactual baseline chart
  baseline_chart?: PlotlyFigure;
}

// Graph data types for visualization (matches GraphArtifactContent)
export interface GraphNode {
  id: string;
  name: string;
  category?: string;
  isFocus: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  edgeType: 'substitute_of' | 'complement_of';
  confidence: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// Transform NetworkReportData to GraphData
// Note: Graph shows PRODUCT-level relationships (size/color agnostic)
export function toGraphData(report: NetworkReportData): GraphData {
  const promoNode: GraphNode = {
    id: 'promo',
    name: report.promo_name,
    category: 'Promo Product',
    isFocus: true,
  };

  const substituteNodes: GraphNode[] = report.substitute_effects.map((e) => ({
    id: e.product_id,
    name: e.product_name || e.product_id,
    category: 'Substitute',
    isFocus: false,
  }));

  const complementNodes: GraphNode[] = report.complement_effects.map((e) => ({
    id: e.product_id,
    name: e.product_name || e.product_id,
    category: 'Complement',
    isFocus: false,
  }));

  const edges: GraphEdge[] = [
    ...report.substitute_effects.map((e) => ({
      source: 'promo',
      target: e.product_id,
      edgeType: 'substitute_of' as const,
      confidence: report.avg_edge_confidence,
    })),
    ...report.complement_effects.map((e) => ({
      source: 'promo',
      target: e.product_id,
      edgeType: 'complement_of' as const,
      confidence: report.avg_edge_confidence,
    })),
  ];

  return {
    nodes: [promoNode, ...substituteNodes, ...complementNodes],
    edges,
  };
}

// Currency formatter
export function formatCurrency(value: number): string {
  const absValue = Math.abs(value);
  const prefix = value < 0 ? '-' : '';
  return `${prefix}$${absValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Percentage formatter
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Date range formatter
export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return `${startDate.toLocaleDateString('en-US', options)} – ${endDate.toLocaleDateString('en-US', options)}`;
}
