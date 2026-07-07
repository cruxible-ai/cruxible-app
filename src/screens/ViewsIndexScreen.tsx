import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInstanceId, useQueryCatalog } from "@/api/hooks";
import { defChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

interface CatalogQuery {
  name?: string | null;
  description?: string | null;
  mode?: string | null;
  entry_point?: string | null;
  returns?: string | null;
  required_params?: string[] | null;
}

/** Inline runner for a parameterized view: one input per required param. */
function ParamForm({ query }: { query: CatalogQuery }) {
  const instanceId = useInstanceId();
  const navigate = useNavigate();
  const params = query.required_params ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const complete = params.every((p) => (values[p] ?? "").trim() !== "");

  function run() {
    const sp = new URLSearchParams();
    for (const p of params) sp.set(p, values[p]!.trim());
    navigate(`/i/${instanceId}/views/${query.name}?${sp.toString()}`);
  }

  return (
    <form
      className="flex flex-wrap items-center gap-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        if (complete) run();
      }}
    >
      {params.map((p) => (
        <input
          key={p}
          value={values[p] ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, [p]: e.target.value }))}
          placeholder={p}
          className="w-44 rounded border border-zinc-800 bg-transparent px-2 py-0.5 font-mono text-[11px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
        />
      ))}
      <button
        type="submit"
        disabled={!complete}
        className="rounded border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-200 enabled:hover:border-zinc-500 disabled:opacity-40"
      >
        Run
      </button>
    </form>
  );
}

/**
 * Every named query in the catalog: parameterless collection views run with
 * one click (same links as the sidebar), parameterized context views get an
 * inline param form — previously they were reachable only from entity pages.
 */
export function ViewsIndexScreen() {
  usePageTitle("Views");
  const instanceId = useInstanceId();
  const catalog = useQueryCatalog();

  if (catalog.isPending) return <LoadState />;
  if (catalog.error) return <LoadState error={catalog.error} />;
  const items = (catalog.data?.items ?? []) as CatalogQuery[];
  const queues = items.filter((q) => (q.required_params ?? []).length === 0);
  const parameterized = items.filter((q) => (q.required_params ?? []).length > 0);

  const meta = (q: CatalogQuery) => (
    <span className="flex flex-wrap items-center gap-1.5 text-[10px]">
      {q.entry_point && (
        <span className={defChipClass}>
          <span className="text-zinc-500">from</span>
          <span className="text-zinc-300">{humanize(q.entry_point)}</span>
        </span>
      )}
      {q.returns && (
        <span className={defChipClass}>
          <span className="text-zinc-500">returns</span>
          <span className="text-zinc-300">{humanize(q.returns)}</span>
        </span>
      )}
    </span>
  );

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Views</h1>
        <p className="mt-1 text-[12px] text-zinc-500">
          The instance's named queries — deterministic, receipted reads. Parameterized views
          take their required ids below; entity pages link them pre-filled.
        </p>
      </header>

      <Panel title="Queues" meta={<span className="font-mono">{queues.length}</span>}>
        {queues.length === 0 && <EmptyState>No parameterless views declared.</EmptyState>}
        <div className="divide-y divide-zinc-800/60">
          {queues.map((q) => (
            <div key={q.name} className="flex items-baseline gap-3 py-1.5">
              <Link
                to={`/i/${instanceId}/views/${q.name}`}
                className="w-72 shrink-0 truncate text-[13px] text-zinc-200 hover:underline"
              >
                {humanize(q.name ?? "")}
              </Link>
              <span className="min-w-0 flex-1 truncate text-[12px] text-zinc-500">
                {q.description}
              </span>
              {meta(q)}
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-3">
        <Panel
          title="Parameterized views"
          meta={<span className="font-mono">{parameterized.length}</span>}
        >
          {parameterized.length === 0 && <EmptyState>No parameterized views declared.</EmptyState>}
          <div className="divide-y divide-zinc-800/60">
            {parameterized.map((q) => (
              <div key={q.name} className="py-2">
                <div className="flex items-baseline gap-3">
                  <span className="w-72 shrink-0 truncate text-[13px] text-zinc-200">
                    {humanize(q.name ?? "")}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-zinc-500">
                    {q.description}
                  </span>
                  {meta(q)}
                </div>
                <div className="mt-1.5">
                  <ParamForm query={q} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
