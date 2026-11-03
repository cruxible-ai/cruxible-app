import { useEffect, useMemo, type ReactNode } from "react";
import { Download } from "lucide-react";
import { useCaptureRead } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import type { Schemas } from "@/api/schemas";
import { Panel, LoadState } from "@/components/Panel";
import { CopyButton } from "@/components/ShortId";
import { CAPTURE_READ_MAX_BYTES } from "@/api/requests";
import { BodyView } from "@/components/BodyView";
import { FieldList } from "@/components/FieldList";
import {
  captureCoordinate,
  captureFormat,
  downloadName,
  formatSize,
  readCaptureBody,
  type CaptureBody,
  type CaptureCoordinate,
} from "@/lib/capture-body";
import { formatDateTime } from "@/lib/text";

/**
 * What a Capture holds: where its source says it came from (the typed
 * coordinate on its envelope, field by field), and its body read through
 * captures/read: the payload bytes as stored, shown inline (markdown and HTML
 * rendered, with a Raw toggle; JSON pretty-printed; the first 200k
 * characters) with a download of the whole thing. An erased body, one past
 * the read cap, or a token that may not read bodies each say so, with the CLI
 * read to run instead.
 */
export function CaptureContents({ card }: { card: Schemas["GetCaptureCard"] }) {
  const erased = card.erased ?? null;
  const read = useCaptureRead(erased ? null : card.capture);
  const material = read.data?.material ?? null;
  const base64 = material?.body_access?.status === "available" ? material.body_access.body_base64 ?? null : null;
  const body = useMemo(() => (base64 ? readCaptureBody(base64) : null), [base64]);
  const coordinate = captureCoordinate(read.data?.envelope?.source);
  const cli = `cruxible capture read ${card.capture}`;

  const meta = body ? <ContentsMeta body={body} coordinate={coordinate} source={card.source ?? null} capture={card.capture} /> : null;
  return (
    <>
      {coordinate && <CoordinatePanel coordinate={coordinate} />}
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
          <BodyView
            format={captureFormat(body, coordinate, card.source ?? null)}
            text={body.text}
            json={body.json}
            size={body.bytes.length}
            title={`Contents of ${card.capture}`}
          />
        ) : (
          <Note cli={cli}>The daemon returned no body for this Capture{material ? ` (${material.status.replace(/_/g, " ")})` : ""}.</Note>
        )}
      </Panel>
    </>
  );
}

/** An external source's coordinate as stored: its type and each field. */
function CoordinatePanel({ coordinate }: { coordinate: CaptureCoordinate }) {
  const fields = Object.entries(coordinate.fields).map(([key, value]) => ({
    key,
    label: key,
    value: (
      <span className="break-words font-mono text-[12px] text-zinc-300">
        {typeof value === "string" ? value : JSON.stringify(value, null, 1)}
      </span>
    ),
  }));
  return (
    <Panel title="Coordinate" meta={<span className="font-mono">{coordinate.type}</span>}>
      {fields.length ? <FieldList fields={fields} label="Coordinate" /> : <span className="text-[13px] text-zinc-500">No fields</span>}
    </Panel>
  );
}

function ContentsMeta({
  body,
  coordinate,
  source,
  capture,
}: {
  body: CaptureBody;
  coordinate: CaptureCoordinate | null;
  source: string | null;
  capture: string;
}) {
  const href = useMemo(() => URL.createObjectURL(new Blob([body.bytes as BlobPart])), [body]);
  useEffect(() => () => URL.revokeObjectURL(href), [href]);
  return (
    <span className="flex min-w-0 items-center gap-3 text-[12px] text-zinc-500">
      <span className="shrink-0">{formatSize(body.bytes.length)}</span>
      <a
        href={href}
        download={downloadName(body, coordinate, source, capture)}
        className="inline-flex shrink-0 items-center gap-1 border border-zinc-700 px-2 py-0.5 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
      >
        <Download className="h-3 w-3" /> Download
      </a>
    </span>
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
