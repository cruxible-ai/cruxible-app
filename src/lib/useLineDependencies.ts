import { useMemo } from "react";
import { useGetBatch, useSourceModel, useSubjectKinds } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import type { LineDefinition, ProcedureSpec } from "@/lib/definitions";
import { lineDependencies, queriesRead, type LineDependency } from "@/lib/line-dependencies";

type KindRow = { kind: string; keys?: string[] | undefined };

/**
 * The Line dependencies (line-dependencies.ts) from a source model already
 * read: one get-batch of the Query cards the Lines' read steps name, and the
 * SubjectKinds' identity keys. Null while those load; [] when they fail (no
 * links rather than wrong ones).
 */
export function useDependenciesOf(
  source: { specs: ReadonlyMap<string, ProcedureSpec>; lines: readonly LineDefinition[] } | undefined,
  kinds: readonly KindRow[] | undefined,
): LineDependency[] | null {
  const names = useMemo(() => (source ? queriesRead(source.specs, source.lines) : []), [source]);
  const reads = useGetBatch(names.map((name) => `QueryDefinition:${name}`));
  return useMemo(() => {
    if (!source || !kinds) return null;
    if (reads.isPending) return null;
    if (reads.error) return [];
    const queries = new Map<string, unknown>();
    names.forEach((name, i) => {
      const definition = cardOf(reads.results[i], "query")?.definition;
      if (definition) queries.set(name, definition);
    });
    const keys = new Map(kinds.flatMap((row) => (row.keys ?? []).map((key) => [key, row.kind] as const)));
    return lineDependencies({ specs: source.specs, lines: source.lines, queries, keys });
  }, [source, kinds, names, reads.isPending, reads.error, reads.results]);
}

/** Every Line dependency, read on its own (the Line page): the source model, the SubjectKinds, the Query cards. */
export function useLineDependencies(enabled = true): LineDependency[] | null {
  const source = useSourceModel(enabled);
  const kinds = useSubjectKinds(enabled);
  return useDependenciesOf(source.error ? undefined : source.data, kinds.data?.rows);
}
