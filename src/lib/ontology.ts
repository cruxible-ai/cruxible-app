import type { OrientPredicate, Schemas } from "../api/schemas.ts";

/**
 * Ontology helpers for the kind, contract and evidence-flow pages: labels
 * for the typed definition reads, the settler join, pin lookups, and the
 * seams for the columns that wait on post-v1 core reads (design-app-ontology
 * §5). Every input here is ontology-sized: ClaimTypes, SubjectKinds,
 * contracts, Triggers, Lines, Mandates, definition pins. Nothing reads Claims
 * or Captures.
 */

/** The core gaps a column still waits on: both post-v1. */
export type CoreGap = "K2" | "K4";

/** What each gap serves, for the dash's tooltip. */
export const GAP_NOTE: Record<CoreGap, string> = {
  K2: "Contested and stale counts per ClaimType: post-v1.",
  K4: "Contract landings, cited Captures and citing Claims: post-v1.",
};

// -- contention, format, revision ---------------------------------------------

type Contention = Schemas["ClaimTypeContention"];

/** How rival Claims of one slot settle, in a few words; the raw policy goes in the tooltip. */
export function contentionLabel(contention: Contention): string {
  const base =
    contention.selector === "all"
      ? "all answer"
      : contention.on_conflict === "refuse"
        ? "refuses rivals"
        : "rivals conflict";
  const extra = [
    contention.corroboration ? `${contention.corroboration} corroboration` : null,
    contention.freeze ? `${contention.freeze} freeze` : null,
  ].filter(Boolean);
  return extra.length ? `${base} · ${extra.join(" · ")}` : base;
}

export function contentionTitle(contention: Contention): string {
  return `Selector ${contention.selector}, on conflict ${contention.on_conflict}, corroboration ${contention.corroboration ?? 0}, freeze ${contention.freeze ?? 0}`;
}

/** ClaimType formats below v7 have an upgrade (`claim-types/upgrade`). */
export const CURRENT_CLAIM_TYPE_FORMAT = 7;

/** Whether the kit that owns a ClaimType reports its path as edited locally. */
export function driftedLocally(
  descriptor: OrientPredicate,
  kits: readonly Schemas["InstalledKit"][] | undefined,
): boolean {
  if (!descriptor.kit || !descriptor.path || !kits) return false;
  const kit = kits.find((k) => k.kit_id === descriptor.kit);
  return (kit?.drifted ?? []).includes(descriptor.path);
}

// -- live counts (K1) ----------------------------------------------------------

export interface PredicateCounts {
  liveClaims: number;
  subjectsWithValue: number;
}

/**
 * Live counts per ClaimType on one kind, from `orient(kind=K)`: its
 * descriptors carry `live_claims` and `subjects_with_value`, read from
 * counters Claim writes maintain (one primary-key prefix seek per kind).
 */
export function kindCounts(detail: Schemas["OrientKindDetail"] | null | undefined): Map<string, PredicateCounts> {
  const out = new Map<string, PredicateCounts>();
  for (const p of detail?.predicates ?? []) {
    out.set(p.predicate, { liveClaims: p.live_claims ?? 0, subjectsWithValue: p.subjects_with_value ?? 0 });
  }
  return out;
}

/** Share of a kind's live Subjects holding a value, as a whole percent. */
export function shareLabel(subjectsWithValue: number, liveSubjects: number | undefined): string {
  if (!liveSubjects) return subjectsWithValue === 0 ? "0%" : "—";
  return `${Math.round((100 * subjectsWithValue) / liveSubjects)}%`;
}

// -- pins (K3) -------------------------------------------------------------------

type Pin = Schemas["OrientPin"];

/** The `Kind` part of a `Kind:name` ref. */
export const refKind = (ref: string) => ref.slice(0, Math.max(0, ref.indexOf(":")));

/** Definitions that pin `target`, optionally only under `roles`. */
export function pinnersOf(pins: readonly Pin[], target: string, roles?: readonly string[]): Pin[] {
  return pins.filter((pin) => pin.target === target && (!roles || roles.includes(pin.role)));
}

/** What `source` pins, optionally only under `roles`. */
export function pinnedBy(pins: readonly Pin[], source: string, roles?: readonly string[]): Pin[] {
  return pins.filter((pin) => pin.source === source && (!roles || roles.includes(pin.role)));
}

export interface ContractProducer {
  /** `Procedure:<name>` (or a historical `Blueprint:<name>`). */
  source: string;
  /** ProviderInterfaces its slots take (Procedure grain: every step's), as `ProviderInterface:<name>/v<major>`. */
  providers: string[];
  /** Live Lines running it (Procedures only). */
  lines: string[];
  /** Lines among them that its landings start: the Procedure reads what landed. */
  startedByLanding: string[];
}

/**
 * Procedures that capture under a contract: each has a source or emit step
 * naming it (pin role `capture-contract`). Since compiler revision 36 Lines,
 * Triggers and ClaimTypes pin the contracts they name under the same role,
 * so only Procedures (and historical Blueprints) count here; a Line pins the
 * contract its trigger input reads, which marks a Procedure whose Lines start
 * on this contract's landings. Pins are at Procedure grain: a Procedure with
 * two source steps names both interfaces. Whether a step retains a Capture or
 * reads the one that landed comes from the definitions (lib/definitions).
 */
export function contractProducers(pins: readonly Pin[], contract: string): ContractProducer[] {
  const ref = contract.startsWith("CaptureContract:") ? contract : `CaptureContract:${contract}`;
  const pinners = pinnersOf(pins, ref, ["capture-contract", "trigger-capture-contract"]).map((p) => p.source);
  const landingLines = new Set(pinners.filter((s) => s.startsWith("Line:")));
  return pinners
    .filter((source) => source.startsWith("Procedure:") || source.startsWith("Blueprint:"))
    .filter((source, i, all) => all.indexOf(source) === i)
    .sort()
    .map((source) => {
      const lines = source.startsWith("Procedure:") ? pinnersOf(pins, source, ["procedure"]).map((p) => p.source).filter((s) => s.startsWith("Line:")).sort() : [];
      return {
        source,
        providers: [...new Set(pinnedBy(pins, source, ["provider-interface", "provider"]).map((p) => p.target))].sort(),
        lines,
        startedByLanding: lines.filter((line) => landingLines.has(line)),
      };
    });
}

/** Display name of a Provider or ProviderInterface ref: its id without the build digest. */
export function providerName(ref: string): string {
  return ref.replace(/^(Provider|ProviderInterface):/, "").replace(/\/[0-9a-f]{64}$/, "");
}

// -- value types --------------------------------------------------------------

/** Subject kinds a value type points at ("subject:<a>,<b>"); [] for literals. */
export function targetKinds(type: string): string[] {
  return type.startsWith("subject:") ? type.slice("subject:".length).split(",").filter(Boolean) : [];
}

/** How a ClaimType's own words relate to evidence. */
export function evidenceMode(descriptor: OrientPredicate): "captured" | "own-words" | "none" {
  // orient omits `self` (the default: the author's own words may stand).
  if (descriptor.evidence_requirement === "captured") return "captured";
  if (descriptor.evidence_requirement === "none") return "none";
  return "own-words";
}

/** The ClaimTypes whose subject kinds include `kind`. */
export function claimTypesOfKind(rows: readonly OrientPredicate[], kind: string): OrientPredicate[] {
  return rows
    .filter((row) => (row.subject_kinds ?? []).includes(kind))
    .sort((a, b) => a.predicate.localeCompare(b.predicate));
}

/** ClaimTypes of other kinds whose values point at `kind` ("pointed at by"). */
export function claimTypesPointingAt(rows: readonly OrientPredicate[], kind: string): OrientPredicate[] {
  return rows.filter((row) => targetKinds(row.type).includes(kind)).sort((a, b) => a.predicate.localeCompare(b.predicate));
}

// -- settlers -----------------------------------------------------------------

type Mandate = Schemas["OrientMandate"];
type Line = Schemas["OrientLine"];

export type Settler =
  | { kind: "settles"; line: string; mandate: string }
  | { kind: "capped"; line: string; mandate: string }
  | { kind: "suspended"; line: string; mandate: string };

const bare = (value: string) => value.replace(/^[A-Za-z]+:/, "");

/** Live settle grants: the Mandates that may settle at all. */
export function settleMandates(mandates: readonly Mandate[]): Mandate[] {
  return mandates.filter((m) => m.grants === "settle" && (m.state === "active" || m.state === "expiring"));
}

/**
 * Who may settle a ClaimType: live settle Mandates whose typed scope covers
 * it, mapped to the live Lines running their Procedure. A Line capped at
 * propose only proposes (design Q5); a suspended Mandate settles nothing
 * while its kill switch is on. No match means changes go to review.
 */
export function settlersFor(predicate: string, mandates: readonly Mandate[], lines: readonly Line[]): Settler[] {
  const out: Settler[] = [];
  for (const mandate of settleMandates(mandates)) {
    if (!(mandate.scope ?? []).some((scope) => bare(scope.claim_type) === predicate)) continue;
    for (const line of lines) {
      if (line.lifecycle !== "live" || bare(line.procedure) !== bare(mandate.procedure)) continue;
      out.push({
        kind: mandate.suspended ? "suspended" : line.authority === "settle" ? "settles" : "capped",
        line: bare(line.line),
        mandate: bare(mandate.mandate),
      });
    }
  }
  return out;
}

// -- contracts ----------------------------------------------------------------

/** What a contract card's `captures` says. Its logical sources come from the definitions that name it (lib/definitions). */
export interface ContractDefinition {
  grade: string | null;
  sourceKinds: string[];
}

const strs = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

/**
 * The definition inside a CaptureContract card (`captures`, an untyped object
 * in the contract; K4a types it). Reads the keys core writes.
 */
export function readContractDefinition(captures: Record<string, unknown>): ContractDefinition {
  return {
    grade: typeof captures.grade === "string" ? captures.grade : null,
    sourceKinds: strs(captures.source_kinds),
  };
}

/** What a source kind means for where the bytes come from. */
export function sourceKindLabel(kind: string): string {
  if (kind === "external") return "fetched from outside";
  if (kind === "ledger" || kind === "cas") return `the instance's own ${kind}`;
  return kind;
}

/** The bare contract name (`CaptureContract:` stripped). */
export function contractName(value: string): string {
  return value.replace(/^CaptureContract:/, "");
}
