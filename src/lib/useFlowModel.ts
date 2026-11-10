import { useMemo } from "react";
import { useCaptureContracts, useClaimTypes, useGetBatch, useLines, useSourceModel, useSubjectKinds } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import {
  arrivalWords,
  gist,
  hostOf,
  lineFlows,
  lineGist,
  logicalSourceRef,
  resolvedSource,
  stepAlias,
  type LandingTrigger,
  type LineDefinition,
  type ProcedureSpec,
  type Retention,
} from "@/lib/definitions";
import { buildFlow, readClaimTypeAccepts, type AcceptedEvidence, type DeriveInput, type FlowModel, type LandingLinkInput } from "@/lib/evidence-flow";
import { contractName } from "@/lib/ontology";
import { captureInputs, isDerive, type Grades } from "@/lib/template";
import { lineName } from "@/lib/lines";
import { isCoreIdentity } from "@/lib/ontology";
import { wakeOf } from "@/lib/schedule";
import { sentence } from "@/lib/text";
import { useDependenciesOf } from "@/lib/useLineDependencies";
import { useRunbookWakes } from "@/lib/useRunbookWakes";

type RunRow = Schemas["RunRow"];

/**
 * The evidence-flow model (sources, the Lines that fetch them, the ClaimTypes
 * those Lines write, the inbox, the links between Lines) with each Line's
 * Triggers in words and its newest run. Shared by Evidence flow and the Lines
 * table. Reads: the claim_types, lines and subject_kinds sections, the source
 * model, every Line's card, one get-batch of ClaimType proofs and one of the
 * Query cards the Lines read.
 */
export function useFlowModel() {
  const subjectKinds = useSubjectKinds();
  const claimTypes = useClaimTypes();
  const lines = useLines();
  const sources = useSourceModel();
  // Which CaptureKinds are derived: which calls are derives (D-R37).
  const contracts = useCaptureContracts();
  // Every Line's card, for its Triggers in words (a Line may have several: a schedule and landings) and its newest run.
  const lineNames = useMemo(() => (lines.data?.rows ?? []).map((row) => lineName(row.line)), [lines.data]);
  // One get-batch in the daemon's order: the same request (and cache entry) the Lines table makes.
  const lineCards = useGetBatch(lineNames.map((line) => `Line:${line}`));
  const triggerWords = useMemo(
    () =>
      new Map(
        lineNames.map((line, i) => {
          const card = cardOf(lineCards.results[i], "line");
          return [line, card ? (card.triggers ?? []).map((t) => wakeOf(t.fires).words.replace(/^when /, "")) : null] as const;
        }),
      ),
    [lineNames, lineCards.results],
  );
  // Each Line's newest run (absent: never run; the map is null while the cards load).
  const lastRuns = useMemo(() => {
    if (lineCards.isPending) return null;
    const out = new Map<string, RunRow>();
    lineNames.forEach((line, i) => {
      const run = cardOf(lineCards.results[i], "line")?.recent_runs?.[0];
      if (run) out.set(line, run);
    });
    return out;
  }, [lineNames, lineCards.isPending, lineCards.results]);
  const runningLines = useMemo(
    () => new Set([...(lastRuns ?? [])].filter(([, run]) => run.status === "running").map(([line]) => line)),
    [lastRuns],
  );
  // The Runbook Triggers that run each Line: a Line with no Trigger of its own still runs on its Runbook's schedule.
  const runbookWakes = useRunbookWakes();
  const proofs = useGetBatch(
    (claimTypes.data?.rows ?? []).filter((row) => (row.evidence ?? []).length > 0).map((row) => `ClaimType:${row.predicate}`),
    "proof",
  );

  // Which Lines read what other Lines write (or what is entered directly).
  const dependencies = useDependenciesOf(sources.data, subjectKinds.error ? [] : subjectKinds.data?.rows);

  const model = useMemo<FlowModel | null>(() => {
    if (!claimTypes.data || !lines.data || !sources.data || proofs.isPending || dependencies === null || contracts.isPending || runbookWakes.pending) return null;
    const grades: Grades = new Map((contracts.data?.rows ?? []).map((row) => [contractName(row.contract), row.grade] as const));
    const accepts = new Map<string, AcceptedEvidence[]>();
    for (const result of proofs.results) {
      const read = readClaimTypeAccepts((result as { proof?: unknown }).proof);
      if (read) accepts.set(read.predicate, read.accepts);
    }
    const { specs, lines: lineDefinitions } = sources.data;
    const flows = new Map(lineFlows(specs, lineDefinitions).map((flow) => [flow.line, flow] as const));
    const procedureOf = new Map(lineDefinitions.map((line) => [line.line, line.procedure] as const));
    // When a Line runs, in words: its Triggers ("Daily at 1:15 PM EST"), then its Runbooks' ("Daily at 9:00 AM EST, security.maintain"), or on demand.
    const whenOf = (line: string) => {
      const own = triggerWords.get(line);
      if (!own) return null;
      const words = [...own, ...(runbookWakes.byLine.get(line) ?? []).map((w) => `${wakeOf(w.fires).words}, ${w.runbook}`)];
      return words.length ? sentence(words.length > 1 ? `${words[0]} (+${words.length - 1} more)` : words[0]!) : "When it is run";
    };
    // A source: where it comes from (the URL its fetch names), how it arrives, and when it is fetched.
    const describe = (retainedBy: readonly Retention[]) => {
      const fetched = retainedBy.filter((r) => !r.emitted);
      const byLine = fetched.filter((r) => r.line);
      const first = byLine[0] ?? fetched[0] ?? retainedBy[0];
      const lineNamesOf = [...new Set(byLine.map((r) => r.line!))].sort();
      const direct = [...new Set(fetched.filter((r) => !r.line).map((r) => r.procedure))].sort();
      const when = lineNamesOf.length ? whenOf(lineNamesOf[0]!) : direct.length ? "When an agent runs it" : null;
      const fetchedBy = [
        ...lineNamesOf.map((line) => `Fetched by Line ${line}${whenOf(line) ? ` (${whenOf(line)!.toLowerCase()})` : ""}`),
        ...direct.map((procedure) => `Fetched when an agent runs ${procedure}`),
      ].join("\n");
      return {
        host: retainedBy.map((r) => hostOf(r.url)).find(Boolean) ?? null,
        arrives: first ? arrivalWords({ slotIn: first.slotIn, emitted: first.emitted }) : null,
        when,
        fetchedBy: fetchedBy || null,
        about: first ? gist(specs.get(first.procedure)?.description) : null,
      };
    };
    return buildFlow({
      sources: sources.data.sources.map((source) => ({ id: source.id, contracts: source.contracts, ...describe(source.retainedBy) })),
      lines: lines.data.rows.map((row) => {
        const name = lineName(row.line);
        const flow = flows.get(name);
        const lands = sources.data!.retentions.filter((r) => r.line === name && r.source !== null).map((r) => r.source!);
        const procedure = procedureOf.get(name);
        return {
          name,
          authority: row.authority,
          enablement: row.enablement ?? null,
          about: procedure ? lineGist(specs.get(procedure)?.description) : null,
          reads: flow?.sources ?? [],
          lands,
          writes: flow?.writes ?? [],
          creates: flow?.creates ?? [],
          postsInbox: flow?.inbox ?? false,
        };
      }),
      claimTypes: claimTypes.data.rows.filter((row) => !isCoreIdentity(row.predicate)),
      accepts,
      keys: new Set((subjectKinds.data?.rows ?? []).flatMap((kind) => kind.keys ?? [])),
      dependencies,
      derives: lineDefinitions.flatMap((line) => {
        const spec = specs.get(line.procedure);
        return spec ? lineDerives(spec, line, grades) : [];
      }),
      landings: derivedLandings(specs, lineDefinitions, sources.data.triggers, grades),
    });
  }, [claimTypes.data, lines.data, sources.data, proofs.isPending, proofs.results, triggerWords, subjectKinds.data, dependencies, contracts.isPending, contracts.data, runbookWakes.pending, runbookWakes.byLine]);

  const error = claimTypes.error ?? lines.error ?? sources.error;
  const capped = Boolean(sources.data?.truncated || claimTypes.data?.truncated);
  return { model, triggerWords, lastRuns, runningLines, proofs, error, capped };
}

/** A Line's derive steps: what each reads (the logical sources of the fetches it takes Captures from, the derives before it). */
export function lineDerives(spec: ProcedureSpec, line: LineDefinition, grades: Grades): DeriveInput[] {
  const aliases = spec.steps.map((step, index) => stepAlias(step, index));
  const derive = spec.steps.map((_, index) => isDerive(spec, index, grades));
  const out: DeriveInput[] = [];
  spec.steps.forEach((step, index) => {
    if (!("call" in step) || !derive[index]) return;
    const inputs = captureInputs(spec, index);
    const sources = new Set<string>();
    const derives = new Set<string>();
    for (const input of inputs) {
      const at = aliases.indexOf(input.step);
      const from = spec.steps[at];
      if (!from || !("call" in from)) continue;
      if (derive[at]) derives.add(input.step);
      else {
        const source = resolvedSource(logicalSourceRef(from.input), line.parameters);
        if (source) sources.add(source);
      }
    }
    out.push({
      line: line.line,
      step: aliases[index]!,
      operation: line.operations?.[step.slot] ?? null,
      kinds: Object.values(step.captures ?? {}),
      sources: [...sources].sort(),
      derives: [...derives].sort(),
    });
  });
  return out;
}

/** Landing Triggers on a derive's output: the Lines whose derives commit the kind start the Trigger's target. */
export function derivedLandings(
  specs: ReadonlyMap<string, ProcedureSpec>,
  lines: readonly LineDefinition[],
  triggers: readonly LandingTrigger[],
  grades: Grades,
): LandingLinkInput[] {
  const out: LandingLinkInput[] = [];
  for (const trigger of triggers) {
    const to = trigger.target.replace(/^Line:/, "");
    if (!trigger.target.startsWith("Line:") && trigger.target.includes(":")) continue;
    for (const line of lines) {
      const spec = specs.get(line.procedure);
      if (!spec) continue;
      const produces = spec.steps.some((step, index) => "call" in step && isDerive(spec, index, grades) && Object.values(step.captures ?? {}).includes(trigger.contract));
      if (produces && line.line !== to) out.push({ from: line.line, to, contract: trigger.contract });
    }
  }
  return out;
}
