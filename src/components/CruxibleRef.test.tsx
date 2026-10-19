import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http } from "msw";
import { server } from "@/test/msw-server";
import { DataSourceProvider } from "@/api/DataSourceContext";
import { createApiClient } from "@/api/data-source";
import { buildHandlers } from "@/fixtures/handlers";
import { Prose } from "./Prose";

const BASE = "https://cloud.example";

// RTL auto-cleanup needs vitest globals, which this config doesn't enable;
// without this, chips from earlier tests leak into later role queries.
afterEach(cleanup);

/**
 * Agent-briefings hydration: cruxible:// refs inside markdown prose become
 * live, state-backed chips through one get at the page's coordinate. MSW
 * serves the fixture world at the network layer, so these tests exercise the
 * full path (remark plugin -> chip -> hook -> API).
 */
function renderProse(text: string, initial = "/i/inst_fixture") {
  const router = createMemoryRouter([{ path: "/i/:instanceId", element: <Prose text={text} /> }], {
    initialEntries: [initial],
  });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <DataSourceProvider client={createApiClient({ baseUrl: BASE })}>
        <RouterProvider router={router} />
      </DataSourceProvider>
    </QueryClientProvider>,
  );
}

describe("cruxible:// refs in Prose", () => {
  it("hydrates a bare Subject ref into a linked chip", async () => {
    server.use(...buildHandlers(BASE));
    renderProse("Blocking: cruxible://security.vulnerability/cve-2024-3094 needs a look.");

    const link = await screen.findByRole("link", { name: /cve-2024-3094/ });
    expect(link).toHaveAttribute("href", "/i/inst_fixture/ref/security.vulnerability%2Fcve-2024-3094");
    expect(link).toHaveAttribute("title", expect.stringContaining("backed by state"));
  });

  it("keeps the page's ?at= pin on the chip's link", async () => {
    server.use(...buildHandlers(BASE));
    renderProse("See cruxible://security.vulnerability/cve-2024-3094.", "/i/inst_fixture?at=42");
    const link = await screen.findByRole("link", { name: /cve-2024-3094/ });
    expect(link).toHaveAttribute(
      "href",
      "/i/inst_fixture/ref/security.vulnerability%2Fcve-2024-3094?at=42",
    );
  });

  it("fails the chip with the pin's refusal when ?at= names no accepted generation", async () => {
    server.use(...buildHandlers(BASE));
    renderProse("See cruxible://security.vulnerability/cve-2024-3094.", "/i/inst_fixture?at=7");
    // head?at=7 is unrecorded (404): the chip must settle, not hydrate forever.
    expect(await screen.findByTitle(/no recorded fixture/)).toHaveTextContent("cve-2024-3094");
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders the unresolved chip for a ref state does not know, without breaking the prose", async () => {
    server.use(...buildHandlers(BASE));
    const { container } = renderProse(
      "Gone: cruxible://security.vulnerability/cve-1999-0001. Rest of the sentence survives.",
    );

    const chip = await screen.findByTitle(/not found in accepted state/);
    expect(chip).toHaveTextContent("cve-1999-0001");
    expect(screen.queryByRole("link")).toBeNull();
    expect(container.textContent).toContain("Rest of the sentence survives.");
  });

  it("keeps the author's label in the [label](cruxible://…) form", async () => {
    server.use(...buildHandlers(BASE));
    renderProse("See [the backdoor](cruxible://security.vulnerability/cve-2024-3094) first.");

    const link = await screen.findByRole("link", { name: /the backdoor/ });
    expect(link).toHaveAttribute("href", "/i/inst_fixture/ref/security.vulnerability%2Fcve-2024-3094");
  });

  it("routes ClaimType refs to the type map", async () => {
    server.use(...buildHandlers(BASE));
    renderProse("Rule: cruxible://ClaimType:security.assessment.status.");

    const link = await screen.findByRole("link", { name: /security\.assessment\.status/ });
    expect(link).toHaveAttribute("href", "/i/inst_fixture/map?claim_type=security.assessment.status");
  });

  it("renders unknown ref forms as inert code text and fetches nothing", async () => {
    // No handlers registered: any request would trip onUnhandledRequest:error.
    renderProse("Mystery cruxible://frobnicate:whatever here.");

    const code = await screen.findByText("cruxible://frobnicate:whatever");
    expect(code.tagName).toBe("CODE");
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("issues a single get when the same ref repeats", async () => {
    let gets = 0;
    server.use(
      http.post(`${BASE}/api/v1/:instance/get`, () => {
        gets += 1;
        return undefined; // fall through to the fixture handlers
      }),
      ...buildHandlers(BASE),
    );
    renderProse(
      "First cruxible://security.vulnerability/cve-2024-3094 then [again](cruxible://security.vulnerability/cve-2024-3094).",
    );

    await screen.findByRole("link", { name: /cve-2024-3094/ });
    await screen.findByRole("link", { name: /again/ });
    expect(gets).toBe(1);
  });
});
