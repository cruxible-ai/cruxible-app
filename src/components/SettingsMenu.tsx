import { useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";
import { useSettings } from "@/lib/settings";

/**
 * Sidebar settings: client-side display preferences only. Anything that
 * changes what data exists (as opposed to what is shown) does not belong
 * here — that is config/governance surface, not a UI toggle.
 */
export function SettingsMenu() {
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
        <div className="absolute bottom-8 left-0 w-52 rounded border border-zinc-700 bg-zinc-900 p-3 shadow-lg">
          <div className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
            Display settings
          </div>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={settings.hideCold}
              onChange={(e) => update({ hideCold: e.target.checked })}
              className="mt-0.5 accent-zinc-400"
            />
            <span>
              <span className="block text-[14px] text-zinc-200">Hide cold entities</span>
              <span className="block text-[12px] leading-snug text-zinc-500">
                Skip closed/retired items in browse lists and relationship
                panels. Receipted query views are never filtered.
              </span>
            </span>
          </label>
          <label className="mt-2.5 flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={settings.colorByLayer}
              onChange={(e) => update({ colorByLayer: e.target.checked })}
              className="mt-0.5 accent-zinc-400"
            />
            <span>
              <span className="block text-[14px] text-zinc-200">Color by kit layer</span>
              <span className="block text-[12px] leading-snug text-zinc-500">
                Accent graph and type views by which kit layer owns each
                entity type — base kit vs domain overlay. Only shows on
                composed instances.
              </span>
            </span>
          </label>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-2 rounded px-2 py-1 text-[14px] ${
          open ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
        }`}
      >
        <Settings className="h-3.5 w-3.5" />
        Settings
      </button>
    </div>
  );
}
