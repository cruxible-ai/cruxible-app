import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCaptureRead, useCard, useGetBatch, useInstanceId } from "@/api/hooks";
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
import { listOutcome } from "@/lib/template";

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
  index: number;
  digest: string | null;
  requestUrl: string | null;
  status: "kept" | "dropped";
  reason: string | null;
}

/**
 * A list member's siblings (D-R37 a): the other members of the fetch that
 * returned it, in the provider's order, each with its request URL and page
 * index. Found through the run that fetched it (its envelope's run, the run
 * card's call summary); members and URLs come from the summary's planned
 * `members`, the digests alone otherwise.
 */
export function ListSiblings({ card }: { card: CaptureCard }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const read = useCaptureRead(card.erased ? null : card.capture);
  const runId = read.data?.envelope?.run_coordinate?.run_kind === "procedure" ? read.data.envelope.run_coordinate.run_id : null;
  const run = cardOf(useCard(runId ? `ProcedureRun:${runId}` : null).data, "procedure_run");
  const found = useMemo(() => {
    for (const node of run?.nodes ?? []) {
      const summary = node.summary;
      if (summary?.kind !== "call") continue;
      const list = listOutcome(summary);
      const digests = summary.capture_digests ?? [];
      if (list && list.members.some((m) => m.capture === card.digest)) {
        return { node: node.node, rows: list.members.map((m): Sibling => ({ index: m.index, digest: m.capture, requestUrl: m.requestUrl, status: m.status, reason: m.reason })) };
      }
      if (digests.length > 1 && digests.includes(card.digest)) {
        return { node: node.node, rows: digests.map((digest, index): Sibling => ({ index, digest, requestUrl: null, status: "kept", reason: null })) };
      }
    }
    return null;
  }, [run, card.digest]);
  const columns = useMemo<Column<Sibling>[]>(
    () => [
      { id: "index", header: "Page", numeric: true, className: "font-mono text-zinc-500", cell: (s) => s.index },
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
      { id: "request", header: "Request URL", className: "break-all font-mono text-[12px] text-zinc-400", cell: (s) => s.requestUrl ?? "—" },
      {
        id: "status",
        header: "Status",
        className: "whitespace-nowrap",
        cell: (s) => <span className={s.status === "dropped" ? "text-red-400/90" : "text-zinc-300"}>{s.status}{s.reason ? ` · ${s.reason}` : ""}</span>,
      },
    ],
    [card.digest],
  );
  if (!found || !runId) return null;
  return (
    <Panel
      title="Fetched with"
      description="The list this Capture is a member of: every member of the same fetch, in the provider's order."
      meta={
        <span className="flex items-baseline gap-2">
          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(runId)}`)} className="font-mono hover:underline" title={`Run ${runId}`}>
            {runId}
          </Link>
          <span className="font-mono">{found.node}</span>
        </span>
      }
    >
      <DataTable rows={found.rows} columns={columns} rowKey={(s) => `${s.index}`} label="List members" toolbar={false} maxHeight="none" />
    </Panel>
  );
}
