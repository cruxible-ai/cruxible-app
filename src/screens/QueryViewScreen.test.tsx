import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { entityQueryResult } from "@/fixtures/envelopes";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { QueryViewScreen } from "./QueryViewScreen";

const BASE = "https://cloud.example";

function renderAt(path: string) {
  const router = createMemoryRouter(
    [{ path: "/i/:instanceId/views/:queryName", element: <QueryViewScreen /> }],
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

describe("QueryViewScreen", () => {
  it("renders entity items and the receipt reference from the envelope", async () => {
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/queries`, () =>
        HttpResponse.json({ total: 0, limit: 100, offset: 0, truncated: false, items: [] }),
      ),
      http.get(`${BASE}/api/v1/:instanceId/views/:queryName`, () =>
        HttpResponse.json(entityQueryResult()),
      ),
    );

    renderAt("/i/inst_x/views/review_queue");

    expect(await screen.findByText("Fixture work item")).toBeInTheDocument();
    expect(screen.getByText("wi-fixture-1")).toBeInTheDocument();
    expect(screen.getByText("RCP-fixture0001")).toBeInTheDocument();
    expect(screen.getByText("planned")).toBeInTheDocument();
  });

  it("forwards non-reserved URL search params to the view query", async () => {
    let seenParams: URLSearchParams | null = null;
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/queries`, () =>
        HttpResponse.json({ total: 0, limit: 100, offset: 0, truncated: false, items: [] }),
      ),
      http.get(`${BASE}/api/v1/:instanceId/views/:queryName`, ({ request }) => {
        seenParams = new URL(request.url).searchParams;
        return HttpResponse.json(entityQueryResult({ result_shape: "path", items: [] }));
      }),
    );

    renderAt("/i/inst_x/views/work_item_change_context?work_item_id=wi-abc");

    await screen.findByText(/No items/);
    expect(seenParams!.get("work_item_id")).toBe("wi-abc");
    expect(seenParams!.get("limit")).toBe("50");
  });
});
