// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d5837add
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "kind": "security.release"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:04:58.454785Z",
    "kind_detail": {
      "kind": "security.release",
      "subjects": 4,
      "identity": "keys: security.release.product_name, security.release.version (unique)",
      "predicates": [
        {
          "name": "component",
          "predicate": "security.release.component",
          "cardinality": "many",
          "type": "string",
          "description": "A component of the release, as its package URL with version (purl@version), observed in an SBOM; for a runtime a scan observed running, the runtime's own purl (OSV decides distro builds by it).",
          "evidence": [
            "security.file-erasable-v1",
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.release/component.json",
          "live_claims": 3,
          "subjects_with_value": 1
        },
        {
          "name": "osv_coverage",
          "predicate": "security.release.osv_coverage",
          "cardinality": "one",
          "type": "string",
          "description": "Whether OSV answered for every component of the release, as the OSV query Capture shows: complete (N of N components answered), or partial with how many it answered, the purl types it does not index (brew, generic: never asked, since OSV's empty answer there would read as no advisories) and how many went unanswered. What OSV indexes is its own word (its ecosystems.txt, captured beside every query) read through the kit's purl type map. An empty OSV answer is a negative only under complete coverage. It is bound to the exact component set OSV answered for (set: 16 hex of the sha256 of the sorted component purls): another set, even of the same size, is unanswered until OSV answers again. Components the SBOM lists without a purl (unidentified) keep it partial.",
          "evidence": [
            "security.fetched-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.release/osv_coverage.json",
          "live_claims": 1,
          "subjects_with_value": 1
        },
        {
          "name": "product",
          "predicate": "security.release.product",
          "cardinality": "one",
          "type": "subject:security.product",
          "description": "The product this release is a version of.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-v1"
          ],
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.release/product.json",
          "live_claims": 1,
          "subjects_with_value": 1
        },
        {
          "name": "product_alias",
          "predicate": "security.release.product_alias",
          "cardinality": "many",
          "type": "string",
          "description": "Another name the release's product goes by in vulnerability records, as an analyst states it citing evidence (a workspace file retained by security.evidence-acquire: the formula, the project page): vendor/product as a CVE record's affected entry names it (cli/cli for a Homebrew gh release), a package URL without version (pkg:golang/github.com/cli/cli/v2), a repository URL (https://github.com/cli/cli) or a CPE prefix (cpe:2.3:a:github:cli). security.cve-applicability matches a record by it as by the release's own name; re-acquire the record after stating it.",
          "evidence": [
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.release/product_alias.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "product_name",
          "predicate": "security.release.product_name",
          "cardinality": "one",
          "type": "string",
          "description": "The product's name; with version, the release's key. A release a runtime scan observed is named by its purl's whole namespace and name (debian/php8.2, github.com/cli/cli/v2), never a last segment.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.release/product_name.json",
          "live_claims": 4,
          "subjects_with_value": 4
        },
        {
          "name": "unidentified_components",
          "predicate": "security.release.unidentified_components",
          "cardinality": "one",
          "type": "integer",
          "description": "How many components the release's SBOM lists without a package URL with a version (an operating-system component too): what they are is unknown, OSV is never asked about them, so the release's OSV coverage stays partial and no negative rests on OSV's silence. Restated (revised) when a later SBOM of the release counts differently.",
          "evidence": [
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.release/unidentified_components.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "version",
          "predicate": "security.release.version",
          "cardinality": "one",
          "type": "string",
          "description": "The release's version string; with product_name, the release's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.release"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.release/version.json",
          "live_claims": 4,
          "subjects_with_value": 4
        }
      ],
      "incoming": [
        "security.artifact.release",
        "security.assessment.release",
        "security.asset.installs",
        "security.asset.runs",
        "security.finding.affects",
        "security.remediation.target_release"
      ],
      "sample_subject_ids": [
        "cruxible--0.3.0",
        "cruxible--0.3.1",
        "cruxible--0.3.2",
        "gate-app--1.0.0"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.release\", select=[\"component\", \"osv_coverage\", \"product\"], limit=10)",
      "cx.query(kind=\"security.release\", follow=[{\"field\": \"security.artifact.release\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.release/cruxible--0.3.0\")"
    ]
  }
});
