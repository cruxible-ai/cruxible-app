import type { OrientKind, OrientPredicate } from "@/api/schemas";

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

export function buildTypeGraph(kinds: readonly OrientKind[]): {
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
