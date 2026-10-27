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
    // grouped by severity, then reason: each group line names its severity in the glossary word
    const groupLines = () => main.getAllByRole("cell").filter((td) => td.getAttribute("colspan"));
    await main.findAllByText("Blocking");
    expect(groupLines().some((td) => within(td).queryByText("Blocking"))).toBe(true);
    expect(groupLines().some((td) => within(td).queryByText("Repair"))).toBe(true);
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
    expect(main.getByRole("button", { name: "More detail" })).toBeInTheDocument();
    // proposal rows open the proposal page
    // shown shortened (full id on hover)
    expect(main.getByRole("link", { name: /^sha256:a{12}…$/ })).toHaveAttribute(
      "href",
      `/i/inst_fixture/p/sha256%3A${"a".repeat(64)}`,
    );
  });

  it("a sort flattens the groups: each row then says its own severity and reason", async () => {
    renderApp("/i/inst_fixture/next?sort=reason");
    const main = within(await screen.findByRole("main"));
    const table = within(await main.findByRole("table", { name: "Next" }));
    await table.findAllByText(REASONS.claim_stale_evidence.label);
    expect(table.getAllByRole("cell").filter((td) => td.getAttribute("colspan"))).toHaveLength(0);
    const labels = table.getAllByRole("row").filter((row) => row.closest("tbody")).map((row) => within(row).getAllByRole("cell")[1]!.textContent);
    expect(labels).toEqual([...labels].sort((a, b) => a!.localeCompare(b!)));
  });

  it("filters the page by family", async () => {
    renderApp("/i/inst_fixture/next?f.family=lines");
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
    expect(main.getAllByText(REASONS.claim_contradicting_evidence_available.label).length).toBeGreaterThan(0);
    expect(main.queryByText(REASONS.claim_stale_evidence.label)).toBeNull();
    cleanup();
    renderApp("/i/inst_fixture/beliefs?tab=stale");
    expect(await screen.findByText(REASONS.claim_stale_evidence.label)).toBeInTheDocument();
  });

  it("resurfaces a recorded contradiction with its basis and note, and says the verdict does not move", async () => {
    renderApp("/i/inst_fixture/beliefs");
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("NVD lists this record under a different CVE id.")).toBeInTheDocument();
    expect(main.getByText("examined existing")).toBeInTheDocument();
    // the row is about the Claim: its claim field is not repeated
    expect(main.queryByText("Claim")).toBeNull();
    expect(main.getByText("Doesn't count")).toBeInTheDocument();
    expect(
      main.getByText("recorded, and the ClaimType has no consequence policy: the verdict does not move"),
    ).toBeInTheDocument();
    // the row citing a Capture names it and carries no such mark
    expect(main.getByRole("link", { name: "CAP-7c1e9a3b5d7f" })).toBeInTheDocument();
    expect(main.getAllByText("Doesn't count")).toHaveLength(1);
    expect(main.getByText(/counts toward the verdict only once accepted citing a Capture/)).toBeInTheDocument();
  });

  it("explains why the drifted tab is empty for a console with no workspace", async () => {
    renderApp("/i/inst_fixture/beliefs?tab=drifted");
    expect(await screen.findByText(/Drift is observed from a workspace/)).toBeInTheDocument();
    expect(await screen.findByText("None on this page.")).toBeInTheDocument();
  });
});
