/**
 * Pure functions that transform backend SSE event data into AnalysisArtifact objects.
 *
 * Each agent's completed event maps to one or more artifact types:
 * - counterfactual_baseline → chart (baseline_vs_actual Plotly chart)
 * - historical_lift_calculator → kpi (lift %, incremental units) + chart (daily_lift)
 * - margin_calculator → margin-waterfall (from MarginResult fields)
 * - sku_expander → graph (from SkuExpansionResult relationships)
 * - network_aggregator → table (cannibalization/halo impacts) + enriches margin-waterfall with network effects
 * - plan_promotion → similar-promos + suggestions
 */

import type { AgentEvent } from './api-types';
import type {
  AnalysisArtifact,
  KPIData,
  ChartData,
  TableData,
  GraphData,
  MarginWaterfallData,
  SimilarPromosData,
  SuggestionsData,
  RiskAssessmentData,
} from '@/hooks/use-promo-analysis';
import type { SimilarPromo, SkuResult, RiskFactor, RiskAssessment, RiskSuggestion } from '@/lib/types/promo';
import { formatDateRange, formatSkuName } from '@/lib/utils/formatters';

let artifactCounter = 0;

export function resetArtifactCounter(): void {
  artifactCounter = 0;
}

function genId(): string {
  return `artifact-${++artifactCounter}`;
}

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const formatted = Math.abs(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return value >= 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
}

function formatROI(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return `${value.toFixed(1)}x`;
}

/**
 * Build artifacts from an agent_completed SSE event.
 *
 * Returns an array of artifacts (an agent may produce zero or more).
 */
export function buildArtifactsFromEvent(
  event: AgentEvent,
  promoId: string,
): AnalysisArtifact[] {
  if (event.type !== 'agent_completed' || !event.agent_name) {
    return [];
  }

  const result = event.snapshot?.output_type
    ? getAgentResult(event)
    : null;

  switch (event.agent_name) {
    case 'counterfactual_baseline':
      return buildBaselineArtifacts(event, promoId);
    case 'historical_lift_calculator':
      return buildLiftArtifacts(event, promoId, result);
    case 'margin_calculator':
      return buildMarginArtifacts(event, promoId, result);
    case 'sku_expander':
      return buildGraphArtifacts(event, promoId, result);
    case 'network_aggregator':
      return buildNetworkArtifacts(event, promoId, result);
    case 'plan_promotion':
      return buildPreflightArtifacts(event, promoId, result);
    default:
      return [];
  }
}

/**
 * Extract agent result from the event.
 *
 * Priority:
 * 1. agent_result field (direct serialized result from AGENT_COMPLETED)
 * 2. execution_result.agent_results (legacy, from RUN_COMPLETED)
 */
function getAgentResult(event: AgentEvent): Record<string, unknown> | null {
  // Check for direct agent_result first (new field)
  if (event.agent_result) {
    return event.agent_result as Record<string, unknown>;
  }

  // Fallback to execution_result (legacy)
  if (!event.execution_result?.agent_results) return null;

  // Look for the result keyed by output type or agent name
  const results = event.execution_result.agent_results;
  const outputType = event.snapshot?.output_type;

  if (outputType && outputType in results) {
    return results[outputType] as unknown as Record<string, unknown>;
  }

  // Also check by agent name
  if (event.agent_name && event.agent_name in results) {
    return results[event.agent_name] as unknown as Record<string, unknown>;
  }

  return null;
}

// =============================================================================
// Per-agent artifact builders
// =============================================================================

function buildBaselineArtifacts(
  event: AgentEvent,
  promoId: string,
): AnalysisArtifact[] {
  const artifacts: AnalysisArtifact[] = [];

  // Use chart from event.charts if available
  if (event.charts) {
    for (const [chartName, figure] of Object.entries(event.charts)) {
      artifacts.push({
        id: genId(),
        type: 'chart',
        title: chartName === 'baseline_vs_actual'
          ? 'Sales vs Baseline'
          : chartName.replace(/_/g, ' '),
        agentName: 'counterfactual_baseline',
        timestamp: new Date(event.timestamp),
        context: { promo_id: promoId },
        data: {
          data: figure.data,
          layout: figure.layout,
        } as ChartData,
      });
    }
  }

  return artifacts;
}

function buildLiftArtifacts(
  event: AgentEvent,
  promoId: string,
  result: Record<string, unknown> | null,
): AnalysisArtifact[] {
  const artifacts: AnalysisArtifact[] = [];

  if (result) {
    const liftPercent = result.lift_percent as number | undefined;
    const incrementalUnits = result.incremental_units as number | undefined;
    const incrementalRevenue = result.incremental_revenue as number | undefined;

    // KPI artifact
    const items: KPIData['items'] = [];
    if (liftPercent !== undefined) {
      items.push({
        label: 'Total Lift',
        value: formatPercent(liftPercent * 100),
        trend: liftPercent > 0 ? 'positive' : 'negative',
      });
    }
    if (incrementalUnits !== undefined) {
      items.push({
        label: 'Incremental Units',
        value: Math.round(incrementalUnits).toLocaleString(),
        trend: incrementalUnits > 0 ? 'positive' : 'negative',
      });
    }
    if (incrementalRevenue !== undefined) {
      items.push({
        label: 'Incremental Revenue',
        value: formatCurrency(incrementalRevenue),
        trend: incrementalRevenue > 0 ? 'positive' : 'negative',
      });
    }

    if (items.length > 0) {
      artifacts.push({
        id: genId(),
        type: 'kpi',
        title: 'Promotion Lift',
        agentName: 'historical_lift_calculator',
        timestamp: new Date(event.timestamp),
        context: { promo_id: promoId },
        data: { items } as KPIData,
      });
    }
  }

  // Charts from event
  if (event.charts) {
    for (const [chartName, figure] of Object.entries(event.charts)) {
      artifacts.push({
        id: genId(),
        type: 'chart',
        title: chartName === 'daily_lift' ? 'Daily Lift' : chartName.replace(/_/g, ' '),
        agentName: 'historical_lift_calculator',
        timestamp: new Date(event.timestamp),
        context: { promo_id: promoId },
        data: {
          data: figure.data,
          layout: figure.layout,
        } as ChartData,
      });
    }
  }

  return artifacts;
}

function buildMarginArtifacts(
  event: AgentEvent,
  promoId: string,
  result: Record<string, unknown> | null,
): AnalysisArtifact[] {
  if (!result) return [];

  const incrementalRevenue = result.incremental_revenue as number | undefined;
  const incrementalCost = result.incremental_cost as number | undefined;
  const incrementalProfit = result.incremental_profit as number | undefined;
  const roi = result.roi as number | undefined;

  if (incrementalRevenue === undefined) return [];

  const bars: MarginWaterfallData['waterfall']['bars'] = [];

  if (incrementalRevenue !== undefined) {
    bars.push({
      label: 'Incremental Revenue',
      value: incrementalRevenue,
      color: incrementalRevenue >= 0 ? 'positive' : 'negative',
    });
  }
  if (incrementalCost !== undefined) {
    bars.push({
      label: 'Promo Cost',
      value: -incrementalCost,
      color: 'negative',
    });
  }
  if (incrementalProfit !== undefined) {
    bars.push({
      label: 'Net Profit',
      value: incrementalProfit,
      color: incrementalProfit >= 0 ? 'positive' : 'negative',
      isTotal: true,
    });
  }

  return [
    {
      id: genId(),
      type: 'margin-waterfall',
      title: 'Margin Impact',
      agentName: 'margin_calculator',
      timestamp: new Date(event.timestamp),
      context: { promo_id: promoId },
      data: {
        summary: {
          gross_revenue: {
            value: formatCurrency(incrementalRevenue ?? 0),
            trend: (incrementalRevenue ?? 0) >= 0 ? 'positive' : 'negative',
          },
          promo_cost: {
            value: formatCurrency(-(incrementalCost ?? 0)),
            trend: 'negative',
          },
          gross_margin: {
            value: formatCurrency(incrementalProfit ?? 0),
            trend: (incrementalProfit ?? 0) >= 0 ? 'positive' : 'negative',
          },
          net_margin: {
            value: formatCurrency(incrementalProfit ?? 0),
            trend: (incrementalProfit ?? 0) >= 0 ? 'positive' : 'negative',
          },
        },
        waterfall: { bars },
      } as MarginWaterfallData,
    },
  ];
}

function buildGraphArtifacts(
  event: AgentEvent,
  promoId: string,
  result: Record<string, unknown> | null,
): AnalysisArtifact[] {
  if (!result) return [];

  const relationships = result.relationships as Array<{
    source_sku_id: string;
    target_sku_id: string;
    relationship_type: string;
    confidence: number;
  }> | undefined;

  const promoSkuIds = result.promo_sku_ids as string[] | undefined;
  const relatedSkuIds = result.related_sku_ids as string[] | undefined;

  if (!relationships || relationships.length === 0) return [];

  const nodeSet = new Set<string>();
  const promoSet = new Set(promoSkuIds || []);

  for (const rel of relationships) {
    nodeSet.add(rel.source_sku_id);
    nodeSet.add(rel.target_sku_id);
  }

  const nodes = Array.from(nodeSet).map((id) => ({
    id,
    name: formatSkuName(id),
    isFocus: promoSet.has(id),
  }));

  const edges = relationships.map((rel) => ({
    source: rel.source_sku_id,
    target: rel.target_sku_id,
    edgeType: rel.relationship_type as 'substitute_of' | 'complement_of',
    confidence: rel.confidence,
  }));

  return [
    {
      id: genId(),
      type: 'graph',
      title: 'Product Relationships',
      agentName: 'sku_expander',
      timestamp: new Date(event.timestamp),
      context: { promo_id: promoId },
      data: { nodes, edges } as GraphData,
    },
  ];
}

function buildNetworkArtifacts(
  event: AgentEvent,
  promoId: string,
  result: Record<string, unknown> | null,
): AnalysisArtifact[] {
  if (!result) return [];

  const rows: Record<string, unknown>[] = [];

  // Build table from network impact data
  const perSkuImpacts = result.per_sku_impacts as Array<{
    sku_id: string;
    impact_type: string;
    incremental_units: number;
    incremental_margin: number;
  }> | undefined;

  if (perSkuImpacts && perSkuImpacts.length > 0) {
    for (const impact of perSkuImpacts) {
      rows.push({
        SKU: impact.sku_id,
        Type: impact.impact_type,
        'Incremental Units': Math.round(impact.incremental_units).toLocaleString(),
        'Margin Impact': formatCurrency(impact.incremental_margin),
      });
    }
  } else {
    // Build from summary fields
    const grossUnits = result.gross_incremental_units as number | undefined;
    const netUnits = result.net_incremental_units as number | undefined;
    const grossMargin = result.gross_incremental_margin as number | undefined;
    const netMargin = result.net_incremental_margin as number | undefined;

    if (grossUnits !== undefined) {
      rows.push({
        Metric: 'Gross Incremental Units',
        Value: Math.round(grossUnits).toLocaleString(),
      });
    }
    if (netUnits !== undefined) {
      rows.push({
        Metric: 'Net Incremental Units',
        Value: Math.round(netUnits).toLocaleString(),
      });
    }
    if (grossMargin !== undefined) {
      rows.push({
        Metric: 'Gross Margin',
        Value: formatCurrency(grossMargin),
      });
    }
    if (netMargin !== undefined) {
      rows.push({
        Metric: 'Net Margin',
        Value: formatCurrency(netMargin),
      });
    }
  }

  if (rows.length === 0) return [];

  const columns = Object.keys(rows[0]);

  return [
    {
      id: genId(),
      type: 'table',
      title: 'Network Impact',
      agentName: 'network_aggregator',
      timestamp: new Date(event.timestamp),
      context: { promo_id: promoId },
      data: { columns, rows } as TableData,
    },
  ];
}

// =============================================================================
// Network effect enrichment for margin waterfall
// =============================================================================

interface NetworkEffects {
  cannibalized_skus: Array<{ name: string; lift: string; impact: string }>;
  halo_skus: Array<{ name: string; lift: string; impact: string }>;
  gross_incremental_margin: number | null;
  total_cannibalization_margin: number | null;
  total_halo_margin: number | null;
  net_incremental_margin: number | null;
}

/**
 * Extract network effects (cannibalized/halo SKUs) from a network_aggregator result.
 *
 * Returns null if no effects exist.
 */
export function extractNetworkEffects(
  result: Record<string, unknown>,
): NetworkEffects | null {
  const substituteEffects = result.substitute_effects as Array<{
    sku_id: string;
    sku_name?: string | null;
    baseline_units?: number;
    cannibalization_units?: number;
    cannibalization_margin?: number;
  }> | undefined;

  const complementEffects = result.complement_effects as Array<{
    sku_id: string;
    sku_name?: string | null;
    baseline_units?: number;
    halo_units?: number;
    halo_margin?: number;
  }> | undefined;

  const cannibalized_skus: NetworkEffects['cannibalized_skus'] = [];
  const halo_skus: NetworkEffects['halo_skus'] = [];

  if (substituteEffects) {
    for (const effect of substituteEffects) {
      const margin = effect.cannibalization_margin ?? 0;
      if (margin === 0 && (effect.cannibalization_units ?? 0) === 0) continue;

      const baseline = effect.baseline_units ?? 0;
      const cannibUnits = effect.cannibalization_units ?? 0;
      const liftRatio = baseline !== 0 ? -(cannibUnits / baseline) * 100 : 0;

      cannibalized_skus.push({
        name: effect.sku_name || formatSkuName(effect.sku_id),
        lift: formatPercent(liftRatio),
        impact: formatCurrency(-margin),
      });
    }
  }

  if (complementEffects) {
    for (const effect of complementEffects) {
      const margin = effect.halo_margin ?? 0;
      if (margin === 0 && (effect.halo_units ?? 0) === 0) continue;

      const baseline = effect.baseline_units ?? 0;
      const haloUnits = effect.halo_units ?? 0;
      const liftRatio = baseline !== 0 ? (haloUnits / baseline) * 100 : 0;

      halo_skus.push({
        name: effect.sku_name || formatSkuName(effect.sku_id),
        lift: formatPercent(liftRatio),
        impact: formatCurrency(margin),
      });
    }
  }

  if (cannibalized_skus.length === 0 && halo_skus.length === 0) return null;

  return {
    cannibalized_skus,
    halo_skus,
    gross_incremental_margin: (result.gross_incremental_margin as number) ?? null,
    total_cannibalization_margin: (result.total_cannibalization_margin as number) ?? null,
    total_halo_margin: (result.total_halo_margin as number) ?? null,
    net_incremental_margin: (result.net_incremental_margin as number) ?? null,
  };
}

/**
 * Enrich an existing margin-waterfall artifact with network effects data.
 *
 * Returns a new artifact with the same id (so canvas pinning continues to work).
 */
export function enrichMarginWaterfall(
  existing: AnalysisArtifact,
  networkEffects: NetworkEffects,
): AnalysisArtifact {
  const data = existing.data as MarginWaterfallData;

  const gross = networkEffects.gross_incremental_margin;
  const cannib = networkEffects.total_cannibalization_margin;
  const halo = networkEffects.total_halo_margin;
  const net = networkEffects.net_incremental_margin;

  // Update net_margin in summary when network effects change the value
  const summary = net !== null
    ? {
        ...data.summary,
        net_margin: {
          value: formatCurrency(net),
          trend: (net >= 0 ? 'positive' : 'negative') as 'positive' | 'negative',
        },
      }
    : data.summary;

  // Rebuild waterfall bars and summary KPIs to show network effect decomposition
  // (Gross Lift → Cannibalization → Halo → Net Impact) matching the report
  let waterfall = data.waterfall;
  let summaryItems = data.summary_items;

  if (gross !== null && cannib !== null && halo !== null && net !== null) {
    waterfall = {
      bars: [
        { label: 'Gross Lift', value: gross, color: (gross >= 0 ? 'positive' : 'negative') as 'positive' | 'negative' },
        { label: 'Cannibalization', value: -cannib, color: 'negative' as const },
        { label: 'Halo Effect', value: halo, color: 'positive' as const },
        { label: 'Net Impact', value: net, color: (net >= 0 ? 'positive' : 'negative') as 'positive' | 'negative', isTotal: true },
      ],
    };

    summaryItems = [
      { label: 'Gross Margin', value: formatCurrency(gross), trend: (gross >= 0 ? 'positive' : 'negative') as 'positive' | 'negative' },
      { label: 'Cannibalization', value: formatCurrency(-cannib), trend: 'negative' },
      { label: 'Halo', value: formatCurrency(halo), trend: 'positive' },
      { label: 'Net Margin', value: formatCurrency(net), trend: (net >= 0 ? 'positive' : 'negative') as 'positive' | 'negative' },
    ];
  }

  return {
    ...existing,
    data: {
      ...data,
      summary,
      summary_items: summaryItems,
      waterfall,
      cannibalized_skus: networkEffects.cannibalized_skus,
      halo_skus: networkEffects.halo_skus,
    },
  };
}

function buildPreflightArtifacts(
  event: AgentEvent,
  promoId: string,
  result: Record<string, unknown> | null,
): AnalysisArtifact[] {
  if (!result) return [];

  const artifacts: AnalysisArtifact[] = [];

  // Similar promos — map backend shape to frontend SimilarPromo
  const rawPromos = result.similar_promos as Record<string, unknown>[] | undefined;
  if (rawPromos && rawPromos.length > 0) {
    const promos: SimilarPromo[] = rawPromos.map((p) => ({
      promo_id: p.promo_id as string,
      name: (p.name as string) ?? (p.promo_id as string),
      similarity_score: Math.round(((p.similarity_score as number) ?? 0) * 100) / 10,
      success_score: Math.round((p.performance_score as number) ?? 0) / 10,
      discount:
        p.discount_value != null ? `${p.discount_value}% off` : '—',
      date_range:
        p.start_date && p.end_date
          ? formatDateRange(p.start_date as string, p.end_date as string)
          : '',
      sku_count: Array.isArray(p.sku_ids) ? p.sku_ids.length : 0,
      category: p.category as string | undefined,
    }));

    artifacts.push({
      id: genId(),
      type: 'similar-promos',
      title: 'Similar Past Promotions',
      agentName: 'plan_promotion',
      timestamp: new Date(event.timestamp),
      context: { promo_id: promoId },
      data: { promos } as SimilarPromosData,
    });
  }

  // Extract scenarios FIRST — independent of risk detection
  const rawScenarios = result.scenarios as Array<{
    discount_level: number;
    predicted_lift: number;
    predicted_margin: number;
    predicted_roi: number;
    risk_adjusted_margin?: number;
    cannibalization_impact?: number;
  }> | undefined;

  // Risk assessment from backend risks
  const rawRisks = result.risks as Array<{
    risk_type: string;
    severity: string;
    confidence: number;
    explanation: string;
    affected_skus?: string[];
  }> | undefined;
  const hasRisks = rawRisks && rawRisks.length > 0;
  const hasScenarios = rawScenarios && rawScenarios.length > 0;

  if (hasRisks || hasScenarios) {
    const riskTypeMap: Record<string, RiskFactor['category']> = {
      cannibalization: 'cannibalization',
      margin_erosion: 'discount_depth',
      timing_conflict: 'timing',
      internal_conflict: 'timing',
    };
    const severityScoreMap: Record<string, number> = { high: 8, medium: 5, low: 2 };

    const factors: RiskFactor[] = hasRisks
      ? rawRisks.map((r) => {
          let description = r.explanation;
          if (r.affected_skus) {
            for (const skuId of r.affected_skus) {
              description = description.replaceAll(skuId, formatSkuName(skuId));
            }
          }
          return {
            category: riskTypeMap[r.risk_type] ?? 'history',
            risk_score: Math.round((severityScoreMap[r.severity] ?? 5) * (r.confidence || 1)),
            description,
          };
        })
      : [];

    const backendScore = result.overall_risk_score as number | undefined;
    const overallScore = hasRisks
      ? Math.round((backendScore ?? 0.5) * 10)
      : 0;
    const riskLevel: RiskAssessment['risk_level'] =
      overallScore <= 3 ? 'low' : overallScore <= 6 ? 'medium' : 'high';

    // Extract learnings from top similar promos
    const learnings = (rawPromos ?? [])
      .filter((p) => (p.performance_score as number) > 60)
      .slice(0, 2)
      .map((p) => ({
        source_promo: (p.name as string) ?? (p.promo_id as string),
        insight: `Similarity ${Math.round(((p.similarity_score as number) ?? 0) * 100)}%, performance ${Math.round((p.performance_score as number) ?? 0)}/100`,
      }));

    const assessment: RiskAssessment = {
      overall_risk_score: overallScore,
      risk_level: riskLevel,
      factors,
      learnings,
    };

    artifacts.push({
      id: genId(),
      type: 'risk-assessment',
      title: 'Risk Assessment',
      agentName: 'plan_promotion',
      timestamp: new Date(event.timestamp),
      context: { promo_id: promoId },
      data: { assessment, scenarios: rawScenarios } as RiskAssessmentData,
    });
  }

  // Guardrails → Suggestions artifact
  const rawGuardrails = result.guardrails as Array<{
    suggestion_type: string;
    reasoning: string;
    affected_skus?: string[];
    evidence?: Array<{
      expected_impact?: string;
      margin_delta?: number;
    }>;
  }> | undefined;
  if (rawGuardrails && rawGuardrails.length > 0) {
    const categoryMap: Record<string, RiskSuggestion['category']> = {
      exclude_sku: 'skus',
      adjust_timing: 'timing',
      cap_discount: 'discount',
      monitor_substitutes: 'skus',
    };
    const affectsMap: Record<string, RiskSuggestion['affects_factor']> = {
      exclude_sku: 'cannibalization',
      adjust_timing: 'timing',
      cap_discount: 'discount_depth',
      monitor_substitutes: 'cannibalization',
    };

    // Build factor scores from raw risks for reduction calculation
    const riskTypeToCategory: Record<string, string> = {
      cannibalization: 'cannibalization',
      margin_erosion: 'discount_depth',
      timing_conflict: 'timing',
      internal_conflict: 'timing',
    };
    const sevMap: Record<string, number> = { high: 8, medium: 5, low: 2 };
    const factorScores: Record<string, number> = {};
    if (rawRisks) {
      for (const r of rawRisks) {
        const cat = riskTypeToCategory[r.risk_type] ?? 'history';
        const score = Math.round((sevMap[r.severity] ?? 5) * (r.confidence || 1));
        factorScores[cat] = Math.max(factorScores[cat] ?? 0, score);
      }
    }
    const numFactors = Math.max(1, Object.keys(factorScores).length);

    // Count guardrails per factor so each one reduces its share
    const guardrailsPerFactor: Record<string, number> = {};
    for (const g of rawGuardrails) {
      const factor = affectsMap[g.suggestion_type] ?? 'discount_depth';
      guardrailsPerFactor[factor] = (guardrailsPerFactor[factor] ?? 0) + 1;
    }

    const suggestions: RiskSuggestion[] = rawGuardrails.map((g, i) => {
      // Replace raw SKU IDs with human-readable names in text
      let reasoning = g.reasoning;
      if (g.affected_skus) {
        for (const skuId of g.affected_skus) {
          reasoning = reasoning.replaceAll(skuId, formatSkuName(skuId));
        }
      }
      // Also replace any remaining raw SKU IDs not in affected_skus
      reasoning = reasoning.replace(
        /\b(synth_merchant_\d+_[A-Za-z][A-Za-z0-9]+-[A-Za-z0-9]+-[A-Za-z0-9]+)\b/g,
        (match) => formatSkuName(match),
      );

      // Compute risk reduction on 1-10 scale
      const factor = affectsMap[g.suggestion_type] ?? 'discount_depth';
      const fScore = factorScores[factor] ?? 4;
      const numG = guardrailsPerFactor[factor] ?? 1;
      // Each guardrail reduces its factor by an equal share (halving the factor total)
      const perGuardrailFactorReduction = Math.round((fScore * 0.5) / numG);
      // Overall reduction proportional to factor weight
      const perGuardrailOverallReduction = Math.round(perGuardrailFactorReduction * (1 / numFactors) * 10) / 10;

      return {
        id: `guardrail-${i}`,
        category: categoryMap[g.suggestion_type] ?? 'discount',
        suggestion: reasoning,
        impact: g.evidence?.[0]?.expected_impact ?? '',
        new_value: g.affected_skus?.map(formatSkuName).join(', '),
        risk_reduction: Math.max(0.5, perGuardrailOverallReduction),
        applied: false,
        affects_factor: factor,
        factor_reduction: Math.max(1, perGuardrailFactorReduction),
      };
    });

    artifacts.push({
      id: genId(),
      type: 'suggestions',
      title: 'Risk Optimization Suggestions',
      agentName: 'plan_promotion',
      timestamp: new Date(event.timestamp),
      context: { promo_id: promoId },
      data: { suggestions } as SuggestionsData,
    });
  }

  return artifacts;
}

// =============================================================================
// Per-SKU result extraction from agent results
// =============================================================================

/**
 * Entity keys from the backend are "merchant_id:sku_id" format.
 * Extract the sku_id part.
 */
function extractSkuId(entityKey: string): string {
  const parts = entityKey.split(':');
  return parts.length > 1 ? parts.slice(1).join(':') : entityKey;
}

interface EntityBreakdownMap {
  [entityId: string]: Record<string, unknown>;
}

/**
 * Accumulate per-SKU data from an agent_completed event's agent_result.
 *
 * Call this for each agent_completed event. Pass the previous accumulated
 * results and get back the merged result.
 *
 * Data sources:
 * - counterfactual_baseline: baseline_units, actual_units (from baseline_by_entity)
 * - historical_lift_calculator: lift_percent, incremental_units, incremental_revenue (from lift_by_entity)
 * - margin_calculator: incremental_revenue (override), roi (from margin_by_entity)
 */
export function accumulateSkuResults(
  agentName: string,
  agentResult: Record<string, unknown> | null,
  existing: Record<string, Partial<SkuResult>>,
): Record<string, Partial<SkuResult>> {
  if (!agentResult) return existing;

  const merged = { ...existing };

  if (agentName === 'counterfactual_baseline') {
    const byEntity = agentResult.baseline_by_entity as EntityBreakdownMap | undefined;
    if (byEntity) {
      for (const [entityId, breakdown] of Object.entries(byEntity)) {
        const skuId = extractSkuId(entityId);
        merged[skuId] = {
          ...merged[skuId],
          baseline_units: breakdown.total_baseline_units as number,
          actual_units: breakdown.total_actual_units as number,
        };
      }
    }
  }

  if (agentName === 'historical_lift_calculator') {
    const byEntity = agentResult.lift_by_entity as EntityBreakdownMap | undefined;
    if (byEntity) {
      for (const [entityId, breakdown] of Object.entries(byEntity)) {
        const skuId = extractSkuId(entityId);
        merged[skuId] = {
          ...merged[skuId],
          lift_percent: breakdown.lift_percent as number,
          incremental_units: breakdown.incremental_units as number,
          incremental_revenue: breakdown.incremental_revenue as number | undefined,
        };
      }
    }
  }

  if (agentName === 'margin_calculator') {
    const byEntity = agentResult.margin_by_entity as EntityBreakdownMap | undefined;
    if (byEntity) {
      for (const [entityId, breakdown] of Object.entries(byEntity)) {
        const skuId = extractSkuId(entityId);
        merged[skuId] = {
          ...merged[skuId],
          incremental_revenue: breakdown.incremental_revenue as number,
          roi: breakdown.roi as number,
        };
      }
    }
  }

  return merged;
}

/**
 * Finalize accumulated partial SKU results into complete SkuResult records.
 * Only includes SKUs that have at least lift_percent data.
 */
export function finalizeSkuResults(
  accumulated: Record<string, Partial<SkuResult>>,
): Record<string, SkuResult> {
  const results: Record<string, SkuResult> = {};

  for (const [skuId, partial] of Object.entries(accumulated)) {
    // Require at least lift data to include
    if (partial.lift_percent === undefined) continue;

    results[skuId] = {
      lift_percent: partial.lift_percent ?? 0,
      baseline_units: partial.baseline_units ?? 0,
      actual_units: partial.actual_units ?? 0,
      incremental_units: partial.incremental_units ?? 0,
      incremental_revenue: partial.incremental_revenue ?? 0,
      roi: partial.roi ?? 0,
    };
  }

  return results;
}
