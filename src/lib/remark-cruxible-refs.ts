import { CRUXIBLE_REF_RE, CRUXIBLE_SCHEME, trimTrailingPunctuation } from "./cruxible-ref";

/**
 * remark plugin: promote bare cruxible:// refs in prose text to mdast link
 * nodes, so Prose's single `a` renderer hydrates both the bare form and the
 * authored [label](cruxible://…) form. GFM autolink literals only cover
 * http(s)/www/email, so bare refs would otherwise stay plain text.
 *
 * Existing link nodes are not descended into (their labels are author prose),
 * and code/inlineCode carry their text in `value`, not child text nodes — so
 * refs inside backticks stay inert code by construction.
 */

/** Minimal structural mdast view; @types/mdast is a transitive dep pnpm doesn't expose. */
interface MdNode {
  type: string;
  value?: string;
  url?: string;
  children?: MdNode[];
}

export function remarkCruxibleRefs() {
  return (tree: unknown) => walk(tree as MdNode);
}

function walk(node: MdNode): void {
  if (node.type === "link" || node.type === "linkReference" || !node.children) return;
  const out: MdNode[] = [];
  for (const child of node.children) {
    if (child.type === "text" && typeof child.value === "string") {
      out.push(...splitText(child.value));
    } else {
      walk(child);
      out.push(child);
    }
  }
  node.children = out;
}

function splitText(value: string): MdNode[] {
  const nodes: MdNode[] = [];
  let last = 0;
  for (const m of value.matchAll(CRUXIBLE_REF_RE)) {
    const url = trimTrailingPunctuation(m[0]);
    if (url.length <= CRUXIBLE_SCHEME.length) continue; // scheme with no path: leave as text
    if (m.index > last) nodes.push({ type: "text", value: value.slice(last, m.index) });
    nodes.push({ type: "link", url, children: [{ type: "text", value: url }] });
    last = m.index + url.length;
  }
  if (nodes.length === 0) return [{ type: "text", value }];
  if (last < value.length) nodes.push({ type: "text", value: value.slice(last) });
  return nodes;
}
