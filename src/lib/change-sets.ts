// Relative .ts imports: scripts/record-fixtures.ts reads change sets under Node.
import type { SubjectHistoryEvent } from "../api/schemas.ts";

/**
 * A Subject's field history as change sets: which events one accepted change
 * set made, the run it came from, and its reasons with core's run
 * boilerplate taken out.
 */

type Reason = SubjectHistoryEvent["reason"];

/**
 * The text core writes for a Procedure's proposal when its author gave none:
 * "Proposed by Procedure <name> run <RUN-…> terminal <node>", then the item
 * count. It only restates the run, so the page shows the run link instead.
 */
const PROPOSED_BY = /^Proposed by Procedure (\S+) run (RUN-[0-9a-f]+) terminal \S+[^\S\n]*(?:\n|$)/;
const ITEM_COUNT = /^\s*\d+ items?; each item's reason is recorded with the Claim or Subject it explains\.\s*/;

/** A reason's text with core's run boilerplate taken out; null when nothing else is left. */
export function reasonWords(reason: Reason): string | null {
  if (!reason) return null;
  return proposalWords(reason.kind === "change_set" ? reason.text : reason.reason, reason.truncated ?? false);
}

/** A proposal's own words (a generation's `because`) with core's run boilerplate taken out; null when nothing else is left. */
export function proposalWords(raw: string | null | undefined, truncated = false): string | null {
  const text = (raw ?? "").replace(PROPOSED_BY, "").replace(ITEM_COUNT, "").trim();
  if (text === "") return null;
  return `${text}${truncated ? "…" : ""}`;
}

/** The run (and its Procedure) core's proposal text names, if it is a Procedure's proposal. */
export function proposalRun(raw: string | null | undefined): { run: string; procedure: string } | null {
  const match = PROPOSED_BY.exec(raw ?? "");
  return match ? { run: match[2]!, procedure: `Procedure:${match[1]!}` } : null;
}

/** The run (and its Procedure) a change set came from: an item's reason names it, or core's proposal text does. */
export function changeSetRun(events: readonly SubjectHistoryEvent[]): { run: string; procedure: string } | null {
  for (const event of events) {
    if (event.reason?.kind === "procedure_item") return { run: event.reason.run, procedure: event.reason.procedure };
  }
  for (const event of events) {
    if (event.reason?.kind !== "change_set") continue;
    const run = proposalRun(event.reason.text);
    if (run) return run;
  }
  return null;
}

/**
 * Consecutive events of one accepted change set (same generation, proposal,
 * actor and approvers) read as one entry.
 */
export function changeSets(events: readonly SubjectHistoryEvent[]): SubjectHistoryEvent[][] {
  const key = (e: SubjectHistoryEvent) =>
    `${e.sequence}\n${e.reason?.proposal ?? ""}\n${e.actor ?? ""}\n${(e.approved_by ?? []).join(",")}`;
  const groups: SubjectHistoryEvent[][] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last && key(last[0]!) === key(event)) last.push(event);
    else groups.push([event]);
  }
  return groups;
}
