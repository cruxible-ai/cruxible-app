// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 578db5b6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "kind": "security.vulnerability"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "accepted_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-08T19:47:55.201631Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "kind_detail": {
      "kind": "security.vulnerability",
      "subjects": 9,
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
          "live_claims": 9,
          "subjects_with_value": 9,
          "evidence_counts": {
            "admitted": 9,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
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
          "live_claims": 9,
          "subjects_with_value": 9,
          "evidence_counts": {
            "admitted": 9,
            "own_word": 0,
            "unmet": 0
          }
        }
      ],
      "incoming": [
        "security.app_exposure.vulnerability",
        "security.component.affected_by",
        "security.exposure.vulnerability"
      ],
      "sample_subject_ids": [
        "cve-2021-44228",
        "cve-2021-44832",
        "cve-2021-45046",
        "cve-2021-45105",
        "cve-2025-68161"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.vulnerability\", select=[\"cve_id\", \"epss_percentile\", \"epss_score\"], limit=10)",
      "cx.query(kind=\"security.vulnerability\", where=[{\"field\": \"kev_ransomware_use\", \"eq\": \"Known\"}])",
      "cx.query(kind=\"security.vulnerability\", follow=[{\"field\": \"security.app_exposure.vulnerability\", \"as\": \"app_exposure\", \"direction\": \"reverse\"}], select=[\"app_exposure\"], limit=10)",
      "cx.get(\"security.vulnerability/cve-2021-44228\")"
    ]
  }
});
