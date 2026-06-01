'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  type NetworkReportData,
  type SubstituteEffect,
  type ComplementEffect,
  type SecondaryCannibalization,
  type VariantEffect,
  formatCurrency,
} from '@/lib/report-types';

interface NetworkEffectsDetailProps {
  data: NetworkReportData;
  className?: string;
}

/**
 * Network Effects Detail section showing:
 * - Top Cannibalization Drivers table (substitutes) with relationship + confidence
 * - Top Halo Drivers table (complements) with relationship + confidence + second-order effects
 */
function NetworkEffectsDetail({ data, className }: NetworkEffectsDetailProps) {
  const hasSubstitutes = data.substitute_effects.length > 0;
  const hasComplements = data.complement_effects.length > 0;

  // Filter to high-confidence effects (≥70%)
  const highConfidenceSubstitutes = data.substitute_effects.filter(e => e.confidence >= 0.70);
  const highConfidenceComplements = data.complement_effects.filter(e => e.confidence >= 0.70);

  return (
    <section className={cn('space-y-6 report-page-break', className)}>
      {/* Section Header */}
      <h2 className="text-xl font-semibold">Network Effects Detail</h2>

      {/* Effects Tables - Full width stacked for more room */}
      <div className="space-y-6">
        {/* Cannibalization Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <XCircleIcon className="w-4 h-4 text-destructive" />
              Top Cannibalization Drivers
            </CardTitle>
            <CardDescription>
              Highest-confidence effects on products NOT included in the promotion
            </CardDescription>
          </CardHeader>
          <CardContent>
            {highConfidenceSubstitutes.length > 0 ? (
              <CannibalizationTable effects={highConfidenceSubstitutes} />
            ) : hasSubstitutes ? (
              <p className="text-sm text-muted-foreground">
                No high-confidence (≥70%) cannibalization effects detected.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No significant cannibalization detected.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Halo Effect Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-success" />
              Top Halo Drivers
            </CardTitle>
            <CardDescription>
              Highest-confidence effects on products NOT included in the promotion
            </CardDescription>
          </CardHeader>
          <CardContent>
            {highConfidenceComplements.length > 0 ? (
              <HaloTable effects={highConfidenceComplements} />
            ) : hasComplements ? (
              <p className="text-sm text-muted-foreground">
                No high-confidence (≥70%) halo effects detected.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No significant halo effects detected.
              </p>
            )}
          </CardContent>
        </Card>

        {/* SKU-Level Detail */}
        <SKUDrilldown
          substituteEffects={highConfidenceSubstitutes}
          complementEffects={highConfidenceComplements}
        />
      </div>
    </section>
  );
}

interface SKUDrilldownProps {
  substituteEffects: SubstituteEffect[];
  complementEffects: ComplementEffect[];
}

/**
 * SKU-level breakdown showing variant effects for products with multiple sizes/colors
 */
function SKUDrilldown({ substituteEffects, complementEffects }: SKUDrilldownProps) {
  // Collect all effects that have variant data
  const effectsWithVariants = [
    ...substituteEffects
      .filter((e) => e.variants && e.variants.length > 0)
      .map((e) => ({
        product_name: e.product_name || e.product_id,
        variants: e.variants!,
        type: 'cannibalization' as const,
      })),
    ...complementEffects
      .filter((e) => e.variants && e.variants.length > 0)
      .map((e) => ({
        product_name: e.product_name || e.product_id,
        variants: e.variants!,
        type: 'halo' as const,
      })),
  ];

  if (effectsWithVariants.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">SKU-Level Breakdown</CardTitle>
        <CardDescription>
          Variant-level effects for products with multiple sizes/colors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {effectsWithVariants.map((effect, idx) => (
          <div key={idx}>
            <h4 className="text-sm font-medium mb-2">{effect.product_name}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Variant</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Baseline</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Actual</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {effect.variants.map((variant) => (
                    <tr key={variant.sku} className="border-b border-border/50">
                      <td className="py-2">
                        {variant.variant_name || variant.sku}
                      </td>
                      <td className="text-right py-2 tabular-nums text-muted-foreground">
                        {variant.baseline_units.toLocaleString()}
                      </td>
                      <td className="text-right py-2 tabular-nums">
                        {variant.actual_units.toLocaleString()}
                      </td>
                      <td className={cn(
                        'text-right py-2 tabular-nums font-medium',
                        variant.effect_units >= 0 ? 'text-success' : 'text-destructive'
                      )}>
                        {variant.effect_units >= 0 ? '+' : ''}{variant.effect_units.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface CannibalizationTableProps {
  effects: SubstituteEffect[];
}

/**
 * Cannibalization table with "Cannibalized By", "Margin Impact", and "Confidence" columns
 */
function CannibalizationTable({ effects }: CannibalizationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 font-medium text-muted-foreground">Product</th>
            <th className="text-left py-2 font-medium text-muted-foreground">Cannibalized By</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Lost Units</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Margin Impact</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {effects.map((effect) => (
            <tr key={effect.product_id} className="border-b border-border/50">
              <td className="py-2 font-medium">
                {effect.product_name || effect.product_id}
              </td>
              <td className="py-2 text-muted-foreground">
                {effect.caused_by_product}{' '}
                <span className="text-xs">(on sale)</span>
              </td>
              <td className="text-right py-2 tabular-nums font-medium text-destructive">
                -{effect.cannibalization_units.toLocaleString()}
              </td>
              <td className="text-right py-2 tabular-nums font-medium text-destructive">
                {effect.margin_impact != null ? formatCurrency(effect.margin_impact) : '—'}
              </td>
              <td className="text-right py-2 tabular-nums">
                {Math.round(effect.confidence * 100)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface HaloTableProps {
  effects: ComplementEffect[];
}

/**
 * Halo table with "Boosted By", "Margin Impact", "Confidence", and second-order effects
 */
function HaloTable({ effects }: HaloTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 font-medium text-muted-foreground">Product</th>
            <th className="text-left py-2 font-medium text-muted-foreground">Boosted By</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Gained Units</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Margin Impact</th>
            <th className="text-right py-2 font-medium text-muted-foreground">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {effects.map((effect) => {
            const hasSecondary = effect.secondary_cannibalization && effect.secondary_cannibalization.length > 0;
            const secondaryLoss = hasSecondary
              ? effect.secondary_cannibalization!.reduce((sum, s) => sum + s.units_lost, 0)
              : 0;
            const secondaryMarginLoss = hasSecondary
              ? effect.secondary_cannibalization!.reduce((sum, s) => sum + (s.margin_impact ?? 0), 0)
              : 0;
            const netEffect = effect.halo_units - secondaryLoss;
            const netMargin = (effect.margin_impact ?? 0) + secondaryMarginLoss;

            return (
              <React.Fragment key={effect.product_id}>
                {/* Main halo row */}
                <tr className="border-b border-border/50">
                  <td className="py-2 font-medium">
                    {effect.product_name || effect.product_id}
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {effect.boosted_by_product}{' '}
                    <span className="text-xs">(on sale)</span>
                  </td>
                  <td className="text-right py-2 tabular-nums font-medium text-success">
                    +{effect.halo_units.toLocaleString()}
                  </td>
                  <td className="text-right py-2 tabular-nums font-medium text-success">
                    {effect.margin_impact != null ? formatCurrency(effect.margin_impact) : '—'}
                  </td>
                  <td className="text-right py-2 tabular-nums">
                    {Math.round(effect.confidence * 100)}%
                  </td>
                </tr>

                {/* Second-order cannibalization rows (indented) */}
                {hasSecondary && effect.secondary_cannibalization!.map((secondary) => (
                  <tr key={secondary.product_id} className="border-b border-border/30">
                    <td className="py-1.5 pl-6 text-muted-foreground text-xs">
                      ↳ <em>cannibalized</em> {secondary.product_name}
                    </td>
                    <td></td>
                    <td className="text-right py-1.5 tabular-nums text-destructive text-xs">
                      -{secondary.units_lost.toLocaleString()}
                    </td>
                    <td className="text-right py-1.5 tabular-nums text-destructive text-xs">
                      {secondary.margin_impact != null ? formatCurrency(secondary.margin_impact) : '—'}
                    </td>
                    <td className="text-right py-1.5 tabular-nums text-muted-foreground text-xs">
                      {secondary.confidence != null ? `${Math.round(secondary.confidence * 100)}%` : '—'}
                    </td>
                  </tr>
                ))}

                {/* Net effect row */}
                {hasSecondary && (
                  <tr className="border-b border-border/50">
                    <td className="py-1.5 pl-6 text-xs font-medium">
                      ↳ <strong>Net effect</strong>
                    </td>
                    <td></td>
                    <td className={cn(
                      'text-right py-1.5 tabular-nums text-xs font-medium',
                      netEffect >= 0 ? 'text-success' : 'text-destructive'
                    )}>
                      {netEffect >= 0 ? '+' : ''}{netEffect.toLocaleString()}
                    </td>
                    <td className={cn(
                      'text-right py-1.5 tabular-nums text-xs font-medium',
                      netMargin >= 0 ? 'text-success' : 'text-destructive'
                    )}>
                      {formatCurrency(netMargin)}
                    </td>
                    <td></td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

export { NetworkEffectsDetail };
export type { NetworkEffectsDetailProps };
