import type { Schemas } from "../api/schemas.ts";

/**
 * Runbooks (D-R36, D-R48): an ordered list of steps, each a Line run by hand
 * or an internal action fired, run in order by `runbook run` or a Trigger.
 */

export type RunbookTarget = Schemas["RunbookPreviewStep"]["target"];

/** A step's target as a ref: `Line:<name>` for a Line, `action:<name>` for an internal action. */
export function targetOf(target: RunbookTarget | string): { kind: "line" | "action"; name: string } {
  if (typeof target === "string") {
    return target.startsWith("Line:") ? { kind: "line", name: target.slice("Line:".length) } : { kind: "action", name: target.replace(/^action:/, "") };
  }
  return target.kind === "action" || "action" in target
    ? { kind: "action", name: (target as Schemas["ActionTarget"]).action }
    : { kind: "line", name: (target as Schemas["LineTarget"]).line.target.name };
}

/** The bare Runbook name (orient and cards name it `Runbook:<name>`). */
export function runbookName(ref: string): string {
  return ref.replace(/^Runbook:/, "");
}

type Authority = NonNullable<Schemas["RunbookPreviewStep"]["authority"]>;

/**
 * One row of a step's authority over what it writes, from its Mandate scope
 * (static: only what the definitions prove): a ClaimType or a created
 * Subject kind, and whether it settles or goes to proposal, with the change
 * kinds and evidence bases a settle grant covers, or the term that sent a
 * change to review.
 */
export interface AuthorityRow {
  step: number;
  what: string;
  whatKind: "claim_type" | "creates";
  goes: "settles" | "proposes";
  changes: { change: string; basis: string[] }[];
  gaps: { change: string; basis: string | null; term: string }[];
}

export function authorityRows(step: number, authority: Authority | null | undefined): AuthorityRow[] {
  if (!authority) return [];
  const rows: AuthorityRow[] = [];
  const gapsOf = (claimType: string) =>
    (authority.review_gaps ?? []).filter((g) => g.claim_type === claimType).map((g) => ({ change: g.change, basis: g.basis ?? null, term: g.term }));
  for (const scope of authority.settles ?? []) {
    rows.push({ step, what: scope.claim_type, whatKind: "claim_type", goes: "settles", changes: scope.changes.map((c) => ({ change: c.change, basis: [...c.basis] })), gaps: [] });
  }
  for (const kind of authority.settles_creation ?? []) rows.push({ step, what: kind, whatKind: "creates", goes: "settles", changes: [], gaps: [] });
  const settled = new Set((authority.settles ?? []).map((s) => s.claim_type));
  const proposed = new Set([...(authority.proposes ?? []), ...(authority.review_gaps ?? []).map((g) => g.claim_type)]);
  for (const claimType of [...proposed].sort()) {
    if (settled.has(claimType) && gapsOf(claimType).length === 0) continue;
    rows.push({ step, what: claimType, whatKind: "claim_type", goes: "proposes", changes: [], gaps: gapsOf(claimType) });
  }
  for (const kind of authority.proposes_creation ?? []) rows.push({ step, what: kind, whatKind: "creates", goes: "proposes", changes: [], gaps: [] });
  return rows;
}

type Run = Schemas["RunbookRunResult"];

/** A target as one string: `Line:<name>` for a Line, the action's name for an action. */
export function targetKey(target: RunbookTarget | string): string {
  const { kind, name } = targetOf(target);
  return kind === "line" ? `Line:${name}` : name;
}

export interface RunGroupData {
  digest: string;
  runs: Run[];
  /** The steps these runs' own outcomes name, in step order. */
  steps: { step: number; target: string }[];
}

/**
 * Runs by the Runbook revision they ran (`runbook_artifact_digest`), in the
 * order served (newest first); each group's steps are the targets its own
 * outcomes name, never the current definition's.
 */
export function runGroups(runs: readonly Run[]): RunGroupData[] {
  const byDigest = new Map<string, RunGroupData>();
  for (const run of runs) {
    let group = byDigest.get(run.runbook_artifact_digest);
    if (!group) byDigest.set(run.runbook_artifact_digest, (group = { digest: run.runbook_artifact_digest, runs: [], steps: [] }));
    group.runs.push(run);
    for (const outcome of run.steps) {
      const target = targetKey(outcome.target);
      if (!group.steps.some((s) => s.step === outcome.step && s.target === target)) group.steps.push({ step: outcome.step, target });
    }
  }
  for (const group of byDigest.values()) group.steps.sort((a, b) => a.step - b.step || (a.target < b.target ? -1 : 1));
  return [...byDigest.values()];
}

type RunbookRun = Schemas["RunbookRunResult"];
type RunbookStepOutcome = RunbookRun["steps"][number];

/** Whether a step of a run needs attention: the run names it, or its Line run's counts flag it. */
export function stepNeedsAttention(run: RunbookRun, outcome: RunbookStepOutcome): boolean {
  return (run.attention_steps ?? []).includes(outcome.step) || outcome.counts?.needs_attention === true;
}

/** The steps of a run that need attention, in step order. */
export function attentionSteps(run: RunbookRun): number[] {
  return [...new Set(run.steps.filter((o) => stepNeedsAttention(run, o)).map((o) => o.step).concat(run.attention_steps ?? []))].sort((a, b) => a - b);
}
