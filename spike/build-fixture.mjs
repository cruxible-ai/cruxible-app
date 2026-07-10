// Merge the raw API dumps into compact spike fixtures:
//   kev.json    — real KEV demo graph (~5k nodes / ~14k edges)
//   kev30k.json — the same graph replicated 6x (distinct id namespaces) for
//                 30k-scale stress runs without hammering the demo daemon.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const dir = path.join(import.meta.dirname, "fixtures");

const TYPE_PALETTE = [
  "#38bdf8", "#fbbf24", "#34d399", "#fb7185", "#a78bfa", "#fb923c",
  "#2dd4bf", "#e879f9", "#a3e635", "#818cf8", "#f472b6", "#22d3ee",
];

const nodes = [];
const types = [];
for (const f of readdirSync(dir).filter((f) => f.startsWith("ent_"))) {
  const { items } = JSON.parse(readFileSync(path.join(dir, f), "utf8"));
  for (const e of items) {
    nodes.push({
      id: `${e.entity_type}:${e.entity_id}`,
      type: e.entity_type,
      title:
        typeof e.properties?.title === "string"
          ? e.properties.title
          : typeof e.properties?.name === "string"
            ? e.properties.name
            : (e.properties?.product_name ?? e.properties?.vendor_name ?? e.entity_id),
    });
    if (!types.includes(e.entity_type)) types.push(e.entity_type);
  }
}
types.sort();
const colorFor = Object.fromEntries(types.map((t, i) => [t, TYPE_PALETTE[i % TYPE_PALETTE.length]]));
for (const n of nodes) n.color = colorFor[n.type];

const { items: edgeItems } = JSON.parse(readFileSync(path.join(dir, "edges.json"), "utf8"));
const present = new Set(nodes.map((n) => n.id));
const edges = [];
for (const e of edgeItems) {
  const source = `${e.from_type}:${e.from_id}`;
  const target = `${e.to_type}:${e.to_id}`;
  if (!present.has(source) || !present.has(target)) continue;
  edges.push({
    source,
    target,
    rel: e.relationship_type,
    review: e.metadata?.assertion?.review?.status ?? null,
    lifecycle: e.metadata?.assertion?.lifecycle?.status ?? null,
  });
}

writeFileSync(path.join(dir, "kev.json"), JSON.stringify({ nodes, edges }));
console.log(`kev.json: ${nodes.length} nodes, ${edges.length} edges`);

// 6x replication → ~31k nodes / ~83k edges. Copies are disjoint id spaces so
// the layout produces 6 similar galaxies — a fair stress shape.
const REP = 6;
const bigNodes = [];
const bigEdges = [];
for (let k = 0; k < REP; k++) {
  for (const n of nodes) bigNodes.push({ ...n, id: `${k}|${n.id}` });
  for (const e of edges) bigEdges.push({ ...e, source: `${k}|${e.source}`, target: `${k}|${e.target}` });
}
writeFileSync(path.join(dir, "kev30k.json"), JSON.stringify({ nodes: bigNodes, edges: bigEdges }));
console.log(`kev30k.json: ${bigNodes.length} nodes, ${bigEdges.length} edges`);
