/**
 * The whole-graph read (orient section=graph) over a generated mid-size
 * security world at the authored coordinate: 640 Subjects in five kinds and
 * their Subject-valued Claims, served in pages of 500 the way the daemon
 * pages it (nodes first, by kind then path; then edges; a cursor per page).
 * Deterministic, so screenshots and tests are stable.
 */
import { defineFixture } from "../fixture";
import { GRAPH_PAGE, orientQuery } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { AT, COORDINATE, NOW } from "./world";

type Node = Schemas["OrientGraphNode"];
type Edge = Schemas["OrientGraphEdge"];

const pad = (n: number, w = 3) => String(n).padStart(w, "0");
const clm = (n: number) => `CLM-${(0x100000 + n).toString(16).padStart(32, "0")}`;

const PRODUCTS = 12;
const RELEASES = 96;
const VULNS = 220;
const ASSESSMENTS = 300;
const TEAMS = 12;

const nodes: Node[] = [];
const add = (kind: string, id: string) => nodes.push({ subject: `${kind}/${id}`, kind });
for (let i = 0; i < ASSESSMENTS; i += 1) add("security.assessment", `a-${pad(i)}`);
for (let i = 0; i < PRODUCTS; i += 1) add("security.product", `p-${pad(i)}`);
for (let i = 0; i < RELEASES; i += 1) add("security.release", `r-${pad(i)}`);
for (let i = 0; i < TEAMS; i += 1) add("security.team", `t-${pad(i)}`);
for (let i = 0; i < VULNS; i += 1) add("security.vulnerability", `cve-2026-${pad(i, 4)}`);

const edges: Edge[] = [];
let n = 0;
const link = (source: string, predicate: string, target: string) =>
  edges.push({ claim: clm((n += 1)), source, predicate, target });
for (let i = 0; i < RELEASES; i += 1) {
  link(`security.release/r-${pad(i)}`, "security.release.product", `security.product/p-${pad(i % PRODUCTS)}`);
}
for (let i = 0; i < PRODUCTS; i += 1) {
  link(`security.product/p-${pad(i)}`, "security.product.owner", `security.team/t-${pad(i % TEAMS)}`);
}
for (let i = 0; i < ASSESSMENTS; i += 1) {
  const a = `security.assessment/a-${pad(i)}`;
  link(a, "security.assessment.release", `security.release/r-${pad((i * 7) % RELEASES)}`);
  link(a, "security.assessment.vulnerability", `security.vulnerability/cve-2026-${pad((i * 13) % VULNS, 4)}`);
}
for (let i = 0; i < VULNS; i += 9) {
  link(
    `security.vulnerability/cve-2026-${pad(i, 4)}`,
    "security.vulnerability.related",
    `security.vulnerability/cve-2026-${pad((i + 17) % VULNS, 4)}`,
  );
}

export const AUTHORED_GRAPH = { nodes, edges };

const items: ({ node: Node } | { edge: Edge })[] = [...nodes.map((node) => ({ node })), ...edges.map((edge) => ({ edge }))];

function page(index: number) {
  const slice = items.slice(index * GRAPH_PAGE, (index + 1) * GRAPH_PAGE);
  const more = (index + 1) * GRAPH_PAGE < items.length;
  return defineFixture({
    method: "get",
    path: "/api/v1/{instance_id}/orient",
    query: orientQuery({
      coordinate: COORDINATE,
      section: "graph",
      limit: GRAPH_PAGE,
      ...(index > 0 ? { cursor: `graph-${index}` } : {}),
    }),
    response: {
      tag: "playbill-orient-v1",
      instance: "inst_fixture",
      coordinate: COORDINATE,
      generation: AT.generation,
      accepted_at: "2026-10-19T09:30:00Z",
      evaluation_time: NOW,
      section: "graph",
      graph: {
        nodes: slice.flatMap((item) => ("node" in item ? [item.node] : [])),
        edges: slice.flatMap((item) => ("edge" in item ? [item.edge] : [])),
        totals: { subjects: nodes.length },
      },
      truncated: more,
      next_cursor: more ? `graph-${index + 1}` : null,
    },
  });
}

export default Array.from({ length: Math.ceil(items.length / GRAPH_PAGE) }, (_, i) => page(i));
