import type { Schemas } from "../api/schemas.ts";
import { listOutcome, type ListOutcome } from "./template.ts";
import { term, type Term } from "./vocabulary.ts";

/**
 * What happened at each step in one run, from what the daemon serves about
 * the run: the run card's finished nodes (each with its verdict; the card
 * lists only the latest ones), the node it is running, the inputs it waits
 * on, its terminal (the node that refused, failed or halted) and terminal
 * egress (what became of each output), each finished node's summary (what
 * flowed through it), and from the run's state its
 * journal's fired nodes, the Captures each node read and, in the receipt,
 * the Provider build pinned for each node. A step none of these mention did
 * not run (once the run is over). Words come from the glossary; only a
 * failure (red) or a wait (amber) carries a dot.
 */

type RunCard = Schemas["GetProcedureRunCard"];
type RunState = Schemas["ProcedureRunState"];
type RunSummary = NonNullable<Schemas["GetRunNode"]["summary"]>;

export interface StepMark {
  /** What happened at the step (the run outcome words). */
  term: Term;
  /** Further words: the refusal code, the egress, the Captures read. */
  notes: string[];
  /** Longer words, on hover only (the authority an output needed and had). */
  hints: string[];
  /** The Provider build the receipt pins for this node (source and call steps). */
  provider: string | null;
  /** What flowed through the node, from the run card (absent for older runs, a refusal or a kind that keeps none). */
  summary?: RunSummary | null;
  /** A list call's members, as the run card's node serves them (index, Capture, status). */
  list?: ListOutcome | null;
  /** The Captures the node read in this run (the run state's source observations), by digest. */
  capturesIn?: string[];
  /** The Captures the node produced in this run (a call's summary), by digest. */
  capturesOut?: string[];
}

export interface RunMarks {
  marks: Map<string, StepMark>;
  /** Nodes the run reports that the graph has no step for (compiled nodes). */
  others: { node: string; term: Term }[];
  /** The card lists only the latest finished nodes; the journal's fired nodes fill in the rest. */
  partial: boolean;
}

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

/** node id -> the Provider the receipt pins for it (receipt node_pin_sets; absent when the receipt is withheld). */
export function receiptProviders(state: RunState | null | undefined): Map<string, string> {
  const out = new Map<string, string>();
  const receipt = record(state?.receipt);
  const sets = Array.isArray(receipt?.node_pin_sets) ? receipt.node_pin_sets : [];
  for (const set of sets) {
    const s = record(set);
    const node = typeof s?.node_id === "string" ? s.node_id : null;
    if (!node || !Array.isArray(s?.pins)) continue;
    for (const pin of s.pins) {
      const p = record(pin);
      const target = record(p?.target);
      if (p?.role === "provider" && typeof target?.name === "string") out.set(node, target.name);
    }
  }
  return out;
}

/** The step a pending input waits for: the source whose alias (or id) is the input's name. */
export type InputStep = (name: string) => string | null;

export function runMarks(nodeIds: readonly string[], card: RunCard, state: RunState | null | undefined, inputStep: InputStep): RunMarks {
  const known = new Set(nodeIds);
  const marks = new Map<string, StepMark>();
  const providers = receiptProviders(state);
  const mark = (node: string, t: Term, note?: string | null) => {
    const prev = marks.get(node);
    const notes = [...(prev?.notes ?? [])];
    if (note) notes.push(note);
    // A signal (refused, failed, waiting) wins over a plain word.
    const keep = prev && prev.term.signal && !t.signal ? prev.term : t;
    marks.set(node, { term: keep, notes, hints: prev?.hints ?? [], provider: providers.get(node) ?? prev?.provider ?? null, summary: prev?.summary ?? null, list: prev?.list ?? null });
  };
  const cardNodes = card.nodes ?? [];
  for (const n of cardNodes) {
    mark(n.node, n.verdict ? term("run", n.verdict) : term("step", "fired"));
    if (n.summary) marks.get(n.node)!.summary = n.summary;
    const list = listOutcome(n);
    if (list) marks.get(n.node)!.list = list;
  }
  // The journal's fired nodes: every node the run finished, past the card's latest few.
  for (const outcome of state?.outcomes ?? []) {
    const o = record(outcome);
    if (o?.event_kind === "node_fired" && typeof o.node_id === "string" && !marks.has(o.node_id)) mark(o.node_id, term("step", "fired"));
  }
  if (card.current_node) mark(card.current_node.node, term("run", "running"));
  for (const input of card.pending_inputs ?? []) {
    const node = inputStep(input.name);
    if (node) mark(node, term("step", "waiting_input"), `input ${input.name}`);
  }
  const terminal = card.terminal;
  if (terminal) {
    const node = "node_id" in terminal ? terminal.node_id : "last_node_id" in terminal ? terminal.last_node_id : null;
    const code = "code" in terminal ? terminal.code : "reason" in terminal ? terminal.reason : null;
    if (node) mark(node, term("run", terminal.classification ?? "failed"), code ?? null);
  }
  for (const egress of card.terminal_egress ?? []) {
    const e = term("egress", egress.verdict);
    const authority = egress.effective_authority
      ? `needs ${egress.required_authority}, had ${egress.effective_authority}`
      : `needs ${egress.required_authority}`;
    const prev = marks.get(egress.node_id);
    marks.set(egress.node_id, {
      term: prev?.term.signal ? prev.term : e.signal ? e : (prev?.term ?? e),
      notes: [...(prev?.notes ?? []), e.word.toLowerCase()],
      hints: [...(prev?.hints ?? []), `${e.word}: ${authority}`],
      provider: prev?.provider ?? null,
      summary: prev?.summary ?? null,
      list: prev?.list ?? null,
    });
  }
  const reads = new Map<string, number>();
  for (const observation of state?.source_observations ?? []) {
    if (observation.node_id) reads.set(observation.node_id, (reads.get(observation.node_id) ?? 0) + 1);
  }
  for (const [node, count] of reads) {
    const prev = marks.get(node);
    if (prev) prev.notes.push(`read ${count} ${count === 1 ? "Capture" : "Captures"}`);
  }
  // The Captures each node read and produced: before and after, by digest.
  for (const observation of state?.source_observations ?? []) {
    const prev = observation.node_id ? marks.get(observation.node_id) : undefined;
    if (prev && observation.capture_digest && !(prev.capturesIn ??= []).includes(observation.capture_digest)) prev.capturesIn.push(observation.capture_digest);
  }
  for (const [, m] of marks) {
    if (m.summary?.kind === "call" && m.summary.capture_digests?.length) m.capturesOut = [...m.summary.capture_digests];
  }
  // Pinned builds for nodes the card and journal did not mention still show.
  for (const [node, provider] of providers) {
    const prev = marks.get(node);
    if (prev) prev.provider = provider;
  }
  if (card.status !== "running") {
    for (const id of nodeIds) if (!marks.has(id)) marks.set(id, { term: term("step", "not_run"), notes: [], hints: [], provider: providers.get(id) ?? null });
  }
  const others = [...marks.entries()].filter(([node]) => !known.has(node)).map(([node, m]) => ({ node, term: m.term }));
  for (const { node } of others) marks.delete(node);
  return { marks, others, partial: cardNodes.length < card.nodes_done };
}
