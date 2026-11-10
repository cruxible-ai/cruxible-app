/**
 * The console as `cruxible console` serves it: the listener's session and config.
 *
 * `cruxible console` prints a one-time link; opening it stores a session token
 * in this origin's localStorage (scoped to the exact origin, port included, so
 * no other local server can read it) and lands on `/i/<instance>`. The app
 * sends that token in `X-Cruxible-Console-Session` on every request, and asks
 * `GET /__console/config` for the instance and build identity. No cookie is
 * involved: cookies reach every server on 127.0.0.1, whatever its port.
 *
 * Under the Vite dev server there is no listener: `/__console/config` answers
 * the app's own index.html (or nothing), and the app runs exactly as before.
 */

export const SESSION_STORAGE_KEY = "cruxible.console.session";
export const SESSION_HEADER = "X-Cruxible-Console-Session";
export const CONSOLE_CONFIG_PATH = "/__console/config";
export const CONSOLE_CONFIG_TAG = "cruxible-console-config-v1";
/** The listener's refusal when a request lacks this run's session. */
export const SESSION_REQUIRED_CODE = "console.session_required";

/** `GET /__console/config` as the listener answers it. */
export interface ConsoleConfig {
  tag: typeof CONSOLE_CONFIG_TAG;
  instance_id: string;
  api_base_url: string;
  core: { version?: string; sdk_contract_snapshot_digest?: string };
  console: { commit?: string | null; pin?: Record<string, string> | null };
}

export type ServedConsole =
  /** Not served by `cruxible console` (Vite dev server, fixtures, a daemon serving the bundle). */
  | { kind: "dev" }
  /** Served by `cruxible console`, signed in for this run. */
  | { kind: "served"; token: string; config: ConsoleConfig }
  /** Served by `cruxible console`, but this browser holds no session for this run. */
  | { kind: "signed-out" };

type Storage = Pick<globalThis.Storage, "getItem" | "removeItem">;

function isConsoleConfig(value: unknown): value is ConsoleConfig {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    record.tag === CONSOLE_CONFIG_TAG &&
    typeof record.instance_id === "string" &&
    typeof record.api_base_url === "string"
  );
}

function storedToken(storage: Storage): string | null {
  try {
    return storage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return null; // storage blocked
  }
}

/**
 * Forget the rejected session. Only the token that was refused is removed: another
 * tab may already hold a newer one from a later run of the command.
 */
export function forgetSession(rejected: string | null, storage: Storage = window.localStorage): void {
  try {
    if (storage.getItem(SESSION_STORAGE_KEY) === rejected) storage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // storage blocked: nothing stored either
  }
}

/** Ask the listener, if there is one, who this page is for. One request, before the app renders. */
export async function resolveServedConsole(
  fetchImpl: typeof fetch = fetch,
  storage: Storage = window.localStorage,
): Promise<ServedConsole> {
  const token = storedToken(storage);
  let response: Response;
  try {
    response = await fetchImpl(CONSOLE_CONFIG_PATH, {
      headers: token ? { [SESSION_HEADER]: token } : {},
      credentials: "omit",
      cache: "no-store",
    });
  } catch {
    return { kind: "dev" };
  }
  if (response.status === 401) {
    const body: unknown = await response.json().catch(() => null);
    if ((body as { error_code?: unknown } | null)?.error_code === SESSION_REQUIRED_CODE) {
      forgetSession(token, storage);
      return { kind: "signed-out" };
    }
    return { kind: "dev" };
  }
  if (!response.ok || !(response.headers.get("content-type") ?? "").includes("application/json")) {
    return { kind: "dev" };
  }
  const body: unknown = await response.json().catch(() => null);
  if (!token || !isConsoleConfig(body)) return { kind: "dev" };
  return { kind: "served", token, config: body };
}
