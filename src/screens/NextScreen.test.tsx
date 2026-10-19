import { afterEach, describe, expect, it } from "vitest";
import { cleanup, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { REASONS } from "@/lib/next-reasons";

afterEach(cleanup);

describe("Next", () => {
  it("groups the page by severity and renders each reason's named detail", async () => {
    renderApp("/i/inst_fixture/next");
    expect(await screen.findByRole("heading", { name: "Next" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    expect(await main.findByRole("heading", { name: "Blocking" })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: "Repair" })).toBeInTheDocument();
    // claim_stale_evidence: expired capture rendered as a Capture link, Subject path as a Subject link
    expect(main.getByText(REASONS.claim_stale_evidence.label)).toBeInTheDocument();
    expect(main.getByRole("link", { name: "CAP-9e1b3d5f7a9c" })).toHaveAttribute("href", "/i/inst_fixture/ref/CAP-9e1b3d5f7a9c");
    expect(main.getAllByRole("link", { name: "security.vulnerability/cve-2024-3094" })[0]).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.vulnerability%2Fcve-2024-3094",
    );
    // a repair is text, with its CLI command; the console offers no action
    expect(main.getByText("cruxible inbox list --line kev-triage")).toBeInTheDocument();
    expect(main.queryByRole("button", { name: /approve|reject|activate|run/i })).toBeNull();
    // unnamed detail keys fall back to JSON on demand
    expect(main.getByRole("button", { name: "more detail" })).toBeInTheDocument();
    // proposal rows open the proposal page
    expect(main.getByRole("link", { name: `sha256:${"a".repeat(64)}` })).toHaveAttribute(
      "href",
      `/i/inst_fixture/p/sha256%3A${"a".repeat(64)}`,
    );
  });

  it("filters the page by family", async () => {
    renderApp("/i/inst_fixture/next?family=lines");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(REASONS.line_inbox_unread.label)).toBeInTheDocument();
    expect(main.queryByText(REASONS.claim_conflicted.label)).toBeNull();
  });
});

describe("Beliefs", () => {
  it("shows contested beliefs by default and the stale tab on request", async () => {
    renderApp("/i/inst_fixture/beliefs");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(REASONS.claim_conflicted.label)).toBeInTheDocument();
    expect(main.getByText(REASONS.claim_contradicting_evidence_available.label)).toBeInTheDocument();
    expect(main.queryByText(REASONS.claim_stale_evidence.label)).toBeNull();
    cleanup();
    renderApp("/i/inst_fixture/beliefs?tab=stale");
    expect(await screen.findByText(REASONS.claim_stale_evidence.label)).toBeInTheDocument();
  });

  it("explains why the drifted tab is empty for a console with no workspace", async () => {
    renderApp("/i/inst_fixture/beliefs?tab=drifted");
    expect(await screen.findByText(/Drift is observed from a workspace/)).toBeInTheDocument();
    expect(await screen.findByText("None on this page.")).toBeInTheDocument();
  });
});
