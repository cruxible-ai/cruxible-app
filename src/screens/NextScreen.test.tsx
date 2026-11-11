import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import type { NextResult } from "@/api/schemas";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture } from "@/fixtures/fixture";
import { COORDINATE, NOW } from "@/fixtures/authored/world";
import { NEXT_PAGE, nextBody } from "@/api/requests";
import { renderApp } from "@/test/render";
import { REASONS } from "@/lib/next-reasons";

afterEach(cleanup);

describe("Next", () => {
  it("lists one row per item, ordered by item type, and renders each reason's named detail", async () => {
    renderApp("/i/inst_fixture/next");
    expect(await screen.findByRole("heading", { name: "Next" })).toBeInTheDocument();
    const main = within(screen.getByRole("main"));
    // plain rows (no group lines), each saying its own type and severity
    const table = within(await main.findByRole("table", { name: "Next" }));
    await table.findAllByText("Blocking");
    expect(table.getAllByRole("cell").filter((td) => td.getAttribute("colspan"))).toHaveLength(0);
    // the Item column follows Severity
    const types = table.getAllByRole("row").filter((row) => row.closest("tbody")).map((row) => within(row).getAllByRole("cell")[1]!.textContent);
    expect(types).toEqual([...types].sort((a, b) => a!.localeCompare(b!)));
    // claim_stale_evidence: expired capture rendered as a Capture link, Subject path as a Subject link
    expect(main.getByText(REASONS.claim_stale_evidence.label)).toBeInTheDocument();
    expect(main.getByRole("link", { name: "CAP-9e1b3d5f7a9c" })).toHaveAttribute("href", "/i/inst_fixture/ref/CAP-9e1b3d5f7a9c");
    expect(main.getAllByRole("link", { name: "security.vulnerability/cve-2024-3094" })[0]).toHaveAttribute(
      "href",
      "/i/inst_fixture/s/security.vulnerability%2Fcve-2024-3094",
    );
    // a Line's unread inbox row opens that Line's unread items on the Inbox page (from the repair's arguments)
    expect(main.getByRole("link", { name: "Open in Inbox" })).toHaveAttribute("href", "/i/inst_fixture/inbox?line=kev-triage&status=unread");
    // its CLI command is text behind CLI / MCP; the console offers no action
    expect(main.queryByText("cruxible inbox list --line kev-triage")).toBeNull();
    fireEvent.click(main.getByRole("button", { name: "CLI / MCP" }));
    expect(main.getByText("cruxible inbox list --line kev-triage")).toBeInTheDocument();
    // copy buttons name the command they copy; no button acts
    expect(main.queryByRole("button", { name: /^(approve|reject|activate|run)/i })).toBeNull();
    // unnamed detail keys fall back to JSON on demand
    expect(main.getByRole("button", { name: "More detail" })).toBeInTheDocument();
    // proposal rows open the proposal page
    // shown shortened (full id on hover)
    expect(main.getByRole("link", { name: /^sha256:a{12}…$/ })).toHaveAttribute(
      "href",
      `/i/inst_fixture/p/sha256%3A${"a".repeat(64)}`,
    );
  });

  it("a sort by item type keeps one row per item", async () => {
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
  it("includes contested, stale and drifted reasons, and switches back to all items", async () => {
    const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
    const response = fixture.response as NextResult;
    renderApp("/i/inst_fixture/next?preset=beliefs&sort=reason", [...AUTHORED, {
      ...fixture,
      response: { ...response, items: [...response.items, {
        item_id: "drift", reason: "citation_drifted", severity: "warning", subject_identity: "Claim:CLM-drift", detail: { source_id: "notes" },
      }], total_items: 7 },
    }]);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(REASONS.claim_conflicted.label)).toBeInTheDocument();
    expect(main.getByText(REASONS.claim_stale_evidence.label)).toBeInTheDocument();
    expect(main.getByText(REASONS.citation_drifted.label)).toBeInTheDocument();
    expect(main.queryByText(REASONS.line_inbox_unread.label)).toBeNull();
    expect(main.queryByText(REASONS.proposal_awaiting_approval.label)).toBeNull();
    expect(main.getByRole("button", { name: "Beliefs", pressed: true })).toBeInTheDocument();
    expect(main.getByRole("columnheader", { name: /Item/ })).toHaveAttribute("aria-sort", "ascending");
    fireEvent.click(main.getByRole("button", { name: "All" }));
    expect(await main.findByText(REASONS.line_inbox_unread.label)).toBeInTheDocument();
    expect(main.getByRole("columnheader", { name: /Item/ })).toHaveAttribute("aria-sort", "ascending");
  });

  it("redirects old Beliefs bookmarks to Next and preserves the generation pin", async () => {
    renderApp("/i/inst_fixture/beliefs?at=42&tab=stale");
    expect(await screen.findByRole("heading", { name: "Next" })).toBeInTheDocument();
    expect(await screen.findByText(REASONS.claim_conflicted.label)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beliefs", pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Generation 42 · pinned/ })).toBeInTheDocument();
    expect(within(screen.getByRole("navigation")).queryByRole("link", { name: "Beliefs" })).toBeNull();
  });

  it("keeps paging available when the current page has no beliefs", async () => {
    const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
    const response = fixture.response as NextResult;
    const second = defineFixture({
      method: "post", path: "/api/v1/{instance_id}/next",
      body: nextBody({ coordinate: COORDINATE, evaluationTime: NOW, limit: NEXT_PAGE, cursor: "second" }),
      response: { ...response, items: response.items.filter((i) => i.reason === "claim_stale_evidence"), total_items: 101, next_cursor: null },
    });
    renderApp("/i/inst_fixture/next?preset=beliefs&at=42", [...AUTHORED, {
      ...fixture, response: { ...response, items: response.items.filter((i) => i.reason === "line_inbox_unread"), total_items: 101, next_cursor: "second" },
    }, second]);
    expect(await screen.findByText("None on this page")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next page →" }));
    expect(await screen.findByText(REASONS.claim_stale_evidence.label)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Beliefs", pressed: true })).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "← Previous page" }));
    expect(await screen.findByText("None on this page")).toBeInTheDocument();
  });

  it("resurfaces a recorded contradiction with its basis and note, and says the verdict does not move", async () => {
    renderApp("/i/inst_fixture/next?preset=beliefs");
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
  });

  it("reads an empty queue as good news, not as a blank page", async () => {
    const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
    const response = fixture.response as NextResult;
    renderApp("/i/inst_fixture/next", [...AUTHORED, { ...fixture, response: { ...response, items: [], total_items: 0, next_cursor: null } }]);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText("Nothing needs attention")).toBeInTheDocument();
    expect(main.queryByRole("table", { name: "Next" })).toBeNull();
  });

  it("reports an empty filtered page and explains workspace drift on request", async () => {
    renderApp("/i/inst_fixture/next?preset=beliefs&f.family=drifted");
    expect(await screen.findByText("No match")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Beliefs preset" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Drifted citations are not observed here: run cruxible next in the workspace.");
  });

  it("says drift was not observed when no workspace observation reached the queue, and nothing when it was", async () => {
    renderApp("/i/inst_fixture/next");
    expect(await screen.findByText("Drift not observed")).toBeInTheDocument();
    cleanup();
    const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
    const response = fixture.response as NextResult;
    renderApp("/i/inst_fixture/next", [...AUTHORED, {
      ...fixture,
      response: {
        ...response,
        observed_domains: [...response.observed_domains, "workspace_sources"],
        unobserved_domains: response.unobserved_domains.filter((d) => d !== "workspace_sources"),
        items: [...response.items, {
          item_id: "drift", reason: "citation_drifted", severity: "repair", subject_identity: "Claim:CLM-drift",
          related_identities: ["citation:abc"],
          detail: { drift_state: "changed", logical_source: { plane: "external", identity: "notes" }, expected_commitment_digest: "sha256:" + "1".repeat(64) },
          repair: { operation: "cruxible.rebind", target: "Claim:CLM-drift", required_change: "rebind_or_retire_drifted_claim", command: "cruxible rebind CLM-drift --because BECAUSE" },
        }],
        total_items: response.total_items + 1,
      },
    }]);
    const main = within(await screen.findByRole("main"));
    expect(await main.findByText(REASONS.citation_drifted.label)).toBeInTheDocument();
    expect(main.getByText("notes")).toBeInTheDocument();
    expect(main.getByText("cruxible rebind CLM-drift --because BECAUSE")).toBeInTheDocument();
    expect(main.queryByText("Drift not observed")).toBeNull();
  });

  it("prints repairs as CLI commands with the MCP tool, never SDK code", async () => {
    const fixture = AUTHORED.find((f) => f.path.endsWith("/next"))!;
    const response = fixture.response as NextResult;
    renderApp("/i/inst_fixture/next", [...AUTHORED, {
      ...fixture,
      response: {
        ...response,
        items: [
          {
            item_id: "sdk", reason: "line_inbox_unread", severity: "repair", subject_identity: "Line:security.kev-triage",
            repair: { operation: "cruxible.inbox.list", target: "Line:security.kev-triage", required_change: "read_unread_inbox_items", command: 'cx.inbox().list(line="security.kev-triage", status="unread")' },
          },
          {
            item_id: "withheld", reason: "line_not_enabled", severity: "setup", subject_identity: "Line:security.osv-query", repair: null,
            repair_requires: { operation: "cruxible.line.enable", tool: "cruxible_line_enable", tier: "governed_write", because: ["tier"] },
          },
        ],
        total_items: 2,
      },
    }]);
    const main = within(await screen.findByRole("main"));
    await main.findAllByRole("button", { name: "CLI / MCP" });
    for (const toggle of main.getAllByRole("button", { name: "CLI / MCP" })) fireEvent.click(toggle);
    expect(main.getByText("cruxible inbox list")).toBeInTheDocument();
    expect(main.queryByText(/cx\.inbox/)).toBeNull();
    expect(main.getByText("cruxible_inbox_list")).toBeInTheDocument();
    expect(main.getByText("cruxible line enable security.osv-query")).toBeInTheDocument();
    expect(main.getByText("cruxible_line_enable")).toBeInTheDocument();
    expect(main.getByText("Needs governed write")).toBeInTheDocument();
  });
});
