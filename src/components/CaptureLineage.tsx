import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCaptureRead, useCard, useCardAt, useGetBatch, useInstanceId, useRetainedAt, useRunState } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { CaptureRows } from "@/components/DerivedFrom";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList } from "@/components/FieldList";
import { LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShortId } from "@/components/ShortId";
import { PanelGroup } from "@/components/graph/PanelBits";
import { useAtLink } from "@/lib/at";
import { captureHandle } from "@/lib/next-reasons";
import { contractName } from "@/lib/ontology";
import { callOutputs, listFields, listOutcome } from "@/lib/template";
import { stepAlias, type ProcedureSpec } from "@/lib/definitions";

type CaptureCard = Schemas["GetCaptureCard"];

/** A derived Capture's source cards (one get-batch, the Capture page's own full list); empty for an observed one. */
export function useDerivationSources(card: CaptureCard | null) {
  const sources = useMemo(() => card?.derivation?.sources ?? [], [card]);
  const reads = useGetBatch(sources.map((digest) => `Capture:${digest}`));
  const cards = useMemo(() => {
    const out = new Map<string, CaptureCard>();
    for (const result of reads.results) {
      const c = cardOf(result, "capture");
      if (c) out.set(c.digest, c);
    }
    return out;
  }, [reads.results]);
  return { sources, cards, isPending: sources.length > 0 && reads.isPending, error: reads.error };
}

/**
 * A Capture's access, as labels: `restricted` when its kind restricts it,
 * `restricted (inherited from X)` when a derived Capture takes the
 * restriction from a source of another kind (D-R37 d6), else `open`.
 */
export function AccessValue({ card, sources }: { card: CaptureCard; sources: ReadonlyMap<string, CaptureCard> }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  if (card.access !== "restricted") return <>{card.access === "instance" ? "open" : (card.access ?? "—")}</>;
  const own = contractName(card.contract);
  const from = [...new Set([...sources.values()].filter((s) => s.access === "restricted").map((s) => contractName(s.contract)))].filter((k) => k !== own);
  if (from.length === 0) return <>restricted</>;
  return (
    <span title="A derived Capture takes the most restrictive access of its inputs">
      restricted (inherited from{" "}
      {from.map((kind, i) => (
        <span key={kind}>
          {i > 0 && ", "}
          <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(kind)}`)} className="font-mono hover:underline">
            {kind}
          </Link>
        </span>
      ))}
      )
    </span>
  );
}

/**
 * Derived from (D-R37 d5): the Captures a derived Capture was computed from
 * (each linked), the accepted-state reads it took, and its reducer (the
 * provider build, operation, implementation and the node's input template,
 * by digest).
 */
export function CaptureDerivation({ card, sources }: { card: CaptureCard; sources: ReturnType<typeof useDerivationSources> }) {
  const derivation = card.derivation;
  if (!derivation) return null;
  const reducer = derivation.reducer ?? null;
  const reads = derivation.reads ?? [];
  return (
    <Panel title="Derived from" meta={<span>{sources.sources.length} {sources.sources.length === 1 ? "Capture" : "Captures"}</span>}>
      {sources.isPending && <LoadState />}
      {sources.error && <LoadState error={sources.error} />}
      {!sources.isPending && sources.sources.length > 0 && (
        <CaptureRows rows={sources.sources.map((digest) => ({ digest, card: sources.cards.get(digest) ?? null }))} label="Source Captures" />
      )}
      <PanelGroup title="State reads">
        {reads.length === 0 ? (
          <div className="text-[12px] text-zinc-600">None</div>
        ) : (
          <div className="flex flex-wrap gap-x-4 text-[12px]">
            {reads.map((digest) => (
              <ShortId key={digest} value={digest} className="text-zinc-300" />
            ))}
          </div>
        )}
      </PanelGroup>
      {reducer && (
        <PanelGroup title="Reducer">
          <FieldList
            density="compact"
            labels="words"
            label="Reducer"
            fields={[
              { key: "build", label: "Provider build", value: <ShortId value={reducer.provider_build} className="text-zinc-300" /> },
              { key: "operation", label: "Operation", value: <ShortId value={reducer.operation_signature} className="text-zinc-300" /> },
              { key: "implementation", label: "Implementation", value: <ShortId value={reducer.implementation} className="text-zinc-300" /> },
              { key: "template", label: "Input template", value: <ShortId value={reducer.input_template} className="text-zinc-300" /> },
              { key: "digest", label: "Reducer", value: <ShortId value={reducer.digest} className="text-zinc-300" /> },
            ]}
          />
        </PanelGroup>
      )}
    </Panel>
  );
}

interface Sibling {
  /** The member's page index; null when the run does not serve it (never inferred from digest order). */
  index: number | null;
  digest: string | null;
  requestUrl: string | null;
  status: "kept" | "dropped" | null;
  reason: string | null;
}

type CallNode = NonNullable<Schemas["GetProcedureRunCard"]["nodes"]>[number];
type CallSummary = Extract<NonNullable<CallNode["summary"]>, { kind: "call" }>;

/** The call node of a run that returned this Capture: in its planned members, or its capture digests. */
function callOf(run: Schemas["GetProcedureRunCard"] | null, digest: string): { node: string; summary: CallSummary } | null {
  for (const node of run?.nodes ?? []) {
    const summary = node.summary;
    if (summary?.kind !== "call") continue;
    if ((summary.capture_digests ?? []).includes(digest) || listOutcome(summary)?.members.some((m) => m.capture === digest)) return { node: node.node, summary };
  }
  return null;
}

/**
 * The call's Capture fields and its out Contract's list fields, as defined at
 * the run's bound coordinate (its run state; a later revision of the
 * Procedure or Contract never classifies an older run's outputs). Read only
 * when the run serves no members naming this Capture and the call returned
 * others, and only while the daemon retains that coordinate's projection
 * (`useRetainedAt`): a read past the window would rebuild it, O(instance +
 * history), on a routine page visit. Reads: the run state, the coordinate's
 * generation (GET /head?at=), then the Procedure card and the slot's out
 * Contract card there. Past the window, or any of them unread: no fields
 * (unclassified).
 */
function useCallFields(runId: string | null, run: Schemas["GetProcedureRunCard"] | null, call: { node: string; summary: CallSummary } | null, digest: string) {
  const needed = call !== null && !listOutcome(call.summary)?.members.some((m) => m.capture === digest) && (call.summary.capture_digests ?? []).length > 1;
  const state = useRunState(needed ? runId : null);
  const bound = state.data?.bound_coordinate;
  const window = useRetainedAt(needed && bound ? [bound.git_oid] : []);
  const readAt = bound && window.retained.has(bound.git_oid) ? bound : undefined;
  const procedureRead = useCardAt(needed && run && readAt ? run.procedure : null, readAt);
  const spec = cardOf(procedureRead.data, "procedure")?.authored ?? null;
  const index = spec && call ? spec.steps.findIndex((step, i) => "call" in step && stepAlias(step, i) === call.node) : -1;
  const step = index >= 0 ? (spec!.steps[index] as Extract<ProcedureSpec["steps"][number], { call: string }>) : null;
  const out = step ? spec!.slots?.[step.slot]?.out : undefined;
  const contractRead = useCardAt(out && readAt ? `Contract:${out.name}@${out.version}` : null, readAt);
  const contract = cardOf(contractRead.data, "contract");
  if (!needed) return { fields: null, isPending: false };
  if (state.isPending || (bound && window.isPending) || (readAt && procedureRead.isPending) || (out && readAt && contractRead.isPending)) return { fields: null, isPending: true };
  if (!readAt || !step || !contract) return { fields: null, isPending: false };
  return { fields: { captures: Object.keys(step.captures ?? {}), lists: listFields(contract).map((f) => f.field) }, isPending: false };
}

/**
 * The Captures fetched with this one (D-R37 a), found through the run that
 * fetched it (its envelope's run, the run card's call summary). Called list
 * members only when membership is known (`callOutputs`): the planned
 * `members` give each its page, request URL and status; a call whose one
 * Capture field is a list gives its members without pages. Any other call's
 * Captures are its other outputs, unclassified.
 */
export function ListSiblings({ card }: { card: CaptureCard }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const read = useCaptureRead(card.erased ? null : card.capture);
  const runId = read.data?.envelope?.run_coordinate?.run_kind === "procedure" ? read.data.envelope.run_coordinate.run_id : null;
  const run = cardOf(useCard(runId ? `ProcedureRun:${runId}` : null).data, "procedure_run") ?? null;
  const call = useMemo(() => callOf(run, card.digest), [run, card.digest]);
  const fields = useCallFields(runId, run, call, card.digest);
  const outputs = useMemo(() => (fields.isPending ? null : callOutputs(call?.summary, card.digest, fields.fields)), [call, card.digest, fields.isPending, fields.fields]);
  const rows = useMemo<Sibling[]>(() => {
    if (!outputs) return [];
    if (outputs.kind === "members") return outputs.members.map((m) => ({ index: m.index, digest: m.capture, requestUrl: m.requestUrl, status: m.status, reason: m.reason }));
    return outputs.digests.map((digest) => ({ index: null, digest, requestUrl: null, status: null, reason: null }));
  }, [outputs]);
  const paged = outputs?.kind === "members";
  const columns = useMemo<Column<Sibling>[]>(
    () => [
      ...(paged ? [{ id: "index", header: "Page", numeric: true, className: "font-mono text-zinc-500", cell: (s: Sibling) => s.index }] : []),
      {
        id: "capture",
        header: "Capture",
        className: "whitespace-nowrap",
        cell: (s) =>
          s.digest === card.digest ? (
            <span className="font-mono text-zinc-100" title="This Capture">
              {captureHandle(s.digest)}
            </span>
          ) : s.digest ? (
            <RefLink value={captureHandle(s.digest)} />
          ) : (
            <span className="text-zinc-600">—</span>
          ),
      },
      ...(paged
        ? [
            { id: "request", header: "Request URL", className: "break-all font-mono text-[12px] text-zinc-400", cell: (s: Sibling) => s.requestUrl ?? "—" },
            {
              id: "status",
              header: "Status",
              className: "whitespace-nowrap",
              cell: (s: Sibling) => <span className={s.status === "dropped" ? "text-red-400/90" : "text-zinc-300"}>{s.status}{s.reason ? ` · ${s.reason}` : ""}</span>,
            },
          ]
        : []),
    ],
    [card.digest, paged],
  );
  if (!runId || !call) return null;
  if (fields.isPending) return <LoadState />;
  if (!outputs) return null;
  const heading =
    outputs.kind === "members"
      ? { title: "Fetched with", description: "The list this Capture is a member of: every member of the same fetch, in the provider's order.", label: "List members" }
      : outputs.kind === "field"
        ? { title: "Fetched with", description: `The list this Capture is a member of (${outputs.field}). The run serves no page index or request URL per member.`, label: "List members" }
        : { title: "Other outputs of this call", description: "Captures the same call returned. The run serves no output field or list membership for them.", label: "Other outputs of this call" };
  return (
    <Panel
      title={heading.title}
      description={heading.description}
      meta={
        <span className="flex items-baseline gap-2">
          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId)}`)} className="font-mono hover:underline" title={`Run ${runId}`}>
            {runId}
          </Link>
          <span className="font-mono">{call.node}</span>
        </span>
      }
    >
      <DataTable rows={rows} columns={columns} rowKey={(s) => s.digest ?? `${s.index}`} label={heading.label} toolbar={false} maxHeight="none" />
    </Panel>
  );
}
