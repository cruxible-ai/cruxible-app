'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CloudWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

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

  if (submitted) {
    return (
      <p className="text-primary text-sm font-medium">
        You&apos;re on the list! We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        name="email"
        type="email"
        placeholder="you@company.com"
        required
        className="flex-1"
      />
      <Button type="submit" loading={loading}>
        Join waitlist
      </Button>
    </form>
  );
}
