import type { NextResult, OrientActivity, OrientPredicate, Schemas } from "@/api/schemas";
import { type RecordedFixture } from "@/fixtures/fixture";
import { AUTHORED } from "@/fixtures/handlers";

type OrientLine = Schemas["OrientLine"];

/**
 * Dashboard worlds built from the authored one, by replacing the responses of
 * the reads the Dashboard makes: a fresh instance (a kit installed, its Lines
 * accepted but none enabled, no Claims), and the authored world with one
 * health check unhealthy.
 */

type Edit = (response: Record<string, unknown>) => Record<string, unknown>;

/** Replace each fixture's response where `match` says so. */
function edit(fixtures: RecordedFixture[], match: (fixture: RecordedFixture) => boolean, change: Edit): RecordedFixture[] {
  let hit = false;
  const out = fixtures.map((fixture) => {
    if (!match(fixture)) return fixture;
    hit = true;
    return { ...fixture, response: change(fixture.response as Record<string, unknown>) };
  });
  if (!hit) throw new Error("dashboard world: no fixture matched an edit");
  return out;
}

const section = (name: string | null) => (fixture: RecordedFixture) => {
  if (!fixture.path.endsWith("/orient") || fixture.method.toLowerCase() !== "get") return false;
  const response = fixture.response as { section?: string | null; kind_detail?: unknown };
  return name === null ? response.section == null && response.kind_detail === undefined && "artifacts" in response : response.section === name;
};

const nextRead = (fixture: RecordedFixture) => fixture.path.endsWith("/next") && fixture.method.toLowerCase() === "post";

const GENERATIONS: OrientActivity[] = [
  { because: "Adopt the kit's dependency loop: the SBOM import, OSV, KEV and EPSS Lines.", members: 17 },
  { because: "Install kit security 0.3.0.", members: 163 },
  { because: null, members: 1 },
  { because: "Install operation Contracts for kit security 0.3.0.", members: 51 },
  { because: null, members: 0 },
].map(({ because, members }, i) => ({
  event: "generation_accepted" as const,
  at: new Date(Date.parse("2026-10-19T11:40:00Z") - i * 3_600_000).toISOString(),
  ref: `Proposal:${String(i).repeat(64)}`,
  sequence: 42 - i,
  git_oid: String(i).repeat(40),
  proposal: String(i).repeat(64),
  proposer: "kit-owner",
  because,
  members,
}));

/** A fresh instance: definitions and Lines accepted, nothing enabled, no Claims, no landings, no runs. */
export function freshDashboard(fixtures: RecordedFixture[] = AUTHORED): RecordedFixture[] {
  let world = edit(fixtures, section(null), (r) => ({
    ...r,
    artifacts: { ...(r.artifacts as object), captures: 0, runs: 0, running: 0, claims: { accepted: 0, conflicted: 0, overturned: 0, ineligible: 0, retired: 0 } },
    attention: { next_items: 0, open_proposals: 0, top: [], notes: [] },
  }));
  world = edit(world, section("lines"), (r) => ({
    ...r,
    lines: (r.lines as OrientLine[]).map((line) => ({ ...line, enablement: null, due: 0, waiting: 0 })),
  }));
  world = edit(world, section("claim_types"), (r) => ({
    ...r,
    claim_types: (r.claim_types as OrientPredicate[]).map((row) => ({ ...row, stale_count: 0, evidence_counts: { admitted: 0, own_word: 0, unmet: 0 } })),
  }));
  world = edit(world, section("sources"), (r) => ({ ...r, sources: [] }));
  world = edit(world, (f) => section("activity")(f) && !f.key.includes("cursor"), (r) => ({ ...r, activity: GENERATIONS, next_cursor: null }));
  world = edit(world, nextRead, (r) => {
    const next = r as unknown as NextResult;
    return {
      ...r,
      items: [],
      total_items: 0,
      status: { ...next.status, procedure_catalog: { state: "not_observed" }, line_dispatch: { state: "idle" } },
    };
  });
  // Since the viewer last looked: Subjects only, no Claim changed.
  world = edit(world, (f) => f.path.endsWith("/since"), (r) => ({
    ...r,
    rows: (r.rows as Schemas["SinceRow"][]).filter((row) => row.artifact_kind !== "claim"),
  }));
  return world;
}

/** The authored world with the provider lane unavailable (a repair named) and the compiler lagging. */
export function unhealthyDashboard(fixtures: RecordedFixture[] = AUTHORED): RecordedFixture[] {
  return edit(fixtures, nextRead, (r) => {
    const next = r as unknown as NextResult;
    return {
      ...r,
      status: {
        ...next.status,
        provider_lane: { state: "unavailable", repair: { operation: "cruxible.provider.install", target: "provider_lane", required_change: "Reinstall the provider builds" } },
        compiler: { state: "upgrade_available" },
      },
    };
  });
}

/**
 * The unhealthy world with kev-triage's Trigger phrased as the daemon serves
 * a schedule ("on cron …"), so Freshness can measure cisa.kev.catalog against
 * it: a populated world with a stale source.
 */
export function populatedDashboard(fixtures: RecordedFixture[] = AUTHORED): RecordedFixture[] {
  return unhealthyDashboard(fixtures).map((fixture) => {
    const text = JSON.stringify(fixture.response);
    return text.includes('"daily at 06:00 UTC"') ? { ...fixture, response: JSON.parse(text.replaceAll('"daily at 06:00 UTC"', '"on cron 0 6 * * * (UTC)"')) } : fixture;
  });
}
