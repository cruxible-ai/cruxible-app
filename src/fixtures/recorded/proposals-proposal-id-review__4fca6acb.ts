// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/proposals/sha256:565afa1f991138f9d6370a401e3e1d6f87e5195ea8f7cfcbc515a70bdfe0b66d/review aa860519
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/proposals/{proposal_id}/review",
  "pathParams": {
    "proposal_id": "sha256:565afa1f991138f9d6370a401e3e1d6f87e5195ea8f7cfcbc515a70bdfe0b66d"
  },
  "body": {},
  "response": {
    "tag": "playbill-proposal-review-v1",
    "coordinate_kind": "provisional",
    "proposal_id": "sha256:565afa1f991138f9d6370a401e3e1d6f87e5195ea8f7cfcbc515a70bdfe0b66d",
    "candidate": {
      "tag": "playbill-validated-candidate-v3",
      "candidate": {
        "tag": "playbill-candidate-v2",
        "parent_semantic_root": "sha256:e470b93b1f039d54a3ce40cf4f432b3a8a650a999fdd86ea2f76962114cd88fb",
        "candidate_manifest_root": "merkle-sha256:6deec8de490f536ab273e119fc089c374e8ceda922ce56b1be85ec11eb0624cd",
        "semantic_diff_digest": "sha256:97726c0a41a0bb4107272d66c9895054d15d0b4e13b17abc73b46afa028ec254",
        "scope": [
          "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json"
        ],
        "timestamp": "2026-10-19T21:29:00.847092Z"
      },
      "candidate_digest": "sha256:5e62ea3d5dbc8d64139376a049c55a35b778f75c4e73d8237c0895a9a784587c",
      "required_tier": "governed_write",
      "approval_requirements": [],
      "activation_policy": "snapshot",
      "closure_proof": {
        "tag": "playbill-closure-proof-v3",
        "strategy": "dependency-closure-v3",
        "paths": [
          "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json"
        ],
        "dependency_edge_root": "depgraph-sha256:441c83de8919ec0f37f1e83e7d9e810d2de02b6a1cc3ea1e3ab375bb11358e6e",
        "member_evidence_digest": "sha256:712a564a525cbbc6f072b2e9ae9835d2ee332274cdfb2decdea7867e301ca163"
      },
      "members": [
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
          "artifact_kind": "provider",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
          "law_identifier": "cruxible.provider.v4",
          "law_digest": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f",
          "law_evidence_digest": "sha256:660c8f09386d3c7919f5c5bd183dfe2ce623b8db46d562660cf96714ac126c6c",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312.json",
              "target_artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798.json",
              "target_artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8.json",
              "target_artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0.json",
              "target_artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009.json",
              "target_artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c.json",
              "target_artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
              "pin_role": "provider-interface"
            }
          ]
        }
      ],
      "law_evidence": [
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
          "law_identifier": "cruxible.provider.v4",
          "law_digest": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f",
          "evaluation_time": "2026-10-19T21:29:00.847092Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "6f77cd2dbff6416ef4f78a0f02af66f23a3e241d",
            "semantic_root": "sha256:e470b93b1f039d54a3ce40cf4f432b3a8a650a999fdd86ea2f76962114cd88fb",
            "generation_root": "sha256:98ff733d51851ed0a6233e4bfe9b4583f6f950c174802dd6b4f6694bcce5f07c",
            "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312.json",
              "target_artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798.json",
              "target_artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8.json",
              "target_artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0.json",
              "target_artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009.json",
              "target_artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c.json",
              "target_artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
              "pin_role": "provider-interface"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "verdict": "accepted"
          },
          "diagnostics": []
        }
      ],
      "law_digests": {
        "cruxible.provider.v4": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f"
      },
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "candidate_digest": "sha256:5e62ea3d5dbc8d64139376a049c55a35b778f75c4e73d8237c0895a9a784587c",
    "parent_semantic_root": "sha256:e470b93b1f039d54a3ce40cf4f432b3a8a650a999fdd86ea2f76962114cd88fb",
    "settlement_base": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "6f77cd2dbff6416ef4f78a0f02af66f23a3e241d",
      "semantic_root": "sha256:e470b93b1f039d54a3ce40cf4f432b3a8a650a999fdd86ea2f76962114cd88fb",
      "generation_root": "sha256:98ff733d51851ed0a6233e4bfe9b4583f6f950c174802dd6b4f6694bcce5f07c",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "base_oid": "6f77cd2dbff6416ef4f78a0f02af66f23a3e241d",
    "complete_members": [
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
        "artifact_kind": "provider",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "law_identifier": "cruxible.provider.v4",
        "law_digest": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f",
        "law_evidence_digest": "sha256:660c8f09386d3c7919f5c5bd183dfe2ce623b8db46d562660cf96714ac126c6c",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312.json",
            "target_artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798.json",
            "target_artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8.json",
            "target_artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0.json",
            "target_artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009.json",
            "target_artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c.json",
            "target_artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
            "pin_role": "provider-interface"
          }
        ]
      }
    ],
    "members": [
      {
        "path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
        "artifact_kind": "provider",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "cruxible-provider-v4",
          "capture_contract_digests": [],
          "control_domain": "operator",
          "identity": {
            "kind": "Provider",
            "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
          },
          "implementations": [
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_gate_sources.feeds:GateEpssDaily",
              "implementation_digest": "sha256:16cb4eb627ba92993cf70f0db35b1d18ce68cf6f41232e50d6e3de01b69a60e5",
              "interface_digest": "sha256:bdac36d3b002287344e03f620ee7bca94c0f9a18008618f0b8ab380517db6a96",
              "interface_id": "security.epss-daily",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "playbill-provider-implementation-v1"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_gate_sources.feeds:GateOsvQuery",
              "implementation_digest": "sha256:48d0ddb5032954e1cd749fe86a3f74c583c624ae2bdbe0e825c43e9b473201ff",
              "interface_digest": "sha256:92a7c29cdc19ede3a1c55edab561b2e9ef3de2e70ca287e30a6c30f39f49c2ae",
              "interface_id": "security.osv-query",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "playbill-provider-implementation-v1"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_gate_sources.feeds:GatePypiRelease",
              "implementation_digest": "sha256:79f7df857cc2fe8de890f78e28a9cddd3b1fe109a4a08ea5b0d44a573dafe049",
              "interface_digest": "sha256:0804f4b5e1b6b08d9e7fcadd63147d72d5ee3f7dcf433003f5a7154534c9cfb7",
              "interface_id": "security.pypi-release",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "playbill-provider-implementation-v1"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_gate_sources.feeds:GateReleaseAsset",
              "implementation_digest": "sha256:6703dc7f9aa41b59c96bd1a1cee39b8fc9f630defca556be1aa8f1904afbfbaa",
              "interface_digest": "sha256:9f856f117a2b700118092a8bd1e50d0436ba429b3615b73e7083c9b3d9a6827e",
              "interface_id": "security.release-asset",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "playbill-provider-implementation-v1"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_gate_sources.feeds:GateRepoSnapshot",
              "implementation_digest": "sha256:5e6829d5790fe06658cca802b67f91d09df1779a94d2ce3137761ec0b78c03ac",
              "interface_digest": "sha256:0f00171442e6ffd5239a321b026f95998a7a9e17772d0ed04af60c4fb34bc59b",
              "interface_id": "security.repo-snapshot",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "playbill-provider-implementation-v1"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_gate_sources.web:GateWebFetch",
              "implementation_digest": "sha256:22b1c6e098f77b3aa37c7fb874fa1c6768b95e055381ed98d7fd99b805da6ac5",
              "interface_digest": "sha256:f09e1553b05d72a9e58ed3a260417c41992ccd34b2f2541958c5733723ac2121",
              "interface_id": "web.fetch",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "playbill-provider-implementation-v1"
            }
          ],
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8"
              }
            },
            {
              "artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312"
              }
            },
            {
              "artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009"
              }
            },
            {
              "artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798"
              }
            },
            {
              "artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0"
              }
            },
            {
              "artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c"
              }
            }
          ],
          "runtime_artifact": {
            "container": null,
            "distribution": {
              "filename": "security_gate_sources-0.3.0-py3-none-any.whl",
              "materialization_source": "local",
              "name": "security-gate-sources",
              "sha256": "sha256:eee1bcd676b8e1ed7dd3fdcc1385fb1f322dad3d6f8a6d94cab57a773333124f",
              "version": "0.3.0"
            },
            "local_env": {
              "lock_sha256": "sha256:42555f90b10644d9ba7bf99c0a932f9229eb84252222b406f0a17e24154fece8",
              "materialization_digests": {
                "darwin-arm64-cp313": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a"
              }
            },
            "manifest": {
              "distribution": {
                "name": "security-gate-sources",
                "version": "0.3.0"
              },
              "entrypoint_group": "cruxible.providers",
              "implementations": [
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "source_kind=api_json;access=*;page_weight=*": "web-fetch-api-json"
                  },
                  "capture_contract_families": [
                    "web.fetch.retrieval.v1"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-run-input"
                  ],
                  "declared_input_buckets": [
                    "source_kind=api_json;access=*;page_weight=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.web:GateWebFetch",
                  "interface_digest": "sha256:f09e1553b05d72a9e58ed3a260417c41992ccd34b2f2541958c5733723ac2121",
                  "interface_id": "web.fetch",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "components=*;watchlist=*": "osv-query-fixture"
                  },
                  "capture_contract_families": [
                    "security.osv.exchanges.v1"
                  ],
                  "declared_endpoints": [
                    "https://api.osv.dev"
                  ],
                  "declared_input_buckets": [
                    "components=*;watchlist=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateOsvQuery",
                  "interface_digest": "sha256:92a7c29cdc19ede3a1c55edab561b2e9ef3de2e70ca287e30a6c30f39f49c2ae",
                  "interface_id": "security.osv-query",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "file=daily": "epss-daily-fixture"
                  },
                  "capture_contract_families": [
                    "security.epss.daily.v1"
                  ],
                  "declared_endpoints": [
                    "https://epss.empiricalsecurity.com"
                  ],
                  "declared_input_buckets": [
                    "file=daily"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateEpssDaily",
                  "interface_digest": "sha256:bdac36d3b002287344e03f620ee7bca94c0f9a18008618f0b8ab380517db6a96",
                  "interface_id": "security.epss-daily",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "scope=*": "repo-snapshot-fixture"
                  },
                  "capture_contract_families": [
                    "security.github.snapshot.v1"
                  ],
                  "declared_endpoints": [
                    "https://api.github.com",
                    "https://raw.githubusercontent.com"
                  ],
                  "declared_input_buckets": [
                    "scope=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateRepoSnapshot",
                  "interface_digest": "sha256:0f00171442e6ffd5239a321b026f95998a7a9e17772d0ed04af60c4fb34bc59b",
                  "interface_id": "security.repo-snapshot",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "versions=*": "pypi-release-fixture"
                  },
                  "capture_contract_families": [
                    "security.pypi.release.v1"
                  ],
                  "declared_endpoints": [
                    "https://pypi.org"
                  ],
                  "declared_input_buckets": [
                    "versions=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GatePypiRelease",
                  "interface_digest": "sha256:0804f4b5e1b6b08d9e7fcadd63147d72d5ee3f7dcf433003f5a7154534c9cfb7",
                  "interface_id": "security.pypi-release",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "asset=release": "release-asset-fixture"
                  },
                  "capture_contract_families": [
                    "security.github.asset.v1"
                  ],
                  "declared_endpoints": [
                    "https://github.com",
                    "https://objects.githubusercontent.com",
                    "https://release-assets.githubusercontent.com"
                  ],
                  "declared_input_buckets": [
                    "asset=release"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateReleaseAsset",
                  "interface_digest": "sha256:9f856f117a2b700118092a8bd1e50d0436ba429b3615b73e7083c9b3d9a6827e",
                  "interface_id": "security.release-asset",
                  "requires_extras": [],
                  "side_effects": false
                }
              ],
              "provider_id": "security-gate-sources",
              "schema_version": 1,
              "supported_protocol_majors": [
                1
              ]
            },
            "manifest_digest": "sha256:6b08e5631834a49aefc63f7bdba757ad3e4bc8ba753a4e141ee3d58d100a1e7e",
            "provider_id": "security-gate-sources",
            "schema_version": 2,
            "status": "accepted"
          },
          "signing_keys": [],
          "upstream_provenance": []
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
              "value": "cruxible-provider-v4"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/capture_contract_digests",
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
            "field_path": "/control_domain",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "operator"
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
              "value": "Provider"
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
              "value": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/implementations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_gate_sources.feeds:GateEpssDaily",
                  "implementation_digest": "sha256:16cb4eb627ba92993cf70f0db35b1d18ce68cf6f41232e50d6e3de01b69a60e5",
                  "interface_digest": "sha256:bdac36d3b002287344e03f620ee7bca94c0f9a18008618f0b8ab380517db6a96",
                  "interface_id": "security.epss-daily",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "playbill-provider-implementation-v1"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_gate_sources.feeds:GateOsvQuery",
                  "implementation_digest": "sha256:48d0ddb5032954e1cd749fe86a3f74c583c624ae2bdbe0e825c43e9b473201ff",
                  "interface_digest": "sha256:92a7c29cdc19ede3a1c55edab561b2e9ef3de2e70ca287e30a6c30f39f49c2ae",
                  "interface_id": "security.osv-query",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "playbill-provider-implementation-v1"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_gate_sources.feeds:GatePypiRelease",
                  "implementation_digest": "sha256:79f7df857cc2fe8de890f78e28a9cddd3b1fe109a4a08ea5b0d44a573dafe049",
                  "interface_digest": "sha256:0804f4b5e1b6b08d9e7fcadd63147d72d5ee3f7dcf433003f5a7154534c9cfb7",
                  "interface_id": "security.pypi-release",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "playbill-provider-implementation-v1"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_gate_sources.feeds:GateReleaseAsset",
                  "implementation_digest": "sha256:6703dc7f9aa41b59c96bd1a1cee39b8fc9f630defca556be1aa8f1904afbfbaa",
                  "interface_digest": "sha256:9f856f117a2b700118092a8bd1e50d0436ba429b3615b73e7083c9b3d9a6827e",
                  "interface_id": "security.release-asset",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "playbill-provider-implementation-v1"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_gate_sources.feeds:GateRepoSnapshot",
                  "implementation_digest": "sha256:5e6829d5790fe06658cca802b67f91d09df1779a94d2ce3137761ec0b78c03ac",
                  "interface_digest": "sha256:0f00171442e6ffd5239a321b026f95998a7a9e17772d0ed04af60c4fb34bc59b",
                  "interface_id": "security.repo-snapshot",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "playbill-provider-implementation-v1"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_gate_sources.web:GateWebFetch",
                  "implementation_digest": "sha256:22b1c6e098f77b3aa37c7fb874fa1c6768b95e055381ed98d7fd99b805da6ac5",
                  "interface_digest": "sha256:f09e1553b05d72a9e58ed3a260417c41992ccd34b2f2541958c5733723ac2121",
                  "interface_id": "web.fetch",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "playbill-provider-implementation-v1"
                }
              ]
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
                  "artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
                  "role": "provider-interface",
                  "target": {
                    "kind": "ProviderInterface",
                    "name": "security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8"
                  }
                },
                {
                  "artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
                  "role": "provider-interface",
                  "target": {
                    "kind": "ProviderInterface",
                    "name": "security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312"
                  }
                },
                {
                  "artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
                  "role": "provider-interface",
                  "target": {
                    "kind": "ProviderInterface",
                    "name": "security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009"
                  }
                },
                {
                  "artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
                  "role": "provider-interface",
                  "target": {
                    "kind": "ProviderInterface",
                    "name": "security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798"
                  }
                },
                {
                  "artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
                  "role": "provider-interface",
                  "target": {
                    "kind": "ProviderInterface",
                    "name": "security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0"
                  }
                },
                {
                  "artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
                  "role": "provider-interface",
                  "target": {
                    "kind": "ProviderInterface",
                    "name": "web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c"
                  }
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/container",
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
            "field_path": "/runtime_artifact/distribution/filename",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security_gate_sources-0.3.0-py3-none-any.whl"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/distribution/materialization_source",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "local"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/distribution/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security-gate-sources"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/distribution/sha256",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:eee1bcd676b8e1ed7dd3fdcc1385fb1f322dad3d6f8a6d94cab57a773333124f"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/distribution/version",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "0.3.0"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/local_env/lock_sha256",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:42555f90b10644d9ba7bf99c0a932f9229eb84252222b406f0a17e24154fece8"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/local_env/materialization_digests/darwin-arm64-cp313",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:8f65a637d5d159c95fd381804d8d4d032b110ce4a881387200684e2c436b313a"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/distribution/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security-gate-sources"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/distribution/version",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "0.3.0"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/entrypoint_group",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "cruxible.providers"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/implementations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "source_kind=api_json;access=*;page_weight=*": "web-fetch-api-json"
                  },
                  "capture_contract_families": [
                    "web.fetch.retrieval.v1"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-run-input"
                  ],
                  "declared_input_buckets": [
                    "source_kind=api_json;access=*;page_weight=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.web:GateWebFetch",
                  "interface_digest": "sha256:f09e1553b05d72a9e58ed3a260417c41992ccd34b2f2541958c5733723ac2121",
                  "interface_id": "web.fetch",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "components=*;watchlist=*": "osv-query-fixture"
                  },
                  "capture_contract_families": [
                    "security.osv.exchanges.v1"
                  ],
                  "declared_endpoints": [
                    "https://api.osv.dev"
                  ],
                  "declared_input_buckets": [
                    "components=*;watchlist=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateOsvQuery",
                  "interface_digest": "sha256:92a7c29cdc19ede3a1c55edab561b2e9ef3de2e70ca287e30a6c30f39f49c2ae",
                  "interface_id": "security.osv-query",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "file=daily": "epss-daily-fixture"
                  },
                  "capture_contract_families": [
                    "security.epss.daily.v1"
                  ],
                  "declared_endpoints": [
                    "https://epss.empiricalsecurity.com"
                  ],
                  "declared_input_buckets": [
                    "file=daily"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateEpssDaily",
                  "interface_digest": "sha256:bdac36d3b002287344e03f620ee7bca94c0f9a18008618f0b8ab380517db6a96",
                  "interface_id": "security.epss-daily",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "scope=*": "repo-snapshot-fixture"
                  },
                  "capture_contract_families": [
                    "security.github.snapshot.v1"
                  ],
                  "declared_endpoints": [
                    "https://api.github.com",
                    "https://raw.githubusercontent.com"
                  ],
                  "declared_input_buckets": [
                    "scope=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateRepoSnapshot",
                  "interface_digest": "sha256:0f00171442e6ffd5239a321b026f95998a7a9e17772d0ed04af60c4fb34bc59b",
                  "interface_id": "security.repo-snapshot",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "versions=*": "pypi-release-fixture"
                  },
                  "capture_contract_families": [
                    "security.pypi.release.v1"
                  ],
                  "declared_endpoints": [
                    "https://pypi.org"
                  ],
                  "declared_input_buckets": [
                    "versions=*"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GatePypiRelease",
                  "interface_digest": "sha256:0804f4b5e1b6b08d9e7fcadd63147d72d5ee3f7dcf433003f5a7154534c9cfb7",
                  "interface_id": "security.pypi-release",
                  "requires_extras": [],
                  "side_effects": false
                },
                {
                  "backends": [
                    "local_env"
                  ],
                  "bucket_conformance": {
                    "asset=release": "release-asset-fixture"
                  },
                  "capture_contract_families": [
                    "security.github.asset.v1"
                  ],
                  "declared_endpoints": [
                    "https://github.com",
                    "https://objects.githubusercontent.com",
                    "https://release-assets.githubusercontent.com"
                  ],
                  "declared_input_buckets": [
                    "asset=release"
                  ],
                  "deterministic": true,
                  "entrypoint": "security_gate_sources.feeds:GateReleaseAsset",
                  "interface_digest": "sha256:9f856f117a2b700118092a8bd1e50d0436ba429b3615b73e7083c9b3d9a6827e",
                  "interface_id": "security.release-asset",
                  "requires_extras": [],
                  "side_effects": false
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/provider_id",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security-gate-sources"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/schema_version",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": 1
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest/supported_protocol_majors",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                1
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/manifest_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:6b08e5631834a49aefc63f7bdba757ad3e4bc8ba753a4e141ee3d58d100a1e7e"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/provider_id",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security-gate-sources"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/schema_version",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": 2
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/status",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "accepted"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/signing_keys",
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
            "field_path": "/upstream_provenance",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          }
        ],
        "law_identifier": "cruxible.provider.v4",
        "law_digest": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
          "law_identifier": "cruxible.provider.v4",
          "law_digest": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f",
          "evaluation_time": "2026-10-19T21:29:00.847092Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "6f77cd2dbff6416ef4f78a0f02af66f23a3e241d",
            "semantic_root": "sha256:e470b93b1f039d54a3ce40cf4f432b3a8a650a999fdd86ea2f76962114cd88fb",
            "generation_root": "sha256:98ff733d51851ed0a6233e4bfe9b4583f6f950c174802dd6b4f6694bcce5f07c",
            "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312.json",
              "target_artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798.json",
              "target_artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8.json",
              "target_artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0.json",
              "target_artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009.json",
              "target_artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
              "pin_role": "provider-interface"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
              "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
              "target_path": "provider-interfaces/web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c.json",
              "target_artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
              "pin_role": "provider-interface"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312.json",
            "target_artifact_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798.json",
            "target_artifact_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8.json",
            "target_artifact_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0.json",
            "target_artifact_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009.json",
            "target_artifact_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
            "pin_role": "provider-interface"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json",
            "source_artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
            "target_path": "provider-interfaces/web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c.json",
            "target_artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
            "pin_role": "provider-interface"
          }
        ],
        "prior_refusals": []
      }
    ],
    "governance": {
      "activation_policy": "snapshot",
      "approval_requirements": [],
      "law_digests": {
        "cruxible.provider.v4": "sha256:526170687d3add19411e11fc7d9cc7e74c7a6305e1ad564a8ba8b5c5c30de05f"
      },
      "required_tier": "governed_write"
    },
    "provenance": {
      "actor_id": "gate-owner",
      "source_compilation_digest": null
    },
    "rationale": null,
    "item_reasons": [],
    "item_reason_count": 0,
    "item_reasons_next_cursor": null,
    "attestation_coverage": {
      "attestations": [],
      "coverage": "containing_change_set",
      "coverage_basis": {
        "candidate_digest": "sha256:5e62ea3d5dbc8d64139376a049c55a35b778f75c4e73d8237c0895a9a784587c",
        "scope": [
          "providers/security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065.json"
        ]
      }
    },
    "documents": [],
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
