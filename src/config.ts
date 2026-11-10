/**
 * Runtime app configuration. The same bundle must serve a local daemon
 * (same-origin, no token) and a future Cruxible Cloud instance (remote base
 * URL + bearer token), so everything here is data, not code.
 *
 * Resolution order: `window.__CRUXIBLE_CONFIG__` (injected by whoever serves
 * the bundle; `src/main.tsx` fills it from `cruxible console`'s
 * `/__console/config`) → Vite env vars (development) → same-origin defaults.
 */
export interface AppConfig {
  /** API origin; '' means same-origin (local daemon serving the bundle, or the dev proxy). */
  apiBaseUrl: string;
  /** Optional bearer token; omitted for same-origin local where the proxy/daemon handles auth. */
  apiToken?: string | undefined;
  /** Instance to land on when the URL doesn't name one. */
  defaultInstanceId?: string | undefined;
  /** `cruxible console`'s session token, sent in X-Cruxible-Console-Session (never a cookie). */
  sessionToken?: string | undefined;
}

declare global {
  interface Window {
    __CRUXIBLE_CONFIG__?: Partial<AppConfig>;
  }
}

export function loadConfig(): AppConfig {
  const injected = typeof window !== "undefined" ? (window.__CRUXIBLE_CONFIG__ ?? {}) : {};
  return {
    apiBaseUrl: injected.apiBaseUrl ?? import.meta.env.VITE_CRUXIBLE_API_BASE_URL ?? "",
    apiToken: injected.apiToken ?? import.meta.env.VITE_CRUXIBLE_API_TOKEN ?? undefined,
    defaultInstanceId:
      injected.defaultInstanceId ?? import.meta.env.VITE_CRUXIBLE_INSTANCE_ID ?? undefined,
    sessionToken: injected.sessionToken ?? undefined,
  };
}
