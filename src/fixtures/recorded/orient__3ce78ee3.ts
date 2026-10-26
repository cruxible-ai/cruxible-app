// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient bd5f3ef8
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "section": "generations",
    "limit": 50
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:05:10.711127Z",
    "section": "generations",
    "generations": [
      {
        "sequence": 12,
        "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
        "accepted_at": "2026-10-26T19:00:09.706610Z",
        "changeset_digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842",
        "proposal": "sha256:082cdfbfea18fc362afba30963c4f516a62adecd8c372abe14dcb536405f4db0",
        "proposer": "robertmalone",
        "because": "The maintainer reads the launcher flag as a mitigation; OSV says affected.",
        "members": 1
      },
      {
        "sequence": 11,
        "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
        "accepted_at": "2026-10-26T19:00:07.921167Z",
        "changeset_digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307",
        "proposal": "sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6",
        "proposer": "robertmalone",
        "because": "gate-app launches log4j-core 2.14.1 with formatMsgNoLookups=true, so JNDI lookups in messages are disabled.",
        "members": 1
      },
      {
        "sequence": 10,
        "git_oid": "4019b67c5537ab5721f8720d1d052047ce4b49fa",
        "accepted_at": "2026-10-26T18:55:55.268912Z",
        "changeset_digest": "sha256:1e1af98289ac1b235b6a819d90f294f1ea8a9eb94254c01d2d0884c42a6c6880",
        "proposal": "sha256:4ae73e170d7719f23d69aaa20cc155eff23000a34b09c1e91f514d89ff241dd2",
        "proposer": "robertmalone",
        "approvals": [
          "robertmalone"
        ],
        "because": "Proposed by Procedure security.registry-parse run RUN-3ad7fb91dc2ab48cb491b6db76afecac4e83926713c4c80e161c9824fa98364a terminal propose\n\n57 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 90
      },
      {
        "sequence": 9,
        "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
        "accepted_at": "2026-10-26T18:55:53.263624Z",
        "changeset_digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2",
        "proposal": "sha256:97b013f25a672edf9cd5d8fe4c1a0641d4df2b3a7d89974835efa5305016eaa9",
        "proposer": "robertmalone",
        "approvals": [
          "robertmalone"
        ],
        "because": "Proposed by Procedure security.repo-parse run RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc terminal propose\n\n132 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 172
      },
      {
        "sequence": 8,
        "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
        "accepted_at": "2026-10-26T17:45:00.485705Z",
        "changeset_digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874",
        "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
        "proposer": "robertmalone",
        "approvals": [
          "robertmalone"
        ],
        "because": "Proposed by Procedure security.kev-triage run RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d terminal settle\n\n20 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 20
      },
      {
        "sequence": 7,
        "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
        "accepted_at": "2026-10-26T17:44:38.124878Z",
        "changeset_digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5",
        "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
        "proposer": "robertmalone",
        "approvals": [
          "robertmalone"
        ],
        "because": "Proposed by Procedure security.osv-applicability run RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8 terminal propose\n\n106 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 148
      },
      {
        "sequence": 6,
        "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
        "accepted_at": "2026-10-26T17:43:01.517331Z",
        "changeset_digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281",
        "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
        "proposer": "robertmalone",
        "approvals": [
          "robertmalone"
        ],
        "because": "Proposed by Procedure security.sbom-import run RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1 terminal propose\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 12
      },
      {
        "sequence": 5,
        "git_oid": "8b32bdc4c9111267af2c88ee9e45f7aa2579f7b1",
        "accepted_at": "2026-10-26T17:42:27.361165Z",
        "changeset_digest": "sha256:73238bbd8728ce155b0cff057717d89066c08f5698b7024d34cae0321512c7cd",
        "proposal": "sha256:94753130d41002b2a6e6f857f935bd204f3e6544fe634b397604bdd19619b653",
        "proposer": "robertmalone",
        "because": "Example consumer automation for the security kit (vulnerability loop, system model, code findings and incident response); adapt before submitting.",
        "members": 52
      },
      {
        "sequence": 4,
        "git_oid": "76d1aabc3311a9e9b1f3137b5fa346ce3bea994b",
        "accepted_at": "2026-10-26T17:42:00.919051Z",
        "changeset_digest": "sha256:4a1057703c77439f4e7067d4314583bd7bcec20202384049a3cba451cdbb65a9",
        "proposal": "sha256:1e3f764915b1acba1e10fb7bfd32448560fe6bd5556079b9371102553e099286",
        "proposer": "robertmalone",
        "because": "Install kit security 1.3.0.",
        "members": 245
      },
      {
        "sequence": 3,
        "git_oid": "7f42a960719dfa89bbef91b688aac46bfac6d4fb",
        "accepted_at": "2026-10-26T17:42:08.544760Z",
        "changeset_digest": "sha256:9e780a8788ec3495507fcaaf51a5cf86b31ca1704b3da9dcd7d0267526aa83cd",
        "proposal": "sha256:156e9c3e95494753f355938dde3a90a889528219356110331a1e3f278d176a87",
        "proposer": "robertmalone",
        "members": 7
      },
      {
        "sequence": 2,
        "git_oid": "60b56c6ff462a4f32d1e941892a1f9982b5af281",
        "accepted_at": "2026-10-26T17:42:07.199408Z",
        "changeset_digest": "sha256:308d337f5ad2d96465f8fa979bc8ce8974e8fb7feca0ff1c0a11a9ef2180de71",
        "proposal": "sha256:1e87dfd08395a2375d63db5cdf1ba0046b6eac62e35b3cbaea0a4ac56084bb01",
        "proposer": "robertmalone",
        "members": 15
      },
      {
        "sequence": 1,
        "git_oid": "1d36cd2b1a7d6540c886450af5c7e960f3e03222",
        "accepted_at": "2026-10-26T17:42:01.557628Z",
        "changeset_digest": "sha256:677f5718aea87f216406e2b3dae1c5171e33d886df62af9c0578fc392b91a6a8",
        "proposal": "sha256:b78c6ce1208e9fa45469f4976affa0ab66f6ff7f85d8b8d106683eedd0f8e72b",
        "proposer": "robertmalone",
        "members": 3
      },
      {
        "sequence": 0,
        "git_oid": "e72a4d43cff5f9f7ab27e4b5d7c9587f360f5eef",
        "accepted_at": "2026-10-26T17:41:55Z",
        "members": 0
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"sha256:082cdfbfea18fc362afba30963c4f516a62adecd8c372abe14dcb536405f4db0\")"
    ]
  }
});
