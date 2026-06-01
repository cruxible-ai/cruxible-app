import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OpenSourceCTA() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12">
          {/* Left - Text */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              MIT licensed, self-hosted
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Cruxible Core runs locally. Read the source, audit the decision paths,
              extend the schema for your domain. Ship it in your own infrastructure.
            </p>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link
                href="https://github.com/cruxible-ai/cruxible-core"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Right - Code preview */}
          <div className="lg:w-1/2">
            <div className="rounded-xl border border-border bg-card p-5 font-mono text-sm">
              <div className="space-y-2 text-muted-foreground">
                <p><span className="text-foreground">$</span> pip install "cruxible-core[mcp]"</p>
                <p><span className="text-foreground">$</span> cruxible init --config config.yaml --data-dir ./data</p>
                <p className="text-xs opacity-50">Initialized graph: 0 entities, 0 relationships</p>
                <p className="mt-2"><span className="text-foreground">$</span> cruxible ingest --mapping drugs --file data/drugs.csv</p>
                <p className="text-xs opacity-50">Loaded 1,247 entities, 3,891 relationships</p>
                <p className="mt-2"><span className="text-foreground">$</span> cruxible query \</p>
                <p className="pl-4">--query check_interactions --param drug_id=warfarin</p>
                <p className="text-xs opacity-50 mt-1">
                  <span className="text-primary">&#x2713;</span> 12 interactions found &mdash; receipt: sha:b4e8f12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
