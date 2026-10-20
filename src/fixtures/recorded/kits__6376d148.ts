// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
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
        "version": "1.1.1",
        "content_digest": "sha256:21687dd5c31b9f3b4bb1497b3944ec2afdb1bdf8d9ff094bd832403683147706",
        "source": "localhost:54476/kits/security@sha256:583a3d13515b855397c2dcee0edcb46a4cd534dffaa093cf9c4aa7a1dec3b9b7",
        "drifted": [],
        "provenance": {
          "instance_id": "inst_ab3253be207a45d1",
          "coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "66bbfe89b45a5531d4b30bd850038b3eb337ab3d",
            "semantic_root": "sha256:2d3c9aa43a25dec6831678bd4b49d224b4ddd9defb1694711f1067d8c8fbd4c4",
            "generation_root": "sha256:2201c764327dfa0c53f4891f360789f71d27dc99468ee4b5616625f21605362c",
            "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
          },
          "principal_id": "kit-author"
        },
        "kept": [
          {
            "path": "query-definitions/security.kev_exposure.json",
            "identity": "QueryDefinition:security.kev_exposure",
            "consequence": "overwrites_your_edit",
            "release_digest": "sha256:bf40fcce351fe149731108a1faa02ff393044cb062ab71232de1852355634938"
          }
        ],
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
            "version": "1.1.1",
            "wheel_sha256": "sha256:03d03c13804cb616706b539f1900f7f54c7b007521a6ac5495dc385931331cd1",
            "delivery": "bundled",
            "state": "installed",
            "installed_version": null
          },
          {
            "provider_id": "security-sources-provider",
            "package": "security-sources-provider",
            "version": "1.1.0",
            "wheel_sha256": "sha256:196d522dc4cf8ecf0858f65274b2b52d8a94b2606f4bb795c000981ba847714d",
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
