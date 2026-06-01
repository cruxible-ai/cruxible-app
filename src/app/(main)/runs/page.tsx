'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchRuns, type RunRecordListResponse } from '@/lib/api-client';
import type { RunRecordSummary } from '@/lib/api-types';

export default function RunsListPage() {
  const [runs, setRuns] = useState<RunRecordSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchRuns({ limit: 50 });
        if (!cancelled) {
          setRuns(data.runs);
          setTotal(data.total);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load runs');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-onyx dark:text-white">
          Runs
        </h1>
        <p className="text-muted-foreground">
          View all analysis runs and their results.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Recent Runs
            {!loading && <span className="ml-2 text-muted-foreground font-normal">({total})</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              Loading runs...
            </div>
          ) : error ? (
            <div className="py-8 text-center text-destructive text-sm">
              {error}
            </div>
          ) : runs.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              No runs found. Run an analysis to see results here.
            </div>
          ) : (
            <div className="space-y-2">
              {runs.map((run) => (
                <Link
                  key={run.run_id}
                  href={`/runs/${run.run_id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium text-sm">{run.run_id}</div>
                      <div className="text-xs text-muted-foreground">
                        {run.intent_type} &middot; {run.duration_ms}ms &middot; {run.agent_count} agent{run.agent_count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {run.has_decision && (
                      <Badge variant="success-soft" size="sm">
                        Decision
                      </Badge>
                    )}
                    <Badge
                      variant={run.status === 'success' ? 'success' : 'destructive'}
                      size="sm"
                    >
                      {run.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(run.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
