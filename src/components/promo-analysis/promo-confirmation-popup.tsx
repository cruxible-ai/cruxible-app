'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { NewPromo } from '@/lib/demo-data';

interface PromoConfirmationPopupProps {
  promo: NewPromo;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  suggestionsApplied: number;
  awaitingDeclineConfirm: boolean;
  onConfirm: () => void;
  onEdit: () => void;
  onStartDecline: () => void;
  onCancelDecline: () => void;
  onConfirmDecline: () => void;
}

/**
 * Confirmation popup for new promo creation.
 * Shows promo summary, risk score, and confirm/edit/decline options.
 */
function PromoConfirmationPopup({
  promo,
  riskScore,
  riskLevel,
  suggestionsApplied,
  awaitingDeclineConfirm,
  onConfirm,
  onEdit,
  onStartDecline,
  onCancelDecline,
  onConfirmDecline,
}: PromoConfirmationPopupProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const dateRange = `${formatDate(promo.start_date)} - ${formatDate(promo.end_date)}`;

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-destructive';
    }
  };

  return (
    <Card className="border-2 border-primary/30 bg-primary/5">
      <CardHeader className="pb-2 py-3">
        <div className="flex items-center gap-2">
          <TargetIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Confirm New Promotion</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3 space-y-3">
        {/* Promo Summary */}
        <div className="space-y-1">
          <p className="font-medium">{promo.name}</p>
          <p className="text-sm text-muted-foreground">
            {promo.discount_value}% off · {dateRange} · {promo.sku_ids.length} SKUs
          </p>
        </div>

        {/* Risk & ROI */}
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Risk Score: </span>
            <span className={cn('font-medium', getRiskColor(riskLevel))}>
              {riskScore}/10
            </span>
            <span className={cn('text-xs ml-1 capitalize', getRiskColor(riskLevel))}>
              ({riskLevel})
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Est. ROI: </span>
            <span className="font-medium">{promo.estimated_roi.toFixed(1)}x</span>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue: </span>
            <span className="font-medium">${promo.estimated_revenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Optimization note */}
        {suggestionsApplied > 0 && (
          <p className="text-xs text-success flex items-center gap-1">
            <CheckIcon className="w-3 h-3" />
            {suggestionsApplied} optimization{suggestionsApplied !== 1 ? 's' : ''} applied
          </p>
        )}

        {/* Actions */}
        {awaitingDeclineConfirm ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Are you sure you want to discard this promotion?
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onCancelDecline}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={onConfirmDecline}
              >
                Discard Promo
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={onConfirm}
            >
              <CheckIcon className="w-4 h-4 mr-1.5" />
              Confirm
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onEdit}
            >
              <PencilIcon className="w-4 h-4 mr-1.5" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={onStartDecline}
            >
              <XIcon className="w-4 h-4 mr-1.5" />
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Success message shown after promo is confirmed
 */
interface PromoSuccessMessageProps {
  promoName: string;
  riskScore: number;
  suggestionsApplied: number;
  linksApproved: number;
  linksRejected: number;
  onDismiss: () => void;
}

function PromoSuccessMessage({
  promoName,
  riskScore,
  suggestionsApplied,
  linksApproved,
  linksRejected,
  onDismiss,
}: PromoSuccessMessageProps) {
  return (
    <Card className="border-2 border-success/30 bg-success/5">
      <CardHeader className="pb-2 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">Promotion Submitted for Approval</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={onDismiss}
          >
            Done
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3 space-y-3">
        <p className="text-sm">
          <span className="font-medium">{promoName}</span> has been sent to your administrator for review.
        </p>

        {/* Audit Trail */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Audit Trail Included:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <CheckIcon className="w-3 h-3 text-success" />
              Risk assessment ({riskScore}/10 - {riskScore <= 4 ? 'Low' : riskScore <= 6 ? 'Medium' : 'High'})
            </li>
            {suggestionsApplied > 0 && (
              <li className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-success" />
                {suggestionsApplied} optimization suggestion{suggestionsApplied !== 1 ? 's' : ''} applied
              </li>
            )}
            {(linksApproved > 0 || linksRejected > 0) && (
              <li className="flex items-center gap-2">
                <CheckIcon className="w-3 h-3 text-success" />
                Link validations: {linksApproved} approved, {linksRejected} rejected
              </li>
            )}
            <li className="flex items-center gap-2">
              <CheckIcon className="w-3 h-3 text-success" />
              Similar promo analysis
            </li>
          </ul>
        </div>

        <p className="text-xs text-muted-foreground italic">
          You'll receive a notification when approved.
        </p>
      </CardContent>
    </Card>
  );
}

// Icons

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export { PromoConfirmationPopup, PromoSuccessMessage };
