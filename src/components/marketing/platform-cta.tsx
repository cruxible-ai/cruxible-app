'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function PlatformCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);

    try {
      await fetch('https://formspree.io/f/mwvngonq', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="waitlist" className="py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-4">
          Ready to build with Cruxible Core?
        </h2>
        <p className="text-muted-foreground font-light mb-8 max-w-lg mx-auto">
          Start locally with the open-source engine, or join the Cruxible Cloud waitlist
          for self-serve deploys, managed infrastructure.
        </p>
        {submitted ? (
          <p className="text-primary text-sm font-medium">
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-row gap-2 max-w-md mx-auto"
          >
            <Input
              name="email"
              type="email"
              placeholder="you@company.com"
              required
              className="flex-1 h-10"
            />
            <Button type="submit" className="text-sm px-5 shrink-0 h-10" loading={loading}>
              Join the waitlist
            </Button>
          </form>
        )}
        <div className="mt-4">
          <Button variant="link" size="sm" className="text-muted-foreground text-sm" asChild>
            <Link href="/contact">or talk to us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
