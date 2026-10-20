// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 37cbca52
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 50,
          "git_oid": "36764557ad52",
          "accepted": "2026-10-19T21:47:45.436923Z",
          "actor": "gate-owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:13699ace8694",
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@v0.3.2:src/cruxible_core/kit_distribution/manifest.json at d5241395edd4: the manifest declares agent-operation-0.3.2.tar.gz as sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b.",
            "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6",
            "terminal": "propose"
          }
        }
      ],
      "events": [
        {
          "field": "declared_sha256",
          "predicate": "security.artifact.declared_sha256",
          "claim": "CLM-091ae7da5940fd85d4b8d852f407029e",
          "sequence": 50,
          "git_oid": "36764557ad52",
          "accepted": "2026-10-19T21:47:45.436923Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@v0.3.2:src/cruxible_core/kit_distribution/manifest.json at d5241395edd4: the manifest declares agent-operation-0.3.2.tar.gz as sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b.",
            "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6",
            "terminal": "propose"
          },
          "value": "sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b",
          "change": "stated"
        },
        {
          "field": "target_ref",
          "predicate": "security.artifact.target_ref",
          "claim": "CLM-101f30bf11587e2ccf791fe27f376bbe",
          "sequence": 50,
          "git_oid": "36764557ad52",
          "accepted": "2026-10-19T21:47:45.436923Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.repo-parse run RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6 terminal propose\n\n24 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda"
          },
          "value": "github_release/cruxible-ai/cruxible",
          "change": "stated"
        },
        {
          "field": "name",
          "predicate": "security.artifact.name",
          "claim": "CLM-92d552d36719072cc59cb34f7f4aa520",
          "sequence": 50,
          "git_oid": "36764557ad52",
          "accepted": "2026-10-19T21:47:45.436923Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.repo-parse run RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6 terminal propose\n\n24 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda"
          },
          "value": "v0.3.2/agent-operation-0.3.2.tar.gz",
          "change": "stated"
        },
        {
          "field": "target",
          "predicate": "security.artifact.target",
          "claim": "CLM-b01afaa7c56208ff1d7265159b576e12",
          "sequence": 50,
          "git_oid": "36764557ad52",
          "accepted": "2026-10-19T21:47:45.436923Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@v0.3.2:src/cruxible_core/kit_distribution/manifest.json at d5241395edd4: the manifest declares agent-operation-0.3.2.tar.gz as sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b.",
            "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6",
            "terminal": "propose"
          },
          "value": "security.target/github-release--cruxible-ai-cruxible",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-20T21:38:25.424034Z"
  }
});
