import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { http } from "msw";
import { server } from "@/test/msw-server";
import { renderApp, TEST_BASE } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import { GRAPH_PAGE, orientQuery } from "@/api/requests";
import { COORDINATE, AT, NOW } from "@/fixtures/authored/world";

afterEach(cleanup);

// jsdom has no WebGL: stand in for the cosmos canvas with what it was given.
vi.mock("@/components/graph/CosmosDots", () => ({
  CosmosDots: ({ nodes, edges }: { nodes: unknown[]; edges: unknown[] }) => (
    <div data-testid="dots">
      {nodes.length} dots · {edges.length} lines
    </div>
  ),
}));

/** Counts graph pages requested (registered after the fixture handlers so it runs first). */
function countGraphPages() {
  const pages = { count: 0 };
  server.use(
    http.get(`${TEST_BASE}/api/v1/:instance/orient`, ({ request }) => {
      if (new URL(request.url).searchParams.get("section") === "graph") pages.count += 1;
      return undefined;
    }),
  );
  return pages;
}

describe("State graph", () => {
  it("pages the whole graph and draws every Subject and Subject-valued Claim", async () => {
    renderApp("/i/inst_fixture/graph");
    const pages = countGraphPages();
    expect(await screen.findByTestId("dots")).toHaveTextContent("640 dots · 733 lines");
    // the counts row: each count with its label, then how it was read
    const stats = screen.getByText("Subject-valued Claims").parentElement!;
    expect(stats).toHaveTextContent(/640 Subjects\s*733 Subject-valued Claims\s*read in 3 pages/);
    expect(pages.count).toBe(3);
  });

  it("filters by kind and searches by id", async () => {
    renderApp("/i/inst_fixture/graph");
    await screen.findByTestId("dots");
    fireEvent.click(screen.getByRole("button", { name: /security\.assessment/ }));
    // assessments hidden: their 600 links go with them
    expect(screen.getByTestId("dots")).toHaveTextContent("340 dots · 133 lines");
    fireEvent.change(screen.getByLabelText("Search Subjects by id"), { target: { value: "cve-2026-00" } });
    expect(screen.getByText("100 matches")).toBeInTheDocument();
  });

  it("declines to draw beyond the Subject cap, after one page", async () => {
    const big = defineFixture({
      method: "get",
      path: "/api/v1/{instance_id}/orient",
      query: orientQuery({ coordinate: COORDINATE, section: "graph", limit: GRAPH_PAGE }),
      response: {
        instance: "inst_fixture",
        coordinate: COORDINATE,
        generation: AT.generation,
        accepted_at: "2026-10-19T09:30:00Z",
        evaluation_time: NOW,
        section: "graph",
        graph: { nodes: [], edges: [], totals: { subjects: 12_345 } },
        truncated: true,
        next_cursor: "graph-1",
      },
    });
    renderApp("/i/inst_fixture/graph", [...AUTHORED.filter((f) => f.key !== big.key), big]);
    const pages = countGraphPages();
    expect(await screen.findByText(/holds/)).toHaveTextContent("12,345 live Subjects");
    expect(screen.getByRole("link", { name: "type map" })).toHaveAttribute("href", "/i/inst_fixture/map");
    expect(screen.queryByTestId("dots")).toBeNull();
    expect(pages.count).toBe(1);
  });
});
