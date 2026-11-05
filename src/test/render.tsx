import { render, type RenderResult } from "@testing-library/react";
import type { RequestHandler } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { routes } from "@/app/router";
import { AUTHORED, buildHandlers } from "@/fixtures/handlers";
import type { RecordedFixture } from "@/fixtures/fixture";
import { SettingsProvider } from "@/lib/settings";
import { server } from "./msw-server";

export const TEST_BASE = "https://fixtures.example";

/**
 * Render the real app routes at `path`, served by a fixture world: the
 * hand-authored one by default (stable cases: refusals, contested slots,
 * paging), or `RECORDED` for tests that check real daemon responses render.
 * `handlers` answer before the fixtures (a delayed or changing response);
 * `seed` fills the query cache before the first render (data already held).
 */
export function renderApp(
  path: string,
  fixtures: RecordedFixture[] = AUTHORED,
  options: { handlers?: RequestHandler[]; seed?: (client: QueryClient) => void } = {},
): RenderResult {
  server.use(...buildHandlers(TEST_BASE, fixtures));
  if (options.handlers?.length) server.use(...options.handlers);
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  options.seed?.(queryClient);
  return render(
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider client={createApiClient({ baseUrl: TEST_BASE })}>
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </DataSourceProvider>
    </QueryClientProvider>,
  );
}
