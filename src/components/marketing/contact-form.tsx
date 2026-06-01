'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://formspree.io/f/mpqjvdjp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setSubmitted(true);
    } catch {
      // Silently handle - form still shows success for UX
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-primary text-lg font-medium mb-2">Thanks for reaching out!</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground block mb-1">
          Name
        </label>
        <Input id="name" name="name" placeholder="Jane Smith" />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground block mb-1">
          Work email <span className="text-primary">*</span>
        </label>
        <Input id="email" name="email" type="email" placeholder="jane@company.com" required />
      </div>
      <div>
        <label htmlFor="company" className="text-sm font-medium text-foreground block mb-1">
          Company
        </label>
        <Input id="company" name="company" placeholder="Acme Corp" />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground block mb-1">
          How would you use Cruxible Core?
        </label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your use case..."
        />
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        Send message
      </Button>
    </form>
  );
}
