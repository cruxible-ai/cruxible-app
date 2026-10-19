import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./generated/schema";
import type { Schemas } from "./schemas";
import { isReadRoute } from "./requests";

/**
 * The data-source boundary. Everything the UI renders flows through a client
 * created here; rendering components never construct URLs, call fetch, or
 * import fixtures. Local daemon vs Cruxible Cloud is exactly this config.
 */
export interface DataSourceConfig {
  baseUrl: string;
  token?: string | undefined;
}

export type ApiClient = ReturnType<typeof createApiClient>;

/** The daemon's error envelope: every non-2xx playbill response carries it. */
export type ErrorEnvelope = Schemas["ErrorResponse"];

export class ApiError extends Error {
  readonly status: number;
  readonly errorType: string;
  readonly errorCode: string | null;
  readonly envelope: Partial<ErrorEnvelope>;

  constructor(status: number, envelope: Partial<ErrorEnvelope>) {
    super(envelope.message ?? `API error (HTTP ${status})`);
    this.name = "ApiError";
    this.status = status;
    this.errorType = envelope.error_type ?? "UnknownError";
    this.errorCode = envelope.error_code ?? null;
    this.envelope = envelope;
  }
}

/** Thrown before any request leaves the app when a route is not a read. */
export class WriteRouteRefused extends Error {
  constructor(method: string, schemaPath: string) {
    super(`The console is read-only: ${method} ${schemaPath} is not an allowed read route`);
    this.name = "WriteRouteRefused";
  }
}

/**
 * Read-only by construction: every request is checked against the read-route
 * allow-list (src/api/requests.ts) before it is sent. Several playbill reads
 * are POSTs (get, query, next, review), and several POSTs start runs or write,
 * so "GET only" is not the rule; the allow-list is.
 */
const readOnlyGuard: Middleware = {
  onRequest({ request, schemaPath }) {
    if (!isReadRoute(request.method, schemaPath)) {
      throw new WriteRouteRefused(request.method, schemaPath);
    }
    return undefined;
  },
};

export function createApiClient(config: DataSourceConfig) {
  const client = createClient<paths>({
    baseUrl: config.baseUrl,
    ...(config.token ? { headers: { Authorization: `Bearer ${config.token}` } } : {}),
  });
  client.use(readOnlyGuard);
  return client;
}

/** Normalize an openapi-fetch result into data-or-throw with the daemon's error envelope. */
export function unwrap<T>(result: { data?: T; error?: unknown; response: Response }): T {
  if (result.error !== undefined || result.data === undefined) {
    throw new ApiError(result.response.status, (result.error ?? {}) as Partial<ErrorEnvelope>);
  }
  return result.data;
}
