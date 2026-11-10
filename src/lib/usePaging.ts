import { useCallback, useState } from "react";
import { usePin } from "@/api/hooks";

/**
 * The read a page stack continues: the page coordinate plus whatever names
 * the list (a Query and its parameters, a Line, a Subject). A served cursor
 * continues exactly one read, so a stack is only ever replayed under the
 * scope that served it.
 */
export function usePagingScope(...parts: unknown[]): string {
  const { coordinate } = usePin();
  return JSON.stringify([coordinate?.git_oid ?? null, ...parts]);
}

/**
 * State that belongs to one scope: it reads as `initial` the moment the scope
 * changes (in that same render, so no request goes out with the old value),
 * and a set stores it under the current scope. For cursor stacks: moving to
 * another generation, Query, Line or Subject starts again at the first page
 * instead of sending a cursor the daemon refuses (cursor_mismatch).
 */
export function useScopedState<T>(scope: string, initial: T): [T, (next: T | ((current: T) => T)) => void] {
  const [held, setHeld] = useState<{ scope: string; value: T }>({ scope, value: initial });
  const value = held.scope === scope ? held.value : initial;
  const set = useCallback(
    (next: T | ((current: T) => T)) =>
      setHeld((current) => {
        const base = current.scope === scope ? current.value : initial;
        return { scope, value: typeof next === "function" ? (next as (current: T) => T)(base) : next };
      }),
    // `initial` is a constant per call site ([] for a cursor stack)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scope],
  );
  return [value, set];
}

/** A cursor stack for one pinned list, reset whenever the coordinate or the list's own scope changes. */
export function useCursorStack(...parts: unknown[]): [string[], (next: string[] | ((current: string[]) => string[])) => void] {
  return useScopedState<string[]>(usePagingScope(...parts), EMPTY);
}

const EMPTY: string[] = [];
