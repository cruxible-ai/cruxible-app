import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { errorEnvelope } from "@/fixtures/envelopes";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { Prose } from "./Prose";

const BASE = "https://cloud.example";

// RTL auto-cleanup needs vitest globals, which this config doesn't enable;
// without this, chips from earlier tests leak into later role queries.
afterEach(cleanup);

/**
 * Agent-briefings hydration: cruxible:// refs inside markdown prose become
 * live, state-backed chips. MSW intercepts at the network layer, so these
 * tests exercise the full path (remark plugin -> chip -> hook -> API).
 */

function renderProse(text: string) {
  const router = createMemoryRouter(
    [{ path: "/i/:instanceId", element: <Prose text={text} /> }],
    { initialEntries: ["/i/inst_x"] },
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

/** Inspect endpoint knowing exactly one entity, wi-1; optionally counts calls. */
function inspectHandler(counter?: { calls: number }) {
  return http.get(
    `${BASE}/api/v1/:instanceId/inspect/entity/:entityType/:entityId`,
    ({ params }) => {
      if (counter) counter.calls += 1;
      if (params.entityType !== "WorkItem" || params.entityId !== "wi-1") {
        return HttpResponse.json(errorEnvelope("NotFoundError", "no such entity"), {
          status: 404,
        });
      }
      return HttpResponse.json({
        found: true,
        entity_type: "WorkItem",
        entity_id: "wi-1",
        properties: { work_item_id: "wi-1", title: "Fix the flaky gate", status: "active" },
        metadata: {},
        neighbors: [],
        total_neighbors: 0,
      });
    },
  );
}

describe("cruxible:// refs in Prose", () => {
  it("hydrates a bare entity ref into a linked chip showing the state title", async () => {
    server.use(inspectHandler());
    renderProse("Blocking: cruxible://entity/WorkItem/wi-1 needs a decision.");

    const link = await screen.findByRole("link", { name: /Fix the flaky gate/ });
    expect(link).toHaveAttribute("href", "/i/inst_x/e/WorkItem/wi-1");
    // Trust cue: chip declares itself state-backed.
    expect(link).toHaveAttribute("title", expect.stringContaining("backed by state"));
  });

  it("renders the unresolved chip for a 404 entity without breaking the prose flow", async () => {
    server.use(inspectHandler());
    const { container } = renderProse(
      "Gone: cruxible://entity/WorkItem/wi-gone. Rest of the sentence survives.",
    );

    const chip = await screen.findByTitle(/not found in state/);
    expect(chip).toHaveTextContent("wi-gone");
    expect(screen.queryByRole("link")).toBeNull();
    expect(container.textContent).toContain("Rest of the sentence survives.");
  });

  it("keeps the author's label in the [label](cruxible://…) form", async () => {
    server.use(inspectHandler());
    renderProse("See [the blocker](cruxible://entity/WorkItem/wi-1) first.");

    const link = await screen.findByRole("link", { name: /the blocker/ });
    expect(link).toHaveAttribute("href", "/i/inst_x/e/WorkItem/wi-1");
    // Hydration confirmed the entity but the author's label text stays.
    expect(screen.queryByText("Fix the flaky gate")).toBeNull();
  });

  it("renders unknown ref forms as inert code text and fetches nothing", async () => {
    // No handlers registered: any request would trip onUnhandledRequest:error.
    renderProse("Mystery cruxible://frobnicate/whatever here.");

    const code = await screen.findByText("cruxible://frobnicate/whatever");
    expect(code.tagName).toBe("CODE");
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("issues a single request when the same entity ref repeats", async () => {
    const counter = { calls: 0 };
    server.use(inspectHandler(counter));
    renderProse(
      "First cruxible://entity/WorkItem/wi-1 then again [same item](cruxible://entity/WorkItem/wi-1).",
    );

    await screen.findByRole("link", { name: /Fix the flaky gate/ });
    await screen.findByRole("link", { name: /same item/ });
    expect(counter.calls).toBe(1);
  });

  it("links query refs to the view page and receipt refs to the receipt screen", async () => {
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/queries`, () =>
        HttpResponse.json({
          total: 1,
          limit: 100,
          offset: 0,
          truncated: false,
          items: [
            {
              name: "blocked_work_items",
              mode: "collection",
              entry_point: null,
              required_params: [],
              returns: "WorkItem",
              result_shape: "entity",
              dedupe: "entity",
              relationship_state: "live",
              description: "",
              example_ids: [],
            },
          ],
        }),
      ),
    );
    renderProse(
      "Queue: cruxible://query/blocked_work_items, receipted as cruxible://receipt/RCP-1.",
    );

    const queryLink = await screen.findByRole("link", { name: /Blocked work items/ });
    expect(queryLink).toHaveAttribute("href", "/i/inst_x/views/blocked_work_items");
    const receiptLink = screen.getByRole("link", { name: /RCP-1/ });
    expect(receiptLink).toHaveAttribute("href", "/i/inst_x/receipts/RCP-1");
  });

  it("marks a query ref unresolved when the catalog does not know the name", async () => {
    server.use(
      http.get(`${BASE}/api/v1/:instanceId/queries`, () =>
        HttpResponse.json({ total: 0, limit: 100, offset: 0, truncated: false, items: [] }),
      ),
    );
    renderProse("Try cruxible://query/no_such_query for details.");

    const chip = await screen.findByTitle(/not in the catalog/);
    expect(chip).toHaveTextContent("No such query");
    expect(screen.queryByRole("link")).toBeNull();
  });
});
