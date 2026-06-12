/** IDs, digests, and receipt refs always render monospace. */
export function MonoId({ id, className = "" }: { id: string; className?: string }) {
  return <span className={`font-mono text-[12px] text-zinc-400 ${className}`}>{id}</span>;
}
