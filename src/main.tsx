import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "./api/DataSourceContext";
import { SettingsProvider } from "./lib/settings";
import { loadConfig } from "./config";
import { router } from "./app/router";
import "@fontsource/merriweather/400.css";
import "./index.css";

const config = loadConfig();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 15_000 },
  },
});

// Dev fixtures mode: serve the miniature fixture instance through an MSW
// worker at the network layer. The app still goes through the same
// data-source boundary; nothing else changes.
if (import.meta.env.DEV && import.meta.env.VITE_CRUXIBLE_FIXTURES === "1") {
  const [{ setupWorker }, { buildHandlers }] = await Promise.all([
    import("msw/browser"),
    import("./fixtures/handlers"),
  ]);
  await setupWorker(...buildHandlers()).start({ onUnhandledRequest: "bypass" });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider config={{ baseUrl: config.apiBaseUrl, token: config.apiToken }}>
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </DataSourceProvider>
    </QueryClientProvider>
  </StrictMode>,
);
