import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

describe("Kind page", () => {
  it("shows identity, kit and every ClaimType with value, cardinality, role, evidence, freshness and settler", async () => {
    renderApp("/i/inst_fixture/kinds/security.assessment");
    expect(await screen.findByRole("heading", { name: "security.assessment" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByText("Whether one release is affected by one CVE: one per pair.")).toBeInTheDocument();
    expect(main.getByText("release_id")).toBeInTheDocument();
    expect(main.getByText("(unique)")).toBeInTheDocument();
    const status = within(main.getByText("status", { selector: "td > span" }).closest("tr")!);
    expect(status.getByText("enum")).toBeInTheDocument();
    expect(status.getByText("captured")).toBeInTheDocument();
    expect(status.getByRole("link", { name: "security.osv-applicability-v1" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/contracts/security.osv-applicability-v1",
    );
    expect(status.getByText("7d")).toBeInTheDocument();
    // the kev-settle Mandate scopes security.assessment.status; kev-triage settles under it
    expect(await status.findByRole("link", { name: "kev-triage" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    // contention, format and revision from the claim_types section; counts from orient(kind=)
    expect(status.getByText("rivals conflict · 1 corroboration")).toBeInTheDocument();
    expect(status.getByText("v8")).toBeInTheDocument();
    expect(status.getByText("r2")).toBeInTheDocument();
    expect(await status.findByText("100%")).toHaveAttribute("title", "2 of 2 live Subjects");
    expect(status.getByText("2", { selector: "td" })).toBeInTheDocument();
    // contested and stale (K2) are post-v1: dashes
    expect(status.getAllByTitle(/^K2:/)).toHaveLength(2);
    const release = within(main.getByText("release", { selector: "td > span" }).closest("tr")!);
    expect(release.getByRole("link", { name: "→ security.release" })).toHaveAttribute("href", "/i/inst_fixture/kinds/security.release");
    expect(release.getByText("review")).toBeInTheDocument();
    // the kit reports release.json as edited locally
    expect(release.getByText("edited")).toHaveAttribute("title", "claim-types/security.assessment/release.json is edited locally");
  });

  it("marks a refusing slot and a format with an upgrade", async () => {
    renderApp("/i/inst_fixture/kinds/security.vulnerability");
    const main = within(await screen.findByRole("main"));
    const cve = within((await main.findByText("cve_id", { selector: "td > span" })).closest("tr")!);
    expect(cve.getByText("refuses rivals")).toBeInTheDocument();
    const related = within(main.getByText("related", { selector: "td > span" }).closest("tr")!);
    expect(related.getByText("all answer")).toBeInTheDocument();
    expect(related.getByText("upgrade")).toBeInTheDocument();
    expect(await related.findByText("33%")).toBeInTheDocument();
  });

  it("opens ?claim_type= expanded with its evidence rules", async () => {
    renderApp("/i/inst_fixture/kinds/security.assessment?claim_type=security.assessment.status");
    expect(await screen.findByText("osv-applicability")).toBeInTheDocument();
    expect(screen.getByText(/a Capture under one of these contracts is required/)).toBeInTheDocument();
    expect(screen.getByText(/settles under security.kev-settle/)).toBeInTheDocument();
    // who pins it, from the pins section
    expect(await screen.findByText("QueryDefinition (1):")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "security.kev_exposure" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/ref/query%3Asecurity.kev_exposure",
    );
    expect(screen.getByText("ProcedureMandate (1):")).toBeInTheDocument();
  });

  it("lists what points at the kind", async () => {
    renderApp("/i/inst_fixture/kinds/security.vulnerability");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("link", { name: "security.assessment.vulnerability" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/kinds/security.assessment?claim_type=security.assessment.vulnerability",
    );
    fireEvent.click(main.getByRole("button", { name: "Expand kev_listed" }));
    expect(await main.findByText(/the author's own words|a Capture under one of these/)).toBeInTheDocument();
  });
});

describe("Contract page", () => {
  it("shows the definition, the Triggers on its landings with their Lines, and the ClaimTypes that admit it", async () => {
    renderApp("/i/inst_fixture/contracts/security.osv-applicability-v1");
    expect(await screen.findByRole("heading", { name: "security.osv-applicability-v1" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    // Contracts no longer list sources: the logical source comes from the step that retains it.
    expect(await main.findByText("osv.query")).toBeInTheDocument();
    expect(main.getByText("retained by a direct security.osv-acquire run · selected by security.osv-landed", { exact: false })).toBeInTheDocument();
    expect(main.getByText("fetched from outside")).toBeInTheDocument();
    expect(await main.findByText("security.osv-landed")).toBeInTheDocument();
    for (const line of main.getAllByRole("link", { name: "cve-applicability" })) {
      expect(line).toHaveAttribute("href", "/i/inst_fixture/lines/cve-applicability");
    }
    expect(main.queryByText("security.kev-landed")).toBeNull();
    expect(main.getByRole("link", { name: "security.assessment.status" })).toHaveAttribute(
      "href",
      "/i/inst_fixture/kinds/security.assessment?claim_type=security.assessment.status",
    );
    expect(main.getByText("required")).toBeInTheDocument();
  });

  it("says what the contract is, in plain words from the stored contract, between its input and its output", async () => {
    renderApp("/i/inst_fixture/contracts/security.osv-applicability-v1");
    const main = within(await screen.findByRole("main"));
    expect(
      await main.findByText("An HTTP response Cruxible obtains itself, kept whole, up to 16 MiB, for at least 30 days, never erased."),
    ).toBeInTheDocument();
    expect(main.getByText("For at least 30 days")).toHaveAttribute("title", "body retention required_for_duration · minimum 2592000000000 µs");
    expect(main.getByText("Never erased")).toBeInTheDocument();
    expect(main.getByText(/^Attested/)).toBeInTheDocument();
    // the page reads Input -> Contract -> Output, in that order
    const [input, contract, output] = ["Input", "Contract", "Output"].map((name) => main.getByRole("heading", { name }));
    expect(input!.compareDocumentPosition(contract!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(contract!.compareDocumentPosition(output!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("names the Procedures that capture under it, from their pins, and which retain and which read its landings", async () => {
    renderApp("/i/inst_fixture/contracts/security.osv-applicability-v1");
    const main = within(await screen.findByRole("main"));
    const panel = within((await main.findByText("Captured under it by")).closest("section")!);
    // Blueprints are folded into slotted Procedures: a Procedure pins the interfaces its slots take.
    expect(await panel.findByRole("link", { name: "Procedure:security.osv-acquire" })).toBeInTheDocument();
    expect(panel.getAllByRole("link", { name: "security.osv-query/v1" }).length).toBeGreaterThan(0);
    expect(await panel.findAllByText("retains Captures under it")).toHaveLength(1);
    // cve-applicability's Line starts on this contract's landings: it reads them
    expect(panel.getByRole("link", { name: "Procedure:security.cve-applicability" })).toBeInTheDocument();
    expect(panel.getAllByText("reads its landings")).toHaveLength(1);
    expect(panel.queryByText(/kev-acquire/)).toBeNull();
  });

  it("lists every contract", async () => {
    renderApp("/i/inst_fixture/contracts");
    expect(await screen.findByRole("link", { name: "security.kev-http-v1" })).toHaveAttribute("href", "/i/inst_fixture/contracts/security.kev-http-v1");
  });
});
