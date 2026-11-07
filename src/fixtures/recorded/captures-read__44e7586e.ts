// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/captures/read 88ad24ac
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/captures/read",
  "body": {
    "capture_digest": "CAP-9b75f24c295f",
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
    "capture_digest": "sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840",
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
      "capture_contract_digest": "sha256:ef90e905b1759f5874c2831b00321d0a323e16388debfb2299df8ae21bb1c172",
      "source": {
        "tag": "playbill-external-source-reference-v1",
        "kind": "external",
        "source_identity": "triage.notes",
        "producer_binding_digest": "sha256:6c200eacf6f0349be90d1d2655178a699d13a1dee86ea93745d0fe5e877b04aa",
        "coordinate_type": "foreign-source-snapshot-v1",
        "coordinate": {
          "kind": "observed_digest",
          "source_byte_length": 393,
          "source_content_digest": "sha256:eb1beeab54e24b2222249505274d44080c5efc6f7310cbbe24cedae9f525f591"
        },
        "selector_type": "foreign-source-span-v1",
        "selector": {
          "claim_id": "CLM-260724b6a176569d560f4d889ca9e36a",
          "working_selection": {
            "anchor": "### CVE-2026-49844",
            "end_byte": 393,
            "observed_occurrence_count": 1,
            "section": {
              "extent": "section",
              "path": [
                "Triage notes",
                "log4j-api 2.14.1",
                "CVE-2026-49844"
              ]
            },
            "selected_occurrence": null,
            "start_byte": 258,
            "tag": "playbill-working-anchor-window-v1"
          }
        },
        "replayability": "attested_only"
      },
      "commitment": {
        "tag": "playbill-evidence-commitment-v1",
        "digest_kind": "exact_bytes",
        "digest": "sha256:5c41200cd511a7a73a2441977a36c903c862c11219baa5bb03766f82a2431f69",
        "byte_length": 135,
        "materialization": "cas"
      },
      "run_coordinate": {
        "tag": "playbill-capture-run-coordinate-v1",
        "run_kind": "provider",
        "run_id": "foreign-source:clm-260724b6a176569d560f4d889ca9e36a",
        "bound_generation": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "executable_identity": {
          "kind": "CaptureContract",
          "name": "playbill.foreign-source.triage.notes"
        },
        "executable_digest": "sha256:ef90e905b1759f5874c2831b00321d0a323e16388debfb2299df8ae21bb1c172"
      },
      "run_receipt_digest": "sha256:3377c02ff7808007cb415988b4caa1e956f83037eacc02530ce0be1d59ca7894",
      "producer": {
        "kind": "Principal",
        "name": "owner"
      },
      "producer_binding_digest": "sha256:6c200eacf6f0349be90d1d2655178a699d13a1dee86ea93745d0fe5e877b04aa",
      "observed_at": "2026-11-07T22:22:26.354876Z",
      "source_effective_time": null,
      "reducer_digest": null,
      "input_receipt_set_manifest_digest": null
    },
    "contract_address": "capture-contracts/playbill.foreign-source.triage.notes.json",
    "epistemic_grade": "observed",
    "citation_role": "evidence",
    "material": {
      "tag": "playbill-source-dereference-result-v1",
      "source_handle_digest": "sha256:ceb39efb70a676cee36b531eda6a2e25c63f343e7a97d6e7f9c278935b061d56",
      "status": "verified",
      "commitment_verified": true,
      "observed_commitment_digest": "sha256:5c41200cd511a7a73a2441977a36c903c862c11219baa5bb03766f82a2431f69",
      "material_kind": "bytes",
      "canonical_material": null,
      "body_access": {
        "tag": "playbill-body-access-result-v1",
        "status": "available",
        "content_digest": "sha256:5c41200cd511a7a73a2441977a36c903c862c11219baa5bb03766f82a2431f69",
        "byte_length": 135,
        "body_base64": "IyMjIENWRS0yMDI2LTQ5ODQ0CgpTdGlsbCByZWFkaW5nIHdoZXRoZXIgdGhlIGRlbW8gYXBwIHBhc3NlcyBhdHRhY2tlci1jb250cm9sbGVkIHBhdHRlcm5zIHRvIHRoZSBBUEk7IGhvbGRpbmcgdW50aWwgdGhlIEtFViBkdWUgZGF0ZS4K"
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
