/**
 * Formatting utilities for Cruxible UI
 *
 * These functions format promo data for display in the UI.
 * They work with both API data and internal types.
 */

import type { Promo, PromoType, PromoStatus, PromoWithProducts, RiskFactor } from '@/lib/types/promo';
import type { PromoSummary } from '@/lib/api-types';

/**
 * Get the discount value for a specific SKU in a promo
 * (handles overrides)
 */
export function getSkuDiscount(promo: Promo, skuId: string): number {
  return promo.sku_overrides?.[skuId] ?? promo.promo_value;
}

/**
 * Format promo type for display
 */
export function formatPromoType(type: PromoType): string {
  const labels: Record<PromoType, string> = {
    percentage_off: 'Percentage Off',
    fixed_amount: 'Fixed Amount',
    bogo: 'BOGO',
    bundle: 'Bundle',
  };
  return labels[type];
}

/**
 * Format discount for display
 */
export function formatDiscount(promo: Promo, skuId?: string): string {
  const value = skuId ? getSkuDiscount(promo, skuId) : promo.promo_value;

  switch (promo.promo_type) {
    case 'percentage_off':
      return `${value}% off`;
    case 'fixed_amount':
      return `$${value.toFixed(2)} off`;
    case 'bogo':
      return value === 100 ? 'Buy 1 Get 1 Free' : `Buy 1 Get 1 ${value}% off`;
    case 'bundle':
      return `${value}% bundle discount`;
    default:
      return `${value}% off`;
  }
}

/**
 * Format currency with sign
 */
export function formatCurrency(value: number): string {
  const formatted = Math.abs(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

/**
 * Format a ratio (0.123) as a percentage string with sign ("+12.3%").
 * Multiplies by 100 internally — callers pass the raw ratio.
 */
export function formatPercent(value: number): string {
  const pct = value * 100;
  return pct >= 0 ? `+${pct.toFixed(1)}%` : `${pct.toFixed(1)}%`;
}

/**
 * Format ROI
 */
export function formatROI(value: number): string {
  return `${value.toFixed(1)}x`;
}

/**
 * Calculate duration in days
 */
export function getDurationDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Format date range for display
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = end.toLocaleDateString('en-US', { ...options, year: 'numeric' });

  return `${startStr} - ${endStr}`;
}

/**
 * Get risk level from score
 */
export function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score <= 4) return 'low';
  if (score <= 6) return 'medium';
  return 'high';
}

/**
 * Get readable name for a factor category
 */
export function getFactorDisplayName(category: string): string {
  const names: Record<string, string> = {
    cannibalization: 'Cannibalization',
    timing: 'Timing',
    discount_depth: 'Discount Depth',
    history: 'Historical Performance',
    duration: 'Duration',
  };
  return names[category] || category;
}

/**
 * Derive a human-readable display name from a SKU ID.
 *
 * Strips known merchant prefixes (e.g. "synth_merchant_000_") and
 * converts the remaining product code to title case with spaces.
 *
 * Examples:
 *   "synth_merchant_001_LOAFER-BRN-10" → "Loafer BRN 10"
 *   "synth_merchant_000_SNEAKER-WHT-10" → "Sneaker WHT 10"
 *   "BELT-LTH-34" → "Belt LTH 34"
 *   "some_other_sku_id" → "some_other_sku_id" (returned as-is)
 */
export function formatSkuName(skuId: string): string {
  // Strip merchant prefix: "synth_merchant_NNN_" or "{merchant_id}_"
  // Pattern: everything up to and including the last segment before a
  // PRODUCT-VARIANT-SIZE suffix (uppercase letters followed by dash-separated parts)
  const prefixMatch = skuId.match(/^(.+?_)([A-Z][A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+)$/);
  const productCode = prefixMatch ? prefixMatch[2] : null;

  if (!productCode) return skuId;

  // Split on dashes: ["LOAFER", "BRN", "10"]
  const parts = productCode.split('-');
  // Title-case the first part (product type), keep rest uppercase (color/size codes)
  const name = parts[0].charAt(0) + parts[0].slice(1).toLowerCase();
  return [name, ...parts.slice(1)].join(' ');
}

/**
 * Convert API promo summary to PromoWithProducts for UI display
 */
export function apiPromoToPromoWithProducts(apiPromo: PromoSummary): PromoWithProducts {
  const now = new Date();
  const startDate = new Date(apiPromo.start_date);
  const endDate = new Date(apiPromo.end_date);

  let status: PromoStatus = 'completed';
  if (now < startDate) {
    status = 'upcoming';
  } else if (now >= startDate && now <= endDate) {
    status = 'active';
  }

  return {
    promo_id: apiPromo.promo_id,
    name: apiPromo.name || undefined,
    campaign_id: apiPromo.campaign_id || undefined,
    campaign_name: apiPromo.campaign_id || undefined,
    start_date: apiPromo.start_date,
    end_date: apiPromo.end_date,
    promo_type: (apiPromo.promo_type as PromoType) || 'percentage_off',
    promo_value: apiPromo.promo_value,
    sku_ids: apiPromo.sku_ids,
    status,
    products: apiPromo.sku_ids.map((sku_id) => ({
      sku_id,
      name: formatSkuName(sku_id),
    })),
  };
}
