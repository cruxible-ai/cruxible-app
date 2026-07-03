import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useInstanceId,
  useQueryCatalog,
  useStats,
  useView,
} from "@/api/hooks";
import { SEGMENT_FILLS, TONE_ORDER, toneFor } from "@/components/Chip";
import { EyeOff } from "lucide-react";
import { Panel, LoadState } from "@/components/Panel";
import { humanize } from "@/lib/text";
import { QueryItems } from "@/components/QueryItems";
import { ReceiptBar } from "@/components/ReceiptBar";

const PREVIEW_LIMIT = 5;

/**
 * Orientation point: every parameterless collection query in the instance's
 * catalog rendered as a queue card with its top items. Replaces ad hoc CLI
 * sampling for "what's going on right now".
 */
export function OverviewScreen() {
  const instanceId = useInstanceId();
  const stats = useStats();
  const catalog = useQueryCatalog();

  const queues = (catalog.data?.items ?? []).filter(
    (q) => q.mode === "collection" && (q.required_params ?? []).length === 0,
  );

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Overview</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-zinc-500">
          {stats.data && (
            <>
              <span>{stats.data.entity_count} entities</span>
              <span>{stats.data.edge_count} edges</span>
              {stats.data.head_snapshot_id && (
                <span>
                  head snapshot{" "}
                  <span className="font-mono">{stats.data.head_snapshot_id}</span>
                </span>
              )}
            </>
          )}
        </div>
      </header>

      <div className="mb-3">
        <StatusMatrix />
      </div>

      {catalog.isPending && <LoadState />}
      {catalog.error && <LoadState error={catalog.error} />}

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-2">
        {queues.map((q) => (
          <QueueCard
            key={q.name}
            instanceId={instanceId}
            name={q.name ?? ""}
            description={q.description ?? undefined}
            returnsType={q.returns ?? undefined}
          />
        ))}
      </div>

    </div>
  );
}

/**
 * State by status as one aligned meter per entity type: a segmented bar
 * (proportions at a glance, 2px gaps, per-segment tooltip + click-through)
 * with the total at a fixed right edge. Segments order by semantic phase:
 * alive, awaiting, planned, attention, cold. One legend explains the tones.
 */
function StatusMatrix() {
  const stats = useStats();
  const instanceId = useInstanceId();
  const [hideCold, setHideCold] = useState(
    () => localStorage.getItem("cruxible.hideCold") === "1",
  );

  if (!stats.data) return null;
  const statusCounts = (stats.data.status_counts ?? {}) as Record<
    string,
    Record<string, number>
  >;
  const rows = Object.entries(statusCounts)
    .map(([type, counts]) => {
      const present = Object.entries(counts)
        .filter(([status, n]) => n > 0 && !(hideCold && toneFor(status) === "zinc"))
        .sort(
          (a, b) => TONE_ORDER.indexOf(toneFor(a[0])) - TONE_ORDER.indexOf(toneFor(b[0])),
        );
      return { type, present, total: present.reduce((s, [, n]) => s + n, 0) };
    })
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total);
  const max = rows[0]?.total ?? 1;

  return (
    <Panel
      title="State by status"
      meta={
        <button
          onClick={() =>
            setHideCold((v) => {
              localStorage.setItem("cruxible.hideCold", v ? "0" : "1");
              return !v;
            })
          }
          className={`rounded border px-1.5 py-px text-[11px] ${
            hideCold
              ? "border-zinc-600 bg-zinc-800 text-zinc-200"
              : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <EyeOff className="mr-1 inline h-3 w-3" />
          Hide cold
        </button>
      }
    >
      <div className="space-y-2">
        {rows.map(({ type, present, total }) => (
          <div key={type} className="flex items-center gap-3 text-[13px]">
            <Link
              to={`/i/${instanceId}/browse/${type}`}
              className="w-32 shrink-0 text-zinc-300 hover:underline"
            >
              {humanize(type)}
            </Link>
            <div className="flex-1">
              <div
                className="flex h-2 overflow-hidden rounded-full"
                style={{ width: `${Math.max((total / max) * 100, 3)}%` }}
              >
              {present.map(([status, n]) => (
                <Link
                  key={status}
                  to={`/i/${instanceId}/browse/${type}?status=${encodeURIComponent(status)}`}
                  title={`${humanize(status)} · ${n}`}
                  style={{ flexGrow: n }}
                  className={`${SEGMENT_FILLS[toneFor(status)]} min-w-[6px] border-r-2 border-zinc-950 last:border-r-0 hover:opacity-80`}
                />
              ))}
              </div>
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-[12px] text-zinc-400">
              {total}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> active / approved</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> awaiting review</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> planned</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> blocked / changes requested</span>
        {!hideCold && (<span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-zinc-500" /> cold</span>)}
      </div>
    </Panel>
  );
}

function QueueCard({
  instanceId,
  name,
  description,
  returnsType,
}: {
  instanceId: string;
  name: string;
  description?: string | undefined;
  returnsType?: string | undefined;
}) {
  const view = useView(name, { limit: PREVIEW_LIMIT });
  return (
    <Panel
      title={
        <Link to={`/i/${instanceId}/views/${name}`} className="hover:underline">
          {humanize(name)}
        </Link>
      }
      meta={
        view.data ? (
          <span className="font-mono">{view.data.total}</span>
        ) : undefined
      }
    >
      {description && <p className="mb-2 text-[12px] text-zinc-500">{description}</p>}
      {view.isPending && <LoadState />}
      {view.error && <LoadState error={view.error} />}
      {view.data && (
        <>
          <QueryItems result={view.data} linkType={returnsType} compact />
          <ReceiptBar result={view.data} />
        </>
      )}
    </Panel>
  );
}
