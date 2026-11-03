import { RefLink } from "@/components/RefLink";
import type { Phrase } from "@/lib/step-words";

/** A phrase in words (step-words.ts, mandate-words.ts): its named things linked, names from a payload as code, the whole phrase with its raw names on hover. */
export function PhraseText({ phrase, className = "" }: { phrase: Phrase; className?: string }) {
  return (
    <span className={className} title={phrase.title}>
      {phrase.parts.map((part, i) => {
        const text = part.code ? <code className="font-mono text-[0.95em] text-zinc-200">{part.text}</code> : part.text;
        if (!part.ref) return <span key={i} title={part.title}>{text}</span>;
        return (
          <span key={i} title={part.title}>
            <RefLink value={part.ref}>
              <span className="underline decoration-zinc-600 underline-offset-2">{text}</span>
            </RefLink>
          </span>
        );
      })}
    </span>
  );
}
