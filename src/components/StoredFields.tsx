import type { Schemas } from "@/api/schemas";
import { LongText } from "@/components/LongText";
import { ShownValue } from "@/components/ShownValue";
import { groupDeltas } from "@/lib/review";

type Member = Schemas["ReviewedMember"];

/**
 * A member's stored-record fields as the review diffs them, grouped by
 * top-level field: a created member lists its new values, a revised one
 * before -> after. The raw view behind a "Stored fields" disclosure; never
 * inline in the grid.
 */
export function DeltaTable({ member }: { member: Member }) {
  const created = member.semantic_delta.every((d) => d.before.state === "absent");
  return (
    <div className="space-y-2 border-l border-zinc-800 pl-3">
      {groupDeltas(member).map(({ group, deltas }) => (
        <div key={group}>
          {!(deltas.length === 1 && deltas[0]!.field_path.replace(/^\//, "") === group) && <div className="t-meta mb-0.5">{group}</div>}
          <dl className="grid grid-cols-[minmax(6rem,14rem)_minmax(0,1fr)] gap-x-4 gap-y-0.5 text-[12px] leading-5">
            {deltas.map((delta) => (
              <div key={delta.field_path} className="contents">
                <dt className="truncate font-mono text-zinc-500" title={delta.field_path}>
                  {delta.field_path.startsWith(`/${group}/`) ? <span className="pl-3">{delta.field_path.slice(group.length + 2)}</span> : delta.field_path}
                </dt>
                <dd className="min-w-0">
                  {created ? (
                    <DeltaValue side={delta.after} />
                  ) : (
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="min-w-0 text-zinc-500 line-through decoration-zinc-700">
                        <DeltaValue side={delta.before} />
                      </span>
                      <span className="text-zinc-600">→</span>
                      <span className="min-w-0">
                        <DeltaValue side={delta.after} />
                      </span>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function DeltaValue({ side }: { side: Schemas["SemanticFieldDelta"]["after"] }) {
  if (side.state !== "present") return <span className="text-zinc-600">Absent</span>;
  const value = side.value;
  if (value !== null && typeof value === "object") {
    return <code className="block max-h-24 overflow-auto break-all font-mono text-[11px] leading-4 text-zinc-400">{JSON.stringify(value)}</code>;
  }
  if (typeof value === "string" && value.length > 160) return <LongText text={value} lines={2} className="text-zinc-300" />;
  return (
    <span className="break-all text-zinc-300">
      <ShownValue value={value} />
    </span>
  );
}
