// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import { SINCE_ROWS } from "../api/requests.ts";
import type { OrientPredicate, Schemas } from "../api/schemas.ts";
import type { LogicalSource } from "./definitions.ts";
import { nextCronFire, wakeOf } from "./schedule.ts";

/**
 * The Dashboard's derivations from list reads: how fresh each source is
 * against the schedule that feeds it, stale and evidence counts per kind
 * (planned ClaimType fields, read defensively), and the belief changes since
 * the viewer last looked. Nothing here reads or counts Claims one by one.
 */

type OrientLine = Schemas["OrientLine"];
type OrientSource = Schemas["OrientSource"];
type SourceLanding = Schemas["OrientSourceLanding"];
type SinceRow = Schemas["SinceRow"];

// -- freshness --------------------------------------------------------------------

/**
 * fresh: landed within one expected interval; late: past one; stale: past two
 * (or never landed while a schedule expects it); by_hand: no enabled Line's
 * Trigger feeds it; unscheduled: an enabled Line feeds it, on no interval
 * this page can read (a generation or window Trigger, a contract-only landing).
 */
export type FreshMark = "fresh" | "late" | "stale" | "by_hand" | "unscheduled";

export interface SourceFreshness {
  source: string;
  landing: SourceLanding | null;
  /** The Lines that retain it (bare names), enabled ones first. */
  lines: string[];
  /** Seconds between expected landings; null when nothing schedules it. */
  interval: number | null;
  /** Seconds since it last landed; null when it never has. */
  age: number | null;
  /** null while a feeding Line's Triggers are still being read. */
  mark: FreshMark | null;
}

const enabledLine = (row: OrientLine | undefined) => row?.enablement != null && row.enablement !== "disabled";

const CADENCE = /^every (\d+)s$/;
const CRON = /^on cron (.+?)(?: \(([^)]+)\))?$/;
/** Fires sampled to find a cron's longest gap (a weekday-only cron's weekend gap counts). */
const CRON_SAMPLES = 8;

/** The longest gap between a cron's next fires, in seconds; null for an expression the schedule reader does not read. */
export function cronInterval(expression: string, now: Date): number | null {
  let previous = nextCronFire(expression, now);
  if (!previous) return null;
  let longest = 0;
  for (let i = 0; i < CRON_SAMPLES; i += 1) {
    const next = nextCronFire(expression, previous);
    if (!next) break;
    longest = Math.max(longest, (next.getTime() - previous.getTime()) / 1000);
    previous = next;
  }
  return longest || null;
}

/**
 * Each source's freshness. A source is fed by the Lines that retain it (and
 * the Line that last landed it); only enabled ones count, a stopped or
 * stalled one included (its source going late is what the viewer needs to
 * see). Its expected interval is the shortest of those Lines' Triggers: a
 * cadence's interval, a cron's longest gap, or for a landing Trigger the
 * interval of the source it waits on.
 *
 * `triggersOf` gives an enabled Line's Trigger `fires` phrases (its card),
 * undefined while that card is not read yet.
 */
export function sourceFreshness({
  sources,
  landings,
  lines,
  triggersOf,
  now,
}: {
  sources: readonly LogicalSource[];
  landings: readonly OrientSource[];
  lines: readonly OrientLine[];
  triggersOf: (line: string) => readonly string[] | undefined;
  now: Date;
}): SourceFreshness[] {
  const lineRows = new Map(lines.map((row) => [row.line.replace(/^Line:/, ""), row] as const));
  const landingOf = new Map(landings.map((row) => [row.logical_source, row] as const));
  const feeders = new Map<string, string[]>();
  const add = (source: string, line: string) => {
    const list = feeders.get(source) ?? [];
    if (!list.includes(line)) list.push(line);
    feeders.set(source, list);
  };
  for (const source of sources) {
    feeders.set(source.id, feeders.get(source.id) ?? []);
    for (const retention of source.retainedBy) if (retention.line) add(source.id, retention.line);
  }
  for (const landing of landings) {
    feeders.set(landing.logical_source, feeders.get(landing.logical_source) ?? []);
    if (landing.latest.line) add(landing.logical_source, landing.latest.line.replace(/^Line:/, ""));
  }

  // undefined: a card is still loading; null: nothing schedules it.
  const sourceInterval = (source: string, seen: Set<string>): number | null | undefined => {
    if (seen.has(source)) return null;
    const next = new Set(seen).add(source);
    let best: number | null = null;
    let loading = false;
    for (const line of feeders.get(source) ?? []) {
      if (!enabledLine(lineRows.get(line))) continue;
      const interval = lineInterval(line, next);
      if (interval === undefined) loading = true;
      else if (interval !== null) best = best === null ? interval : Math.min(best, interval);
    }
    return best ?? (loading ? undefined : null);
  };
  const lineInterval = (line: string, seen: Set<string>): number | null | undefined => {
    const fires = triggersOf(line);
    if (fires === undefined) return undefined;
    let best: number | null = null;
    let loading = false;
    for (const phrase of fires) {
      const interval = triggerInterval(phrase, seen);
      if (interval === undefined) loading = true;
      else if (interval !== null) best = best === null ? interval : Math.min(best, interval);
    }
    return best ?? (loading ? undefined : null);
  };
  const triggerInterval = (fires: string, seen: Set<string>): number | null | undefined => {
    const cadence = CADENCE.exec(fires);
    if (cadence) return Number(cadence[1]) || null;
    const cron = CRON.exec(fires);
    if (cron) return cronInterval(cron[1]!, now);
    const wake = wakeOf(fires, now);
    if (!wake.landing) return null;
    let best: number | null = null;
    let loading = false;
    for (const source of wake.sources) {
      const interval = sourceInterval(source, seen);
      if (interval === undefined) loading = true;
      else if (interval !== null) best = best === null ? interval : Math.min(best, interval);
    }
    return best ?? (loading ? undefined : null);
  };

  return [...feeders.keys()]
    .sort()
    .map((source) => {
      const landing = landingOf.get(source)?.latest ?? null;
      const fed = feeders.get(source)!;
      const enabled = fed.filter((line) => enabledLine(lineRows.get(line)));
      const ordered = [...enabled.sort(), ...fed.filter((line) => !enabled.includes(line)).sort()];
      const age = landing ? Math.max(0, (now.getTime() - new Date(landing.landed_at).getTime()) / 1000) : null;
      const interval = enabled.length ? sourceInterval(source, new Set()) : null;
      return {
        source,
        landing,
        lines: ordered,
        interval: interval ?? null,
        age,
        mark: enabled.length === 0 ? "by_hand" : interval === undefined ? null : freshMark(age, interval),
      };
    });
}

/**
 * fresh / late / stale against one expected interval, with a little grace
 * (a tenth of the interval, at most an hour) so a source is not late in the
 * minute between its schedule firing and its run landing.
 */
export function freshMark(age: number | null, interval: number | null): FreshMark {
  if (interval === null) return "unscheduled";
  if (age === null) return "stale";
  const grace = Math.min(interval * 0.1, 3600);
  if (age <= interval + grace) return "fresh";
  if (age <= 2 * interval + grace) return "late";
  return "stale";
}

/** An interval, short: "30s", "15m", "6h", "36h", "1d", "7d". */
export function intervalWords(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24 || (hours < 72 && hours % 24 !== 0)) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

// -- stale beliefs and evidence coverage (planned ClaimType fields) ---------------

export interface EvidenceCounts {
  admitted: number;
  own_word: number;
  unmet: number;
}

/** The fields core plans on OrientPredicate; absent from a daemon that does not serve them. */
type Planned = { stale_count?: unknown; evidence_counts?: unknown };

const count = (value: unknown): number | null => (typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null);

/** A row's stale_count: a number, null (no stale_after, or not counted), or undefined (not served). */
export function staleCountOf(row: OrientPredicate): number | null | undefined {
  const planned = row as OrientPredicate & Planned;
  return "stale_count" in planned ? count(planned.stale_count) : undefined;
}

/** A row's evidence_counts, checked field by field; null when served empty, undefined when not served. */
export function evidenceCountsOf(row: OrientPredicate): EvidenceCounts | null | undefined {
  const planned = row as OrientPredicate & Planned;
  if (!("evidence_counts" in planned)) return undefined;
  const value = planned.evidence_counts;
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  const admitted = count(record.admitted);
  const own = count(record.own_word);
  const unmet = count(record.unmet);
  return admitted === null && own === null && unmet === null ? null : { admitted: admitted ?? 0, own_word: own ?? 0, unmet: unmet ?? 0 };
}

export interface KindStale {
  kind: string;
  stale: number;
  /** The kind's ClaimTypes with a stale_after, each with its count (null: not counted). */
  claimTypes: { predicate: string; name: string; staleAfter: string; stale: number | null }[];
}

/**
 * Stale live Claims per kind, summed from each ClaimType's stale_count; null
 * when no row carries the field (the daemon does not serve it). Kinds with no
 * ClaimType that goes stale are left out.
 */
export function staleByKind(rows: readonly OrientPredicate[], keep: (kind: string) => boolean = () => true): KindStale[] | null {
  if (!rows.some((row) => staleCountOf(row) !== undefined)) return null;
  const out = new Map<string, KindStale>();
  for (const row of rows) {
    if (!row.stale_after) continue;
    const stale = staleCountOf(row) ?? null;
    for (const kind of row.subject_kinds ?? []) {
      if (!keep(kind)) continue;
      let entry = out.get(kind);
      if (!entry) out.set(kind, (entry = { kind, stale: 0, claimTypes: [] }));
      entry.stale += stale ?? 0;
      entry.claimTypes.push({ predicate: row.predicate, name: row.name, staleAfter: row.stale_after, stale });
    }
  }
  return [...out.values()].sort((a, b) => b.stale - a.stale || (a.kind < b.kind ? -1 : 1));
}

export interface KindEvidence extends EvidenceCounts {
  kind: string;
}

/**
 * Evidence coverage per kind, summed from each ClaimType's evidence_counts;
 * null when no row carries the field. Kinds whose ClaimTypes count nothing
 * are left out.
 */
export function evidenceByKind(rows: readonly OrientPredicate[], keep: (kind: string) => boolean = () => true): KindEvidence[] | null {
  if (!rows.some((row) => evidenceCountsOf(row) !== undefined)) return null;
  const out = new Map<string, KindEvidence>();
  for (const row of rows) {
    const counts = evidenceCountsOf(row);
    if (!counts) continue;
    for (const kind of row.subject_kinds ?? []) {
      if (!keep(kind)) continue;
      let entry = out.get(kind);
      if (!entry) out.set(kind, (entry = { kind, admitted: 0, own_word: 0, unmet: 0 }));
      entry.admitted += counts.admitted;
      entry.own_word += counts.own_word;
      entry.unmet += counts.unmet;
    }
  }
  return [...out.values()]
    .filter((row) => row.admitted + row.own_word + row.unmet > 0)
    .sort((a, b) => b.unmet - a.unmet || (a.kind < b.kind ? -1 : 1));
}

// -- since you last looked ---------------------------------------------------------

/**
 * The lower bound (exclusive) of one since read from `seen`: the newest
 * generations whose ChangeSet members fit `budget`, walking the generations
 * page newest first from `head`, at least the newest one, never below
 * `seen`. A gap in the page (or genesis) stops the walk.
 */
export function sinceWindow(
  generations: readonly { sequence: number; members?: number | undefined }[],
  head: number,
  seen: number,
  budget: number = SINCE_ROWS,
): number {
  let lower = head;
  let total = 0;
  for (const generation of generations) {
    if (lower <= seen) break;
    if (generation.sequence !== lower || generation.sequence === 0) break;
    const members = generation.members ?? 0;
    if (total > 0 && total + members > budget) break;
    total += members;
    lower = generation.sequence - 1;
  }
  return Math.max(lower, seen);
}

export interface BeliefCounts {
  created: number;
  revised: number;
  retired: number;
}

export interface SinceSummary extends BeliefCounts {
  byKind: (BeliefCounts & { kind: string })[];
}

const RETIRE = new Set(["retire", "delete"]);

/**
 * The Claims a since read changed, each counted once by what it amounts to
 * over the window: retired (last retired, having existed before it), new
 * (created in it, still live), else revised. Members that are not Claims
 * (Subjects, definitions) are left out.
 */
export function sinceSummary(rows: readonly SinceRow[]): SinceSummary {
  const claims = new Map<string, { created: boolean; last: string; kind: string | null }>();
  for (const row of rows) {
    if (row.artifact_kind !== "claim") continue;
    const subject = row.statement?.subject ?? null;
    const kind = subject && subject.includes("/") ? subject.slice(0, subject.indexOf("/")) : null;
    const entry = claims.get(row.member_path) ?? { created: false, last: row.disposition, kind: null };
    if (row.disposition === "create") entry.created = true;
    entry.last = row.disposition;
    entry.kind = kind ?? entry.kind;
    claims.set(row.member_path, entry);
  }
  const total: BeliefCounts = { created: 0, revised: 0, retired: 0 };
  const byKind = new Map<string, BeliefCounts & { kind: string }>();
  for (const { created, last, kind } of claims.values()) {
    const change: keyof BeliefCounts | null = RETIRE.has(last) ? (created ? null : "retired") : created ? "created" : "revised";
    if (!change) continue;
    total[change] += 1;
    const key = kind ?? "";
    let entry = byKind.get(key);
    if (!entry) byKind.set(key, (entry = { kind: key, created: 0, revised: 0, retired: 0 }));
    entry[change] += 1;
  }
  return { ...total, byKind: [...byKind.values()].sort((a, b) => (a.kind < b.kind ? -1 : 1)) };
}

/** What the viewer last marked seen on an instance: the generation, and when. */
export interface Seen {
  generation: number;
  at: string;
}

const seenKey = (instance: string) => `cruxible.dashboard.seen:${instance}`;

/** The stored mark; null when there is none or storage is unavailable. */
export function readSeen(instance: string): Seen | null {
  try {
    const raw = globalThis.localStorage?.getItem(seenKey(instance));
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<Seen>;
    return typeof value.generation === "number" && Number.isInteger(value.generation) && value.generation >= 0 && typeof value.at === "string"
      ? { generation: value.generation, at: value.at }
      : null;
  } catch {
    return null;
  }
}

export function writeSeen(instance: string, seen: Seen): void {
  try {
    globalThis.localStorage?.setItem(seenKey(instance), JSON.stringify(seen));
  } catch {
    // storage blocked: the page still works, it just cannot remember
  }
}
