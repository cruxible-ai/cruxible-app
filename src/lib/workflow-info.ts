/**
 * Read helpers over the composed schema's workflow/provider surfaces
 * (discriminated {id, kind, config} step wire shape).
 */

export type StepConfig = string | Record<string, unknown>;

export interface WireWorkflowStep {
  id?: string;
  kind?: string;
  /** String for provider / named-query references, object for inline specs. */
  config?: StepConfig | null;
}

export interface WireWorkflow {
  mode?: string;
  description?: string | null;
  steps?: WireWorkflowStep[];
  input_contract?: string | null;
}

export interface WireProvider {
  kind?: string;
  description?: string | null;
  ref?: string;
  version?: string;
  deterministic?: boolean;
  artifact?: string | null;
  runtime?: string;
  side_effects?: boolean;
  contract_in?: string;
  contract_out?: string;
}

export function workflowsOf(schemaData: unknown): Record<string, WireWorkflow> {
  return (
    (schemaData as { workflows?: Record<string, WireWorkflow> } | undefined)?.workflows ?? {}
  );
}

export function providersOf(schemaData: unknown): Record<string, WireProvider> {
  return (
    (schemaData as { providers?: Record<string, WireProvider> } | undefined)?.providers ?? {}
  );
}

/** One step chip's most identifying reference. */
export function stepDetail(config: StepConfig | null | undefined): string | null {
  if (typeof config === "string") return config;
  if (config) {
    for (const key of ["entity_type", "relationship_type", "entry_point", "workflow", "query"]) {
      const value = config[key];
      if (typeof value === "string") return value;
    }
  }
  return null;
}

export interface SignalWiring {
  source: string;
  /** Step id the signal's items expression reads from. */
  fromStepId?: string;
  /** Provider behind that step, when the reference is a provider step. */
  providerName?: string;
  /** Provider output field the verdict is read from (enum.path / score). */
  verdictPath?: string;
  /** Expression the per-member evidence text comes from. */
  evidenceExpr?: string;
}

const STEP_REF_RE = /^\$steps\.([^.]+)\./;

/**
 * Trace each map_signals step to its source: which provider's output feeds
 * it and which output field carries the verdict. This is the "logic behind
 * the signals" as the config declares it — no inference.
 */
export function signalWiring(workflow: WireWorkflow | undefined): SignalWiring[] {
  const steps = workflow?.steps ?? [];
  const byId = new Map(steps.map((s) => [s.id ?? "", s]));
  const wiring: SignalWiring[] = [];
  for (const step of steps) {
    if (step.kind !== "map_signals" || typeof step.config !== "object" || !step.config) continue;
    const config = step.config;
    const source = typeof config.signal_source === "string" ? config.signal_source : "unknown";
    const items = typeof config.items === "string" ? config.items : "";
    const fromStepId = STEP_REF_RE.exec(items)?.[1];
    const refStep = fromStepId ? byId.get(fromStepId) : undefined;
    const providerName =
      refStep?.kind === "provider" && typeof refStep.config === "string"
        ? refStep.config
        : undefined;
    const enumSpec = config.enum as { path?: string } | null | undefined;
    const verdictPath =
      typeof enumSpec?.path === "string"
        ? enumSpec.path
        : typeof config.score === "object" && config.score
          ? "score"
          : undefined;
    const evidenceExpr = typeof config.evidence === "string" ? config.evidence : undefined;
    wiring.push({
      source,
      ...(fromStepId ? { fromStepId } : {}),
      ...(providerName ? { providerName } : {}),
      ...(verdictPath ? { verdictPath } : {}),
      ...(evidenceExpr ? { evidenceExpr } : {}),
    });
  }
  return wiring;
}

/** Unique provider names referenced by a workflow's provider steps, in order. */
export function workflowProviders(workflow: WireWorkflow | undefined): string[] {
  const seen: string[] = [];
  for (const step of workflow?.steps ?? []) {
    if (step.kind === "provider" && typeof step.config === "string" && !seen.includes(step.config)) {
      seen.push(step.config);
    }
  }
  return seen;
}
