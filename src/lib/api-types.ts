/**
 * TypeScript types matching backend Pydantic schemas.
 *
 * These types mirror the schemas in:
 * - src/api/schemas/requests.py
 * - src/api/schemas/events.py
 * - src/api/schemas/responses.py
 * - src/core/outputs.py
 */

// =============================================================================
// UI State Types
// =============================================================================

export type AnalysisStatus = 'idle' | 'running' | 'completed' | 'failed';

// =============================================================================
// Request Types
// =============================================================================

export type IntentType = 'evaluate_promotion' | 'plan_promotion';

export interface AnalyzeRequest {
  intent_type: IntentType;
  entities: EvaluatePromotionEntities | PlanPromotionEntities;
  raw_query?: string;
  constraints?: AnalysisConstraints;
}

export interface EvaluatePromotionEntities {
  sku?: string;
  promo_id?: string;
  start_date: string; // ISO date
  end_date: string;   // ISO date
  unit_cost?: number;
  unit_price?: number;
  promo_value?: number;
}

export interface PlanPromotionEntities {
  sku: string;
  start_date: string;
  end_date: string;
  promo_type?: string;
  promo_value?: number;
}

export interface AnalysisConstraints {
  max_discount_percent?: number;
  min_roi?: number;
  max_budget?: number;
}

// =============================================================================
// SSE Event Types
// =============================================================================

export type SSEEventType =
  | 'run_started'
  | 'agent_started'
  | 'agent_completed'
  | 'agent_skipped'
  | 'agent_failed'
  | 'run_completed'
  | 'run_failed';

export type RunStatus = 'success' | 'failed' | 'skipped';

export interface InputDependency {
  source_type: 'model' | 'agent' | 'ontology' | 'data';
  source_name: string;
  source_version?: string;
}

export interface AgentSnapshot {
  agent_name: string;
  agent_version: string;
  inputs: InputDependency[];
  planned: boolean;
  position: number;
  started_at: string;
  completed_at: string;
  duration_ms: number;
  status: RunStatus;
  output_type?: string;
  error_message?: string;
  skip_reason?: string;
}

export interface PlotlyFigure {
  data: unknown[];
  layout: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export interface AgentEvent {
  type: SSEEventType;
  run_id: string;
  timestamp: string;
  /** Session ID for conversation tracking (chat endpoints only) */
  session_id?: string;
  agent_name?: string;
  snapshot?: AgentSnapshot;
  charts?: Record<string, PlotlyFigure>;
  /** Serialized agent result for data artifacts (margin, lift, etc.) */
  agent_result?: Record<string, unknown>;
  execution_result?: ExecutionResult;
  run_error?: string;
}

// =============================================================================
// Execution Result Types
// =============================================================================

export interface ExecutionPlan {
  pattern_name: string;
  agents: string[];
  data_requirements: unknown[];
  chains: unknown[];
}

export interface DataScope {
  data_start_date: string;
  data_end_date: string;
  entity_filters: Record<string, unknown>;
}

export interface ExecutionResult {
  run_id: string;
  started_at: string;
  completed_at: string;
  plan: ExecutionPlan;
  agent_results: Record<string, DomainObject | null>;
  success: boolean;
  error?: string;
  skipped_agents: Array<[string, string]>;
  duration_ms: number;
  agent_runs: AgentSnapshot[];
  scope?: DataScope;
}

// =============================================================================
// Domain Objects
// =============================================================================

export type DomainObject = BaselinePrediction | LiftResult | MarginResult;

export interface EntityBaselineBreakdown {
  dates: string[];
  baseline_units: number[];
  actual_units: Array<number | null>;
  total_baseline_units: number;
  total_actual_units: number;
  baseline_revenue?: number[];
  total_revenue?: number;
}

export interface BaselinePrediction {
  dates: string[];
  baseline_units: number[];
  actual_units: Array<number | null>;
  total_baseline_units: number;
  total_actual_units: number;
  confidence_interval: [number, number];
  daily_confidence_intervals: Array<[number, number]>;
  baseline_revenue?: number[];
  total_revenue?: number;
  promo_id?: string;
  entity_ids?: string[];
  baseline_by_entity?: Record<string, EntityBaselineBreakdown>;
}

export interface EntityLiftBreakdown {
  dates: string[];
  daily_lift_units: Array<number | null>;
  incremental_units: number;
  lift_percent: number;
  daily_lift_revenue?: number[];
  incremental_revenue?: number;
}

export interface LiftResult {
  lift_percent: number;
  incremental_units: number;
  confidence_interval: [number, number];
  dates: string[];
  daily_lift_units: Array<number | null>;
  incremental_revenue?: number;
  daily_lift_revenue?: number[];
  promo_id?: string;
  similar_promos?: unknown[];
  z_score?: number;
  standard_error?: number;
  confidence?: string;
  lift_by_entity?: Record<string, EntityLiftBreakdown>;
}

export interface EntityMarginBreakdown {
  incremental_revenue: number;
  incremental_cost: number;
  incremental_profit: number;
  roi: number;
  break_even_lift?: number;
  recommendation?: string;
}

export interface MarginResult {
  incremental_revenue: number;
  incremental_cost: number;
  incremental_profit: number;
  roi: number;
  break_even_lift: number;
  recommendation: string;
  promo_id?: string;
  violates_constraints: boolean;
  constraint_violations?: string[];
  margin_by_entity?: Record<string, EntityMarginBreakdown>;
}

// =============================================================================
// Response Types
// =============================================================================

export interface AnalyzeResponse {
  success: boolean;
  results: Record<string, DomainObject>;
  duration_ms: number;
  skipped_agents: string[];
  error?: string;
  error_code?: string;
  run_id?: string;
}

// =============================================================================
// Product Graph Types
// =============================================================================

export interface GraphNodeResponse {
  id: string;
  name: string;
  category: string | null;
  is_focus: boolean;
}

export interface GraphEdgeResponse {
  source: string;
  target: string;
  edge_type: string;
  confidence: number;
}

export interface ProductGraphResponse {
  nodes: GraphNodeResponse[];
  edges: GraphEdgeResponse[];
}

// =============================================================================
// Decision Capture Types (from phase1_beta.md)
// =============================================================================

export type DecisionAction = 'accept' | 'override' | 'reject';

export type ReasonCategory =
  | 'external_factors'
  | 'domain_knowledge'
  | 'data_quality'
  | 'competitive'
  | 'strategic'
  | 'other';

export interface DecisionRecord {
  decision_id: string;
  timestamp: string;
  run_id: string;
  action: DecisionAction;
  override_values?: Record<string, unknown>;
  reason_category?: ReasonCategory;
  reason_text?: string;
}

// =============================================================================
// Run Record Types (mirrors src/core/run_record.py)
// =============================================================================

/**
 * Full snapshot of DataScope for storage.
 * Expanded from DataScope with all fields from backend.
 */
export interface DataScopeSnapshot {
  entity_filters: Record<string, unknown>;
  data_start_date: string;
  data_end_date: string;
  intent_start_date?: string;
  intent_end_date?: string;
  columns: string[];
  feature_categories: string[];
}

/**
 * The immutable audit artifact for every execution.
 * Mirrors src/core/run_record.py::RunRecord
 */
export interface RunRecord {
  run_id: string;
  created_at: string;
  completed_at: string;
  intent_type: string;
  entities: Record<string, unknown>;
  raw_query?: string;
  data_scope: DataScopeSnapshot;
  pattern_version: string;
  api_version: string;
  config_snapshot: Record<string, unknown>;
  pattern_name: string;
  agent_runs: AgentSnapshot[];
  status: RunStatus;
  results: Record<string, unknown>;
  duration_ms: number;
  constraints?: Record<string, unknown>;
  parent_run_id?: string;
  merchant_id?: string;
  schema_version: string;
  // Linked decision (embedded by backend or fetched separately)
  decision?: DecisionRecord;
}

/**
 * Lightweight summary for list views.
 * Mirrors src/core/run_record.py::RunRecordSummary
 */
export interface RunRecordSummary {
  run_id: string;
  created_at: string;
  intent_type: string;
  pattern_name: string;
  status: RunStatus;
  duration_ms: number;
  merchant_id?: string;
  agent_count: number;
  has_decision: boolean;
}

// =============================================================================
// Audit Report Types
// =============================================================================

export type AuditStatus = 'draft' | 'finalized';

export interface AuditReport {
  audit_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  merchant_id?: string;
  status: AuditStatus;
  notes?: string;
}

// =============================================================================
// Promo & Campaign List Types
// =============================================================================

export interface PromoSummary {
  promo_id: string;
  source: string;
  name: string | null;
  merchant_id: string;
  campaign_id: string | null;
  start_date: string;
  end_date: string;
  promo_type: string | null;
  promo_value: number;
  sku_ids: string[];
}

export interface PromoListResponse {
  promos: PromoSummary[];
  total: number;
}

export interface CampaignSummary {
  campaign_id: string;
  name: string | null;
  start_date: string;
  end_date: string;
  promo_ids: string[];
}

export interface CampaignListResponse {
  campaigns: CampaignSummary[];
  total: number;
}

export type EvidenceSection = 'summary' | 'analysis' | 'recommendations';

export interface EvidenceItem {
  evidence_id: string;
  audit_id: string;
  run_id: string;
  decision_id?: string;
  decision_action?: DecisionAction;
  snapshot: {
    intent_type: string;
    entities: Record<string, unknown>;
    results: Record<string, unknown>;
    created_at: string;
  };
  section: EvidenceSection;
  sort_order: number;
  annotation?: string;
}
