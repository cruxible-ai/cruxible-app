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

// STOPGAP (approved as such in rr-ui-v1-walking-skeleton-checkpoint): this
// value→tone map hardcodes the project-state kit vocabulary. The structural
// fix — presentation semantics carried by the config's enum definitions — is
// oq-enum-presentation-semantics (owner robert). Unknown values fall back to
// neutral, so other kits render legibly but uncolored.
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

// Dot hues for the quiet default treatment.
const DOTS: Record<Tone, string> = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  amber: "bg-amber-400",
  blue: "bg-sky-500",
  violet: "bg-violet-400",
  zinc: "bg-zinc-600",
};

// States that warrant a filled pill; everything else stays quiet. Color is
// scarce on purpose -- a wall of tinted pills is noise, a single filled chip
// in a row of dots is a signal.
const EMPHATIC = new Set(["blocked", "critical", "changes_requested"]);

export function Chip({ value, tone }: { value: string; tone?: Tone }) {
  const resolved = tone ?? VALUE_TONES[value] ?? "zinc";
  if (EMPHATIC.has(value)) {
    return (
      <span
        className={`inline-flex items-center rounded border px-1.5 py-px text-[11px] leading-4 whitespace-nowrap ${TONES[resolved]}`}
      >
        {value}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] leading-4 whitespace-nowrap text-zinc-400">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOTS[resolved]}`} />
      {value}
    </span>
  );
}
