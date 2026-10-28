import { changeMark, healthTone, term as termFor, type Concept, type HealthTone, type Signal, type Term } from "@/lib/vocabulary";

/**
 * The status chip: a word, with a dot only for the two signals (amber:
 * waiting on you or someone; red: wrong or blocked). The word and its hover
 * meaning come from the glossary (src/lib/vocabulary.ts); there is no other
 * tone. Pass a concept and its raw value, or a term already looked up.
 */
const DOT: Record<Signal, string> = {
  waiting: "bg-amber-400",
  wrong: "bg-red-500",
};

/** A signal dot on its own (inline notes that are not chips); `title` says what it means and what to do. */
export function SignalDot({ signal, title }: { signal: Signal; title: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      title={title}
      className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${DOT[signal]}`}
    />
  );
}

type ChipProps = { concept: Concept; value: string; term?: never } | { term: Term; concept?: never; value?: never };

export function Chip(props: ChipProps) {
  const resolved = props.term ?? termFor(props.concept, props.value);
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] leading-4 text-zinc-400"
      title={resolved.meaning}
    >
      {resolved.signal && <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[resolved.signal]}`} />}
      {resolved.word}
    </span>
  );
}

const HEALTH_DOT: Record<HealthTone, string> = {
  ...DOT,
  ok: "bg-emerald-400",
  off: "border border-zinc-500",
};

/** A health dot: green working, hollow not observed or not set up, amber or red as everywhere. */
export function HealthDot({ tone, title, pulse = false }: { tone: HealthTone; title: string; pulse?: boolean }) {
  return (
    <span
      role="img"
      aria-label={title}
      title={title}
      className={`inline-block h-1.5 w-1.5 shrink-0 self-center rounded-full ${HEALTH_DOT[tone]} ${pulse ? "motion-safe:animate-pulse" : ""}`}
    />
  );
}

/** A health check's state: its word, with the health dot (see healthTone). */
export function HealthChip({ state }: { state: string }) {
  const resolved = termFor("health", state);
  const tone = healthTone(state);
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] leading-4 text-zinc-300" title={resolved.meaning}>
      {tone && <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${HEALTH_DOT[tone]}`} />}
      {resolved.word}
    </span>
  );
}

/** A change mark (+ create, ~ revise, − retire), its meaning on hover. */
export function ChangeMark({ change, className = "" }: { change: string; className?: string }) {
  const { mark, word } = changeMark(change);
  return (
    <span className={`font-mono text-zinc-400 ${className}`} title={word} aria-label={word} role="img">
      {mark}
    </span>
  );
}

/**
 * Toggle/filter chip buttons (status filters, hide-cold, relationship
 * filters): one active/inactive treatment everywhere.
 */
export function toggleChipClass(active: boolean): string {
  return `border px-1.5 py-px text-[12px] ${
    active
      ? "border-zinc-600 bg-zinc-800 text-zinc-200"
      : "border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
  }`;
}

/** Bordered definition chip for query/workflow structure readouts. */
export const defChipClass =
  "inline-flex items-center gap-1 border border-zinc-800 bg-zinc-900/60 px-1.5 py-px";

/** Bordered secondary action (header buttons, context-query links). */
export const actionChipClass =
  "border border-zinc-800 px-2 py-0.5 text-[12px] text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900";
