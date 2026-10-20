import type { OrientPredicate, Schemas } from "../api/schemas.ts";
import type { MandateProof } from "./lines.ts";

/**
 * Ontology helpers for the kind and contract pages: typed readers over the
 * definition reads that are still untyped, the settler join, and the seams
 * for the columns that wait on core reads (design-app-ontology §5). Every
 * input here is ontology-sized: ClaimTypes, SubjectKinds, contracts,
 * Triggers, Lines, Mandates. Nothing reads Claims or Captures.
 */

/** The core gaps a column can wait on. */
export type CoreGap = "K1" | "K2" | "K3" | "K4" | "K5" | "K6";

/** What each gap serves, for the placeholder's tooltip. */
export const GAP_NOTE: Record<CoreGap, string> = {
  K1: "Live counts per ClaimType (maintained predicate counts): being built in core.",
  K2: "Contested and stale counts per ClaimType: post-v1.",
  K3: "Producers and consumers through definition pins: being built in core.",
  K4: "Contract landings, cited Captures and citing Claims: post-v1.",
  K5: "Contention policy, format version and revision on ClaimTypes: being built in core.",
  K6: "Typed Mandate scope: being built in core; read from the Mandate proof meanwhile.",
};

/** Gaps being built now (a placeholder cell) vs post-v1 (a dash). */
export const GAP_IN_FLIGHT: ReadonlySet<CoreGap> = new Set<CoreGap>(["K1", "K3", "K5", "K6"]);

// -- K5 seam: contention, format, revision ------------------------------------

export interface ClaimTypeContention {
  selector: string;
  onConflict: string;
  corroboration: number;
  freeze: number;
}

export interface ClaimTypeVersion {
  format: number;
  revision: number;
  path: string;
}

/** Contention policy of a ClaimType once K5 serves it; null at the pinned contract. */
export function claimTypeContention(descriptor: OrientPredicate): ClaimTypeContention | null {
  void descriptor;
  return null;
}

/** Format version and revision of a ClaimType once K5 serves them; null at the pinned contract. */
export function claimTypeVersion(descriptor: OrientPredicate): ClaimTypeVersion | null {
  void descriptor;
  return null;
}

// -- K1 seam: live counts ------------------------------------------------------

export interface PredicateCounts {
  liveClaims: number;
  subjectsWithValue: number;
}

/**
 * Live counts per ClaimType once K1 serves them from maintained counts. The
 * served `live_claims` on orient(kind=) is a range count over the kind's
 * Claims per load, so the kind page does not read it.
 */
export function predicateCounts(descriptor: OrientPredicate): PredicateCounts | null {
  void descriptor;
  return null;
}

// -- K3 seam: producers -------------------------------------------------------

export interface ContractProducer {
  source: string;
  role: string;
}

/** Procedures, Blueprints and Providers pinning a contract once K3 serves pins; null now. */
export function contractProducers(contract: string): ContractProducer[] | null {
  void contract;
  return null;
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
  | { kind: "capped"; line: string; mandate: string };

const bare = (value: string) => value.replace(/^[A-Za-z]+:/, "");

/** Live settle grants: the Mandates that may settle at all. */
export function settleMandates(mandates: readonly Mandate[]): Mandate[] {
  return mandates.filter((m) => m.grants === "settle" && (m.state === "active" || m.state === "expiring"));
}

/**
 * Who may settle a ClaimType: live settle Mandates whose scope pins it,
 * mapped to the Lines running their Procedure. A Line capped at propose only
 * proposes (design Q5). No match means changes go to review. `scopes` maps a
 * Mandate to its proof (K6 seam: typed scope replaces the proof parse).
 */
export function settlersFor(
  predicate: string,
  mandates: readonly Mandate[],
  lines: readonly Line[],
  scopes: ReadonlyMap<string, MandateProof | null>,
): Settler[] {
  const out: Settler[] = [];
  for (const mandate of settleMandates(mandates)) {
    const proof = scopes.get(mandate.mandate);
    if (!proof || !proof.scope.some((scope) => bare(scope.claimType) === predicate)) continue;
    for (const line of lines) {
      if (line.lifecycle !== "live" || bare(line.procedure) !== bare(mandate.procedure)) continue;
      out.push({
        kind: line.authority === "settle" ? "settles" : "capped",
        line: bare(line.line),
        mandate: bare(mandate.mandate),
      });
    }
  }
  return out;
}

// -- contracts ----------------------------------------------------------------

export interface ContractDefinition {
  sources: string[];
  evidenceKinds: string[];
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
    sources: strs(captures.sources),
    evidenceKinds: strs(captures.evidence_kinds),
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
