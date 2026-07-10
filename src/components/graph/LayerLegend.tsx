import { LAYER_META, type KitLayer } from "@/lib/kit-layer";

const LAYERS: KitLayer[] = ["base", "domain"];

/**
 * Kit-layer key for graph canvases, rendered via GraphCanvas's overlay slot
 * when layer coloring is on. Same dot vocabulary as the node accents.
 */
export function LayerLegend() {
  return (
    <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/90 px-2 py-1">
      {LAYERS.map((layer) => (
        <span key={layer} className="flex items-center gap-1.5 text-[10px] text-zinc-400">
          <span className={`h-1.5 w-1.5 rounded-full ${LAYER_META[layer].dot}`} />
          {LAYER_META[layer].label}
        </span>
      ))}
    </div>
  );
}
