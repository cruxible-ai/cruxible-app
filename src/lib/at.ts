import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * The `?at=` URL parameter: which accepted generation every read on the page
 * is pinned to. A generation number (all digits, 11 or fewer, as orient and
 * history rows print it) or a git oid prefix of 12 to 64 lowercase hex. Absent
 * means the current head. The value is resolved to a full coordinate once
 * (GET /head?at=), and every read then carries that coordinate.
 */
export const AT_PARAM = "at";

/**
 * Generations whose projection the daemon retains; pinning an older one
 * rebuilds the whole projection on the daemon (design Q3), so the at-picker
 * warns before it binds, and the console never reads there on its own. Core's
 * retention evicts every piece at or below the head's sequence less this.
 * orient serves the instance's own window (`retention_generations`, `useRetention`);
 * this is core's default, used until orient answers and when it serves none.
 */
export const RETAINED_GENERATIONS = 64;

const GENERATION_RE = /^[0-9]{1,11}$/;
const OID_PREFIX_RE = /^[0-9a-f]{12,64}$/;

export type AtValue =
  | { kind: "generation"; generation: number; raw: string }
  | { kind: "oid"; oid: string; raw: string };

/** Parse an `at` value; null when it is absent or malformed. */
export function parseAt(raw: string | null | undefined): AtValue | null {
  if (raw == null) return null;
  const value = raw.trim();
  if (GENERATION_RE.test(value)) {
    return { kind: "generation", generation: Number(value), raw: value };
  }
  if (OID_PREFIX_RE.test(value)) return { kind: "oid", oid: value, raw: value };
  return null;
}

/** True when `generation` falls outside the retained window below `head` (the newest `window` generations). */
export function isOutsideRetention(generation: number, head: number, window: number = RETAINED_GENERATIONS): boolean {
  return generation <= head - window;
}

/** The page's pinned `at`, normalized; null = head (or a malformed value, ignored). */
export function useAtParam(): string | null {
  const [params] = useSearchParams();
  return parseAt(params.get(AT_PARAM))?.raw ?? null;
}

/** Raw `?at=` as typed, for the picker to flag malformed input. */
export function useRawAtParam(): string | null {
  const [params] = useSearchParams();
  return params.get(AT_PARAM);
}

/** Append the page's `?at=` to an in-app path, so navigation keeps the pin. */
export function withAt(path: string, at: string | null): string {
  if (at === null) return path;
  const [base, query = ""] = path.split("?", 2) as [string, string?];
  const params = new URLSearchParams(query);
  params.set(AT_PARAM, at);
  return `${base}?${params.toString()}`;
}

/** `withAt` bound to the current page's pin. */
export function useAtLink(): (path: string) => string {
  const at = useAtParam();
  return useCallback((path: string) => withAt(path, at), [at]);
}
