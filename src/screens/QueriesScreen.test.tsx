import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { renderApp, TEST_BASE } from "@/test/render";
import { KEV_EXPOSURE, RELEASE_EXPOSURE } from "@/fixtures/authored/queries";

afterEach(cleanup);

const I = "/i/inst_fixture";

describe("Queries", () => {
  it("lists the named Queries with their authored description, params and row Contract, each opening its Query page", async () => {
    renderApp(`${I}/queries`);
    expect(await screen.findByRole("heading", { name: "Queries", level: 1 })).toBeInTheDocument();
    const table = within(await screen.findByRole("table", { name: "Named Queries" }));
    const kev = table.getByRole("link", { name: KEV_EXPOSURE });
    expect(kev).toHaveAttribute("href", `${I}/ref/${encodeURIComponent(`query:${KEV_EXPOSURE}`)}`);
    const kevRow = within(kev.closest("tr")!);
    expect(kevRow.getByText("KEV-listed vulnerabilities and the releases assessed as affected by them.")).toBeInTheDocument();
    // a Query with no params reads a dash; its row Contract links to the Contract
    expect(kevRow.getByText("—")).toBeInTheDocument();
    expect(await kevRow.findByRole("link", { name: "security.kev-exposure@1" })).toHaveAttribute(
      "href",
      `${I}/ref/${encodeURIComponent("Contract:security.kev-exposure@1")}`,
    );
    const releaseRow = within(table.getByRole("link", { name: RELEASE_EXPOSURE }).closest("tr")!);
    expect(releaseRow.getByText("release: subject_reference")).toBeInTheDocument();
    // no row Contract declared
    expect(releaseRow.getAllByText("—")).toHaveLength(1);
    expect(screen.getByText("2 Queries")).toBeInTheDocument();
    // the nav entry is active
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: "Queries" })).toHaveClass("bg-zinc-800");
  });

  it("marks Queries active in the nav on a Query's page", async () => {
    renderApp(`${I}/ref/${encodeURIComponent(`query:${KEV_EXPOSURE}`)}`);
    await screen.findByRole("heading", { name: "Results" });
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: "Queries" })).toHaveClass("bg-zinc-800");
  });

  it("says when the daemon truncated the list, and none when there are none", async () => {
    renderApp(`${I}/queries`, undefined, {
      handlers: [
        http.get(`${TEST_BASE}/api/v1/:instance/orient`, ({ request }) =>
          new URL(request.url).searchParams.get("section") === "queries"
            ? HttpResponse.json({
                tag: "playbill-orient-v1",
                instance: "inst_fixture",
                generation: 42,
                proposed_at: "2026-10-19T09:30:00Z",
                evaluation_time: "2026-10-19T12:00:00Z",
                section: "queries",
                queries: [],
                queries_truncated: true,
              })
            : undefined,
        ),
      ],
    });
    expect(await screen.findByText("List truncated by the daemon")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });
});
