'use client';

import { NetworkReport } from '@/components/reports/network-report';
import { MOCK_REPORT_DATA } from '@/lib/mock-report-data';
import { ForceDarkMode } from '@/components/theme/force-dark-mode';

export default function ReportPage() {
  // TODO: Replace with API fetch using reportId
  // const { data, isLoading, error } = useReport(reportId);
  const data = MOCK_REPORT_DATA;

  return (
    <>
      <ForceDarkMode />
      <div className="max-w-4xl mx-auto py-8 px-4 bg-background text-foreground min-h-screen">
        <NetworkReport data={data} showPrintStyles />
      </div>
    </>
  );
}
