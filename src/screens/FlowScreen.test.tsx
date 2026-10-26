import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

const I = "/i/inst_fixture";

describe("Evidence flow", () => {
  it("columns sources, contracts, the Triggers their landings fire and the ClaimTypes that admit them, each a link", async () => {
    renderApp(`${I}/flow`);
    const flow = within(await screen.findByTestId("flow"));
    expect(flow.getByText("osv.query")).toBeInTheDocument();
    expect(flow.getByText("cisa.kev.catalog")).toBeInTheDocument();
    // a source node per logical source, from the step that retains it (contracts list no sources)
    expect(flow.getByText("retained by a direct security.kev-acquire run")).toBeInTheDocument();
    expect(flow.getByText("retained by a direct security.osv-acquire run")).toBeInTheDocument();
    expect(flow.getByRole("link", { name: "security.osv-applicability-v1" })).toHaveAttribute("href", `${I}/contracts/security.osv-applicability-v1`);
    // the Procedures that retain Captures under it, inline under the contract
    expect(flow.getByRole("link", { name: "security.kev-acquire" })).toHaveAttribute("href", `${I}/ref/Procedure%3Asecurity.kev-acquire`);
    expect(flow.getByRole("link", { name: "security.osv-landed" })).toHaveAttribute("href", `${I}/ref/Trigger%3Asecurity.osv-landed`);
    expect(flow.getByRole("link", { name: "cve-applicability" })).toHaveAttribute("href", `${I}/lines/cve-applicability`);
    expect(flow.getByRole("link", { name: "security.vulnerability" })).toHaveAttribute("href", `${I}/kinds/security.vulnerability`);
    expect(flow.getByRole("link", { name: "status" })).toHaveAttribute(
      "href",
      `${I}/kinds/security.assessment?claim_type=security.assessment.status`,
    );
    expect(flow.getAllByText("captured")).toHaveLength(2);
    expect(screen.getByText("admissions,", { exact: false })).toHaveTextContent("2 admissions, 2 required");
  });

  it("?focus= keeps one contract's path: its sources, Triggers and ClaimTypes, not its siblings", async () => {
    // (The focus button navigates; jsdom's AbortSignal trips react-router's
    // navigation, so the focused page is rendered from its URL.)
    renderApp(`${I}/flow?focus=${encodeURIComponent("contract:security.kev-http-v1")}`);
    const flow = within(await screen.findByTestId("flow"));
    expect(flow.queryByText("osv.query")).toBeNull();
    expect(flow.getByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(flow.getByRole("link", { name: "kev_listed" })).toBeInTheDocument();
    expect(flow.getByRole("link", { name: "security.kev-landed" })).toBeInTheDocument();
    expect(flow.queryByRole("link", { name: "status" })).toBeNull();
    // the focus is a separate control at the top of the graph
    expect(screen.getByRole("button", { name: "Clear: Focused on security.kev-http-v1" })).toBeInTheDocument();
    expect(flow.getByRole("button", { name: "Focus cisa.kev.catalog" })).toBeInTheDocument();
  });
});
