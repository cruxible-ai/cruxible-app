'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: unknown) => string;
}

interface TableArtifactContentProps {
  /** Column definitions */
  columns: TableColumn[];
  /** Row data */
  rows: Record<string, unknown>[];
  /** Maximum rows to display before scrolling */
  maxRows?: number;
  /** Whether to show row numbers */
  showRowNumbers?: boolean;
  /** Callback when row action button is clicked */
  onRowAction?: (row: Record<string, unknown>, rowIndex: number) => void;
  className?: string;
}

/**
 * Displays tabular data inside an artifact.
 * Compact table with horizontal scroll for many columns.
 */
function TableArtifactContent({
  columns,
  rows,
  maxRows = 10,
  showRowNumbers = false,
  onRowAction,
  className,
}: TableArtifactContentProps) {
  const displayRows = rows.slice(0, maxRows);
  const hasMore = rows.length > maxRows;

  return (
    <div className={cn('overflow-auto', className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            {showRowNumbers && (
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-10">
                #
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  col.align === 'left' && 'text-left',
                  !col.align && 'text-left'
                )}
              >
                {col.label}
              </th>
            ))}
            {onRowAction && (
              <th className="px-2 py-2 w-10" />
            )}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
            >
              {showRowNumbers && (
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  {rowIndex + 1}
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-3 py-2',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center'
                  )}
                >
                  {formatCellValue(row[col.key], col.format)}
                </td>
              ))}
              {onRowAction && (
                <td className="px-2 py-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-6 w-6"
                    onClick={() => onRowAction(row, rowIndex)}
                    title="View details"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <p className="text-xs text-muted-foreground text-center py-2 border-t border-border/50">
          Showing {displayRows.length} of {rows.length} rows
        </p>
      )}
    </div>
  );
}

function formatCellValue(
  value: unknown,
  format?: (value: unknown) => string
): string {
  if (format) {
    return format(value);
  }
  if (value === null || value === undefined) {
    return '—';
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export { TableArtifactContent };
export type { TableArtifactContentProps, TableColumn };
