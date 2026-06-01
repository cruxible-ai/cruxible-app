import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Demo examples - these will be seeded into SQLite in production
const DEMO_EXAMPLES = [
  {
    id: 'demo-holiday-sale',
    title: 'Holiday Sale - High Lift',
    description: 'Black Friday promotion with strong incremental lift',
    lift: '+24%',
    roi: '2.1x',
    tags: ['High Performer', 'Seasonal'],
    variant: 'success' as const,
  },
  {
    id: 'demo-flash-sale',
    title: 'Flash Sale - Margin Loss',
    description: 'High volume but negative margin due to deep discounts',
    lift: '+45%',
    roi: '0.6x',
    tags: ['Cautionary', 'Deep Discount'],
    variant: 'destructive' as const,
  },
  {
    id: 'demo-multi-sku',
    title: 'Multi-SKU Bundle',
    description: 'Campaign across 3 SKUs with cannibalization effects',
    lift: '+18%',
    roi: '1.4x',
    tags: ['Campaign', 'Multi-SKU'],
    variant: 'warning' as const,
  },
  {
    id: 'demo-back-to-school',
    title: 'Back to School - Multi-Week',
    description: '14-day promotion with daily breakdown analysis',
    lift: '+31%',
    roi: '1.8x',
    tags: ['Extended', 'Seasonal'],
    variant: 'success' as const,
  },
  {
    id: 'demo-clearance',
    title: 'Clearance - Low Performer',
    description: 'Minimal lift with negative margin impact',
    lift: '+5%',
    roi: '-0.2x',
    tags: ['Underperformer', 'Clearance'],
    variant: 'destructive' as const,
  },
];

function getVariantColor(variant: 'success' | 'destructive' | 'warning') {
  switch (variant) {
    case 'success':
      return 'text-success';
    case 'destructive':
      return 'text-destructive';
    case 'warning':
      return 'text-warning';
  }
}

export default function DemoPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-onyx dark:text-white">
            Demo Examples
          </h1>
          <Badge variant="primary-soft">DEMO</Badge>
        </div>
        <p className="text-muted-foreground">
          Explore pre-computed promo analyses. Click any card to see the full audit trail and capture a decision.
        </p>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_EXAMPLES.map((example) => (
          <Link key={example.id} href={`/runs/${example.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{example.title}</CardTitle>
                  <Badge variant="muted" size="sm">DEMO</Badge>
                </div>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Lift</div>
                    <div className={`text-xl font-semibold ${getVariantColor(example.variant)}`}>
                      {example.lift}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">ROI</div>
                    <div className={`text-xl font-semibold ${getVariantColor(example.variant)}`}>
                      {example.roi}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {example.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
