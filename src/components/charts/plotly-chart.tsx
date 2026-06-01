'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { PlotlyFigure } from '@/lib/api-types';

// Dynamic import to avoid SSR issues with Plotly
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />,
});

interface PlotlyChartProps {
  figure: PlotlyFigure;
  className?: string;
  height?: number;
}

/**
 * SSR-safe Plotly chart wrapper.
 *
 * Renders Plotly figures from the backend API response.
 * Uses dynamic import to prevent SSR hydration issues.
 */
export function PlotlyChart({ figure, className, height = 300 }: PlotlyChartProps) {
  return (
    <div className={className}>
      <Plot
        data={figure.data as Plotly.Data[]}
        layout={{
          ...figure.layout,
          autosize: true,
          height,
          margin: { l: 50, r: 20, t: 40, b: 40 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
        }}
        config={{
          responsive: true,
          displayModeBar: false,
          ...(figure.config || {}),
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
