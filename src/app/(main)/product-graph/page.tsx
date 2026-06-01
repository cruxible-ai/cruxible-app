'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  fetchProductGraph,
  fetchProductStats,
  type GraphStatsResponse,
} from '@/lib/api-client';
import type { ProductGraphResponse } from '@/lib/api-types';
import {
  GraphArtifactContent,
  type GraphData,
} from '@/components/chat-canvas/canvas/graph-artifact';
import { formatSkuName } from '@/lib/utils/formatters';

const GRAPH_HEIGHT = 600;

export default function ProductGraphPage() {
  const [graphData, setGraphData] = React.useState<GraphData | null>(null);
  const [stats, setStats] = React.useState<GraphStatsResponse | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [graphResult, statsResult] = await Promise.allSettled([
          fetchProductGraph(),
          fetchProductStats(),
        ]);

        if (cancelled) return;

        if (graphResult.status === 'fulfilled') {
          const raw: ProductGraphResponse = graphResult.value;
          setGraphData({
            nodes: raw.nodes.map((n) => ({
              id: n.id,
              name: n.name && n.name !== n.id ? n.name : formatSkuName(n.id),
              category: n.category ?? undefined,
              isFocus: n.is_focus,
            })),
            edges: raw.edges.map((e) => ({
              source: e.source,
              target: e.target,
              edgeType: e.edge_type as 'substitute_of' | 'complement_of',
              confidence: e.confidence,
            })),
          });
        }

        if (statsResult.status === 'fulfilled') {
          setStats(statsResult.value);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Product Graph</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Interactive visualization of product relationships across your catalog
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Products"
          value={loading ? '-' : (stats?.product_count ?? 0)}
          description="In relationship graph"
        />
        <SummaryCard
          title="Total Relationships"
          value={loading ? '-' : (stats?.relationship_count ?? 0)}
          description="Detected connections"
        />
        <SummaryCard
          title="Substitutes"
          value={loading ? '-' : (stats?.substitute_count ?? 0)}
          description="Interchangeable products"
        />
        <SummaryCard
          title="Complements"
          value={loading ? '-' : (stats?.complement_count ?? 0)}
          description="Frequently bought together"
        />
      </div>

      {/* Graph Visualization */}
      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <Skeleton className="w-full" style={{ height: GRAPH_HEIGHT }} />
          ) : graphData && graphData.nodes.length > 0 ? (
            <GraphArtifactContent graph={graphData} height={GRAPH_HEIGHT} showControls />
          ) : (
            <div
              className="flex flex-col items-center justify-center text-muted-foreground text-sm"
              style={{ height: GRAPH_HEIGHT }}
            >
              <p>No product relationships found.</p>
              <p className="mt-1 text-xs">
                Relationships are detected automatically when transaction data is loaded.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

interface SummaryCardProps {
  title: string;
  value: number | string;
  description: string;
}

function SummaryCard({ title, value, description }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
