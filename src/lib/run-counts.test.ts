import { describe, expect, it } from "vitest";
import type { Schemas } from "../api/schemas.ts";
import { countColumns, countOf } from "./run-counts.ts";
import { lineAttention } from "./lines.ts";

const COUNTS: Schemas["RunCounts"] = {
  tag: "cruxible-run-counts-v1",
  complete: true,
  incomplete_reasons: [],
  written: 5,
  settled: 3,
  proposed: 2,
  unchanged: 0,
  retired: 0,
  refused: 0,
  top_refusals: [],
  inbox: 1,
  needs_attention: true,
};

describe("run counts", () => {
  it("reads every count field as a column, known ones in order, flags and lists left out", () => {
    expect(countColumns([COUNTS]).map((c) => c.word)).toEqual(["Written", "Settled", "Proposed", "Unchanged", "Retired", "Refused", "To inbox"]);
  });

  it("puts a count field a later daemon adds after the known ones, by its own name", () => {
    const later = { ...COUNTS, inbox_new: 1, inbox_seen_again: 4 } as Schemas["RunCounts"];
    const columns = countColumns([later, null, undefined]);
    expect(columns.slice(-3).map((c) => c.word)).toEqual(["To inbox", "Inbox new", "Inbox seen again"]);
    expect(countOf(later, "inbox_seen_again")).toBe(4);
  });

  it("reads a count that is not served as undefined and an unknown one as null", () => {
    expect(countOf(undefined, "written")).toBeUndefined();
    expect(countOf({ ...COUNTS, inbox: null }, "inbox")).toBeNull();
  });
});

describe("needs-attention entries", () => {
  it("reads the Line, its state and the stop reason", () => {
    expect(lineAttention("Line:kev-triage stopped (credential_revoked)")).toMatchObject({ ref: "Line:kev-triage", state: "stopped", reason: "credential_revoked" });
    expect(lineAttention("Line:kev-triage stalled")).toMatchObject({ ref: "Line:kev-triage", state: "stalled", reason: null });
  });

  it("keeps an entry in another form as served after its leading ref", () => {
    expect(lineAttention("Line:x paused for review")).toMatchObject({ ref: "Line:x", state: null, reason: "paused for review" });
    expect(lineAttention("Line:x")).toMatchObject({ ref: "Line:x", state: null, reason: null });
  });
});
