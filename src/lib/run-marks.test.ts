import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import { runMarks } from "./run-marks";

type Card = Schemas["GetProcedureRunCard"];
type State = Schemas["ProcedureRunState"];

const card = (extra: Partial<Card>): Card => ({
  run: "run-1",
  procedure: "Procedure:security.kev-triage",
  status: "succeeded",
  nodes_done: 0,
  nodes_total: 6,
  started_at: "2026-10-18T06:00:04Z",
  ...extra,
});

const IDS = ["catalog", "watched", "parse", "changed", "settle", "summary", "nochange"];
const bySource = (name: string) => (name === "catalog" ? "catalog" : null);

describe("run marks", () => {
  it("marks each step with its verdict, the refusal in red at the node that refused, and the steps that never ran", () => {
    const { marks, others } = runMarks(
      IDS,
      card({
        status: "node_refused",
        nodes_done: 4,
        nodes: [
          { node: "catalog", kind: "source", verdict: "succeeded", sequence: 1 },
          { node: "watched", kind: "state_tap", verdict: "succeeded", sequence: 2 },
          { node: "parse", kind: "call", verdict: "succeeded", sequence: 3 },
          { node: "changed", kind: "guard", verdict: "refused", sequence: 4 },
        ],
        terminal: {
          tag: "playbill-procedure-node-refusal-v1",
          classification: "node_refusal",
          code: "guard_refused",
          message: "refused",
          node_id: "changed",
        } as NonNullable<Card["terminal"]>,
      }),
      null,
      bySource,
    );
    expect(marks.get("catalog")!.term.word).toBe("Succeeded");
    expect(marks.get("changed")).toMatchObject({ term: { word: "Refused", signal: "wrong" }, notes: ["guard_refused"] });
    expect(marks.get("settle")!.term).toMatchObject({ word: "Not run" });
    expect(marks.get("settle")!.term.signal).toBeUndefined();
    expect(others).toEqual([]);
  });

  it("fills the card's latest few nodes from the journal, adds the egress and the receipt's pinned builds, and lists compiled nodes apart", () => {
    const state = {
      outcomes: [
        { event_kind: "node_fired", node_id: "catalog", sequence: 3 },
        { event_kind: "node_fired", node_id: "project_1", sequence: 5 },
        { event_kind: "attempt_finalized", sequence: 9 },
      ],
      source_observations: [{ occurrence_path: "captures/x.json", node_id: "catalog" }],
      receipt: {
        node_pin_sets: [
          { node_id: "parse", pins: [{ role: "provider", target: { kind: "Provider", name: "security-analysis-provider/abc" } }] },
          { node_id: "catalog", pins: [{ role: "capture-contract", target: { kind: "CaptureContract", name: "c" } }] },
        ],
      },
    } as unknown as State;
    const { marks, others, partial } = runMarks(
      IDS,
      card({
        nodes_done: 6,
        nodes: [
          { node: "parse", kind: "call", verdict: "succeeded", sequence: 7 },
          { node: "settle", kind: "settle_change_set", verdict: "succeeded", sequence: 50 },
        ],
        terminal_egress: [
          { node_id: "settle", kind: "settle_change_set", verdict: "delivered", required_authority: "settle", effective_authority: "propose" } as Schemas["ProcedureTerminalEgress"],
        ],
      }),
      state,
      bySource,
    );
    expect(partial).toBe(true);
    expect(marks.get("catalog")).toMatchObject({ term: { word: "Ran" }, notes: ["read 1 Capture"], provider: null });
    expect(marks.get("parse")).toMatchObject({ term: { word: "Succeeded" }, provider: "security-analysis-provider/abc" });
    expect(marks.get("settle")).toMatchObject({ term: { word: "Succeeded" }, notes: ["delivered"], hints: ["Delivered: needs settle, had propose"] });
    expect(others.map((o) => `${o.node} ${o.term.word}`)).toEqual(["project_1 Ran"]);
    expect(marks.has("project_1")).toBe(false);
  });

  it("marks a step waiting on its input amber and leaves unreached steps unmarked while the run runs", () => {
    const { marks } = runMarks(
      IDS,
      card({ status: "running", pending_inputs: [{ name: "catalog", waiting_since: "2026-10-18T06:00:05Z" }] }),
      null,
      bySource,
    );
    expect(marks.get("catalog")).toMatchObject({ term: { word: "Waiting on input", signal: "waiting" }, notes: ["input catalog"] });
    expect(marks.has("settle")).toBe(false);
  });
});
