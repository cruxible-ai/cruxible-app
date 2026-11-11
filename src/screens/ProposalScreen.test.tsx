import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { BELIEFS, DEFINITIONS, MIXED } from "@/fixtures/authored/proposal-diff";
import { renderApp } from "@/test/render";
import { AUTHORED } from "@/fixtures/handlers";

afterEach(cleanup);

const page = (id: string, query = "") => `/i/inst_fixture/p/${encodeURIComponent(id)}${query}`;
const V1 = "security.vulnerability/cve-2024-0001";
const NEW = "security.vulnerability/cve-2026-0009";

describe("Proposal page: a belief diff", () => {
  it("answers why it is in review from the run's claims egress", async () => {
    renderApp(page(BELIEFS));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("Why in review")).toBeInTheDocument();
    const gap = await main.findByText("epss_score · revise · extracted");
    expect(gap.getAttribute("title")).toMatch(/^security\.vulnerability\.epss_score · outside the grant's basis$/);
    expect(main.getByText("Capped by")).toBeInTheDocument();
    expect(main.getByText("mandate_grant")).toBeInTheDocument();
    expect(main.getByRole("link", { name: "security.kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/security.kev-triage");
    // one change was refused before
    expect(main.getByText("Refused before").nextElementSibling?.textContent).toBe("1");
    expect(main.queryByRole("button", { name: /approve|activate|reject|withdraw/i })).toBeNull();
  });

  it("shows one row per Subject, one column per ClaimType, and counts by change kind", async () => {
    renderApp(page(BELIEFS));
    const main = within(await screen.findByRole("main"));
    const table = within(await main.findByRole("table", { name: "Changes" }));
    // one Subject kind throughout: the kind heads the column and rows name ids (the full ref on hover)
    for (const header of ["security.vulnerability", "cve_id", "epss_score", "kev_listed", "related"]) {
      expect(table.getByRole("columnheader", { name: new RegExp(`^${header}`) })).toBeInTheDocument();
    }
    expect(table.getAllByRole("row").filter((row) => row.closest("tbody"))).toHaveLength(3);
    // a created Subject is marked new beside its name
    const created = table.getByRole("link", { name: "cve-2026-0009" }).closest<HTMLElement>("span.inline-flex")!;
    expect(created.querySelector(`[title="${NEW}"]`)).not.toBeNull();
    expect(within(created).getByText("new")).toBeInTheDocument();
    // revised: old struck -> new; an inverse reads "none of"
    const revised = table.getByRole("button", { name: `${V1} security.vulnerability.kev_listed` });
    expect(revised.textContent).toBe("false→true");
    expect(within(revised).getByText("false").closest(".line-through")).not.toBeNull();
    expect(table.getByText(/^none of/)).toBeInTheDocument();
    const counts = main.getByText("revised").closest("div")!;
    expect(counts.textContent).toBe("+3 new~2 revised−1 retired1 new Subject");
  });

  it("opens a cell's change, evidence, rationale and prior refusals in a side panel", async () => {
    renderApp(page(BELIEFS));
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: `${V1} security.vulnerability.kev_listed` }));
    const panel = within(await main.findByRole("complementary", { name: "Change detail" }));
    expect(panel.getByText("cve-2024-0001 · kev_listed")).toBeInTheDocument();
    expect(panel.getByRole("link", { name: "security.vulnerability.kev_listed" })).toHaveAttribute("href", "/i/inst_fixture/claim-types/security.vulnerability.kev_listed");
    expect(panel.getByText("Revised")).toBeInTheDocument();
    expect(panel.getByText("extracted")).toBeInTheDocument();
    expect(await panel.findByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(panel.getByText("CVE-2024-0001")).toBeInTheDocument();
    expect(panel.getByText("cveID").getAttribute("title")).toBe("/vulnerabilities/0/cveID");
    expect(panel.getByText("CISA KEV catalog 2026.10.19 lists CVE-2024-0001.")).toBeInTheDocument();
    expect(panel.getByText("KEV entry was withdrawn the next day.")).toBeInTheDocument();
    // the raw stored record stays behind a disclosure, never inline
    expect(panel.queryByTitle("/statement/object")).toBeNull();
    fireEvent.click(panel.getByRole("button", { name: "Stored fields" }));
    expect(panel.getAllByTitle("/statement/object").length).toBeGreaterThan(0);
    fireEvent.click(panel.getByRole("button", { name: "Close" }));
    expect(main.queryByRole("complementary", { name: "Change detail" })).toBeNull();
  });

  it("groups by Capture: one section per cited Capture with its source and observed time", async () => {
    renderApp(page(BELIEFS, "?group=capture"));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(main.getByText("first.epss.api")).toBeInTheDocument();
    expect(main.getByText("No Capture cited")).toBeInTheDocument();
    expect(main.getByRole("table", { name: "Changes 1" })).toBeInTheDocument();
    expect(main.getByRole("tab", { name: "Capture" })).toHaveAttribute("aria-selected", "true");
  });
});

describe("Proposal page: definitions", () => {
  it("lists each definition (change, kind, linked name) and opens a readable before/after", async () => {
    renderApp(page(DEFINITIONS));
    const main = within(await screen.findByRole("main"));
    const table = within(await main.findByRole("table", { name: "Definitions" }));
    expect(table.getByText("Procedure")).toBeInTheDocument();
    expect(table.getByRole("link", { name: "security.kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/ref/Procedure%3Asecurity.kev-triage");
    // the one definition is open: grouped fields, human group names, a {kind, name} pair as a link
    expect(table.getByText("Budget")).toBeInTheDocument();
    expect(table.getByText("max_steps")).toBeInTheDocument();
    expect(table.getByRole("link", { name: "Contract:http-response-v1" })).toBeInTheDocument();
    expect(main.queryByRole("table", { name: "Changes" })).toBeNull();
  });

  it("shows a mixed proposal's definitions and its belief grid", async () => {
    renderApp(page(MIXED));
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("table", { name: "Definitions" })).toBeInTheDocument();
    expect(await main.findByRole("table", { name: "Changes" })).toBeInTheDocument();
  });

  it("says None under Changes for a proposal with no changes", async () => {
    const review = AUTHORED.find((f) => f.path.endsWith("/review") && (f.response as { tag?: string; proposal_id?: string }).tag === "playbill-proposal-review-v1" && (f.response as { proposal_id?: string }).proposal_id === DEFINITIONS)!;
    renderApp(page(DEFINITIONS), [...AUTHORED, { ...review, response: { ...(review.response as object), members: [] } }]);
    const main = within(await screen.findByRole("main"));
    const panel = within((await main.findByRole("heading", { name: "Changes" })).closest("section")!);
    expect(panel.getByText("None")).toBeInTheDocument();
  });
});
