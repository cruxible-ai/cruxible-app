/**
 * Hand-authored kind-table pages: the compact `query` (claims: true) each
 * kind page sends, with a contested slot, stale, uncovered and contradicted
 * values, a many-valued field and Subject-valued cells; and security.package,
 * a kind past one page, with the daemon-ordered and daemon-filtered pages the
 * smoke and the screenshots ask for. Requests are built with the app's own
 * builders (kindQuery, selectFields), so keys match what the app sends.
 */
import { defineFixture, type RecordedFixture } from "../fixture";
import { KIND_PAGE, kindQuery, queryBody, type QueryArgs } from "@/api/requests";
import type { Schemas } from "@/api/schemas";
import { selectFields } from "@/lib/kind-table";
import { COORDINATE, NOW } from "./world";
import { PACKAGES, type PackageRow } from "./package-kind";

type Column = Schemas["QueryColumn"];
type Row = Record<string, unknown>;

const clm = (n: number) => `CLM-${n.toString(16).padStart(32, "0")}`;

interface CellClaimSpec {
  claim: string;
  value: unknown;
  verdict?: string;
  status?: string;
  role?: string;
}

/** One Subject row: values first, then its row flags and each cell's Claims. */
function row(subject: string, cells: Record<string, CellClaimSpec[] | null>, columns: Column[], flags: string[] = []): Row {
  const out: Row = { subject, subject_id: subject.split("/").slice(1).join("/") };
  const claims: Record<string, unknown[]> = {};
  for (const column of columns) {
    const specs = cells[column.name] ?? [];
    const values = [...new Set(specs.map((spec) => JSON.stringify(spec.value)))].map((text) => JSON.parse(text) as unknown);
    out[column.name] = column.cardinality === "many" || values.length > 1 ? values : (values[0] ?? null);
    if (specs.length > 0) {
      claims[column.name] = specs.map((spec) => ({
        claim: spec.claim,
        value: spec.value,
        verdict: spec.verdict ?? "supported",
        status: spec.status ?? "accepted",
        role: spec.role ?? "normative",
      }));
    }
  }
  out.flags = flags;
  out.claims = claims;
  return out;
}

function page(
  kind: string,
  columns: Column[],
  rows: Row[],
  more: { next_cursor?: string; remaining?: number } = {},
): Schemas["QueryResultRecord"] {
  return {
    tag: "playbill-query-page-v1",
    kind,
    columns,
    rows: rows as Schemas["QueryResultRecord"]["rows"],
    truncated: more.next_cursor !== undefined,
    next_cursor: more.next_cursor ?? null,
    remaining: more.remaining ?? 0,
    capped: [],
    notes: [],
    receipt: { mode: "inline", spec_digest: "sha256:" + "4".repeat(64), coordinate: COORDINATE, evaluation_time: NOW },
  };
}

function queryFixture(args: QueryArgs, response: Schemas["QueryResultRecord"]): RecordedFixture {
  return defineFixture({ method: "post", path: "/api/v1/{instance_id}/query", body: queryBody(args, COORDINATE), response });
}

const col = (kind: string, name: string, type: string, extra: Partial<Column> = {}): Column => ({
  name,
  predicate: `${kind}.${name}`,
  type,
  members: null,
  cardinality: "one",
  ...extra,
});

// -- security.assessment: a contested status, an uncovered one ----------------

const A = "security.assessment";
const A_SELECT = selectFields([`${A}.release`, `${A}.status`, `${A}.vulnerability`], [`${A}.release_id`, `${A}.cve_id`]).select;
const A_COLUMNS = [
  col(A, "release", "subject:security.release"),
  col(A, "status", "enum", { members: ["affected", "not_affected", "under_investigation"] }),
  col(A, "vulnerability", "subject:security.vulnerability"),
];
const ASSESSMENTS = [
  row(
    `${A}/rel-1-cve-2024-3094`,
    {
      release: [{ claim: clm(0xa1), value: "security.release/rel-1" }],
      status: [
        { claim: clm(0xa2), value: "affected", status: "conflicted", role: "observation" },
        { claim: clm(0xa3), value: "not_affected", status: "conflicted", role: "observation" },
      ],
      vulnerability: [{ claim: clm(0xa4), value: "security.vulnerability/cve-2024-3094" }],
    },
    A_COLUMNS,
    ["contested"],
  ),
  row(
    `${A}/rel-2-cve-2024-6387`,
    {
      release: [{ claim: clm(0xa5), value: "security.release/rel-2" }],
      status: [{ claim: clm(0xa6), value: "under_investigation", verdict: "uncovered", role: "observation" }],
      vulnerability: [{ claim: clm(0xa7), value: "security.vulnerability/cve-2024-6387" }],
    },
    A_COLUMNS,
    ["uncovered"],
  ),
];

// -- security.vulnerability: stale, contradicted, a many-valued field --------

const V = "security.vulnerability";
const V_SELECT = selectFields([`${V}.cve_id`, `${V}.kev_listed`, `${V}.related`], [`${V}.cve_id`]).select;
const V_COLUMNS = [
  col(V, "cve_id", "string"),
  col(V, "kev_listed", "boolean"),
  col(V, "related", "subject:security.vulnerability", { cardinality: "many" }),
];
const VULNERABILITIES = [
  row(
    `${V}/cve-2021-44228`,
    {
      cve_id: [{ claim: clm(0xf1), value: "CVE-2021-44228" }],
      kev_listed: [{ claim: clm(0xf2), value: true, verdict: "contradicted", role: "observation" }],
      related: [
        { claim: clm(0xf3), value: `${V}/cve-2024-3094` },
        { claim: clm(0xf4), value: `${V}/cve-2024-6387` },
      ],
    },
    V_COLUMNS,
    ["contradicted"],
  ),
  row(
    `${V}/cve-2024-3094`,
    {
      cve_id: [{ claim: clm(0xb1), value: "CVE-2024-3094" }],
      kev_listed: [{ claim: clm(0xb2), value: true, verdict: "stale", role: "observation" }],
      related: [{ claim: clm(0xb3), value: `${V}/cve-2024-6387` }],
    },
    V_COLUMNS,
    ["stale"],
  ),
  row(
    `${V}/cve-2024-6387`,
    {
      cve_id: [{ claim: clm(0xc1), value: "CVE-2024-6387" }],
      kev_listed: [{ claim: clm(0xc2), value: false, role: "observation" }],
      related: null,
    },
    V_COLUMNS,
  ),
];

// -- security.release and security.product -----------------------------------

const R = "security.release";
const R_COLUMNS = [col(R, "product", "subject:security.product")];
const RELEASES = [
  row(`${R}/rel-1`, { product: [{ claim: clm(0xd1), value: "security.product/xz-utils" }] }, R_COLUMNS),
  row(`${R}/rel-2`, { product: [{ claim: clm(0xd2), value: "security.product/xz-utils" }] }, R_COLUMNS),
];
const P = "security.product";
const P_COLUMNS = [col(P, "name", "string")];

// -- security.package: 130 Subjects, past one page ---------------------------

const K = "security.package";
const K_SELECT = selectFields(
  ["advisories", "ecosystem", "maintained", "name", "version", "weekly_downloads"].map((name) => `${K}.${name}`),
  [`${K}.name`],
).select;
const K_COLUMNS = [
  col(K, "name", "string"),
  col(K, "advisories", "subject:security.vulnerability", { cardinality: "many" }),
  col(K, "ecosystem", "enum", { members: ["npm", "pypi", "maven", "cargo"] }),
  col(K, "maintained", "boolean"),
  col(K, "version", "string"),
  col(K, "weekly_downloads", "integer"),
];

function packageRow(p: PackageRow, i: number): Row {
  const base = 0x10000 + i * 16;
  const stale = i % 13 === 0;
  return row(
    `${K}/${p.id}`,
    {
      name: [{ claim: clm(base + 1), value: p.name }],
      advisories: p.advisories.map((value, j) => ({ claim: clm(base + 2 + j), value })),
      ecosystem: [{ claim: clm(base + 5), value: p.ecosystem }],
      maintained: [{ claim: clm(base + 6), value: p.maintained, role: "observation" }],
      version: [{ claim: clm(base + 7), value: p.version, role: "observation", ...(stale ? { verdict: "stale" } : {}) }],
      weekly_downloads: [{ claim: clm(base + 8), value: p.weeklyDownloads, role: "observation" }],
    },
    K_COLUMNS,
    stale ? ["stale"] : [],
  );
}
const PACKAGE_ROWS = PACKAGES.map(packageRow);
const byDownloads = (dir: 1 | -1) =>
  [...PACKAGES.keys()].sort((a, b) => dir * (PACKAGES[a]!.weeklyDownloads - PACKAGES[b]!.weeklyDownloads)).map((i) => PACKAGE_ROWS[i]!);

/** Two pages (100 + 30) of an ordered answer, the second behind `cursor`. */
function paged(args: Omit<Parameters<typeof kindQuery>[0], "kind" | "select" | "cursor">, rows: Row[], cursor: string): RecordedFixture[] {
  const first = rows.slice(0, KIND_PAGE);
  const rest = rows.slice(KIND_PAGE);
  if (rest.length === 0) return [queryFixture(kindQuery({ kind: K, select: K_SELECT, ...args }), page(K, K_COLUMNS, first))];
  return [
    queryFixture(kindQuery({ kind: K, select: K_SELECT, ...args }), page(K, K_COLUMNS, first, { next_cursor: cursor, remaining: rest.length })),
    queryFixture(kindQuery({ kind: K, select: K_SELECT, ...args, cursor }), page(K, K_COLUMNS, rest)),
  ];
}

const pypi = PACKAGES.flatMap((p, i) => (p.ecosystem === "pypi" ? [i] : []));

export default [
  queryFixture(kindQuery({ kind: A, select: A_SELECT }), page(A, A_COLUMNS, ASSESSMENTS)),
  queryFixture(kindQuery({ kind: V, select: V_SELECT }), page(V, V_COLUMNS, VULNERABILITIES)),
  queryFixture(kindQuery({ kind: R, select: [`${R}.product`] }), page(R, R_COLUMNS, RELEASES)),
  queryFixture(
    kindQuery({ kind: P, select: [`${P}.name`] }),
    page(P, P_COLUMNS, [row(`${P}/xz-utils`, { name: [{ claim: clm(0xe1), value: "xz-utils" }] }, P_COLUMNS)]),
  ),
  // the kind's own order (subject_id), page by page
  ...paged({}, PACKAGE_ROWS, "c-pkg-base-100"),
  // a header click: weekly_downloads ascending, then descending, ordered by the daemon over all 130
  ...paged({ orderBy: [`${K}.weekly_downloads`] }, byDownloads(1), "c-pkg-downloads-asc-100"),
  ...paged({ orderBy: [`-${K}.weekly_downloads`] }, byDownloads(-1), "c-pkg-downloads-desc-100"),
  // ecosystem picked to pypi, filtered by the daemon; and the same sorted by downloads
  ...paged({ where: [{ field: `${K}.ecosystem`, in: ["pypi"] }] }, pypi.map((i) => PACKAGE_ROWS[i]!), "c-pkg-pypi-100"),
  ...paged(
    { where: [{ field: `${K}.ecosystem`, in: ["pypi"] }], orderBy: [`-${K}.weekly_downloads`] },
    [...pypi].sort((a, b) => PACKAGES[b]!.weeklyDownloads - PACKAGES[a]!.weeklyDownloads).map((i) => PACKAGE_ROWS[i]!),
    "c-pkg-pypi-desc-100",
  ),
] satisfies RecordedFixture[];
