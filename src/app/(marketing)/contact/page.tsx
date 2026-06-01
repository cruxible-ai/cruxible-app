import type { Metadata } from 'next';
import { ContactForm } from '@/components/marketing/contact-form';
import { CloudWaitlistForm } from '@/components/marketing/cloud-waitlist-form';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact: Cruxible',
  description: 'Get in touch with the Cruxible team or join the Cloud waitlist.',
};

export default function ContactPage() {
  return (
    <>
      {/* Contact section */}
      <section className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Let&apos;s talk
              </h1>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Whether you&apos;re exploring Cruxible Core for a new domain or want to discuss
                the retail solution, we&apos;d love to hear from you.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>Or email us directly at </span>
                <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">
                  support@cruxible.ai
                </a>
              </div>
            </div>

            {/* Right - Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Waitlist section */}
      <section id="waitlist" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">Cruxible Cloud</h2>
          <p className="text-muted-foreground font-light mb-8 max-w-lg mx-auto">
            Managed infrastructure for Cruxible Core. Deploy entity graphs without managing
            servers. Coming soon.
          </p>
          <CloudWaitlistForm />
        </div>
      </section>
    </>
  );
}
