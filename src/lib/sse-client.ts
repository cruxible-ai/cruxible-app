/**
 * POST-based SSE client for streaming analysis.
 *
 * Native EventSource only supports GET requests.
 * We use fetch + ReadableStream for POST-based SSE.
 */

import type { AgentEvent, AnalyzeRequest } from './api-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Stream analysis events from the backend.
 *
 * Yields AgentEvent objects as they arrive from the SSE stream.
 * Handles buffering for partial chunks and parses SSE format.
 *
 * @param request - Analysis request payload
 * @param signal - Optional AbortSignal for cancellation
 * @yields AgentEvent objects from the stream
 * @throws Error if the request fails or stream is interrupted
 */
export async function* streamAnalysis(
  request: AnalyzeRequest,
  signal?: AbortSignal
): AsyncGenerator<AgentEvent, void, unknown> {
  const response = await fetch(`${API_BASE}/api/v1/analyze/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    // Handle nested error structure from FastAPI: {"detail": {"error": "...", "error_code": "..."}}
    const message = error.error || error.detail?.error || (typeof error.detail === 'string' ? error.detail : null) || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Normalize CRLF to LF for consistent parsing
      buffer = buffer.replace(/\r\n/g, '\n');

      // Split on double newlines (SSE event separator)
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';

      for (const part of parts) {
        const lines = part.split('\n');
        let eventData = '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            eventData = line.slice(6);
          }
        }

        if (eventData) {
          try {
            const event = JSON.parse(eventData) as AgentEvent;
            yield event;
          } catch (parseError) {
            console.error('Failed to parse SSE event:', parseError, eventData);
          }
        }
      }
    }

    // Process any remaining buffer content
    if (buffer.trim()) {
      const lines = buffer.split('\n');
      let eventData = '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          eventData = line.slice(6);
        }
      }

      if (eventData) {
        try {
          const event = JSON.parse(eventData) as AgentEvent;
          yield event;
        } catch (parseError) {
          console.error('Failed to parse final SSE event:', parseError, eventData);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Non-streaming analysis request.
 *
 * For cases where SSE streaming is not needed.
 */
export async function analyzeSync(request: AnalyzeRequest): Promise<unknown> {
  const response = await fetch(`${API_BASE}/api/v1/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    // Handle nested error structure from FastAPI: {"detail": {"error": "...", "error_code": "..."}}
    const message = error.error || error.detail?.error || (typeof error.detail === 'string' ? error.detail : null) || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}
