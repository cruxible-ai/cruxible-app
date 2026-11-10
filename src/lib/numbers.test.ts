import { describe, expect, it } from "vitest";
import { decimalPlaces, fixedText, isNumericType } from "./numbers";

describe("table numbers", () => {
  it("pads every value of a column to the column's most decimals, never rounding", () => {
    const column = ["0.0624", "0.05114", 0.5, "12", null, "n/a"];
    const places = decimalPlaces(column);
    expect(places).toBe(5);
    expect(column.map((value) => fixedText(value, places))).toEqual(["0.06240", "0.05114", "0.50000", "12.00000", "", "n/a"]);
  });

  it("leaves whole-number columns whole and names the numeric types", () => {
    expect(decimalPlaces([1, "20", 300])).toBe(0);
    expect(fixedText(20, 0)).toBe("20");
    expect(["integer", "decimal", "string", "subject:security.release"].map(isNumericType)).toEqual([true, true, false, false]);
  });
});
