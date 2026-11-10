/** `cruxible console` holds no session for this browser: say how to get one. */
export function SignedOut() {
  return (
    <div className="p-8 text-[14px] text-zinc-400">
      Open the link <code className="font-mono">cruxible console</code> printed; it signs this browser in for this run.
    </div>
  );
}
