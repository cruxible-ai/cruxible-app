import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { Download } from "lucide-react";
import { useDocumentBody, useDocuments, useGetBatch, type DocumentBody } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import { DOCUMENT_READ_MAX_BYTES } from "@/api/requests";
import { cardOf, type Schemas } from "@/api/schemas";
import { BodyView } from "@/components/BodyView";
import { Disclosure, LoadState, Panel } from "@/components/Panel";
import { CopyButton } from "@/components/ShortId";
import { SearchBox, Stat, StatsRow } from "@/components/StatsRow";
import { bodyFormat, extensionFor } from "@/lib/body-format";
import { decodeText, formatSize } from "@/lib/capture-body";
import { usePageTitle } from "@/lib/usePageTitle";

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
        <p className="t-lede measure mt-1">
          The Documents this instance holds: design notes, runbooks and references accepted into state, each at its
          revision at this generation. Pick one to read it.
        </p>
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
          <p className="text-[14px] text-zinc-400">No Documents at this generation.</p>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <Panel title="Documents">
              <ul aria-label="Documents" className="-mx-2 space-y-px">
                {shown.map((row) => (
                  <li key={row.name}>
                    <DocumentItem row={row} card={cardByName.get(row.name)} active={row.name === open?.name} onSelect={() => select(row.name)} />
                  </li>
                ))}
              </ul>
              {shown.length === 0 && <p className="text-[13px] text-zinc-500">No Document matches.</p>}
            </Panel>
            {open ? (
              <DocumentReader key={open.name} row={open} card={cardByName.get(open.name)} />
            ) : (
              <p className="text-[14px] text-zinc-400">
                No Document named <span className="font-mono text-zinc-300">{asked}</span> at this generation.
              </p>
            )}
          </div>
        ))}
    </div>
  );
}

function DocumentItem({ row, card, active, onSelect }: { row: DocumentRow; card: DocumentCard | undefined; active: boolean; onSelect: () => void }) {
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

function DocumentReader({ row, card }: { row: DocumentRow; card: DocumentCard | undefined }) {
  const read = useDocumentBody(row.name);
  const body = readOf(read.data);
  const decoded = useMemo(() => (body ? decodeText(body.bytes) : null), [body]);
  const format = decoded ? bodyFormat(decoded, { contentType: row.media_type, name: row.name }) : null;
  const meta = (
    <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-zinc-500">
      <span>{row.document_kind}</span>
      <span className="font-mono">{row.media_type}</span>
      {card && <span>Revision {card.revision}</span>}
      {(body?.bytes.length ?? card?.size) != null && <span>{formatSize(body?.bytes.length ?? card!.size!)}</span>}
      {body && format && <DownloadLink bytes={body.bytes} type={row.media_type} name={fileName(row.name, extensionFor(format, row.media_type))} />}
    </span>
  );
  return (
    <Panel title={row.title} meta={meta}>
      <div className="t-meta -mt-1 mb-3 font-mono">Document:{row.name}</div>
      {read.isPending ? (
        <LoadState />
      ) : read.error ? (
        read.error instanceof ApiError && read.error.status === 403 ? (
          <Note cli={cliRead(row.name)}>This console's token can't read Document bodies: that takes governed_write. Read it from a terminal:</Note>
        ) : (
          <LoadState error={read.error} />
        )
      ) : read.data?.status === "too_large" ? (
        <Note cli={`${cliRead(row.name)} --output ${row.name}`}>
          {formatSize(read.data.size)}: larger than the {formatSize(DOCUMENT_READ_MAX_BYTES)} the page reads. Save it from a terminal:
        </Note>
      ) : body && decoded && format ? (
        <BodyView format={format} text={decoded.text} json={decoded.json} size={body.bytes.length} title={`Body of ${row.title}`} />
      ) : null}
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
 * Document, then propose it. Said in plain words, as the two commands, and as
 * the sentence to give an agent.
 */
function AddDocumentHint() {
  const commands = [
    'cruxible files add report docs/report.md --document-id report --document-kind report --title "Q3 report"',
    "cruxible files propose --file report --name report-v1",
  ];
  const ask = 'Add docs/report.md to Cruxible as a Document titled "Q3 report", and propose it.';
  return (
    <div className="measure space-y-2 text-[13px] text-zinc-400">
      <p>
        A Document is a file whose exact wording is kept in state: every revision is reviewed and accepted like any change, and
        Next flags the file when it is edited until the new revision is proposed. Put the file in the workspace, then:
      </p>
      <div className="space-y-1">
        {commands.map((command) => (
          <div key={command} className="flex items-start gap-2">
            <code className="min-w-0 break-all font-mono text-[12px] text-zinc-300">{command}</code>
            <CopyButton value={command} label="Copy" />
          </div>
        ))}
      </div>
      <p className="flex items-start gap-2">
        <span>
          Or tell your agent: <span className="text-zinc-200">“{ask}”</span>
        </span>
        <CopyButton value={ask} label="Copy" />
      </p>
      <p className="text-[12px] text-zinc-500">It shows here once the proposal is accepted under your approval policy.</p>
    </div>
  );
}
