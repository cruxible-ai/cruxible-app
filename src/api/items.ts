/**
 * Item shapes inside the QueryToolResult envelope.
 *
 * The generated OpenAPI schema now defines the concrete query item variants.
 * These guards keep rendering defensive when result shapes and item payloads
 * disagree at runtime.
 */

import type { components } from "./generated/schema";

export type EntityRef = components["schemas"]["QueryEntityItem"];
export type PathItem = components["schemas"]["QueryPathItem"];

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
