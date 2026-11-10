import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { KEV_EXPOSURE, RELEASE, RELEASE_EXPOSURE } from "@/fixtures/authored/queries";

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

  it("shows its results a daemon page at a time, in the definition's order, and names the Procedures and Lines that read it", async () => {
    renderApp(page(KEV_EXPOSURE));
    await screen.findByRole("heading", { name: "Results" });
    const results = section("Results");
    expect(await results.findByText("CVE-2024-3094")).toBeInTheDocument();
    expect(results.getByText("Rows 1–2 of 5")).toBeInTheDocument();
    expect(results.getByRole("link", { name: "security.release/acme-2.4.0" })).toBeInTheDocument();
    // no header sorts: they would reorder one page only
    expect(results.queryByRole("button", { name: /Sort by/ })).toBeNull();
    // a path query has no kind table holding its whole answer
    expect(results.queryByRole("link", { name: /Open in the/ })).toBeNull();
    fireEvent.click(results.getByRole("button", { name: /Next page/ }));
    expect(await results.findByText("CVE-2023-4863")).toBeInTheDocument();
    expect(results.getByText("Rows 3–5 of 5")).toBeInTheDocument();
    // an empty value reads as a dash, never "null"
    const row = results.getByText("CVE-2023-44487").closest("tr")!;
    expect(within(row).getByText("—")).toBeInTheDocument();
    expect(within(row).queryByText("null")).toBeNull();
    fireEvent.click(results.getByRole("button", { name: /Previous page/ }));
    expect(await results.findByText("Rows 1–2 of 5")).toBeInTheDocument();
    const usedBy = section("Used by");
    expect(await usedBy.findByRole("link", { name: "security.kev-triage" })).toBeInTheDocument();
    expect(usedBy.getByText("watched")).toBeInTheDocument();
    expect(usedBy.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", expect.stringContaining("/lines/kev-triage"));
  });

  it("asks for a required parameter before showing rows, then shows them with the server cap the daemon reports", async () => {
    renderApp(page(RELEASE_EXPOSURE));
    await screen.findByRole("heading", { name: "Results" });
    const results = section("Results");
    expect(await results.findByTitle("These parameters have no default: give a value to see rows")).toHaveTextContent("needs release");
    expect(results.queryByRole("table")).toBeNull();
    const params = section("Parameters");
    expect(params.getByText("a Subject")).toBeInTheDocument();
    expect(params.getByText(/none · must be given/)).toBeInTheDocument();
    expect(section("Asks").getByText(/the one named by/)).toBeInTheDocument();
    expect(await section("Used by").findByText("None")).toBeInTheDocument();
    // a Subject parameter takes a kind/id
    const input = results.getByLabelText(/release/);
    expect(input).toHaveAttribute("placeholder", "kind/id");
    fireEvent.change(input, { target: { value: RELEASE } });
    fireEvent.click(results.getByRole("button", { name: "Show rows" }));
    expect(await results.findByText("Rows 1–2 of 2+")).toBeInTheDocument();
    expect(results.getByText("max_results=2")).toBeInTheDocument();
    expect(results.getByText(/rows past it are not listed/)).toBeInTheDocument();
    // decimals right-aligned with the same places on every row
    expect(results.getByText("0.500").closest("td")).toHaveClass("text-right");
    expect(results.getByText("0.125")).toBeInTheDocument();
    // the row's Subject leads, linked, with its Claim signal
    expect(results.getAllByRole("link", { name: "acme-2.4.0" })[0]).toHaveAttribute("href", expect.stringContaining("/s/security.release%2Facme-2.4.0"));
    expect(results.getByRole("img", { name: /ontested/ })).toBeInTheDocument();
  });

  it("fills its parameters from the URL and runs", async () => {
    renderApp(`${page(RELEASE_EXPOSURE)}?p.release=${encodeURIComponent(RELEASE)}`);
    await screen.findByRole("heading", { name: "Results" });
    // the value in the URL fills the input and runs
    expect(await section("Results").findByText("Rows 1–2 of 2+")).toBeInTheDocument();
    expect(section("Results").getByLabelText(/release/)).toHaveValue(RELEASE);
  });
});
