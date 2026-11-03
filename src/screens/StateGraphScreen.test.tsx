import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { http } from "msw";
import { server } from "@/test/msw-server";
import { renderApp, TEST_BASE } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import type { ReactNode } from "react";
import { getBatchBody, GRAPH_PAGE, orientQuery } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";
import { COORDINATE, AT, NOW } from "@/fixtures/authored/world";

afterEach(cleanup);

// jsdom has no WebGL: stand in for the cosmos canvas with what it was given,
// and open the side panel for a requested selection (?focus=) as the canvas does.
vi.mock("@/components/graph/CosmosDots", () => ({
  CosmosDots: ({
    nodes,
    edges,
    selectRequest,
    renderPanel,
  }: {
    nodes: unknown[];
    edges: unknown[];
    selectRequest?: { id: string } | null;
    renderPanel: (selection: { kind: "node"; id: string }, api: { select: (id: string) => void }) => ReactNode;
  }) => (
    <>
      <div data-testid="dots">
        {nodes.length} dots · {edges.length} lines
      </div>
      {selectRequest && <aside data-testid="panel">{renderPanel({ kind: "node", id: selectRequest.id }, { select: () => {} })}</aside>}
    </>
  ),
}));

/** One Subject card at the authored coordinate, as the panel reads it. */
function subjectCard(ref: string, claims: Schemas["GetSubjectClaim"][]) {
  const result: GetResult = {
    tag: "playbill-get-result-v1",
    ref,
    kind: "subject",
    detail: "summary",
    coordinate: AT,
    accepted_coordinate: COORDINATE,
    evaluation_time: NOW,
    card: { subject: ref, kind: "security.vulnerability", lifecycle: "live", claims, incoming_count: 0 },
  };
  return defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([ref], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [result] },
  });
}

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

  it("panel shows a many-valued Subject-valued Claim linked and in Links", async () => {
    // cve-2026-0000 related cve-2026-0017 is an edge of the authored graph; the card serves it as the daemon does (a list).
    const held = subjectCard("security.vulnerability/cve-2026-0000", [
      { predicate: "cve_id", claim: "CLM-" + "1".repeat(32), value: "CVE-2026-0000" },
      { predicate: "related", claim: ["CLM-" + "2".repeat(32)], value: ["security.vulnerability/cve-2026-0017"] },
    ]);
    renderApp("/i/inst_fixture/graph?focus=security.vulnerability%2Fcve-2026-0000", [...AUTHORED, held]);
    const panel = await screen.findByTestId("panel");
    const label = await within(panel).findByRole("link", { name: "related" });
    const row = label.closest("div")!.parentElement!;
    const value = within(row).getByRole("link", { name: "cve-2026-0017" });
    expect(value).toHaveAttribute("href", "/i/inst_fixture/s/security.vulnerability%2Fcve-2026-0017");
    expect(value.parentElement).toHaveAttribute("title", "security.vulnerability/cve-2026-0017");
    expect(within(panel).getByRole("button", { name: /security\.vulnerability\.related\s+security\.vulnerability\/cve-2026-0017/ })).toBeInTheDocument();
    expect(within(panel).queryByText("none in this view")).toBeNull();
  });

  it("panel reads an inverse as none of its Subject, not empty", async () => {
    // cve-2026-0001 holds no related Subject; a live none says it does not hold cve-2026-0018.
    const inverse = subjectCard("security.vulnerability/cve-2026-0001", [
      { predicate: "cve_id", claim: "CLM-" + "3".repeat(32), value: "CVE-2026-0001" },
      {
        predicate: "related",
        claim: [],
        value: [],
        nones: [{ claim: "CLM-" + "4".repeat(32), of: "security.vulnerability/cve-2026-0018", verdict: "supported" }],
      },
    ]);
    renderApp("/i/inst_fixture/graph?focus=security.vulnerability%2Fcve-2026-0001", [...AUTHORED, inverse]);
    const panel = await screen.findByTestId("panel");
    const label = await within(panel).findByRole("link", { name: "related" });
    const row = label.closest("div")!.parentElement!;
    expect(row).toHaveTextContent(/related\s*none of\s*cve-2026-0018/);
    expect(within(row).getByRole("link", { name: "cve-2026-0018" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.vulnerability%2Fcve-2026-0018",
    );
    expect(row).not.toHaveTextContent("{");
  });
});
