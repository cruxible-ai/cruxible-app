import { describe, expect, it } from "vitest";
import type { OrientActivity } from "@/api/schemas";
import { activityRows } from "./activity";

const enable = (line: string, at: string): OrientActivity => ({
  event: "line_state_changed",
  at,
  ref: `Line:${line}`,
  line: `Line:${line}`,
  previous: null,
  state: "running",
  reason: null,
  detail: null,
});

describe("activity rows", () => {
  const label = (name: string) => name.replace(/^security\./, "");
  it("folds Lines enabled one after another into one row, and keeps a lone enablement as itself", () => {
    const rows = activityRows(
      [enable("security.a", "2026-10-26T20:56:00Z"), enable("security.b", "2026-10-26T20:55:59Z"), enable("security.c", "2026-10-26T20:55:58Z")],
      label,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ who: null, what: "3 Lines enabled", detail: "a, b, c" });
    const lone = activityRows([enable("security.a", "2026-10-26T20:56:00Z")], label);
    expect(lone[0]).toMatchObject({ who: { text: "a" }, what: "enabled" });
  });

  it("folds a run's start into its finish when both are on the page", () => {
    const run = "RUN-" + "a".repeat(32);
    const rows = activityRows(
      [
        { event: "run_finished", at: "2026-10-26T20:56:03Z", ref: `ProcedureRun:${run}`, run, procedure: null, line: "Line:security.sbom-import", status: "succeeded", unavailable: false },
        { event: "run_started", at: "2026-10-26T20:56:03Z", ref: `ProcedureRun:${run}`, run, procedure: null, line: "Line:security.sbom-import", unavailable: false },
      ],
      label,
    );
    expect(rows.map((r) => r.what)).toEqual(["ran · succeeded"]);
  });
});
