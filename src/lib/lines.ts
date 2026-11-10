import type { NextItem } from "../api/schemas.ts";

/**
 * Line-screen helpers: run and Line names, and grouping `next` rows by the
 * Line they are about.
 */

/** The bare run id a RunRow or ref carries (`ProcedureRun:` stripped). */
export function runId(run: string): string {
  return run.replace(/^ProcedureRun:/, "");
}

/** A run id short enough for a list row: `RUN-` plus 12 hex (full id in the title). */
export function shortRunId(run: string): string {
  const id = runId(run);
  return /^RUN-[0-9a-f]{20,}$/.test(id) ? `${id.slice(0, 16)}…` : id;
}

/** The bare Line name (`Line:` stripped). */
export function lineName(line: string): string {
  return line.replace(/^Line:/, "");
}

/** One of orient's needs-attention entries: the ref it names, the state, and the reason when it gives one. */
export interface LineAttention {
  /** The `get` reference the entry leads with (`Line:<name>`). */
  ref: string;
  /** stalled or stopped; null when the entry reads another way (shown as served). */
  state: string | null;
  reason: string | null;
  /** The entry as served. */
  raw: string;
}

/**
 * Read one `needs_attention` entry (`Line:<name> stopped (<reason>)`). An
 * entry in another form keeps its leading ref and the rest as served.
 */
export function lineAttention(entry: string): LineAttention {
  const match = /^(\S+) (stalled|stopped)(?: \((.*)\))?$/.exec(entry);
  if (match) return { ref: match[1]!, state: match[2]!, reason: match[3] ?? null, raw: entry };
  const space = entry.indexOf(" ");
  return { ref: space < 0 ? entry : entry.slice(0, space), state: null, reason: space < 0 ? null : entry.slice(space + 1), raw: entry };
}

/** `next` rows about each Line, keyed by bare Line name. */
export function nextRowsByLine(items: readonly NextItem[]): Map<string, NextItem[]> {
  const out = new Map<string, NextItem[]>();
  for (const item of items) {
    if (!item.subject_identity.startsWith("Line:")) continue;
    const name = lineName(item.subject_identity);
    out.set(name, [...(out.get(name) ?? []), item]);
  }
  return out;
}

/** Unread inbox count a Line's `line_inbox_unread` row reports, if any. */
export function unreadOf(rows: readonly NextItem[] | undefined): number | null {
  const row = rows?.find((item) => item.reason === "line_inbox_unread");
  const detail = row?.detail as { unread?: unknown } | undefined;
  return typeof detail?.unread === "number" ? detail.unread : null;
}
