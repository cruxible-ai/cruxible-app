import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import { AT, COORDINATE, NOW } from "@/fixtures/authored/world";
import { getBatchBody, getBody, PAIRS_PAGE } from "@/api/requests";
import type { GetResult } from "@/api/schemas";

afterEach(cleanup);

/**
 * An end with more pairs than its card lists: the card's first five, then
 * every pair a page at a time through get detail=pairs with the served
 * cursor, the hidden ones counted (the recorded world's ends hold one each).
 */
const REF = "security.vulnerability/cve-2024-3094";
const PAIR = (n: number) => `security.assessment/rel-${n}-cve-2024-3094`;

function withPairs() {
  const key = defineFixture({ method: "post", path: "/api/v1/{instance_id}/get-batch", body: getBatchBody([REF], COORDINATE), response: {} as never }).key;
  const original = AUTHORED.find((f) => f.key === key)!;
  const response = structuredClone(original.response) as { results: GetResult[] };
  const card = response.results[0]!.card as Record<string, unknown>;
  card.pairs = [{ kind: "security.assessment", part: "vulnerability", pairs: [1, 2, 3, 4, 5].map(PAIR), hidden: 1, more: true }];
  const result = (pairs: number[], cursor: string | null): GetResult => ({
    tag: "playbill-get-result-v1",
    ref: REF,
    kind: "subject",
    detail: "pairs",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    pairs: { kind: "pairs", groups: [{ kind: "security.assessment", part: "vulnerability", pairs: pairs.map(PAIR), hidden: 1, more: cursor !== null }] },
    ...(cursor ? { next_cursor: cursor } : {}),
  });
  return [
    ...AUTHORED.filter((f) => f.key !== key),
    { ...original, response },
    defineFixture({ method: "post", path: "/api/v1/{instance_id}/get", body: getBody({ ref: REF, coordinate: COORDINATE, detail: "pairs", limit: PAIRS_PAGE }), response: result([1, 2, 3, 4, 5, 6], "pairs-1") }),
    defineFixture({ method: "post", path: "/api/v1/{instance_id}/get", body: getBody({ ref: REF, coordinate: COORDINATE, detail: "pairs", limit: PAIRS_PAGE, cursor: "pairs-1" }), response: result([7], null) }),
  ];
}

describe("an end's pairs", () => {
  it("lists the card's first pairs, then pages every pair with the served cursor; hidden pairs are counted", async () => {
    renderApp(`/i/inst_fixture/s/${encodeURIComponent(REF)}`, withPairs());
    const main = within(await screen.findByRole("main"));
    const panel = () => within(main.getByRole("heading", { name: /^Pairs/ }).closest("section")!);
    await main.findByRole("heading", { name: /^Pairs/ });
    expect(panel().getAllByRole("link", { name: /^rel-\d-cve-2024-3094$/ })).toHaveLength(5);
    expect(panel().getByText("1 hidden")).toBeInTheDocument();
    expect(panel().getByText("· 5+")).toBeInTheDocument();
    fireEvent.click(panel().getByRole("button", { name: "List every pair →" }));
    expect(await panel().findByRole("link", { name: "rel-6-cve-2024-3094" })).toBeInTheDocument();
    expect(panel().getByText("Page 1")).toBeInTheDocument();
    fireEvent.click(panel().getByRole("button", { name: "Next →" }));
    expect(await panel().findByRole("link", { name: "rel-7-cve-2024-3094" })).toBeInTheDocument();
    expect(panel().queryByRole("link", { name: "rel-1-cve-2024-3094" })).toBeNull();
    expect(panel().getByText("Page 2")).toBeInTheDocument();
    fireEvent.click(panel().getByRole("button", { name: "← Previous" }));
    expect(await panel().findByRole("link", { name: "rel-1-cve-2024-3094" })).toBeInTheDocument();
  });
});
