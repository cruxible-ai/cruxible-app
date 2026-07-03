import type { ReactNode } from "react";

export function Panel({
  title,
  meta,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-md border border-zinc-800 bg-zinc-900/20 p-3">
      <header className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="text-[14px] font-semibold text-zinc-100">{title}</h2>
        {meta && <div className="text-[11px] text-zinc-500">{meta}</div>}
      </header>
      {children}
    </section>
  );
}

export function LoadState({ error }: { error?: unknown }) {
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <div className="py-3 text-[13px] text-red-400">{message}</div>;
  }
  return <div className="py-3 text-[13px] text-zinc-600 animate-pulse">Loading…</div>;
}
