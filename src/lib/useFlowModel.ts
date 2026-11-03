import { useMemo } from "react";
import { useClaimTypes, useGetBatch, useLines, useSourceModel, useSubjectKinds } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { arrivalWords, gist, hostOf, lineFlows, lineGist, type Retention } from "@/lib/definitions";
import { buildFlow, readClaimTypeAccepts, type AcceptedEvidence, type FlowModel } from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { isCoreIdentity } from "@/lib/ontology";
import { wakeOf } from "@/lib/schedule";
import { sentence } from "@/lib/text";

type RunRow = Schemas["RunRow"];

/**
 * The evidence-flow model (sources, the Lines that fetch them, the ClaimTypes
 * those Lines write, the inbox) with each Line's Triggers in words and its
 * newest run. Shared by Evidence flow and the Lines table. Reads: the
 * claim_types and lines sections, the source model, every Line's card, and
 * one get-batch of ClaimType proofs.
 */
export function useFlowModel() {
  const subjectKinds = useSubjectKinds();
  const claimTypes = useClaimTypes();
  const lines = useLines();
  const sources = useSourceModel();
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
  const proofs = useGetBatch(
    (claimTypes.data?.rows ?? []).filter((row) => (row.evidence ?? []).length > 0).map((row) => `ClaimType:${row.predicate}`),
    "proof",
  );

  const model = useMemo<FlowModel | null>(() => {
    if (!claimTypes.data || !lines.data || !sources.data || proofs.isPending) return null;
    const accepts = new Map<string, AcceptedEvidence[]>();
    for (const result of proofs.results) {
      const read = readClaimTypeAccepts((result as { proof?: unknown }).proof);
      if (read) accepts.set(read.predicate, read.accepts);
    }
    const { specs, lines: lineDefinitions } = sources.data;
    const flows = new Map(lineFlows(specs, lineDefinitions).map((flow) => [flow.line, flow] as const));
    const procedureOf = new Map(lineDefinitions.map((line) => [line.line, line.procedure] as const));
    // When a Line runs, in words: its Triggers ("Daily at 1:15 PM EST"), or on demand.
    const whenOf = (line: string) => {
      const words = triggerWords.get(line);
      if (!words) return null;
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
          postsInbox: flow?.inbox ?? false,
        };
      }),
      claimTypes: claimTypes.data.rows.filter((row) => !isCoreIdentity(row.predicate)),
      accepts,
      keys: new Set((subjectKinds.data?.rows ?? []).flatMap((kind) => kind.keys ?? [])),
    });
  }, [claimTypes.data, lines.data, sources.data, proofs.isPending, proofs.results, triggerWords, subjectKinds.data]);

  const error = claimTypes.error ?? lines.error ?? sources.error;
  const capped = Boolean(sources.data?.truncated || claimTypes.data?.truncated);
  return { model, triggerWords, lastRuns, runningLines, proofs, error, capped };
}
