'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { KPIArtifactContent } from '@/components/chat-canvas/canvas/kpi-artifact';
import { ChartArtifactContent } from '@/components/chat-canvas/canvas/chart-artifact';
import { TableArtifactContent } from '@/components/chat-canvas/canvas/table-artifact';
import { GraphArtifactContent } from '@/components/chat-canvas/canvas/graph-artifact';
import { MarginWaterfallArtifactContent } from '@/components/chat-canvas/canvas/margin-waterfall-artifact';
import { SimilarPromosArtifactContent } from '@/components/chat-canvas/canvas/similar-promos-artifact';
import { SuggestionCard } from '@/components/promo-analysis/suggestion-card';
import { RiskAssessmentCard } from '@/components/canvas/risk-assessment-card';
import { cn } from '@/lib/utils';
import type {
  AnalysisArtifact,
  KPIData,
  ChartData,
  TableData,
  GraphData,
  MarginWaterfallData,
  SimilarPromosData,
  SuggestionsData,
  RiskAssessmentData,
} from '@/hooks/use-promo-analysis';
import type { RiskSuggestion } from '@/lib/demo-data';

interface InlineArtifactProps {
  artifact: AnalysisArtifact;
  isInCanvas: boolean;
  onToggleCanvas: () => void;
  /** Callback when user wants to drill down into a SKU */
  onSkuDrillDown?: (skuName: string) => void;
  /** Suggestions state for the suggestions artifact */
  suggestions?: RiskSuggestion[];
  /** Callback when a suggestion is applied */
  onApplySuggestion?: (suggestionId: string) => void;
}

const borderColors: Record<AnalysisArtifact['type'], string> = {
  kpi: 'border-l-chart-2',
  chart: 'border-l-chart-1',
  table: 'border-l-chart-3',
  markdown: 'border-l-chart-4',
  graph: 'border-l-chart-5',
  'margin-waterfall': 'border-l-amber-500',
  'similar-promos': 'border-l-violet-500',
  'suggestions': 'border-l-emerald-500',
  'risk-assessment': 'border-l-rose-500',
};

const typeLabels: Record<AnalysisArtifact['type'], string> = {
  kpi: 'KPIs',
  chart: 'Chart',
  table: 'Table',
  markdown: 'Text',
  graph: 'Graph',
  'margin-waterfall': 'Margin',
  'similar-promos': 'Similar',
  'suggestions': 'Tips',
  'risk-assessment': 'Risk',
};

/**
 * Artifact displayed inline in the chat panel
 */
function InlineArtifact({
  artifact,
  isInCanvas,
  onToggleCanvas,
  onSkuDrillDown,
  suggestions,
  onApplySuggestion,
}: InlineArtifactProps) {
  return (
    <Card
      className={cn(
        'border-l-4 ml-0 transition-all',
        borderColors[artifact.type],
        isInCanvas && 'ring-2 ring-primary/20'
      )}
    >
      <CardHeader className="pb-2 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-sm truncate">{artifact.title}</h3>
              <Badge variant="muted" size="sm">
                {typeLabels[artifact.type]}
              </Badge>
            </div>
            {artifact.agentName && (
              <p className="text-xs text-muted-foreground mt-1">
                from {artifact.agentName}
                {artifact.timestamp &&
                  ` · ${formatTime(artifact.timestamp)}`}
              </p>
            )}
          </div>

          <Button
            variant={isInCanvas ? 'default' : 'ghost'}
            size="icon-sm"
            onClick={onToggleCanvas}
            className={cn(
              'h-7 w-7 flex-shrink-0',
              isInCanvas && 'bg-primary/10 text-primary hover:bg-primary/20'
            )}
            title={isInCanvas ? 'Remove from canvas' : 'Add to canvas'}
          >
            {isInCanvas ? (
              <CheckInCanvasIcon className="h-3.5 w-3.5" />
            ) : (
              <AddToCanvasIcon className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <ArtifactContent
          artifact={artifact}
          onSkuDrillDown={onSkuDrillDown}
          suggestions={suggestions}
          onApplySuggestion={onApplySuggestion}
        />
      </CardContent>
    </Card>
  );
}

/**
 * Render artifact content based on type
 */
function ArtifactContent({
  artifact,
  onSkuDrillDown,
  suggestions,
  onApplySuggestion,
}: {
  artifact: AnalysisArtifact;
  onSkuDrillDown?: (skuName: string) => void;
  suggestions?: RiskSuggestion[];
  onApplySuggestion?: (suggestionId: string) => void;
}) {
  switch (artifact.type) {
    case 'kpi': {
      const kpiData = artifact.data as KPIData;
      return <KPIArtifactContent kpis={kpiData.items} />;
    }
    case 'chart': {
      const chartData = artifact.data as ChartData;
      return <ChartArtifactContent figure={{ data: chartData.data, layout: chartData.layout }} />;
    }
    case 'table': {
      const tableData = artifact.data as TableData;
      // Convert string[] columns to TableColumn[]
      const columns = tableData.columns.map((col) => ({
        key: col,
        label: col,
      }));
      // For SKU Performance Breakdown, enable drill-down
      const isSkuBreakdown = artifact.title === 'SKU Performance Breakdown';
      const handleRowAction = isSkuBreakdown && onSkuDrillDown
        ? (row: Record<string, unknown>) => {
            const skuName = String(row['SKU'] || '');
            if (skuName) {
              onSkuDrillDown(skuName);
            }
          }
        : undefined;
      return (
        <TableArtifactContent
          columns={columns}
          rows={tableData.rows}
          onRowAction={handleRowAction}
        />
      );
    }
    case 'markdown':
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {artifact.data as string}
        </div>
      );
    case 'graph': {
      const graphData = artifact.data as GraphData;
      return <GraphArtifactContent graph={graphData} />;
    }
    case 'margin-waterfall': {
      const marginData = artifact.data as MarginWaterfallData;
      return <MarginWaterfallArtifactContent data={marginData} />;
    }
    case 'similar-promos': {
      const similarPromosData = artifact.data as SimilarPromosData;
      return <SimilarPromosArtifactContent promos={similarPromosData.promos} />;
    }
    case 'suggestions': {
      // Use the live suggestions state from props, not the artifact data
      const liveSuggestions = suggestions || (artifact.data as SuggestionsData).suggestions;
      return (
        <SuggestionCard
          suggestions={liveSuggestions}
          onApply={onApplySuggestion || (() => {})}
        />
      );
    }
    case 'risk-assessment': {
      const riskData = artifact.data as RiskAssessmentData;
      return <RiskAssessmentCard assessment={riskData.assessment} />;
    }
    default:
      return null;
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Icons

function AddToCanvasIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckInCanvasIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m-7 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export { InlineArtifact };
