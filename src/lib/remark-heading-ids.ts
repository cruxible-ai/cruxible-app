/**
 * remark plugin: give every heading a stable id (GitHub-style slug, deduped
 * with -1, -2 …) so a reader can link to a section and a table of contents can
 * jump to it. The id goes on the rendered element through hProperties.
 */

/** Minimal structural mdast view; @types/mdast is a transitive dep pnpm doesn't expose. */
interface MdNode {
  type: string;
  value?: string;
  alt?: string;
  depth?: number;
  children?: MdNode[];
  data?: { hProperties?: Record<string, unknown> };
}

/** A heading's plain text: what a reader sees, without markup. */
function textOf(node: MdNode): string {
  if (typeof node.value === "string") return node.value;
  if (node.type === "image") return node.alt ?? "";
  return (node.children ?? []).map(textOf).join("");
}

/** GitHub-style slug: lowercase, punctuation dropped, spaces to hyphens. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

export function remarkHeadingIds() {
  return (tree: unknown) => {
    const seen = new Map<string, number>();
    const visit = (node: MdNode) => {
      if (node.type === "heading") {
        const base = slugify(textOf(node)) || "section";
        const n = seen.get(base) ?? 0;
        seen.set(base, n + 1);
        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: n === 0 ? base : `${base}-${n}` } };
        return;
      }
      node.children?.forEach(visit);
    };
    visit(tree as MdNode);
  };
}
