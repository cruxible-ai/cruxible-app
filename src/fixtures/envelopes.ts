import type { ErrorEnvelope } from "@/api/data-source";

/** The daemon's error envelope (ErrorResponse), for tests and fixture handlers. */
export function errorEnvelope(
  errorType: string,
  message: string,
  errorCode: string | null = null,
): ErrorEnvelope {
  return { error_type: errorType, message, error_code: errorCode, errors: [], context: {} };
}
