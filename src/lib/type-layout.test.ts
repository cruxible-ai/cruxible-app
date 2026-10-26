import { describe, expect, it } from "vitest";
import { layoutTypeGraph } from "./type-layout";

const node = (id: string) => ({ id, width: 120, height: 40 });
const edge = (source: string, target: string) => ({ id: `${source}->${target}`, source, target, label: "f" });

describe("type map layout", () => {
  it("lays kinds out left to right along their links, cycles included, unlinked kinds in one column on the left", async () => {
    const layout = await layoutTypeGraph(
      ["job", "workflow", "repo", "assessment", "vulnerability", "lonely", "alone"].map(node),
      [edge("job", "workflow"), edge("workflow", "repo"), edge("assessment", "vulnerability"), edge("repo", "job"), edge("job", "job")],
    );
    const x = (id: string) => layout.positions.get(id)!.x;
    expect(x("assessment")).toBeLessThan(x("vulnerability"));
    expect(new Set([x("job"), x("workflow"), x("repo")]).size).toBe(3); // the cycle still layers
    // unlinked kinds share one column, left of every linked kind, in name order
    expect(x("lonely")).toBe(x("alone"));
    expect(x("alone")).toBeLessThan(Math.min(x("job"), x("assessment")));
    expect(layout.positions.get("alone")!.y).toBeLessThan(layout.positions.get("lonely")!.y);
    // every link between two kinds is routed; a self-reference is left to the canvas
    expect(layout.routes.has("job->workflow")).toBe(true);
    expect(layout.routes.has("job->job")).toBe(false);
  });
});
