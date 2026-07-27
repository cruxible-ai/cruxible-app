import { NavLink, Outlet } from "react-router-dom";
import {
  useGroups,
  useInstanceId,
  useInstanceSchema,
  useQueryCatalog,
  useSourceArtifactsProbe,
  useStats,
  useStatusTotals,
} from "@/api/hooks";
import { DECISION_TYPE } from "@/screens/TriageQueueScreen";
import { humanize } from "@/lib/text";
import {
  Activity,
  FileText,
  GitPullRequest,
  History,
  LayoutDashboard,
  Network,
  Search,
  ShieldAlert,
  Waypoints,
  Workflow,
} from "lucide-react";
import { JumpPalette } from "@/components/JumpPalette";
import { SettingsMenu } from "@/components/SettingsMenu";
import { isColdStatus } from "@/lib/cold";
import { LAYER_META, queryLayer, useLayerColoring } from "@/lib/kit-layer";
import { useSettings } from "@/lib/settings";

function navClass({ isActive }: { isActive: boolean }) {
  return `block px-2 py-1 text-[14px] ${
    isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
  }`;
}

/**
 * Two-pane inspection console: catalog-driven nav on the left (named-query views
 * straight from /queries, entity types from /stats), content on the right.
 */
export function AppShell() {
  const instanceId = useInstanceId();
  const catalog = useQueryCatalog();
  const stats = useStats();
  const schema = useInstanceSchema();
  const workflowCount = Object.keys(
    (schema.data as { workflows?: Record<string, unknown> } | undefined)?.workflows ?? {},
  ).length;
  const instanceName =
    typeof (schema.data as { name?: unknown } | undefined)?.name === "string"
      ? humanize((schema.data as { name: string }).name)
      : null;
  // Sources shows only when the daemon serves the route AND artifacts exist
  // (probe returns null on 404 so the UI stays clean against older daemons).
  const sourceCount = useSourceArtifactsProbe().data ?? 0;
  // Groups nav shows once any candidate group exists; the badge counts the
  // ones actually awaiting review.
  const groupTotal = (useGroups(undefined, 1).data as { total?: number } | undefined)?.total ?? 0;
  const pendingGroups =
    (useGroups("pending_review", 1).data as { total?: number } | undefined)?.total ?? 0;
  // Triage nav is kit-aware: it appears only where the instance models triage
  // decisions, and its badge counts the ones still waiting on a reviewer.
  const triageCount = stats.data?.entity_counts?.[DECISION_TYPE] ?? 0;
  const proposedDecisions =
    useStatusTotals(DECISION_TYPE, triageCount > 0 ? ["proposed"] : [])[0]?.data?.total ?? 0;

  const views = (catalog.data?.items ?? []).filter(
    (q) => q.mode === "collection" && (q.required_params ?? []).length === 0,
  );
  const viewGroups = {
    domain: views.filter((q) => queryLayer(q) === "domain"),
    operation: views.filter((q) => queryLayer(q) === "base"),
  };
  const viewsSpanLayers = viewGroups.domain.length > 0 && viewGroups.operation.length > 0;

  // With hide-cold on, sidebar counts show what's actually viewable: the
  // type total minus its cold-status buckets from the stats breakdown.
  const { settings } = useSettings();
  const layerColoring = useLayerColoring();
  const statusCounts = stats.data?.status_counts ?? {};
  const entityCounts = Object.entries(stats.data?.entity_counts ?? {}).map(
    ([type, count]): [string, number] => {
      if (!settings.hideCold) return [type, count];
      const coldTotal = Object.entries(statusCounts[type] ?? {})
        .filter(([status]) => isColdStatus(status))
        .reduce((sum, [, n]) => sum + n, 0);
      return [type, Math.max(0, count - coldTotal)];
    },
  );

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-zinc-800 px-3 pt-4">
        <div className="mb-4 px-2">
          <img src="/brand/cruxible-wordmark-white.svg" alt="Cruxible" className="h-[22px] w-auto" />
          {instanceName && (
            <div className="mt-1.5 text-[13px] text-zinc-400">{instanceName}</div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
        <nav className="space-y-0.5">
          <NavLink to={`/i/${instanceId}`} end className={navClass}>
            <span className="inline-flex items-center gap-2">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Overview
            </span>
          </NavLink>
          <NavLink to={`/i/${instanceId}/map`} className={navClass}>
            <span className="inline-flex items-center gap-2">
              <Network className="h-3.5 w-3.5" />
              Type map
            </span>
          </NavLink>
          <NavLink to={`/i/${instanceId}/graph`} className={navClass}>
            <span className="inline-flex items-center gap-2">
              <Waypoints className="h-3.5 w-3.5" />
              State graph
            </span>
          </NavLink>
          {workflowCount > 0 && (
            <NavLink to={`/i/${instanceId}/workflows`} className={navClass}>
              <span className="inline-flex items-center gap-2">
                <Workflow className="h-3.5 w-3.5" />
                Workflows
              </span>
            </NavLink>
          )}
          {groupTotal > 0 && (
            <NavLink
              to={`/i/${instanceId}/groups`}
              className={(s) => `${navClass(s)} flex items-center justify-between`}
            >
              <span className="inline-flex items-center gap-2">
                <GitPullRequest className="h-3.5 w-3.5" />
                Review groups
              </span>
              {/* Same quiet count treatment as the entity rows; amber is the
                  signal, not a pill. */}
              {pendingGroups > 0 && (
                <span
                  title={`${pendingGroups} awaiting review`}
                  className="font-mono text-[12px] text-amber-400/90"
                >
                  {pendingGroups}
                </span>
              )}
            </NavLink>
          )}
          {/* Triage shows only when the instance actually models triage
              decisions, the same kit-aware gating Sources uses. */}
          {triageCount > 0 && (
            <NavLink
              to={`/i/${instanceId}/triage`}
              className={(s) => `${navClass(s)} flex items-center justify-between`}
            >
              <span className="inline-flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5" />
                Triage queue
              </span>
              {proposedDecisions > 0 && (
                <span
                  title={`${proposedDecisions} awaiting review`}
                  className="font-mono text-[12px] text-amber-400/90"
                >
                  {proposedDecisions}
                </span>
              )}
            </NavLink>
          )}
          <NavLink to={`/i/${instanceId}/live`} className={navClass}>
            <span className="inline-flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" />
              Live activity
            </span>
          </NavLink>
          <NavLink to={`/i/${instanceId}/activity`} className={navClass}>
            <span className="inline-flex items-center gap-2">
              <History className="h-3.5 w-3.5" />
              Activity
            </span>
          </NavLink>
          {sourceCount > 0 && (
            <NavLink to={`/i/${instanceId}/sources`} className={navClass}>
              <span className="inline-flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" />
                Sources
              </span>
            </NavLink>
          )}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("cruxible:jump"))}
            className="flex w-full items-center gap-2 px-2 py-1 text-[14px] text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
          >
            <Search className="h-3.5 w-3.5" />
            Jump to entity
            <kbd className="ml-auto border border-zinc-800 px-1 text-[10px] text-zinc-600">
              ⌘K
            </kbd>
          </button>
        </nav>

        <div className="mt-4">
          <NavLink
            to={`/i/${instanceId}/views`}
            end
            className={(s) =>
              `block px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider ${
                s.isActive ? "text-zinc-300" : "text-zinc-600 hover:text-zinc-400"
              }`
            }
            title="All views, including parameterized"
          >
            Views
          </NavLink>
          {viewsSpanLayers ? (
            <nav className="space-y-2">
              <div>
                <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                  Domain
                </div>
                <div className="space-y-0.5">
                  {viewGroups.domain.map((q) => (
                    <NavLink key={q.name} to={`/i/${instanceId}/views/${q.name}`} className={navClass}>
                      {humanize(q.name ?? "")}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div>
                <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                  Operation
                </div>
                <div className="space-y-0.5">
                  {viewGroups.operation.map((q) => (
                    <NavLink key={q.name} to={`/i/${instanceId}/views/${q.name}`} className={navClass}>
                      {humanize(q.name ?? "")}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
          ) : (
            <nav className="space-y-0.5">
              {views.map((q) => (
                <NavLink key={q.name} to={`/i/${instanceId}/views/${q.name}`} className={navClass}>
                  {humanize(q.name ?? "")}
                </NavLink>
              ))}
            </nav>
          )}
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
                <span className="flex items-center gap-1.5">
                  {layerColoring.enabled && (
                    <span
                      title={LAYER_META[layerColoring.layerFor(type)].label}
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${LAYER_META[layerColoring.layerFor(type)].dot}`}
                    />
                  )}
                  {humanize(type)}
                </span>
                <span className="font-mono text-[12px] text-zinc-600">{count}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        </div>

        <div className="shrink-0 border-t border-zinc-800/60 py-2">
          <SettingsMenu />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-5">
        <Outlet />
      </main>
      <JumpPalette />
    </div>
  );
}
