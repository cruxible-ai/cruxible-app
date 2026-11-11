import { ORIENT_PAGE } from "@/api/hooks";
import { orientQuery } from "@/api/requests";
import type { OrientSection } from "@/api/schemas";
import { defineFixture, type RecordedFixture } from "@/fixtures/fixture";
import { AUTHORED } from "@/fixtures/handlers";
import { COORDINATE } from "@/fixtures/authored/world";

/**
 * The authored world with one orient read's first page patched (`section`
 * null: the default orient page): empty lists for a fresh instance's screens.
 * `patch` is the fields to replace, or a function of the authored response.
 */
type Patch = Record<string, unknown> | ((response: Record<string, unknown>) => Record<string, unknown>);

export function withOrient(section: OrientSection | null, patch: Patch, fixtures: RecordedFixture[] = AUTHORED): RecordedFixture[] {
  const query = orientQuery({ coordinate: COORDINATE, limit: ORIENT_PAGE, ...(section ? { section } : {}) });
  const key = defineFixture({ method: "get", path: "/api/v1/{instance_id}/orient", query, response: {} as never }).key;
  const found = fixtures.find((f) => f.key === key);
  if (!found) throw new Error(`no authored orient fixture for section ${section ?? "(default)"}`);
  const response = found.response as Record<string, unknown>;
  return [...fixtures, { ...found, response: { ...response, ...(typeof patch === "function" ? patch(response) : patch) } }];
}
