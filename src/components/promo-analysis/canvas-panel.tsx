'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PromoMetadataCard } from '@/components/canvas/promo-metadata-card';
import { PreflightCard } from '@/components/canvas/preflight-card';
import type { AnalysisArtifact, NewPromoCreationState } from '@/hooks/use-promo-analysis';
import type { PromoWithProducts } from '@/lib/types/promo';
import type { PromoSummary } from '@/lib/api-types';
import { apiPromoToPromoWithProducts } from '@/lib/utils/formatters';

interface CanvasPanelProps {
  promo: PromoWithProducts;
  artifacts: AnalysisArtifact[];
  /** Available promos for multi-promo lookup (raw API data) */
  availablePromos: PromoSummary[];
  onClearCanvas: () => void;
  /** New promo creation state (optional) */
  newPromoCreation?: NewPromoCreationState;
  /** Callbacks for new promo approval */
  onApprovePromo?: () => void;
  onPassPromo?: () => void;
  /** Callback for applying a suggestion */
  onApplySuggestion?: (suggestionId: string) => void;
  /** Callback to re-run preflight analysis with modified params */
  onRerunPreflight?: () => void;
}

/**
 * Canvas panel for building audit reports with merged PromoMetadataCard
 */
function CanvasPanel({
  promo,
  artifacts,
  availablePromos,
  onClearCanvas,
  newPromoCreation,
  onApprovePromo,
  onPassPromo,
  onApplySuggestion,
  onRerunPreflight,
}: CanvasPanelProps) {
  // Group ALL artifacts by promo_id to support multi-promo canvas
  // Planning artifacts (similar-promos, suggestions, risk-assessment) are separated
  // so they render as standalone cards rather than inside PromoMetadataCard.
  const artifactsByPromo = React.useMemo(() => {
    const planningTypes = new Set(['similar-promos', 'suggestions', 'risk-assessment']);
    const groups = new Map<string, {
      promoArtifacts: AnalysisArtifact[];
      planningArtifacts: AnalysisArtifact[];
      skuArtifacts: Record<string, AnalysisArtifact[]>;
    }>();

    for (const artifact of artifacts) {
      const promoId = artifact.context?.promo_id;
      if (!promoId) continue;

      if (!groups.has(promoId)) {
        groups.set(promoId, { promoArtifacts: [], planningArtifacts: [], skuArtifacts: {} });
      }
      const group = groups.get(promoId)!;

      if (planningTypes.has(artifact.type)) {
        group.planningArtifacts.push(artifact);
      } else if (artifact.context?.sku_id) {
        const skuId = artifact.context.sku_id;
        if (!group.skuArtifacts[skuId]) {
          group.skuArtifacts[skuId] = [];
        }
        group.skuArtifacts[skuId].push(artifact);
      } else {
        group.promoArtifacts.push(artifact);
      }
    }
    return groups;
  }, [artifacts]);

  // Get unique promo IDs that have artifacts (for count display)
  const promoCount = artifactsByPromo.size;

  const handleExportPDF = () => {
    window.print();
  };

  const hasContent = artifacts.length > 0 || newPromoCreation?.newPromo;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b bg-background/50 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium">Audit Canvas</h2>
          <p className="text-xs text-muted-foreground">
            {newPromoCreation?.newPromo
              ? 'New promo draft'
              : hasContent
              ? `${artifacts.length} artifact${artifacts.length !== 1 ? 's' : ''} across ${promoCount} promo${promoCount !== 1 ? 's' : ''}`
              : 'Add artifacts to build your report'}
          </p>
        </div>
        {hasContent && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClearCanvas} className="print:hidden">
              Clear
            </Button>
            <Button variant="default" size="sm" onClick={handleExportPDF} className="print:hidden">
              <ExportIcon className="w-4 h-4 mr-1.5" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 print:space-y-6">
          {/* Print header - only visible when printing */}
          <div className="hidden print:block mb-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Cruxible Audit Report</h1>
              <p className="text-lg text-muted-foreground mt-1">
                {promoCount > 1 ? `${promoCount} Promotions` : promo.name || promo.promo_id}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Generated {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <hr className="mt-6" />
          </div>

          {/* Render a card for each promo with artifacts */}
          {Array.from(artifactsByPromo.entries()).map(([promoId, group]) => {
            // Prefer current promo from state (has sku_results from analysis),
            // fall back to API promo list for other promos on the canvas
            const apiPromo = availablePromos.find((p) => p.promo_id === promoId);
            let promoWithProducts: PromoWithProducts;

            if (promo.promo_id === promoId) {
              promoWithProducts = promo;
            } else if (apiPromo) {
              promoWithProducts = apiPromoToPromoWithProducts(apiPromo);
            } else {
              // Create a minimal promo for unknown promos
              promoWithProducts = {
                promo_id: promoId,
                name: promoId,
                start_date: '',
                end_date: '',
                promo_type: 'percentage_off',
                promo_value: 0,
                sku_ids: [],
                status: 'completed',
                products: [],
              };
            }

            const hasEvaluation = group.promoArtifacts.length > 0 || Object.keys(group.skuArtifacts).length > 0;

            return (
              <React.Fragment key={promoId}>
                {hasEvaluation && (
                  <PromoMetadataCard
                    promo={promoWithProducts}
                    promoArtifacts={group.promoArtifacts}
                    skuArtifacts={group.skuArtifacts}
                    onClear={onClearCanvas}
                  />
                )}
                {group.planningArtifacts.length > 0 && (
                  <PreflightCard
                    promo={newPromoCreation?.newPromo ? {
                      ...promoWithProducts,
                      name: newPromoCreation.newPromo.name || promoWithProducts.name,
                      promo_type: newPromoCreation.newPromo.discount_type || promoWithProducts.promo_type,
                      promo_value: newPromoCreation.newPromo.discount_value ?? promoWithProducts.promo_value,
                      start_date: newPromoCreation.newPromo.start_date || promoWithProducts.start_date,
                      end_date: newPromoCreation.newPromo.end_date || promoWithProducts.end_date,
                      sku_ids: newPromoCreation.newPromo.sku_ids.length > 0 ? newPromoCreation.newPromo.sku_ids : promoWithProducts.sku_ids,
                    } : promoWithProducts}
                    planningArtifacts={group.planningArtifacts}
                    onClear={onClearCanvas}
                    suggestions={newPromoCreation?.suggestions}
                    onApplySuggestion={onApplySuggestion}
                    status={newPromoCreation?.status}
                    onApprove={onApprovePromo}
                    onPass={onPassPromo}
                    decisions={newPromoCreation?.decisions}
                    estimates={newPromoCreation?.newPromo ? {
                      estimated_lift: newPromoCreation.newPromo.estimated_lift,
                      estimated_roi: newPromoCreation.newPromo.estimated_roi,
                      estimated_net_margin: newPromoCreation.newPromo.estimated_net_margin,
                    } : undefined}
                    onRerunPreflight={onRerunPreflight}
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Add artifacts hint when no artifacts and not creating new promo */}
          {artifacts.length === 0 && !newPromoCreation?.newPromo && (
            <AddArtifactsHint />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

/**
 * Small hint for adding artifacts - shown below promo metadata
 */
function AddArtifactsHint() {
  return (
    <div className="rounded-lg border border-dashed border-muted-foreground/30 p-4 text-center">
      <p className="text-xs text-muted-foreground">
        Click{' '}
        <span className="inline-flex items-center align-middle">
          <AddIcon className="w-3 h-3 mx-0.5" />
        </span>{' '}
        on artifacts in the chat to add them to your audit report
      </p>
    </div>
  );
}

// Icons

function ExportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function AddIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

export { CanvasPanel };
