import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useGetBatch, useInstanceId } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { DataTable, type Column } from "@/components/DataTable";
import { LoadState } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { captureHandle } from "@/lib/next-reasons";
import { contractName } from "@/lib/ontology";
import { formatWhen } from "@/lib/text";
import { shortName } from "@/lib/step-words";

type CaptureCard = Schemas["GetCaptureCard"];

/**
 * An evidence chain, one hop at a time (CD2): "Derived from N Captures",
 * closed until asked; opening it reads that level's Captures (one get-batch,
 * on expand only) and tables each, linked to its Capture page, with its
 * CaptureKind and when observed; a source that is itself derived opens its
 * own sources in its row, one more level per expand. `compact` (a side
 * panel) keeps the source and time on hover.
 */
export function DerivedFrom({ sources, label, compact = false }: { sources: readonly string[]; label?: string; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  if (sources.length === 0) return null;
  const words = derivedWords(sources.length);
  return (
    <div className="text-[12px]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={label ? `${words} (${label})` : words}
        className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
      >
        {open ? <ChevronDown className="h-3.5 w-3.5" aria-hidden /> : <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
        {words}
      </button>
      {open && (
        <div className="ml-1.5 mt-1 border-l border-zinc-800 pl-2.5">
          <DerivedSources sources={sources} depth={1} compact={compact} />
        </div>
      )}
    </div>
  );
}

const derivedWords = (n: number) => `Derived from ${n} ${n === 1 ? "Capture" : "Captures"}`;

interface SourceRow {
  digest: string;
  card: CaptureCard | null;
}

/** One level of the chain: the sources' cards, read once. */
function DerivedSources({ sources, depth, compact }: { sources: readonly string[]; depth: number; compact: boolean }) {
  const reads = useGetBatch(sources.map((digest) => `Capture:${digest}`));
  const rows = useMemo<SourceRow[]>(() => {
    const cards = new Map<string, CaptureCard>();
    for (const result of reads.results) {
      const card = cardOf(result, "capture");
      if (card) cards.set(card.digest, card);
    }
    return sources.map((digest) => ({ digest, card: cards.get(digest) ?? null }));
  }, [reads.results, sources]);
  if (reads.isPending) return <LoadState />;
  if (reads.error) return <LoadState error={reads.error} />;
  return <CaptureRows rows={rows} label="Derived from" depth={depth} compact={compact} />;
}

const sourcesOf = (r: SourceRow) => r.card?.derivation?.sources ?? [];

/**
 * Captures as rows: handle, CaptureKind, source, observed, and what a derived
 * one was derived from (its row opens that level).
 */
export function CaptureRows({ rows, label, depth = 0, compact = false }: { rows: SourceRow[]; label: string; depth?: number; compact?: boolean }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const columns = useMemo<Column<SourceRow>[]>(() => {
    const when = (r: SourceRow) => (r.card?.observed_at ? formatWhen(r.card.observed_at) : null);
    return [
      {
        id: "capture",
        header: "Capture",
        className: "whitespace-nowrap",
        cell: (r) => (
          <span title={compact ? [r.card?.source, r.card?.observed_at].filter(Boolean).join(" · ") || undefined : undefined}>
            <RefLink value={r.card?.capture ?? captureHandle(r.digest)} />
          </span>
        ),
      },
      {
        id: "kind",
        header: "CaptureKind",
        className: "font-mono text-[12px]",
        cell: (r) =>
          r.card ? (
            <Link
              to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(r.card.contract))}`)}
              title={contractName(r.card.contract)}
              className="text-zinc-400 hover:text-zinc-200 hover:underline"
            >
              {compact ? shortName(contractName(r.card.contract)) : contractName(r.card.contract)}
            </Link>
          ) : (
            <span className="text-zinc-600">—</span>
          ),
      },
      ...(compact
        ? []
        : [
            { id: "source", header: "Source", className: "max-w-[14rem] truncate text-zinc-400", cell: (r: SourceRow) => <span title={r.card?.source ?? undefined}>{r.card?.source ?? "—"}</span> },
            {
              id: "observed",
              header: "Observed",
              className: "whitespace-nowrap text-zinc-400",
              cell: (r: SourceRow) => (when(r) ? <span title={r.card!.observed_at!}>{when(r)}</span> : <span className="text-zinc-600">—</span>),
            },
          ]),
      {
        id: "derived",
        header: "Derived from",
        className: "whitespace-nowrap text-zinc-400",
        cell: (r) => (sourcesOf(r).length ? `${sourcesOf(r).length} ${sourcesOf(r).length === 1 ? "Capture" : "Captures"}` : <span className="text-zinc-600">—</span>),
      },
    ];
  }, [instanceId, link, compact]);
  return (
    <DataTable
      rows={rows}
      columns={columns}
      rowKey={(r) => r.digest}
      rowLabel={(r) => `${derivedWords(sourcesOf(r).length)} (${r.card?.capture ?? captureHandle(r.digest)})`}
      canExpand={(r) => sourcesOf(r).length > 0}
      expanded={(r) => <DerivedSources sources={sourcesOf(r)} depth={depth + 1} compact={compact} />}
      urlKey={`derived${depth}`}
      label={label}
      toolbar={false}
      maxHeight="none"
    />
  );
}
