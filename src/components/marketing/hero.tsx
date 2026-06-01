'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AuditForm } from './audit-form';

export function Hero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative">
      {/* Text content - more compact */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left side - Titles */}
          <div className="lg:max-w-xl">
            {/* Headline - smaller */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Stop losing margin on "successful" promotions
            </h1>

            {/* Subheadline - smaller */}
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              Measure true promo profit impact and capture outcomes to plan your next promos
              with confidence. Live in hours, not months.
            </p>
          </div>

          {/* Right side - CTAs */}
          <div className="flex flex-row gap-3">
            <div className="flex flex-col items-center gap-2">
              <Button size="lg" className="text-sm px-5" onClick={() => setFormOpen(true)}>
                Get free promo audit
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Receive a secure upload link by email<br />for exported CSV.
              </p>
              <a href="/reports/example" className="text-xs text-neon-ice hover:text-neon-ice/80 flex items-center gap-1">
                View example audit
                <ArrowRightIcon className="w-3 h-3" />
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="outline" size="lg" className="text-sm px-5" asChild>
                <a href="https://calendly.com/rob-cruxible" target="_blank" rel="noopener noreferrer">
                  Book 15-minute fit check
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                See if Cruxible fits your workflow.<br />If it's a match, we'll outline a 3-month pilot.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image area */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
          {/* Background image */}
          <Image
            src="/pexels-kaip-1341279.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* App screenshot centered */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/app.png"
                alt="Cruxible app interface"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <AuditForm open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
