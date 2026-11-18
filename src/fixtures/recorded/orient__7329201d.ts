// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 2a785617
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
    "kind": "security.occurrence"
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
    "proposed_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-08T19:47:55.273154Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "kind_detail": {
      "kind": "security.occurrence",
      "subjects": 3,
      "identity": "keys: security.occurrence.inventory: subject<security.inventory>, security.occurrence.component: subject<security.component> (unique)",
      "evidence": [
        "playbill.coordinator-self-source-v1"
      ],
      "predicates": [
        {
          "name": "component",
          "predicate": "security.occurrence.component",
          "cardinality": "one",
          "type": "subject<security.component>",
          "description": "The component this occurrence places in its inventory; a key part.",
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
          "live_claims": 3,
          "subjects_with_value": 3,
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
          "live_claims": 3,
          "subjects_with_value": 3,
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
          "live_claims": 3,
          "subjects_with_value": 3,
          "evidence_counts": {
            "admitted": 3,
            "own_word": 0,
            "unmet": 0
          }
        }
      ],
      "incoming": [
        "security.app_exposure.occurrence"
      ],
      "sample_subject_ids": [
        "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.occurrence\", select=[\"component\", \"inventory\", \"scope\"], limit=10)",
      "cx.query(kind=\"security.occurrence\", where=[{\"field\": \"scope\", \"eq\": \"required\"}])",
      "cx.query(kind=\"security.occurrence\", follow=[{\"field\": \"security.app_exposure.occurrence\", \"as\": \"app_exposure\", \"direction\": \"reverse\"}], select=[\"app_exposure\"], limit=10)",
      "cx.get(\"security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1\")"
    ]
  }
});
