/**
 * The D-R37 Procedure template world (tests and a fixture-backed render),
 * served over the authored world (same coordinate; later fixtures win):
 *
 * - Line `advisory-pages` runs `security.advisory-pages`: read the watched
 *   CVEs, fetch the vendor's advisory pages as a list of Captures, derive a
 *   view narrowed to the watched CVEs (pure), derive the fixes from the view
 *   (pure, a derive chain), extract and write Claims; one ClaimType's value
 *   is a Subject keyed from the record and created if absent (value-side
 *   upsert).
 * - Line `fix-followup` starts on the landing of the derived fixes kind: a
 *   derived-landing Trigger, drawn Line → Line on the Evidence flow.
 * - run-t1: every page kept; Claims written, revised, re-observed, retired,
 *   a Subject created; each item with its identity, change kind and digest.
 * - run-t2: one page dropped (oversized) and the provider's own word that the
 *   list is incomplete (planned call-summary fields `members`,
 *   `incomplete_captures`).
 * - Captures: three list members (restricted kind), the derived view (its
 *   restriction inherited) and the derived fixes, each with its derivation
 *   manifest; a list absence witness citing every member; the Subject page's
 *   contested status Claim cites the derived fixes.
 */
import { defineFixture, type RecordedFixture } from "./fixture";
import { AUTHORED } from "./handlers";
import { AT, COORDINATE, NOW } from "./authored/world";
import { procedureCard, SPECS } from "./authored/definitions";
import {
  captureReadBody,
  claimReadBatchBody,
  getBatchBody,
  getBody,
  headQuery,
  inboxQuery,
  LANDING_TRIGGERS_QUERY,
  LINE_RUNS_PAGE,
  orientQuery,
  queryBody,
  readingsBody,
  reviewBody,
} from "@/api/requests";
import type { paths } from "@/api/generated/schema";
import type { GetResult, Schemas } from "@/api/schemas";

type Spec = Schemas["ProcedureSpec"];
type Member = Schemas["ReviewedMember"];

export const TEMPLATE_LINE = "advisory-pages";
export const TEMPLATE_PROCEDURE = "security.advisory-pages";
export const FOLLOWUP_LINE = "fix-followup";
export const FOLLOWUP_PROCEDURE = "security.fix-followup";
export const PAGE_KIND = "security.advisory-page";
export const VIEW_KIND = "security.advisory-view";
export const FIXES_KIND = "security.advisory-fixes";
export const ADVISORY_KIND = "security.advisory";

const D = (pair: string) => "sha256:" + pair.repeat(32);
export const P1 = D("71");
export const P2 = D("72");
export const P3 = D("73");
export const P4 = D("74");
export const P5 = D("75");
export const VIEW = D("76");
export const FIXES = D("7c");
export const VIEW_2 = D("78");
export const FIXES_2 = D("79");
export const RUN_T1 = "run-t1";
export const RUN_T2 = "run-t2";
export const PROPOSAL_T = D("7a");
export const PROPOSAL_L = D("7b");
const handle = (digest: string) => `CAP-${digest.slice(7, 19)}`;
export const clmT = (n: number) => `CLM-7d${n.toString(16).padStart(30, "0")}`;

const VENDOR = "https://vendor.example/advisories";
const PAGE_URL = (n: number) => `${VENDOR}?page=${n}`;
const KIT_BUILD = "security-kit-provider/" + "5".repeat(64);
const WEB_BUILD = "cruxible-provider-web/" + "a".repeat(64);
const CVE_A = "security.vulnerability/cve-2024-3094";
const CVE_B = "security.vulnerability/cve-2024-6387";
const CVE_C = "security.vulnerability/cve-2023-4863";
const ADVISORY = `${ADVISORY_KIND}/vsa-2026-7`;
const FIXED_IN = "security.vulnerability.fixed_in";
const ADVISORY_CT = "security.vulnerability.advisory";

// -- definitions ----------------------------------------------------------------------

const slot = (input: string, output: string, effect: Schemas["ProcedureSlot"]["effect"]): Schemas["ProcedureSlot"] => ({
  in: { name: input, version: 1 },
  out: { name: output, version: 1 },
  effect,
});
const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });
const param = (name: string) => ({ $ref: "param" as const, path: [name] });

export const TEMPLATE_SPEC: Spec = {
  procedure: TEMPLATE_PROCEDURE,
  description: "Read the vendor's advisory pages, narrow them to the watched CVEs and record the releases that fix each.",
  params: { url: { type: { kind: "string" } }, logical_source: { type: { kind: "string" } } },
  slots: {
    pages: slot("web.fetch.pages.request", "web.fetch.pages.result", "external_read"),
    narrow: slot("security.advisory-narrow.request", "security.advisory-narrow.result", "pure"),
    fixes: slot("security.advisory-fixes.request", "security.advisory-fixes.result", "pure"),
  },
  steps: [
    { read: "watched", query: "security.kev_exposure" },
    { call: "pages", slot: "pages", input: { logical_source: param("logical_source"), url: param("url"), expected_format: "json" }, captures: { pages: PAGE_KIND } },
    { call: "view", slot: "narrow", input: { source: step("pages", "pages"), watched: step("watched", "rows") }, captures: { capture: VIEW_KIND } },
    { call: "fixes", slot: "fixes", input: { source: step("view", "capture") }, captures: { capture: FIXES_KIND } },
    {
      extract: "entries",
      capture: step("fixes", "capture"),
      records: "/fixes/*",
      row: "security.advisory-fix@1",
      key: { cve_id: { at: "cve" } },
      fields: { fixed_in: { at: "fixed" }, advisory: { at: "advisory" } },
    },
    {
      id: "write",
      for_each: step("entries", "records"),
      subject: { kind: "security.vulnerability", key: { cve_id: item("key", "cve_id") }, within: step("watched", "rows") },
      expect: step("watched", "rows"),
      claims: [
        { type: FIXED_IN, value: item("fields", "fixed_in"), when_absent: "mirror" },
        { type: ADVISORY_CT, value: { kind: ADVISORY_KIND, key: { advisory_id: item("fields", "advisory") }, create: "if_absent" } },
      ],
    },
  ],
};

const FOLLOWUP_SPEC: Spec = {
  procedure: FOLLOWUP_PROCEDURE,
  description: "Post each newly fixed CVE for an owner to schedule the upgrade.",
  slots: { read: slot("cruxible.capture.read.request", "security.advisory-fixes.result", "external_read") },
  steps: [
    { call: "fixes", slot: "read", input: {}, captures: { capture: FIXES_KIND } },
    { extract: "rows", capture: step("fixes", "capture"), records: "/fixes/*", row: "security.advisory-fix@1", key: { cve_id: { at: "cve" } }, fields: { fixed_in: { at: "fixed" } } },
    { inbox: "upgrade", for_each: step("rows", "records"), fields: { cve: item("key", "cve_id"), fixed_in: item("fields", "fixed_in") } },
  ],
};

const ALL_SPECS: Spec[] = [...SPECS, FOLLOWUP_SPEC, TEMPLATE_SPEC].sort((a, b) => (a.procedure < b.procedure ? -1 : 1));

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
const batch = (refs: string[], results: GetResult[], detail?: "proof") =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(refs, COORDINATE, detail),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results },
  });

const binding = (build: string, operation: string) => ({ build: { role: "provider", target: { kind: "Provider", name: build } }, operation });

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
        lifecycle: { state: "live", predecessor_digest: null },
        parameters: {},
        ...extra,
      },
    },
  });

const TEMPLATE_PROOF = lineProof(TEMPLATE_LINE, TEMPLATE_PROCEDURE, {
  max_authority: "propose",
  parameters: { url: PAGE_URL(1), logical_source: "vendor.advisories" },
  bindings: { pages: binding(WEB_BUILD, "web.fetch.pages"), narrow: binding(KIT_BUILD, "advisory.narrow"), fixes: binding(KIT_BUILD, "advisory.fixes") },
});
const FOLLOWUP_PROOF = lineProof(FOLLOWUP_LINE, FOLLOWUP_PROCEDURE, {
  max_authority: "observe",
  trigger_input: "fixes",
  trigger_event: { capture_contract_identity: { kind: "CaptureContract", name: FIXES_KIND } },
  bindings: { read: binding(KIT_BUILD, "capture.read") },
});

const runRow = (run: string, status: Schemas["RunRow"]["status"], startedAt: string): Schemas["RunRow"] => ({
  run,
  procedure: `Procedure:${TEMPLATE_PROCEDURE}`,
  status,
  started_at: startedAt,
  line: `Line:${TEMPLATE_LINE}`,
  nodes_done: 6,
});

const TEMPLATE_CARD: Schemas["GetLineCard"] = {
  line: TEMPLATE_LINE,
  identity_digest: "sha256:" + "6a".repeat(32),
  lifecycle: "live",
  procedure: `Procedure:${TEMPLATE_PROCEDURE}`,
  authority: "propose",
  trigger: "cadence",
  triggers: [{ trigger: "Trigger:security.advisory-hourly", version: 1, fires: "every 6 hours at :15" }],
  triggers_total: 1,
  occurrence_epoch: 1,
  recent_runs: [runRow(RUN_T2, "succeeded", "2026-10-19T06:15:02Z"), runRow(RUN_T1, "succeeded", "2026-10-19T00:15:02Z")],
  runs_total: 2,
};
const FOLLOWUP_CARD: Schemas["GetLineCard"] = {
  line: FOLLOWUP_LINE,
  identity_digest: "sha256:" + "6b".repeat(32),
  lifecycle: "live",
  procedure: `Procedure:${FOLLOWUP_PROCEDURE}`,
  authority: "observe",
  trigger: "capture_landing",
  occurrence_epoch: 1,
  recent_runs: [],
  runs_total: 0,
};

/** An authored fixture with its response changed: the same request, so this one wins. */
function patched<P extends keyof paths, M extends "get" | "post">(
  spec: Omit<Parameters<typeof defineFixture<P, M>>[0], "response">,
  mutate: (response: never) => unknown,
): RecordedFixture {
  const probe = defineFixture({ ...spec, response: {} as never } as Parameters<typeof defineFixture<P, M>>[0]);
  const base = AUTHORED.find((f) => f.key === probe.key);
  if (!base) throw new Error(`template world: no authored fixture for ${probe.key}`);
  return { ...base, response: mutate(structuredClone(base.response) as never) };
}

const orientSection = (section: "procedures" | "lines" | "capture_contracts") => ({
  method: "get" as const,
  path: "/api/v1/{instance_id}/orient" as const,
  query: orientQuery({ coordinate: COORDINATE, section, limit: 500 }),
});

type OrientResponse = Schemas["OrientResult"];

const DEFINITIONS: RecordedFixture[] = [
  patched(orientSection("procedures"), (r: OrientResponse) => ({
    ...r,
    procedures: ALL_SPECS.map((spec) => ({ name: spec.procedure, lifecycle: "live" as const, runnable: (r.procedures ?? []).find((p) => p.name === spec.procedure)?.runnable ?? "line" })),
  })),
  batch(
    ALL_SPECS.map((spec) => `Procedure:${spec.procedure}`),
    ALL_SPECS.map((spec) => result(`Procedure:${spec.procedure}`, "procedure", { card: { ...procedureCard(spec), runnable: [TEMPLATE_PROCEDURE, FOLLOWUP_PROCEDURE].includes(spec.procedure) ? "line" : procedureCard(spec).runnable } })),
  ),
  patched(orientSection("lines"), (r: OrientResponse) => ({
    ...r,
    lines: [
      ...(r.lines ?? []),
      { line: `Line:${TEMPLATE_LINE}`, lifecycle: "live", procedure: `Procedure:${TEMPLATE_PROCEDURE}`, authority: "propose", trigger: "cadence", enablement: "running", due: 0, waiting: 1 },
      { line: `Line:${FOLLOWUP_LINE}`, lifecycle: "live", procedure: `Procedure:${FOLLOWUP_PROCEDURE}`, authority: "observe", trigger: "capture_landing", enablement: "running", due: 0, waiting: 0 },
    ].sort((a, b) => (a.line < b.line ? -1 : 1)),
  })),
  patched(orientSection("capture_contracts"), (r: OrientResponse) => ({
    ...r,
    capture_contracts: [
      ...(r.capture_contracts ?? []),
      { contract: `CaptureContract:${PAGE_KIND}`, version: 1, lifecycle: "live", grade: "observed", admitted_by: 0 },
      { contract: `CaptureContract:${VIEW_KIND}`, version: 1, lifecycle: "live", grade: "derived", admitted_by: 0 },
      { contract: `CaptureContract:${FIXES_KIND}`, version: 1, lifecycle: "live", grade: "derived", admitted_by: 2 },
    ],
  })),
  patched({ method: "post", path: "/api/v1/{instance_id}/query", body: queryBody(LANDING_TRIGGERS_QUERY, COORDINATE) }, (r: Schemas["QueryResultRecord"]) => ({
    ...r,
    rows: [
      ...r.rows,
      { name: "security.fixes-landed", schedule: "capture_landing", target: `Line:${FOLLOWUP_LINE}`, capture_contract: `CaptureContract:${FIXES_KIND}`, logical_sources: [] },
    ],
  })),
]

// The Line cards and envelopes, in lines-section order (advisory-pages, cve-applicability, fix-followup, kev-triage).
const LINE_ORDER = [TEMPLATE_LINE, "cve-applicability", FOLLOWUP_LINE, "kev-triage"];
const authoredResult = (refs: string[], detail: "proof" | undefined, ref: string): GetResult => {
  const probe = batch(refs, [], detail);
  const base = AUTHORED.find((f) => f.key === probe.key);
  const found = (base?.response as { results?: GetResult[] } | undefined)?.results?.find((r) => r.ref === ref);
  if (!found) throw new Error(`template world: no authored ${ref}`);
  return found;
};
const AUTHORED_LINES = ["Line:cve-applicability", "Line:kev-triage"];
const lineCard = (name: string): GetResult =>
  name === TEMPLATE_LINE
    ? result(`Line:${name}`, "line", { card: TEMPLATE_CARD })
    : name === FOLLOWUP_LINE
      ? result(`Line:${name}`, "line", { card: FOLLOWUP_CARD })
      : authoredResult(AUTHORED_LINES, undefined, `Line:${name}`);
const lineProofOf = (name: string): GetResult =>
  name === TEMPLATE_LINE ? TEMPLATE_PROOF : name === FOLLOWUP_LINE ? FOLLOWUP_PROOF : authoredResult(AUTHORED_LINES, "proof", `Line:${name}`);

const LINES: RecordedFixture[] = [
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/procedures/{name}/readings",
    pathParams: { name: TEMPLATE_PROCEDURE },
    body: readingsBody(COORDINATE, 50),
    response: {
      tag: "playbill-procedure-readings-result-v1",
      procedure_identity: { kind: "Procedure", name: TEMPLATE_PROCEDURE },
      procedure_artifact_digest: "sha256:" + "6c".repeat(32),
      activation_coordinate: COORDINATE,
      observation_coordinate: COORDINATE,
      observation_time: NOW,
      contracts: [],
      readings: [],
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/inbox",
    query: inboxQuery(TEMPLATE_LINE, undefined, 50),
    response: { tag: "cruxible-inbox-list-v1", line_filter: TEMPLATE_LINE, entries: [] },
  }),
  batch(LINE_ORDER.map((l) => `Line:${l}`), LINE_ORDER.map(lineCard)),
  batch(LINE_ORDER.map((l) => `Line:${l}`), LINE_ORDER.map(lineProofOf), "proof"),
  batch([`Line:${TEMPLATE_LINE}`], [lineCard(TEMPLATE_LINE)]),
  batch([`Line:${FOLLOWUP_LINE}`], [lineCard(FOLLOWUP_LINE)]),
  defineFixture({ method: "post", path: "/api/v1/{instance_id}/get", body: getBody({ ref: `Line:${TEMPLATE_LINE}`, coordinate: COORDINATE, detail: "proof" }), response: TEMPLATE_PROOF }),
  defineFixture({ method: "post", path: "/api/v1/{instance_id}/get", body: getBody({ ref: `Line:${FOLLOWUP_LINE}`, coordinate: COORDINATE, detail: "proof" }), response: FOLLOWUP_PROOF }),
  batch([`Procedure:${TEMPLATE_PROCEDURE}`], [result(`Procedure:${TEMPLATE_PROCEDURE}`, "procedure", { card: { ...procedureCard(TEMPLATE_SPEC), runnable: "line" } })]),
  batch([`Procedure:${FOLLOWUP_PROCEDURE}`], [result(`Procedure:${FOLLOWUP_PROCEDURE}`, "procedure", { card: { ...procedureCard(FOLLOWUP_SPEC), runnable: "line" } })]),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: `Line:${TEMPLATE_LINE}`, coordinate: COORDINATE, detail: "runs", limit: LINE_RUNS_PAGE }),
    response: {
      ...result(`Line:${TEMPLATE_LINE}`, "line", { card: TEMPLATE_CARD, detail: "runs" }),
      runs: { kind: "line_runs", line: TEMPLATE_LINE, runs: TEMPLATE_CARD.recent_runs! },
    },
  }),
  batch(["Trigger:security.advisory-hourly"], [result("Trigger:security.advisory-hourly", "trigger", { card: { trigger: "Trigger:security.advisory-hourly", lifecycle: "live", schedule: { kind: "cron", cron: "15 */6 * * *" }, target: `Line:${TEMPLATE_LINE}` } })]),
  // The slots' out Contracts: the pages fetch returns a list of Captures.
  batch(
    ["Contract:security.advisory-fixes.result@1", "Contract:security.advisory-narrow.result@1", "Contract:web.fetch.pages.result@1"],
    [
      result("Contract:security.advisory-fixes.result@1", "contract", { card: { contract: "security.advisory-fixes.result", version: 1, fields: [{ name: "capture", type: "capture<*>" }] } }),
      result("Contract:security.advisory-narrow.result@1", "contract", { card: { contract: "security.advisory-narrow.result", version: 1, fields: [{ name: "capture", type: "capture<*>" }] } }),
      result("Contract:web.fetch.pages.result@1", "contract", {
        card: { contract: "web.fetch.pages.result", version: 1, fields: [{ name: "pages", type: "list<capture<*>>{max_items: 20}" }, { name: "next_url", type: "string", optional: true }] },
      }),
    ],
  ),
];

// -- runs -----------------------------------------------------------------------------

const member = (index: number, capture: string | null, status: "kept" | "dropped", reason?: string) => ({
  index,
  capture_digest: capture,
  request_url: PAGE_URL(index + 1),
  status,
  ...(reason ? { reason } : {}),
});

/** A call summary with the planned list fields (members, incomplete_captures). */
const listSummary = (members: ReturnType<typeof member>[], incomplete: string[] = []) =>
  ({
    kind: "call",
    captures: members.filter((m) => m.capture_digest).length,
    capture_digests: members.flatMap((m) => (m.capture_digest ? [m.capture_digest] : [])),
    members,
    ...(incomplete.length ? { incomplete_captures: incomplete } : {}),
  }) as Schemas["CallRunSummary"];

const child = (index: number, path: string, change: NonNullable<Schemas["ProcedureTerminalEgressChild"]["change_kind"]>): Schemas["ProcedureTerminalEgressChild"] => ({
  child_index: index,
  item_key: `write/${index}`,
  manifest_digest: D((0x30 + index).toString(16)),
  path,
  unchanged: change === "reobservation",
  item_identity_digest: D((0x40 + index).toString(16)),
  change_kind: change,
  change_digest: D((0x50 + index).toString(16)),
});

const claimPath = (id: string) => `claims/${id.slice(4, 6)}/${id}.json`;

export const RUN_T1_CARD: Schemas["GetProcedureRunCard"] = {
  run: RUN_T1,
  procedure: `Procedure:${TEMPLATE_PROCEDURE}`,
  status: "succeeded",
  nodes_done: 6,
  nodes_total: 6,
  started_at: "2026-10-19T00:15:02Z",
  elapsed_us: 3_200_000,
  elapsed_basis: "measured_wall_clock",
  triggered_by: { line: `Line:${TEMPLATE_LINE}`, occurrence: "occ-2026-10-19T00", enablement: "enb-t", principal_kind: "runtime_credential", enabled_by_withheld: true },
  nodes: [
    { node: "watched", kind: "read", verdict: "ok", sequence: 1, duration_us: 30_000, summary: { kind: "read", rows: 3 } },
    { node: "pages", kind: "call", verdict: "ok", sequence: 2, duration_us: 2_100_000, summary: listSummary([member(0, P1, "kept"), member(1, P2, "kept"), member(2, P3, "kept")]) },
    { node: "view", kind: "call", verdict: "ok", sequence: 3, duration_us: 400_000, summary: { kind: "call", captures: 1, capture_digests: [VIEW] } },
    { node: "fixes", kind: "call", verdict: "ok", sequence: 4, duration_us: 300_000, summary: { kind: "call", captures: 1, capture_digests: [FIXES] } },
    { node: "entries", kind: "extract", verdict: "ok", sequence: 5, duration_us: 20_000, summary: { kind: "extract", records: 3, invalid_records: 0, duplicates: 0, invalid_fields: 0, complete: true } },
    {
      node: "write",
      kind: "claims",
      verdict: "ok",
      sequence: 6,
      duration_us: 90_000,
      summary: { kind: "claims", written: 2, revised: 1, inverse_written: 0, subjects_created: 1, re_observed: 1, no_op: 0, retired: 1, surfaced: 0, downgraded: 0, delivery: "proposed" },
    },
  ],
  terminal_egress: [
    {
      node_id: "write",
      kind: "claims",
      verdict: "delivered",
      required_authority: "propose",
      effective_authority: "propose",
      proposal_id: PROPOSAL_T,
      settle_outcome: "proposed",
      children: [
        child(0, claimPath(clmT(1)), "claim"),
        child(1, claimPath(clmT(2)), "claim"),
        child(2, `subjects/${ADVISORY}.json`, "subject"),
        child(3, claimPath(clmT(5)), "claim"),
        child(4, claimPath(clmT(3)), "reobservation"),
        child(5, claimPath(clmT(4)), "retirement"),
      ],
    },
  ],
};

export const RUN_T2_CARD: Schemas["GetProcedureRunCard"] = {
  run: RUN_T2,
  procedure: `Procedure:${TEMPLATE_PROCEDURE}`,
  status: "succeeded",
  nodes_done: 6,
  nodes_total: 6,
  started_at: "2026-10-19T06:15:02Z",
  elapsed_us: 2_900_000,
  elapsed_basis: "measured_wall_clock",
  triggered_by: { line: `Line:${TEMPLATE_LINE}`, occurrence: "occ-2026-10-19T06", enablement: "enb-t", principal_kind: "runtime_credential", enabled_by_withheld: true },
  nodes: [
    { node: "watched", kind: "read", verdict: "ok", sequence: 1, duration_us: 30_000, summary: { kind: "read", rows: 3 } },
    {
      node: "pages",
      kind: "call",
      verdict: "ok",
      sequence: 2,
      duration_us: 2_000_000,
      summary: listSummary([member(0, P4, "kept"), member(1, null, "dropped", "oversized"), member(2, P5, "kept")], ["pages"]),
    },
    { node: "view", kind: "call", verdict: "ok", sequence: 3, duration_us: 350_000, summary: { kind: "call", captures: 1, capture_digests: [VIEW_2] } },
    { node: "fixes", kind: "call", verdict: "ok", sequence: 4, duration_us: 300_000, summary: { kind: "call", captures: 1, capture_digests: [FIXES_2] } },
    { node: "entries", kind: "extract", verdict: "ok", sequence: 5, duration_us: 20_000, summary: { kind: "extract", records: 2, invalid_records: 0, duplicates: 0, invalid_fields: 0, complete: false } },
    {
      node: "write",
      kind: "claims",
      verdict: "ok",
      sequence: 6,
      duration_us: 60_000,
      summary: { kind: "claims", written: 0, revised: 0, inverse_written: 0, subjects_created: 0, re_observed: 2, no_op: 0, retired: 0, surfaced: 0, downgraded: 0, delivery: "unchanged" },
    },
  ],
  completeness: { complete: false, reasons: [{ node: "pages", kind: "incomplete_input", inputs: ["pages"] }] },
  terminal_egress: [
    {
      node_id: "write",
      kind: "claims",
      verdict: "delivered",
      required_authority: "propose",
      effective_authority: "propose",
      settle_outcome: null,
      children: [child(0, claimPath(clmT(2)), "reobservation"), child(1, claimPath(clmT(1)), "reobservation")],
    },
  ],
};

const runState = (run: string, observations: { node: string; digest: string }[], bound: Schemas["AcceptedCoordinate"] = COORDINATE) =>
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/procedure-runs/{run_id}",
    pathParams: { run_id: run },
    response: {
      tag: "playbill-procedure-run-state-v2",
      run_id: run,
      procedure_identity: { kind: "Procedure", name: TEMPLATE_PROCEDURE },
      procedure_artifact_digest: "sha256:" + "6c".repeat(32),
      bound_coordinate: bound,
      head_at_admission: bound,
      lane: "current",
      evaluation_time: "2026-10-19T00:15:02Z",
      status: "succeeded",
      pending_inputs: [],
      outcomes: [],
      next_operation: {},
      children: [],
      source_observations: observations.map((o, i) => ({ occurrence_path: `captures/${o.digest.slice(7, 9)}/${i}.json`, node_id: o.node, input_name: o.node, capture_digest: o.digest })),
      terminal_egress: [],
    },
  });

const RUNS: RecordedFixture[] = [
  batch([`ProcedureRun:${RUN_T1}`], [result(`ProcedureRun:${RUN_T1}`, "procedure_run", { card: RUN_T1_CARD })]),
  batch([`ProcedureRun:${RUN_T2}`], [result(`ProcedureRun:${RUN_T2}`, "procedure_run", { card: RUN_T2_CARD })]),
  batch(
    [`ProcedureRun:${RUN_T2}`, `ProcedureRun:${RUN_T1}`],
    [result(`ProcedureRun:${RUN_T2}`, "procedure_run", { card: RUN_T2_CARD }), result(`ProcedureRun:${RUN_T1}`, "procedure_run", { card: RUN_T1_CARD })],
  ),
  runState(RUN_T1, [
    { node: "pages", digest: P1 },
    { node: "pages", digest: P2 },
    { node: "pages", digest: P3 },
  ]),
  runState(RUN_T2, [
    { node: "pages", digest: P4 },
    { node: "pages", digest: P5 },
  ]),
];

// -- Captures ---------------------------------------------------------------------------

const reducer = (op: string): Schemas["GetCaptureReducer"] => ({
  digest: D(`9${op}`),
  provider_build: D("5b"),
  operation_signature: D(`8${op}`),
  implementation: D("5d"),
  input_template: D(`6${op}`),
});

interface CaptureSpec {
  digest: string;
  kind: string;
  source: string | null;
  observed: string;
  size: number;
  access: "restricted" | "instance";
  derivation?: Schemas["GetCaptureDerivation"];
  citing?: string[];
}

const PAGES_OBSERVED = "2026-10-19T00:15:04Z";
const CAPTURES: CaptureSpec[] = [
  { digest: P1, kind: PAGE_KIND, source: "vendor.advisories", observed: PAGES_OBSERVED, size: 18_204, access: "restricted" },
  { digest: P2, kind: PAGE_KIND, source: "vendor.advisories", observed: PAGES_OBSERVED, size: 17_930, access: "restricted" },
  { digest: P3, kind: PAGE_KIND, source: "vendor.advisories", observed: PAGES_OBSERVED, size: 6_112, access: "restricted" },
  {
    digest: VIEW,
    kind: VIEW_KIND,
    source: null,
    observed: "2026-10-19T00:15:05Z",
    size: 1_402,
    access: "restricted",
    derivation: { sources: [P1, P2, P3], reads: [D("5e")], reducer: reducer("a") },
  },
  {
    digest: FIXES,
    kind: FIXES_KIND,
    source: null,
    observed: "2026-10-19T00:15:05Z",
    size: 388,
    access: "instance",
    derivation: { sources: [VIEW], reads: [], reducer: reducer("b") },
    citing: [clmT(1), clmT(2)],
  },
];

const captureCard = (c: CaptureSpec): Schemas["GetCaptureCard"] => ({
  capture: handle(c.digest),
  digest: c.digest,
  contract: `CaptureContract:${c.kind}`,
  version: 1,
  source: c.source,
  observed_at: c.observed,
  size: c.size,
  access: c.access,
  status: "available",
  ...(c.derivation ? { derivation: c.derivation } : {}),
  subjects: c.citing ? [CVE_A, CVE_B] : [],
  citing: c.citing ?? [],
  citing_total: c.citing?.length ?? 0,
});
const captureResult = (c: CaptureSpec) => result(`Capture:${c.digest}`, "capture", { card: captureCard(c) });
const byDigest = new Map(CAPTURES.map((c) => [c.digest, c] as const));

const envelope = (c: CaptureSpec, url: string | null, run = RUN_T1): Schemas["CaptureEnvelope"] => ({
  tag: "playbill-capture-envelope-v2",
  capture_contract_digest: D("2c"),
  source: url
    ? {
        tag: "playbill-external-source-reference-v1",
        kind: "external",
        source_identity: c.source ?? "",
        producer_binding_digest: D("3c"),
        coordinate_type: "http-response-v1",
        coordinate: { url, final_url: url, status: 200, content_type: "application/json" },
        selector_type: "whole-response-v1",
        selector: {},
        replayability: "attested_only",
      }
    : { tag: "playbill-cas-source-reference-v1", kind: "cas", content_digest: c.digest },
  commitment: { tag: "playbill-evidence-commitment-v1", digest_kind: "exact_bytes", digest: c.digest, byte_length: c.size, materialization: "cas" },
  run_coordinate: {
    tag: "playbill-capture-run-coordinate-v2",
    run_kind: "procedure",
    run_id: run,
    bound_generation: D("5c"),
    executable_identity: { kind: "Procedure", name: TEMPLATE_PROCEDURE },
    executable_digest: D("6c"),
  },
  producer_receipt_digest: D("7e"),
  producer: { kind: "Procedure", name: TEMPLATE_PROCEDURE },
  producer_binding_digest: D("3c"),
  observed_at: c.observed,
  ...(c.derivation ? { reducer_digest: c.derivation.reducer?.digest ?? null, input_receipt_set_manifest_digest: D("4e") } : {}),
  production_evidence: { tag: "playbill-capture-procedure-egress-evidence-v1", procedure_producer_receipt_digest: D("7e") },
});

const BODIES: Record<string, string> = {
  [P1]: JSON.stringify({ page: 1, advisories: [{ id: "VSA-2026-7", cves: ["CVE-2024-3094", "CVE-2024-6387"] }] }),
  [P2]: JSON.stringify({ page: 2, advisories: [{ id: "VSA-2026-5", cves: ["CVE-2023-38545"] }] }),
  [P3]: JSON.stringify({ page: 3, advisories: [] }),
  [VIEW]: "advisory,cve\nVSA-2026-7,CVE-2024-3094\nVSA-2026-7,CVE-2024-6387\n",
  [FIXES]: JSON.stringify({ fixes: [{ cve: "CVE-2024-3094", fixed: "5.6.2", advisory: "vsa-2026-7" }, { cve: "CVE-2024-6387", fixed: "9.8p1", advisory: "vsa-2026-7" }] }),
};

const read = (c: CaptureSpec, url: string | null, run = RUN_T1) => {
  const body = BODIES[c.digest] ?? "{}";
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/captures/read",
    body: captureReadBody(handle(c.digest), COORDINATE),
    response: {
      tag: "playbill-capture-read-v1",
      capture_digest: c.digest,
      coordinate: COORDINATE,
      status: "verified",
      envelope: envelope(c, url, run),
      material: {
        tag: "playbill-source-dereference-result-v1",
        source_handle_digest: D("1c"),
        status: "verified",
        commitment_verified: true,
        material_kind: "bytes",
        body_access: { tag: "playbill-body-access-result-v1", status: "available", byte_length: body.length, body_base64: btoa(body) },
        coverage: { tag: "playbill-coverage-descriptor-v1", requested_facets: ["source_material"], available_facets: ["source_material"], omitted_for_access: [], truncated_facets: [], reason_codes: [] },
      },
    },
  });
};

/** One get-batch per way the console asks: the Capture page by handle, a chain level and the proposal page by `Capture:<digest>`. */
const CAPTURE_READS: RecordedFixture[] = [
  ...CAPTURES.map((c) => batch([handle(c.digest)], [captureResult(c)])),
  ...CAPTURES.map((c) => batch([`Capture:${c.digest}`], [captureResult(c)])),
  batch([P1, P2, P3].map((d) => `Capture:${d}`), [P1, P2, P3].map((d) => captureResult(byDigest.get(d)!))),
  read(byDigest.get(P1)!, PAGE_URL(1)),
  read(byDigest.get(P2)!, PAGE_URL(2)),
  read(byDigest.get(P3)!, PAGE_URL(3)),
  read(byDigest.get(VIEW)!, null),
  read(byDigest.get(FIXES)!, null),
];

// -- the CaptureKind page: the derived fixes kind -------------------------------------------

const FIXES_CARD: Schemas["GetCaptureContractCard"] = {
  contract: `CaptureContract:${FIXES_KIND}`,
  version: 1,
  lifecycle: "live",
  captures: { grade: "derived", source_kinds: ["cas"] },
  admitted_by: [FIXED_IN, ADVISORY_CT],
};

const kindProof = (name: string, grade: string, decoding: Record<string, unknown>, access: "open" | "restricted"): GetResult =>
  result(`CaptureContract:${name}`, "capture_contract", {
    detail: "proof",
    proof: {
      coordinate: COORDINATE,
      path: `capture-contracts/${name}.json`,
      artifact_digest: D("8c"),
      envelope: {
        artifact_format: "cruxible-capture-contract-v3",
        identity: { kind: "CaptureContract", name },
        shape: "procedure_output",
        replay: "exact",
        components: { provenance_rule: { target: { kind: "Contract", name: "playbill.procedure.derived-v1" } } },
        selection_budget: { tag: "playbill-capture-selection-budget-v1", max_bytes: 1048576, max_rows: 1, max_items: 1 },
        retention_erasure_policy: { body_retention: "required_for_duration", minimum_retention: { tag: "playbill-duration-v1", microseconds: 2592000000000 }, erasure: "prohibited", erasure_rule: null, selector_privacy: "direct_allowed" },
        epistemic_grade: grade,
        decoding,
        body_access: access,
        lifecycle: { state: "live", predecessor_digest: null },
      },
    },
  });

const ORIENT_BASE = {
  tag: "playbill-orient-v1" as const,
  instance: "inst_fixture",
  coordinate: COORDINATE,
  generation: AT.generation,
  accepted_at: "2026-10-19T09:30:00Z",
  evaluation_time: NOW,
};

const KIND_PAGE: RecordedFixture[] = [
  // The Captures section: the template's derived fixes and its sources.
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "captures", limit: 500 }),
    response: {
      ...ORIENT_BASE,
      section: "captures",
      captures: CAPTURES.map((c) => ({ capture: handle(c.digest), contract: `CaptureContract:${c.kind}`, observed_at: c.observed, citing: c.citing?.length ?? 0 })),
    },
  }),
  batch([`CaptureContract:${FIXES_KIND}`], [result(`CaptureContract:${FIXES_KIND}`, "capture_contract", { card: FIXES_CARD })]),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: `CaptureContract:${FIXES_KIND}`, coordinate: COORDINATE, detail: "proof" }),
    response: kindProof(FIXES_KIND, "derived", { format: "json", encoding: "identity", limits: { decoded_bytes: 1048576, depth: 16, records: 10000 } }, "open"),
  }),
];

// -- proposals ------------------------------------------------------------------------------

const subjectAddress = (ref: string) => ({ artifact_path: `subjects/${ref}.json`, selector: { scheme: "artifact-v1", value: "" }, tag: "playbill-semantic-address-v1" });
const literal = (value: unknown) => ({ kind: "literal", value });

function claimArtifact(
  id: string,
  subject: string,
  predicate: string,
  object: unknown,
  evidence: { capture: string; record: string; field: string; absence?: { capture: string; members: string[] } },
  state: "live" | "retired" = "live",
): Record<string, unknown> {
  return {
    artifact_format: "playbill-claim-v4",
    identity: { kind: "Claim", name: id },
    lifecycle: { predecessor_digest: null, state },
    statement: { predicate, claim_type: { kind: "ClaimType", name: predicate }, subject: subjectAddress(subject), object, role: "observation" },
    backing: {
      capture_digests: evidence.absence?.members ?? [evidence.capture],
      citations: (evidence.absence?.members ?? [evidence.capture]).map((d) => ({ capture_digest: d, citation_id: D("0c"), origin: "independent", role: "evidence" })),
      procedure_evidence: {
        law: "claim-evidence-v2",
        node_id: "write",
        template: 0,
        procedure_digest: D("6c"),
        value: { basis: evidence.absence ? "absence" : "extracted", capture_digest: evidence.capture, field_path: evidence.field, record_key: { cve_id: evidence.record }, record_locator: "/fixes/0" },
        ...(evidence.absence
          ? {
              absence: {
                run_id: RUN_T1,
                procedure_digest: D("6c"),
                node_id: "rows",
                capture: evidence.absence.capture,
                members: evidence.absence.members,
                extract_spec: D("1e"),
                extractor: "cruxible.extract.json-v1",
                logical_source: "vendor.advisories",
                enumerated_key_digest: D("2e"),
                expect_coordinate: COORDINATE,
              },
            }
          : {}),
      },
      referent_context: { observed_at: "2026-10-19T00:15:05Z" },
    },
  };
}

function reviewMember(path: string, kind: string, disposition: string, base: Record<string, unknown> | null, candidate: Record<string, unknown> | null): Member {
  return {
    path,
    artifact_kind: kind,
    disposition,
    closure_role: "authored",
    predecessor_artifact_digest: base ? D("1d") : null,
    candidate_artifact_digest: candidate ? D("2d") : null,
    base_semantic_artifact: base,
    candidate_semantic_artifact: candidate,
    semantic_delta: [],
    law_identifier: "playbill.claim.v4",
    law_digest: D("9d"),
    law_evidence: {},
    dependency_proof_refs: [],
  };
}

const fixEvidence = (record: string, i: number) => ({ capture: FIXES, record, field: `/fixes/${i}/fixed` });
const advisoryObject = { kind: "subject", address: subjectAddress(ADVISORY) };

export const TEMPLATE_MEMBERS: Member[] = [
  reviewMember(claimPath(clmT(1)), "claim", "create", null, claimArtifact(clmT(1), CVE_A, FIXED_IN, literal("5.6.2"), fixEvidence("CVE-2024-3094", 0))),
  reviewMember(
    claimPath(clmT(2)),
    "claim",
    "replace",
    claimArtifact(clmT(2), CVE_B, FIXED_IN, literal("9.7p1"), fixEvidence("CVE-2024-6387", 1)),
    claimArtifact(clmT(2), CVE_B, FIXED_IN, literal("9.8p1"), fixEvidence("CVE-2024-6387", 1)),
  ),
  reviewMember(`subjects/${ADVISORY}.json`, "subject", "create", null, {
    artifact_format: "playbill-subject-v1",
    identity: { kind: "Subject", name: ADVISORY },
    lifecycle: { predecessor_digest: null, state: "live" },
    subject_kind: ADVISORY_KIND,
    subject_id: "vsa-2026-7",
  }),
  reviewMember(claimPath(clmT(5)), "claim", "create", null, claimArtifact(clmT(5), CVE_B, ADVISORY_CT, advisoryObject, { capture: FIXES, record: "CVE-2024-6387", field: "/fixes/1/advisory" })),
  reviewMember(
    claimPath(clmT(4)),
    "claim",
    "retire",
    claimArtifact(clmT(4), CVE_C, FIXED_IN, literal("1.3.2"), { capture: FIXES, record: "CVE-2023-4863", field: "/fixes/2/fixed" }),
    claimArtifact(clmT(4), CVE_C, FIXED_IN, literal("1.3.2"), { capture: FIXES, record: "CVE-2023-4863", field: "/fixes/2/fixed" }, "retired"),
  ),
];

/** A retirement by absence over the list of pages: its witness cites every member (D-R37 a6). */
export const LIST_ABSENCE_MEMBER: Member = reviewMember(
  claimPath(clmT(6)),
  "claim",
  "retire",
  claimArtifact(clmT(6), CVE_C, ADVISORY_CT, advisoryObject, { capture: P1, record: "CVE-2023-4863", field: "/advisories/0/cves", absence: { capture: P1, members: [P1, P2, P3] } }),
  claimArtifact(clmT(6), CVE_C, ADVISORY_CT, advisoryObject, { capture: P1, record: "CVE-2023-4863", field: "/advisories/0/cves", absence: { capture: P1, members: [P1, P2, P3] } }, "retired"),
);

function review(id: string, members: Member[], rationale: string): Schemas["ProposalReview"] {
  return {
    tag: "playbill-proposal-review-v1",
    coordinate_kind: "provisional",
    proposal_id: id,
    candidate: {},
    candidate_digest: D("3d"),
    parent_semantic_root: D("4d"),
    settlement_base: COORDINATE,
    base_oid: COORDINATE.git_oid,
    complete_members: [],
    members,
    governance: { activation_policy: "snapshot", approval_requirements: [{ role: "security-lead", minimum_distinct_signers: 1 }], required_tier: "governed_write" },
    provenance: { actor_id: "advisory-runner" },
    attestation_coverage: { attestations: [] },
    documents: [],
    redactions: [],
    rationale,
  };
}

const proposalCard = (id: string, rationale: string): GetResult =>
  result(`Proposal:${id}`, "proposal", {
    card: {
      proposal: id,
      status: "open",
      verdict: "candidate",
      actor: "advisory-runner",
      admitted_at: "2026-10-19T00:15:06Z",
      rationale,
      originating_line: { identity: { kind: "Line", name: TEMPLATE_LINE }, artifact_digest: D("9e") },
    },
  });

const T_WORDS = `Proposed by Procedure ${TEMPLATE_PROCEDURE} run ${RUN_T1} terminal write\n\n6 items; each item's reason is recorded with the Claim or Subject it explains.`;
const L_WORDS = "Retire advisory links the vendor's complete advisory listing no longer names.";

/** The re-observed Claim the run page reads from state (no proposal member carries it). */
const REOBSERVED: Schemas["ClaimViewRecord"] = {
  tag: "playbill-claim-read-v2",
  coordinate_kind: "canonical",
  coordinate: COORDINATE,
  envelope: { identity: `Claim:${clmT(3)}`, path: claimPath(clmT(3)) },
  facts: [],
  admission_evaluation_time: NOW,
  admission_accounts: [],
  statement: {
    subject: { artifact_path: `subjects/${CVE_A}.json`, selector: { scheme: "subject", value: CVE_A } },
    predicate: ADVISORY_CT,
    object: { kind: "subject", address: { artifact_path: `subjects/${ADVISORY}.json`, selector: { scheme: "subject", value: ADVISORY } } },
    role: "observation",
    lifecycle: "live",
  },
};

const PROPOSALS: RecordedFixture[] = [
  batch([PROPOSAL_T], [proposalCard(PROPOSAL_T, T_WORDS)]),
  defineFixture({ method: "post", path: "/api/v1/{instance_id}/proposals/{proposal_id}/review", pathParams: { proposal_id: PROPOSAL_T }, body: reviewBody(), response: review(PROPOSAL_T, TEMPLATE_MEMBERS, T_WORDS) }),
  batch([PROPOSAL_L], [proposalCard(PROPOSAL_L, L_WORDS)]),
  defineFixture({ method: "post", path: "/api/v1/{instance_id}/proposals/{proposal_id}/review", pathParams: { proposal_id: PROPOSAL_L }, body: reviewBody(), response: review(PROPOSAL_L, [LIST_ABSENCE_MEMBER], L_WORDS) }),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/claims/read-batch",
    body: claimReadBatchBody([clmT(3)], COORDINATE),
    response: { tag: "playbill-claim-read-batch-v1", coordinate: COORDINATE, claims: [REOBSERVED] },
  }),
];

// -- the Subject page: the contested status Claim cites the derived fixes ------------------

const CONTESTED = `CLM-${(0xa2).toString(16).padStart(32, "0")}`;
const ASSESSMENT = "security.assessment/rel-1-cve-2024-3094";

const SUBJECT_PAGE: RecordedFixture[] = [
  patched({ method: "post", path: "/api/v1/{instance_id}/get", body: getBody({ ref: CONTESTED, coordinate: COORDINATE, detail: "evidence" }) }, (r: GetResult) => ({
    ...r,
    evidence: {
      ...r.evidence!,
      captures: [
        { capture: handle(FIXES), contract: `CaptureContract:${FIXES_KIND}`, version: 1, source: "vendor.advisories", observed_at: "2026-10-19T00:15:05Z", role: "evidence", origin: "independent", status: "admitted" },
      ],
    },
  })),
  // The Subject page's claims/read-batch: the contested Claim's stored backing names the fixes Capture, its record and field.
  ...AUTHORED.filter((f) => f.path === "/api/v1/{instance_id}/claims/read-batch" && JSON.stringify(f.response).includes(CONTESTED)).map((f) => {
    const response = structuredClone(f.response) as Schemas["ClaimReadBatchResult"];
    for (const view of response.claims) {
      if (view.envelope.identity !== `Claim:${CONTESTED}`) continue;
      view.envelope = { ...view.envelope, ...claimArtifact(CONTESTED, ASSESSMENT, "security.assessment.status", literal("affected"), { capture: FIXES, record: "CVE-2024-3094", field: "/fixes/0/status" }) };
    }
    return { ...f, response };
  }),
  batch([handle(FIXES)], [captureResult(byDigest.get(FIXES)!)]),
];

// -- a run re-observed a Claim a later generation revised --------------------------------

/** g40: what run-t0 was bound to; g41: where its re-observation was accepted. The head (g42) has the Claim revised. */
export const G40: Schemas["AcceptedCoordinate"] = { ...COORDINATE, git_oid: "40".repeat(20) };
export const G41: Schemas["AcceptedCoordinate"] = { ...COORDINATE, git_oid: "41".repeat(20) };
export const RUN_T0 = "run-t0";
export const REVISED_CLAIM = clmT(7);

export const RUN_T0_CARD: Schemas["GetProcedureRunCard"] = {
  ...RUN_T1_CARD,
  run: RUN_T0,
  started_at: "2026-10-18T18:15:02Z",
  terminal_egress: [
    {
      node_id: "write",
      kind: "claims",
      verdict: "delivered",
      required_authority: "settle",
      effective_authority: "settle",
      settle_outcome: "settled",
      accepted_git_oid: G41.git_oid,
      children: [child(0, claimPath(REVISED_CLAIM), "reobservation")],
    },
  ],
};

const statusView = (coordinate: Schemas["AcceptedCoordinate"], value: string): Schemas["ClaimViewRecord"] => ({
  tag: "playbill-claim-read-v2",
  coordinate_kind: "canonical",
  coordinate,
  envelope: { identity: `Claim:${REVISED_CLAIM}`, path: claimPath(REVISED_CLAIM) },
  facts: [],
  admission_evaluation_time: NOW,
  admission_accounts: [],
  statement: {
    subject: { artifact_path: `subjects/${ASSESSMENT}.json`, selector: { scheme: "subject", value: ASSESSMENT } },
    predicate: "security.assessment.status",
    object: { kind: "literal", value },
    role: "observation",
    lifecycle: "live",
  },
});

const claimsAt = (coordinate: Schemas["AcceptedCoordinate"], value: string) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/claims/read-batch",
    body: claimReadBatchBody([REVISED_CLAIM], coordinate),
    response: { tag: "playbill-claim-read-batch-v1", coordinate, claims: [statusView(coordinate, value)] },
  });

/**
 * run-t0 re-observed an assessment's status `open` (accepted at g41); a later
 * generation revised it to `fixed`, the head's value. Served beside the
 * template world in tests only.
 */
export const LATER_REVISION: RecordedFixture[] = [
  batch([`ProcedureRun:${RUN_T0}`], [result(`ProcedureRun:${RUN_T0}`, "procedure_run", { card: RUN_T0_CARD })]),
  runState(RUN_T0, [{ node: "pages", digest: P1 }], G40),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/head",
    query: headQuery(G41.git_oid),
    response: { tag: "playbill-head-v1", instance: "inst_fixture", coordinate: G41, generation: 41 },
  }),
  claimsAt(G41, "open"),
  claimsAt(G40, "open"),
  claimsAt(COORDINATE, "fixed"),
];

// -- a call returning two scalar Captures -------------------------------------------------

/** A fetch whose call returns two scalar Capture fields (body, headers): its digests are not a list. */
export const PAIR_PROCEDURE = "security.advisory-pair";
export const RUN_PAIR = "run-pair";
export const BODY = D("6e");
export const HEADERS = D("6f");
const HEADERS_KIND = "security.advisory-headers";

const PAIR_SPEC: Spec = {
  procedure: PAIR_PROCEDURE,
  description: "Fetch the vendor's advisory index and keep its response headers.",
  slots: { fetch: slot("web.fetch.request", "web.fetch.pair.result", "external_read") },
  steps: [{ call: "index", slot: "fetch", input: { url: PAGE_URL(1) }, captures: { body: PAGE_KIND, headers: HEADERS_KIND } }],
};
const PAIR_RUN_CARD: Schemas["GetProcedureRunCard"] = {
  run: RUN_PAIR,
  procedure: `Procedure:${PAIR_PROCEDURE}`,
  status: "succeeded",
  nodes_done: 1,
  nodes_total: 1,
  started_at: "2026-10-19T02:00:00Z",
  nodes: [{ node: "index", kind: "call", verdict: "ok", sequence: 1, duration_us: 900_000, summary: { kind: "call", captures: 2, capture_digests: [BODY, HEADERS] } }],
};
const PAIR_CAPTURES: CaptureSpec[] = [
  { digest: BODY, kind: PAGE_KIND, source: "vendor.advisories", observed: PAGES_OBSERVED, size: 9_120, access: "instance" },
  { digest: HEADERS, kind: HEADERS_KIND, source: "vendor.advisories", observed: PAGES_OBSERVED, size: 412, access: "instance" },
];

/** The Procedure revised: the same call now returns one list field (pages), its out Contract version 2. */
const PAIR_LIST_SPEC: Spec = {
  ...PAIR_SPEC,
  slots: { fetch: { ...slot("web.fetch.request", "web.fetch.pair.result", "external_read"), out: { name: "web.fetch.pair.result", version: 2 } } },
  steps: [{ call: "index", slot: "fetch", input: { url: PAGE_URL(1) }, captures: { pages: PAGE_KIND } }],
};

/** A get-batch of one ref at a given coordinate (a definition as it stood then). */
const batchAt = (coordinate: Schemas["AcceptedCoordinate"], ref: string, kind: GetResult["kind"], card: NonNullable<GetResult["card"]>) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([ref], coordinate),
    response: { tag: "playbill-get-batch-result-v1", coordinate, results: [result(ref, kind, { accepted_coordinate: coordinate, card })] },
  });

const pairDefinitions = (coordinate: Schemas["AcceptedCoordinate"], spec: Spec): RecordedFixture[] => {
  const out = spec.slots!.fetch!.out;
  const fields =
    out.version === 1
      ? [{ name: "body", type: "capture<*>" }, { name: "headers", type: "capture<*>" }]
      : [{ name: "pages", type: "list<capture<*>>{max_items: 20}" }];
  return [
    batchAt(coordinate, `Procedure:${PAIR_PROCEDURE}`, "procedure", procedureCard(spec)),
    batchAt(coordinate, `Contract:${out.name}@${out.version}`, "contract", { contract: out.name, version: out.version, fields }),
  ];
};

/**
 * run-pair (bound at g40) called `index`, which returned two scalar Captures.
 * Its definitions are served separately, so tests can serve them as they
 * stood at g40, a revision at the head, or neither. Tests only.
 */
export const SCALAR_PAIR: RecordedFixture[] = [
  ...PAIR_CAPTURES.map((c) => batch([handle(c.digest)], [captureResult(c)])),
  ...PAIR_CAPTURES.map((c) => read(c, PAGE_URL(1), RUN_PAIR)),
  batch([`ProcedureRun:${RUN_PAIR}`], [result(`ProcedureRun:${RUN_PAIR}`, "procedure_run", { card: PAIR_RUN_CARD })]),
  runState(RUN_PAIR, [], G40),
  // the bound coordinate's generation (the retention check), answered from accepted history
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/head",
    query: headQuery(G40.git_oid),
    response: { tag: "playbill-head-v1", instance: "inst_fixture", coordinate: G40, generation: 40 },
  }),
];
/**
 * The head moved on 80 generations past g40: run-pair's bound coordinate is
 * past the daemon's retained window (the newest 64), so a read there would
 * rebuild its projection.
 */
export const PAIR_BOUND_EVICTED: RecordedFixture[] = [
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/head",
    query: headQuery(null),
    response: { tag: "playbill-head-v1", instance: "inst_fixture", coordinate: COORDINATE, generation: 120 },
  }),
];
/** The pair Procedure and its out Contract at run-pair's bound coordinate (g40): two scalar Capture fields. */
export const PAIR_DEFINED_AT_BOUND = pairDefinitions(G40, PAIR_SPEC);
/** A later revision at the head: the same call returns one list field. */
export const PAIR_REVISED_AT_HEAD = pairDefinitions(COORDINATE, PAIR_LIST_SPEC);
/** The list form already at g40 (a positive control: the outputs are then list members, without pages). */
export const PAIR_LIST_AT_BOUND = pairDefinitions(G40, PAIR_LIST_SPEC);

// -- a chain source withheld from this credential --------------------------------------------

/** P1 as a credential without restricted body reads sees it: its source and time withheld (BodyRestricted). */
const WITHHELD_P1: Schemas["GetCaptureCard"] = {
  ...captureCard(byDigest.get(P1)!),
  source: null,
  observed_at: null,
  withheld: { capture_digests: [P1], capture_kinds: [PAGE_KIND], required_permission: "cruxible_body_read_restricted" },
};

/** The view's sources, read by a credential that P1's restricted kind withholds from. Served beside the template world in tests only. */
export const WITHHELD_SOURCE: RecordedFixture[] = [
  batch(
    [P1, P2, P3].map((d) => `Capture:${d}`),
    [result(`Capture:${P1}`, "capture", { card: WITHHELD_P1 }), captureResult(byDigest.get(P2)!), captureResult(byDigest.get(P3)!)],
  ),
];

/** The template world: the authored world, its definitions extended with the template Lines, and every template read. */
export const TEMPLATE_WORLD: RecordedFixture[] = [
  ...AUTHORED,
  ...DEFINITIONS,
  ...LINES,
  ...RUNS,
  ...CAPTURE_READS,
  ...KIND_PAGE,
  ...PROPOSALS,
  ...SUBJECT_PAGE,
];
