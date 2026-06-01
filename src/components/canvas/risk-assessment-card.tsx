'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { RiskAssessment, RiskFactor, PromoLearning } from '@/lib/types/promo';

interface RiskAssessmentCardProps {
  assessment: RiskAssessment;
  /** Optional initial assessment to compare factor scores against (for showing improvements) */
  initialAssessment?: RiskAssessment;
  className?: string;
}

/**
 * Displays risk assessment at the top of canvas when creating a new promo.
 * Shows overall score, risk factors, and learnings from past promos.
 */
function RiskAssessmentCard({ assessment, initialAssessment, className }: RiskAssessmentCardProps) {
  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return {
          bg: 'bg-success/10',
          border: 'border-success/30',
          text: 'text-success',
          icon: <CheckIcon className="w-5 h-5" />,
        };
      case 'medium':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          text: 'text-warning',
          icon: <AlertIcon className="w-5 h-5" />,
        };
      case 'high':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive/30',
          text: 'text-destructive',
          icon: <WarningIcon className="w-5 h-5" />,
        };
    }
  };

  const colors = getRiskColor(assessment.risk_level);

  return (
    <div className={cn('rounded-lg border-2', colors.border, colors.bg, 'p-4', className)}>
      {/* Header with score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={colors.text}>{colors.icon}</span>
          <h3 className="text-sm font-semibold">Risk Assessment</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Score:</span>
          <span className={cn('text-lg font-bold', colors.text)}>
            {assessment.overall_risk_score}/10
          </span>
          <span
            className={cn(
              'text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize',
              colors.bg,
              colors.border,
              colors.text
            )}
          >
            {assessment.risk_level}
          </span>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Risk Factors:</p>
        <div className="space-y-2">
          {assessment.factors.map((factor, index) => {
            // Find original factor to compare (if initial assessment provided)
            const originalFactor = initialAssessment?.factors.find(
              (f) => f.category === factor.category
            );
            return (
              <RiskFactorItem
                key={index}
                factor={factor}
                originalScore={originalFactor?.risk_score}
              />
            );
          })}
        </div>
      </div>

      {/* Learnings */}
      {assessment.learnings.length > 0 && (
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-2">Learnings from Past Promos:</p>
          <div className="space-y-2">
            {assessment.learnings.map((learning, index) => (
              <LearningItem key={index} learning={learning} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface RiskFactorItemProps {
  factor: RiskFactor;
  originalScore?: number;
}

function RiskFactorItem({ factor, originalScore }: RiskFactorItemProps) {
  const getFactorColor = (score: number) => {
    if (score <= 4) return 'text-success';
    if (score <= 6) return 'text-warning';
    return 'text-destructive';
  };

  const formatCategory = (category: RiskFactor['category']) => {
    const labels: Record<RiskFactor['category'], string> = {
      cannibalization: 'Cannibalization Risk',
      timing: 'Timing Risk',
      discount_depth: 'Discount Depth',
      history: 'Historical Pattern',
      duration: 'Duration Risk',
    };
    return labels[category];
  };

  const hasChanged = originalScore !== undefined && originalScore !== factor.risk_score;
  const improved = hasChanged && factor.risk_score < (originalScore ?? factor.risk_score);

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md px-3 py-2',
        improved ? 'bg-success/10 border border-success/20' : 'bg-background/50'
      )}
    >
      <div className="flex items-center gap-2 min-w-[140px]">
        {/* Score */}
        <div className="flex items-center gap-1">
          <span className={cn('text-sm font-medium', getFactorColor(factor.risk_score))}>
            {factor.risk_score}/10
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatCategory(factor.category)}
        </span>
      </div>
      <p className="text-xs text-foreground/80 flex-1">{factor.description}</p>
    </div>
  );
}

interface LearningItemProps {
  learning: PromoLearning;
}

function LearningItem({ learning }: LearningItemProps) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <ChartIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium">{learning.source_promo}:</span>{' '}
        <span className="text-muted-foreground">{learning.insight}</span>
      </div>
    </div>
  );
}

// Icons

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function ImprovedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export { RiskAssessmentCard };
