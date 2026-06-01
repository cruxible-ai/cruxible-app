import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AuditsListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-onyx dark:text-white">
            Audit Reports
          </h1>
          <p className="text-muted-foreground">
            Create and manage audit reports with evidence from your runs.
          </p>
        </div>
        <Button>New Audit Report</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Your Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            No audit reports yet. Create one by adding evidence from a run.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
