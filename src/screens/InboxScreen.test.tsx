import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { UNREAD_ITEM } from "@/fixtures/authored/worklists";

afterEach(cleanup);

const I = "/i/inst_fixture";
const table = async () => within(await screen.findByRole("table", { name: "Inbox" }));

describe("Inbox", () => {
  it("lists every Line's items in the daemon's order with each payload field as a column", async () => {
    renderApp(`${I}/inbox`);
    expect(await screen.findByRole("heading", { name: "Inbox", level: 1 })).toBeInTheDocument();
    const t = await table();
    // payload Contract fields as columns, in declared order
    expect(await t.findByRole("columnheader", { name: /cve_id/ })).toBeInTheDocument();
    const headers = t.getAllByRole("columnheader").map((th) => th.textContent);
    expect(headers.indexOf("cve_id")).toBeLessThan(headers.indexOf("release"));
    // rows as served: newest posted first
    const rows = t.getAllByRole("row").filter((row) => row.closest("tbody"));
    expect(rows[0]).toHaveTextContent("CVE-2024-6387");
    expect(rows[1]).toHaveTextContent("cve-applicability");
    // a Subject-typed field links; text that reads like kind/id stays text
    expect(await t.findByRole("link", { name: "security.release/acme-2.4.0" })).toHaveAttribute("href", `${I}/s/security.release%2Facme-2.4.0`);
    expect(t.getByText("sboms/app.cdx.json").closest("a")).toBeNull();
    // the Line column links to the Line
    expect(t.getByRole("link", { name: "kev-triage" })).toHaveAttribute("href", `${I}/lines/kev-triage`);
    expect(screen.getByText("Newest posted first")).toBeInTheDocument();
    // no action on an item: its only control opens it
    expect(t.queryByRole("button", { name: /acknowledge|dismiss|link/i })).toBeNull();
  });

  it("shows the decision on a decided item: the reason, who and when", async () => {
    renderApp(`${I}/inbox`);
    const t = await table();
    const row = within((await t.findByText("Not shipped in any supported release.")).closest("tr")!);
    expect(row.getByText("Dismissed")).toBeInTheDocument();
    expect(row.getByText("security-lead")).toBeInTheDocument();
  });

  it("pages through the daemon's cursor", async () => {
    renderApp(`${I}/inbox`);
    await table();
    expect(screen.getByText("Items 1–2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Next page/ }));
    expect(await screen.findByText("Items 3–3 of 3")).toBeInTheDocument();
    expect((await table()).getByText("CVE-2021-44228")).toBeInTheDocument();
  });

  it("filters by Line and by status on the daemon", async () => {
    renderApp(`${I}/inbox`);
    await table();
    fireEvent.click(within(screen.getByRole("group", { name: "Status" })).getByRole("button", { name: "Dismissed" }));
    expect(await (await table()).findByText("Not shipped in any supported release.")).toBeInTheDocument();
    expect((await table()).queryByText("CVE-2024-6387")).toBeNull();
    fireEvent.click(within(screen.getByRole("group", { name: "Status" })).getByRole("button", { name: "All" }));
    // the Line filter: one Line's items, without the Line column
    fireEvent.change(await screen.findByRole("combobox", { name: "Line" }), { target: { value: "kev-triage" } });
    const t = await table();
    expect(await t.findByText("CVE-2021-44228")).toBeInTheDocument();
    expect(t.queryByRole("columnheader", { name: "Line" })).toBeNull();
    expect(t.queryByText("cve-applicability")).toBeNull();
  });

  it("opens from a bookmarked filter and reads an item's whole payload on request", async () => {
    renderApp(`${I}/inbox?line=kev-triage&status=unread`);
    const t = await table();
    expect(await t.findByText("CVE-2024-6387")).toBeInTheDocument();
    expect(within(screen.getByRole("group", { name: "Status" })).getByRole("button", { name: "Unread" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("combobox", { name: "Line" })).toHaveValue("kev-triage");
    fireEvent.click(t.getByRole("button", { name: `Expand ${UNREAD_ITEM}` }));
    expect(await screen.findByText(/"message": "KEV-listed; no assessment covers acme-2.4.0."/)).toBeInTheDocument();
  });

  it("counts unread items in the nav from next's unread rows", async () => {
    renderApp(`${I}/inbox`);
    const nav = within(screen.getByRole("navigation"));
    const link = await nav.findByRole("link", { name: /^Inbox Unread inbox items/ });
    expect(link).toHaveAttribute("href", `${I}/inbox`);
    expect(link).toHaveTextContent(/Inbox\s*3$/);
  });
});
