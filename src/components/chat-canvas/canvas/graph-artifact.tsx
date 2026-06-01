'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme/theme-provider';
import type { ForceGraphMethods } from 'react-force-graph-2d';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - d3-force is a transitive dep without bundled types
import { forceCollide, forceX, forceY } from 'd3-force';

// Dynamic import to avoid SSR issues with canvas-based library
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[400px]" />,
});

export interface GraphNode {
  id: string;
  name: string;
  category?: string;
  isFocus: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  edgeType: 'substitute_of' | 'complement_of';
  confidence: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphArtifactContentProps {
  graph: GraphData;
  height?: number;
  className?: string;
  showControls?: boolean;
}

// Default height increased for better node spacing
const DEFAULT_HEIGHT = 350;

/**
 * Interactive force-directed graph visualization for product relationships.
 * Shows substitutes and complements with color-coded edges and confidence-based thickness.
 */
function GraphArtifactContent({
  graph,
  height = DEFAULT_HEIGHT,
  className,
  showControls = false,
}: GraphArtifactContentProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const containerRef = React.useRef<HTMLDivElement>(null);
  const graphRef = React.useRef<ForceGraphMethods>();
  const [dimensions, setDimensions] = React.useState({ width: 0, height });
  const [confidenceThreshold, setConfidenceThreshold] = React.useState(
    showControls ? 0.5 : 0,
  );
  const [activeCategories, setActiveCategories] = React.useState<Set<string> | null>(null);
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  // Handle container resize
  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height,
        });
      }
    };

    // Initial measurement
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [height]);

  // Color definitions matching the design system
  const colors = React.useMemo(
    () => ({
      focusNode: '#4FF2E3', // chart-1 / brand-ice - promo products
      relatedNode: '#B8A3E0', // chart-5 / purple - related products
      substituteEdge: '#FF6B6B', // chart-4 / coral - substitute relationships
      complementEdge: '#22C55E', // chart-2 / emerald - complement relationships
      text: isDark ? '#FAFAF9' : '#0F0F10',
      background: 'transparent',
    }),
    [isDark],
  );

  // Collect all unique categories
  const allCategories = React.useMemo(() => {
    const cats = new Set<string>();
    for (const node of graph.nodes) {
      if (node.category) cats.add(node.category);
    }
    return Array.from(cats).sort();
  }, [graph.nodes]);

  // Focus node IDs for keeping them visible
  const focusIds = React.useMemo(
    () => new Set(graph.nodes.filter((n) => n.isFocus).map((n) => n.id)),
    [graph.nodes],
  );

  // Transform data with confidence filtering and category filtering
  const graphData = React.useMemo(() => {
    // 1. Filter edges by confidence threshold
    const filteredEdges = graph.edges.filter(
      (e) => e.confidence >= confidenceThreshold,
    );

    // 2. Determine which nodes are connected after edge filtering
    const connectedIds = new Set<string>();
    for (const e of filteredEdges) {
      connectedIds.add(e.source);
      connectedIds.add(e.target);
    }

    // 3. Filter nodes: keep connected nodes + focus nodes always
    let filteredNodes = graph.nodes.filter(
      (n) => connectedIds.has(n.id) || focusIds.has(n.id),
    );

    // 4. Apply category filter if active
    if (activeCategories !== null && activeCategories.size > 0) {
      const categoryNodeIds = new Set(
        filteredNodes
          .filter(
            (n) =>
              (n.category && activeCategories.has(n.category)) ||
              focusIds.has(n.id),
          )
          .map((n) => n.id),
      );
      filteredNodes = filteredNodes.filter((n) => categoryNodeIds.has(n.id));
    }

    const visibleNodeIds = new Set(filteredNodes.map((n) => n.id));

    // 5. Final edge list: both endpoints must be visible
    const visibleEdges = filteredEdges.filter(
      (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target),
    );

    return {
      nodes: filteredNodes.map((n) => ({
        id: n.id,
        name: n.name,
        category: n.category,
        isFocus: n.isFocus,
        color: n.isFocus ? colors.focusNode : colors.relatedNode,
      })),
      links: visibleEdges.map((e) => ({
        source: e.source,
        target: e.target,
        edgeType: e.edgeType,
        confidence: e.confidence,
        color:
          e.edgeType === 'substitute_of'
            ? colors.substituteEdge
            : colors.complementEdge,
      })),
      // Track totals for display
      _totalNodes: graph.nodes.length,
      _totalEdges: graph.edges.length,
    };
  }, [graph, colors, confidenceThreshold, activeCategories, focusIds]);

  // Category clustering via d3 forces
  React.useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;

    // Compute category center positions arranged in a circle
    const categoryPositions: Record<string, { x: number; y: number }> = {};
    if (allCategories.length > 0) {
      const radius = Math.min(dimensions.width, dimensions.height) * 0.3;
      allCategories.forEach((cat, i) => {
        const angle = (2 * Math.PI * i) / allCategories.length - Math.PI / 2;
        categoryPositions[cat] = {
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
        };
      });
    }

    // Apply category clustering forces
    fg.d3Force(
      'x',
      forceX()
        .x((d: { category?: string }) => categoryPositions[d.category ?? '']?.x ?? 0)
        .strength(allCategories.length > 1 ? 0.15 : 0),
    );
    fg.d3Force(
      'y',
      forceY()
        .y((d: { category?: string }) => categoryPositions[d.category ?? '']?.y ?? 0)
        .strength(allCategories.length > 1 ? 0.15 : 0),
    );
    fg.d3Force('collide', forceCollide(15));

    // Tune charge and link forces
    const charge = fg.d3Force('charge');
    if (charge && typeof charge.strength === 'function') {
      charge.strength(-200);
    }
    const link = fg.d3Force('link');
    if (link) {
      if (typeof link.distance === 'function') link.distance(80);
      if (typeof link.strength === 'function') link.strength(0.1);
    }

    fg.d3ReheatSimulation();
  }, [allCategories, dimensions, graphData]);

  // Custom node rendering with smart labels
  const paintNode = React.useCallback(
    (
      node: {
        x?: number;
        y?: number;
        id?: string | number;
        color?: string;
        name?: string;
        isFocus?: boolean;
        [key: string]: unknown;
      },
      ctx: CanvasRenderingContext2D,
      globalScale: number,
    ) => {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const radius = node.isFocus ? 8 : 6;

      // Draw node circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = node.color || colors.focusNode;
      ctx.fill();

      // Draw node border
      ctx.strokeStyle = isDark
        ? 'rgba(255,255,255,0.3)'
        : 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Smart label visibility: show when zoomed in, hovered, or focus node
      const isHovered = hoveredNode != null && hoveredNode === String(node.id);
      const showLabel = globalScale > 2 || isHovered || node.isFocus;

      if (showLabel && node.name) {
        const fontSize = Math.max(10 / globalScale, 3);
        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Slightly brighter for hovered
        if (isHovered) {
          ctx.fillStyle = colors.focusNode;
        } else {
          ctx.fillStyle = colors.text;
        }
        ctx.fillText(node.name, x, y + radius + 2);
      }
    },
    [colors, isDark, hoveredNode],
  );

  // Auto zoom-to-fit after simulation settles
  const handleEngineStop = React.useCallback(() => {
    graphRef.current?.zoomToFit(400, 40);
  }, []);

  // Toggle a category filter
  const toggleCategory = React.useCallback((cat: string) => {
    setActiveCategories((prev) => {
      if (prev === null) {
        // First click: show only this category
        return new Set([cat]);
      }
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
        // If empty, reset to show all
        return next.size === 0 ? null : next;
      }
      next.add(cat);
      return next;
    });
  }, []);

  if (graph.nodes.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center h-[200px] text-muted-foreground text-sm',
          className,
        )}
      >
        No product relationships found
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full overflow-hidden rounded bg-muted/20 relative',
        className,
      )}
      style={{ height }}
    >
      {dimensions.width > 0 && (
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor={colors.background}
          // Node rendering
          nodeCanvasObject={paintNode}
          nodePointerAreaPaint={(node, color, ctx) => {
            const x = node.x ?? 0;
            const y = node.y ?? 0;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
          }}
          nodeLabel={(node) => {
            const n = node as {
              name?: string;
              category?: string;
              isFocus?: boolean;
            };
            const type = n.isFocus ? 'Promo Product' : 'Related Product';
            return `${n.name || 'Unknown'}${n.category ? ` (${n.category})` : ''}\n${type}`;
          }}
          // Edge rendering
          linkColor={(link) =>
            (link as { color?: string }).color || colors.substituteEdge
          }
          linkWidth={(link) => {
            const l = link as { confidence?: number };
            return 1 + (l.confidence || 0.5) * 3;
          }}
          linkLineDash={(link) => {
            const l = link as { edgeType?: string };
            return l.edgeType === 'substitute_of' ? [4, 2] : null;
          }}
          linkLabel={(link) => {
            const l = link as { edgeType?: string; confidence?: number };
            const type =
              l.edgeType === 'substitute_of' ? 'Substitute' : 'Complement';
            return `${type}: ${Math.round((l.confidence || 0) * 100)}% confidence`;
          }}
          // Interactivity
          enableZoomInteraction
          enablePanInteraction
          enableNodeDrag
          onNodeHover={(node) => {
            setHoveredNode(
              node?.id != null ? String(node.id) : null,
            );
          }}
          // Force simulation settings
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          cooldownTicks={200}
          warmupTicks={100}
          onEngineStop={handleEngineStop}
        />
      )}

      {/* Legend - positioned within the artifact */}
      <div className="absolute bottom-2 left-2 flex gap-4 text-xs bg-background/80 backdrop-blur-sm rounded px-2 py-1 z-10">
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.focusNode }}
          />
          <span>Promo SKU</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.relatedNode }}
          />
          <span>Related</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-6 border-t-2 border-dashed"
            style={{ borderColor: colors.substituteEdge }}
          />
          <span>Substitute</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-6 border-t-2"
            style={{ borderColor: colors.complementEdge }}
          />
          <span>Complement</span>
        </div>
      </div>

      {/* Controls panel - full-page mode only */}
      {showControls && (
        <GraphControls
          confidenceThreshold={confidenceThreshold}
          onConfidenceChange={setConfidenceThreshold}
          visibleNodes={graphData.nodes.length}
          totalNodes={graphData._totalNodes}
          visibleEdges={graphData.links.length}
          totalEdges={graphData._totalEdges}
          categories={allCategories}
          activeCategories={activeCategories}
          onToggleCategory={toggleCategory}
          onResetCategories={() => setActiveCategories(null)}
        />
      )}
    </div>
  );
}

// =============================================================================
// Controls sub-component
// =============================================================================

interface GraphControlsProps {
  confidenceThreshold: number;
  onConfidenceChange: (value: number) => void;
  visibleNodes: number;
  totalNodes: number;
  visibleEdges: number;
  totalEdges: number;
  categories: string[];
  activeCategories: Set<string> | null;
  onToggleCategory: (cat: string) => void;
  onResetCategories: () => void;
}

function GraphControls({
  confidenceThreshold,
  onConfidenceChange,
  visibleNodes,
  totalNodes,
  visibleEdges,
  totalEdges,
  categories,
  activeCategories,
  onToggleCategory,
  onResetCategories,
}: GraphControlsProps) {
  return (
    <div className="absolute top-2 right-2 z-20 bg-background/90 backdrop-blur-sm rounded-lg border border-border p-3 text-xs space-y-3 min-w-[200px]">
      {/* Confidence slider */}
      <div>
        <div className="flex justify-between mb-1 text-muted-foreground">
          <span>Min Confidence</span>
          <span className="font-mono">
            {Math.round(confidenceThreshold * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(confidenceThreshold * 100)}
          onChange={(e) => onConfidenceChange(Number(e.target.value) / 100)}
          className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#4FF2E3]"
        />
      </div>

      {/* Node/Edge counts */}
      <div className="text-muted-foreground space-y-0.5">
        <div>
          {visibleNodes} / {totalNodes} nodes
        </div>
        <div>
          {visibleEdges} / {totalEdges} edges
        </div>
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-muted-foreground">Categories</span>
            {activeCategories !== null && (
              <button
                onClick={onResetCategories}
                className="text-[10px] text-muted-foreground hover:text-foreground underline"
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => {
              const isActive =
                activeCategories === null || activeCategories.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => onToggleCategory(cat)}
                  className={cn(
                    'px-2 py-0.5 rounded-full border text-[10px] transition-colors',
                    isActive
                      ? 'bg-foreground/10 border-foreground/20 text-foreground'
                      : 'bg-transparent border-border text-muted-foreground/50',
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { GraphArtifactContent };
export type { GraphArtifactContentProps };
