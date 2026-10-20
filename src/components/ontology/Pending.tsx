import { GAP_IN_FLIGHT, GAP_NOTE, type CoreGap } from "@/lib/ontology";

/**
 * A cell whose value waits on a core read: a marked placeholder for gaps
 * being built now, a plain dash for post-v1 gaps. The tooltip names the gap.
 */
export function Pending({ gap }: { gap: CoreGap }) {
  return GAP_IN_FLIGHT.has(gap) ? (
    <span
      className="cursor-help font-mono text-[11px] text-zinc-600 underline decoration-dotted decoration-zinc-700 underline-offset-2"
      title={`Needs core ${gap}. ${GAP_NOTE[gap]}`}
    >
      {gap}
    </span>
  ) : (
    <span className="cursor-help text-zinc-700" title={`${gap}: ${GAP_NOTE[gap]}`}>
      —
    </span>
  );
}
