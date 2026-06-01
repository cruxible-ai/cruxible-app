import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export function PlatformFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & tagline */}
          <div>
            <span className="text-xl text-foreground" style={{ fontFamily: 'Merriweather, serif' }}>
              Cruxible
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              Deterministic AI with receipts.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Core Platform
              </Link>
              <Link href="/solutions/retail" className="hover:text-foreground transition-colors">
                Retail Promotions
              </Link>
              <span className="opacity-50 cursor-default">
                Docs <span className="text-xs">(coming soon)</span>
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
              <a
                href="https://github.com/cruxible-ai/cruxible-core"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/company/cruxible/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Cruxible. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
