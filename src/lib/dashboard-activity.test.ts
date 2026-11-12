import { describe, expect, it } from "vitest";
import type { OrientActivity } from "@/api/schemas";
import { compactRows, shortCapture } from "./dashboard-activity";

const RUN_A = "RUN-" + "a".repeat(64);
const RUN_B = "RUN-" + "b".repeat(64);
const AT = "2026-11-03T00:58:54Z";
const label = (name: string) => name.replace(/^security\./, "");

// One page as the live daemon serves it: newest first, a run's events at one instant.
const EVENTS: OrientActivity[] = [
  { at: AT, event: "run_finished", ref: `ProcedureRun:${RUN_A}`, run: RUN_A, procedure: "Procedure:security.epss-triage", line: "Line:security.epss-triage", status: "succeeded", elapsed_us: 1_537_875 },
  {
    at: AT,
    event: "capture_landed",
    ref: "Capture:sha256:" + "9".repeat(64),
    capture: "CAP-9bdf26382c73",
    contract: "CaptureContract:security.epss-scores",
    logical_source: "first.epss.api",
    run: RUN_A,
    line: "Line:security.epss-triage",
  },
  { at: AT, event: "run_started", ref: `ProcedureRun:${RUN_A}`, run: RUN_A, procedure: "Procedure:security.epss-triage", line: "Line:security.epss-triage" },
  {
    at: AT,
    event: "generation_accepted",
    ref: "sha256:" + "1".repeat(64),
    sequence: 10,
    git_oid: "7".repeat(40),
    proposal: "sha256:" + "1".repeat(64),
    proposer: "pilot-owner",
    because: `Proposed by Procedure security.epss-triage run ${RUN_A} terminal write\n\n30 items; each item's reason is recorded with the Claim or Subject it explains.`,
    members: 30,
  },
  { at: "2026-11-03T00:58:50Z", event: "run_started", ref: `ProcedureRun:${RUN_B}`, run: RUN_B, procedure: "Procedure:security.kev-triage", line: "Line:security.kev-triage" },
  {
    at: "2026-11-03T00:58:40Z",
    event: "generation_accepted",
    ref: "sha256:" + "2".repeat(64),
    sequence: 8,
    git_oid: "3".repeat(40),
    proposal: "sha256:" + "2".repeat(64),
    proposer: "pilot-owner",
    because: "Adopt the KEV and EPSS Lines.",
    members: 8,
  },
  {
    at: "2026-11-03T00:58:30Z",
    event: "capture_landed",
    ref: "Capture:sha256:" + "8".repeat(64),
    capture: "CAP-8888",
    contract: "CaptureContract:security.kev-catalog",
    logical_source: "cisa.kev.catalog",
    run: "RUN-" + "c".repeat(64),
    line: "Line:security.kev-triage",
  },
];

describe("compactRows", () => {
  it("folds a run's start, landing and accepted generation into one row", () => {
    const rows = compactRows(EVENTS, label);
    expect(rows.map((r) => (r.kind === "run" ? `run ${r.run.slice(0, 5)} ${r.status}` : r.kind === "generation" ? `generation ${r.generation.sequence}` : `event ${r.row.family}`))).toEqual([
      "run RUN-a succeeded",
      "run RUN-b running",
      "generation 8",
      "event capture",
    ]);
    expect(rows[0]).toMatchObject({
      line: "security.epss-triage",
      elapsedUs: 1_537_875,
      generation: { sequence: 10, members: 30 },
      captures: [{ capture: "CAP-9bdf26382c73", source: "first.epss.api" }],
    });
  });

  it("keeps a definition proposal (as the Ledger's generation row) and a Capture whose run is not loaded on their own rows", () => {
    const rows = compactRows(EVENTS, label);
    const [generation, capture] = rows.slice(2);
    expect(generation).toMatchObject({
      kind: "generation",
      generation: { sequence: 8, accepted_at: "2026-11-03T00:58:40Z", proposer: "pilot-owner", because: "Adopt the KEV and EPSS Lines.", members: 8 },
    });
    expect(capture).toMatchObject({ kind: "event", row: { what: "landed evidence from cisa.kev.catalog" } });
  });

  it("does not fold a generation when its run is not loaded", () => {
    const rows = compactRows(EVENTS.slice(3, 4), label);
    expect(rows).toHaveLength(1);
    expect(rows[0]!.kind).toBe("generation");
  });
});

describe("shortCapture", () => {
  it("shortens a Capture name", () => {
    expect(shortCapture("CAP-9bdf26382c73")).toBe("CAP-9bdf…");
    expect(shortCapture("Capture")).toBe("Capture");
  });
});
