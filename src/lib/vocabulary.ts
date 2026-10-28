import { humanize } from "./text.ts";

/**
 * The console's glossary: one user-facing word per concept, and the one color
 * rule. Every screen reads its status words, change marks and dots from here,
 * so a concept reads the same on a chip, a tab, a filter, a heading and a
 * summary.
 *
 * Color carries two signals and nothing else:
 * - amber dot: waiting on you or someone (a proposal waiting for review, a
 *   repair to run, an unread inbox item, a due occurrence);
 * - red dot: wrong or blocked (refused, conflicted, not admitted, a failed run);
 * - no dot: everything else (accepted, live, supported, running, retired).
 * There is no green, except on Health (see healthTone). Every term carries a meaning, shown on hover, that says
 * what the word means and, for a signal, what to do. Values the glossary does
 * not know read as their humanized raw value, with no dot.
 */

export type Signal = "waiting" | "wrong";

export interface Term {
  /** The one word (or short phrase) the screens show. */
  word: string;
  /** What it means and, for a signal, what to do (the hover). */
  meaning: string;
  signal?: Signal;
}

/** The legend Settings shows. */

const t = (word: string, meaning: string, signal?: Signal): Term => (signal ? { word, meaning, signal } : { word, meaning });

/** Proposal state: the Proposals tabs and the state chip use these words. */
const PROPOSAL: Record<string, Term> = {
  open: t("Waiting for review", "Waiting for review: approve or reject it on the CLI or MCP", "waiting"),
  awaiting_readmit: t("Waiting for readmission", "Waiting for readmission: readmit it on the CLI or MCP", "waiting"),
  incomplete: t(
    "Incomplete",
    "Incomplete: its admission, evaluation or candidate is missing; readmit or withdraw it on the CLI or MCP",
    "waiting",
  ),
  settled: t("Settled", "Settled: decided, nothing left to review"),
};

/** How a settled proposal ended, and an open one's refusal. */
const PROPOSAL_OUTCOME: Record<string, Term> = {
  accepted: t("Accepted", "Accepted: its changes are in accepted state"),
  refused: t("Refused", "Refused: evaluation refused it; the refusal says why", "wrong"),
  rejected: t("Rejected", "Rejected: a reviewer rejected it"),
  withdrawn: t("Withdrawn", "Withdrawn: its proposer withdrew it"),
};

/** A Claim's verdict, status and read flags share one vocabulary. */
const CLAIM: Record<string, Term> = {
  supported: t("Supported", "Supported: admitted evidence backs it"),
  accepted: t("Accepted", "Accepted: in accepted state"),
  contested: t("Contested", "Contested: Claims in this slot disagree; settle one on the CLI or MCP", "waiting"),
  stale: t("Stale", "Stale: its evidence expired; re-observe it", "waiting"),
  uncovered: t("Uncovered", "Uncovered: no admitted evidence backs it; cite a Capture its ClaimType admits", "waiting"),
  unresolved: t("Unresolved", "Unresolved: the verdict is not decided yet", "waiting"),
  unsure_hold: t("Held", "Held: an unsure attestation holds it for a look", "waiting"),
  contradicted: t("Contradicted", "Contradicted: a contradiction that counts toward the verdict stands against it", "wrong"),
  conflicted: t("Conflicted", "Conflicted: more Claims than the slot allows stand; settle which one holds", "wrong"),
  ineligible: t("Ineligible", "Ineligible: its ClaimType's rules refuse it", "wrong"),
  overturned: t("Overturned", "Overturned: a later judgment replaced it"),
  retired: t("Retired", "Retired: no longer in accepted state"),
  live: t("Live", "Live: in accepted state"),
};

/** A cited Capture's state as evidence. */
const EVIDENCE: Record<string, Term> = {
  admitted: t("Admitted", "Admitted: the ClaimType's evidence rule admits it and the verdict reads it"),
  not_admitted: t(
    "Not admitted",
    "Not admitted: offered as evidence, refused by the ClaimType's evidence rule; cite a Capture under a contract the rule admits",
    "wrong",
  ),
  not_evidence: t("Not evidence", "Not evidence: a copy the ClaimType's rule does not admit; the verdict never reads it"),
};

/** An attestation's stance. */
const STANCE: Record<string, Term> = {
  support: t("Supports", "Supports the Claim"),
  contradict: t("Contradicts", "Contradicts the Claim"),
  unsure: t("Unsure", "Unsure about the Claim"),
};

/** Line state: lifecycle and enablement. */
const LINE: Record<string, Term> = {
  live: t("Live", "Live: the Line is defined in accepted state"),
  retired: t("Retired", "Retired: the Line no longer runs"),
  running: t("Running", "Running: enabled, and its triggers start runs"),
  enabled: t("Running", "Running: enabled, and its triggers start runs"),
  stalled: t("Stalled", "Stalled: enabled but not making progress; next names the repair", "wrong"),
  stopped: t("Stopped", "Stopped: enabled once, now stopped; the stop reason says why"),
  disabled: t("Disabled", "Disabled: turned off"),
  not_enabled: t("Not enabled", "Not enabled: enable it on the CLI or MCP to start runs"),
};

/** The most a Line or mandate may do. */
const AUTHORITY: Record<string, Term> = {
  observe: t("Observe", "Observe: reads and records, changes no state"),
  propose: t("Propose", "Propose: may submit proposals for review"),
  settle: t("Settle", "Settle: may accept changes under a mandate"),
};

/** A run's outcome (run status, a node's verdict, the terminal's classification). */
const RUN: Record<string, Term> = {
  running: t("Running", "Running: not finished yet"),
  succeeded: t("Succeeded", "Succeeded: the run finished"),
  ok: t("Succeeded", "Succeeded: the step finished"),
  halted: t("Halted", "Halted: a guard stopped the run on purpose (for example, nothing changed); nothing to do"),
  admission_refused: t("Refused", "Refused at admission: the run was not admitted; the refusal says why", "wrong"),
  admission_refusal: t("Refused", "Refused at admission: the run was not admitted; the refusal says why", "wrong"),
  node_refused: t("Refused", "Refused: a step refused; the refusal says why", "wrong"),
  node_refusal: t("Refused", "Refused: a step refused; the refusal says why", "wrong"),
  refused: t("Refused", "Refused: the refusal says why", "wrong"),
  operational_failed: t("Failed", "Failed: an operation failed (a Provider or a source); see the cause", "wrong"),
  operational_failure: t("Failed", "Failed: an operation failed (a Provider or a source); see the cause", "wrong"),
  internal_failed: t("Failed", "Failed: an internal error stopped the run", "wrong"),
  internal_failure: t("Failed", "Failed: an internal error stopped the run", "wrong"),
  failed: t("Failed", "Failed: see the cause", "wrong"),
  budget_exhausted: t("Out of budget", "Out of budget: the run used up its budget", "wrong"),
  budget_exceeded: t("Out of budget", "Out of budget: the run used up its budget", "wrong"),
};

/** What happened at one step in a run, where the run's own words (the node verdicts) do not say. */
const STEP: Record<string, Term> = {
  fired: t("Ran", "Ran: the run's journal records this step firing"),
  not_run: t("Not run", "Not run: this step did not fire in this run"),
  waiting_input: t("Waiting on input", "Waiting on an input: the run continues once it arrives", "waiting"),
};

/** A Procedure step's kind (and the nodes a Procedure or Line graph adds), with what it does. */
const STEP_KIND: Record<string, Term> = {
  source: t("Source", "Source: retains a Capture under a contract, through a slot's Provider"),
  tap: t("Tap", "Tap: reads accepted state through a query"),
  claim: t("Claim", "Claim: reads one ClaimType's Claims"),
  call: t("Call", "Call: asks a slot's Provider, which computes from what it is given"),
  invoke: t("Invoke", "Invoke: runs a child Procedure and reads its result"),
  guard: t("Guard", "Guard: the run goes on only while its condition holds; else it halts, refuses or hands over"),
  project: t("Project", "Project: shapes fields from earlier steps"),
  transform: t("Transform", "Transform: reshapes items from earlier steps"),
  select: t("Select", "Select: picks among earlier steps' results"),
  repeat: t("Repeat", "Repeat: runs its body until its condition holds"),
  propose: t("Propose", "Propose: submits its changes as a proposal, for review"),
  settle: t("Settle", "Settle: accepts its changes under a settle mandate, within the Line's authority; otherwise it proposes"),
  emit: t("Emit", "Emit: retains the run's output as a Capture under a contract"),
  inbox: t("Inbox", "Inbox: posts items to the Line's inbox"),
  halt: t("Halt", "Halt: stops the run on purpose, with a code"),
  returns: t("Returns", "Returns: the run's result, from the fields it names"),
  explicit: t("Step", "A stored step outside the recognised kinds"),
  input: t("Input", "Input: what a run is given"),
  parameters: t("Parameters", "Parameters: the Line's values for the Procedure's input"),
  trigger: t("Trigger", "Trigger: what starts the Line's runs"),
};

/** What became of a run's terminal output. */
const EGRESS: Record<string, Term> = {
  delivered: t("Delivered", "Delivered: the output reached its sink"),
  prepared: t("Prepared", "Prepared: written, not yet delivered"),
  dependencies_bound_egress_pending: t("Waiting to deliver", "Waiting to deliver: its dependencies are bound, delivery is pending", "waiting"),
  unresolved: t("Unresolved", "Unresolved: only the prepared intent exists; recovery has not finished", "waiting"),
  refused_effective_rung: t("Refused", "Refused: the run's authority was too low for this output", "wrong"),
  refused: t("Refused", "Refused: the sink refused it", "wrong"),
  failed: t("Failed", "Failed: delivery failed", "wrong"),
};

/** A `next` item's severity. */
const SEVERITY: Record<string, Term> = {
  blocking: t("Blocking", "Blocking: something is wrong and stops work; run the repair", "wrong"),
  repair: t("Repair", "Repair: waiting for you to run the repair shown", "waiting"),
  warning: t("Warning", "Warning: worth a look; nothing is blocked"),
};

/** The environment facets of the `next` status header. */
const HEALTH: Record<string, Term> = {
  stalled: t("Stalled", "Stalled: not making progress; run the repair shown", "wrong"),
  stale: t("Stale", "Stale: out of date; run the repair shown", "wrong"),
  invalid: t("Invalid", "Invalid: run the repair shown", "wrong"),
  missing: t("Missing", "Missing: run the repair shown", "wrong"),
  unavailable: t("Unavailable", "Unavailable: run the repair shown", "wrong"),
  no_upgrade_path: t("No upgrade path", "No upgrade path: the compiler cannot upgrade these definitions", "wrong"),
  due: t("Due", "Due: work is waiting for dispatch", "waiting"),
  lagging: t("Lagging", "Lagging: behind the head; it catches up on its own", "waiting"),
  behind: t("Behind", "Behind: the mirror has generations to publish", "waiting"),
  upgrade_available: t("Upgrade available", "Upgrade available: upgrade on the CLI", "waiting"),
  claim_type_upgrade_available: t(
    "ClaimType upgrade available",
    "ClaimType upgrade available: some ClaimTypes still state an older evidence policy; run the repair shown",
    "waiting",
  ),
};

/**
 * Health is the one place a third color earns its keep: a row of checks reads
 * at a glance when the healthy ones are green. So health states carry a tone
 * beside their term: `ok` (green: working), `off` (hollow: not observed from
 * here or not set up), or the term's own signal. Nowhere else uses green.
 */
export type HealthTone = Signal | "ok" | "off";

const HEALTH_OK = new Set(["active", "current", "available", "idle", "scheduled", "running", "present", "publishing", "ready"]);
const HEALTH_OFF = new Set(["not_observed", "not_configured", "not_reported", "not_required", "unscheduled", "never_run", "none", "absent"]);

export function healthTone(state: string): HealthTone | undefined {
  const signal = HEALTH[state]?.signal;
  if (signal) return signal;
  if (HEALTH_OK.has(state)) return "ok";
  if (HEALTH_OFF.has(state)) return "off";
  return undefined;
}


/** A mandate's state. */
const MANDATE: Record<string, Term> = {
  active: t("Active", "Active: in force"),
  expiring: t("Expiring", "Expiring soon: renew it on the CLI or MCP", "waiting"),
  expired: t("Expired", "Expired: runs under it can no longer settle; renew it", "wrong"),
  not_yet_valid: t("Not yet valid", "Not yet valid: its window has not opened"),
  suspended: t("Suspended", "Suspended: runs under it cannot settle", "wrong"),
  retired: t("Retired", "Retired: no longer in force"),
};

/** A trigger occurrence. */
const OCCURRENCE: Record<string, Term> = {
  due: t("Due", "Due: waiting for dispatch to start a run", "waiting"),
  waiting: t("Scheduled", "Scheduled: not eligible to run yet"),
};

/** An inbox item. */
const INBOX: Record<string, Term> = {
  unread: t("Unread", "Unread: read it on the CLI or MCP", "waiting"),
  acknowledged: t("Acknowledged", "Acknowledged"),
  dismissed: t("Dismissed", "Dismissed"),
  linked: t("Linked", "Linked to a follow-up"),
};

/** A measurement reading and a review of one. */
const READING: Record<string, Term> = {
  satisfied: t("Satisfied", "Satisfied: the reading meets the measurement"),
  contradicted: t("Contradicted", "Contradicted: the reading contradicts the measurement", "wrong"),
  indeterminate: t("Indeterminate", "Indeterminate: the reading cannot decide"),
  upheld: t("Upheld", "Upheld: the review agrees with the resolution"),
  overturned: t("Overturned", "Overturned: the review found the resolution wrong", "wrong"),
};

/** A kit's Provider. */
const PROVIDER: Record<string, Term> = {
  installed: t("Installed", "Installed"),
  satisfied: t("Installed", "Installed: an installed build satisfies the kit"),
  differs: t("Differs", "Differs from the kit's pinned build: reinstall the kit", "waiting"),
  missing: t("Missing", "Missing: install the kit's Providers", "wrong"),
};

/** Lifecycle of definitions (kinds, contracts, Subjects). */
const LIFECYCLE: Record<string, Term> = {
  live: t("Live", "Live: in accepted state"),
  retired: t("Retired", "Retired: no longer in accepted state"),
};

export const VOCABULARY = {
  proposal: PROPOSAL,
  proposalOutcome: PROPOSAL_OUTCOME,
  claim: CLAIM,
  evidence: EVIDENCE,
  stance: STANCE,
  line: LINE,
  authority: AUTHORITY,
  run: RUN,
  step: STEP,
  stepKind: STEP_KIND,
  egress: EGRESS,
  severity: SEVERITY,
  health: HEALTH,
  mandate: MANDATE,
  occurrence: OCCURRENCE,
  inbox: INBOX,
  reading: READING,
  provider: PROVIDER,
  lifecycle: LIFECYCLE,
} as const;

export type Concept = keyof typeof VOCABULARY;

/** The term for a value of a concept; unknown values read as themselves, with no dot. */
export function term(concept: Concept, value: string): Term {
  return VOCABULARY[concept][value] ?? { word: humanize(value), meaning: humanize(value) };
}

/** A proposal's tab word (the Proposals tabs and the panel heading). */
export const PROPOSAL_TABS = ["open", "incomplete", "settled"] as const;

/**
 * Change marks: `+` creates, `~` revises, `−` retires. A proposal's members and
 * a Claim's history read as marks; the words are on hover. Core spells
 * dispositions as verbs (create) and fixtures and history as past tense
 * (created, stated): both read as the same mark.
 */
export interface ChangeMark {
  mark: "+" | "~" | "−";
  /** The mark's meaning, on hover and for assistive tech. */
  word: string;
}

const MARK: Record<string, ChangeMark> = {
  create: { mark: "+", word: "Created" },
  created: { mark: "+", word: "Created" },
  stated: { mark: "+", word: "First stated" },
  revise: { mark: "~", word: "Revised" },
  revised: { mark: "~", word: "Revised" },
  changed: { mark: "~", word: "Value changed" },
  reobserved: { mark: "~", word: "Re-observed: same value, fresh evidence" },
  rebound: { mark: "~", word: "Rebound to a current Capture" },
  retire: { mark: "−", word: "Retired" },
  retired: { mark: "−", word: "Retired" },
};

export function changeMark(change: string): ChangeMark {
  return MARK[change] ?? { mark: "~", word: humanize(change) };
}

/** A Claim's role, as the proposal and Subject screens say it. */
const ROLE: Record<string, string> = {
  observation: "observed",
  normative: "stated",
  environment_binding: "bound",
  derivation: "derived",
};

export function roleWord(role: string): string {
  return ROLE[role] ?? role.replaceAll("_", " ");
}

/** Plural nouns for a proposal summary ("38 Claims, 2 Subjects"). */
export function artifactNoun(kind: string, count: number): string {
  const word = kind === "claim" ? "Claim" : kind === "subject" ? "Subject" : kind.replaceAll("_", " ");
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
