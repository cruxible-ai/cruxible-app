import { isEntityRef } from "@/api/items";

/**
 * Display heuristic for "cold" entities — terminal/archived work that
 * inspection surfaces (browse lists, entity-page neighbors) may hide behind
 * the hide-cold setting. This is UI-side vocabulary until the ontology
 * declares a coldness affordance; receipted query views NEVER apply this
 * filter, since hiding rows there would misrepresent what the receipt proves.
 */
const COLD_STATUSES = new Set([
  "closed",
  "done",
  "resolved",
  "archived",
  "retired",
  "superseded",
  "cancelled",
  "canceled",
]);

const COLD_LIFECYCLES = new Set(["superseded", "retired"]);

/** Whether a status value counts as cold, for status-breakdown arithmetic. */
export function isColdStatus(status: string): boolean {
  return COLD_STATUSES.has(status.toLowerCase());
}

export function isColdEntity(item: unknown): boolean {
  if (!isEntityRef(item)) return false;
  const props = item.properties ?? {};
  const lifecycle = props["lifecycle_status"];
  if (typeof lifecycle === "string" && COLD_LIFECYCLES.has(lifecycle.toLowerCase())) {
    return true;
  }
  const status = props["status"];
  return typeof status === "string" && COLD_STATUSES.has(status.toLowerCase());
}
