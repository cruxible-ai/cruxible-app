import { HealthDot } from "@/components/Chip";
import { term } from "@/lib/vocabulary";

/**
 * A Line's state as its dot: armed green (enabled; its Triggers start runs),
 * pulsing while a run is in progress, amber or red when stalled or stopped,
 * hollow when never enabled.
 */
export function LineStateDot({ state, running = false }: { state: string | null | undefined; running?: boolean }) {
  if (state === undefined) return null;
  const tone = state === "running" || state === "enabled" ? "ok" : state ? (term("line", state).signal ?? "off") : "off";
  const title = running ? "Running: a run is in progress" : state ? term("line", state).word : "Not enabled";
  return <HealthDot tone={tone} title={title} pulse={running && tone === "ok"} />;
}
