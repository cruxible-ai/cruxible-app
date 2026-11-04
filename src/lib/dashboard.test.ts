import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { OrientPredicate, Schemas } from "@/api/schemas";
import type { LogicalSource, Retention } from "./definitions";
import {
  cronInterval,
  evidenceByKind,
  freshMark,
  intervalWords,
  readSeen,
  sinceSummary,
  sinceWindow,
  sourceFreshness,
  staleByKind,
  writeSeen,
} from "./dashboard";

type SinceRow = Schemas["SinceRow"];
type OrientLine = Schemas["OrientLine"];
type OrientSource = Schemas["OrientSource"];

const NOW = new Date("2026-11-04T12:00:00Z");
const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3600_000).toISOString();

const retention = (line: string | null, source: string): Retention => ({
  contract: "c",
  source,
  procedure: "p",
  line,
  emitted: false,
  given: null,
  slotIn: null,
  url: null,
  maxBytes: null,
  provider: null,
});
const source = (id: string, lines: (string | null)[]): LogicalSource => ({ id, contracts: ["c"], retainedBy: lines.map((l) => retention(l, id)), selectedBy: [] });
const line = (name: string, enablement: NonNullable<OrientLine["enablement"]>): OrientLine => ({
  line: `Line:${name}`,
  lifecycle: "live",
  procedure: "Procedure:p",
  authority: "settle",
  trigger: "cron",
  enablement,
});
const landing = (id: string, landedAt: string, by?: string): OrientSource => ({
  logical_source: id,
  landings: 1,
  latest: { landed_at: landedAt, run: "RUN-1", ...(by ? { line: `Line:${by}` } : {}), capture: "CAP-1", ref: "Capture:sha256:1" },
  contracts: [],
});

describe("freshMark", () => {
  it("is fresh within one interval, late past one, stale past two, with a little grace", () => {
    const day = 86_400;
    expect(freshMark(day * 0.5, day)).toBe("fresh");
    expect(freshMark(day + 600, day)).toBe("fresh"); // within the hour of grace
    expect(freshMark(day * 1.5, day)).toBe("late");
    expect(freshMark(day * 2.5, day)).toBe("stale");
    expect(freshMark(null, day)).toBe("stale");
    expect(freshMark(10, null)).toBe("unscheduled");
  });
});

describe("cronInterval", () => {
  it("reads a cron's longest gap between fires", () => {
    expect(cronInterval("0 6 * * *", NOW)).toBe(86_400);
    expect(cronInterval("*/15 * * * *", NOW)).toBe(900);
    // weekdays only: the weekend gap is the interval a source may go without landing
    expect(cronInterval("0 6 * * 1-5", NOW)).toBe(3 * 86_400);
    expect(cronInterval("not a cron", NOW)).toBeNull();
  });
});

describe("intervalWords", () => {
  it("says an interval short", () => {
    expect(intervalWords(30)).toBe("30s");
    expect(intervalWords(900)).toBe("15m");
    expect(intervalWords(6 * 3600)).toBe("6h");
    expect(intervalWords(36 * 3600)).toBe("36h");
    expect(intervalWords(86_400)).toBe("1d");
    expect(intervalWords(7 * 86_400)).toBe("7d");
  });
});

describe("sourceFreshness", () => {
  const fires: Record<string, string[]> = {
    kev: ["on cron 0 6 * * * (UTC)"],
    epss: ["every 3600s"],
    triage: ["when CaptureContract:kev-catalog from cisa.kev lands"],
    gen: ["when a new generation is accepted"],
  };
  const triggersOf = (name: string) => fires[name];

  it("marks each source against its enabled Lines' Triggers", () => {
    const rows = sourceFreshness({
      sources: [source("cisa.kev", ["kev"]), source("first.epss", ["epss"]), source("vendor", ["off"]), source("osv", ["triage"]), source("ledger", ["gen"])],
      landings: [landing("cisa.kev", hoursAgo(30), "kev"), landing("first.epss", hoursAgo(0.5), "epss"), landing("vendor", hoursAgo(400)), landing("osv", hoursAgo(60), "triage")],
      lines: [line("kev", "running"), line("epss", "stopped"), line("off", "disabled"), line("triage", "running"), line("gen", "running")],
      triggersOf,
      now: NOW,
    });
    const by = new Map(rows.map((r) => [r.source, r]));
    expect(by.get("cisa.kev")).toMatchObject({ interval: 86_400, mark: "late", lines: ["kev"] });
    // a stopped Line still counts: its source going late is the point
    expect(by.get("first.epss")).toMatchObject({ interval: 3600, mark: "fresh" });
    // no enabled Trigger feeds it
    expect(by.get("vendor")).toMatchObject({ interval: null, mark: "by_hand" });
    // a landing Trigger inherits the interval of the source it waits on
    expect(by.get("osv")).toMatchObject({ interval: 86_400, mark: "stale" });
    // fed, on no fixed interval; never landed
    expect(by.get("ledger")).toMatchObject({ interval: null, mark: "unscheduled", landing: null, age: null });
  });

  it("waits for a feeding Line's card, and lists the Line that last landed a source", () => {
    const rows = sourceFreshness({
      sources: [],
      landings: [landing("cisa.kev", hoursAgo(1), "kev")],
      lines: [line("kev", "running")],
      triggersOf: () => undefined,
      now: NOW,
    });
    expect(rows).toEqual([expect.objectContaining({ source: "cisa.kev", lines: ["kev"], mark: null })]);
  });

  it("breaks a landing cycle instead of looping", () => {
    const rows = sourceFreshness({
      sources: [source("a", ["la"]), source("b", ["lb"])],
      landings: [],
      lines: [line("la", "running"), line("lb", "running")],
      triggersOf: (name) => (name === "la" ? ["when CaptureContract:c from b lands"] : ["when CaptureContract:c from a lands"]),
      now: NOW,
    });
    expect(rows.map((r) => r.mark)).toEqual(["unscheduled", "unscheduled"]);
  });
});

const predicate = (predicate: string, kinds: string[], extra: Record<string, unknown> = {}): OrientPredicate =>
  ({ name: predicate.split(".").pop()!, predicate, cardinality: "one", type: "string", subject_kinds: kinds, ...extra }) as OrientPredicate;

describe("staleByKind / evidenceByKind", () => {
  it("is null while the daemon serves neither field", () => {
    const rows = [predicate("v.kev_listed", ["v"], { stale_after: "1d" })];
    expect(staleByKind(rows)).toBeNull();
    expect(evidenceByKind(rows)).toBeNull();
  });

  it("sums each kind's ClaimTypes, reading the fields defensively", () => {
    const rows = [
      predicate("v.kev_listed", ["v"], { stale_after: "1d", stale_count: 2, evidence_counts: { admitted: 2, own_word: 0, unmet: 1 } }),
      predicate("v.epss", ["v"], { stale_after: "7d", stale_count: "x", evidence_counts: { admitted: 4 } }),
      predicate("v.cve_id", ["v"], { stale_count: null, evidence_counts: null }),
      predicate("a.status", ["a"], { stale_after: "7d", stale_count: 0, evidence_counts: { admitted: 0, own_word: 3, unmet: 0 } }),
      predicate("semantic.alias", ["semantic.subject"], { stale_after: "1d", stale_count: 9, evidence_counts: { admitted: 9, own_word: 0, unmet: 0 } }),
    ];
    const keep = (kind: string) => !kind.startsWith("semantic.");
    expect(staleByKind(rows, keep)).toEqual([
      {
        kind: "v",
        stale: 2,
        claimTypes: [
          { predicate: "v.kev_listed", name: "kev_listed", staleAfter: "1d", stale: 2 },
          { predicate: "v.epss", name: "epss", staleAfter: "7d", stale: null },
        ],
      },
      { kind: "a", stale: 0, claimTypes: [{ predicate: "a.status", name: "status", staleAfter: "7d", stale: 0 }] },
    ]);
    expect(evidenceByKind(rows, keep)).toEqual([
      { kind: "v", admitted: 6, own_word: 0, unmet: 1 },
      { kind: "a", admitted: 0, own_word: 3, unmet: 0 },
    ]);
  });
});

const sinceRow = (generation: number, path: string, disposition: SinceRow["disposition"], subject?: string, kind = "claim"): SinceRow => ({
  generation,
  changeset_digest: "sha256:" + "c".repeat(64),
  candidate_digest: "sha256:" + "d".repeat(64),
  member_path: path,
  artifact_kind: kind,
  disposition,
  artifact_digest: "sha256:" + "a".repeat(64),
  predecessor_artifact_digest: null,
  ...(subject ? { statement: { claim: path, subject, field: "f", value: 1 } } : {}),
});

describe("sinceSummary", () => {
  it("counts each Claim once by what it amounts to over the window", () => {
    const summary = sinceSummary([
      sinceRow(8, "c1", "create", "v/1"),
      sinceRow(9, "c1", "replace", "v/1"), // created then revised: new
      sinceRow(9, "c2", "replace", "v/2"),
      sinceRow(10, "c2", "replace", "v/2"), // revised twice: once
      sinceRow(10, "c3", "retire", "a/1"),
      sinceRow(9, "c4", "create", "a/2"),
      sinceRow(10, "c4", "retire", "a/2"), // created and retired in the window: nothing
      sinceRow(10, "subjects/v/1.json", "create", undefined, "subject"),
    ]);
    expect(summary).toMatchObject({ created: 1, revised: 1, retired: 1 });
    expect(summary.byKind).toEqual([
      { kind: "a", created: 0, revised: 0, retired: 1 },
      { kind: "v", created: 1, revised: 1, retired: 0 },
    ]);
  });
});

describe("sinceWindow", () => {
  const generations = [
    { sequence: 10, members: 30 },
    { sequence: 9, members: 34 },
    { sequence: 8, members: 8 },
    { sequence: 7, members: 400 },
    { sequence: 6, members: 8 },
  ];

  it("reads from the mark when the generations after it fit one read", () => {
    expect(sinceWindow(generations, 10, 8)).toBe(8);
  });

  it("stops at the read's budget, at least the newest generation", () => {
    expect(sinceWindow(generations, 10, 3)).toBe(7);
    expect(sinceWindow([{ sequence: 4, members: 5000 }, { sequence: 3, members: 1 }], 4, 1)).toBe(3);
  });

  it("stops at a gap in the page", () => {
    expect(sinceWindow([{ sequence: 42, members: 1 }, { sequence: 41, members: 14 }, { sequence: 0, members: 0 }], 42, 10)).toBe(40);
  });
});

/** jsdom here has no working localStorage: an in-memory one. */
function memoryStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (i) => [...items.keys()][i] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, String(value)),
  };
}

describe("seen mark", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.unstubAllGlobals());

  it("reads nothing, and writes nothing, where storage is unavailable", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    expect(() => writeSeen("inst_a", { generation: 1, at: "2026-11-04T10:00:00Z" })).not.toThrow();
    expect(readSeen("inst_a")).toBeNull();
  });

  it("round-trips per instance and ignores a malformed value", () => {
    expect(readSeen("inst_a")).toBeNull();
    writeSeen("inst_a", { generation: 9, at: "2026-11-04T10:00:00Z" });
    expect(readSeen("inst_a")).toEqual({ generation: 9, at: "2026-11-04T10:00:00Z" });
    expect(readSeen("inst_b")).toBeNull();
    localStorage.setItem("cruxible.dashboard.seen:inst_b", "{not json");
    expect(readSeen("inst_b")).toBeNull();
  });
});
