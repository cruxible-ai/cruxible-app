import { describe, expect, it } from "vitest";
import type { OrientPredicate, Schemas } from "@/api/schemas";
import type { LineDefinition, ProcedureSpec } from "./definitions";
import {
  bubbleRadius,
  edgeLabel,
  evidenceFlow,
  evidenceMix,
  firstAccepted,
  freshness,
  growthMarkers,
  growthSequences,
  kindClaimTypes,
  layoutFlow,
  layoutKnowledgeMap,
  liveClaims,
  stackGrowth,
  placeEdgeLabels,
  textBox,
} from "./overview";

const V = "security.vulnerability";
const C = "security.catalog";
const A = "security.assessment";

const p = (predicate: string, live: number, extra: Partial<OrientPredicate> = {}): OrientPredicate => ({
  name: predicate.split(".").at(-1)!,
  predicate,
  cardinality: "one",
  type: "string",
  live_claims: live,
  ...extra,
});

const spec = (procedure: string, sources: string[], writes: { kind: string; types: string[]; create?: boolean }[]) =>
  ({
    procedure,
    slots: {},
    steps: [
      ...sources.map((source, i) => ({ call: `read${i}`, slot: "fetch", input: { logical_source: source }, captures: { capture: "c" } })),
      ...writes.map((w) => ({
        claims: w.types.map((type) => ({ type, value: { $ref: "item", path: [] } })),
        for_each: { $ref: "step", step: "read0", path: [] },
        subject: { kind: w.kind, key: {}, create: w.create ? "if_absent" : "never" },
      })),
    ],
  }) as unknown as ProcedureSpec;

const line = (name: string, procedure: string, maxAuthority = "settle"): LineDefinition => ({
  line: name,
  procedure,
  parameters: {},
  triggerInput: null,
  triggerContract: null,
  bindings: {},
  maxAuthority,
  occurrenceEpoch: null,
});

describe("knowledge map", () => {
  it("lists a kind's ClaimTypes most Claims first, identity keys and core identity aside", () => {
    const rows = [p(`${V}.cve_id`, 10), p(`${V}.epss_score`, 10), p(`${V}.kev_date_added`, 8), p(`${V}.listed_in`, 10), p("semantic.subject.name", 99)];
    expect(kindClaimTypes(rows, new Set([`${V}.cve_id`])).map((c) => [c.name, c.claims])).toEqual([
      ["epss_score", 10],
      ["listed_in", 10],
      ["kev_date_added", 8],
    ]);
    expect(liveClaims(rows)).toBe(38);
  });

  it("labels an arrow by the fields that say more than the arrow, many marked", () => {
    expect(edgeLabel({ target: C, predicates: [p(`${V}.listed_in`, 0, { cardinality: "many" })] })).toBe("listed_in *");
    expect(edgeLabel({ target: "ops.team", predicates: [p("ops.service.team", 0)] })).toBe("");
    expect(edgeLabel({ target: "ops.team", predicates: [p("ops.service.owner", 0), p("ops.service.team", 0)] })).toBe("owner");
  });

  it("sizes bubbles by area between a floor and a ceiling", () => {
    expect(bubbleRadius(100, 100)).toBe(64);
    expect(bubbleRadius(25, 100)).toBe(18 + 46 * 0.5);
    expect(bubbleRadius(0, 100)).toBeLessThan(18);
  });

  it("places every kind inside the box, the same way every time, without overlaps", () => {
    const nodes = Array.from({ length: 10 }, (_, i) => ({ kind: `k${i}`, r: 20 + i * 3 }));
    const edges = nodes.slice(1).map((n, i) => ({ source: n.kind, target: nodes[i % 3]!.kind }));
    const a = layoutKnowledgeMap(nodes, edges, 700, 600);
    expect(layoutKnowledgeMap(nodes, edges, 700, 600)).toEqual(a);
    for (const { x, y, r } of a.values()) {
      expect(x - r).toBeGreaterThanOrEqual(0);
      expect(x + r).toBeLessThanOrEqual(700);
      expect(y - r).toBeGreaterThanOrEqual(0);
      expect(y + r).toBeLessThanOrEqual(600);
    }
    const placed = [...a.values()];
    for (let i = 0; i < placed.length; i += 1)
      for (let j = i + 1; j < placed.length; j += 1)
        expect(Math.hypot(placed[i]!.x - placed[j]!.x, placed[i]!.y - placed[j]!.y)).toBeGreaterThan(placed[i]!.r + placed[j]!.r);
  });
});

describe("evidence flow", () => {
  // The pilot: kev-triage reads the KEV catalog and writes three ClaimTypes; epss-triage reads EPSS and writes two;
  // nobody writes cve_id (a key; no Line creates vulnerabilities) or the catalog's id.
  const specs = new Map([
    ["kev", spec("kev", ["cisa.kev.catalog"], [{ kind: V, types: [`${V}.kev_date_added`, `${V}.listed_in`] }])],
    ["epss", spec("epss", ["first.epss.api"], [{ kind: V, types: [`${V}.epss_score`] }])],
    ["assess", spec("assess", ["osv.query", "nvd.feed"], [{ kind: A, types: [`${A}.status`], create: true }])],
    ["watch", spec("watch", ["datadog"], [{ kind: A, types: [`${A}.note`] }])],
    ["again", spec("again", [], [{ kind: V, types: [`${V}.epss_score`] }])],
  ]);
  const kinds = [
    { kind: V, predicates: [p(`${V}.cve_id`, 10), p(`${V}.kev_date_added`, 8), p(`${V}.listed_in`, 10), p(`${V}.epss_score`, 10)] },
    { kind: C, predicates: [p(`${C}.catalog_id`, 1)] },
    { kind: A, predicates: [p(`${A}.id`, 4), p(`${A}.status`, 4), p(`${A}.note`, 2)] },
  ];
  const keys = new Map([
    [V, new Set([`${V}.cve_id`])],
    [C, new Set([`${C}.catalog_id`])],
    [A, new Set([`${A}.id`])],
  ]);
  const flow = evidenceFlow({
    specs,
    lines: [line("kev-triage", "kev"), line("epss-triage", "epss"), line("assess", "assess", "propose"), line("watcher", "watch", "observe"), line("again", "again")],
    sources: ["cisa.kev.catalog", "first.epss.api", "osv.query", "nvd.feed", "datadog", "unread"],
    kinds,
    keys,
  });
  const value = (source: string, target: string) => flow.links.find((l) => l.source === source && l.target === target)?.value;

  it("attributes each ClaimType's live Claims to the Lines that write it, else to direct entry", () => {
    expect(value("line:kev-triage", `kind:${V}`)).toBe(18);
    // two Lines write epss_score: each carries half
    expect(value("line:epss-triage", `kind:${V}`)).toBe(5);
    expect(value("line:again", `kind:${V}`)).toBe(5);
    // a key no creating Line writes is entered directly; so is a ClaimType only an observe Line names
    expect(value("direct", `kind:${V}`)).toBe(10);
    expect(value("direct", `kind:${C}`)).toBe(1);
    expect(value("direct", `kind:${A}`)).toBe(2);
    // the key of a kind a Line creates goes to that Line
    expect(value("line:assess", `kind:${A}`)).toBe(8);
    expect(flow.links.find((l) => l.source === "direct" && l.target === `kind:${V}`)!.claimTypes).toEqual([`${V}.cve_id`]);
  });

  it("splits a Line's Claims over the sources it reads", () => {
    expect(value("source:cisa.kev.catalog", "line:kev-triage")).toBe(18);
    expect(value("source:osv.query", "line:assess")).toBe(4);
    expect(value("source:nvd.feed", "line:assess")).toBe(4);
  });

  it("keeps every source, the Lines that read or write, Entered directly once, and the kinds reached", () => {
    const ids = flow.nodes.map((n) => n.id);
    expect(ids.filter((id) => id.startsWith("source:"))).toHaveLength(6);
    // the observe Line writes nothing but reads a source: it stays, with no band out
    expect(ids).toContain("line:watcher");
    expect(ids.filter((id) => id === "direct")).toHaveLength(1);
    expect(ids.filter((id) => id.startsWith("kind:")).sort()).toEqual([`kind:${A}`, `kind:${C}`, `kind:${V}`]);
  });

  it("lays out three columns on one scale, inside the box, bands as closed outlines", () => {
    const { nodes, links } = layoutFlow(flow, { width: 600, height: 400 });
    expect(new Set(nodes.filter((n) => n.role === "source").map((n) => n.x))).toEqual(new Set([0]));
    expect(new Set(nodes.filter((n) => n.role === "kind").map((n) => n.x))).toEqual(new Set([588]));
    for (const n of nodes) {
      expect(n.y).toBeGreaterThanOrEqual(0);
      expect(n.y + n.height).toBeLessThanOrEqual(400.01);
    }
    // the biggest kind leads its column; Entered directly closes the Lines column
    expect(nodes.filter((n) => n.column === 2).sort((a, b) => a.y - b.y)[0]!.name).toBe(V);
    expect(nodes.filter((n) => n.column === 1).sort((a, b) => a.y - b.y).at(-1)!.role).toBe("direct");
    const kind = nodes.find((n) => n.id === `kind:${V}`)!;
    const line18 = nodes.find((n) => n.id === "line:kev-triage")!;
    expect(kind.height / kind.value).toBeCloseTo(line18.height / line18.value);
    for (const l of links) expect(l.path).toMatch(/^M.*Z$/);
  });

  it("bands a source's freshness by when it last landed", () => {
    const now = new Date("2026-11-04T12:00:00Z");
    expect(freshness("2026-11-04T01:00:00Z", now)).toBe("fresh");
    expect(freshness("2026-11-01T12:00:00Z", now)).toBe("aging");
    expect(freshness("2026-10-01T12:00:00Z", now)).toBe("stale");
    expect(freshness(null, now)).toBe("never");
  });
});

describe("evidence mix", () => {
  it("splits a kind's live Claims by each ClaimType's evidence rule (orient omits self)", () => {
    const mix = evidenceMix([
      p(`${V}.cve_id`, 10),
      p(`${V}.epss_score`, 10, { evidence_requirement: "captured" }),
      p(`${V}.note`, 3, { evidence_requirement: "none" }),
      p(`${V}.empty`, 0, { evidence_requirement: "captured" }),
    ]);
    expect(mix.parts).toEqual({ captured: 10, ownWords: 10, none: 3 });
    expect(mix.total).toBe(23);
    expect(mix.claimTypes.captured).toEqual([`${V}.epss_score`]);
  });
});

describe("growth", () => {
  it("reads every generation of a short window, else evenly spaced ones with both ends", () => {
    expect(growthSequences(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const wide = growthSequences(191, 240);
    expect(wide).toHaveLength(12);
    expect(wide[0]).toBe(191);
    expect(wide.at(-1)).toBe(240);
    expect(growthSequences(5, 4)).toEqual([]);
  });

  it("stacks live Claims by kind, the largest at the bottom", () => {
    const { layers, max } = stackGrowth([
      { sequence: 7, acceptedAt: null, byKind: new Map([[C, 1], [V, 10]]) },
      { sequence: 9, acceptedAt: null, byKind: new Map([[C, 1], [V, 44]]) },
    ]);
    expect(layers.map((l) => l.kind)).toEqual([V, C]);
    expect(layers[1]!.values).toEqual([
      [10, 11],
      [44, 45],
    ]);
    expect(max).toBe(45);
  });

  const generation = (sequence: number, because: string | null): Schemas["OrientGeneration"] => ({
    sequence,
    git_oid: String(sequence).repeat(40).slice(0, 40),
    proposed_at: `2026-11-03T00:00:${String(sequence).padStart(2, "0")}Z`,
    because,
    members: sequence,
  });

  it("marks the generations a Line's run or a kit change landed", () => {
    const rows = [
      generation(10, "Proposed by Procedure security.epss-triage run RUN-8a5d terminal settle\n30 items; each item's reason is recorded with the Claim or Subject it explains."),
      generation(9, "Upgrade kit security from 1.2.0 to 1.3.0."),
      generation(8, "Adopt the KEV and EPSS Lines."),
      generation(3, "Install kit security 1.2.0."),
      generation(0, null),
    ];
    expect(growthMarkers(rows, 4, 10)).toEqual([
      { kind: "kit", sequence: 9, acceptedAt: rows[1]!.proposed_at, words: "Upgrade kit security from 1.2.0 to 1.3.0", members: 9 },
      { kind: "run", sequence: 10, acceptedAt: rows[0]!.proposed_at, procedure: "security.epss-triage", run: "RUN-8a5d", members: 10 },
    ]);
    expect(firstAccepted(rows)).toBe(rows[4]!.proposed_at);
    expect(firstAccepted(rows.slice(0, 3))).toBeNull();
  });
});

describe("knowledge map edge labels", () => {
  it("takes the first candidate clear of obstacles and earlier labels, and drops a label with none", () => {
    const bubble = { x0: 90, y0: 90, x1: 110, y1: 110 };
    const placed = placeEdgeLabels(
      [
        // its middle sits on the bubble: the next candidate is taken
        { id: "a", text: "rests_on", candidates: [{ x: 100, y: 100 }, { x: 100, y: 140 }] },
        // its only spot is where "a" went: dropped
        { id: "b", text: "found_in", candidates: [{ x: 100, y: 140 }] },
        { id: "c", text: "holds", candidates: [{ x: 300, y: 300 }] },
      ],
      [bubble],
      11,
    );
    expect(placed.get("a")).toEqual({ x: 100, y: 140 });
    expect(placed.has("b")).toBe(false);
    expect(placed.get("c")).toEqual({ x: 300, y: 300 });
  });

  it("sizes a mono label by its characters, centered on x", () => {
    const box = textBox(100, 50, "abcd", 10);
    expect(box.x1 - box.x0).toBeCloseTo(24);
    expect((box.x0 + box.x1) / 2).toBe(100);
  });
});

