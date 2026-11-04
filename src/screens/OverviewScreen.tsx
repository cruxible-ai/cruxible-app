import { useMemo, type ReactNode } from "react";
import {
  useClaimTypes,
  useGenerations,
  useKits,
  useLines,
  useOrient,
  useOrientKindDetails,
  useOrientKinds,
  useSourceLandings,
  useSourceModel,
  useSubjectKinds,
} from "@/api/hooks";
import type { OrientResult, Schemas } from "@/api/schemas";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { EvidenceSankey, FRESHNESS, type SourceFacts } from "@/components/overview/EvidenceSankey";
import { GrowthChart } from "@/components/overview/GrowthChart";
import { Hero, type HeroStat } from "@/components/overview/Hero";
import { KnowledgeMap, type MapKind, type MapLink } from "@/components/overview/KnowledgeMap";
import { TrustBars, type ClaimStateCount, type TrustRow } from "@/components/overview/TrustBars";
import { shortNames } from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { isCoreIdentity } from "@/lib/ontology";
import {
  edgeLabel,
  evidenceFlow,
  evidenceMix,
  firstAccepted,
  freshness,
  GROWTH_SAMPLES,
  GROWTH_WINDOW,
  growthMarkers,
  growthSequences,
  kindClaimTypes,
  liveClaims,
  type GrowthPoint,
} from "@/lib/overview";
import { AUTHORITY_COLOR } from "@/lib/palette";
import { keyPredicates } from "@/lib/subject";
import { formatRelative } from "@/lib/text";
import { buildTypeColors } from "@/lib/type-colors";
import { buildTypeGraph, ontologyKinds } from "@/lib/type-graph";
import { useGrowthPoints } from "@/lib/useOverviewGrowth";
import { usePageTitle } from "@/lib/usePageTitle";

type KindDetail = Schemas["OrientKindDetail"];

const ABOUT = {
  page: "A snapshot of this instance: what it knows, where its evidence comes from, how its beliefs stand and how they grew. What needs you is on the Dashboard.",
  knows: "Kinds of Subject, sized by their Subjects, with their main ClaimTypes. An arrow is a ClaimType whose value names a Subject of another kind.",
  stands: "Each kind's live Claims by the evidence rule of their ClaimTypes; under them, every Claim by state.",
  from:
    "Live Claims by the Line that writes them, from the sources those Lines read. Attributed from definitions: a ClaimType's Claims go to the Lines that write it (split evenly when several do), else to Entered directly; a Line's Claims split evenly over its sources.",
  grew: `Live Claims by kind at up to ${GROWTH_SAMPLES} generations read across the newest ${GROWTH_WINDOW}; each reading holds until the next.`,
};

/**
 * The instance at a glance, for a first look or a demo: its size, a map of
 * what it knows, the evidence flow from sources through Lines into kinds, how
 * its Claims stand, and how they grew. Every mark links to the view behind
 * it. List and aggregate reads only (orient, one orient(kind=K) per kind,
 * definitions, sources, generations, a few sampled generations): the request
 * count grows with kinds, Lines, sources and generations shown, never with
 * Subjects or Claims.
 */
export function OverviewScreen() {
  const orient = useOrient();
  usePageTitle("Overview");
  if (orient.isPending) return <LoadState />;
  if (orient.error) return <LoadState error={orient.error} />;
  return (
    <Page>
      <PageHeader title="Overview" description={ABOUT.page} />
      <Snapshot o={orient.data} />
    </Page>
  );
}

function Snapshot({ o }: { o: OrientResult }) {
  const kinds = useOrientKinds();
  const claimTypes = useClaimTypes();
  const subjectKinds = useSubjectKinds();
  const names = useMemo(() => (kinds.data?.kinds ?? []).map((k) => k.kind).filter((k) => !isCoreIdentity(k)), [kinds.data]);
  const details = useOrientKindDetails(names);
  const source = useSourceModel();
  const landings = useSourceLandings();
  const lines = useLines();
  const generations = useGenerations();
  const kits = useKits();

  // A kind keeps one color everywhere: the per-kind palette over every kind orient lists (State graph, Connections).
  const colorOf = useMemo(() => buildTypeColors((kinds.data?.kinds ?? []).map((k) => k.kind)), [kinds.data]);
  const short = useMemo(() => shortNames(names), [names]);
  const detailOf = useMemo(() => {
    const out = new Map<string, KindDetail>();
    details.data.forEach((detail, i) => detail && out.set(names[i]!, detail));
    return out;
  }, [details.data, names]);
  const keys = useMemo(() => keyPredicates(subjectKinds.data?.rows), [subjectKinds.data]);
  const now = useMemo(() => new Date(), []);

  // -- sources: definitions and landings --------------------------------------------
  const sourceFacts = useMemo(() => {
    const out = new Map<string, SourceFacts>();
    for (const s of source.data?.sources ?? []) out.set(s.id, { freshness: "never", landedAt: null, landings: 0 });
    for (const row of landings.data?.rows ?? []) {
      out.set(row.logical_source, { freshness: freshness(row.latest.landed_at, now), landedAt: row.latest.landed_at, landings: row.landings });
    }
    return out;
  }, [source.data, landings.data, now]);
  const sourcesKnown = !source.isPending && !landings.isPending;
  const authority = useMemo(() => new Map((lines.data?.rows ?? []).map((row) => [lineName(row.line), row.authority as string])), [lines.data]);

  // -- hero ---------------------------------------------------------------------------
  const modelKinds = (kinds.data?.kinds ?? []).filter((k) => !isCoreIdentity(k.kind));
  const subjects = modelKinds.reduce((total, k) => total + k.subjects, 0);
  const kitList = (kits.data?.kits ?? []).map((kit) => ({ id: kit.kit_id, version: kit.version, source: kit.source }));
  const stats: HeroStat[] = [
    {
      label: "Subjects",
      value: kinds.data ? subjects : null,
      to: "/map",
      title: "Subjects across every kind: the Type map",
      bar: modelKinds.map((k) => ({ key: k.kind, color: colorOf(k.kind), value: k.subjects, title: `${k.kind}: ${k.subjects.toLocaleString()}` })),
    },
    {
      label: "Beliefs",
      value: o.artifacts?.claims?.accepted ?? 0,
      to: "/beliefs",
      title: "Live Claims",
      bar: names.map((kind) => {
        const claims = liveClaims(detailOf.get(kind)?.predicates ?? []);
        return { key: kind, color: colorOf(kind), value: claims, title: `${kind}: ${claims.toLocaleString()}` };
      }),
    },
    {
      label: "Sources",
      value: sourcesKnown ? sourceFacts.size : null,
      to: "/flow",
      title: "Logical sources: the Evidence flow",
      dots: [...sourceFacts].map(([id, facts]) => ({ key: id, color: FRESHNESS[facts.freshness].color, value: 1, title: `${id}: ${FRESHNESS[facts.freshness].word}` })),
    },
    {
      label: "Lines",
      value: o.artifacts?.lines ?? 0,
      to: "/lines",
      dots: (lines.data?.rows ?? []).map((row) => ({
        key: row.line,
        color: AUTHORITY_COLOR[row.authority] ?? AUTHORITY_COLOR.none,
        value: 1,
        title: `${lineName(row.line)}: ${row.authority}`,
      })),
    },
    { label: "Generations", value: o.generation, to: "/ledger", title: "Accepted generations: the Ledger", note: `latest ${formatRelative(o.accepted_at)}` },
  ];

  // -- what it knows --------------------------------------------------------------------
  const map = useMemo(() => {
    if (!kinds.data || !claimTypes.data) return null;
    const ontology = ontologyKinds(kinds.data.kinds, claimTypes.data.rows)
      .filter((k) => !isCoreIdentity(k.kind))
      .map((k) => ({ ...k, predicates: k.predicates.filter((p) => !isCoreIdentity(p.predicate)) }));
    const graph = buildTypeGraph(ontology);
    const mapKinds: MapKind[] = graph.nodes.map((n) => {
      const detail = detailOf.get(n.kind);
      return {
        kind: n.kind,
        subjects: n.subjects,
        claims: detail ? liveClaims(detail.predicates) : n.referencedOnly ? 0 : null,
        claimTypes: kindClaimTypes(detail?.predicates ?? ontology.find((k) => k.kind === n.kind)?.predicates ?? [], keys.get(n.kind)),
        referencedOnly: n.referencedOnly,
      };
    });
    const mapLinks: MapLink[] = graph.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, predicates: e.predicates.map((p) => p.predicate), label: edgeLabel(e) }));
    return { kinds: mapKinds, links: mapLinks };
  }, [kinds.data, claimTypes.data, detailOf, keys]);

  // -- where it comes from ------------------------------------------------------------
  const flow = useMemo(() => {
    if (!source.data || details.isPending || !subjectKinds.data) return null;
    return evidenceFlow({
      specs: source.data.specs,
      lines: source.data.lines,
      sources: [...sourceFacts.keys()],
      kinds: names.map((kind) => ({ kind, predicates: detailOf.get(kind)?.predicates ?? [] })),
      keys,
    });
  }, [source.data, details.isPending, subjectKinds.data, sourceFacts, names, detailOf, keys]);

  // -- how it stands --------------------------------------------------------------------
  const trustRows: TrustRow[] = modelKinds
    .filter((k) => k.subjects > 0)
    .map((k) => ({ kind: k.kind, mix: detailOf.has(k.kind) ? evidenceMix(detailOf.get(k.kind)!.predicates) : details.isPending ? null : evidenceMix([]) }));
  const counts = o.artifacts?.claims;
  const states: ClaimStateCount[] = [
    { key: "accepted", word: "Accepted", count: counts?.accepted ?? 0, color: "#a3a094", to: "/ledger" },
    { key: "conflicted", word: "Conflicted", count: counts?.conflicted ?? 0, color: "#ff6961", to: "/beliefs?tab=contested" },
    { key: "overturned", word: "Overturned", count: counts?.overturned ?? 0, color: "#58554b", to: "/ledger" },
    { key: "ineligible", word: "Ineligible", count: counts?.ineligible ?? 0, color: "#403d34", to: "/beliefs?tab=stale" },
    { key: "retired", word: "Retired", count: counts?.retired ?? 0, color: "#2f2d27", to: "/ledger" },
  ].filter((s) => s.count > 0 || s.key === "accepted" || s.key === "conflicted");

  // -- how it grew ----------------------------------------------------------------------
  const head = o.generation;
  const lo = Math.max(0, head - GROWTH_WINDOW + 1);
  const sequences = useMemo(() => growthSequences(lo, head), [lo, head]);
  const earlier = useMemo(() => sequences.filter((s) => s !== head), [sequences, head]);
  const growth = useGrowthPoints(earlier);
  const points = useMemo<GrowthPoint[] | null>(() => {
    if (growth.pending || details.isPending) return null;
    const byKind = new Map<string, number>();
    for (const [kind, detail] of detailOf) if (detail.subjects > 0) byKind.set(kind, liveClaims(detail.predicates));
    return [...growth.points.filter((p): p is GrowthPoint => p !== null), { sequence: head, acceptedAt: o.accepted_at, byKind }];
  }, [growth.pending, growth.points, details.isPending, detailOf, head, o.accepted_at]);
  const markers = useMemo(() => growthMarkers(generations.data?.generations ?? [], lo, head), [generations.data, lo, head]);

  return (
    <>
      <Hero stats={stats} instance={o.instance} kits={kitList} since={firstAccepted(generations.data?.generations ?? [])} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-7">
          <Panel
            title="What it knows"
            description={ABOUT.knows}
            meta={map ? <MapMeta kinds={map.kinds.filter((k) => !k.referencedOnly).length} links={map.links.length} prefix={short.prefix} /> : undefined}
          >
            {(kinds.isPending || claimTypes.isPending) && <LoadState />}
            {(kinds.error ?? claimTypes.error) && <LoadState error={kinds.error ?? claimTypes.error} />}
            {map && (map.kinds.length === 0 ? <EmptyState>No kinds declared yet</EmptyState> : <KnowledgeMap kinds={map.kinds} links={map.links} colorOf={colorOf} label={short.label} />)}
          </Panel>
        </div>
        <div className="min-w-0 xl:col-span-5">
          <Panel title="How it stands" description={ABOUT.stands} meta={counts ? <span>{(counts.accepted ?? 0).toLocaleString()} live</span> : undefined}>
            {kinds.isPending && <LoadState />}
            {details.error && <LoadState error={details.error} />}
            {kinds.data &&
              (trustRows.length === 0 ? (
                <EmptyState>No Subjects yet</EmptyState>
              ) : (
                <TrustBars rows={trustRows} states={states} waiting={o.attention?.open_proposals ?? null} colorOf={colorOf} label={short.label} />
              ))}
          </Panel>
        </div>
      </div>
      <Panel
        title="Where it comes from"
        description={ABOUT.from}
        meta={flow ? <Meta parts={[[flow.nodes.filter((n) => n.role === "source").length, "sources"], [flow.nodes.filter((n) => n.role === "line").length, "Lines"]]} /> : undefined}
      >
        {!flow && !(source.error ?? details.error) && <LoadState />}
        {(source.error ?? landings.error) && <LoadState error={source.error ?? landings.error} />}
        {flow &&
          (flow.links.length === 0 ? (
            <EmptyState>No live Claims yet</EmptyState>
          ) : (
            <EvidenceSankey flow={flow} sources={sourceFacts} authority={authority} colorOf={colorOf} label={short.label} />
          ))}
      </Panel>
      <Panel title="How it grew" description={ABOUT.grew} meta={<span title="The generations this chart covers">{`g${lo}–g${head}`}</span>}>
        {!points && <LoadState />}
        {growth.failed > 0 && <EmptyState>{`${growth.failed} of ${earlier.length} generations could not be read; the chart skips them.`}</EmptyState>}
        {points && <GrowthChart points={points} lo={lo} head={head} markers={markers} colorOf={colorOf} label={short.label} />}
      </Panel>
    </>
  );
}

function MapMeta({ kinds, links, prefix }: { kinds: number; links: number; prefix: string }) {
  return (
    <span className="inline-flex gap-3">
      <Meta parts={[[kinds, kinds === 1 ? "kind" : "kinds"], [links, links === 1 ? "link" : "links"]]} />
      {prefix && (
        <span>
          names under <span className="font-mono text-zinc-300">{prefix}</span>
        </span>
      )}
    </span>
  );
}

function Meta({ parts }: { parts: [number, ReactNode][] }) {
  return (
    <span className="inline-flex gap-3">
      {parts.map(([n, word], i) => (
        <span key={i}>
          <span className="font-mono text-zinc-300">{n.toLocaleString()}</span> {word}
        </span>
      ))}
    </span>
  );
}
