import { describe, expect, it } from "vitest";
import { consoleStep, inboxSearch, repairForms } from "./repair-tools.ts";

describe("repair forms", () => {
  it("finds the console step only for reads, from the served operation and arguments", () => {
    expect(consoleStep({ operation: "cruxible.inbox.list", target: "Line:a", arguments: { line: "a", status: "unread" } })).toEqual({ kind: "inbox", line: "a", status: "unread" });
    // no arguments: the Line target, or the whole inbox
    expect(consoleStep({ operation: "cruxible.inbox.list", target: "Line:a" })).toEqual({ kind: "inbox", line: "Line:a", status: null });
    expect(consoleStep({ operation: "cruxible.inbox.list", target: "inbox", arguments: {} })).toEqual({ kind: "inbox", line: null, status: null });
    expect(consoleStep({ operation: "cruxible.get", target: "x", arguments: { ref: "ClaimType:p" } })).toEqual({ kind: "ref", ref: "ClaimType:p" });
    expect(consoleStep({ operation: "cruxible.line.enable", target: "Line:a", arguments: { line: "a" } })).toBeNull();
    expect(consoleStep(null)).toBeNull();
    expect(inboxSearch({ kind: "inbox", line: "Line:a", status: "unread" })).toBe("?line=a&status=unread");
    expect(inboxSearch({ kind: "inbox", line: null, status: null })).toBe("");
  });

  it("prints the served command, else the command path; never SDK code; a hand edit has none", () => {
    expect(repairForms({ operation: "cruxible.line.enable", command: "cruxible line enable a" }, null, "Line:a")).toEqual({ cli: "cruxible line enable a", served: true, mcp: "cruxible_line_enable" });
    expect(repairForms({ operation: "cruxible.inbox.list", command: 'cx.inbox().list(line="a")' }, null, "Line:a")).toEqual({ cli: "cruxible inbox list", served: false, mcp: "cruxible_inbox_list" });
    // withheld: the command path with the row's Line, the requirement's tool
    expect(repairForms(null, { operation: "cruxible.line.enable", tool: "cruxible_line_enable" }, "Line:a")).toEqual({ cli: "cruxible line enable a", served: false, mcp: "cruxible_line_enable" });
    expect(repairForms({ operation: "hand_edit", command: null }, null, "x")).toEqual({ cli: null, served: false, mcp: null });
  });
});
