import { describe, expect, it } from "vitest";
import { nextCronFire, wakeOf } from "./schedule";
import { formatRelative } from "./text";

const at = (iso: string) => new Date(iso);

describe("when a Line wakes", () => {
  it("reads a landing as its logical sources, or its contract when it names none", () => {
    expect(wakeOf("when CaptureContract:security.fetched-v1 from cisa.kev.catalog lands")).toEqual({
      words: "when cisa.kev.catalog lands",
      next: null,
      landing: true,
    });
    expect(wakeOf("when CaptureContract:security.file-v1 lands").words).toBe("when a security.file-v1 Capture lands");
  });

  it("reads a UTC cron in words with its next fire time", () => {
    const wake = wakeOf("on cron 40 7 * * * (UTC)", at("2026-10-26T21:00:00Z"));
    expect(wake.words).toBe("daily at 07:40 UTC");
    expect(wake.next?.toISOString()).toBe("2026-10-27T07:40:00.000Z");
  });

  it("keeps text it does not read as it is", () => {
    expect(wakeOf("daily at 06:00 UTC")).toEqual({ words: "daily at 06:00 UTC", next: null, landing: false });
  });
});

describe("next cron fire (UTC)", () => {
  const now = at("2026-10-26T21:14:30Z"); // a Monday
  it.each([
    ["*/15 * * * *", "2026-10-26T21:15:00.000Z"],
    ["0 */6 * * *", "2026-10-27T00:00:00.000Z"],
    ["30 9 * * 1-5", "2026-10-27T09:30:00.000Z"],
    ["0 8 * * 0", "2026-11-01T08:00:00.000Z"],
    ["0 8 * * 7", "2026-11-01T08:00:00.000Z"],
    ["0 0 1 * *", "2026-11-01T00:00:00.000Z"],
    ["0 0 1,15 1 *", "2027-01-01T00:00:00.000Z"],
  ])("%s", (expression, expected) => {
    expect(nextCronFire(expression, now)?.toISOString()).toBe(expected);
  });
  it("never returns the current minute, and refuses what it does not read", () => {
    expect(nextCronFire("14 21 * * *", now)?.toISOString()).toBe("2026-10-27T21:14:00.000Z");
    expect(nextCronFire("@daily", now)).toBeNull();
    expect(nextCronFire("61 * * * *", now)).toBeNull();
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
