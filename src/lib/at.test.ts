import { describe, expect, it } from "vitest";
import { isOutsideRetention, RETAINED_GENERATIONS } from "./at";

describe("the retained window", () => {
  it("holds the newest RETAINED_GENERATIONS: core evicts every piece at or below the head less 64", () => {
    const head = 120;
    expect(isOutsideRetention(head, head)).toBe(false);
    expect(isOutsideRetention(head - RETAINED_GENERATIONS + 1, head)).toBe(false);
    expect(isOutsideRetention(head - RETAINED_GENERATIONS, head)).toBe(true);
    expect(isOutsideRetention(40, 42)).toBe(false);
  });
});
