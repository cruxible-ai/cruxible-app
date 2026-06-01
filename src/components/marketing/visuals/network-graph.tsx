'use client';

import { colors } from '@/lib/design-tokens';

interface NetworkGraphProps {
  className?: string;
}

export function NetworkGraph({ className = '' }: NetworkGraphProps) {
  const width = 400;
  const height = 220;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 50;
  const outerRadius = 90;

  const nodeSize = 12;

  // Helper to get position at angle and distance from center
  const getPos = (angle: number, r: number) => ({
    x: centerX + r * Math.cos((angle * Math.PI) / 180),
    y: centerY + r * Math.sin((angle * Math.PI) / 180),
  });

  // First ring at 60° intervals starting from top (-90°)
  const n1Pos = getPos(-90, radius);   // B - top
  const n2Pos = getPos(-30, radius);   // C - top right
  const n3Pos = getPos(30, radius);    // D - bottom right
  const n4Pos = getPos(90, radius);    // E - bottom
  const n5Pos = getPos(150, radius);   // F - bottom left
  const n6Pos = getPos(-150, radius);  // G - top left

  // Second ring - extending outward from first ring nodes
  const s1Pos = getPos(-110, outerRadius);  // H - from B, angled left
  const s2Pos = getPos(-70, outerRadius);   // I - from B, angled right
  const s3Pos = getPos(-30, outerRadius);   // J - from C, straight out
  const s4Pos = getPos(150, outerRadius);   // K - from F, straight out
  const s5Pos = getPos(-150, outerRadius);  // L - from G, straight out

  const nodes = [
    { id: 'center', x: centerX, y: centerY, label: 'A', size: 22, highlight: true },
    // First ring
    { id: 'n1', ...n1Pos, label: 'B', size: nodeSize },
    { id: 'n2', ...n2Pos, label: 'C', size: nodeSize },
    { id: 'n3', ...n3Pos, label: 'D', size: nodeSize },
    { id: 'n4', ...n4Pos, label: 'E', size: nodeSize },
    { id: 'n5', ...n5Pos, label: 'F', size: nodeSize },
    { id: 'n6', ...n6Pos, label: 'G', size: nodeSize },
    // Second ring
    { id: 's1', ...s1Pos, label: 'H', size: nodeSize },
    { id: 's2', ...s2Pos, label: 'I', size: nodeSize },
    { id: 's3', ...s3Pos, label: 'J', size: nodeSize },
    { id: 's4', ...s4Pos, label: 'K', size: nodeSize },
    { id: 's5', ...s5Pos, label: 'L', size: nodeSize },
  ];

  const edges = [
    // Center to first ring
    { from: 'center', to: 'n1', type: 'complement' },
    { from: 'center', to: 'n2', type: 'complement' },
    { from: 'center', to: 'n3', type: 'substitute' },
    { from: 'center', to: 'n4', type: 'complement' },
    { from: 'center', to: 'n5', type: 'substitute' },
    { from: 'center', to: 'n6', type: 'complement' },
    // Second ring connections
    { from: 'n1', to: 's1', type: 'complement' },
    { from: 'n1', to: 's2', type: 'substitute' },
    { from: 'n2', to: 's3', type: 'complement' },
    { from: 'n5', to: 's4', type: 'complement' },
    { from: 'n6', to: 's5', type: 'substitute' },
  ];

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Product relationship network"
      >
        <defs>
          <filter id="nodeGlow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const color = edge.type === 'complement' ? colors.semantic.success : colors.semantic.error;

          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={color}
              strokeWidth={2}
              strokeOpacity={0.7}
              strokeLinecap="round"
            />
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => {
          const isCenter = node.highlight;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={isCenter ? colors.primary : colors.neutral.white}
                stroke={isCenter ? colors.primary : colors.neutral[400]}
                strokeWidth={isCenter ? 0 : 2}
                filter={isCenter ? 'url(#nodeGlow2)' : undefined}
              />
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isCenter ? colors.neutral[900] : colors.neutral[600]}
                fontSize={isCenter ? 14 : 10}
                fontWeight={isCenter ? 700 : 600}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${width / 2 - 95}, ${height - 18})`}>
          <line x1="0" y1="0" x2="18" y2="0" stroke={colors.semantic.success} strokeWidth="2" strokeLinecap="round" />
          <text x="24" y="4" fill={colors.neutral[400]} fontSize="10" fontWeight="500">Complement</text>

          <line x1="110" y1="0" x2="128" y2="0" stroke={colors.semantic.error} strokeWidth="2" strokeLinecap="round" />
          <text x="134" y="4" fill={colors.neutral[400]} fontSize="10" fontWeight="500">Substitute</text>
        </g>
      </svg>
    </div>
  );
}
