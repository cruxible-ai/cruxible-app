'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useCallback } from 'react';
import { ChatCanvasLayout } from '@/components/chat-canvas/chat-canvas-layout';
import { ChatPanel } from '@/components/promo-analysis/chat-panel';
import { EmptyPromoCanvas } from '@/components/chat/empty-promo-canvas';
import { CanvasPanel } from '@/components/promo-analysis/canvas-panel';
import { useChatSession } from '@/hooks/use-chat-session';

function NewChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get('q');
  const initialPromoId = searchParams.get('promo_id');
  const autostart = searchParams.get('autostart') === 'true';

  // Redirect to session URL when session is created, preserving promo context
  const handleSessionCreated = useCallback((sessionId: string) => {
    const url = initialPromoId
      ? `/chat/${sessionId}?promo_id=${encodeURIComponent(initialPromoId)}`
      : `/chat/${sessionId}`;
    router.replace(url);
  }, [router, initialPromoId]);

  const {
    promoId,
    promo,
    setPromo,
    messages,
    artifacts,
    canvasArtifactIds,
    isStreaming,
    sendMessage,
    addToCanvas,
    removeFromCanvas,
    clearCanvas,
    availableEntities,
    pendingConfirmation,
    confirmIntent,
    cancelConfirmation,
    availablePromos,
    newPromoCreation,
    applySuggestion,
    approvePromo,
    passPromo,
    rerunPreflight,
  } = useChatSession({
    initialQuestion,
    initialPromoId,
    autostart,
    onSessionCreated: handleSessionCreated,
  });

  // Get artifacts that are in the canvas
  const canvasArtifacts = artifacts.filter((a) => canvasArtifactIds.has(a.id));

  return (
    <div className="h-screen flex flex-col bg-soft-linen dark:bg-carbon-black">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-sm font-medium">
                {promo ? promo.name || promoId : 'New Analysis'}
              </h1>
              {promo ? (
                <p className="text-xs text-muted-foreground">
                  {promo.campaign_name} · {promo.sku_ids.length} SKU{promo.sku_ids.length !== 1 ? 's' : ''}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Select a promotion to begin
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                // Clear localStorage and navigate to fresh chat
                localStorage.removeItem('cruxible-canvas-session');
                window.location.href = '/chat/new';
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-neon-ice hover:bg-neon-ice/90 rounded-md transition-colors"
              title="Start New Chat"
            >
              <PlusIcon className="w-4 h-4" />
              New Chat
            </button>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neon-ice flex items-center justify-center">
                <span className="text-onyx font-bold text-xs">C</span>
              </div>
              <span className="text-sm font-semibold text-onyx dark:text-white">
                Cruxible
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Chat + Canvas Layout */}
      <div className="flex-1 min-h-0">
        <ChatCanvasLayout
          chatPanel={
            <ChatPanel
              messages={messages}
              artifacts={artifacts}
              canvasArtifactIds={canvasArtifactIds}
              isStreaming={isStreaming}
              onSendMessage={sendMessage}
              onAddToCanvas={addToCanvas}
              onRemoveFromCanvas={removeFromCanvas}
              availableEntities={availableEntities}
              pendingConfirmation={pendingConfirmation}
              onConfirmIntent={confirmIntent}
              onCancelConfirmation={cancelConfirmation}
              newPromoCreation={newPromoCreation}
              onApplySuggestion={applySuggestion}
            />
          }
          canvasPanel={
            promo ? (
              <CanvasPanel
                promo={promo}
                artifacts={canvasArtifacts}
                availablePromos={availablePromos}
                onClearCanvas={clearCanvas}
                newPromoCreation={newPromoCreation}
                onApprovePromo={approvePromo}
                onPassPromo={passPromo}
                onApplySuggestion={applySuggestion}
                onRerunPreflight={rerunPreflight}
              />
            ) : (
              <EmptyPromoCanvas
                promos={availableEntities.promos}
                onSelectPromo={setPromo}
              />
            )
          }
        />
      </div>
    </div>
  );
}

export default function NewChatPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <NewChatPageContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="h-screen flex items-center justify-center bg-soft-linen dark:bg-carbon-black">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
