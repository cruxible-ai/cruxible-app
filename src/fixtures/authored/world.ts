/**
 * Hand-authored fixture world: a small security instance, until a gate world
 * is recorded with scripts/record-fixtures.ts (which replaces this file).
 * Requests are built with the app's own builders, so keys match what the app
 * sends; responses are typed against the pinned contract by defineFixture.
 */
import { defineFixture } from "../fixture";
import {
  getBatchBody,
  getBody,
  headQuery,
  NEXT_PAGE,
  nextBody,
  orientQuery,
} from "@/api/requests";
import type { AcceptedCoordinate, GetResult, OrientKindSummary, OrientPredicate } from "@/api/schemas";
import { PACKAGE_CLAIM_TYPES, PACKAGE_COUNT } from "./package-kind";

const ORIENT_PAGE = 500;

export const COORDINATE: AcceptedCoordinate = {
  tag: "playbill-accepted-coordinate-v1",
  git_oid: "4f1c2a9e7b3d5f6a8c0e1b2d3f4a5b6c7d8e9f01",
  semantic_root: "sha256:9a3c5e7f1b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a",
  generation_root: "sha256:1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d",
  compiler_digest: "sha256:7e9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a",
};
export const GENERATION = 42;
export const SHORT_OID = COORDINATE.git_oid.slice(0, 12);
export const AT = { git_oid: SHORT_OID, generation: GENERATION };
export const ACCEPTED_AT = "2026-10-19T09:30:00Z";
export const NOW = "2026-10-19T12:00:00Z";
const INSTANCE = "inst_fixture";

// -- ClaimTypes ---------------------------------------------------------------

/** Authored ClaimTypes with their live Claim and Subjects-with-a-value counts (orient kind=K only). */
const AUTHORED: (OrientPredicate & { live_claims: number; subjects_with_value: number })[] = [
  {
    name: "name",
    predicate: "security.product.name",
    cardinality: "one",
    type: "string",
    description: "The product's display name.",
    evidence_requirement: "none",
    subject_kinds: ["security.product"],
    roles: ["normative"],
    default_role: "normative",
    revision_evidence: "replace",
    kit: "security",
    live_claims: 1,
    subjects_with_value: 1,
  },
  {
    name: "product",
    predicate: "security.release.product",
    cardinality: "one",
    type: "subject:security.product",
    description: "The product this release ships.",
    evidence_requirement: "none",
    subject_kinds: ["security.release"],
    roles: ["normative"],
    default_role: "normative",
    revision_evidence: "replace",
    kit: "security",
    live_claims: 2,
    subjects_with_value: 2,
  },
  {
    name: "cve_id",
    predicate: "security.vulnerability.cve_id",
    cardinality: "one",
    type: "string",
    description: "The CVE identifier.",
    evidence_requirement: "none",
    subject_kinds: ["security.vulnerability"],
    roles: ["normative"],
    default_role: "normative",
    revision_evidence: "replace",
    kit: "security",
    live_claims: 3,
    subjects_with_value: 3,
  },
  {
    name: "kev_listed",
    predicate: "security.vulnerability.kev_listed",
    cardinality: "one",
    type: "boolean",
    description: "Whether CISA lists the CVE as known exploited.",
    evidence: ["security.kev-http-v1"],
    evidence_requirement: "captured",
    subject_kinds: ["security.vulnerability"],
    roles: ["observation"],
    default_role: "observation",
    revision_evidence: "replace",
    stale_after: "1d",
    kit: "security",
    live_claims: 3,
    subjects_with_value: 3,
  },
  {
    name: "vulnerability",
    predicate: "security.assessment.vulnerability",
    cardinality: "one",
    type: "subject:security.vulnerability",
    description: "The vulnerability this assessment judges.",
    evidence_requirement: "none",
    subject_kinds: ["security.assessment"],
    roles: ["normative"],
    default_role: "normative",
    revision_evidence: "replace",
    kit: "security",
    live_claims: 2,
    subjects_with_value: 2,
  },
  {
    name: "release",
    predicate: "security.assessment.release",
    cardinality: "one",
    type: "subject:security.release",
    description: "The release this assessment judges.",
    evidence_requirement: "none",
    subject_kinds: ["security.assessment"],
    roles: ["normative"],
    default_role: "normative",
    revision_evidence: "replace",
    kit: "security",
    live_claims: 2,
    subjects_with_value: 2,
  },
  {
    name: "status",
    predicate: "security.assessment.status",
    cardinality: "one",
    type: "enum",
    members: ["affected", "not_affected", "under_investigation"],
    description: "Whether the release is affected by the CVE.",
    evidence: ["security.osv-applicability-v1"],
    evidence_requirement: "captured",
    subject_kinds: ["security.assessment"],
    roles: ["observation", "normative"],
    default_role: "observation",
    revision_evidence: "accumulate",
    stale_after: "7d",
    kit: "security",
    live_claims: 2,
    subjects_with_value: 2,
  },
  {
    name: "related",
    predicate: "security.vulnerability.related",
    cardinality: "many",
    type: "subject:security.vulnerability",
    description: "Other CVEs in the same exploit chain.",
    evidence_requirement: "none",
    subject_kinds: ["security.vulnerability"],
    roles: ["normative"],
    default_role: "normative",
    revision_evidence: "replace",
    kit: "security",
    live_claims: 1,
    subjects_with_value: 1,
  },
  // security.package: a kind past one kind-table page (130 Subjects; kinds.ts serves its rows)
  ...PACKAGE_CLAIM_TYPES,
];

/** Edge cases: a rival-refusing slot, corroboration, a pre-v7 format with an upgrade. */
const CONTENTION: Record<string, OrientPredicate["contention"]> = {
  "security.vulnerability.cve_id": { selector: "only_contender", on_conflict: "refuse" },
  "security.assessment.status": { selector: "only_contender", on_conflict: "unresolved", corroboration: 1 },
};
const FORMAT: Record<string, number> = { "security.vulnerability.related": 6 };

/**
 * Planned OrientPredicate fields core does not serve yet (W7 stale_count, W8
 * evidence_counts): the Dashboard reads them defensively, so the authored
 * world serves them to test and show the served path.
 */
const PLANNED: Record<string, { stale_count: number | null; evidence_counts: { admitted: number; own_word: number; unmet: number } | null }> = {
  "security.product.name": { stale_count: null, evidence_counts: { admitted: 0, own_word: 1, unmet: 0 } },
  "security.release.product": { stale_count: null, evidence_counts: { admitted: 0, own_word: 2, unmet: 0 } },
  "security.vulnerability.cve_id": { stale_count: null, evidence_counts: { admitted: 0, own_word: 3, unmet: 0 } },
  "security.vulnerability.kev_listed": { stale_count: 2, evidence_counts: { admitted: 2, own_word: 0, unmet: 1 } },
  "security.vulnerability.related": { stale_count: null, evidence_counts: { admitted: 0, own_word: 1, unmet: 0 } },
  "security.assessment.vulnerability": { stale_count: null, evidence_counts: { admitted: 0, own_word: 2, unmet: 0 } },
  "security.assessment.release": { stale_count: null, evidence_counts: { admitted: 0, own_word: 2, unmet: 0 } },
  "security.assessment.status": { stale_count: 1, evidence_counts: { admitted: 1, own_word: 0, unmet: 1 } },
};

/** The claim_types section rows: full descriptors, no counts. */
const CLAIM_TYPES: OrientPredicate[] = AUTHORED.map(({ live_claims, subjects_with_value, ...row }) => {
  void live_claims;
  void subjects_with_value;
  const kind = row.subject_kinds![0]!;
  return {
    ...row,
    contention: CONTENTION[row.predicate] ?? (row.cardinality === "many" ? { selector: "all", on_conflict: "unresolved" } : { selector: "only_contender", on_conflict: "unresolved" }),
    format: FORMAT[row.predicate] ?? 8,
    revision: row.predicate === "security.assessment.status" ? 2 : 1,
    path: `claim-types/${kind}/${row.name}.json`,
    ...PLANNED[row.predicate],
  };
});

/** A kind detail's descriptors: full, with that kind's live counts. */
export function kindDescriptors(kind: string): OrientPredicate[] {
  return CLAIM_TYPES.filter((row) => row.subject_kinds!.includes(kind)).map(({ kit, ...row }) => {
    void kit; // the claim_types section alone names the owning kit
    const counts = AUTHORED.find((item) => item.predicate === row.predicate)!;
    return { ...row, live_claims: counts.live_claims, subjects_with_value: counts.subjects_with_value };
  });
}

/** Each kind's identity and the contract set its ClaimTypes most commonly admit (a kind detail's header). */
export const KIND_ROWS = [
  { kind: "security.assessment", subjects: 2, identity: "keys: release_id, cve_id", evidence: ["security.osv-applicability-v1"] },
  { kind: "security.product", subjects: 1, identity: "keys: name" },
  { kind: "security.release", subjects: 2, identity: "keys: product, version" },
  { kind: "security.vulnerability", subjects: 3, identity: "keys: cve_id", evidence: ["security.kev-http-v1"] },
  { kind: "security.package", subjects: PACKAGE_COUNT, identity: "keys: name" },
];

/** Orient's default map names a kind's first fields by short name (byte order) and counts the rest. */
const KIND_FIELDS = 5;
const KINDS: OrientKindSummary[] = KIND_ROWS.map(({ kind, subjects, identity }) => {
  const names = CLAIM_TYPES.filter((row) => row.subject_kinds!.includes(kind))
    .map((row) => row.name)
    .sort();
  return {
    kind,
    subjects,
    identity,
    ...(names.length ? { fields: names.slice(0, KIND_FIELDS) } : {}),
    ...(names.length > KIND_FIELDS ? { more_fields: names.length - KIND_FIELDS } : {}),
  };
});

const CLAIM_TYPE_STATUS: GetResult = {
  tag: "playbill-get-result-v1",
  ref: "ClaimType:security.assessment.status",
  kind: "claim_type",
  detail: "summary",
  coordinate: AT,
  evaluation_time: NOW,
  card: {
    predicate: "security.assessment.status",
    subject_kinds: ["security.assessment"],
    object: "enum",
    cardinality: "one",
    members: ["affected", "not_affected", "under_investigation"],
    description: "Whether the release is affected by the CVE.",
    roles: ["observation", "normative"],
    default_role: "observation",
    evidence_requirement: "captured",
    revision_evidence: "accumulate",
    evidence: ["security.osv-applicability-v1"],
    evidence_rules: [
      {
        rule_id: "osv-applicability",
        roles: ["observation"],
        contracts: ["security.osv-applicability-v1"],
        admission: "direct",
      },
    ],
    contention: { selector: "only_contender", on_conflict: "unresolved" },
    format: 8,
    revision: 2,
    path: "claim-types/security.assessment/status.json",
    kit: "security",
    live_claims: 2,
    subjects_with_value: 2,
  },
};

const BASE_ORIENT = {
  tag: "playbill-orient-v1" as const,
  instance: INSTANCE,
  coordinate: COORDINATE,
  generation: GENERATION,
  accepted_at: ACCEPTED_AT,
  evaluation_time: NOW,
};

export default [
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/head",
    query: headQuery(null),
    response: { tag: "playbill-head-v1", instance: INSTANCE, coordinate: COORDINATE, generation: GENERATION },
  }),

  // The head pinned by number (the at-picker's ?at=42) resolves to the same coordinate.
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/head",
    query: headQuery(String(GENERATION)),
    response: { tag: "playbill-head-v1", instance: INSTANCE, coordinate: COORDINATE, generation: GENERATION },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, limit: ORIENT_PAGE }),
    response: {
      ...BASE_ORIENT,
      floor: { at: SHORT_OID, generations_behind: 0 },
      you: { actor: "console", principal: null, can_author: false },
      kinds: KINDS,
      artifacts: {
        claim_types: CLAIM_TYPES.length,
        procedures: 3,
        documents: 1,
        queries: 4,
        operations: 2,
        lines: 2,
        captures: 9,
        capture_contracts: 2,
        mandates: 1,
        runs: 14,
        running: 1,
        claims: { accepted: 16, conflicted: 1, overturned: 2, ineligible: 1, retired: 0 },
      },
      attention: {
        next_items: 6,
        open_proposals: 1,
        top: ["claim_conflicted: security.assessment/rel-1-cve-2024-3094"],
        notes: [],
        enablements: { running: 1, stalled: 0, stopped: 1, needs_attention: [] },
      },
      next: ['next(evaluation_time="now")'],
    },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "claim_types", limit: ORIENT_PAGE }),
    response: { ...BASE_ORIENT, section: "claim_types", claim_types: CLAIM_TYPES },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "subject_kinds", limit: ORIENT_PAGE }),
    response: {
      ...BASE_ORIENT,
      section: "subject_kinds",
      subject_kinds: [
        { kind: "security.assessment", rule: "keys", keys: ["security.assessment.release_id", "security.assessment.cve_id"], uniqueness: "unique", kit: "security" },
        { kind: "security.product", rule: "keys", keys: ["security.product.name"], uniqueness: "unique", kit: "security" },
        { kind: "security.release", rule: "keys", keys: ["security.release.product", "security.release.version"], uniqueness: "unique", kit: "security" },
        { kind: "security.vulnerability", rule: "keys", keys: ["security.vulnerability.cve_id"], uniqueness: "unique", kit: "security" },
        { kind: "security.package", rule: "keys", keys: ["security.package.name"], uniqueness: "unique", kit: "security" },
      ],
    },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, kind: "security.vulnerability" }),
    response: {
      ...BASE_ORIENT,
      kind_detail: {
        ...KIND_ROWS[3]!,
        predicates: kindDescriptors("security.vulnerability"),
        incoming: ["security.assessment.vulnerability", "security.vulnerability.related"],
        sample_subject_ids: ["cve-2024-3094", "cve-2023-4863", "cve-2021-44228"],
      },
    },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, kind: "security.assessment" }),
    response: {
      ...BASE_ORIENT,
      kind_detail: {
        ...KIND_ROWS[0]!,
        predicates: kindDescriptors("security.assessment"),
        incoming: [],
        sample_subject_ids: ["cruxible-0.3.2--cve-2024-3094", "cruxible-0.3.1--cve-2024-3094"],
      },
    },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, kind: "security.package" }),
    response: {
      ...BASE_ORIENT,
      kind_detail: {
        ...KIND_ROWS[4]!,
        predicates: kindDescriptors("security.package"),
        incoming: [],
        sample_subject_ids: ["pkg-000", "pkg-001", "pkg-002"],
      },
    },
  }),

  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/kits",
    response: {
      tag: "playbill-kit-status-v1",
      kits: [
        {
          kit_id: "security",
          version: "0.3.0",
          content_digest: "sha256:5d2f0a7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f",
          source: "cruxible-kits/security",
          drifted: ["claim-types/security.assessment/release.json"],
          providers: [
            {
              provider_id: "security.kev-catalog",
              package: "cruxible-provider-security",
              version: "0.3.0",
              wheel_sha256: "3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e",
              state: "installed",
            },
          ],
        },
      ],
    },
  }),

  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/next",
    body: nextBody({ coordinate: COORDINATE, evaluationTime: NOW, limit: NEXT_PAGE }),
    response: {
      tag: "playbill-next-result-v2",
      coordinate: COORDINATE,
      evaluation_time: NOW,
      observed_domains: ["accepted_state"],
      unobserved_domains: ["workspace_floor", "workspace_sources", "workspace_projections"],
      status: {
        blocking: false,
        instance: { state: "current" },
        floor: { state: "not_observed" },
        ledger_mirror: { state: "not_configured" },
        provider_lane: { state: "available" },
        procedure_catalog: { state: "current" },
        compiler: { state: "current" },
        line_dispatch: { state: "running" },
        consumers: { state: "current" },
        triggers: { state: "scheduled" },
        held: 0,
      },
      items: [
        {
          item_id: "next-1",
          severity: "blocking",
          reason: "claim_conflicted",
          subject_identity: "security.assessment/rel-1-cve-2024-3094",
          related_identities: [],
          detail: { contender_count: 2, predicate: "security.assessment.status" },
          repair: {
            operation: "cruxible.set",
            target: "security.assessment/rel-1-cve-2024-3094",
            required_change: "Settle the status slot to one contender",
          },
        },
        {
          item_id: "next-2",
          severity: "warning",
          reason: "line_inbox_unread",
          subject_identity: "Line:kev-triage",
          related_identities: [],
          detail: { unread: 3, detail: "3 new inbox items from kev-triage." },
          repair: {
            operation: "cruxible.inbox.list",
            target: "Line:kev-triage",
            required_change: "read_inbox",
            arguments: { line: "kev-triage", status: "unread" },
            command: "cruxible inbox list --line kev-triage",
          },
        },
        {
          item_id: "next-3",
          severity: "repair",
          reason: "claim_stale_evidence",
          subject_identity: "subjects/security.vulnerability/cve-2024-3094.json",
          related_identities: [],
          detail: {
            verdict: "supported",
            expired_capture_digests: ["sha256:9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b"],
            last_expired_at: "2026-10-19T06:00:00Z",
          },
          repair: {
            operation: "cruxible.authoring.bind",
            target: "Claim:CLM-000000000000000000000000000000b2",
            required_change: "rebind_to_a_current_capture",
          },
        },
        {
          item_id: "next-4",
          severity: "warning",
          reason: "claim_contradicting_evidence_available",
          subject_identity: "Claim:CLM-000000000000000000000000000000a2",
          related_identities: ["Principal:release-owner"],
          detail: {
            claim_id: "CLM-000000000000000000000000000000a2",
            capture_digest: "sha256:7c1e9a3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c",
            stance: "contradict",
            attesting_principal: "release-owner",
            attested_at: "2026-10-19T09:00:00Z",
            attestation_basis: "new_capture",
          },
          repair: null,
        },
        {
          item_id: "next-5",
          severity: "warning",
          reason: "proposal_awaiting_approval",
          subject_identity: "sha256:" + "a".repeat(64),
          related_identities: [],
          detail: {
            actor_id: "triage-agent",
            admitted_at: "2026-10-19T10:00:00Z",
            signer_id: null,
            eligible_approvals: ["release-owner"],
          },
          repair: {
            operation: "cruxible.proposal.approve",
            target: "sha256:" + "a".repeat(64),
            required_change: "approve_or_reject",
          },
        },
        {
          // A recorded contradiction of a live Claim whose ClaimType has no
          // consequence policy: resurfaced for judgment, the verdict does not move.
          item_id: "next-6",
          severity: "repair",
          reason: "claim_contradicting_evidence_available",
          subject_identity: "Claim:CLM-000000000000000000000000000000b1",
          related_identities: ["Principal:analyst-2"],
          detail: {
            claim_id: "CLM-000000000000000000000000000000b1",
            claim_artifact_digest: "sha256:" + "b1".repeat(32),
            attestation_event_digest: "sha256:" + "c".repeat(64),
            attestation_envelope_digest: "sha256:" + "d".repeat(64),
            attestation_basis: "examined_existing",
            stance: "contradict",
            attesting_principal: "analyst-2",
            attested_at: "2026-10-19T11:30:00Z",
            current_at_append: true,
            note: "NVD lists this record under a different CVE id.",
          },
          repair: {
            operation: "cruxible.set",
            target: "Claim:CLM-000000000000000000000000000000b1",
            required_change: "adjudicate_contradicting_evidence",
          },
        },
      ],
      total_items: 6,
      result_digest: "sha256:0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d",
      attestation_head_digest: "sha256:2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a6c8e0b2d4f",
    },
  }),

  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: "ClaimType:security.assessment.status", coordinate: COORDINATE }),
    response: CLAIM_TYPE_STATUS,
  }),

  // The ClaimType chip in prose reads the same card through get-batch.
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(["ClaimType:security.assessment.status"], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [CLAIM_TYPE_STATUS] },
  }),

];
