'use client';

import { colors } from '@/lib/design-tokens';

interface ReceiptDAGProps {
  className?: string;
}

export function ReceiptDAG({ className = '' }: ReceiptDAGProps) {
  const width = 440;
  const height = 160;

  const nodeWidth = 90;
  const nodeHeight = 32;
  const gap = 16;

  const stages = [
    { id: 'query', label: 'Query', x: 10 },
    { id: 'lookup', label: 'Entity Lookup', x: 10 + nodeWidth + gap },
    { id: 'check', label: 'Constraint Check', x: 10 + (nodeWidth + gap) * 2 },
    { id: 'result', label: 'Result', x: 10 + (nodeWidth + gap) * 3 },
  ];

  const y = height / 2 - nodeHeight / 2;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Receipt provenance DAG"
      >
        <defs>
          <filter id="dagGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="dagArrow"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="8"
            markerHeight="6"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={colors.primary} fillOpacity="0.7" />
          </marker>
        </defs>

        {/* Arrows between stages */}
        {stages.slice(0, -1).map((stage, i) => {
          const next = stages[i + 1];
          return (
            <line
              key={`arrow-${i}`}
              x1={stage.x + nodeWidth}
              y1={y + nodeHeight / 2}
              x2={next.x}
              y2={y + nodeHeight / 2}
              stroke={colors.primary}
              strokeWidth={1.5}
              strokeOpacity={0.7}
              markerEnd="url(#dagArrow)"
            />
          );
        })}

        {/* Stage nodes */}
        {stages.map((stage, i) => {
          const isFirst = i === 0;
          const isLast = i === stages.length - 1;
          return (
            <g key={stage.id}>
              <rect
                x={stage.x}
                y={y}
                width={nodeWidth}
                height={nodeHeight}
                rx={8}
                fill={isLast ? colors.primary : 'transparent'}
                stroke={isFirst || isLast ? colors.primary : colors.neutral[400]}
                strokeWidth={1.5}
                strokeOpacity={isFirst || isLast ? 0.8 : 0.5}
                filter={isLast ? 'url(#dagGlow)' : undefined}
              />
              <text
                x={stage.x + nodeWidth / 2}
                y={y + nodeHeight / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isLast ? colors.neutral[900] : colors.neutral[50]}
                fontSize="10"
                fontWeight={600}
                fontFamily="JetBrains Mono, monospace"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* Provenance hash labels below */}
        {stages.map((stage) => (
          <text
            key={`hash-${stage.id}`}
            x={stage.x + nodeWidth / 2}
            y={y + nodeHeight + 16}
            textAnchor="middle"
            fill={colors.neutral[400]}
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
            opacity={0.6}
          >
            sha:{Math.random().toString(36).slice(2, 9)}
          </text>
        ))}

        {/* Title */}
        <text
          x={width / 2}
          y={18}
          textAnchor="middle"
          fill={colors.neutral[400]}
          fontSize="10"
          fontWeight={500}
        >
          Every result has a receipt
        </text>
      </svg>
    </div>
  );
}
