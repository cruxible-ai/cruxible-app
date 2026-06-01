'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { AgentEvent } from '@/lib/api-types';

interface AgentCardProps {
  event: AgentEvent;
}

/**
 * Individual agent event card in the audit trail.
 *
 * Shows agent name, status, duration, and output type.
 * Color-coded left border indicates status (success/failed/skipped).
 */
export function AgentCard({ event }: AgentCardProps) {
  const { type, agent_name, snapshot } = event;

  // Determine display based on event type
  const isStarted = type === 'agent_started';
  const isCompleted = type === 'agent_completed';
  const isFailed = type === 'agent_failed';
  const isSkipped = type === 'agent_skipped';
  const isRunEvent = type === 'run_started' || type === 'run_completed' || type === 'run_failed';

  // Run-level events
  if (isRunEvent) {
    return (
      <Card
        className={cn(
          'mb-2',
          type === 'run_started' && 'border-l-4 border-l-neon-ice',
          type === 'run_completed' && 'border-l-4 border-l-emerald',
          type === 'run_failed' && 'border-l-4 border-l-coral-red'
        )}
      >
        <CardHeader className="py-2 px-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">
              {type === 'run_started' && 'Analysis Started'}
              {type === 'run_completed' && 'Analysis Complete'}
              {type === 'run_failed' && 'Analysis Failed'}
            </span>
            <Badge variant="outline" className="text-xs">
              {new Date(event.timestamp).toLocaleTimeString()}
            </Badge>
          </div>
        </CardHeader>
        {event.run_error && (
          <CardContent className="py-2 px-3">
            <p className="text-sm text-coral-red">{event.run_error}</p>
          </CardContent>
        )}
      </Card>
    );
  }

  // Agent-level events
  const displayName = agent_name || snapshot?.agent_name || 'Unknown Agent';
  const formattedName = displayName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Card
      className={cn(
        'mb-2',
        isStarted && 'border-l-4 border-l-neon-ice animate-pulse',
        isCompleted && 'border-l-4 border-l-emerald',
        isFailed && 'border-l-4 border-l-coral-red',
        isSkipped && 'border-l-4 border-l-cool-steel'
      )}
    >
      <CardHeader className="py-2 px-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{formattedName}</span>
          <div className="flex items-center gap-2">
            {snapshot?.duration_ms !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {snapshot.duration_ms.toFixed(0)}ms
              </Badge>
            )}
            {isStarted && (
              <Badge className="bg-neon-ice text-onyx text-xs">Running</Badge>
            )}
            {isCompleted && (
              <Badge className="bg-emerald text-white text-xs">Success</Badge>
            )}
            {isFailed && (
              <Badge className="bg-coral-red text-white text-xs">Failed</Badge>
            )}
            {isSkipped && (
              <Badge variant="outline" className="text-xs">Skipped</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      {(snapshot?.output_type || snapshot?.error_message || snapshot?.skip_reason) && (
        <CardContent className="py-2 px-3">
          {snapshot.output_type && (
            <p className="text-xs text-muted-foreground">
              Output: {snapshot.output_type}
            </p>
          )}
          {snapshot.error_message && (
            <p className="text-xs text-coral-red">{snapshot.error_message}</p>
          )}
          {snapshot.skip_reason && (
            <p className="text-xs text-cool-steel">{snapshot.skip_reason}</p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
