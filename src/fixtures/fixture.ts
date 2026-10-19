import type { paths } from "@/api/generated/schema";
import type { ErrorEnvelope } from "@/api/data-source";
import type { OkResponse, QueryParams, RequestBody } from "@/api/requests";
import { fixtureKey, normalizeQuery } from "./key";

/**
 * One recorded request and its response. Fixture modules under
 * src/fixtures/recorded/ build these with `defineFixture`, whose generic
 * signature ties the response to the route's declared 200 schema: a recorded
 * or hand-authored response that drifts from the pinned contract fails
 * `pnpm typecheck`.
 */
export interface RecordedFixture {
  key: string;
  method: "GET" | "POST";
  path: string;
  status: number;
  response: unknown;
}

type Method = "get" | "post";
type PathParams = Record<string, string>;

function concretePath(template: string, params: PathParams | undefined): string {
  return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
    if (name === "instance_id") return whole;
    const value = params?.[name];
    if (value === undefined) throw new Error(`fixture for ${template} lacks path param ${name}`);
    return value;
  });
}

export function defineFixture<P extends keyof paths, M extends Method>(spec: {
  method: M;
  path: P;
  pathParams?: PathParams;
  query?: QueryParams<P, M>;
  body?: RequestBody<P, M>;
  response: OkResponse<P, M>;
}): RecordedFixture {
  return build(spec, 200, spec.response);
}

/** A recorded refusal: the daemon's error envelope at a non-2xx status. */
export function defineErrorFixture<P extends keyof paths, M extends Method>(spec: {
  method: M;
  path: P;
  pathParams?: PathParams;
  query?: QueryParams<P, M>;
  body?: RequestBody<P, M>;
  status: number;
  response: ErrorEnvelope;
}): RecordedFixture {
  return build(spec, spec.status, spec.response);
}

function build(
  spec: {
    method: Method;
    path: string;
    pathParams?: PathParams;
    query?: unknown;
    body?: unknown;
  },
  status: number,
  response: unknown,
): RecordedFixture {
  const method = spec.method === "get" ? "GET" : "POST";
  const path = concretePath(spec.path, spec.pathParams);
  const query = normalizeQuery(spec.query as Record<string, unknown> | undefined);
  // Round-trip the body as the client sends it (undefined members dropped).
  const body = spec.body === undefined ? null : (JSON.parse(JSON.stringify(spec.body)) as unknown);
  return { key: fixtureKey(method, path, query, body), method, path, status, response };
}
