import { useMemo } from "react";
import { useClaimTypes, useGetBatch, useLines, useSourceModel } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { arrivalWords, gist, lineGist, retainedByWords, stepKind, urlWords, type Retention } from "@/lib/definitions";
import { buildFlow, readClaimTypeAccepts, type AcceptedEvidence, type AcquirerInput, type FlowModel } from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { wakeOf } from "@/lib/schedule";
import { sentence } from "@/lib/text";

/**
 * The evidence-flow model (sources, the Lines that fetch and read them, the
 * ClaimTypes they write, the inbox) with each Line's Triggers in words. Shared
 * by Evidence flow and the Lines table. Reads: the claim_types and lines
 * sections, the source model, every Line's card, and one get-batch of
 * ClaimType proofs.
 */
export function useFlowModel() {
  const claimTypes = useClaimTypes();
  const lines = useLines();
  const sources = useSourceModel();
  // Every Line's card, for its Triggers in words (a Line may have several: a schedule and landings).
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
  // Lines whose newest run has not finished: their dot pulses.
  const runningLines = useMemo(
    () =>
      new Set(lineNames.filter((_, i) => cardOf(lineCards.results[i], "line")?.recent_runs?.[0]?.status === "running")),
    [lineNames, lineCards.results],
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
    const { specs, lines: lineDefinitions, retentions: allRetentions } = sources.data;
    const lineOf = new Map(lineDefinitions.map((line) => [line.line, line] as const));
    // What a source is: a fetch Line's URL, else its retaining Procedure's description; how it arrives: the Contract its call's slot takes in.
    const describeSource = (retainedBy: readonly Retention[]) => {
      const retention = retainedBy.find((r) => urlWords(r.line ? lineOf.get(r.line)?.parameters : undefined)) ?? retainedBy[0];
      if (!retention) return { about: null, arrives: null };
      const spec = specs.get(retention.procedure);
      return {
        about: urlWords(retention.line ? lineOf.get(retention.line)?.parameters : undefined) ?? gist(spec?.description),
        // the step that retains this source (a Procedure may fetch several under one contract)
        arrives: arrivalWords({ slotIn: retention.slotIn, emitted: retention.emitted }),
      };
    };
    // Where sources come from: a Line that fetches them, or a direct run of the Procedure that retains them.
    const whenOf = new Map(
      [...triggerWords].map(([line, words]) => [line, words?.length ? sentence(words.join("; ")) : "When it is run"] as const),
    );
    const acquirers = new Map<string, AcquirerInput & { sources: string[] }>();
    for (const r of allRetentions) {
      if (r.source === null || r.emitted) continue;
      const runs = r.line ? ("line" as const) : ("direct" as const);
      const name = r.line ?? r.procedure;
      const key = `${runs}:${name}`;
      let entry = acquirers.get(key);
      if (!entry) {
        const description = specs.get(r.procedure)?.description;
        entry = {
          name,
          runs,
          about: (r.line ? urlWords(lineOf.get(r.line)?.parameters) : null) ?? gist(description),
          when: r.line ? (whenOf.get(r.line) ?? null) : "When an agent runs it",
          sources: [],
        };
        acquirers.set(key, entry);
      }
      if (!entry.sources.includes(r.source)) entry.sources.push(r.source);
    }
    return buildFlow({
      acquirers: [...acquirers.values()],
      sources: sources.data.sources.map((source) => ({
        id: source.id,
        contracts: source.contracts,
        retainedBy: source.retainedBy.length ? `Retained by ${retainedByWords(source.retainedBy)}` : "Named by whoever runs the fetch",
        ...describeSource(source.retainedBy),
      })),
      lineAbout: new Map(
        lineDefinitions.flatMap((line) => {
          const about = lineGist(specs.get(line.procedure)?.description);
          return about ? [[line.line, about] as const] : [];
        }),
      ),
      claimTypes: claimTypes.data.rows,
      accepts,
      triggers: sources.data.triggers,
      lineAuthority: new Map(lines.data.rows.map((row) => [lineName(row.line), row.authority] as const)),
      lineEnablement: new Map(lines.data.rows.map((row) => [lineName(row.line), row.enablement ?? null] as const)),
      // A Line posts to the inbox when its Procedure has an inbox step.
      postsInbox: new Set(
        lineDefinitions
          .filter((line) => specs.get(line.procedure)?.steps.some((step) => stepKind(step) === "inbox"))
          .map((line) => line.line),
      ),
    });
  }, [claimTypes.data, lines.data, sources.data, proofs.isPending, proofs.results, triggerWords]);

  const error = claimTypes.error ?? lines.error ?? sources.error;
  const capped = Boolean(sources.data?.truncated || claimTypes.data?.truncated);
  return { model, triggerWords, runningLines, proofs, error, capped };
}
