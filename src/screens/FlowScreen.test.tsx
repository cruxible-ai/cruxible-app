import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";

afterEach(cleanup);

const I = "/i/inst_fixture";

describe("Evidence flow", () => {
  it("columns sources, the Lines that read them, and the ClaimTypes they may write, each a link", async () => {
    renderApp(`${I}/flow`);
    const flow = within(await screen.findByTestId("flow", {}, { timeout: 8000 }));
    // sources say what they are (their retaining Procedure's description) and how they arrive;
    // who retains them is on hover
    expect(flow.getByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(flow.getByText("Fetch the CISA KEV catalog and retain it")).toBeInTheDocument();
    expect(flow.getByText("cisa.kev.catalog").closest("[title]")).toHaveAttribute(
      "title",
      expect.stringContaining("Retained by a direct security.kev-acquire run"),
    );
    // Lines in their own column, linked, with what starts them
    expect(flow.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    expect(flow.getByText("When cisa.kev.catalog lands")).toBeInTheDocument();
    // ClaimTypes under their kind
    expect(flow.getByRole("link", { name: "security.vulnerability" })).toHaveAttribute("href", `${I}/kinds/security.vulnerability`);
    expect(flow.getByRole("link", { name: "kev_listed" })).toBeInTheDocument();
    // no contract column: contracts are tags on sources
    expect(screen.queryByText("Capture contracts")).toBeNull();
  });

  it("?focus= keeps one source's path, not its siblings, behind a separate focus control", async () => {
    renderApp(`${I}/flow?focus=${encodeURIComponent("source:cisa.kev.catalog")}`);
    const flow = within(await screen.findByTestId("flow", {}, { timeout: 8000 }));
    expect(flow.getByText("cisa.kev.catalog")).toBeInTheDocument();
    expect(flow.queryByText("osv.query")).toBeNull();
    expect(screen.getByRole("button", { name: "Clear: Focused on cisa.kev.catalog" })).toBeInTheDocument();
  });
});
