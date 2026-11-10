import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture, type RecordedFixture } from "@/fixtures/fixture";
import type { Schemas } from "@/api/schemas";

afterEach(cleanup);

/** The authored world with run-7's state serving these counts (the same state, typed against the contract). */
function withCounts(counts: Schemas["RunCounts"]): RecordedFixture[] {
  const authored = AUTHORED.find((f) => f.method === "GET" && f.path.endsWith("/procedure-runs/run-7"))!;
  const state = authored.response as Schemas["ProcedureRunState"];
  return [
    ...AUTHORED,
    defineFixture({ method: "get", path: "/api/v1/{instance_id}/procedure-runs/{run_id}", pathParams: { run_id: "run-7" }, response: { ...state, counts } }),
  ];
}

const COUNTS: Schemas["RunCounts"] = {
  tag: "cruxible-run-counts-v1",
  complete: true,
  incomplete_reasons: [],
  written: 4,
  settled: 0,
  proposed: 4,
  unchanged: 1,
  retired: 0,
  refused: 0,
  top_refusals: [],
  inbox: 0,
  needs_attention: false,
};

describe("Run page counts", () => {
  it("shows the run's counts as columns, unflagged", async () => {
    renderApp("/i/inst_fixture/runs/run-7", withCounts(COUNTS));
    const main = within(await screen.findByRole("main"));
    const table = within(await main.findByRole("table", { name: "Run counts" }));
    for (const header of ["Outcome", "Written", "Settled", "Proposed", "Unchanged", "Retired", "Refused", "To inbox", "Complete", "Top refusals"]) {
      expect(table.getByRole("columnheader", { name: header })).toBeInTheDocument();
    }
    expect(table.getAllByText("4")).toHaveLength(2);
    expect(table.getByText("Yes")).toBeInTheDocument();
    expect(main.queryByText("needs attention")).toBeNull();
    expect(table.queryByRole("img", { name: /^Needs attention/ })).toBeNull();
  });

  it("flags a run that needs attention in its header and its counts row", async () => {
    renderApp("/i/inst_fixture/runs/run-7", withCounts({ ...COUNTS, refused: 2, top_refusals: [{ code: "guard_refused", count: 2 }], inbox: 3, needs_attention: true }));
    const main = within(await screen.findByRole("main"));
    const table = within(await main.findByRole("table", { name: "Run counts" }));
    expect(table.getByRole("img", { name: /^Needs attention/ })).toBeInTheDocument();
    expect(await main.findByText("needs attention")).toBeInTheDocument();
    expect(table.getByText("3")).toBeInTheDocument();
    // the refusal code and its count
    expect(table.getAllByText("guard_refused")).toHaveLength(1);
  });

  it("serves no counts: no counts table, no flag", async () => {
    renderApp("/i/inst_fixture/runs/run-7");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("guard_refused")).toBeInTheDocument();
    expect(await main.findByRole("link", { name: "CAP-9e1b3d5f7a9c" })).toBeInTheDocument();
    expect(main.queryByRole("table", { name: "Run counts" })).toBeNull();
    expect(main.queryByText("needs attention")).toBeNull();
  });
});
