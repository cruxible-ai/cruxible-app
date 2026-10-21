// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 6357fdbf
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
    "section": "generations",
    "limit": 50,
    "cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1Njo4YjFmYzRjNDI5ZmJiZGM5ZWVlMzkxNWRjM2MyMmFmNjRmZGJkYmEzNDY1Nzk1Y2ViMjcwYjAxMzcxZjg5OWJkIiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjE0OWQyOTI5NjEwZGJlMWY2YjljNzhkMWYxYmJlYjBlMTQzODZhMGY5ZTk2ZGZmMWQzMDIzMWU3MjBhY2NjYmYiLCJnaXRfb2lkIjoiOTcwNDBkYmZkZDFlN2UyODQwOThiNDllY2M2NTA0YWVjYjIxMWQ4MCIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6ODg4ZDM5ZWRkM2VkOGY3YzYzNzE5MTIxZGIyODg5NDEwNWM3NGEzY2ZiN2FmYzMyNjA4ODg0ZjhmNzI3ZjFkMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OjdmZGY1YWJlODVlOTMzMmY5MGQ2OTIyZGY2YTNjMGQ4NzFjNzcwOGY4ZWQ2NzAwNGUyNzhiOTQ1MDllZmY5Y2QiLCJsYXN0X2tleSI6WyI5Il0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6ImdlbmVyYXRpb25zIn0sInNuYXBzaG90Ijoia2V5c2V0In0="
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
    "evaluation_time": "2026-10-21T19:49:25.639634Z",
    "section": "generations",
    "generations": [
      {
        "sequence": 8,
        "git_oid": "254e72cdc3f941869e19b1c88fbb065cc30c89b6",
        "accepted_at": "2026-10-19T21:30:01.414185Z",
        "changeset_digest": "sha256:2686b18d371ad353d7d0d6c8f2de374915fe2caf6a5bccfaa019a7f63ced9bd5",
        "proposal": "sha256:7ec7db339a3728f0739f37424d5d61faf993ab96fd65eb0405d041c080574e72",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.sbom-import run RUN-31e98a0f9f7722295eee192787015a28c06424f403038284a7938eac0eb291be terminal propose\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 12
      },
      {
        "sequence": 7,
        "git_oid": "88faa09c3c36285d12148b3657bad4102f65542b",
        "accepted_at": "2026-10-19T21:29:36.386615Z",
        "changeset_digest": "sha256:e23e566f282a53a723d6726bf597b86f92c28818f72d6674fce34e9cf00e09e6",
        "proposal": "sha256:4ac9bb641d10ef02d2d1f09785e79c14d96d553a4d2131247ec6670f58c10ef6",
        "proposer": "gate-owner",
        "because": "Example consumer automation for the security kit (vulnerability loop and system model); adapt before submitting.",
        "members": 39
      },
      {
        "sequence": 6,
        "git_oid": "0f20fe353fb0b1825a9bdf3e9a3cec19617436d5",
        "accepted_at": "2026-10-19T21:29:22.785778Z",
        "changeset_digest": "sha256:35858bc9a4af988f45263eb7005fc30e0d6ac7f82bb0a0b59924c37842476d08",
        "proposal": "sha256:1022543041f93285a4b827879ac6135eb5388779c245496016a22cc0f1a56183",
        "proposer": "gate-owner",
        "because": "Instantiate the security Blueprints.",
        "members": 9
      },
      {
        "sequence": 5,
        "git_oid": "84b4d08c7418d3f04233d5a9495dc1110e1d6565",
        "accepted_at": "2026-10-19T21:29:00.847092Z",
        "changeset_digest": "sha256:f2a86c98028221baf0012d690b9cefc8a86ac4a349a01021fd5bdc050eec6d91",
        "proposal": "sha256:565afa1f991138f9d6370a401e3e1d6f87e5195ea8f7cfcbc515a70bdfe0b66d",
        "proposer": "gate-owner",
        "members": 1
      },
      {
        "sequence": 4,
        "git_oid": "6f77cd2dbff6416ef4f78a0f02af66f23a3e241d",
        "accepted_at": "2026-10-19T21:28:41.992232Z",
        "changeset_digest": "sha256:b5e4376719ba582feb4912a4b7cc0ef4a0291f21da215f8da92c38c938527345",
        "proposal": "sha256:5ab0a3dcfe7fb7ce01a9c91b691e8d3aa49cadf51bdde33ab3df6e9eb18e888c",
        "proposer": "gate-owner",
        "because": "Install kit security 1.1.0.",
        "members": 167
      },
      {
        "sequence": 3,
        "git_oid": "a1fd269570722e2dee86aa85834fd8b0713c5b34",
        "accepted_at": "2026-10-19T21:28:49.855769Z",
        "changeset_digest": "sha256:8097de72566803f2a1a5db2af928249bbc876746ac2f786b62cde647a1c4a882",
        "proposal": "sha256:2f2c743357d9e5eb9c0cc22cb0cbd358eb601d820509b532fe565198759fee64",
        "proposer": "gate-owner",
        "members": 6
      },
      {
        "sequence": 2,
        "git_oid": "b1a69c68be865118da4b541f6b6abf5e1f9f87ec",
        "accepted_at": "2026-10-19T21:28:48.618417Z",
        "changeset_digest": "sha256:7cd9732cafc9340a2017d9e8b8263c86ecac504a69d96123cebda4420d870210",
        "proposal": "sha256:8fb2aec8a8111f892dccac4fb703328c73547d5999a3fb7ce78fb6ff8081a60a",
        "proposer": "gate-owner",
        "members": 10
      },
      {
        "sequence": 1,
        "git_oid": "aecddcb5a70f142801efc201d9025a67a6555173",
        "accepted_at": "2026-10-19T21:28:42.572783Z",
        "changeset_digest": "sha256:11f46a30f0ffb44d767b9f5c30955b722f39084138b19c2d8124aab0132655ed",
        "proposal": "sha256:2cb75e7b6f0ff3408cbbc11f2cd72c829ac5964cff047a11e23bb672f6598325",
        "proposer": "gate-owner",
        "members": 3
      },
      {
        "sequence": 0,
        "git_oid": "4feb9b6431c0133e1422bf4b8095df934d7cb428",
        "accepted_at": "2026-10-19T21:28:34Z",
        "members": 0
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"sha256:7ec7db339a3728f0739f37424d5d61faf993ab96fd65eb0405d041c080574e72\")"
    ]
  }
});
