import Link from 'next/link';
import { ShoppingCart, Boxes } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SolutionsTeaser() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">Solutions</h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Vertical-specific applications built on Cruxible Core.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Active: Retail */}
          <Link href="/solutions/retail" className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <ShoppingCart className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-lg">Retail Promotions</CardTitle>
                <CardDescription>
                  Measure promo lift, detect cannibalization, and plan with evidence.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Partner solution */}
          <Link href="/contact" className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <Boxes className="w-6 h-6 text-primary mb-2" />
                <CardTitle className="text-lg">Your Vertical</CardTitle>
                <CardDescription>
                  We build end-to-end Cruxible solutions for the right partner.
                  Tell us about your domain.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
