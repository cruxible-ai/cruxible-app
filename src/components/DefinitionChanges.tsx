import { useState } from "react";
import { ChangeMark } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList } from "@/components/FieldList";
import { PanelGroup } from "@/components/graph/PanelBits";
import { Disclosure } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { DeltaTable } from "@/components/StoredFields";
import { definitionFields, type DefinitionChange, type DefinitionField } from "@/lib/proposal-diff";
import { humanize } from "@/lib/text";

const KIND_DISPOSITION = { new: "create", revised: "revise", retired: "retire" } as const;

/**
 * The proposal's definitions (Contracts, Procedures, Lines, ClaimTypes, …):
 * one row each (change, kind, name linked to its page); a row opens to a
 * readable before/after, its fields grouped under human names, long JSON
 * collapsed, the stored record's raw fields last.
 */
export function DefinitionChanges({ definitions }: { definitions: readonly DefinitionChange[] }) {
  const only = definitions.length === 1 ? definitions[0]!.member.path : null;
  const [open, setOpen] = useState<string | null>(only);
  const columns: Column<DefinitionChange>[] = [
    {
      id: "change",
      header: "",
      label: "Change",
      className: "w-4",
      sortValue: (d) => d.kind,
      cell: (d) => <ChangeMark change={KIND_DISPOSITION[d.kind]} />,
    },
    {
      id: "kind",
      header: "Kind",
      className: "whitespace-nowrap",
      sortValue: (d) => d.type,
      filter: { kind: "enum", values: (d) => [d.type] },
      cell: (d) => <span className="text-zinc-300">{d.type}</span>,
    },
    {
      id: "name",
      header: "Name",
      hideable: false,
      sortValue: (d) => d.name ?? d.member.path,
      cell: (d) =>
        d.ref ? (
          <RefLink value={d.ref}>
            <span className="break-all font-mono text-[13px]">{d.name}</span>
          </RefLink>
        ) : (
          <span className="break-all font-mono text-[12.5px] text-zinc-300" title={d.member.path}>
            {d.name ?? d.member.path}
          </span>
        ),
    },
  ];
  return (
    <DataTable
      rows={definitions}
      columns={columns}
      rowKey={(d) => d.member.path}
      rowLabel={(d) => d.name ?? d.member.path}
      label="Definitions"
      urlKey="defs"
      toolbar={definitions.length > 10}
      maxHeight="none"
      open={open}
      onToggle={(key) => setOpen((current) => (current === key ? null : key))}
      expanded={(d) => <DefinitionDiff definition={d} />}
    />
  );
}

function DefinitionDiff({ definition }: { definition: DefinitionChange }) {
  const all = definitionFields(definition.member);
  // Top-level values (`shape`, `replay`) read together first; nested groups under their name.
  const top = all.filter((g) => g.fields.length === 1 && g.fields[0]!.field === "");
  const groups = all.filter((g) => !top.includes(g));
  const one = definition.kind === "new" || definition.kind === "retired";
  const side = definition.kind === "new" ? "after" : "before";
  const rows = (fields: DefinitionField[], group: string) =>
    fields.map((f) => ({
      key: f.path,
      label: f.field || group,
      labelTitle: f.path,
      value: one ? <FieldValue field={f} side={side} /> : <BeforeAfter field={f} />,
    }));
  return (
    <div className="py-1">
      {top.length > 0 && (
        <div className="mt-2 max-w-3xl">
          <FieldList density="compact" fields={top.flatMap((g) => rows(g.fields, g.group))} label="Fields" />
        </div>
      )}
      <div className="grid grid-cols-1 gap-x-8 xl:grid-cols-2">
        {groups.map(({ group, fields }) => (
          <PanelGroup key={group} title={humanize(group)}>
            <FieldList density="compact" fields={rows(fields, group)} label={humanize(group)} />
          </PanelGroup>
        ))}
      </div>
      <Disclosure label="Stored fields" className="mt-3">
        <DeltaTable member={definition.member} />
      </Disclosure>
    </div>
  );
}

function BeforeAfter({ field }: { field: DefinitionField }) {
  if (field.before === undefined) return <FieldValue field={field} side="after" />;
  return (
    <span className="flex flex-wrap items-baseline gap-x-2">
      <span className="min-w-0 text-zinc-500 line-through decoration-zinc-700">
        <FieldValue field={field} side="before" />
      </span>
      <span className="text-zinc-600">→</span>
      <span className="min-w-0">{field.after === undefined ? <span className="text-zinc-600">Absent</span> : <FieldValue field={field} side="after" />}</span>
    </span>
  );
}

/** Long JSON collapses behind its size; a `{kind, name}` pair links. */
function FieldValue({ field, side }: { field: DefinitionField; side: "before" | "after" }) {
  const value = field[side];
  const ref = field.ref?.[side];
  if (ref) return <RefLink value={ref} />;
  if (value === undefined) return <span className="text-zinc-600">—</span>;
  const refs = refsOf(value);
  if (refs) {
    return (
      <span className="flex flex-wrap gap-x-2">
        {refs.map((r) => (
          <RefLink key={r} value={r} />
        ))}
      </span>
    );
  }
  if (value !== null && typeof value === "object") {
    const text = JSON.stringify(value);
    if (text.length <= 80) return <code className="break-all font-mono text-[12px] text-zinc-400">{text}</code>;
    const size = Array.isArray(value) ? `${value.length} items` : `${Object.keys(value).length} fields`;
    return (
      <Disclosure label={size}>
        <code className="block max-h-48 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-4 text-zinc-400">
          {JSON.stringify(value, null, 2)}
        </code>
      </Disclosure>
    );
  }
  return (
    <span className="break-words text-zinc-200">
      <ShownValue value={value} />
    </span>
  );
}

/** A list of `{kind, name}` (or `{target: {kind, name}}`) pins as refs; null for anything else. */
function refsOf(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const out: string[] = [];
  for (const item of value) {
    const record = item !== null && typeof item === "object" ? (item as Record<string, unknown>) : null;
    const target = record && typeof record.target === "object" && record.target !== null ? (record.target as Record<string, unknown>) : record;
    if (!target || typeof target.kind !== "string" || typeof target.name !== "string" || Object.keys(record!).length > 1 && record !== target) return null;
    out.push(`${target.kind}:${target.name}`);
  }
  return out;
}
