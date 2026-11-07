import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCaptureRead, useGetBatch, useInstanceId } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import { cardOf, type Schemas } from "@/api/schemas";
import { DataTable, type Column } from "@/components/DataTable";
import { InfoButton } from "@/components/InfoButton";
import { LongText } from "@/components/LongText";
import { RefLink } from "@/components/RefLink";
import { SubSection } from "@/components/Panel";
import { useAtLink } from "@/lib/at";
import { citationOf, citationWords, type AttestationAccount, type Citation } from "@/lib/attestation-evidence";
import { decodeBase64, decodeText } from "@/lib/capture-body";
import { publicName } from "@/lib/evidence";
import { captureHandle } from "@/lib/next-reasons";
import { contractName } from "@/lib/ontology";
import { formatWhen } from "@/lib/text";

type CaptureCard = Schemas["GetCaptureCard"];

interface CitedRow {
  digest: string;
  handle: string;
  card: CaptureCard | null;
  citation: Citation | null;
}

/**
 * What one attestation cites, like a write's evidence: its own words (the
 * `because`, read from its self-source Capture), then each cited Capture with
 * what it is cited as (own words, a section of a workspace file, a passage,
 * evidence), its source, contract and when observed. Reads, once the row
 * opens: one get-batch of the cited Captures' cards and one of their proofs
 * (the envelope names a section), and captures/read for the own-words Capture
 * (governed_write; refused below it, which the row says).
 */
export function AttestationEvidence({ account }: { account: AttestationAccount }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const refs = useMemo(() => account.cited.map((d) => `Capture:${d}`), [account.cited]);
  const cards = useGetBatch(refs);
  const proofs = useGetBatch(refs, "proof");
  const rows = useMemo<CitedRow[]>(
    () =>
      account.cited.map((digest, i) => ({
        digest,
        handle: captureHandle(digest),
        card: cardOf(cards.results[i], "capture"),
        citation: proofs.results[i] ? citationOf(proofs.results[i]!.proof) : null,
      })),
    [account.cited, cards.results, proofs.results],
  );
  const ownWords = rows.find((row) => row.citation?.kind === "own_words") ?? null;
  const columns = useMemo<Column<CitedRow>[]>(
    () => [
      { id: "capture", header: "Capture", className: "whitespace-nowrap", cell: (r) => <RefLink value={r.handle} /> },
      {
        id: "cited_as",
        header: "Cited as",
        title: "What the citation is: the attester's own words, a section or passage of a workspace file, or evidence",
        className: "max-w-[22rem] text-zinc-300",
        cell: (r) => (r.citation ? <span title={r.digest}>{citationWords(r.citation, publicName)}</span> : <span className="text-zinc-600">…</span>),
      },
      {
        id: "source",
        header: "Source",
        className: "max-w-[14rem] truncate text-zinc-400",
        cell: (r) => (r.card?.source ? <span title={r.card.source}>{publicName(r.card.source)}</span> : <span className="text-zinc-600">—</span>),
      },
      {
        id: "contract",
        header: "Contract",
        className: "font-mono text-[12px]",
        cell: (r) =>
          r.card ? (
            <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(r.card.contract))}`)} className="text-zinc-400 hover:text-zinc-200 hover:underline">
              {publicName(contractName(r.card.contract))} v{r.card.version}
            </Link>
          ) : null,
      },
      {
        id: "observed",
        header: "Observed",
        className: "whitespace-nowrap text-zinc-400",
        cell: (r) => (r.card?.observed_at ? <span title={r.card.observed_at}>{formatWhen(r.card.observed_at)}</span> : null),
      },
    ],
    [instanceId, link],
  );
  if (account.cited.length === 0) return <div className="text-[12px] text-zinc-500">Cites no Capture</div>;
  return (
    <div className="space-y-2 text-[12px]">
      {ownWords && <Because capture={ownWords.handle} />}
      {(cards.error || proofs.error) && <div className="text-red-400/80">{(cards.error ?? proofs.error)!.message}</div>}
      <SubSection title="Cites" meta={rows.length}>
        <DataTable rows={rows} columns={columns} rowKey={(r) => r.digest} label="Attestation evidence" toolbar={false} maxHeight="none" />
      </SubSection>
      {account.validUntil && <div className="text-zinc-500">Holds until {formatWhen(account.validUntil)}</div>}
    </div>
  );
}

/** The attester's own words, as written: the self-source Capture's body (governed_write to read). */
function Because({ capture }: { capture: string }) {
  const read = useCaptureRead(capture);
  const base64 = read.data?.material?.body_access?.status === "available" ? (read.data.material.body_access.body_base64 ?? null) : null;
  const text = useMemo(() => (base64 ? decodeText(decodeBase64(base64)).text : null), [base64]);
  return (
    <SubSection title="Because">
      {read.isPending ? (
        <div className="animate-pulse text-zinc-500">Reading…</div>
      ) : read.error instanceof ApiError && read.error.status === 403 ? (
        <span className="inline-flex items-center gap-1.5 text-zinc-400">
          Needs <span className="font-mono">governed_write</span>
          <InfoButton label="Why the words are not shown">This console's token can't read Capture contents; read {capture} from a terminal.</InfoButton>
        </span>
      ) : read.error ? (
        <div className="text-red-400/80">{read.error.message}</div>
      ) : text !== null ? (
        <LongText text={text} lines={4} className="text-[13px] text-zinc-200" />
      ) : (
        <span className="text-zinc-500">Not available</span>
      )}
    </SubSection>
  );
}
