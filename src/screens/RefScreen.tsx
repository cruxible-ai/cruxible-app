import { useParams } from "react-router-dom";
import { useGet } from "@/api/hooks";
import { Panel, LoadState } from "@/components/Panel";
import { Chip } from "@/components/Chip";
import { RefLink } from "@/components/RefLink";
import { formatRef, getRefOf, parseRef, refKindLabel } from "@/lib/cruxible-ref";
import { formatDateTime, humanize, looksLikeDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * The reference card: one get (summary) of any ref at the page coordinate,
 * rendered field by field from the card the daemon returns. Kinds with a
 * dedicated screen route there instead (ClaimTypes and SubjectKinds open on
 * the type map); this is the shared view for everything else.
 */
export function RefScreen() {
  const { ref: raw = "" } = useParams();
  const ref = parseRef(raw);
  const getRef = ref ? getRefOf(ref) : null;
  const read = useGet(getRef);
  usePageTitle(ref ? formatRef(ref) : raw);

  if (!ref || getRef === null) {
    return (
      <div className="text-[14px] text-zinc-400">
        <code className="font-mono text-zinc-300">{raw}</code> is not a reference get resolves.
      </div>
    );
  }
  return (
    <div className="max-w-5xl">
      <header className="mb-4">
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">{refKindLabel(ref)}</div>
        <h1 className="break-all font-mono text-[16px] font-semibold text-zinc-100">
          {read.data?.ref ?? formatRef(ref)}
        </h1>
        {read.data && (
          <div className="mt-1 flex flex-wrap gap-x-4 text-[12px] text-zinc-500">
            <span>{humanize(read.data.kind)}</span>
            <span>
              generation <span className="font-mono">{read.data.coordinate.generation}</span>
            </span>
            <span className="font-mono">{read.data.coordinate.git_oid}</span>
            <span title={read.data.evaluation_time}>
              evaluated {formatDateTime(read.data.evaluation_time)}
            </span>
          </div>
        )}
      </header>
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {read.data?.card && (
        <Panel title="Card">
          <Fields value={read.data.card as Record<string, unknown>} depth={0} />
        </Panel>
      )}
    </div>
  );
}

const MAX_DEPTH = 3;

function Fields({ value, depth }: { value: Record<string, unknown>; depth: number }) {
  const entries = Object.entries(value).filter(([, v]) => v !== null && v !== undefined);
  return (
    <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 text-[13px]">
      {entries.map(([key, v]) => (
        <div key={key} className="contents">
          <dt className="text-zinc-500">{humanize(key)}</dt>
          <dd className="min-w-0 break-words text-zinc-300">
            <Value value={v} depth={depth + 1} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function Value({ value, depth }: { value: unknown; depth: number }) {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") {
    if (looksLikeDateTime(value)) return <span title={value}>{formatDateTime(value)}</span>;
    // Digests (sha256:…) also parse as proposal ids; only link the other refs.
    const ref = parseRef(value);
    return ref && ref.kind !== "proposal" ? <RefLink value={value} /> : <span>{value}</span>;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <span className="font-mono">{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-zinc-600">none</span>;
    if (value.every(isRecord) && depth <= MAX_DEPTH) return <RecordTable rows={value} depth={depth} />;
    return (
      <span className="flex flex-wrap gap-x-2 gap-y-0.5">
        {value.map((item, i) => (
          <span key={i}>
            <Value value={item} depth={depth + 1} />
          </span>
        ))}
      </span>
    );
  }
  if (isRecord(value)) {
    return depth <= MAX_DEPTH ? (
      <Fields value={value} depth={depth} />
    ) : (
      <code className="font-mono text-[12px] text-zinc-400">{JSON.stringify(value)}</code>
    );
  }
  return <span className="text-zinc-600">{String(value)}</span>;
}

/** An array of records as a table over the union of their keys. */
function RecordTable({ rows, depth }: { rows: Record<string, unknown>[]; depth: number }) {
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[12px]">
        <thead className="text-zinc-500">
          <tr>
            {columns.map((column) => (
              <th key={column} className="py-0.5 pr-3 font-medium">
                {humanize(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-zinc-900 align-top">
              {columns.map((column) => (
                <td key={column} className="py-0.5 pr-3">
                  {column === "flags" && Array.isArray(row[column]) ? (
                    <span className="flex flex-wrap gap-1.5">
                      {(row[column] as string[]).map((flag) => (
                        <Chip key={flag} value={flag} />
                      ))}
                    </span>
                  ) : (
                    <Value value={row[column]} depth={depth + 1} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
