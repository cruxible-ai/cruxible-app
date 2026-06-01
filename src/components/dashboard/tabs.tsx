'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type DashboardTab = 'campaigns' | 'promos' | 'products';

interface TabsProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  className?: string;
}

const TABS: { id: DashboardTab; label: string; description: string }[] = [
  { id: 'campaigns', label: 'Campaigns', description: 'View by campaign groupings' },
  { id: 'promos', label: 'Promos', description: 'Individual promotions' },
  { id: 'products', label: 'Products', description: 'Product catalog' },
];

export function DashboardTabs({ activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-muted rounded-lg', className)}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-all',
            activeTab === tab.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          )}
          title={tab.description}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
