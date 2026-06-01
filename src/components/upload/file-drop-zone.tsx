"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadedFile {
  name: string;
  status: UploadStatus;
  progress: number;
  error?: string;
}

interface FileDropZoneProps {
  label: string;
  description?: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  storageNamespace: string;
  fileType: "orders" | "products" | "supporting";
  onUploadComplete?: (file: File) => void;
  onUploadError?: (error: Error) => void;
  disabled?: boolean;
  className?: string;
}

export function FileDropZone({
  label,
  description,
  required = false,
  accept = ".csv",
  multiple = false,
  storageNamespace,
  fileType,
  onUploadComplete,
  onUploadError,
  disabled = false,
  className,
}: FileDropZoneProps) {
  // Single-file mode state
  const [status, setStatus] = React.useState<UploadStatus>("idle");
  const [progress, setProgress] = React.useState(0);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  // Multi-file mode state
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const isUploading = multiple
    ? uploadedFiles.some((f) => f.status === "uploading")
    : status === "uploading";

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const uploadSingleFile = React.useCallback(async (file: File) => {
    setFileName(file.name);
    setStatus("uploading");
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", fileType);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setProgress(percentComplete);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            try {
              const response = JSON.parse(xhr.responseText);
              reject(new Error(response.error || `Upload failed: ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
            }
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Network error during upload"));
        });

        xhr.addEventListener("abort", () => {
          reject(new Error("Upload cancelled"));
        });

        xhr.open("POST", `/api/upload/${storageNamespace}`);
        xhr.send(formData);
      });

      setStatus("success");
      setProgress(100);
      onUploadComplete?.(file);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed");
      setError(error.message);
      setStatus("error");
      onUploadError?.(error);
    }
  }, [storageNamespace, fileType, onUploadComplete, onUploadError]);

  const uploadMultipleFile = React.useCallback(async (file: File, index: number) => {
    setUploadedFiles((prev) => {
      const next = [...prev];
      next[index] = { name: file.name, status: "uploading", progress: 0 };
      return next;
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", fileType);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setUploadedFiles((prev) => {
              const next = [...prev];
              if (next[index]) next[index] = { ...next[index], progress: percentComplete };
              return next;
            });
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            try {
              const response = JSON.parse(xhr.responseText);
              reject(new Error(response.error || `Upload failed: ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
            }
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
        xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

        xhr.open("POST", `/api/upload/${storageNamespace}`);
        xhr.send(formData);
      });

      setUploadedFiles((prev) => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], status: "success", progress: 100 };
        return next;
      });
      onUploadComplete?.(file);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed");
      setUploadedFiles((prev) => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], status: "error", error: error.message };
        return next;
      });
      onUploadError?.(error);
    }
  }, [storageNamespace, fileType, onUploadComplete, onUploadError]);

  const handleFiles = React.useCallback((files: FileList) => {
    if (multiple) {
      const startIndex = uploadedFiles.length;
      const newFiles = Array.from(files);
      // Add placeholders first
      setUploadedFiles((prev) => [
        ...prev,
        ...newFiles.map((f) => ({ name: f.name, status: "idle" as UploadStatus, progress: 0 })),
      ]);
      // Upload each
      newFiles.forEach((file, i) => {
        uploadMultipleFile(file, startIndex + i);
      });
    } else {
      uploadSingleFile(files[0]);
    }
  }, [multiple, uploadedFiles.length, uploadMultipleFile, uploadSingleFile]);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [disabled, handleFiles]);

  const handleFileSelect = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input so the same file can be selected again
    if (inputRef.current) inputRef.current.value = "";
  }, [handleFiles]);

  const handleClick = React.useCallback(() => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  }, [disabled, isUploading]);

  const handleReset = React.useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setFileName(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const handleRemoveFile = React.useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Multi-file: derive overall zone status for styling
  const multiHasFiles = uploadedFiles.length > 0;
  const multiAllSuccess = multiHasFiles && uploadedFiles.every((f) => f.status === "success");
  const multiHasError = uploadedFiles.some((f) => f.status === "error");

  const zoneStatus = multiple
    ? (isUploading ? "uploading" : multiAllSuccess ? "success" : multiHasError ? "error" : "idle")
    : status;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
        {required && <span className="text-destructive text-xs">Required</span>}
        {!required && <span className="text-muted-foreground text-xs">Optional</span>}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "min-h-[160px] rounded-lg border-2 border-dashed p-6",
          "transition-all duration-200 cursor-pointer",
          zoneStatus === "idle" && !isDragging && "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30",
          isDragging && "border-primary bg-primary/10",
          zoneStatus === "uploading" && "border-primary/50 bg-primary/5 cursor-wait",
          zoneStatus === "success" && !multiple && "border-success bg-success/10",
          zoneStatus === "error" && !multiple && "border-destructive bg-destructive/10",
          multiple && multiHasFiles && !isUploading && "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed hover:border-muted-foreground/25 hover:bg-transparent"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
        />

        {/* === Single-file mode === */}
        {!multiple && (
          <>
            {/* Idle/Dragging State */}
            {(status === "idle" || (status !== "uploading" && status !== "success" && !fileName)) && (
              <>
                <UploadIcon isDragging={isDragging} />
                <p className="text-sm text-center">
                  <span className="text-primary font-medium">Click to upload</span>
                  {" "}or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">CSV files only</p>
              </>
            )}

            {/* Uploading State */}
            {status === "uploading" && (
              <>
                <ProgressBar progress={progress} />
                <p className="text-sm font-medium">Uploading {fileName}...</p>
                <p className="text-xs text-muted-foreground mt-1">{progress}%</p>
              </>
            )}

            {/* Success State */}
            {status === "success" && (
              <>
                <SuccessIcon />
                <p className="text-sm font-medium">{fileName}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="mt-3 text-xs text-primary hover:underline"
                >
                  Upload a different file
                </button>
              </>
            )}

            {/* Error State */}
            {status === "error" && (
              <>
                <ErrorIcon />
                <p className="text-sm font-medium text-destructive">Upload failed</p>
                <p className="text-xs text-muted-foreground mt-1">{error}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="mt-3 text-xs text-primary hover:underline"
                >
                  Try again
                </button>
              </>
            )}
          </>
        )}

        {/* === Multi-file mode === */}
        {multiple && (
          <>
            <UploadIcon isDragging={isDragging} />
            <p className="text-sm text-center">
              <span className="text-primary font-medium">Click to upload</span>
              {" "}or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              CSV, XLSX, or PDF — upload multiple files
            </p>
          </>
        )}
      </div>

      {/* Multi-file: file list below the drop zone */}
      {multiple && uploadedFiles.length > 0 && (
        <ul className="space-y-2 pt-1">
          {uploadedFiles.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className={cn(
                "flex items-center gap-3 rounded-md border px-3 py-2 text-sm",
                f.status === "success" && "border-success/30 bg-success/5",
                f.status === "error" && "border-destructive/30 bg-destructive/5",
                f.status === "uploading" && "border-primary/30 bg-primary/5",
                f.status === "idle" && "border-border"
              )}
            >
              {/* Status indicator */}
              {f.status === "success" && (
                <svg className="h-4 w-4 shrink-0 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {f.status === "error" && (
                <svg className="h-4 w-4 shrink-0 text-destructive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
              {f.status === "uploading" && (
                <div className="h-4 w-4 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}

              {/* File name + error */}
              <div className="flex-1 min-w-0">
                <p className="truncate">{f.name}</p>
                {f.status === "uploading" && (
                  <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${f.progress}%` }} />
                  </div>
                )}
                {f.error && <p className="text-xs text-destructive mt-0.5">{f.error}</p>}
              </div>

              {/* Remove button (only if not uploading) */}
              {f.status !== "uploading" && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }}
                  className="text-muted-foreground hover:text-foreground shrink-0"
                  aria-label={`Remove ${f.name}`}
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function UploadIcon({ isDragging }: { isDragging: boolean }) {
  return (
    <svg
      className={cn("h-10 w-10 mb-3", isDragging ? "text-primary" : "text-muted-foreground")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg className="h-10 w-10 mb-3 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="h-10 w-10 mb-3 text-destructive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full max-w-xs mb-3">
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
