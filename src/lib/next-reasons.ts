import type { NextReason } from "../api/schemas.ts";
import { sentence } from "./text.ts";

/**
 * What the console knows about each `next` reason: a label, the family that
 * groups it (the Beliefs preset filters by family), and the detail fields worth
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
export type FieldKind = "text" | "words" | "count" | "time" | "ref" | "run" | "capture" | "claim" | "list" | "digest" | "cause" | "source" | "prose";

export interface FieldSpec {
  key: string;
  label: string;
  kind: FieldKind;
  /**
   * A prose field's inputs: the typed detail keys core builds the sentence
   * from (service/discovery/next.py). When every one of them is in the
   * detail, the row's subject, typed fields and repair already say what the
   * sentence says, so it is not shown; `[]` marks a constant sentence that
   * restates the reason itself. A prose field without `restates` carries
   * something nothing else in the row does (a refusal, a cause, guidance)
   * and is shown as written.
   */
  restates?: readonly string[];
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
/** Core's sentence: shown as written, unless `restates` names the typed keys it is built from (see FieldSpec). */
const prose = (key: string, restates?: readonly string[]): FieldSpec => (restates ? { key, label: "", kind: "prose", restates } : { key, label: "", kind: "prose" });

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
    fields: [f("predicate", "Predicate"), f("verdict", "Verdict"), f("currency", "Currency"), prose("policy_hint")],
  },
  citation_drifted: {
    label: "Cited source drifted",
    family: "drifted",
    // the served detail: drift_state, logical_source {plane, identity}, the commitment digests
    fields: [
      f("drift_state", "", "words"),
      f("logical_source", "Source", "source"),
      f("source_id", "Source"),
      f("expected_commitment_digest", "Expected", "digest"),
      f("observed_window_digest", "Observed", "digest"),
    ],
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
    // "the file catalog binds a workspace file that does not exist": the reason itself
    fields: [f("document_id", "Document"), f("source_id", "Source"), f("locator", "Locator"), prose("message", [])],
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
    // the author's row explains readmit (stale_repair), the approver's says it awaits the author (detail): both restate the reason and repair
    fields: [f("proposal_id", "Proposal", "ref"), f("target_ref", "Target"), f("stale_paths", "Stale paths", "list"), prose("stale_repair", []), prose("detail", [])],
  },
  proposal_awaiting_approval: {
    label: "Proposal awaiting approval",
    family: "proposals",
    fields: [f("actor_id", "Proposed by"), f("admitted_at", "Admitted", "time"), f("signer_id", "Signer"), f("eligible_approvals", "Eligible approvals", "list"), f("minimum_distinct_signers", "Signers needed", "count")],
  },
  proposal_awaiting_activation: {
    label: "Proposal awaiting activation",
    family: "proposals",
    fields: [f("admitted_at", "Admitted", "time"), f("approvals", "Approvals", "list"), f("target_ref", "Target")],
  },
  line_coverage_gap: {
    label: "Line coverage gap",
    family: "lines",
    fields: [f("since", "Since", "time"), f("until", "Until", "time"), prose("detail", [])],
  },
  line_work_pending: {
    label: "Line work pending",
    family: "lines",
    fields: [f("due", "Due", "count"), f("oldest_eligible_at", "Oldest", "time"), prose("detail", [])],
  },
  line_disabled_by_upgrade: {
    label: "Line disabled by upgrade",
    family: "lines",
    // "disabled by upgrade to {version}; enable to resume"
    fields: [f("procedure_version", "Version"), prose("detail", ["procedure_version"])],
  },
  line_not_enabled: {
    label: "Line not enabled",
    family: "lines",
    fields: [prose("detail", [])],
  },
  line_input_missing: {
    label: "Line input missing",
    family: "lines",
    // "the file this Line reads is not in the workspace yet" / "... is gone since it last ran": the severity says which
    fields: [f("relative_path", "File"), f("parameter", "Parameter"), f("node_id", "Step"), f("description", "About"), prose("detail", [])],
  },
  line_run_failed: {
    label: "Line run failed",
    family: "lines",
    fields: [f("run_id", "Run", "run"), f("finalized_at", "At", "time"), f("failure_code", "Code", "words"), f("cause", "Cause", "cause"), prose("detail", [])],
  },
  line_settled_prior_refusals: {
    label: "Line settled over prior refusals",
    family: "lines",
    // the sentence names a second way out (bind a fixed Procedure) no repair carries: shown
    fields: [
      f("settled_items_matching_refusals", "Items", "count"),
      f("settled_runs", "Runs", "count"),
      f("latest_run_id", "Latest run", "run"),
      f("latest_settled_at", "Latest", "time"),
      prose("detail"),
    ],
  },
  line_inbox_unread: {
    label: "Line inbox unread",
    family: "lines",
    // "{count} new inbox items from {line}." restates unread and the row's Line; the unavailable row's sentence says why
    fields: [f("unread", "Unread", "count"), f("availability", "Availability", "words"), f("payload_digest", "Payload", "digest"), prose("detail", ["unread"])],
  },
  floor_invalid: { label: "Workspace floor invalid", family: "projections", fields: [f("reported_status", "Status", "words"), f("state", "State"), prose("message")] },
  projection_dirty: {
    label: "Projection edited",
    family: "projections",
    fields: [f("source_id", "Source"), f("block_id", "Block"), f("expected_body_digest", "Expected", "digest"), f("observed_body_digest", "Observed", "digest")],
  },
  projection_backing_stale: {
    label: "Projection backing stale",
    family: "projections",
    // message: the refusal when the dependency check refused with no issue to name
    fields: [f("source_id", "Source"), f("block_id", "Block"), f("backing_state", "Backing", "words"), f("stale_backings", "Stale backings", "list"), prose("message")],
  },
  projection_marker_invalid: { label: "Projection marker invalid", family: "projections", fields: [f("source_id", "Source"), f("block_id", "Block"), f("marker_status", "Marker", "words")] },
  unregistered_projection_block: { label: "Unregistered projection block", family: "projections", fields: [f("source_id", "Source"), f("block_id", "Block")] },
  prediction_settleable: { label: "Prediction settleable", family: "predictions", fields: [f("bound_contract_id", "Contract"), f("window", "Window", "list")] },
  prediction_window_unbindable: { label: "Prediction window unbindable", family: "predictions", fields: [f("code", "Code")] },
  mandate_expiring: { label: "Mandate expiring", family: "operations", fields: [f("line_identity", "Line", "ref"), f("procedure_identity", "Procedure", "ref"), f("expires_at", "Expires", "time"), f("grants", "Grants", "list")] },
  // a stopped Line arm's detail and a consumer's last_error are the only place the cause appears
  consumer_stalled: { label: "Consumer stalled", family: "operations", fields: [f("kind", "Kind"), f("state", "State", "words"), f("stop_reason", "Stopped", "words"), prose("last_error"), prose("detail")] },
  subject_kind_undeclared: { label: "Subject kind undeclared", family: "operations", fields: [f("kind", "Kind"), f("live_subjects", "Live Subjects", "count")] },
  // detail: the refusal, carried nowhere else
  kit_resume_blocked: { label: "Kit resume blocked", family: "operations", fields: [f("kit_id", "Kit"), f("version", "Version"), f("actor_id", "Actor"), f("recorded_at", "Recorded", "time"), prose("detail")] },
  trigger_instants_missed: { label: "Scheduled instants missed", family: "operations", fields: [f("target", "Target"), f("count", "Missed", "count"), f("since", "Since", "time"), f("until", "Until", "time"), prose("detail")] },
  vocabulary_file_behind: { label: "Vocabulary file behind", family: "operations", fields: [f("definitions_behind", "Behind", "count"), f("changed", "Changed", "list"), f("baseline", "Baseline"), prose("message", ["definitions_behind"])] },
  vocabulary_file_baseline_invalid: { label: "Vocabulary file header invalid", family: "operations", fields: [f("cause", "Cause", "words"), f("baseline", "Baseline"), prose("message")] },
};

/** The Beliefs preset: the former contested, stale and drifted families. */
export const BELIEF_FAMILIES: readonly NextFamily[] = ["contested", "stale", "drifted"];

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

/** Whether a prose field adds to the row: false when the typed keys it restates are all present (see FieldSpec.restates). */
export function proseAdds(spec: FieldSpec, record: Record<string, unknown>): boolean {
  if (spec.kind !== "prose" || !spec.restates) return true;
  return !spec.restates.every((key) => record[key] !== undefined && record[key] !== null);
}

/**
 * The named fields present in a detail, and the rest (rendered as JSON). A
 * prose field that only restates the row is dropped (from both).
 */
export function splitDetail(reason: NextReason, detail: unknown) {
  const record = detailRecord(detail);
  if (!record) return { fields: [] as { spec: FieldSpec; value: unknown }[], rest: detail ?? null };
  const specs = reasonMeta(reason).fields;
  const fields = specs
    .filter((spec) => record[spec.key] !== undefined && record[spec.key] !== null && record[spec.key] !== "" && proseAdds(spec, record))
    .map((spec) => ({ spec, value: record[spec.key] }));
  const named = new Set(specs.map((spec) => spec.key));
  const restEntries = Object.entries(record).filter(([key, value]) => !named.has(key) && value !== null);
  return { fields, rest: restEntries.length ? Object.fromEntries(restEntries) : null };
}

/** The Capture handle get resolves for a capture digest: CAP- plus 12 hex. */
export function captureHandle(digest: string): string {
  return `CAP-${digest.replace(/^sha256:/, "").slice(0, 12)}`;
}

/** The Next page's item count, as orient reports it: problems plus setup choices. */
export function nextCount(attention: { next_items: number; setup_items?: number } | null | undefined): number {
  return (attention?.next_items ?? 0) + (attention?.setup_items ?? 0);
}

/** What one `next` page says about drift, and how much of the queue it covers. */
export interface DriftRead {
  /** Claims a citation_drifted row or finding on the page names (bare CLM ids). */
  claims: ReadonlySet<string>;
  /** null until the queue answers; false when no workspace observation reached it. */
  observed: boolean | null;
  /** The page holds every queue item (no continuation): a Claim absent here did not drift. */
  complete: boolean;
  /** Items read, and the queue's total. */
  read: number;
  total: number;
}

/**
 * The Claims the page in hand says drifted (citation_drifted rows and
 * findings, `Claim:CLM-…` or a bare id). `next` has no Claim filter, so a
 * page with a continuation covers only part of the queue: `complete` says
 * whether an absent Claim is known not drifted. The console never pages on
 * to look (one page per read).
 */
export function driftedClaims(
  page:
    | {
        items: readonly { reason: NextReason; subject_identity: string; findings?: readonly { reason: NextReason; subject_identity: string }[] }[];
        unobserved_domains: readonly string[];
        total_items?: number;
        next_cursor?: string | null;
      }
    | undefined,
): DriftRead {
  if (!page) return { claims: new Set(), observed: null, complete: false, read: 0, total: 0 };
  const claims = new Set<string>();
  for (const row of page.items.flatMap((item) => [item, ...(item.findings ?? [])])) {
    if (row.reason === "citation_drifted") claims.add(row.subject_identity.replace(/^Claim:/, ""));
  }
  return {
    claims,
    observed: !page.unobserved_domains.includes("workspace_sources"),
    complete: !page.next_cursor,
    read: page.items.length,
    total: page.total_items ?? page.items.length,
  };
}
