import { useEffect, useMemo, type ReactNode } from "react";
import { Download } from "lucide-react";
import { useCaptureRead } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import type { Schemas } from "@/api/schemas";
import { Panel, LoadState } from "@/components/Panel";
import { CopyButton } from "@/components/ShortId";
import { CAPTURE_READ_MAX_BYTES } from "@/api/requests";
import { downloadName, formatSize, previewText, unwrapCaptureBody, type CaptureBody } from "@/lib/capture-body";
import { formatDateTime } from "@/lib/text";

/** The most of a body the page renders inline; the download has the rest. */
const PREVIEW_CHARS = 200_000;

/**
 * What a Capture holds: its retained body read through captures/read,
 * unwrapped from core's fetch and file formats, shown inline (JSON
 * pretty-printed, the first 200k characters) with a download of the whole
 * thing. An erased body, one past the read cap, or a token that may not read
 * bodies each say so, with the CLI read to run instead.
 */
export function CaptureContents({ card }: { card: Schemas["GetCaptureCard"] }) {
  const erased = card.erased ?? null;
  const read = useCaptureRead(erased ? null : card.capture);
  const material = read.data?.material ?? null;
  const base64 = material?.body_access?.status === "available" ? material.body_access.body_base64 ?? null : null;
  const body = useMemo(() => (base64 ? unwrapCaptureBody(base64) : null), [base64]);
  const cli = `cruxible capture read ${card.capture}`;

  const meta = body ? <ContentsMeta body={body} source={card.source ?? null} capture={card.capture} /> : null;
  return (
    <Panel title="Contents" meta={meta}>
      {erased ? (
        <Note>
          Erased{erased.by ? ` by ${erased.by}` : ""} {formatDateTime(erased.at)}
          {erased.because ? `: ${erased.because}` : ""}. The envelope and its citations stay; the bytes are gone.
        </Note>
      ) : read.isPending ? (
        <LoadState />
      ) : read.error ? (
        read.error instanceof ApiError && read.error.status === 403 ? (
          <Note cli={cli}>This console's token can't read Capture contents: that takes governed_write. Read it from a terminal:</Note>
        ) : (
          <LoadState error={read.error} />
        )
      ) : read.data?.status === "unavailable" ? (
        <Note cli={cli}>The body is unavailable{read.data.reason ? ` (${read.data.reason.replace(/_/g, " ")})` : ""}.</Note>
      ) : material?.coverage.reason_codes?.includes("resource_budget_exceeded") ? (
        <Note cli={`${cli} --max-bytes ${card.size ?? CAPTURE_READ_MAX_BYTES * 4}`}>
          Larger than the {formatSize(CAPTURE_READ_MAX_BYTES)} the page reads. Read it from a terminal:
        </Note>
      ) : body ? (
        <Preview body={body} />
      ) : (
        <Note cli={cli}>The daemon returned no body for this Capture{material ? ` (${material.status.replace(/_/g, " ")})` : ""}.</Note>
      )}
    </Panel>
  );
}

function ContentsMeta({ body, source, capture }: { body: CaptureBody; source: string | null; capture: string }) {
  const href = useMemo(() => URL.createObjectURL(new Blob([body.bytes as BlobPart])), [body]);
  useEffect(() => () => URL.revokeObjectURL(href), [href]);
  return (
    <span className="flex min-w-0 items-center gap-3 text-[12px] text-zinc-500">
      {body.url && (
        <span className="min-w-0 truncate" title={body.url}>
          From{" "}
          <a href={body.url} target="_blank" rel="noreferrer" className="text-zinc-300 hover:underline">
            {body.url}
          </a>
          {body.status !== null && <> · HTTP {body.status}</>}
        </span>
      )}
      <span className="shrink-0">{formatSize(body.bytes.length)}</span>
      <a
        href={href}
        download={downloadName(body, source, capture)}
        className="inline-flex shrink-0 items-center gap-1 border border-zinc-700 px-2 py-0.5 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
      >
        <Download className="h-3 w-3" /> Download
      </a>
    </span>
  );
}

function Preview({ body }: { body: CaptureBody }) {
  const text = useMemo(() => previewText(body), [body]);
  if (text === null) {
    return <Note>Binary ({formatSize(body.bytes.length)}): download it to open.</Note>;
  }
  const cut = text.length > PREVIEW_CHARS;
  return (
    <div>
      <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-all bg-zinc-950 p-3 font-mono text-[12px] leading-5 text-zinc-300">
        {cut ? text.slice(0, PREVIEW_CHARS) : text}
      </pre>
      {cut && (
        <div className="mt-2 text-[12px] text-zinc-500">
          Showing the first {PREVIEW_CHARS.toLocaleString()} of {text.length.toLocaleString()} characters; download it for the whole body.
        </div>
      )}
    </div>
  );
}

function Note({ children, cli }: { children: ReactNode; cli?: string }) {
  return (
    <div className="space-y-2 text-[13px] text-zinc-400">
      <p>{children}</p>
      {cli && (
        <div className="flex items-center gap-2">
          <code className="font-mono text-[12px] text-zinc-300">{cli}</code>
          <CopyButton value={cli} label="Copy" />
        </div>
      )}
    </div>
  );
}
