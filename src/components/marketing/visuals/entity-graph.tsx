'use client';

import { colors } from '@/lib/design-tokens';

interface EntityGraphProps {
  className?: string;
}

export function EntityGraph({ className = '' }: EntityGraphProps) {
  const width = 440;
  const height = 320;

  // Nodes laid out in a clear hierarchy: central product, surrounding related entities
  const nodes = [
    { id: 'sku',    x: 220, y: 135, label: 'SKU-101',     type: 'primary' as const },
    { id: 'cat',    x: 80,  y: 55,  label: 'Category',     type: 'secondary' as const },
    { id: 'promo',  x: 360, y: 55,  label: 'PROMO-42',     type: 'accent' as const },
    { id: 'sub',    x: 80,  y: 225, label: 'SKU-102',      type: 'secondary' as const },
    { id: 'comp',   x: 360, y: 225, label: 'SKU-205',      type: 'secondary' as const },
    { id: 'store',  x: 220, y: 285, label: 'Store #7',     type: 'muted' as const },
  ];

  // labelPos: [x, y] absolute position for the label, anchor: text-anchor
  const edges = [
    { from: 'sku',   to: 'cat',   label: 'belongs_to',  labelPos: [152, 82] as const,  anchor: 'start' as const },
    { from: 'promo', to: 'sku',   label: 'targets',     labelPos: [305, 75] as const,  anchor: 'end' as const },
    { from: 'sub',   to: 'sku',   label: 'substitutes', labelPos: [100, 170] as const, anchor: 'start' as const },
    { from: 'sku',   to: 'comp',  label: 'complement',  labelPos: [325, 165] as const, anchor: 'end' as const },
    { from: 'sku',   to: 'store', label: 'sold_at',     labelPos: [228, 218] as const, anchor: 'start' as const },
    { from: 'sub',   to: 'store', label: 'sold_at',     labelPos: [120, 268] as const, anchor: 'start' as const },
  ];

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  const nodeStyles = {
    primary:   { fill: colors.primary, stroke: colors.primary, textFill: colors.neutral[900], r: 34 },
    accent:    { fill: 'transparent', stroke: colors.primary, textFill: colors.primary, r: 32 },
    secondary: { fill: 'transparent', stroke: colors.neutral[400], textFill: colors.neutral[50], r: 30 },
    muted:     { fill: 'transparent', stroke: colors.neutral[700], textFill: colors.neutral[400], r: 28 },
  };

  // Shorten edge to stop at node boundary
  function shortenLine(x1: number, y1: number, x2: number, y2: number, fromR: number, toR: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    return {
      x1: x1 + ux * (fromR + 4),
      y1: y1 + uy * (fromR + 4),
      x2: x2 - ux * (toR + 8),
      y2: y2 - uy * (toR + 8),
    };
  }

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Entity relationship graph showing products, promotions, and store connections"
      >
        <defs>
          <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="heroArrow"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="7"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={colors.neutral[400]} fillOpacity="0.5" />
          </marker>
          <marker
            id="heroArrowPrimary"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="7"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={colors.primary} fillOpacity="0.6" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const fromStyle = nodeStyles[from.type];
          const toStyle = nodeStyles[to.type];
          const line = shortenLine(from.x, from.y, to.x, to.y, fromStyle.r, toStyle.r);
          const isPrimary = edge.from === 'promo' || edge.to === 'promo';

          return (
            <g key={i}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={isPrimary ? colors.primary : colors.neutral[700]}
                strokeWidth={isPrimary ? 1.5 : 1}
                strokeOpacity={isPrimary ? 0.7 : 0.5}
                markerEnd={isPrimary ? 'url(#heroArrowPrimary)' : 'url(#heroArrow)'}
              />
              <text
                x={edge.labelPos[0]}
                y={edge.labelPos[1]}
                textAnchor={edge.anchor}
                dominantBaseline="middle"
                fill={colors.neutral[500]}
                fontSize="8"
                fontFamily="var(--font-geist-mono), monospace"
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const style = nodeStyles[node.type];
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={style.r}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={node.type === 'primary' ? 0 : 1.5}
                fillOpacity={node.type === 'primary' ? 1 : 1}
                filter={node.type === 'primary' ? 'url(#heroGlow)' : undefined}
              />
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={style.textFill}
                fontSize={node.type === 'primary' ? 12 : node.type === 'muted' ? 10 : 11}
                fontWeight={node.type === 'primary' ? 700 : 500}
                fontFamily="var(--font-geist-mono), monospace"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
