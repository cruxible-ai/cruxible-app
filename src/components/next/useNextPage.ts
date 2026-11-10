import { useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { useCursorStack } from "@/lib/usePaging";

/**
 * One `next` page at a time with a cursor stack (Newer/Older). `next` has no
 * server-side filter (gap G7), so screens filter the page in hand: a load is
 * one page of at most NEXT_PAGE items, never the whole queue.
 */
export function useNextPage() {
  const [cursors, setCursors] = useCursorStack("next");
  const cursor = cursors[cursors.length - 1];
  const page = useNext({ limit: NEXT_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
  return {
    page,
    index: cursors.length,
    older: page.data?.next_cursor
      ? () => setCursors((stack) => [...stack, page.data!.next_cursor!])
      : null,
    newer: cursors.length > 0 ? () => setCursors((stack) => stack.slice(0, -1)) : null,
  };
}
