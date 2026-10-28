import { useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";
import { useSettings } from "@/lib/settings";

/**
 * Sidebar settings: client-side display preferences only. Anything that
 * changes what data exists (as opposed to what is shown) does not belong
 * here — that is config/governance surface, not a UI toggle.
 */
export function SettingsMenu({ compact = false }: { compact?: boolean }) {
  const { settings, update } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {open && (
        <div className="absolute bottom-8 left-0 w-64 border border-zinc-700 bg-zinc-900 p-3 shadow-lg">
          {/* The dots, in four words each; a dot's hover says what to do. */}
          <ul className="mb-3 grid grid-cols-2 gap-x-3 gap-y-1 border-b border-zinc-800 pb-2 text-[12px] text-zinc-400">
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden /> Waiting
            </li>
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden /> Wrong
            </li>
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden title="Pulses while a run is in progress" /> Armed
            </li>
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full border border-zinc-500" aria-hidden /> Off
            </li>
          </ul>
          <div className="pb-2 text-[12px] font-medium text-zinc-500">
            Display settings
          </div>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={settings.followHead}
              onChange={(e) => update({ followHead: e.target.checked })}
              className="mt-0.5 accent-zinc-400"
            />
            <span>
              <span className="block text-[14px] text-zinc-200">Follow the head</span>
              <span className="block text-[12px] leading-snug text-zinc-500">
                Move every screen to each newly accepted generation. Off: a
                page keeps the generation it opened on and offers the newer one.
              </span>
            </span>
          </label>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        {...(compact ? { title: "Settings", "aria-label": "Settings" } : {})}
        className={`flex w-full items-center gap-2 px-2 py-1 text-[14px] ${compact ? "justify-center" : ""} ${
          open ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
        }`}
      >
        <Settings className="h-3.5 w-3.5" />
        {!compact && "Settings"}
      </button>
    </div>
  );
}
