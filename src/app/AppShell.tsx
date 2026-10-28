import { useState, type ComponentType } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  CircleAlert,
  GitPullRequest,
  History,
  LayoutDashboard,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Route,
  Scale,
  Search,
  Waypoints,
  Workflow,
} from "lucide-react";
import { useHead, useInstanceId, useOrient, usePin } from "@/api/hooks";
import { JumpPalette } from "@/components/JumpPalette";
import { SettingsMenu } from "@/components/SettingsMenu";
import { useAtLink, useRawAtParam } from "@/lib/at";
import { SignalDot } from "@/components/Chip";
import { term } from "@/lib/vocabulary";
import { AtPicker } from "./AtPicker";

const COLLAPSED_KEY = "cruxible.sidebar.collapsed";

/** Whether the sidebar is folded to its icons, remembered per browser (a convenience: storage may be unavailable). */
function useCollapsed(): [boolean, (value: boolean) => void] {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem(COLLAPSED_KEY) === "1";
    } catch {
      return false;
    }
  });
  const set = (value: boolean) => {
    setCollapsed(value);
    try {
      window.localStorage.setItem(COLLAPSED_KEY, value ? "1" : "0");
    } catch {
      // not remembered; the toggle still works for this visit
    }
  };
  return [collapsed, set];
}

/** A nav count of things waiting on you: an amber dot and the number (the dot alone when folded). */
function WaitingCount({ count, title, compact }: { count: number; title: string; compact: boolean }) {
  if (compact) {
    return (
      <span className="absolute right-1.5 top-1">
        <SignalDot signal="waiting" title={`${count}: ${title}`} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-zinc-300" title={title}>
      <SignalDot signal="waiting" title={title} />
      {count}
    </span>
  );
}

interface Tab {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  end?: boolean;
  waiting?: { count: number; title: string } | null;
}

/**
 * Two-pane inspection console: generation picker and nav on the left,
 * content on the right. The nav folds to its icons (each named on hover).
 * Every link keeps the page's ?at= pin.
 */
export function AppShell() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const head = useHead(null);
  const attention = useOrient().data?.attention;
  const [collapsed, setCollapsed] = useCollapsed();
  const pin = usePin();
  const pinned = useRawAtParam() !== null;
  const generation = pin.head.data?.generation;

  const tabs: Tab[] = [
    { path: "", label: "Overview", icon: LayoutDashboard, end: true },
    { path: "/map", label: "Type map", icon: Network },
    { path: "/flow", label: "Evidence flow", icon: Route },
    { path: "/graph", label: "State graph", icon: Waypoints },
    {
      path: "/next",
      label: "Next",
      icon: CircleAlert,
      waiting: (attention?.next_items ?? 0) > 0 ? { count: attention!.next_items, title: "Items waiting on you: open Next for the repairs" } : null,
    },
    { path: "/beliefs", label: "Beliefs", icon: Scale },
    {
      path: "/proposals",
      label: "Proposals",
      icon: GitPullRequest,
      waiting: (attention?.open_proposals ?? 0) > 0 ? { count: attention!.open_proposals, title: term("proposal", "open").meaning } : null,
    },
    { path: "/lines", label: "Lines", icon: Workflow },
    { path: "/ledger", label: "Ledger", icon: History },
  ];

  const item = (active: boolean) =>
    `relative flex items-center gap-2 py-1 text-[14px] ${collapsed ? "justify-center px-0" : "justify-between px-2"} ${
      active ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
    }`;

  return (
    <div className="flex min-h-screen">
      <aside
        className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-zinc-800 pt-4 transition-[width] duration-150 ${
          collapsed ? "w-14 px-2" : "w-60 px-3"
        }`}
      >
        {collapsed ? (
          <div className="mb-3 flex flex-col items-center gap-2">
            <img src="/favicon.svg" alt="Cruxible" title={`Cruxible · ${head.data?.instance ?? instanceId}`} className="h-[22px] w-[22px]" />
            {/* The generation the console reads; expand the sidebar to change it. */}
            <button
              onClick={() => setCollapsed(false)}
              title={`Reading generation ${generation ?? "…"}${pinned ? " (pinned)" : " · head"}: expand to change`}
              className={`border px-1 font-mono text-[11px] ${pinned ? "border-zinc-500 text-zinc-100" : "border-zinc-800 text-zinc-400"} hover:text-zinc-100`}
            >
              G{generation ?? "…"}
            </button>
          </div>
        ) : (
          <div className="mb-3 px-2">
            <img src="/brand/cruxible-wordmark-white.svg" alt="Cruxible" className="h-[22px] w-auto" />
            <div className="mt-1.5 truncate font-mono text-[12px] text-zinc-500" title={instanceId}>
              {head.data?.instance ?? instanceId}
            </div>
          </div>
        )}

        {!collapsed && <AtPicker />}

        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <NavLink
                key={tab.label}
                to={link(`/i/${instanceId}${tab.path}`)}
                end={tab.end ?? false}
                className={({ isActive }) => item(isActive)}
                {...(collapsed ? { title: tab.label, "aria-label": tab.label } : {})}
              >
                <span className="inline-flex items-center gap-2">
                  <tab.icon className={collapsed ? "h-4 w-4" : "h-3.5 w-3.5"} />
                  {!collapsed && tab.label}
                </span>
                {tab.waiting && <WaitingCount count={tab.waiting.count} title={tab.waiting.title} compact={collapsed} />}
              </NavLink>
            ))}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("cruxible:jump"))}
              className={item(false) + " w-full"}
              {...(collapsed ? { title: "Jump to ref (⌘K)", "aria-label": "Jump to ref" } : {})}
            >
              <span className="inline-flex items-center gap-2">
                <Search className={collapsed ? "h-4 w-4" : "h-3.5 w-3.5"} />
                {!collapsed && "Jump to ref"}
              </span>
              {!collapsed && <kbd className="border border-zinc-800 px-1 text-[10px] text-zinc-600">⌘K</kbd>}
            </button>
          </nav>
        </div>

        <div className={`flex shrink-0 border-t border-zinc-800/60 py-2 ${collapsed ? "flex-col items-stretch gap-1" : "items-center justify-between"}`}>
          <div className={collapsed ? "" : "min-w-0 flex-1"}>
            <SettingsMenu compact={collapsed} />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand the sidebar" : "Collapse the sidebar"}
            aria-label={collapsed ? "Expand the sidebar" : "Collapse the sidebar"}
            className="flex items-center justify-center px-2 py-1 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-5 2xl:px-8">
        <Outlet />
      </main>
      <JumpPalette />
    </div>
  );
}
