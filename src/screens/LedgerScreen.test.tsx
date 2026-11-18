import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw-server";
import { renderApp, TEST_BASE } from "@/test/render";
import { LEDGER_PAGE, orientQuery } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { defineFixture } from "@/fixtures/fixture";
import { AUTHORED } from "@/fixtures/handlers";
import { BELIEF_MEMBERS, BELIEFS, DEFINITIONS, PROCEDURE_MEMBER } from "@/fixtures/authored/proposal-diff";
import { reviewSummary } from "@/fixtures/review-summary";
import { summaryRationale } from "@/lib/change-sets";
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
      proposed_at: "2026-10-19T09:30:00Z",
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
      expect.arrayContaining(["Generation", "Proposed", "Author", "Description", "Changes", "Commit", "Proposal"]),
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

  /** The review reads the page makes, by form: `detail: true` is the detailed one. */
  function reviewReads() {
    const reads: ("summary" | "detail")[] = [];
    server.use(
      http.post(`${TEST_BASE}/api/v1/:instance/proposals/:proposal/review`, async ({ request }) => {
        const body = (await request.clone().json()) as { detail?: boolean };
        reads.push(body.detail ? "detail" : "summary");
        return undefined;
      }),
    );
    return reads;
  }

  it("expands a definition-only generation to its definitions, by kind, from the summary review alone", async () => {
    renderApp("/i/inst_fixture/ledger", [...AUTHORED, ledger([{ sequence: 5, git_oid: "5".repeat(40), proposed_at: "2026-10-19T09:00:00Z", proposal: DEFINITIONS, proposer: "kit-author", members: 1 }])]);
    const reads = reviewReads(); // after renderApp: its handlers go first
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "Expand generation 5" }));
    const procedures = within(await main.findByRole("group", { name: "Procedure" }));
    expect(procedures.getByRole("link", { name: "security.kev-triage" })).toBeInTheDocument();
    expect(procedures.getByRole("img", { name: "Revised" })).toBeInTheDocument();
    expect(reads).toEqual(["summary"]);
  });

  it("reads the detailed review only for a change set with Claims", async () => {
    renderApp("/i/inst_fixture/ledger");
    const reads = reviewReads(); // after renderApp: its handlers go first
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "Expand generation 42" }));
    expect(await main.findByRole("link", { name: /CLM-0+a3/ })).toBeInTheDocument();
    expect(reads).toEqual(["summary", "detail"]);
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

/**
 * A summary value core cut short: the first `bytes` bytes of the value's JSON
 * text, a character split at the cut dropped (Python's decode "ignore").
 */
function cutJson(text: string, bytes = 512): string {
  const encoded = new TextEncoder().encode(JSON.stringify(text));
  for (let n = Math.min(bytes, encoded.length); n > 0; n -= 1) {
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(encoded.slice(0, n));
    } catch {
      /* split character */
    }
  }
  return "";
}

describe("Ledger: a rationale read once", () => {
  /** One generation whose `because` is the first 500 characters of `full`; its proposal's reviews answered here. */
  function renderRationale(full: string, proposal: string, summary: Schemas["ProposalReviewSummary"], detail?: unknown) {
    const because = [...full].slice(0, 500).join("");
    renderApp(
      "/i/inst_fixture/ledger",
      [...AUTHORED, ledger([{ sequence: 7, git_oid: "7".repeat(40), proposed_at: "2026-10-19T09:00:00Z", proposal, proposer: "kit-author", members: 1, because, because_truncated: because !== full }])],
      {
        handlers: [
          http.post(`${TEST_BASE}/api/v1/:instance/proposals/:proposal/review`, async ({ request }) => {
            const body = (await request.clone().json()) as { detail?: boolean };
            return HttpResponse.json((body.detail ? detail : summary) as never);
          }),
        ],
      },
    );
  }
  const descriptionOf = async () => {
    const main = within(await screen.findByRole("main"));
    fireEvent.click(await main.findByRole("button", { name: "Expand generation 7" }));
    return main;
  };

  it("reads a summary's JSON-text cut back as words, an escape cut short included", () => {
    expect(summaryRationale({ value: "Whole words.", truncated: false })).toEqual({ text: "Whole words.", truncated: false });
    expect(summaryRationale({ value: '"Line one\\nline two', truncated: true })).toEqual({ text: "Line one\nline two", truncated: true });
    expect(summaryRationale({ value: '"caf\\u00', truncated: true })).toEqual({ text: "caf", truncated: true });
  });

  it("shows the summary's words past the row's cut once, in the row (cuts of unequal length)", async () => {
    // the row keeps 500 characters; the summary's 512 bytes of JSON text (a quote, then 511) reach "TAIL1"
    const full = `${"A".repeat(499)} TAIL1 and the rest of a long rationale ${"z".repeat(600)}`;
    renderRationale(full, DEFINITIONS, reviewSummary(DEFINITIONS, [PROCEDURE_MEMBER], { rationale: { value: cutJson(full), truncated: true } }));
    const main = await descriptionOf();
    await main.findByRole("group", { name: "Procedure" });
    expect(await main.findByText(/^A{499} TAIL1 and.*…$/)).toBeInTheDocument();
    expect(main.getAllByText(/TAIL1/)).toHaveLength(1);
    expect(main.getAllByText(/^A{499}/)).toHaveLength(1);
  });

  it("does not repeat a rationale the summary cut shorter than the row, at a multi-byte character", async () => {
    const full = "é".repeat(600);
    renderRationale(full, DEFINITIONS, reviewSummary(DEFINITIONS, [PROCEDURE_MEMBER], { rationale: { value: cutJson(full), truncated: true } }));
    const main = await descriptionOf();
    await main.findByRole("group", { name: "Procedure" });
    expect(main.getAllByText(/^é+…$/)).toHaveLength(1);
    expect(main.getByText(/^é+…$/).textContent).toBe(`${"é".repeat(500)}…`);
  });

  it("shows a detailed rationale longer than the row's prefix whole, once", async () => {
    const full = `${"B".repeat(499)} and its end: TAIL_FULL_DETAIL_END`;
    const detailed = AUTHORED.find(
      (f) => f.path.endsWith("/review") && (f.response as { tag?: string; proposal_id?: string }).tag === "playbill-proposal-review-v1" && (f.response as { proposal_id?: string }).proposal_id === BELIEFS,
    )!.response as Schemas["ProposalReview"];
    renderRationale(full, BELIEFS, reviewSummary(BELIEFS, BELIEF_MEMBERS, { rationale: { value: cutJson(full), truncated: true } }), { ...detailed, rationale: full });
    const main = await descriptionOf();
    expect(await main.findByText(/TAIL_FULL_DETAIL_END$/)).toBeInTheDocument();
    expect(main.getAllByText(/TAIL_FULL_DETAIL_END/)).toHaveLength(1);
    expect(main.getAllByText(/^B{499}/)).toHaveLength(1);
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
