// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 77b23f9c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "section": "pins",
    "limit": 500,
    "cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1Njo4YjFmYzRjNDI5ZmJiZGM5ZWVlMzkxNWRjM2MyMmFmNjRmZGJkYmEzNDY1Nzk1Y2ViMjcwYjAxMzcxZjg5OWJkIiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjE0OWQyOTI5NjEwZGJlMWY2YjljNzhkMWYxYmJlYjBlMTQzODZhMGY5ZTk2ZGZmMWQzMDIzMWU3MjBhY2NjYmYiLCJnaXRfb2lkIjoiOTcwNDBkYmZkZDFlN2UyODQwOThiNDllY2M2NTA0YWVjYjIxMWQ4MCIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6ODg4ZDM5ZWRkM2VkOGY3YzYzNzE5MTIxZGIyODg5NDEwNWM3NGEzY2ZiN2FmYzMyNjA4ODg0ZjhmNzI3ZjFkMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OmQ1N2M3MGVjZjYxZmZiNGFiMjA1OTczNWZhMmUyM2VkODZjYjkxOGYyODdkNzVmMGJjZjU5ZTY1NjEyMjZjNGUiLCJsYXN0X2tleSI6WyJRdWVyeURlZmluaXRpb246c2VjdXJpdHkucHVibGlzaF9wYXRocyIsIjEzIl0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6InBpbnMifSwic25hcHNob3QiOiJrZXlzZXQifQ=="
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-20T21:42:31.205878Z",
    "section": "pins",
    "pins": [
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "target_digest": "sha256:83fdbafc2053880a4df5acf636eaaf85a2cf0b4e2cfd1072fe3f465600697ddd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.built_from",
        "target_digest": "sha256:33adcea5d16a2e4aebaa313e7e2af2b46873250e5a76bc0f66c91602dde176c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.declared_sha256",
        "target_digest": "sha256:f6fec93280a318e9d1f43db80b79f344c9eb34c1ba5a0626809b752bc4be1bfd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.name",
        "target_digest": "sha256:380bd13e23ed8f0f70f29471b9651608dbe1efb30a7cc37245f0005008d05886",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.publish_environment",
        "target_digest": "sha256:d7d062aeb8cbe871edb8b0e158feb03ee5ae1292f7517388271618567ae63c28",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.published_by",
        "target_digest": "sha256:39d60d723a1bab48f1a66b7d3d87146e3669cca4738bcd467059b8f4e87b17f7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.release",
        "target_digest": "sha256:f1aaef4d7fc04e08f5f9d3888e61dad241e3b12485bb9793bf149e091816e68b",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.sha256",
        "target_digest": "sha256:ffa56935ebeec1e7597a2738ffc705714e29a58b018ad6924c57a705eb45fe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.target",
        "target_digest": "sha256:55d32de621428fc02ea467f506405ce281401be8fd6cb965dc4070114e4db024",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.change.commit_sha",
        "target_digest": "sha256:00a12f229de9618dc5a5d22384bf467b9a2fb56f423904f6e2165bb5c5eebe1e",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.source",
        "target_digest": "sha256:5912a400500c1c5b77edfbabb5649f486b6b7437dc21a33ba76ef0175a5ee352",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.product.supplied_by",
        "target_digest": "sha256:bdf132d406f6cb60826db49c6dc7c7df67a155b7e680da0fe09aaef555f64dee",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "target_digest": "sha256:4e8b57900ef2aad2287cb7c836f49f9c241c31e6aa88c505ef13debae7ae0a29",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.product",
        "target_digest": "sha256:be90dfcb4fc01f54a01f86f95ac00141c3cd769c5c833a4d9a68a9189ac60e11",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "target_digest": "sha256:59db3d9aefaaabe5c1d2f72cdcaaf9f302cb07ab7aacb7ee86223bb5441c1050",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.supplier.name",
        "target_digest": "sha256:447410ca6e35eb4882db331c1691c4fa82eccd9ac2a11f19cee7eb1f9d73a196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "target_digest": "sha256:f52be32f6a2997c6d1672ce52f2b6afb41f76430adf76a2520311308e99886c6",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "target_digest": "sha256:cb22ba0b3584b93bd221f7d07ed776c57422f37c67279eb3e2b8296396a738d5",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "target_digest": "sha256:506d6d673a397aee7fb9a43114a1c51d5196abc454c927ccb48dedabc1d66edd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "target_digest": "sha256:2a29f2494840a6dea9e7da0c7d0bf458b6022a1e45cdefc78476c95c29239857",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "target_digest": "sha256:62ff1936036ef6b36a7223c478fc31bbae2076450f1e524b5296cf18781320fe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "target_digest": "sha256:abb8f39dc629f6ae6f50d876b396740e3cced99d65d22c8e9da0bb5b6b9b75c7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "target_digest": "sha256:0954f2ac7a329507371c62a37de294cd171f5e7fb5ebb02d85d77031cda3379c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "target_digest": "sha256:f766b99bb745df3a1f9f98842f00d173d2b116cd8d3d0f18d9cbb33d7205b27f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "target_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.declared_sha256",
        "target_digest": "sha256:f6fec93280a318e9d1f43db80b79f344c9eb34c1ba5a0626809b752bc4be1bfd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.name",
        "target_digest": "sha256:380bd13e23ed8f0f70f29471b9651608dbe1efb30a7cc37245f0005008d05886",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.publish_environment",
        "target_digest": "sha256:d7d062aeb8cbe871edb8b0e158feb03ee5ae1292f7517388271618567ae63c28",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.published_by",
        "target_digest": "sha256:39d60d723a1bab48f1a66b7d3d87146e3669cca4738bcd467059b8f4e87b17f7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.sha256",
        "target_digest": "sha256:ffa56935ebeec1e7597a2738ffc705714e29a58b018ad6924c57a705eb45fe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.target",
        "target_digest": "sha256:55d32de621428fc02ea467f506405ce281401be8fd6cb965dc4070114e4db024",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "target_digest": "sha256:ddea413b9b6c49a893031f6310e2ebed4f928eab460da7a5687581e38a66bafe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "target_digest": "sha256:d302b222262bee299e7b6a87054b38745b34e3e471fd65c5d30c93f11a28173c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "target_digest": "sha256:b307d0a375b6a266d2f18119911789c493c2a480cac5af84ebc0ad76af1cd3cd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "target_digest": "sha256:a6846a46b26a75d602958b58d4d881d7866ff6cf4175131275f973959d39a4f1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.environment",
        "target_digest": "sha256:f1bbdbfa2df81778d8e71d4eabc167b216c7fa32b89d47508c5a64ae150b8100",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "target_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "target_digest": "sha256:fc1fc7efff273c5867937aa137612da6b8b8b0f95e4c39cc8c3865ea8124cc85",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "target_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "target_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "target_digest": "sha256:55258561099684e65cf64d202d050409b684897a8178db5c853b9fbe8093a4b0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "target_digest": "sha256:4bc4b2ee7de83953a0f99792d97118c56ce0d73f5395f172620dcbf46ed2dcf9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.source",
        "target_digest": "sha256:5912a400500c1c5b77edfbabb5649f486b6b7437dc21a33ba76ef0175a5ee352",
        "current": true
      },
      {
        "source": "QueryDefinition:security.settle_condition",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "target_digest": "sha256:71d273d960c85450760acab13b526712916c7a62125ff08d0837999a4c358ea9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "target_digest": "sha256:ddea413b9b6c49a893031f6310e2ebed4f928eab460da7a5687581e38a66bafe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "target_digest": "sha256:d302b222262bee299e7b6a87054b38745b34e3e471fd65c5d30c93f11a28173c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "target_digest": "sha256:b307d0a375b6a266d2f18119911789c493c2a480cac5af84ebc0ad76af1cd3cd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "target_digest": "sha256:a6846a46b26a75d602958b58d4d881d7866ff6cf4175131275f973959d39a4f1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "target_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "target_digest": "sha256:fc1fc7efff273c5867937aa137612da6b8b8b0f95e4c39cc8c3865ea8124cc85",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "target_digest": "sha256:936c2c537d53a1273d469508ca22a85c2c626a57894265ace917837a3c6be23a",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.uses",
        "target_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "target_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "target_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "target_digest": "sha256:55258561099684e65cf64d202d050409b684897a8178db5c853b9fbe8093a4b0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "target_digest": "sha256:4bc4b2ee7de83953a0f99792d97118c56ce0d73f5395f172620dcbf46ed2dcf9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "target_digest": "sha256:83fdbafc2053880a4df5acf636eaaf85a2cf0b4e2cfd1072fe3f465600697ddd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.environment",
        "target_digest": "sha256:f1bbdbfa2df81778d8e71d4eabc167b216c7fa32b89d47508c5a64ae150b8100",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "target_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.needs",
        "target_digest": "sha256:dbc7a07285969928748e182fd1730f354fd0e443e6814a9bec904794930cd332",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.permission",
        "target_digest": "sha256:eaf3554965a0a46f147605f599cf901bc4240f4f32f4614d1042fb06564e414c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "target_digest": "sha256:fc1fc7efff273c5867937aa137612da6b8b8b0f95e4c39cc8c3865ea8124cc85",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "target_digest": "sha256:936c2c537d53a1273d469508ca22a85c2c626a57894265ace917837a3c6be23a",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.uses",
        "target_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "target_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "target_digest": "sha256:4bc4b2ee7de83953a0f99792d97118c56ce0d73f5395f172620dcbf46ed2dcf9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.repo",
        "target_digest": "sha256:fcafe8ec8337d6166edc760c9169ae40ba20c08a44476f8fff8ce10aa0a49f5b",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.source",
        "target_digest": "sha256:5912a400500c1c5b77edfbabb5649f486b6b7437dc21a33ba76ef0175a5ee352",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "target_digest": "sha256:83fdbafc2053880a4df5acf636eaaf85a2cf0b4e2cfd1072fe3f465600697ddd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.product.supplied_by",
        "target_digest": "sha256:bdf132d406f6cb60826db49c6dc7c7df67a155b7e680da0fe09aaef555f64dee",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.release.product",
        "target_digest": "sha256:be90dfcb4fc01f54a01f86f95ac00141c3cd769c5c833a4d9a68a9189ac60e11",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "target_digest": "sha256:a1a832258aad077603d902135e14777300e7e33b29e2547761c41b4f762eeec8",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "target_digest": "sha256:675416196623443fab7368f0324dd0b7091385940c62bcdaf04394923176c054",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "target_digest": "sha256:f247297a4958490cf976a06f8ce1bb40081a9e15c57acf1a8eb8759bf35a0d40",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "target_digest": "sha256:7b7f1fa9a3325314b526e3fdbb8f665b57c56e2d2d5b4f3c19d4d73f9c5e5d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "target_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "target_digest": "sha256:59db3d9aefaaabe5c1d2f72cdcaaf9f302cb07ab7aacb7ee86223bb5441c1050",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "target_digest": "sha256:71d273d960c85450760acab13b526712916c7a62125ff08d0837999a4c358ea9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "target_digest": "sha256:675416196623443fab7368f0324dd0b7091385940c62bcdaf04394923176c054",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "target_digest": "sha256:f247297a4958490cf976a06f8ce1bb40081a9e15c57acf1a8eb8759bf35a0d40",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "target_digest": "sha256:7b7f1fa9a3325314b526e3fdbb8f665b57c56e2d2d5b4f3c19d4d73f9c5e5d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "target_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "target_digest": "sha256:71d273d960c85450760acab13b526712916c7a62125ff08d0837999a4c358ea9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "target_digest": "sha256:675416196623443fab7368f0324dd0b7091385940c62bcdaf04394923176c054",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "target_digest": "sha256:f247297a4958490cf976a06f8ce1bb40081a9e15c57acf1a8eb8759bf35a0d40",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "target_digest": "sha256:4d7063ebe228e51f59707c89315683e4c814a904fb154d17ac9ec938b8dbb8c4",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "target_digest": "sha256:7b7f1fa9a3325314b526e3fdbb8f665b57c56e2d2d5b4f3c19d4d73f9c5e5d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "target_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "target_digest": "sha256:1a865ab32f408e30aba6e6919a3fffceaf36620dcbedee139ea830b810feab79",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.watch_reason",
        "target_digest": "sha256:dc74690486e48f688416ee120a2a8e0107ee0d8f27f02a2274efbf7fe4f96e32",
        "current": true
      },
      {
        "source": "Trigger:security.cve-landed",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.cve-record-http-v1",
        "target_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
        "current": true
      },
      {
        "source": "Trigger:security.epss-landed",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.epss-daily-v1",
        "target_digest": "sha256:1cf4b39dae1713d2675fd138b5589f36219e9085d1c9354c564fa24934cca7bb",
        "current": true
      },
      {
        "source": "Trigger:security.harden-on-registry",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Trigger:security.harden-on-snapshot",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Trigger:security.kev-landed",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Trigger:security.kev-landed-attention",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Trigger:security.registry-landed.cruxible",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Trigger:security.registry-landed.cruxible-client",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Trigger:security.repo-landed.cruxible-ci",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Trigger:security.repo-landed.cruxible-released",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Trigger:security.repo-landed.cruxible-v0.3.2-manifest",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Trigger:security.sbom-landed",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.cyclonedx-sbom-v1",
        "target_digest": "sha256:26391ef005ecab1dbedf0b68849b5aea1cab2e35161c3a52bcd1e0a626332eef",
        "current": true
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"QueryDefinition:security.publish_paths\")"
    ]
  }
});
