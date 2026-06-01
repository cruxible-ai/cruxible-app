'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { PromoDecision } from '@/lib/demo-data';

interface DecisionLogCardProps {
  decisions: PromoDecision[];
  className?: string;
}

/**
 * Shows a timeline of all decisions made during promo optimization.
 * Provides full transparency into every change and why it was made.
 */
function DecisionLogCard({ decisions, className }: DecisionLogCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
          <ClipboardIcon className="w-3.5 h-3.5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Decision Log</h3>
          <p className="text-[10px] text-muted-foreground">
            {decisions.length === 0
              ? 'No changes made yet'
              : `${decisions.length} optimization${decisions.length !== 1 ? 's' : ''} applied`}
          </p>
        </div>
      </div>

      {/* Empty state */}
      {decisions.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-xs text-muted-foreground">
            Apply suggestions above to optimize this promo.
            <br />
            Each change will be logged here.
          </p>
        </div>
      ) : (
        /* Decision timeline */
        <div className="space-y-3">
          {decisions.map((decision, index) => (
            <div
              key={decision.id}
              className="relative pl-4 border-l-2 border-success/50"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-success" />

              {/* Decision content */}
              <div className="space-y-1">
                {/* Action */}
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{decision.action}</span>
                </div>

                {/* Rationale */}
                <p className="text-xs text-muted-foreground ml-5">
                  {decision.rationale}
                </p>

                {/* Impact tags */}
                <div className="flex flex-wrap gap-2 ml-5 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-success/10 text-success border border-success/20">
                    Overall Risk: {decision.old_overall_risk} → {decision.new_overall_risk}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                    {decision.factor_affected} Risk: {decision.old_factor_risk} → {decision.new_factor_risk}
                  </span>
                </div>
              </div>

              {/* Connector line to next item (except last) */}
              {index < decisions.length - 1 && (
                <div className="h-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Icons

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export { DecisionLogCard };
