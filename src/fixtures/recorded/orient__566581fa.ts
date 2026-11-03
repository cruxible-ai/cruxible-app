// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 603a3746
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
    "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
    "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
    "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
    "surface": "sdk",
    "kind": "security.vulnerability"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_d8e6dcb48e6a4d0d",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "generation": 10,
    "accepted_at": "2026-11-03T00:58:54.573196Z",
    "evaluation_time": "2026-11-03T02:20:48.230626Z",
    "kind_detail": {
      "kind": "security.vulnerability",
      "subjects": 10,
      "identity": "keys: security.vulnerability.cve_id (unique)",
      "evidence": [
        "security.kev-catalog"
      ],
      "predicates": [
        {
          "name": "cve_id",
          "predicate": "security.vulnerability.cve_id",
          "cardinality": "one",
          "type": "string{pattern: \"^CVE-[0-9]{4}-[0-9]{4,}$\", max_len: 32}",
          "description": "The CVE identifier; the vulnerability's key.",
          "evidence": [
            "playbill.coordinator-self-source-v1"
          ],
          "subject_kinds": [
            "security.vulnerability"
          ],
          "roles": [
            "normative"
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/cve_id.json",
          "live_claims": 10,
          "subjects_with_value": 10
        },
        {
          "name": "epss_percentile",
          "predicate": "security.vulnerability.epss_percentile",
          "cardinality": "one",
          "type": "decimal{0..1}",
          "description": "The EPSS score's percentile among all scored CVEs (percentile).",
          "evidence": [
            "security.epss-scores"
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/epss_percentile.json",
          "live_claims": 10,
          "subjects_with_value": 10
        },
        {
          "name": "epss_score",
          "predicate": "security.vulnerability.epss_score",
          "cardinality": "one",
          "type": "decimal{0..1}",
          "description": "FIRST's EPSS probability of exploitation in the next 30 days (epss).",
          "evidence": [
            "security.epss-scores"
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/epss_score.json",
          "live_claims": 10,
          "subjects_with_value": 10
        },
        {
          "name": "epss_score_date",
          "predicate": "security.vulnerability.epss_score_date",
          "cardinality": "one",
          "type": "date",
          "description": "The date FIRST computed the EPSS score and percentile (date).",
          "evidence": [
            "security.epss-scores"
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/epss_score_date.json",
          "live_claims": 10,
          "subjects_with_value": 10
        },
        {
          "name": "kev_date_added",
          "predicate": "security.vulnerability.kev_date_added",
          "cardinality": "one",
          "type": "date",
          "description": "The date CISA added the vulnerability to the KEV catalog (dateAdded).",
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/kev_date_added.json",
          "live_claims": 8,
          "subjects_with_value": 8
        },
        {
          "name": "kev_due_date",
          "predicate": "security.vulnerability.kev_due_date",
          "cardinality": "one",
          "type": "date",
          "description": "The KEV remediation due date for federal agencies (dueDate).",
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/kev_due_date.json",
          "live_claims": 8,
          "subjects_with_value": 8
        },
        {
          "name": "kev_ransomware_use",
          "predicate": "security.vulnerability.kev_ransomware_use",
          "cardinality": "one",
          "type": "enum[\"Known\", \"Unknown\"]",
          "members": [
            "Known",
            "Unknown"
          ],
          "description": "Whether KEV reports known ransomware campaign use (knownRansomwareCampaignUse).",
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/kev_ransomware_use.json",
          "live_claims": 8,
          "subjects_with_value": 8
        },
        {
          "name": "listed_in",
          "predicate": "security.vulnerability.listed_in",
          "cardinality": "many",
          "type": "subject<security.catalog>",
          "description": "A catalog that lists the vulnerability, from the catalog's own retained document; none of a catalog means a complete read of it did not list it.",
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
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.vulnerability/listed_in.json",
          "live_claims": 10,
          "subjects_with_value": 10
        }
      ],
      "sample_subject_ids": [
        "cve-2014-0160",
        "cve-2017-0144",
        "cve-2019-0708",
        "cve-2021-26855",
        "cve-2021-44228"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.vulnerability\", select=[\"cve_id\", \"epss_percentile\", \"epss_score\"], limit=10)",
      "cx.query(kind=\"security.vulnerability\", where=[{\"field\": \"kev_ransomware_use\", \"eq\": \"Known\"}])",
      "cx.get(\"security.vulnerability/cve-2014-0160\")"
    ]
  }
});
