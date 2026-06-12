import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "./api/DataSourceContext";
import { loadConfig } from "./config";
import { router } from "./app/router";
import "./index.css";

const config = loadConfig();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 15_000 },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider config={{ baseUrl: config.apiBaseUrl, token: config.apiToken }}>
        <RouterProvider router={router} />
      </DataSourceProvider>
    </QueryClientProvider>
  </StrictMode>,
);
