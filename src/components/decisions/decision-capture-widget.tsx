'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { DecisionRecord, DecisionAction, ReasonCategory } from '@/lib/api-types';

interface DecisionCaptureWidgetProps {
  runId: string;
  results: Record<string, unknown>;
  existingDecision?: DecisionRecord;
  onDecisionSaved: (decision: DecisionRecord) => void;
}

const REASON_CATEGORIES: { value: ReasonCategory; label: string }[] = [
  { value: 'external_factors', label: 'External Factors' },
  { value: 'domain_knowledge', label: 'Domain Knowledge' },
  { value: 'data_quality', label: 'Data Quality' },
  { value: 'competitive', label: 'Competitive' },
  { value: 'strategic', label: 'Strategic' },
  { value: 'other', label: 'Other' },
];

export function DecisionCaptureWidget({
  runId,
  results,
  existingDecision,
  onDecisionSaved,
}: DecisionCaptureWidgetProps) {
  const [action, setAction] = useState<DecisionAction | null>(
    existingDecision?.action ?? null
  );
  const [reasonCategory, setReasonCategory] = useState<ReasonCategory | undefined>(
    existingDecision?.reason_category
  );
  const [reasonText, setReasonText] = useState(existingDecision?.reason_text ?? '');
  const [overrideValues, setOverrideValues] = useState<Record<string, unknown>>(
    existingDecision?.override_values ?? {}
  );
  const [isSaving, setIsSaving] = useState(false);

  // Extract current computed values for override placeholders
  const liftResult = results.lift as { lift_percent?: number; roi?: number } | undefined;
  const marginResult = results.margin as { recommendation?: string } | undefined;

  const handleSave = async () => {
    if (!action) return;

    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      const decision: DecisionRecord = {
        decision_id: `dec_${Date.now()}`,
        timestamp: new Date().toISOString(),
        run_id: runId,
        action,
        override_values: action === 'override' ? overrideValues : undefined,
        reason_category: reasonCategory,
        reason_text: reasonText || undefined,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      onDecisionSaved(decision);
    } finally {
      setIsSaving(false);
    }
  };

  const isReadOnly = !!existingDecision;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Decision Capture
          {existingDecision && (
            <span className="text-xs font-normal text-muted-foreground">
              Saved {new Date(existingDecision.timestamp).toLocaleDateString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action Toggle */}
        <div className="flex gap-2">
          {(['accept', 'override', 'reject'] as DecisionAction[]).map((a) => (
            <Button
              key={a}
              variant={action === a ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'flex-1 capitalize',
                action === a && a === 'accept' && 'bg-success hover:bg-success/90',
                action === a && a === 'reject' && 'bg-destructive hover:bg-destructive/90',
                action === a && a === 'override' && 'bg-warning hover:bg-warning/90 text-warning-foreground'
              )}
              onClick={() => !isReadOnly && setAction(a)}
              disabled={isReadOnly}
            >
              {a}
            </Button>
          ))}
        </div>

        {/* Override Fields (shown when override is selected) */}
        {action === 'override' && (
          <div className="space-y-3 p-3 bg-muted/50 rounded-md">
            <p className="text-xs text-muted-foreground">
              Override computed values:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Lift %</label>
                <Input
                  type="number"
                  placeholder={liftResult?.lift_percent?.toString() ?? '—'}
                  value={(overrideValues.lift_percent as number) ?? ''}
                  onChange={(e) =>
                    setOverrideValues({
                      ...overrideValues,
                      lift_percent: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  disabled={isReadOnly}
                  className="h-8"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">ROI</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder={liftResult?.roi?.toString() ?? '—'}
                  value={(overrideValues.roi as number) ?? ''}
                  onChange={(e) =>
                    setOverrideValues({
                      ...overrideValues,
                      roi: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  disabled={isReadOnly}
                  className="h-8"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Recommendation</label>
              <Input
                type="text"
                placeholder={marginResult?.recommendation ?? 'Override recommendation...'}
                value={(overrideValues.recommendation as string) ?? ''}
                onChange={(e) =>
                  setOverrideValues({
                    ...overrideValues,
                    recommendation: e.target.value || undefined,
                  })
                }
                disabled={isReadOnly}
                className="h-8"
              />
            </div>
          </div>
        )}

        {/* Reason Category */}
        <div>
          <label className="text-xs text-muted-foreground">Reason Category</label>
          <Select
            value={reasonCategory}
            onValueChange={(v) => setReasonCategory(v as ReasonCategory)}
            disabled={isReadOnly}
          >
            <SelectTrigger className="h-9 mt-1">
              <SelectValue placeholder="Select a reason..." />
            </SelectTrigger>
            <SelectContent>
              {REASON_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reason Text */}
        <div>
          <label className="text-xs text-muted-foreground">Additional Notes</label>
          <Textarea
            placeholder="Why did you make this decision?"
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
            disabled={isReadOnly}
            className="mt-1 min-h-[80px]"
          />
        </div>

        {/* Save Button */}
        {!isReadOnly && (
          <Button
            onClick={handleSave}
            disabled={!action || isSaving}
            className="w-full"
          >
            {isSaving ? 'Saving...' : 'Save Decision'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
