'use client';

import { colors } from '@/lib/design-tokens';

interface LiftChartProps {
  className?: string;
}

export function LiftChart({ className = '' }: LiftChartProps) {
  const width = 400;
  const height = 200;
  const padding = { top: 25, right: 30, bottom: 40, left: 30 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Smooth actual line - gentle rise and fall
  const actualPath = `
    M ${padding.left} ${padding.top + chartHeight * 0.6}
    C ${padding.left + chartWidth * 0.2} ${padding.top + chartHeight * 0.55},
      ${padding.left + chartWidth * 0.35} ${padding.top + chartHeight * 0.3},
      ${padding.left + chartWidth * 0.5} ${padding.top + chartHeight * 0.15}
    C ${padding.left + chartWidth * 0.65} ${padding.top + chartHeight * 0.3},
      ${padding.left + chartWidth * 0.8} ${padding.top + chartHeight * 0.5},
      ${padding.left + chartWidth} ${padding.top + chartHeight * 0.58}
  `;

  // Baseline - gentle wave, mostly flat
  const baselinePath = `
    M ${padding.left} ${padding.top + chartHeight * 0.68}
    C ${padding.left + chartWidth * 0.25} ${padding.top + chartHeight * 0.65},
      ${padding.left + chartWidth * 0.5} ${padding.top + chartHeight * 0.62},
      ${padding.left + chartWidth * 0.75} ${padding.top + chartHeight * 0.64}
    C ${padding.left + chartWidth * 0.9} ${padding.top + chartHeight * 0.66},
      ${padding.left + chartWidth} ${padding.top + chartHeight * 0.67},
      ${padding.left + chartWidth} ${padding.top + chartHeight * 0.67}
  `;

  // Fill between curves
  const fillPath = `
    ${actualPath}
    L ${padding.left + chartWidth} ${padding.top + chartHeight * 0.67}
    C ${padding.left + chartWidth * 0.9} ${padding.top + chartHeight * 0.66},
      ${padding.left + chartWidth * 0.75} ${padding.top + chartHeight * 0.64},
      ${padding.left + chartWidth * 0.5} ${padding.top + chartHeight * 0.62}
    C ${padding.left + chartWidth * 0.25} ${padding.top + chartHeight * 0.65},
      ${padding.left} ${padding.top + chartHeight * 0.68},
      ${padding.left} ${padding.top + chartHeight * 0.68}
    Z
  `;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Chart showing actual sales vs baseline during promotion"
      >
        <defs>
          <linearGradient id="liftFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.45" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.05" />
          </linearGradient>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fill area */}
        <path d={fillPath} fill="url(#liftFill)" />

        {/* Baseline (dashed) */}
        <path
          d={baselinePath}
          fill="none"
          stroke={colors.neutral[400]}
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />

        {/* Actual line */}
        <path
          d={actualPath}
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lineGlow)"
        />

        {/* Legend */}
        <g transform={`translate(${padding.left}, ${height - 15})`}>
          <line x1="0" y1="0" x2="20" y2="0" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
          <text x="28" y="4" fill={colors.neutral[400]} fontSize="11" fontWeight="500">Actual</text>

          <line x1="100" y1="0" x2="120" y2="0" stroke={colors.neutral[400]} strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
          <text x="128" y="4" fill={colors.neutral[400]} fontSize="11" fontWeight="500">Baseline</text>
        </g>
      </svg>
    </div>
  );
}
