'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { LinkValidation } from '@/hooks/use-promo-analysis';

interface LinkValidationPopupProps {
  currentLink: LinkValidation;
  remainingCount: number;
  awaitingRejectConfirm: boolean;
  onApprove: () => void;
  onModify: () => void;
  onStartReject: () => void;
  onCancelReject: () => void;
  onConfirmReject: () => void;
  onDismiss: () => void;
}

/**
 * Popup for validating product relationship links
 */
function LinkValidationPopup({
  currentLink,
  remainingCount,
  awaitingRejectConfirm,
  onApprove,
  onModify,
  onStartReject,
  onCancelReject,
  onConfirmReject,
  onDismiss,
}: LinkValidationPopupProps) {
  const edgeTypeLabel = currentLink.edgeType === 'substitute_of' ? 'substitute' : 'complement';
  const confidencePercent = Math.round(currentLink.confidence * 100);

  return (
    <Card className="border-2 border-chart-2/30 bg-chart-2/5">
      <CardHeader className="pb-2 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-chart-2" />
            <span className="text-sm font-medium">Validate Relationships</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={onDismiss}
          >
            Maybe later
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3 space-y-3">
        {/* Current link */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{currentLink.sourceProduct}</span>
          <ArrowBothIcon className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{currentLink.targetProduct}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {edgeTypeLabel}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {confidencePercent}% confidence
          </span>
        </div>

        {/* Actions */}
        {awaitingRejectConfirm ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Are you sure? Adding a reason helps improve future recommendations.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onCancelReject}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={onConfirmReject}
              >
                Reject anyway
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Or type a reason below and press Enter
            </p>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={onApprove}
            >
              <CheckIcon className="w-4 h-4 mr-1.5" />
              Confirm
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onModify}
            >
              <PencilIcon className="w-4 h-4 mr-1.5" />
              Modify
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={onStartReject}
            >
              <XIcon className="w-4 h-4 mr-1.5" />
              Reject
            </Button>
          </div>
        )}

        {/* Progress */}
        {remainingCount > 0 && (
          <p className="text-xs text-muted-foreground text-center pt-1 border-t border-border/50">
            {remainingCount} more to review
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Props for ValidationSummary
 */
interface ValidationSummaryProps {
  links: LinkValidation[];
  onDismiss: () => void;
}

/**
 * Summary popup shown after all links have been validated
 */
function ValidationSummary({ links, onDismiss }: ValidationSummaryProps) {
  const approved = links.filter((l) => l.status === 'approved');
  const rejected = links.filter((l) => l.status === 'rejected');

  return (
    <Card className="border-2 border-emerald-500/30 bg-emerald-500/5">
      <CardHeader className="pb-2 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium">Validation Complete</span>
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
        {/* Summary counts */}
        <p className="text-xs text-muted-foreground">
          {approved.length} approved · {rejected.length} rejected
        </p>

        {/* Decision list */}
        <div className="space-y-2">
          {links.map((link) => {
            const edgeTypeLabel =
              link.edgeType === 'substitute_of' ? 'substitute' : 'complement';
            const isApproved = link.status === 'approved';

            return (
              <div key={link.edgeKey} className="text-xs space-y-0.5">
                <div className="flex items-center gap-2">
                  {isApproved ? (
                    <CheckIcon className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <XIcon className="w-3 h-3 text-destructive" />
                  )}
                  <span>
                    {link.sourceProduct} ↔ {link.targetProduct}
                  </span>
                  <Badge variant="outline" className="text-[10px] px-1 py-0">
                    {edgeTypeLabel}
                  </Badge>
                </div>
                {link.rejectionReason && (
                  <p className="text-muted-foreground pl-5 italic">
                    "{link.rejectionReason}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Icons

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

function ArrowBothIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7l4-4m0 0l4 4m-4-4v18m4-4l-4 4m0 0l-4-4"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

export { LinkValidationPopup, ValidationSummary };
