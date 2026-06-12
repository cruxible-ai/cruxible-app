import { Link } from "react-router-dom";
import {
  useInstanceId,
  useInstanceSchema,
  useQueryCatalog,
  useStats,
  useStatusTotals,
  useView,
} from "@/api/hooks";
import { statusEnumValues } from "@/api/schema-info";
import { Chip } from "@/components/Chip";
import { Panel, LoadState } from "@/components/Panel";
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
              <span>
                head snapshot{" "}
                <span className="font-mono">{stats.data.head_snapshot_id ?? "—"}</span>
              </span>
            </>
          )}
        </div>
      </header>

      <div className="mb-3">
        <StatusMatrix />
      </div>

      {catalog.isPending && <LoadState />}
      {catalog.error && <LoadState error={catalog.error} />}

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {queues.map((q) => (
          <QueueCard
            key={q.name}
            instanceId={instanceId}
            name={q.name ?? ""}
            description={q.description ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Schema-driven orientation matrix: one row per entity type that declares a
 * status property, one server-computed total per status value (filtered list
 * queries — no client-side aggregation). Cells link to the filtered browse
 * view. List reads are unreceipted by the daemon today (reported as friction).
 */
function StatusMatrix() {
  const stats = useStats();
  const schema = useInstanceSchema();

  if (!stats.data || !schema.data) return null;
  const rows = Object.keys(stats.data.entity_counts ?? {})
    .map((type) => ({ type, statuses: statusEnumValues(schema.data, type) }))
    .filter((r): r is { type: string; statuses: string[] } => r.statuses !== null);

  return (
    <Panel title="State by status" meta={<span>unreceipted list reads</span>}>
      <div className="space-y-1">
        {rows.map((r) => (
          <StatusMatrixRow key={r.type} entityType={r.type} statuses={r.statuses} />
        ))}
      </div>
    </Panel>
  );
}

function StatusMatrixRow({ entityType, statuses }: { entityType: string; statuses: string[] }) {
  const instanceId = useInstanceId();
  const totals = useStatusTotals(entityType, statuses);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
      <Link
        to={`/i/${instanceId}/browse/${entityType}`}
        className="w-32 shrink-0 text-zinc-300 hover:underline"
      >
        {entityType}
      </Link>
      {totals.map((t, i) => {
        const status = statuses[i]!;
        if (!t.data || t.data.total === 0) return null;
        return (
          <Link
            key={status}
            to={`/i/${instanceId}/browse/${entityType}?status=${encodeURIComponent(status)}`}
            className="inline-flex items-center gap-1 hover:opacity-80"
          >
            <Chip value={status} />
            <span className="font-mono text-[12px] text-zinc-400">{t.data.total}</span>
          </Link>
        );
      })}
    </div>
  );
}

function QueueCard({
  instanceId,
  name,
  description,
}: {
  instanceId: string;
  name: string;
  description?: string | undefined;
}) {
  const view = useView(name, { limit: PREVIEW_LIMIT });
  return (
    <Panel
      title={
        <Link to={`/i/${instanceId}/views/${name}`} className="hover:underline">
          {name.replaceAll("_", " ")}
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
          <QueryItems result={view.data} />
          <ReceiptBar result={view.data} />
        </>
      )}
    </Panel>
  );
}
