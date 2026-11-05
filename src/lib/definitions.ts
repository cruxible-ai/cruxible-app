// Relative .ts imports: scripts/record-fixtures.ts may run this under Node.
import type { Schemas } from "../api/schemas.ts";
import { createdKinds } from "./template.ts";

/**
 * Definitions as authored (Claim-authority core): a Procedure's authored form
 * (`GetProcedureCard.authored`, typed ProcedureSpec), a Line's envelope
 * (served only through `get detail=proof`, untyped: read here with runtime
 * checks), and the capture-landing Triggers with the logical sources they
 * select. From these the console derives where evidence comes from: a
 * logical source is retained by the call steps that capture under a
 * CaptureContract and name it in their input (literally, or through a Line
 * parameter `{$ref: param}`), and selected by the landing Triggers that name
 * it.
 *
 * Nothing here guesses a fact the daemon does not serve: a call step whose
 * input names no logical source has no source here, and its retention says so.
 */

export type ProcedureSpec = Schemas["ProcedureSpec"];
export type ProcedureStep = ProcedureSpec["steps"][number];
export type ProcedureSlot = Schemas["ProcedureSlot"];
export type ContractRef = Schemas["ContractRef"];
export type TemplateRef = Schemas["Ref"];

/** The step kinds of an authored Procedure, by the key that names each. */
export const STEP_KINDS = [
  "read",
  "call",
  "extract",
  "project",
  "transform",
  "guard",
  "inbox",
  "claims",
  "emit",
  "invoke",
  "select",
  "repeat",
  "halt",
] as const;
export type StepKind = (typeof STEP_KINDS)[number];

export function stepKind(step: ProcedureStep): StepKind {
  for (const kind of STEP_KINDS) if (kind in step) return kind;
  // The contract's step union is closed: every step carries one kind key.
  throw new Error(`unknown Procedure step: ${Object.keys(step).join(", ")}`);
}

const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);
const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

/** A template value that is a typed reference (`{$ref: input|param|step|item, step?, path}`). */
export function templateRef(value: unknown): TemplateRef | null {
  const r = record(value);
  if (!r || typeof r.$ref !== "string" || !["input", "param", "step", "item"].includes(r.$ref)) return null;
  return r as unknown as TemplateRef;
}

/** `name@N` of a Contract ref. */
export const contractRefText = (ref: ContractRef) => `${ref.name}@${ref.version}`;

/** A call's logical source: a literal, a Line parameter, or a run input field. */
export type LogicalSourceRef = { literal: string } | { param: string } | { input: string };

export function logicalSourceRef(input: unknown, key = "logical_source"): LogicalSourceRef | null {
  const value = record(input)?.[key];
  const literal = str(value);
  if (literal !== null) return { literal };
  const ref = templateRef(value);
  const head = ref?.path?.[0];
  if (!ref || !head) return null;
  if (ref.$ref === "param") return { param: head };
  if (ref.$ref === "input") return { input: head };
  return null;
}

/** The value a Line gives a logical source; null when the run is given it. */
export function resolvedSource(ref: LogicalSourceRef | null, parameters: Record<string, unknown> | undefined): string | null {
  if (!ref) return null;
  if ("literal" in ref) return ref.literal;
  if ("param" in ref) {
    const value = parameters?.[ref.param];
    return typeof value === "string" && value ? value : null;
  }
  return null;
}

/** A number a Line gives a call's input: a literal, or a `{$ref: param}` to a numeric parameter; null otherwise. */
export function resolvedNumber(value: unknown, parameters: Record<string, unknown> | undefined): number | null {
  if (typeof value === "number") return value;
  const ref = templateRef(value);
  const head = ref?.$ref === "param" ? ref.path?.[0] : undefined;
  const given = head ? parameters?.[head] : undefined;
  return typeof given === "number" ? given : null;
}

/** How a logical source reference reads as authored: the literal, `$params.x` or `$input.x`. */
export function logicalSourceText(ref: LogicalSourceRef): string {
  return "literal" in ref ? ref.literal : "param" in ref ? `$params.${ref.param}` : `$input.${ref.input}`;
}

/**
 * The id the run gives a step's node (core `_step_id`): its `id`, else its
 * output name (read, call, extract, project, transform, select, repeat), else
 * an invoke's `as`, else `step_<n>`.
 */
export function stepId(step: ProcedureStep, index: number): string {
  const s = step as Record<string, unknown>;
  const explicit = str(s.id);
  if (explicit) return explicit;
  for (const key of ["read", "call", "extract", "project", "transform", "select", "repeat"]) {
    const value = str(s[key]);
    if (value) return value;
  }
  if ("invoke" in step) return str(s.as) ?? `step_${index + 1}`;
  return `step_${index + 1}`;
}

/** The name `$ref: step` references use for a step's output (core `_output_alias`). */
export function stepAlias(step: ProcedureStep, index: number): string {
  const s = step as Record<string, unknown>;
  if ("invoke" in step) return str(s.as) ?? str(s.id) ?? `step_${index + 1}`;
  for (const key of ["read", "call", "extract", "project", "transform", "select", "repeat"]) {
    const value = str(s[key]);
    if (value) return value;
  }
  return stepId(step, index);
}

/**
 * One step as the definition panels show it: its id and kind, and the
 * definitions it names (contracts, queries, ClaimTypes, Procedures) by name.
 */
export interface StepView {
  id: string;
  kind: StepKind;
  /** The step's output name, when it differs from its id. */
  name: string | null;
  /** The CaptureContracts a call commits its captures as (or an emit's contract). */
  contracts: string[];
  /** The slot a call binds through. */
  slot: string | null;
  query: string | null;
  claimTypes: string[];
  procedure: string | null;
  logicalSource: LogicalSourceRef | null;
  /** halt: its code. */
  detail: string | null;
}

export function stepView(step: ProcedureStep, index: number): StepView {
  const kind = stepKind(step);
  const id = stepId(step, index);
  const alias = stepAlias(step, index);
  const view: StepView = {
    id,
    kind,
    name: alias !== id ? alias : null,
    contracts: [],
    slot: null,
    query: null,
    claimTypes: [],
    procedure: null,
    logicalSource: null,
    detail: null,
  };
  if ("call" in step) {
    view.slot = step.slot;
    view.contracts = Object.values(step.captures ?? {});
    view.logicalSource = logicalSourceRef(step.input);
  } else if ("read" in step) {
    view.query = step.query ?? null;
    if (step.claim_type) view.claimTypes = [step.claim_type];
  } else if ("claims" in step) {
    view.claimTypes = [...new Set(step.claims.map((claim) => claim.type))];
  } else if ("emit" in step) {
    view.contracts = [step.emit];
  } else if ("invoke" in step) {
    view.procedure = step.invoke;
  } else if ("halt" in step) {
    view.detail = step.halt ?? null;
  }
  return view;
}

/** A Procedure's slots: slot name -> the Contracts it takes in and gives out, and its effect. */
export function procedureSlots(spec: ProcedureSpec): ({ slot: string } & ProcedureSlot)[] {
  return Object.entries(spec.slots ?? {})
    .map(([slot, signature]) => ({ slot, ...signature }))
    .sort((a, b) => (a.slot < b.slot ? -1 : a.slot > b.slot ? 1 : 0));
}

// -- capturing calls and retentions ------------------------------------------

/** One call that captures under a contract, or an emit. */
export interface SourceStep {
  procedure: string;
  /** The call's name (what a Line's trigger_input names); null for an emit. */
  alias: string | null;
  contract: string;
  /** The Contract the call's slot takes in (`web.fetch.request`); null for an emit. */
  slotIn: string | null;
  logicalSource: LogicalSourceRef | null;
  /** The URL the call fetches (its input's `url`), for where a source comes from. */
  url: LogicalSourceRef | null;
  /** The most bytes the call accepts (its input's `max_bytes`, a number or a parameter), as authored. */
  maxBytes: unknown;
  /** The slot the call binds through (null for an emit). */
  slot?: string | null;
  emitted: boolean;
}

export function sourceSteps(procedure: string, spec: ProcedureSpec): SourceStep[] {
  const out: SourceStep[] = [];
  for (const step of spec.steps) {
    if ("call" in step) {
      const slotIn = spec.slots?.[step.slot]?.in.name ?? null;
      for (const contract of Object.values(step.captures ?? {})) {
        out.push({
          procedure,
          alias: step.call,
          contract,
          slotIn,
          logicalSource: logicalSourceRef(step.input),
          url: logicalSourceRef(step.input, "url"),
          maxBytes: record(step.input)?.max_bytes ?? null,
          slot: step.slot,
          emitted: false,
        });
      }
    } else if ("emit" in step) {
      out.push({ procedure, alias: null, contract: step.emit, slotIn: null, logicalSource: null, url: null, maxBytes: null, emitted: true });
    }
  }
  return out;
}

/** A Line as authored: its envelope (get detail=proof), read with runtime checks. */
export interface LineDefinition {
  line: string;
  procedure: string;
  parameters: Record<string, unknown>;
  /** The call that reads the Capture whose landing started the run. */
  triggerInput: string | null;
  /** The contract the trigger input reads (envelope trigger_event). */
  triggerContract: string | null;
  /** Slot bindings: slot -> the Provider build it binds. */
  bindings: Record<string, string>;
  /** Slot bindings: slot -> the build's operation it binds (`web.fetch`, `sbom.components`). */
  operations?: Record<string, string>;
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
  const operations: Record<string, string> = {};
  for (const [slot, binding] of Object.entries(record(envelope.bindings) ?? {})) {
    const name = targetName(record(binding)?.build);
    if (name) bindings[slot] = name;
    const operation = str(record(binding)?.operation);
    if (operation) operations[slot] = operation;
  }
  return {
    line,
    procedure,
    parameters: record(envelope.parameters) ?? {},
    triggerInput: str(envelope.trigger_input),
    triggerContract: str(record(record(envelope.trigger_event)?.capture_contract_identity)?.name),
    bindings,
    operations,
    maxAuthority: str(envelope.max_authority),
    occurrenceEpoch: typeof envelope.occurrence_epoch === "number" ? envelope.occurrence_epoch : null,
  };
}

/** One Capture a run retains: its contract and logical source, and who runs it. */
export interface Retention {
  contract: string;
  /** The logical source; null when the call names none (or the run emits its output). */
  source: string | null;
  procedure: string;
  /** The Line that runs it; null for a direct run. */
  line: string | null;
  emitted: boolean;
  /** The parameter or input field a run is given its logical source by. */
  given: string | null;
  /** The Contract the capturing call's slot takes in (null for an emit). */
  slotIn: string | null;
  /** The URL the call fetches, when its input names one (literally or through a Line parameter). */
  url: string | null;
  /** The most bytes the call accepts, when its input says (literally or through a Line parameter). */
  maxBytes: number | null;
  /** The Provider build the Line binds the call's slot to. */
  provider: string | null;
}

/**
 * Every Capture a run retains: a capturing call no Line feeds from its
 * landing (one per Line running the Procedure, else one direct run), and
 * every emit. A `{$ref: param}` logical source resolves through the Line's
 * parameters.
 */
export function retentions(
  steps: readonly SourceStep[],
  lines: readonly LineDefinition[],
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
      const source = resolvedSource(ref, line?.parameters);
      const given = source === null && ref && !("literal" in ref) ? ("param" in ref ? ref.param : ref.input) : null;
      out.push({
        contract: step.contract,
        source,
        procedure: step.procedure,
        line: line?.line ?? null,
        emitted: step.emitted,
        given,
        slotIn: step.slotIn,
        url: resolvedSource(step.url ?? null, line?.parameters),
        maxBytes: resolvedNumber(step.maxBytes, line?.parameters),
        provider: (step.slot && line?.bindings[step.slot]) || null,
      });
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

/** How a source arrives, from the Contract its capturing call's slot takes in. */
export function arrivalWords(step: { slotIn: string | null; emitted: boolean } | null): string | null {
  if (!step) return null;
  if (step.emitted) return "Run output";
  const name = step.slotIn?.replace(/\.request$/, "") ?? null;
  if (!name) return null;
  if (name.startsWith("web.fetch")) return "HTTP fetch";
  if (name === "workspace.file") return "Workspace file";
  return name.replace(/^[a-z]+\./, "");
}

/** A web address in plain words: its host, `www.` dropped ("cisa.gov"); null when it is not an http(s) URL. */
export function hostOf(url: unknown): string | null {
  if (typeof url !== "string" || !/^https?:\/\//.test(url)) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** What a Line's run does, from its Procedure: the sources its calls read, the ClaimTypes it writes, whether it posts. */
export interface LineFlow {
  line: string;
  /** The logical sources its calls read (`cisa.kev.catalog`), resolved against its parameters. */
  sources: string[];
  /** The web hosts its parameters name (`cisa.gov`), the plain-words "where from". */
  hosts: string[];
  /** The ClaimTypes its claims steps name. */
  writes: string[];
  /** The Subject kinds its claims steps may create (`subject.create: if_absent`, value targets with `create: if_absent`). */
  creates: string[];
  /** Whether its Procedure has an inbox step. */
  inbox: boolean;
}

export function lineFlow(spec: ProcedureSpec, line: LineDefinition): LineFlow {
  const views = spec.steps.map((step, index) => stepView(step, index));
  const sources = new Set<string>();
  for (const view of views) {
    const source = resolvedSource(view.logicalSource, line.parameters);
    if (source) sources.add(source);
  }
  const hosts = new Set(Object.values(line.parameters).flatMap((value) => hostOf(value) ?? []));
  return {
    line: line.line,
    sources: [...sources],
    hosts: [...hosts].sort(),
    writes: [...new Set(views.flatMap((view) => (view.kind === "claims" ? view.claimTypes : [])))],
    creates: [...new Set(spec.steps.flatMap((step) => createdKinds(step)))],
    inbox: views.some((view) => view.kind === "inbox"),
  };
}

/** Every Line's flow (Lines whose Procedure isn't served are left out), in Line name order. */
export function lineFlows(specs: ReadonlyMap<string, ProcedureSpec>, lines: readonly LineDefinition[]): LineFlow[] {
  return [...lines]
    .sort((a, b) => (a.line < b.line ? -1 : a.line > b.line ? 1 : 0))
    .flatMap((line) => {
      const spec = specs.get(line.procedure);
      return spec ? [lineFlow(spec, line)] : [];
    });
}

/** A Line that writes a ClaimType, and the logical sources its Procedure's calls read. */
export type ClaimTypeWriter = Omit<LineFlow, "writes" | "creates" | "inbox">;

/**
 * Who writes each ClaimType: for every Line, the ClaimTypes its Procedure's
 * claims steps name, with the logical sources its calls read (resolved
 * against the Line's parameters). predicate -> writers, Lines in name order.
 */
export function claimTypeWriters(
  specs: ReadonlyMap<string, ProcedureSpec>,
  lines: readonly LineDefinition[],
): Map<string, ClaimTypeWriter[]> {
  const out = new Map<string, ClaimTypeWriter[]>();
  for (const { line, sources, hosts, writes } of lineFlows(specs, lines)) {
    for (const predicate of writes) out.set(predicate, [...(out.get(predicate) ?? []), { line, sources, hosts }]);
  }
  return out;
}

/** A Procedure's extract over Captures of one contract: what it reads out of them. */
export interface ContractReading {
  procedure: string;
  /** Where the records are in the payload (`/vulnerabilities/*`), or null for one record. */
  records: string | null;
  /** The fields it reads, by name. */
  fields: string[];
  /** The payload paths its key reads (`cveID`). */
  key: string[];
  /** The payload paths its fields read, distinct, in declared order (`dateAdded`, `dueDate`). */
  paths: string[];
  /** The row Contract they are typed by (`security.kev-record@1`). */
  row: string | null;
}

/** For one CaptureKind, every Procedure extract that reads Captures of it. */
export function contractReadings(contract: string, specs: ReadonlyMap<string, ProcedureSpec>): ContractReading[] {
  const out: ContractReading[] = [];
  for (const [procedure, spec] of specs) {
    const capturing = new Set<string>();
    spec.steps.forEach((step, index) => {
      const captures = record((step as Record<string, unknown>).captures);
      if ("call" in step && captures && Object.values(captures).includes(contract)) capturing.add(stepAlias(step, index));
    });
    if (capturing.size === 0) continue;
    for (const step of spec.steps) {
      if (!("extract" in step)) continue;
      const raw = step as Record<string, unknown>;
      const ref = templateRef(raw.capture);
      const from = ref?.$ref === "step" ? (ref as unknown as { step?: string }).step : str(raw.capture)?.replace(/^\$steps\.([^.]+).*$/, "$1");
      if (!from || !capturing.has(from)) continue;
      const ats = (value: unknown) => [...new Set(Object.values(record(value) ?? {}).flatMap((f) => str(record(f)?.at) ?? []))];
      const key = ats(raw.key);
      out.push({
        procedure,
        records: str(raw.records),
        fields: Object.keys(record(raw.fields) ?? {}).sort(),
        key,
        paths: ats(raw.fields).filter((at) => !key.includes(at)),
        row: str(raw.row),
      });
    }
  }
  return out.sort((a, b) => (a.procedure < b.procedure ? -1 : a.procedure > b.procedure ? 1 : 0));
}
