// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 165608e3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "kind": "security.vulnerability"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-21T19:49:19.992406Z",
    "kind_detail": {
      "kind": "security.vulnerability",
      "subjects": 18,
      "identity": "keys: security.vulnerability.cve_id (unique)",
      "evidence": [
        "security.kev-http-v1",
        "security.observation-output-v1"
      ],
      "predicates": [
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
          "live_claims": 18,
          "subjects_with_value": 18
        },
        {
          "name": "epss_percentile",
          "predicate": "security.vulnerability.epss_percentile",
          "cardinality": "one",
          "type": "string",
          "description": "The EPSS score's percentile among all scored CVEs, as the daily file states it.",
          "evidence": [
            "security.epss-daily-v1"
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
          "path": "claim-types/security.vulnerability/epss_percentile.json",
          "live_claims": 7,
          "subjects_with_value": 7
        },
        {
          "name": "epss_score",
          "predicate": "security.vulnerability.epss_score",
          "cardinality": "one",
          "type": "string",
          "description": "FIRST's EPSS probability of exploitation in the next 30 days, as the daily file states it.",
          "evidence": [
            "security.epss-daily-v1"
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
          "path": "claim-types/security.vulnerability/epss_score.json",
          "live_claims": 7,
          "subjects_with_value": 7
        },
        {
          "name": "kev_cwes",
          "predicate": "security.vulnerability.kev_cwes",
          "cardinality": "many",
          "type": "string",
          "description": "A CWE identifier the KEV catalog lists for the vulnerability (cwes).",
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
          "path": "claim-types/security.vulnerability/kev_cwes.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "kev_date_added",
          "predicate": "security.vulnerability.kev_date_added",
          "cardinality": "one",
          "type": "string",
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
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.vulnerability/kev_date_added.json",
          "live_claims": 5,
          "subjects_with_value": 5
        },
        {
          "name": "kev_due_date",
          "predicate": "security.vulnerability.kev_due_date",
          "cardinality": "one",
          "type": "string",
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
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.vulnerability/kev_due_date.json",
          "live_claims": 5,
          "subjects_with_value": 5
        },
        {
          "name": "kev_listed",
          "predicate": "security.vulnerability.kev_listed",
          "cardinality": "one",
          "type": "boolean",
          "description": "Whether the CISA Known Exploited Vulnerabilities catalog lists the vulnerability.",
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
          "live_claims": 16,
          "subjects_with_value": 16
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
          "live_claims": 5,
          "subjects_with_value": 5
        },
        {
          "name": "title",
          "predicate": "security.vulnerability.title",
          "cardinality": "one",
          "type": "string",
          "description": "The vulnerability's title as a retained source states it.",
          "evidence": [
            "security.cve-record-http-v1",
            "security.kev-http-v1"
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
          "evidence": [
            "security.cve-record-http-v1",
            "security.kev-http-v1"
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
          "path": "claim-types/security.vulnerability/vendor_product.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "watch_reason",
          "predicate": "security.vulnerability.watch_reason",
          "cardinality": "one",
          "type": "string",
          "description": "The decision to track the vulnerability, and why. A vulnerability is tracked when it has one, or when an affected or inconclusive assessment links it to a release in inventory; a bare vulnerability Subject is tracked by nothing.",
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
          "live_claims": 5,
          "subjects_with_value": 5
        }
      ],
      "incoming": [
        "security.assessment.vulnerability"
      ],
      "sample_subject_ids": [
        "cve-2017-5638",
        "cve-2021-44228",
        "cve-2021-44832",
        "cve-2021-45046",
        "cve-2021-45105"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.vulnerability\", select=[\"cve_id\", \"epss_percentile\", \"epss_score\"], limit=10)",
      "cx.query(kind=\"security.vulnerability\", where=[{\"field\": \"kev_ransomware_use\", \"eq\": \"known\"}])",
      "cx.query(kind=\"security.vulnerability\", follow=[{\"field\": \"security.assessment.vulnerability\", \"as\": \"assessment\", \"direction\": \"reverse\"}], select=[\"assessment\"], limit=10)",
      "cx.get(\"security.vulnerability/cve-2017-5638\")"
    ]
  }
});
