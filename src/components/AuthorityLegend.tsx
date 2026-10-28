import { HealthDot } from "@/components/Chip";
import { LegendRow } from "@/components/StatsRow";
import { AUTHORITY_COLOR } from "@/lib/palette";
import { term } from "@/lib/vocabulary";

/** The authority swatch: the bar a Line or ClaimType carries in its authority's color. */
export function AuthorityBar({ authority }: { authority: string | undefined }) {
  const color =
    authority === "settle" || authority === "propose" || authority === "observe" ? AUTHORITY_COLOR[authority] : AUTHORITY_COLOR.none;
  return <span aria-hidden className="inline-block h-2.5 w-[3px] shrink-0" style={{ background: color }} />;
}

/** What the authority colors and the state dots mean (Evidence flow, Lines). */
export function AuthorityLegend({ byHand = true }: { byHand?: boolean }) {
  const swatch = (color: string, label: string, help: string) => (
    <span className="inline-flex items-center gap-1.5" title={help}>
      <span className="inline-block h-2.5 w-[3px]" style={{ background: color }} />
      {label}
    </span>
  );
  return (
    <LegendRow>
      {swatch(AUTHORITY_COLOR.settle, "May settle", term("authority", "settle").meaning)}
      {swatch(AUTHORITY_COLOR.propose, "Proposes for review", term("authority", "propose").meaning)}
      {swatch(AUTHORITY_COLOR.observe, "Observes only", "Observe: writes no Claims; posts to its inbox")}
      {byHand && swatch(AUTHORITY_COLOR.none, "By hand", "No Line writes it: written by an agent or a person")}
      <span className="inline-flex items-center gap-1.5">
        <HealthDot tone="ok" title="Armed: enabled; its Triggers start runs" /> Armed
      </span>
      <span className="inline-flex items-center gap-1.5">
        <HealthDot tone="ok" title="Running: a run is in progress" pulse /> Running
      </span>
      <span className="inline-flex items-center gap-1.5">
        <HealthDot tone="off" title="Not enabled" /> Not enabled
      </span>
    </LegendRow>
  );
}
