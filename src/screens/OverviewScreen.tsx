import { Link } from "react-router-dom";
import {
  useInstanceId,
  useQueryCatalog,
  useSnapshots,
  useStats,
  useView,
} from "@/api/hooks";
import { SEGMENT_FILLS, TONE_ORDER, toneFor } from "@/components/Chip";
import { Panel, LoadState } from "@/components/Panel";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { useSettings } from "@/lib/settings";
import { queryLayer } from "@/lib/kit-layer";
import { QueryItems } from "@/components/QueryItems";
import { ReceiptBar } from "@/components/ReceiptBar";

const PREVIEW_LIMIT = 5;

/**
 * Orientation point: every parameterless collection query in the instance's
 * catalog rendered as a view card with its top items. Replaces ad hoc CLI
 * sampling for "what's going on right now".
 */
export function OverviewScreen() {
  const instanceId = useInstanceId();
  const stats = useStats();
  const catalog = useQueryCatalog();
  usePageTitle("Overview");

  const catalogViews = (catalog.data?.items ?? []).filter(
    (q) => q.mode === "collection" && (q.required_params ?? []).length === 0,
  );
  const views = [
    ...catalogViews.filter((q) => queryLayer(q) === "domain"),
    ...catalogViews.filter((q) => queryLayer(q) === "base"),
  ];

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Overview</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-zinc-500">
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

      <div className="mb-3 space-y-3">
        <StatusMatrix />
        <SnapshotStrip />
      </div>

      {catalog.isPending && <LoadState />}
      {catalog.error && <LoadState error={catalog.error} />}

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-2">
        {views.map((q) => (
          <div key={q.name} className="min-w-0">
            <ViewCard
              instanceId={instanceId}
              name={q.name ?? ""}
              description={q.description ?? undefined}
              returnsType={q.returns ?? undefined}
            />
          </div>
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
  // Same display preference the sidebar and browse surfaces use — one
  // hide-cold, not a per-screen toggle.
  const { settings } = useSettings();
  const hideCold = settings.hideCold;

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
      meta={hideCold ? <span className="text-zinc-600">Cold hidden by settings</span> : undefined}
    >
      <div className="space-y-2">
        {rows.map(({ type, present, total }) => (
          <div key={type} className="flex items-center gap-3 text-[14px]">
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
            <span className="w-8 shrink-0 text-right font-mono text-[13px] text-zinc-400">
              {total}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-zinc-500">
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active / approved</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Awaiting review</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Planned</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Blocked / changes requested</span>
        {!hideCold && (<span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-zinc-500" /> Cold</span>)}
      </div>
    </Panel>
  );
}

/**
 * The instance's immutable history in one line per snapshot: id, when, and
 * the config/lock digests that pin what produced it. Read-only orientation —
 * snapshot/publish operations stay on the CLI.
 */
function SnapshotStrip() {
  const snapshots = useSnapshots();
  const items = ((snapshots.data as
    | {
        items?: Array<{
          snapshot_id?: string;
          created_at?: string;
          label?: string | null;
          config_digest?: string;
          lock_digest?: string;
        }>;
      }
    | undefined)?.items ?? []);
  const total = (snapshots.data as { total?: number } | undefined)?.total ?? items.length;
  if (items.length === 0) return null;
  const shown = items.slice(0, 3);
  return (
    <Panel title="Snapshots" meta={<span className="font-mono">{total}</span>}>
      <div className="divide-y divide-zinc-800/60">
        {shown.map((s) => (
          <div key={s.snapshot_id} className="flex flex-wrap items-baseline gap-x-3 py-1 text-[13px]">
            <span className="font-mono text-zinc-300">{s.snapshot_id}</span>
            {s.label && <span className="text-zinc-400">{s.label}</span>}
            {s.created_at && (
              <span className="text-zinc-500" title={s.created_at}>
                {formatDateTime(s.created_at)}
              </span>
            )}
            {s.config_digest && (
              <span
                className="ml-auto truncate font-mono text-[11px] text-zinc-600"
                title={`config ${s.config_digest}${s.lock_digest ? ` · lock ${s.lock_digest}` : ""}`}
              >
                {s.config_digest.slice(0, 23)}…
              </span>
            )}
          </div>
        ))}
      </div>
      {total > shown.length && (
        <div className="mt-1 text-[12px] text-zinc-600">{total - shown.length} older</div>
      )}
    </Panel>
  );
}

function ViewCard({
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
      {description && <p className="mb-2 text-[13px] text-zinc-500">{description}</p>}
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
