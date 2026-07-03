import { NavLink, Outlet } from "react-router-dom";
import { useInstanceId, useInstanceSchema, useQueryCatalog, useStats } from "@/api/hooks";
import { humanize } from "@/lib/text";

function navClass({ isActive }: { isActive: boolean }) {
  return `block rounded px-2 py-1 text-[13px] ${
    isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
  }`;
}

/**
 * Two-pane inspection console: catalog-driven nav on the left (queue views
 * straight from /queries, entity types from /stats), content on the right.
 */
export function AppShell() {
  const instanceId = useInstanceId();
  const catalog = useQueryCatalog();
  const stats = useStats();
  const schema = useInstanceSchema();
  const instanceName =
    typeof (schema.data as { name?: unknown } | undefined)?.name === "string"
      ? humanize((schema.data as { name: string }).name)
      : null;

  const queues = (catalog.data?.items ?? []).filter(
    (q) => q.mode === "collection" && (q.required_params ?? []).length === 0,
  );
  const entityCounts = Object.entries(stats.data?.entity_counts ?? {});

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-zinc-800 px-3 py-4">
        <div className="mb-4 px-2">
          <div className="text-[15px] font-semibold tracking-tight text-zinc-100">cruxible</div>
          {instanceName && (
            <div className="mt-0.5 text-[12px] text-zinc-400">{instanceName}</div>
          )}
        </div>

        <nav className="space-y-0.5">
          <NavLink to={`/i/${instanceId}`} end className={navClass}>
            Overview
          </NavLink>
        </nav>

        <div className="mt-4">
          <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
            Queues
          </div>
          <nav className="space-y-0.5">
            {queues.map((q) => (
              <NavLink key={q.name} to={`/i/${instanceId}/views/${q.name}`} className={navClass}>
                {humanize(q.name ?? "")}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-4">
          <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
            Entities
          </div>
          <nav className="space-y-0.5">
            {entityCounts.map(([type, count]) => (
              <NavLink
                key={type}
                to={`/i/${instanceId}/browse/${type}`}
                className={(s) => `${navClass(s)} flex items-center justify-between`}
              >
                <span>{humanize(type)}</span>
                <span className="font-mono text-[11px] text-zinc-600">{count}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-5">
        <Outlet />
      </main>
    </div>
  );
}
