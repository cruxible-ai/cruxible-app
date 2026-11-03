import { cronWords } from "./procedure-graph.ts";

/**
 * When a Line wakes up, in words and as a time: a Trigger's `fires` text
 * ("when CaptureContract:x from cisa.kev lands", "on cron 40 7 * * * (UTC)")
 * read as "when cisa.kev lands" or "daily at 07:40 UTC" plus, for a UTC
 * schedule, the next time it fires.
 */

export interface Wake {
  /** In the viewer's timezone for a UTC schedule ("daily at 2:15 PM EDT"). */
  words: string;
  /** The schedule as it is defined, in UTC ("daily at 18:15 UTC"); for a title. */
  definedWords: string;
  /** The next fire time, for a schedule this page can compute (UTC cron). */
  next: Date | null;
  landing: boolean;
  /** The logical sources a landing waits on (empty for a schedule or a contract-only landing). */
  sources: string[];
}

const LANDING = /^when CaptureContract:(\S+?)(?: from (.+))? lands$/;
const CRON = /^on cron (.+?)(?: \(([^)]+)\))?$/;

export function wakeOf(fires: string, now: Date = new Date()): Wake {
  const landing = LANDING.exec(fires);
  if (landing) {
    const [, contract, sources] = landing;
    const words = sources ? `when ${sources} lands` : `when a ${contract} Capture lands`;
    return {
      words,
      definedWords: words,
      next: null,
      landing: true,
      sources: sources ? sources.split(/,\s*|\s+or\s+/).filter(Boolean) : [],
    };
  }
  const cron = CRON.exec(fires);
  if (cron) {
    const [, expression, zone] = cron;
    const utc = zone === undefined || zone === "UTC";
    const definedWords = `${cronWords(expression!)}${zone ? ` ${zone}` : utc ? " UTC" : ""}`;
    return {
      words: utc ? localCronWords(expression!, now) : definedWords,
      definedWords,
      next: utc ? nextCronFire(expression!, now) : null,
      landing: false,
      sources: [],
    };
  }
  return { words: fires, definedWords: fires, next: null, landing: false, sources: [] };
}

/**
 * A UTC cron in the viewer's timezone: "daily at 18:15" UTC reads
 * "daily at 2:15 PM EDT" (the local time of its next fire, so it follows
 * daylight saving), a weekly one names the local weekday. Expressions that
 * are not one fixed time a day or week read as cronWords, with "UTC".
 */
export function localCronWords(expression: string, now: Date = new Date()): string {
  const words = cronWords(expression);
  const fixed = /^(daily|every (\w+)) at \d\d:\d\d$/.exec(words);
  const next = fixed ? nextCronFire(expression, now) : null;
  if (!fixed || !next) return /^(hourly|every \d+ minutes)/.test(words) ? words : `${words} UTC`;
  const time = next.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  if (fixed[1] === "daily") return `daily at ${time}`;
  const day = next.toLocaleDateString(undefined, { weekday: "long" });
  return `every ${day} at ${time}`;
}

function field(spec: string, min: number, max: number): Set<number> | null {
  const out = new Set<number>();
  for (const part of spec.split(",")) {
    const m = /^(\*|\d+(?:-\d+)?)(?:\/(\d+))?$/.exec(part);
    if (!m) return null;
    const step = m[2] ? Number(m[2]) : 1;
    if (step < 1) return null;
    let lo = min;
    let hi = max;
    if (m[1] !== "*") {
      const [a, b] = m[1]!.split("-").map(Number) as [number, number | undefined];
      lo = a;
      hi = b ?? (m[2] ? max : a);
    }
    if (lo < min || hi > max || lo > hi) return null;
    for (let v = lo; v <= hi; v += step) out.add(v);
  }
  return out;
}

/**
 * The next minute after `now` that a five-field cron expression matches, in
 * UTC; null for an expression this does not read. Day-of-month and
 * day-of-week combine the cron way: when both are restricted, either matches.
 */
export function nextCronFire(expression: string, now: Date): Date | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [mi, ho, dm, mo, dw] = parts as [string, string, string, string, string];
  const minutes = field(mi, 0, 59);
  const hours = field(ho, 0, 23);
  const doms = field(dm, 1, 31);
  const months = field(mo, 1, 12);
  const dows = field(dw.replace(/\b7\b/g, "0"), 0, 6);
  if (!minutes || !hours || !doms || !months || !dows) return null;
  const domAny = dm === "*";
  const dowAny = dw === "*";
  const t = new Date(now.getTime());
  t.setUTCSeconds(0, 0);
  t.setUTCMinutes(t.getUTCMinutes() + 1);
  // A year of minutes at most; every expression this reads fires within it.
  for (let i = 0; i < 366 * 24 * 60; i += 1) {
    const dayOk =
      domAny && dowAny
        ? true
        : domAny
          ? dows.has(t.getUTCDay())
          : dowAny
            ? doms.has(t.getUTCDate())
            : doms.has(t.getUTCDate()) || dows.has(t.getUTCDay());
    if (!months.has(t.getUTCMonth() + 1) || !dayOk) {
      t.setUTCHours(24, 0, 0, 0);
      continue;
    }
    if (!hours.has(t.getUTCHours())) {
      t.setUTCHours(t.getUTCHours() + 1, 0, 0, 0);
      continue;
    }
    if (minutes.has(t.getUTCMinutes())) return t;
    t.setUTCMinutes(t.getUTCMinutes() + 1);
  }
  return null;
}
