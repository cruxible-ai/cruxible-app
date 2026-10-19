/**
 * Hand-authored proposal reads for the fixture world: the settled and open
 * lists, proposal cards (get-batch), and two reviews (an accepted change set
 * that settled the assessment's status, and one awaiting approval).
 */
import { defineFixture } from "../fixture";
import { getBatchBody, LEDGER_PAGE, orientQuery, proposalsQuery, reviewBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

const ACCEPTED = "sha256:" + "6".repeat(64);
const ACCEPTED_OLDER = "sha256:" + "3".repeat(64);
const REFUSED = "sha256:" + "4".repeat(64);
const OPEN = "sha256:" + "a".repeat(64);
const CLAIM_A3 = `CLM-${(0xa3).toString(16).padStart(32, "0")}`;

type Entry = Schemas["ProposalListEntry"];

const entry = (proposal_id: string, extra: Partial<Entry>): Entry => ({
  tag: "playbill-proposal-list-entry-v1",
  proposal_id,
  actor_id: "triage-agent",
  target_ref: "refs/heads/main",
  admitted_at: "2026-10-19T09:00:00Z",
  verdict: "candidate",
  status: "settled",
  ...extra,
});

const list = (status: Schemas["ProposalListEntry"]["status"], entries: Entry[]) =>
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/proposals",
    query: proposalsQuery(status, 50),
    response: { tag: "playbill-proposal-list-v1", coordinate: COORDINATE, status_filter: status, entries },
  });

function proposalCard(id: string, card: Schemas["GetProposalCard"]): GetResult {
  return {
    tag: "playbill-get-result-v1",
    ref: `Proposal:${id}`,
    kind: "proposal",
    detail: "summary",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    card,
  };
}

const cardFixture = (id: string, card: Schemas["GetProposalCard"]) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([id], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [proposalCard(id, card)] },
  });

function member(path: string, field: string, before: unknown, after: unknown): Schemas["ReviewedMember"] {
  return {
    path,
    artifact_kind: path.startsWith("claims/") ? "claim" : "subject",
    disposition: before === undefined ? "created" : "revised",
    closure_role: "authored",
    predecessor_artifact_digest: before === undefined ? null : "sha256:" + "1".repeat(64),
    candidate_artifact_digest: "sha256:" + "2".repeat(64),
    base_semantic_artifact: null,
    candidate_semantic_artifact: null,
    semantic_delta: [
      {
        field_path: field,
        before: before === undefined ? { state: "absent", value: null } : { state: "present", value: before },
        after: { state: "present", value: after },
      },
    ],
    law_identifier: "playbill-claim-law-v8",
    law_digest: "sha256:" + "9".repeat(64),
    law_evidence: {},
    dependency_proof_refs: [],
  };
}

function review(id: string, members: Schemas["ReviewedMember"][], extra: Partial<Schemas["ProposalReview"]>): Schemas["ProposalReview"] {
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
    governance: {
      activation_policy: "on_final_approval",
      approval_requirements: [{ role: "independent-principal", minimum_distinct_signers: 1 }],
      law_digests: [],
      required_tier: "governed_write",
    },
    provenance: { actor_id: "release-owner", source_compilation_digest: "sha256:" + "e".repeat(64) },
    attestation_coverage: { attestations: [], coverage: "containing_change_set" },
    documents: [],
    redactions: ["body", "readable_diff", "source_mapping"],
    ...extra,
  };
}

const reviewFixture = (id: string, response: Schemas["ProposalReview"], after?: string) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/proposals/{proposal_id}/review",
    pathParams: { proposal_id: id },
    body: reviewBody(after),
    response,
  });

const generations = defineFixture({
  method: "get",
  path: "/api/v1/{instance_id}/orient",
  query: orientQuery({ coordinate: COORDINATE, section: "generations", limit: LEDGER_PAGE }),
  response: {
    tag: "playbill-orient-v1",
    instance: "inst_fixture",
    coordinate: COORDINATE,
    generation: AT.generation,
    accepted_at: "2026-10-19T09:30:00Z",
    evaluation_time: NOW,
    section: "generations",
    generations: [
      {
        sequence: 42,
        git_oid: COORDINATE.git_oid,
        accepted_at: "2026-10-19T09:30:00Z",
        changeset_digest: "sha256:" + "c".repeat(64),
        proposal: ACCEPTED,
        proposer: "release-owner",
        approvals: ["security-lead"],
        because: "Vendor advisory says rel-1 never shipped the build.",
        members: 1,
      },
      {
        sequence: 41,
        git_oid: "3".repeat(40),
        accepted_at: "2026-10-17T10:00:00Z",
        proposal: ACCEPTED_OLDER,
        proposer: "sbom-import",
        because: "SBOM import of rel-1",
        members: 14,
      },
      { sequence: 0, git_oid: "0".repeat(40), accepted_at: "2026-10-17T09:00:00Z", members: 0 },
    ],
    next_cursor: "g-page-2",
  },
});

export default [
  generations,
  list("settled", [
    entry(ACCEPTED, { actor_id: "release-owner", admitted_at: "2026-10-19T09:00:00Z", terminal_reason: "accepted" }),
    entry(ACCEPTED_OLDER, { admitted_at: "2026-10-17T10:00:00Z", actor_id: "sbom-import", terminal_reason: "accepted" }),
    entry(REFUSED, { admitted_at: "2026-10-18T12:00:00Z", verdict: "refused", terminal_reason: "refused" }),
  ]),
  list("open", [entry(OPEN, { admitted_at: "2026-10-19T10:00:00Z", status: "open" })]),
  cardFixture(ACCEPTED, {
    proposal: ACCEPTED,
    status: "settled",
    verdict: "candidate",
    actor: "release-owner",
    admitted_at: "2026-10-19T09:00:00Z",
    rationale: "Vendor advisory says rel-1 never shipped the build.",
    changes: [{ path: `claims/00/${CLAIM_A3}.json`, change: "created" }],
  }),
  cardFixture(OPEN, {
    proposal: OPEN,
    status: "open",
    verdict: "candidate",
    actor: "triage-agent",
    admitted_at: "2026-10-19T10:00:00Z",
    rationale: "Retire the not_affected contender: OSV range covers rel-1's xz build.",
    changes: [{ path: `claims/00/${CLAIM_A3}.json`, change: "retired" }],
  }),
  reviewFixture(
    ACCEPTED,
    review(ACCEPTED, [member(`claims/00/${CLAIM_A3}.json`, "object.value", undefined, "not_affected")], {
      rationale: "Vendor advisory says rel-1 never shipped the build.",
      attestation_coverage: {
        attestations: [{ signer_id: "security-lead", submitted_by: "release-owner", attestation_digest: "sha256:" + "f".repeat(64) }],
        coverage: "containing_change_set",
      },
    }),
  ),
  reviewFixture(
    OPEN,
    review(OPEN, [member(`claims/00/${CLAIM_A3}.json`, "lifecycle.state", "live", "retired")], {
      provenance: { actor_id: "triage-agent" },
      rationale: "Retire the not_affected contender: OSV range covers rel-1's xz build.",
      item_reasons: [
        {
          operation: "retire",
          path: `claims/00/${CLAIM_A3}.json`,
          item_key: "rel-1/CVE-2024-3094",
          child_index: 0,
          procedure: "security.cve-applicability",
          run_id: "run-8",
          terminal: "propose",
          reason: "OSV lists xz 5.6.0 and 5.6.1 as affected; rel-1 pins 5.6.1.",
        },
      ],
      item_reason_count: 1,
    }),
  ),
];

