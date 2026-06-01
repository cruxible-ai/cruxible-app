'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChatInput } from '@/components/chat-canvas/chat/chat-input';
import { EnhancedChatInput } from '@/components/chat-canvas/chat/enhanced-chat-input';
import { ChatMessage } from '@/components/chat-canvas/chat/chat-message';
import { SuggestionChips } from '@/components/chat-canvas/chat/suggestion-chips';
import { InlineArtifact } from '@/components/promo-analysis/inline-artifact';
import { SLASH_COMMANDS } from '@/lib/slash-commands';
import type { Message, AnalysisArtifact } from '@/hooks/use-promo-analysis';
import type { Entity } from '@/components/chat-canvas/chat/entity-picker';

interface ChatPanelProps {
  messages: Message[];
  artifacts: AnalysisArtifact[];
  canvasArtifactIds: Set<string>;
  isStreaming: boolean;
  onSendMessage: (content: string, mentions?: Entity[]) => void;
  onAddToCanvas: (artifactId: string) => void;
  onRemoveFromCanvas: (artifactId: string) => void;
  /** Available entities for @ mentions */
  availableEntities?: {
    promos: Entity[];
    skus: Entity[];
    campaigns: Entity[];
  };
  /** Use enhanced input with slash commands and @ mentions */
  showEnhancedInput?: boolean;
}

// Default suggestions for quick start
const DEFAULT_SUGGESTIONS = [
  { id: 'analyze-memorial', label: 'Analyze Memorial Day Sale', prompt: '@Memorial Day Sale What was the ROI?' },
  { id: 'compare-q1', label: 'Compare Q1 Promos', prompt: '/compare Q1 promotions' },
  { id: 'plan-new', label: 'Plan New Promo', prompt: '/plan a new summer promotion' },
];

/**
 * Chat panel with enhanced input support for slash commands and @ mentions
 */
function ChatPanel({
  messages,
  artifacts,
  canvasArtifactIds,
  isStreaming,
  onSendMessage,
  onAddToCanvas,
  onRemoveFromCanvas,
  availableEntities,
  showEnhancedInput = false,
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
      knownArtifactIdsRef.current = new Set(visibleArtifactIds);
      return;
    }

    const newArtifactIds = Array.from(visibleArtifactIds).filter(
      (id) => !knownArtifactIdsRef.current.has(id)
    );

    for (const artifactId of newArtifactIds) {
      if (!canvasArtifactIds.has(artifactId)) {
        onAddToCanvas(artifactId);
      }
    }

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

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: { label: string; prompt?: string }) => {
    onSendMessage(suggestion.prompt || suggestion.label);
  };

  // Handle send (wrapping for non-enhanced input)
  const handleSend = (content: string) => {
    onSendMessage(content);
  };

  // Show suggestions when no messages or only welcome message
  const showSuggestions = messages.length <= 1 && !isStreaming;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b bg-background">
        <h2 className="text-sm font-medium">Cruxible Console</h2>
        <p className="text-xs text-muted-foreground">Chat freely. Analysis and planning follow a fixed, deterministic process.</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-4">
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
                  />
                );
              })}
            </React.Fragment>
          ))}

          {/* Show all artifacts that aren't attached to messages */}
          {artifacts
            .filter(
              (a) =>
                !messages.some((m) => m.artifactIds?.includes(a.id))
            )
            .map((artifact) => (
              <InlineArtifact
                key={artifact.id}
                artifact={artifact}
                isInCanvas={canvasArtifactIds.has(artifact.id)}
                onToggleCanvas={() =>
                  canvasArtifactIds.has(artifact.id)
                    ? onRemoveFromCanvas(artifact.id)
                    : onAddToCanvas(artifact.id)
                }
              />
            ))}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex-shrink-0 border-t bg-background">
        {/* Suggestion chips when starting fresh */}
        {showSuggestions && (
          <div className="px-4 pt-3">
            <SuggestionChips
              suggestions={DEFAULT_SUGGESTIONS}
              onSelect={handleSuggestionClick}
            />
          </div>
        )}

        {/* Chat input */}
        {showEnhancedInput ? (
          <EnhancedChatInput
            onSend={onSendMessage}
            commands={SLASH_COMMANDS}
            availableEntities={availableEntities}
            isStreaming={isStreaming}
            placeholder="Ask about any promotion..."
            className="p-4"
          />
        ) : (
          <ChatInput
            onSend={handleSend}
            isStreaming={isStreaming}
            placeholder="Ask about this promotion..."
          />
        )}

        {/* Action buttons */}
        {artifacts.length > 0 && (
          <div className="px-4 pb-4 flex gap-2">
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
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export { ChatPanel };
