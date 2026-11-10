import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "./api/DataSourceContext";
import { SettingsProvider } from "./lib/settings";
import { loadConfig } from "./config";
import { router } from "./app/router";
import { SignedOut } from "./app/SignedOut";
import { forgetSession, resolveServedConsole } from "./lib/console-session";
import "@fontsource/merriweather/400.css";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 15_000 },
  },
});

// Startup awaits two things (the dev fixture worker, the served config), so it
// runs in a function: the production target has no top-level await.
async function start() {
  // Dev fixtures mode: serve a fixture world through an MSW worker at the
  // network layer (VITE_CRUXIBLE_FIXTURES=1 the recorded daemon world,
  // =authored the hand-authored one, =template the D-R37 Procedure template
  // world over it). The app still goes through the same data-source boundary;
  // nothing else changes.
  const fixtureWorld = import.meta.env.VITE_CRUXIBLE_FIXTURES;
  if (import.meta.env.DEV && (fixtureWorld === "1" || fixtureWorld === "authored" || fixtureWorld === "template")) {
    const [{ setupWorker }, handlers] = await Promise.all([
      import("msw/browser"),
      import("./fixtures/handlers"),
    ]);
    const world =
      fixtureWorld === "template"
        ? (await import("./fixtures/template")).TEMPLATE_WORLD
        : fixtureWorld === "authored"
          ? handlers.AUTHORED
          : handlers.FIXTURES;
    await setupWorker(...handlers.buildHandlers("", world)).start({ onUnhandledRequest: "bypass" });
  }

  // Served by `cruxible console`: one config read names the instance and the
  // session this browser holds (src/lib/console-session.ts). Anywhere else the
  // read finds no listener and nothing changes.
  const served = await resolveServedConsole();
  if (served.kind === "served") {
    window.__CRUXIBLE_CONFIG__ = {
      ...window.__CRUXIBLE_CONFIG__,
      apiBaseUrl: served.config.api_base_url,
      defaultInstanceId: served.config.instance_id,
      sessionToken: served.token,
    };
  }
  const config = loadConfig();
  const root = createRoot(document.getElementById("root")!);

  function showSignedOut() {
    forgetSession();
    queryClient.clear();
    root.render(
      <StrictMode>
        <SignedOut />
      </StrictMode>,
    );
  }

  if (served.kind === "signed-out") {
    showSignedOut();
  } else {
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <DataSourceProvider
            config={{
              baseUrl: config.apiBaseUrl,
              token: config.apiToken,
              sessionToken: config.sessionToken,
              onSessionRejected: showSignedOut,
            }}
          >
            <SettingsProvider>
              <RouterProvider router={router} />
            </SettingsProvider>
          </DataSourceProvider>
        </QueryClientProvider>
      </StrictMode>,
    );
  }
}

void start();
