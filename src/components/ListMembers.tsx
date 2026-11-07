import { useMemo } from "react";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { captureHandle } from "@/lib/next-reasons";
import type { ListMember, ListOutcome } from "@/lib/template";

/** A member's internals, on hover: its list field and the request digest that is its identity. */
export function memberHover(member: ListMember): string {
  return [`${member.field}[${member.index}]`, member.request && `request ${member.request}`].filter(Boolean).join("\n");
}

/** A member's status word (kept, dropped, defaulted, refused), with core's reason. */
export function MemberStatus({ member }: { member: ListMember }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <Chip concept="member" value={member.status} />
      {member.reason && <span className="text-[12px] text-zinc-400">{member.reason}</span>}
    </span>
  );
}

/**
 * A list call's members on the run page: field, index, the Capture each kept
 * member became, status and reason; the request digest on hover. Truncation
 * and the provider's own incompleteness word follow the table.
 */
export function ListMembersTable({ list, label }: { list: ListOutcome; label: string }) {
  const fields = new Set(list.members.map((m) => m.field));
  const columns = useMemo<Column<ListMember>[]>(
    () => [
      ...(fields.size > 1
        ? [{ id: "field", header: "Field", className: "font-mono text-[12px] text-zinc-300", sortValue: (m: ListMember) => m.field, cell: (m: ListMember) => m.field }]
        : []),
      { id: "index", header: "#", numeric: true, sortValue: (m) => m.index, className: "font-mono text-zinc-500", cell: (m) => <span title={memberHover(m)}>{m.index}</span> },
      {
        id: "capture",
        header: "Capture",
        className: "whitespace-nowrap",
        cell: (m) => (m.capture ? <RefLink value={captureHandle(m.capture)} /> : <span className="text-zinc-600">—</span>),
      },
      { id: "status", header: "Status", sortValue: (m) => m.status, filter: { kind: "enum", values: (m) => [m.status] }, cell: (m) => <MemberStatus member={m} /> },
    ],
    [fields.size],
  );
  return (
    <div>
      <DataTable rows={list.members} columns={columns} rowKey={(m) => `${m.field}\n${m.index}`} label={label} toolbar={false} maxHeight="20rem" />
      {list.truncated && <div className="mt-1 text-[12px] text-zinc-400">More members than the run card lists</div>}
      {list.providerIncomplete.length > 0 && (
        <div className="mt-1 text-[12px] text-zinc-400" title="The provider's result named these list fields in incomplete_captures">
          Incomplete (provider): <span className="font-mono">{list.providerIncomplete.join(", ")}</span>
        </div>
      )}
    </div>
  );
}
