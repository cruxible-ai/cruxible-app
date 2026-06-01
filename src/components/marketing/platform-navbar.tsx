'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function PlatformNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl text-foreground" style={{ fontFamily: 'Merriweather, serif' }}>
            Cruxible
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Core
          </Link>
          <Link href="/solutions/retail" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Retail
          </Link>
          <a
            href="https://github.com/cruxible-ai/cruxible-core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button size="sm" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              Core
            </Link>
            <Link
              href="/solutions/retail"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              Retail
            </Link>
            <a
              href="https://github.com/cruxible-ai/cruxible-core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              GitHub
            </a>
            <div className="pt-2">
              <Button size="sm" className="w-full" asChild>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact us</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
