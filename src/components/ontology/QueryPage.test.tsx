import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { KEV_EXPOSURE, RELEASE, RELEASE_EXPOSURE, URGENT_EXPOSURES } from "@/fixtures/authored/queries";
import { AUTHORED } from "@/fixtures/handlers";
import type { Schemas } from "@/api/schemas";

afterEach(cleanup);

const page = (name: string) => `/i/inst_fixture/ref/${encodeURIComponent(`QueryDefinition:${name}`)}`;
// a heading may carry its concept ⓘ, whose label joins its accessible name
const section = (title: string) => within(screen.getByRole("heading", { name: new RegExp(`^${title}( i)?$`) }).closest("section")!);
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
    await screen.findByRole("heading", { name: /^Returns/ });
    const returns = section("Returns");
    expect(returns.getByText("1 row / path vulnerability → assessment → release")).toBeInTheDocument();
    expect(returns.getByRole("link", { name: "security.kev-exposure@1" })).toHaveAttribute("href", expect.stringContaining("Contract%3Asecurity.kev-exposure%401"));
    // the result budgets the definition states, with the most a reader may ask
    expect(returns.getByText("Budgets")).toBeInTheDocument();
    expect(returns.getByText("Rows per read").parentElement).toHaveTextContent("Rows per read 200 · up to 2000");
    expect(returns.getByText("Paths per row").parentElement).toHaveTextContent("Paths per row 100 · up to 1000");
    const release = (await returns.findByText("release", { selector: "span.font-mono" })).closest("tr")!;
    expect(within(release).getByText("a Subject")).toBeInTheDocument();
    // what fills it, named directly
    expect(within(release).getByText("release.subject_id")).toBeInTheDocument();
    const status = returns.getByText("status", { selector: "span.font-mono" }).closest("tr")!;
    expect(within(status).getByText(/optional/)).toBeInTheDocument();
    // a Query without parameters has no Parameters card
    expect(screen.queryByRole("heading", { name: /^Parameters/ })).toBeNull();
  });

  it("names pair-hop boxes by their pair kind and reads a nested where clause line by line (security.urgent_exposures as served)", async () => {
    renderApp(page(URGENT_EXPOSURES));
    await screen.findByRole("heading", { name: /^Asks/ });
    const asks = section("Asks");
    // every kind the query binds has its own box, linked to its kind page
    for (const kind of ["vulnerability", "component", "occurrence", "inventory", "exposure", "app_exposure"]) {
      expect(hrefs(asks.getAllByRole("link")).filter((href) => href.endsWith(`/kinds/security.${kind}`))).toHaveLength(1);
    }
    // no box is named by a hop's text ("scope" was the occurrence's `with` fact)
    expect(hrefs(asks.getAllByRole("link")).some((href) => href.endsWith("/kinds/scope"))).toBe(false);
    expect(asks.getByText((_, el) => el?.textContent === "with scope")).toBeInTheDocument();
    expect(asks.getAllByText((_, el) => el?.tagName === "DIV" && el.textContent === "+ vulnerability")).toHaveLength(2);
    // the where clause: one clause per line, nested groups indented
    const where = within(asks.getByRole("list", { name: "Where" }));
    const lines = where.getAllByRole("listitem");
    expect(lines.map((line) => line.textContent)).toEqual([
      "notexposure.justification is one of (vulnerable_code_not_present)",
      "and not",
      "has no app_exposure.justification",
      "andapp_exposure.verdict is affected",
      "and not",
      "has no app_exposure.verdict",
      "orapp_exposure.verdict is not_affected",
      "andapp_exposure.justification is one of (component_not_present, inline_mitigations_already_exist, vulnerable_code_cannot_be_controlled_by_adversary, vulnerable_code_not_in_execute_path)",
    ]);
    expect(lines.map((line) => line.style.paddingLeft)).toEqual(["0rem", "0rem", "1.5rem", "1.5rem", "0rem", "3rem", "3rem", "1.5rem"]);
    expect(asks.getByRole("link", { name: "exposure.justification" })).toHaveAttribute("href", expect.stringContaining("claim-types/security.exposure.justification"));
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
  it("lets the one key column stand for the row's Subject instead of a Subject column that repeats it", async () => {
    // the first page's rows name their Subject (a vulnerability, keyed by cve_id alone)
    const keyed = AUTHORED.map((fixture) => {
      const response = fixture.response as Schemas["QueryResultRecord"];
      if (!fixture.path.endsWith("/query") || response.rows?.[0]?.cve_id !== "CVE-2024-3094") return fixture;
      const rows = response.rows.map((row) => ({ ...row, subject: `security.vulnerability/${String(row.cve_id).toLowerCase()}`, subject_id: String(row.cve_id).toLowerCase() }));
      return { ...fixture, response: { ...response, rows } };
    });
    renderApp(page(KEV_EXPOSURE), keyed);
    await screen.findByRole("heading", { name: "Results" });
    const results = section("Results");
    const cve = await results.findByRole("link", { name: "CVE-2024-3094" });
    expect(cve).toHaveAttribute("href", expect.stringContaining("/s/security.vulnerability%2Fcve-2024-3094"));
    expect(results.queryByRole("columnheader", { name: "Subject" })).toBeNull();
    expect(results.queryByText("cve-2024-3094")).toBeNull();
  });
});
