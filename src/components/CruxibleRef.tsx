import { Link } from "react-router-dom";
import { useInspectEntity, useInstanceId, useQueryCatalog } from "@/api/hooks";
import { entityPath } from "./EntityLink";
import { humanize } from "@/lib/text";
import { parseCruxibleRef } from "@/lib/cruxible-ref";

/**
 * Hydrated chip for a cruxible:// ref in agent-authored prose — the briefing
 * primitive: the agent arranges refs, state renders them. Refs only ever map
 * to in-app routes and the existing read hooks; nothing in a ref is executed.
 *
 * The dot is the TRUST cue separating state-backed elements from author
 * prose: emerald = confirmed against state, amber = state does not know this
 * ref, pulsing zinc = hydrating. Authored labels ([label](cruxible://…)) are
 * kept; bare refs show the hydrated title. Unresolved refs degrade to a
 * non-link chip so broken refs never break the prose flow.
 */

const CHIP_BASE =
  "inline-flex max-w-full items-center gap-1.5 rounded border px-1.5 py-px align-baseline text-[13px] leading-4";
const CHIP_LIVE = `${CHIP_BASE} border-zinc-700 bg-zinc-900/70 text-zinc-200 no-underline hover:border-zinc-500 hover:text-white`;
const CHIP_PENDING = `${CHIP_BASE} border-zinc-800 bg-zinc-900/40 text-zinc-500`;
const CHIP_UNRESOLVED = `${CHIP_BASE} border-dashed border-zinc-700 bg-transparent text-zinc-500`;

const DOT: Record<"live" | "pending" | "unresolved", string> = {
  live: "bg-emerald-500",
  pending: "bg-zinc-600 animate-pulse",
  unresolved: "bg-amber-500",
};

function Dot({ state }: { state: keyof typeof DOT }) {
  return <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[state]}`} />;
}

function TypeTag({ entityType }: { entityType: string }) {
  return (
    <span className="text-[10px] uppercase tracking-wide text-zinc-500">
      {humanize(entityType)}
    </span>
  );
}

/**
 * `label` is the author's link text when the ref was written as
 * [label](cruxible://…); undefined for bare refs (hydrated title shown).
 */
export function CruxibleRefChip({ url, label }: { url: string; label?: string | undefined }) {
  const ref = parseCruxibleRef(url);
  if (!ref) {
    // Unknown ref form: inert code text, never a link, nothing fetched.
    return (
      <code
        title="Unrecognized cruxible reference"
        className="rounded bg-zinc-900 px-1 font-mono text-[13px] text-zinc-300"
      >
        {url}
      </code>
    );
  }
  switch (ref.kind) {
    case "entity":
      return <EntityRefChip entityType={ref.entityType} entityId={ref.entityId} label={label} />;
    case "query":
      return <QueryRefChip queryName={ref.queryName} label={label} />;
    case "receipt":
      return <ReceiptRefChip receiptId={ref.receiptId} label={label} />;
  }
}

function EntityRefChip({
  entityType,
  entityId,
  label,
}: {
  entityType: string;
  entityId: string;
  label?: string | undefined;
}) {
  const instanceId = useInstanceId();
  // react-query dedupes by key, so N chips for one ref cost one request.
  const inspect = useInspectEntity(entityType, entityId);

  if (inspect.isPending) {
    return (
      <span className={CHIP_PENDING}>
        <Dot state="pending" />
        <TypeTag entityType={entityType} />
        {label ?? entityId}
      </span>
    );
  }
  const data = inspect.data as
    | { found?: boolean; properties?: Record<string, unknown> }
    | undefined;
  if (inspect.error || data?.found === false) {
    return (
      <span className={CHIP_UNRESOLVED} title={`${entityType}/${entityId} — not found in state`}>
        <Dot state="unresolved" />
        <TypeTag entityType={entityType} />
        {label ?? entityId}
      </span>
    );
  }
  const props = data?.properties ?? {};
  const title =
    typeof props.title === "string"
      ? props.title
      : typeof props.name === "string"
        ? props.name
        : entityId;
  return (
    <Link
      to={entityPath(instanceId, entityType, entityId)}
      className={CHIP_LIVE}
      title={`${entityType}/${entityId} — backed by state`}
    >
      <Dot state="live" />
      <TypeTag entityType={entityType} />
      <span>{label ?? title}</span>
    </Link>
  );
}

function QueryRefChip({ queryName, label }: { queryName: string; label?: string | undefined }) {
  const instanceId = useInstanceId();
  const catalog = useQueryCatalog();
  const text = label ?? humanize(queryName);

  if (catalog.isPending) {
    return (
      <span className={CHIP_PENDING}>
        <Dot state="pending" />
        {text}
      </span>
    );
  }
  const known = (catalog.data?.items ?? []).some((q) => q.name === queryName);
  if (catalog.error || !known) {
    return (
      <span className={CHIP_UNRESOLVED} title={`query ${queryName} — not in the catalog`}>
        <Dot state="unresolved" />
        {text}
      </span>
    );
  }
  return (
    <Link
      to={`/i/${instanceId}/views/${encodeURIComponent(queryName)}`}
      className={CHIP_LIVE}
      title={`query ${queryName} — backed by state`}
    >
      <Dot state="live" />
      {text}
    </Link>
  );
}

function ReceiptRefChip({ receiptId, label }: { receiptId: string; label?: string | undefined }) {
  const instanceId = useInstanceId();
  // No hydration fetch: the receipt screen itself is the verification
  // surface, so the chip only needs to route there.
  return (
    <Link
      to={`/i/${instanceId}/receipts/${encodeURIComponent(receiptId)}`}
      className={`${CHIP_LIVE} font-mono text-[12px]`}
      title={`receipt ${receiptId}`}
    >
      <Dot state="live" />
      {label ?? receiptId}
    </Link>
  );
}
