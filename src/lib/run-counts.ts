import type { Schemas } from "../api/schemas.ts";
import { humanize } from "./text.ts";

/**
 * What one Line run did, in counts (`RunCounts`): served on a Procedure run's
 * state and on each Runbook step that ran a Line. Counts are read from the
 * typed object generically: every numeric field is a count column, the known
 * ones in reading order with their words, any field a later daemon adds after
 * them under its own name. Only the flags and lists are named here.
 */
export type RunCounts = Schemas["RunCounts"];

/** RunCounts fields that are not counts: the tag, the flags and the lists. */
const NOT_COUNTS = new Set(["tag", "complete", "incomplete_reasons", "top_refusals", "needs_attention"]);

/** Known count fields, in reading order, with their column words. */
const COUNT_WORDS: [string, string][] = [
  ["written", "Written"],
  ["settled", "Settled"],
  ["proposed", "Proposed"],
  ["unchanged", "Unchanged"],
  ["retired", "Retired"],
  ["refused", "Refused"],
  ["inbox", "To inbox"],
];
const WORD = new Map(COUNT_WORDS);
const ORDER = new Map(COUNT_WORDS.map(([key], i) => [key, i]));

/** Hover meanings of the known count columns (the contract's own definitions). */
export const COUNT_MEANING: Record<string, string> = {
  written: "New, revising and inverse Claims across the run's claims terminals",
  settled: "Written Claims that settled",
  proposed: "Written Claims that went to proposal, including a change still waiting on the Line's open proposal",
  unchanged: "Re-observed and no-op restatements",
  retired: "Retirements",
  refused: "Items not written (every finding but an incomplete source)",
  inbox: "Items the run posted to its Line's inbox; ? when unknown",
};

/** What the needs-attention flag means (the contract's definition). */
export const ATTENTION_MEANING = "Needs attention: the run was incomplete, refused an item, posted to the inbox, or its inbox count is unknown";

export interface CountColumn {
  key: string;
  word: string;
  meaning: string | undefined;
}

const isCount = (key: string, value: unknown) => !NOT_COUNTS.has(key) && (typeof value === "number" || (value === null && key === "inbox"));

/** The count columns across these counts: the known ones in order, then any others by name. */
export function countColumns(all: readonly (RunCounts | null | undefined)[]): CountColumn[] {
  const keys = new Set<string>();
  for (const counts of all) {
    if (!counts) continue;
    for (const [key, value] of Object.entries(counts)) if (isCount(key, value)) keys.add(key);
  }
  return [...keys]
    .sort((a, b) => (ORDER.get(a) ?? Infinity) - (ORDER.get(b) ?? Infinity) || a.localeCompare(b))
    .map((key) => ({ key, word: WORD.get(key) ?? humanize(key), meaning: COUNT_MEANING[key] }));
}

/** One count by field name: a number, `null` when the daemon says it is unknown, `undefined` when not served. */
export function countOf(counts: RunCounts | null | undefined, key: string): number | null | undefined {
  if (!counts) return undefined;
  const value = (counts as Record<string, unknown>)[key];
  return typeof value === "number" ? value : value === null ? null : undefined;
}
