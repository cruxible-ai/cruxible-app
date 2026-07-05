import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { buildHandlers } from "@/fixtures/handlers";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { SourcesScreen } from "./SourcesScreen";
import type { SourceArtifactListItem } from "@/api/artifact-types";

const BASE = "https://cloud.example";

afterEach(cleanup);

function renderAt(path: string) {
  const router = createMemoryRouter(
    [{ path: "/i/:instanceId/sources", element: <SourcesScreen /> }],
    { initialEntries: [path] },
  );
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider client={createApiClient({ baseUrl: BASE, token: "t" })}>
        <RouterProvider router={router} />
      </DataSourceProvider>
    </QueryClientProvider>,
  );
}

describe("SourcesScreen", () => {
  it("renders the artifact table from the list endpoint", async () => {
    server.use(...buildHandlers(BASE));

    renderAt("/i/inst_x/sources");

    const link = await screen.findByRole("link", { name: "Deploy runbook (ops wiki)" });
    expect(link).toHaveAttribute("href", "/i/inst_x/sources/SRC-fixture00001");
    expect(screen.getByText("SRC-fixture00001")).toBeInTheDocument();
    expect(screen.getAllByText("markdown")).toHaveLength(3);
    expect(screen.getAllByText("archive")).toHaveLength(2);
    expect(screen.getByText("manifest_only")).toBeInTheDocument();
    // chunk counts, verbatim
    expect(screen.getByText("6")).toBeInTheDocument();
    // 3 fixtures fit on one page: no pagination controls
    expect(screen.queryByRole("button", { name: "next" })).toBeNull();
  });

  it("pages with offset and falls back to the id when label is null", async () => {
    const TOTAL = 120;
    const makeItem = (n: number): SourceArtifactListItem => ({
      source_artifact_id: `SRC-${String(n).padStart(4, "0")}`,
      kind: "markdown",
      retention: "archive",
      original_uri: null,
      label: n === 0 ? null : `Artifact ${n}`,
      content_hash: `sha256:${n}`,
      registered_at: "2026-06-12T00:00:00Z",
      chunk_count: 1,
      byte_count: 10,
    });
    const seenOffsets: number[] = [];
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/source-artifacts`, ({ request }) => {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get("limit") ?? 50);
        const offset = Number(url.searchParams.get("offset") ?? 0);
        seenOffsets.push(offset);
        const items = Array.from(
          { length: Math.max(0, Math.min(limit, TOTAL - offset)) },
          (_, i) => makeItem(offset + i),
        );
        return HttpResponse.json({
          total: TOTAL,
          limit,
          offset,
          truncated: offset + items.length < TOTAL,
          items,
        });
      }),
    );

    renderAt("/i/inst_x/sources");

    // label null -> the row link is the raw id
    expect(await screen.findByRole("link", { name: "SRC-0000" })).toBeInTheDocument();
    expect(screen.getByText("0–50 of 120")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "prev" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "next" })).toBeEnabled();
    cleanup();

    // second page arrives via ?offset=, which is where the next button
    // writes (clicking through setSearchParams inside vitest trips a known
    // msw-interceptors/react-router Request-signal incompatibility, so the
    // paging contract is asserted at the URL level).
    renderAt("/i/inst_x/sources?offset=50");

    expect(await screen.findByRole("link", { name: "Artifact 50" })).toBeInTheDocument();
    expect(screen.getByText("50–100 of 120")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "prev" })).toBeEnabled();
    expect(seenOffsets).toContain(50);
  });
});
