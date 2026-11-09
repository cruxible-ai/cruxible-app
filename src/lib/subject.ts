import type { GetClaimCard, GetSubjectCard, OrientPredicate, OrientSubjectKind } from "@/api/schemas";
import { parseRef } from "./cruxible-ref";
import { evidenceMode } from "./ontology";

/**
 * Subject-page helpers: what a field's ClaimType asks of evidence, which
 * fields are the kind's key, the Claims tally, and a pointing Subject's
 * literal fields (change sets are in change-sets.ts). Everything reads the ontology (orient's
 * claim_types and subject_kinds) and the reads the page already makes; no
 * predicate or kit is named here.
 */

// -- evidence -----------------------------------------------------------------

/**
 * What a field's ClaimType asks of evidence: `required` (captured: only an
 * admitted Capture backs it, so a refused citation is wrong), `own-words`
 * (the author's own words may stand), `none`, or `unknown` while the
 * ClaimTypes are still being read (nothing reads as wrong until known).
 */
export type EvidenceNeed = "required" | "own-words" | "none" | "unknown";

export function evidenceNeed(descriptor: OrientPredicate | undefined): EvidenceNeed {
  if (!descriptor) return "unknown";
  const mode = evidenceMode(descriptor);
  return mode === "captured" ? "required" : mode;
}

// -- keys ---------------------------------------------------------------------

/** Each SubjectKind's key ClaimTypes (full predicates); minted kinds have none. */
export function keyPredicates(kinds: readonly OrientSubjectKind[] | undefined): Map<string, Set<string>> {
  return new Map((kinds ?? []).map((kind) => [kind.kind, new Set(kind.rule === "keys" ? (kind.keys ?? []) : [])]));
}

/** Whether a field (by its descriptor's full predicate, or the predicate as written) is a key part. */
export function isKeyField(keys: ReadonlySet<string> | undefined, predicate: string, descriptor?: OrientPredicate): boolean {
  if (!keys || keys.size === 0) return false;
  return keys.has(descriptor?.predicate ?? predicate) || keys.has(predicate);
}

// -- the Claims tally ---------------------------------------------------------

/**
 * How many Claims, and how many in each state that is not the normal one: a
 * card's flags and its verdict when it is not `supported`. Empty `states`
 * means every Claim read is supported.
 */
export function claimStates(
  cards: Iterable<Pick<GetClaimCard, "verdict" | "flags"> & { claim?: string }>,
  drifted: ReadonlySet<string> = new Set(),
): { total: number; states: Map<string, number> } {
  let total = 0;
  const states = new Map<string, number>();
  for (const card of cards) {
    total += 1;
    const own = new Set<string>(card.flags ?? []);
    // a served drift row names the Claim: a cited source changed since it was cited
    if (card.claim !== undefined && drifted.has(card.claim)) own.add("drifted");
    if (card.verdict !== "supported") own.add(card.verdict);
    for (const state of own) states.set(state, (states.get(state) ?? 0) + 1);
  }
  return { total, states };
}

// -- a pointing Subject, summarized -------------------------------------------

export interface FieldSummary {
  field: string;
  value: string;
}

const SUMMARY_VALUE_CHARS = 48;

function scalarText(value: unknown): string | null {
  if (typeof value === "string") return value.length > SUMMARY_VALUE_CHARS ? `${value.slice(0, SUMMARY_VALUE_CHARS)}…` : value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return null;
}

/**
 * Up to `limit` of a Subject's literal fields, to tell it apart in a list:
 * Subject-valued fields (by their ClaimType's type), key parts (the id
 * already spells them) and structured or previewed values are left out;
 * single-valued fields come first, then the card's order.
 */
export function literalSummary(
  card: Pick<GetSubjectCard, "kind" | "claims">,
  predicates: ReadonlyMap<string, OrientPredicate>,
  keys: ReadonlySet<string> | undefined,
  limit = 3,
): FieldSummary[] {
  const rows: (FieldSummary & { many: boolean })[] = [];
  for (const entry of card.claims) {
    const descriptor = predicates.get(`${card.kind}\n${entry.predicate}`);
    if (descriptor ? descriptor.type.startsWith("subject:") : typeof entry.value === "string" && parseRef(entry.value)?.kind === "subject") continue;
    if (isKeyField(keys, entry.predicate, descriptor)) continue;
    const values = Array.isArray(entry.value) ? entry.value : [entry.value];
    const texts = values.map(scalarText);
    if (texts.length === 0 || texts.some((text) => text === null)) continue;
    const shown = texts.slice(0, 2).join(", ") + (texts.length > 2 ? ` +${texts.length - 2}` : "");
    rows.push({ field: entry.predicate, value: shown, many: descriptor?.cardinality === "many" });
  }
  return rows
    .map((row, i) => ({ row, i }))
    .sort((a, b) => Number(a.row.many) - Number(b.row.many) || a.i - b.i)
    .slice(0, limit)
    .map(({ row }) => ({ field: row.field, value: row.value }));
}
