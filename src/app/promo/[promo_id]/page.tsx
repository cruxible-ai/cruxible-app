'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';

/**
 * Legacy promo analysis page - redirects to session-based chat.
 * Preserved for backwards compatibility with existing links.
 */
export default function PromoAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const promoId = params.promo_id as string;

  React.useEffect(() => {
    // Redirect to the new session-based chat route
    router.replace(`/chat/new?promo_id=${encodeURIComponent(promoId)}&autostart=true`);
  }, [promoId, router]);

  // Show loading while redirecting
  return (
    <div className="h-screen flex items-center justify-center bg-soft-linen dark:bg-carbon-black">
      <div className="text-muted-foreground">Redirecting to analysis...</div>
    </div>
  );
}
