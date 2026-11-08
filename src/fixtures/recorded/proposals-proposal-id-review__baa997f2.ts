// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/proposals/sha256:09eb2ab9ff5d4c7515f872ab7172488c6ead6dc39b5704c393fc6fa9bb0304ed/review 5070cd9e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/proposals/{proposal_id}/review",
  "pathParams": {
    "proposal_id": "sha256:09eb2ab9ff5d4c7515f872ab7172488c6ead6dc39b5704c393fc6fa9bb0304ed"
  },
  "body": {
    "detail": true
  },
  "response": {
    "tag": "playbill-proposal-review-v1",
    "coordinate_kind": "provisional",
    "proposal_id": "sha256:09eb2ab9ff5d4c7515f872ab7172488c6ead6dc39b5704c393fc6fa9bb0304ed",
    "candidate": {
      "tag": "playbill-validated-candidate-v3",
      "candidate": {
        "tag": "playbill-candidate-v2",
        "parent_semantic_root": "sha256:926f8f52313b650ca3be3b20d753c34a135e672c890baf0a97833d3ab52a4163",
        "candidate_manifest_root": "merkle-sha256:6c2183e79585476ec994fbee17a330a4e808375d0e502184a7509710dd9cfdb5",
        "semantic_diff_digest": "sha256:cdc3f5096b9964171e7e3ba6ef524df1e1cd60fbf23f23f97a509a4f8ed82ce1",
        "scope": [
          "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json"
        ],
        "timestamp": "2026-10-09T11:59:00.000000Z"
      },
      "candidate_digest": "sha256:2e2ce14c9c6e147bee71e371dae4e6dfd5074d078215d2ad3a6bac24d5d160fb",
      "required_tier": "governed_write",
      "approval_requirements": [],
      "activation_policy": "snapshot",
      "closure_proof": {
        "tag": "playbill-closure-proof-v3",
        "strategy": "dependency-closure-v3",
        "paths": [
          "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json"
        ],
        "dependency_edge_root": "depgraph-sha256:6e9e74ff8072f6e7b5915b12072a611321f17929fac95d6e1895fbd2eb4bc055",
        "member_evidence_digest": "sha256:21383911a1c1cb48140cc75488839f1b615ecfc6fffbf3e4bff487a44f9e818a"
      },
      "members": [
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
          "artifact_kind": "provider",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
          "law_identifier": "cruxible.provider.named.v1",
          "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
          "law_evidence_digest": "sha256:d4949d7d71f0e53c377d87de98f34ad3cdc3d1c0463bc5dc1b8c41ca3bb75d6f",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.result/v1.json",
              "target_artifact_digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.request/v1.json",
              "target_artifact_digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.result/v1.json",
              "target_artifact_digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.request/v1.json",
              "target_artifact_digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.result/v1.json",
              "target_artifact_digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.request/v1.json",
              "target_artifact_digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
              "pin_role": "contract"
            }
          ]
        }
      ],
      "law_evidence": [
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
          "law_identifier": "cruxible.provider.named.v1",
          "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
          "evaluation_time": "2026-10-09T11:59:00.000000Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "7a92bbaf8edad04c143d0859c9481086d443c895",
            "semantic_root": "sha256:926f8f52313b650ca3be3b20d753c34a135e672c890baf0a97833d3ab52a4163",
            "generation_root": "sha256:0e5d8899caf59653dbfb2fcdaf68187b888ccf65ca0ca9ec024599ee839149c0",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.result/v1.json",
              "target_artifact_digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.request/v1.json",
              "target_artifact_digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.result/v1.json",
              "target_artifact_digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.request/v1.json",
              "target_artifact_digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.result/v1.json",
              "target_artifact_digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.request/v1.json",
              "target_artifact_digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
              "pin_role": "contract"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "referrers": [],
            "verdict": "accepted"
          },
          "diagnostics": []
        }
      ],
      "law_digests": {
        "cruxible.provider.named.v1": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac"
      },
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "candidate_digest": "sha256:2e2ce14c9c6e147bee71e371dae4e6dfd5074d078215d2ad3a6bac24d5d160fb",
    "parent_semantic_root": "sha256:926f8f52313b650ca3be3b20d753c34a135e672c890baf0a97833d3ab52a4163",
    "settlement_base": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7a92bbaf8edad04c143d0859c9481086d443c895",
      "semantic_root": "sha256:926f8f52313b650ca3be3b20d753c34a135e672c890baf0a97833d3ab52a4163",
      "generation_root": "sha256:0e5d8899caf59653dbfb2fcdaf68187b888ccf65ca0ca9ec024599ee839149c0",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "base_oid": "7a92bbaf8edad04c143d0859c9481086d443c895",
    "complete_members": [
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
        "artifact_kind": "provider",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
        "law_identifier": "cruxible.provider.named.v1",
        "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
        "law_evidence_digest": "sha256:d4949d7d71f0e53c377d87de98f34ad3cdc3d1c0463bc5dc1b8c41ca3bb75d6f",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/sbom.components.result/v1.json",
            "target_artifact_digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/sbom.components.request/v1.json",
            "target_artifact_digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.query.result/v1.json",
            "target_artifact_digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.query.request/v1.json",
            "target_artifact_digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/sbom.components.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.match.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.match.result/v1.json",
            "target_artifact_digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.query.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.match.request/v1.json",
            "target_artifact_digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
            "pin_role": "contract"
          }
        ]
      }
    ],
    "members": [
      {
        "path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
        "artifact_kind": "provider",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "cruxible-provider-v6",
          "capture_contracts": [],
          "control_domain": "security-osv-provider",
          "identity": {
            "kind": "Provider",
            "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
          },
          "implementations": [
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_osv_provider.osv:OsvMatch",
              "implementation_digest": "sha256:a5ba4375aeeb317f5aa71ae61e659eb5be2575fe93ecbc1f4bf9842e1c2b97c2",
              "materialization_references": [
                {
                  "environment_pin_key": "linux-cp311",
                  "kind": "local_env",
                  "materialization_digest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "cruxible-provider-implementation-v2"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_osv_provider.osv:OsvQuery",
              "implementation_digest": "sha256:8db871dc285ba08e6b6ba8f789a1ee2480f9fbf40259203d3d05884231de171c",
              "materialization_references": [
                {
                  "environment_pin_key": "linux-cp311",
                  "kind": "local_env",
                  "materialization_digest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "cruxible-provider-implementation-v2"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "security_osv_provider.sbom:SbomComponents",
              "implementation_digest": "sha256:61678d99af35fa5c9f67f2df09f2fbf0bfd99b3accde15d8a536f8f6b7bbdae7",
              "materialization_references": [
                {
                  "environment_pin_key": "linux-cp311",
                  "kind": "local_env",
                  "materialization_digest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "cruxible-provider-implementation-v2"
            }
          ],
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "operations": [
            {
              "effect": "pure",
              "entrypoint": "security_osv_provider.osv:OsvMatch",
              "in": {
                "digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
                "name": "osv.match.request",
                "version": 1
              },
              "name": "osv.match",
              "out": {
                "digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
                "name": "osv.match.result",
                "version": 1
              },
              "refusals": {
                "provider_declined": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
                    "name": "osv.match.refusal.provider_declined",
                    "version": 1
                  }
                }
              }
            },
            {
              "effect": "external_read",
              "entrypoint": "security_osv_provider.osv:OsvQuery",
              "in": {
                "digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
                "name": "osv.query.request",
                "version": 1
              },
              "name": "osv.query",
              "out": {
                "digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
                "name": "osv.query.result",
                "version": 1
              },
              "refusals": {
                "provider_declined": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
                    "name": "osv.query.refusal.provider_declined",
                    "version": 1
                  }
                }
              }
            },
            {
              "effect": "pure",
              "entrypoint": "security_osv_provider.sbom:SbomComponents",
              "in": {
                "digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
                "name": "sbom.components.request",
                "version": 1
              },
              "name": "sbom.components",
              "out": {
                "digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
                "name": "sbom.components.result",
                "version": 1
              },
              "refusals": {
                "provider_declined": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
                    "name": "sbom.components.refusal.provider_declined",
                    "version": 1
                  }
                }
              }
            }
          ],
          "runtime_artifact": {
            "container": null,
            "distribution": {
              "filename": "security_osv_provider-d1-py3-none-any.whl",
              "materialization_source": "local",
              "name": "security-osv-provider",
              "sha256": "sha256:d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1",
              "version": "0.1.0.dev0"
            },
            "local_env": {
              "lock_sha256": "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
              "materialization_digests": {
                "linux-cp311": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
              }
            },
            "manifest": {
              "distribution": {
                "name": "security-osv-provider",
                "version": "0.1.0.dev0"
              },
              "entrypoint_group": "cruxible.providers",
              "implementations": [
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "https://api.osv.dev"
                  ],
                  "deterministic": false,
                  "entrypoint": "security_osv_provider.osv:OsvQuery",
                  "requires_extras": []
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [],
                  "deterministic": true,
                  "entrypoint": "security_osv_provider.osv:OsvMatch",
                  "requires_extras": []
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [],
                  "deterministic": true,
                  "entrypoint": "security_osv_provider.sbom:SbomComponents",
                  "requires_extras": []
                }
              ],
              "provider_id": "security-osv-provider",
              "schema_version": 2,
              "supported_protocol_majors": [
                2
              ]
            },
            "manifest_digest": "sha256:81da485481d57188768f840be09b7597eb70cf01a43f33c631d28e1862c3fd64",
            "provider_id": "security-osv-provider",
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
              "value": "cruxible-provider-v6"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/capture_contracts",
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
              "value": "security-osv-provider"
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
              "value": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
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
                  "entrypoint": "security_osv_provider.osv:OsvMatch",
                  "implementation_digest": "sha256:a5ba4375aeeb317f5aa71ae61e659eb5be2575fe93ecbc1f4bf9842e1c2b97c2",
                  "materialization_references": [
                    {
                      "environment_pin_key": "linux-cp311",
                      "kind": "local_env",
                      "materialization_digest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "cruxible-provider-implementation-v2"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_osv_provider.osv:OsvQuery",
                  "implementation_digest": "sha256:8db871dc285ba08e6b6ba8f789a1ee2480f9fbf40259203d3d05884231de171c",
                  "materialization_references": [
                    {
                      "environment_pin_key": "linux-cp311",
                      "kind": "local_env",
                      "materialization_digest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "cruxible-provider-implementation-v2"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "security_osv_provider.sbom:SbomComponents",
                  "implementation_digest": "sha256:61678d99af35fa5c9f67f2df09f2fbf0bfd99b3accde15d8a536f8f6b7bbdae7",
                  "materialization_references": [
                    {
                      "environment_pin_key": "linux-cp311",
                      "kind": "local_env",
                      "materialization_digest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "cruxible-provider-implementation-v2"
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
            "field_path": "/operations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "effect": "pure",
                  "entrypoint": "security_osv_provider.osv:OsvMatch",
                  "in": {
                    "digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
                    "name": "osv.match.request",
                    "version": 1
                  },
                  "name": "osv.match",
                  "out": {
                    "digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
                    "name": "osv.match.result",
                    "version": 1
                  },
                  "refusals": {
                    "provider_declined": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
                        "name": "osv.match.refusal.provider_declined",
                        "version": 1
                      }
                    }
                  }
                },
                {
                  "effect": "external_read",
                  "entrypoint": "security_osv_provider.osv:OsvQuery",
                  "in": {
                    "digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
                    "name": "osv.query.request",
                    "version": 1
                  },
                  "name": "osv.query",
                  "out": {
                    "digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
                    "name": "osv.query.result",
                    "version": 1
                  },
                  "refusals": {
                    "provider_declined": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
                        "name": "osv.query.refusal.provider_declined",
                        "version": 1
                      }
                    }
                  }
                },
                {
                  "effect": "pure",
                  "entrypoint": "security_osv_provider.sbom:SbomComponents",
                  "in": {
                    "digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
                    "name": "sbom.components.request",
                    "version": 1
                  },
                  "name": "sbom.components",
                  "out": {
                    "digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
                    "name": "sbom.components.result",
                    "version": 1
                  },
                  "refusals": {
                    "provider_declined": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
                        "name": "sbom.components.refusal.provider_declined",
                        "version": 1
                      }
                    }
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
              "value": "security_osv_provider-d1-py3-none-any.whl"
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
              "value": "security-osv-provider"
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
              "value": "sha256:d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1"
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
              "value": "0.1.0.dev0"
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
              "value": "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/runtime_artifact/local_env/materialization_digests/linux-cp311",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
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
              "value": "security-osv-provider"
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
              "value": "0.1.0.dev0"
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
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "https://api.osv.dev"
                  ],
                  "deterministic": false,
                  "entrypoint": "security_osv_provider.osv:OsvQuery",
                  "requires_extras": []
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [],
                  "deterministic": true,
                  "entrypoint": "security_osv_provider.osv:OsvMatch",
                  "requires_extras": []
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [],
                  "deterministic": true,
                  "entrypoint": "security_osv_provider.sbom:SbomComponents",
                  "requires_extras": []
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
              "value": "security-osv-provider"
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
              "value": 2
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
                2
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
              "value": "sha256:81da485481d57188768f840be09b7597eb70cf01a43f33c631d28e1862c3fd64"
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
              "value": "security-osv-provider"
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
        "law_identifier": "cruxible.provider.named.v1",
        "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
          "law_identifier": "cruxible.provider.named.v1",
          "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
          "evaluation_time": "2026-10-09T11:59:00.000000Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "7a92bbaf8edad04c143d0859c9481086d443c895",
            "semantic_root": "sha256:926f8f52313b650ca3be3b20d753c34a135e672c890baf0a97833d3ab52a4163",
            "generation_root": "sha256:0e5d8899caf59653dbfb2fcdaf68187b888ccf65ca0ca9ec024599ee839149c0",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.result/v1.json",
              "target_artifact_digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.request/v1.json",
              "target_artifact_digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.result/v1.json",
              "target_artifact_digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.request/v1.json",
              "target_artifact_digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/sbom.components.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.result/v1.json",
              "target_artifact_digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.query.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
              "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
              "target_path": "contracts/osv.match.request/v1.json",
              "target_artifact_digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
              "pin_role": "contract"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "referrers": [],
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/sbom.components.result/v1.json",
            "target_artifact_digest": "sha256:4fa2f7cb4d5f000a30abe573f4026c570558d84a3831410417331b5e7ddc6c60",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/sbom.components.request/v1.json",
            "target_artifact_digest": "sha256:5c622fc01dfabd8c7bd71842eeddb10d54255951a2105bab3ca28160fb5811ba",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.query.result/v1.json",
            "target_artifact_digest": "sha256:5cba02d44b4ae86b0bfb011df645080051c5399087a3714b15bc8ed240fcec6d",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.query.request/v1.json",
            "target_artifact_digest": "sha256:6f410ed449bdf9a724f7daf8df15adbd1ccff56fc45f010e6677ef3f77c0dab5",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/sbom.components.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:70af80eacd91d0472fb605ad16cb0f981da571b6c1d4d6ff73e3b5b4abc323f4",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.match.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:85801a9cc184875a015aec5713f5c295842961efa12ea4ba9afb01243336e408",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.match.result/v1.json",
            "target_artifact_digest": "sha256:8dc8e9b5d54e859ff24e5110ebdb1c3c0327f4e9b13a995aae156c7e9c2858e4",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.query.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:9ef811f6aec2e9a0b68c033abbd6f8cf48f44db77f0ae432b2ae25aada2b42bf",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json",
            "source_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
            "target_path": "contracts/osv.match.request/v1.json",
            "target_artifact_digest": "sha256:af7b4623f7d4681722e0a3764152080ffbeadac82f9b643fefd1dbd76b2df8af",
            "pin_role": "contract"
          }
        ],
        "prior_refusals": []
      }
    ],
    "governance": {
      "activation_policy": "snapshot",
      "approval_requirements": [],
      "law_digests": {
        "cruxible.provider.named.v1": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac"
      },
      "required_tier": "governed_write"
    },
    "provenance": {
      "actor_id": "owner",
      "source_compilation_digest": null
    },
    "originating_line": null,
    "rationale": null,
    "item_reasons": [],
    "item_reason_count": 0,
    "item_reasons_next_cursor": null,
    "attestation_coverage": {
      "attestations": [],
      "coverage": "containing_change_set",
      "coverage_basis": {
        "candidate_digest": "sha256:2e2ce14c9c6e147bee71e371dae4e6dfd5074d078215d2ad3a6bac24d5d160fb",
        "scope": [
          "providers/security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec.json"
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
