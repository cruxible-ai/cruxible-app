import type { ReactNode } from "react";
import { DataTable, type Column } from "@/components/DataTable";
import { Disclosure, SubSection } from "@/components/Panel";
import { ShortId } from "@/components/ShortId";
import type { KitReceipt, ReceiptArtifact } from "@/lib/kit-receipt";

const digest = (value: string | null) => (value ? <ShortId value={value} keep={8} /> : <span className="text-zinc-600">—</span>);

const COLUMNS: Column<ReceiptArtifact>[] = [
  {
    id: "path",
    header: "Path",
    hideable: false,
    sortValue: (row) => row.path,
    filter: { kind: "text", text: (row) => row.path },
    className: "font-mono text-[12px] text-zinc-200",
    cell: (row) => row.path,
  },
  {
    id: "installed",
    header: "Installed",
    title: "The digest this instance holds",
    filter: { kind: "text", text: (row) => row.installedDigest },
    className: "whitespace-nowrap",
    cell: (row) => digest(row.installedDigest),
  },
  {
    id: "release",
    header: "Release",
    title: "The release's digest; it differs from the installed one when the instance already had history for the path",
    filter: { kind: "text", text: (row) => row.releaseDigest },
    className: "whitespace-nowrap",
    cell: (row) => digest(row.releaseDigest),
  },
  {
    id: "content",
    header: "Content",
    title: "The installed artifact's content apart from its lineage and lifecycle",
    filter: { kind: "text", text: (row) => row.contentDigest ?? "" },
    className: "whitespace-nowrap",
    cell: (row) => digest(row.contentDigest),
  },
];

function Artifacts({ rows, urlKey, label }: { rows: ReceiptArtifact[]; urlKey: string; label: string }) {
  return <DataTable rows={rows} columns={COLUMNS} rowKey={(row) => row.path} urlKey={urlKey} label={label} maxHeight="32rem" empty="None" />;
}

/**
 * A kit receipt read as tables: the paths the kit owns and the paths it
 * carries, each with its digests shortened (whole on hover, with copy); the
 * receipt as stored behind a disclosure.
 */
export function KitReceiptView({ receipt, raw }: { receipt: KitReceipt; raw: ReactNode }) {
  return (
    <div className="space-y-4">
      <SubSection title={<span title="Definitions the kit owns: it may replace and retire them">Owned</span>}>
        <Artifacts rows={receipt.owned} urlKey="owned" label="Owned artifacts" />
      </SubSection>
      {receipt.carried.length > 0 && (
        <SubSection title={<span title="Definitions the kit pins but does not own: never replaced or retired through it">Carried</span>}>
          <Artifacts rows={receipt.carried} urlKey="carried" label="Carried artifacts" />
        </SubSection>
      )}
      <Disclosure label="Receipt (raw JSON)">{raw}</Disclosure>
    </div>
  );
}
