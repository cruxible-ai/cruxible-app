/**
 * Demo data module - DEPRECATED
 *
 * This file now re-exports types and formatters from their new locations.
 * All demo data constants have been removed.
 *
 * Types: @/lib/types/promo
 * Formatters: @/lib/utils/formatters
 */

// =============================================================================
// RE-EXPORT TYPES
// =============================================================================

export type {
  PromoType,
  PromoStatus,
  Product,
  SkuResult,
  MarginBreakdown,
  Promo,
  PromoWithProducts,
  SimilarPromo,
  RiskFactor,
  PromoLearning,
  RiskAssessment,
  RiskSuggestion,
  PromoDecision,
  NewPromo,
  RelationshipType,
  ProductRelationship,
  GraphNode,
  GraphEdge,
  PromoRelationshipGraph,
} from '@/lib/types/promo';

// =============================================================================
// RE-EXPORT FORMATTERS
// =============================================================================

export {
  formatDiscount,
  formatPromoType,
  formatCurrency,
  formatPercent,
  formatROI,
  getDurationDays,
  formatDateRange,
  getSkuDiscount,
  getRiskLevel,
  getFactorDisplayName,
} from '@/lib/utils/formatters';
