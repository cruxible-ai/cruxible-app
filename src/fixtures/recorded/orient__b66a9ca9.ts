// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 67c681e7
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
    "kind": "security.exposure"
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
    "evaluation_time": "2026-11-07T22:22:55.409814Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "kind_detail": {
      "kind": "security.exposure",
      "subjects": 1,
      "identity": "keys: security.exposure.component: subject<security.component>, security.exposure.vulnerability: subject<security.vulnerability> (unique)",
      "evidence": [
        "playbill.coordinator-self-source-v1"
      ],
      "predicates": [
        {
          "name": "component",
          "predicate": "security.exposure.component",
          "cardinality": "one",
          "type": "subject<security.component>",
          "description": "The component (package release) judged; a key part.",
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
          "live_claims": 1,
          "subjects_with_value": 1,
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
          "predicate": "security.exposure.vulnerability",
          "cardinality": "one",
          "type": "subject<security.vulnerability>",
          "description": "The vulnerability judged; a key part.",
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
        "pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.exposure\", select=[\"component\", \"justification\", \"vulnerability\"], limit=10)",
      "cx.query(kind=\"security.exposure\", where=[{\"field\": \"justification\", \"eq\": \"vulnerable_code_not_present\"}])",
      "cx.get(\"security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228\")"
    ]
  }
});
