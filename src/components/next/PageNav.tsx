import { NEXT_PAGE } from "@/api/requests";

export function PageNav({
  index,
  total,
  newer,
  older,
}: {
  index: number;
  total: number | undefined;
  newer: (() => void) | null;
  older: (() => void) | null;
}) {
  const pages = total === undefined ? null : Math.max(1, Math.ceil(total / NEXT_PAGE));
  return (
    <span className="flex items-baseline gap-2 text-[12px] text-zinc-500">
      {newer && (
        <button onClick={newer} className="hover:text-zinc-200">
          ← Previous page
        </button>
      )}
      <span>
        Page {index + 1}
        {pages !== null && ` of ${pages}`}
      </span>
      {older && (
        <button onClick={older} className="hover:text-zinc-200">
          Next page →
        </button>
      )}
    </span>
  );
}
