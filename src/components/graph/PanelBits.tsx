import type { ReactNode } from "react";
import type { Edge } from "@xyflow/react";
import type { GraphPanelApi } from "./GraphCanvas";

/** Kicker + title header for the graph context panel. */
export function PanelHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-2 pr-6">
      <div className="text-[9px] uppercase tracking-wide text-zinc-500">{kicker}</div>
      <div className="text-[13px] font-medium leading-4 text-zinc-100">{title}</div>
    </div>
  );
}

export function PanelSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-3">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
        {title}
      </div>
      {children}
    </div>
  );
}

export function PanelActions({ children }: { children: ReactNode }) {
  return <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>;
}

export const panelActionClass =
  "rounded border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900";

/**
 * The selected node's 1-hop connections, one row per edge: direction glyph,
 * relationship label, and the far node — clicking a row walks the selection
 * to that node.
 */
export function ConnectionList({
  nodeId,
  edges,
  api,
  labelFor,
}: {
  nodeId: string;
  edges: Edge[];
  api: GraphPanelApi;
  labelFor: (nodeId: string) => string;
}) {
  const touching = edges.filter((e) => e.source === nodeId || e.target === nodeId);
  if (touching.length === 0) {
    return <div className="text-[12px] text-zinc-600">No connections in this view.</div>;
  }
  return (
    <div className="space-y-0.5">
      {touching.map((e) => {
        const outgoing = e.source === nodeId;
        const other = outgoing ? e.target : e.source;
        const isSelfLoop = e.source === e.target;
        return (
          <button
            key={e.id}
            onClick={() => api.select(other)}
            className="flex w-full items-baseline gap-1.5 rounded px-1 py-0.5 text-left text-[11px] hover:bg-zinc-900"
          >
            <span className="shrink-0 font-mono text-zinc-600">{outgoing ? "→" : "←"}</span>
            <span className="shrink-0 text-zinc-500">
              {String(e.label ?? e.id).replaceAll("_", " ")}
            </span>
            <span className="truncate text-zinc-300">
              {isSelfLoop ? "(self)" : labelFor(other)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
