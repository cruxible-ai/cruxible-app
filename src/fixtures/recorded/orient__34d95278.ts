// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient aae27734
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
    "kind": "security.vulnerability"
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
    "evaluation_time": "2026-10-26T19:05:02.956374Z",
    "kind_detail": {
      "kind": "security.vulnerability",
      "subjects": 14,
      "identity": "keys: security.vulnerability.cve_id (unique)",
      "evidence": [
        "security.fetched-v1"
      ],
      "predicates": [
        {
          "name": "affected_product",
          "predicate": "security.vulnerability.affected_product",
          "cardinality": "many",
          "type": "string",
          "description": "A product the vulnerability's CVE record names as affected, named as the kit names releases (an affected entry's product, or its packageName: php, cli/cli), whether or not inventory holds it: with OSV's packages and the releases assessed affected, the products an incident's RQ1 must rule out on an asset before it answers the asset none. A release the record names by another name is matched through its product_alias.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/affected_product.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "cve_id",
          "predicate": "security.vulnerability.cve_id",
          "cardinality": "one",
          "type": "string",
          "description": "The CVE identifier; the vulnerability's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/cve_id.json",
          "live_claims": 14,
          "subjects_with_value": 14
        },
        {
          "name": "epss_percentile",
          "predicate": "security.vulnerability.epss_percentile",
          "cardinality": "one",
          "type": "string",
          "description": "The EPSS score's percentile among all scored CVEs, as the daily file states it.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/epss_percentile.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "epss_score",
          "predicate": "security.vulnerability.epss_score",
          "cardinality": "one",
          "type": "string",
          "description": "FIRST's EPSS probability of exploitation in the next 30 days, as the daily file states it.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/epss_score.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "kev_date_added",
          "predicate": "security.vulnerability.kev_date_added",
          "cardinality": "one",
          "type": "string",
          "description": "The date CISA added the vulnerability to the KEV catalog (dateAdded).",
          "evidence": [
            "security.fetched-v1",
            "security.observation-output-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/kev_date_added.json",
          "live_claims": 2,
          "subjects_with_value": 2
        },
        {
          "name": "kev_due_date",
          "predicate": "security.vulnerability.kev_due_date",
          "cardinality": "one",
          "type": "string",
          "description": "The KEV remediation due date for federal agencies (dueDate).",
          "evidence": [
            "security.fetched-v1",
            "security.observation-output-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/kev_due_date.json",
          "live_claims": 2,
          "subjects_with_value": 2
        },
        {
          "name": "kev_listed",
          "predicate": "security.vulnerability.kev_listed",
          "cardinality": "one",
          "type": "boolean",
          "description": "Whether the CISA Known Exploited Vulnerabilities catalog lists the vulnerability.",
          "evidence": [
            "security.fetched-v1",
            "security.observation-output-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/kev_listed.json",
          "live_claims": 14,
          "subjects_with_value": 14
        },
        {
          "name": "kev_ransomware_use",
          "predicate": "security.vulnerability.kev_ransomware_use",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "known",
            "unknown"
          ],
          "description": "Whether KEV reports known ransomware campaign use (knownRansomwareCampaignUse).",
          "evidence": [
            "security.fetched-v1",
            "security.observation-output-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/kev_ransomware_use.json",
          "live_claims": 2,
          "subjects_with_value": 2
        },
        {
          "name": "package",
          "predicate": "security.vulnerability.package",
          "cardinality": "many",
          "type": "string",
          "description": "A package OSV's records say the vulnerability affects, as a package URL without version (pkg:deb/debian/php8.2, pkg:pypi/jinja2): OSV knows the CVE. A release whose components OSV answered in full and that holds none of these packages is not affected (an incident's RQ1 reads it none, citing both); with none stated, OSV's silence decides nothing.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/package.json",
          "live_claims": 21,
          "subjects_with_value": 14
        },
        {
          "name": "title",
          "predicate": "security.vulnerability.title",
          "cardinality": "one",
          "type": "string",
          "description": "The vulnerability's title as a retained source states it.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/title.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "vendor_product",
          "predicate": "security.vulnerability.vendor_product",
          "cardinality": "one",
          "type": "string",
          "description": "The affected vendor and product as a retained source states it.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/vendor_product.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "watch_reason",
          "predicate": "security.vulnerability.watch_reason",
          "cardinality": "one",
          "type": "string",
          "description": "The decision to track the vulnerability, and why. A vulnerability is tracked when it has one, when an affected or inconclusive assessment links it to a release in inventory, or when an incident responds to it; a bare vulnerability Subject is tracked by nothing.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.vulnerability"
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
          "path": "claim-types/security.vulnerability/watch_reason.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.assessment.vulnerability",
        "security.finding.vulnerability",
        "security.incident.vulnerability"
      ],
      "sample_subject_ids": [
        "cve-2021-44228",
        "cve-2021-44832",
        "cve-2021-45046",
        "cve-2021-45105",
        "cve-2024-34064"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.vulnerability\", select=[\"affected_product\", \"cve_id\", \"epss_percentile\"], limit=10)",
      "cx.query(kind=\"security.vulnerability\", where=[{\"field\": \"kev_ransomware_use\", \"eq\": \"known\"}])",
      "cx.query(kind=\"security.vulnerability\", follow=[{\"field\": \"security.assessment.vulnerability\", \"as\": \"assessment\", \"direction\": \"reverse\"}], select=[\"assessment\"], limit=10)",
      "cx.get(\"security.vulnerability/cve-2021-44228\")"
    ]
  }
});
