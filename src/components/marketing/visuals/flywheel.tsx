'use client';

import { colors } from '@/lib/design-tokens';

interface FlywheelProps {
  className?: string;
}

export function Flywheel({ className = '' }: FlywheelProps) {
  const width = 400;
  const height = 220;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 70;
  const nodeRadius = 32;

  // 4 stages at 90° intervals, starting from top
  const stages = [
    { label: 'Run', angle: -90 },
    { label: 'Measure', angle: 0 },
    { label: 'Validate', angle: 90 },
    { label: 'Improve', angle: 180 },
  ];

  const getPos = (angle: number) => ({
    x: centerX + radius * Math.cos((angle * Math.PI) / 180),
    y: centerY + radius * Math.sin((angle * Math.PI) / 180),
  });

  // Create circular arrow path between two angles
  const createArc = (startAngle: number, endAngle: number) => {
    const arcRadius = radius;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Offset start and end to account for node size
    const offsetAngle = 28; // degrees to offset for node clearance
    const adjustedStartRad = ((startAngle + offsetAngle) * Math.PI) / 180;
    const adjustedEndRad = ((endAngle - offsetAngle) * Math.PI) / 180;

    const x1 = centerX + arcRadius * Math.cos(adjustedStartRad);
    const y1 = centerY + arcRadius * Math.sin(adjustedStartRad);
    const x2 = centerX + arcRadius * Math.cos(adjustedEndRad);
    const y2 = centerY + arcRadius * Math.sin(adjustedEndRad);

    return `M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 0 1 ${x2} ${y2}`;
  };

  // Arrow paths between stages (90° apart)
  const arcs = [
    { start: -90, end: 0 },
    { start: 0, end: 90 },
    { start: 90, end: 180 },
    { start: 180, end: 270 }, // wraps around to first
  ];

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Continuous improvement cycle"
      >
        <defs>
          <marker
            id="flyArrow"
            markerWidth="8"
            markerHeight="6"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M 0 0 L 8 3 L 0 6 Z" fill={colors.primary} />
          </marker>
          <filter id="nodeGlow4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circular arrows between stages */}
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={createArc(arc.start, arc.end)}
            fill="none"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#flyArrow)"
          />
        ))}

        {/* Stage nodes */}
        {stages.map((stage, i) => {
          const pos = getPos(stage.angle);
          const isFirst = i === 0;

          return (
            <g key={i}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={isFirst ? colors.primary : colors.neutral.white}
                stroke={isFirst ? 'none' : colors.neutral[400]}
                strokeWidth="2"
                filter={isFirst ? 'url(#nodeGlow4)' : undefined}
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isFirst ? colors.neutral[900] : colors.neutral[600]}
                fontSize="11"
                fontWeight="600"
              >
                {stage.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
