import { useEffect } from "react";
import { X } from "lucide-react";
import { actionChipClass } from "@/components/Chip";

/**
 * The one control for a graph's focus or filter: what it is focused on, and
 * clearing it. A button (keyboard-reachable) at the top of the graph; Esc and
 * a click on the empty canvas clear it too (each screen wires those).
 */
export function FocusChip({ label, onClear, prefix = "Focused on" }: { label: string; onClear: () => void; prefix?: string }) {
  return (
    <button
      type="button"
      onClick={onClear}
      aria-label={`Clear: ${prefix} ${label}`}
      title="Clear (Esc)"
      className={`inline-flex max-w-full items-center gap-1.5 bg-zinc-950/90 ${actionChipClass}`}
    >
      <span className="text-zinc-500">{prefix}</span>
      <span className="truncate font-mono text-zinc-100">{label}</span>
      <X className="h-3 w-3 shrink-0 text-zinc-400" aria-hidden />
    </button>
  );
}

/** Clear a focus or filter on Esc while it is set (text inputs keep their own Esc). */
export function useClearOnEscape(active: boolean, clear: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key !== "Escape" || target?.closest("input, textarea")) return;
      clear();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, clear]);
}
