import { formatRef, parseRef } from "@/lib/cruxible-ref";
import { claimObjectValue, isClaimObject, noneOf, slotParts } from "@/lib/claim-value";
import { RefLink } from "./RefLink";


function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** How a Subject value reads: its full ref, or its id alone (a side panel; the full ref on hover). */
export type SubjectLabel = "ref" | "id";

/** A Subject value, linked to its page. */
function SubjectValue({ value, label }: { value: string; label: SubjectLabel }) {
  const ref = parseRef(value);
  if (label === "id" && ref?.kind === "subject") {
    return (
      <span title={formatRef(ref)}>
        <RefLink value={value}>
          <span className="break-all font-mono">{ref.subjectId}</span>
        </RefLink>
      </span>
    );
  }
  return <RefLink value={value} />;
}

/** A none: `none` for a whole slot, `none of <unit>` for one unit (a Subject linked). */
function NoneValue({ of, subject }: { of: unknown; subject: SubjectLabel }) {
  if (of === null || of === undefined) return <span className="text-zinc-500">none</span>;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1">
      <span className="text-zinc-500">none of</span>
      <ShownValue value={of} subject={subject} />
    </span>
  );
}

/**
 * A Claim value as get shows it: scalars, a Subject (linked), a none (an
 * inverse Claim's object: `none of <unit>`), a truncated text preview, an
 * exact-content digest, a structured object, or a list of those (a
 * many-cardinality slot, or a contested one).
 */
export function ShownValue({ value, subject = "ref" }: { value: unknown; subject?: SubjectLabel }) {
  if (value === null || value === undefined) return <span className="text-zinc-600">null</span>;
  if (typeof value === "string") {
    return parseRef(value)?.kind === "subject" ? (
      <SubjectValue value={value} label={subject} />
    ) : (
      <span className="break-words">{value}</span>
    );
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <span className="font-mono">{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    return (
      <span className="flex flex-wrap gap-x-2 gap-y-0.5">
        {value.map((item, i) => (
          <span key={i}>
            <ShownValue value={item} subject={subject} />
          </span>
        ))}
      </span>
    );
  }
  if (isRecord(value)) {
    const none = noneOf(value);
    if (none) return <NoneValue of={none.of} subject={subject} />;
    if (value.truncated === true && typeof value.preview === "string") {
      return (
        <span className="break-words" title={`${String(value.length)} characters; the evidence read shows it whole`}>
          {value.preview}
          <span className="text-zinc-600">… ({String(value.length)} chars)</span>
        </span>
      );
    }
    if (typeof value.exact_content === "string" && typeof value.content_digest === "string") {
      return (
        <span className="font-mono text-[12px] text-zinc-400" title={value.content_digest}>
          {value.exact_content} content {value.content_digest.slice(0, 19)}…
        </span>
      );
    }
    // A typed Claim object (a Subject by its address, a literal), bare or as a Claim card wraps it.
    const object = isRecord(value.object) ? value.object : value;
    if (isClaimObject(object)) return <ShownValue value={claimObjectValue(object)} subject={subject} />;
    if (object !== value) {
      return <code className="font-mono text-[12px] text-zinc-400">{JSON.stringify(object)}</code>;
    }
  }
  return <code className="font-mono text-[12px] text-zinc-400">{JSON.stringify(value)}</code>;
}

/**
 * A Subject card slot's answer: each value it holds, then each live none
 * (`none of <unit>`, or `none` for the whole slot). Falls back to the bare
 * value when the slot holds nothing and no none says so.
 */
export function ShownSlot({
  value,
  nones,
  subject = "ref",
}: {
  value: unknown;
  nones?: readonly { of?: unknown }[] | undefined;
  subject?: SubjectLabel;
}) {
  const parts = slotParts(value, nones);
  if (parts.length === 0 || (parts.length === 1 && parts[0]!.kind === "value")) return <ShownValue value={value} subject={subject} />;
  return (
    <span className="flex flex-wrap gap-x-2 gap-y-0.5">
      {parts.map((part, i) => (
        <span key={i}>
          {part.kind === "value" ? <ShownValue value={part.value} subject={subject} /> : <NoneValue of={part.of} subject={subject} />}
        </span>
      ))}
    </span>
  );
}
