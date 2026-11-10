import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import { readKitReceipt } from "@/lib/kit-receipt";
import { paramRun } from "@/lib/query-params";
import { countColumns, countOf, type RunCounts } from "@/lib/run-counts";
import { stepNeedsAttention } from "@/lib/runbooks";

/** Checks from the console-polish review that held; kept so they keep holding. */
describe("review checks", () => {
  it("rejects malformed or unexpected kit receipt bodies without throwing", () => {
    const shapes: unknown[] = [
      null,
      true,
      4,
      "x",
      [],
      {},
      { tag: "playbill-kit-receipt-v1" },
      ...[null, 3, {}, [null], ["bad"], [{ path: "x" }]].map((artifacts) => ({ tag: "playbill-kit-receipt-v1", kit_id: "demo", version: "1", artifacts })),
      { tag: "playbill-kit-receipt-v1", kit_id: "demo", version: "1", artifacts: [], carried: "bad" },
    ];
    for (const value of shapes) {
      expect(() => readKitReceipt(value)).not.toThrow();
      expect(readKitReceipt(value)).toBeNull();
    }
  });

  it("keeps decimal precision, sends Subject references as strings, and blocks a missing required parameter", () => {
    const params = [
      { name: "n", type: "decimal", required: true },
      { name: "s", type: "subject_reference", required: true },
    ] as Parameters<typeof paramRun>[0];
    expect(paramRun(params, { n: "0.1234567890123456789", s: "Subject:demo/x" })).toMatchObject({
      params: { n: "0.1234567890123456789", s: "Subject:demo/x" },
      missing: [],
      invalid: [],
    });
    expect(paramRun([{ name: "s", type: "string", required: true }] as Parameters<typeof paramRun>[0], {}).missing).toHaveLength(1);
  });

  it("keeps an unknown count apart from an absent one, and reads stored attention flags", () => {
    const counts = { complete: true, inbox: null, inbox_new: null, inbox_seen_again: null, inbox_unposted: null, needs_attention: true } as unknown as RunCounts;
    expect(countOf(counts, "inbox_new")).toBeNull();
    expect(countOf(counts, "written")).toBeUndefined();
    expect(countColumns([counts]).map((c) => c.key)).toEqual(["inbox"]);
    const run = (attention_steps: number[]) => ({ attention_steps }) as unknown as Schemas["RunbookRunResult"];
    const step = (extra: object = {}) => ({ step: 1, ...extra }) as unknown as Schemas["RunbookStepOutcome"];
    expect(stepNeedsAttention(run([1]), step())).toBe(true);
    expect(stepNeedsAttention(run([]), step({ counts }))).toBe(true);
  });
});
