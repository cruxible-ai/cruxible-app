import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { useCard } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { QueryPage } from "@/components/ontology/QueryPage";
import { KEV_EXPOSURE_CARD } from "@/fixtures/authored/queries";
import { AUTHORED } from "@/fixtures/handlers";
import { COORDINATE } from "@/fixtures/authored/world";
import { server } from "@/test/msw-server";

vi.mock("@/api/hooks", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/api/hooks")>();
  return {
    ...original,
    useCard: (ref: string | null) => original.useCard(ref?.startsWith("query:") ? ref : null),
    useClaimTypes: () => ({}),
    useSubjectKinds: () => ({}),
    useOrientKinds: () => ({ data: { kinds: [] } }),
    useSourceModel: () => ({}),
  };
});
afterEach(cleanup);

/**
 * Regression from review: a Query's cards cached at G1 and G2; on G1, page 2;
 * moving to cached G2 must start G2 at its first page, never send G1's cursor
 * (the daemon refuses a cursor from another coordinate).
 */
describe("Query results paging across cached generations", () => {
  it("starts again at the first page on another generation", async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const head = AUTHORED.find((f) => f.path.endsWith("/head"))!.response as Schemas["Head"];
    const name = KEV_EXPOSURE_CARD.query;
    for (const [generation, oid] of [
      [1, "a".repeat(40)],
      [2, "b".repeat(40)],
    ] as const) {
      const coordinate = { ...COORDINATE, git_oid: oid };
      client.setQueryData(["head", "inst_fixture", String(generation)], { ...head, coordinate, generation });
      client.setQueryData(["card", "inst_fixture", oid, `query:${name}`], { ref: `query:${name}`, kind: "query", card: KEV_EXPOSURE_CARD, accepted_coordinate: coordinate });
    }
    const bodies: { at: { git_oid: string }; cursor?: string }[] = [];
    server.use(
      http.post("https://fixtures.example/api/v1/inst_fixture/query", async ({ request }) => {
        const body = (await request.json()) as { at: { git_oid: string }; cursor?: string };
        bodies.push(body);
        if (body.at.git_oid === "b".repeat(40) && body.cursor) {
          return HttpResponse.json({ error_type: "ListCursorMismatch", message: "the cursor continues a different coordinate" }, { status: 400 });
        }
        const g = body.at.git_oid === "b".repeat(40) ? "g2" : "g1";
        return HttpResponse.json({
          columns: [{ name: "cve_id", type: "string" }],
          rows: [{ cve_id: body.cursor ? `${g}-second-page` : `${g}-first-page` }],
          remaining: body.cursor ? 0 : 1,
          next_cursor: body.cursor ? null : `CURSOR-FROM-${g}`,
        });
      }),
    );
    function Page() {
      const card = cardOf(useCard(`query:${name}`).data, "query");
      const navigate = useNavigate();
      return (
        <>
          <button onClick={() => navigate("?at=2")}>Cached G2</button>
          {card && <QueryPage card={card} />}
        </>
      );
    }
    render(
      <MemoryRouter initialEntries={["/i/inst_fixture?at=1"]}>
        <QueryClientProvider client={client}>
          <DataSourceProvider config={{ baseUrl: "https://fixtures.example" }}>
            <Routes>
              <Route path="/i/:instanceId" element={<Page />} />
            </Routes>
          </DataSourceProvider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
    await screen.findByText("g1-first-page");
    fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
    await screen.findByText("g1-second-page");
    fireEvent.click(screen.getByRole("button", { name: "Cached G2" }));
    expect(await screen.findByText("g2-first-page")).toBeInTheDocument();
    await waitFor(() => expect(bodies.some((b) => b.at.git_oid === "b".repeat(40))).toBe(true));
    expect(bodies.filter((b) => b.at.git_oid === "b".repeat(40)).every((b) => b.cursor === undefined)).toBe(true);
    expect(screen.queryByText("the cursor continues a different coordinate")).toBeNull();
  });
});
