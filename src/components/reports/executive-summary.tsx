'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard, KPIGrid } from '@/components/ui/kpi-card';
import { ChartArtifactContent } from '@/components/chat-canvas/canvas/chart-artifact';
import { formatCurrency, formatPercent, type NetworkReportData } from '@/lib/report-types';

interface ExecutiveSummaryProps {
  data: NetworkReportData;
  className?: string;
}

/**
 * Executive Summary section showing the key "aha moment":
 * Gross Lift → Net Margin Impact after accounting for network effects.
 */
function ExecutiveSummary({ data, className }: ExecutiveSummaryProps) {
  // Waterfall bar data
  const waterfallBars = [
    { label: 'Gross Lift', value: data.gross_lift_margin, color: 'positive' as const },
    { label: 'Cannibalization', value: data.cannibalization_margin, color: 'negative' as const },
    { label: 'Halo Effect', value: data.halo_margin, color: 'positive' as const },
    { label: 'Net Impact', value: data.net_impact_margin, color: data.net_impact_margin >= 0 ? 'positive' as const : 'negative' as const, isTotal: true },
  ];

  const maxValue = Math.max(...waterfallBars.map((b) => Math.abs(b.value)));

  // Calculate the gap between reported and true impact
  const marginGap = data.reported_margin - data.net_impact_margin;

  return (
    <section className={cn('space-y-6', className)}>
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold">Executive Summary</h2>
        <p className="text-sm text-muted-foreground">Estimated margin impact from promo and network effects</p>
      </div>

      {/* Hero: The "Aha Moment" - Before vs After */}
      <Card className="bg-gradient-to-r from-background to-muted/20 border-2">
        <CardContent className="py-6">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
            {/* Naive Impact */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Naive Impact</p>
              <p className="text-3xl font-bold">{formatCurrency(data.reported_margin)}</p>
              <p className="text-xs text-muted-foreground mt-1">Revenue − COGS on promo items</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowRightIcon className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* True Impact */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">True Portfolio Impact</p>
              <p className="text-3xl font-bold text-success">{formatCurrency(data.net_impact_margin)}</p>
              <p className="text-xs text-muted-foreground mt-1">After network effects</p>
            </div>
          </div>

          {/* The Punchline */}
          <div className="text-center mt-4 pt-4 border-t">
            <p className="text-sm">
              <span className="font-semibold text-destructive">
                Naive measurement overstates ROI by {formatPercent(data.true_roi_vs_gross_pct)}
              </span>
              <span className="text-muted-foreground"> — a </span>
              <span className="font-semibold">
                {formatCurrency(marginGap)}
              </span>
              <span className="text-muted-foreground"> difference</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <KPIGrid cols={4}>
        <KPICard
          label="Reported Promo Margin"
          value={formatCurrency(data.reported_margin)}
          change={`${data.gross_lift_units.toLocaleString()} units`}
          trend="neutral"
        />
        <KPICard
          label="Cannibalization"
          value={formatCurrency(data.cannibalization_margin)}
          change={`${formatPercent(data.cannibalization_pct_of_gross)} of gross`}
          trend="negative"
        />
        <KPICard
          label="Halo"
          value={formatCurrency(data.halo_margin)}
          change={`${formatPercent(data.halo_pct_of_gross)} of gross`}
          trend="positive"
        />
        <KPICard
          label="Net Margin Impact"
          value={formatCurrency(data.net_impact_margin)}
          change={`−${formatPercent(data.true_roi_vs_gross_pct)} vs reported`}
          trend={data.net_impact_margin >= 0 ? 'positive' : 'negative'}
        />
      </KPIGrid>

      {/* Baseline vs Actual Chart */}
      {data.baseline_chart && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Baseline vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartArtifactContent figure={data.baseline_chart} height={250} />
          </CardContent>
        </Card>
      )}

      {/* Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Margin Waterfall</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {waterfallBars.map((bar, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className={cn(bar.isTotal && 'font-semibold')}>{bar.label}</span>
                  <span
                    className={cn(
                      'font-medium',
                      bar.value >= 0 ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {bar.value >= 0 ? '+' : ''}{formatCurrency(bar.value)}
                  </span>
                </div>
                <div className="h-6 w-full bg-muted/30 rounded overflow-hidden relative">
                  {/* Center line for reference */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                  {/* Bar */}
                  <div
                    className={cn(
                      'absolute top-1 bottom-1 rounded',
                      bar.value >= 0 ? 'bg-success' : 'bg-destructive',
                      bar.isTotal && 'opacity-80'
                    )}
                    style={{
                      width: `${(Math.abs(bar.value) / maxValue) * 45}%`,
                      left: bar.value >= 0 ? '50%' : undefined,
                      right: bar.value < 0 ? '50%' : undefined,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Learnings */}
      {data.key_learnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <LightbulbIcon className="w-4 h-4 text-warning" />
              Key Learnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.key_learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  <div>
                    <span>{learning.text}</span>
                    {learning.comparison_basis && (
                      <span className="text-xs text-muted-foreground ml-1">
                        ({learning.comparison_basis})
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export { ExecutiveSummary };
export type { ExecutiveSummaryProps };
