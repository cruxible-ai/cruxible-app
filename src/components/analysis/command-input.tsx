'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalyzeRequest, IntentType } from '@/lib/api-types';

interface CommandInputProps {
  onSubmit: (request: AnalyzeRequest) => void;
  isRunning: boolean;
}

/**
 * Structured input for analysis requests.
 *
 * Uses buttons/pills for intent selection and form fields for entities.
 * Per phase1_beta.md: structured chat, not free-form text.
 */
export function CommandInput({ onSubmit, isRunning }: CommandInputProps) {
  const [intent, setIntent] = useState<IntentType>('evaluate_promotion');
  const [sku, setSku] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  const isValid = sku && startDate && endDate;

  const handleSubmit = () => {
    if (!isValid || isRunning) return;

    const request: AnalyzeRequest = {
      intent_type: intent,
      entities: {
        sku,
        start_date: startDate,
        end_date: endDate,
        ...(discount && { promo_value: parseFloat(discount) }),
        ...(unitCost && { unit_cost: parseFloat(unitCost) }),
        ...(unitPrice && { unit_price: parseFloat(unitPrice) }),
      },
    };

    onSubmit(request);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Run Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Intent selection pills */}
        <div className="flex gap-2">
          <Button
            variant={intent === 'evaluate_promotion' ? 'default' : 'outline'}
            onClick={() => setIntent('evaluate_promotion')}
            disabled={isRunning}
            className={intent === 'evaluate_promotion' ? 'bg-neon-ice text-onyx hover:bg-neon-ice/90' : ''}
          >
            Evaluate Promotion
          </Button>
          <Button
            variant={intent === 'plan_promotion' ? 'default' : 'outline'}
            onClick={() => setIntent('plan_promotion')}
            disabled={isRunning}
            className={intent === 'plan_promotion' ? 'bg-neon-ice text-onyx hover:bg-neon-ice/90' : ''}
          >
            Plan Promotion
          </Button>
        </div>

        {/* Entity inputs */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="sku" className="text-sm font-medium text-muted-foreground">
              SKU
            </label>
            <Input
              id="sku"
              placeholder="e.g., SKU-001"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="start-date" className="text-sm font-medium text-muted-foreground">
              Start Date
            </label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="end-date" className="text-sm font-medium text-muted-foreground">
              End Date
            </label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="discount" className="text-sm font-medium text-muted-foreground">
              Discount %
            </label>
            <Input
              id="discount"
              type="number"
              placeholder="e.g., 20"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="unit-cost" className="text-sm font-medium text-muted-foreground">
              Unit Cost
            </label>
            <Input
              id="unit-cost"
              type="number"
              placeholder="e.g., 25.00"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="unit-price" className="text-sm font-medium text-muted-foreground">
              Unit Price
            </label>
            <Input
              id="unit-price"
              type="number"
              placeholder="e.g., 50.00"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              disabled={isRunning}
            />
          </div>
        </div>

        {/* Run button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isRunning}
            className="bg-neon-ice text-onyx hover:bg-neon-ice/90"
          >
            {isRunning ? (
              <>
                <span className="animate-pulse mr-2">●</span>
                Running...
              </>
            ) : (
              'Run Analysis'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
