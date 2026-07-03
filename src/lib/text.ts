/** Humanize a snake_case identifier for display: "review_queue" -> "Review queue". */
export function humanize(identifier: string): string {
  const words = identifier.replaceAll("_", " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
