'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DecisionCaptureWidget } from '@/components/decisions/decision-capture-widget';
import { EvidencePacket } from '@/components/runs/evidence-packet';
import { fetchRun } from '@/lib/api-client';
import type { RunRecord, DecisionRecord, LiftResult, MarginResult } from '@/lib/api-types';

function StatusBadge({ status }: { status: string }) {
  const variant = status === 'success' ? 'success' : status === 'failed' ? 'destructive' : 'warning';
  return (
    <Badge variant={variant} size="sm">
      {status === 'success' ? 'Success' : status === 'failed' ? 'Failed' : 'Skipped'}
    </Badge>
  );
}

function AgentTimeline({ agents }: { agents: RunRecord['agent_runs'] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Agent Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {agents.map((agent, index) => (
          <div key={agent.agent_name} className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  agent.status === 'success'
                    ? 'bg-success'
                    : agent.status === 'failed'
                    ? 'bg-destructive'
                    : 'bg-warning'
                }`}
              />
              {index < agents.length - 1 && (
                <div className="absolute top-3 left-1.5 w-px h-6 bg-border" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">
                  {agent.agent_name.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {agent.duration_ms}ms
                </span>
              </div>
              {agent.output_type && (
                <span className="text-xs text-muted-foreground">
                  {agent.output_type}
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ResultsKPIs({ results }: { results: RunRecord['results'] }) {
  const lift = results.lift as Partial<LiftResult> | undefined;
  const margin = results.margin as Partial<MarginResult> | undefined;

  // Also check for keyed results from real API (e.g., LiftResult, MarginResult)
  const liftResult = lift || results.LiftResult as Partial<LiftResult> | undefined;
  const marginResult = margin || results.MarginResult as Partial<MarginResult> | undefined;

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-neon-ice">
        <CardContent className="pt-4 pb-3">
          <p className="text-sm text-muted-foreground">Lift</p>
          <p className="text-2xl font-semibold mt-1">
            {liftResult?.lift_percent ? `+${(liftResult.lift_percent * 100).toFixed(1)}%` : '\u2014'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {liftResult?.incremental_units?.toLocaleString()} incremental units
          </p>
        </CardContent>
      </Card>
      <Card
        className={`border-l-4 ${
          marginResult?.roi && marginResult.roi >= 1 ? 'border-l-emerald' : 'border-l-coral-red'
        }`}
      >
        <CardContent className="pt-4 pb-3">
          <p className="text-sm text-muted-foreground">ROI</p>
          <p className="text-2xl font-semibold mt-1">
            {marginResult?.roi ? `${marginResult.roi}x` : '\u2014'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ${marginResult?.incremental_revenue?.toLocaleString()} revenue
          </p>
        </CardContent>
      </Card>
      <Card
        className={`border-l-4 ${
          marginResult?.incremental_profit && marginResult.incremental_profit >= 0
            ? 'border-l-emerald'
            : 'border-l-coral-red'
        }`}
      >
        <CardContent className="pt-4 pb-3">
          <p className="text-sm text-muted-foreground">Margin</p>
          <p className="text-2xl font-semibold mt-1">
            {marginResult?.incremental_profit
              ? `$${marginResult.incremental_profit.toLocaleString()}`
              : '\u2014'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {marginResult?.recommendation
              ? `${marginResult.recommendation.slice(0, 30)}${marginResult.recommendation.length > 30 ? '...' : ''}`
              : null}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function EvidencePanel({ run }: { run: RunRecord }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Evidence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <span className="text-muted-foreground">Data Scope:</span>
          <div className="mt-1 font-mono text-xs bg-muted p-2 rounded">
            {run.data_scope.data_start_date} to {run.data_scope.data_end_date}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground">Pattern Version:</span>
          <span className="ml-2 font-mono">{run.pattern_version}</span>
        </div>
        <div>
          <span className="text-muted-foreground">API Version:</span>
          <span className="ml-2 font-mono">{run.api_version}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RunDetailPage() {
  const params = useParams();
  const runId = params.run_id as string;

  const [run, setRun] = useState<RunRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState<DecisionRecord | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchRun(runId);
        if (!cancelled) {
          setRun(data);
          if (data.decision) {
            setDecision(data.decision);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load run');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [runId]);

  const handleDecisionSaved = (newDecision: DecisionRecord) => {
    setDecision(newDecision);
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-muted-foreground">Loading run...</div>
    );
  }

  if (error || !run) {
    return (
      <div className="py-16 text-center text-destructive">
        {error || 'Run not found'}
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const entities = run.entities as { sku?: string; start_date?: string; end_date?: string };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/runs" className="hover:text-foreground">
              Runs
            </Link>
            <span>/</span>
            <span className="font-mono">{runId}</span>
          </div>
          <h1 className="text-xl font-semibold text-onyx dark:text-white flex items-center gap-3">
            {run.intent_type.replace(/_/g, ' ')}
            <StatusBadge status={run.status} />
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {entities.sku && <span>SKU: {entities.sku}</span>}
            {entities.start_date && entities.end_date && (
              <span>
                {formatDate(entities.start_date)} \u2013 {formatDate(entities.end_date)}
              </span>
            )}
            <span>{run.duration_ms}ms</span>
            <span>{run.agent_runs.length} agents</span>
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <AgentTimeline agents={run.agent_runs} />
          <EvidencePanel run={run} />
          <EvidencePacket run={run} decision={decision} />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <ResultsKPIs results={run.results} />

          {/* Charts placeholder */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Analysis Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded flex items-center justify-center text-muted-foreground">
                Charts will render here from RunRecord data
              </div>
            </CardContent>
          </Card>

          {/* Decision Capture */}
          <DecisionCaptureWidget
            runId={run.run_id}
            results={run.results}
            existingDecision={decision}
            onDecisionSaved={handleDecisionSaved}
          />

          {/* Add to Audit */}
          <Button
            variant="outline"
            className="w-full"
            disabled={!decision}
            title={!decision ? 'Save a decision first to add this run to an audit report' : undefined}
          >
            Add to Audit Report
          </Button>
        </div>
      </div>
    </div>
  );
}
