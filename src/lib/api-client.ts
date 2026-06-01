/**
 * Typed fetch client for non-SSE API endpoints.
 *
 * For SSE streaming, use sse-client.ts instead.
 */

import type {
  AnalyzeResponse,
  RunRecord,
  RunRecordSummary,
  ProductGraphResponse,
  PromoListResponse,
  CampaignListResponse,
} from './api-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Generic fetch wrapper with error handling and JSON parsing.
 */
async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

// =============================================================================
// Run endpoints
// =============================================================================

export interface RunListParams {
  limit?: number;
  offset?: number;
  status?: string;
  intent_type?: string;
}

export interface RunRecordListResponse {
  runs: RunRecordSummary[];
  total: number;
}

export interface EvidencePackageResponse {
  run: RunRecord;
  decisions: unknown[];
  edges: unknown[];
  exported_at: string;
}

export async function fetchRuns(params?: RunListParams): Promise<RunRecordListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.offset) searchParams.set('offset', String(params.offset));
  if (params?.status) searchParams.set('status', params.status);
  if (params?.intent_type) searchParams.set('intent_type', params.intent_type);
  const qs = searchParams.toString();
  return fetchApi<RunRecordListResponse>(`/api/v1/runs${qs ? `?${qs}` : ''}`);
}

export async function fetchRun(runId: string): Promise<RunRecord> {
  return fetchApi<RunRecord>(`/api/v1/runs/${encodeURIComponent(runId)}`);
}

export async function fetchRunAnalysis(runId: string): Promise<AnalyzeResponse> {
  return fetchApi<AnalyzeResponse>(`/api/v1/runs/${encodeURIComponent(runId)}/analysis`);
}

export async function fetchRunEvidence(runId: string): Promise<EvidencePackageResponse> {
  return fetchApi<EvidencePackageResponse>(`/api/v1/runs/${encodeURIComponent(runId)}/evidence`);
}

// =============================================================================
// Product endpoints
// =============================================================================

export interface ProductResponse {
  sku_id: string;
  merchant_id: string;
  name: string;
  category: string | null;
  unit_price: number | null;
}

export interface ProductListResponse {
  products: ProductResponse[];
  total: number;
}

export interface GraphStatsResponse {
  product_count: number;
  relationship_count: number;
  substitute_count: number;
  complement_count: number;
  pending_count: number;
  validated_count: number;
}

export interface ProductListParams {
  merchant_id?: string;
  limit?: number;
  offset?: number;
}

export async function fetchProducts(params?: ProductListParams): Promise<ProductListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.merchant_id) searchParams.set('merchant_id', params.merchant_id);
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.offset) searchParams.set('offset', String(params.offset));
  const qs = searchParams.toString();
  return fetchApi<ProductListResponse>(`/api/v1/products${qs ? `?${qs}` : ''}`);
}

export async function fetchProductGraph(params?: { merchant_id?: string }): Promise<ProductGraphResponse> {
  const searchParams = new URLSearchParams();
  if (params?.merchant_id) searchParams.set('merchant_id', params.merchant_id);
  const qs = searchParams.toString();
  return fetchApi<ProductGraphResponse>(`/api/v1/products/graph${qs ? `?${qs}` : ''}`);
}

export async function fetchProductStats(): Promise<GraphStatsResponse> {
  return fetchApi<GraphStatsResponse>('/api/v1/products/stats');
}

// =============================================================================
// Promo endpoints
// =============================================================================

export interface PromoListParams {
  merchant_id?: string;
  limit?: number;
  offset?: number;
}

export async function fetchPromos(params?: PromoListParams): Promise<PromoListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.merchant_id) searchParams.set('merchant_id', params.merchant_id);
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.offset) searchParams.set('offset', String(params.offset));
  const qs = searchParams.toString();
  return fetchApi<PromoListResponse>(`/api/v1/promos${qs ? `?${qs}` : ''}`);
}

export async function fetchCampaigns(params?: { limit?: number }): Promise<CampaignListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  const qs = searchParams.toString();
  return fetchApi<CampaignListResponse>(`/api/v1/promos/campaigns${qs ? `?${qs}` : ''}`);
}

export async function fetchPromo(promoId: string): Promise<import('./api-types').PromoSummary> {
  return fetchApi<import('./api-types').PromoSummary>(`/api/v1/promos/${encodeURIComponent(promoId)}`);
}

export interface CreatePromoRequest {
  name?: string;
  merchant_id?: string;
  start_date: string;
  end_date: string;
  promo_type?: string;
  promo_value: number;
  sku_ids: string[];
}

export async function createPromo(body: CreatePromoRequest): Promise<import('./api-types').PromoSummary> {
  return fetchApi<import('./api-types').PromoSummary>('/api/v1/promos', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
