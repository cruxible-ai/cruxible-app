import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
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

describe("Runbook page", () => {
  it("reads each retained run by the revision it ran: an older run keeps its own steps after a revision", async () => {
    renderApp("/i/inst_fixture/runbooks/demo", REVISED);
    const main = within(await screen.findByRole("main"));
    const current = within(await main.findByRole("table", { name: `Runs of ${D("2")}` }));
    expect(current.getByRole("columnheader", { name: "1 · b" })).toBeInTheDocument();
    expect(current.queryByRole("columnheader", { name: /· a$|· c$/ })).toBeNull();
    expect(current.getByText("Succeeded").closest("a")).toHaveAttribute("href", "/i/inst_fixture/runs/RUN-B");
    const old = within(main.getByRole("table", { name: `Runs of ${D("1")}` }));
    expect(old.getByRole("columnheader", { name: "1 · a" })).toBeInTheDocument();
    expect(old.getByRole("columnheader", { name: "2 · c" })).toBeInTheDocument();
    expect(old.queryByRole("columnheader", { name: "1 · b" })).toBeNull();
    const links = old.getAllByText("Succeeded").map((el) => el.closest("a")!.getAttribute("href"));
    expect(links).toEqual(["/i/inst_fixture/runs/RUN-A", "/i/inst_fixture/runs/RUN-C"]);
    // the current definition's one step, as the card lists it
    expect(within(main.getByRole("table", { name: "Steps" })).getByRole("link", { name: "demo.b" })).toBeInTheDocument();
  });

  it("flags a run and its steps that need attention, and opens to the steps' counts", async () => {
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
    const flagged = REVISED.map((fixture) => {
      if (fixture !== REVISED[AUTHORED.length]) return fixture;
      const response = structuredClone(fixture.response) as { results: { card: { recent_runs: Schemas["RunbookRunResult"][] } }[] };
      const [newer, older] = response.results[0]!.card.recent_runs;
      // the newer run: its one step posted to the inbox with an unknown count, refused one item and was incomplete
      newer!.steps[0]!.counts = counts({
        complete: false,
        incomplete_reasons: [{ node: "catalog", kind: "incomplete_input" } as Schemas["CompletenessReason"]],
        written: 3,
        settled: 3,
        refused: 1,
        top_refusals: [{ code: "extract_refused.value_invalid", count: 1 }],
        inbox: null,
        needs_attention: true,
      });
      newer!.attention_steps = [1];
      // the older run: step 1 wrote quietly, step 2 (an action) has no counts
      older!.steps[0]!.counts = counts({ written: 2, settled: 2 });
      older!.attention_steps = [];
      return { ...fixture, response };
    });
    renderApp("/i/inst_fixture/runbooks/demo", flagged);
    const main = within(await screen.findByRole("main"));
    const current = within(await main.findByRole("table", { name: `Runs of ${D("2")}` }));
    // the run and its step carry the flag; the inline tally names the non-zero counts
    expect(current.getByTitle("Needs attention: step 1")).toHaveTextContent("needs attention");
    expect(current.getAllByRole("img", { name: /^Needs attention/ })).toHaveLength(1); // the step's dot
    expect(current.getByText("3 written · 3 settled · 1 refused · ? to inbox")).toBeInTheDocument();
    // the header's last run says the same
    expect(main.getAllByTitle("Needs attention: step 1")).toHaveLength(2);
    // the older run: counts, no flag
    const old = within(main.getByRole("table", { name: `Runs of ${D("1")}` }));
    expect(old.queryByText("needs attention")).toBeNull();
    expect(old.getByText("2 written · 2 settled")).toBeInTheDocument();

    // a run opens to its steps with the counts as columns
    fireEvent.click(current.getByRole("button", { name: "Expand RBR-new" }));
    const steps = within(await main.findByRole("table", { name: "Step counts of RBR-new" }));
    for (const header of ["#", "Target", "Outcome", "Written", "Settled", "Proposed", "Unchanged", "Retired", "Refused", "To inbox", "Complete", "Top refusals"]) {
      expect(steps.getByRole("columnheader", { name: header })).toBeInTheDocument();
    }
    const row = within(steps.getAllByRole("row")[1]!);
    expect(row.getByRole("img", { name: /^Needs attention/ })).toBeInTheDocument();
    expect(row.getByTitle(/the inbox could not be read/)).toHaveTextContent("?");
    expect(row.getByText("No")).toHaveAttribute("title", "catalog · incomplete_input");
    expect(row.getByText("extract_refused.value_invalid")).toBeInTheDocument();

    // the older run: an unflagged step with counts and an action step without (dashes)
    fireEvent.click(old.getByRole("button", { name: "Expand RBR-old" }));
    const oldSteps = within(await main.findByRole("table", { name: "Step counts of RBR-old" }));
    const [, first, second] = oldSteps.getAllByRole("row");
    expect(within(first!).queryByRole("img", { name: /^Needs attention/ })).toBeNull();
    expect(within(first!).getAllByText("2")).toHaveLength(2);
    expect(within(second!).getAllByText("—").length).toBeGreaterThan(5);
  });

  it("serves no counts: no flag, no tally, no expansion", async () => {
    renderApp("/i/inst_fixture/runbooks/demo", REVISED);
    const main = within(await screen.findByRole("main"));
    const current = within(await main.findByRole("table", { name: `Runs of ${D("2")}` }));
    expect(current.queryByText("needs attention")).toBeNull();
    expect(current.queryByRole("button", { name: /^Expand/ })).toBeNull();
  });
});
