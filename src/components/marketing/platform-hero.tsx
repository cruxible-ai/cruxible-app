'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

const installCmd = 'pip install "cruxible-core[mcp]"';

export function PlatformHero() {
  const [copied, setCopied] = useState(false);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(installCmd);
    } catch {
      // Fallback for non-HTTPS contexts (e.g. localhost)
      const ta = document.createElement('textarea');
      ta.value = installCmd;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="relative overflow-hidden">
      {/* Abstract hero image — full width behind content */}
      <div className="relative">
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <div className="relative rounded-xl overflow-hidden min-h-[420px] md:min-h-0">
            <Image
              src="/hero-abstract.jpg"
              alt=""
              width={1920}
              height={1080}
              className="w-full h-full object-cover md:h-auto md:object-fill"
              priority
            />
            {/* Fade to background at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

            {/* Centered messaging overlaid on image */}
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-lg bg-black/30 md:backdrop-blur-none md:bg-transparent">
              <div className="text-center max-w-2xl mx-auto px-6 py-10 md:backdrop-blur-lg md:bg-black/30">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 drop-shadow-lg">
                  The AI-native causal decision engine
                </h1>
                <p className="text-base md:text-lg text-foreground font-light leading-relaxed mb-8 drop-shadow-md">
                  Knowledge graphs, deterministic execution, and DAG-based receipts.
                  Build AI systems that persist and explain every decision they make.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={copyInstall}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-background/80 border border-border font-mono text-sm hover:bg-background transition-colors"
                  >
                    <span className="text-muted-foreground">$</span>
                    <span>{installCmd}</span>
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </button>
                  <Button variant="link" size="sm" className="text-white hover:text-white text-sm underline drop-shadow-md" asChild>
                    <Link href="/contact">or talk to us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
