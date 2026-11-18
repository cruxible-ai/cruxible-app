/**
 * Hand-authored Subject reads (the recorded world covers ordinary Subjects;
 * these keep a contested slot with evidence both ways, a refused ref, and a
 * second history page). Subject
 * cards (get-batch, as the app reads them), Claim verdict cards, admission
 * accounts, evidence, revisions, field history, and the neighborhood hops
 * around security.assessment/rel-1-cve-2024-3094.
 */
import { defineErrorFixture, defineFixture } from "../fixture";
import { errorEnvelope } from "../envelopes";
import { claimReadBatchBody, getBatchBody, getBody, HISTORY_PAGE, INCOMING_PAGE } from "@/api/requests";
import type { CaptureAdmissionAccount, GetResult, Schemas } from "@/api/schemas";
import { ACCEPTED_AT, AT, COORDINATE, NOW } from "./world";

const clm = (n: number) => `CLM-${n.toString(16).padStart(32, "0")}`;

type SubjectClaim = Schemas["GetSubjectClaim"];

const SUBJECTS: Record<string, { kind: string; incoming: number; claims: SubjectClaim[] }> = {
  "security.assessment/rel-1-cve-2024-3094": {
    kind: "security.assessment",
    incoming: 0,
    claims: [
      { predicate: "release", claim: clm(0xa1), value: "security.release/rel-1" },
      {
        predicate: "status",
        claim: [clm(0xa2), clm(0xa3)],
        value: ["affected", "not_affected"],
        flags: ["contested"],
      },
      { predicate: "vulnerability", claim: clm(0xa4), value: "security.vulnerability/cve-2024-3094" },
    ],
  },
  "security.vulnerability/cve-2024-3094": {
    kind: "security.vulnerability",
    incoming: 2,
    claims: [
      { predicate: "cve_id", claim: clm(0xb1), value: "CVE-2024-3094" },
      { predicate: "kev_listed", claim: clm(0xb2), value: true, flags: ["stale"] },
      { predicate: "related", claim: [clm(0xb3)], value: ["security.vulnerability/cve-2024-6387"] },
    ],
  },
  "security.vulnerability/cve-2024-6387": {
    kind: "security.vulnerability",
    incoming: 1,
    claims: [
      { predicate: "cve_id", claim: clm(0xc1), value: "CVE-2024-6387" },
      { predicate: "kev_listed", claim: clm(0xc2), value: false },
    ],
  },
  "security.release/rel-1": {
    kind: "security.release",
    incoming: 1,
    claims: [{ predicate: "product", claim: clm(0xd1), value: "security.product/xz-utils" }],
  },
  "security.product/xz-utils": {
    kind: "security.product",
    incoming: 1,
    claims: [{ predicate: "name", claim: clm(0xe1), value: "xz-utils" }],
  },
};

function subjectResult(ref: string): GetResult {
  const subject = SUBJECTS[ref]!;
  return {
    tag: "playbill-get-result-v1",
    ref,
    kind: "subject",
    detail: "summary",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    card: {
      subject: ref,
      kind: subject.kind,
      lifecycle: "live",
      claims: subject.claims,
      incoming_count: subject.incoming,
    },
  };
}

function batch(refs: string[], results: GetResult[]) {
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(refs, COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results },
  });
}

// -- Claim cards, evidence and admission for the two Subjects with pages ------------

interface ClaimSpec {
  id: string;
  subject: string;
  field: string;
  predicate: string;
  value: unknown;
  verdict: string;
  status: string;
  revision: number;
  flags?: Schemas["GetClaimCard"]["flags"];
  contenders?: Schemas["GetContender"][];
  captures?: Schemas["GetCaptureEvidence"][];
  attestations?: Schemas["GetAttestationEvidence"][];
  rationale?: string;
  accounts?: CaptureAdmissionAccount[];
}

const OSV_CAPTURE = "sha256:7c1e9a3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c";
const KEV_CAPTURE = "sha256:9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b";
// The vendor's advisory page, quoted, and the author's own words.
const ADVISORY_CAPTURE = "sha256:5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d";
const OWN_WORDS_CAPTURE = "sha256:3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e";

function account(
  digest: string,
  contract: string,
  status: CaptureAdmissionAccount["status"],
  role: CaptureAdmissionAccount["citation_role"] = "evidence",
  origin: CaptureAdmissionAccount["citation_origin"] = "independent",
): CaptureAdmissionAccount {
  return {
    tag: "cruxible-capture-admission-account-v2",
    citation_id: `cit-${digest.slice(7, 15)}`,
    capture_digest: digest,
    citation_role: role,
    citation_origin: origin,
    capture_contract_identity: contract,
    capture_contract_digest: "sha256:" + "4".repeat(64),
    status,
    decision:
      status === "not_evidence"
        ? null
        : {
            tag: "cruxible-capture-evidence-admission-v2",
            status: status === "admitted" ? "admitted" : "not_admitted",
            rule_id: status === "admitted" ? "osv-applicability" : null,
            admission: status === "admitted" ? "direct" : null,
            refusal_code: status === "admitted" ? null : "cruxible.evidence.contract_not_admitted",
          },
  };
}

const CLAIMS: ClaimSpec[] = [
  {
    id: clm(0xa1), subject: "security.assessment/rel-1-cve-2024-3094", field: "release",
    predicate: "security.assessment.release", value: "security.release/rel-1",
    verdict: "supported", status: "accepted", revision: 1,
  },
  {
    id: clm(0xa2), subject: "security.assessment/rel-1-cve-2024-3094", field: "status",
    predicate: "security.assessment.status", value: "affected", verdict: "supported",
    status: "conflicted", revision: 2, flags: ["contested"],
    contenders: [{ claim: clm(0xa3), value: "not_affected", verdict: "supported" }],
    captures: [
      {
        capture: `CAP-${OSV_CAPTURE.slice(7, 19)}`, contract: "security.osv-applicability-v1", version: 1,
        source: "https://api.osv.dev/v1/query", observed_at: "2026-10-18T22:10:00Z", role: "evidence",
        origin: "independent", status: "admitted",
      },
    ],
    attestations: [
      {
        stance: "support", principal: "triage-agent", at: "2026-10-19T08:00:00Z", current: true,
        record: "accepted", basis: "new_capture", counts: true, counts_reason: "cites_admitted_capture",
      },
      {
        stance: "contradict", principal: "release-owner", at: "2026-10-19T09:00:00Z", current: true,
        record: "event", basis: "examined_existing", counts: false, counts_reason: "not_accepted",
        event: "sha256:" + "e".repeat(64),
      },
    ],
    rationale: "OSV lists the release's xz package within the affected range.",
    accounts: [account(OSV_CAPTURE, "security.osv-applicability-v1", "admitted")],
  },
  {
    id: clm(0xa3), subject: "security.assessment/rel-1-cve-2024-3094", field: "status",
    predicate: "security.assessment.status", value: "not_affected", verdict: "supported",
    status: "conflicted", revision: 1, flags: ["contested"],
    contenders: [{ claim: clm(0xa2), value: "affected", verdict: "supported" }],
    captures: [
      {
        capture: `CAP-${ADVISORY_CAPTURE.slice(7, 19)}`, contract: "security.vendor-advisory-v1", version: 1,
        source: "playbill.page", observed_at: "2026-10-18T23:40:00Z", role: "copy",
        origin: "independent", status: "admitted",
      },
      {
        capture: `CAP-${OWN_WORDS_CAPTURE.slice(7, 19)}`, contract: "playbill.coordinator-self-source-v1", version: 1,
        source: "playbill.coordinator-authoring", observed_at: "2026-10-19T09:20:00Z", role: "copy",
        origin: "self_source", status: "not_evidence",
      },
    ],
    attestations: [
      {
        stance: "support", principal: "release-owner", at: "2026-10-19T09:25:00Z", current: true,
        record: "event", basis: "examined_existing", counts: true, counts_reason: "consequence_policy",
        event: "sha256:" + "f".repeat(64), rule: "owner-confirms-scope",
      },
      {
        stance: "unsure", principal: "triage-agent", at: "2026-10-18T10:00:00Z", current: false,
        record: "accepted", basis: "new_capture", counts: false, counts_reason: "not_current",
      },
    ],
    rationale: "Vendor advisory: the backdoored build was never shipped in rel-1.",
    accounts: [
      account(ADVISORY_CAPTURE, "security.vendor-advisory-v1", "admitted", "copy"),
      account(OWN_WORDS_CAPTURE, "playbill.coordinator-self-source-v1", "not_evidence", "copy", "self_source"),
    ],
  },
  {
    id: clm(0xa4), subject: "security.assessment/rel-1-cve-2024-3094", field: "vulnerability",
    predicate: "security.assessment.vulnerability", value: "security.vulnerability/cve-2024-3094",
    verdict: "supported", status: "accepted", revision: 1,
  },
  // The key: its ClaimType requires no evidence, so the citation the rule refuses is not wrong.
  {
    id: clm(0xb1), subject: "security.vulnerability/cve-2024-3094", field: "cve_id",
    predicate: "security.vulnerability.cve_id", value: "CVE-2024-3094", verdict: "supported", status: "accepted", revision: 1,
    accounts: [account(OSV_CAPTURE, "security.osv-applicability-v1", "not_admitted")],
  },
  {
    id: clm(0xb2), subject: "security.vulnerability/cve-2024-3094", field: "kev_listed",
    predicate: "security.vulnerability.kev_listed", value: true, verdict: "supported", status: "accepted",
    revision: 3, flags: ["stale"],
    accounts: [account(KEV_CAPTURE, "security.kev-http-v1", "not_admitted")],
  },
  // Requires no evidence either (and is no key): a refused citation stays quiet.
  {
    id: clm(0xb3), subject: "security.vulnerability/cve-2024-3094", field: "related",
    predicate: "security.vulnerability.related", value: "security.vulnerability/cve-2024-6387",
    verdict: "supported", status: "accepted", revision: 1,
    accounts: [account(ADVISORY_CAPTURE, "security.vendor-advisory-v1", "not_admitted")],
  },
];

function claimResult(spec: ClaimSpec): GetResult {
  return {
    tag: "playbill-get-result-v1",
    ref: spec.id,
    kind: "claim",
    detail: "summary",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    card: {
      claim: spec.id,
      subject: spec.subject,
      predicate: spec.field,
      predicate_full: spec.predicate,
      value: spec.value as Schemas["ShownValue"],
      verdict: spec.verdict,
      status: spec.status,
      revision: spec.revision,
      ...(spec.flags ? { flags: spec.flags } : {}),
      ...(spec.contenders ? { contenders: spec.contenders } : {}),
    },
  };
}

function claimView(spec: ClaimSpec): Schemas["ClaimViewRecord"] {
  const [kind, id] = spec.subject.split("/") as [string, string];
  return {
    tag: "playbill-claim-read-v2",
    coordinate_kind: "canonical",
    coordinate: COORDINATE,
    envelope: { identity: `Claim:${spec.id}`, path: `claims/${spec.id.slice(4, 6)}/${spec.id}.json` },
    facts: [],
    admission_evaluation_time: ACCEPTED_AT,
    admission_accounts: spec.accounts ?? [],
    statement: {
      subject: { artifact_path: `subjects/${kind}/${id}.json`, selector: { scheme: "subject", value: spec.subject } },
      predicate: spec.predicate,
      object: { kind: "literal", value: spec.value },
      role: "normative",
      lifecycle: "live",
    },
  };
}

function claimSet(subject: string) {
  const specs = CLAIMS.filter((spec) => spec.subject === subject);
  // The order the Subject page reads them: the card's slots, ids flattened.
  const ids = SUBJECTS[subject]!.claims.flatMap((entry) => (Array.isArray(entry.claim) ? entry.claim : [entry.claim]));
  const byId = new Map(specs.map((spec) => [spec.id, spec]));
  return [
    batch(ids, ids.map((id) => claimResult(byId.get(id)!))),
    defineFixture({
      method: "post",
      path: "/api/v1/{instance_id}/claims/read-batch",
      body: claimReadBatchBody(ids, COORDINATE),
      response: { tag: "playbill-claim-read-batch-v1", coordinate: COORDINATE, claims: ids.map((id) => claimView(byId.get(id)!)) },
    }),
    // Evidence and revisions only for the contested slot: the recorded world
    // covers uncontested Claims.
    ...specs.filter((spec) => spec.contenders).flatMap((spec) => [
      defineFixture({
        method: "post",
        path: "/api/v1/{instance_id}/get",
        body: getBody({ ref: spec.id, coordinate: COORDINATE, detail: "evidence" }),
        response: {
          ...claimResult(spec),
          detail: "evidence",
          evidence: {
            value: spec.value,
            captures: spec.captures ?? [],
            attestations: spec.attestations ?? [],
            ...(spec.rationale ? { rationale: spec.rationale } : {}),
          },
        },
      }),
      defineFixture({
        method: "post",
        path: "/api/v1/{instance_id}/get",
        body: getBody({ ref: spec.id, coordinate: COORDINATE, detail: "history", limit: HISTORY_PAGE }),
        response: {
          ...claimResult(spec),
          detail: "history",
          history: {
            kind: "revisions",
            revisions: Array.from({ length: spec.revision }, (_, i) => ({
              revision: spec.revision - i,
              sequence: 40 - i * 7,
              git_oid: (40 - i * 7).toString(16).padStart(12, "0"),
              proposed_at: `2026-10-${String(19 - i).padStart(2, "0")}T09:30:00Z`,
              actor: i === 0 ? "triage-agent" : "kev-sync",
              approved_by: i === 0 ? ["release-owner"] : [],
              value: spec.value as Schemas["ShownValue"],
              digest: `sha256:${(0xabc + i).toString(16)}`,
              change: i === spec.revision - 1 ? ("stated" as const) : ("changed" as const),
              reason: { kind: "change_set" as const, text: "Applicability re-checked against OSV.", proposal: "sha256:" + "5".repeat(64) },
            })),
          },
        },
      }),
    ]),
  ];
}

/** A run no Line triggered (run-7, in lines.ts, is the kev-triage Line's). */
const DIRECT_RUN = `RUN-${"d1".repeat(32)}`;

function historyFixture(subject: string) {
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: subject, coordinate: COORDINATE, detail: "history", limit: HISTORY_PAGE }),
    response: {
      ...subjectResult(subject),
      detail: "history",
      history: {
        kind: "subject",
        revisions: [],
        events:
          subject === "security.assessment/rel-1-cve-2024-3094"
            ? [
                {
                  change: "stated", field: "status", predicate: "security.assessment.status", claim: clm(0xa3),
                  sequence: 41, git_oid: "000000000029", proposed_at: "2026-10-19T09:00:00Z", actor: "release-owner",
                  value: "not_affected", contended: true,
                  reason: { kind: "change_set", text: "Vendor advisory says rel-1 never shipped the build.", proposal: "sha256:" + "6".repeat(64) },
                },
                {
                  change: "changed", field: "status", predicate: "security.assessment.status", claim: clm(0xa2),
                  sequence: 40, git_oid: "000000000028", proposed_at: "2026-10-18T22:15:00Z", actor: "triage-agent",
                  approved_by: ["release-owner"], before: "under_investigation", value: "affected",
                  reason: { kind: "procedure_item", reason: "OSV range match", proposal: "sha256:" + "7".repeat(64), procedure: "Procedure:security.kev-triage", run: "run-7", terminal: "settled" },
                },
                {
                  change: "stated", field: "release", predicate: "security.assessment.release", claim: clm(0xa1),
                  sequence: 33, git_oid: "000000000021", proposed_at: "2026-10-17T10:00:00Z", actor: "sbom-import",
                  value: "security.release/rel-1",
                },
              ]
            : [
                {
                  change: "reobserved", field: "kev_listed", predicate: "security.vulnerability.kev_listed", claim: clm(0xb2),
                  sequence: 38, git_oid: "000000000026", proposed_at: "2026-10-18T06:00:00Z", actor: "kev-sync", value: true,
                },
                // A direct run's change set: the key's reason is core's proposal text, which only restates the run.
                {
                  change: "stated", field: "kev_listed", predicate: "security.vulnerability.kev_listed", claim: clm(0xb2),
                  sequence: 30, git_oid: "00000000001e", proposed_at: "2026-10-16T06:00:00Z", actor: "kev-sync", approved_by: ["kev-sync"],
                  value: true,
                  reason: { kind: "procedure_item", reason: "CISA's KEV catalog lists CVE-2024-3094.", proposal: "sha256:" + "8".repeat(64), procedure: "Procedure:security.kev-backfill", run: DIRECT_RUN, terminal: "propose" },
                },
                {
                  change: "stated", field: "cve_id", predicate: "security.vulnerability.cve_id", claim: clm(0xb1),
                  sequence: 30, git_oid: "00000000001e", proposed_at: "2026-10-16T06:00:00Z", actor: "kev-sync", approved_by: ["kev-sync"],
                  value: "CVE-2024-3094",
                  reason: {
                    kind: "change_set",
                    text: `Proposed by Procedure security.kev-backfill run ${DIRECT_RUN} terminal propose\n\n2 items; each item's reason is recorded with the Claim or Subject it explains.`,
                    proposal: "sha256:" + "8".repeat(64),
                  },
                },
              ],
      },
      next_cursor: subject === "security.assessment/rel-1-cve-2024-3094" ? "page-2" : null,
    },
  });
}

const ASSESSMENT = "security.assessment/rel-1-cve-2024-3094";

// -- who authored a change set --------------------------------------------------
// The direct run's card, and the kev-triage Line's latest revision (g45: revised
// after run-7's change at g40).

const runAuthors = [
  batch([`ProcedureRun:${DIRECT_RUN}`], [
    {
      tag: "playbill-get-result-v1",
      ref: `ProcedureRun:${DIRECT_RUN}`,
      kind: "procedure_run",
      detail: "summary",
      coordinate: AT,
      accepted_coordinate: COORDINATE,
      evaluation_time: NOW,
      card: {
        run: DIRECT_RUN,
        procedure: "Procedure:security.kev-backfill",
        status: "succeeded",
        nodes_done: 3,
        nodes_total: 3,
        started_at: "2026-10-16T05:59:00Z",
        actor: "kev-sync",
      },
    },
  ]),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: "Line:kev-triage", coordinate: COORDINATE, detail: "history", limit: 1 }),
    response: {
      tag: "playbill-get-result-v1",
      ref: "Line:kev-triage",
      kind: "line",
      detail: "history",
      coordinate: AT,
      accepted_coordinate: COORDINATE,
      evaluation_time: NOW,
      history: {
        kind: "revisions",
        revisions: [
          {
            revision: 2, sequence: 45, git_oid: "00000000002d", proposed_at: "2026-10-19T08:00:00Z", actor: "release-owner",
            digest: "sha256:" + "9".repeat(12),
          },
        ],
      },
    },
  }),
];

function incomingFixture(subject: string, claims: Schemas["GetIncomingClaim"][]) {
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: subject, coordinate: COORDINATE, detail: "incoming", limit: INCOMING_PAGE }),
    response: {
      ...subjectResult(subject),
      detail: "incoming",
      incoming: { kind: "incoming", claims },
      next_cursor: null,
    },
  });
}

export default [
  // Cards for the two Subjects the authored tests open; the other three
  // appear only inside the neighborhood hop batches below.
  ...[ASSESSMENT, "security.vulnerability/cve-2024-3094"].map((ref) => batch([ref], [subjectResult(ref)])),
  defineErrorFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(["security.vulnerability/cve-1999-0001"], COORDINATE),
    status: 404,
    response: errorEnvelope(
      "ReadRefusalError",
      "cruxible.get.ref_not_found: no accepted Subject 'security.vulnerability/cve-1999-0001'",
      "cruxible.get.ref_not_found",
    ),
  }),
  ...claimSet(ASSESSMENT),
  ...claimSet("security.vulnerability/cve-2024-3094"),
  historyFixture(ASSESSMENT),
  historyFixture("security.vulnerability/cve-2024-3094"),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: ASSESSMENT, coordinate: COORDINATE, detail: "history", limit: HISTORY_PAGE, cursor: "page-2" }),
    response: {
      ...subjectResult(ASSESSMENT),
      detail: "history",
      history: {
        kind: "subject",
        revisions: [],
        events: [
          {
            change: "stated", field: "vulnerability", predicate: "security.assessment.vulnerability", claim: clm(0xa4),
            sequence: 33, git_oid: "000000000021", proposed_at: "2026-10-17T10:00:00Z", actor: "sbom-import",
            value: "security.vulnerability/cve-2024-3094",
          },
        ],
      },
    },
  }),
  ...runAuthors,
  incomingFixture(ASSESSMENT, []),
  incomingFixture("security.vulnerability/cve-2024-3094", [
    { claim: clm(0xa4), subject: ASSESSMENT, predicate: "security.assessment.vulnerability" },
    { claim: clm(0xf1), subject: "security.vulnerability/cve-2024-6387", predicate: "security.vulnerability.related" },
  ]),
  // The Subjects pointing at cve-2024-3094, summarized in its incoming list.
  batch(
    [ASSESSMENT, "security.vulnerability/cve-2024-6387"],
    [subjectResult(ASSESSMENT), subjectResult("security.vulnerability/cve-2024-6387")],
  ),
  // Neighborhood hops from the assessment: depth 1, then depth 2.
  batch(
    ["security.release/rel-1", "security.vulnerability/cve-2024-3094"],
    [subjectResult("security.release/rel-1"), subjectResult("security.vulnerability/cve-2024-3094")],
  ),
  batch(
    ["security.product/xz-utils", "security.vulnerability/cve-2024-6387"],
    [subjectResult("security.product/xz-utils"), subjectResult("security.vulnerability/cve-2024-6387")],
  ),
];
