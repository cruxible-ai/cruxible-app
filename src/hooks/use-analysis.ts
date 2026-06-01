'use client';

import { useCallback, useRef, useState } from 'react';
import type {
  AgentEvent,
  AnalysisStatus,
  AnalyzeRequest,
  ExecutionResult,
  PlotlyFigure,
} from '@/lib/api-types';
import { streamAnalysis } from '@/lib/sse-client';

export interface AnalysisState {
  status: AnalysisStatus;
  runId: string | null;
  events: AgentEvent[];
  charts: Record<string, PlotlyFigure>;
  results: ExecutionResult | null;
  error: string | null;
}

const initialState: AnalysisState = {
  status: 'idle',
  runId: null,
  events: [],
  charts: {},
  results: null,
  error: null,
};

/**
 * Hook for managing streaming analysis state.
 *
 * Handles SSE event consumption, state updates, and abort control.
 *
 * @example
 * ```tsx
 * const { status, events, charts, results, startAnalysis, abort } = useAnalysis();
 *
 * const handleSubmit = () => {
 *   startAnalysis({
 *     intent_type: 'evaluate_promotion',
 *     entities: { sku: 'SKU-001', start_date: '2024-07-01', end_date: '2024-07-07' },
 *   });
 * };
 * ```
 */
export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const startAnalysis = useCallback(async (request: AnalyzeRequest) => {
    // Abort any existing analysis
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState({
      status: 'running',
      runId: null,
      events: [],
      charts: {},
      results: null,
      error: null,
    });

    try {
      for await (const event of streamAnalysis(
        request,
        abortControllerRef.current.signal
      )) {
        setState((prev) => {
          // Accumulate charts from agent_completed events
          const newCharts = event.charts
            ? { ...prev.charts, ...event.charts }
            : prev.charts;

          // Determine new status based on event type
          let newStatus: AnalysisStatus = prev.status;
          if (event.type === 'run_completed') {
            newStatus = 'completed';
          } else if (event.type === 'run_failed') {
            newStatus = 'failed';
          }

          return {
            ...prev,
            status: newStatus,
            runId: event.run_id,
            events: [...prev.events, event],
            charts: newCharts,
            results: event.execution_result || prev.results,
            error: event.run_error || prev.error,
          };
        });
      }
    } catch (err) {
      // Don't treat abort as an error
      if (err instanceof Error && err.name === 'AbortError') {
        setState((prev) => ({
          ...prev,
          status: 'idle',
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      }));
    }
  }, []);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    abort();
    setState(initialState);
  }, [abort]);

  return {
    ...state,
    startAnalysis,
    abort,
    reset,
    isRunning: state.status === 'running',
    isCompleted: state.status === 'completed',
    isFailed: state.status === 'failed',
  };
}
