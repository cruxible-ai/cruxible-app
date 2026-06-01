import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { DemoVideo } from '@/components/marketing/demo-video';
import { HowItWorks } from '@/components/marketing/how-it-works';

export const metadata: Metadata = {
  title: 'Retail Promotions: Cruxible',
  description:
    'Measure promo performance and plan promotions with evidence. Get a free promo audit.',
};

export default function RetailSolutionPage() {
  return (
    <>
      <Hero />
      <Features />
      <DemoVideo />
      <HowItWorks />
    </>
  );
}
