import { ExternalLink } from "lucide-react";
import { RefLink } from "@/components/RefLink";
import type { Part } from "@/lib/step-words";

/** Terse labels (step-words.ts, mandate-words.ts): named things linked, payload names as code, an outside address with ↗, full ids on hover. */
export function Parts({ parts, empty = "—" }: { parts: readonly Part[]; empty?: string }) {
  if (parts.length === 0) return <span className="text-zinc-600">{empty}</span>;
  return (
    <>
      {parts.map((part, i) => {
        const text = part.code ? <code className="font-mono text-[0.95em] text-zinc-200">{part.text}</code> : part.text;
        if (part.ref) {
          return (
            <span key={i} title={part.title}>
              <RefLink value={part.ref}>{text}</RefLink>
            </span>
          );
        }
        if (part.href) {
          return (
            <a key={i} href={part.href} target="_blank" rel="noreferrer" title={part.title} className="inline-flex items-baseline gap-0.5 text-zinc-200 hover:text-white hover:underline">
              {text}
              <ExternalLink className="h-3 w-3 shrink-0 self-center text-zinc-500" aria-hidden />
            </a>
          );
        }
        return (
          <span key={i} title={part.title}>
            {text}
          </span>
        );
      })}
    </>
  );
}
