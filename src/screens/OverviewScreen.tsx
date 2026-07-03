import { Link } from "react-router-dom";
import {
  useInstanceId,
  useQueryCatalog,
  useStats,
  useView,
} from "@/api/hooks";
import { Chip } from "@/components/Chip";
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
 * Orientation matrix straight from the stats aggregate: one row per entity
 * type, one server-computed total per status value — a single request, no
 * per-cell fan-out. Cells link to the filtered browse view.
 */
function StatusMatrix() {
  const stats = useStats();
  const instanceId = useInstanceId();

  if (!stats.data) return null;
  const statusCounts = (stats.data.status_counts ?? {}) as Record<
    string,
    Record<string, number>
  >;
  const rows = Object.entries(statusCounts).filter(([, counts]) =>
    Object.values(counts).some((n) => n > 0),
  );

  return (
    <Panel title="State by status" meta={<span>from stats aggregate</span>}>
      <div className="space-y-1">
        {rows.map(([entityType, counts]) => (
          <div
            key={entityType}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
          >
            <Link
              to={`/i/${instanceId}/browse/${entityType}`}
              className="w-32 shrink-0 text-zinc-300 hover:underline"
            >
              {entityType}
            </Link>
            {Object.entries(counts).map(([status, total]) =>
              total === 0 ? null : (
                <Link
                  key={status}
                  to={`/i/${instanceId}/browse/${entityType}?status=${encodeURIComponent(status)}`}
                  className="inline-flex items-center gap-1 hover:opacity-80"
                >
                  <Chip value={status} />
                  <span className="font-mono text-[12px] text-zinc-400">{total}</span>
                </Link>
              ),
            )}
          </div>
        ))}
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
          <QueryItems result={view.data} linkType={returnsType} />
          <ReceiptBar result={view.data} />
        </>
      )}
    </Panel>
  );
}
