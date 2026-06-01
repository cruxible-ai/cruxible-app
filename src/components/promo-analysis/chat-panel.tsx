'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { EnhancedChatInput } from '@/components/chat-canvas/chat/enhanced-chat-input';
import { ChatMessage } from '@/components/chat-canvas/chat/chat-message';
import { InlineArtifact } from './inline-artifact';
import { LinkValidationPopup } from './link-validation-popup';
import { ConfirmationMessage } from './confirmation-message';
import { SLASH_COMMANDS } from '@/lib/slash-commands';
import type { Entity } from '@/components/chat-canvas/chat/entity-picker';
import type { Message, AnalysisArtifact, LinkValidationState, NewPromoCreationState, PendingConfirmation } from '@/hooks/use-promo-analysis';
import type { ParsedField } from '@/lib/chat-client';

interface ChatPanelProps {
  messages: Message[];
  artifacts: AnalysisArtifact[];
  canvasArtifactIds: Set<string>;
  isStreaming: boolean;
  onSendMessage: (content: string, mentions?: Entity[]) => void;
  onAddToCanvas: (artifactId: string) => void;
  onRemoveFromCanvas: (artifactId: string) => void;
  /** Callback when user wants to drill down into a SKU from the breakdown table */
  onSkuDrillDown?: (skuName: string) => void;
  /** Available entities for @ mentions */
  availableEntities?: {
    promos: Entity[];
    skus: Entity[];
    campaigns: Entity[];
  };
  /** Callback when slash command form is submitted (bypasses LLM) */
  onCommandSubmit?: (request: { intent_type: string; entities: Record<string, unknown>; raw_query?: string }) => void;
  /** Pending intent confirmation state */
  pendingConfirmation?: PendingConfirmation | null;
  onConfirmIntent?: (edits?: Record<string, unknown>) => void;
  onCancelConfirmation?: () => void;
  /** Link validation state and handlers */
  linkValidation?: LinkValidationState;
  onApproveLink?: () => void;
  onModifyLink?: () => void;
  onStartRejectLink?: () => void;
  onCancelRejectLink?: () => void;
  onConfirmRejectLink?: (reason?: string) => void;
  onDismissLinkValidation?: () => void;
  /** New promo creation state and handlers */
  newPromoCreation?: NewPromoCreationState;
  onApplySuggestion?: (suggestionId: string) => void;
}

/**
 * Chat panel with messages and inline artifacts
 */
function ChatPanel({
  messages,
  artifacts,
  canvasArtifactIds,
  isStreaming,
  onSendMessage,
  onAddToCanvas,
  onRemoveFromCanvas,
  onSkuDrillDown,
  availableEntities,
  onCommandSubmit,
  pendingConfirmation,
  onConfirmIntent,
  onCancelConfirmation,
  linkValidation,
  onApproveLink,
  onModifyLink,
  onStartRejectLink,
  onCancelRejectLink,
  onConfirmRejectLink,
  onDismissLinkValidation,
  newPromoCreation,
  onApplySuggestion,
}: ChatPanelProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  // Auto-add state
  const [autoAdd, setAutoAdd] = React.useState(false);
  const knownArtifactIdsRef = React.useRef<Set<string>>(new Set());

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Get artifact IDs visible in the chat (referenced by messages)
  const visibleArtifactIds = React.useMemo(() => {
    const ids = new Set<string>();
    for (const message of messages) {
      if (message.artifactIds) {
        for (const id of message.artifactIds) {
          ids.add(id);
        }
      }
    }
    return ids;
  }, [messages]);

  // Auto-add new artifacts when autoAdd is enabled (only visible artifacts in chat)
  React.useEffect(() => {
    if (!autoAdd) {
      // When auto-add is off, just track current visible artifacts
      knownArtifactIdsRef.current = new Set(visibleArtifactIds);
      return;
    }

    // Find new visible artifacts that we haven't seen before
    const newArtifactIds = Array.from(visibleArtifactIds).filter(
      (id) => !knownArtifactIdsRef.current.has(id)
    );

    // Add new artifacts to canvas
    for (const artifactId of newArtifactIds) {
      if (!canvasArtifactIds.has(artifactId)) {
        onAddToCanvas(artifactId);
      }
    }

    // Update known artifacts
    knownArtifactIdsRef.current = new Set(visibleArtifactIds);
  }, [visibleArtifactIds, autoAdd, canvasArtifactIds, onAddToCanvas]);

  // Get artifact by ID
  const getArtifact = (id: string) => artifacts.find((a) => a.id === id);

  // Count visible artifacts not yet in canvas (only artifacts shown in chat)
  const artifactsNotInCanvas = artifacts.filter(
    (a) => visibleArtifactIds.has(a.id) && !canvasArtifactIds.has(a.id)
  );
  const allInCanvas = artifactsNotInCanvas.length === 0;

  // Toggle auto-add
  const toggleAutoAdd = () => {
    setAutoAdd((prev) => !prev);
  };

  // Add all artifacts to canvas
  const handleAddAllToCanvas = () => {
    for (const artifact of artifactsNotInCanvas) {
      onAddToCanvas(artifact.id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b bg-background">
        <h2 className="text-sm font-medium">Cruxible Console</h2>
        <p className="text-xs text-muted-foreground">Chat freely. Analysis and planning follow a fixed, deterministic process.</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-w-0 p-4">
        <div ref={scrollRef} className="space-y-4 min-w-0">
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ChatMessage
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                status={message.status}
              />
              {/* Render inline artifacts for this message */}
              {message.artifactIds?.map((artifactId) => {
                const artifact = getArtifact(artifactId);
                if (!artifact) return null;
                return (
                  <InlineArtifact
                    key={artifact.id}
                    artifact={artifact}
                    isInCanvas={canvasArtifactIds.has(artifact.id)}
                    onToggleCanvas={() =>
                      canvasArtifactIds.has(artifact.id)
                        ? onRemoveFromCanvas(artifact.id)
                        : onAddToCanvas(artifact.id)
                    }
                    onSkuDrillDown={onSkuDrillDown}
                    suggestions={newPromoCreation?.suggestions}
                    onApplySuggestion={onApplySuggestion}
                  />
                );
              })}
            </React.Fragment>
          ))}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t bg-background space-y-3">
        {/* Link validation popup */}
        {linkValidation?.isOpen && linkValidation.links[linkValidation.currentIndex] && (
          <LinkValidationPopup
            currentLink={linkValidation.links[linkValidation.currentIndex]}
            remainingCount={
              linkValidation.links.filter((l) => l.status === 'pending').length - 1
            }
            awaitingRejectConfirm={linkValidation.awaitingRejectConfirm}
            onApprove={onApproveLink || (() => {})}
            onModify={onModifyLink || (() => {})}
            onStartReject={onStartRejectLink || (() => {})}
            onCancelReject={onCancelRejectLink || (() => {})}
            onConfirmReject={() => onConfirmRejectLink?.()}
            onDismiss={onDismissLinkValidation || (() => {})}
          />
        )}

        {/* Pending confirmation card */}
        {pendingConfirmation && (
          <ConfirmationMessage
            intentType={pendingConfirmation.intentType}
            fields={pendingConfirmation.fields}
            onConfirm={onConfirmIntent || (() => {})}
            onCancel={onCancelConfirmation || (() => {})}
          />
        )}

        <EnhancedChatInput
          onSend={(content, mentions) => {
            // If awaiting reject confirmation, send as rejection reason
            if (linkValidation?.awaitingRejectConfirm && content.trim()) {
              onConfirmRejectLink?.(content.trim());
            } else {
              onSendMessage(content, mentions);
            }
          }}
          onCommandSubmit={onCommandSubmit}
          commands={SLASH_COMMANDS}
          availableEntities={availableEntities}
          isStreaming={isStreaming}
          disabled={!!pendingConfirmation}
          placeholder={
            linkValidation?.awaitingRejectConfirm
              ? 'Add reason for rejection (optional)...'
              : pendingConfirmation
                ? 'Confirm or cancel the parameters above...'
                : 'Ask about this promotion...'
          }
        />
        {artifacts.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant={autoAdd ? 'default' : 'outline'}
              size="sm"
              onClick={toggleAutoAdd}
              className="flex-shrink-0"
            >
              <BoltIcon className="w-4 h-4 mr-1.5" />
              Auto-add
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddAllToCanvas}
              disabled={allInCanvas || autoAdd}
              className="flex-1"
            >
              <AddAllIcon className="w-4 h-4 mr-2" />
              {autoAdd
                ? 'Auto-adding'
                : allInCanvas
                  ? 'All artifacts in canvas'
                  : `Add all to canvas (${artifactsNotInCanvas.length})`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddAllIcon({ className }: { className?: string }) {
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
        d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
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
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

export { ChatPanel };
