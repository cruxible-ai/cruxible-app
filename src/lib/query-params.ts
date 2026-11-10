import type { QueryParam } from "./query-view.ts";

/**
 * A named Query's parameters as page inputs: the input each declared type
 * takes, the values given on the page (kept in the URL as `p.<name>`, so a
 * filled-in Query can be linked), and the typed params a run sends. A Query
 * with a required parameter that has neither a given value nor a default
 * does not run.
 */

/** Rows one results page reads. */
export const QUERY_PAGE = 100;

/** The URL key a parameter's given value lives under. */
export const paramKey = (name: string) => `p.${name}`;

export type ParamInput =
  | { kind: "text" }
  | { kind: "subject" }
  | { kind: "integer" }
  | { kind: "decimal" }
  | { kind: "boolean" }
  | { kind: "enum"; members: string[] };

/** The members of an `enum["a", "b"]` type; null when it is not one. */
function enumMembers(type: string): string[] | null {
  const match = /^enum\s*(\[.*\])$/.exec(type.trim());
  if (!match) return null;
  try {
    const members = JSON.parse(match[1]!) as unknown;
    return Array.isArray(members) && members.every((m) => typeof m === "string") ? (members as string[]) : null;
  } catch {
    return null;
  }
}

/** The input a declared parameter type takes. */
export function paramInput(type: string): ParamInput {
  const members = enumMembers(type);
  if (members) return { kind: "enum", members };
  const base = type.trim().split(":", 1)[0];
  if (base === "subject" || base === "subject_reference") return { kind: "subject" };
  if (base === "integer") return { kind: "integer" };
  if (base === "decimal" || base === "number") return { kind: "decimal" };
  if (base === "boolean") return { kind: "boolean" };
  return { kind: "text" };
}

type ParamValue = string | number | boolean;

/** A given value as its declared type sends it; undefined when blank, null when it does not read as that type. */
export function typedValue(param: QueryParam, raw: string): ParamValue | null | undefined {
  const text = raw.trim();
  if (text === "") return undefined;
  const input = paramInput(param.type);
  if (input.kind === "integer") return /^-?\d+$/.test(text) ? Number(text) : null;
  if (input.kind === "boolean") return text === "true" ? true : text === "false" ? false : null;
  if (input.kind === "decimal") return /^-?\d+(?:\.\d+)?$/.test(text) ? text : null;
  if (input.kind === "enum") return input.members.includes(text) ? text : null;
  return text;
}

/** A declared default as an input shows it ("" when none). */
export function defaultText(param: QueryParam): string {
  const value = param.default;
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? String(value) : "";
}

export interface ParamRun {
  /** What the run sends: given values over declared defaults; undefined when there are none. */
  params: Record<string, ParamValue> | undefined;
  /** Required parameters with neither a given value nor a default. */
  missing: QueryParam[];
  /** Parameters whose given value does not read as the declared type. */
  invalid: QueryParam[];
}

/** The params a run sends from the page's given values, and what keeps it from running. */
export function paramRun(params: readonly QueryParam[], given: Readonly<Record<string, string>>): ParamRun {
  const out: Record<string, ParamValue> = {};
  const missing: QueryParam[] = [];
  const invalid: QueryParam[] = [];
  for (const param of params) {
    const value = typedValue(param, given[param.name] ?? "");
    if (value === null) {
      invalid.push(param);
      continue;
    }
    if (value !== undefined) {
      out[param.name] = value;
      continue;
    }
    const fallback = param.default;
    if (typeof fallback === "string" || typeof fallback === "number" || typeof fallback === "boolean") out[param.name] = fallback;
    else if (param.required) missing.push(param);
  }
  return { params: Object.keys(out).length > 0 ? out : undefined, missing, invalid };
}
