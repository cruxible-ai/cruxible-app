import { useState } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

/**
 * Branded catch-all for render/route errors: says what broke, offers the way
 * back, and puts the diagnostics one click away instead of splattering a raw
 * stack across the page.
 */
export function RouteError() {
  const error = useRouteError();
  const [copied, setCopied] = useState(false);

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something broke rendering this page";
  const message = isRouteErrorResponse(error)
    ? typeof error.data === "string"
      ? error.data
      : ""
    : error instanceof Error
      ? error.message
      : String(error);
  const stack = error instanceof Error ? (error.stack ?? "") : "";

  async function copyDiagnostics() {
    try {
      await navigator.clipboard.writeText(
        [`${title}`, message, window.location.href, stack].filter(Boolean).join("\n\n"),
      );
      setCopied(true);
    } catch {
      // Clipboard unavailable: the details block below is selectable.
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-[36rem] max-w-full rounded-md border border-zinc-800 bg-zinc-900/40 p-5">
        <div
          className="text-[22px] font-normal text-zinc-100"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Cruxible
        </div>
        <h1 className="mt-3 text-[15px] font-semibold text-zinc-100">{title}</h1>
        {message && <p className="mt-1 break-all text-[13px] text-zinc-400">{message}</p>}
        <div className="mt-3 flex items-center gap-2 text-[13px]">
          <Link
            to="/"
            reloadDocument
            className="rounded border border-zinc-700 px-2 py-0.5 text-zinc-200 hover:border-zinc-500"
          >
            Back to overview
          </Link>
          <button
            onClick={copyDiagnostics}
            className="rounded border border-zinc-800 px-2 py-0.5 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
          >
            {copied ? "Copied" : "Copy diagnostics"}
          </button>
        </div>
        {stack && (
          <details className="mt-3">
            <summary className="cursor-pointer text-[12px] text-zinc-600 hover:text-zinc-400">
              Stack trace
            </summary>
            <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap text-[10px] leading-3 text-zinc-500">
              {stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
