// Relative .ts imports: scripts/record-fixtures.ts may run this under Node.
import type { Schemas } from "../api/schemas.ts";

/**
 * Definitions as authored (compiler revision 36, light artifacts): a
 * Procedure's authored form (`GetProcedureCard.authored`, typed
 * ProcedureSpec), a Line's envelope (served only through `get detail=proof`,
 * untyped: read here with runtime checks), and the capture-landing Triggers
 * with the logical sources they select. From these the console derives where
 * evidence comes from, the way the kit reference does: a logical source is
 * retained by the source steps that name it (literally, or through a Line
 * parameter the step takes from `$input.`), and selected by the landing
 * Triggers that name it. Contracts no longer list their sources.
 *
 * Nothing here guesses a fact the daemon does not serve: a source step whose
 * logical source the Provider names (no `logical_source` in its request) has
 * no source here, and its retention says so.
 */

export type ProcedureSpec = Schemas["ProcedureSpec"];
export type ProcedureStep = ProcedureSpec["steps"][number];

/** The step kinds of an authored Procedure, by the key that names each. */
export const STEP_KINDS = [
  "source",
  "emit",
  "tap",
  "call",
  "invoke",
  "claim",
  "project",
  "transform",
  "select",
  "guard",
  "repeat",
  "inbox",
  "propose",
  "settle",
  "halt",
  "explicit",
] as const;
export type StepKind = (typeof STEP_KINDS)[number];

export function stepKind(step: ProcedureStep): StepKind {
  for (const kind of STEP_KINDS) if (kind in step) return kind;
  return "explicit";
}

const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);
const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

/** A request's logical source: a literal, or the run input field it is given. */
export type LogicalSourceRef = { literal: string } | { input: string };

export function logicalSourceRef(request: unknown): LogicalSourceRef | null {
  const raw = str(record(request)?.logical_source);
  if (raw === null) return null;
  return raw.startsWith("$input.") ? { input: raw.slice("$input.".length) } : { literal: raw };
}

/**
 * One step as the definition panels show it: what it is and the definitions
 * it names (contracts, interfaces, queries, ClaimTypes, by name).
 */
export interface StepView {
  id: string;
  kind: StepKind;
  /** The step's alias or name (source alias, call alias, tap name, …). */
  name: string | null;
  contract: string | null;
  interface: string | null;
  /** The slot its Provider binds through (source and call steps). */
  slot: string | null;
  query: string | null;
  claimType: string | null;
  procedure: string | null;
  logicalSource: LogicalSourceRef | null;
  /** guard: the condition; halt: the reason; settle/propose: what it writes. */
  detail: string | null;
}

export function stepView(step: ProcedureStep, index: number): StepView {
  const kind = stepKind(step);
  const s = step as Record<string, unknown>;
  const name = str(s[kind]);
  const view: StepView = {
    id: str(s.id) ?? name ?? `step_${index + 1}`,
    kind,
    name,
    contract: null,
    interface: str(s.interface),
    slot: kind === "source" || kind === "call" ? (str(s.provider) ?? name) : null,
    query: null,
    claimType: null,
    procedure: null,
    logicalSource: null,
    detail: null,
  };
  if (kind === "source") {
    view.contract = str(s.contract);
    view.logicalSource = logicalSourceRef(s.request);
  } else if (kind === "emit") {
    view.contract = name;
    view.name = null;
  } else if (kind === "tap") {
    view.query = str(s.query);
  } else if (kind === "claim") {
    view.claimType = str(s.claim_type);
  } else if (kind === "invoke") {
    view.procedure = name;
    view.name = str(s.as);
  } else if (kind === "guard") {
    view.detail = [name, str(s.refusal_code) && `refuses ${str(s.refusal_code)}`].filter(Boolean).join(" · ") || null;
    view.name = null;
  } else if (kind === "halt") {
    view.detail = name;
    view.name = null;
  } else if (kind === "settle" || kind === "propose") {
    view.detail = typeof s[kind] === "string" ? (s[kind] as string) : `${(s[kind] as unknown[]).length} changes`;
    view.name = null;
  } else if (kind === "select" || kind === "project" || kind === "transform") {
    view.contract = str(s.contract) ?? str(s.contract_out);
  }
  return view;
}

/** A Procedure's slots: slot name -> the interface (and major) it takes. */
export function procedureSlots(spec: ProcedureSpec): { slot: string; interface: string }[] {
  return Object.entries(spec.slots ?? {})
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .map(([slot, iface]) => ({ slot, interface: iface }))
    .sort((a, b) => (a.slot < b.slot ? -1 : a.slot > b.slot ? 1 : 0));
}

/** The ProviderInterface ref a slot's `name@major` names (`name/vmajor`), as get resolves it. */
export function slotInterfaceRef(value: string): string {
  const at = value.lastIndexOf("@");
  return at > 0 ? `ProviderInterface:${value.slice(0, at)}/v${value.slice(at + 1)}` : `ProviderInterface:${value}`;
}

// -- source steps and retentions ------------------------------------------------

/** One step that retains (source) or emits a Capture under a contract. */
export interface SourceStep {
  procedure: string;
  /** The source step's alias (what a Line's trigger_input names); null for an emit. */
  alias: string | null;
  contract: string;
  interface: string | null;
  logicalSource: LogicalSourceRef | null;
  emitted: boolean;
}

export function sourceSteps(procedure: string, spec: ProcedureSpec): SourceStep[] {
  const out: SourceStep[] = [];
  for (const step of spec.steps) {
    const s = step as Record<string, unknown>;
    if ("source" in s && str(s.contract)) {
      out.push({
        procedure,
        alias: str(s.source),
        contract: str(s.contract)!,
        interface: str(s.interface),
        logicalSource: logicalSourceRef(s.request),
        emitted: false,
      });
    } else if ("emit" in s && str(s.emit)) {
      out.push({ procedure, alias: null, contract: str(s.emit)!, interface: null, logicalSource: null, emitted: true });
    }
  }
  return out;
}

/** A Line as authored: its envelope (get detail=proof), read with runtime checks. */
export interface LineDefinition {
  line: string;
  procedure: string;
  parameters: Record<string, unknown>;
  /** The source step alias that reads the Capture whose landing started the run. */
  triggerInput: string | null;
  /** The contract the trigger input reads (envelope trigger_event). */
  triggerContract: string | null;
  /** Explicit slot bindings: slot -> Provider build; empty when the slots bind by fit. */
  bindings: Record<string, string>;
  acquisitionPolicy: string | null;
  maxAuthority: string | null;
  occurrenceEpoch: number | null;
}

const targetName = (value: unknown): string | null => str(record(record(value)?.target)?.name);

/** A Line's definition from its `get detail=proof` payload; null when it is not a Line envelope. */
export function readLineEnvelope(proof: unknown): LineDefinition | null {
  const envelope = record(record(proof)?.envelope);
  if (!envelope) return null;
  const line = str(record(envelope.identity)?.name);
  const procedure = targetName(envelope.procedure);
  if (!line || !procedure) return null;
  const bindings: Record<string, string> = {};
  for (const [slot, ref] of Object.entries(record(envelope.bindings) ?? {})) {
    const name = targetName(ref);
    if (name) bindings[slot] = name;
  }
  return {
    line,
    procedure,
    parameters: record(envelope.parameters) ?? {},
    triggerInput: str(envelope.trigger_input),
    triggerContract: str(record(record(envelope.trigger_event)?.capture_contract_identity)?.name),
    bindings,
    acquisitionPolicy: targetName(envelope.acquisition_policy),
    maxAuthority: str(envelope.max_authority),
    occurrenceEpoch: typeof envelope.occurrence_epoch === "number" ? envelope.occurrence_epoch : null,
  };
}

/** One Capture a run retains: its contract and logical source, and who runs it. */
export interface Retention {
  contract: string;
  /** The logical source; null when the run's Provider names it (or the run emits its output). */
  source: string | null;
  procedure: string;
  /** The Line that runs it; null for a direct run. */
  line: string | null;
  emitted: boolean;
  /** The input field a direct run is given its logical source by (`$input.<field>`). */
  given: string | null;
  /** The interface the retaining step reads through (null for an emit). */
  interface: string | null;
}

/**
 * Every Capture a run retains: a source step no Line feeds from its landing
 * (one per Line running the Procedure, else one direct run), and every emit.
 * A Line's `$input.` logical source resolves through its parameters.
 */
export function retentions(
  steps: readonly SourceStep[],
  lines: readonly LineDefinition[],
  produces: (iface: string) => readonly string[] = () => [],
  /** Whether a Procedure runs directly; one that runs only as a Line retains nothing until a Line runs it. */
  direct: (procedure: string) => boolean = () => true,
): Retention[] {
  const out: Retention[] = [];
  for (const step of steps) {
    const running = lines.filter((line) => line.procedure === step.procedure).sort((a, b) => (a.line < b.line ? -1 : 1));
    const runs: (LineDefinition | null)[] = running.length ? running : direct(step.procedure) ? [null] : [];
    for (const line of runs) {
      if (line && line.triggerInput !== null && line.triggerInput === step.alias) continue;
      const ref = step.logicalSource;
      let source: string | null = null;
      let given: string | null = null;
      if (ref && "literal" in ref) source = ref.literal;
      else if (ref && "input" in ref) {
        const value = line?.parameters[ref.input];
        if (typeof value === "string" && value) source = value;
        else given = ref.input;
      }
      // No source in the request: the Provider names it, as its interface declares (`produces`).
      const declared = !ref && step.interface ? produces(step.interface) : [];
      if (declared.length) {
        for (const name of declared) {
          out.push({ contract: step.contract, source: name, procedure: step.procedure, line: line?.line ?? null, emitted: step.emitted, given: null, interface: step.interface });
        }
        continue;
      }
      out.push({ contract: step.contract, source, procedure: step.procedure, line: line?.line ?? null, emitted: step.emitted, given, interface: step.interface });
    }
  }
  return out;
}

/** A capture-landing Trigger: the contract whose landings fire it, the logical sources it selects, its target. */
export interface LandingTrigger {
  name: string;
  contract: string;
  target: string;
  /** Empty: any landing under the contract fires it. */
  logicalSources: string[];
}

/** One logical source: the contracts it is captured under, who retains it, and the Triggers that select it. */
export interface LogicalSource {
  id: string;
  contracts: string[];
  retainedBy: Retention[];
  selectedBy: LandingTrigger[];
}

export function logicalSources(all: readonly Retention[], triggers: readonly LandingTrigger[]): LogicalSource[] {
  const byId = new Map<string, LogicalSource>();
  const entry = (id: string) => {
    let found = byId.get(id);
    if (!found) {
      found = { id, contracts: [], retainedBy: [], selectedBy: [] };
      byId.set(id, found);
    }
    return found;
  };
  const addContract = (source: LogicalSource, contract: string) => {
    if (!source.contracts.includes(contract)) source.contracts.push(contract);
  };
  for (const retention of all) {
    if (retention.source === null) continue;
    const source = entry(retention.source);
    source.retainedBy.push(retention);
    addContract(source, retention.contract);
  }
  for (const trigger of triggers) {
    for (const id of trigger.logicalSources) {
      const source = entry(id);
      source.selectedBy.push(trigger);
      addContract(source, trigger.contract);
    }
  }
  return [...byId.values()]
    .map((source) => ({ ...source, contracts: [...source.contracts].sort() }))
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

/** Who retains, in words: the Lines that run it, then the direct runs. */
export function retainedByWords(all: readonly Retention[]): string {
  const lines = [...new Set(all.filter((r) => r.line).map((r) => r.line!))].sort();
  const direct = [...new Set(all.filter((r) => !r.line).map((r) => r.procedure))].sort();
  const parts = [];
  if (lines.length) parts.push(`${lines.length === 1 ? "Line" : "Lines"} ${lines.join(", ")}`);
  if (direct.length) parts.push(`a direct ${direct.join(" or ")} run`);
  return parts.join(" or ") || "nothing defined here";
}

// -- slot bindings --------------------------------------------------------------

/** The interface name a slot or step takes (`web.fetch@3`, `web.fetch/v3` -> `web.fetch`), as the interfaces section names it. */
export const interfaceBase = (value: string) =>
  value.includes("@") ? value.slice(0, value.lastIndexOf("@")) : value.replace(/\/v\d+$/, "");

/**
 * The build a slot binds to, from what is served: the Line's explicit binding,
 * else the installed builds of its interface (exactly one binds by fit; more
 * than one leaves which one to the run). The bound build of an unbound slot
 * is not served as such.
 */
export type SlotBinding =
  | { kind: "line"; provider: string }
  | { kind: "fit"; provider: string }
  | { kind: "fit_many"; providers: string[] }
  | { kind: "none" };

export function slotBinding(
  slotInterface: string | null | undefined,
  explicit: string | null | undefined,
  builds: ReadonlyMap<string, readonly string[]>,
): SlotBinding {
  if (explicit) return { kind: "line", provider: explicit };
  const installed = slotInterface ? (builds.get(interfaceBase(slotInterface)) ?? []) : [];
  if (installed.length === 1) return { kind: "fit", provider: installed[0]! };
  if (installed.length > 1) return { kind: "fit_many", providers: [...installed] };
  return { kind: "none" };
}

// -- what a thing is, in a line ---------------------------------------------------

/** Long enough for three lines on a flow node, which clamps what is left. */
const GIST_MAX = 220;

/** A description's first clause, without parentheticals or run-on detail, capitalized and capped. */
export function gist(description: string | null | undefined): string | null {
  if (!description) return null;
  const clauses = description.replace(/\s*\([^()]*\)/g, "").split(/(?<=[a-z0-9'"`)])(\.\s|;\s|:\s)/i);
  // A short lead-in before a colon ("propose what changed: …") keeps what follows it.
  let clause = clauses[0]!;
  if (clauses[1]?.startsWith(":") && clause.length < 30 && clauses[2]) clause = `${clause}: ${clauses[2]}`;
  clause = clause
    // the contract it is retained under is on the node already
    .replace(/,?\s+and retain (?:it|them|both)(?: under [\w.-]+)?$/i, "")
    .replace(/[.:;,\s]+$/, "")
    .trim();
  if (!clause) return null;
  const capped = clause.length > GIST_MAX ? `${clause.slice(0, GIST_MAX).replace(/\s+\S*$/, "")}…` : clause;
  return capped[0]!.toUpperCase() + capped.slice(1);
}

/**
 * What a Line's Procedure does, in a line. Line Procedures open with what
 * started them ("Read the KEV catalog Capture that triggered the Line …"),
 * which the flow already draws; the gist starts at what it then does.
 */
export function lineGist(description: string | null | undefined): string | null {
  if (!description) return null;
  const opener = /^Read the .*? that triggered the Line\b/.exec(description);
  if (!opener) return gist(description);
  const rest = description.slice(opener[0].length);
  const verb = /\b(?:and |, )?((?:propose|settle|post|state|ask|answer|record|retire|emit)\b[\s\S]*)$/.exec(rest);
  return gist(verb ? verb[1] : description);
}

/** How a source arrives, from the interface its retaining step reads through. */
export function arrivalWords(step: { interface: string | null; emitted: boolean } | null): string | null {
  if (!step) return null;
  if (step.emitted) return "Run output";
  const base = step.interface ? interfaceBase(step.interface) : null;
  if (!base) return null;
  if (base === "web.fetch" || base.startsWith("web.fetch")) return "HTTP fetch";
  if (base === "workspace.file") return "Workspace file";
  return base.replace(/\/v\d+$/, "").replace(/^[a-z]+\./, "");
}

/** Where a fetch Line reads from: the host and path of its `url` parameter. */
export function urlWords(parameters: Record<string, unknown> | undefined): string | null {
  const url = parameters?.url;
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    return `From ${parsed.host}`;
  } catch {
    return null;
  }
}

// -- what an interface's step produces ---------------------------------------------

export type OperationContract = Schemas["ProviderOperationContract"];

/**
 * The fields a step through this interface produces: a source step's captured
 * material, or a call step's typed output. Null when neither is declared (an
 * external read whose output is only the shared capture format).
 */
export function producedFields(op: OperationContract | null | undefined): { name: string; type: string }[] | null {
  const schema = op?.material ?? (op && typeof op.output === "object" ? op.output : null);
  if (!schema?.fields) return null;
  return Object.entries(schema.fields).map(([name, field]) => ({
    name: field.optional ? `${name}?` : name,
    type: field.type ?? "string",
  }));
}
