// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, type SimulationNodeDatum } from "d3-force";
import type { OrientPredicate, Schemas } from "../api/schemas.ts";
import { lineFlows, type LineDefinition, type ProcedureSpec } from "./definitions.ts";
import { createdKinds } from "./template.ts";
import { evidenceMode, isCoreIdentity } from "./ontology.ts";
import type { TypeGraphEdge } from "./type-graph.ts";

/**
 * The Overview's models: a snapshot of the instance drawn from list and
 * aggregate reads only (orient's kinds, one orient(kind=K) per kind, the
 * claim_types and subject_kinds sections, definitions, the sources section,
 * the generations page and a few sampled generations). Nothing here grows
 * per Subject or per Claim. Layouts are pure, so the charts render the same
 * on every load.
 */

type Generation = Schemas["OrientGeneration"];

/** A ClaimType of a kind with its live count (orient kind=K). */
export interface KindClaimType {
  predicate: string;
  /** The short field name (`epss_score`). */
  name: string;
  claims: number;
}

// -- what it knows: the knowledge map -----------------------------------------------

/** A ClaimType's field name: the last segment of its name. */
const fieldName = (p: Pick<OrientPredicate, "name">) => p.name.split(".").at(-1) ?? p.name;

/**
 * An edge's label, as the Type map writes it: a field named after the kind it
 * points at is the arrow itself (only its many mark stays); others keep their
 * name, `*` marking many.
 */
export function edgeLabel(edge: Pick<TypeGraphEdge, "target" | "predicates">): string {
  const target = edge.target.split(".").at(-1) ?? edge.target;
  const parts = edge.predicates.flatMap((p) => {
    const name = fieldName(p);
    const many = p.cardinality === "many";
    if (name === target || name === `${target}s`) return many ? ["*"] : [];
    return [`${name}${many ? " *" : ""}`];
  });
  return [...new Set(parts)].join(" · ");
}

/** A kind's ClaimTypes with their live counts, identity keys aside, most Claims first (then by name). */
export function kindClaimTypes(predicates: readonly OrientPredicate[], keys: ReadonlySet<string> = new Set()): KindClaimType[] {
  return predicates
    .filter((p) => !isCoreIdentity(p.predicate) && !keys.has(p.predicate))
    .map((p) => ({ predicate: p.predicate, name: fieldName(p), claims: p.live_claims ?? 0 }))
    .sort((a, b) => b.claims - a.claims || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

/** Live Claims of a kind: the sum over its ClaimTypes (identity keys included). */
export const liveClaims = (predicates: readonly OrientPredicate[]) =>
  predicates.reduce((total, p) => total + (isCoreIdentity(p.predicate) ? 0 : (p.live_claims ?? 0)), 0);

export interface MapPlacement {
  x: number;
  y: number;
  r: number;
}

/** A bubble's radius: its area follows the Subject count, between a floor and a ceiling. */
export function bubbleRadius(subjects: number, most: number, { min = 18, max = 64 }: { min?: number; max?: number } = {}): number {
  if (subjects <= 0 || most <= 0) return min * 0.75;
  return min + (max - min) * Math.sqrt(subjects / most);
}

interface ForceNode extends SimulationNodeDatum {
  id: string;
  r: number;
}

const idOf = (end: string | ForceNode) => (typeof end === "string" ? end : end.id);

/**
 * Places the bubbles with a force layout run to rest (no animation): linked
 * kinds pull together, every bubble keeps room for its label underneath, and
 * the result is centered in `width` × `height`, scaled down only when it
 * would not fit. Deterministic: d3 seeds its nodes on a fixed spiral.
 */
export function layoutKnowledgeMap(
  nodes: readonly { kind: string; r: number }[],
  edges: readonly { source: string; target: string }[],
  width: number,
  height: number,
  { label = 40, labelWidth = 140, pad = 14 }: { label?: number; labelWidth?: number; pad?: number } = {},
): Map<string, MapPlacement> {
  const out = new Map<string, MapPlacement>();
  if (nodes.length === 0) return out;
  const sim: ForceNode[] = nodes.map((n) => ({ id: n.kind, r: n.r }));
  const ids = new Set(sim.map((n) => n.id));
  const links = edges
    .filter((e) => e.source !== e.target && ids.has(e.source) && ids.has(e.target))
    .map((e) => ({ source: e.source, target: e.target }));
  const radius = new Map(sim.map((n) => [n.id, n.r]));
  const aspect = Math.max(1, width / Math.max(1, height));
  const simulation = forceSimulation(sim)
    .force("charge", forceManyBody<ForceNode>().strength((d) => -120 - d.r * 8))
    .force(
      "link",
      forceLink<ForceNode, { source: string | ForceNode; target: string | ForceNode }>(links)
        .id((d) => d.id)
        .distance((l) => (radius.get(idOf(l.source)) ?? 0) + (radius.get(idOf(l.target)) ?? 0) + 150)
        .strength(0.5),
    )
    .force("collide", forceCollide<ForceNode>((d) => Math.max(d.r, labelWidth / 2) + label / 2).iterations(3))
    // A wide canvas pulls harder on y, so the map spreads along the width.
    .force("x", forceX<ForceNode>(0).strength(0.05))
    .force("y", forceY<ForceNode>(0).strength(0.05 * aspect))
    .stop();
  for (let i = 0; i < 300; i += 1) simulation.tick();

  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  for (const n of sim) {
    const half = Math.max(n.r, labelWidth / 2);
    x0 = Math.min(x0, (n.x ?? 0) - half);
    x1 = Math.max(x1, (n.x ?? 0) + half);
    y0 = Math.min(y0, (n.y ?? 0) - n.r);
    y1 = Math.max(y1, (n.y ?? 0) + n.r + label);
  }
  const scale = Math.min(1, (width - 2 * pad) / Math.max(1, x1 - x0), (height - 2 * pad) / Math.max(1, y1 - y0));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  for (const n of sim) {
    out.set(n.id, {
      x: width / 2 + ((n.x ?? 0) - cx) * scale,
      y: height / 2 + ((n.y ?? 0) - cy) * scale,
      r: Math.max(8, n.r * scale),
    });
  }
  return out;
}

/** The map's height for `n` kinds: room to breathe for a few, more rows for many. */
/** An axis-aligned box on the map (labels, bubbles), in SVG units. */
export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/** A mono text box: centered on x, baseline at y (glyphs 0.6em wide, cap height above the baseline). */
export function textBox(x: number, y: number, text: string, fontSize: number): Box {
  const half = (text.length * fontSize * 0.6) / 2;
  return { x0: x - half, y0: y - fontSize * 0.8, x1: x + half, y1: y + fontSize * 0.25 };
}

/**
 * Edge labels placed where they collide with nothing: each label takes the
 * first of its candidate positions (along its arrow, above then below) whose
 * box clears every obstacle (bubbles, kind names) and every label placed
 * before it; a label with no clear spot is dropped (the arrow's tooltip still
 * names it). Labels are tried in the order given.
 */
export function placeEdgeLabels(
  labels: readonly { id: string; text: string; candidates: readonly { x: number; y: number }[] }[],
  obstacles: readonly Box[],
  fontSize: number,
): Map<string, { x: number; y: number }> {
  const placed = new Map<string, { x: number; y: number }>();
  const taken: Box[] = [...obstacles];
  for (const label of labels) {
    for (const at of label.candidates) {
      const box = textBox(at.x, at.y, label.text, fontSize);
      if (taken.some((other) => overlaps(box, other))) continue;
      placed.set(label.id, at);
      taken.push(box);
      break;
    }
  }
  return placed;
}

export const mapHeight = (n: number) => Math.round(Math.min(620, Math.max(340, 200 + 44 * n)));

// -- where it comes from: the evidence flow -------------------------------------------

export type FlowColumn = 0 | 1 | 2;

export interface FlowNode {
  /** `source:<id>`, `line:<name>`, `direct`, `kind:<kind>`. */
  id: string;
  role: "source" | "line" | "direct" | "kind";
  column: FlowColumn;
  /** The source id, Line name or kind; "" for direct entry. */
  name: string;
}

export interface FlowLink {
  source: string;
  target: string;
  /** Live Claims carried (fractional where Lines share a ClaimType). */
  value: number;
  /** The ClaimTypes the band carries (Line → kind and direct → kind bands). */
  claimTypes: string[];
}

export interface EvidenceFlow {
  nodes: FlowNode[];
  links: FlowLink[];
}

/**
 * The evidence chain as a flow: sources → the Lines that read them → the
 * kinds whose Claims those Lines write, plus Entered directly → kind for the
 * Claims no Line writes. A band's width is live Claims, attributed from
 * definitions: a ClaimType's live Claims go to the Lines whose claims steps
 * write it (split evenly when several do; an identity key goes to the Lines
 * that create the kind's Subjects), else to Entered directly. A Line's
 * Claims are split evenly over the sources it reads. Lines capped at observe
 * write nothing; a Line shows when it writes or reads something.
 */
export function evidenceFlow({
  specs,
  lines,
  sources,
  kinds,
  keys,
}: {
  specs: ReadonlyMap<string, ProcedureSpec>;
  lines: readonly LineDefinition[];
  /** Every logical source (definitions and landings). */
  sources: readonly string[];
  /** Each kind with its ClaimTypes' live counts (orient kind=K). */
  kinds: readonly { kind: string; predicates: readonly OrientPredicate[] }[];
  /** Each kind's identity-key ClaimTypes. */
  keys: ReadonlyMap<string, ReadonlySet<string>>;
}): EvidenceFlow {
  const flows = lineFlows(specs, lines);
  const writing = new Set(lines.filter((line) => line.maxAuthority !== "observe").map((line) => line.line));
  const writers = new Map<string, string[]>();
  for (const flow of flows) {
    if (!writing.has(flow.line)) continue;
    for (const predicate of flow.writes) writers.set(predicate, [...(writers.get(predicate) ?? []), flow.line]);
  }
  const creators = new Map<string, string[]>();
  for (const line of lines) {
    if (!writing.has(line.line)) continue;
    for (const step of specs.get(line.procedure)?.steps ?? []) {
      for (const kind of createdKinds(step)) {
        const list = creators.get(kind) ?? [];
        if (!list.includes(line.line)) creators.set(kind, [...list, line.line]);
      }
    }
  }

  const links = new Map<string, FlowLink>();
  const add = (source: string, target: string, value: number, claimType?: string) => {
    if (value <= 0) return;
    const id = `${source}\n${target}`;
    const link = links.get(id) ?? { source, target, value: 0, claimTypes: [] };
    link.value += value;
    if (claimType && !link.claimTypes.includes(claimType)) link.claimTypes.push(claimType);
    links.set(id, link);
  };
  const lineOut = new Map<string, number>();
  for (const { kind, predicates } of kinds) {
    const kindKeys = keys.get(kind) ?? new Set<string>();
    for (const p of predicates) {
      if (isCoreIdentity(p.predicate)) continue;
      const claims = p.live_claims ?? 0;
      if (claims <= 0) continue;
      let by = writers.get(p.predicate) ?? [];
      if (by.length === 0 && kindKeys.has(p.predicate)) by = creators.get(kind) ?? [];
      if (by.length === 0) {
        add("direct", `kind:${kind}`, claims, p.predicate);
        continue;
      }
      for (const line of by) {
        add(`line:${line}`, `kind:${kind}`, claims / by.length, p.predicate);
        lineOut.set(line, (lineOut.get(line) ?? 0) + claims / by.length);
      }
    }
  }
  const sourceSet = new Set(sources);
  const reads = new Map(flows.map((flow) => [flow.line, flow.sources.filter((s) => sourceSet.has(s))]));
  for (const [line, read] of reads) {
    const total = lineOut.get(line) ?? 0;
    for (const source of read) add(`source:${source}`, `line:${line}`, total / read.length);
  }

  const all = [...links.values()];
  const nodes: FlowNode[] = [
    ...[...sourceSet].sort().map((s): FlowNode => ({ id: `source:${s}`, role: "source", column: 0, name: s })),
    ...flows
      .filter((flow) => (lineOut.get(flow.line) ?? 0) > 0 || (reads.get(flow.line) ?? []).length > 0)
      .map((flow): FlowNode => ({ id: `line:${flow.line}`, role: "line", column: 1, name: flow.line })),
    ...(all.some((l) => l.source === "direct") ? [{ id: "direct", role: "direct", column: 1, name: "" } satisfies FlowNode] : []),
    ...kinds
      .filter((k) => all.some((l) => l.target === `kind:${k.kind}`))
      .map((k): FlowNode => ({ id: `kind:${k.kind}`, role: "kind", column: 2, name: k.kind })),
  ];
  return { nodes, links: all };
}

export interface PlacedFlowNode extends FlowNode {
  x: number;
  y: number;
  height: number;
  /** max(in, out). */
  value: number;
}

export interface PlacedFlowLink extends FlowLink {
  /** The band's outline: a closed path between the two nodes. */
  path: string;
  /** Band thickness. */
  width: number;
  /** The band's middle where it leaves and where it arrives. */
  y0: number;
  y1: number;
}

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * A three-column Sankey layout: node height follows max(in, out), the columns
 * share one vertical scale, nodes order to cut crossings (kinds by size, Lines
 * by the kinds they feed, sources by the Lines that read them, Entered
 * directly last), and each band is a closed curved outline.
 */
export function layoutFlow(
  flow: EvidenceFlow,
  {
    width,
    height,
    nodeWidth = 12,
    gap = 16,
    columns = [0, 0.5, 1],
    minHeight = 3,
  }: {
    width: number;
    height: number;
    nodeWidth?: number;
    gap?: number;
    /** Each column's x as a share of (width − nodeWidth). */
    columns?: readonly number[];
    minHeight?: number;
  },
): { nodes: PlacedFlowNode[]; links: PlacedFlowLink[] } {
  const into = new Map<string, number>();
  const out = new Map<string, number>();
  for (const link of flow.links) {
    out.set(link.source, (out.get(link.source) ?? 0) + link.value);
    into.set(link.target, (into.get(link.target) ?? 0) + link.value);
  }
  const valueOf = (id: string) => Math.max(into.get(id) ?? 0, out.get(id) ?? 0);
  const byColumn: FlowNode[][] = [[], [], []];
  for (const node of flow.nodes) byColumn[node.column]!.push(node);

  const rank = new Map<string, number>();
  const sortBy = (list: FlowNode[], key: (n: FlowNode) => number) =>
    list.sort((a, b) => key(a) - key(b) || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  /** The value-weighted mean rank of the nodes a node's bands reach. */
  const meanRank = (id: string) => {
    let total = 0;
    let weight = 0;
    for (const link of flow.links) {
      if (link.source !== id) continue;
      const other = rank.get(link.target);
      if (other === undefined) continue;
      total += other * link.value;
      weight += link.value;
    }
    return weight > 0 ? total / weight : Number.MAX_SAFE_INTEGER;
  };
  sortBy(byColumn[2]!, (n) => -valueOf(n.id)).forEach((n, i) => rank.set(n.id, i));
  sortBy(byColumn[1]!, (n) => (n.role === "direct" ? Number.MAX_VALUE : meanRank(n.id))).forEach((n, i) => rank.set(n.id, i));
  sortBy(byColumn[0]!, (n) => meanRank(n.id));

  const scales = byColumn
    .filter((list) => list.length > 0)
    .map((list) => {
      const total = list.reduce((sum, n) => sum + valueOf(n.id), 0);
      const room = Math.max(0, height - gap * (list.length - 1) - minHeight * list.length);
      return total > 0 ? room / total : Infinity;
    });
  const k = scales.length && Number.isFinite(Math.min(...scales)) ? Math.min(...scales) : 0;
  const placed = new Map<string, PlacedFlowNode>();
  byColumn.forEach((list, column) => {
    const heights = list.map((n) => Math.max(minHeight, valueOf(n.id) * k));
    const used = heights.reduce((a, b) => a + b, 0) + gap * Math.max(0, list.length - 1);
    let y = Math.max(0, (height - used) / 2);
    const x = (columns[column] ?? 0) * (width - nodeWidth);
    list.forEach((n, i) => {
      placed.set(n.id, { ...n, x, y, height: heights[i]!, value: valueOf(n.id) });
      y += heights[i]! + gap;
    });
  });

  // Each node stacks its bands in the order of the nodes at their other ends.
  const yOf = (id: string) => placed.get(id)?.y ?? 0;
  const ends = new Map<FlowLink, { s: number; t: number }>();
  const outOffset = new Map<string, number>();
  for (const link of [...flow.links].sort((a, b) => yOf(a.source) - yOf(b.source) || yOf(a.target) - yOf(b.target))) {
    const offset = outOffset.get(link.source) ?? 0;
    outOffset.set(link.source, offset + link.value * k);
    ends.set(link, { s: yOf(link.source) + offset, t: 0 });
  }
  const inOffset = new Map<string, number>();
  for (const link of [...flow.links].sort((a, b) => yOf(a.target) - yOf(b.target) || yOf(a.source) - yOf(b.source))) {
    const offset = inOffset.get(link.target) ?? 0;
    inOffset.set(link.target, offset + link.value * k);
    ends.get(link)!.t = yOf(link.target) + offset;
  }
  const links: PlacedFlowLink[] = flow.links.map((link) => {
    const s = placed.get(link.source)!;
    const t = placed.get(link.target)!;
    const w = Math.max(1, link.value * k);
    const { s: sy, t: ty } = ends.get(link)!;
    const x0 = s.x + nodeWidth;
    const x1 = t.x;
    const xm = (x0 + x1) / 2;
    const path =
      `M${round(x0)},${round(sy)}C${round(xm)},${round(sy)} ${round(xm)},${round(ty)} ${round(x1)},${round(ty)}` +
      `L${round(x1)},${round(ty + w)}C${round(xm)},${round(ty + w)} ${round(xm)},${round(sy + w)} ${round(x0)},${round(sy + w)}Z`;
    return { ...link, path, width: w, y0: sy + w / 2, y1: ty + w / 2 };
  });
  return { nodes: flow.nodes.map((n) => placed.get(n.id)!), links };
}

/** The flow's height for its tallest column. */
export const flowHeight = (flow: EvidenceFlow) => {
  const counts = [0, 0, 0];
  for (const node of flow.nodes) counts[node.column]! += 1;
  return Math.round(Math.min(760, Math.max(280, 40 + 56 * Math.max(...counts))));
};

export type Freshness = "fresh" | "aging" | "stale" | "never";

const DAY = 86_400_000;

/** When a source last landed, as a band: within a day, within a week, older, or never. */
export function freshness(landedAt: string | null | undefined, now: Date): Freshness {
  if (!landedAt) return "never";
  const at = new Date(landedAt).getTime();
  if (Number.isNaN(at)) return "never";
  const age = now.getTime() - at;
  if (age <= DAY) return "fresh";
  if (age <= 7 * DAY) return "aging";
  return "stale";
}

// -- how it stands: evidence composition ------------------------------------------

export type EvidencePart = "captured" | "ownWords" | "none";

export interface EvidenceMix {
  /** Live Claims per part: ClaimTypes that require captured evidence, let the author's own words stand, or take none. */
  parts: Record<EvidencePart, number>;
  total: number;
  /** The ClaimTypes (with Claims) behind each part. */
  claimTypes: Record<EvidencePart, string[]>;
}

/** A kind's live Claims split by each ClaimType's evidence rule. */
export function evidenceMix(predicates: readonly OrientPredicate[]): EvidenceMix {
  const mix: EvidenceMix = { parts: { captured: 0, ownWords: 0, none: 0 }, total: 0, claimTypes: { captured: [], ownWords: [], none: [] } };
  for (const p of predicates) {
    if (isCoreIdentity(p.predicate)) continue;
    const claims = p.live_claims ?? 0;
    const mode = evidenceMode(p);
    const part: EvidencePart = mode === "captured" ? "captured" : mode === "none" ? "none" : "ownWords";
    mix.parts[part] += claims;
    mix.total += claims;
    if (claims > 0) mix.claimTypes[part].push(p.predicate);
  }
  return mix;
}

// -- how it grew: live Claims by kind over generations ------------------------------

/** The newest generations the growth chart covers (inside the 64 the daemon retains). */
export const GROWTH_WINDOW = 50;
/** The most generations it reads, the page's own included. */
export const GROWTH_SAMPLES = 12;

/** Generation numbers to read: evenly spaced over [lo, head], both ends included, ascending. */
export function growthSequences(lo: number, head: number, samples: number = GROWTH_SAMPLES): number[] {
  if (head < lo) return [];
  const span = head - lo;
  if (span + 1 <= samples) return Array.from({ length: span + 1 }, (_, i) => lo + i);
  const out = new Set<number>();
  for (let i = 0; i < samples; i += 1) out.add(lo + Math.round((span * i) / (samples - 1)));
  return [...out].sort((a, b) => a - b);
}

export interface GrowthPoint {
  sequence: number;
  acceptedAt: string | null;
  /** Live Claims per kind at that generation. */
  byKind: ReadonlyMap<string, number>;
}

export interface GrowthLayer {
  kind: string;
  /** Per point: [bottom, top] of the stack. */
  values: [number, number][];
}

/** Stacks the points by kind: the largest kind (at the last point) at the bottom. */
export function stackGrowth(points: readonly GrowthPoint[]): { layers: GrowthLayer[]; max: number } {
  const kinds = new Set<string>();
  for (const point of points) for (const kind of point.byKind.keys()) kinds.add(kind);
  const last = points.at(-1);
  const order = [...kinds].sort((a, b) => (last?.byKind.get(b) ?? 0) - (last?.byKind.get(a) ?? 0) || (a < b ? -1 : 1));
  const base = points.map(() => 0);
  const layers = order.map((kind) => ({
    kind,
    values: points.map((point, i): [number, number] => {
      const bottom = base[i]!;
      base[i] = bottom + (point.byKind.get(kind) ?? 0);
      return [bottom, base[i]!];
    }),
  }));
  return { layers, max: Math.max(0, ...base) };
}

export type GrowthMarker =
  | { kind: "run"; sequence: number; acceptedAt: string; procedure: string; run: string; members: number }
  | { kind: "kit"; sequence: number; acceptedAt: string; words: string; members: number };

/** Core's proposal text for a Procedure's run (lib/change-sets reads the same). */
const PROPOSED_BY = /^Proposed by Procedure (\S+) run (RUN-[0-9a-f]+)/;
/** Core's proposal text for a kit change: "Install kit security 1.3.0.", "Upgrade kit security from 1.2.0 to 1.3.0." */
const KIT_CHANGE = /^((?:Install|Reinstall|Upgrade|Downgrade|Remove) kit \S+.*?)\.?$/;

/** The generations in [lo, head] that a Line's run or a kit change landed, from the generations page. */
export function growthMarkers(rows: readonly Generation[], lo: number, head: number): GrowthMarker[] {
  const out: GrowthMarker[] = [];
  for (const row of rows) {
    if (row.sequence < lo || row.sequence > head) continue;
    const because = (row.because ?? "").trim();
    const run = PROPOSED_BY.exec(because);
    if (run) {
      out.push({ kind: "run", sequence: row.sequence, acceptedAt: row.proposed_at, procedure: run[1]!, run: run[2]!, members: row.members ?? 0 });
      continue;
    }
    const kit = KIT_CHANGE.exec(because.split("\n")[0] ?? "");
    if (kit) out.push({ kind: "kit", sequence: row.sequence, acceptedAt: row.proposed_at, words: kit[1]!, members: row.members ?? 0 });
  }
  return out.sort((a, b) => a.sequence - b.sequence);
}

/** The instance's first generation date, when the page reaches genesis. */
export function firstAccepted(rows: readonly Generation[]): string | null {
  return rows.find((row) => row.sequence === 0)?.proposed_at ?? null;
}
