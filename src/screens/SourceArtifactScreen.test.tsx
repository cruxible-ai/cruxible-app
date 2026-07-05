import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { server } from "@/test/msw-server";
import { buildHandlers } from "@/fixtures/handlers";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { SourceArtifactScreen } from "./SourceArtifactScreen";

const BASE = "https://cloud.example";

afterEach(cleanup);

function renderAt(path: string) {
  const router = createMemoryRouter(
    [{ path: "/i/:instanceId/sources/:artifactId", element: <SourceArtifactScreen /> }],
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

describe("SourceArtifactScreen", () => {
  it("renders the chunk anchors in document order without duplicating overlapped text", async () => {
    server.use(...buildHandlers(BASE));

    const { container } = renderAt("/i/inst_x/sources/SRC-fixture00001");

    // page header from the artifact label; section chunks render as headings
    expect(
      await screen.findByRole("heading", { name: "Deploy runbook (ops wiki)" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Deploy runbook" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rollback" })).toBeInTheDocument();

    const anchorIds = [...container.querySelectorAll('div[id^="mdchunk_"]')].map((el) => el.id);
    expect(anchorIds).toEqual([
      "mdchunk_5f1e9a2c03b4d876", // h1 section -> heading only
      "mdchunk_9a8b7c6d5e4f3a21", // intro paragraph
      "mdchunk_2b3c4d5e6f708192", // h2 section -> heading only
      "mdchunk_c1d2e3f405a6b789", // list item 1
      "mdchunk_d4e5f60718293a4b", // list item 2
      "mdchunk_e7f8091a2b3c4d5e", // code fence
    ]);

    // The overlapping section chunk contributes no body text, so the intro
    // paragraph appears exactly once in the reconstructed document.
    expect(container.textContent!.match(/Every production deploy goes/g)).toHaveLength(1);
    expect(container.textContent).toContain("Freeze the deploy queue");
    // original_uri is plain text, never a live link
    expect(screen.getByText("https://wiki.example.com/ops/deploy-runbook")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /wiki.example.com/ }),
    ).toBeNull();
  });

  it("scrolls to and highlights the chunk named in the URL hash", async () => {
    server.use(...buildHandlers(BASE));

    renderAt("/i/inst_x/sources/SRC-fixture00001#mdchunk_c1d2e3f405a6b789");

    await screen.findByRole("heading", { name: "Rollback" });
    await waitFor(() => {
      expect(document.getElementById("mdchunk_c1d2e3f405a6b789")!.className).toContain(
        "ring-sky-400/40",
      );
    });
    // only the deep-linked chunk is highlighted
    expect(document.getElementById("mdchunk_d4e5f60718293a4b")!.className).not.toContain(
      "ring-sky-400/40",
    );
  });

  it("shows the honest unavailable state with the reason and pinned manifest", async () => {
    server.use(...buildHandlers(BASE));

    renderAt("/i/inst_x/sources/SRC-fixture00002");

    expect(await screen.findByText("Content unavailable")).toBeInTheDocument();
    expect(
      screen.getByText(/original file no longer present at \/Users\/ops\/notes/),
    ).toBeInTheDocument();
    // no document body is rendered, but the pinned chunk manifest is listed
    expect(screen.queryByText("Document")).toBeNull();
    expect(screen.getByText("mdchunk_aa11bb22cc33dd44")).toBeInTheDocument();
    // two pinned chunks share this heading path
    expect(screen.getAllByText("Incident 2026-06 › Timeline")).toHaveLength(2);
  });
});
