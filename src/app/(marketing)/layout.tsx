import type { Metadata } from 'next';
import { PlatformNavbar } from '@/components/marketing/platform-navbar';
import { PlatformFooter } from '@/components/marketing/platform-footer';
import { ForceDarkMode } from '@/components/theme/force-dark-mode';

export const metadata: Metadata = {
  title: 'Cruxible: The Causal Decision Engine',
  description:
    'Entity graphs, deterministic execution, and DAG-based receipts. Build systems that explain every decision they make.',
  openGraph: {
    title: 'Cruxible: The Causal Decision Engine',
    description: 'Entity graphs, deterministic execution, and DAG-based receipts.',
    type: 'website',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ForceDarkMode />
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <PlatformNavbar />
        <main className="flex-1">{children}</main>
        <PlatformFooter />
      </div>
    </>
  );
}
