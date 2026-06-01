import { Settings, Database, Search, MessageSquare } from 'lucide-react';
import { EntityGraph } from './visuals/entity-graph';

const primitives = [
  {
    icon: Settings,
    title: 'Config',
    description: 'Define your entity graph schema, constraints, and permission tiers in declarative YAML.',
  },
  {
    icon: Database,
    title: 'Ingest',
    description: 'Load entities and relationships from any source. Schema validation runs automatically.',
  },
  {
    icon: Search,
    title: 'Query',
    description: 'Ask causal questions. Agents execute deterministically and return receipts for every step.',
  },
  {
    icon: MessageSquare,
    title: 'Feedback',
    description: 'Record outcomes against predictions. The system calibrates edge weights and improves over time.',
  },
];

export function CorePrimitives() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">Four primitives, one loop</h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Every Cruxible Core deployment follows the same pattern: configure your domain,
            ingest data, query for decisions, and feed outcomes back.
          </p>
        </div>

        {/* Visual */}
        <div className="mb-12">
          <div className="aspect-[5/3] max-w-lg mx-auto rounded-xl overflow-hidden flex items-center justify-center p-3 bg-card border border-border">
            <EntityGraph />
          </div>
          <p className="text-xs text-muted-foreground/50 text-center mt-3">
            Example entity graph — products, promotions, and stores connected by typed relationships
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {primitives.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <p.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-base font-medium mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
