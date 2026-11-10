import { describe, expect, it } from "vitest";
import { nextCronFire, wakeOf } from "./schedule";
import { formatRelative } from "./text";

const at = (iso: string) => new Date(iso);

describe("when a Line wakes", () => {
  it("reads a landing as its logical sources, or its contract when it names none", () => {
    expect(wakeOf("when CaptureContract:security.fetched-v1 from cisa.kev.catalog lands")).toEqual({
      words: "when cisa.kev.catalog lands",
      definedWords: "when cisa.kev.catalog lands",
      next: null,
      landing: true,
      sources: ["cisa.kev.catalog"],
    });
    expect(wakeOf("when CaptureContract:security.file-v1 lands").words).toBe("when a security.file-v1 Capture lands");
  });

  it("reads a UTC cron in the viewer's zone, as defined in the title, with its next fire time", () => {
    const wake = wakeOf("on cron 40 7 * * * (UTC)", at("2026-10-26T21:00:00Z"));
    expect(wake.words).toMatch(/^daily at 3:40\s?AM EDT$/);
    expect(wake.definedWords).toBe("daily at 07:40 UTC");
    expect(wake.next?.toISOString()).toBe("2026-10-27T07:40:00.000Z");
  });

  it("keeps text it does not read as it is", () => {
    expect(wakeOf("daily at 06:00 UTC")).toEqual({ words: "daily at 06:00 UTC", definedWords: "daily at 06:00 UTC", next: null, landing: false, sources: [] });
  });
});

/**
 * Expected instants computed by core, not by hand:
 * cruxible_client.contracts.cron.parse_cron(expression).next_after(now), with
 * null where core refuses the expression (including one that never fires).
 */
const CORE: [expression: string, now: string, next: string | null][] = [
  ["*/15 * * * *", "2026-10-26T21:14:30Z", "2026-10-26T21:15:00.000Z"],
  ["0 */6 * * *", "2026-10-26T21:14:30Z", "2026-10-27T00:00:00.000Z"],
  ["30 9 * * 1-5", "2026-10-26T21:14:30Z", "2026-10-27T09:30:00.000Z"],
  ["0 8 * * 0", "2026-10-26T21:14:30Z", "2026-11-01T08:00:00.000Z"],
  ["0 8 * * 7", "2026-10-26T21:14:30Z", "2026-11-01T08:00:00.000Z"],
  ["0 0 1,15 1 *", "2026-10-26T21:14:30Z", "2027-01-01T00:00:00.000Z"],
  ["14 21 * * *", "2026-10-26T21:14:30Z", "2026-10-27T21:14:00.000Z"],
  ["14 21 * * *", "2026-10-26T21:14:00Z", "2026-10-27T21:14:00.000Z"],
  // a day field starting with * is unrestricted, so the two day fields combine by AND
  ["0 0 */2 * 1", "2026-11-09T12:00:00Z", "2026-11-23T00:00:00.000Z"],
  ["0 0 */10 * */2", "2026-11-09T12:00:00Z", "2026-11-21T00:00:00.000Z"],
  // 7 is Sunday, folded after the range expands
  ["0 0 * * 5-7", "2026-11-09T12:00:00Z", "2026-11-13T00:00:00.000Z"],
  // both day fields restricted: either matches
  ["0 0 13 * 5", "2026-11-09T12:00:00Z", "2026-11-13T00:00:00.000Z"],
  ["0 0 1-7 * 1", "2026-11-09T12:00:00Z", "2026-11-16T00:00:00.000Z"],
  // lists, stepped ranges, a bare start with a step
  ["5,35 10-12/2 * * *", "2026-11-09T12:00:00Z", "2026-11-09T12:05:00.000Z"],
  ["0 6/6 * * *", "2026-11-09T12:00:00Z", "2026-11-09T18:00:00.000Z"],
  // month ends and leap days
  ["0 12 31 * *", "2026-11-09T12:00:00Z", "2026-12-31T12:00:00.000Z"],
  ["0 0 29 2 *", "2026-11-09T12:00:00Z", "2028-02-29T00:00:00.000Z"],
  ["0 0 30 2 *", "2026-11-09T12:00:00Z", null],
  // across the daylight-saving changes of a non-UTC viewer (UTC instants do not move)
  ["0 14 * * *", "2026-10-31T15:00:00Z", "2026-11-01T14:00:00.000Z"],
  ["0 14 * * *", "2026-03-07T15:00:00Z", "2026-03-08T14:00:00.000Z"],
  ["0 7 * * 0", "2026-10-31T15:00:00Z", "2026-11-01T07:00:00.000Z"],
  // numbers in any script's decimal digits, as core's int() reads them
  ["٠ ٠ * * *", "2026-11-09T12:00:00Z", "2026-11-10T00:00:00.000Z"],
  ["0 0 * * ١", "2026-11-09T12:00:00Z", "2026-11-16T00:00:00.000Z"],
  ["０ ０ * * *", "2026-11-09T12:00:00Z", "2026-11-10T00:00:00.000Z"],
  ["0 0 1٢ * *", "2026-11-09T12:00:00Z", "2026-11-12T00:00:00.000Z"],
  ["0 0 𝟏 * *", "2026-11-09T12:00:00Z", "2026-12-01T00:00:00.000Z"],
  // what core refuses (a superscript passes isdigit() but int() raises on it)
  ["² 0 * * *", "2026-11-09T12:00:00Z", null],
  ["*/² * * * *", "2026-11-09T12:00:00Z", null],
  ["@daily", "2026-11-09T12:00:00Z", null],
  ["61 * * * *", "2026-11-09T12:00:00Z", null],
  ["0  0 * * *", "2026-11-09T12:00:00Z", null],
  ["0 0 5-1 * *", "2026-11-09T12:00:00Z", null],
  ["0 0 * * 8", "2026-11-09T12:00:00Z", null],
  ["0 0 * * MON", "2026-11-09T12:00:00Z", null],
  ["*/0 * * * *", "2026-11-09T12:00:00Z", null],
];

describe("next cron fire (UTC), as core computes it", () => {
  it.each(CORE)("%s after %s", (expression, now, next) => {
    expect(nextCronFire(expression, at(now))?.toISOString() ?? null).toBe(next);
  });

  it("says the UTC instant in the viewer's zone on either side of a daylight-saving change", () => {
    // America/New_York (the suite's zone): 14:00 UTC is 10:00 EDT before 1 Nov 2026 and 9:00 EST after
    expect(wakeOf("on cron 0 14 * * * (UTC)", at("2026-10-30T13:00:00Z")).words).toMatch(/^daily at 10:00\s?AM EDT$/);
    expect(wakeOf("on cron 0 14 * * * (UTC)", at("2026-10-31T15:00:00Z")).words).toMatch(/^daily at 9:00\s?AM EST$/);
    expect(wakeOf("on cron 0 14 * * * (UTC)", at("2026-03-07T15:00:00Z")).words).toMatch(/^daily at 10:00\s?AM EDT$/);
  });

  it("shows a schedule core does not accept without a prediction", () => {
    const wake = wakeOf("on cron 0 0 30 2 * (UTC)", at("2026-11-09T12:00:00Z"));
    expect(wake.next).toBeNull();
  });
});

describe("relative time", () => {
  const now = at("2026-10-26T12:00:00Z");
  it.each([
    ["2026-10-26T12:00:20Z", "just now"],
    ["2026-10-26T12:05:00Z", "in 5m"],
    ["2026-10-26T15:20:00Z", "in 3h 20m"],
    ["2026-10-26T10:00:00Z", "2h ago"],
    ["2026-10-29T13:00:00Z", "in 3d 1h"],
  ])("%s", (iso, expected) => {
    expect(formatRelative(iso, now)).toBe(expected);
  });
});
