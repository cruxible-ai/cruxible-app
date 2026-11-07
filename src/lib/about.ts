import type { NextHealth, Schemas } from "../api/schemas.ts";

/**
 * What the About page compares and lists, from served fields only.
 */

export interface PinnedBuild {
  core_commit: string;
  core_version?: string;
  sdk_contract_snapshot_digest?: string;
}

export interface VersionRow {
  what: "core_version" | "sdk_contract";
  daemon: string | null;
  pinned: string | null;
  /** Both known and unequal. */
  differs: boolean;
}

/** The daemon's GET /version beside the console's pin (api/pin.json), row by row. */
export function versionRows(version: Record<string, string> | undefined, pin: PinnedBuild): VersionRow[] {
  const row = (what: VersionRow["what"], daemon: string | undefined, pinned: string | undefined): VersionRow => ({
    what,
    daemon: daemon ?? null,
    pinned: pinned ?? null,
    differs: daemon !== undefined && pinned !== undefined && daemon !== pinned,
  });
  return [row("core_version", version?.version, pin.core_version), row("sdk_contract", version?.sdk_contract_snapshot_digest, pin.sdk_contract_snapshot_digest)];
}

/** The health facets `next` reports, in reading order; the mirror has its own section. */
export const HEALTH_FACETS = ["instance", "floor", "provider_lane", "procedure_catalog", "compiler", "line_dispatch", "consumers", "triggers"] as const;

export interface HealthRow {
  facet: (typeof HEALTH_FACETS)[number];
  health: NextHealth;
  /** The repair `next` names (its required change), unless withheld from this caller. */
  repair: string | null;
  /** The facet's detail, flattened to `key: value` lines for hover. */
  detail: string | null;
}

export function healthRows(status: Schemas["NextStatus"] | undefined): HealthRow[] {
  if (!status) return [];
  return HEALTH_FACETS.map((facet) => {
    const health = status[facet];
    const detail = health.detail && typeof health.detail === "object" ? Object.entries(health.detail as Record<string, unknown>).map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`).join("\n") : null;
    return {
      facet,
      health,
      repair: health.repair && !health.repair_hidden ? health.repair.required_change.replaceAll("_", " ") : null,
      detail: detail || null,
    };
  });
}
