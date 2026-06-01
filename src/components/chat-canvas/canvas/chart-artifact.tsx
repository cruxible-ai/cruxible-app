'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme/theme-provider';

// Dynamic import to avoid SSR issues with Plotly
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />,
});

interface PlotlyFigure {
  data: unknown[];
  layout: Record<string, unknown>;
  config?: Record<string, unknown>;
}

interface ChartArtifactContentProps {
  /** Plotly figure data */
  figure: PlotlyFigure;
  /** Chart height */
  height?: number;
  /** Enable zoom/pan interactions */
  interactive?: boolean;
  className?: string;
}

/**
 * Renders a Plotly chart inside an artifact.
 * Wrapper around the existing PlotlyChart component with artifact-specific defaults.
 */
function ChartArtifactContent({
  figure,
  height = 300,
  interactive = true,
  className,
}: ChartArtifactContentProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const layout = React.useMemo(() => {
    const fontColor = isDark ? '#FAFAF9' : '#0F0F10';
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    return {
      ...figure.layout,
      autosize: true,
      height,
      margin: { l: 50, r: 20, t: 30, b: 50 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      font: { color: fontColor },
      xaxis: {
        ...(figure.layout?.xaxis as Record<string, unknown> || {}),
        tickfont: { color: fontColor },
        titlefont: { color: fontColor },
        gridcolor: gridColor,
        linecolor: gridColor,
        zerolinecolor: gridColor,
      },
      yaxis: {
        ...(figure.layout?.yaxis as Record<string, unknown> || {}),
        tickfont: { color: fontColor },
        titlefont: { color: fontColor },
        gridcolor: gridColor,
        linecolor: gridColor,
        zerolinecolor: gridColor,
      },
      legend: {
        ...(figure.layout?.legend as Record<string, unknown> || {}),
        font: { color: fontColor },
      },
    };
  }, [figure.layout, height, isDark]);

  const config = React.useMemo(() => ({
    responsive: true,
    displayModeBar: interactive ? ('hover' as const) : false,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as Plotly.ModeBarDefaultButtons[],
    ...figure.config,
  }), [figure.config, interactive]);

  return (
    <div className={cn('w-full overflow-hidden', className)} style={{ height }}>
      <Plot
        data={figure.data as Plotly.Data[]}
        layout={layout}
        config={config}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export { ChartArtifactContent };
export type { ChartArtifactContentProps, PlotlyFigure };
