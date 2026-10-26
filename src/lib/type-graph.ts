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
export function objectKinds(type: string): string[] {
  if (!type.startsWith(`${SUBJECT_TYPE}:`)) return [];
  return type
    .slice(SUBJECT_TYPE.length + 1)
    .split(",")
    .map((kind) => kind.trim())
    .filter(Boolean);
}

export function isSubjectValued(type: string): boolean {
  return type === SUBJECT_TYPE || type.startsWith(`${SUBJECT_TYPE}:`);
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
