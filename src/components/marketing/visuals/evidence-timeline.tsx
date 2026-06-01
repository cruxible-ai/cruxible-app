'use client';

import { colors } from '@/lib/design-tokens';

interface EvidenceTimelineProps {
  className?: string;
}

export function EvidenceTimeline({ className = '' }: EvidenceTimelineProps) {
  const width = 400;
  const height = 200;
  const padding = { left: 40, right: 40 };
  const timelineY = height / 2;
  const timelineWidth = width - padding.left - padding.right;

  // Past promos evenly spaced
  const pastPromos = [
    { match: 85 },
    { match: 72 },
    { match: 91 },
    { match: 68 },
  ];

  const getX = (index: number, total: number) => {
    const spacing = timelineWidth / (total + 1);
    return padding.left + spacing * (index + 1);
  };

  const currentX = width - padding.right;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Timeline of similar past promotions"
      >
        <defs>
          <filter id="currentGlow2" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Timeline axis */}
        <line
          x1={padding.left}
          y1={timelineY}
          x2={width - padding.right}
          y2={timelineY}
          stroke={colors.neutral[400]}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Arrow at end */}
        <path
          d={`M ${width - padding.right - 8} ${timelineY - 5} L ${width - padding.right} ${timelineY} L ${width - padding.right - 8} ${timelineY + 5}`}
          fill="none"
          stroke={colors.neutral[400]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Past promo dots with match badges */}
        {pastPromos.map((promo, i) => {
          const x = getX(i, pastPromos.length);
          const isHighMatch = promo.match >= 80;

          return (
            <g key={i}>
              {/* Dot on timeline */}
              <circle
                cx={x}
                cy={timelineY}
                r={10}
                fill={colors.neutral.white}
                stroke={colors.neutral[400]}
                strokeWidth="2"
              />

              {/* Match badge above */}
              <g transform={`translate(${x}, ${timelineY - 30})`}>
                <rect
                  x="-20"
                  y="-12"
                  width="40"
                  height="24"
                  rx="12"
                  fill={isHighMatch ? colors.semantic.success : colors.neutral[500]}
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={colors.neutral.white}
                  fontSize="12"
                  fontWeight="600"
                >
                  {promo.match}%
                </text>
              </g>
            </g>
          );
        })}

        {/* Current promo (highlighted) */}
        <g>
          {/* Glow */}
          <circle
            cx={currentX}
            cy={timelineY}
            r={14}
            fill={colors.primary}
            opacity="0.3"
            filter="url(#currentGlow2)"
          />
          {/* Main dot */}
          <circle
            cx={currentX}
            cy={timelineY}
            r={12}
            fill={colors.primary}
            stroke={colors.neutral.white}
            strokeWidth="2"
          />
          {/* Label above */}
          <text
            x={currentX}
            y={timelineY - 28}
            textAnchor="middle"
            fill={colors.neutral.white}
            fontSize="12"
            fontWeight="600"
          >
            Your Promo
          </text>
        </g>

        {/* Time labels */}
        <text
          x={padding.left + 30}
          y={timelineY + 40}
          fill={colors.neutral[400]}
          fontSize="11"
          fontWeight="500"
        >
          Past
        </text>
        <text
          x={width - padding.right - 10}
          y={timelineY + 40}
          textAnchor="end"
          fill={colors.neutral[400]}
          fontSize="11"
          fontWeight="500"
        >
          Now
        </text>
      </svg>
    </div>
  );
}
