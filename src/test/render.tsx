import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { routes } from "@/app/router";
import { buildHandlers } from "@/fixtures/handlers";
import { SettingsProvider } from "@/lib/settings";
import { server } from "./msw-server";

export const TEST_BASE = "https://fixtures.example";

/** Render the real app routes at `path`, served by the recorded fixture world. */
export function renderApp(path: string) {
  server.use(...buildHandlers(TEST_BASE));
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
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
