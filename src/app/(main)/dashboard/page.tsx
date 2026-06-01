'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardTabs, type DashboardTab } from '@/components/dashboard/tabs';
import { PromoTable } from '@/components/dashboard/promo-table';
import { ProductTable } from '@/components/dashboard/product-table';
import { CampaignTable } from '@/components/dashboard/campaign-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  fetchPromos,
  fetchProducts,
  fetchCampaigns,
  type ProductResponse,
} from '@/lib/api-client';
import type { PromoSummary, CampaignSummary } from '@/lib/api-types';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<DashboardTab>('promos');

  const [promos, setPromos] = React.useState<PromoSummary[]>([]);
  const [products, setProducts] = React.useState<ProductResponse[]>([]);
  const [campaigns, setCampaigns] = React.useState<CampaignSummary[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [promoData, productData, campaignData] = await Promise.allSettled([
          fetchPromos({ limit: 200 }),
          fetchProducts({ limit: 200 }),
          fetchCampaigns({ limit: 100 }),
        ]);

        if (cancelled) return;

        if (promoData.status === 'fulfilled') setPromos(promoData.value.promos);
        if (productData.status === 'fulfilled') setProducts(productData.value.products);
        if (campaignData.status === 'fulfilled') setCampaigns(campaignData.value.campaigns);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Handle Open Canvas button click
  const handleOpenCanvas = React.useCallback(() => {
    router.push('/chat/new');
  }, [router]);

  // Derive promo status categories from dates
  const now = new Date();
  const activePromos = promos.filter((p) => {
    const start = new Date(p.start_date);
    const end = new Date(p.end_date);
    return now >= start && now <= end;
  });
  const upcomingPromos = promos.filter((p) => new Date(p.start_date) > now);
  const completedPromos = promos.filter((p) => new Date(p.end_date) < now);
  const currentPromos = [...activePromos, ...upcomingPromos];

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Promotion Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor active promotions and review completed campaigns
          </p>
        </div>
        <Button variant="default" onClick={handleOpenCanvas}>
          Open Canvas
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Active Promos"
          value={loading ? '-' : activePromos.length}
          description="Currently running"
          variant="success"
        />
        <SummaryCard
          title="Upcoming"
          value={loading ? '-' : upcomingPromos.length}
          description="Scheduled to start"
          variant="warning"
        />
        <SummaryCard
          title="Completed"
          value={loading ? '-' : completedPromos.length}
          description="Ready for analysis"
          variant="default"
        />
        <SummaryCard
          title="Products"
          value={loading ? '-' : products.length}
          description="In catalog"
          variant="default"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      {activeTab === 'campaigns' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">All Campaigns</h2>
            <span className="text-sm text-muted-foreground">
              {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
            </span>
          </div>
          <CampaignTable
            campaigns={campaigns}
            emptyMessage={loading ? 'Loading...' : 'No campaigns found'}
          />
        </section>
      )}

      {activeTab === 'promos' && (
        <>
          {/* Active & Upcoming Promos */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Active & Upcoming</h2>
              <span className="text-sm text-muted-foreground">
                {currentPromos.length} promotion{currentPromos.length !== 1 ? 's' : ''}
              </span>
            </div>
            <PromoTable
              promos={currentPromos}
              variant="active"
              emptyMessage={loading ? 'Loading...' : 'No active promotions'}
            />
          </section>

          {/* Completed Promos */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Recently Completed</h2>
              <Link
                href="/audits"
                className="text-sm text-primary hover:underline"
              >
                View all audits →
              </Link>
            </div>
            <PromoTable
              promos={completedPromos}
              variant="completed"
              emptyMessage={loading ? 'Loading...' : 'No completed promotions'}
            />
          </section>
        </>
      )}

      {activeTab === 'products' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Product Catalog</h2>
            <span className="text-sm text-muted-foreground">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </span>
          </div>
          <ProductTable
            products={products}
            emptyMessage={loading ? 'Loading...' : 'No products in catalog'}
          />
        </section>
      )}
    </>
  );
}

/**
 * Summary card component
 */
interface SummaryCardProps {
  title: string;
  value: number | string;
  description: string;
  variant?: 'default' | 'success' | 'warning';
}

function SummaryCard({ title, value, description, variant = 'default' }: SummaryCardProps) {
  const colors = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`text-3xl font-bold ${colors[variant]}`}>{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
