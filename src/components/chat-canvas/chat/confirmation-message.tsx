'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ParsedField {
  /** Field label (e.g., "SKU") */
  label: string;
  /** Field value (e.g., "SKU-12345") */
  value: string;
  /** Can user click to edit this field? */
  editable?: boolean;
}

interface ConfirmationMessageProps {
  /** Title text */
  title?: string;
  /** Structured data fields to confirm */
  fields: ParsedField[];
  /** Called when user confirms */
  onConfirm: () => void;
  /** Called when user wants to edit a field */
  onEdit?: (fieldLabel: string) => void;
  /** Show loading state on confirm button */
  isConfirming?: boolean;
  className?: string;
}

/**
 * Special message card asking user to verify parsed information.
 * Features distinctive neon ice (primary) border.
 */
function ConfirmationMessage({
  title = 'Please confirm these details:',
  fields,
  onConfirm,
  onEdit,
  isConfirming = false,
  className,
}: ConfirmationMessageProps) {
  return (
    <div
      className={cn(
        'rounded-lg border-2 border-primary bg-card p-4',
        'shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <ConfirmIcon className="w-5 h-5 text-primary" />
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>

      {/* Fields */}
      <div className="space-y-3 mb-4">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-start justify-between gap-4"
          >
            <span className="text-sm text-muted-foreground flex-shrink-0">
              {field.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground text-right">
                {field.value}
              </span>
              {field.editable && onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(field.label)}
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label={`Edit ${field.label}`}
                >
                  <EditIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end">
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit('all')}
            disabled={isConfirming}
          >
            Edit
          </Button>
        )}
        <Button
          size="sm"
          onClick={onConfirm}
          disabled={isConfirming}
          loading={isConfirming}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

function ConfirmIcon({ className }: { className?: string }) {
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
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
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

export { ConfirmationMessage };
export type { ConfirmationMessageProps, ParsedField };
