'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateRange, type NetworkReportData } from '@/lib/report-types';

interface MethodologySectionProps {
  data: NetworkReportData;
  className?: string;
}

/**
 * Methodology section showing:
 * - Data quality metrics
 * - Model information
 * - Limitations
 * - Improvement suggestions
 */
function MethodologySection({ data, className }: MethodologySectionProps) {
  return (
    <section className={cn('space-y-6 report-page-break', className)}>
      {/* Section Header */}
      <h2 className="text-xl font-semibold">Methodology & Data Quality</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Quality */}
        {data.ingestion_report && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DatabaseIcon className="w-4 h-4 text-primary" />
                Data Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Date Range</dt>
                  <dd className="font-medium">
                    {formatDateRange(data.ingestion_report.date_range[0], data.ingestion_report.date_range[1])}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">SKUs Analyzed</dt>
                  <dd className="font-medium">{data.ingestion_report.sku_count.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Transaction Rows</dt>
                  <dd className="font-medium">{data.ingestion_report.rows_after_aggregation.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Cost Data</dt>
                  <dd>
                    <Badge variant={data.has_cost_data ? 'success-soft' : 'muted'} size="sm">
                      {data.has_cost_data ? 'Available' : 'Not provided'}
                    </Badge>
                  </dd>
                </div>
              </dl>

              {/* Column Mapping */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Column Mapping</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(data.ingestion_report.column_mapping).map(([key, value]) => (
                    <Badge key={key} variant="outline" size="sm">
                      {key} → {value}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Model Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CpuIcon className="w-4 h-4 text-primary" />
              Model Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Model Version</dt>
                <dd className="font-medium">{data.model_version}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Confidence Level</dt>
                <dd>
                  <Badge
                    variant={
                      data.confidence_level === 'high'
                        ? 'success-soft'
                        : data.confidence_level === 'medium'
                          ? 'warning-soft'
                          : 'muted'
                    }
                    size="sm"
                  >
                    {data.confidence_level}
                  </Badge>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Edges Consulted</dt>
                <dd className="font-medium">{data.edges_consulted}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Avg. Edge Confidence</dt>
                <dd className="font-medium">{Math.round(data.avg_edge_confidence * 100)}%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Calibration Caveat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <InfoIcon className="w-4 h-4 text-primary" />
            Initial Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            These relationships are detected from cross-elasticity patterns in your sales data.
            Confidence will improve as we:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Observe actual promo outcomes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Incorporate your feedback on product relationships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Accumulate more historical data</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Limitations */}
      {data.limitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertIcon className="w-4 h-4 text-warning" />
              Limitations
            </CardTitle>
            <CardDescription>
              Important caveats to consider when interpreting results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Improvement Suggestions */}
      {data.improvement_suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ArrowUpIcon className="w-4 h-4 text-success" />
              How to Improve This Analysis
            </CardTitle>
            <CardDescription>
              Suggested data additions for more accurate results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.improvement_suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-success mt-0.5">→</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export { MethodologySection };
export type { MethodologySectionProps };
