import { Link } from "react-router-dom";
import { useCard, useInstanceId } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import { useAtLink } from "@/lib/at";
import {
  formatRef,
  getRefOf,
  parseCruxibleUrl,
  refKindLabel,
  refName,
  refRoute,
  type ParsedRef,
} from "@/lib/cruxible-ref";

/**
 * Hydrated chip for a cruxible:// ref in agent-authored prose: the agent
 * arranges refs, state renders them. A ref only ever maps to an in-app route
 * and one get read at the page's coordinate; nothing in a ref is executed.
 *
 * The chip's frame is the trust cue separating state-backed elements from
 * author prose: a solid frame = get resolved it at this generation (no dot:
 * nothing is wrong), a dashed frame with a red dot = state does not know this
 * ref, a pulsing dot = hydrating. Authored labels ([label](cruxible://…))
 * are kept; bare refs show the ref's name. Unresolved refs degrade to a
 * non-link chip so broken refs never break the prose flow.
 */

const CHIP_BASE =
  "inline-flex max-w-full items-center gap-1.5 border px-1.5 py-px align-baseline text-[13px] leading-4";
const CHIP_LIVE = `${CHIP_BASE} border-zinc-700 bg-zinc-900/70 text-zinc-200 no-underline hover:border-zinc-500 hover:text-white`;
const CHIP_PENDING = `${CHIP_BASE} border-zinc-800 bg-zinc-900/40 text-zinc-500`;
const CHIP_UNRESOLVED = `${CHIP_BASE} border-dashed border-zinc-700 bg-transparent text-zinc-500`;

const DOT: Record<"pending" | "unresolved", string> = {
  pending: "bg-zinc-600 animate-pulse",
  unresolved: "bg-red-500",
};

function Dot({ state }: { state: keyof typeof DOT }) {
  return <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[state]}`} />;
}

function KindTag({ label }: { label: string }) {
  return <span className="text-[10px] uppercase tracking-wide text-zinc-500">{label}</span>;
}

/**
 * `label` is the author's link text when the ref was written as
 * [label](cruxible://…); undefined for bare refs.
 */
export function CruxibleRefChip({ url, label }: { url: string; label?: string | undefined }) {
  const ref = parseCruxibleUrl(url);
  if (!ref) {
    // Unknown ref form: inert code text, never a link, nothing fetched.
    return (
      <code
        title="Unrecognized cruxible reference"
        className="bg-zinc-900 px-1 font-mono text-[13px] text-zinc-300"
      >
        {url}
      </code>
    );
  }
  return <RefChip refValue={ref} label={label} />;
}

/** A chip for one parsed ref, hydrated through get at the page coordinate. */
export function RefChip({ refValue, label }: { refValue: ParsedRef; label?: string | undefined }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const getRef = getRefOf(refValue);
  // react-query dedupes by key, so N chips for one ref cost one request.
  const read = useCard(getRef);
  const text = label ?? refName(refValue);
  const shown = formatRef(refValue);
  const kindLabel = refKindLabel(refValue);

  if (getRef === null) {
    // Inbox items are not get refs; no screen reads them yet, so the chip is inert.
    return (
      <span className={CHIP_PENDING} title={shown}>
        <KindTag label={kindLabel} />
        <span className="font-mono text-[12px]">{text}</span>
      </span>
    );
  }
  if (read.isPending) {
    return (
      <span className={CHIP_PENDING}>
        <Dot state="pending" />
        <KindTag label={kindLabel} />
        {text}
      </span>
    );
  }
  if (read.error) {
    // Only get's own refusal means "unknown ref"; a refused pin (?at=) or any
    // other failure shows its message.
    const missing =
      read.error instanceof ApiError && read.error.errorCode === "cruxible.get.ref_not_found";
    return (
      <span
        className={CHIP_UNRESOLVED}
        title={`${shown}: ${missing ? "not found in accepted state" : read.error.message}`}
      >
        <Dot state="unresolved" />
        <KindTag label={kindLabel} />
        {text}
      </span>
    );
  }
  const route = refRoute(instanceId, refValue);
  const body = (
    <>
      <KindTag label={kindLabel} />
      <span>{text}</span>
    </>
  );
  return route ? (
    <Link to={link(route)} className={CHIP_LIVE} title={`${shown}: backed by state`}>
      {body}
    </Link>
  ) : (
    <span className={CHIP_LIVE} title={`${shown}: backed by state`}>
      {body}
    </span>
  );
}
