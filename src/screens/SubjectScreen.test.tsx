import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import type { GetClaimCard, NextResult } from "@/api/schemas";
import { ClaimsTally } from "@/screens/SubjectScreen";
import { AUTHORED } from "@/fixtures/handlers";

afterEach(cleanup);

const ASSESSMENT = "/i/inst_fixture/s/security.assessment%2Frel-1-cve-2024-3094";
const VULNERABILITY = "/i/inst_fixture/s/security.vulnerability%2Fcve-2024-3094";
const NOT_ADMITTED = "Not admitted: offered as evidence, refused by the ClaimType's evidence rule; cite a Capture under a contract the rule admits";

describe("Subject page", () => {
  it("opens the field whose Claim ?claim= names, with its evidence (the kind table links here)", async () => {
    renderApp(`${ASSESSMENT}?claim=CLM-${"a3".padStart(32, "0")}`);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByRole("button", { name: "Collapse status" })).toHaveAttribute("aria-expanded", "true");
    expect(main.getByRole("button", { name: "Expand release" })).toHaveAttribute("aria-expanded", "false");
  });

  it("tables the Subjects pointing at this one: a table per kind and ClaimType, a column per literal field", async () => {
    renderApp(VULNERABILITY);
    expect(await screen.findByText("Pointed at by")).toBeInTheDocument();
    // each group is headed by its kind and the pointing field
    expect(await screen.findByText("security.assessment")).toBeInTheDocument();
    const assessment = await screen.findByRole("link", { name: "rel-1-cve-2024-3094" });
    expect(assessment).toHaveAttribute("href", "/i/inst_fixture/s/security.assessment%2Frel-1-cve-2024-3094");
    // Subject-valued fields (release, vulnerability) are left out; the contested status shows both answers
    const row = assessment.closest("tr")!;
    expect(within(row).getByText("affected, not_affected")).toBeInTheDocument();
    expect(row).not.toHaveTextContent("release");
    // its table has a column for each literal field shown
    const table = row.closest("table")!;
    expect(within(table).getByRole("columnheader", { name: "status" })).toBeInTheDocument();
    // the key (cve_id) is in the id already
    const related = screen.getByRole("link", { name: "cve-2024-6387" }).closest("tr")!;
    expect(related).toHaveTextContent("false");
    expect(within(related.closest("table")!).getByRole("columnheader", { name: "kev_listed" })).toBeInTheDocument();
    expect(related.closest("table")!).not.toHaveTextContent("cve_id");
  });

  it("marks key fields and reds evidence only where the ClaimType requires it", async () => {
    renderApp(VULNERABILITY);
    const main = within(await screen.findByRole("main"));
    // cve_id (the key) and related (requires none) each cite a refused Capture; kev_listed (captured) too
    expect(await main.findByText("0/1 admitted")).toBeInTheDocument();
    expect(main.getAllByText("0/1 admitted")).toHaveLength(1);
    expect(main.getAllByText("key").length).toBeGreaterThan(0);
    // the header counts only fields that require evidence: kev_listed
    expect(main.getByText("0 of 1")).toBeInTheDocument();
    expect(main.getAllByRole("img", { name: NOT_ADMITTED })).toHaveLength(2);
    expect(main.getByText("3 Claims")).toBeInTheDocument();
    expect(main.getByText("stale")).toBeInTheDocument();
    // expanded, a field that requires none says so and its refused citation reads quiet
    fireEvent.click(main.getByRole("button", { name: "Expand related" }));
    expect(await main.findByText("No evidence required")).toBeInTheDocument();
  });

  it("shows the card: fields, values, Subject links, flags, verdicts and admission", async () => {
    renderApp(ASSESSMENT);
    expect(await screen.findByRole("heading", { name: "rel-1-cve-2024-3094" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(main.getByText("security.assessment")).toBeInTheDocument();
    // in the Claims table and again in the field history
    expect(main.getAllByRole("link", { name: "security.release/rel-1" })[0]).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.release%2Frel-1",
    );
    expect(main.getAllByText("Contested").length).toBeGreaterThan(0);
    // the header: how many Claims, and how many in a state that needs a look
    expect(main.getByText("4 Claims")).toBeInTheDocument();
    expect(main.getByText("contested")).toBeInTheDocument();
    // copies the rule does not admit are not evidence: left out of "admitted", named in the header
    expect(await main.findByText("2/2 admitted")).toBeInTheDocument();
    expect(main.getByText("· 1 not evidence")).toBeInTheDocument();
    expect(main.getByRole("link", { name: /^State graph$/ })).toHaveAttribute(
      "href",
      "/i/inst_fixture/graph?focus=security.assessment%2Frel-1-cve-2024-3094",
    );
  });

  it("expands a contested slot into both Claims with contenders, evidence, admission and revisions", async () => {
    renderApp(ASSESSMENT);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    expect(await screen.findByText("OSV lists the release's xz package within the affected range.")).toBeInTheDocument();
    expect(screen.getByText("Vendor advisory: the backdoored build was never shipped in rel-1.")).toBeInTheDocument();
    expect(screen.getAllByText("Contenders")).toHaveLength(2);
    expect(screen.getByText("security.osv-applicability-v1 v1")).toBeInTheDocument();
    // each cited Capture once, its admission in the same row
    expect(screen.getAllByRole("columnheader", { name: /Admission/ })).toHaveLength(2);
    expect(screen.queryByText("Admission accounts")).toBeNull();
    expect(await screen.findAllByText("r2")).not.toHaveLength(0);
    // a revision's generation links back to this page pinned there
    const generation = screen.getAllByRole("link", { name: "g40" })[0]!;
    expect(generation.getAttribute("href")).toContain("?at=40");
  });

  it("labels each citation and says whether the verdict reads it", async () => {
    renderApp(ASSESSMENT);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    expect(await screen.findByText("Own words")).toBeInTheDocument();
    // a copy reads as a passage of its source, under the source's public name
    expect(screen.getByText("Passage of cruxible.page")).toBeInTheDocument();
    expect(screen.getByText("cruxible.coordinator-authoring")).toBeInTheDocument();
    expect(screen.queryByText("playbill.page")).toBeNull();
    expect(screen.getByText("Not evidence")).toBeInTheDocument();
    expect(screen.getAllByText("Admitted")).toHaveLength(2);
  });

  it("lists attestations, accepted and recorded, with whether each counts toward the verdict", async () => {
    renderApp(ASSESSMENT);
    fireEvent.click(await screen.findByRole("button", { name: "Expand status" }));
    expect(await screen.findByText("cites Captures this Claim admits")).toBeInTheDocument();
    expect(screen.getByText("recorded, not accepted: the verdict reads accepted attestations")).toBeInTheDocument();
    expect(screen.getByText("consequence policy rule owner-confirms-scope")).toBeInTheDocument();
    expect(screen.getByText("not current")).toBeInTheDocument();
    expect(screen.getAllByText("Counts")).toHaveLength(2);
    expect(screen.getAllByText("Doesn't count")).toHaveLength(2);
    // the recorded contradiction does not count, so no Claim reads as contradicted
    expect(screen.getByText("1 of 2 count toward the verdict")).toBeInTheDocument();
    expect(screen.getByText("1 of 1 counts toward the verdict")).toBeInTheDocument();
    expect(screen.queryByText("Contradicted")).toBeNull();
    expect(screen.getByText("1 not current")).toBeInTheDocument();
  });

  it("reads one change set per entry: a Line run's links its Line as of then, a hand-authored one its principal", async () => {
    renderApp(ASSESSMENT);
    const main = within(await screen.findByRole("main"));
    // g40: run-7 of the kev-triage Line, revised since (g45)
    // the Line is named twice: under the field it set (since g40) and on its change
    const lines = await main.findAllByRole("link", { name: "kev-triage" });
    expect(lines.map((l) => l.getAttribute("href"))).toContain("/i/inst_fixture/lines/kev-triage?at=40");
    expect(await main.findByRole("link", { name: "changed since" })).toHaveAttribute("href", "/i/inst_fixture/lines/kev-triage");
    expect(main.getByRole("link", { name: "run-7" })).toHaveAttribute("href", "/i/inst_fixture/runs/run-7");
    expect(main.getByText("Approved by")).toBeInTheDocument();
    expect(main.getAllByText("OSV range match").length).toBeGreaterThan(0);
    // the actor is not repeated beside the Line
    expect(main.queryByText("triage-agent")).toBeNull();
    // g41: hand-authored, its principal the author, the proposal's words once
    expect(main.getByText("release-owner", { selector: "span.font-mono" })).toBeInTheDocument();
    expect(main.getByText("Vendor advisory says rel-1 never shipped the build.")).toBeInTheDocument();
  });

  it("names a direct run's Procedure and principal, hides core's run boilerplate and marks the key", async () => {
    renderApp(VULNERABILITY);
    const main = within(await screen.findByRole("main"));
    // only creations: Changes opens as a list; open its fields
    (await main.findByRole("button", { name: "Show each change's fields" })).click();
    expect(await main.findByText("Direct run by")).toBeInTheDocument();
    expect(main.getByRole("link", { name: "Procedure:security.kev-backfill" })).toBeInTheDocument();
    // the approver is the runner: not repeated
    expect(main.queryByText("Approved by")).toBeNull();
    expect(main.queryByText(/Proposed by Procedure/)).toBeNull();
    expect(main.getAllByText("CISA's KEV catalog lists CVE-2024-3094.").length).toBeGreaterThan(0);
    // the key field in the Fields list and in the history
    expect(main.getAllByText("key")).toHaveLength(2);
  });

  it("pages the field history", async () => {
    renderApp(ASSESSMENT);
    expect(await screen.findByText("Vendor advisory says rel-1 never shipped the build.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Older →" }));
    expect(await screen.findByRole("button", { name: "← Newer" })).toBeInTheDocument();
    expect(screen.queryByText("Vendor advisory says rel-1 never shipped the build.")).toBeNull();
  });

  it("marks a Claim the queue says drifted, on its field and in the header", async () => {
    const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
    const response = fixture.response as NextResult;
    const related = `CLM-${(0xb3).toString(16).padStart(32, "0")}`;
    renderApp(VULNERABILITY, [...AUTHORED, {
      ...fixture,
      response: {
        ...response,
        unobserved_domains: response.unobserved_domains.filter((d) => d !== "workspace_sources"),
        observed_domains: [...response.observed_domains, "workspace_sources"],
        items: [{ item_id: "drift", reason: "citation_drifted", severity: "repair", subject_identity: `Claim:${related}`, repair: null }],
        total_items: 1,
      },
    }]);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("drifted")).toBeInTheDocument();
    expect(main.getByText("Drifted")).toBeInTheDocument();
    expect(main.queryByText("All supported")).toBeNull();
  });

  it("says drift was not observed beside All supported, and nothing until the queue answers", () => {
    const cards = [{ claim: "CLM-a", verdict: "supported" }] as GetClaimCard[];
    render(<ClaimsTally cards={cards} drifted={new Set()} driftObserved={false} />);
    expect(screen.getByText("Supported")).toBeInTheDocument();
    expect(screen.getByText("· drift not observed")).toBeInTheDocument();
    cleanup();
    render(<ClaimsTally cards={cards} drifted={new Set()} driftObserved={null} />);
    expect(screen.queryByText("· drift not observed")).toBeNull();
  });

  it("says plainly when the Subject does not exist at this generation", async () => {
    renderApp("/i/inst_fixture/s/security.vulnerability%2Fcve-1999-0001");
    expect(await screen.findByText(/No accepted Subject security.vulnerability\/cve-1999-0001/)).toBeInTheDocument();
  });
});
