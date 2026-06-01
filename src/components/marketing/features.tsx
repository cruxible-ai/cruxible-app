import { LiftChart, NetworkGraph, EvidenceTimeline, Flywheel } from './visuals';
import { type ReactNode } from 'react';

interface Feature {
  title: string;
  description: string;
  visual: ReactNode;
}

const features: Feature[] = [
  {
    title: 'Measure true lift',
    description:
      'See real promo impact with counterfactual baselines, not just revenue during the promo.',
    visual: <LiftChart />,
  },
  {
    title: 'Make product relationships explicit',
    description:
      'See how promotions affect related products through an explicit, reviewable relationship graph—rather than hidden assumptions inside a black box.',
    visual: <NetworkGraph />,
  },
  {
    title: 'Plan with evidence, not guesswork',
    description:
      'Test upcoming promotions against similar past events and your validated product relationships to spot hidden risk before launch.',
    visual: <EvidenceTimeline />,
  },
  {
    title: 'Turn decisions into a flywheel',
    description:
      'Cruxible captures the reasoning behind promo decisions with an auditable trail—then learns from outcomes to improve automatically.',
    visual: <Flywheel />,
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Feature cards - vertically stacked */}
        <div className="flex flex-col gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Feature visual */}
              <div className="w-full lg:w-1/2">
                <div
                  className="aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center p-6 bg-card border border-border"
                >
                  {feature.visual}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 lg:px-8">
                <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
