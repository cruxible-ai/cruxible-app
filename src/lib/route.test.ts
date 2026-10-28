import { describe, expect, it } from "vitest";
import { placeLabels, pointAlong } from "./route";

describe("edge labels", () => {
  it("sit at a fraction of the drawn length", () => {
    expect(pointAlong([{ x: 0, y: 0 }, { x: 100, y: 0 }], false, 0.5)).toEqual({ x: 50, y: 0 });
    expect(pointAlong([{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }], false, 0.75)).toEqual({ x: 100, y: 50 });
  });

  it("slide along their own edge rather than cover another label", () => {
    // two parallel edges 6px apart: their middles collide, so the shorter label moves along its edge
    const a = { id: "a", points: [{ x: 0, y: 0 }, { x: 400, y: 0 }], curve: false, width: 80, height: 14 };
    const b = { id: "b", points: [{ x: 0, y: 6 }, { x: 400, y: 6 }], curve: false, width: 60, height: 14 };
    const at = placeLabels([a, b], []);
    expect(at.get("a")).toEqual({ x: 200, y: 0 });
    const moved = at.get("b")!;
    expect(moved.y).toBe(6);
    expect(Math.abs(moved.x - 200)).toBeGreaterThanOrEqual(70);
  });

  it("avoid nodes; step just off the edge when the edge itself is crowded; cover least when nowhere is free", () => {
    const edge = { id: "e", points: [{ x: 0, y: 0 }, { x: 100, y: 0 }], curve: false, width: 20, height: 10 };
    const node = { x: 30, y: -20, width: 40, height: 40 };
    expect(Math.abs(placeLabels([edge], [node]).get("e")!.x - 50)).toBeGreaterThan(20);
    // a band covering the edge's whole length: the label steps above or below it
    const band = { x: -10, y: -3, width: 120, height: 6 };
    expect(Math.abs(placeLabels([edge], [band]).get("e")!.y)).toBe(8);
    const wall = { x: -50, y: -50, width: 200, height: 100 };
    expect(placeLabels([edge], [wall]).get("e")).toEqual({ x: 50, y: 0 });
  });
});
