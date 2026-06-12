/**
 * Item shapes inside the QueryToolResult envelope.
 *
 * The OpenAPI contract types `items` as `object[]`; the concrete shapes below
 * (entity-shaped for `result_shape: "entity"`, path-shaped for
 * `result_shape: "path"`) are observed from the live daemon and guarded at
 * runtime. Reported as contract friction — these should eventually be spec'd.
 */

// Type aliases (not interfaces) so they're assignable from the envelope's
// `{ [key: string]: unknown }` items via the runtime guards below.
export type EntityRef = {
  entity_type: string;
  entity_id: string;
  properties: Record<string, unknown>;
  metadata: Record<string, unknown>;
};

export type PathItem = {
  entry: EntityRef;
  result: EntityRef;
  entities: EntityRef[];
  relationships?: unknown[];
};

export type QueryItem = EntityRef | PathItem;

export function isEntityRef(item: unknown): item is EntityRef {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof (item as EntityRef).entity_type === "string" &&
    typeof (item as EntityRef).entity_id === "string"
  );
}

export function isPathItem(item: unknown): item is PathItem {
  return (
    typeof item === "object" &&
    item !== null &&
    isEntityRef((item as PathItem).entry) &&
    isEntityRef((item as PathItem).result)
  );
}

/** Best-effort string property accessor for untyped entity properties. */
export function prop(ref: EntityRef, key: string): string | undefined {
  const v = ref.properties[key];
  return typeof v === "string" ? v : undefined;
}
