import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCard } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { ProcedureWithGraph, TriggerDefinition } from "@/components/ontology/Definitions";
import { QueryPage } from "@/components/ontology/QueryPage";
import { Disclosure, Panel, LoadState } from "@/components/Panel";
import { Fact, Page, PageHeader } from "@/components/Page";
import { ShortId, shortId } from "@/components/ShortId";
import { CaptureContents } from "@/components/CaptureContents";
import { CitedBy } from "@/components/CitedBy";
import { AccessValue, CaptureDerivation, ListSiblings, useDerivationSources } from "@/components/CaptureLineage";
import { formatSize } from "@/lib/capture-body";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList } from "@/components/FieldList";
import { term } from "@/lib/vocabulary";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { claimValueText, isClaimObject } from "@/lib/claim-value";
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
  // A derived Capture's sources (its access may be inherited from them): one get-batch, none for an observed one.
  const sources = useDerivationSources(cardOf(read.data, "capture"));

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
  const capture = cardOf(read.data, "capture");
  const query = cardOf(read.data, "query");
  // ids that fit stay whole; digests and run ids shorten, whole underneath with copy
  const long = full.length > 40;
  // A Capture leads with its handle, where it came from and when; its contents follow.
  // A Query leads with its name and what it is for.
  const title = capture ? capture.capture : query ? query.query.replace(/^query:/, "") : long ? shortId(full, 16) : full;
  return (
    <Page>
      <PageHeader
        kind={refKindLabel(ref)}
        title={<span title={full}>{title}</span>}
        mono
        id={long ? <ShortId value={full} keep={128} className="text-zinc-500" /> : undefined}
        summary={query?.description ?? undefined}
        facts={
          read.data && (
            <>
              {capture && (
                <>
                  {capture.source && (
                    <Fact label="Source">
                      <span className="font-mono">{capture.source}</span>
                    </Fact>
                  )}
                  {capture.observed_at && (
                    <Fact label="Observed" title={capture.observed_at}>
                      {formatDateTime(capture.observed_at)}
                    </Fact>
                  )}
                  {capture.size != null && <Fact label="Size">{formatSize(capture.size)}</Fact>}
                  <Fact label="Contract">
                    <RefLink value={capture.contract} />
                  </Fact>
                  {capture.access && (
                    <Fact label="Access">
                      <AccessValue card={capture} sources={sources.cards} />
                    </Fact>
                  )}
                </>
              )}
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
      {procedure?.authored && <ProcedureWithGraph spec={procedure.authored} />}
      {trigger && <TriggerDefinition schedule={trigger.schedule} target={trigger.target} />}
      {query && <QueryPage card={query} />}
      {capture?.derivation && <CaptureDerivation card={capture} sources={sources} />}
      {capture && <ListSiblings card={capture} />}
      {capture && <CaptureContents card={capture} />}
      {capture && <CitedBy citing={capture.citing ?? []} total={capture.citing_total ?? capture.citing?.length ?? 0} />}
      {read.data?.card && !capture && !query && (
        <Panel title="Card">
          <Fields value={rest(read.data.card as Record<string, unknown>, omitted(procedure?.authored != null))} depth={0} path="" />
        </Panel>
      )}
    </Page>
  );
}

const MAX_DEPTH = 3;

/** Card fields a dedicated panel already shows (a Capture's card is its header, Contents and Cited by). */
function omitted(authored: boolean): string[] {
  return authored ? ["authored"] : [];
}

/** A card without the fields a dedicated panel already shows. */
function rest(card: Record<string, unknown>, omit: readonly string[]): Record<string, unknown> {
  return Object.fromEntries(Object.entries(card).filter(([key]) => !omit.includes(key)));
}

/** A card's fields as the shared field list: one row per field, the name, the value; nested records list inside, compact. */
function Fields({ value, depth, path }: { value: Record<string, unknown>; depth: number; path: string }) {
  const entries = Object.entries(value).filter(([, v]) => v !== null && v !== undefined);
  return (
    <FieldList
      density={depth === 0 ? "regular" : "compact"}
      label={path ? humanize(path.split(".").pop() ?? path) : "Card"}
      fields={entries.map(([key, v]) => ({
        key,
        label: key,
        labelTitle: humanize(key),
        value: (
          <div className="break-words text-zinc-300">
            <Value value={v} depth={depth + 1} path={path ? `${path}.${key}` : key} />
          </div>
        ),
      }))}
    />
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function Value({ value, depth, path = "" }: { value: unknown; depth: number; path?: string }) {
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
    if (value.length === 0) return <span className="text-zinc-600">None</span>;
    if (value.every(isRecord) && depth <= MAX_DEPTH) return <RecordTable rows={value} depth={depth} path={path} />;
    return <ValueList items={value} depth={depth} />;
  }
  if (isRecord(value)) {
    // A Claim's value (a Claim card's, or one in a list of them): a none or a typed object reads as get shows Claim values.
    if (/(^|\.)value$/.test(path) && isClaimObject(value)) {
      return <ShownValue value={value} />;
    }
    return depth <= MAX_DEPTH ? (
      <Fields value={value} depth={depth} path={path} />
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

/** A cell's value as text (sorting, filtering). */
function cellText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  return claimValueText(value);
}

/**
 * An array of records as the shared table over the union of their keys
 * (its sort and filters in the URL under the field's path); records of one
 * entry each read as a name and a value. The card holds
 * the whole array, so a sort or filter is complete.
 */
function RecordTable({ rows: given, depth, path }: { rows: Record<string, unknown>[]; depth: number; path: string }) {
  // records of one entry each ({alias: expression}) read as name and value, not a diagonal
  const rows = useMemo(
    () =>
      given.length > 1 && given.every((row) => Object.keys(row).length === 1)
        ? given.map((row) => {
            const [name, value] = Object.entries(row)[0]!;
            return { name, value };
          })
        : given,
    [given],
  );
  const columns = useMemo<Column<{ index: number; row: Record<string, unknown> }>[]>(() => {
    const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
    return keys.map((key) => ({
      id: key,
      header: humanize(key),
      label: humanize(key),
      sortValue: ({ row }) => {
        const v = row[key];
        return typeof v === "number" || typeof v === "boolean" ? v : cellText(v) || null;
      },
      filter:
        key === "flags"
          ? { kind: "enum" as const, values: ({ row }) => (Array.isArray(row[key]) ? (row[key] as unknown[]).map(String) : []) }
          : { kind: "text" as const, text: ({ row }) => cellText(row[key]) },
      ...(key === "flags" ? { optionLabel: (value: string) => term("claim", value).word } : {}),
      className: "text-[12px]",
      cell: ({ row }) =>
        key === "flags" && Array.isArray(row[key]) ? (
          <span className="flex flex-wrap gap-1.5">
            {(row[key] as string[]).map((flag) => (
              <Chip key={flag} concept="claim" value={flag} />
            ))}
          </span>
        ) : (
          <Value value={row[key]} depth={depth + 1} path={`${path}.${key}`} />
        ),
    }));
  }, [rows, depth, path]);
  const indexed = useMemo(() => rows.map((row, index) => ({ index, row })), [rows]);
  return (
    <DataTable
      rows={indexed}
      columns={columns}
      rowKey={({ index }) => String(index)}
      urlKey={path}
      label={humanize(path.split(".").pop() ?? path)}
      toolbar={rows.length > 1}
      maxHeight="28rem"
    />
  );
}
