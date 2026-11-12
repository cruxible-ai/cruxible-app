/**
 * Hand-authored proposals for the belief diff: a Claims proposal (a created
 * Subject, a one-valued revision by retire + create, a revision in place, a
 * retirement, a many-valued slot with an inverse, two cited Captures, prior
 * refusals) proposed by a run whose settle grant left a change outside its
 * scope; a definitions proposal (a revised Procedure); and a mixed one.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, reviewBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";
import { reviewSummary, reviewSummaryFixture } from "../review-summary";

export const BELIEFS = "sha256:" + "b1".repeat(32);
export const DEFINITIONS = "sha256:" + "d1".repeat(32);
export const MIXED = "sha256:" + "e1".repeat(32);
export const RUN = "RUN-" + "5".repeat(64);
export const CAPTURE_A = "sha256:" + "ca".repeat(32);
export const CAPTURE_B = "sha256:" + "cb".repeat(32);

type Member = Schemas["ReviewedMember"];

const clm = (n: number) => `CLM-${n.toString(16).padStart(32, "0")}`;
const subjectObject = (ref: string) => ({
  kind: "subject",
  address: { artifact_path: `subjects/${ref}.json`, selector: { scheme: "artifact-v1", value: "" }, tag: "playbill-semantic-address-v1" },
});
const literal = (value: unknown) => ({ kind: "literal", value });

interface ClaimSpec {
  id: string;
  subject: string;
  predicate: string;
  object: unknown;
  capture?: string;
  record?: string;
  field?: string;
}

function claimArtifact(spec: ClaimSpec, state: "live" | "retired" = "live"): Record<string, unknown> {
  return {
    artifact_format: "playbill-claim-v4",
    identity: { kind: "Claim", name: spec.id },
    lifecycle: { predecessor_digest: null, state },
    statement: {
      predicate: spec.predicate,
      claim_type: { kind: "ClaimType", name: spec.predicate },
      subject: { artifact_path: `subjects/${spec.subject}.json`, selector: { scheme: "artifact-v1", value: "" }, tag: "playbill-semantic-address-v1" },
      object: spec.object,
      role: "observation",
    },
    backing: {
      capture_digests: spec.capture ? [spec.capture] : [],
      citations: spec.capture ? [{ capture_digest: spec.capture, citation_id: "sha256:" + "0".repeat(64), origin: "independent", role: "evidence" }] : [],
      procedure_evidence: spec.capture
        ? {
            law: "claim-evidence-v2",
            node_id: "write",
            value: {
              basis: "extracted",
              capture_digest: spec.capture,
              field_path: spec.field ?? "/data/0/value",
              record_key: { cve_id: spec.record ?? "CVE-0" },
              record_locator: "/data/0",
            },
          }
        : null,
      referent_context: { observed_at: "2026-10-19T08:00:00Z" },
    },
  };
}

function member(path: string, kind: string, disposition: string, base: Record<string, unknown> | null, candidate: Record<string, unknown> | null, extra: Partial<Member> = {}): Member {
  return {
    path,
    artifact_kind: kind,
    disposition,
    closure_role: "authored",
    predecessor_artifact_digest: base ? "sha256:" + "1".repeat(64) : null,
    candidate_artifact_digest: candidate ? "sha256:" + "2".repeat(64) : null,
    base_semantic_artifact: base,
    candidate_semantic_artifact: candidate,
    semantic_delta: [
      {
        field_path: "/statement/object",
        before: base ? { state: "present", value: (base.statement as Record<string, unknown> | undefined)?.object ?? null } : { state: "absent", value: null },
        after: candidate ? { state: "present", value: (candidate.statement as Record<string, unknown> | undefined)?.object ?? null } : { state: "absent", value: null },
      },
    ],
    law_identifier: "playbill.claim.v4",
    law_digest: "sha256:" + "9".repeat(64),
    law_evidence: {},
    dependency_proof_refs: [],
    ...extra,
  };
}

const claimPath = (id: string) => `claims/00/${id}.json`;
const created = (spec: ClaimSpec, extra: Partial<Member> = {}) => member(claimPath(spec.id), "claim", "create", null, claimArtifact(spec), extra);
const retired = (spec: ClaimSpec) => member(claimPath(spec.id), "claim", "retire", claimArtifact(spec), claimArtifact(spec, "retired"));

const V1 = "security.vulnerability/cve-2024-0001";
const V2 = "security.vulnerability/cve-2024-0002";
const NEW = "security.vulnerability/cve-2026-0009";
const KEV_LISTED = "security.vulnerability.kev_listed";
const EPSS = "security.vulnerability.epss_score";
const RELATED = "security.vulnerability.related";

const subjectMember = member(
  `subjects/${NEW}.json`,
  "subject",
  "create",
  null,
  { artifact_format: "playbill-subject-v1", identity: { kind: "Subject", name: NEW }, lifecycle: { predecessor_digest: null, state: "live" }, subject_kind: "security.vulnerability", subject_id: "cve-2026-0009" },
);

/** The Claims members: every change shape the grid reads. */
export const BELIEF_MEMBERS: Member[] = [
  subjectMember,
  created({ id: clm(1), subject: NEW, predicate: "security.vulnerability.cve_id", object: literal("CVE-2026-0009") }),
  // kev_listed on V1: false -> true by retire + create (one-valued)
  retired({ id: clm(2), subject: V1, predicate: KEV_LISTED, object: literal(false), capture: CAPTURE_A, record: "CVE-2024-0001" }),
  created(
    { id: clm(3), subject: V1, predicate: KEV_LISTED, object: literal(true), capture: CAPTURE_A, record: "CVE-2024-0001", field: "/vulnerabilities/0/cveID" },
    {
      prior_refusals: [
        { kind: "proposal_rejected", claim_id: clm(3), decided_by: "security-lead", decided_at: "2026-10-12T10:00:00Z", rationale: "KEV entry was withdrawn the next day." },
      ],
    },
  ),
  // epss_score on V2: revised in place (replace), 0.1 -> 0.97
  member(
    claimPath(clm(4)),
    "claim",
    "replace",
    claimArtifact({ id: clm(4), subject: V2, predicate: EPSS, object: literal("0.1"), capture: CAPTURE_B, record: "CVE-2024-0002", field: "/data/0/epss" }),
    claimArtifact({ id: clm(4), subject: V2, predicate: EPSS, object: literal("0.97"), capture: CAPTURE_B, record: "CVE-2024-0002", field: "/data/0/epss" }),
  ),
  // kev_listed on V2: retired outright
  retired({ id: clm(5), subject: V2, predicate: KEV_LISTED, object: literal(true), capture: CAPTURE_A, record: "CVE-2024-0002" }),
  // related on V2 (many): a new value and an inverse
  created({ id: clm(6), subject: V2, predicate: RELATED, object: subjectObject(V1) }),
  created({ id: clm(7), subject: V2, predicate: RELATED, object: { kind: "none", of: subjectObject(NEW) } }),
];

const procedureArtifact = (description: string, steps: number) => ({
  artifact_format: "playbill-procedure-v3",
  identity: { kind: "Procedure", name: "security.kev-triage" },
  lifecycle: { predecessor_digest: null, state: "live" },
  description,
  budget: { max_steps: steps },
  contract: { kind: "Contract", name: "http-response-v1" },
});

export const PROCEDURE_MEMBER: Member = {
  ...member("procedures/security.kev-triage.json", "procedure", "replace", procedureArtifact("Triage KEV.", 8), procedureArtifact("Triage KEV entries daily.", 12)),
  semantic_delta: [
    { field_path: "/description", before: { state: "present", value: "Triage KEV." }, after: { state: "present", value: "Triage KEV entries daily." } },
    { field_path: "/budget/max_steps", before: { state: "present", value: 8 }, after: { state: "present", value: 12 } },
    { field_path: "/contract/kind", before: { state: "present", value: "Contract" }, after: { state: "present", value: "Contract" } },
    { field_path: "/contract/name", before: { state: "present", value: "http-response-v0" }, after: { state: "present", value: "http-response-v1" } },
  ],
};

function proposalCard(id: string, card: Schemas["GetProposalCard"]): GetResult {
  return { tag: "playbill-get-result-v1", ref: `Proposal:${id}`, kind: "proposal", detail: "summary", coordinate: AT, accepted_coordinate: COORDINATE, evaluation_time: NOW, card };
}

const batch = (refs: string[], results: GetResult[]) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(refs, COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results },
  });

function review(id: string, members: Member[], extra: Partial<Schemas["ProposalReview"]> = {}): Schemas["ProposalReview"] {
  return {
    tag: "playbill-proposal-review-v1",
    coordinate_kind: "provisional",
    proposal_id: id,
    candidate: {},
    candidate_digest: "sha256:" + "c".repeat(64),
    parent_semantic_root: "sha256:" + "d".repeat(64),
    settlement_base: COORDINATE,
    base_oid: COORDINATE.git_oid,
    complete_members: [],
    members,
    governance: { activation_policy: "snapshot", approval_requirements: [{ role: "security-lead", minimum_distinct_signers: 1 }], required_tier: "governed_write" },
    provenance: { actor_id: "kev-runner" },
    attestation_coverage: { attestations: [] },
    documents: [],
    redactions: [],
    ...extra,
  };
}

const reviewFixture = (id: string, response: Schemas["ProposalReview"]) =>
  defineFixture({ method: "post", path: "/api/v1/{instance_id}/proposals/{proposal_id}/review", pathParams: { proposal_id: id }, body: reviewBody(), response });

const words = `Proposed by Procedure security.kev-triage run ${RUN} terminal write\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.`;

const reason = (path: string, text: string, i: number): Schemas["ProposalItemReason"] => ({
  operation: "AIT-1",
  path,
  item_key: `0000000${i}`,
  child_index: i,
  procedure: "Procedure:security.kev-triage",
  run_id: RUN,
  terminal: "write",
  reason: text,
});

const capture = (digest: string, source: string, observed: string): GetResult => ({
  tag: "playbill-get-result-v1",
  ref: `Capture:${digest}`,
  kind: "capture",
  detail: "summary",
  coordinate: AT,
  accepted_coordinate: COORDINATE,
  evaluation_time: NOW,
  card: { capture: `CAP-${digest.slice(7, 19)}`, digest, contract: "CaptureContract:security.kev-catalog", source, observed_at: observed, status: "available" },
});

const runCard: Schemas["GetProcedureRunCard"] = {
  run: RUN,
  procedure: "Procedure:security.kev-triage",
  status: "succeeded",
  nodes_done: 3,
  nodes_total: 3,
  started_at: "2026-10-19T08:00:00Z",
  triggered_by: { line: "Line:security.kev-triage", occurrence: "occ-1" },
  terminal_egress: [
    {
      node_id: "write",
      kind: "claims",
      verdict: "delivered",
      required_authority: "settle",
      effective_authority: "settle",
      limiting_term: "procedure_terminal_capability",
      proposal_id: BELIEFS,
      settle_outcome: "proposed",
      outside_scope: [{ claim_type: EPSS, change: "revise", basis: "extracted", term: "basis" }],
      capped_by: "mandate_grant",
    },
  ],
};

export default [
  reviewSummaryFixture(BELIEFS, reviewSummary(BELIEFS, BELIEF_MEMBERS, { rationale: { value: words } })),
  reviewSummaryFixture(DEFINITIONS, reviewSummary(DEFINITIONS, [PROCEDURE_MEMBER])),
  reviewSummaryFixture(MIXED, reviewSummary(MIXED, [PROCEDURE_MEMBER, subjectMember, BELIEF_MEMBERS[1]!], { rationale: { value: "Tighten KEV triage and record the new CVE." } })),
  batch([BELIEFS], [
    proposalCard(BELIEFS, {
      proposal: BELIEFS,
      status: "open",
      verdict: "candidate",
      actor: "kev-runner",
      admitted_at: "2026-10-19T08:00:05Z",
      rationale: words,
      originating_line: { identity: { kind: "Line", name: "security.kev-triage" }, artifact_digest: "sha256:" + "f".repeat(64) },
    }),
  ]),
  reviewFixture(
    BELIEFS,
    review(BELIEFS, BELIEF_MEMBERS, {
      rationale: words,
      item_reasons: [
        reason(claimPath(clm(3)), "CISA KEV catalog 2026.10.19 lists CVE-2024-0001.", 0),
        reason(claimPath(clm(4)), "FIRST EPSS scored this CVE 0.97 on 2026-10-19.", 1),
      ],
      item_reason_count: 2,
    }),
  ),
  batch([`ProcedureRun:${RUN}`], [{ tag: "playbill-get-result-v1", ref: `ProcedureRun:${RUN}`, kind: "procedure_run", detail: "summary", coordinate: AT, accepted_coordinate: COORDINATE, evaluation_time: NOW, card: runCard }]),
  batch(
    [`Capture:${CAPTURE_A}`, `Capture:${CAPTURE_B}`],
    [capture(CAPTURE_A, "cisa.kev.catalog", "2026-10-19T07:59:00Z"), capture(CAPTURE_B, "first.epss.api", "2026-10-19T07:58:00Z")],
  ),
  batch([DEFINITIONS], [proposalCard(DEFINITIONS, { proposal: DEFINITIONS, status: "open", verdict: "candidate", actor: "kit-author", admitted_at: "2026-10-19T09:00:00Z" })]),
  reviewFixture(DEFINITIONS, review(DEFINITIONS, [PROCEDURE_MEMBER], { provenance: { actor_id: "kit-author" } })),
  batch([MIXED], [proposalCard(MIXED, { proposal: MIXED, status: "open", verdict: "candidate", actor: "kit-author", admitted_at: "2026-10-19T09:30:00Z", rationale: "Tighten KEV triage and record the new CVE." })]),
  reviewFixture(MIXED, review(MIXED, [PROCEDURE_MEMBER, subjectMember, BELIEF_MEMBERS[1]!], { provenance: { actor_id: "kit-author" } })),
];
