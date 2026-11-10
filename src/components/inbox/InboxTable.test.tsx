import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { getBatchBody } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { AUTHORED } from "@/fixtures/handlers";
import { defineFixture, type RecordedFixture } from "@/fixtures/fixture";
import { COORDINATE } from "@/fixtures/authored/world";
import { KEV_EXPOSURE } from "@/fixtures/authored/queries";
import { WORKLIST_ROWS, worklistRead } from "@/fixtures/authored/worklists";
import { renderApp } from "@/test/render";
import { server } from "@/test/msw-server";
import { WORKLIST_LIMIT } from "@/lib/worklist";

afterEach(cleanup);

const I = "/i/inst_fixture";
const table = async () => within(await screen.findByRole("table", { name: "Inbox" }));
const bodyRows = (t: ReturnType<typeof within>) => t.getAllByRole("row").filter((row: HTMLElement) => row.closest("tbody"));
const isWorklistRead = (body: unknown) => typeof body === "object" && body !== null && (body as { name?: unknown }).name === KEV_EXPOSURE && (body as { limit?: unknown }).limit === WORKLIST_LIMIT;

/** The world with the worklist read (and any other fixture of the same request) replaced. */
function withFixtures(...replacing: RecordedFixture[]): RecordedFixture[] {
  return [...AUTHORED.filter((fixture) => !replacing.some((r) => r.key === fixture.key)), ...replacing];
}

/** Counts the worklist reads the page makes. */
function countWorklistReads() {
  let reads = 0;
  const listen = async ({ request }: { request: Request }) => {
    if (!request.url.endsWith("/query")) return;
    if (isWorklistRead(await request.clone().json())) reads += 1;
  };
  server.events.on("request:start", listen);
  return { reads: () => reads, stop: () => server.events.removeListener("request:start", listen) };
}

describe("Inbox rows: the item's current row from its Line's Query", () => {
  it("joins each item to its row by the copied fields, adds the row's other fields, and tags an item the Query no longer lists", async () => {
    const count = countWorklistReads();
    try {
      renderApp(`${I}/inbox?line=kev-triage`);
      const t = await table();
      // the row's status (not in the payload) beside the Subject fields, its Contract type on hover
      expect(await t.findByText("under_investigation")).toBeInTheDocument();
      expect(t.getByRole("columnheader", { name: "status" })).toHaveAttribute("title", expect.stringContaining("from the Line's Query, as it reads now"));
      // CVE-2021-44228 on acme-2.3.1 no longer qualifies: a quiet tag naming the Query, its cells empty
      const older = bodyRows(t).find((row: HTMLElement) => within(row).queryByText("CVE-2021-44228"))!;
      expect(within(older).getByText(/No longer in/)).toHaveTextContent(`No longer in ${KEV_EXPOSURE}`);
      // one read for the page's one posting Line, never one per row
      await waitFor(() => expect(count.reads()).toBe(1));
    } finally {
      count.stop();
    }
  });

  it("orders one Line's page by the Query's order, with newest posted first as the alternative", async () => {
    renderApp(`${I}/inbox?line=kev-triage`);
    const t = await table();
    await t.findByText("under_investigation");
    const order = within(screen.getByRole("group", { name: "Order" }));
    expect(order.getByRole("button", { name: "In worklist order" })).toHaveAttribute("aria-pressed", "true");
    // the listed item first; the one the Query no longer lists after it
    expect(within(bodyRows(t)[0]!).getByText("CVE-2024-6387")).toBeInTheDocument();
    fireEvent.click(order.getByRole("button", { name: "Newest posted first" }));
    expect(order.getByRole("button", { name: "Newest posted first" })).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps the daemon's order across daemon pages and across Lines, still joining", async () => {
    renderApp(`${I}/inbox`);
    const t = await table();
    // every Line, with a second page: no order choice
    expect(await t.findByText("under_investigation")).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "Order" })).toBeNull();
    expect(screen.getByText("Newest posted first")).toBeInTheDocument();
  });

  it("joins items from two Lines that post from the same step with one read for the shared Query", async () => {
    const list = AUTHORED.find((f) => f.path.endsWith("/inbox") && (f.response as Schemas["InboxList"]).line_filter === "Line:kev-triage" && !(f.response as Schemas["InboxList"]).status_filter)!;
    const response = list.response as Schemas["InboxList"];
    // the older item posted by a second Line running the same Procedure
    const entries = response.entries.map((entry, i) => (i === 1 ? { ...entry, item: { ...entry.item, line: "Line:kev-weekly" } } : entry));
    const count = countWorklistReads();
    try {
      renderApp(`${I}/inbox?line=kev-triage`, withFixtures({ ...list, response: { ...response, entries } }));
      const t = await table();
      expect(await t.findByText("under_investigation")).toBeInTheDocument();
      expect(t.getByText(/No longer in/)).toBeInTheDocument();
      // the two Lines pass the same parameters (none) to the same Query: the page reads it once
      await waitFor(() => expect(count.reads()).toBe(1));
      // two Lines: no single worklist order
      expect(screen.queryByRole("group", { name: "Order" })).toBeNull();
    } finally {
      count.stop();
    }
  });

  it("says when the Query was read in part, and then tags no item as no longer listed", async () => {
    renderApp(`${I}/inbox?line=kev-triage`, withFixtures(worklistRead(WORKLIST_ROWS, { truncated: true, next_cursor: "w2", remaining: 9 })));
    const t = await table();
    expect(await t.findByText("under_investigation")).toBeInTheDocument();
    expect(screen.getByText(/read in part \(2 rows\)/)).toBeInTheDocument();
    expect(t.queryByText(/No longer in/)).toBeNull();
  });

  it("shows no current fields for a Line whose Query needs a parameter the Line does not serve, and says so", async () => {
    // the page's one posting Procedure, read alone (its batch of one)
    const procedures = AUTHORED.find((f) => f.path.endsWith("/get-batch") && JSON.stringify((f.response as { results?: { ref: string }[] }).results?.map((r) => r.ref)) === JSON.stringify(["Procedure:security.kev-notify"]))!;
    const response = procedures.response as { results: Schemas["GetResult"][] };
    const card = response.results[0]!.card as { authored: { steps: Record<string, unknown>[] } };
    const steps = card.authored.steps.map((step) => ("read" in step ? { ...step, params: { min: { $ref: "param", path: ["min_score"] } } } : step));
    const patched = { ...procedures, response: { ...response, results: [{ ...response.results[0]!, card: { ...card, authored: { ...card.authored, steps } } }] } };
    // the Line's definition serves no min_score
    const proof = defineFixture({
      method: "post",
      path: "/api/v1/{instance_id}/get-batch",
      body: getBatchBody(["Line:kev-triage"], COORDINATE, "proof"),
      response: {
        tag: "playbill-get-batch-result-v1",
        coordinate: COORDINATE,
        results: [{ tag: "playbill-get-result-v1", ref: "Line:kev-triage", kind: "line", detail: "proof", card: null, proof: { envelope: { identity: { name: "kev-triage" }, procedure: { target: { name: "security.kev-notify" } }, parameters: {} } }, coordinate: COORDINATE, evaluation_time: "2026-10-19T12:00:00Z" }],
      } as never,
    });
    const count = countWorklistReads();
    try {
      renderApp(`${I}/inbox?line=kev-triage`, withFixtures(patched, proof));
      const t = await table();
      await t.findByText("CVE-2021-44228");
      expect(await screen.findByText(/No current fields for/)).toHaveTextContent("No current fields for kev-triage: its Query needs min");
      expect(t.queryByText("under_investigation")).toBeNull();
      expect(count.reads()).toBe(0);
    } finally {
      count.stop();
    }
  });
});
