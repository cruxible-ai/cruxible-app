/**
 * Hand-authored definitions as compiler revision 36 serves them: the
 * procedures section, every Procedure's card with its authored form (slots,
 * steps naming contracts, interfaces and queries by name, logical sources),
 * and every Line's envelope (get-batch detail=proof: parameters, trigger
 * input, bindings). The evidence flow, contract and Line pages derive the
 * logical sources from these.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, orientQuery } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

type Spec = Schemas["ProcedureSpec"];

const OSV = "security.osv-applicability-v1";
const KEV = "security.kev-http-v1";

/** Reads the KEV catalog that landed (trigger input `catalog`), parses it against the watched CVEs, settles. */
export const KEV_TRIAGE_SPEC: Spec = {
  procedure: "security.kev-triage",
  description: "Triage newly KEV-listed CVEs against shipped releases.",
  input: {},
  slots: { catalog: "web.fetch@3", parse: "security.kev-catalog@2" },
  steps: [
    {
      id: "catalog",
      source: "catalog",
      contract: KEV,
      interface: "web.fetch/v3",
      provider: "catalog",
      request: { logical_source: "cisa.kev.catalog", expected_format: "json" },
    },
    { id: "watched", tap: "watched", query: "security.kev_exposure" },
    { id: "parse", call: "parse", interface: "security.kev-catalog/v2", provider: "parse", input: { catalog: "$catalog.retrieved.body_base64" } },
    { id: "changed", guard: "parse.changed > 0", refusal_code: "no_change", message: "The catalog changes no watched Claim.", else: "halt(no_change)" },
    { id: "settle", settle: "$parse.items", result: "$summary" },
  ],
};

/** Fetches the KEV catalog by URL and retains it under the logical source a direct run names. */
const KEV_ACQUIRE_SPEC: Spec = {
  procedure: "security.kev-acquire",
  description: "Fetch the CISA KEV catalog and retain it.",
  input: {},
  slots: { catalog: "web.fetch@3" },
  steps: [
    {
      id: "catalog",
      source: "catalog",
      contract: KEV,
      interface: "web.fetch/v3",
      provider: "catalog",
      request: { logical_source: "cisa.kev.catalog", url: "https://example.invalid/kev.json" },
    },
  ],
};

const OSV_ACQUIRE_SPEC: Spec = {
  procedure: "security.osv-acquire",
  description: "Ask OSV about a release's components and retain the answer.",
  input: { release: { type: "string" } },
  slots: { osv: "security.osv-query@1" },
  steps: [{ id: "osv", source: "osv", contract: OSV, interface: "security.osv-query/v1", provider: "osv", request: { logical_source: "osv.query", release: "$input.release" } }],
};

const CVE_SPEC: Spec = {
  procedure: "security.cve-applicability",
  description: "Decide applicability from the OSV answer that landed.",
  input: {},
  slots: { decide: "security.cve-applicability@1", record: "security.osv-query@1" },
  steps: [
    { id: "record", source: "record", contract: OSV, interface: "security.osv-query/v1", provider: "record", request: { logical_source: "osv.query" } },
    { id: "decide", call: "decide", interface: "security.cve-applicability/v1", provider: "decide", input: { answer: "$record.retrieved" } },
    { id: "propose", propose: "$decide.items", result: "$summary" },
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
        artifact_format: "cruxible-line-v7",
        identity: { kind: "Line", name },
        occurrence_epoch: 1,
        procedure: { target: { kind: "Procedure", name: procedure } },
        parameters: {},
        acquisition_policy: null,
        lifecycle: { state: "live", predecessor_digest: null },
        ...extra,
      },
    },
  });

export default [
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
        lineProof("kev-triage", "security.kev-triage", {
          max_authority: "settle",
          trigger_input: "catalog",
          trigger_event: { capture_contract_identity: { kind: "CaptureContract", name: KEV } },
          bindings: { parse: { target: { kind: "Provider", name: "security-analysis-provider/" + "f".repeat(64) } } },
        }),
      ],
    },
  }),
];
