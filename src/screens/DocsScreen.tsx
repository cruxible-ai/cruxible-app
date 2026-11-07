import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useDocumentBody, useDocuments, useGet, useGetBatch, type DocumentBody } from "@/api/hooks";
import { DocumentLinks } from "@/components/Backlinks";
import { documentLinks } from "@/lib/document-links";
import { ApiError } from "@/api/data-source";
import { DOCUMENT_READ_MAX_BYTES } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { FieldList } from "@/components/FieldList";
import { InfoButton } from "@/components/InfoButton";
import { PageDescription } from "@/components/Page";
import { BodyView } from "@/components/BodyView";
import { Disclosure, LoadState, Panel, SubSection } from "@/components/Panel";
import { CopyButton } from "@/components/ShortId";
import { SearchBox, Stat, StatsRow } from "@/components/StatsRow";
import { bodyFormat, extensionFor } from "@/lib/body-format";
import { decodeText, formatSize } from "@/lib/capture-body";
import { usePageTitle } from "@/lib/usePageTitle";
import { useClearOnEscape } from "@/components/graph/FocusChip";

type DocumentRow = Schemas["OrientDocument"];
type DocumentCard = Schemas["GetDocumentCard"];

/**
 * The instance's Documents at the pinned generation, as a list (title, kind,
 * media type, revision) beside a reader: markdown rendered, HTML in a
 * sandboxed frame, JSON pretty-printed, other text as text, binary as a
 * download. `?doc=<name>` opens one. Reads: the orient documents section,
 * ⌈Documents/64⌉ get-batch calls for the cards (revision, size), and the open
 * Document's body through get detail="body" (needs governed_write).
 */
export function DocsScreen() {
  const documents = useDocuments();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [listHidden, setListHidden] = useListHidden();
  const reading = params.get("read") === "1";
  const setReading = useCallback(
    (on: boolean) => {
      const next = new URLSearchParams(params);
      if (on) next.set("read", "1");
      else next.delete("read");
      setParams(next);
    },
    [params, setParams],
  );
  useClearOnEscape(reading, () => setReading(false));
  usePageTitle("Docs");
  const rows = useMemo(() => documents.data?.rows ?? [], [documents.data]);
  const cards = useGetBatch(rows.map((row) => `Document:${row.name}`));
  const cardByName = useMemo(() => {
    const out = new Map<string, DocumentCard>();
    // get-batch answers in request order: result i is rows[i]'s card.
    cards.results.forEach((result, i) => {
      const card = cardOf(result, "document");
      const name = rows[i]?.name;
      if (card && name) out.set(name, card);
    });
    return out;
  }, [cards.results, rows]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return rows;
    return rows.filter((row) => `${row.name} ${row.title} ${row.document_kind} ${row.media_type}`.toLowerCase().includes(q));
  }, [rows, query]);
  const kinds = useMemo(() => new Set(rows.map((row) => row.document_kind)).size, [rows]);
  const asked = params.get("doc");
  const open = rows.find((row) => row.name === asked) ?? (asked === null ? rows[0] : undefined) ?? null;
  const select = (name: string) => {
    const next = new URLSearchParams(params);
    next.set("doc", name);
    setParams(next);
  };

  return (
    <div className="w-full max-w-[1760px]">
      <header className="mb-4">
        <h1 className="t-title">Docs</h1>
        <PageDescription>
            The Documents this instance holds: design notes, runbooks and references accepted into state, each at its revision at this
            generation.
        </PageDescription>
        {documents.data && (
          <StatsRow
            search={
              <SearchBox
                value={query}
                onChange={setQuery}
                onEnter={() => shown[0] && select(shown[0].name)}
                placeholder="Find a Document…"
                label="Find a Document by name, title, kind or media type"
                matches={query.trim() === "" ? null : shown.length}
              />
            }
          >
            <Stat n={rows.length} label={rows.length === 1 ? "Document" : "Documents"} />
            <Stat n={kinds} label={kinds === 1 ? "kind" : "kinds"} />
            {documents.data.truncated && <span>the first {rows.length} the daemon listed</span>}
          </StatsRow>
        )}
        {documents.data && (
          <Disclosure label="How to add a document" defaultOpen={rows.length === 0} className="mt-3">
            <AddDocumentHint />
          </Disclosure>
        )}
      </header>
      {documents.isPending && <LoadState />}
      {documents.error && <LoadState error={documents.error} />}
      {documents.data &&
        (rows.length === 0 ? (
          <p className="text-[14px] text-zinc-400">None at this generation</p>
        ) : (
          <div className={`grid grid-cols-1 items-start gap-5 ${listHidden ? "" : "lg:grid-cols-[20rem_minmax(0,1fr)]"}`}>
            {!listHidden && (
              <Panel title="Documents">
                <ul aria-label="Documents" className="-mx-2 space-y-px">
                  {shown.map((row) => (
                    <li key={row.name}>
                      <DocumentItem
                        row={row}
                        card={cardByName.get(row.name)}
                        active={row.name === open?.name}
                        onSelect={() => select(row.name)}
                      />
                    </li>
                  ))}
                </ul>
                {shown.length === 0 && <p className="text-[13px] text-zinc-500">No match</p>}
              </Panel>
            )}
            {open ? (
              <DocumentReader
                key={open.name}
                row={open}
                card={cardByName.get(open.name)}
                wide={listHidden}
                reading={reading}
                nav={
                  <ReaderNav
                    listHidden={listHidden}
                    onToggle={() => setListHidden(!listHidden)}
                    reading={reading}
                    onReading={setReading}
                    rows={shown.length > 0 ? shown : rows}
                    open={open.name}
                    onSelect={select}
                  />
                }
              />
            ) : (
              <p className="text-[14px] text-zinc-400">
                Not found: <span className="font-mono text-zinc-300">{asked}</span>
              </p>
            )}
          </div>
        ))}
    </div>
  );
}

function DocumentItem({
  row,
  card,
  active,
  onSelect,
}: {
  row: DocumentRow;
  card: DocumentCard | undefined;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`block w-full px-2 py-1.5 text-left ${active ? "bg-zinc-800" : "hover:bg-zinc-900"}`}
    >
      <div className={`text-[14px] ${active ? "text-zinc-100" : "text-zinc-300"}`}>{row.title}</div>
      <div className="t-meta mt-0.5 flex flex-wrap gap-x-2">
        <span className="font-mono">{row.name}</span>
        <span>{row.document_kind}</span>
        <span>{row.media_type}</span>
        {card && <span>rev {card.revision}</span>}
      </div>
    </button>
  );
}

const cliRead = (name: string) => `cruxible get Document:${name} --detail body`;

const LIST_HIDDEN_KEY = "cruxible.docs.listHidden";

/** Whether the Document list is hidden for a wider reader, remembered per browser. */
function useListHidden(): [boolean, (hidden: boolean) => void] {
  const [hidden, setHidden] = useState(() => {
    try {
      return window.localStorage.getItem(LIST_HIDDEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const set = (next: boolean) => {
    setHidden(next);
    try {
      window.localStorage.setItem(LIST_HIDDEN_KEY, next ? "1" : "0");
    } catch {
      // Remembering is a convenience; the toggle works without it.
    }
  };
  return [hidden, set];
}

const NAV_BUTTON =
  "inline-flex h-6 w-6 items-center justify-center text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent";

/**
 * The reader's own controls: hide or show the list and, while it is hidden,
 * step to the previous or next Document (of those the find box matches) so
 * the list is not needed to move on.
 */
function ReaderNav({
  listHidden,
  onToggle,
  reading,
  onReading,
  rows,
  open,
  onSelect,
}: {
  listHidden: boolean;
  onToggle: () => void;
  reading: boolean;
  onReading: (on: boolean) => void;
  rows: DocumentRow[];
  open: string;
  onSelect: (name: string) => void;
}) {
  const at = rows.findIndex((row) => row.name === open);
  const step = useCallback(
    (by: number) => {
      const next = rows[at + by];
      if (next) onSelect(next.name);
    },
    [rows, at, onSelect],
  );
  // Reading full window: ← and → step between Documents.
  useEffect(() => {
    if (!reading) return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.closest("input, textarea")) return;
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reading, step]);
  return (
    <span className="relative top-[3px] mr-2 inline-flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => onReading(!reading)}
        aria-pressed={reading}
        title={reading ? "Exit full-window reading (Esc)" : "Read in the full window"}
        aria-label={reading ? "Exit full-window reading" : "Read in the full window"}
        className={NAV_BUTTON}
      >
        {reading ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
      {!reading && (
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={listHidden}
          title={listHidden ? "Show the Document list" : "Hide the Document list to read wider"}
          aria-label={listHidden ? "Show the Document list" : "Hide the Document list"}
          className={NAV_BUTTON}
        >
          {listHidden ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      )}
      {(listHidden || reading) && rows.length > 1 && (
        <>
          <button type="button" onClick={() => step(-1)} disabled={at <= 0} aria-label="Previous Document" className={NAV_BUTTON}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-0.5 text-[12px] font-normal tabular-nums text-zinc-500">
            {at + 1} of {rows.length}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={at < 0 || at >= rows.length - 1}
            aria-label="Next Document"
            className={NAV_BUTTON}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </span>
  );
}

function DocumentReader({
  row,
  card,
  nav,
  wide,
  reading,
}: {
  row: DocumentRow;
  card: DocumentCard | undefined;
  nav: ReactNode;
  /** The list is hidden: rendered markdown centres at its reading width. */
  wide: boolean;
  /** Full window: the Document over the whole app, its header pinned. */
  reading: boolean;
}) {
  const read = useDocumentBody(row.name);
  const links = useGet(`Document:${row.name}`, "proof");
  const declared = useMemo(() => documentLinks(links.data?.proof), [links.data]);
  const body = readOf(read.data);
  const decoded = useMemo(() => (body ? decodeText(body.bytes) : null), [body]);
  const format = decoded ? bodyFormat(decoded, { contentType: row.media_type, name: row.name }) : null;
  const meta = (
    <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-zinc-500">
      <span>{row.document_kind}</span>
      <span className="font-mono">{row.media_type}</span>
      {card && <span>Revision {card.revision}</span>}
      {(body?.bytes.length ?? card?.size) != null && <span>{formatSize(body?.bytes.length ?? card!.size!)}</span>}
      {body && format && (
        <DownloadLink bytes={body.bytes} type={row.media_type} name={fileName(row.name, extensionFor(format, row.media_type))} />
      )}
    </span>
  );
  const content = read.isPending ? (
    <LoadState />
  ) : read.error ? (
    read.error instanceof ApiError && read.error.status === 403 ? (
      <Note cli={cliRead(row.name)}>
        <span className="inline-flex items-center gap-1.5">
          Needs <span className="font-mono">governed_write</span>
          <InfoButton label="Why the body is not shown">This console's token can't read Document bodies; read it from a terminal.</InfoButton>
        </span>
      </Note>
    ) : (
      <LoadState error={read.error} />
    )
  ) : read.data?.status === "too_large" ? (
    <Note cli={`${cliRead(row.name)} --output ${row.name}`}>
      {formatSize(read.data.size)}: over the {formatSize(DOCUMENT_READ_MAX_BYTES)} page limit
    </Note>
  ) : body && decoded && format ? (
    <BodyView
      format={format}
      text={decoded.text}
      json={decoded.json}
      size={body.bytes.length}
      title={`Body of ${row.title}`}
      centered={wide || reading}
      fill={reading}
    />
  ) : null;
  if (reading) {
    return (
      <div role="dialog" aria-modal="true" aria-label={`Reading ${row.title}`} className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950">
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-zinc-800 bg-zinc-950/95 px-6 py-2 backdrop-blur">
          <span className="inline-flex items-baseline">
            {nav}
            <span className="text-[15px] font-semibold text-zinc-100">{row.title}</span>
          </span>
          <span className="ml-auto">{meta}</span>
        </header>
        <div className="px-6 pb-16 pt-8">{content}</div>
      </div>
    );
  }
  return (
    <Panel
      title={
        <span className="inline-flex items-baseline">
          {nav}
          {row.title}
        </span>
      }
      meta={meta}
    >
      <div className="t-meta -mt-1 mb-3 font-mono">Document:{row.name}</div>
      <SubSection title="Links" meta={links.data ? declared.length : undefined}>
        <DocumentLinks links={declared} isPending={links.isPending} error={links.error} />
      </SubSection>
      <div className="mt-4">{content}</div>
    </Panel>
  );
}

function readOf(data: DocumentBody | undefined): Extract<DocumentBody, { status: "read" }> | null {
  return data !== undefined && data.status === "read" ? data : null;
}

/** A download name: the Document's name, with the extension unless it already ends in it. */
function fileName(name: string, ext: string): string {
  return name.toLowerCase().endsWith(`.${ext}`) ? name : `${name}.${ext}`;
}

function DownloadLink({ bytes, type, name }: { bytes: Uint8Array; type: string; name: string }) {
  const href = useMemo(() => URL.createObjectURL(new Blob([bytes as BlobPart], { type })), [bytes, type]);
  useEffect(() => () => URL.revokeObjectURL(href), [href]);
  return (
    <a
      href={href}
      download={name}
      className="inline-flex shrink-0 items-center gap-1 border border-zinc-700 px-2 py-0.5 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
    >
      <Download className="h-3 w-3" /> Download
    </a>
  );
}

function Note({ children, cli }: { children: ReactNode; cli: string }) {
  return (
    <div className="space-y-2 text-[13px] text-zinc-400">
      <p>{children}</p>
      <div className="flex items-center gap-2">
        <code className="font-mono text-[12px] text-zinc-300">{cli}</code>
        <CopyButton value={cli} label="Copy" />
      </div>
    </div>
  );
}

/**
 * How a file becomes a Document here: name it in the file catalog as a
 * Document, then propose it. The two commands and the request to give an
 * agent, as labelled rows; what a Document is behind an ⓘ.
 */
function AddDocumentHint() {
  const commands = [
    'cruxible files add report docs/report.md --document-id report --document-kind report --title "Q3 report" --scope legal',
    "cruxible files propose --file report --name report-v1",
  ];
  const ask = 'Add docs/report.md to Cruxible as a Document titled "Q3 report", and propose it.';
  return (
    <div className="measure text-[13px] text-zinc-400">
      <FieldList
        labels="words"
        density="compact"
        label="How to add a document"
        fields={[
          {
            key: "cli",
            label: (
              <span className="inline-flex items-center gap-1.5">
                CLI
                <InfoButton label="What a Document is">
                  A Document is a file whose exact wording is kept in state: every revision is reviewed and accepted like any change, and
                  Next flags the file when it is edited until the new revision is proposed. Put the file in the workspace first; it shows
                  here once the proposal is accepted under your approval policy.
                </InfoButton>
              </span>
            ),
            value: (
              <div className="space-y-1">
                {commands.map((command) => (
                  <div key={command} className="flex items-start gap-2">
                    <code className="min-w-0 break-all font-mono text-[12px] text-zinc-300">{command}</code>
                    <CopyButton value={command} label="Copy" />
                  </div>
                ))}
              </div>
            ),
          },
          {
            key: "agent",
            label: "Agent",
            value: (
              <span className="flex items-start gap-2">
                <span className="text-zinc-200">“{ask}”</span>
                <CopyButton value={ask} label="Copy" />
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
