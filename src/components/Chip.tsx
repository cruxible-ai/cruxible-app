import { humanize } from "@/lib/text";

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
// Green = currently alive or a positive verdict; amber = awaiting someone;
// blue = scheduled future; red = needs attention; zinc = cold/inert. Closed
// work is cold, not a success signal.
const VALUE_TONES: Record<string, Tone> = {
  // status
  active: "green",
  in_progress: "green",
  approved: "green",
  accepted: "green",
  resolved: "green",
  answered: "green",
  mitigated: "green",
  done: "zinc",
  closed: "zinc",
  requested: "amber",
  in_review: "amber",
  open: "amber",
  planned: "blue",
  blocked: "red",
  changes_requested: "red",
  watching: "zinc",
  deferred: "zinc",
  superseded: "zinc",
  abandoned: "zinc",
  draft: "zinc",
  withdrawn: "zinc",
  unreviewed: "zinc",
  // priority
  critical: "red",
  high: "amber",
  medium: "zinc",
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

// Attention states share the dot shape but carry their tone in the text too,
// so they pop without breaking the one-chip-shape rule.
const EMPHATIC = new Set(["blocked", "critical", "changes_requested"]);

/** Semantic tone for an enum value (shared by chips and the status bars). */
export function toneFor(value: string): Tone {
  return VALUE_TONES[value] ?? "zinc";
}

/** Solid segment fills for the status meter; cold uses zinc-500 so every
 * segment clears 3:1 on the dark surface (validated). */
export const SEGMENT_FILLS: Record<Tone, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-400",
  blue: "bg-sky-500",
  red: "bg-red-500",
  violet: "bg-violet-400",
  zinc: "bg-zinc-500",
};

export const TONE_ORDER: Tone[] = ["green", "amber", "blue", "red", "violet", "zinc"];

/**
 * Toggle/filter chip buttons (status filters, hide-cold, relationship
 * filters): one active/inactive treatment everywhere.
 */
export function toggleChipClass(active: boolean): string {
  return `rounded border px-1.5 py-px text-[11px] ${
    active
      ? "border-zinc-600 bg-zinc-800 text-zinc-200"
      : "border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
  }`;
}

/** Bordered definition chip for query/workflow structure readouts. */
export const defChipClass =
  "inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-px";

/** Bordered secondary action (header buttons, context-query links). */
export const actionChipClass =
  "rounded border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900";

/** "changes_requested" -> "Changes requested"; tone/emphasis key on the raw value. */
export function Chip({ value, tone }: { value: string; tone?: Tone }) {
  const resolved = tone ?? VALUE_TONES[value] ?? "zinc";
  const textClass = EMPHATIC.has(value) ? "text-red-400" : "text-zinc-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] leading-4 whitespace-nowrap ${textClass}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOTS[resolved]}`} />
      {humanize(value)}
    </span>
  );
}
