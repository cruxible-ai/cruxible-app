'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { streamChat, streamConfirm, type ParsedField } from '@/lib/chat-client';
import { fetchPromos, createPromo } from '@/lib/api-client';
import { buildArtifactsFromEvent, resetArtifactCounter, accumulateSkuResults, finalizeSkuResults, extractNetworkEffects, enrichMarginWaterfall } from '@/lib/artifact-builders';
import { formatDateRange, apiPromoToPromoWithProducts } from '@/lib/utils/formatters';
import type { PromoSummary } from '@/lib/api-types';
import type { PromoWithProducts, SkuResult, RiskSuggestion, NewPromo, PromoDecision } from '@/lib/types/promo';
import type { Entity } from '@/components/chat-canvas/chat/entity-picker';
import type {
  Message,
  AnalysisArtifact,
  NewPromoCreationState,
  KPIData,
  ChartData,
  TableData,
  GraphData,
  SuggestionsData,
  RiskAssessmentData,
} from './use-promo-analysis';

// Re-export types
export type { Message, AnalysisArtifact, NewPromoCreationState, KPIData, ChartData, TableData, GraphData };

// Simple currency format for chat summary
function fmtCurrency(value: number): string {
  const formatted = Math.abs(value).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

function buildPromoSummary(
  metrics: { liftPercent: number; incrementalRevenue: number; incrementalProfit: number; roi: number; netMargin: number },
  skuCount: number,
  durationDays: number,
): string {
  const parts: string[] = [];

  if (metrics.liftPercent) {
    const pct = `${metrics.liftPercent > 0 ? '+' : ''}${(metrics.liftPercent * 100).toFixed(1)}%`;
    parts.push(`a **${pct} lift**`);
  }
  if (metrics.incrementalRevenue) {
    parts.push(`**${fmtCurrency(metrics.incrementalRevenue)}** in incremental revenue`);
  }
  const margin = metrics.netMargin || metrics.incrementalProfit;
  if (margin) {
    parts.push(`**${fmtCurrency(margin)}** net margin`);
  }
  if (metrics.roi) {
    parts.push(`an ROI of **${metrics.roi.toFixed(1)}x**`);
  }

  const skuLabel = `${skuCount} SKU${skuCount !== 1 ? 's' : ''}`;
  const durationLabel = `${durationDays} day${durationDays !== 1 ? 's' : ''}`;

  if (parts.length === 0) {
    return `Analysis complete across ${skuLabel} over ${durationLabel}. Check the canvas for details.`;
  }

  const joined = parts.length === 1
    ? parts[0]
    : parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];

  return `This promotion showed ${joined} across ${skuLabel} over ${durationLabel}. Explore the canvas for the full breakdown.`;
}

// Storage key for session persistence
const STORAGE_KEY = 'cruxible-canvas-session';

// Persisted session structure
interface PersistedSession {
  promoId: string | null;
  messages: Message[];
  artifacts: AnalysisArtifact[];
  canvasArtifactIds: string[];
  timestamp: number;
  chatSessionId?: string | null;
  /** Per-SKU analysis results (survive page redirects) */
  skuResults?: Record<string, SkuResult>;
}

/**
 * Pending intent confirmation state
 */
interface PendingConfirmation {
  sessionId: string;
  intentType: string;
  fields: ParsedField[];
}

// Helper to save session to localStorage
function saveSession(session: PersistedSession, key: string = STORAGE_KEY): void {
  try {
    localStorage.setItem(key, JSON.stringify(session));
  } catch (e) {
    console.warn('Failed to save session:', e);
  }
}

// Helper to load session from localStorage
function loadSession(): PersistedSession | null {
  return loadSessionFromKey(STORAGE_KEY);
}

// Helper to load session from a specific storage key
function loadSessionFromKey(key: string): PersistedSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as PersistedSession;
    // Rehydrate Date objects in messages
    parsed.messages = parsed.messages.map((m) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
    // Rehydrate Date objects in artifacts
    parsed.artifacts = parsed.artifacts.map((a) => ({
      ...a,
      timestamp: new Date(a.timestamp),
    }));
    return parsed;
  } catch (e) {
    console.warn('Failed to load session:', e);
    // Clear corrupted data
    clearPersistedSessionKey(key);
    return null;
  }
}

// Helper to clear persisted session
function clearPersistedSession(): void {
  clearPersistedSessionKey(STORAGE_KEY);
}

// Helper to clear a specific session key
function clearPersistedSessionKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to clear session:', e);
  }
}

interface UseChatSessionOptions {
  /** Initial question to process after promo selection */
  initialQuestion?: string | null;
  /** Initial promo ID if known */
  initialPromoId?: string | null;
  /** Auto-start analysis when promo is loaded */
  autostart?: boolean;
  /** Existing session ID to restore */
  sessionId?: string | null;
  /** Callback when a new session is created */
  onSessionCreated?: (sessionId: string) => void;
}

// Helper to get storage key for a session
function getStorageKey(sessionId?: string | null): string {
  return sessionId ? `cruxible-session-${sessionId}` : STORAGE_KEY;
}

/**
 * Extract plan_promotion artifacts into NewPromoCreationState.
 * Shared by executeDirectAnalysis and confirmIntent SSE paths.
 */
interface PromoParams {
  name: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  sku_ids: string[];
}

function extractPlanPromotionState(
  newArtifacts: AnalysisArtifact[],
  params: PromoParams,
): NewPromoCreationState | null {
  const suggestionsArtifact = newArtifacts.find((a) => a.type === 'suggestions');
  const riskArtifact = newArtifacts.find((a) => a.type === 'risk-assessment');

  const extractedSuggestions = suggestionsArtifact
    ? (suggestionsArtifact.data as SuggestionsData).suggestions
    : [];
  const riskData = riskArtifact
    ? (riskArtifact.data as RiskAssessmentData)
    : null;
  const extractedRisk = riskData?.assessment ?? null;

  // Find scenario matching the current discount for estimates
  const discountDecimal = params.discount_value / 100;
  const matchingScenario = riskData?.scenarios?.reduce((best, s) =>
    !best || Math.abs(s.discount_level - discountDecimal) < Math.abs(best.discount_level - discountDecimal)
      ? s : best,
    undefined as undefined | typeof riskData.scenarios[0],
  );

  const newPromo: NewPromo = {
    name: params.name,
    discount_type: (params.discount_type as NewPromo['discount_type']) || 'percentage_off',
    discount_value: params.discount_value,
    start_date: params.start_date,
    end_date: params.end_date,
    sku_ids: params.sku_ids,
    estimated_lift: matchingScenario?.predicted_lift ?? 0,
    estimated_roi: matchingScenario?.predicted_roi ?? 0,
    estimated_revenue: 0,
    estimated_net_margin: matchingScenario?.predicted_margin ?? 0,
    applied_suggestions: [],
  };

  return {
    newPromo,
    originalValues: {
      discount_value: params.discount_value,
      start_date: params.start_date,
      end_date: params.end_date,
      sku_ids: [...params.sku_ids],
    },
    riskAssessment: extractedRisk,
    suggestions: extractedSuggestions,
    decisions: [],
    status: 'draft',
    confirmation: { isOpen: false, awaitingDeclineConfirm: false, showSuccess: false },
  };
}

/**
 * Hook for managing chat session with optional promo context.
 * Uses the real API for chat and analysis.
 */
export function useChatSession(options: UseChatSessionOptions = {}) {
  const { initialQuestion, initialPromoId, autostart, sessionId: existingSessionId, onSessionCreated } = options;

  // Try to load persisted session on initial render
  const persistedSession = useRef<PersistedSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize state - will be updated from localStorage after hydration
  const [promoId, setPromoIdState] = useState<string | null>(initialPromoId || null);
  const [promo, setPromo] = useState<PromoWithProducts | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [artifacts, setArtifacts] = useState<AnalysisArtifact[]>([]);
  const [canvasArtifactIds, setCanvasArtifactIds] = useState<Set<string>>(new Set());
  const [isStreaming, setIsStreaming] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(initialQuestion || null);
  const [chatSessionId, setChatSessionIdState] = useState<string | null>(existingSessionId || null);
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation | null>(null);
  const [newPromoCreation, setNewPromoCreation] = useState<NewPromoCreationState>({
    newPromo: null,
    originalValues: {},
    riskAssessment: null,
    suggestions: [],
    decisions: [],
    status: 'draft',
    confirmation: { isOpen: false, awaitingDeclineConfirm: false, showSuccess: false },
  });

  // Track whether autostart has been triggered
  const autostartTriggeredRef = useRef(false);

  // Refs to the latest functions (defined later, used in callbacks defined before them)
  const sendMessageRef = useRef<((content: string, mentions?: Entity[]) => Promise<void>) | null>(null);
  const executeDirectAnalysisRef = useRef<((promoData: PromoWithProducts) => Promise<void>) | null>(null);

  // Sync promoId with initialPromoId when it changes (useSearchParams may update after mount)
  useEffect(() => {
    if (initialPromoId && initialPromoId !== promoId) {
      setPromoIdState(initialPromoId);
    }
  }, [initialPromoId, promoId]);

  // Track if we need to notify about session creation after streaming completes
  const pendingSessionNotifyRef = useRef<string | null>(null);

  // Wrapper to set chat session ID (callback happens separately when streaming ends)
  const setChatSessionId = useCallback((newSessionId: string | null) => {
    setChatSessionIdState(newSessionId);
    if (newSessionId && onSessionCreated) {
      // Mark for notification after streaming completes
      pendingSessionNotifyRef.current = newSessionId;
    }
  }, [onSessionCreated]);

  // Available promos from API
  const [availablePromos, setAvailablePromos] = useState<PromoSummary[]>([]);

  const messageIdRef = useRef(0);
  const artifactIdRef = useRef(0);
  const initializedRef = useRef(false);

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    if (isHydrated) return;

    if (existingSessionId) {
      // Navigated to /chat/{sessionId} — restore from session-specific storage
      const storageKey = getStorageKey(existingSessionId);
      const stored = loadSessionFromKey(storageKey);

      if (stored) {
        persistedSession.current = stored;

        setArtifacts(stored.artifacts);
        setCanvasArtifactIds(new Set(stored.canvasArtifactIds));

        // Update artifact ID ref to avoid collisions
        const maxArtifactId = Math.max(0, ...stored.artifacts.map((a) => {
          const match = a.id.match(/artifact-(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        }));
        artifactIdRef.current = maxArtifactId;

        setPromoIdState(stored.promoId);
        setMessages(stored.messages);
        if (stored.chatSessionId) {
          setChatSessionIdState(stored.chatSessionId);
        }

        // Update message ID ref
        const maxMsgId = Math.max(0, ...stored.messages.map((m) => {
          const match = m.id.match(/msg-(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        }));
        messageIdRef.current = maxMsgId;

        // Mark as initialized since we restored from storage
        initializedRef.current = true;
      }
    } else {
      // Navigated to /chat/new — start fresh, clear stale default key
      clearPersistedSession();
    }

    setIsHydrated(true);
  }, [isHydrated, existingSessionId]);

  // Fetch available promos from API on mount
  useEffect(() => {
    async function loadPromos() {
      try {
        const response = await fetchPromos({ limit: 200 });
        setAvailablePromos(response.promos);

        // Priority: initialPromoId (from URL) > restored from storage
        const targetPromoId = initialPromoId || persistedSession.current?.promoId;
        if (targetPromoId) {
          const foundPromo = response.promos.find(
            (p) => p.promo_id === targetPromoId
          );
          if (foundPromo) {
            setPromoIdState(targetPromoId);
            const promoWithProducts = apiPromoToPromoWithProducts(foundPromo);
            // Merge persisted sku_results if available (survives page redirects)
            const storedSkuResults = persistedSession.current?.skuResults;
            if (storedSkuResults && Object.keys(storedSkuResults).length > 0) {
              promoWithProducts.sku_results = storedSkuResults;
            }
            setPromo(promoWithProducts);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch promos:', err);
      }
    }
    loadPromos();
  }, [initialPromoId]);

  // Persist state changes to localStorage
  useEffect(() => {
    // Only persist after hydration and if we have something to persist
    if (!isHydrated) return;
    if (messages.length === 0 && artifacts.length === 0 && !promoId) return;

    const storageKey = getStorageKey(chatSessionId);
    saveSession({
      promoId,
      messages,
      artifacts,
      canvasArtifactIds: Array.from(canvasArtifactIds),
      timestamp: Date.now(),
      chatSessionId,
      skuResults: promo?.sku_results,
    }, storageKey);
  }, [isHydrated, promoId, promo, messages, artifacts, canvasArtifactIds, chatSessionId]);

  // Notify about session creation AFTER streaming completes (state is stable)
  useEffect(() => {
    if (isStreaming) return; // Wait for streaming to finish
    if (!pendingSessionNotifyRef.current) return;
    if (!onSessionCreated) return;

    const sessionId = pendingSessionNotifyRef.current;
    pendingSessionNotifyRef.current = null; // Clear to prevent re-notification

    // Persist to session-specific key before redirect
    const sessionKey = getStorageKey(sessionId);
    try {
      const sessionData: PersistedSession = {
        promoId,
        messages,
        artifacts,
        canvasArtifactIds: Array.from(canvasArtifactIds),
        timestamp: Date.now(),
        chatSessionId: sessionId,
        skuResults: promo?.sku_results,
      };
      localStorage.setItem(sessionKey, JSON.stringify(sessionData));
    } catch (e) {
      console.warn('Failed to persist session before redirect:', e);
    }

    onSessionCreated(sessionId);
  }, [isStreaming, onSessionCreated, promoId, promo, messages, artifacts, canvasArtifactIds]);

  // Generate unique IDs
  const genMessageId = () => `msg-${++messageIdRef.current}`;
  const genArtifactId = () => `artifact-${++artifactIdRef.current}`;

  // Build available entities for entity picker
  const availableEntities = {
    promos: availablePromos.map((p) => ({
      id: p.promo_id,
      label: p.name || p.promo_id,
      description: `${p.campaign_id || 'No campaign'} · ${formatDateRange(p.start_date, p.end_date)}`,
      type: 'promo' as const,
    })),
    skus: [] as Entity[], // Could be populated from products
    campaigns: [] as Entity[], // Could be populated from campaigns
  };

  // Initialize with welcome message (only if not restored from storage)
  useEffect(() => {
    if (initializedRef.current) return;
    if (!isHydrated) return; // Wait for hydration

    // If we have an initialPromoId (e.g., from URL), wait for promo to be fetched
    // This prevents initializing with generic welcome before promo loads
    if (initialPromoId && !promo) return;

    initializedRef.current = true;

    if (promoId && promo) {
      // Promo already selected - show promo-specific welcome
      initializeWithPromo(promo);
    } else {
      // No promo - show generic welcome
      initializeWithoutPromo();
    }
  }, [isHydrated, promoId, promo, initialPromoId]);

  const initializeWithPromo = useCallback((promoData: PromoWithProducts) => {
    const skuCount = promoData.sku_ids.length;
    const skuNames = promoData.products.map((p) => p.name).join(', ');
    const promoName = promoData.name || promoData.promo_id;
    const campaignName = promoData.campaign_name || promoData.campaign_id || 'campaign';

    const welcomeMsg: Message = {
      id: genMessageId(),
      role: 'assistant',
      content: `Hello! I'm ready to help you analyze the **${promoName}** promotion from the ${campaignName}.\n\nThis promotion ran from ${formatDateRange(promoData.start_date, promoData.end_date)} with a ${promoData.promo_value}% off discount across **${skuCount} SKU${skuCount !== 1 ? 's' : ''}**: ${skuNames}.\n\nWhat would you like to know?`,
      timestamp: new Date(),
      status: 'complete',
    };

    setMessages([welcomeMsg]);
  }, []);

  const initializeWithoutPromo = useCallback(() => {
    const welcomeMsg: Message = {
      id: genMessageId(),
      role: 'assistant',
      content: `Hello! I'm Cruxible, your AI-powered promotion analyst.\n\nTo get started, you can:\n\n- **Mention a promotion** using @ (e.g., "@Memorial Day Sale")\n- **Ask a question** about any promotion\n- **Type naturally** - I'll understand what you're looking for\n\nWhat would you like to explore today?`,
      timestamp: new Date(),
      status: 'complete',
    };

    setMessages([welcomeMsg]);
  }, []);

  /**
   * Set the promo context and optionally trigger analysis
   */
  const setPromoContext = useCallback((newPromoId: string) => {
    const newPromoData = availablePromos.find((p) => p.promo_id === newPromoId);
    if (!newPromoData) return;

    const newPromo = apiPromoToPromoWithProducts(newPromoData);

    setPromoIdState(newPromoId);
    setPromo(newPromo);

    // Don't clear artifacts - the audit canvas accumulates artifacts
    // across all analyses for comparison and review

    // Process pending question if any, otherwise auto-analyze
    if (pendingQuestion) {
      // Add context switch message
      const contextMsg: Message = {
        id: genMessageId(),
        role: 'system',
        content: `Now analyzing: **${newPromo.name || newPromo.promo_id}**`,
        timestamp: new Date(),
        status: 'complete',
      };
      setMessages((prev) => [...prev, contextMsg]);

      const question = pendingQuestion;
      setPendingQuestion(null);
      // Delay slightly to ensure state is updated
      setTimeout(() => {
        sendMessageRef.current?.(question);
      }, 100);
    } else {
      // No pending question - auto-trigger analysis
      // Delay slightly to ensure state is updated
      setTimeout(() => {
        executeDirectAnalysisRef.current?.(newPromo);
      }, 100);
    }
  }, [availablePromos, pendingQuestion]);

  /**
   * Send a message and get a response via real API
   */
  const sendMessage = useCallback(
    async (content: string, mentions?: Entity[]) => {
      // Check for entity mentions and set promo context if needed
      if (mentions && mentions.length > 0) {
        const promoMention = mentions.find((m) => m.type === 'promo');
        if (promoMention && promoMention.id !== promoId) {
          // Set promo context from mention
          setPendingQuestion(content);
          setPromoContext(promoMention.id);
          return;
        }
      }

      // Add user message
      const userMsg: Message = {
        id: genMessageId(),
        role: 'user',
        content,
        timestamp: new Date(),
        status: 'complete',
      };
      setMessages((prev) => [...prev, userMsg]);

      // Create assistant message placeholder
      const assistantMsgId = genMessageId();
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        status: 'thinking',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsStreaming(true);

      try {
        // Build entity hints from mentions and current promo context
        const entityHints = {
          promo_ids: [
            ...(mentions?.filter((m) => m.type === 'promo').map((m) => m.id) || []),
            ...(promoId ? [promoId] : []),
          ].filter((v, i, a) => a.indexOf(v) === i), // dedupe
          sku_ids: mentions?.filter((m) => m.type === 'sku').map((m) => m.id) || [],
          campaign_ids: mentions?.filter((m) => m.type === 'campaign').map((m) => m.id) || [],
          active_promo: promo ? {
            promo_id: promo.promo_id,
            promo_value: promo.promo_value,
            promo_type: promo.promo_type,
            start_date: promo.start_date,
            end_date: promo.end_date,
            sku_ids: promo.sku_ids,
            name: promo.name,
          } : undefined,
        };

        for await (const event of streamChat({
          message: content,
          session_id: chatSessionId || undefined,
          entity_hints: entityHints.promo_ids.length > 0 || entityHints.sku_ids.length > 0 || entityHints.active_promo
            ? entityHints
            : undefined,
        })) {
          if (event.type === 'text_delta') {
            // LLM is asking for clarification
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: event.text || '', status: 'complete' as const }
                  : m
              )
            );
            if (event.session_id) {
              setChatSessionId(event.session_id);
            }
            setIsStreaming(false);
            break;
          } else if (event.type === 'confirmation_required') {
            // LLM extracted intent - show confirmation
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: event.description
                        ? `${event.description}\n\nPlease confirm the details below:`
                        : `I'll run a **${event.intent_type?.replace(/_/g, ' ')}** analysis. Please confirm the details below:`,
                      status: 'complete' as const,
                    }
                  : m
              )
            );
            if (event.session_id && event.fields) {
              setChatSessionId(event.session_id);
              setPendingConfirmation({
                sessionId: event.session_id,
                intentType: event.intent_type || '',
                fields: event.fields,
              });
            }
            setIsStreaming(false);
            break;
          } else if (event.type === 'error') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: event.error || 'An error occurred', status: 'error' as const }
                  : m
              )
            );
            setIsStreaming(false);
            break;
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to connect to chat backend';
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: `Unable to process: ${errorMsg}\n\nMake sure the API server is running.`,
                  status: 'error' as const,
                }
              : m
          )
        );
        setIsStreaming(false);
      }
    },
    [promoId, promo, chatSessionId, setPromoContext]
  );

  // Keep the sendMessageRef updated with the latest sendMessage
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // Direct analysis execution for autostart (bypasses LLM intent extraction)
  // Uses /chat/confirm with direct execution mode for session tracking
  const executeDirectAnalysis = useCallback(async (promoData: PromoWithProducts) => {
    // Add user message to show what's happening
    const userMsg: Message = {
      id: genMessageId(),
      role: 'user',
      content: 'Analyze this promotion',
      timestamp: new Date(),
      status: 'complete',
    };
    setMessages((prev) => [...prev, userMsg]);

    // Create assistant message placeholder
    const assistantMsgId = genMessageId();
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: 'Starting analysis...',
      timestamp: new Date(),
      status: 'streaming',
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsStreaming(true);

    try {
      const allArtifactIds: string[] = [];
      let responseContent = '';
      let agentCount = 0;
      let skuResultsAcc: Record<string, Partial<import('@/lib/types/promo').SkuResult>> = {};
      const metrics = { liftPercent: 0, incrementalRevenue: 0, incrementalProfit: 0, roi: 0, netMargin: 0 };

      // Use streamConfirm with direct execution mode (intent_type + entities)
      // This creates a session and stores results for follow-on questions
      for await (const event of streamConfirm({
        session_id: chatSessionId || undefined,
        intent_type: 'evaluate_promotion',
        entities: {
          promo_id: promoData.promo_id,
          start_date: promoData.start_date,
          end_date: promoData.end_date,
          promo_value: promoData.promo_value,
        },
      })) {
        const agentEvent = event.agentEvent;
        if (!agentEvent) continue;

        // Track session ID from backend response
        if (agentEvent.session_id && agentEvent.session_id !== chatSessionId) {
          setChatSessionId(agentEvent.session_id);
        }

        switch (event.type) {
          case 'run_started':
            responseContent = 'Analyzing promotion...\n\n';
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'agent_started':
            responseContent += `Running **${agentEvent.agent_name?.replace(/_/g, ' ')}**...\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'agent_completed': {
            agentCount++;
            const duration = agentEvent.snapshot?.duration_ms ?? 0;
            responseContent += `Completed **${agentEvent.agent_name?.replace(/_/g, ' ')}** (${duration}ms)\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );

            // Accumulate metrics for summary
            if (agentEvent.agent_name === 'historical_lift_calculator' && agentEvent.agent_result) {
              const r = agentEvent.agent_result as Record<string, unknown>;
              metrics.liftPercent = (r.lift_percent as number) || 0;
              metrics.incrementalRevenue = (r.incremental_revenue as number) || 0;
            }
            if (agentEvent.agent_name === 'margin_calculator' && agentEvent.agent_result) {
              const r = agentEvent.agent_result as Record<string, unknown>;
              metrics.incrementalProfit = (r.incremental_profit as number) || 0;
              metrics.roi = (r.roi as number) || 0;
            }
            if (agentEvent.agent_name === 'network_aggregator' && agentEvent.agent_result) {
              const r = agentEvent.agent_result as Record<string, unknown>;
              if (r.net_incremental_margin) metrics.netMargin = r.net_incremental_margin as number;
            }

            // Enrich existing margin-waterfall with network effects
            if (agentEvent.agent_name === 'network_aggregator' && agentEvent.agent_result) {
              const effects = extractNetworkEffects(agentEvent.agent_result as Record<string, unknown>);
              if (effects) {
                setArtifacts((prev) =>
                  prev.map((a) =>
                    a.type === 'margin-waterfall' && a.context?.promo_id === promoData.promo_id
                      ? enrichMarginWaterfall(a, effects)
                      : a
                  )
                );
              }
            }

            // Build artifacts from this event
            const newArtifacts = buildArtifactsFromEvent(agentEvent, promoData.promo_id);
            if (newArtifacts.length > 0) {
              setArtifacts((prev) => {
                // Remove any existing artifacts for this promo/agent/type to avoid duplicates
                const filtered = prev.filter((a) => {
                  return !newArtifacts.some(
                    (na) =>
                      na.context?.promo_id === a.context?.promo_id &&
                      na.agentName === a.agentName &&
                      na.type === a.type &&
                      na.title === a.title
                  );
                });
                return [...filtered, ...newArtifacts];
              });
              allArtifactIds.push(...newArtifacts.map((a) => a.id));
            }

            // Accumulate per-SKU results from entity breakdowns
            if (agentEvent.agent_name && agentEvent.agent_result) {
              skuResultsAcc = accumulateSkuResults(
                agentEvent.agent_name,
                agentEvent.agent_result,
                skuResultsAcc,
              );
            }

            // Extract plan_promotion artifacts into creation state
            if (agentEvent.agent_name === 'plan_promotion' && newArtifacts.length > 0) {
              const state = extractPlanPromotionState(newArtifacts, {
                name: promoData.name || promoData.promo_id,
                discount_type: promoData.promo_type,
                discount_value: promoData.promo_value,
                start_date: promoData.start_date,
                end_date: promoData.end_date,
                sku_ids: promoData.sku_ids,
              });
              if (state) setNewPromoCreation(state);
            }
            break;
          }

          case 'agent_skipped':
            responseContent += `Skipped **${agentEvent.agent_name?.replace(/_/g, ' ')}**: ${agentEvent.snapshot?.skip_reason || 'missing dependencies'}\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'agent_failed':
            responseContent += `Failed **${agentEvent.agent_name?.replace(/_/g, ' ')}**: ${agentEvent.snapshot?.error_message || 'unknown error'}\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'run_completed': {
            // Build summary from accumulated metrics
            const skuCount = promoData.sku_ids.length;
            const start = new Date(promoData.start_date);
            const end = new Date(promoData.end_date);
            const durationDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
            const hasMetrics = metrics.liftPercent || metrics.incrementalRevenue || metrics.incrementalProfit || metrics.roi || metrics.netMargin;

            const summaryContent = hasMetrics
              ? buildPromoSummary(metrics, skuCount, durationDays)
              : `Analysis complete. ${agentCount} agent${agentCount !== 1 ? 's' : ''} executed.`;

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: summaryContent,
                      status: 'complete' as const,
                      artifactIds: allArtifactIds,
                    }
                  : m
              )
            );

            // Finalize per-SKU results and update promo
            const skuResults = finalizeSkuResults(skuResultsAcc);
            if (Object.keys(skuResults).length > 0) {
              setPromo((prev) => prev ? { ...prev, sku_results: skuResults } : prev);
            }
            break;
          }

          case 'run_failed':
            responseContent += `\n**Analysis failed**: ${agentEvent.run_error || 'Unknown error'}`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: responseContent, status: 'error' as const }
                  : m
              )
            );
            break;
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Analysis failed';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? { ...m, content: `Error: ${errorMsg}`, status: 'error' as const }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [chatSessionId, setChatSessionId]);

  // Keep the executeDirectAnalysisRef updated
  useEffect(() => {
    executeDirectAnalysisRef.current = executeDirectAnalysis;
  }, [executeDirectAnalysis]);

  // Autostart analysis when promo is loaded and autostart is enabled
  useEffect(() => {
    if (!autostart) return;
    if (autostartTriggeredRef.current) return;
    if (!isHydrated || !promo || !initializedRef.current) return;

    autostartTriggeredRef.current = true;

    // Direct API call - no LLM needed since we have all the info
    // No artifact cleanup needed: /chat/new hydration starts with a clean slate
    executeDirectAnalysis(promo);
  }, [autostart, isHydrated, promo, executeDirectAnalysis]);

  /**
   * Confirm pending intent and execute analysis
   */
  const confirmIntent = useCallback(
    async (edits?: Record<string, unknown>) => {
      if (!pendingConfirmation) return;

      const confirmation = pendingConfirmation;
      setPendingConfirmation(null);

      const assistantMsgId = genMessageId();
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: 'assistant',
        content: 'Starting analysis...',
        timestamp: new Date(),
        status: 'streaming',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsStreaming(true);

      try {
        const allArtifactIds: string[] = [];
        let responseContent = '';
        let agentCount = 0;
        let confirmSkuResultsAcc: Record<string, Partial<import('@/lib/types/promo').SkuResult>> = {};
        const confirmMetrics = { liftPercent: 0, incrementalRevenue: 0, incrementalProfit: 0, roi: 0, netMargin: 0 };

        for await (const event of streamConfirm({
          session_id: confirmation.sessionId,
          entities: edits,
        })) {
          const agentEvent = event.agentEvent;
          if (!agentEvent) continue;

          switch (event.type) {
            case 'run_started':
              responseContent = 'Analyzing promotion...\n\n';
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: responseContent } : m
                )
              );
              break;

            case 'agent_started':
              responseContent += `Running **${agentEvent.agent_name?.replace(/_/g, ' ')}**...\n`;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: responseContent } : m
                )
              );
              break;

            case 'agent_completed': {
              agentCount++;
              const duration = agentEvent.snapshot?.duration_ms ?? 0;
              responseContent += `Completed **${agentEvent.agent_name?.replace(/_/g, ' ')}** (${duration}ms)\n`;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: responseContent } : m
                )
              );

              // Accumulate metrics for summary
              if (agentEvent.agent_name === 'historical_lift_calculator' && agentEvent.agent_result) {
                const r = agentEvent.agent_result as Record<string, unknown>;
                confirmMetrics.liftPercent = (r.lift_percent as number) || 0;
                confirmMetrics.incrementalRevenue = (r.incremental_revenue as number) || 0;
              }
              if (agentEvent.agent_name === 'margin_calculator' && agentEvent.agent_result) {
                const r = agentEvent.agent_result as Record<string, unknown>;
                confirmMetrics.incrementalProfit = (r.incremental_profit as number) || 0;
                confirmMetrics.roi = (r.roi as number) || 0;
              }
              if (agentEvent.agent_name === 'network_aggregator' && agentEvent.agent_result) {
                const r = agentEvent.agent_result as Record<string, unknown>;
                if (r.net_incremental_margin) confirmMetrics.netMargin = r.net_incremental_margin as number;
              }

              // Build artifacts from this event
              // Use the promo_id from the confirmation fields if available
              const effectivePromoId = promoId || confirmation.fields.find(f => f.field_key === 'promo_id')?.value || '';

              // Enrich existing margin-waterfall with network effects
              if (agentEvent.agent_name === 'network_aggregator' && agentEvent.agent_result) {
                const effects = extractNetworkEffects(agentEvent.agent_result as Record<string, unknown>);
                if (effects) {
                  setArtifacts((prev) =>
                    prev.map((a) =>
                      a.type === 'margin-waterfall' && a.context?.promo_id === effectivePromoId
                        ? enrichMarginWaterfall(a, effects)
                        : a
                    )
                  );
                }
              }

              const newArtifacts = buildArtifactsFromEvent(agentEvent, effectivePromoId);
              if (newArtifacts.length > 0) {
                setArtifacts((prev) => {
                  // Remove any existing artifacts for this promo/agent/type to avoid duplicates
                  const filtered = prev.filter((a) => {
                    return !newArtifacts.some(
                      (na) =>
                        na.context?.promo_id === a.context?.promo_id &&
                        na.agentName === a.agentName &&
                        na.type === a.type &&
                        na.title === a.title
                    );
                  });
                  return [...filtered, ...newArtifacts];
                });
                allArtifactIds.push(...newArtifacts.map((a) => a.id));
              }

              // Accumulate per-SKU results from entity breakdowns
              if (agentEvent.agent_name && agentEvent.agent_result) {
                confirmSkuResultsAcc = accumulateSkuResults(
                  agentEvent.agent_name,
                  agentEvent.agent_result,
                  confirmSkuResultsAcc,
                );
              }

              // Extract plan_promotion artifacts into creation state
              if (agentEvent.agent_name === 'plan_promotion' && newArtifacts.length > 0) {
                const getField = (key: string) => confirmation.fields.find(f => f.field_key === key)?.value || '';
                const discountValue = parseFloat(getField('promo_value').replace('%', '')) || 0;
                const state = extractPlanPromotionState(newArtifacts, {
                  name: getField('promo_id') || effectivePromoId,
                  discount_type: getField('promo_type'),
                  discount_value: discountValue,
                  start_date: getField('start_date'),
                  end_date: getField('end_date'),
                  sku_ids: getField('sku_ids') ? String(getField('sku_ids')).split(',').map(s => s.trim()) : [],
                });
                if (state) setNewPromoCreation(state);
              }
              break;
            }

            case 'agent_skipped':
              responseContent += `Skipped **${agentEvent.agent_name?.replace(/_/g, ' ')}**: ${agentEvent.snapshot?.skip_reason || 'missing dependencies'}\n`;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: responseContent } : m
                )
              );
              break;

            case 'agent_failed':
              responseContent += `Failed **${agentEvent.agent_name?.replace(/_/g, ' ')}**: ${agentEvent.snapshot?.error_message || 'unknown error'}\n`;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: responseContent } : m
                )
              );
              break;

            case 'run_completed': {
              // Build summary from accumulated metrics
              // Derive SKU count and duration from confirmation fields
              const getConfField = (key: string) => confirmation.fields.find(f => f.field_key === key)?.value || '';
              const confirmSkuIds = getConfField('sku_ids') ? String(getConfField('sku_ids')).split(',') : [];
              const confirmSkuCount = confirmSkuIds.length || 1;
              const confirmStart = new Date(getConfField('start_date') || Date.now());
              const confirmEnd = new Date(getConfField('end_date') || Date.now());
              const confirmDurationDays = Math.max(1, Math.round((confirmEnd.getTime() - confirmStart.getTime()) / (1000 * 60 * 60 * 24)));
              const confirmHasMetrics = confirmMetrics.liftPercent || confirmMetrics.incrementalRevenue || confirmMetrics.incrementalProfit || confirmMetrics.roi || confirmMetrics.netMargin;

              const confirmSummary = confirmHasMetrics
                ? buildPromoSummary(confirmMetrics, confirmSkuCount, confirmDurationDays)
                : `Analysis complete. ${agentCount} agent${agentCount !== 1 ? 's' : ''} executed.`;

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? {
                        ...m,
                        content: confirmSummary,
                        status: 'complete' as const,
                        artifactIds: allArtifactIds,
                      }
                    : m
                )
              );

              // Finalize per-SKU results and update promo
              const confirmSkuResults = finalizeSkuResults(confirmSkuResultsAcc);
              if (Object.keys(confirmSkuResults).length > 0) {
                setPromo((prev) => prev ? { ...prev, sku_results: confirmSkuResults } : prev);
              }
              break;
            }

            case 'run_failed':
              responseContent += `\nAnalysis failed: ${agentEvent.run_error || 'unknown error'}`;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? { ...m, content: responseContent, status: 'error' as const }
                    : m
                )
              );
              break;
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to execute analysis';
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, content: `Execution error: ${errorMsg}`, status: 'error' as const }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [pendingConfirmation, promoId]
  );

  /**
   * Cancel pending confirmation
   */
  const cancelConfirmation = useCallback(() => {
    setPendingConfirmation(null);
  }, []);

  /**
   * Add an artifact to the canvas
   */
  const addToCanvas = useCallback((artifactId: string) => {
    setCanvasArtifactIds((prev) => new Set([...prev, artifactId]));
  }, []);

  /**
   * Remove an artifact from the canvas
   */
  const removeFromCanvas = useCallback((artifactId: string) => {
    setCanvasArtifactIds((prev) => {
      const next = new Set(prev);
      next.delete(artifactId);
      return next;
    });
  }, []);

  /**
   * Clear all artifacts from the canvas
   */
  const clearCanvas = useCallback(() => {
    setCanvasArtifactIds(new Set());
  }, []);

  /**
   * Clear entire session (canvas, messages, artifacts, promo) and localStorage
   */
  const clearSession = useCallback(() => {
    setPromoIdState(null);
    setPromo(null);
    setMessages([]);
    setArtifacts([]);
    setCanvasArtifactIds(new Set());
    setChatSessionId(null);
    setPendingConfirmation(null);
    clearPersistedSession();
    resetArtifactCounter();
    // Re-initialize with welcome message
    initializedRef.current = false;
  }, []);

  /**
   * Toggle a suggestion's applied state, modify newPromo accordingly,
   * and record a PromoDecision in the decision log.
   */
  const applySuggestion = useCallback((suggestionId: string) => {
    const toggle = (list: RiskSuggestion[]) =>
      list.map((s) => s.id === suggestionId ? { ...s, applied: !s.applied } : s);

    setNewPromoCreation((prev) => {
      const suggestion = prev.suggestions.find((s) => s.id === suggestionId);
      if (!suggestion || !prev.newPromo) {
        return { ...prev, suggestions: toggle(prev.suggestions) };
      }

      const isApplying = !suggestion.applied;
      let updatedPromo = { ...prev.newPromo };
      let updatedOriginals = { ...prev.originalValues };
      let actionDescription = '';

      if (isApplying) {
        // Save original values on first apply (only if not already saved for this field)
        if (suggestion.category === 'skus' && !('sku_ids' in updatedOriginals)) {
          updatedOriginals.sku_ids = [...prev.newPromo.sku_ids];
        }
        if (suggestion.category === 'discount' && !('discount_value' in updatedOriginals)) {
          updatedOriginals.discount_value = prev.newPromo.discount_value;
        }
        if (suggestion.category === 'timing' && !('start_date' in updatedOriginals)) {
          updatedOriginals.start_date = prev.newPromo.start_date;
          updatedOriginals.end_date = prev.newPromo.end_date;
        }

        // Apply modification based on category
        switch (suggestion.category) {
          case 'skus': {
            // Parse affected SKUs from the suggestion text or use new_value
            const excludeSkus = suggestion.new_value
              ? suggestion.new_value.split(',').map((s) => s.trim())
              : [];
            if (excludeSkus.length > 0) {
              const excludeSet = new Set(excludeSkus);
              updatedPromo.sku_ids = updatedPromo.sku_ids.filter((id) => !excludeSet.has(id));
              actionDescription = `Excluded ${excludeSkus.join(', ')} from promo`;
            }
            break;
          }
          case 'discount': {
            const newDiscount = Math.max(5, updatedPromo.discount_value - 5);
            actionDescription = `Reduced discount from ${updatedPromo.discount_value}% to ${newDiscount}%`;
            updatedPromo.discount_value = newDiscount;
            break;
          }
          case 'timing': {
            const shiftDays = 7;
            const start = new Date(updatedPromo.start_date);
            const end = new Date(updatedPromo.end_date);
            start.setDate(start.getDate() + shiftDays);
            end.setDate(end.getDate() + shiftDays);
            actionDescription = `Shifted dates forward by ${shiftDays} days`;
            updatedPromo.start_date = start.toISOString().split('T')[0];
            updatedPromo.end_date = end.toISOString().split('T')[0];
            break;
          }
          case 'duration':
            actionDescription = 'Enabled substitute monitoring';
            break;
        }

        // Track applied suggestion
        if (!updatedPromo.applied_suggestions.includes(suggestionId)) {
          updatedPromo.applied_suggestions = [...updatedPromo.applied_suggestions, suggestionId];
        }
      } else {
        // Unapply — restore original values
        switch (suggestion.category) {
          case 'skus':
            if (Array.isArray(updatedOriginals.sku_ids)) {
              updatedPromo.sku_ids = [...(updatedOriginals.sku_ids as string[])];
              actionDescription = 'Restored original SKU list';
            }
            break;
          case 'discount':
            if (typeof updatedOriginals.discount_value === 'number') {
              updatedPromo.discount_value = updatedOriginals.discount_value;
              actionDescription = `Restored discount to ${updatedOriginals.discount_value}%`;
            }
            break;
          case 'timing':
            if (typeof updatedOriginals.start_date === 'string') {
              updatedPromo.start_date = updatedOriginals.start_date;
              updatedPromo.end_date = updatedOriginals.end_date as string;
              actionDescription = 'Restored original dates';
            }
            break;
          case 'duration':
            actionDescription = 'Disabled substitute monitoring';
            break;
        }

        updatedPromo.applied_suggestions = updatedPromo.applied_suggestions.filter(
          (id) => id !== suggestionId
        );
      }

      // Build decision record
      const currentOverallRisk = prev.riskAssessment?.overall_risk_score ?? 0;
      const matchingFactor = prev.riskAssessment?.factors?.find(
        (f) => f.category === suggestion.affects_factor
      );
      const currentFactorRisk = matchingFactor?.risk_score ?? 0;

      const decision: PromoDecision = {
        id: `decision-${Date.now()}`,
        timestamp: new Date(),
        action: actionDescription || (isApplying ? 'Applied suggestion' : 'Reverted suggestion'),
        rationale: suggestion.suggestion,
        old_overall_risk: currentOverallRisk,
        new_overall_risk: isApplying
          ? Math.max(0, currentOverallRisk - suggestion.risk_reduction)
          : currentOverallRisk + suggestion.risk_reduction,
        factor_affected: suggestion.affects_factor,
        old_factor_risk: currentFactorRisk,
        new_factor_risk: isApplying
          ? Math.max(0, currentFactorRisk - suggestion.factor_reduction)
          : currentFactorRisk + suggestion.factor_reduction,
      };

      return {
        ...prev,
        newPromo: updatedPromo,
        originalValues: updatedOriginals,
        suggestions: toggle(prev.suggestions),
        decisions: [...prev.decisions, decision],
      };
    });

    // Also update the suggestions artifact data so canvas PreflightCard stays in sync
    const toggleArtifact = (list: RiskSuggestion[]) =>
      list.map((s) => s.id === suggestionId ? { ...s, applied: !s.applied } : s);

    setArtifacts((prev) =>
      prev.map((a) => {
        if (a.type !== 'suggestions') return a;
        const data = a.data as SuggestionsData;
        return { ...a, data: { suggestions: toggleArtifact(data.suggestions) } };
      })
    );
  }, []);

  // Ref to always have the latest newPromoCreation (avoids stale closures)
  const newPromoCreationRef = useRef(newPromoCreation);
  useEffect(() => {
    newPromoCreationRef.current = newPromoCreation;
  }, [newPromoCreation]);

  // Guard against double-click on approve
  const isApprovingRef = useRef(false);

  /**
   * Approve the planned promo — POST to backend and update state
   */
  const approvePromo = useCallback(async () => {
    if (isApprovingRef.current) return;
    const draft = newPromoCreationRef.current.newPromo;
    if (!draft) return;

    isApprovingRef.current = true;
    try {
      const result = await createPromo({
        name: draft.name,
        start_date: draft.start_date,
        end_date: draft.end_date,
        promo_type: draft.discount_type,
        promo_value: draft.discount_value,
        sku_ids: draft.sku_ids,
      });

      setNewPromoCreation((prev) => ({ ...prev, status: 'approved' }));

      // Add success message to chat
      const successMsg: Message = {
        id: genMessageId(),
        role: 'assistant',
        content: `Promo **${result.name || result.promo_id}** has been approved and registered (${result.promo_id}). It will appear on the dashboard.`,
        timestamp: new Date(),
        status: 'complete',
      };
      setMessages((prev) => [...prev, successMsg]);

      // Add to available promos so canvas updates immediately
      setAvailablePromos((prev) => [result, ...prev]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create promo';
      const errMessage: Message = {
        id: genMessageId(),
        role: 'assistant',
        content: `Failed to approve promo: ${errorMsg}`,
        timestamp: new Date(),
        status: 'error',
      };
      setMessages((prev) => [...prev, errMessage]);
    } finally {
      isApprovingRef.current = false;
    }
  }, []);

  /**
   * Re-run preflight analysis with the current draft's modified params.
   * Calls plan_promotion via streamConfirm and updates artifacts + state.
   */
  const rerunPreflight = useCallback(async () => {
    const draft = newPromoCreationRef.current.newPromo;
    if (!draft) return;

    // Add a chat message indicating re-analysis
    const userMsg: Message = {
      id: genMessageId(),
      role: 'user',
      content: 'Re-run preflight with updated parameters',
      timestamp: new Date(),
      status: 'complete',
    };
    setMessages((prev) => [...prev, userMsg]);

    const assistantMsgId = genMessageId();
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: 'Re-running preflight analysis with your changes...',
      timestamp: new Date(),
      status: 'streaming',
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsStreaming(true);

    try {
      let responseContent = '';

      for await (const event of streamConfirm({
        session_id: chatSessionId || undefined,
        intent_type: 'plan_promotion',
        entities: {
          promo_type: draft.discount_type,
          promo_value: draft.discount_value,
          start_date: draft.start_date,
          end_date: draft.end_date,
          sku_ids: draft.sku_ids,
        },
      })) {
        const agentEvent = event.agentEvent;
        if (!agentEvent) continue;

        if (agentEvent.session_id && agentEvent.session_id !== chatSessionId) {
          setChatSessionId(agentEvent.session_id);
        }

        switch (event.type) {
          case 'run_started':
            responseContent = 'Re-analyzing promotion...\n\n';
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'agent_started':
            responseContent += `Running **${agentEvent.agent_name?.replace(/_/g, ' ')}**...\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'agent_completed': {
            const duration = agentEvent.snapshot?.duration_ms ?? 0;
            responseContent += `Completed **${agentEvent.agent_name?.replace(/_/g, ' ')}** (${duration}ms)\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );

            // Use the current promo context for artifact building
            const rerunPromoId = promoId || '';

            // Build artifacts from this event (replaces existing planning artifacts)
            // Exclude suggestions artifact on re-runs so the user sees
            // the updated risk score and can approve without a new apply loop.
            const newArtifacts = buildArtifactsFromEvent(agentEvent, rerunPromoId)
              .filter((a) => a.type !== 'suggestions');
            if (newArtifacts.length > 0 || agentEvent.agent_name === 'plan_promotion') {
              setArtifacts((prev) => {
                // Find IDs of old artifacts being replaced so we can swap canvas IDs
                const replacedIds: string[] = [];
                const filtered = prev.filter((a) => {
                  // Remove old artifacts that match new ones (risk-assessment, similar-promos)
                  const isReplaced = newArtifacts.some(
                    (na) =>
                      na.context?.promo_id === a.context?.promo_id &&
                      na.agentName === a.agentName &&
                      na.type === a.type &&
                      na.title === a.title
                  );
                  // Also remove old suggestions artifact for this promo on re-runs
                  const isOldSuggestions =
                    a.type === 'suggestions' &&
                    a.context?.promo_id === rerunPromoId &&
                    a.agentName === 'plan_promotion';
                  if (isReplaced || isOldSuggestions) replacedIds.push(a.id);
                  return !isReplaced && !isOldSuggestions;
                });

                // Swap old canvas IDs for new ones
                if (replacedIds.length > 0) {
                  setCanvasArtifactIds((prevIds) => {
                    const next = new Set(prevIds);
                    let hadOld = false;
                    for (const oldId of replacedIds) {
                      if (next.has(oldId)) {
                        next.delete(oldId);
                        hadOld = true;
                      }
                    }
                    if (hadOld) {
                      for (const na of newArtifacts) next.add(na.id);
                    }
                    return next;
                  });
                }

                return [...filtered, ...newArtifacts];
              });
            }

            // Update newPromoCreation state with fresh results
            if (agentEvent.agent_name === 'plan_promotion' && newArtifacts.length > 0) {
              const state = extractPlanPromotionState(newArtifacts, {
                name: draft.name,
                discount_type: draft.discount_type,
                discount_value: draft.discount_value,
                start_date: draft.start_date,
                end_date: draft.end_date,
                sku_ids: draft.sku_ids,
              });
              if (state) {
                // Preserve decisions from previous iteration.
                // Clear suggestions so the user sees the updated risk score
                // and can approve without being forced into another apply loop.
                const prevDecisions = newPromoCreationRef.current.decisions;
                setNewPromoCreation({ ...state, suggestions: [], decisions: prevDecisions });
              }
            }
            break;
          }

          case 'agent_skipped':
            responseContent += `Skipped **${agentEvent.agent_name?.replace(/_/g, ' ')}**: ${agentEvent.snapshot?.skip_reason || 'missing dependencies'}\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'agent_failed':
            responseContent += `Failed **${agentEvent.agent_name?.replace(/_/g, ' ')}**: ${agentEvent.snapshot?.error_message || 'unknown error'}\n`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: responseContent } : m
              )
            );
            break;

          case 'run_completed':
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: 'Preflight re-analysis complete. Check the updated risk assessment.', status: 'complete' as const }
                  : m
              )
            );
            break;

          case 'run_failed':
            responseContent += `\n**Re-analysis failed**: ${agentEvent.run_error || 'Unknown error'}`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: responseContent, status: 'error' as const }
                  : m
              )
            );
            break;
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Re-analysis failed';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? { ...m, content: `Error: ${errorMsg}`, status: 'error' as const }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [chatSessionId, setChatSessionId, promoId]);

  /**
   * Pass on the planned promo (discard draft)
   */
  const passPromo = useCallback(() => {
    setNewPromoCreation((prev) => ({ ...prev, status: 'passed' }));
    const passMsg: Message = {
      id: genMessageId(),
      role: 'assistant',
      content: 'Promo draft has been discarded.',
      timestamp: new Date(),
      status: 'complete',
    };
    setMessages((prev) => [...prev, passMsg]);
  }, []);

  return {
    // Promo context
    promoId,
    promo,
    setPromo: setPromoContext,

    // Chat state
    messages,
    artifacts,
    canvasArtifactIds,
    isStreaming,
    chatSessionId,

    // Confirmation flow
    pendingConfirmation,
    confirmIntent,
    cancelConfirmation,

    // Actions
    sendMessage,
    addToCanvas,
    removeFromCanvas,
    clearCanvas,
    clearSession,

    // Entity data for pickers
    availableEntities,

    // Raw promo list for canvas multi-promo lookup
    availablePromos,

    // New promo creation
    newPromoCreation,
    applySuggestion,
    approvePromo,
    passPromo,
    rerunPreflight,
  };
}
