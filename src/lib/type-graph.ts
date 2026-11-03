import type { OrientKindSummary, OrientPredicate } from "../api/schemas.ts";

/**
 * A Subject kind with every ClaimType it carries. Orient's default map names
 * a kind's first fields only (OrientKindSummary); the ClaimTypes come from
 * orient section=claim_types, each listed under every kind its
 * `subject_kinds` names (a ClaimType shared by several kinds appears under
 * each), in section order. `evidence` is the sorted union of the contracts its ClaimTypes admit.
 */
export interface OntologyKind {
  kind: string;
  subjects: number;
  identity?: string;
  evidence: string[];
  predicates: OrientPredicate[];
}

/** The kinds orient lists, each with its ClaimTypes from the claim_types section. */
export function ontologyKinds(
  summaries: readonly OrientKindSummary[],
  claimTypes: readonly OrientPredicate[],
): OntologyKind[] {
  const byKind = new Map<string, OrientPredicate[]>();
  for (const predicate of claimTypes) {
    for (const kind of predicate.subject_kinds ?? []) {
      const list = byKind.get(kind) ?? [];
      list.push(predicate);
      byKind.set(kind, list);
    }
  }
  return summaries.map((summary) => {
    const predicates = byKind.get(summary.kind) ?? [];
    return {
      kind: summary.kind,
      subjects: summary.subjects,
      ...(summary.identity !== undefined ? { identity: summary.identity } : {}),
      evidence: [...new Set(predicates.flatMap((p) => p.evidence ?? []))].sort(),
      predicates,
    };
  });
}

/** How many ClaimTypes orient's kind summary counts (its first fields plus the rest). */
export function summaryFieldCount(summary: OrientKindSummary): number {
  return (summary.fields ?? []).length + (summary.more_fields ?? 0);
}

/**
 * The ontology as a graph: SubjectKinds are nodes, and every Subject-valued
 * ClaimType (orient `type` "subject:<kinds>") is an edge from each kind that
 * carries it to each kind it may point at. ClaimTypes between the same two
 * kinds share one edge. A bare "subject" type (any kind) draws no edge; the
 * kind's panel lists it.
 */

export interface TypeGraphNode {
  kind: string;
  subjects: number;
  /** Named as a ClaimType target but not listed by orient (no Subjects, no ClaimTypes). */
  referencedOnly: boolean;
}

export interface TypeGraphEdge {
  id: string;
  source: string;
  target: string;
  predicates: OrientPredicate[];
}

const SUBJECT_TYPE = "subject";

/** The kinds a Subject-valued type may point at; [] for literals and for "any kind". */
/**
 * The Subject kinds a value type points at: `subject<a>` or a union
 * `subject<a | b>` (orient), or `subject:a|b` (query pages); [] for literals.
 */
export function objectKinds(type: string): string[] {
  const t = type.trim();
  // Core spells it `subject<a | b>` in orient and `subject:a|b` on query pages.
  const angled = /^subject<(.+)>$/.exec(t);
  const listed = angled ? angled[1]! : t.startsWith("subject:") ? t.slice("subject:".length) : null;
  if (listed === null) return [];
  return listed
    .split(/[|,]/)
    .map((kind) => kind.trim())
    .filter(Boolean);
}

export function isSubjectValued(type: string): boolean {
  const t = type.trim();
  return t === SUBJECT_TYPE || t.startsWith(`${SUBJECT_TYPE}<`) || t.startsWith(`${SUBJECT_TYPE}:`);
}

export function edgeId(source: string, target: string): string {
  return `${source}->${target}`;
}

export function buildTypeGraph(kinds: readonly OntologyKind[]): {
  nodes: TypeGraphNode[];
  edges: TypeGraphEdge[];
} {
  const nodes = new Map<string, TypeGraphNode>(
    kinds.map((kind) => [kind.kind, { kind: kind.kind, subjects: kind.subjects, referencedOnly: false }]),
  );
  const edges = new Map<string, TypeGraphEdge>();
  for (const kind of kinds) {
    for (const predicate of kind.predicates) {
      for (const target of objectKinds(predicate.type)) {
        if (!nodes.has(target)) nodes.set(target, { kind: target, subjects: 0, referencedOnly: true });
        const id = edgeId(kind.kind, target);
        const edge = edges.get(id) ?? { id, source: kind.kind, target, predicates: [] };
        edge.predicates.push(predicate);
        edges.set(id, edge);
      }
    }
  }
  return {
    nodes: [...nodes.values()].sort((a, b) => a.kind.localeCompare(b.kind)),
    edges: [...edges.values()],
  };
}

/** The edge carrying `predicate`, if it is Subject-valued and drawn. */
export function edgeForPredicate(edges: readonly TypeGraphEdge[], predicate: string): TypeGraphEdge | undefined {
  return edges.find((edge) => edge.predicates.some((item) => item.predicate === predicate));
}

/**
 * A ClaimType's value type in plain words, whole (no truncation): `subject<a>`
 * reads `→ a`, `enum["x", "y"]` reads `one of x, y`, `decimal{0..1}` reads
 * `decimal 0–1`, `string{pattern: "^X$", max_len: 32}` reads
 * `text · pattern X · ≤32 chars`. Anything else reads as core spells it.
 */
export function valueTypeWords(type: string, label: (kind: string) => string = (kind) => kind): string {
  const t = type.trim();
  if (isSubjectValued(t)) return `→ ${objectKinds(t).map(label).join(", ") || "any kind"}`;
  const enumMatch = /^enum\[(.*)\]$/s.exec(t);
  if (enumMatch) {
    const members = [...enumMatch[1]!.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]!);
    return `one of ${members.join(", ")}`;
  }
  const range = /^(decimal|int|integer|number)\{\s*([^.\s]*)\s*\.\.\s*([^}\s]*)\s*\}$/.exec(t);
  if (range) return `${range[1] === "integer" ? "int" : range[1]} ${range[2] || "…"}–${range[3] || "…"}`;
  const text = /^string\{(.*)\}$/s.exec(t);
  if (text) {
    const parts = ["text"];
    const pattern = /pattern:\s*"((?:[^"\\]|\\.)*)"/.exec(text[1]!);
    if (pattern) parts.push(`pattern ${pattern[1]!.replace(/^\^/, "").replace(/\$$/, "")}`);
    const maxLen = /max_len:\s*(\d+)/.exec(text[1]!);
    if (maxLen) parts.push(`≤${maxLen[1]} chars`);
    return parts.join(" · ");
  }
  if (t === "string") return "text";
  return t;
}
