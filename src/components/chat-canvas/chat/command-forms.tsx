'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CommandFormProps {
  onSubmit: (request: { intent_type: string; entities: Record<string, unknown>; raw_query?: string }) => void;
  onCancel: () => void;
}

/**
 * Form for /analyze command - Evaluate past promotion performance
 */
function AnalyzeForm({ onSubmit, onCancel }: CommandFormProps) {
  const [promoId, setPromoId] = React.useState('');
  const [sku, setSku] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      intent_type: 'evaluate_promotion',
      entities: {
        promo_id: promoId || undefined,
        sku: sku || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      },
      raw_query: promoId ? `Analyze promo ${promoId}` : `Analyze ${sku} from ${startDate} to ${endDate}`,
    });
  };

  const canSubmit = promoId || (sku && startDate && endDate && startDate <= endDate);
  const hasDateError = startDate && endDate && startDate > endDate;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">/analyze - Evaluate Promotion</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="h-6 w-6 p-0">
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="promo_id">Promo ID</Label>
          <Input
            id="promo_id"
            value={promoId}
            onChange={(e) => setPromoId(e.target.value)}
            placeholder="PROMO-123"
            className="mt-1"
          />
        </div>

        <div className="text-xs text-muted-foreground text-center py-1">— or use dates + SKU —</div>

        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="SKU-001"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={!canSubmit}>
          Run Analysis
        </Button>
      </div>
    </form>
  );
}

/**
 * Form for /plan command - Plan a future promotion
 */
function PlanForm({ onSubmit, onCancel }: CommandFormProps) {
  const [sku, setSku] = React.useState('');
  const [promoValue, setPromoValue] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      intent_type: 'plan_promotion',
      entities: {
        sku: sku || undefined,
        promo_value: promoValue ? parseFloat(promoValue) : undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      },
      raw_query: `Plan ${promoValue}% off promotion for ${sku}`,
    });
  };

  const canSubmit = sku && promoValue && startDate && endDate && startDate <= endDate;
  const hasDateError = startDate && endDate && startDate > endDate;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">/plan - Plan Promotion</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="h-6 w-6 p-0">
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="plan_sku">SKU</Label>
          <Input
            id="plan_sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="SKU-001"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="discount">Discount %</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            value={promoValue}
            onChange={(e) => setPromoValue(e.target.value)}
            placeholder="20"
            className="mt-1"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="plan_start_date">Start Date</Label>
            <Input
              id="plan_start_date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="plan_end_date">End Date</Label>
            <Input
              id="plan_end_date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={!canSubmit}>
          Run Preflight
        </Button>
      </div>
    </form>
  );
}

/**
 * Simple label component
 */
function Label({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-xs font-medium text-muted-foreground', className)}
    >
      {children}
    </label>
  );
}

/**
 * X icon for close button
 */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/**
 * Map command name to form component
 */
export const COMMAND_FORMS: Record<string, React.ComponentType<CommandFormProps>> = {
  analyze: AnalyzeForm,
  plan: PlanForm,
};

export { AnalyzeForm, PlanForm };
export type { CommandFormProps };
