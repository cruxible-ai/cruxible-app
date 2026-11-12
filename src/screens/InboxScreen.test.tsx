import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { QueryClient } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { errorEnvelope } from "@/fixtures/envelopes";
import { server } from "@/test/msw-server";
import { renderApp, TEST_BASE } from "@/test/render";
import { UNREAD_ITEM } from "@/fixtures/authored/worklists";
import { AUTHORED } from "@/fixtures/handlers";
import type { RecordedFixture } from "@/fixtures/fixture";
import type { Schemas } from "@/api/schemas";
import { inboxPage } from "@/test/inbox-pages";
import { defineFixture } from "@/fixtures/fixture";
import { getBatchBody } from "@/api/requests";
import { COORDINATE } from "@/fixtures/authored/world";
import type { GetResult } from "@/api/schemas";

afterEach(cleanup);

const I = "/i/inst_fixture";
const table = async () => within(await screen.findByRole("table", { name: "Inbox" }));
/** The item rows: a group's header line (its item Contract) is not one. */
const bodyRows = (t: ReturnType<typeof within>) => t.getAllByRole("row").filter((row: HTMLElement) => row.closest("tbody") && !row.querySelector("[data-contract]"));

/** The fixture world with each listed entry's payload preview rewritten. */
function withPayloads(edit: (entry: Schemas["InboxListEntry"]) => unknown): RecordedFixture[] {
  return AUTHORED.map((fixture) => {
    const list = fixture.response as Partial<Schemas["InboxList"]>;
    if (!fixture.path.endsWith("/inbox") || !Array.isArray(list.entries)) return fixture;
    const entries = list.entries.map((entry) => ({ ...entry, payload_preview: edit(entry) as Schemas["InboxListEntry"]["payload_preview"] }));
    return { ...fixture, response: { ...list, entries } };
  });
}

const KEV_ATTENTION = "Contract:security.kev-attention@1";
const REVIEW = "Contract:security.applicability-review@1";
const REVIEW_TEXT = "One OSV answer an owner checks against what the release ships.";

/**
 * The authored world with the cve-applicability posting step under an item
 * Contract of its own: the first page (kev-triage's unread item, then the
 * dismissed cve-applicability one) spans two item Contracts; the second page
 * holds one more kev-triage item.
 */
function twoContracts(): RecordedFixture[] {
  const results = (fixture: RecordedFixture) => (fixture.response as { results?: GetResult[] }).results ?? [];
  const refs = (fixture: RecordedFixture) => results(fixture).map((r) => r.ref).join(",");
  const kevAttention = AUTHORED.flatMap(results).find((r) => r.ref === KEV_ATTENTION)!;
  const patched = AUTHORED.map((fixture) => {
    if (refs(fixture) !== "Procedure:security.kev-notify,Procedure:security.cve-applicability") return fixture;
    const response = structuredClone(fixture.response) as { results: GetResult[] };
    const card = response.results[1]!.card as { authored: unknown };
    card.authored = { procedure: "security.cve-applicability", steps: [{ id: "post", inbox: REVIEW.slice("Contract:".length), fields: {} }] };
    return { ...fixture, response };
  });
  const review: GetResult = { ...kevAttention, ref: REVIEW, card: { contract: REVIEW, version: 1, description: REVIEW_TEXT, fields: [], pins: [] } as NonNullable<GetResult["card"]> };
  return [
    ...patched,
    defineFixture({
      method: "post",
      path: "/api/v1/{instance_id}/get-batch",
      body: getBatchBody([KEV_ATTENTION, REVIEW], COORDINATE),
      response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [kevAttention, review] },
    }),
  ];
}

describe("Inbox", () => {
  it("leads each row with the payload fields that name Subjects, linked, then the rest; no action on an item", async () => {
    renderApp(`${I}/inbox`);
    expect(await screen.findByRole("heading", { name: /^Inbox/, level: 1 })).toBeInTheDocument();
    const t = await table();
    // Contract fields as columns, Subject fields first (cve_id by its lineage, release by its type), the rest after
    expect(await t.findByRole("link", { name: "CVE-2024-6387" })).toHaveAttribute("href", `${I}/s/security.vulnerability%2Fcve-2024-6387`);
    // the item's current row from its Line's Query follows the Subject fields (here its status); the item's other fields after
    await t.findByText("under_investigation");
    const headers = t.getAllByRole("columnheader").map((th) => th.textContent);
    // (the first header is the open-row column's)
    expect(headers.slice(1, 6)).toEqual(["Status", "cve_id", "release", "status", "note"]);
    // a field's header names it as written; its Contract description is on hover
    expect(t.getByRole("columnheader", { name: "release" })).toHaveAttribute("title", expect.stringContaining("The release the CVE is unassessed for."));
    // a ref-valued Subject field links as served; other text stays text, even text that reads like a path
    expect(t.getByRole("link", { name: "security.release/acme-2.4.0" })).toHaveAttribute("href", `${I}/s/security.release%2Facme-2.4.0`);
    expect(t.getByText("sboms/app.cdx.json").closest("a")).toBeNull();
    // the page spans two Lines: each row links its Line
    expect(t.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    // status is a quiet marker: an amber dot while unread
    expect(within(bodyRows(t)[0]!).getByRole("img", { name: /Unread/ })).toBeInTheDocument();
    // the daemon's order shows on the Last posted column, as a sorted column does
    expect(within(t.getByRole("columnheader", { name: /Last posted/ })).getByLabelText("Newest posted first")).toBeInTheDocument();
    expect(t.queryByRole("button", { name: /acknowledge|dismiss|link/i })).toBeNull();
  });

  it("leaves a key value whose Subject the lookup did not find as text", async () => {
    renderApp(`${I}/inbox?line=kev-triage`);
    const t = await table();
    await t.findByRole("link", { name: "CVE-2024-6387" });
    expect(t.getByText("CVE-2021-44228").closest("a")).toBeNull();
  });

  it("shows a looked-up Subject's current fields on hover", async () => {
    renderApp(`${I}/inbox`);
    const t = await table();
    fireEvent.mouseEnter(await t.findByRole("link", { name: "CVE-2024-6387" }));
    const card = await screen.findByRole("tooltip");
    expect(await within(card).findByText("0.28271")).toBeInTheDocument();
    expect(within(card).getByText("epss_score")).toBeInTheDocument();
    expect(within(card).getByText("none of")).toBeInTheDocument();
  });

  it("shows the decision on a decided item, quieter than an unread one", async () => {
    renderApp(`${I}/inbox`);
    const t = await table();
    const row = (await t.findByText("Not shipped in any supported release.")).closest("tr")!;
    expect(within(row).getByText("Dismissed")).toBeInTheDocument();
    expect(within(row).getByText("security-lead")).toBeInTheDocument();
    expect(row).toHaveClass("text-zinc-500");
    // a text payload reads as written
    expect(within(row).getByText("OSV answer for acme-2.2.0 carried no new vulnerability.")).toBeInTheDocument();
    expect(t.getByRole("columnheader", { name: "Decision" })).toBeInTheDocument();
  });

  it("hides the Decision column on a page where nothing is decided, and the Line column under a Line filter", async () => {
    renderApp(`${I}/inbox?line=kev-triage&status=unread`);
    const t = await table();
    await t.findByText("CVE-2021-44228");
    expect(t.queryByRole("columnheader", { name: "Decision" })).toBeNull();
    expect(t.queryByRole("columnheader", { name: "Line" })).toBeNull();
  });

  it("says once what every row shares, and leaves an id built from other fields to the opened item", async () => {
    // every kev-triage item: the same state, and an occurrence id spelled from its release and CVE
    const fixtures = withPayloads((entry) => {
      const object = (entry.payload_preview as { object?: Record<string, unknown> }).object;
      if (!object) return entry.payload_preview;
      return { object: { ...object, state: "unjudged", occurrence: `${String(object.release)}--${String(object.cve_id)}` } };
    });
    renderApp(`${I}/inbox?line=kev-triage`, fixtures);
    const t = await table();
    await t.findByText("CVE-2021-44228");
    expect(t.queryByRole("columnheader", { name: "state" })).toBeNull();
    expect(t.queryByRole("columnheader", { name: "occurrence" })).toBeNull();
    const shared = screen.getByLabelText("Same in all 2");
    expect(shared).toHaveTextContent("stateunjudged");
    // the Line filter already names the Line: the row does not repeat it
    expect(shared).not.toHaveTextContent("kev-triage");
  });

  it("opens an item as a field table and its facts, the JSON behind a disclosure", async () => {
    renderApp(`${I}/inbox?line=kev-triage&status=unread`);
    const t = await table();
    await t.findByText("CVE-2024-6387");
    expect(within(screen.getByRole("group", { name: "Status" })).getByRole("button", { name: /^Unread/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("combobox", { name: "Line" })).toHaveValue("kev-triage");
    fireEvent.click(t.getByRole("button", { name: `Expand ${UNREAD_ITEM}` }));
    const fields = within(await screen.findByRole("list", { name: "Payload fields" }));
    // the whole payload (one read by id), each field with its value; Subject fields linked
    expect(await fields.findByText("KEV-listed; no assessment covers acme-2.4.0.")).toBeInTheDocument();
    expect(fields.getByText("message")).toBeInTheDocument();
    expect(fields.getByRole("link", { name: "security.release/acme-2.4.0" })).toBeInTheDocument();
    const facts = within(screen.getByRole("list", { name: "Item" }));
    expect(facts.getByText("Posted by")).toBeInTheDocument();
    expect(facts.getByRole("link", { name: "kev-triage" })).toBeInTheDocument();
    expect(facts.getByText("2 times")).toBeInTheDocument();
    // the item Contract's description, as authored
    expect(facts.getByText("One KEV-listed CVE a release has no assessment for.")).toBeInTheDocument();
    // raw JSON only on request
    expect(screen.queryByText(/"message": "KEV-listed/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Payload JSON/ }));
    expect(screen.getByText(/"message": "KEV-listed; no assessment covers acme-2.4.0."/)).toBeInTheDocument();
  });

  it("pages through the daemon's cursor", async () => {
    renderApp(`${I}/inbox`);
    await table();
    expect(screen.getByText("1–2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
    expect(await screen.findByText("3–3 of 3")).toBeInTheDocument();
    expect((await table()).getByText("CVE-2021-44228")).toBeInTheDocument();
  });

  it("filters by Line and by status on the daemon, with the unread count on its filter", async () => {
    renderApp(`${I}/inbox`);
    await table();
    const status = within(screen.getByRole("group", { name: "Status" }));
    expect(await status.findByRole("button", { name: "Unread 3" })).toBeInTheDocument();
    fireEvent.click(status.getByRole("button", { name: "Dismissed" }));
    // (the rows regroup under their item Contract once its posting step's spec is read: query the table afresh)
    await waitFor(() => expect(screen.getByRole("table", { name: "Inbox" })).toHaveTextContent("Not shipped in any supported release."));
    expect((await table()).queryByText("CVE-2024-6387")).toBeNull();
    fireEvent.click(status.getByRole("button", { name: "All" }));
    fireEvent.change(await screen.findByRole("combobox", { name: "Line" }), { target: { value: "kev-triage" } });
    await waitFor(() => expect(screen.getByRole("table", { name: "Inbox" })).toHaveTextContent("CVE-2021-44228"));
    expect((await table()).queryByText("cve-applicability")).toBeNull();
  });

  it("names the empty state by the status filtered", async () => {
    const fixtures = AUTHORED.map((fixture) => {
      const list = fixture.response as Partial<Schemas["InboxList"]>;
      return list.status_filter === "dismissed" ? { ...fixture, response: { ...list, entries: [] } } : fixture;
    });
    renderApp(`${I}/inbox?status=dismissed`, fixtures);
    expect(await screen.findByText("No dismissed items")).toBeInTheDocument();
  });

  it("counts unread items in the nav from next's unread rows", async () => {
    renderApp(`${I}/inbox`);
    const nav = within(screen.getByRole("navigation"));
    const link = await nav.findByRole("link", { name: /^Inbox Unread inbox items/ });
    expect(link).toHaveAttribute("href", `${I}/inbox`);
    expect(link).toHaveTextContent(/Inbox\s*3$/);
  });

  it("cuts a long payload text in its column (whole on hover) so the short fields beside it read whole", async () => {
    const LONG = "sboms-app.cdx.json--pkg-pypi-django-4.2 and more words past the cut";
    const fixtures = withPayloads((entry) =>
      entry.item.item_id === UNREAD_ITEM ? { object: { ...(entry.payload_preview as { object: object }).object, note: LONG } } : entry.payload_preview,
    );
    renderApp(`${I}/inbox`, fixtures);
    const t = await table();
    const cell = await t.findByText(LONG);
    expect(cell).toHaveClass("truncate");
    expect(cell).toHaveAttribute("title", LONG);
    expect(t.getByText("CVE-2024-6387")).not.toHaveClass("truncate");
  });

  describe("rows grouped by item Contract", () => {
    const headings = () => [...document.querySelectorAll<HTMLElement>('table[aria-label="Inbox"] [data-contract]')];

    it("heads each group with the item Contract's name, linked, and its description as written; rows under it as before", async () => {
      renderApp(`${I}/inbox`, twoContracts());
      const t = await table();
      await waitFor(() => expect(headings()).toHaveLength(2));
      const [kev, review] = headings();
      expect(within(kev!).getByRole("link", { name: "security.kev-attention@1" })).toHaveAttribute("href", expect.stringContaining("security.kev-attention"));
      expect(kev).toHaveTextContent("One KEV-listed CVE a release has no assessment for.");
      expect(within(review!).getByRole("link", { name: "security.applicability-review@1" })).toBeInTheDocument();
      expect(review).toHaveTextContent(REVIEW_TEXT);
      // each group's rows follow its header line, in the daemon's order
      const rows = t.getAllByRole("row").filter((row) => row.closest("tbody"));
      const at = (text: string) => rows.findIndex((row) => row.textContent?.includes(text));
      expect(at("security.kev-attention@1")).toBeLessThan(at("CVE-2024-6387"));
      expect(at("CVE-2024-6387")).toBeLessThan(at("security.applicability-review@1"));
      expect(at("security.applicability-review@1")).toBeLessThan(at("Not shipped in any supported release."));
      // expanding a row still opens the item, its Contract's description in its facts too
      fireEvent.click(t.getByRole("button", { name: `Expand ${UNREAD_ITEM}` }));
      const facts = within(await screen.findByRole("list", { name: "Item" }));
      expect(facts.getByText("One KEV-listed CVE a release has no assessment for.")).toBeInTheDocument();
    });

    it("heads a group again on the next page it continues on", async () => {
      renderApp(`${I}/inbox`, twoContracts());
      await table();
      await waitFor(() => expect(headings()).toHaveLength(2));
      fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
      expect(await screen.findByText("3–3 of 3")).toBeInTheDocument();
      await waitFor(() => expect(headings()).toHaveLength(1));
      expect(headings()[0]).toHaveTextContent("security.kev-attention@1");
      expect(headings()[0]).toHaveTextContent("One KEV-listed CVE a release has no assessment for.");
      expect((await table()).getByText("CVE-2021-44228")).toBeInTheDocument();
    });

    it("one Contract: one header line, the Line filter and the shared row as before", async () => {
      const fixtures = withPayloads((entry) => {
        const object = (entry.payload_preview as { object?: Record<string, unknown> }).object;
        return object ? { object: { ...object, state: "unjudged" } } : entry.payload_preview;
      });
      renderApp(`${I}/inbox?line=kev-triage`, fixtures);
      await (await table()).findByText("CVE-2021-44228");
      await waitFor(() => expect(headings()).toHaveLength(1));
      expect(headings()[0]).toHaveTextContent("security.kev-attention@1");
      expect(screen.getByLabelText("Same in all 2")).toHaveTextContent("stateunjudged");
    });
  });

  describe("the Items header", () => {
    const header = async () => (await screen.findByRole("heading", { name: /^Items/ })).closest("header")!;

    it("counts beside the title, and lifts what every row shares into one labelled row", async () => {
      renderApp(`${I}/inbox`, inboxPage({ n: 7 }));
      await (await table()).findByText("CVE-2026-1006");
      // the count where list panels put theirs ("i" is the title's info button), "Items" said once
      expect(await header()).toHaveTextContent(/^Items i7$/);
      expect(screen.queryByText(/Items \d/)).toBeNull();
      expect(screen.queryByText("Every row")).toBeNull();
      // the shared values: their own row, each under its name
      const shared = within(screen.getByLabelText("Same in all 7"));
      expect(screen.getByText("Same in all 7")).toBeInTheDocument();
      expect(shared.getByText("Line").nextElementSibling).toHaveTextContent("kev-triage");
      expect(shared.getByText("note").nextElementSibling).toHaveTextContent("unjudged");
      expect((await table()).queryByRole("columnheader", { name: "note" })).toBeNull();
      // the order is the Last posted column's, not a sentence
      expect(screen.queryByText("Newest posted first")).toBeNull();
    });

    it("has no shared row when nothing is the same on every row", async () => {
      // the authored page: two Lines, no field with one value
      renderApp(`${I}/inbox`);
      await (await table()).findByText("CVE-2024-6387");
      expect(screen.queryByText(/^Same in all/)).toBeNull();
    });

    it("says which items a page holds when there are more pages, and that the shared values are this page's", async () => {
      renderApp(`${I}/inbox`, inboxPage({ n: 7, more: true }));
      await (await table()).findByText("CVE-2026-1006");
      expect(await header()).toHaveTextContent(/^Items i1–7$/);
      expect(screen.getByLabelText("Same in all 7 on this page")).toHaveTextContent("note");
    });
  });

  it("says No items only while the latest read succeeded", async () => {
    let client: QueryClient | null = null;
    renderApp(`${I}/inbox`, inboxPage({ n: 0 }), {
      seed: (c) => {
        client = c;
      },
    });
    expect(await screen.findByText("No items")).toBeInTheDocument();
    server.use(http.get(`${TEST_BASE}/api/v1/:instance/inbox`, () => HttpResponse.json(errorEnvelope("Unavailable", "inbox unavailable"), { status: 500 })));
    await act(async () => {
      await client!.refetchQueries();
    });
    expect(await screen.findByText("inbox unavailable")).toBeInTheDocument();
    expect(screen.queryByText("No items")).toBeNull();
  });
});
