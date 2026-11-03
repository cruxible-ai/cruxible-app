/**
 * Hand-authored definitions as the Claim-authority core serves them: the
 * procedures section, every Procedure's card with its authored form (slots
 * as Contract pairs, steps naming CaptureContracts, queries and ClaimTypes,
 * logical sources in a call's input), and every Line's envelope (get-batch
 * detail=proof: parameters, trigger input, bindings by build). The evidence
 * flow, contract and Line pages derive the logical sources from these.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, getBody, orientQuery } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

type Spec = Schemas["ProcedureSpec"];
type Slot = Schemas["ProcedureSlot"];

const OSV = "security.osv-applicability-v1";
const KEV = "security.kev-http-v1";

const slot = (input: string, output: string, effect: Slot["effect"]): Slot => ({
  in: { name: input, version: 1 },
  out: { name: output, version: 1 },
  effect,
});
const FETCH = slot("web.fetch.request", "web.fetch.result", "external_read");
const OSV_QUERY = slot("security.osv-query.request", "security.osv-query.result", "external_read");
const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });
const input = (...path: string[]) => ({ $ref: "input" as const, path });

/** Reads the KEV catalog that landed (trigger input `catalog`), extracts it against the watched CVEs, writes Claims. */
export const KEV_TRIAGE_SPEC: Spec = {
  procedure: "security.kev-triage",
  description: "Triage newly KEV-listed CVEs against shipped releases.",
  slots: { fetch: FETCH },
  steps: [
    { call: "catalog", slot: "fetch", input: { logical_source: "cisa.kev.catalog", expected_format: "json" }, captures: { capture: KEV } },
    { read: "watched", query: "security.kev_exposure" },
    {
      extract: "entries",
      capture: step("catalog", "capture"),
      records: "/vulnerabilities/*",
      row: "security.kev-record@1",
      fields: { date_added: { at: "dateAdded", parse: "date" } },
      key: { cve_id: { at: "cveID" } },
    },
    { id: "changed", guard: { op: "present", of: step("entries", "records") }, else: { halt: "no_change" } },
    {
      id: "settle",
      claims: [{ type: "security.vulnerability.kev_date_added", value: item("fields", "date_added") }],
      for_each: step("entries", "records"),
      subject: { kind: "security.vulnerability", key: { cve_id: item("key", "cve_id") }, within: step("watched", "rows") },
    },
  ],
};

/** Fetches the KEV catalog by URL and retains it under the logical source a direct run names. */
const KEV_ACQUIRE_SPEC: Spec = {
  procedure: "security.kev-acquire",
  description: "Fetch the CISA KEV catalog and retain it.",
  slots: { fetch: FETCH },
  steps: [
    {
      call: "catalog",
      slot: "fetch",
      input: { logical_source: "cisa.kev.catalog", url: "https://example.invalid/kev.json" },
      captures: { capture: KEV },
    },
  ],
};

const OSV_ACQUIRE_SPEC: Spec = {
  procedure: "security.osv-acquire",
  description: "Ask OSV about a release's components and retain the answer.",
  input: { release: { type: { kind: "string" } } },
  slots: { osv: OSV_QUERY },
  steps: [{ call: "osv", slot: "osv", input: { logical_source: "osv.query", release: input("release") }, captures: { capture: OSV } }],
};

const CVE_SPEC: Spec = {
  procedure: "security.cve-applicability",
  description: "Decide applicability from the OSV answer that landed.",
  slots: { record: OSV_QUERY },
  steps: [
    { call: "record", slot: "record", input: { logical_source: "osv.query" }, captures: { capture: OSV } },
    {
      extract: "answers",
      capture: step("record", "capture"),
      records: "/results/*",
      row: "security.osv-answer@1",
      fields: { status: { at: "status" } },
      key: { assessment: { at: "assessment" } },
    },
    {
      id: "propose",
      claims: [{ type: "security.assessment.status", value: item("fields", "status") }],
      for_each: step("answers", "records"),
      subject: { kind: "security.assessment", key: { assessment_id: item("key", "assessment") } },
    },
  ],
};

export const SPECS: Spec[] = [CVE_SPEC, KEV_ACQUIRE_SPEC, KEV_TRIAGE_SPEC, OSV_ACQUIRE_SPEC];

export const RUNNABLE: Record<string, "direct" | "line"> = {
  "security.cve-applicability": "line",
  "security.kev-acquire": "direct",
  "security.kev-triage": "line",
  "security.osv-acquire": "direct",
};

const result = (ref: string, kind: GetResult["kind"], extra: Partial<GetResult>): GetResult => ({
  tag: "playbill-get-result-v1",
  ref,
  kind,
  detail: "summary",
  coordinate: AT,
  accepted_coordinate: COORDINATE,
  evaluation_time: NOW,
  ...extra,
});

/** A Procedure's summary card as the batch serves it (the Line page reads kev-triage's alone, with its track record). */
export function procedureCard(spec: Spec): Schemas["GetProcedureCard"] {
  return {
    authored: spec,
    procedure: spec.procedure,
    description: spec.description ?? null,
    lifecycle: "live",
    inputs: {},
    runnable: RUNNABLE[spec.procedure] ?? "direct",
  };
}

/** A Line's envelope (get detail=proof). */
const lineProof = (name: string, procedure: string, extra: Record<string, unknown>): GetResult =>
  result(`Line:${name}`, "line", {
    detail: "proof",
    proof: {
      coordinate: COORDINATE,
      path: `lines/${name}.json`,
      artifact_digest: "sha256:" + "9".repeat(64),
      envelope: {
        artifact_format: "cruxible-line-v8",
        identity: { kind: "Line", name },
        occurrence_epoch: 1,
        procedure: { target: { kind: "Procedure", name: procedure } },
        parameters: {},
        lifecycle: { state: "live", predecessor_digest: null },
        ...extra,
      },
    },
  });

const KEV_TRIAGE_PROOF = lineProof("kev-triage", "security.kev-triage", {
  max_authority: "settle",
  trigger_input: "catalog",
  trigger_event: { capture_contract_identity: { kind: "CaptureContract", name: KEV } },
  bindings: { fetch: { build: { role: "provider", target: { kind: "Provider", name: "cruxible-provider-web/" + "a".repeat(64) } }, operation: "web.fetch" } },
});

const triggerBatch = (name: string, schedule: Record<string, unknown>, target: string) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([`Trigger:${name}`], COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: [result(`Trigger:${name}`, "trigger", { card: { trigger: `Trigger:${name}`, lifecycle: "live", schedule, target } })],
    },
  });

export default [
  // The Line page reads its Line's envelope alone, and its Triggers' cards.
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: "Line:kev-triage", coordinate: COORDINATE, detail: "proof" }),
    response: KEV_TRIAGE_PROOF,
  }),
  triggerBatch("security.kev-daily", { kind: "cron", cron: "0 6 * * *" }, "Line:kev-triage"),
  triggerBatch(
    "security.kev-landed",
    { kind: "capture_landing", event: { capture_contract_identity: { kind: "CaptureContract", name: KEV }, logical_sources: ["cisa.kev.catalog"] } },
    "Line:kev-triage",
  ),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "procedures", limit: 500 }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "procedures",
      procedures: SPECS.map((spec) => ({ name: spec.procedure, lifecycle: "live" as const, runnable: RUNNABLE[spec.procedure]! })),
    },
  }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(SPECS.map((spec) => `Procedure:${spec.procedure}`), COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: SPECS.map((spec) => result(`Procedure:${spec.procedure}`, "procedure", { card: procedureCard(spec) })),
    },
  }),
  // Every Line's envelope, in lines-section order.
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(["Line:cve-applicability", "Line:kev-triage"], COORDINATE, "proof"),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: [
        lineProof("cve-applicability", "security.cve-applicability", {
          max_authority: "propose",
          trigger_input: "record",
          trigger_event: { capture_contract_identity: { kind: "CaptureContract", name: OSV } },
        }),
        KEV_TRIAGE_PROOF,
      ],
    },
  }),
];
