// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 4177b319
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
    "kind": "security.component"
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
    "evaluation_time": "2026-11-07T22:22:55.338400Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "kind_detail": {
      "kind": "security.component",
      "subjects": 3,
      "identity": "keys: security.component.purl (unique)",
      "evidence": [
        "playbill.coordinator-self-source-v1"
      ],
      "predicates": [
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
          "live_claims": 9,
          "subjects_with_value": 2,
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
        "security.exposure.component",
        "security.occurrence.component"
      ],
      "sample_subject_ids": [
        "pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "pkg-maven-org.slf4j-slf4j-api-1.7.32"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.component\", select=[\"affected_by\", \"purl\"], limit=10)",
      "cx.query(kind=\"security.component\", follow=[{\"field\": \"security.exposure.component\", \"as\": \"exposure\", \"direction\": \"reverse\"}], select=[\"exposure\"], limit=10)",
      "cx.get(\"security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1\")"
    ]
  }
});
