// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/kits 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/kits",
  "response": {
    "tag": "playbill-kit-status-v1",
    "kits": [
      {
        "kit_id": "security",
        "version": "1.3.0",
        "content_digest": "sha256:945582d45c1d78af60fac2a799d4095ef904dbf79c47d501636514595079f5f0",
        "source": "security",
        "drifted": [],
        "provenance": {
          "instance_id": "inst_d831c3168e904a15",
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "84524bb9767daf369e078a135df00d7fa6c7300e",
            "semantic_root": "sha256:8ade3f45ae44a0f15798f96779c42048279fe991e952ca14bedb84ae5606d717",
            "generation_root": "sha256:daae7598d8f4f51c151430148a4bd7626bbb3a2f0e41eea28b05284c1b271abe",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "principal_id": "kit-author"
        },
        "kept": [],
        "providers": [
          {
            "provider_id": "cruxible-provider-web",
            "package": "cruxible-provider-web",
            "version": "0.2.2",
            "wheel_sha256": "sha256:1340f1b7b75c51405fa771282e288d985cfe9ef0a0be76682ef66f10bb02f736",
            "delivery": "index",
            "state": "installed",
            "installed_version": null
          },
          {
            "provider_id": "security-analysis-provider",
            "package": "security-analysis-provider",
            "version": "1.3.0",
            "wheel_sha256": "sha256:24901ea5485b12f68edafcecaf07c5237ac7173c70f25d18eacffdcb532ab180",
            "delivery": "bundled",
            "state": "installed",
            "installed_version": null
          },
          {
            "provider_id": "security-sources-provider",
            "package": "security-sources-provider",
            "version": "1.2.0",
            "wheel_sha256": "sha256:c632d96ed068a206887fde77102b5235d9bf6eda80fdd61939798f75f96568ea",
            "delivery": "bundled",
            "state": "installed",
            "installed_version": null
          }
        ],
        "latest_available": null,
        "update_check": "not_checked"
      }
    ],
    "resumes": []
  }
});
