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
import type { AcceptedCoordinate, GetResult, OrientPredicate } from "@/api/schemas";

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

const CLAIM_TYPES: OrientPredicate[] = [
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
    live_claims: 1,
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
    live_claims: 2,
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
    live_claims: 3,
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
    live_claims: 3,
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
    live_claims: 2,
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
    live_claims: 2,
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
    live_claims: 2,
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
    live_claims: 1,
  },
];

/** The compact descriptor default orient shows inside a kind (no full-only fields). */
function compact(predicate: string): OrientPredicate {
  const full = CLAIM_TYPES.find((item) => item.predicate === predicate)!;
  return {
    name: full.name,
    predicate: full.predicate,
    cardinality: full.cardinality,
    type: full.type,
    ...(full.members ? { members: full.members } : {}),
    ...(full.description ? { description: full.description } : {}),
    ...(full.evidence ? { evidence: full.evidence } : {}),
    ...(full.evidence_requirement ? { evidence_requirement: full.evidence_requirement } : {}),
  };
}

const KINDS = [
  {
    kind: "security.assessment",
    subjects: 2,
    identity: "keys: release_id, cve_id",
    evidence: ["security.osv-applicability-v1"],
    predicates: [
      compact("security.assessment.release"),
      compact("security.assessment.status"),
      compact("security.assessment.vulnerability"),
    ],
  },
  {
    kind: "security.product",
    subjects: 1,
    identity: "keys: name",
    predicates: [compact("security.product.name")],
  },
  {
    kind: "security.release",
    subjects: 2,
    identity: "keys: product, version",
    predicates: [compact("security.release.product")],
  },
  {
    kind: "security.vulnerability",
    subjects: 3,
    identity: "keys: cve_id",
    evidence: ["security.kev-http-v1"],
    predicates: [
      compact("security.vulnerability.cve_id"),
      compact("security.vulnerability.kev_listed"),
      compact("security.vulnerability.related"),
    ],
  },
];

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
    live_claims: 2,
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
        interfaces: 2,
        lines: 2,
        captures: 9,
        capture_contracts: 2,
        mandates: 1,
        runs: 14,
        running: 1,
        claims: { accepted: 16, conflicted: 1, overturned: 2, refused: 1, retired: 0 },
      },
      attention: {
        next_items: 2,
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
        { kind: "security.assessment", rule: "keys", keys: ["security.assessment.release_id", "security.assessment.cve_id"], uniqueness: "unique" },
        { kind: "security.product", rule: "keys", keys: ["security.product.name"], uniqueness: "unique" },
        { kind: "security.release", rule: "keys", keys: ["security.release.product", "security.release.version"], uniqueness: "unique" },
        { kind: "security.vulnerability", rule: "keys", keys: ["security.vulnerability.cve_id"], uniqueness: "unique" },
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
        ...KINDS[3]!,
        incoming: ["security.assessment.vulnerability", "security.vulnerability.related"],
        sample_subject_ids: ["cve-2024-3094", "cve-2023-4863", "cve-2021-44228"],
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
          drifted: [],
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
          detail: { unread: 3 },
          repair: null,
        },
      ],
      total_items: 2,
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
