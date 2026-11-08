// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/captures/read ef2246d7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/captures/read",
  "body": {
    "capture_digest": "CAP-0239f03a7356",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "max_bytes": 33554432
  },
  "response": {
    "tag": "playbill-capture-read-v1",
    "capture_digest": "sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "status": "verified",
    "reason": null,
    "envelope": {
      "tag": "playbill-capture-envelope-v1",
      "capture_contract_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
      "source": {
        "tag": "playbill-cas-source-reference-v1",
        "kind": "cas",
        "content_digest": "sha256:0e6c67eb408df9cfcc00da1916829f40b11fec14fb83092883d8ce17fa624d27"
      },
      "commitment": {
        "tag": "playbill-evidence-commitment-v1",
        "digest_kind": "exact_bytes",
        "digest": "sha256:0e6c67eb408df9cfcc00da1916829f40b11fec14fb83092883d8ce17fa624d27",
        "byte_length": 79,
        "materialization": "cas"
      },
      "run_coordinate": {
        "tag": "playbill-capture-run-coordinate-v1",
        "run_kind": "provider",
        "run_id": "coordinator-self-source:clm-260724b6a176569d560f4d889ca9e36a",
        "bound_generation": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "executable_identity": {
          "kind": "CaptureContract",
          "name": "playbill.coordinator-self-source-v1"
        },
        "executable_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47"
      },
      "run_receipt_digest": "sha256:8f869f6020b963aa0ce6a16252dcad4268f1763512c5ef99d3e97275e3d2f142",
      "producer": {
        "kind": "Principal",
        "name": "owner"
      },
      "producer_binding_digest": "sha256:21d3ade589510906e067856bb4ed98f1e11299782f0be9cedb1acae0c0f0a399",
      "observed_at": "2026-11-07T22:22:26.354876Z",
      "source_effective_time": null,
      "reducer_digest": null,
      "input_receipt_set_manifest_digest": null
    },
    "contract_address": "capture-contracts/playbill.coordinator-self-source-v1.json",
    "epistemic_grade": "observed",
    "citation_role": "copy",
    "material": {
      "tag": "playbill-source-dereference-result-v1",
      "source_handle_digest": "sha256:32f594376956e1b1b02cc1e5663266fbc962741a5cd13db07e6ebf2b1a281b5f",
      "status": "verified",
      "commitment_verified": true,
      "observed_commitment_digest": "sha256:0e6c67eb408df9cfcc00da1916829f40b11fec14fb83092883d8ce17fa624d27",
      "material_kind": "bytes",
      "canonical_material": null,
      "body_access": {
        "tag": "playbill-body-access-result-v1",
        "status": "available",
        "content_digest": "sha256:0e6c67eb408df9cfcc00da1916829f40b11fec14fb83092883d8ce17fa624d27",
        "byte_length": 79,
        "body_base64": "Q2hlY2tpbmcgd2hldGhlciB0aGUgZGVtbyBhcHAgcGFzc2VzIGF0dGFja2VyLWNvbnRyb2xsZWQgcGF0dGVybnMgdG8gbG9nNGotYXBpLg=="
      },
      "coverage": {
        "tag": "playbill-coverage-descriptor-v1",
        "requested_facets": [
          "source_material"
        ],
        "available_facets": [
          "source_material"
        ],
        "omitted_for_access": [],
        "truncated_facets": [],
        "reason_codes": []
      }
    }
  }
});
