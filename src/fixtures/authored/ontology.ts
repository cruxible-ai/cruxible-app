/**
 * Hand-authored ontology reads for the kind and contract pages: SubjectKind
 * and CaptureContract cards (get-batch), the capture-landing Trigger listing,
 * the capture_contracts section and the definition pins section.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, getBody, LANDING_TRIGGERS_QUERY, orientQuery, queryBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

const result = (ref: string, kind: GetResult["kind"], card: NonNullable<GetResult["card"]>): GetResult => ({
  tag: "playbill-get-result-v1",
  ref,
  kind,
  detail: "summary",
  coordinate: AT,
  accepted_coordinate: COORDINATE,
  evaluation_time: NOW,
  card,
});

const batch = (ref: string, kind: GetResult["kind"], card: NonNullable<GetResult["card"]>) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([ref], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [result(ref, kind, card)] },
  });

const subjectKind = (kind: string, description: string, keys: string[], live: number): Schemas["GetSubjectKindCard"] => ({
  subject_kind: `SubjectKind:${kind}`,
  description,
  lifecycle: "live",
  rule: "keys",
  keys,
  uniqueness: "unique",
  live_subjects: live,
  kit: "security",
});

const pin = (source: string, role: string, target: string, current: boolean | null = true): Schemas["OrientPin"] => ({
  source,
  role,
  target,
  ...(current === null ? {} : { current }),
});
const OSV = "CaptureContract:security.osv-applicability-v1";
const KEV = "CaptureContract:security.kev-http-v1";
const FETCH = "Contract:web.fetch.request/v1";
const OSV_QUERY = "Contract:security.osv-query.request/v1";

const OSV_CARD: Schemas["GetCaptureContractCard"] = {
  contract: OSV,
  version: 1,
  lifecycle: "live",
  captures: { grade: "observed", source_kinds: ["external"] },
  admitted_by: ["security.assessment.status"],
};
const KEV_CARD: Schemas["GetCaptureContractCard"] = {
  contract: KEV,
  version: 1,
  lifecycle: "live",
  captures: { grade: "observed", source_kinds: ["external"] },
  admitted_by: ["security.vulnerability.kev_listed"],
};

/**
 * Definition pins, by source as the section pages them (Lines and Triggers
 * pin the contract they name under `capture-contract`, Procedures pin the
 * Contracts their slots take under `contract`).
 */
export const PINS: Schemas["OrientPin"][] = [
  pin("Line:cve-applicability", "capture-contract", OSV),
  pin("Line:cve-applicability", "procedure", "Procedure:security.cve-applicability"),
  pin("Line:kev-triage", "capture-contract", KEV),
  pin("Line:kev-triage", "procedure", "Procedure:security.kev-triage"),
  pin("Procedure:security.cve-applicability", "capture-contract", OSV),
  pin("Procedure:security.cve-applicability", "contract", OSV_QUERY),
  pin("Procedure:security.kev-acquire", "capture-contract", KEV),
  pin("Procedure:security.kev-acquire", "contract", FETCH),
  pin("Procedure:security.kev-triage", "capture-contract", KEV),
  pin("Procedure:security.kev-triage", "contract", FETCH),
  pin("Procedure:security.osv-acquire", "capture-contract", OSV),
  pin("Procedure:security.osv-acquire", "contract", OSV_QUERY),
  pin("ProcedureMandate:security.kev-settle", "claim-type", "ClaimType:security.assessment.status"),
  pin("ProcedureMandate:security.kev-settle", "line", "Line:kev-triage"),
  pin("QueryDefinition:security.kev_exposure", "claim-type", "ClaimType:security.assessment.status"),
  pin("QueryDefinition:security.kev_exposure", "claim-type", "ClaimType:security.vulnerability.kev_listed", false),
  pin("Trigger:security.kev-landed", "capture-contract", KEV),
  pin("Trigger:security.osv-landed", "capture-contract", OSV),
];

/** The stored contract (get detail=proof): its terms, as the daemon serves the v3 envelope. */
const OSV_PROOF: GetResult = {
  tag: "playbill-get-result-v1",
  ref: OSV,
  kind: "capture_contract",
  detail: "proof",
  coordinate: AT,
  accepted_coordinate: COORDINATE,
  evaluation_time: NOW,
  proof: {
    coordinate: COORDINATE,
    path: "capture-contracts/security.osv-applicability-v1.json",
    artifact_digest: "sha256:" + "8".repeat(64),
    envelope: {
      artifact_format: "cruxible-capture-contract-v3",
      identity: { kind: "CaptureContract", name: "security.osv-applicability-v1" },
      shape: "http_response",
      replay: "attested",
      components: {
        selector_schemas: [{ target: { kind: "Contract", name: "whole-response-v1" } }],
        replay_policy: { target: { kind: "Contract", name: "playbill.external.retained-selection-replay-v1" } },
        provenance_rule: { target: { kind: "Contract", name: "playbill.external.daemon-fetched-v1" } },
      },
      selection_budget: { tag: "playbill-capture-selection-budget-v1", max_bytes: 16777216, max_rows: 1, max_items: 1 },
      retention_erasure_policy: {
        body_retention: "required_for_duration",
        minimum_retention: { tag: "playbill-duration-v1", microseconds: 2592000000000 },
        erasure: "prohibited",
        erasure_rule: null,
        selector_privacy: "direct_allowed",
      },
      epistemic_grade: "observed",
      lifecycle: { state: "live", predecessor_digest: null },
    },
  },
};

export default [
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: OSV, coordinate: COORDINATE, detail: "proof" }),
    response: OSV_PROOF,
  }),
  batch(
    "SubjectKind:security.assessment",
    "subject_kind",
    subjectKind("security.assessment", "Whether one release is affected by one CVE: one per pair.", ["security.assessment.release_id", "security.assessment.cve_id"], 2),
  ),
  batch(
    "SubjectKind:security.vulnerability",
    "subject_kind",
    subjectKind("security.vulnerability", "One CVE, as the catalogs describe it.", ["security.vulnerability.cve_id"], 3),
  ),
  batch("CaptureContract:security.osv-applicability-v1", "capture_contract", OSV_CARD),
  // The evidence-flow view reads every contract's card in one batch, in section order.
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([KEV, OSV], COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: [result(KEV, "capture_contract", KEV_CARD), result(OSV, "capture_contract", OSV_CARD)],
    },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/query",
    body: queryBody(LANDING_TRIGGERS_QUERY, COORDINATE),
    response: {
      tag: "playbill-query-page-v1",
      kind: "Trigger",
      columns: [
        { name: "name", type: "string" },
        { name: "schedule", type: "enum" },
        { name: "target", type: "string" },
        { name: "capture_contract", type: "string" },
        { name: "logical_sources", type: "string", cardinality: "many" },
      ],
      rows: [
        {
          name: "security.osv-landed",
          schedule: "capture_landing",
          target: "Line:cve-applicability",
          capture_contract: "CaptureContract:security.osv-applicability-v1",
          logical_sources: ["osv.query"],
        },
        {
          name: "security.kev-landed",
          schedule: "capture_landing",
          target: "Line:kev-triage",
          capture_contract: "CaptureContract:security.kev-http-v1",
          logical_sources: ["cisa.kev.catalog"],
        },
      ],
      receipt: { mode: "inline", spec_digest: "sha256:" + "e".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "capture_contracts", limit: 500 }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "capture_contracts",
      capture_contracts: [
        { contract: "CaptureContract:security.kev-http-v1", version: 1, lifecycle: "live", grade: "observed", admitted_by: 1 },
        { contract: "CaptureContract:security.osv-applicability-v1", version: 1, lifecycle: "live", grade: "observed", admitted_by: 1 },
      ],
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "pins", limit: 500 }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "pins",
      pins: PINS,
    },
  }),
];
