// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 16ef70ff
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
    "kind": "security.app_exposure"
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
    "evaluation_time": "2026-11-07T22:22:55.374696Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "kind_detail": {
      "kind": "security.app_exposure",
      "subjects": 1,
      "identity": "keys: security.app_exposure.occurrence: subject<security.occurrence>, security.app_exposure.vulnerability: subject<security.vulnerability> (unique)",
      "evidence": [
        "playbill.coordinator-self-source-v1"
      ],
      "predicates": [
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
          "live_claims": 2,
          "subjects_with_value": 1,
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
          "live_claims": 1,
          "subjects_with_value": 1,
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
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 0,
            "own_word": 1,
            "unmet": 0
          }
        }
      ],
      "sample_subject_ids": [
        "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.app_exposure\", select=[\"justification\", \"occurrence\", \"vulnerability\"], limit=10)",
      "cx.query(kind=\"security.app_exposure\", where=[{\"field\": \"justification\", \"eq\": \"component_not_present\"}])",
      "cx.get(\"security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046\")"
    ]
  }
});
