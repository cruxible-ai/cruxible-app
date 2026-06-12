import createClient from "openapi-fetch";
import type { paths, components } from "./generated/schema";

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

export type QueryToolResult = components["schemas"]["QueryToolResult"];

/**
 * The daemon's error envelope ({error_type, message, errors, context}) is not
 * in the OpenAPI spec — observed from live responses, reported as contract
 * friction. Keep in sync until it lands in the contract.
 */
export interface ErrorEnvelope {
  error_type: string;
  message: string;
  errors: string[];
  context: Record<string, unknown>;
  mutation_receipt_id: string | null;
}

export class ApiError extends Error {
  readonly status: number;
  readonly errorType: string;
  readonly envelope: Partial<ErrorEnvelope>;

  constructor(status: number, envelope: Partial<ErrorEnvelope>) {
    super(envelope.message ?? `API error (HTTP ${status})`);
    this.name = "ApiError";
    this.status = status;
    this.errorType = envelope.error_type ?? "UnknownError";
    this.envelope = envelope;
  }
}

export function createApiClient(config: DataSourceConfig) {
  return createClient<paths>({
    baseUrl: config.baseUrl,
    ...(config.token ? { headers: { Authorization: `Bearer ${config.token}` } } : {}),
  });
}

/** Normalize an openapi-fetch result into data-or-throw with the daemon's error envelope. */
export function unwrap<T>(result: {
  data?: T;
  error?: unknown;
  response: Response;
}): T {
  if (result.error !== undefined || result.data === undefined) {
    throw new ApiError(result.response.status, (result.error ?? {}) as Partial<ErrorEnvelope>);
  }
  return result.data;
}
