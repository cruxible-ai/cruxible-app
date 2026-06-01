'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentCard } from './agent-card';
import type { AgentEvent } from '@/lib/api-types';

interface AuditTrailProps {
  events: AgentEvent[];
}

/**
 * Left panel showing real-time agent execution audit trail.
 *
 * Displays streaming events as they arrive, showing the
 * "glass box" view of what the AI is doing.
 */
export function AuditTrail({ events }: AuditTrailProps) {
  return (
    <Card className="h-[600px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Execution Trail</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[540px] px-4">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p className="text-sm">Run an analysis to see execution details</p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {events.map((event, index) => (
                <AgentCard
                  key={`${event.run_id}-${event.timestamp}-${index}`}
                  event={event}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
