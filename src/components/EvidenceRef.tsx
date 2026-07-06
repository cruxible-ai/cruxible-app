import { useState } from "react";
import { Link } from "react-router-dom";
import { useDereferenceEvidence, useInstanceId } from "@/api/hooks";
import { actionChipClass, Chip } from "./Chip";
import { LoadState } from "./Panel";

export interface EvidenceRefData {
  source?: string;
  source_record_id?: string;
  artifact_id?: string;
  label?: string;
  metadata?: {
    heading_path?: string[];
    line_start?: number;
    line_end?: number;
    chunk_id?: string;
    content_hash?: string;
    block_type?: string;
  };
}

const STATUS_TONE = { available: "green", drifted: "amber", unavailable: "red" } as const;

/**
 * One source-evidence pointer: locator line always visible, dereferenced
 * markdown body on demand. Drift is surfaced loudly — a drifted hash means
 * the source moved under the assertion, which is exactly what a trust UI
 * must not paper over.
 */
export function EvidenceRef({ refData }: { refData: EvidenceRefData }) {
  const [open, setOpen] = useState(false);
  const instanceId = useInstanceId();
  const meta = refData.metadata ?? {};
  const locator =
    open && refData.artifact_id
      ? {
          source_artifact_id: refData.artifact_id,
          chunk_id: meta.chunk_id,
          expected_content_hash: meta.content_hash,
        }
      : null;
  const deref = useDereferenceEvidence(locator);
  const result = deref.data as
    | {
        status: "available" | "drifted" | "unavailable";
        body?: string | null;
        body_origin?: string | null;
        reason?: string | null;
        current_artifact_hash?: string | null;
      }
    | undefined;

  return (
    <div className="mt-0.5">
      <div className="flex flex-wrap items-center gap-x-2 font-mono text-[11px]">
        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-400 hover:text-zinc-200"
          title={open ? "collapse" : "dereference source text"}
        >
          {open ? "▾" : "▸"} {refData.artifact_id}
        </button>
        {meta.chunk_id && <span className="text-zinc-600">{meta.chunk_id}</span>}
        {(meta.heading_path ?? []).length > 0 && (
          <span className="font-sans text-zinc-500">{(meta.heading_path ?? []).join(" › ")}</span>
        )}
        {meta.line_start != null && (
          <span className="text-zinc-500">
            L{meta.line_start}–{meta.line_end}
          </span>
        )}
        {refData.label && <span className="font-sans italic text-zinc-500">“{refData.label}”</span>}
        {refData.artifact_id && refData.source_record_id && (
          // Deep link into the artifact viewer, anchored on the cited chunk.
          <Link
            to={`/i/${instanceId}/sources/${refData.artifact_id}#${refData.source_record_id}`}
            className={`font-sans ${actionChipClass}`}
          >
            open in source
          </Link>
        )}
      </div>
      {open && (
        <div className="mt-1 ml-4 rounded border border-zinc-800 bg-zinc-950 p-2">
          {deref.isPending && <LoadState />}
          {deref.error && <LoadState error={deref.error} />}
          {result && (
            <>
              <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                <Chip value={result.status} tone={STATUS_TONE[result.status]} />
                {result.body_origin && <span>from {result.body_origin}</span>}
                {result.status === "drifted" && (
                  <span className="text-amber-500">
                    source changed since assertion (hash{" "}
                    <span className="font-mono">
                      {(result.current_artifact_hash ?? "?").slice(0, 18)}…
                    </span>
                    )
                  </span>
                )}
                {result.reason && <span>{result.reason}</span>}
              </div>
              {result.body ? (
                <pre className="max-h-64 overflow-auto font-mono text-[11px] leading-4 whitespace-pre-wrap text-zinc-300">
                  {result.body}
                </pre>
              ) : (
                <div className="text-[12px] text-zinc-600">No source text available.</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
