import { useParams } from "react-router-dom";
import { useCard } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { ProcedureDefinition, TriggerDefinition } from "@/components/ontology/Definitions";
import { Disclosure, Panel, LoadState } from "@/components/Panel";
import { Fact, Page, PageHeader } from "@/components/Page";
import { ShortId, shortId } from "@/components/ShortId";
import { Chip } from "@/components/Chip";
import { RefLink } from "@/components/RefLink";
import { formatRef, getRefOf, parseRef, refKindLabel } from "@/lib/cruxible-ref";
import { formatDateTime, humanize, looksLikeDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * The reference card: one get (summary) of any ref at the page coordinate,
 * rendered field by field from the card the daemon returns. Kinds with a
 * dedicated screen route there instead (ClaimTypes and SubjectKinds open on
 * the type map); this is the shared view for everything else. A Procedure
 * leads with its authored definition (slots, steps and what each names) and a
 * Trigger with its schedule (contract, logical sources, the Line it starts);
 * the rest of their card follows field by field.
 */
export function RefScreen() {
  const { ref: raw = "" } = useParams();
  const ref = parseRef(raw);
  const getRef = ref ? getRefOf(ref) : null;
  const read = useCard(getRef);
  usePageTitle(ref ? formatRef(ref) : raw);

  if (!ref || getRef === null) {
    return (
      <div className="text-[14px] text-zinc-400">
        <code className="font-mono text-zinc-300">{raw}</code> is not a reference get resolves.
      </div>
    );
  }
  const full = read.data?.ref ?? formatRef(ref);
  const procedure = cardOf(read.data, "procedure");
  const trigger = cardOf(read.data, "trigger");
  // ids that fit stay whole; digests and run ids shorten, whole underneath with copy
  const long = full.length > 40;
  return (
    <Page>
      <PageHeader
        kind={refKindLabel(ref)}
        title={<span title={full}>{long ? shortId(full, 16) : full}</span>}
        mono
        id={long ? <ShortId value={full} keep={128} className="text-zinc-500" /> : undefined}
        facts={
          read.data && (
            <>
              <Fact label="Kind">{humanize(read.data.kind)}</Fact>
              <Fact label="Generation">
                <span className="font-mono">{read.data.coordinate.generation}</span>
              </Fact>
              <Fact label="Commit">
                <ShortId value={read.data.coordinate.git_oid} className="text-zinc-200" />
              </Fact>
              <Fact label="Evaluated" title={read.data.evaluation_time}>
                {formatDateTime(read.data.evaluation_time)}
              </Fact>
            </>
          )
        }
      />
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {procedure?.authored && <ProcedureDefinition spec={procedure.authored} />}
      {trigger && <TriggerDefinition schedule={trigger.schedule} target={trigger.target} />}
      {read.data?.card && (
        <Panel title="Card">
          <Fields value={rest(read.data.card as Record<string, unknown>, procedure?.authored ? ["authored"] : [])} depth={0} />
        </Panel>
      )}
    </Page>
  );
}

const MAX_DEPTH = 3;

/** A card without the fields a dedicated panel already shows. */
function rest(card: Record<string, unknown>, omit: readonly string[]): Record<string, unknown> {
  return Object.fromEntries(Object.entries(card).filter(([key]) => !omit.includes(key)));
}

function Fields({ value, depth }: { value: Record<string, unknown>; depth: number }) {
  const entries = Object.entries(value).filter(([, v]) => v !== null && v !== undefined);
  return (
    <dl className="grid grid-cols-[minmax(7rem,max-content)_minmax(0,1fr)] gap-x-6 gap-y-2 text-[13px] leading-5">
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
    return <ValueList items={value} depth={depth} />;
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

const LIST_HEAD = 6;

/** A list of scalars or refs, one per line; past six, the rest behind a disclosure. */
function ValueList({ items, depth }: { items: unknown[]; depth: number }) {
  const render = (list: unknown[], offset: number) =>
    list.map((item, i) => (
      <div key={offset + i} className="min-w-0 break-all">
        <Value value={item} depth={depth + 1} />
      </div>
    ));
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-x-6 gap-y-0.5">
      {render(items.slice(0, LIST_HEAD), 0)}
      {items.length > LIST_HEAD && (
        <Disclosure label={`${items.length - LIST_HEAD} more`} className="col-span-full">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-x-6 gap-y-0.5">
            {render(items.slice(LIST_HEAD), LIST_HEAD)}
          </div>
        </Disclosure>
      )}
    </div>
  );
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
