import Link from 'next/link';
import { Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Row = {
  label: string;
  core: string | boolean;
  cloud: string | boolean;
};

const rows: Row[] = [
  { label: 'MCP server for agents', core: true, cloud: true },
  { label: 'Knowledge graph engine', core: true, cloud: true },
  { label: 'Deterministic execution', core: true, cloud: true },
  { label: 'DAG-based receipts', core: true, cloud: true },
  { label: 'Scope', core: 'Machine storage, thousands of entities', cloud: 'Managed storage, millions of entities' },
  { label: 'Persistent projects & snapshots', core: false, cloud: true },
  { label: 'Async ingest & query jobs', core: false, cloud: true },
  { label: 'Team access & RBAC', core: false, cloud: true },
  { label: 'Audit logs & compliance export', core: false, cloud: true },
  { label: 'API-compatible with local workflows', core: false, cloud: true },
  { label: 'Price', core: 'Free, open source', cloud: 'Coming soon' },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-primary" />;
  }
  if (value === false) {
    return <Minus className="w-4 h-4 text-muted-foreground/40" />;
  }
  return <span className="text-sm text-foreground font-light">{value}</span>;
}

export function DeploymentComparison() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            Start local, scale when ready
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Cruxible Core runs on your machine — fast iteration, full privacy. When workloads
            outgrow a single machine, Cruxible Cloud adds managed compute, team access, and
            infrastructure you don't have to run.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 pb-3" />
                <th className="text-center p-4 pb-3 w-[140px] md:w-[180px]">
                  <span className="text-sm font-medium text-foreground">Cruxible Core</span>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">
                    Build with agents
                  </p>
                </th>
                <th className="text-center p-4 pb-3 w-[140px] md:w-[180px] bg-primary/[0.03]">
                  <span className="text-sm font-medium text-foreground">Cruxible Cloud</span>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">
                    Scale with your team
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i < rows.length - 1 ? 'border-b border-border/50' : ''}
                >
                  <td className="p-4 py-3 text-sm text-muted-foreground font-light">
                    {row.label}
                  </td>
                  <td className="p-4 py-3 text-center">
                    <span className="inline-flex justify-center">
                      <Cell value={row.core} />
                    </span>
                  </td>
                  <td className="p-4 py-3 text-center bg-primary/[0.03]">
                    <span className="inline-flex justify-center">
                      <Cell value={row.cloud} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border">
                <td className="p-4" />
                <td className="p-4 text-center">
                  <Button variant="outline" size="sm" className="text-sm" asChild>
                    <Link
                      href="https://github.com/cruxible-ai/cruxible-core"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </Link>
                  </Button>
                </td>
                <td className="p-4 text-center bg-primary/[0.03]">
                  <Button size="sm" className="text-sm" asChild>
                    <Link href="#waitlist">Join the waitlist</Link>
                  </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
