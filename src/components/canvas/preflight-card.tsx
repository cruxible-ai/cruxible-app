'use client';

import * as React from 'react';
import type { PromoWithProducts } from '@/lib/demo-data';
import { RiskAssessmentCard } from './risk-assessment-card';
import { DecisionLogCard } from './decision-log-card';
import { SimilarPromosArtifactContent } from '@/components/chat-canvas/canvas/similar-promos-artifact';
import { SuggestionCard } from '@/components/promo-analysis/suggestion-card';
import type { AnalysisArtifact, RiskAssessmentData, SimilarPromosData, SuggestionsData } from '@/hooks/use-promo-analysis';
import type { RiskSuggestion, PromoDecision } from '@/lib/types/promo';
import { formatSkuName } from '@/lib/utils/formatters';

interface PreflightCardProps {
  promo: PromoWithProducts;
  planningArtifacts: AnalysisArtifact[];
  onClear?: () => void;
  /** Live suggestions state (overrides artifact data for reactivity) */
  suggestions?: RiskSuggestion[];
  /** Callback when a suggestion's Apply button is clicked */
  onApplySuggestion?: (suggestionId: string) => void;
  /** Status of the promo draft ('draft' shows approve/pass buttons) */
  status?: 'draft' | 'approved' | 'passed';
  /** Callback to approve the planned promo */
  onApprove?: () => void;
  /** Callback to pass/discard the planned promo */
  onPass?: () => void;
  /** Decision log entries from applied suggestions */
  decisions?: PromoDecision[];
  /** Projected estimates from scenario analysis */
  estimates?: {
    estimated_lift: number;
    estimated_roi: number;
    estimated_net_margin: number;
  };
  /** Callback to re-run preflight analysis with modified params */
  onRerunPreflight?: () => void;
}

/**
 * Cohesive card for plan_promotion artifacts (risk-assessment, similar-promos, suggestions).
 * Mirrors PromoMetadataCard's structure with promo metadata header and planning sections within.
 */
function PreflightCard({ promo, planningArtifacts, onClear, suggestions, onApplySuggestion, status, onApprove, onPass, decisions, estimates, onRerunPreflight }: PreflightCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDiscountDisplay = () => {
    switch (promo.promo_type) {
      case 'percentage_off':
        return `${promo.promo_value}% off`;
      case 'fixed_amount':
        return `$${promo.promo_value} off`;
      case 'bogo':
        return 'Buy One Get One';
      case 'bundle':
        return `Bundle: $${promo.promo_value}`;
      default:
        return `${promo.promo_value}% off`;
    }
  };

  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  const dateRange = `${formatDate(promo.start_date)} - ${formatDate(promo.end_date)}`;

  return (
    <div className="rounded-lg border-2 border-primary/20 bg-card overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShieldIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Preflight Analysis</h3>
              <p className="text-xs text-muted-foreground">{promo.name || promo.promo_id}</p>
            </div>
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors print:hidden"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetadataItem
            icon={<PercentIcon className="w-3.5 h-3.5" />}
            label="Discount"
            value={formatDiscountDisplay()}
          />
          <MetadataItem
            icon={<CalendarIcon className="w-3.5 h-3.5" />}
            label="Dates"
            value={dateRange}
          />
          <MetadataItem
            icon={<BoxIcon className="w-3.5 h-3.5" />}
            label="Products"
            value={formatProductNames(promo.sku_ids)}
          />
          <MetadataItem
            icon={<ClockIcon className="w-3.5 h-3.5" />}
            label="Duration"
            value={calculateDuration(promo.start_date, promo.end_date)}
          />
        </div>

        {/* Projected Estimates */}
        {estimates && (estimates.estimated_lift > 0 || estimates.estimated_net_margin > 0) && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-md bg-muted/40 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Lift</p>
              <p className="text-sm font-semibold">{(estimates.estimated_lift * 100).toFixed(1)}%</p>
            </div>
            <div className="rounded-md bg-muted/40 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. ROI</p>
              <p className="text-sm font-semibold">{(estimates.estimated_roi * 100).toFixed(0)}%</p>
            </div>
            <div className="rounded-md bg-muted/40 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Margin</p>
              <p className="text-sm font-semibold">${estimates.estimated_net_margin.toFixed(0)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Planning Artifact Sections */}
      <div className="px-4 pb-4 space-y-3">
        {planningArtifacts.map((artifact) => (
          <div key={artifact.id} className="border rounded-lg bg-background overflow-hidden">
            <PlanningArtifactSection
              artifact={artifact}
              suggestions={suggestions}
              onApplySuggestion={onApplySuggestion}
            />
          </div>
        ))}
      </div>

      {/* Decision Log */}
      {decisions && (
        <div className="px-4 pb-4">
          <DecisionLogCard decisions={decisions} />
        </div>
      )}

      {/* Approve / Pass actions — replaced by Re-analyze when suggestions are applied */}
      {status === 'draft' && (onApprove || onPass) && (
        <div className="px-4 pb-4 flex items-center gap-2">
          {suggestions?.some((s) => s.applied) && onRerunPreflight ? (
            <button
              type="button"
              onClick={onRerunPreflight}
              className="flex-1 py-2 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshIcon className="w-4 h-4" />
              Re-analyze with changes
            </button>
          ) : onApprove ? (
            <button
              type="button"
              onClick={onApprove}
              className="flex-1 py-2 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Approve Promo
            </button>
          ) : null}
          {onPass && (
            <button
              type="button"
              onClick={onPass}
              className="flex-1 py-2 px-4 text-sm font-medium rounded-md border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              Pass
            </button>
          )}
        </div>
      )}
      {status === 'approved' && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-2 text-sm text-success font-medium">
            <CheckCircleIcon className="w-4 h-4" />
            Promo approved and registered
          </div>
        </div>
      )}
      {status === 'passed' && (
        <div className="px-4 pb-4">
          <div className="rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
            Draft discarded
          </div>
        </div>
      )}
    </div>
  );
}

function PlanningArtifactSection({
  artifact,
  suggestions: liveSuggestions,
  onApplySuggestion,
}: {
  artifact: AnalysisArtifact;
  suggestions?: RiskSuggestion[];
  onApplySuggestion?: (id: string) => void;
}) {
  switch (artifact.type) {
    case 'risk-assessment': {
      const data = artifact.data as RiskAssessmentData;
      return <RiskAssessmentCard assessment={data.assessment} />;
    }
    case 'similar-promos': {
      const data = artifact.data as SimilarPromosData;
      return (
        <>
          <div className="px-3 py-2 bg-muted/30 border-b">
            <span className="text-sm font-medium">{artifact.title}</span>
          </div>
          <div className="p-3">
            <SimilarPromosArtifactContent promos={data.promos} />
          </div>
        </>
      );
    }
    case 'suggestions': {
      // Prefer live suggestions prop for reactivity over static artifact data
      const data = artifact.data as SuggestionsData;
      const displaySuggestions = liveSuggestions && liveSuggestions.length > 0
        ? liveSuggestions
        : data.suggestions;
      return (
        <SuggestionCard
          suggestions={displaySuggestions}
          onApply={onApplySuggestion || (() => {})}
        />
      );
    }
    default:
      return null;
  }
}

/**
 * Format SKU IDs into readable product names.
 * ≤3: show all names; >3: show first 2 + "& N more"
 */
function formatProductNames(skuIds: string[]): string {
  if (skuIds.length === 0) return 'No products';
  const names = skuIds.map(formatSkuName);
  if (names.length <= 3) return names.join(', ');
  return `${names[0]}, ${names[1]} & ${names.length - 2} more`;
}


function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

// Icons

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function PercentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

export { PreflightCard };
