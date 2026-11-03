// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/proposals/sha256:403bef0e25bc436e940c36c9beaddd58ff192392030bc54a2850ea05aa72f8ec/review 5070cd9e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/proposals/{proposal_id}/review",
  "pathParams": {
    "proposal_id": "sha256:403bef0e25bc436e940c36c9beaddd58ff192392030bc54a2850ea05aa72f8ec"
  },
  "body": {
    "detail": true
  },
  "response": {
    "tag": "playbill-proposal-review-v1",
    "coordinate_kind": "provisional",
    "proposal_id": "sha256:403bef0e25bc436e940c36c9beaddd58ff192392030bc54a2850ea05aa72f8ec",
    "candidate": {
      "tag": "playbill-validated-candidate-v3",
      "candidate": {
        "tag": "playbill-candidate-v2",
        "parent_semantic_root": "sha256:fb1187ba334ed0d535cae992442c7ac569347a4d64f7c0d37a38ebfc687cd339",
        "candidate_manifest_root": "merkle-sha256:3342fa8cf4296e05a29146211fd003ac52d4699953ac71db16b7cf4f6078e900",
        "semantic_diff_digest": "sha256:07c0a14773443bea6d26ae9972e2c25c54b762f2b876f661303ff605a0c19112",
        "scope": [
          "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json"
        ],
        "timestamp": "2026-11-03T00:58:24.424836Z"
      },
      "candidate_digest": "sha256:4c31986da7e2441a074c5fc6699c2bfdfae0c499ba532e1a385488c420cbd503",
      "required_tier": "governed_write",
      "approval_requirements": [],
      "activation_policy": "snapshot",
      "closure_proof": {
        "tag": "playbill-closure-proof-v3",
        "strategy": "dependency-closure-v3",
        "paths": [
          "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json"
        ],
        "dependency_edge_root": "depgraph-sha256:18a316b57db3bbaa87f85b6265358d7866f9732a0b81501865b31bfb591a2827",
        "member_evidence_digest": "sha256:99740207b856f8790bd92e8f1ec2d568a1d58e9fa59aa6485ebcc32cc7650835"
      },
      "members": [
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
          "artifact_kind": "provider",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
          "law_identifier": "cruxible.provider.named.v1",
          "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
          "law_evidence_digest": "sha256:8f30f6193dd346cdc76eb6beb5b9de239216940f5826a09994b992c4d0b0ea99",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.credential_unavailable/v1.json",
              "target_artifact_digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.cross_origin_credentialed_redirect/v1.json",
              "target_artifact_digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.undeclared_instance/v1.json",
              "target_artifact_digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.unsupported_redirect_scheme/v1.json",
              "target_artifact_digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.result/v1.json",
              "target_artifact_digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.result/v1.json",
              "target_artifact_digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.request/v1.json",
              "target_artifact_digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.redirect_limit/v1.json",
              "target_artifact_digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.unsupported_redirect_scheme/v1.json",
              "target_artifact_digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.result/v1.json",
              "target_artifact_digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.request/v1.json",
              "target_artifact_digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.request/v1.json",
              "target_artifact_digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.redirect_limit/v1.json",
              "target_artifact_digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.cross_origin_credentialed_redirect/v1.json",
              "target_artifact_digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.refusal.engine_unavailable/v1.json",
              "target_artifact_digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
              "pin_role": "contract"
            }
          ]
        }
      ],
      "law_evidence": [
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
          "law_identifier": "cruxible.provider.named.v1",
          "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
          "evaluation_time": "2026-11-03T00:58:24.424836Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "dd1ad147394c9cf1e3dae22ee305acadc9210a90",
            "semantic_root": "sha256:fb1187ba334ed0d535cae992442c7ac569347a4d64f7c0d37a38ebfc687cd339",
            "generation_root": "sha256:6bedab8978e7dd3b4b2dcb856c711f16900984f91c4ae594bc7e4367319f278a",
            "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.credential_unavailable/v1.json",
              "target_artifact_digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.cross_origin_credentialed_redirect/v1.json",
              "target_artifact_digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.undeclared_instance/v1.json",
              "target_artifact_digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.unsupported_redirect_scheme/v1.json",
              "target_artifact_digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.result/v1.json",
              "target_artifact_digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.result/v1.json",
              "target_artifact_digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.request/v1.json",
              "target_artifact_digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.redirect_limit/v1.json",
              "target_artifact_digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.unsupported_redirect_scheme/v1.json",
              "target_artifact_digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.result/v1.json",
              "target_artifact_digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.request/v1.json",
              "target_artifact_digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.request/v1.json",
              "target_artifact_digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.redirect_limit/v1.json",
              "target_artifact_digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.cross_origin_credentialed_redirect/v1.json",
              "target_artifact_digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.refusal.engine_unavailable/v1.json",
              "target_artifact_digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
              "pin_role": "contract"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "referrers": [],
            "verdict": "accepted"
          },
          "diagnostics": []
        }
      ],
      "law_digests": {
        "cruxible.provider.named.v1": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac"
      },
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "candidate_digest": "sha256:4c31986da7e2441a074c5fc6699c2bfdfae0c499ba532e1a385488c420cbd503",
    "parent_semantic_root": "sha256:fb1187ba334ed0d535cae992442c7ac569347a4d64f7c0d37a38ebfc687cd339",
    "settlement_base": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "dd1ad147394c9cf1e3dae22ee305acadc9210a90",
      "semantic_root": "sha256:fb1187ba334ed0d535cae992442c7ac569347a4d64f7c0d37a38ebfc687cd339",
      "generation_root": "sha256:6bedab8978e7dd3b4b2dcb856c711f16900984f91c4ae594bc7e4367319f278a",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "base_oid": "dd1ad147394c9cf1e3dae22ee305acadc9210a90",
    "complete_members": [
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
        "artifact_kind": "provider",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
        "law_identifier": "cruxible.provider.named.v1",
        "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
        "law_evidence_digest": "sha256:8f30f6193dd346cdc76eb6beb5b9de239216940f5826a09994b992c4d0b0ea99",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.credential_unavailable/v1.json",
            "target_artifact_digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.cross_origin_credentialed_redirect/v1.json",
            "target_artifact_digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.undeclared_instance/v1.json",
            "target_artifact_digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.unsupported_redirect_scheme/v1.json",
            "target_artifact_digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.result/v1.json",
            "target_artifact_digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.result/v1.json",
            "target_artifact_digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.request/v1.json",
            "target_artifact_digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.redirect_limit/v1.json",
            "target_artifact_digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.unsupported_redirect_scheme/v1.json",
            "target_artifact_digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.result/v1.json",
            "target_artifact_digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.request/v1.json",
            "target_artifact_digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.request/v1.json",
            "target_artifact_digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.redirect_limit/v1.json",
            "target_artifact_digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.cross_origin_credentialed_redirect/v1.json",
            "target_artifact_digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.refusal.engine_unavailable/v1.json",
            "target_artifact_digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
            "pin_role": "contract"
          }
        ]
      }
    ],
    "members": [
      {
        "path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
        "artifact_kind": "provider",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "cruxible-provider-v6",
          "capture_contracts": [],
          "control_domain": "cruxible-provider-web",
          "identity": {
            "kind": "Provider",
            "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
          },
          "implementations": [
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "cruxible_provider_web.fetch:WebFetch",
              "implementation_digest": "sha256:7a26856d4f10560781aeeb5303965d67f4c987becc2eb8f340db7d348ac1e64b",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:4fe71e794055361c6dc1acd844b015bab68fb4f090540c3684c76e8ba9987000",
                  "tag": "playbill-provider-local-materialization-reference-v1"
                }
              ],
              "tag": "cruxible-provider-implementation-v2"
            },
            {
              "backend_kinds": [
                "local_env"
              ],
              "entrypoint": "cruxible_provider_web.search:SearxngSearch",
              "implementation_digest": "sha256:f06916e8bb5f7aa79faa38995e27372e955b139919e15cc0cc5501368b93fafd",
              "materialization_references": [
                {
                  "environment_pin_key": "darwin-arm64-cp313",
                  "kind": "local_env",
                  "materialization_digest": "sha256:4fe71e794055361c6dc1acd844b015bab68fb4f090540c3684c76e8ba9987000",
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
              "effect": "external_read",
              "entrypoint": "cruxible_provider_web.search:SearxngSearch",
              "in": {
                "digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
                "name": "search.web.request",
                "version": 1
              },
              "name": "search.web",
              "out": {
                "digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
                "name": "search.web.result",
                "version": 1
              },
              "refusals": {
                "cross_origin_credentialed_redirect": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
                    "name": "search.web.refusal.cross_origin_credentialed_redirect",
                    "version": 1
                  }
                },
                "provider_declined": {
                  "absorbable": true,
                  "contract": {
                    "digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
                    "name": "search.web.refusal.provider_declined",
                    "version": 1
                  }
                },
                "redirect_limit": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
                    "name": "search.web.refusal.redirect_limit",
                    "version": 1
                  }
                },
                "undeclared_instance": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
                    "name": "search.web.refusal.undeclared_instance",
                    "version": 1
                  }
                },
                "unsupported_redirect_scheme": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
                    "name": "search.web.refusal.unsupported_redirect_scheme",
                    "version": 1
                  }
                }
              }
            },
            {
              "effect": "external_read",
              "entrypoint": "cruxible_provider_web.fetch:WebFetch",
              "in": {
                "digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
                "name": "web.fetch.request",
                "version": 1
              },
              "name": "web.fetch",
              "out": {
                "digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
                "name": "web.fetch.result",
                "version": 1
              },
              "refusals": {
                "credential_unavailable": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
                    "name": "web.fetch.refusal.credential_unavailable",
                    "version": 1
                  }
                },
                "cross_origin_credentialed_redirect": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
                    "name": "web.fetch.refusal.cross_origin_credentialed_redirect",
                    "version": 1
                  }
                },
                "provider_declined": {
                  "absorbable": true,
                  "contract": {
                    "digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
                    "name": "web.fetch.refusal.provider_declined",
                    "version": 1
                  }
                },
                "redirect_limit": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
                    "name": "web.fetch.refusal.redirect_limit",
                    "version": 1
                  }
                },
                "unsupported_redirect_scheme": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
                    "name": "web.fetch.refusal.unsupported_redirect_scheme",
                    "version": 1
                  }
                }
              }
            },
            {
              "effect": "external_read",
              "entrypoint": "cruxible_provider_web.render:WebRender",
              "in": {
                "digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
                "name": "web.render.request",
                "version": 1
              },
              "name": "web.render",
              "out": {
                "digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
                "name": "web.render.result",
                "version": 1
              },
              "refusals": {
                "engine_unavailable": {
                  "absorbable": false,
                  "contract": {
                    "digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
                    "name": "web.render.refusal.engine_unavailable",
                    "version": 1
                  }
                },
                "provider_declined": {
                  "absorbable": true,
                  "contract": {
                    "digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
                    "name": "web.render.refusal.provider_declined",
                    "version": 1
                  }
                }
              }
            }
          ],
          "runtime_artifact": {
            "container": null,
            "distribution": {
              "filename": "cruxible_provider_web-0.4.0-py3-none-any.whl",
              "materialization_source": "local",
              "name": "cruxible-provider-web",
              "sha256": "sha256:4869e149e2bce8c27a7bc3f18efa6864b6365b8e1b65bf7a33bc978cfde584c3",
              "version": "0.4.0"
            },
            "local_env": {
              "lock_sha256": "sha256:a9dd9e7bd79c8d0e0a1c73408e48ef39ce56e2831ac50dac45e1e4c72c987665",
              "materialization_digests": {
                "darwin-arm64-cp313": "sha256:4fe71e794055361c6dc1acd844b015bab68fb4f090540c3684c76e8ba9987000"
              }
            },
            "manifest": {
              "distribution": {
                "name": "cruxible-provider-web",
                "version": "0.4.0"
              },
              "entrypoint_group": "cruxible.providers",
              "implementations": [
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-run-input"
                  ],
                  "deterministic": false,
                  "entrypoint": "cruxible_provider_web.fetch:WebFetch",
                  "requires_extras": []
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-run-input"
                  ],
                  "deterministic": false,
                  "entrypoint": "cruxible_provider_web.render:WebRender",
                  "requires_extras": [
                    "browser"
                  ]
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-configuration"
                  ],
                  "deterministic": false,
                  "entrypoint": "cruxible_provider_web.search:SearxngSearch",
                  "requires_extras": []
                }
              ],
              "provider_id": "cruxible-provider-web",
              "schema_version": 2,
              "supported_protocol_majors": [
                2
              ]
            },
            "manifest_digest": "sha256:85b641dd572b2a671df522456cb18fcb4d955024d17a557c56bb5d15fda5e243",
            "provider_id": "cruxible-provider-web",
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
              "value": "cruxible-provider-web"
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
              "value": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
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
                  "entrypoint": "cruxible_provider_web.fetch:WebFetch",
                  "implementation_digest": "sha256:7a26856d4f10560781aeeb5303965d67f4c987becc2eb8f340db7d348ac1e64b",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:4fe71e794055361c6dc1acd844b015bab68fb4f090540c3684c76e8ba9987000",
                      "tag": "playbill-provider-local-materialization-reference-v1"
                    }
                  ],
                  "tag": "cruxible-provider-implementation-v2"
                },
                {
                  "backend_kinds": [
                    "local_env"
                  ],
                  "entrypoint": "cruxible_provider_web.search:SearxngSearch",
                  "implementation_digest": "sha256:f06916e8bb5f7aa79faa38995e27372e955b139919e15cc0cc5501368b93fafd",
                  "materialization_references": [
                    {
                      "environment_pin_key": "darwin-arm64-cp313",
                      "kind": "local_env",
                      "materialization_digest": "sha256:4fe71e794055361c6dc1acd844b015bab68fb4f090540c3684c76e8ba9987000",
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
                  "effect": "external_read",
                  "entrypoint": "cruxible_provider_web.search:SearxngSearch",
                  "in": {
                    "digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
                    "name": "search.web.request",
                    "version": 1
                  },
                  "name": "search.web",
                  "out": {
                    "digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
                    "name": "search.web.result",
                    "version": 1
                  },
                  "refusals": {
                    "cross_origin_credentialed_redirect": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
                        "name": "search.web.refusal.cross_origin_credentialed_redirect",
                        "version": 1
                      }
                    },
                    "provider_declined": {
                      "absorbable": true,
                      "contract": {
                        "digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
                        "name": "search.web.refusal.provider_declined",
                        "version": 1
                      }
                    },
                    "redirect_limit": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
                        "name": "search.web.refusal.redirect_limit",
                        "version": 1
                      }
                    },
                    "undeclared_instance": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
                        "name": "search.web.refusal.undeclared_instance",
                        "version": 1
                      }
                    },
                    "unsupported_redirect_scheme": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
                        "name": "search.web.refusal.unsupported_redirect_scheme",
                        "version": 1
                      }
                    }
                  }
                },
                {
                  "effect": "external_read",
                  "entrypoint": "cruxible_provider_web.fetch:WebFetch",
                  "in": {
                    "digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
                    "name": "web.fetch.request",
                    "version": 1
                  },
                  "name": "web.fetch",
                  "out": {
                    "digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
                    "name": "web.fetch.result",
                    "version": 1
                  },
                  "refusals": {
                    "credential_unavailable": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
                        "name": "web.fetch.refusal.credential_unavailable",
                        "version": 1
                      }
                    },
                    "cross_origin_credentialed_redirect": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
                        "name": "web.fetch.refusal.cross_origin_credentialed_redirect",
                        "version": 1
                      }
                    },
                    "provider_declined": {
                      "absorbable": true,
                      "contract": {
                        "digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
                        "name": "web.fetch.refusal.provider_declined",
                        "version": 1
                      }
                    },
                    "redirect_limit": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
                        "name": "web.fetch.refusal.redirect_limit",
                        "version": 1
                      }
                    },
                    "unsupported_redirect_scheme": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
                        "name": "web.fetch.refusal.unsupported_redirect_scheme",
                        "version": 1
                      }
                    }
                  }
                },
                {
                  "effect": "external_read",
                  "entrypoint": "cruxible_provider_web.render:WebRender",
                  "in": {
                    "digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
                    "name": "web.render.request",
                    "version": 1
                  },
                  "name": "web.render",
                  "out": {
                    "digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
                    "name": "web.render.result",
                    "version": 1
                  },
                  "refusals": {
                    "engine_unavailable": {
                      "absorbable": false,
                      "contract": {
                        "digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
                        "name": "web.render.refusal.engine_unavailable",
                        "version": 1
                      }
                    },
                    "provider_declined": {
                      "absorbable": true,
                      "contract": {
                        "digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
                        "name": "web.render.refusal.provider_declined",
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
              "value": "cruxible_provider_web-0.4.0-py3-none-any.whl"
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
              "value": "cruxible-provider-web"
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
              "value": "sha256:4869e149e2bce8c27a7bc3f18efa6864b6365b8e1b65bf7a33bc978cfde584c3"
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
              "value": "0.4.0"
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
              "value": "sha256:a9dd9e7bd79c8d0e0a1c73408e48ef39ce56e2831ac50dac45e1e4c72c987665"
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
              "value": "sha256:4fe71e794055361c6dc1acd844b015bab68fb4f090540c3684c76e8ba9987000"
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
              "value": "cruxible-provider-web"
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
              "value": "0.4.0"
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
                    "dynamic:target-from-run-input"
                  ],
                  "deterministic": false,
                  "entrypoint": "cruxible_provider_web.fetch:WebFetch",
                  "requires_extras": []
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-run-input"
                  ],
                  "deterministic": false,
                  "entrypoint": "cruxible_provider_web.render:WebRender",
                  "requires_extras": [
                    "browser"
                  ]
                },
                {
                  "backends": [
                    "local_env",
                    "container"
                  ],
                  "declared_endpoints": [
                    "dynamic:target-from-configuration"
                  ],
                  "deterministic": false,
                  "entrypoint": "cruxible_provider_web.search:SearxngSearch",
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
              "value": "cruxible-provider-web"
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
              "value": "sha256:85b641dd572b2a671df522456cb18fcb4d955024d17a557c56bb5d15fda5e243"
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
              "value": "cruxible-provider-web"
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
          "path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
          "law_identifier": "cruxible.provider.named.v1",
          "law_digest": "sha256:949d9d7219df87ef73187c23a5db31bb346c808b1f60e77680fcde6b3f38ddac",
          "evaluation_time": "2026-11-03T00:58:24.424836Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "dd1ad147394c9cf1e3dae22ee305acadc9210a90",
            "semantic_root": "sha256:fb1187ba334ed0d535cae992442c7ac569347a4d64f7c0d37a38ebfc687cd339",
            "generation_root": "sha256:6bedab8978e7dd3b4b2dcb856c711f16900984f91c4ae594bc7e4367319f278a",
            "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.credential_unavailable/v1.json",
              "target_artifact_digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.cross_origin_credentialed_redirect/v1.json",
              "target_artifact_digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.undeclared_instance/v1.json",
              "target_artifact_digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.unsupported_redirect_scheme/v1.json",
              "target_artifact_digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.result/v1.json",
              "target_artifact_digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.result/v1.json",
              "target_artifact_digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.request/v1.json",
              "target_artifact_digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.redirect_limit/v1.json",
              "target_artifact_digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.unsupported_redirect_scheme/v1.json",
              "target_artifact_digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.result/v1.json",
              "target_artifact_digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.request/v1.json",
              "target_artifact_digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.request/v1.json",
              "target_artifact_digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.fetch.refusal.redirect_limit/v1.json",
              "target_artifact_digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.cross_origin_credentialed_redirect/v1.json",
              "target_artifact_digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/search.web.refusal.provider_declined/v1.json",
              "target_artifact_digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
              "pin_role": "contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
              "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
              "target_path": "contracts/web.render.refusal.engine_unavailable/v1.json",
              "target_artifact_digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
              "pin_role": "contract"
            }
          ],
          "policy_digests": [],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "referrers": [],
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.credential_unavailable/v1.json",
            "target_artifact_digest": "sha256:05430179f65d5039bc956508bffb389a33c60f0b3a8696b0a4c412bd033a720d",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.cross_origin_credentialed_redirect/v1.json",
            "target_artifact_digest": "sha256:0e83ad519c9c16a92a9245525fb41e2514cfb43bef89a92271121ce6fae8c272",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.undeclared_instance/v1.json",
            "target_artifact_digest": "sha256:202dd006f7e02402a0c05a3fbf8c4d46ae77d7e28f6e6cf6af30f00522b1585b",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.unsupported_redirect_scheme/v1.json",
            "target_artifact_digest": "sha256:2d367fc9038c75092fd1d7a9857e8a7ba74d029dc42e66c07f130955dd9a7461",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.result/v1.json",
            "target_artifact_digest": "sha256:35adb8820096a13704c0e076be2bc66aa84295a44edf2d52801c4ce185d9784a",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.result/v1.json",
            "target_artifact_digest": "sha256:3b2ea59f175faa175b6d2436ec7f810f93345653da672b1d757611c537ebc4b8",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.request/v1.json",
            "target_artifact_digest": "sha256:6be586f78620d23ddf517317f0d19e920946baf90aa2104a725c0b95b0ffbd30",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.redirect_limit/v1.json",
            "target_artifact_digest": "sha256:7494efbe7c6514833bde21c2d2429537b1619cdc6d7498dd60b62bb4069180bc",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:8e12bd02e7a67487e9a1ab6ff1ef848bab811bde8f0b0ecedeb9ffeb83fa96ad",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.unsupported_redirect_scheme/v1.json",
            "target_artifact_digest": "sha256:913c0abbfc3d378e46a6c7cc2f83f0b6eaa88b586290d6698c2125d4c0f300aa",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.result/v1.json",
            "target_artifact_digest": "sha256:94f256cdc9f9dfb45d8ac2a55e5aaf40bdb64757cbbf21703baeb8bd8d03062f",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.request/v1.json",
            "target_artifact_digest": "sha256:9e0c1df12ce512063076958f72e92f98c3264aca1514d21c2616d554aebc68bc",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.request/v1.json",
            "target_artifact_digest": "sha256:aadce6a34cd1993e763632688ab3638bd5fae8585c9dc13e6ba2786fffc67983",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:b81903778e7b842d5f2587ac82d1fb50a1e1d0a99ca13f9428770728878a7803",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.fetch.refusal.redirect_limit/v1.json",
            "target_artifact_digest": "sha256:d23430d69893f628e44afe639777f9825c5e2fcaa9f48bb4d3ee7e2ca45ac3b3",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.cross_origin_credentialed_redirect/v1.json",
            "target_artifact_digest": "sha256:ed37abc864eb06214d91625952e2a69172f0d4660e5d4d1322ec3f4db9ddf52f",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/search.web.refusal.provider_declined/v1.json",
            "target_artifact_digest": "sha256:ed4b4c73c2791ed01297befbacf0e8c8613b35806e39e21c259085197ed73683",
            "pin_role": "contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json",
            "source_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
            "target_path": "contracts/web.render.refusal.engine_unavailable/v1.json",
            "target_artifact_digest": "sha256:f64e8cdb787868e791d583a6b3dc2a4585a299fb6a2541849fa0833880be1bf3",
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
      "actor_id": "pilot-owner",
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
        "candidate_digest": "sha256:4c31986da7e2441a074c5fc6699c2bfdfae0c499ba532e1a385488c420cbd503",
        "scope": [
          "providers/cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c.json"
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
