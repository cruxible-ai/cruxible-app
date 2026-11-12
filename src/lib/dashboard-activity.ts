// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { OrientActivity, Schemas } from "../api/schemas.ts";
import { activityRows, type ActivityRow } from "./activity.ts";
import { proposalRun } from "./change-sets.ts";

/**
 * The Dashboard's compact activity: a Line run's events (its start, the
 * Captures it landed, the generation its proposal was accepted as) fold into
 * one row; a generation no loaded run produced keeps its own row, as the
 * Ledger reads it (definition proposals included); every other event keeps
 * its own row, worded as the activity feed words it (lib/activity).
 */

type RunFinished = Extract<OrientActivity, { event: "run_finished" }>;
type GenerationAccepted = Extract<OrientActivity, { event: "generation_accepted" }>;

export interface RunRow {
  kind: "run";
  key: string;
  at: string;
  /** Bare run id (RUN-…). */
  run: string;
  /** Bare Line name; null for a direct run. */
  line: string | null;
  procedure: string | null;
  /** The finish's status, or running when only its start is on the loaded pages. */
  status: RunFinished["status"];
  elapsedUs: number | null;
  /** The generation its proposal was accepted as, when that is on the loaded pages. */
  generation: { sequence: number; members: number } | null;
  captures: { capture: string | null; ref: string | null; source: string | null }[];
  unavailable: boolean;
}

export interface GenerationRow {
  kind: "generation";
  key: string;
  at: string;
  /** The event as the Ledger's generation row, so the two share their cells. */
  generation: Schemas["OrientGeneration"];
}

export type CompactRow = RunRow | GenerationRow | { kind: "event"; key: string; row: ActivityRow };

const asGeneration = (e: GenerationAccepted): Schemas["OrientGeneration"] => ({
  sequence: e.sequence,
  git_oid: e.git_oid,
  accepted_at: e.at,
  proposal: e.proposal ?? null,
  proposer: e.proposer ?? null,
  approvals: e.approvals ?? [],
  because: e.because ?? null,
  because_truncated: e.because_truncated ?? false,
  members: e.members ?? 0,
});

const bare = (value: string, prefix: string) => value.replace(new RegExp(`^${prefix}:`), "");

/**
 * Rows for every loaded event, newest first as served. A run row sits where
 * its newest event does. A Capture or generation folds into its run only when
 * the run's start or finish is loaded too; otherwise it keeps its own row.
 */
export function compactRows(events: readonly OrientActivity[], label: (line: string) => string): CompactRow[] {
  const runs = new Map<string, RunRow>();
  const generationRun = new Map<number, string>();
  for (const e of events) {
    if (e.event !== "run_started" && e.event !== "run_finished") continue;
    const id = bare(e.run, "ProcedureRun");
    const row = runs.get(id);
    if (e.event === "run_finished") {
      runs.set(id, {
        kind: "run",
        key: `run:${id}`,
        at: row?.at ?? e.at,
        run: id,
        line: e.line ? bare(e.line, "Line") : (row?.line ?? null),
        procedure: e.procedure ?? row?.procedure ?? null,
        status: e.status,
        elapsedUs: e.elapsed_us ?? null,
        generation: null,
        captures: [],
        unavailable: e.unavailable === true,
      });
    } else if (!row) {
      runs.set(id, {
        kind: "run",
        key: `run:${id}`,
        at: e.at,
        run: id,
        line: e.line ? bare(e.line, "Line") : null,
        procedure: e.procedure ?? null,
        status: "running",
        elapsedUs: null,
        generation: null,
        captures: [],
        unavailable: e.unavailable === true,
      });
    }
  }
  for (const e of events) {
    if (e.event === "capture_landed" && e.run) {
      const row = runs.get(bare(e.run, "ProcedureRun"));
      if (row) row.captures.push({ capture: e.capture ?? null, ref: e.ref ?? null, source: e.logical_source ?? null });
    } else if (e.event === "generation_accepted") {
      const by = proposalRun(e.because);
      const row = by ? runs.get(by.run) : undefined;
      if (row && !row.generation) {
        row.generation = { sequence: e.sequence, members: e.members ?? 0 };
        generationRun.set(e.sequence, row.run);
      }
    }
  }

  const out: CompactRow[] = [];
  const placed = new Set<string>();
  let pending: OrientActivity[] = [];
  let pendingStart = 0;
  const flush = () => {
    if (pending.length === 0) return;
    activityRows(pending, label).forEach((row, i) => out.push({ kind: "event", key: `event:${pendingStart}:${i}:${row.key}`, row }));
    pending = [];
  };
  events.forEach((e, i) => {
    const run =
      e.event === "run_started" || e.event === "run_finished"
        ? bare(e.run, "ProcedureRun")
        : e.event === "capture_landed" && e.run && runs.has(bare(e.run, "ProcedureRun"))
          ? bare(e.run, "ProcedureRun")
          : e.event === "generation_accepted"
            ? generationRun.get(e.sequence)
            : undefined;
    if (run === undefined && e.event === "generation_accepted") {
      flush();
      out.push({ kind: "generation", key: `generation:${e.sequence}`, at: e.at, generation: asGeneration(e) });
      return;
    }
    if (run === undefined) {
      if (pending.length === 0) pendingStart = i;
      pending.push(e);
      return;
    }
    flush();
    if (placed.has(run)) return;
    placed.add(run);
    out.push(runs.get(run)!);
  });
  flush();
  return out;
}

/** A Capture's short name: "CAP-9bdf…" (the full name on hover). */
export function shortCapture(capture: string): string {
  return /^CAP-[0-9a-f]{5,}$/.test(capture) ? `${capture.slice(0, 8)}…` : capture;
}
