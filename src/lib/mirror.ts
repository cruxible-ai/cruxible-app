import type { NextHealth } from "../api/schemas.ts";

/**
 * The ledger mirror as `next` reports it (the `ledger_mirror` health facet,
 * measured at the accepted head): where the ledger publishes itself, whether
 * the remote holds the head, and when a push failed, Git's own words. The
 * facet's `detail` is an open object in the contract: read defensively.
 */
export interface MirrorStatus {
  state: string;
  url: string | null;
  attemptedAt: string | null;
  requested: number | null;
  published: number | null;
  publishedOid: string | null;
  headOid: string | null;
  /** Why the last push failed, as Git said it (behind), or what never published. */
  message: string | null;
  /** The command that publishes now. */
  command: string | null;
  /** What restores it, as `next` names the repair (a hand edit off this host). */
  repair: string | null;
}

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);
const num = (value: unknown): number | null => (typeof value === "number" ? value : null);

export function mirrorStatus(health: NextHealth | null | undefined): MirrorStatus | null {
  if (!health) return null;
  const detail = record(health.detail);
  return {
    state: health.state,
    url: str(detail?.mirror_url) ?? (health.repair?.operation === "hand_edit" ? health.repair.target : null),
    attemptedAt: str(detail?.attempted_at),
    requested: num(detail?.requested_sequence),
    published: num(detail?.published_sequence),
    publishedOid: str(detail?.published_main_oid),
    headOid: str(detail?.accepted_git_oid),
    message: str(detail?.message),
    command: str(detail?.publication_command),
    repair: health.repair && !health.repair_hidden ? health.repair.required_change.replaceAll("_", " ") : null,
  };
}
