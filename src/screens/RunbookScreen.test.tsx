import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import { AT, COORDINATE, NOW } from "@/fixtures/authored/world";
import { getBatchBody } from "@/api/requests";
import type { Schemas } from "@/api/schemas";

afterEach(cleanup);

const D = (c: string) => "sha256:" + c.repeat(64);
const line = (name: string) => ({ kind: "line" as const, line: { target: { kind: "Line", name } } });
const outcome = (step: number, name: string, run: string): Schemas["RunbookStepOutcome"] => ({ step, target: line(name), status: "succeeded", run_id: run, run_status: "succeeded" });
const run = (id: string, digest: string, at: string, steps: Schemas["RunbookStepOutcome"][]): Schemas["RunbookRunResult"] => ({
  run_id: id,
  runbook: "demo",
  runbook_artifact_digest: digest,
  mode: "manual",
  started_at: at,
  finished_at: at,
  status: "completed",
  steps,
});

/**
 * A Runbook revised from [Line:a, Line:c] to [Line:b]: the current card lists
 * one step, and its retained runs are one of each revision.
 */
const REVISED = [
  ...AUTHORED,
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(["Runbook:demo"], COORDINATE),
    response: {
      tag: "playbill-get-batch-result-v1",
      coordinate: COORDINATE,
      results: [
        {
          tag: "playbill-get-result-v1",
          ref: "Runbook:demo",
          kind: "runbook",
          detail: "summary",
          coordinate: AT,
          accepted_coordinate: COORDINATE,
          evaluation_time: NOW,
          card: {
            runbook: "Runbook:demo",
            lifecycle: "live",
            steps: [{ step: 1, target: "Line:demo.b", availability: "available" }],
            triggers: [],
            triggers_total: 0,
            recent_runs: [
              run("RBR-new", D("2"), "2026-10-19T10:00:00Z", [outcome(1, "demo.b", "RUN-B")]),
              run("RBR-old", D("1"), "2026-10-18T10:00:00Z", [outcome(1, "demo.a", "RUN-A"), outcome(2, "demo.c", "RUN-C")]),
            ],
            runs_more: false,
          },
        },
      ],
    },
  }),
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/runbooks/{name}/preview",
    pathParams: { name: "demo" },
    response: { runbook: "demo", runbook_artifact_digest: D("2"), generation_root: D("9"), steps: [], order_problems: [] },
  }),
];

const counts = (over: Partial<Schemas["RunCounts"]>): Schemas["RunCounts"] => ({
  tag: "cruxible-run-counts-v1",
  complete: true,
  incomplete_reasons: [],
  written: 0,
  settled: 0,
  proposed: 0,
  unchanged: 0,
  retired: 0,
  refused: 0,
  top_refusals: [],
  inbox: 0,
  needs_attention: false,
  ...over,
});

/** The revised Runbook's card with its runs changed by `edit`. */
function withRuns(edit: (newer: Schemas["RunbookRunResult"], older: Schemas["RunbookRunResult"]) => void) {
  return REVISED.map((fixture) => {
    if (fixture !== REVISED[AUTHORED.length]) return fixture;
    const response = structuredClone(fixture.response) as { results: { card: { recent_runs: Schemas["RunbookRunResult"][] } }[] };
    const [newer, older] = response.results[0]!.card.recent_runs;
    edit(newer!, older!);
    return { ...fixture, response };
  });
}

/** The table's body rows under the header line whose text matches `header`, up to the next header. */
function rowsUnder(table: HTMLElement, header: RegExp): HTMLElement[] {
  const rows = within(table).getAllByRole("row").slice(1);
  const at = rows.findIndex((row) => header.test(row.textContent ?? "") && row.querySelectorAll("td").length === 1);
  const out: HTMLElement[] = [];
  for (const row of rows.slice(at + 1)) {
    if (row.querySelectorAll("td").length === 1) break;
    out.push(row);
  }
  return out;
}

describe("Runbook page", () => {
  it("lists each run's steps one row each, read by the revision it ran: an older run keeps its own steps", async () => {
    renderApp("/i/inst_fixture/runbooks/demo", REVISED);
    const main = within(await screen.findByRole("main"));
    const table = await main.findByRole("table", { name: "Recent runs" });
    // two revisions among the runs: each run's header line names its own
    const newer = rowsUnder(table, /revision/);
    expect(newer).toHaveLength(1);
    expect(within(newer[0]!).getByRole("link", { name: "demo.b" })).toBeInTheDocument();
    expect(within(newer[0]!).getByText("Succeeded").closest("a")).toHaveAttribute("href", "/i/inst_fixture/runs/RUN-B");
    const all = within(table).getAllByRole("row").slice(1).filter((row) => row.querySelectorAll("td").length > 1);
    expect(all.map((row) => within(row).getAllByRole("link")[0]!.textContent)).toEqual(["demo.b", "demo.a", "demo.c"]);
    const links = all.slice(1).map((row) => within(row).getByText("Succeeded").closest("a")!.getAttribute("href"));
    expect(links).toEqual(["/i/inst_fixture/runs/RUN-A", "/i/inst_fixture/runs/RUN-C"]);
    // the current definition's one step, as the card lists it
    expect(within(main.getByRole("table", { name: "Steps" })).getByRole("link", { name: "demo.b" })).toBeInTheDocument();
    // no counts served (an older daemon): no count columns, no flag
    expect(main.queryByText("needs attention")).toBeNull();
    expect(within(table).queryByRole("columnheader", { name: "Written" })).toBeNull();
    expect(within(table).queryByRole("columnheader", { name: "Complete" })).toBeNull();
  });

  it("flags a run and its steps that need attention, with every count a column", async () => {
    const flagged = withRuns((newer, older) => {
      // the newer run: its one step posted to the inbox with an unknown count, refused one item and was incomplete
      newer.steps[0]!.counts = counts({
        complete: false,
        incomplete_reasons: [{ node: "catalog", kind: "incomplete_input" } as Schemas["CompletenessReason"]],
        written: 3,
        settled: 3,
        refused: 1,
        top_refusals: [{ code: "extract_refused.value_invalid", count: 1 }],
        inbox: null,
        needs_attention: true,
      });
      newer.attention_steps = [1];
      // the older run: step 1 wrote quietly, step 2 (an action) has no counts
      older.steps[0]!.counts = counts({ written: 2, settled: 2 });
      older.attention_steps = [];
    });
    renderApp("/i/inst_fixture/runbooks/demo", flagged);
    const main = within(await screen.findByRole("main"));
    const table = await main.findByRole("table", { name: "Recent runs" });
    for (const header of ["#", "Target", "Outcome", "Written", "Settled", "Proposed", "Unchanged", "Retired", "Refused", "To inbox", "Complete", "Top refusals"]) {
      expect(within(table).getByRole("columnheader", { name: header })).toBeInTheDocument();
    }
    // the run's header line and the page header carry the flag, naming the step on hover
    expect(main.getAllByTitle("Needs attention: step 1")).toHaveLength(2);
    const [step] = rowsUnder(table, /needs attention/);
    const row = within(step!);
    expect(row.getByRole("img", { name: /^Needs attention/ })).toBeInTheDocument();
    expect(row.getByTitle(/the inbox could not be read/)).toHaveTextContent("?");
    expect(row.getByText("No")).toHaveAttribute("title", "catalog · incomplete_input");
    expect(row.getByText("extract_refused.value_invalid")).toBeInTheDocument();
    // the older run: an unflagged step with counts and an action step without (dashes)
    const all = within(table).getAllByRole("row").slice(1).filter((r) => r.querySelectorAll("td").length > 1);
    const [, first, second] = all;
    expect(within(first!).queryByRole("img", { name: /^Needs attention/ })).toBeNull();
    expect(within(first!).getAllByText("2")).toHaveLength(2);
    expect(within(second!).getAllByText("—").length).toBeGreaterThan(5);
  });

  it("keeps reads of what no Line writes apart from order problems", async () => {
    const fixtures = REVISED.map((fixture) =>
      fixture.path.endsWith("/runbooks/demo/preview")
        ? {
            ...fixture,
            response: {
              ...(fixture.response as Schemas["RunbookPreview"]),
              order_problems: [
                { kind: "reads_unwritten", step: 1, claim_type: "demo.verdict" },
                { kind: "reads_later_write", step: 1, claim_type: "demo.score", written_by_steps: [2], outside_writers: [] },
              ],
            },
          }
        : fixture,
    );
    renderApp("/i/inst_fixture/runbooks/demo", fixtures);
    const main = within(await screen.findByRole("main"));
    const problems = within(await main.findByRole("table", { name: "Order problems" }));
    expect(problems.getByText("demo.score")).toBeInTheDocument();
    expect(problems.queryByText("demo.verdict")).toBeNull();
    const unwritten = within(main.getByRole("table", { name: "Read, written by no Line" }));
    expect(unwritten.getByText("demo.verdict")).toBeInTheDocument();
  });

  it("shows neither table beyond order problems when the preview reports none", async () => {
    renderApp("/i/inst_fixture/runbooks/demo", REVISED);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("None: no step reads what a later step writes")).toBeInTheDocument();
    expect(main.queryByRole("table", { name: "Read, written by no Line" })).toBeNull();
  });
});
