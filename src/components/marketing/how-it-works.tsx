import { Upload, Cpu, FileText } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload your data',
    description:
      'Export your sales and promotion history as CSV. Cruxible works with transaction-level data or daily aggregated SKU-level data (12–24 months is ideal).',
  },
  {
    number: 2,
    icon: Cpu,
    title: 'We analyze',
    description:
      'We scan your recent promotions, then run a post-mortem on one to surface hidden margin leakage and quantify true profit impact beyond the promoted items.',
  },
  {
    number: 3,
    icon: FileText,
    title: 'Get your report',
    description:
      'Typically within 3 business days of upload, receive a report on that promotion, including SKU-level drivers so you can see precisely where margin leaked.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            Start with a free promo audit
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {/* Step number circle */}
                <div className="relative z-10 mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-6">
                  <span className="text-primary-foreground font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <step.icon className="w-8 h-8 text-muted-foreground mx-auto mb-4" />

                {/* Content */}
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
