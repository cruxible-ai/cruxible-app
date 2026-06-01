'use client';

import { colors } from '@/lib/design-tokens';

interface PrimitivesFlowProps {
  className?: string;
}

export function PrimitivesFlow({ className = '' }: PrimitivesFlowProps) {
  const width = 440;
  const height = 180;

  const nodeWidth = 80;
  const nodeHeight = 36;
  const gap = 16;
  const totalWidth = nodeWidth * 4 + gap * 3;
  const startX = (width - totalWidth) / 2;
  const y = height / 2 - nodeHeight / 2;

  const stages = [
    { id: 'config', label: 'Config', icon: '\u2699' },
    { id: 'ingest', label: 'Ingest', icon: '\u2193' },
    { id: 'query', label: 'Query', icon: '?' },
    { id: 'feedback', label: 'Feedback', icon: '\u21BA' },
  ];

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Primitives pipeline flow"
      >
        <defs>
          <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="flowArrow"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="7"
            markerHeight="5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={colors.primary} fillOpacity="0.6" />
          </marker>
        </defs>

        {/* Forward arrows between stages */}
        {stages.slice(0, -1).map((_, i) => {
          const x1 = startX + (nodeWidth + gap) * i + nodeWidth;
          const x2 = startX + (nodeWidth + gap) * (i + 1);
          return (
            <line
              key={`fwd-${i}`}
              x1={x1}
              y1={y + nodeHeight / 2}
              x2={x2}
              y2={y + nodeHeight / 2}
              stroke={colors.primary}
              strokeWidth={1.5}
              strokeOpacity={0.6}
              markerEnd="url(#flowArrow)"
            />
          );
        })}

        {/* Feedback loop arrow curving back from Feedback to Config */}
        <path
          d={`M ${startX + (nodeWidth + gap) * 3 + nodeWidth / 2} ${y + nodeHeight}
              C ${startX + (nodeWidth + gap) * 3 + nodeWidth / 2} ${y + nodeHeight + 40},
                ${startX + nodeWidth / 2} ${y + nodeHeight + 40},
                ${startX + nodeWidth / 2} ${y + nodeHeight}`}
          fill="none"
          stroke={colors.semantic.warning}
          strokeWidth={1.5}
          strokeOpacity={0.5}
          strokeDasharray="4 3"
          markerEnd="url(#flowArrow)"
        />
        <text
          x={width / 2}
          y={y + nodeHeight + 36}
          textAnchor="middle"
          fill={colors.semantic.warning}
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
          opacity={0.7}
        >
          continuous learning
        </text>

        {/* Stage nodes */}
        {stages.map((stage, i) => {
          const x = startX + (nodeWidth + gap) * i;
          return (
            <g key={stage.id}>
              <rect
                x={x}
                y={y}
                width={nodeWidth}
                height={nodeHeight}
                rx={8}
                fill="transparent"
                stroke={colors.primary}
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
              <text
                x={x + nodeWidth / 2}
                y={y + nodeHeight / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors.neutral[50]}
                fontSize="11"
                fontWeight={600}
                fontFamily="JetBrains Mono, monospace"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* Title */}
        <text
          x={width / 2}
          y={22}
          textAnchor="middle"
          fill={colors.neutral[400]}
          fontSize="10"
          fontWeight={500}
        >
          Four primitives, one loop
        </text>
      </svg>
    </div>
  );
}
