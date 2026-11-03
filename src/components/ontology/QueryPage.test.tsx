import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { KEV_EXPOSURE, RELEASE_EXPOSURE } from "@/fixtures/authored/queries";

afterEach(cleanup);

const page = (name: string) => `/i/inst_fixture/ref/${encodeURIComponent(`QueryDefinition:${name}`)}`;
const section = (title: string) => within(screen.getByRole("heading", { name: title }).closest("section")!);
const hrefs = (links: HTMLElement[]) => links.map((link) => decodeURIComponent(link.getAttribute("href") ?? ""));

describe("Query page", () => {
  it("leads with the query's name and description, and draws the path it walks with its filters and returns", async () => {
    renderApp(page(KEV_EXPOSURE));
    expect(await screen.findByRole("heading", { name: KEV_EXPOSURE, level: 1 })).toBeInTheDocument();
    expect(screen.getByText("KEV-listed vulnerabilities and the releases assessed as affected by them.")).toBeInTheDocument();
    const asks = section("Asks");
    // one box per kind, each linking to its kind page; the links it follows in words, each ClaimType linked
    expect(hrefs(asks.getAllByRole("link", { name: "vulnerability" }))).toEqual([
      "/i/inst_fixture/kinds/security.vulnerability",
      "/i/inst_fixture/claim-types/security.assessment.vulnerability",
    ]);
    expect(hrefs(asks.getAllByRole("link", { name: "release" }))).toEqual([
      "/i/inst_fixture/claim-types/security.assessment.release",
      "/i/inst_fixture/kinds/security.release",
    ]);
    // each arrow says how it walks on hover: a field followed backwards, or forwards
    expect(asks.getByTitle(/the assessments whose vulnerability it is/)).toBeInTheDocument();
    expect(asks.getByTitle(/From each assessment, its release/)).toBeInTheDocument();
    // filters on their box
    expect(asks.getByText((_, el) => el?.textContent === "where kev_listed is true")).toBeInTheDocument();
    expect(asks.getByText((_, el) => el?.textContent === "where status is affected")).toBeInTheDocument();
    // the raw card is not dumped; the definition stays behind a disclosure
    expect(screen.queryByRole("heading", { name: "Card" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Definition \(raw\)/ }));
    expect(screen.getByText(/"paths_per_result": 100/)).toBeInTheDocument();
  });

  it("lists the row Contract's fields with types in words and what fills each", async () => {
    renderApp(page(KEV_EXPOSURE));
    await screen.findByRole("heading", { name: "Returns" });
    const returns = section("Returns");
    expect(returns.getByText("1 row / path vulnerability → assessment → release")).toBeInTheDocument();
    expect(returns.getByRole("link", { name: "security.kev-exposure" })).toHaveAttribute("href", expect.stringContaining("Contract%3Asecurity.kev-exposure%401"));
    const release = (await returns.findByText("release", { selector: "span.font-mono" })).closest("tr")!;
    expect(within(release).getByText("a Subject")).toBeInTheDocument();
    // what fills it, named directly
    expect(within(release).getByText("release.subject_id")).toBeInTheDocument();
    const status = returns.getByText("status", { selector: "span.font-mono" }).closest("tr")!;
    expect(within(status).getByText(/optional/)).toBeInTheDocument();
    expect(section("Parameters").getByText("None")).toBeInTheDocument();
  });

  it("previews the first rows live with the total, and names the Procedures and Lines that read it", async () => {
    renderApp(page(KEV_EXPOSURE));
    await screen.findByRole("heading", { name: "Preview" });
    const preview = section("Preview");
    expect(await preview.findByText("CVE-2024-3094")).toBeInTheDocument();
    expect(preview.getByText("First 2 of 5")).toBeInTheDocument();
    expect(preview.getByRole("link", { name: "security.release/acme-2.4.0" })).toBeInTheDocument();
    // a path query has no kind table holding its whole answer
    expect(preview.queryByRole("link", { name: /Open all/ })).toBeNull();
    const usedBy = section("Used by");
    expect(await usedBy.findByRole("link", { name: "security.kev-triage" })).toBeInTheDocument();
    expect(usedBy.getByText("watched")).toBeInTheDocument();
    expect(usedBy.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", expect.stringContaining("/lines/kev-triage"));
  });

  it("says a query needs its parameter instead of running it", async () => {
    renderApp(page(RELEASE_EXPOSURE));
    await screen.findByRole("heading", { name: "Preview" });
    const preview = section("Preview");
    expect(await preview.findByTitle("These parameters have no default, so the preview cannot run")).toHaveTextContent("needs release");
    const params = section("Parameters");
    expect(params.getByText("a Subject")).toBeInTheDocument();
    expect(params.getByText(/none · must be given/)).toBeInTheDocument();
    expect(section("Asks").getByText(/the one named by/)).toBeInTheDocument();
    expect(await section("Used by").findByText("None")).toBeInTheDocument();
  });
});
