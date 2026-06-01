/**
 * Mock data for NetworkReport component testing.
 * Based on a fashion retailer example with realistic high-confidence interactions.
 *
 * NOTE: Effects are at the PRODUCT level (size/color agnostic).
 * - Cannibalization: Same-style/category products (different color, different cut)
 * - Halo: Classic pairings and outfit completion items
 */

import type { NetworkReportData } from './report-types';

export const MOCK_REPORT_DATA: NetworkReportData = {
  // Identity
  retailer_name: 'Urban Threads Boutique',
  promo_name: '25% Off Slim Fit Jeans & Blue Henley',
  promo_period: { start: '2025-11-01', end: '2025-11-15' },
  generated_at: new Date().toISOString(),

  // Key metrics
  gross_lift_units: 1247,
  gross_lift_margin: 4892.5,
  reported_margin: 4892.5, // Same as gross_lift_margin - what they would have reported
  cannibalization_margin: -2150,
  halo_margin: 580,
  net_impact_margin: 3322.5, // 4892.5 - 2150 + 580 = 3322.5

  // Percentages
  cannibalization_pct_of_gross: 43.9, // 2150 / 4892.5
  halo_pct_of_gross: 11.9, // 580 / 4892.5
  true_roi_vs_gross_pct: 32.1, // (4892.5 - 3322.5) / 4892.5

  // Materiality
  materiality_label: 'Material impact',

  // HIGH-CONFIDENCE cannibalization (items NOT on sale)
  // Total: -$890 + -$720 + -$540 = -$2,150
  substitute_effects: [
    {
      product_id: 'PROD-GRAY-HENLEY',
      product_name: 'Gray Henley Shirt',
      caused_by_product: 'Blue Henley Shirt', // Same style, different color
      confidence: 0.92,
      baseline_units: 178,
      actual_units: 67,
      cannibalization_units: 111,
      margin_impact: -890.0, // 111 units × $8 margin
      variants: [
        { sku: 'GRAY-HENLEY-S', variant_name: 'Small', baseline_units: 48, actual_units: 18, effect_units: -30 },
        { sku: 'GRAY-HENLEY-M', variant_name: 'Medium', baseline_units: 68, actual_units: 25, effect_units: -43 },
        { sku: 'GRAY-HENLEY-L', variant_name: 'Large', baseline_units: 62, actual_units: 24, effect_units: -38 },
      ],
    },
    {
      product_id: 'PROD-RELAXED-JEANS',
      product_name: 'Relaxed Fit Jeans',
      caused_by_product: 'Slim Fit Jeans', // Same category, different cut
      confidence: 0.85,
      baseline_units: 257,
      actual_units: 167,
      cannibalization_units: 90,
      margin_impact: -720.0, // 90 units × $8 margin
    },
    {
      product_id: 'PROD-KHAKI-CHINOS',
      product_name: 'Khaki Chinos',
      caused_by_product: 'Slim Fit Jeans', // Casual pants substitute
      confidence: 0.71,
      baseline_units: 145,
      actual_units: 55,
      cannibalization_units: 90,
      margin_impact: -540.0, // 90 units × $6 margin
    },
  ],

  // HIGH-CONFIDENCE halo effects (items NOT on sale)
  // Total: $350 + $150 + $80 = $580
  complement_effects: [
    {
      product_id: 'PROD-LEATHER-BELT',
      product_name: 'Leather Belt',
      boosted_by_product: 'Slim Fit Jeans', // Classic pairing
      confidence: 0.88,
      baseline_units: 156,
      actual_units: 206,
      halo_units: 50,
      margin_impact: 350.0, // 50 units × $7 margin
      // Second-order: Leather Belt surge cannibalized Canvas Belt
      secondary_cannibalization: [
        {
          product_id: 'PROD-CANVAS-BELT',
          product_name: 'Canvas Belt',
          units_lost: 15,
          margin_impact: -75.0, // 15 units × $5 margin
          confidence: 0.68,
        },
      ],
      variants: [
        { sku: 'LEATHER-BELT-30', variant_name: '30"', baseline_units: 45, actual_units: 60, effect_units: 15 },
        { sku: 'LEATHER-BELT-32', variant_name: '32"', baseline_units: 52, actual_units: 70, effect_units: 18 },
        { sku: 'LEATHER-BELT-34', variant_name: '34"', baseline_units: 59, actual_units: 76, effect_units: 17 },
      ],
    },
    {
      product_id: 'PROD-CHELSEA-BOOTS',
      product_name: 'Chelsea Boots',
      boosted_by_product: 'Slim Fit Jeans', // Outfit completion
      confidence: 0.78,
      baseline_units: 89,
      actual_units: 119,
      halo_units: 30,
      margin_impact: 150.0, // 30 units × $5 margin
    },
    {
      product_id: 'PROD-CREW-SOCKS',
      product_name: 'Crew Socks (3-pack)',
      boosted_by_product: 'Slim Fit Jeans', // Wardrobe basics basket
      confidence: 0.72,
      baseline_units: 445,
      actual_units: 480,
      halo_units: 35,
      margin_impact: 80.0, // 35 units × $2.28 margin
    },
  ],

  // KEY LEARNINGS (observations, not recommendations)
  key_learnings: [
    {
      type: 'observation',
      text: 'Cannibalization on Gray Henley was 30% higher than typical same-category effects, likely due to identical style/fit.',
    },
    {
      type: 'historical_comparison',
      text: 'Similar denim promos that excluded chinos from the discount saw 22% less cannibalization.',
      comparison_basis: 'vs. 12 comparable promos',
    },
  ],

  // Limitations
  limitations: [
    'No paid media spend included in this analysis',
    'Relationships are detected hypotheses—validate with domain knowledge',
    'This report is designed to be directionally correct and auditable',
  ],

  // Improvement suggestions
  improvement_suggestions: [
    'Provide longer transaction history (2+ years ideal)',
    'Your feedback, decision context, and outcome capture in the app directly refine future analyses',
  ],

  has_cost_data: true,

  // Methodology
  model_version: 'v1.0-beta',
  confidence_level: 'high',
  edges_consulted: 6,
  avg_edge_confidence: 0.81,

  // Data quality
  ingestion_report: {
    date_range: ['2025-05-01', '2025-11-30'],
    sku_count: 47,
    rows_after_aggregation: 8460,
    column_mapping: { date: 'order_date', sku_id: 'sku', quantity: 'qty' },
  },

  // Counterfactual baseline chart - Cruxible brand styling
  // Math: baseline ~90/day during promo (sum=1,342), actual ~173/day (sum=2,589)
  // Lift = 2,589 - 1,342 = 1,247 units (matches gross_lift_units KPI)
  baseline_chart: {
    data: [
      // Baseline line (Cool Steel, dashed)
      {
        type: 'scatter',
        mode: 'lines',
        name: 'Baseline',
        x: [
          // Pre-promo: Oct 27-31
          '2025-10-27', '2025-10-28', '2025-10-29', '2025-10-30', '2025-10-31',
          // Promo: Nov 1-15
          '2025-11-01', '2025-11-02', '2025-11-03', '2025-11-04', '2025-11-05',
          '2025-11-06', '2025-11-07', '2025-11-08', '2025-11-09', '2025-11-10',
          '2025-11-11', '2025-11-12', '2025-11-13', '2025-11-14', '2025-11-15',
          // Post-promo: Nov 16-20
          '2025-11-16', '2025-11-17', '2025-11-18', '2025-11-19', '2025-11-20',
        ],
        // Baseline: ~90 units/day with natural variation
        // Pre (sum=447): 88+92+87+91+89
        // Promo (sum=1,342): 90+88+92+86+91+89+93+87+90+88+92+86+90+89+91
        // Post (sum=447): 88+91+87+92+89
        y: [88, 92, 87, 91, 89, 90, 88, 92, 86, 91, 89, 93, 87, 90, 88, 92, 86, 90, 89, 91, 88, 91, 87, 92, 89],
        line: { color: '#A4A6AA', dash: 'dash', width: 2 }, // Cool Steel
      },
      // Actual line (Neon Ice, solid)
      {
        type: 'scatter',
        mode: 'lines',
        name: 'Actual',
        x: [
          // Pre-promo: Oct 27-31
          '2025-10-27', '2025-10-28', '2025-10-29', '2025-10-30', '2025-10-31',
          // Promo: Nov 1-15
          '2025-11-01', '2025-11-02', '2025-11-03', '2025-11-04', '2025-11-05',
          '2025-11-06', '2025-11-07', '2025-11-08', '2025-11-09', '2025-11-10',
          '2025-11-11', '2025-11-12', '2025-11-13', '2025-11-14', '2025-11-15',
          // Post-promo: Nov 16-20
          '2025-11-16', '2025-11-17', '2025-11-18', '2025-11-19', '2025-11-20',
        ],
        // Actual: matches baseline outside promo, ~173/day during promo
        // Pre (matches baseline): 88, 92, 87, 91, 89
        // Promo (sum=2,589): 175+168+180+173+178+170+182+175+169+180+172+178+171+175+173
        // Lift = 2,589 - 1,342 = 1,247 ✓
        // Post (matches baseline): 88, 91, 87, 92, 89
        y: [88, 92, 87, 91, 89, 175, 168, 180, 173, 178, 170, 182, 175, 169, 180, 172, 178, 171, 175, 173, 88, 91, 87, 92, 89],
        line: { color: '#4FF2E3', width: 2.5 }, // Neon Ice
      },
    ],
    layout: {
      showlegend: true,
      legend: {
        orientation: 'h',
        y: 0.98,
        x: 0.01,
        xanchor: 'left',
        yanchor: 'top',
        bgcolor: 'rgba(0,0,0,0.5)',
        font: { color: '#FAFAF5' },
      },
      xaxis: {
        title: '',
        tickfont: { color: '#A4A6AA' },
        gridcolor: 'rgba(164, 166, 170, 0.2)',
        linecolor: 'rgba(164, 166, 170, 0.3)',
        tickangle: -45,
      },
      yaxis: {
        title: { text: 'Units', font: { color: '#A4A6AA' } },
        tickfont: { color: '#A4A6AA' },
        gridcolor: 'rgba(164, 166, 170, 0.2)',
        linecolor: 'rgba(164, 166, 170, 0.3)',
      },
      margin: { t: 30, b: 60 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      hovermode: 'x unified',
      // Promo period highlight
      shapes: [
        {
          type: 'rect',
          xref: 'x',
          yref: 'paper',
          x0: '2025-11-01',
          x1: '2025-11-15',
          y0: 0,
          y1: 1,
          fillcolor: 'rgba(79, 242, 227, 0.1)', // Neon Ice @ 10%
          line: { width: 0 },
          layer: 'below',
        },
      ],
      annotations: [
        {
          x: '2025-11-08',
          y: 1,
          xref: 'x',
          yref: 'paper',
          text: 'Promo Period',
          showarrow: false,
          font: { size: 11, color: '#A4A6AA' },
          yanchor: 'bottom',
        },
      ],
    },
  },
};
