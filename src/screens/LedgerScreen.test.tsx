import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { LEDGER_PAGE, orientQuery } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { defineFixture } from "@/fixtures/fixture";
import { AUTHORED } from "@/fixtures/handlers";
import { DEFINITIONS } from "@/fixtures/authored/proposal-diff";
import { AT, COORDINATE, NOW } from "@/fixtures/authored/world";

afterEach(cleanup);

/** The Ledger's first page with these generations (overrides the fixture world's). */
const ledger = (generations: Schemas["OrientGeneration"][]) =>
  defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({ coordinate: COORDINATE, section: "generations", limit: LEDGER_PAGE }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "generations",
      generations,
    },
  });

const ACCEPTED = "sha256:" + "6".repeat(64);
const OPEN = "sha256:" + "a".repeat(64);

describe("Ledger", () => {
  it("lists accepted generations newest first with proposer, approvals, reason and a pin link", async () => {
    renderApp("/i/inst_fixture/ledger");
    const main = within(await screen.findByRole("main"));
    const g42 = await main.findByRole("link", { name: "g42" });
    expect(g42).toHaveAttribute("href", "/i/inst_fixture?at=42");
    // the shared table: one row per generation, newest first, naming author and approvers
    const table = within(main.getByRole("table", { name: "Generations" }));
    expect(table.getAllByRole("columnheader").map((h) => h.textContent)).toEqual(
      expect.arrayContaining(["Generation", "Accepted", "Author", "Description", "Changes", "Commit", "Proposal"]),
    );
    const bodyRows = table.getAllByRole("row").filter((row) => row.closest("tbody"));
    expect(bodyRows[0]).toContainElement(g42);
    const row = within(g42.closest("tr") as HTMLElement);
    expect(row.getByText("release-owner")).toBeInTheDocument(); // the proposer, as the author
    expect(row.queryByText("Author")).toBeNull(); // the column says it
    expect(row.getByText("Approved by")).toBeInTheDocument();
    expect(row.getByText("security-lead")).toBeInTheDocument();
    expect(within(main.getByRole("link", { name: "g41" }).closest("tr") as HTMLElement).getByText("14")).toBeInTheDocument();
    expect(main.getByRole("button", { name: "Next page →" })).toBeInTheDocument();
    // the genesis generation has no proposal, so nothing to expand
    expect(main.queryByRole("button", { name: "Expand generation 0" })).toBeNull();
    fireEvent.click(main.getByRole("button", { name: "Expand generation 42" }));
    expect(await main.findByRole("link", { name: /CLM-0+a3/ })).toBeInTheDocument();
    // the reason shows once: on the row, not again in its change set
    expect(main.getAllByText("Vendor advisory says rel-1 never shipped the build.")).toHaveLength(1);
  });

  it("expands a definition-only generation to its definitions, by kind", async () => {
    renderApp("/i/inst_fixture/ledger", [...AUTHORED, ledger([{ sequence: 5, git_oid: "5".repeat(40), accepted_at: "2026-10-19T09:00:00Z", proposal: DEFINITIONS, proposer: "kit-author", members: 1 }])]);
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "Expand generation 5" }));
    const procedures = within(await main.findByRole("group", { name: "Procedure" }));
    expect(procedures.getByRole("link", { name: "security.kev-triage" })).toBeInTheDocument();
    expect(procedures.getByRole("img", { name: "Revised" })).toBeInTheDocument();
  });

  it("reads in the daemon's order, newest first: a log has no sort, so none is claimed", async () => {
    renderApp("/i/inst_fixture/ledger?sort=-changes");
    const main = within(await screen.findByRole("main"));
    await main.findByRole("link", { name: "g42" });
    const sequences = main.getAllByRole("link", { name: /^g\d+$/ }).map((a) => Number(a.textContent!.slice(1)));
    expect(sequences).toEqual([...sequences].sort((a, b) => b - a));
    expect(main.queryByText(/^Sorted within/)).toBeNull();
  });
});

describe("Proposals and review", () => {
  it("lists open proposals", async () => {
    renderApp("/i/inst_fixture/proposals");
    const main = within(await screen.findByRole("main"));
    // The row links what the proposal is (never the digest); the digest is a copy chip beside it.
    const href = `/i/inst_fixture/p/${encodeURIComponent(OPEN)}`;
    const links = await main.findAllByRole("link");
    const row = links.find((a) => a.getAttribute("href") === href);
    expect(row).toBeDefined();
    expect(row!.textContent).not.toMatch(/sha256:/);
    expect(main.getByRole("button", { name: /^sha256:aaaa/ })).toBeInTheDocument();
  });

  it("filters a status tab's page by state and says a sort covers only that page", async () => {
    renderApp("/i/inst_fixture/proposals?status=settled&f.state=Refused&sort=-admitted");
    const main = within(await screen.findByRole("main"));
    const table = within(await main.findByRole("table", { name: "Proposals" }));
    await table.findByText("refused");
    expect(table.getAllByRole("row").filter((row) => row.closest("tbody"))).toHaveLength(1); // the refused proposal
    expect(main.getByText("Sorted and filtered within the first 3 settled.")).toBeInTheDocument();
    expect(table.getByText("refused")).toBeInTheDocument();
  });

  it("renders a review read-only: deltas, governance, approvals, item reasons", async () => {
    renderApp(`/i/inst_fixture/p/${encodeURIComponent(ACCEPTED)}`);
    const main = within(await screen.findByRole("main"));
    // one row per change; a row opens to the stored record's fields
    for (const button of await main.findAllByRole("button", { name: /^Expand / })) fireEvent.click(button);
    expect(await main.findByText("object.value")).toBeInTheDocument();
    // a created member is marked "+" (its word on hover) and lists its new values (no "absent" before side)
    expect(main.getAllByRole("img", { name: "Created" }).length).toBeGreaterThan(0);
    expect(main.getByText(/independent-principal ×1/)).toBeInTheDocument();
    expect(main.getByText("security-lead")).toBeInTheDocument();
    expect(main.getByText(/submitted by release-owner/)).toBeInTheDocument();
    expect(main.getByText("Some stored fields are withheld").getAttribute("title")).toMatch(/^Needs a body-reading credential: /);
    expect(main.queryByRole("button", { name: /approve|activate|reject|withdraw|readmit/i })).toBeNull();
    cleanup();
    renderApp(`/i/inst_fixture/p/${encodeURIComponent(OPEN)}`);
    expect(await screen.findByText("OSV lists xz 5.6.0 and 5.6.1 as affected; rel-1 pins 5.6.1.")).toBeInTheDocument();
    for (const button of await screen.findAllByRole("button", { name: /^Expand / })) fireEvent.click(button);
    expect(await screen.findByText("lifecycle.state")).toBeInTheDocument();
  });
});
