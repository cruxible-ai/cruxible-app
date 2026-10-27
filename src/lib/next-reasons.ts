import type { NextReason } from "../api/schemas.ts";
import { sentence } from "./text.ts";

/**
 * What the console knows about each `next` reason: a label, the family that
 * groups it (the beliefs tabs filter by family), and the detail fields worth
 * rendering. `NextItem.detail` is untyped in the contract (`detail: Any`,
 * design gap G7), so each reason names its fields here, read with runtime
 * type checks; anything else in a detail falls back to a JSON view. The
 * table is total over the contract's reasons: a new reason fails to compile.
 */

export type NextFamily =
  | "contested"
  | "stale"
  | "drifted"
  | "evidence"
  | "proposals"
  | "lines"
  | "projections"
  | "predictions"
  | "operations";

export const FAMILY_LABEL: Record<NextFamily, string> = {
  contested: "Contested beliefs",
  stale: "Stale beliefs",
  drifted: "Drifted citations",
  evidence: "Evidence",
  proposals: "Proposals",
  lines: "Lines",
  projections: "Projections and floor",
  predictions: "Predictions",
  operations: "Operations",
};

/** How a detail field renders. */
export type FieldKind = "text" | "words" | "count" | "time" | "ref" | "run" | "capture" | "claim" | "list" | "digest" | "cause";

export interface FieldSpec {
  key: string;
  label: string;
  kind: FieldKind;
}

/** Whether the row's attestation counts toward the verdict, when its detail says. */
export interface CountsNote {
  counts: boolean;
  reason: string;
}

export interface ReasonMeta {
  label: string;
  family: NextFamily;
  fields: FieldSpec[];
  /** What the row's detail implies for the verdict, in words. */
  counts?: (detail: Record<string, unknown>) => CountsNote | null;
}

const f = (key: string, label: string, kind: FieldKind = "text"): FieldSpec => ({ key, label, kind });

/** An attestation `claim attest` recorded and next resurfaces: the Claim, its Capture if any, who, when, basis, note. */
const DOOR_FIELDS: FieldSpec[] = [
  f("claim_id", "Claim", "claim"),
  f("capture_digest", "Capture", "capture"),
  f("attesting_principal", "By"),
  f("attested_at", "At", "time"),
  f("attestation_basis", "Basis", "words"),
  f("note", "Note"),
];

export const REASONS: Record<NextReason, ReasonMeta> = {
  claim_conflicted: {
    label: "Claims conflict",
    family: "contested",
    fields: [f("predicate", "Predicate"), f("qualifier", "Qualifier"), f("contender_count", "Contenders", "count"), f("suggested_qualifier_field", "Split by")],
  },
  claim_contradicting_evidence_available: {
    label: "Contradicting evidence attested",
    family: "contested",
    fields: [...DOOR_FIELDS, f("stance", "Stance")],
    // Without a Capture the row is a recorded contradiction of a Claim whose
    // ClaimType has no consequence policy: resurfaced, the verdict does not move.
    counts: (detail) =>
      detail.capture_digest === undefined
        ? { counts: false, reason: "recorded, and the ClaimType has no consequence policy: the verdict does not move" }
        : null,
  },
  claim_new_evidence_unreviewed: {
    label: "New evidence, unreviewed",
    family: "contested",
    fields: [...DOOR_FIELDS, f("stance", "Stance")],
  },
  claim_attestation_threshold_met: {
    label: "Attestation threshold met",
    family: "contested",
    fields: [f("claim_identity", "Claim", "ref"), f("rule_id", "Rule"), f("stance", "Stance")],
  },
  claim_stale_evidence: {
    label: "Evidence expired",
    family: "stale",
    fields: [f("verdict", "Verdict"), f("expired_capture_digests", "Expired captures", "list"), f("last_expired_at", "Last expired", "time")],
  },
  evidence_expiring: {
    label: "Evidence expiring",
    family: "stale",
    fields: [f("predicate", "Predicate"), f("expirations", "Expirations", "list")],
  },
  claim_dependency_stale: {
    label: "Derived from stale inputs",
    family: "stale",
    fields: [f("stale_inputs", "Stale inputs", "list")],
  },
  claim_uncovered: {
    label: "Not covered by admitted evidence",
    family: "stale",
    fields: [f("predicate", "Predicate"), f("verdict", "Verdict"), f("currency", "Currency"), f("policy_hint", "Hint")],
  },
  citation_drifted: {
    label: "Cited source drifted",
    family: "drifted",
    fields: [f("citation_id", "Citation"), f("source_id", "Source"), f("expected_source_digest", "Expected", "digest"), f("observed_source_digest", "Observed", "digest")],
  },
  citation_source_unobserved: {
    label: "Cited source not observed",
    family: "drifted",
    fields: [f("citation_id", "Citation"), f("source_id", "Source"), f("expected_source_digest", "Expected", "digest")],
  },
  document_modified: {
    label: "Document modified in the workspace",
    family: "drifted",
    fields: [f("document_id", "Document"), f("source_id", "Source"), f("accepted_body_digest", "Accepted", "digest"), f("observed_source_digest", "Observed", "digest")],
  },
  workspace_binding_missing: {
    label: "Bound workspace file missing",
    family: "drifted",
    fields: [f("document_id", "Document"), f("source_id", "Source"), f("locator", "Locator"), f("message", "")],
  },
  claim_new_evidence_supporting: {
    label: "New supporting evidence",
    family: "evidence",
    fields: DOOR_FIELDS,
  },
  claim_evidence_erased: {
    label: "Cited evidence erased",
    family: "evidence",
    fields: [f("predicate", "Predicate"), f("erased_capture_digests", "Erased captures", "list"), f("checked_at", "Checked", "time")],
  },
  evidence_unavailable: {
    label: "Evidence body unavailable",
    family: "evidence",
    fields: [f("capture_digest", "Capture", "capture"), f("citation_id", "Citation"), f("part", "Part"), f("state", "State"), f("checked_at", "Checked", "time")],
  },
  proposal_stale: {
    label: "Proposal stale against accepted state",
    family: "proposals",
    fields: [f("proposal_id", "Proposal", "ref"), f("target_ref", "Target")],
  },
  proposal_awaiting_approval: {
    label: "Proposal awaiting approval",
    family: "proposals",
    fields: [f("actor_id", "Proposed by"), f("admitted_at", "Admitted", "time"), f("signer_id", "Signer"), f("eligible_approvals", "Eligible approvals", "list")],
  },
  proposal_awaiting_activation: {
    label: "Proposal awaiting activation",
    family: "proposals",
    fields: [f("admitted_at", "Admitted", "time"), f("approvals", "Approvals", "list"), f("target_ref", "Target")],
  },
  line_coverage_gap: {
    label: "Line coverage gap",
    family: "lines",
    fields: [f("since", "Since", "time"), f("until", "Until", "time"), f("detail", "")],
  },
  line_work_pending: {
    label: "Line work pending",
    family: "lines",
    fields: [f("due", "Due", "count"), f("oldest_eligible_at", "Oldest", "time"), f("detail", "")],
  },
  line_disabled_by_upgrade: {
    label: "Line disabled by upgrade",
    family: "lines",
    fields: [f("procedure_version", "Version"), f("detail", "")],
  },
  line_not_enabled: {
    label: "Line not enabled",
    family: "lines",
    fields: [f("detail", "")],
  },
  line_run_failed: {
    label: "Line run failed",
    family: "lines",
    fields: [f("run_id", "Run", "run"), f("finalized_at", "At", "time"), f("failure_code", "Code", "words"), f("cause", "Cause", "cause"), f("detail", "")],
  },
  line_settled_prior_refusals: {
    label: "Line settled over prior refusals",
    family: "lines",
    fields: [f("settled_items_matching_refusals", "Items", "list"), f("settled_runs", "Runs", "list"), f("latest_run_id", "Latest run"), f("latest_settled_at", "Latest", "time")],
  },
  line_inbox_unread: {
    label: "Line inbox unread",
    family: "lines",
    fields: [f("unread", "Unread", "count"), f("availability", "Availability"), f("detail", "")],
  },
  floor_invalid: { label: "Workspace floor invalid", family: "projections", fields: [f("state", "State"), f("message", "")] },
  projection_dirty: {
    label: "Projection edited",
    family: "projections",
    fields: [f("source_id", "Source"), f("block_id", "Block"), f("expected_body_digest", "Expected", "digest"), f("observed_body_digest", "Observed", "digest")],
  },
  projection_backing_stale: {
    label: "Projection backing stale",
    family: "projections",
    fields: [f("source_id", "Source"), f("block_id", "Block"), f("backing_state", "Backing"), f("stale_backings", "Stale backings", "list")],
  },
  projection_marker_invalid: { label: "Projection marker invalid", family: "projections", fields: [f("source_id", "Source"), f("block_id", "Block")] },
  unregistered_projection_block: { label: "Unregistered projection block", family: "projections", fields: [f("source_id", "Source"), f("block_id", "Block")] },
  prediction_settleable: { label: "Prediction settleable", family: "predictions", fields: [f("bound_contract_id", "Contract"), f("window", "Window", "list")] },
  prediction_window_unbindable: { label: "Prediction window unbindable", family: "predictions", fields: [f("code", "Code")] },
  mandate_expiring: { label: "Mandate expiring", family: "operations", fields: [f("procedure_identity", "Procedure", "ref"), f("expires_at", "Expires", "time"), f("grants", "Grants", "list")] },
  consumer_stalled: { label: "Consumer stalled", family: "operations", fields: [f("kind", "Kind"), f("state", "State")] },
  subject_kind_undeclared: { label: "Subject kind undeclared", family: "operations", fields: [f("kind", "Kind"), f("live_subjects", "Live Subjects", "count")] },
  kit_resume_blocked: { label: "Kit resume blocked", family: "operations", fields: [f("kit_id", "Kit"), f("version", "Version"), f("actor_id", "Actor"), f("recorded_at", "Recorded", "time"), f("detail", "")] },
};

/** The beliefs tabs: next families about accepted Claims. */
export const BELIEF_TABS = ["contested", "stale", "drifted"] as const satisfies readonly NextFamily[];
export type BeliefTab = (typeof BELIEF_TABS)[number];

/**
 * A reason's metadata. The table is total over the pinned contract; a reason
 * a newer daemon serves renders under its own words in Operations, its detail
 * as JSON, instead of breaking the page.
 */
export function reasonMeta(reason: NextReason): ReasonMeta {
  return REASONS[reason] ?? { label: sentence(String(reason).replaceAll("_", " ")), family: "operations", fields: [] };
}

export function familyOf(reason: NextReason): NextFamily {
  return reasonMeta(reason).family;
}

/** A detail as a record, or null when the contract served something else. */
export function detailRecord(detail: unknown): Record<string, unknown> | null {
  return typeof detail === "object" && detail !== null && !Array.isArray(detail)
    ? (detail as Record<string, unknown>)
    : null;
}

/** The named fields present in a detail, and the rest (rendered as JSON). */
export function splitDetail(reason: NextReason, detail: unknown) {
  const record = detailRecord(detail);
  if (!record) return { fields: [] as { spec: FieldSpec; value: unknown }[], rest: detail ?? null };
  const specs = reasonMeta(reason).fields;
  const fields = specs
    .filter((spec) => record[spec.key] !== undefined && record[spec.key] !== null)
    .map((spec) => ({ spec, value: record[spec.key] }));
  const named = new Set(specs.map((spec) => spec.key));
  const restEntries = Object.entries(record).filter(([key, value]) => !named.has(key) && value !== null);
  return { fields, rest: restEntries.length ? Object.fromEntries(restEntries) : null };
}

/** The Capture handle get resolves for a capture digest: CAP- plus 12 hex. */
export function captureHandle(digest: string): string {
  return `CAP-${digest.replace(/^sha256:/, "").slice(0, 12)}`;
}
