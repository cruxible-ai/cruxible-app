/**
 * Humanize an identifier for display, sentence case: "review_queue" ->
 * "Review queue", "WorkItem" -> "Work item". Display only -- never feed the
 * result back to the API.
 */
export function humanize(identifier: string): string {
  const words = identifier
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Case-insensitive substring match over an item's scalar surface — the shared
 * predicate for the page-level filter boxes. Display-layer only: it narrows
 * what is on screen, never what a receipt covers.
 */
export function matchesText(fields: unknown[], query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some(
    (v) =>
      (typeof v === "string" || typeof v === "number") &&
      String(v).toLowerCase().includes(q),
  );
}

const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

/** True for ISO-8601-looking datetime strings. */
export function looksLikeDateTime(v: unknown): v is string {
  return typeof v === "string" && ISO_RE.test(v);
}

/** "2026-07-02T23:05:00+00:00" -> "Jul 2, 2026 23:05" (viewer's zone). */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Compact form for dense rows: "Oct 19, 17:31" within the current year,
 * otherwise the full date. The full timestamp belongs in the title.
 */
export function formatWhen(iso: string, now: Date = new Date()): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (d.getFullYear() !== now.getFullYear()) return formatDateTime(iso);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
}

/**
 * Distance from now in words: "in 3h 20m", "in 5m", "2h ago", "just now",
 * "in 3d". The exact time belongs in the title.
 */
export function formatRelative(when: string | Date, now: Date = new Date()): string {
  const d = typeof when === "string" ? new Date(when) : when;
  if (Number.isNaN(d.getTime())) return String(when);
  const minutes = Math.round((d.getTime() - now.getTime()) / 60_000);
  const span = Math.abs(minutes);
  if (span < 1) return "just now";
  const days = Math.floor(span / 1440);
  const hours = Math.floor((span % 1440) / 60);
  const mins = span % 60;
  const text = days > 0 ? `${days}d${hours ? ` ${hours}h` : ""}` : hours > 0 ? `${hours}h${mins ? ` ${mins}m` : ""}` : `${mins}m`;
  return minutes > 0 ? `in ${text}` : `${text} ago`;
}

/** A standalone line starts with a capital: "daily at 06:00" -> "Daily at 06:00". */
export function sentence(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
