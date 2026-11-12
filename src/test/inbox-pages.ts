import { inboxQuery } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { defineFixture, type RecordedFixture } from "@/fixtures/fixture";
import { AUTHORED } from "@/fixtures/handlers";
import { INBOX_LIST_PAGE } from "@/lib/inbox";

type Entry = Schemas["InboxListEntry"];
type List = Schemas["InboxList"];

/** The authored world's first unfiltered inbox page (every Line, any status). */
const firstPage = () => {
  const key = defineFixture({ method: "get", path: "/api/v1/{instance_id}/inbox", query: inboxQuery(undefined, undefined, INBOX_LIST_PAGE), response: {} as never }).key;
  const found = AUTHORED.find((fixture) => fixture.key === key);
  if (!found) throw new Error("no authored first inbox page");
  return found;
};

/**
 * The authored world with the unfiltered first inbox page replaced by `n`
 * unread kev-triage items, each with its own CVE and release and the same
 * `note`: a page whose Line and one field are the same on every row.
 * `more` adds a next cursor (the page is one of several).
 */
export function inboxPage({ n = 7, note = "unjudged", more = false }: { n?: number; note?: string | null; more?: boolean } = {}): RecordedFixture[] {
  const page = firstPage();
  const template = (page.response as List).entries[0]!;
  const entries: Entry[] = Array.from({ length: n }, (_, i) => ({
    ...template,
    item: {
      ...template.item,
      item_id: `INB-${String(i + 1).padStart(2, "0")}${"0".repeat(62)}`,
      recent_sightings: template.item.recent_sightings.map((s) => ({ ...s, posted_at: new Date(Date.parse("2026-10-19T06:00:00Z") - i * 3_600_000).toISOString() })),
    },
    payload_preview: { object: { cve_id: `CVE-2026-${1000 + i}`, release: `security.release/acme-2.${i}.0`, note: note ?? `note ${i}` } },
  }));
  const response: List = { ...(page.response as List), entries, truncated: more, next_cursor: more ? "inbox.p2" : null };
  return [...AUTHORED.filter((fixture) => fixture.key !== page.key), { ...page, response }];
}
