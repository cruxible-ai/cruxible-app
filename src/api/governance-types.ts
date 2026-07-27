/**
 * Hand-written response types for the 0.3 governance read surfaces.
 *
 * Same arrangement as `artifact-types.ts`: these routes are either hidden from
 * the daemon's `/openapi.json` (`include_in_schema=False` — outcome contracts)
 * or serve fields the generated schema does not project (the receipt list
 * omits `committed` and `actor_context`), so `pnpm gen:api` cannot type them
 * yet. Shapes are transcribed from the core contracts:
 *   - `cruxible_core/receipt/types.py`            → Receipt
 *   - `cruxible_core/resolution_contracts/types.py` → contracts + queues
 *   - `cruxible_core/attestation/types.py`        → CorroborationSummary
 * Delete these when the routes land in the published surface.
 */

/** Envelope shared by every list route. */
export interface ListEnvelope {
  total: number;
  limit?: number | null;
  offset?: number;
  truncated?: boolean;
  read_revision?: number | null;
}

// ── Receipts ─────────────────────────────────────────────────────────

/** The six fields `GET /list/receipts` actually returns per row. */
export interface ReceiptSummary {
  receipt_id: string;
  query_name?: string | null;
  parameters?: Record<string, unknown>;
  created_at?: string | null;
  duration_ms?: number | null;
  operation_type?: string | null;
}

export interface ReceiptListResult extends ListEnvelope {
  items: ReceiptSummary[];
  continuation_token?: string | null;
}

export interface GovernedActorContext {
  actor_type?: string;
  actor_id?: string;
  org_id?: string | null;
  operation_id?: string | null;
  timestamp?: string | null;
  request_id?: string | null;
}

export interface ReceiptNode {
  node_id: string;
  node_type: string;
  entity_type?: string | null;
  entity_id?: string | null;
  detail?: Record<string, unknown>;
  timestamp?: string;
}

/** `GET /receipts/{id}` — the only surface carrying `committed` + `actor_context`. */
export interface ReceiptDetail {
  receipt_id: string;
  query_name?: string | null;
  operation_type?: string | null;
  created_at?: string | null;
  duration_ms?: number | null;
  committed?: boolean;
  workflow_mode?: string | null;
  actor_context?: GovernedActorContext | null;
  nodes?: ReceiptNode[];
  head_snapshot_id?: string | null;
  read_revision?: number | null;
}

/**
 * Operation types that write. `committed === false` on one of these is a
 * REFUSAL; on a plain `query` it just means "this was a read".
 * From `OperationType` in `cruxible_core/receipt/types.py`.
 */
const READ_ONLY_OPERATIONS = new Set(["query", "gate_evaluation", "state_diff"]);

export function isMutationOperation(operationType: string | null | undefined): boolean {
  if (!operationType) return false;
  return !READ_ONLY_OPERATIONS.has(operationType);
}

export type ReceiptOutcome = "committed" | "refused" | "read" | "pending";

/**
 * The engine's verdict on one receipt. `refused` is the load-bearing case:
 * the mutation wrapper persists a receipt WITHOUT `mark_committed()` when a
 * guard, constraint, or policy rejects the write, so a refusal is a durable
 * record rather than a dropped request.
 */
export function receiptOutcome(detail: ReceiptDetail | undefined): ReceiptOutcome {
  if (!detail) return "pending";
  if (detail.committed) return "committed";
  if (isMutationOperation(detail.operation_type) || detail.workflow_mode) return "refused";
  return "read";
}

/**
 * Why the engine said no. Guard rejections land on a failed `validation` node
 * as `guard_error`; other refusals use `reason`/`message`. There is no
 * top-level refusal-reason field, so this walks the receipt trail.
 */
export function refusalReason(detail: ReceiptDetail | undefined): string | undefined {
  for (const node of detail?.nodes ?? []) {
    if (node.node_type !== "validation") continue;
    const d = node.detail ?? {};
    if (d.passed !== false) continue;
    for (const key of ["guard_error", "reason", "message", "error"]) {
      const v = d[key];
      if (typeof v === "string" && v.trim()) return v;
    }
  }
  return undefined;
}

/** Best-effort "what did this touch": first written/validated subject in the trail. */
export function receiptSubject(
  detail: ReceiptDetail | undefined,
): { entity_type: string; entity_id: string } | undefined {
  const nodes = detail?.nodes ?? [];
  const ranked = [
    ...nodes.filter((n) => n.node_type === "entity_write" || n.node_type === "relationship_write"),
    ...nodes.filter((n) => n.node_type === "validation"),
    ...nodes,
  ];
  for (const node of ranked) {
    if (node.entity_type && node.entity_id) {
      return { entity_type: node.entity_type, entity_id: node.entity_id };
    }
  }
  // Refused writes name their subject on the proposal node instead.
  for (const node of nodes) {
    const subjects = (node.detail as { subjects?: unknown } | undefined)?.subjects;
    if (Array.isArray(subjects) && subjects.length > 0) {
      const first = subjects[0] as { entity_type?: string; entity_id?: string };
      if (first?.entity_type && first?.entity_id) {
        return { entity_type: first.entity_type, entity_id: first.entity_id };
      }
    }
  }
  return undefined;
}

// ── Resolution (outcome) contracts ───────────────────────────────────

export type ContractStatus = "prepared" | "open" | "resolved";
export type ContractQueue = "due" | "overdue" | "contradicted";
export type ResolutionVerdict = "satisfied" | "contradicted" | "indeterminate";

export interface ContractMeasurement {
  kind: "query" | "attestation";
  query_name?: string;
  params?: Record<string, unknown>;
  expect?: {
    min_count?: number | null;
    max_count?: number | null;
    condition?: string | null;
    condition_scope?: "any" | "all" | null;
  };
  relationship_type?: string;
  from_type?: string;
  from_id?: string;
  to_type?: string;
  to_id?: string;
}

export interface ContractDeclaration {
  description: string;
  check_at: string;
  expires_at: string;
  measurement: ContractMeasurement;
}

export interface ResolutionContract {
  contract_id: string;
  entity_type: string;
  entity_id: string;
  subject_content_digest?: string;
  declaration: ContractDeclaration;
  opened_at?: string;
  actor_context?: GovernedActorContext;
  receipt_id?: string | null;
}

export interface ContractResolution {
  resolution_id: string;
  contract_id: string;
  sequence?: number;
  verdict: ResolutionVerdict;
  observed_at?: string;
  recorded_at?: string;
  note?: string | null;
  actor_context?: GovernedActorContext;
}

/** One row of `GET /outcome-contracts`. Note the nesting: the declaration
 *  fields live under `contract.declaration`, not on the item. */
export interface ContractListItem {
  contract: ResolutionContract;
  status: ContractStatus;
  activation?: { activation_id: string; activated_at?: string } | null;
  latest_resolution?: ContractResolution | null;
  latest_disposition?: { disposition_id: string; verdict: string } | null;
  expired?: boolean;
  subject_present?: boolean;
  subject_content_drifted?: boolean;
}

export interface ContractListResult extends ListEnvelope {
  items: ContractListItem[];
}

/** What the UI shows per decision: no contract at all is its own state. */
export type OutcomeState = "none" | "prepared" | "open" | "satisfied" | "contradicted" | "expired";

export function outcomeState(item: ContractListItem | undefined): OutcomeState {
  if (!item) return "none";
  const verdict = item.latest_resolution?.verdict;
  if (item.status === "resolved" && verdict === "satisfied") return "satisfied";
  if (item.status === "resolved" && verdict === "contradicted") return "contradicted";
  if (item.expired) return "expired";
  if (item.status === "prepared") return "prepared";
  return "open";
}

// ── Corroboration ────────────────────────────────────────────────────

/**
 * `CorroborationSummary`, attached to claim payloads on query rows and
 * inspect neighborhoods. Counts, never scores — `distinct_actor_count` is a
 * plain count and nothing weights corroboration by actor diversity.
 * The key is ABSENT when a claim has no attestations.
 */
export interface CorroborationSummary {
  support_count?: number;
  contradict_count?: number;
  unsure_count?: number;
  invalidated_count?: number;
  last_supported_at?: string;
  last_contradicted_at?: string;
  distinct_actor_count?: number;
  open_contradiction?: boolean;
  stale_content?: {
    support_count?: number;
    contradict_count?: number;
    unsure_count?: number;
    invalidated_count?: number;
  };
}

// ── Source evidence ──────────────────────────────────────────────────

export type DereferenceStatus =
  | "available"
  | "drifted"
  | "unavailable"
  | "revision_bytes_not_retained";

export interface DereferenceResult {
  status: DereferenceStatus;
  source_artifact_id: string;
  chunk_id?: string;
  content_hash?: string;
  expected_artifact_hash?: string;
  current_artifact_hash?: string | null;
  body_origin?: string | null;
  body?: string | null;
  reason?: string | null;
  artifact_revision_id?: string | null;
  revision_unpinned?: boolean;
}

/** "cisa_kev_catalog@2" -> 2. Returns null for an unparseable id. */
export function revisionNumber(artifactRevisionId: string | null | undefined): number | null {
  if (!artifactRevisionId) return null;
  const at = artifactRevisionId.lastIndexOf("@");
  if (at < 0) return null;
  const n = Number(artifactRevisionId.slice(at + 1));
  return Number.isInteger(n) ? n : null;
}
