// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient e6b71f97
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
    "section": "claim_types",
    "limit": 500
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
    "evaluation_time": "2026-11-07T22:22:55.083027Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "claim_types",
    "claim_types": [
      {
        "name": "justification",
        "predicate": "security.app_exposure.justification",
        "cardinality": "one",
        "type": "enum[\"component_not_present\", \"vulnerable_code_not_in_execute_path\", \"vulnerable_code_cannot_be_controlled_by_adversary\", \"inline_mitigations_already_exist\"]",
        "members": [
          "component_not_present",
          "vulnerable_code_not_in_execute_path",
          "vulnerable_code_cannot_be_controlled_by_adversary",
          "inline_mitigations_already_exist"
        ],
        "description": "The VEX justification of an agent's app-level not_affected judgment: why this inventory's use of the component is not affected. It silences this occurrence only and never states the global none.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.app_exposure"
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
        "format": 11,
        "revision": 1,
        "path": "claim-types/security.app_exposure/justification.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 2,
          "unmet": 0
        }
      },
      {
        "name": "occurrence",
        "predicate": "security.app_exposure.occurrence",
        "cardinality": "one",
        "type": "subject<security.occurrence>",
        "description": "The occurrence (one inventory's component) judged; a key part.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.app_exposure"
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
        "path": "claim-types/security.app_exposure/occurrence.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "vulnerability",
        "predicate": "security.app_exposure.vulnerability",
        "cardinality": "one",
        "type": "subject<security.vulnerability>",
        "description": "The vulnerability judged; a key part.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.app_exposure"
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
        "path": "claim-types/security.app_exposure/vulnerability.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "catalog_id",
        "predicate": "security.catalog.catalog_id",
        "cardinality": "one",
        "type": "string{pattern: \"^[a-z][a-z0-9-]{0,63}$\", max_len: 64}",
        "description": "The catalog's short id, e.g. cisa-kev; the catalog's key.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.catalog"
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
        "path": "claim-types/security.catalog/catalog_id.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "affected_by",
        "predicate": "security.component.affected_by",
        "cardinality": "many",
        "type": "subject<security.vulnerability>",
        "description": "A vulnerability OSV lists for the component's exact purl@version (OSV's own version matching). None of V is an agent's package-level not_affected judgment (normative, own words), which OSV cannot override.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.osv-matches"
        ],
        "subject_kinds": [
          "security.component"
        ],
        "roles": [
          "normative",
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
        "path": "claim-types/security.component/affected_by.json",
        "evidence_counts": {
          "admitted": 8,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "purl",
        "predicate": "security.component.purl",
        "cardinality": "one",
        "type": "string{max_len: 256}",
        "description": "The component's package URL with its version (qualifiers dropped); the component's key.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.component"
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
        "path": "claim-types/security.component/purl.json",
        "evidence_counts": {
          "admitted": 3,
          "own_word": 0,
          "unmet": 0
        }
      },
      {
        "name": "component",
        "predicate": "security.exposure.component",
        "cardinality": "one",
        "type": "subject<security.component>",
        "description": "The component (package release) judged; a key part.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.exposure"
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
        "path": "claim-types/security.exposure/component.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "justification",
        "predicate": "security.exposure.justification",
        "cardinality": "one",
        "type": "enum[\"vulnerable_code_not_present\"]",
        "members": [
          "vulnerable_code_not_present"
        ],
        "description": "The VEX justification of an agent's package-level not_affected judgment, stated with affected_by none of the vulnerability on the component: the vulnerable code is not in this package release, for every inventory.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.exposure"
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
        "format": 11,
        "revision": 1,
        "path": "claim-types/security.exposure/justification.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "vulnerability",
        "predicate": "security.exposure.vulnerability",
        "cardinality": "one",
        "type": "subject<security.vulnerability>",
        "description": "The vulnerability judged; a key part.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.exposure"
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
        "path": "claim-types/security.exposure/vulnerability.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 1,
          "unmet": 0
        }
      },
      {
        "name": "inventory_id",
        "predicate": "security.inventory.inventory_id",
        "cardinality": "one",
        "type": "string{max_len: 256}",
        "description": "What one SBOM describes, named by its metadata.component purl (or, without one, by the SBOM's workspace path); the inventory's key.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.inventory"
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
        "path": "claim-types/security.inventory/inventory_id.json",
        "evidence_counts": {
          "admitted": 1,
          "own_word": 0,
          "unmet": 0
        }
      },
      {
        "name": "component",
        "predicate": "security.occurrence.component",
        "cardinality": "one",
        "type": "subject<security.component>",
        "description": "The component this occurrence places in its inventory; a key part.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.occurrence"
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
        "path": "claim-types/security.occurrence/component.json",
        "evidence_counts": {
          "admitted": 3,
          "own_word": 0,
          "unmet": 0
        }
      },
      {
        "name": "inventory",
        "predicate": "security.occurrence.inventory",
        "cardinality": "one",
        "type": "subject<security.inventory>",
        "description": "The inventory this occurrence is in; a key part.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "security.occurrence"
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
        "path": "claim-types/security.occurrence/inventory.json",
        "evidence_counts": {
          "admitted": 3,
          "own_word": 0,
          "unmet": 0
        }
      },
      {
        "name": "scope",
        "predicate": "security.occurrence.scope",
        "cardinality": "one",
        "type": "enum[\"required\", \"optional\", \"excluded\"]",
        "members": [
          "required",
          "optional",
          "excluded"
        ],
        "description": "The component's CycloneDX scope in this inventory's SBOM (required when the SBOM states none). The membership fact: live while the SBOM lists the component, retired when it no longer does.",
        "evidence": [
          "security.sbom-components"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.occurrence"
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
        "path": "claim-types/security.occurrence/scope.json",
        "evidence_counts": {
          "admitted": 3,
          "own_word": 0,
          "unmet": 0
        }
      },
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
        "evidence": [
          "security.kev-catalog"
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
        "path": "claim-types/security.vulnerability/kev_date_added.json",
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
        "evidence": [
          "security.kev-catalog"
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
        "path": "claim-types/security.vulnerability/kev_due_date.json",
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
        "evidence": [
          "security.kev-catalog"
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
        "path": "claim-types/security.vulnerability/kev_ransomware_use.json",
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
        "evidence": [
          "security.kev-catalog"
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
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 11,
        "revision": 1,
        "path": "claim-types/security.vulnerability/listed_in.json",
        "evidence_counts": {
          "admitted": 9,
          "own_word": 0,
          "unmet": 0
        }
      },
      {
        "name": "semantic.alias",
        "predicate": "semantic.alias",
        "cardinality": "many",
        "type": "string{min_len: 1, max_len: 256}",
        "description": "Another name the Subject is known by. A Subject reference that names no Subject resolves through the aliases of its kind: one match resolves, several refuse naming each.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "semantic.subject"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 11,
        "revision": 1,
        "path": "claim-types/semantic/alias.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 0,
          "unmet": 0
        }
      },
      {
        "name": "semantic.distinct_from",
        "predicate": "semantic.distinct_from",
        "cardinality": "many",
        "type": "subject<semantic.subject>",
        "description": "The object Subject is a different thing from this one, whatever names or keys they share: the duplicates audit never groups the pair.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "semantic.subject"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 11,
        "revision": 1,
        "path": "claim-types/semantic/distinct_from.json",
        "evidence_counts": {
          "admitted": 0,
          "own_word": 0,
          "unmet": 0
        }
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"ClaimType:security.app_exposure.justification\")"
    ]
  }
});
