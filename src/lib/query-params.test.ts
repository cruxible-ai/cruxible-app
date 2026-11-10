import { describe, expect, it } from "vitest";
import { paramInput, paramRun, typedValue } from "./query-params";

describe("query parameters", () => {
  it("picks an input by the declared type", () => {
    expect(paramInput("string")).toEqual({ kind: "text" });
    expect(paramInput("subject_reference")).toEqual({ kind: "subject" });
    expect(paramInput("integer")).toEqual({ kind: "integer" });
    expect(paramInput("boolean")).toEqual({ kind: "boolean" });
    expect(paramInput('enum["unjudged", "contested"]')).toEqual({ kind: "enum", members: ["unjudged", "contested"] });
  });

  it("sends given values typed, falls back to defaults, and holds a run that lacks or mistypes a value", () => {
    const params = [
      { name: "repo", type: "string", required: true },
      { name: "limit", type: "integer", required: false, default: 10 },
      { name: "open", type: "boolean", required: false },
    ];
    expect(paramRun(params, {})).toMatchObject({ params: { limit: 10 }, missing: [params[0]], invalid: [] });
    expect(paramRun(params, { repo: " github.com/x/y ", limit: "3", open: "true" })).toEqual({
      params: { repo: "github.com/x/y", limit: 3, open: true },
      missing: [],
      invalid: [],
    });
    expect(paramRun(params, { repo: "r", limit: "three" }).invalid.map((param) => param.name)).toEqual(["limit"]);
    expect(typedValue({ name: "s", type: 'enum["a"]', required: true }, "b")).toBeNull();
  });
});
