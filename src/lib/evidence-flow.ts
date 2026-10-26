import type { OrientPredicate } from "../api/schemas.ts";

/**
 * The evidence-flow view's model and layout (design-app-ontology §3): where
 * evidence comes from (logical sources), the contracts it is captured under,
 * and what each contract feeds: the Triggers its landings fire (and the
 * Lines they start) and the ClaimTypes that admit it as evidence.
 *
 * Contracts no longer list their sources (compiler revision 36): a source
 * node is a logical source the definitions name, from the source steps that
 * retain it and the landing Triggers that select it (lib/definitions). A
 * Trigger that selects logical sources fires only on their landings, so its
 * edge from the contract carries them, and tracing from a source follows
 * only the Triggers that select it (or select none).
 *
 * Layered, not force-directed: every edge runs one column to the right, so
 * the page reads left to right and stays legible at ontology size (the gate
 * world: 14 contracts, 12 landing Triggers, 42 evidence-taking ClaimTypes of
 * 90). The right column is stacked in fixed rows (Triggers, then ClaimTypes
 * grouped under their Subject kind); contracts and sources float to the
 * barycenter of what they connect to, which keeps most edges short and
 * nearly horizontal. Pure and deterministic: same inputs, same pixels.
 */

export type FlowNodeKind = "source" | "contract" | "trigger" | "claim_type";

export interface FlowNode {
  id: string;
  kind: FlowNodeKind;
  /** Display label: a source id, contract name, Trigger name or ClaimType short name. */
  label: string;
  /** source: who retains it, in words; contract: grade; trigger: the Line it starts; claim_type: predicate. */
  detail?: string;
  /** trigger: the logical sources it selects (none: any landing under its contract). */
  sources?: string[];
  /** claim_type: its first Subject kind (the group it renders under). */
  group?: string;
  /** claim_type: a Capture under one of its contracts is required. */
  required?: boolean;
  /** contract: the Procedures that retain Captures under it. */
  producers?: string[];
  /** trigger: the Line's max authority. */
  authority?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
  /** contract -> claim_type where the ClaimType requires a Capture. */
  required?: boolean;
  /** contract -> trigger: the logical sources whose landings fire it (absent: any). */
  sources?: string[];
}

export interface FlowModel {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowInputs {
  /** Contract names (bare), from the capture_contracts section. */
  contracts: { name: string; grade?: string | undefined }[];
  /** Logical sources: id, the bare contract names it is captured under, who retains it (words). */
  sources: readonly { id: string; contracts: readonly string[]; retainedBy?: string | undefined }[];
  claimTypes: readonly OrientPredicate[];
  /** Capture-landing Triggers: name, bare contract name, target ref, the logical sources it selects. */
  triggers: { name: string; contract: string; target: string; logicalSources?: readonly string[] }[];
  /** Max authority per bare Line name. */
  lineAuthority?: ReadonlyMap<string, string>;
  /** Retaining Procedures per bare contract name. */
  producers?: ReadonlyMap<string, readonly string[]>;
}

const bareContract = (value: string) => value.replace(/^CaptureContract:/, "");
const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export const nodeId = {
  source: (source: string) => `source:${source}`,
  contract: (name: string) => `contract:${name}`,
  trigger: (name: string) => `trigger:${name}`,
  claimType: (predicate: string) => `claim_type:${predicate}`,
  kind: (kind: string) => `kind:${kind}`,
};

/** The flow's nodes and edges; contracts any ClaimType names but the section omits still appear. */
export function buildFlow(inputs: FlowInputs): FlowModel {
  const nodes = new Map<string, FlowNode>();
  const edges: FlowEdge[] = [];
  const contract = (name: string, grade?: string) => {
    const id = nodeId.contract(name);
    if (!nodes.has(id)) {
      nodes.set(id, {
        id,
        kind: "contract",
        label: name,
        ...(grade ? { detail: grade } : {}),
        producers: [...(inputs.producers?.get(name) ?? [])],
      });
    }
    return id;
  };
  for (const row of [...inputs.contracts].sort((a, b) => byText(a.name, b.name))) contract(row.name, row.grade);
  for (const source of [...inputs.sources].sort((a, b) => byText(a.id, b.id))) {
    const sid = nodeId.source(source.id);
    nodes.set(sid, { id: sid, kind: "source", label: source.id, ...(source.retainedBy ? { detail: source.retainedBy } : {}) });
    for (const name of [...source.contracts].sort(byText)) edges.push({ from: sid, to: contract(bareContract(name)) });
  }
  for (const trigger of [...inputs.triggers].sort((a, b) => byText(a.name, b.name))) {
    const name = bareContract(trigger.contract);
    if (!name) continue;
    const id = nodeId.trigger(trigger.name);
    const line = trigger.target.replace(/^Line:/, "");
    const authority = inputs.lineAuthority?.get(line);
    const sources = [...(trigger.logicalSources ?? [])].sort(byText);
    nodes.set(id, {
      id,
      kind: "trigger",
      label: trigger.name,
      detail: trigger.target,
      ...(authority ? { authority } : {}),
      ...(sources.length ? { sources } : {}),
    });
    edges.push({ from: contract(name), to: id, ...(sources.length ? { sources } : {}) });
  }
  for (const row of [...inputs.claimTypes].sort((a, b) => byText(a.predicate, b.predicate))) {
    const evidence = row.evidence ?? [];
    if (evidence.length === 0) continue;
    const id = nodeId.claimType(row.predicate);
    const required = row.evidence_requirement === "captured";
    nodes.set(id, {
      id,
      kind: "claim_type",
      label: row.name,
      detail: row.predicate,
      group: [...(row.subject_kinds ?? [])].sort(byText)[0] ?? "",
      required,
    });
    for (const name of evidence) edges.push({ from: contract(bareContract(name)), to: id, ...(required ? { required } : {}) });
  }
  return { nodes: [...nodes.values()], edges };
}

/**
 * The nodes a focus keeps: the node, everything upstream of it and everything
 * downstream (not its siblings). A `kind:` focus keeps that kind's ClaimTypes
 * and their upstream. Logical sources narrow the Trigger edges: downstream of
 * a source, a Trigger that selects other sources is not kept; upstream of a
 * Trigger that selects sources, only those sources are.
 */
export function related(model: FlowModel, focus: string): Set<string> {
  const keep = new Set<string>();
  const seeds = focus.startsWith("kind:")
    ? model.nodes.filter((n) => n.kind === "claim_type" && n.group === focus.slice("kind:".length)).map((n) => n.id)
    : model.nodes.some((n) => n.id === focus)
      ? [focus]
      : [];
  const walk = (start: string, step: (id: string) => string[]) => {
    const stack = [start];
    while (stack.length) {
      const id = stack.pop()!;
      for (const next of step(id)) {
        if (!keep.has(next)) {
          keep.add(next);
          stack.push(next);
        }
      }
    }
  };
  const byId = new Map(model.nodes.map((n) => [n.id, n] as const));
  for (const seed of seeds) {
    const node = byId.get(seed);
    // A source seed fires only the Triggers that select it (or select none).
    const fromSource = node?.kind === "source" ? node.label : null;
    // A Trigger seed that selects sources is reached only from those sources.
    const toSources = node?.kind === "trigger" && node.sources?.length ? new Set(node.sources) : null;
    const ups = (id: string) =>
      model.edges
        .filter((e) => e.to === id)
        .map((e) => e.from)
        .filter((from) => !toSources || byId.get(from)?.kind !== "source" || toSources.has(byId.get(from)!.label));
    const downs = (id: string) =>
      model.edges
        .filter((e) => e.from === id && (!fromSource || !e.sources || e.sources.includes(fromSource)))
        .map((e) => e.to);
    keep.add(seed);
    walk(seed, ups);
    walk(seed, downs);
  }
  return keep;
}

/** The sub-model a focus keeps (the whole model when the focus names nothing). */
export function focusFlow(model: FlowModel, focus: string | null): FlowModel {
  if (!focus) return model;
  const keep = related(model, focus);
  if (keep.size === 0) return model;
  return {
    nodes: model.nodes.filter((n) => keep.has(n.id)),
    edges: model.edges.filter((e) => keep.has(e.from) && keep.has(e.to)),
  };
}

// -- layout ---------------------------------------------------------------------

export type PlacedKind = FlowNodeKind | "kind" | "heading";

export interface Placed {
  id: string;
  kind: PlacedKind;
  x: number;
  y: number;
  w: number;
  h: number;
  node?: FlowNode;
  /** kind rows: the Subject kind; heading rows: the heading text. */
  label?: string;
}

export interface FlowLayout {
  placed: Placed[];
  byId: ReadonlyMap<string, Placed>;
  edges: FlowEdge[];
  width: number;
  height: number;
}

/** Column boxes; the wide gutter before the right column carries the fan-out to ClaimTypes. */
export const COLUMNS = [
  { x: 0, w: 200 },
  { x: 260, w: 280 },
  { x: 740, w: 340 },
] as const;

const HEIGHT: Record<PlacedKind, number> = {
  source: 38,
  contract: 44,
  trigger: 38,
  claim_type: 18,
  kind: 20,
  heading: 22,
};
const GAP: Record<PlacedKind, number> = { source: 6, contract: 8, trigger: 4, claim_type: 2, kind: 2, heading: 4 };
const SECTION_GAP = 14;

const mean = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : Number.POSITIVE_INFINITY);

/** Stack nodes downward in order of their desired centre, never overlapping. */
function pack<T extends { id: string; desired: number; kind: PlacedKind }>(items: T[], top: number): Map<string, number> {
  const out = new Map<string, number>();
  let bottom = top;
  const ordered = [...items].sort((a, b) => a.desired - b.desired || byText(a.id, b.id));
  for (const item of ordered) {
    const h = HEIGHT[item.kind];
    const want = Number.isFinite(item.desired) ? item.desired - h / 2 : bottom;
    const y = Math.max(want, bottom);
    out.set(item.id, y);
    bottom = y + h + GAP[item.kind];
  }
  return out;
}

/** Positions for every node: the right column in fixed rows, the others at barycentres. */
export function layoutFlow(model: FlowModel): FlowLayout {
  const of = (kind: FlowNodeKind) => model.nodes.filter((n) => n.kind === kind);
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const e of model.edges) {
    incoming.set(e.to, [...(incoming.get(e.to) ?? []), e.from]);
    outgoing.set(e.from, [...(outgoing.get(e.from) ?? []), e.to]);
  }
  const contracts = of("contract");
  const top = HEIGHT.heading + GAP.heading;

  // Right column order from a contract order; two sweeps (contracts by name,
  // then contracts by the mean row of what they feed) settle it.
  let rank = new Map(contracts.map((c, i) => [c.id, i] as const));
  let rows: Placed[] = [];
  for (let sweep = 0; sweep < 2; sweep += 1) {
    const score = (id: string) => mean((incoming.get(id) ?? []).map((from) => rank.get(from) ?? 0));
    rows = stackRight(of("trigger"), of("claim_type"), score, top);
    const rowY = new Map(rows.map((r) => [r.id, r.y + r.h / 2] as const));
    const order = [...contracts].sort(
      (a, b) =>
        mean((outgoing.get(a.id) ?? []).map((to) => rowY.get(to) ?? 0)) - mean((outgoing.get(b.id) ?? []).map((to) => rowY.get(to) ?? 0)) ||
        byText(a.id, b.id),
    );
    rank = new Map(order.map((c, i) => [c.id, i] as const));
  }
  const rowY = new Map(rows.map((r) => [r.id, r.y + r.h / 2] as const));

  // A contract that feeds nothing has no barycentre and stacks below the rest.
  const contractY = pack(
    contracts.map((c) => ({
      id: c.id,
      kind: "contract" as const,
      desired: mean((outgoing.get(c.id) ?? []).map((to) => rowY.get(to)).filter((y): y is number => y !== undefined)),
    })),
    top,
  );
  const centre = (id: string, kind: PlacedKind) => (contractY.get(id) ?? 0) + HEIGHT[kind] / 2;
  const sourceY = pack(
    of("source").map((s) => ({ id: s.id, kind: "source" as const, desired: mean((outgoing.get(s.id) ?? []).map((to) => centre(to, "contract"))) })),
    top,
  );

  const placed: Placed[] = [
    { id: "heading:sources", kind: "heading", label: "Sources", x: COLUMNS[0].x, y: 0, w: COLUMNS[0].w, h: HEIGHT.heading },
    { id: "heading:contracts", kind: "heading", label: "Capture contracts", x: COLUMNS[1].x, y: 0, w: COLUMNS[1].w, h: HEIGHT.heading },
    ...of("source").map((node) => ({ id: node.id, kind: node.kind, node, x: COLUMNS[0].x, y: sourceY.get(node.id)!, w: COLUMNS[0].w, h: HEIGHT.source })),
    ...contracts.map((node) => ({ id: node.id, kind: node.kind, node, x: COLUMNS[1].x, y: contractY.get(node.id)!, w: COLUMNS[1].w, h: HEIGHT.contract })),
    ...rows,
  ];
  const height = Math.max(...placed.map((p) => p.y + p.h), top) + 8;
  return {
    placed,
    byId: new Map(placed.map((p) => [p.id, p] as const)),
    edges: model.edges,
    width: COLUMNS[2].x + COLUMNS[2].w,
    height,
  };
}

/** The right column: Triggers, then ClaimTypes under their kind, each ordered by `score`. */
function stackRight(
  triggers: FlowNode[],
  claimTypes: FlowNode[],
  score: (id: string) => number,
  top: number,
): Placed[] {
  const out: Placed[] = [];
  const x = COLUMNS[2].x;
  const w = COLUMNS[2].w;
  let y = top - HEIGHT.heading - GAP.heading;
  const put = (id: string, kind: PlacedKind, extra: Partial<Placed> = {}) => {
    out.push({ id, kind, x, y, w, h: HEIGHT[kind], ...extra });
    y += HEIGHT[kind] + GAP[kind];
  };
  const order = (nodes: FlowNode[]) => [...nodes].sort((a, b) => score(a.id) - score(b.id) || byText(a.id, b.id));
  if (triggers.length > 0) {
    put("heading:triggers", "heading", { label: "Its landings start" });
    for (const node of order(triggers)) put(node.id, "trigger", { node });
    y += SECTION_GAP;
  }
  if (claimTypes.length > 0) {
    put("heading:beliefs", "heading", { label: "It can support" });
    const groups = new Map<string, FlowNode[]>();
    for (const node of claimTypes) groups.set(node.group ?? "", [...(groups.get(node.group ?? "") ?? []), node]);
    const groupScore = (kind: string) => mean(groups.get(kind)!.map((n) => score(n.id)));
    for (const kind of [...groups.keys()].sort((a, b) => groupScore(a) - groupScore(b) || byText(a, b))) {
      put(nodeId.kind(kind), "kind", { label: kind });
      for (const node of order(groups.get(kind)!)) put(node.id, "claim_type", { node });
    }
  }
  return out;
}

/** An edge's path between two placed nodes (right edge to left edge, a horizontal S-curve). */
export function edgePath(from: Placed, to: Placed): string {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const dx = (x2 - x1) / 2;
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}
