/**
 * security.package: a hand-authored kind with more Subjects than one
 * kind-table page (130 against a page of 100), so the kind table pushes its
 * sort and filters to the daemon. Plain data (no world imports): world.ts
 * declares its ClaimTypes and count, kinds.ts serves its query pages.
 */
import type { RecordedFixture } from "../fixture";
import type { OrientPredicate } from "@/api/schemas";

export const PACKAGE_COUNT = 130;

const ECOSYSTEMS = ["npm", "pypi", "maven", "cargo"] as const;
const WORDS = ["lib", "core", "http", "yaml", "json", "log", "auth", "cli", "tls", "zip"] as const;

type Counted = OrientPredicate & { live_claims: number; subjects_with_value: number };

const claimType = (name: string, rest: Partial<OrientPredicate>, counts: [number, number]): Counted => ({
  name,
  predicate: `security.package.${name}`,
  cardinality: "one",
  type: "string",
  evidence_requirement: "none",
  subject_kinds: ["security.package"],
  roles: ["normative"],
  default_role: "normative",
  revision_evidence: "replace",
  kit: "security",
  ...rest,
  live_claims: counts[0],
  subjects_with_value: counts[1],
});

export interface PackageRow {
  id: string;
  name: string;
  ecosystem: (typeof ECOSYSTEMS)[number];
  version: string;
  weeklyDownloads: number;
  maintained: boolean;
  advisories: string[];
}

/** The 130 packages, in subject_id order. */
export const PACKAGES: PackageRow[] = Array.from({ length: PACKAGE_COUNT }, (_, i) => {
  const id = `pkg-${String(i).padStart(3, "0")}`;
  return {
    id,
    name: `${WORDS[i % WORDS.length]}-${WORDS[(i * 7 + 3) % WORDS.length]}-${i}`,
    ecosystem: ECOSYSTEMS[(i * 3) % ECOSYSTEMS.length]!,
    version: `${1 + (i % 4)}.${(i * 5) % 11}.${i % 7}`,
    weeklyDownloads: ((i * 7919) % 100_000) + 17,
    maintained: i % 5 !== 0,
    advisories:
      i % 9 === 0
        ? ["security.vulnerability/cve-2024-3094", "security.vulnerability/cve-2024-6387"]
        : i % 4 === 0
          ? ["security.vulnerability/cve-2021-44228"]
          : [],
  };
});

export const PACKAGE_CLAIM_TYPES: Counted[] = [
  claimType("name", { description: "The package name in its registry." }, [PACKAGE_COUNT, PACKAGE_COUNT]),
  claimType(
    "ecosystem",
    { type: "enum", members: [...ECOSYSTEMS], description: "The registry the package is published to." },
    [PACKAGE_COUNT, PACKAGE_COUNT],
  ),
  claimType("version", { description: "The newest version in use." }, [PACKAGE_COUNT, PACKAGE_COUNT]),
  claimType("weekly_downloads", { type: "integer", description: "Registry downloads in the last week." }, [PACKAGE_COUNT, PACKAGE_COUNT]),
  claimType("maintained", { type: "boolean", description: "A release in the last year." }, [PACKAGE_COUNT, PACKAGE_COUNT]),
  claimType(
    "advisories",
    { type: "subject:security.vulnerability", cardinality: "many", description: "Vulnerabilities published against it." },
    [PACKAGES.reduce((n, p) => n + p.advisories.length, 0), PACKAGES.filter((p) => p.advisories.length > 0).length],
  ),
];

const fixtures: RecordedFixture[] = [];
export default fixtures;
