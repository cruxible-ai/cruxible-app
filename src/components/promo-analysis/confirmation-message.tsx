'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ParsedField } from '@/lib/chat-client';

interface ConfirmationMessageProps {
  intentType: string;
  fields: ParsedField[];
  onConfirm: (edits?: Record<string, unknown>) => void;
  onCancel: () => void;
}

/**
 * Confirmation card shown after LLM extracts intent.
 * Displays parsed fields and allows user to confirm/edit/cancel.
 */
function ConfirmationMessage({
  intentType,
  fields,
  onConfirm,
  onCancel,
}: ConfirmationMessageProps) {
  const [editMode, setEditMode] = React.useState(false);
  const [editedFields, setEditedFields] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.field_key, f.value]))
  );

  const handleFieldChange = (fieldKey: string, value: string) => {
    setEditedFields((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleConfirm = () => {
    if (editMode) {
      // Convert edited values back to appropriate types
      const edits: Record<string, unknown> = {};
      for (const field of fields) {
        const editedValue = editedFields[field.field_key];
        if (editedValue !== field.value) {
          // Try to parse as number if it looks like one
          if (/^\d+(\.\d+)?$/.test(editedValue)) {
            edits[field.field_key] = parseFloat(editedValue);
          } else {
            edits[field.field_key] = editedValue;
          }
        }
      }
      onConfirm(Object.keys(edits).length > 0 ? edits : undefined);
    } else {
      onConfirm();
    }
  };

  const intentLabel = intentType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <h3 className="text-sm font-medium">Confirm: {intentLabel}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Done Editing' : 'Edit'}
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field) => (
          <div key={field.field_key} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-24 flex-shrink-0">
              {field.label}:
            </span>
            {editMode && field.editable ? (
              <Input
                value={editedFields[field.field_key]}
                onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                className="h-7 text-sm"
              />
            ) : (
              <span className="text-sm font-medium">{field.value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleConfirm}>
          <CheckIcon className="w-4 h-4 mr-1" />
          Run Analysis
        </Button>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export { ConfirmationMessage };
export type { ConfirmationMessageProps };
