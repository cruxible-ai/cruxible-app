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

// -- cron: core's grammar and next-instant search, exactly ------------------------------
//
// A port of cruxible_client.contracts.cron (parse_cron, CronSpec.next_after): five
// single-space-separated fields, each `*`, a number, a range `a-b`, a step `*/n` or
// `a-b/n` (a bare `a/n` runs to the field's top), or a comma list of those;
// day-of-week 0-7 with 7 folded to Sunday after expansion. When both day fields are
// restricted (neither starts with `*`) a day matches if either does; otherwise both
// must. Instants are UTC whole minutes, the first strictly after the given moment.
// Anything else is not read: no prediction is shown for it.

interface CronSpec {
  minutes: number[];
  hours: number[];
  days: ReadonlySet<number>;
  months: ReadonlySet<number>;
  weekdays: ReadonlySet<number>;
  daysRestricted: boolean;
  weekdaysRestricted: boolean;
}

/** Core searches four centuries of days before concluding an expression never fires. */
const HORIZON_DAYS = 400 * 366;
/**
 * The zero of every run of ten Unicode decimal digits (category Nd) in the
 * Unicode version core's Python reads (15.1). Core parses numbers with
 * str.isdigit() and int(), which take any decimal digit ("٠", "０", "𝟏"); a
 * character isdigit() accepts that is not a decimal digit (a superscript) makes
 * int() raise, so core refuses the expression, as this does.
 */
const DECIMAL_ZEROS = [
  0x30, 0x660, 0x6f0, 0x7c0, 0x966, 0x9e6, 0xa66, 0xae6, 0xb66, 0xbe6, 0xc66, 0xce6, 0xd66, 0xde6, 0xe50, 0xed0, 0xf20, 0x1040, 0x1090, 0x17e0, 0x1810, 0x1946,
  0x19d0, 0x1a80, 0x1a90, 0x1b50, 0x1bb0, 0x1c40, 0x1c50, 0xa620, 0xa8d0, 0xa900, 0xa9d0, 0xa9f0, 0xaa50, 0xabf0, 0xff10, 0x104a0, 0x10d30, 0x11066, 0x110f0,
  0x11136, 0x111d0, 0x112f0, 0x11450, 0x114d0, 0x11650, 0x116c0, 0x11730, 0x118e0, 0x11950, 0x11c50, 0x11d50, 0x11da0, 0x11f50, 0x16a60, 0x16ac0, 0x16b50,
  0x1d7ce, 0x1d7d8, 0x1d7e2, 0x1d7ec, 0x1d7f6, 0x1e140, 0x1e2f0, 0x1e4f0, 0x1e950, 0x1fbf0,
];

/** A number written in decimal digits of any script, as Python's int() reads it; null when any character is not one. */
function decimalNumber(text: string): number | null {
  if (text === "") return null;
  let value = 0;
  for (const char of text) {
    const code = char.codePointAt(0)!;
    let zero = -1;
    for (const z of DECIMAL_ZEROS) if (z <= code) zero = z;
    if (zero < 0 || code - zero > 9) return null;
    value = value * 10 + (code - zero);
  }
  return value;
}

function cronField(text: string, low: number, high: number): Set<number> | null {
  const values = new Set<number>();
  for (const item of text.split(",")) {
    const slashAt = item.indexOf("/");
    const base = slashAt < 0 ? item : item.slice(0, slashAt);
    const stepText = slashAt < 0 ? null : item.slice(slashAt + 1);
    let step = 1;
    if (stepText !== null) {
      const parsedStep = decimalNumber(stepText);
      if (parsedStep === null || parsedStep === 0) return null;
      step = parsedStep;
    }
    let first: number;
    let last: number;
    if (base === "*") {
      first = low;
      last = high;
    } else {
      const dashAt = base.indexOf("-");
      const firstText = dashAt < 0 ? base : base.slice(0, dashAt);
      const lastText = dashAt < 0 ? null : base.slice(dashAt + 1);
      const parsedFirst = decimalNumber(firstText);
      const parsedLast = lastText === null ? null : decimalNumber(lastText);
      if (parsedFirst === null || (lastText !== null && parsedLast === null)) return null;
      first = parsedFirst;
      last = parsedLast !== null ? parsedLast : stepText !== null ? high : first;
      if (lastText !== null && first > last) return null;
    }
    if (first < low || last > high) return null;
    for (let v = first; v <= last; v += step) values.add(v);
  }
  return values;
}

const dayMatches = (spec: CronSpec, day: Date) => {
  if (!spec.months.has(day.getUTCMonth() + 1)) return false;
  const byDay = spec.days.has(day.getUTCDate());
  const byWeekday = spec.weekdays.has(day.getUTCDay());
  return spec.daysRestricted && spec.weekdaysRestricted ? byDay || byWeekday : byDay && byWeekday;
};

function nextAfter(spec: CronSpec, moment: Date): Date | null {
  const y = moment.getUTCFullYear();
  const m = moment.getUTCMonth();
  const d = moment.getUTCDate();
  for (let offset = 0; offset < HORIZON_DAYS; offset += 1) {
    const day = new Date(Date.UTC(y, m, d + offset));
    if (!dayMatches(spec, day)) continue;
    for (const hour of spec.hours) {
      for (const minute of spec.minutes) {
        const instant = Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), hour, minute);
        if (instant > moment.getTime()) return new Date(instant);
      }
    }
  }
  return null;
}

const parsed = new Map<string, CronSpec | null>();

/** Core's parse_cron: the expression's spec, or null where core refuses it (including one that never fires). */
function parseCron(expression: string): CronSpec | null {
  if (parsed.has(expression)) return parsed.get(expression)!;
  const spec = ((): CronSpec | null => {
    const parts = expression.split(/\s+/).filter(Boolean);
    if (parts.length !== 5 || parts.join(" ") !== expression) return null;
    const [mi, ho, dm, mo, dw] = parts as [string, string, string, string, string];
    const minutes = cronField(mi, 0, 59);
    const hours = cronField(ho, 0, 23);
    const days = cronField(dm, 1, 31);
    const months = cronField(mo, 1, 12);
    const weekdays = cronField(dw, 0, 7);
    if (!minutes || !hours || !days || !months || !weekdays) return null;
    const out: CronSpec = {
      minutes: [...minutes].sort((a, b) => a - b),
      hours: [...hours].sort((a, b) => a - b),
      days,
      months,
      weekdays: new Set([...weekdays].map((v) => v % 7)),
      daysRestricted: !dm.startsWith("*"),
      weekdaysRestricted: !dw.startsWith("*"),
    };
    return nextAfter(out, new Date(Date.UTC(2000, 0, 1))) === null ? null : out;
  })();
  parsed.set(expression, spec);
  return spec;
}

/**
 * The first instant strictly after `now` that a five-field cron expression
 * matches, in UTC, exactly as core computes it (parse_cron(...).next_after);
 * null for an expression core does not accept, so no prediction is shown.
 */
export function nextCronFire(expression: string, now: Date): Date | null {
  const spec = parseCron(expression);
  return spec ? nextAfter(spec, now) : null;
}
