'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const artifactVariants = cva(
  'border-l-4 transition-all',
  {
    variants: {
      type: {
        chart: 'border-l-chart-1',
        kpi: 'border-l-chart-2',
        table: 'border-l-chart-3',
        markdown: 'border-l-chart-4',
        summary: 'border-l-primary',
        graph: 'border-l-chart-5',
      },
      status: {
        loading: '',
        complete: '',
        error: 'border-l-destructive bg-destructive/5',
      },
    },
    defaultVariants: {
      type: 'chart',
      status: 'complete',
    },
  }
);

export type ArtifactType = 'chart' | 'kpi' | 'table' | 'markdown' | 'summary' | 'graph';
export type ArtifactStatus = 'loading' | 'complete' | 'error';

export interface ArtifactData {
  chart?: { data: unknown[]; layout: Record<string, unknown> };
  kpi?: Array<{ label: string; value: string | number; trend?: 'positive' | 'negative' | 'neutral' }>;
  table?: { columns: string[]; rows: Record<string, unknown>[] };
  markdown?: string;
}

export interface ArtifactProps
  extends VariantProps<typeof artifactVariants> {
  /** Unique identifier */
  id: string;
  /** Artifact type determines rendering and border color */
  type: ArtifactType;
  /** Display title */
  title: string;
  /** Source agent name */
  agentName?: string;
  /** Creation timestamp */
  timestamp?: Date;
  /** Loading/error state */
  status?: ArtifactStatus;
  /** Error message if status is error */
  error?: string;
  /** Content to render */
  children: React.ReactNode;
  /** Whether artifact is expanded */
  expanded?: boolean;
  /** Toggle expand callback */
  onToggleExpand?: () => void;
  /** Download callback */
  onDownload?: () => void;
  /** Add to audit report callback */
  onAddToReport?: () => void;
  /** Whether artifact is already in the report */
  isInReport?: boolean;
  className?: string;
}

/**
 * Container for canvas artifacts (charts, KPIs, tables, etc.)
 *
 * Features:
 * - Type-based left border color
 * - Header with title, agent badge, actions
 * - Loading/error states
 * - Expandable
 */
function Artifact({
  id,
  type,
  title,
  agentName,
  timestamp,
  status = 'complete',
  error,
  children,
  expanded = false,
  onToggleExpand,
  onDownload,
  onAddToReport,
  isInReport = false,
  className,
}: ArtifactProps) {
  return (
    <Card className={cn(artifactVariants({ type, status }), className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-sm truncate">{title}</h3>
              <Badge variant="muted" size="sm">
                {formatArtifactType(type)}
              </Badge>
            </div>
            {agentName && (
              <p className="text-xs text-muted-foreground mt-1">
                from {agentName}
                {timestamp && ` · ${formatTime(timestamp)}`}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {onToggleExpand && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onToggleExpand}
                className="h-7 w-7"
              >
                {expanded ? (
                  <CollapseIcon className="h-3.5 w-3.5" />
                ) : (
                  <ExpandIcon className="h-3.5 w-3.5" />
                )}
                <span className="sr-only">{expanded ? 'Collapse' : 'Expand'}</span>
              </Button>
            )}
            {onDownload && status === 'complete' && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onDownload}
                className="h-7 w-7"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                <span className="sr-only">Download</span>
              </Button>
            )}
            {onAddToReport && status === 'complete' && (
              <Button
                variant={isInReport ? 'default' : 'ghost'}
                size="icon-sm"
                onClick={onAddToReport}
                className={cn(
                  'h-7 w-7',
                  isInReport && 'bg-primary/10 text-primary hover:bg-primary/20'
                )}
              >
                {isInReport ? (
                  <ReportAddedIcon className="h-3.5 w-3.5" />
                ) : (
                  <AddToReportIcon className="h-3.5 w-3.5" />
                )}
                <span className="sr-only">
                  {isInReport ? 'Added to report' : 'Add to report'}
                </span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {status === 'loading' ? (
          <ArtifactSkeleton type={type} />
        ) : status === 'error' ? (
          <ArtifactError message={error} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

function ArtifactSkeleton({ type }: { type: ArtifactType }) {
  if (type === 'chart') {
    return <Skeleton className="h-48 w-full" />;
  }
  if (type === 'kpi') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    );
  }
  if (type === 'table') {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }
  if (type === 'graph') {
    return <Skeleton className="h-[400px] w-full" />;
  }
  return <Skeleton className="h-24 w-full" />;
}

function ArtifactError({ message }: { message?: string }) {
  return (
    <div className="text-sm text-destructive py-4">
      <p className="font-medium">Failed to load artifact</p>
      {message && <p className="text-xs mt-1 opacity-80">{message}</p>}
    </div>
  );
}

function formatArtifactType(type: ArtifactType): string {
  const labels: Record<ArtifactType, string> = {
    chart: 'Chart',
    kpi: 'KPIs',
    table: 'Table',
    markdown: 'Text',
    summary: 'Summary',
    graph: 'Graph',
  };
  return labels[type];
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Icons
function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  );
}

function CollapseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function AddToReportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ReportAddedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m-7 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export { Artifact, artifactVariants, ArtifactSkeleton, ArtifactError };
