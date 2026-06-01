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
import type { ProductResponse } from '@/lib/api-client';

interface ProductTableProps {
  products: ProductResponse[];
  emptyMessage?: string;
  className?: string;
}

/**
 * Product catalog table component for Dashboard.
 */
function ProductTable({
  products,
  emptyMessage = 'No products found',
  className,
}: ProductTableProps) {
  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableEmpty colSpan={4} message={emptyMessage} />
          ) : (
            products.map((product) => (
              <TableRow key={product.sku_id}>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {product.sku_id}
                  </code>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {product.category && (
                    <Badge variant="outline" size="sm">
                      {product.category}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {product.unit_price ? `$${product.unit_price.toFixed(2)}` : '-'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { ProductTable };
export type { ProductTableProps };
