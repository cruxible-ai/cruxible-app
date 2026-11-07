// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/proposals/sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853/review 5070cd9e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/proposals/{proposal_id}/review",
  "pathParams": {
    "proposal_id": "sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853"
  },
  "body": {
    "detail": true
  },
  "response": {
    "tag": "playbill-proposal-review-v1",
    "coordinate_kind": "provisional",
    "proposal_id": "sha256:9125597f09516aaf61a601a51ff1ec29a21f9636abde30f3dfc36c753f2f0853",
    "candidate": {
      "tag": "playbill-validated-candidate-v3",
      "candidate": {
        "tag": "playbill-candidate-v2",
        "parent_semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "candidate_manifest_root": "merkle-sha256:ba30d4e1d22746d8e52d60c8d5b8681bbdce632c440292d1e4a879a8d91a7504",
        "semantic_diff_digest": "sha256:efc8ecc2bb62c0b50a22c212230f11053762e77f1dcd598f6678744ec8417f1d",
        "scope": [
          "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
          "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
          "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
          "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
          "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
          "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json"
        ],
        "timestamp": "2026-11-07T22:22:25.657003Z"
      },
      "candidate_digest": "sha256:1b545a2eeead03fdf2d25f3da55ad92fd324b8ba3f4d032eee8a22f36116056d",
      "required_tier": "governed_write",
      "approval_requirements": [],
      "activation_policy": "snapshot",
      "closure_proof": {
        "tag": "playbill-closure-proof-v3",
        "strategy": "dependency-closure-v3",
        "paths": [
          "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
          "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
          "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
          "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
          "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
          "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json"
        ],
        "dependency_edge_root": "depgraph-sha256:48fbc6b20b33e9d2c5cdba816c27cc7a4b154523bb591875aec5d7cd75a0f3ab",
        "member_evidence_digest": "sha256:e83fa40c96cb70079b9cc7bc7f4ebc0fde30650c435d8d59ad32f89ee73ff56b"
      },
      "members": [
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
          "artifact_kind": "claim",
          "disposition": "retire",
          "predecessor_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
          "candidate_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "law_evidence_digest": "sha256:8f235a65864e26a916e2ef647d0c96a7d0771f20fe595901db2db87e7ee5d975",
          "closure_role": "invalidation",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "capture-contracts/security.osv-matches.json",
              "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "capture-contracts/security.osv-matches.json",
              "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "pin_role": "provider"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "pin_role": "provider"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            }
          ]
        },
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
          "artifact_kind": "claim",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "law_evidence_digest": "sha256:305f44bdd83cfc140a6c0944152491cafac14bb940f00b853a20acb22547aca9",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "claim-types/security.exposure/component.json",
              "target_artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ]
        },
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
          "artifact_kind": "claim",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "law_evidence_digest": "sha256:d541929b5c6fbb133ebb76d2f8a75c06a04cb7734c831eb231018d17b487ec93",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "claim-types/security.exposure/justification.json",
              "target_artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ]
        },
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
          "artifact_kind": "claim",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "law_evidence_digest": "sha256:bd81554ce9939ca573a0b944d0979913017ce6e2501f6967048468ac60d8f9a3",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "claim-types/security.exposure/vulnerability.json",
              "target_artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ]
        },
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
          "artifact_kind": "claim",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "law_evidence_digest": "sha256:7c2b7086dce0bb629594d6433325d6666305600365e8a4291ba4808108edbe6b",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            }
          ]
        },
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
          "artifact_kind": "subject",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
          "law_identifier": "playbill.subject.v1",
          "law_digest": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2",
          "law_evidence_digest": "sha256:e2dc332d0cd98aab491eb0813e202c3e7ecf6eecbba5cbb7fdaae4299f86afd9",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ]
        }
      ],
      "law_evidence": [
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "capture-contracts/security.osv-matches.json",
              "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "capture-contracts/security.osv-matches.json",
              "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "pin_role": "provider"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "pin_role": "provider"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:5ef1bd94f9fc1c94fd1d637017418d6cb2960ce2e1cf6564eee261411e14a5a2",
            "sha256:799edc689c51e2b3ab6bc57379f9ccd1888551ccf083a5f1ffc1431e964867d8",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
              "artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                  "extract_spec_digest": "sha256:1eb4d726adaef24325ef74c46394d117c285f066eed9c777312512d4705b1b22",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "",
                  "record_key": {
                    "cve_id": "CVE-2021-45046",
                    "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
                  },
                  "record_locator": "/affected/3",
                  "transform_node_ids": []
                }
              },
              "statement_digest": "sha256:77ea13e9009c3de21dff333d319a8e057cade912db45d377be473e4bd61dd861",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                  "control_domain": "security-osv-provider",
                  "current_replay_available": true,
                  "epistemic_grade": "derived",
                  "observed_at": "2026-11-07T18:00:00Z",
                  "producer": {
                    "kind": "Provider",
                    "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
                  },
                  "provenance_grade": "daemon-fetched",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:77ea13e9009c3de21dff333d319a8e057cade912db45d377be473e4bd61dd861",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "security-osv-provider"
                    ],
                    "evidence_digests": [
                      "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "derived"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "daemon-fetched"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:77ea13e9009c3de21dff333d319a8e057cade912db45d377be473e4bd61dd861",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "claim-types/security.exposure/component.json",
              "target_artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:346dce467fd39dc09c3ae891dd74fc6d8aeafe2cf2a0facc74d187a5ab5eba15",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:ec1af772576270a81143a9b272cd787a378c51a9423c6a6cbc7bbf9f13394df6",
              "artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:9fa0d222cc3eb76a70b7525f1f277fe7d5e1e5e667c3ffc7263f657aa61aa911",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:ec1af772576270a81143a9b272cd787a378c51a9423c6a6cbc7bbf9f13394df6",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:9fa0d222cc3eb76a70b7525f1f277fe7d5e1e5e667c3ffc7263f657aa61aa911",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:9fa0d222cc3eb76a70b7525f1f277fe7d5e1e5e667c3ffc7263f657aa61aa911",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "claim-types/security.exposure/justification.json",
              "target_artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:346dce467fd39dc09c3ae891dd74fc6d8aeafe2cf2a0facc74d187a5ab5eba15",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:9ae1a1ccc50d5b81ff3078ec24fb535e96f8c0226e2cb9503ff62f8d2d52168c",
              "artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:5ccdb940bf8fb125afe8327cf48d1df8b69e6a8d5ddc75319f99ab645fde09b9",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:9ae1a1ccc50d5b81ff3078ec24fb535e96f8c0226e2cb9503ff62f8d2d52168c",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:5ccdb940bf8fb125afe8327cf48d1df8b69e6a8d5ddc75319f99ab645fde09b9",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:5ccdb940bf8fb125afe8327cf48d1df8b69e6a8d5ddc75319f99ab645fde09b9",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "claim-types/security.exposure/vulnerability.json",
              "target_artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:346dce467fd39dc09c3ae891dd74fc6d8aeafe2cf2a0facc74d187a5ab5eba15",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:d01deea262f7761aef6195992dcfd2dac09787dded3118cc3a30575baefb4ff6",
              "artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:859ea408180c4b35c36861e6c63ee7aff856e62a598b9eeddb4d8b7b661a18bf",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:d01deea262f7761aef6195992dcfd2dac09787dded3118cc3a30575baefb4ff6",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:859ea408180c4b35c36861e6c63ee7aff856e62a598b9eeddb4d8b7b661a18bf",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:859ea408180c4b35c36861e6c63ee7aff856e62a598b9eeddb4d8b7b661a18bf",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:5ef1bd94f9fc1c94fd1d637017418d6cb2960ce2e1cf6564eee261411e14a5a2",
            "sha256:799edc689c51e2b3ab6bc57379f9ccd1888551ccf083a5f1ffc1431e964867d8",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
              "artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:787d3546a2c9439a3fdd6e75023ef501f5a1eb8801740eca5c2a8a7a7920a76e",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:787d3546a2c9439a3fdd6e75023ef501f5a1eb8801740eca5c2a8a7a7920a76e",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:787d3546a2c9439a3fdd6e75023ef501f5a1eb8801740eca5c2a8a7a7920a76e",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
          "law_identifier": "playbill.subject.v1",
          "law_digest": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "referrers": [],
            "verdict": "accepted"
          },
          "diagnostics": []
        }
      ],
      "law_digests": {
        "playbill.claim.v4": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "playbill.subject.v1": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2"
      },
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "candidate_digest": "sha256:1b545a2eeead03fdf2d25f3da55ad92fd324b8ba3f4d032eee8a22f36116056d",
    "parent_semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "settlement_base": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "base_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "complete_members": [
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
        "artifact_kind": "claim",
        "disposition": "retire",
        "predecessor_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
        "candidate_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence_digest": "sha256:8f235a65864e26a916e2ef647d0c96a7d0771f20fe595901db2db87e7ee5d975",
        "closure_role": "invalidation",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "capture-contracts/security.osv-matches.json",
            "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "capture-contracts/security.osv-matches.json",
            "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "claim-types/security.component/affected_by.json",
            "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "claim-types/security.component/affected_by.json",
            "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "pin_role": "provider"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "pin_role": "provider"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "subject"
          }
        ]
      },
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence_digest": "sha256:305f44bdd83cfc140a6c0944152491cafac14bb940f00b853a20acb22547aca9",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "claim-types/security.exposure/component.json",
            "target_artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ]
      },
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence_digest": "sha256:d541929b5c6fbb133ebb76d2f8a75c06a04cb7734c831eb231018d17b487ec93",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "claim-types/security.exposure/justification.json",
            "target_artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ]
      },
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence_digest": "sha256:bd81554ce9939ca573a0b944d0979913017ce6e2501f6967048468ac60d8f9a3",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "claim-types/security.exposure/vulnerability.json",
            "target_artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ]
      },
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence_digest": "sha256:7c2b7086dce0bb629594d6433325d6666305600365e8a4291ba4808108edbe6b",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "claim-types/security.component/affected_by.json",
            "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "subject"
          }
        ]
      },
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
        "artifact_kind": "subject",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
        "law_identifier": "playbill.subject.v1",
        "law_digest": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2",
        "law_evidence_digest": "sha256:e2dc332d0cd98aab491eb0813e202c3e7ecf6eecbba5cbb7fdaae4299f86afd9",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ]
      }
    ],
    "members": [
      {
        "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
        "artifact_kind": "claim",
        "disposition": "retire",
        "closure_role": "invalidation",
        "predecessor_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
        "candidate_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
        "base_semantic_artifact": {
          "artifact_format": "playbill-claim-v4",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
            ],
            "citations": [
              {
                "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                "citation_id": "sha256:c66d2949930b154520b6c649873cb853b1431bd793febb689b1d66cefaab49d6",
                "origin": "independent",
                "role": "evidence",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "procedure_evidence": {
              "law": "claim-evidence-v2",
              "node_id": "write",
              "procedure_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1",
              "template": 0,
              "value": {
                "basis": "extracted",
                "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                "extract_spec_digest": "sha256:1eb4d726adaef24325ef74c46394d117c285f066eed9c777312512d4705b1b22",
                "extractor_version": "json-pointer-v1",
                "field_path": "",
                "record_key": {
                  "cve_id": "CVE-2021-45046",
                  "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
                },
                "record_locator": "/affected/3",
                "transform_node_ids": []
              }
            },
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "observed_at": "2026-11-07T18:00:00Z",
              "subject_content_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:4749bb075129c9fbbe322d18f5232e88fa5dbc5c23594820a795faefb257bbaa",
                    "end_byte": 1550,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-37ba310abdd6002b57407a07cbead4dd"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.osv-matches"
              }
            },
            {
              "artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.component.affected_by"
              }
            },
            {
              "artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "role": "object-subject",
              "target": {
                "kind": "Subject",
                "name": "security.vulnerability/cve-2021-45046"
              }
            },
            {
              "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
              }
            },
            {
              "artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
              }
            }
          ],
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.component.affected_by"
            },
            "claim_type_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "address": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-45046.json",
                "selector": {
                  "scheme": "artifact-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "kind": "subject"
            },
            "predicate": "security.component.affected_by",
            "qualifier": null,
            "role": "observation",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-claim-v4",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
            ],
            "citations": [
              {
                "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                "citation_id": "sha256:c66d2949930b154520b6c649873cb853b1431bd793febb689b1d66cefaab49d6",
                "origin": "independent",
                "role": "evidence",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "procedure_evidence": {
              "law": "claim-evidence-v2",
              "node_id": "write",
              "procedure_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1",
              "template": 0,
              "value": {
                "basis": "extracted",
                "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                "extract_spec_digest": "sha256:1eb4d726adaef24325ef74c46394d117c285f066eed9c777312512d4705b1b22",
                "extractor_version": "json-pointer-v1",
                "field_path": "",
                "record_key": {
                  "cve_id": "CVE-2021-45046",
                  "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
                },
                "record_locator": "/affected/3",
                "transform_node_ids": []
              }
            },
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "observed_at": "2026-11-07T18:00:00Z",
              "subject_content_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:4749bb075129c9fbbe322d18f5232e88fa5dbc5c23594820a795faefb257bbaa",
                    "end_byte": 1550,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-37ba310abdd6002b57407a07cbead4dd"
          },
          "lifecycle": {
            "predecessor_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "state": "retired"
          },
          "pins": [
            {
              "artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.osv-matches"
              }
            },
            {
              "artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.component.affected_by"
              }
            },
            {
              "artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "role": "object-subject",
              "target": {
                "kind": "Subject",
                "name": "security.vulnerability/cve-2021-45046"
              }
            },
            {
              "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
              }
            },
            {
              "artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
              }
            }
          ],
          "retirement": {
            "reason": "superseded",
            "tag": "playbill-claim-retirement-attribution-v1"
          },
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.component.affected_by"
            },
            "claim_type_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "address": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-45046.json",
                "selector": {
                  "scheme": "artifact-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "kind": "subject"
            },
            "predicate": "security.component.affected_by",
            "qualifier": null,
            "role": "observation",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "present",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "present",
              "value": "live"
            },
            "after": {
              "state": "present",
              "value": "retired"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/retirement/reason",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "superseded"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/retirement/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-retirement-attribution-v1"
            }
          }
        ],
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "capture-contracts/security.osv-matches.json",
              "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "capture-contracts/security.osv-matches.json",
              "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "pin_role": "provider"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "pin_role": "provider"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:5ef1bd94f9fc1c94fd1d637017418d6cb2960ce2e1cf6564eee261411e14a5a2",
            "sha256:799edc689c51e2b3ab6bc57379f9ccd1888551ccf083a5f1ffc1431e964867d8",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
              "artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                  "extract_spec_digest": "sha256:1eb4d726adaef24325ef74c46394d117c285f066eed9c777312512d4705b1b22",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "",
                  "record_key": {
                    "cve_id": "CVE-2021-45046",
                    "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
                  },
                  "record_locator": "/affected/3",
                  "transform_node_ids": []
                }
              },
              "statement_digest": "sha256:77ea13e9009c3de21dff333d319a8e057cade912db45d377be473e4bd61dd861",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                  "control_domain": "security-osv-provider",
                  "current_replay_available": true,
                  "epistemic_grade": "derived",
                  "observed_at": "2026-11-07T18:00:00Z",
                  "producer": {
                    "kind": "Provider",
                    "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
                  },
                  "provenance_grade": "daemon-fetched",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:77ea13e9009c3de21dff333d319a8e057cade912db45d377be473e4bd61dd861",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "security-osv-provider"
                    ],
                    "evidence_digests": [
                      "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "derived"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "daemon-fetched"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:77ea13e9009c3de21dff333d319a8e057cade912db45d377be473e4bd61dd861",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "capture-contracts/security.osv-matches.json",
            "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "capture-contracts/security.osv-matches.json",
            "target_artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "claim-types/security.component/affected_by.json",
            "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "claim-types/security.component/affected_by.json",
            "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "pin_role": "provider"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "target_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "pin_role": "provider"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:8f0cd2642a0ba7e7b5ab57ccfba5141c8fc3d918f3b360ca784b1305f5307b63",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
            "source_artifact_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      },
      {
        "path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-claim-v4",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130"
            ],
            "citations": [
              {
                "capture_digest": "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130",
                "citation_id": "sha256:1dc9ee15911e71141e03b9065736ab951f7a11eb8a1ad4fde703e4e0e915f9ed",
                "origin": "self_source",
                "role": "copy",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "observed_at": "2026-11-07T22:22:25.657003Z",
              "subject_content_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                    "end_byte": 79,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-6345aaac4332875e435d6277da211b2e"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "playbill.coordinator-self-source-v1"
              }
            },
            {
              "artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.exposure.component"
              }
            },
            {
              "artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "role": "object-subject",
              "target": {
                "kind": "Subject",
                "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
              }
            },
            {
              "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
              }
            }
          ],
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.exposure.component"
            },
            "claim_type_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "address": {
                "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
                "selector": {
                  "scheme": "artifact-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "kind": "subject"
            },
            "predicate": "security.exposure.component",
            "qualifier": null,
            "role": "normative",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/artifact_format",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-v4"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/attestation_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/capture_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130"
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/citations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "capture_digest": "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130",
                  "citation_id": "sha256:1dc9ee15911e71141e03b9065736ab951f7a11eb8a1ad4fde703e4e0e915f9ed",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/input_claim_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/reducer_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/object_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/observed_at",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "2026-11-07T22:22:25.657003Z"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/subject_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-referent-context-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/source_mappings",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                      "end_byte": 79,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
                    "selector": {
                      "scheme": "claim-statement-v1",
                      "value": ""
                    },
                    "tag": "playbill-semantic-address-v1"
                  },
                  "tag": "playbill-source-mapping-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-backing-v2"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "Claim"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "CLM-6345aaac4332875e435d6277da211b2e"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "live"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/pins",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.exposure.component"
                  }
                },
                {
                  "artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
                  }
                },
                {
                  "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
                  }
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "ClaimType"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure.component"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_from",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_until",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subject"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/predicate",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure.component"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/qualifier",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/role",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "normative"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/shell_context_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-statement-v1"
            }
          }
        ],
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "claim-types/security.exposure/component.json",
              "target_artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:346dce467fd39dc09c3ae891dd74fc6d8aeafe2cf2a0facc74d187a5ab5eba15",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:ec1af772576270a81143a9b272cd787a378c51a9423c6a6cbc7bbf9f13394df6",
              "artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:9fa0d222cc3eb76a70b7525f1f277fe7d5e1e5e667c3ffc7263f657aa61aa911",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:ec1af772576270a81143a9b272cd787a378c51a9423c6a6cbc7bbf9f13394df6",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:9fa0d222cc3eb76a70b7525f1f277fe7d5e1e5e667c3ffc7263f657aa61aa911",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:4a4beae35d0ace1f97be92715ba855828b27bd1b3b8b5566c3af90cc336e9130"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:9fa0d222cc3eb76a70b7525f1f277fe7d5e1e5e667c3ffc7263f657aa61aa911",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "claim-types/security.exposure/component.json",
            "target_artifact_digest": "sha256:85a34c110fd4f7c34d931344a23d6ec3883fe3b72e5edadf2b4abccc1dc8d97b",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      },
      {
        "path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-claim-v4",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1"
            ],
            "citations": [
              {
                "capture_digest": "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1",
                "citation_id": "sha256:02aa0b4e70e625be035e7f82ef5de1fa7b54f3b73f876c3950dfcfb272450ce3",
                "origin": "self_source",
                "role": "copy",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": null,
              "observed_at": "2026-11-07T22:22:25.657003Z",
              "subject_content_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                    "end_byte": 79,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-8bbedbf0e3e8428148d66f133a9a5684"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "playbill.coordinator-self-source-v1"
              }
            },
            {
              "artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.exposure.justification"
              }
            },
            {
              "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
              }
            }
          ],
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.exposure.justification"
            },
            "claim_type_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "kind": "literal",
              "value": "vulnerable_code_not_present"
            },
            "predicate": "security.exposure.justification",
            "qualifier": null,
            "role": "normative",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/artifact_format",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-v4"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/attestation_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/capture_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1"
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/citations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "capture_digest": "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1",
                  "citation_id": "sha256:02aa0b4e70e625be035e7f82ef5de1fa7b54f3b73f876c3950dfcfb272450ce3",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/input_claim_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/reducer_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/object_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/observed_at",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "2026-11-07T22:22:25.657003Z"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/subject_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-referent-context-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/source_mappings",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                      "end_byte": 79,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
                    "selector": {
                      "scheme": "claim-statement-v1",
                      "value": ""
                    },
                    "tag": "playbill-semantic-address-v1"
                  },
                  "tag": "playbill-source-mapping-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-backing-v2"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "Claim"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "CLM-8bbedbf0e3e8428148d66f133a9a5684"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "live"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/pins",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.exposure.justification"
                  }
                },
                {
                  "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
                  }
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "ClaimType"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure.justification"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_from",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_until",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "literal"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "vulnerable_code_not_present"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/predicate",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure.justification"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/qualifier",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/role",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "normative"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/shell_context_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-statement-v1"
            }
          }
        ],
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "claim-types/security.exposure/justification.json",
              "target_artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:346dce467fd39dc09c3ae891dd74fc6d8aeafe2cf2a0facc74d187a5ab5eba15",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:9ae1a1ccc50d5b81ff3078ec24fb535e96f8c0226e2cb9503ff62f8d2d52168c",
              "artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:5ccdb940bf8fb125afe8327cf48d1df8b69e6a8d5ddc75319f99ab645fde09b9",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:9ae1a1ccc50d5b81ff3078ec24fb535e96f8c0226e2cb9503ff62f8d2d52168c",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:5ccdb940bf8fb125afe8327cf48d1df8b69e6a8d5ddc75319f99ab645fde09b9",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:c364e8352b1187c91339b13edf9250e98c30c0763b1b25ac648ef13672f588f1"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:5ccdb940bf8fb125afe8327cf48d1df8b69e6a8d5ddc75319f99ab645fde09b9",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "claim-types/security.exposure/justification.json",
            "target_artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      },
      {
        "path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-claim-v4",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369"
            ],
            "citations": [
              {
                "capture_digest": "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369",
                "citation_id": "sha256:f915326a321754500e74e47dbdb9030640f6494c88d5bdc7245f873941d12d61",
                "origin": "self_source",
                "role": "copy",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "observed_at": "2026-11-07T22:22:25.657003Z",
              "subject_content_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                    "end_byte": 79,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-b480360ab6e9691ee7173f17d44218dd"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "playbill.coordinator-self-source-v1"
              }
            },
            {
              "artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.exposure.vulnerability"
              }
            },
            {
              "artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "role": "object-subject",
              "target": {
                "kind": "Subject",
                "name": "security.vulnerability/cve-2021-45046"
              }
            },
            {
              "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
              }
            }
          ],
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.exposure.vulnerability"
            },
            "claim_type_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "address": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-45046.json",
                "selector": {
                  "scheme": "artifact-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "kind": "subject"
            },
            "predicate": "security.exposure.vulnerability",
            "qualifier": null,
            "role": "normative",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/artifact_format",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-v4"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/attestation_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/capture_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369"
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/citations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "capture_digest": "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369",
                  "citation_id": "sha256:f915326a321754500e74e47dbdb9030640f6494c88d5bdc7245f873941d12d61",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/input_claim_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/reducer_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/object_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/observed_at",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "2026-11-07T22:22:25.657003Z"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/subject_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-referent-context-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/source_mappings",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                      "end_byte": 79,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
                    "selector": {
                      "scheme": "claim-statement-v1",
                      "value": ""
                    },
                    "tag": "playbill-semantic-address-v1"
                  },
                  "tag": "playbill-source-mapping-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-backing-v2"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "Claim"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "CLM-b480360ab6e9691ee7173f17d44218dd"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "live"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/pins",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.exposure.vulnerability"
                  }
                },
                {
                  "artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-45046"
                  }
                },
                {
                  "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
                  }
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "ClaimType"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure.vulnerability"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_from",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_until",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.vulnerability/cve-2021-45046.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/address/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subject"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/predicate",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure.vulnerability"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/qualifier",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/role",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "normative"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/shell_context_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-statement-v1"
            }
          }
        ],
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "claim-types/security.exposure/vulnerability.json",
              "target_artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:346dce467fd39dc09c3ae891dd74fc6d8aeafe2cf2a0facc74d187a5ab5eba15",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:d01deea262f7761aef6195992dcfd2dac09787dded3118cc3a30575baefb4ff6",
              "artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:859ea408180c4b35c36861e6c63ee7aff856e62a598b9eeddb4d8b7b661a18bf",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:d01deea262f7761aef6195992dcfd2dac09787dded3118cc3a30575baefb4ff6",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:859ea408180c4b35c36861e6c63ee7aff856e62a598b9eeddb4d8b7b661a18bf",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:ab5193b1caef251dc94cab7723f18e54fb8330e7a95cb9c66cf39a26813cd369"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:859ea408180c4b35c36861e6c63ee7aff856e62a598b9eeddb4d8b7b661a18bf",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "claim-types/security.exposure/vulnerability.json",
            "target_artifact_digest": "sha256:02b535a3a854164408cab4e2b44f4571c9593389427c022742543a4ec7beb4b6",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      },
      {
        "path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-claim-v4",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8"
            ],
            "citations": [
              {
                "capture_digest": "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8",
                "citation_id": "sha256:b744e851f286bd0f5dc1778e4291b2ff51cdcbc86fb8033e32be0da399e4971e",
                "origin": "self_source",
                "role": "copy",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "observed_at": "2026-11-07T22:22:25.657003Z",
              "subject_content_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                    "end_byte": 79,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "playbill.coordinator-self-source-v1"
              }
            },
            {
              "artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.component.affected_by"
              }
            },
            {
              "artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "role": "object-subject",
              "target": {
                "kind": "Subject",
                "name": "security.vulnerability/cve-2021-45046"
              }
            },
            {
              "artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
              }
            }
          ],
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.component.affected_by"
            },
            "claim_type_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "kind": "none",
              "of": {
                "address": {
                  "artifact_path": "subjects/security.vulnerability/cve-2021-45046.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              }
            },
            "predicate": "security.component.affected_by",
            "qualifier": null,
            "role": "normative",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/artifact_format",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-v4"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/attestation_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/capture_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8"
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/citations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "capture_digest": "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8",
                  "citation_id": "sha256:b744e851f286bd0f5dc1778e4291b2ff51cdcbc86fb8033e32be0da399e4971e",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/input_claim_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/reducer_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/object_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/observed_at",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "2026-11-07T22:22:25.657003Z"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/subject_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-referent-context-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/source_mappings",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:f9ec9e6c04f44138c0b9ba621a742de06342a86c46e39c2a52584eae53682bc2",
                      "end_byte": 79,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
                    "selector": {
                      "scheme": "claim-statement-v1",
                      "value": ""
                    },
                    "tag": "playbill-semantic-address-v1"
                  },
                  "tag": "playbill-source-mapping-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-backing-v2"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "Claim"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "live"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/pins",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.component.affected_by"
                  }
                },
                {
                  "artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-45046"
                  }
                },
                {
                  "artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
                  }
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "ClaimType"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.component.affected_by"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_from",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_until",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "none"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/of/address/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.vulnerability/cve-2021-45046.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/of/address/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/of/address/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/of/address/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/of/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subject"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/predicate",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.component.affected_by"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/qualifier",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/role",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "normative"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/shell_context_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-statement-v1"
            }
          }
        ],
        "law_identifier": "playbill.claim.v4",
        "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
          "law_identifier": "playbill.claim.v4",
          "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "claim-types/security.component/affected_by.json",
              "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
              "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
              "pin_role": "object-subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
              "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:5ef1bd94f9fc1c94fd1d637017418d6cb2960ce2e1cf6564eee261411e14a5a2",
            "sha256:799edc689c51e2b3ab6bc57379f9ccd1888551ccf083a5f1ffc1431e964867d8",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
              "artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
              "evaluation_time": "2026-11-07T22:22:25.657003Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
              "statement_digest": "sha256:787d3546a2c9439a3fdd6e75023ef501f5a1eb8801740eca5c2a8a7a7920a76e",
              "tag": "cruxible-claim-law-evidence-v3",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8",
                  "control_domain": "principal.owner",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-11-07T22:22:25.657003Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "owner"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:787d3546a2c9439a3fdd6e75023ef501f5a1eb8801740eca5c2a8a7a7920a76e",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.owner"
                    ],
                    "evidence_digests": [
                      "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-11-07T22:22:25.657003Z",
                "freshness_expirations": [],
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:912cf84ae276e5c96ca45911060092f2f0256d19de5be5089f79b41cfd3abad8"
                ],
                "tag": "cruxible-claim-verdict-v3",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:787d3546a2c9439a3fdd6e75023ef501f5a1eb8801740eca5c2a8a7a7920a76e",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "claim-types/security.component/affected_by.json",
            "target_artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "subjects/security.vulnerability/cve-2021-45046.json",
            "target_artifact_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
            "pin_role": "object-subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
            "source_artifact_digest": "sha256:5761dcb9c8b72797c82c2b5d9f403b793df5af85ef510bd5666a40570441413b",
            "target_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "target_artifact_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      },
      {
        "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
        "artifact_kind": "subject",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-subject-v1",
          "identity": {
            "kind": "Subject",
            "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [],
          "subject_id": "pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046",
          "subject_kind": "security.exposure"
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/artifact_format",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-subject-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "Subject"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "live"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/pins",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/subject_id",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/subject_kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.exposure"
            }
          }
        ],
        "law_identifier": "playbill.subject.v1",
        "law_digest": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
          "law_identifier": "playbill.subject.v1",
          "law_digest": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2",
          "evaluation_time": "2026-11-07T22:22:25.657003Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
            "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
            "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
              "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
              "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
              "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
              "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
              "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "referrers": [],
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
            "source_artifact_digest": "sha256:53ae76b7c42044ddf27d50c44250effde575c8fd02dbd61e3d90eacec1d4f63e",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
            "source_artifact_digest": "sha256:9977a1610a1274d30fc847283cfdfa3eeff9b630fa4ccb7da9f4cc9e00a3fee1",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
            "source_artifact_digest": "sha256:d71b1c2fbde2936a127c9a9c541e371ed6c3bef6300dee34938756b2c23e868b",
            "target_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json",
            "target_artifact_digest": "sha256:016876311c1693cb64d720b4d964701a418e31e267e053246149c81c55eaa182",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      }
    ],
    "governance": {
      "activation_policy": "snapshot",
      "approval_requirements": [],
      "law_digests": {
        "playbill.claim.v4": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7",
        "playbill.subject.v1": "sha256:656b60c438b61bf018bd4ae2e473d71fe08a47c450edf261e2c4adf86339ecd2"
      },
      "required_tier": "governed_write"
    },
    "provenance": {
      "actor_id": "owner",
      "source_compilation_digest": null
    },
    "originating_line": null,
    "rationale": "The same stripped jar: no JndiLookup, so the lookup this CVE extends is absent.",
    "item_reasons": [],
    "item_reason_count": 0,
    "item_reasons_next_cursor": null,
    "attestation_coverage": {
      "attestations": [],
      "coverage": "containing_change_set",
      "coverage_basis": {
        "candidate_digest": "sha256:1b545a2eeead03fdf2d25f3da55ad92fd324b8ba3f4d032eee8a22f36116056d",
        "scope": [
          "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
          "claims/63/CLM-6345aaac4332875e435d6277da211b2e.json",
          "claims/8b/CLM-8bbedbf0e3e8428148d66f133a9a5684.json",
          "claims/b4/CLM-b480360ab6e9691ee7173f17d44218dd.json",
          "claims/f4/CLM-f4a0e7f04d091bb0b4e6f31ae081d7e3.json",
          "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-45046.json"
        ]
      }
    },
    "documents": [],
    "guidance": [
      {
        "definition": "ClaimType:security.exposure.justification",
        "document": "document:security.guidance.dependency",
        "title": "Judging a dependency exposure"
      }
    ],
    "redactions": [
      "body",
      "readable_diff",
      "source_mapping"
    ],
    "projection_advisory": null,
    "projection_evidence": null,
    "prior_refusal_coverage": null
  }
});
