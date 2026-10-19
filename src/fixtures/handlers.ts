import { http, HttpResponse } from "msw";
import type { RecordedFixture } from "./fixture";
import { errorEnvelope } from "./envelopes";
import { fixtureKey, normalizePath, queryFromSearch } from "./key";

/**
 * MSW handlers serving a fixture world at the network layer: the app goes through the same data-source boundary,
 * and a request is answered only when a fixture recorded exactly that request
 * (method, path, normalized query and body). Anything else gets the daemon's
 * error envelope with a 404, never a guess.
 */

type FixtureModule = { default: RecordedFixture | RecordedFixture[] };

function flatten(modules: Record<string, FixtureModule>): RecordedFixture[] {
  return Object.values(modules).flatMap((module) =>
    Array.isArray(module.default) ? module.default : [module.default],
  );
}

/** Responses recorded from a real daemon (scripts/record-fixtures.ts). */
export const RECORDED: RecordedFixture[] = flatten(
  import.meta.glob<FixtureModule>("./recorded/*.ts", { eager: true }),
);

/**
 * The hand-authored world: kept for cases the recorded world does not have
 * (refused pins and refs, a contested slot with evidence both ways, paging
 * cursors, withheld fields), at its own coordinate so the two never mix.
 */
export const AUTHORED: RecordedFixture[] = flatten(
  import.meta.glob<FixtureModule>("./authored/*.ts", { eager: true }),
);

/** What fixtures mode serves: the recorded world when there is one. */
export const FIXTURES: RecordedFixture[] = RECORDED.length > 0 ? RECORDED : AUTHORED;

/** The instance id fixtures mode lands on (VITE_CRUXIBLE_INSTANCE_ID in playwright.config.ts). */
export const FIXTURE_INSTANCE_ID = "inst_fixture";

export function buildHandlers(base = "", fixtures: RecordedFixture[] = FIXTURES) {
  const byKey = new Map(fixtures.map((fixture) => [fixture.key, fixture]));
  return [
    http.all(`${base}/api/v1/*`, async ({ request }) => {
      const url = new URL(request.url);
      const text = request.method === "GET" ? "" : await request.text();
      const body = text === "" ? null : (JSON.parse(text) as unknown);
      const key = fixtureKey(
        request.method,
        normalizePath(url.pathname),
        queryFromSearch(url.searchParams),
        body,
      );
      const fixture = byKey.get(key);
      if (!fixture) {
        return HttpResponse.json(
          errorEnvelope("FixtureNotRecorded", `no recorded fixture for ${key}`),
          { status: 404 },
        );
      }
      return HttpResponse.json(fixture.response as never, { status: fixture.status });
    }),
  ];
}
