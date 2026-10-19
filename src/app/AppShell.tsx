import { Link, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Network } from "lucide-react";
import { useHead, useInstanceId, useOrientKinds } from "@/api/hooks";
import { SettingsMenu } from "@/components/SettingsMenu";
import { useAtLink } from "@/lib/at";
import { useLayerColoring } from "@/lib/kit-layer";
import { AtPicker } from "./AtPicker";

function navClass({ isActive }: { isActive: boolean }) {
  return `block px-2 py-1 text-[14px] ${
    isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
  }`;
}

/**
 * Two-pane inspection console: generation picker and nav on the left
 * (Subject kinds with counts from orient), content on the right. Every link
 * keeps the page's ?at= pin.
 */
export function AppShell() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const head = useHead(null);
  const kinds = useOrientKinds();
  const kindRows = [...(kinds.data?.kinds ?? [])].sort((a, b) => a.kind.localeCompare(b.kind));
  const coloring = useLayerColoring(kindRows.map((k) => k.kind));

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-zinc-800 px-3 pt-4">
        <div className="mb-3 px-2">
          <img src="/brand/cruxible-wordmark-white.svg" alt="Cruxible" className="h-[22px] w-auto" />
          <div className="mt-1.5 truncate font-mono text-[12px] text-zinc-500" title={instanceId}>
            {head.data?.instance ?? instanceId}
          </div>
        </div>

        <AtPicker />

        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <nav className="space-y-0.5">
            <NavLink to={link(`/i/${instanceId}`)} end className={navClass}>
              <span className="inline-flex items-center gap-2">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Overview
              </span>
            </NavLink>
            <NavLink to={link(`/i/${instanceId}/map`)} className={navClass}>
              <span className="inline-flex items-center gap-2">
                <Network className="h-3.5 w-3.5" />
                Type map
              </span>
            </NavLink>
          </nav>

          <div className="mt-4">
            <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Subject kinds
            </div>
            {kinds.error && (
              <div className="px-2 text-[12px] text-red-400/80">{kinds.error.message}</div>
            )}
            <nav className="space-y-0.5">
              {kindRows.map((row) => {
                const owner = coloring.ownerOfKind(row.kind);
                return (
                  <Link
                    key={row.kind}
                    to={link(`/i/${instanceId}/map?kind=${encodeURIComponent(row.kind)}`)}
                    className="flex items-center justify-between gap-2 px-2 py-1 text-[13px] text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      {coloring.enabled && (
                        <span
                          title={owner.source === "kit" ? `kit ${owner.layer}` : `namespace ${owner.layer}`}
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: coloring.colorOf(owner.layer) }}
                        />
                      )}
                      <span className="truncate font-mono text-[12px]" title={row.kind}>
                        {row.kind}
                      </span>
                    </span>
                    <span className="font-mono text-[12px] text-zinc-600">{row.subjects}</span>
                  </Link>
                );
              })}
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
    </div>
  );
}
