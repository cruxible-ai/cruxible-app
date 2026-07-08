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
  as?: string | null;
  params?: Record<string, unknown> | null;
  input?: Record<string, unknown> | null;
  relationship_state?: unknown;
  include_source?: boolean;
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

export type StepPhase = "Read" | "Compute" | "Build" | "Write" | "Checks";

export interface StepDescriptionRow {
  label: string;
  value: string;
}

export interface StepDescription {
  summary: string;
  rows: StepDescriptionRow[];
  queryName?: string;
}

const STEP_PHASES: Record<string, StepPhase> = {
  query: "Read",
  provider: "Read",
  shape_items: "Compute",
  join_items: "Compute",
  filter_items: "Compute",
  aggregate_items: "Compute",
  dedupe_items: "Compute",
  make_candidates: "Compute",
  map_signals: "Compute",
  make_entities: "Build",
  make_relationships: "Build",
  propose_relationship_group: "Build",
  register_source_artifacts: "Build",
  apply_entities: "Write",
  apply_relationships: "Write",
  apply_all: "Write",
  assert: "Checks",
  assert_not_truncated: "Checks",
  assert_count: "Checks",
  assert_exists: "Checks",
};

const STEP_REF_SCAN_RE = /\$steps\.([A-Za-z0-9_-]+)/g;

export function stepPhase(step: WireWorkflowStep): StepPhase {
  return STEP_PHASES[step.kind ?? ""] ?? "Compute";
}

/** Unique earlier-step references read by this step's declared expressions. */
export function stepReadIds(step: WireWorkflowStep): string[] {
  const refs: string[] = [];
  const collect = (value: unknown) => {
    if (typeof value === "string") {
      for (const match of value.matchAll(STEP_REF_SCAN_RE)) {
        const id = match[1];
        if (id && id !== step.id && !refs.includes(id)) refs.push(id);
      }
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) collect(item);
      return;
    }
    if (isRecord(value)) {
      for (const item of Object.values(value)) collect(item);
    }
  };
  collect(step.config);
  collect(step.params);
  collect(step.input);
  return refs;
}

export function describeStep(step: WireWorkflowStep): StepDescription {
  const config = step.config;
  const kind = step.kind ?? "step";
  if (kind === "provider") {
    const name = typeof config === "string" ? config : "provider";
    return withStepExtras(step, { summary: `Calls provider ${name}`, rows: [] });
  }
  if (kind === "query") return describeQueryStep(step);
  if (!isRecord(config)) {
    return withStepExtras(step, {
      summary: typeof config === "string" ? config : `Runs ${kind.replaceAll("_", " ")}`,
      rows: [],
    });
  }

  const rows: StepDescriptionRow[] = [];
  const add = (label: string, value: unknown) => addRow(rows, label, value);
  const addMap = (label: string, value: unknown) => {
    const formatted = formatMapping(value);
    if (formatted) rows.push({ label, value: formatted });
  };

  switch (kind) {
    case "make_entities": {
      const entityType = text(config.entity_type, "Entity");
      const items = text(config.items, "items");
      const entityId = text(config.entity_id, "?");
      const properties = propertyLabel(config.properties);
      if (config.properties !== "auto") addMap("Properties", config.properties);
      return withStepExtras(step, {
        summary: `Builds ${entityType} entities from ${items} · id = ${entityId} · ${properties}`,
        rows,
      });
    }
    case "make_relationships":
    case "make_candidates": {
      const relationshipType = text(config.relationship_type, "relationship");
      const fromType = text(config.from_type, "From");
      const toType = text(config.to_type, "To");
      const fromId = text(config.from_id, "?");
      const toId = text(config.to_id, "?");
      add("Items", config.items);
      if (config.properties === "auto") add("Properties", "Auto-mapped");
      else addMap("Properties", config.properties);
      addMap("Evidence", config.evidence);
      return withStepExtras(step, {
        summary:
          kind === "make_candidates"
            ? `Builds ${relationshipType} candidates · ${fromType}(${fromId}) → ${toType}(${toId})`
            : `Builds ${relationshipType} edges · ${fromType}(${fromId}) → ${toType}(${toId})`,
        rows,
      });
    }
    case "apply_entities":
      return withStepExtras(step, {
        summary: `Writes build set '${text(config.entities_from, "?")}' to state`,
        rows,
      });
    case "apply_relationships":
      return withStepExtras(step, {
        summary: `Writes build set '${text(config.relationships_from, "?")}' to state`,
        rows,
      });
    case "apply_all":
      add("Entities", config.entities_from);
      add("Relationships", config.relationships_from);
      return withStepExtras(step, { summary: "Writes listed build sets to state", rows });
    case "shape_items":
      add("Fields", formatMapping(config.fields));
      add("Rename", formatMapping(config.rename));
      add("Casts", formatMapping(config.casts));
      add("Required", config.required);
      add("Include input", config.include_input);
      add("On missing", config.on_missing_required);
      return withStepExtras(step, {
        summary: `Shapes items from ${text(config.items, "items")}`,
        rows,
      });
    case "join_items":
      add("Left key", config.left_key);
      add("Right key", config.right_key);
      add("Join type", config.join_type);
      add("Fields", formatMapping(config.fields));
      return withStepExtras(step, {
        summary: `Joins ${text(config.left_items, "left items")} to ${text(config.right_items, "right items")}`,
        rows,
      });
    case "filter_items":
      add("Where", formatMapping(config.where));
      add("Comparisons", formatComparisons(config.comparisons));
      return withStepExtras(step, {
        summary: `Filters items from ${text(config.items, "items")}`,
        rows,
      });
    case "aggregate_items":
      add("Group by", formatMapping(config.group_by));
      add("Measures", formatMeasures(config.measures));
      return withStepExtras(step, {
        summary: `Aggregates items from ${text(config.items, "items")}`,
        rows,
      });
    case "dedupe_items":
      add("Keys", config.keys);
      add("Strategy", config.strategy);
      add("Rank", config.rank);
      return withStepExtras(step, {
        summary: `Deduplicates items from ${text(config.items, "items")}`,
        rows,
      });
    case "map_signals": {
      const signalSource = text(config.signal_source, "signal");
      add("Pair", `${text(config.from_id, "?")} → ${text(config.to_id, "?")}`);
      add("Verdict", signalVerdict(config));
      add("Evidence", config.evidence);
      add("Evidence refs", config.evidence_refs);
      return withStepExtras(step, {
        summary: `Maps ${signalSource} signals from ${text(config.items, "items")}`,
        rows,
      });
    }
    case "propose_relationship_group":
      add("Candidates", config.candidates_from);
      add("Signals", config.signals_from);
      add("On empty", config.on_empty);
      add("Pending refresh", config.pending_refresh_mode);
      add("Priority", config.suggested_priority);
      add("Proposed by", config.proposed_by);
      add("Thesis", config.thesis_text);
      add("Analysis state", formatMapping(config.analysis_state));
      return withStepExtras(step, {
        summary: `Proposes ${text(config.relationship_type, "relationship")} group`,
        rows,
      });
    case "register_source_artifacts":
      add("Artifact id", config.artifact_id);
      add("Content", config.content);
      add("Kind", config.kind);
      add("Label", config.label);
      add("Original URI", config.original_uri);
      add("Retention", config.retention);
      return withStepExtras(step, {
        summary: `Registers source artifacts from ${text(config.items, "items")}`,
        rows,
      });
    case "assert":
      add("Message", config.message);
      add("Value type", config.value_type);
      return withStepExtras(step, {
        summary: `Asserts ${text(config.left, "?")} ${text(config.op, "equals")} ${text(config.right, "?")}`,
        rows,
      });
    case "assert_not_truncated":
      return withStepExtras(step, {
        summary: `Asserts step '${text(config.step, "?")}' was not truncated`,
        rows,
      });
    case "assert_count":
      add("Message", config.message);
      return withStepExtras(step, {
        summary: `Asserts ${text(config.step, "?")} ${text(config.count, "count")} ${text(config.op, "equals")} ${text(config.value, "?")}`,
        rows,
      });
    case "assert_exists":
      add("Message", config.message);
      return withStepExtras(step, {
        summary: `Asserts ${text(config.ref, "?")} exists`,
        rows,
      });
    default:
      for (const [key, value] of Object.entries(config)) add(humanLabel(key), value);
      return withStepExtras(step, { summary: `Runs ${kind.replaceAll("_", " ")}`, rows });
  }
}

export interface SignalWiring {
  source: string;
  /** Step id the signal's items expression reads from. */
  fromStepId?: string;
  /** Provider behind that step, when the reference is a provider step. */
  providerName?: string;
  /** Provider output field the verdict is read from. */
  verdictPath?: string;
  /** For score-mapped signals: the declared thresholding rule. */
  verdictRule?: string;
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
    const scoreSpec = config.score as
      | { path?: string; support_gte?: number; unsure_gte?: number }
      | null
      | undefined;
    const verdictPath =
      typeof enumSpec?.path === "string"
        ? enumSpec.path
        : typeof scoreSpec?.path === "string"
          ? scoreSpec.path
          : undefined;
    // Score-mapped signals threshold a numeric provider output into the
    // tri-state verdict; the rule is config, so show it verbatim.
    const verdictRule = scoreSpec?.path
      ? `≥${scoreSpec.support_gte ?? "?"} support · ≥${scoreSpec.unsure_gte ?? "?"} unsure · else contradict`
      : undefined;
    const evidenceExpr = typeof config.evidence === "string" ? config.evidence : undefined;
    wiring.push({
      source,
      ...(fromStepId ? { fromStepId } : {}),
      ...(providerName ? { providerName } : {}),
      ...(verdictPath ? { verdictPath } : {}),
      ...(verdictRule ? { verdictRule } : {}),
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

function describeQueryStep(step: WireWorkflowStep): StepDescription {
  const config = step.config;
  const rows: StepDescriptionRow[] = [];
  if (typeof config === "string") {
    addRow(rows, "Params", formatMapping(step.params));
    addRow(rows, "Relationship state", step.relationship_state);
    if (step.include_source) addRow(rows, "Include source", "Yes");
    return withStepExtras(step, {
      summary: `Runs named query ${config}`,
      rows,
      queryName: config,
    });
  }
  if (!isRecord(config)) {
    return withStepExtras(step, { summary: "Runs query", rows });
  }

  addRow(rows, "Relationship state", step.relationship_state);
  if (step.include_source) addRow(rows, "Include source", "Yes");

  const target = [config.mode, config.result_shape, config.returns].map(textOrNull).filter(Boolean);
  return withStepExtras(step, {
    summary: `Runs inline query${target.length > 0 ? ` · ${target.join(" · ")}` : ""}`,
    rows,
  });
}

function withStepExtras(
  step: WireWorkflowStep,
  description: StepDescription,
): StepDescription {
  const rows = [...description.rows];
  addRow(rows, "As", step.as);
  return { ...description, rows };
}

function addRow(rows: StepDescriptionRow[], label: string, value: unknown): void {
  const formatted = typeof value === "string" ? value : formatValue(value);
  if (!formatted) return;
  rows.push({ label, value: formatted });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function text(value: unknown, fallback: string): string {
  return textOrNull(value) ?? fallback;
}

function textOrNull(value: unknown): string | null {
  const formatted = formatValue(value);
  return formatted || null;
}

function propertyLabel(value: unknown): string {
  if (value === "auto") return "properties auto-mapped";
  if (isRecord(value) && Object.keys(value).length > 0) return "explicit properties";
  return "no explicit properties";
}

function formatValue(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    const parts = value.map(formatValue).filter((part): part is string => Boolean(part));
    return parts.length > 0 ? parts.join(", ") : null;
  }
  if (isRecord(value)) return formatMapping(value);
  return String(value);
}

function formatMapping(value: unknown): string | null {
  if (!isRecord(value)) return formatValue(value);
  const entries = Object.entries(value)
    .map(([key, item]) => {
      const formatted = formatValue(item);
      return formatted ? `${key} = ${formatted}` : null;
    })
    .filter((part): part is string => Boolean(part));
  return entries.length > 0 ? entries.join("; ") : null;
}

function formatComparisons(value: unknown): string | null {
  if (!Array.isArray(value)) return formatValue(value);
  const comparisons = value.map(formatComparison).filter((part): part is string => Boolean(part));
  return comparisons.length > 0 ? comparisons.join("; ") : null;
}

function formatComparison(value: unknown): string | null {
  if (!isRecord(value)) return formatValue(value);
  const left = text(value.left, "?");
  const op = text(value.op, "=");
  const right = text(value.right, "?");
  const type = textOrNull(value.value_type);
  return `${left} ${op} ${right}${type ? ` (${type})` : ""}`;
}

function formatMeasures(value: unknown): string | null {
  if (!isRecord(value)) return formatValue(value);
  const measures = Object.entries(value)
    .map(([name, spec]) => {
      const formatted = formatMeasure(spec);
      return formatted ? `${name} = ${formatted}` : null;
    })
    .filter((part): part is string => Boolean(part));
  return measures.length > 0 ? measures.join("; ") : null;
}

function formatMeasure(value: unknown): string | null {
  if (!isRecord(value)) return formatValue(value);
  if (value.count === true) return "count";
  if (isRecord(value.count_where)) return `count where ${formatComparison(value.count_where)}`;
  if (isRecord(value.count_distinct)) return `count distinct ${text(value.count_distinct.value, "?")}`;
  for (const op of ["sum", "min", "max"]) {
    const spec = value[op];
    if (isRecord(spec)) return `${op} ${text(spec.value, "?")}`;
  }
  return formatMapping(value);
}

function signalVerdict(config: Record<string, unknown>): string | null {
  const enumSpec = config.enum;
  if (isRecord(enumSpec)) {
    const mapping = formatMapping(enumSpec.map);
    return `enum ${text(enumSpec.path, "?")}${mapping ? ` · ${mapping}` : ""}`;
  }
  const scoreSpec = config.score;
  if (isRecord(scoreSpec)) {
    return `score ${text(scoreSpec.path, "?")} · ≥${text(scoreSpec.support_gte, "?")} support · ≥${text(scoreSpec.unsure_gte, "?")} unsure · else contradict`;
  }
  return null;
}


function humanLabel(value: string): string {
  const spaced = value.replaceAll("_", " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
