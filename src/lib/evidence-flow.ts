import type { OrientPredicate } from "../api/schemas.ts";

/**
 * The evidence-flow view's model and layout: how evidence moves.
 *
 *   Source ──► the Line that fetches (or reads) it ──► the ClaimTypes that Line writes
 *   Entered directly ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄► ClaimTypes that take own-word statements
 *
 * A source is a logical source: where data comes from (a web host, a
 * workspace file, a run's output), when it is fetched and when it last
 * landed. A Line runs a Procedure that calls a Provider (web.fetch), extracts
 * what came back and writes Claims: an edge source → Line where the Line's
 * calls name the source, Line → ClaimType where its claims steps name the
 * ClaimType (a Line capped at observe writes no Claims), Line → inbox where
 * its Procedure posts items.
 *
 * The pseudo source "Entered directly" is for what people and agents write on
 * their own word: it links to the ClaimTypes whose evidence rules accept a
 * self-source contract. A ClaimType no Line writes but whose rules accept a
 * source links straight from that source (an agent writes it, citing it).
 *
 * Layered: every edge runs to the right; the ClaimType column is stacked in
 * fixed rows under its Subject kind, and the Lines and sources are ordered by
 * what they connect to but packed from the top, so no column starts halfway
 * down the page. Pure and deterministic: same inputs, same pixels.
 */

export type FlowNodeKind = "source" | "line" | "inbox" | "claim_type";

export interface FlowNode {
  id: string;
  kind: FlowNodeKind;
  /** A logical source id, a Line name, or a ClaimType's short name. */
  label: string;
  /** source: who fetches it, in words; claim_type: its predicate. */
  detail?: string;
  /** line: what it does, in a line; source: what retains it; claim_type: its description. */
  about?: string;
  /** source: where it comes from in plain words (`cisa.gov`). */
  host?: string;
  /** source: how it arrives (HTTP fetch, Workspace file, Run output, an interface). */
  arrives?: string;
  /** source: when it is fetched, in words ("Daily at 1:15 PM EST"). */
  when?: string;
  /** source: the bare contracts it is captured under. */
  contracts?: string[];
  /** source: the pseudo source for statements on their author's own word. */
  ownWord?: boolean;
  /** claim_type: a Subject's identity key (no source writes it). */
  key?: boolean;
  /** line: its max authority; claim_type: the highest of the Lines that write it (absent: no Line writes it). */
  authority?: Authority;
  /** line: whether the Line is enabled (null: never enabled). */
  enablement?: string | null;
  /** claim_type: its first Subject kind (the group it renders under). */
  group?: string;
  /** claim_type: a Capture is required. */
  required?: boolean;
}

export type Authority = "observe" | "propose" | "settle";
const RANK: Record<Authority, number> = { observe: 0, propose: 1, settle: 2 };
const asAuthority = (value: string | null | undefined): Authority | undefined =>
  value === "observe" || value === "propose" || value === "settle" ? value : undefined;

export interface FlowEdge {
  from: string;
  to: string;
  /** line → claim_type: the Line's max authority. */
  authority?: Authority;
  /** source → line: the Line's run fetches and retains the source (not only reads a landing). */
  lands?: boolean;
  /** → claim_type where the ClaimType requires a Capture. */
  required?: boolean;
  /** source → claim_type with no Line between (written by people or agents). */
  direct?: boolean;
  /** line → inbox: the Line posts items for someone to judge. */
  inbox?: boolean;
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

export interface SourceInput {
  id: string;
  /** The contracts it is captured under. */
  contracts: readonly string[];
  host?: string | null | undefined;
  arrives?: string | null | undefined;
  when?: string | null | undefined;
  /** Who fetches it, in words (the tooltip). */
  fetchedBy?: string | null | undefined;
  /** What retains it, in a line (its Procedure's description). */
  about?: string | null | undefined;
}

export interface LineInput {
  name: string;
  authority?: string | null | undefined;
  /** null: never enabled. */
  enablement?: string | null | undefined;
  about?: string | null | undefined;
  /** The logical sources its calls name. */
  reads: readonly string[];
  /** The ones its run retains (it fetches them, rather than reading what landed). */
  lands?: readonly string[];
  /** The ClaimTypes its claims steps name. */
  writes: readonly string[];
  postsInbox?: boolean;
}

export interface FlowInputs {
  sources: readonly SourceInput[];
  lines: readonly LineInput[];
  claimTypes: readonly OrientPredicate[];
  /**
   * Per predicate, what its evidence rules accept. A ClaimType missing here
   * falls back to its `evidence` contracts with any source.
   */
  accepts?: ReadonlyMap<string, readonly AcceptedEvidence[]>;
  /** Identity-key predicates: a Subject's id, shown as its key with no source. */
  keys?: ReadonlySet<string>;
}

const bareContract = (value: string) => value.replace(/^CaptureContract:/, "");
const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
/** Contracts whose Captures are their author's own word (core's coordinator self-source). */
export const isSelfSource = (contract: string) => /self-source/.test(contract);

export const OWN_WORD = "source:own-word";

export const nodeId = {
  inbox: "inbox",
  source: (source: string) => `source:${source}`,
  line: (name: string) => `line:${name}`,
  claimType: (predicate: string) => `claim_type:${predicate}`,
  kind: (kind: string) => `kind:${kind}`,
};

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

  // Sources: the ones the definitions retain, and any a Line's calls name.
  const addSource = (source: SourceInput) => {
    const id = nodeId.source(source.id);
    if (nodes.has(id)) return;
    nodes.set(id, {
      id,
      kind: "source",
      label: source.id,
      contracts: [...source.contracts].map(bareContract).sort(byText),
      ...(source.host ? { host: source.host } : {}),
      ...(source.arrives ? { arrives: source.arrives } : {}),
      ...(source.when ? { when: source.when } : {}),
      ...(source.fetchedBy ? { detail: source.fetchedBy } : {}),
      ...(source.about ? { about: source.about } : {}),
    });
  };
  for (const source of [...inputs.sources].sort((a, b) => byText(a.id, b.id))) addSource(source);
  const lines = [...inputs.lines].sort((a, b) => byText(a.name, b.name));
  for (const line of lines) for (const source of [...line.reads].sort(byText)) addSource({ id: source, contracts: [] });

  // The own-word pseudo source, when anything accepts a self-source contract.
  const selfContracts = [...new Set([...accepts.values()].flat().map((a) => a.contract).filter(isSelfSource))];
  if (selfContracts.length) {
    nodes.set(OWN_WORD, {
      id: OWN_WORD,
      kind: "source",
      label: "Entered directly",
      detail: "Facts people or agents enter directly, on their own word",
      contracts: selfContracts,
      ownWord: true,
    });
  }

  // Lines, and the sources they fetch or read.
  for (const line of lines) {
    const id = nodeId.line(line.name);
    const authority = asAuthority(line.authority);
    nodes.set(id, {
      id,
      kind: "line",
      label: line.name,
      ...(authority ? { authority } : {}),
      ...(line.about ? { about: line.about } : {}),
      ...(line.enablement !== undefined ? { enablement: line.enablement } : {}),
    });
    for (const source of [...line.reads].sort(byText)) {
      addEdge({ from: nodeId.source(source), to: id, ...(line.lands?.includes(source) ? { lands: true } : {}) });
    }
  }

  // The inbox: what Lines post for an agent or a person to judge, instead of (or beside) Claims.
  const posting = lines.filter((line) => line.postsInbox);
  if (posting.length) {
    nodes.set(nodeId.inbox, { id: nodeId.inbox, kind: "inbox", label: "Inbox" });
    for (const line of posting) addEdge({ from: nodeId.line(line.name), to: nodeId.inbox, inbox: true });
  }

  // ClaimTypes: written by Lines, by people or agents on their own word, or by an agent citing a source.
  // One a Line writes but the listing lacks (a capped page) is named by its predicate: `kind.name`.
  const listed = new Set(inputs.claimTypes.map((row) => row.predicate));
  const unlisted = [...new Set(lines.flatMap((line) => line.writes))]
    .filter((predicate) => !listed.has(predicate) && predicate.includes("."))
    .map((predicate): OrientPredicate => {
      const dot = predicate.lastIndexOf(".");
      return { name: predicate.slice(dot + 1), predicate, cardinality: "one", type: "string", subject_kinds: [predicate.slice(0, dot)] };
    });
  for (const row of [...inputs.claimTypes, ...unlisted].sort((a, b) => byText(a.predicate, b.predicate))) {
    const id = nodeId.claimType(row.predicate);
    if (inputs.keys?.has(row.predicate)) {
      // A Subject's id: it identifies the Subject, nothing writes it as a fact.
      nodes.set(id, { id, kind: "claim_type", label: row.name, detail: row.predicate, key: true, group: [...(row.subject_kinds ?? [])].sort(byText)[0] ?? "", required: false });
      continue;
    }
    const required = row.evidence_requirement === "captured";
    const before = edges.length;
    let strongest: Authority | undefined;
    for (const line of lines) {
      const authority = asAuthority(line.authority);
      if (authority === "observe" || !line.writes.includes(row.predicate)) continue;
      addEdge({ from: nodeId.line(line.name), to: id, ...(authority ? { authority } : {}), ...(required ? { required } : {}) });
      if (authority && (!strongest || RANK[authority] > RANK[strongest])) strongest = authority;
    }
    const written = edges.length > before;
    for (const a of accepts.get(row.predicate) ?? []) {
      if (isSelfSource(a.contract)) {
        if (nodes.has(OWN_WORD)) addEdge({ from: OWN_WORD, to: id, direct: true, ...(required ? { required } : {}) });
        continue;
      }
      if (written) continue; // a Line writes it: its sources reach it through the Line
      for (const node of nodes.values()) {
        if (node.kind !== "source" || node.ownWord || !node.contracts?.includes(a.contract)) continue;
        if (a.sources.length && !a.sources.includes(node.label)) continue;
        addEdge({ from: node.id, to: id, direct: true, ...(required ? { required } : {}) });
      }
    }
    if (edges.length === before) continue; // nothing reaches it: leave it off the flow
    nodes.set(id, {
      id,
      kind: "claim_type",
      label: row.name,
      detail: row.predicate,
      ...(row.description ? { about: row.description } : {}),
      ...(strongest ? { authority: strongest } : {}),
      group: [...(row.subject_kinds ?? [])].sort(byText)[0] ?? "",
      required,
    });
  }
  return { nodes: [...nodes.values()], edges };
}

/**
 * The nodes a focus keeps: the node, everything upstream and downstream (not
 * its siblings). A `kind:` focus keeps that kind's ClaimTypes and their
 * upstream.
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
  const ups = (id: string) => model.edges.filter((e) => e.to === id).map((e) => e.from);
  const downs = (id: string) => model.edges.filter((e) => e.from === id).map((e) => e.to);
  for (const seed of seeds) {
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

/** Column boxes: sources, Lines, what they produce; the wider gutter carries the Line fan-out. */
export const COLUMNS = [
  { x: 0, w: 230 },
  { x: 300, w: 260 },
  { x: 650, w: 280 },
] as const;

const HEIGHT: Record<PlacedKind, number> = {
  inbox: 44,
  source: 84,
  line: 100,
  claim_type: 18,
  kind: 20,
  heading: 22,
};
const GAP: Record<PlacedKind, number> = { inbox: 14, source: 8, line: 8, claim_type: 2, kind: 2, heading: 4 };
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

  // What they produce: the inbox, then ClaimTypes under their kinds, ordered by the Lines/sources that feed them.
  const rows: Placed[] = [];
  const { x, w } = COLUMNS[2];
  let y = top;
  for (const node of of("inbox")) {
    rows.push({ id: node.id, kind: "inbox", node, x, y, w, h: HEIGHT.inbox });
    y += HEIGHT.inbox + GAP.inbox;
  }
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
  const centres = (id: string, at: (to: string) => number | undefined) =>
    (outgoing.get(id) ?? []).map(at).filter((v): v is number => v !== undefined);

  // Lines, ordered by the rows they write, packed from the top.
  const lineY = packTop(
    of("line").map((n) => ({ id: n.id, kind: "line" as const, desired: mean(centres(n.id, (to) => rowY.get(to))) })),
    top,
  );
  const centreOf = (id: string) => {
    const ly = lineY.get(id);
    return ly !== undefined ? ly + HEIGHT.line / 2 : rowY.get(id);
  };
  // Sources, ordered by what they feed (Lines, or ClaimTypes directly), packed from the top; your statements last.
  const sourceY = packTop(
    of("source").map((n) => ({
      id: n.id,
      kind: "source" as const,
      desired: n.ownWord ? Number.MAX_SAFE_INTEGER : mean(centres(n.id, centreOf)),
    })),
    top,
  );

  const heading = (id: string, label: string, column: (typeof COLUMNS)[number]): Placed => ({
    id: `heading:${id}`,
    kind: "heading",
    label,
    x: column.x,
    y: 0,
    w: column.w,
    h: HEIGHT.heading,
  });
  const placed: Placed[] = [
    heading("sources", "Source", COLUMNS[0]),
    heading("lines", "Line", COLUMNS[1]),
    heading("claims", "What it produces", COLUMNS[2]),
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

/**
 * Short names for a set of dotted names: the namespace most of them share
 * ("security.") is said once and dropped from the labels; a name outside it
 * keeps its full spelling, and so does any name whose short form would read
 * the same as another label.
 */
export function shortNames(names: readonly string[]): { prefix: string; label: (name: string) => string } {
  const counts = new Map<string, number>();
  for (const name of names) {
    const dot = name.indexOf(".");
    if (dot > 0) counts.set(name.slice(0, dot + 1), (counts.get(name.slice(0, dot + 1)) ?? 0) + 1);
  }
  const ranked = [...counts].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
  const top = ranked[0];
  const prefix = top && top[1] >= 2 && top[1] > (ranked[1]?.[1] ?? 0) ? top[0] : "";
  const short = (name: string) => (prefix && name.startsWith(prefix) && name.length > prefix.length ? name.slice(prefix.length) : name);
  const seen = new Map<string, number>();
  for (const name of new Set(names)) seen.set(short(name), (seen.get(short(name)) ?? 0) + 1);
  return { prefix, label: (name) => ((seen.get(short(name)) ?? 0) > 1 ? name : short(name)) };
}
