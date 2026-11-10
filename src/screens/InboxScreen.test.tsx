import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { UNREAD_ITEM } from "@/fixtures/authored/worklists";
import { AUTHORED } from "@/fixtures/handlers";
import type { RecordedFixture } from "@/fixtures/fixture";
import type { Schemas } from "@/api/schemas";

afterEach(cleanup);

const I = "/i/inst_fixture";
const table = async () => within(await screen.findByRole("table", { name: "Inbox" }));
const bodyRows = (t: ReturnType<typeof within>) => t.getAllByRole("row").filter((row: HTMLElement) => row.closest("tbody"));

/** The fixture world with each listed entry's payload preview rewritten. */
function withPayloads(edit: (entry: Schemas["InboxListEntry"]) => unknown): RecordedFixture[] {
  return AUTHORED.map((fixture) => {
    const list = fixture.response as Partial<Schemas["InboxList"]>;
    if (!fixture.path.endsWith("/inbox") || !Array.isArray(list.entries)) return fixture;
    const entries = list.entries.map((entry) => ({ ...entry, payload_preview: edit(entry) as Schemas["InboxListEntry"]["payload_preview"] }));
    return { ...fixture, response: { ...list, entries } };
  });
}

describe("Inbox", () => {
  it("leads each row with the payload fields that name Subjects, linked, then the rest; no action on an item", async () => {
    renderApp(`${I}/inbox`);
    expect(await screen.findByRole("heading", { name: /^Inbox/, level: 1 })).toBeInTheDocument();
    const t = await table();
    // Contract fields as columns, Subject fields first (cve_id by its lineage, release by its type), the rest after
    expect(await t.findByRole("link", { name: "CVE-2024-6387" })).toHaveAttribute("href", `${I}/s/security.vulnerability%2Fcve-2024-6387`);
    const headers = t.getAllByRole("columnheader").map((th) => th.textContent);
    // (the first header is the open-row column's)
    expect(headers.slice(1, 5)).toEqual(["Status", "cve_id", "release", "note"]);
    // a field's header names it as written; its Contract description is on hover
    expect(t.getByRole("columnheader", { name: "release" })).toHaveAttribute("title", expect.stringContaining("The release the CVE is unassessed for."));
    // a ref-valued Subject field links as served; other text stays text, even text that reads like a path
    expect(t.getByRole("link", { name: "security.release/acme-2.4.0" })).toHaveAttribute("href", `${I}/s/security.release%2Facme-2.4.0`);
    expect(t.getByText("sboms/app.cdx.json").closest("a")).toBeNull();
    // the page spans two Lines: each row links its Line
    expect(t.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    // status is a quiet marker: an amber dot while unread
    expect(within(bodyRows(t)[0]!).getByRole("img", { name: /Unread/ })).toBeInTheDocument();
    expect(screen.getByText("Newest posted first")).toBeInTheDocument();
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
    const shared = screen.getByTitle("The same on every item on this page");
    expect(shared).toHaveTextContent("Every row");
    expect(shared).toHaveTextContent("state unjudged");
    // the Line filter already names the Line: the strip does not repeat it
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
    expect(screen.getByText("Items 1–2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
    expect(await screen.findByText("Items 3–3 of 3")).toBeInTheDocument();
    expect((await table()).getByText("CVE-2021-44228")).toBeInTheDocument();
  });

  it("filters by Line and by status on the daemon, with the unread count on its filter", async () => {
    renderApp(`${I}/inbox`);
    await table();
    const status = within(screen.getByRole("group", { name: "Status" }));
    expect(await status.findByRole("button", { name: "Unread 3" })).toBeInTheDocument();
    fireEvent.click(status.getByRole("button", { name: "Dismissed" }));
    expect(await (await table()).findByText("Not shipped in any supported release.")).toBeInTheDocument();
    expect((await table()).queryByText("CVE-2024-6387")).toBeNull();
    fireEvent.click(status.getByRole("button", { name: "All" }));
    fireEvent.change(await screen.findByRole("combobox", { name: "Line" }), { target: { value: "kev-triage" } });
    const t = await table();
    expect(await t.findByText("CVE-2021-44228")).toBeInTheDocument();
    expect(t.queryByText("cve-applicability")).toBeNull();
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
});
