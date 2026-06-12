import { Link } from "react-router-dom";
import { useInstanceId, useQueryCatalog, useStats, useView } from "@/api/hooks";
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
