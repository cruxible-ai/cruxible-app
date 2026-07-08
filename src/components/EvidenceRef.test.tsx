import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { EvidenceRef, type EvidenceRefData } from "./EvidenceRef";

const BASE = "https://cloud.example";

afterEach(cleanup);

function renderRef(refData: EvidenceRefData) {
  const router = createMemoryRouter(
    [{ path: "/i/:instanceId", element: <EvidenceRef refData={refData} /> }],
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

describe("EvidenceRef source link", () => {
  it("links into the artifact viewer anchored on the cited chunk", () => {
    renderRef({
      source: "source_artifact",
      artifact_id: "SRC-fixture00001",
      source_record_id: "mdchunk_9a8b7c6d5e4f3a21",
      metadata: { line_start: 3, line_end: 4 },
    });

    const link = screen.getByRole("link", { name: "open in source" });
    expect(link).toHaveAttribute(
      "href",
      "/i/inst_x/sources/SRC-fixture00001#mdchunk_9a8b7c6d5e4f3a21",
    );
  });

  it("renders no source link when the ref carries no source_record_id", () => {
    renderRef({
      source: "source_artifact",
      artifact_id: "SRC-fixture00001",
      metadata: { line_start: 1, line_end: 2 },
    });

    expect(screen.queryByRole("link", { name: "open in source" })).toBeNull();
  });
});
