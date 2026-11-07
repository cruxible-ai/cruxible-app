/**
 * Hand-authored Line reads for the fixture world: the lines and mandates
 * sections, Line / Procedure / run / query / Mandate cards (get-batch), a
 * readings page, a Line inbox page and item, and a run's state.
 */
import { defineFixture } from "../fixture";
import { getBatchBody, getBody, inboxQuery, LINE_RUNS_PAGE, orientQuery, readingsBody } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";
import { KEV_TRIAGE_SPEC, procedureCard } from "./definitions";
import { KEV_EXPOSURE_CARD } from "./queries";

const ORIENT_PAGE = 500;
const KEV = "kev-triage";
const CVE = "cve-applicability";
const PROCEDURE = "security.kev-triage";
const MANDATE = "security.kev-settle";
const QUERY = "QueryDefinition:security.kev_exposure";
const INBOX_ITEM = "INB-" + "7".repeat(64);

const BASE_ORIENT = {
  tag: "playbill-orient-v1" as const,
  instance: "inst_fixture",
  coordinate: COORDINATE,
  generation: AT.generation,
  accepted_at: "2026-10-19T09:30:00Z",
  evaluation_time: NOW,
};

function result(ref: string, kind: GetResult["kind"], card: NonNullable<GetResult["card"]>, detail: GetResult["detail"] = "summary"): GetResult {
  return { tag: "playbill-get-result-v1", ref, kind, detail, coordinate: AT, accepted_coordinate: COORDINATE, evaluation_time: NOW, card };
}

const batch = (refs: string[], results: GetResult[]) =>
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(refs, COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results },
  });

const runRow = (run: string, status: Schemas["RunRow"]["status"], startedAt: string, line: string, nodes: number): Schemas["RunRow"] => ({
  run,
  procedure: `Procedure:${PROCEDURE}`,
  status,
  started_at: startedAt,
  line: `Line:${line}`,
  nodes_done: nodes,
});

const KEV_CARD: Schemas["GetLineCard"] = {
  line: KEV,
  identity_digest: "sha256:" + "8".repeat(64),
  lifecycle: "live",
  procedure: `Procedure:${PROCEDURE}`,
  authority: "settle",
  trigger: "cadence",
  triggers: [{ trigger: "Trigger:security.kev-daily", version: 2, fires: "daily at 06:00 UTC" }],
  triggers_total: 1,
  occurrence_epoch: 1,
  enablements: [
    {
      enablement: "enb-1",
      state: "running",
      principal_kind: "runtime_credential",
      enabled_by_withheld: true,
      enabled_at: "2026-10-12T08:00:00Z",
      line_artifact_digest: "sha256:" + "9".repeat(64),
      evaluated_until: "2026-10-19T06:00:00Z",
      pending_automatic: 0,
      pending_explicit: 0,
    },
  ],
  enablements_total: 1,
  due: 0,
  waiting: 1,
  occurrences: [{ occurrence: "occ-2026-10-20", eligible_at: "2026-10-20T06:00:00Z", state: "waiting" }],
  recent_runs: [
    runRow("run-8", "succeeded", "2026-10-19T06:00:05Z", KEV, 6),
    runRow("run-7", "node_refused", "2026-10-18T06:00:04Z", KEV, 4),
  ],
  runs_total: 12,
};

const CVE_CARD: Schemas["GetLineCard"] = {
  line: CVE,
  identity_digest: "sha256:" + "b".repeat(64),
  lifecycle: "live",
  procedure: "Procedure:security.cve-applicability",
  authority: "propose",
  trigger: "capture_landing",
  occurrence_epoch: 1,
  recent_runs: [],
  runs_total: 0,
};

/** run-7: refused at the guard after the extract; its nodes carry the run card's summaries. */
const RUN_7: Schemas["GetProcedureRunCard"] = {
  run: "run-7",
  procedure: `Procedure:${PROCEDURE}`,
  status: "node_refused",
  nodes_done: 4,
  nodes_total: 6,
  started_at: "2026-10-18T06:00:04Z",
  elapsed_us: 8_400_000,
  elapsed_basis: "measured_wall_clock",
  nodes: [
    { node: "catalog", kind: "call", verdict: "ok", sequence: 1, duration_us: 1_200_000, summary: { kind: "call", captures: 1 } },
    { node: "watched", kind: "read", verdict: "ok", sequence: 2, duration_us: 400_000, summary: { kind: "read", rows: 3 } },
    {
      node: "entries",
      kind: "extract",
      verdict: "ok",
      sequence: 3,
      duration_us: 6_100_000,
      summary: { kind: "extract", records: 1766, invalid_records: 0, duplicates: 0, invalid_fields: 0, complete: true },
    },
    { node: "changed", kind: "guard", verdict: "refused", sequence: 4, duration_us: 2_000 },
  ],
  triggered_by: { line: `Line:${KEV}`, occurrence: "occ-2026-10-18", enablement: "enb-1", principal_kind: "runtime_credential", enabled_by_withheld: true },
  terminal: {
    tag: "playbill-procedure-node-refusal-v1",
    classification: "node_refusal",
    code: "guard_refused",
    message: "The settle target is outside the mandate's ClaimType scope.",
    node_id: "changed",
    repair: { operation: "cruxible.authoring.example" },
  },
  terminal_egress: [
    {
      node_id: "settle",
      kind: "claims",
      verdict: "delivered",
      required_authority: "propose",
      effective_authority: "settle",
      proposal_id: "sha256:" + "a".repeat(64),
      settle_outcome: "proposed",
      target_paths: ["claims/00/CLM-000000000000000000000000000000a3.json"],
    },
  ],
};

export default [
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "lines", limit: ORIENT_PAGE }),
    response: {
      ...BASE_ORIENT,
      section: "lines",
      lines: [
        { line: `Line:${CVE}`, lifecycle: "live", procedure: "Procedure:security.cve-applicability", authority: "propose", trigger: "capture_landing", enablement: "stopped", due: 0, waiting: 0 },
        { line: `Line:${KEV}`, lifecycle: "live", procedure: `Procedure:${PROCEDURE}`, authority: "settle", trigger: "cadence", enablement: "running", due: 0, waiting: 1 },
      ],
    },
  }),
  // No Runbooks in this world: the Lines page reads the section and shows none.
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "runbooks", limit: ORIENT_PAGE }),
    response: { ...BASE_ORIENT, section: "runbooks", runbooks: [] },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "mandates", limit: ORIENT_PAGE }),
    response: {
      ...BASE_ORIENT,
      section: "mandates",
      mandates: [
        {
          mandate: `ProcedureMandate:${MANDATE}`,
          line: `Line:${KEV}`,
          grants: "settle",
          state: "active",
          expires_at: "2027-01-01T00:00:00Z",
          scope: [{ claim_type: "ClaimType:security.assessment.status", changes: { create: { basis: ["extracted"] }, retire: { basis: ["absence"] } }, binds: "subject" }],
          condition_query: QUERY,
        },
      ],
    },
  }),
  batch([`Line:${CVE}`, `Line:${KEV}`], [result(`Line:${CVE}`, "line", CVE_CARD), result(`Line:${KEV}`, "line", KEV_CARD)]),
  batch([`Line:${KEV}`], [result(`Line:${KEV}`, "line", KEV_CARD)]),
  // cve-applicability's page: its card (the Line whose writes kev-triage's Query reads).
  batch([`Line:${CVE}`], [result(`Line:${CVE}`, "line", CVE_CARD)]),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get",
    body: getBody({ ref: `Line:${KEV}`, coordinate: COORDINATE, detail: "runs", limit: LINE_RUNS_PAGE }),
    response: {
      ...result(`Line:${KEV}`, "line", KEV_CARD, "runs"),
      runs: {
        kind: "line_runs",
        line: KEV,
        runs: [
          runRow("run-8", "succeeded", "2026-10-19T06:00:05Z", KEV, 6),
          runRow("run-7", "node_refused", "2026-10-18T06:00:04Z", KEV, 4),
          runRow("run-6", "succeeded", "2026-10-17T06:00:03Z", KEV, 6),
        ],
      },
      next_cursor: "runs-page-2",
    },
  }),
  batch(
    [`Procedure:${PROCEDURE}`],
    [
      result(`Procedure:${PROCEDURE}`, "procedure", {
        ...procedureCard(KEV_TRIAGE_SPEC),
        track_record: [
          {
            promotion: "kev-triage-agreement",
            first_sequence: 1,
            last_sequence: 11,
            output: { settled: 9, refused: 2 },
            output_digest: "sha256:" + "1".repeat(64),
            promotion_digest: "sha256:" + "2".repeat(64),
          },
        ],
        measurement_reviews: [
          {
            measurement_name: "triage-agreement",
            contract_id: "rc-triage-agreement",
            latest_resolution_id: "res-3",
            standing_resolution_id: "res-3",
            history: [
              { disposition_id: "disp-2", resolution_id: "res-3", sequence: 2, verdict: "upheld", reviewer_id: "security-lead", recorded_at: "2026-10-18T12:00:00Z", reason: "Matches the analyst's calls on 9 of 11." },
              { disposition_id: "disp-1", resolution_id: "res-2", sequence: 1, verdict: "overturned", reviewer_id: "security-lead", recorded_at: "2026-10-14T12:00:00Z", reason: "Missed a vendor backport." },
            ],
            history_total: 2,
          },
        ],
      }),
    ],
  ),
  batch(
    [`Mandate:${MANDATE}`],
    [
      result(`Mandate:${MANDATE}`, "mandate", {
        mandate: MANDATE,
        line: `Line:${KEV}`,
        grants: "settle",
        lifecycle: "live",
        state: "active",
        valid_from: "2026-10-01T00:00:00Z",
        expires_at: "2027-01-01T00:00:00Z",
        namespace: ["claims"],
        scope: [{ claim_type: "ClaimType:security.assessment.status", changes: { create: { basis: ["extracted"] }, retire: { basis: ["absence"] } }, binds: "subject" }],
        condition: {
          query: QUERY,
          binding_parameter: "assessment",
          required_fields: ["kev_listed"],
          fallback: "propose",
        },
      }),
    ],
  ),
  batch(
    [QUERY],
    [
      result(QUERY, "query", {
        query: "security.kev_exposure",
        description: "Assessments whose vulnerability is KEV-listed and whose release is shipped.",
        params: [{ name: "assessment", type: "subject:security.assessment", required: true }],
        // What it reads (assessment status, the assessments themselves) cve-applicability writes: the Lines' dependency.
        definition: KEV_EXPOSURE_CARD.definition ?? null,
      }),
    ],
  ),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/procedures/{name}/readings",
    pathParams: { name: PROCEDURE },
    body: readingsBody(COORDINATE, 50),
    response: {
      tag: "playbill-procedure-readings-result-v1",
      procedure_identity: { kind: "Procedure", name: PROCEDURE },
      procedure_artifact_digest: "sha256:" + "6".repeat(64),
      activation_coordinate: COORDINATE,
      observation_coordinate: COORDINATE,
      observation_time: NOW,
      contracts: [
        {
          measurement_name: "triage-agreement",
          measurement_kind: "claim_attestation",
          contract_id: "rc-triage-agreement",
          activation_id: "act-1",
          subject_grain: "procedure_unit",
          subject: { artifact_path: `procedures/${PROCEDURE}.json`, selector: { scheme: "procedure", value: PROCEDURE } },
          status: "resolved",
          eligibility: {
            activation_coordinate: COORDINATE,
            activated_at: "2026-10-01T00:00:00Z",
            check_at: "2026-10-18T00:00:00Z",
            expires_at: null,
            observation_coordinate: COORDINATE,
            observation_time: NOW,
            window: "closed",
          },
          reading_count: 2,
        },
      ],
      readings: [
        {
          reading_id: "rd-2",
          reading_digest: "sha256:" + "a1".repeat(32),
          journal_partition_id: "p-1",
          journal_record_digest: "sha256:" + "b1".repeat(32),
          subject_grain: "procedure_unit",
          subject: { artifact_path: "subjects/security.assessment/rel-1-cve-2024-3094.json", selector: { scheme: "subject", value: "security.assessment/rel-1-cve-2024-3094" } },
          accepted_coordinate: COORDINATE,
          definition_digest: "sha256:" + "c1".repeat(32),
          grade: "contract",
          measurement_name: "triage-agreement",
          verdict: "contradicted",
          value: "not_affected",
          run_id: "run-7",
          observed_at: "2026-10-19T09:00:00Z",
          recorded_at: "2026-10-19T09:05:00Z",
          actor_id: "security-lead",
        },
        {
          reading_id: "rd-1",
          reading_digest: "sha256:" + "a2".repeat(32),
          journal_partition_id: "p-1",
          journal_record_digest: "sha256:" + "b2".repeat(32),
          subject_grain: "procedure_unit",
          subject: { artifact_path: "subjects/security.vulnerability/cve-2024-3094.json", selector: { scheme: "subject", value: "security.vulnerability/cve-2024-3094" } },
          accepted_coordinate: COORDINATE,
          definition_digest: "sha256:" + "c1".repeat(32),
          grade: "contract",
          measurement_name: "triage-agreement",
          verdict: "satisfied",
          value: true,
          run_id: "run-8",
          observed_at: "2026-10-19T06:10:00Z",
          recorded_at: "2026-10-19T06:12:00Z",
          actor_id: "security-lead",
        },
      ],
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/inbox",
    query: inboxQuery(KEV, undefined, 50),
    response: {
      tag: "cruxible-inbox-list-v1",
      line_filter: KEV,
      entries: [
        {
          item: {
            item_id: INBOX_ITEM,
            status: "unread",
            line: KEV,
            procedure: `Procedure:${PROCEDURE}`,
            procedure_artifact_digest: "sha256:" + "6".repeat(64),
            node_id: "notify",
            occurrences: 3,
            first_sighting: { run_id: "run-6", posted_at: "2026-10-17T06:00:09Z" },
            recent_sightings: [{ run_id: "run-8", posted_at: "2026-10-19T06:00:09Z" }],
            dedupe_key: "kev-triage/notify/cve-2024-6387",
            payload_digest: "sha256:" + "d1".repeat(32),
            payload_bytes: 212,
          },
          payload_preview: "CVE-2024-6387 is KEV-listed; no assessment exists for rel-1.",
        },
      ],
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/inbox/{item_id}",
    pathParams: { item_id: INBOX_ITEM },
    response: {
      tag: "cruxible-inbox-item-v1",
      item: {
        item_id: INBOX_ITEM,
        status: "unread",
        line: KEV,
        procedure: `Procedure:${PROCEDURE}`,
        procedure_artifact_digest: "sha256:" + "6".repeat(64),
        node_id: "notify",
        occurrences: 3,
        first_sighting: { run_id: "run-6", posted_at: "2026-10-17T06:00:09Z" },
        recent_sightings: [{ run_id: "run-8", posted_at: "2026-10-19T06:00:09Z" }],
        dedupe_key: "kev-triage/notify/cve-2024-6387",
        payload_digest: "sha256:" + "d1".repeat(32),
        payload_bytes: 212,
      },
      payload: { cve: "CVE-2024-6387", release: "rel-1", message: "KEV-listed; no assessment exists for rel-1." },
    },
  }),
  batch(["ProcedureRun:run-7"], [result("ProcedureRun:run-7", "procedure_run", RUN_7)]),
  // The runs page's cards, for what each run changed: run-8 settled Claims, run-7 refused before writing, run-6 predates node summaries.
  batch(
    ["ProcedureRun:run-8", "ProcedureRun:run-7", "ProcedureRun:run-6"],
    [
      result("ProcedureRun:run-8", "procedure_run", {
        run: "run-8",
        procedure: `Procedure:${PROCEDURE}`,
        status: "succeeded",
        nodes_done: 6,
        nodes_total: 6,
        started_at: "2026-10-19T06:00:05Z",
        nodes: [
          {
            node: "settle",
            kind: "claims",
            verdict: "succeeded",
            sequence: 9,
            summary: { kind: "claims", written: 32, revised: 0, inverse_written: 2, subjects_created: 0, re_observed: 0, no_op: 0, retired: 0, surfaced: 0, downgraded: 0, delivery: "settled" },
          },
        ],
      }),
      result("ProcedureRun:run-7", "procedure_run", RUN_7),
      result("ProcedureRun:run-6", "procedure_run", {
        run: "run-6",
        procedure: `Procedure:${PROCEDURE}`,
        status: "succeeded",
        nodes_done: 6,
        nodes_total: 6,
        started_at: "2026-10-17T06:00:03Z",
        nodes: [{ node: "settle", kind: "claims", verdict: "succeeded", sequence: 9 }],
      }),
    ],
  ),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/procedure-runs/{run_id}",
    pathParams: { run_id: "run-7" },
    response: {
      tag: "playbill-procedure-run-state-v2",
      run_id: "run-7",
      procedure_identity: { kind: "Procedure", name: PROCEDURE },
      procedure_artifact_digest: "sha256:" + "6".repeat(64),
      bound_coordinate: COORDINATE,
      head_at_admission: COORDINATE,
      lane: "current",
      evaluation_time: "2026-10-18T06:00:04Z",
      status: "node_refused",
      pending_inputs: [],
      outcomes: [],
      next_operation: {},
      children: [],
      source_observations: [
        {
          occurrence_path: "captures/9e/9e1b.json",
          node_id: "catalog",
          input_name: "kev_catalog",
          capture_digest: "sha256:9e1b3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b",
        },
      ],
      terminal_egress: [],
      attribution: {
        tag: "playbill-procedure-run-attribution-withheld-v1",
        actor_type: "runtime_credential",
        org_id: "local",
        operation_id: "op-7",
        recorded_time: "2026-10-18T06:00:04Z",
        withheld: "names_the_enabling_credential",
      },
    },
  }),
];
