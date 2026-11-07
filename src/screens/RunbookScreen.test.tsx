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
});
