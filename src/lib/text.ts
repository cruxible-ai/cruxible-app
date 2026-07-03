/**
 * Humanize an identifier for display, sentence case: "review_queue" ->
 * "Review queue", "WorkItem" -> "Work item". Display only -- never feed the
 * result back to the API.
 */
export function humanize(identifier: string): string {
  const words = identifier
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}
