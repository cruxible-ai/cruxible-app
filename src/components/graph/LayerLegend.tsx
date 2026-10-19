import type { LayerColoring } from "@/lib/kit-layer";

/**
 * Owner-layer key for graph canvases, rendered via GraphCanvas's overlay slot
 * when layer coloring is on. Namespace layers say so: they are a stand-in
 * until the daemon serves the owning kit.
 */
export function LayerLegend({ layers }: { layers: LayerColoring["layers"] }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border border-zinc-800 bg-zinc-950/90 px-2 py-1">
      {layers.map(({ layer, color, source }) => (
        <span key={layer} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {layer}
          {source === "namespace" && <span className="text-zinc-600">namespace</span>}
        </span>
      ))}
    </div>
  );
}
