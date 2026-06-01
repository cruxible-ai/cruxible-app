/**
 * Promo-related type definitions for Cruxible UI
 *
 * These types are used throughout the frontend for:
 * - Promo entities and their products
 * - Analysis results (SKU-level and aggregate)
 * - Risk assessment and suggestions
 * - Product relationships and graphs
 */

// =============================================================================
// Core Promo Types
// =============================================================================

export type PromoType = 'percentage_off' | 'fixed_amount' | 'bogo' | 'bundle';
export type PromoStatus = 'active' | 'completed' | 'upcoming';

/**
 * Product/SKU entity
 */
export interface Product {
  sku_id: string;
  name: string;
  category?: string;
  unit_price?: number;
  unit_cost?: number;
}

/**
 * Per-SKU analysis results
 */
export interface SkuResult {
  lift_percent: number;
  baseline_units: number;
  actual_units: number;
  incremental_units: number;
  incremental_revenue: number;
  roi: number;
}

/**
 * Margin breakdown showing gross vs net margin with cannibalization
 */
export interface MarginBreakdown {
  gross_revenue: number;          // Total incremental revenue
  promo_cost: number;             // Cost of the discount
  gross_margin: number;           // gross_revenue - promo_cost
  promo_sku_contribution: number; // Positive contribution from promo SKUs
  cannibalization_impact: number; // Negative impact from substitutes
  halo_effect: number;            // Positive impact from complements
  net_margin: number;             // Final net margin
  gross_roi: number;              // gross_margin / promo_cost
  net_roi: number;                // net_margin / promo_cost
  cannibalized_skus: Array<{
    name: string;
    lift_percent: number;  // Negative
    margin_impact: number; // Negative
  }>;
  halo_skus?: Array<{
    name: string;
    lift_percent: number;  // Positive
    margin_impact: number; // Positive
  }>;
}

/**
 * Promo entity (contains multiple SKUs)
 */
export interface Promo {
  promo_id: string;
  name?: string;
  campaign_id?: string;
  campaign_name?: string;
  start_date: string;
  end_date: string;
  promo_type: PromoType;
  promo_value: number; // Default discount % or fixed amount
  sku_ids: string[]; // Multiple SKUs
  sku_overrides?: Record<string, number>; // Per-SKU discount overrides
  status: PromoStatus;
  // Aggregate results (for completed promos)
  aggregate_lift_percent?: number;
  aggregate_roi?: number;
  total_incremental_revenue?: number;
  total_incremental_units?: number;
  // Margin breakdown (for demo with cannibalization)
  margin_breakdown?: MarginBreakdown;
}

/**
 * Promo with resolved product details and per-SKU results
 */
export interface PromoWithProducts extends Promo {
  products: Product[];
  sku_results?: Record<string, SkuResult>;
}

// =============================================================================
// Risk Assessment Types
// =============================================================================

/**
 * Similar promo for comparison when creating new promotions
 */
export interface SimilarPromo {
  promo_id: string;
  name: string;
  similarity_score: number;  // 1-10
  success_score: number;     // 1-10
  discount: string;          // e.g., "25% off"
  date_range: string;        // e.g., "Jun 1-15, 2024"
  sku_count: number;
  category?: string;
}

/**
 * Risk factor contributing to overall risk assessment
 */
export interface RiskFactor {
  category: 'cannibalization' | 'timing' | 'discount_depth' | 'history' | 'duration';
  risk_score: number;        // 1-10
  description: string;       // e.g., "High overlap with Tostitos Scoops (85%)"
}

/**
 * Learning derived from historical promo performance
 */
export interface PromoLearning {
  source_promo: string;      // Name of the promo that generated this learning
  insight: string;           // e.g., "20% discount performed better than 25% for chips"
}

/**
 * Risk assessment for a new promo
 */
export interface RiskAssessment {
  overall_risk_score: number;  // 1-10 (10 = highest risk)
  risk_level: 'low' | 'medium' | 'high';
  factors: RiskFactor[];
  learnings: PromoLearning[];
}

/**
 * Suggestion to minimize risk on a new promo
 */
export interface RiskSuggestion {
  id: string;
  category: 'discount' | 'timing' | 'skus' | 'duration';
  suggestion: string;
  impact: string;            // e.g., "Reduces cannibalization risk by 30%"
  new_value?: string;        // What the promo would change to
  risk_reduction: number;    // Points reduced from overall risk score
  applied: boolean;
  affects_factor: 'cannibalization' | 'timing' | 'discount_depth' | 'history' | 'duration';  // Which risk factor this affects
  factor_reduction: number;  // Points reduced from that specific factor
}

/**
 * A decision made during promo optimization
 */
export interface PromoDecision {
  id: string;
  timestamp: Date;
  action: string;             // What was done, e.g., "Reduced discount from 25% to 20%"
  rationale: string;          // Why, e.g., "To decrease discount depth risk"
  old_overall_risk: number;   // Overall risk before (e.g., 7)
  new_overall_risk: number;   // Overall risk after (e.g., 5.5)
  factor_affected: string;    // Which factor was improved (e.g., "Discount Depth")
  old_factor_risk: number;    // Factor risk before (e.g., 8)
  new_factor_risk: number;    // Factor risk after (e.g., 5)
}

/**
 * New promo being created (draft state)
 */
export interface NewPromo {
  name: string;
  discount_type: 'percentage_off' | 'fixed_amount' | 'bogo';
  discount_value: number;
  start_date: string;
  end_date: string;
  sku_ids: string[];
  estimated_lift: number;
  estimated_roi: number;
  estimated_revenue: number;
  estimated_net_margin: number;  // Net expected margin after costs
  // Track applied suggestions
  applied_suggestions: string[];
}

// =============================================================================
// Product Relationship Types
// =============================================================================

export type RelationshipType = 'substitute_of' | 'complement_of';

export interface ProductRelationship {
  source_sku: string;
  target_sku: string;
  relationship_type: RelationshipType;
  confidence: number; // 0-1
}

export interface GraphNode {
  id: string;
  name: string;
  category?: string;
  isFocus: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  edgeType: RelationshipType;
  confidence: number;
}

export interface PromoRelationshipGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
