/**
 * Muted color-coded chip for config-enforced enum values (status, priority,
 * type, review state). Values come straight from the API; color carries
 * meaning only — unknown values fall back to neutral rather than free-text
 * styling.
 */
const TONES = {
  green: "bg-emerald-950/60 text-emerald-400 border-emerald-900",
  red: "bg-red-950/60 text-red-400 border-red-900",
  amber: "bg-amber-950/60 text-amber-400 border-amber-900",
  blue: "bg-sky-950/60 text-sky-400 border-sky-900",
  violet: "bg-violet-950/60 text-violet-400 border-violet-900",
  zinc: "bg-zinc-900 text-zinc-400 border-zinc-800",
} as const;

type Tone = keyof typeof TONES;

const VALUE_TONES: Record<string, Tone> = {
  // status
  closed: "green",
  done: "green",
  approved: "green",
  accepted: "green",
  resolved: "green",
  answered: "green",
  mitigated: "green",
  active: "amber",
  in_progress: "amber",
  requested: "violet",
  open: "violet",
  planned: "blue",
  blocked: "red",
  changes_requested: "red",
  deferred: "zinc",
  superseded: "zinc",
  abandoned: "zinc",
  draft: "zinc",
  unreviewed: "zinc",
  // priority
  critical: "red",
  high: "amber",
  medium: "blue",
  low: "zinc",
};

export function Chip({ value, tone }: { value: string; tone?: Tone }) {
  const resolved = tone ?? VALUE_TONES[value] ?? "zinc";
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-px text-[11px] leading-4 whitespace-nowrap ${TONES[resolved]}`}
    >
      {value}
    </span>
  );
}
