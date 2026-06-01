'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { RunRecord, DecisionRecord } from '@/lib/api-types';

interface EvidencePacketProps {
  run: RunRecord;
  decision?: DecisionRecord;
}

export function EvidencePacket({ run, decision }: EvidencePacketProps) {
  const [copied, setCopied] = useState(false);

  const formatEntities = (entities: Record<string, unknown>) => {
    return Object.entries(entities)
      .map(([key, value]) => `  ${key}: ${value}`)
      .join('\n');
  };

  const formatDecision = (d: DecisionRecord) => {
    const action = d.action.toUpperCase();
    const reason = d.reason_category
      ? `${d.reason_category.replace(/_/g, ' ')}${d.reason_text ? ` - ${d.reason_text}` : ''}`
      : d.reason_text || 'No reason provided';
    return `Decision: ${action}\nReason: ${reason}`;
  };

  const generateSummary = () => {
    const lines = [
      'CRUXIBLE EVIDENCE PACKET',
      '========================',
      `Run ID: ${run.run_id}`,
      `Intent: ${run.intent_type}`,
      'Entities:',
      formatEntities(run.entities),
      '',
      `Created: ${run.created_at}`,
      `Completed: ${run.completed_at} (${run.duration_ms}ms)`,
    ];

    if (decision) {
      lines.push('', formatDecision(decision));
    } else {
      lines.push('', 'Decision: Pending');
    }

    // Add export link (would be real URL in production)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://app.cruxible.com';
    lines.push('', `Export: ${baseUrl}/api/v1/runs/${run.run_id}/export`);

    return lines.join('\n');
  };

  const handleCopy = async () => {
    const summary = generateSummary();
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    // TODO: Implement JSON export
    const json = JSON.stringify(run, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${run.run_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const entities = run.entities as Record<string, unknown>;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Evidence Packet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Summary fields */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Run ID</span>
            <span className="font-mono text-xs">{run.run_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Intent</span>
            <span>{run.intent_type}</span>
          </div>
          {Object.entries(entities).slice(0, 3).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground">{key}</span>
              <span>{String(value)}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span>{new Date(run.created_at).toLocaleString()}</span>
          </div>
          {decision && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Decision</span>
              <span className="capitalize font-medium">
                {decision.action === 'accept' && '✓ '}
                {decision.action === 'reject' && '✗ '}
                {decision.action === 'override' && '⚠ '}
                {decision.action}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Summary'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleExport}
          >
            Export JSON
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
