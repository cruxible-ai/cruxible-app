// Precompute deterministic d3-force positions (same params as the app's
// forceLayout) and embed them in the spike fixtures, so both render harnesses
// draw the identical picture. Also times the layout — the number that decides
// whether a worker is mandatory.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3-force";

const dir = path.join(import.meta.dirname, "fixtures");

function layout(nodes, edges, ticks) {
  const simNodes = nodes.map((n) => ({ id: n.id }));
  const simLinks = edges.map((e) => ({ source: e.source, target: e.target }));
  const sim = forceSimulation(simNodes)
    .force("charge", forceManyBody().strength(-45).distanceMax(600))
    .force("link", forceLink(simLinks).id((d) => d.id).distance(55).strength(0.4))
    .force("x", forceX(0).strength(0.06))
    .force("y", forceY(0).strength(0.06))
    .force("collide", forceCollide(10))
    .stop();
  for (let i = 0; i < ticks; i++) sim.tick();
  return new Map(simNodes.map((n) => [n.id, [n.x, n.y]]));
}

const kev = JSON.parse(readFileSync(path.join(dir, "kev.json"), "utf8"));
let t0 = performance.now();
const pos = layout(kev.nodes, kev.edges, 90);
console.log(`kev (${kev.nodes.length}n/${kev.edges.length}e, 90 ticks): ${Math.round(performance.now() - t0)}ms`);
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const n of kev.nodes) {
  const [x, y] = pos.get(n.id);
  n.x = x; n.y = y;
  if (x < minX) minX = x; if (x > maxX) maxX = x;
  if (y < minY) minY = y; if (y > maxY) maxY = y;
}
writeFileSync(path.join(dir, "kev.json"), JSON.stringify(kev));

// 30k = 6 translated copies of the 5k layout (3x2 grid) — deterministic and
// instant; the render harness only cares about point/line counts on screen.
const big = JSON.parse(readFileSync(path.join(dir, "kev30k.json"), "utf8"));
const w = (maxX - minX) * 1.15;
const h = (maxY - minY) * 1.15;
for (const n of big.nodes) {
  const [k, id] = [n.id.slice(0, n.id.indexOf("|")), n.id.slice(n.id.indexOf("|") + 1)];
  const [x, y] = pos.get(id);
  n.x = x + (Number(k) % 3) * w;
  n.y = y + Math.floor(Number(k) / 3) * h;
}
writeFileSync(path.join(dir, "kev30k.json"), JSON.stringify(big));
console.log("positions embedded");
