'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AuditFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roles = [
  'Merchandising',
  'Category Management',
  'Marketing',
  'Analytics / Data Science',
  'Operations',
  'Executive',
  'Other',
];

const platforms = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'netsuite', label: 'NetSuite' },
  { value: 'bigcommerce', label: 'BigCommerce' },
  { value: 'other', label: 'Other' },
];

export function AuditForm({ open, onOpenChange }: AuditFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim();
    const company = (formData.get('company') as string)?.trim();
    const name = (formData.get('name') as string)?.trim();

    if (!platform) {
      setError('Please select a platform');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Create merchant (blocking)
      const res = await fetch('/api/merchants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: name || undefined,
          contactEmail: email,
          companyName: company,
          platform,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create merchant');
      }

      const { storageNamespace } = await res.json();

      // 2. Fire-and-forget Formspree notification
      fetch('https://formspree.io/f/xkoowjlr', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      }).catch(() => {
        // Non-blocking — don't prevent redirect
      });

      // 3. Redirect to upload page
      router.push(`/upload?ns=${encodeURIComponent(storageNamespace)}&platform=${encodeURIComponent(platform)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setError(null);
      setPlatform('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <div className="flex gap-8">
          {/* Left side - Info */}
          <div className="flex-1">
            <DialogHeader>
              <DialogTitle>Get started with Cruxible</DialogTitle>
            </DialogHeader>

            {/* Process steps */}
            <ol className="text-sm text-muted-foreground space-y-1.5 mt-4">
              <li className="flex gap-2">
                <span className="text-foreground font-medium">1.</span>
                Upload your CSV via a secure link
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-medium">2.</span>
                Quick data check + delivery date confirmation
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-medium">3.</span>
                We run the post-mortem and surface margin leakage
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-medium">4.</span>
                Receive your audit PDF (typically within 3 business days)
              </li>
            </ol>
            <p className="text-xs text-muted-foreground mt-4">
              Secure, encrypted upload on AWS. No integrations or data pulls.
            </p>
          </div>

          {/* Right side - Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex-1 space-y-4">
            {/* Required fields */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Work Email <span className="text-destructive">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Company <span className="text-destructive">*</span>
                </label>
                <Input name="company" required placeholder="Company name" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Platform <span className="text-destructive">*</span>
                </label>
                <Select
                  name="platform"
                  value={platform}
                  onValueChange={setPlatform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your e-commerce platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Optional fields */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-muted-foreground">Optional</p>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <Input name="name" placeholder="Your name" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Role</label>
                <Select name="role">
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role.toLowerCase().replace(/ /g, '-')}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? 'Setting up...' : 'Get started'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
