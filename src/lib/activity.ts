import type { OrientActivity } from "../api/schemas.ts";
import { PALETTE } from "./palette.ts";
import { term, type Signal } from "./vocabulary.ts";

/**
 * The Dashboard's activity feed, one row per event the daemon reports (orient
 * section=activity), in words: who or what acted, what happened, and where to
 * read more. A run's start and finish on the same page fold into its finish.
 * Each event family has a categorical color (what kind of thing happened);
 * the amber and red signals still mean waiting and wrong.
 */

export type ActivityFamily = "generation" | "run" | "capture" | "inbox" | "occurrence" | "line" | "erasure" | "gap";

export const FAMILY: Record<ActivityFamily, { color: string; legend: string }> = {
  // Far-apart hues for the families that share a feed (blue, green, violet,
  // pink, lime), so a glance tells a run from a landing from work coming due.
  generation: { color: PALETTE.fuchsia, legend: "Accepted into state" },
  run: { color: PALETTE.sky, legend: "Runs" },
  capture: { color: PALETTE.emerald, legend: "Evidence landed" },
  inbox: { color: PALETTE.lime, legend: "Inbox" },
  occurrence: { color: PALETTE.violet, legend: "Work coming due" },
  line: { color: PALETTE.slate, legend: "Line state" },
  erasure: { color: PALETTE.stone, legend: "Erased" },
  gap: { color: PALETTE.stone, legend: "Records unavailable" },
};

/** Where a row's names link: a Line, a run, a proposal, any other ref. */
export type ActivityLink =
  | { kind: "line"; name: string }
  | { kind: "run"; id: string }
  | { kind: "proposal"; id: string }
  | { kind: "generation"; sequence: number }
  | { kind: "ref"; ref: string };

export interface ActivityRow {
  key: string;
  at: string;
  family: ActivityFamily;
  /** The actor or subject the row is about (a Line, a generation), linked. */
  who: { text: string; link: ActivityLink } | null;
  /** What happened, in a short phrase after `who`. */
  what: string;
  /** A second line: why, from where, which contract. */
  detail: string | null;
  /** Where the phrase's object links (the run, the Capture), when it has one. */
  object: { text: string; link: ActivityLink } | null;
  signal?: Signal;
  /** The event's record was lost (best-effort exhaust); the row says so. */
  unavailable: boolean;
}

/** A run's elapsed time, short: "840 ms", "12 s", "3m 12s", "1h 4m". */
export function formatDuration(us: number): string {
  const ms = us / 1000;
  if (ms < 1000) return `${Math.round(ms)} ms`;
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

const bare = (value: string, prefix: string) => value.replace(new RegExp(`^${prefix}:`), "");

export function shortRun(run: string): string {
  const id = bare(run, "ProcedureRun");
  return /^RUN-[0-9a-f]{12,}$/.test(id) ? `${id.slice(0, 12)}…` : id;
}

/** Rows for one page: newest first as served, a run's start dropped when its finish is on the page. */
export function activityRows(events: readonly OrientActivity[], label: (line: string) => string): ActivityRow[] {
  const finished = new Set(events.flatMap((e) => (e.event === "run_finished" ? [e.run] : [])));
  const rows: ActivityRow[] = [];
  let enabled: { names: string[]; row: ActivityRow } | null = null;
  events.forEach((e, i) => {
    if (e.event === "run_started" && finished.has(e.run)) return;
    // Lines enabled one after another (a kit's Lines turned on together) read as one row.
    const firstEnable = e.event === "line_state_changed" && !e.previous && e.state === "running";
    if (firstEnable && enabled) {
      enabled.names.push(label(bare(e.line, "Line")));
      enabled.row.who = null;
      enabled.row.what = `${enabled.names.length} Lines enabled`;
      enabled.row.detail = enabled.names.join(", ");
      return;
    }
    const row = describe(e, label);
    if (!row) return;
    const full = { ...row, key: `${i}:${e.event}:${e.at}` };
    rows.push(full);
    enabled = firstEnable ? { names: [label(bare((e as { line: string }).line, "Line"))], row: full } : null;
  });
  return rows;
}

const lineWho = (line: string | null | undefined, label: (line: string) => string) =>
  line ? { text: label(bare(line, "Line")), link: { kind: "line", name: bare(line, "Line") } as ActivityLink } : null;

function describe(e: OrientActivity, label: (line: string) => string): Omit<ActivityRow, "key"> | null {
  const base = { at: e.at, unavailable: "unavailable" in e ? e.unavailable === true : false };
  switch (e.event) {
    case "generation_accepted":
      return {
        ...base,
        family: "generation",
        who: { text: `Generation ${e.sequence}`, link: { kind: "generation", sequence: e.sequence } },
        what: `accepted · ${e.members} ${e.members === 1 ? "change" : "changes"}${e.proposer ? ` · proposed by ${e.proposer}` : ""}`,
        detail: e.because ? `${e.because}${e.because_truncated ? "…" : ""}` : null,
        object: e.proposal ? { text: "Proposal", link: { kind: "proposal", id: e.proposal } } : null,
      };
    case "run_started":
      return {
        ...base,
        family: "run",
        who: lineWho(e.line, label) ?? (e.procedure ? { text: bare(e.procedure, "Procedure"), link: { kind: "ref", ref: e.procedure } } : null),
        what: "started a run",
        detail: null,
        object: { text: shortRun(e.run), link: { kind: "run", id: bare(e.run, "ProcedureRun") } },
      };
    case "run_finished": {
      const status = term("run", e.status);
      return {
        ...base,
        family: "run",
        who: lineWho(e.line, label) ?? (e.procedure ? { text: bare(e.procedure, "Procedure"), link: { kind: "ref", ref: e.procedure } } : null),
        what:
          e.status === "running"
            ? "is running"
            : `ran · ${status.word.toLowerCase()}${e.elapsed_us != null ? ` · ${formatDuration(e.elapsed_us)}` : ""}`,
        detail: null,
        object: { text: shortRun(e.run), link: { kind: "run", id: bare(e.run, "ProcedureRun") } },
        ...(status.signal ? { signal: status.signal } : {}),
      };
    }
    case "capture_landed":
      return {
        ...base,
        family: "capture",
        who: lineWho(e.line, label),
        what: e.logical_source ? `landed evidence from ${e.logical_source}` : "landed evidence",
        detail: e.contract ? `Under ${bare(e.contract, "CaptureContract")}` : null,
        object: e.ref ? { text: e.capture ?? "Capture", link: { kind: "ref", ref: e.ref } } : null,
      };
    case "inbox_posted":
      return {
        ...base,
        family: "inbox",
        who: lineWho(e.line, label),
        what: "posted to the inbox",
        detail: null,
        object: { text: e.ref, link: { kind: "line", name: bare(e.line, "Line") } },
        signal: "waiting",
      };
    case "inbox_disposed":
      return {
        ...base,
        family: "inbox",
        who: lineWho(e.line, label),
        what: `inbox item ${e.disposition}`,
        detail: null,
        object: null,
      };
    case "occurrence_due":
      return {
        ...base,
        family: "occurrence",
        who: lineWho(e.line, label),
        what: "has work due",
        detail: e.trigger ? `From ${bare(e.trigger, "Trigger")}` : null,
        object: null,
      };
    case "occurrence_lapsed":
      return { ...base, family: "occurrence", who: lineWho(e.line, label), what: "let due work lapse", detail: null, object: null };
    case "line_state_changed": {
      const state = term("line", e.state);
      return {
        ...base,
        family: "line",
        who: lineWho(e.line, label),
        what: e.previous
          ? `${term("line", e.previous).word.toLowerCase()} → ${state.word.toLowerCase()}`
          : e.state === "running"
            ? "enabled"
            : `is ${state.word.toLowerCase()}`,
        detail: [e.reason ? `Because ${e.reason.replace(/_/g, " ")}` : null, e.detail].filter(Boolean).join(" · ") || null,
        object: null,
        ...(state.signal ? { signal: state.signal } : {}),
      };
    }
    case "capture_erased":
      return {
        ...base,
        family: "erasure",
        who: null,
        what: `Capture erased${e.by ? ` by ${e.by}` : ""}`,
        detail: e.contract ? `Under ${bare(e.contract, "CaptureContract")}` : null,
        object: e.ref ? { text: e.capture ?? "Capture", link: { kind: "ref", ref: e.ref } } : null,
      };
    case "record_unavailable":
      return {
        ...base,
        family: "gap",
        who: null,
        what: `Some ${e.journal === "line_dispatch" ? "Line dispatch" : "inbox"} records are unavailable`,
        detail: "Their payloads were lost; next names the repair",
        object: null,
        signal: "wrong",
      };
    default:
      return null;
  }
}
