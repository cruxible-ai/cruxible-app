/**
 * Numbers in a table column: right-aligned (DataTable's `numeric`) and shown
 * with the same count of decimals on every row. The daemon serves decimals as
 * strings ("0.0624") or numbers; padding is done on the text, never by
 * rounding, so no digit the daemon served is lost.
 */

const DECIMAL = /^-?\d+(?:\.(\d+))?$/;

/** The decimals a number's text carries (0 for a whole number); null when it is not a plain number. */
function decimalsOf(value: unknown): number | null {
  const text = typeof value === "number" ? (Number.isFinite(value) ? String(value) : null) : typeof value === "string" ? value.trim() : null;
  if (text === null) return null;
  const match = DECIMAL.exec(text);
  return match ? (match[1]?.length ?? 0) : null;
}

/** The most decimals any of `values` carries: the column's shared count (0 when none is a decimal). */
export function decimalPlaces(values: readonly unknown[]): number {
  let places = 0;
  for (const value of values) places = Math.max(places, decimalsOf(value) ?? 0);
  return places;
}

/**
 * A number's text padded with trailing zeros to `places` decimals ("0.0624"
 * at 5 reads "0.06240"). Text that is not a plain number, or already carries
 * more decimals, is returned as it is.
 */
export function fixedText(value: unknown, places: number): string {
  const text = typeof value === "number" ? String(value) : typeof value === "string" ? value.trim() : String(value ?? "");
  const decimals = decimalsOf(value);
  if (decimals === null || decimals >= places) return text;
  return `${text}${decimals === 0 ? "." : ""}${"0".repeat(places - decimals)}`;
}

/** A column type the table right-aligns: whole and decimal numbers. */
export function isNumericType(type: string): boolean {
  const base = type.split(":", 1)[0];
  return base === "integer" || base === "decimal" || base === "number";
}
