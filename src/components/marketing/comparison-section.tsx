import { Check, X } from 'lucide-react';

const withoutItems = [
  'Relationships shift depending on how you ask',
  'No structured memory between sessions',
  'Results vary between identical prompts',
  '"Trust me" \u2014 no audit trail',
  'Constraints checked by vibes',
  'Learns nothing from outcomes',
];

const withItems = [
  'Explicit knowledge graph you can inspect',
  'Persistent entity store across runs',
  'Deterministic execution, same input \u2192 same output',
  'DAG-based receipt for every decision',
  'Declared constraints validated before results',
  'Feedback loop calibrates edge weights over time',
];

export function ComparisonSection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            What changes with Cruxible
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            LLM agents are powerful but unreliable decision makers. Cruxible grounds them
            with structured knowledge, reproducible execution, and provenance for every result.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Without Cruxible */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-base font-medium text-muted-foreground mb-5">
              LLM agents alone
            </h3>
            <ul className="space-y-4">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Cruxible */}
          <div className="rounded-xl border border-primary/30 bg-card p-6">
            <h3 className="text-base font-medium text-foreground mb-5">
              With Cruxible
            </h3>
            <ul className="space-y-4">
              {withItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
