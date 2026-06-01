/**
 * Chat client for LLM-powered conversational interface.
 *
 * Provides SSE streaming for:
 * - Chat message processing (intent extraction)
 * - Confirmation flow (execute after user confirms)
 */

import type { AgentEvent } from './api-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Parsed field for confirmation UI
 */
export interface ParsedField {
  label: string;
  value: string;
  field_key: string;
  editable: boolean;
}

/**
 * Chat request payload
 */
export interface ChatRequest {
  session_id?: string;
  message: string;
  entity_hints?: {
    promo_ids?: string[];
    sku_ids?: string[];
    campaign_ids?: string[];
    active_promo?: {
      promo_id: string;
      promo_value: number;
      promo_type?: string;
      start_date: string;
      end_date: string;
      sku_ids: string[];
      name?: string;
    };
  };
}

/**
 * Confirm request payload
 */
export interface ConfirmRequest {
  session_id?: string;
  entities?: Record<string, unknown>;
  /** Intent type for direct execution (bypasses LLM extraction) */
  intent_type?: string;
}

/**
 * Chat stream event types
 */
export type ChatEventType =
  | 'text_delta'
  | 'confirmation_required'
  | 'agent_started'
  | 'agent_completed'
  | 'agent_skipped'
  | 'agent_failed'
  | 'run_started'
  | 'run_completed'
  | 'run_failed'
  | 'error';

/**
 * Chat stream event
 */
export interface ChatStreamEvent {
  type: ChatEventType;
  /** Text response (for text_delta) */
  text?: string;
  /** Session ID for conversation continuity */
  session_id?: string;
  /** Intent type (for confirmation_required) */
  intent_type?: string;
  /** Parsed fields for confirmation UI */
  fields?: ParsedField[];
  /** LLM-generated description of what it's about to do (for confirmation_required) */
  description?: string;
  /** Error message (for error events) */
  error?: string;
  /** Agent event data (for agent_* and run_* events) */
  agentEvent?: AgentEvent;
}

/**
 * Parse SSE data into ChatStreamEvent
 */
function parseSSEData(eventType: string, data: string): ChatStreamEvent | null {
  try {
    const parsed = JSON.parse(data);

    // text_delta and confirmation_required have their own shape
    if (eventType === 'text_delta') {
      return {
        type: 'text_delta',
        text: parsed.text,
        session_id: parsed.session_id,
      };
    }

    if (eventType === 'confirmation_required') {
      return {
        type: 'confirmation_required',
        session_id: parsed.session_id,
        intent_type: parsed.intent_type,
        fields: parsed.fields,
        description: parsed.description,
      };
    }

    if (eventType === 'error') {
      return {
        type: 'error',
        error: parsed.error,
        session_id: parsed.session_id,
      };
    }

    // Agent events have their own shape
    if (eventType.startsWith('agent_') || eventType.startsWith('run_')) {
      return {
        type: eventType as ChatEventType,
        agentEvent: parsed as AgentEvent,
      };
    }

    // Unknown event type - pass through
    return {
      type: eventType as ChatEventType,
      ...parsed,
    };
  } catch (e) {
    console.error('Failed to parse SSE data:', e, data);
    return null;
  }
}

/**
 * Stream chat events from the backend.
 *
 * This is the LLM path - parses natural language and extracts intent.
 *
 * @param request - Chat request with message and optional entity hints
 * @param signal - Optional AbortSignal for cancellation
 * @yields ChatStreamEvent objects from the stream
 */
export async function* streamChat(
  request: ChatRequest,
  signal?: AbortSignal
): AsyncGenerator<ChatStreamEvent, void, unknown> {
  const response = await fetch(`${API_BASE}/api/v1/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: response.statusText }));
    // FastAPI wraps HTTPException detail in { detail: { error: "...", error_code: "..." } }
    const detail = errorBody.detail;
    const errorMessage = typeof detail === 'string'
      ? detail
      : detail?.error || errorBody.error || `Request failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  yield* parseSSEStream(response.body);
}

/**
 * Stream confirmation execution events from the backend.
 *
 * Called after user confirms extracted parameters.
 *
 * @param request - Confirm request with session_id and optional entity overrides
 * @param signal - Optional AbortSignal for cancellation
 * @yields ChatStreamEvent objects (agent events) from the stream
 */
export async function* streamConfirm(
  request: ConfirmRequest,
  signal?: AbortSignal
): AsyncGenerator<ChatStreamEvent, void, unknown> {
  const response = await fetch(`${API_BASE}/api/v1/chat/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: response.statusText }));
    // FastAPI wraps HTTPException detail in { detail: { error: "...", error_code: "..." } }
    const detail = errorBody.detail;
    const errorMessage = typeof detail === 'string'
      ? detail
      : detail?.error || errorBody.error || `Request failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  if (!response.body) {
    throw new Error('Response body is null');
  }

  yield* parseSSEStream(response.body);
}

/**
 * Parse SSE stream from ReadableStream
 */
async function* parseSSEStream(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<ChatStreamEvent, void, unknown> {
  const reader = body.getReader();
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
        let eventType = '';
        let eventData = '';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            eventType = line.slice(7);
          } else if (line.startsWith('data: ')) {
            eventData = line.slice(6);
          }
        }

        if (eventData) {
          const event = parseSSEData(eventType, eventData);
          if (event) {
            yield event;
          }
        }
      }
    }

    // Process any remaining buffer content
    if (buffer.trim()) {
      const lines = buffer.split('\n');
      let eventType = '';
      let eventData = '';

      for (const line of lines) {
        if (line.startsWith('event: ')) {
          eventType = line.slice(7);
        } else if (line.startsWith('data: ')) {
          eventData = line.slice(6);
        }
      }

      if (eventData) {
        const event = parseSSEData(eventType, eventData);
        if (event) {
          yield event;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
