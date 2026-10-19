import type { GetResult, OrientKind, OrientPredicate, Schemas } from "@/api/schemas";
import { cardOf } from "@/api/schemas";
import { formatRef, parseRef } from "./cruxible-ref";
import { isSubjectValued } from "./type-graph";

/**
 * The neighborhood graph around one Subject: breadth-first over OUTGOING
 * Subject-valued Claims only, read hop by hop with get-batch (summary cards,
 * 64 refs per call, every hop at the page coordinate). Each node costs its
 * own indexed Claims; a load is bounded by the node cap, never the instance.
 *
 * An edge is a card Claim whose ClaimType is Subject-valued by its orient
 * type ("subject:<kinds>"), never by the shape of the displayed string.
 * Incoming edges are only counted (the card's indexed `incoming_count`);
 * listing them needs a paged incoming read (design gap G2), see IncomingReader.
 */

export const NEIGHBORHOOD_NODE_CAP = 150;
export const NEIGHBORHOOD_MAX_DEPTH = 2;

type SubjectCard = Schemas["GetSubjectCard"];

export interface NeighborhoodNode {
  ref: string;
  kind: string;
  depth: number;
  card: SubjectCard | null;
  /** Why the card could not be read (dangling or refused ref). */
  error: string | null;
  incomingCount: number | null;
  /** Subject-valued outgoing targets this node names. */
  outgoingTotal: number;
  /** Of those, how many are drawn (the rest are beyond depth or the cap). */
  outgoingShown: number;
}

export interface NeighborhoodEdge {
  id: string;
  source: string;
  target: string;
  /** The field name the card shows (short), and the full predicate when known. */
  field: string;
  predicate: string;
  cardinality: OrientPredicate["cardinality"];
  claim: string;
}

export interface Neighborhood {
  root: string;
  depth: number;
  nodes: NeighborhoodNode[];
  edges: NeighborhoodEdge[];
  /** True when the node cap stopped the walk. */
  capped: boolean;
  /** get-batch calls the walk made (for the cost readout). */
  calls: number;
}

/** Reads summary cards for refs (≤ 64), in order; rejects when any ref fails. */
export type CardFetcher = (refs: string[]) => Promise<GetResult[]>;

/** (kind, field shown on its cards) -> the ClaimType descriptor, from orient. */
export function predicateIndex(kinds: readonly OrientKind[]): Map<string, OrientPredicate> {
  const index = new Map<string, OrientPredicate>();
  for (const kind of kinds) {
    for (const predicate of kind.predicates) {
      index.set(`${kind.kind}\n${predicate.name}`, predicate);
      index.set(`${kind.kind}\n${predicate.predicate}`, predicate);
    }
  }
  return index;
}

/** The Subject refs one card points at through Subject-valued Claims. */
export function outgoing(
  card: SubjectCard,
  predicates: Map<string, OrientPredicate>,
): { target: string; field: string; descriptor: OrientPredicate; claim: string }[] {
  const out: { target: string; field: string; descriptor: OrientPredicate; claim: string }[] = [];
  for (const entry of card.claims) {
    const descriptor = predicates.get(`${card.kind}\n${entry.predicate}`);
    if (!descriptor || !isSubjectValued(descriptor.type)) continue;
    const values = Array.isArray(entry.value) ? entry.value : [entry.value];
    const claims = Array.isArray(entry.claim) ? entry.claim : [entry.claim];
    values.forEach((value, i) => {
      if (typeof value !== "string") return;
      const ref = parseRef(value);
      if (ref?.kind !== "subject") return;
      out.push({ target: formatRef(ref), field: entry.predicate, descriptor, claim: claims[i] ?? claims[0]! });
    });
  }
  return out;
}

const BATCH = 64;

async function readCards(
  refs: string[],
  fetch: CardFetcher,
  counter: { calls: number },
): Promise<Map<string, { card: SubjectCard | null; error: string | null }>> {
  const out = new Map<string, { card: SubjectCard | null; error: string | null }>();
  const take = (ref: string, result: GetResult) => {
    const card = cardOf(result, "subject");
    out.set(ref, card ? { card, error: null } : { card: null, error: `not a Subject (${result.kind})` });
  };
  for (let i = 0; i < refs.length; i += BATCH) {
    const chunk = refs.slice(i, i + BATCH);
    counter.calls += 1;
    try {
      const results = await fetch(chunk);
      chunk.forEach((ref, j) => take(ref, results[j]!));
    } catch {
      // get-batch refuses the whole chunk for one bad ref: retry one by one,
      // only on failure, so a dangling target costs its own call.
      for (const ref of chunk) {
        counter.calls += 1;
        try {
          take(ref, (await fetch([ref]))[0]!);
        } catch (err) {
          out.set(ref, { card: null, error: err instanceof Error ? err.message : String(err) });
        }
      }
    }
  }
  return out;
}

export async function walkNeighborhood(
  root: string,
  depth: number,
  kinds: readonly OrientKind[],
  fetch: CardFetcher,
  cap = NEIGHBORHOOD_NODE_CAP,
): Promise<Neighborhood> {
  const maxDepth = Math.max(1, Math.min(depth, NEIGHBORHOOD_MAX_DEPTH));
  const predicates = predicateIndex(kinds);
  const counter = { calls: 0 };
  const nodes = new Map<string, NeighborhoodNode>();
  const edges = new Map<string, NeighborhoodEdge>();
  let capped = false;

  const place = (ref: string, at: number, read: { card: SubjectCard | null; error: string | null }) => {
    nodes.set(ref, {
      ref,
      kind: read.card?.kind ?? (parseRef(ref)?.kind === "subject" ? ref.split("/", 1)[0]! : "?"),
      depth: at,
      card: read.card,
      error: read.error,
      incomingCount: read.card?.incoming_count ?? null,
      outgoingTotal: 0,
      outgoingShown: 0,
    });
  };

  const rootRead = (await readCards([root], fetch, counter)).get(root)!;
  if (!rootRead.card) throw new Error(rootRead.error ?? `${root} is not a Subject`);
  const rootRef = rootRead.card.subject;
  place(rootRef, 0, rootRead);

  let frontier = [rootRef];
  for (let hop = 0; hop <= maxDepth && frontier.length > 0; hop += 1) {
    const next: string[] = [];
    for (const ref of frontier) {
      const node = nodes.get(ref)!;
      if (!node.card) continue;
      const links = outgoing(node.card, predicates);
      node.outgoingTotal = links.length;
      for (const link of links) {
        if (!nodes.has(link.target) && !next.includes(link.target)) {
          // The last layer only links among nodes already drawn.
          if (hop === maxDepth) continue;
          if (nodes.size + next.length >= cap) {
            capped = true;
            continue;
          }
          next.push(link.target);
        }
        const id = `${ref}\n${link.descriptor.predicate}\n${link.target}`;
        edges.set(id, {
          id,
          source: ref,
          target: link.target,
          field: link.field,
          predicate: link.descriptor.predicate,
          cardinality: link.descriptor.cardinality,
          claim: link.claim,
        });
        node.outgoingShown += 1;
      }
    }
    if (next.length === 0) break;
    const reads = await readCards(next, fetch, counter);
    for (const ref of next) place(ref, hop + 1, reads.get(ref)!);
    frontier = next;
  }
  // Edges into targets that were never placed (cap) are dropped with the target.
  for (const [id, edge] of edges) if (!nodes.has(edge.target)) edges.delete(id);
  for (const node of nodes.values()) {
    node.outgoingShown = [...edges.values()].filter((edge) => edge.source === node.ref).length;
  }
  return { root: rootRef, depth: maxDepth, nodes: [...nodes.values()], edges: [...edges.values()], capped, calls: counter.calls };
}

// -- incoming edges (design gap G2) --------------------------------------------

/** One page of Subject-valued Claims that point at a Subject. */
export interface IncomingPage {
  claims: { subject: string; predicate: string; claim: string }[];
  nextCursor: string | null;
}

/**
 * The seam for the paged incoming read being built in core (claude/app-read-gaps):
 * once the pinned contract serves it, implement this over that route and the
 * neighborhood panel lists incoming edges. Until then only the count shows.
 */
export type IncomingReader = (subject: string, cursor: string | null) => Promise<IncomingPage>;
