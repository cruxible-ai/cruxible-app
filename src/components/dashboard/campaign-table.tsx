'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CampaignSummary } from '@/lib/api-types';

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-US', options);
  const endStr = end.toLocaleDateString('en-US', { ...options, year: 'numeric' });
  return `${startStr} - ${endStr}`;
}

interface CampaignTableProps {
  campaigns: CampaignSummary[];
  emptyMessage?: string;
  className?: string;
}

/**
 * Campaign groupings table component for Dashboard.
 */
function CampaignTable({
  campaigns,
  emptyMessage = 'No campaigns found',
  className,
}: CampaignTableProps) {
  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead className="text-center">Promos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.length === 0 ? (
            <TableEmpty colSpan={3} message={emptyMessage} />
          ) : (
            campaigns.map((campaign) => (
              <TableRow key={campaign.campaign_id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name || campaign.campaign_id}</div>
                    <div className="text-xs text-muted-foreground">
                      {campaign.campaign_id}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {formatDateRange(campaign.start_date, campaign.end_date)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" size="sm">
                    {campaign.promo_ids.length}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { CampaignTable };
export type { CampaignTableProps };
