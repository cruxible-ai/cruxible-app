import { GAP_NOTE, type CoreGap } from "@/lib/ontology";

/** A cell whose value waits on a post-v1 core read: a dash, the tooltip names the gap. */
export function Pending({ gap }: { gap: CoreGap }) {
  return (
    <span className="cursor-help text-zinc-700" title={`${gap}: ${GAP_NOTE[gap]}`}>
      —
    </span>
  );
}
