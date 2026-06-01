'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PlotlyChart } from '@/components/charts/plotly-chart';
import { cn } from '@/lib/utils';
import type {
  AnalysisStatus,
  ExecutionResult,
  PlotlyFigure,
  LiftResult,
  MarginResult,
} from '@/lib/api-types';

interface ResultsPanelProps {
  charts: Record<string, PlotlyFigure>;
  results: ExecutionResult | null;
  status: AnalysisStatus;
}

interface KPICardProps {
  label: string;
  value: string;
  variant?: 'default' | 'positive' | 'negative' | 'neutral';
  subtext?: string;
}

function KPICard({ label, value, variant = 'default', subtext }: KPICardProps) {
  return (
    <Card
      className={cn(
        'border-l-4',
        variant === 'positive' && 'border-l-emerald',
        variant === 'negative' && 'border-l-coral-red',
        variant === 'neutral' && 'border-l-cool-steel',
        variant === 'default' && 'border-l-neon-ice'
      )}
    >
      <CardContent className="pt-4 pb-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Right panel showing analysis results with KPIs and charts.
 *
 * Displays summary KPIs and tabbed chart views for baseline,
 * lift, and margin results.
 */
export function ResultsPanel({ charts, results, status }: ResultsPanelProps) {
  // Extract domain objects from results
  const liftResult = results?.agent_results?.['historical_lift_calculator'] as LiftResult | undefined;
  const marginResult = results?.agent_results?.['margin_calculator'] as MarginResult | undefined;

  // Loading state
  if (status === 'running') {
    return (
      <Card className="h-[600px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-[400px]" />
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (status === 'idle' || !results) {
    return (
      <Card className="h-[600px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Results</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[540px]">
          <p className="text-muted-foreground">
            Run an analysis to see results
          </p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <Card className="h-[600px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Results</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[540px]">
          <div className="text-center">
            <Badge className="bg-coral-red text-white mb-2">Failed</Badge>
            <p className="text-muted-foreground">{results.error || 'Analysis failed'}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format values for display
  const liftPercent = liftResult?.lift_percent
    ? `${(liftResult.lift_percent * 100).toFixed(1)}%`
    : '--';
  const incrementalUnits = liftResult?.incremental_units
    ? liftResult.incremental_units.toFixed(0)
    : '--';
  const roi = marginResult?.roi
    ? `${marginResult.roi.toFixed(2)}x`
    : '--';

  // Determine variant based on values
  const liftVariant = liftResult?.lift_percent
    ? liftResult.lift_percent > 0 ? 'positive' : 'negative'
    : 'neutral';
  const roiVariant = marginResult?.roi
    ? marginResult.roi > 1 ? 'positive' : marginResult.roi > 0 ? 'neutral' : 'negative'
    : 'neutral';

  return (
    <Card className="h-[600px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Results</CardTitle>
          <Badge className="bg-emerald text-white">
            {results.duration_ms.toFixed(0)}ms
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          <KPICard
            label="Lift"
            value={liftPercent}
            variant={liftVariant}
          />
          <KPICard
            label="Incremental Units"
            value={incrementalUnits}
            variant={liftVariant}
          />
          <KPICard
            label="ROI"
            value={roi}
            variant={roiVariant}
            subtext={marginResult?.recommendation}
          />
        </div>

        {/* Chart Tabs */}
        <Tabs defaultValue="baseline" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="baseline">Baseline</TabsTrigger>
            <TabsTrigger value="lift">Lift</TabsTrigger>
            <TabsTrigger value="margin">Margin</TabsTrigger>
          </TabsList>

          <TabsContent value="baseline" className="mt-4">
            {charts['baseline_vs_actual'] ? (
              <PlotlyChart figure={charts['baseline_vs_actual']} height={350} />
            ) : (
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                No baseline chart available
              </div>
            )}
          </TabsContent>

          <TabsContent value="lift" className="mt-4">
            {charts['daily_lift'] ? (
              <PlotlyChart figure={charts['daily_lift']} height={350} />
            ) : (
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                No lift chart available
              </div>
            )}
          </TabsContent>

          <TabsContent value="margin" className="mt-4">
            {charts['roi_gauge'] ? (
              <PlotlyChart figure={charts['roi_gauge']} height={350} />
            ) : marginResult ? (
              <div className="h-[350px] p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Incremental Revenue</p>
                      <p className="text-xl font-semibold">
                        ${marginResult.incremental_revenue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Incremental Cost</p>
                      <p className="text-xl font-semibold">
                        ${marginResult.incremental_cost.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Incremental Profit</p>
                      <p className={cn(
                        'text-xl font-semibold',
                        marginResult.incremental_profit > 0 ? 'text-emerald' : 'text-coral-red'
                      )}>
                        ${marginResult.incremental_profit.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Break-even Lift</p>
                      <p className="text-xl font-semibold">
                        {(marginResult.break_even_lift * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  {marginResult.violates_constraints && (
                    <div className="p-3 bg-coral-red/10 rounded-lg border border-coral-red/20">
                      <p className="text-sm font-medium text-coral-red">Constraint Violations</p>
                      <ul className="text-sm text-coral-red mt-1 list-disc list-inside">
                        {marginResult.constraint_violations?.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                No margin data available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
