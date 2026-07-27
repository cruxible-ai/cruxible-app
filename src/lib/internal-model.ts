import { useMemo } from "react";
import { useInstanceSchema, useStateStatus } from "@/api/hooks";

/**
 * Internal model vs reference layer: which part of a composed instance is the
 * operator's own world, and which part is bulk they ingested to reason
 * against.
 *
 * A composed instance (reference feed + local judgment layer) renders as a
 * hairball because the feed dominates by orders of magnitude — 3,195 catalog
 * products next to 28 assets. The operator's model is the small half: their
 * assets, services, owners, controls and decisions, plus exactly those
 * reference rows their own judgment has reached out and touched.
 *
 * THE SPLIT IS DERIVED, NEVER NAMED. Nothing in this module knows what a
 * Product or a Vulnerability is; a kit-noun list here would be a lie the
 * moment a second kit shipped. Two honest signals, in order:
 *
 *   (a) UPSTREAM OWNERSHIP — GET /state/status returns the upstream release's
 *       `owned_entity_types` / `owned_relationship_types` for an instance that
 *       tracks published upstream state. Ownership is enforced (the engine
 *       refuses local writes to upstream-owned types), so it is not a guess:
 *       what you cannot write is reference, what you can is yours.
 *
 *   (b) GOVERNANCE SHAPE — for instances composed from kits rather than
 *       pulled from an upstream release, /schema carries no ownership at all
 *       (see the friction note at the bottom). What it does carry is the
 *       governance shape, and the shape is diagnostic:
 *
 *         · relationship types with write_policy proposal_only/governed are
 *           the JUDGMENT SEAMS — the edges that exist only because somebody
 *           reviewed them. Deterministic types are written straight through.
 *         · deleting the seams from the type graph leaves DETERMINISTIC
 *           COMPONENTS: clusters of types written together in bulk, which
 *           cannot reach each other except across a seam.
 *         · a component built by a workflow that PINS AN EXTERNAL SOURCE
 *           ARTIFACT (a register_source_artifacts step) is an ingested
 *           feed — reference material, citable by revision, not authored here.
 *
 *       Reference = the deterministic components of the pinned feeds, but only
 *       when a judgment seam actually separates them from the rest. A feed
 *       nobody has judged against is not a reference layer, it is the whole
 *       instance, and focusing would just empty the canvas.
 *
 * Everything not classified reference is internal — the default is the
 * operator's own, so an unrecognised ontology renders whole rather than
 * silently losing half of itself.
 */

export type ModelSide = "internal" | "reference";

/** Which signal produced the split — surfaced in the UI, because a derived
 * answer and an enforced one deserve different confidence. */
export type InternalModelSource = "upstream_ownership" | "governance_shape" | "none";

export interface InternalModel {
  source: InternalModelSource;
  /** True when the instance really splits — the toggle is pointless otherwise. */
  available: boolean;
  referenceEntityTypes: ReadonlySet<string>;
  /** Relationship types that carry judgment across the seam. */
  judgmentRelationshipTypes: ReadonlySet<string>;
  sideFor: (entityType: string) => ModelSide;
}

export const EMPTY_INTERNAL_MODEL: InternalModel = {
  source: "none",
  available: false,
  referenceEntityTypes: new Set<string>(),
  judgmentRelationshipTypes: new Set<string>(),
  sideFor: () => "internal",
};

interface RelationshipShape {
  name?: string | null;
  from_entity?: string | null;
  to_entity?: string | null;
  write_policy?: string | null;
  write_tier?: string | null;
}

interface WorkflowStepShape {
  kind?: string | null;
  config?: unknown;
}

interface SchemaShape {
  entity_types?: Record<string, unknown> | undefined;
  relationships?: RelationshipShape[] | Record<string, RelationshipShape> | undefined;
  workflows?: Record<string, { steps?: WorkflowStepShape[] } | undefined> | undefined;
}

export interface UpstreamOwnership {
  owned_entity_types?: string[] | undefined;
  owned_relationship_types?: string[] | undefined;
}

/** Relationships serialize as a list; tolerate a map for older payloads. */
function relationshipList(schema: SchemaShape | undefined): RelationshipShape[] {
  const raw = schema?.relationships;
  if (Array.isArray(raw)) return raw;
  return raw ? Object.values(raw) : [];
}

/**
 * The judgment seams. `write_policy: proposal_only` (and the forward-declared
 * `governed`) is the propose→review lifecycle; `write_tier: governed_write`
 * marks a write path that still passes through governance. Both are edges a
 * human or a policy signed off on, which is what "seam" means here.
 */
export function judgmentRelationshipTypes(schema: unknown): Set<string> {
  const names = new Set<string>();
  for (const rel of relationshipList(schema as SchemaShape | undefined)) {
    if (typeof rel.name !== "string") continue;
    if (
      rel.write_policy === "proposal_only" ||
      rel.write_policy === "governed" ||
      rel.write_tier === "governed_write"
    ) {
      names.add(rel.name);
    }
  }
  return names;
}

/**
 * Entity types materialized by a workflow that pins an external source
 * artifact. `register_source_artifacts` is the step that turns fetched
 * material into revisioned, citable evidence — the defining act of ingesting
 * a reference feed. A workflow that loads local records (a CMDB export, a
 * seed bundle) has no reason to pin anything: those rows ARE the source.
 */
export function pinnedFeedEntityTypes(schema: unknown): Set<string> {
  const types = new Set<string>();
  const workflows = (schema as SchemaShape | undefined)?.workflows ?? {};
  for (const workflow of Object.values(workflows)) {
    const steps = workflow?.steps ?? [];
    if (!steps.some((s) => s?.kind === "register_source_artifacts")) continue;
    for (const step of steps) {
      if (step?.kind !== "make_entities" && step?.kind !== "propose_entities") continue;
      const entityType = (step.config as { entity_type?: unknown } | undefined)?.entity_type;
      if (typeof entityType === "string") types.add(entityType);
    }
  }
  return types;
}

/**
 * Entity types grouped by deterministic connectivity: two types share a
 * component when an ungoverned relationship type joins them, so a component is
 * a body of state written together without review. Judgment seams are removed
 * first — crossing one is exactly what a component boundary means.
 */
function deterministicComponents(
  entityTypes: string[],
  relationships: RelationshipShape[],
  judgment: ReadonlySet<string>,
): Map<string, string> {
  const parent = new Map<string, string>(entityTypes.map((t) => [t, t]));
  const find = (t: string): string => {
    let root = t;
    while (parent.get(root) !== root) root = parent.get(root) ?? root;
    let walk = t;
    while (parent.get(walk) !== root) {
      const next = parent.get(walk) ?? root;
      parent.set(walk, root);
      walk = next;
    }
    return root;
  };
  for (const rel of relationships) {
    const { from_entity: from, to_entity: to, name } = rel;
    if (typeof name !== "string" || judgment.has(name)) continue;
    if (typeof from !== "string" || typeof to !== "string") continue;
    if (!parent.has(from) || !parent.has(to)) continue;
    const a = find(from);
    const b = find(to);
    if (a !== b) parent.set(a, b);
  }
  return new Map(entityTypes.map((t) => [t, find(t)]));
}

/**
 * Classify every entity type. `upstream` wins when present — it is enforced
 * ownership, not inference.
 */
export function deriveInternalModel(
  schema: unknown,
  upstream?: UpstreamOwnership | null,
): InternalModel {
  const shape = schema as SchemaShape | undefined;
  const entityTypes = Object.keys(shape?.entity_types ?? {});
  const relationships = relationshipList(shape);
  const judgment = judgmentRelationshipTypes(schema);
  if (entityTypes.length === 0) return EMPTY_INTERNAL_MODEL;

  const upstreamEntityTypes = (upstream?.owned_entity_types ?? []).filter((t) =>
    entityTypes.includes(t),
  );
  if (upstreamEntityTypes.length > 0 && upstreamEntityTypes.length < entityTypes.length) {
    const reference = new Set(upstreamEntityTypes);
    // Every relationship the local instance may write is a local statement
    // about the upstream world — the same role a proposal seam plays.
    const upstreamRelationships = new Set(upstream?.owned_relationship_types ?? []);
    const seams = new Set(judgment);
    for (const rel of relationships) {
      if (typeof rel.name === "string" && !upstreamRelationships.has(rel.name)) {
        seams.add(rel.name);
      }
    }
    return {
      source: "upstream_ownership",
      available: true,
      referenceEntityTypes: reference,
      judgmentRelationshipTypes: seams,
      sideFor: (t) => (reference.has(t) ? "reference" : "internal"),
    };
  }

  const feedTypes = pinnedFeedEntityTypes(schema);
  if (feedTypes.size === 0) return EMPTY_INTERNAL_MODEL;

  const componentOf = deterministicComponents(entityTypes, relationships, judgment);
  const feedComponents = new Set(
    [...feedTypes].map((t) => componentOf.get(t)).filter((c): c is string => c !== undefined),
  );
  const reference = new Set(
    entityTypes.filter((t) => feedComponents.has(componentOf.get(t) ?? t)),
  );
  // An instance that is ALL feed has no operator layer to focus on, and one
  // whose feed no judgment seam reaches is not a reference layer — it is just
  // the state. Refuse to offer the toggle rather than draw a misleading graph.
  if (reference.size === 0 || reference.size === entityTypes.length) return EMPTY_INTERNAL_MODEL;
  const seamCrosses = relationships.some(
    (rel) =>
      typeof rel.name === "string" &&
      judgment.has(rel.name) &&
      typeof rel.from_entity === "string" &&
      typeof rel.to_entity === "string" &&
      reference.has(rel.from_entity) !== reference.has(rel.to_entity),
  );
  if (!seamCrosses) return EMPTY_INTERNAL_MODEL;

  return {
    source: "governance_shape",
    available: true,
    referenceEntityTypes: reference,
    judgmentRelationshipTypes: judgment,
    sideFor: (t) => (reference.has(t) ? "reference" : "internal"),
  };
}

interface FocusRow {
  id: string;
  data: { entityType: string };
}

interface FocusLink {
  source: string;
  target: string;
  row: { relationship_type: string };
}

export interface InternalModelFocus<R, L> {
  rows: R[];
  links: L[];
  /** Reference entities kept, per type — the judgment's far endpoints. */
  keptReferenceByType: Map<string, number>;
}

/**
 * Cut a drawn graph down to the internal model.
 *
 * Keep every internal entity and every edge between internal entities. Keep a
 * reference entity only where an internal entity's own judgment reaches it —
 * the matched product, the postured vulnerability. It appears AS the endpoint
 * of that judgment and brings nothing else with it: no vendor tree, no
 * catalog neighbours, no edges to the reference bulk it came from.
 *
 * `overrides` promote a type back to internal (the per-instance escape hatch
 * for an ontology the derivation reads wrong).
 */
export function focusInternalModel<R extends FocusRow, L extends FocusLink>(
  rows: R[],
  links: L[],
  model: InternalModel,
  overrides?: ReadonlySet<string>,
): InternalModelFocus<R, L> {
  const isReference = (entityType: string) =>
    model.referenceEntityTypes.has(entityType) && !(overrides?.has(entityType) ?? false);
  const typeById = new Map(rows.map((r) => [r.id, r.data.entityType]));
  const keptIds = new Set<string>();
  for (const row of rows) if (!isReference(row.data.entityType)) keptIds.add(row.id);

  const keptReferenceByType = new Map<string, number>();
  for (const link of links) {
    const sourceType = typeById.get(link.source);
    const targetType = typeById.get(link.target);
    if (sourceType === undefined || targetType === undefined) continue;
    const sourceRef = isReference(sourceType);
    const targetRef = isReference(targetType);
    if (sourceRef === targetRef) continue;
    if (!model.judgmentRelationshipTypes.has(link.row.relationship_type)) continue;
    const referenceId = sourceRef ? link.source : link.target;
    const referenceType = sourceRef ? sourceType : targetType;
    if (keptIds.has(referenceId)) continue;
    keptIds.add(referenceId);
    keptReferenceByType.set(referenceType, (keptReferenceByType.get(referenceType) ?? 0) + 1);
  }

  return {
    rows: rows.filter((r) => keptIds.has(r.id)),
    // Second pass, so a kept reference node also shows the deterministic
    // edges tying it to the internal side — it is drawn, so its local
    // structure should read. Reference-to-reference stays cut: that is the
    // bulk this whole mode exists to remove.
    links: links.filter((l) => {
      if (!keptIds.has(l.source) || !keptIds.has(l.target)) return false;
      const sourceType = typeById.get(l.source);
      const targetType = typeById.get(l.target);
      return !(
        sourceType !== undefined &&
        targetType !== undefined &&
        isReference(sourceType) &&
        isReference(targetType)
      );
    }),
    keptReferenceByType,
  };
}

/**
 * Screen-side accessor. `overrides` are the caller's persisted per-instance
 * preset; the derivation only supplies the default.
 *
 * FRICTION (reported upstream, same gap kit-layer.ts documents): /schema
 * serves the fully composed config with `extends` nulled and no per-type
 * provenance — no `source_kit`, no `composed_from`. A composed instance cannot
 * say which kit contributed which type, so the layering has to be reconstructed
 * from governance shape and workflow step kinds. A `source_kit` per entity type
 * (or the upstream ownership block extended to kit composition) would make this
 * module three lines long and turn a derivation into a fact.
 */
export function useInternalModel(): InternalModel {
  const schema = useInstanceSchema();
  const status = useStateStatus();
  const schemaData = schema.data;
  const upstream = (status.data as { upstream?: UpstreamOwnership | null } | undefined)?.upstream;
  return useMemo(
    () => deriveInternalModel(schemaData, upstream ?? null),
    [schemaData, upstream],
  );
}
