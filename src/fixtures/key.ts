/**
 * Fixture keys: method + concrete path (instance segment normalized) + a
 * digest of the normalized query and body. Shared by the MSW handlers and the
 * recorder (scripts/record-fixtures.ts), so it is a pure module with no
 * imports, loadable by Node directly.
 *
 * Normalization drops `evaluation_time` (the app sends "now"), stringifies
 * query values the way they cross the wire, and sorts object keys, so the
 * same logical request keys the same in the browser, jsdom and Node.
 */

const VOLATILE_KEYS = new Set(["evaluation_time"]);

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      const item = (value as Record<string, unknown>)[key];
      if (item === undefined || VOLATILE_KEYS.has(key)) continue;
      out[key] = canonical(item);
    }
    return out;
  }
  return value;
}

/** Query parameters as strings (or string arrays), as a URL carries them. */
export function normalizeQuery(query: Record<string, unknown> | null | undefined) {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined || value === null) continue;
    out[key] = Array.isArray(value) ? value.map(String) : String(value);
  }
  return out;
}

/** The same normalization, from a request URL's search params. */
export function queryFromSearch(search: URLSearchParams) {
  const out: Record<string, string | string[]> = {};
  for (const key of new Set(search.keys())) {
    const values = search.getAll(key);
    out[key] = values.length === 1 ? values[0]! : values;
  }
  return out;
}

/** FNV-1a over UTF-16 code units: a stable 8-hex digest, not a security hash. */
export function digest8(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

/** Replace the instance segment of /api/v1/<instance>/… with {instance_id}. */
export function normalizePath(pathname: string): string {
  const parts = pathname.split("/").map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  });
  if (parts[1] === "api" && parts[2] === "v1" && parts.length > 4) parts[3] = "{instance_id}";
  return parts.join("/");
}

export function fixtureKey(
  method: string,
  path: string,
  query: Record<string, string | string[]>,
  body: unknown,
): string {
  const payload = JSON.stringify(canonical({ query, body: body ?? null }));
  return `${method.toUpperCase()} ${path} ${digest8(payload)}`;
}
