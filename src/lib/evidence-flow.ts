import type { OrientPredicate } from "../api/schemas.ts";

/**
 * The evidence-flow view's model and layout: how evidence moves.
 *
 *   Sources ──► Lines that read their landings ──► ClaimTypes they may write
 *          └────────────── (no Line reads it) ──────────────┘
 *
 * A source is a logical source the definitions name (from the source steps
 * that retain it and the landing Triggers that select it), plus one pseudo
 * source, "your statements", for what a ClaimType admits on its author's own
 * word. The contract a source is captured under is a tag on the source, not a
 * column.
 *
 * A Line is in the middle column when a landing Trigger starts it; it reads
 * the (contract, logical sources) its Triggers select. A ClaimType accepts
 * the (contract, logical sources) its evidence rules name (from its proof; an
 * empty source list accepts any source under that contract). An edge
 * Line → ClaimType means the Line reads a landing the ClaimType accepts, so
 * the Line may write it: the definitions don't say which Claims a run writes
 * (Procedures build their changes at run time), only which evidence each
 * ClaimType would accept. A source no Line reads, and the pseudo source,
 * connect straight to the ClaimTypes that accept them.
 *
 * Layered: every edge runs to the right; the ClaimType column is stacked in
 * fixed rows under its Subject kind, and the Lines and sources are ordered by
 * what they connect to but packed from the top, so no column starts halfway
 * down the page. Pure and deterministic: same inputs, same pixels.
 */

export type FlowNodeKind = "source" | "line" | "claim_type";

export interface FlowNode {
  id: string;
  kind: FlowNodeKind;
  /** Display label: a logical source, a Line name, or a ClaimType's short name. */
  label: string;
  /** source: who retains it, in words; line: what starts it; claim_type: predicate. */
  detail?: string;
  /** source: the bare contracts it is captured under. */
  contracts?: string[];
  /** source: the pseudo source for statements on their author's own word. */
  ownWord?: boolean;
  /** line: the Line's max authority. */
  authority?: string;
  /** line: its landing Triggers. */
  triggers?: string[];
  /** claim_type: its first Subject kind (the group it renders under). */
  group?: string;
  /** claim_type: a Capture is required. */
  required?: boolean;
}

export interface FlowEdge {
  from: string;
  to: string;
  /** The logical sources this edge carries (absent: any under the contract). */
  sources?: string[];
  /** → claim_type where the ClaimType requires a Capture. */
  required?: boolean;
  /** source → claim_type directly (no Line reads the source). */
  direct?: boolean;
}

export interface FlowModel {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

/** What a ClaimType accepts as evidence: a contract and the logical sources under it ([] = any). */
export interface AcceptedEvidence {
  contract: string;
  sources: readonly string[];
}

export interface FlowInputs {
  /** Logical sources: id, the bare contract names it is captured under, who retains it (words). */
  sources: readonly { id: string; contracts: readonly string[]; retainedBy?: string | undefined }[];
  claimTypes: readonly OrientPredicate[];
  /**
   * Per predicate, what its evidence rules accept. A ClaimType missing here
   * falls back to its `evidence` contracts with any source.
   */
  accepts?: ReadonlyMap<string, readonly AcceptedEvidence[]>;
  /** Capture-landing Triggers: name, bare contract name, target ref, the logical sources it selects. */
  triggers: readonly { name: string; contract: string; target: string; logicalSources?: readonly string[] }[];
  /** Max authority per bare Line name. */
  lineAuthority?: ReadonlyMap<string, string>;
}

const bareContract = (value: string) => value.replace(/^CaptureContract:/, "");
const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
/** Contracts whose Captures are their author's own word (core's coordinator self-source). */
export const isSelfSource = (contract: string) => /self-source/.test(contract);

export const OWN_WORD = "source:own-word";

export const nodeId = {
  source: (source: string) => `source:${source}`,
  line: (name: string) => `line:${name}`,
  claimType: (predicate: string) => `claim_type:${predicate}`,
  kind: (kind: string) => `kind:${kind}`,
};

/** Does a read (contract, sources | null = any) meet an acceptance (contract, sources | [] = any)? The shared sources, null for "any", false for no. */
function meet(read: { contract: string; sources: readonly string[] | null }, accept: AcceptedEvidence): string[] | null | false {
  if (read.contract !== accept.contract) return false;
  if (read.sources === null) return accept.sources.length ? [...accept.sources] : null;
  if (accept.sources.length === 0) return [...read.sources];
  const shared = read.sources.filter((s) => accept.sources.includes(s));
  return shared.length ? shared : false;
}

export function buildFlow(inputs: FlowInputs): FlowModel {
  const nodes = new Map<string, FlowNode>();
  const edges: FlowEdge[] = [];
  const edgeKeys = new Set<string>();
  const addEdge = (edge: FlowEdge) => {
    const key = `${edge.from}\n${edge.to}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push(edge);
  };

  // What each ClaimType accepts.
  const accepts = new Map<string, AcceptedEvidence[]>();
  for (const row of inputs.claimTypes) {
    const served = inputs.accepts?.get(row.predicate);
    const list = served
      ? served.map((a) => ({ contract: bareContract(a.contract), sources: [...a.sources] }))
      : (row.evidence ?? []).map((c) => ({ contract: bareContract(c), sources: [] as string[] }));
    if (list.length) accepts.set(row.predicate, list);
  }

  // Sources (and the own-word pseudo source when anything accepts a self-source contract).
  for (const source of [...inputs.sources].sort((a, b) => byText(a.id, b.id))) {
    const id = nodeId.source(source.id);
    nodes.set(id, {
      id,
      kind: "source",
      label: source.id,
      contracts: [...source.contracts].map(bareContract).sort(byText),
      ...(source.retainedBy ? { detail: source.retainedBy } : {}),
    });
  }
  const selfContracts = [...new Set([...accepts.values()].flat().map((a) => a.contract).filter(isSelfSource))];
  if (selfContracts.length) {
    nodes.set(OWN_WORD, {
      id: OWN_WORD,
      kind: "source",
      label: "Your statements",
      detail: "On their author's own word",
      contracts: selfContracts,
      ownWord: true,
    });
  }

  // Lines that landing Triggers start, with what they read.
  const reads = new Map<string, { contract: string; sources: string[] | null }[]>();
  const triggersOf = new Map<string, string[]>();
  for (const trigger of [...inputs.triggers].sort((a, b) => byText(a.name, b.name))) {
    const contract = bareContract(trigger.contract);
    const line = trigger.target.replace(/^Line:/, "");
    if (!contract || !line) continue;
    const sources = trigger.logicalSources?.length ? [...trigger.logicalSources].sort(byText) : null;
    reads.set(line, [...(reads.get(line) ?? []), { contract, sources }]);
    triggersOf.set(line, [...(triggersOf.get(line) ?? []), trigger.name]);
  }
  for (const [line, lineReads] of [...reads].sort(([a], [b]) => byText(a, b))) {
    const id = nodeId.line(line);
    const what = lineReads.map((r) => (r.sources ? r.sources.join(" or ") : `any ${r.contract} landing`)).join("; ");
    const authority = inputs.lineAuthority?.get(line);
    nodes.set(id, {
      id,
      kind: "line",
      label: line,
      detail: `When ${what} lands`,
      triggers: triggersOf.get(line) ?? [],
      ...(authority ? { authority } : {}),
    });
    // source → line
    for (const node of nodes.values()) {
      if (node.kind !== "source" || node.ownWord) continue;
      for (const r of lineReads) {
        if (!node.contracts?.includes(r.contract)) continue;
        if (r.sources && !r.sources.includes(node.label)) continue;
        addEdge({ from: node.id, to: id, sources: [node.label] });
      }
    }
  }

  // ClaimTypes, and the edges into them.
  const readSources = new Set(edges.map((e) => e.from));
  for (const row of [...inputs.claimTypes].sort((a, b) => byText(a.predicate, b.predicate))) {
    const accepted = accepts.get(row.predicate);
    if (!accepted) continue;
    const id = nodeId.claimType(row.predicate);
    const required = row.evidence_requirement === "captured";
    const before = edges.length;
    // line → claim_type: the Line reads a landing it accepts (a Line capped at observe writes no Claims).
    for (const [line, lineReads] of reads) {
      if (inputs.lineAuthority?.get(line) === "observe") continue;
      for (const r of lineReads) {
        for (const a of accepted) {
          const shared = meet(r, a);
          if (shared === false) continue;
          addEdge({ from: nodeId.line(line), to: id, ...(shared ? { sources: shared } : {}), ...(required ? { required } : {}) });
        }
      }
    }
    // source → claim_type directly: a source no Line reads, or the own-word pseudo source.
    for (const node of nodes.values()) {
      if (node.kind !== "source") continue;
      if (!node.ownWord && readSources.has(node.id)) continue;
      for (const a of accepted) {
        const ok = node.ownWord
          ? isSelfSource(a.contract)
          : (node.contracts?.includes(a.contract) ?? false) && (a.sources.length === 0 || a.sources.includes(node.label));
        if (ok) addEdge({ from: node.id, to: id, direct: true, ...(required ? { required } : {}) });
      }
    }
    if (edges.length === before) continue; // nothing reaches it: leave it off the flow
    nodes.set(id, {
      id,
      kind: "claim_type",
      label: row.name,
      detail: row.predicate,
      group: [...(row.subject_kinds ?? [])].sort(byText)[0] ?? "",
      required,
    });
  }
  return { nodes: [...nodes.values()], edges };
}

/**
 * The nodes a focus keeps: the node, everything upstream and downstream (not
 * its siblings). A `kind:` focus keeps that kind's ClaimTypes and their
 * upstream. From a source, a Line's onward edges are followed only where they
 * carry that source (or any source).
 */
export function related(model: FlowModel, focus: string): Set<string> {
  const keep = new Set<string>();
  const seeds = focus.startsWith("kind:")
    ? model.nodes.filter((n) => n.kind === "claim_type" && n.group === focus.slice("kind:".length)).map((n) => n.id)
    : model.nodes.some((n) => n.id === focus)
      ? [focus]
      : [];
  const byId = new Map(model.nodes.map((n) => [n.id, n] as const));
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
  for (const seed of seeds) {
    const node = byId.get(seed);
    const fromSource = node?.kind === "source" && !node.ownWord ? node.label : null;
    const ups = (id: string) => model.edges.filter((e) => e.to === id).map((e) => e.from);
    const downs = (id: string) =>
      model.edges
        .filter((e) => e.from === id && (!fromSource || byId.get(id)?.kind !== "line" || !e.sources || e.sources.includes(fromSource)))
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

/** Column boxes: sources, Lines, ClaimTypes; wide gutters carry the fan-outs. */
export const COLUMNS = [
  { x: 0, w: 250 },
  { x: 330, w: 290 },
  { x: 720, w: 330 },
] as const;

const HEIGHT: Record<PlacedKind, number> = {
  source: 58,
  line: 58,
  claim_type: 18,
  kind: 20,
  heading: 22,
};
const GAP: Record<PlacedKind, number> = { source: 6, line: 6, claim_type: 2, kind: 2, heading: 4 };
const KIND_GAP = 8;

const mean = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : Number.POSITIVE_INFINITY);

/** Stack nodes from the top in order of their desired centre, with no gaps. */
function packTop<T extends { id: string; desired: number; kind: PlacedKind }>(items: T[], top: number): Map<string, number> {
  const out = new Map<string, number>();
  let y = top;
  for (const item of [...items].sort((a, b) => a.desired - b.desired || byText(a.id, b.id))) {
    out.set(item.id, y);
    y += HEIGHT[item.kind] + GAP[item.kind];
  }
  return out;
}

export function layoutFlow(model: FlowModel): FlowLayout {
  const of = (kind: FlowNodeKind) => model.nodes.filter((n) => n.kind === kind);
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const e of model.edges) {
    incoming.set(e.to, [...(incoming.get(e.to) ?? []), e.from]);
    outgoing.set(e.from, [...(outgoing.get(e.from) ?? []), e.to]);
  }
  const top = HEIGHT.heading + GAP.heading;

  // ClaimTypes: kinds ordered by the Lines/sources that feed them, stacked in rows.
  const rows: Placed[] = [];
  const x = COLUMNS[2].x;
  const w = COLUMNS[2].w;
  let y = top;
  const groups = new Map<string, FlowNode[]>();
  for (const node of of("claim_type")) groups.set(node.group ?? "", [...(groups.get(node.group ?? "") ?? []), node]);
  const feeders = [...of("line"), ...of("source")].sort((a, b) => byText(a.label, b.label));
  const feedOrder = new Map(feeders.map((n, i) => [n.id, i] as const));
  const feedScore = (id: string) => mean((incoming.get(id) ?? []).map((from) => feedOrder.get(from) ?? feeders.length));
  const groupScore = (kind: string) => mean(groups.get(kind)!.map((n) => feedScore(n.id)));
  for (const kind of [...groups.keys()].sort((a, b) => groupScore(a) - groupScore(b) || byText(a, b))) {
    rows.push({ id: nodeId.kind(kind), kind: "kind", label: kind, x, y, w, h: HEIGHT.kind });
    y += HEIGHT.kind + GAP.kind;
    for (const node of [...groups.get(kind)!].sort((a, b) => feedScore(a.id) - feedScore(b.id) || byText(a.label, b.label))) {
      rows.push({ id: node.id, kind: "claim_type", node, x, y, w, h: HEIGHT.claim_type });
      y += HEIGHT.claim_type + GAP.claim_type;
    }
    y += KIND_GAP;
  }
  const rowY = new Map(rows.map((r) => [r.id, r.y + r.h / 2] as const));

  // Lines, ordered by the rows they feed, packed from the top.
  const lineY = packTop(
    of("line").map((n) => ({
      id: n.id,
      kind: "line" as const,
      desired: mean((outgoing.get(n.id) ?? []).map((to) => rowY.get(to)).filter((v): v is number => v !== undefined)),
    })),
    top,
  );
  const centreOf = (id: string) => {
    const ly = lineY.get(id);
    return ly !== undefined ? ly + HEIGHT.line / 2 : rowY.get(id);
  };
  // Sources, ordered by what they feed (Lines, or ClaimTypes directly), packed from the top; the own-word source last.
  const sourceY = packTop(
    of("source").map((n) => ({
      id: n.id,
      kind: "source" as const,
      desired: n.ownWord ? Number.MAX_SAFE_INTEGER : mean((outgoing.get(n.id) ?? []).map(centreOf).filter((v): v is number => v !== undefined)),
    })),
    top,
  );

  const placed: Placed[] = [
    { id: "heading:sources", kind: "heading", label: "Sources", x: COLUMNS[0].x, y: 0, w: COLUMNS[0].w, h: HEIGHT.heading },
    { id: "heading:lines", kind: "heading", label: "Lines that read them", x: COLUMNS[1].x, y: 0, w: COLUMNS[1].w, h: HEIGHT.heading },
    { id: "heading:claims", kind: "heading", label: "ClaimTypes they may write", x: COLUMNS[2].x, y: 0, w: COLUMNS[2].w, h: HEIGHT.heading },
    ...of("source").map((node) => ({ id: node.id, kind: node.kind, node, x: COLUMNS[0].x, y: sourceY.get(node.id)!, w: COLUMNS[0].w, h: HEIGHT.source })),
    ...of("line").map((node) => ({ id: node.id, kind: node.kind, node, x: COLUMNS[1].x, y: lineY.get(node.id)!, w: COLUMNS[1].w, h: HEIGHT.line })),
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

/** An edge's path between two placed nodes (right edge to left edge, a horizontal S-curve). */
export function edgePath(from: Placed, to: Placed): string {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const dx = (x2 - x1) / 2;
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

/** A shared leading namespace ("security.") to drop from labels, when every name has it. */
export function sharedPrefix(names: readonly string[]): string {
  if (names.length < 2) return "";
  const first = names[0]!.split(".")[0];
  if (!first || first === names[0]) return "";
  const prefix = `${first}.`;
  return names.every((n) => n.startsWith(prefix)) ? prefix : "";
}

const asObject = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

/**
 * What a ClaimType's evidence rules accept, from its `get detail=proof`
 * payload (envelope.evidence_admission_policy.rules[].capture_contracts[]:
 * target name + logical_sources). Null when the payload isn't a ClaimType
 * envelope; [] when its rules admit no Capture (own words only).
 */
export function readClaimTypeAccepts(proof: unknown): { predicate: string; accepts: AcceptedEvidence[] } | null {
  const envelope = asObject(asObject(proof)?.envelope);
  const policy = asObject(envelope?.evidence_admission_policy);
  const identity = asObject(envelope?.identity);
  const predicate = typeof identity?.name === "string" ? identity.name : null;
  if (!policy || !predicate) return null;
  const accepts: AcceptedEvidence[] = [];
  for (const rule of Array.isArray(policy.rules) ? policy.rules : []) {
    for (const pin of Array.isArray(asObject(rule)?.capture_contracts) ? (asObject(rule)!.capture_contracts as unknown[]) : []) {
      const name = asObject(asObject(pin)?.target)?.name;
      const sources = asObject(pin)?.logical_sources;
      if (typeof name !== "string") continue;
      accepts.push({
        contract: name,
        sources: Array.isArray(sources) ? sources.filter((s): s is string => typeof s === "string") : [],
      });
    }
  }
  return { predicate, accepts };
}
