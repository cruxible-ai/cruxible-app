// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 74724bca
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
    "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
    "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
    "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
    "surface": "sdk",
    "section": "generations",
    "limit": 50
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_d8e6dcb48e6a4d0d",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "generation": 10,
    "accepted_at": "2026-11-03T00:58:54.573196Z",
    "evaluation_time": "2026-11-03T02:20:51.000145Z",
    "section": "generations",
    "generations": [
      {
        "sequence": 10,
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "accepted_at": "2026-11-03T00:58:54.573196Z",
        "changeset_digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294",
        "proposal": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
        "proposer": "pilot-owner",
        "because": "Proposed by Procedure security.epss-triage run RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4 terminal write\n\n30 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 30
      },
      {
        "sequence": 9,
        "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
        "accepted_at": "2026-11-03T00:58:48.471271Z",
        "changeset_digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b",
        "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
        "proposer": "pilot-owner",
        "because": "Proposed by Procedure security.kev-triage run RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514 terminal write\n\n34 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 34
      },
      {
        "sequence": 8,
        "git_oid": "31a55f177018044095ea62704afe1c760e48411a",
        "accepted_at": "2026-11-03T00:58:40.256215Z",
        "changeset_digest": "sha256:dff6cb3180653245a545b2bf93572f5ff675b53f3405051576d49d93f4bfd134",
        "proposal": "sha256:fd953fdd490da9b5b6034a2bff1ec7826891887adf6ffa9d98cb1731fb551a70",
        "proposer": "pilot-owner",
        "because": "Adopt the KEV and EPSS Lines: web.fetch from cisa.gov and api.first.org.",
        "members": 8
      },
      {
        "sequence": 7,
        "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
        "accepted_at": "2026-11-03T00:58:38.787504Z",
        "changeset_digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c",
        "proposal": "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed",
        "proposer": "pilot-owner",
        "because": "Watch the pilot's CVEs.",
        "members": 22
      },
      {
        "sequence": 6,
        "git_oid": "4b393d822ac72ad6eb39a8e40ec43d8d647d66bb",
        "accepted_at": "2026-11-03T00:58:37.438414Z",
        "changeset_digest": "sha256:1b32532c371eea309a2e1d894a8463e5320c88c8b3f59b04fefddbe4bf1e1e83",
        "proposal": "sha256:b01954e7712fa3d8fe9c23385cb174828900634f46ab58ced4c4cdf9079b085f",
        "proposer": "pilot-owner",
        "because": "Security kit pilot: KEV and EPSS triage as declared extract + claims.",
        "members": 8
      },
      {
        "sequence": 5,
        "git_oid": "eb5235891431064f0f31a7f0648891c2435384d2",
        "accepted_at": "2026-11-03T00:58:36.041669Z",
        "changeset_digest": "sha256:27211320bc976b15df09aebca33dc4025d014147c092479456ee9d666b5c8f39",
        "proposal": "sha256:ebbf602ba826f129634fb6113de1e90c0cdeec44387253b179ef01af64500e03",
        "proposer": "pilot-owner",
        "because": "Security kit pilot vocabulary: KEV and EPSS facts about watched CVEs.",
        "members": 16
      },
      {
        "sequence": 4,
        "git_oid": "5898d3dedec012fe85da75c6993b9fc65ea7df39",
        "accepted_at": "2026-11-03T00:58:34.760038Z",
        "changeset_digest": "sha256:865e8a95cb827d76174279c982aefc548ca3e4716ceeb6166cf0645a9826b131",
        "proposal": "sha256:f6224cb943b8a9213887c059c2f5340825ada91e670190e1afa58e1475ad6540",
        "proposer": "pilot-owner",
        "members": 1
      },
      {
        "sequence": 3,
        "git_oid": "10f158084c81acafa900cbd23447b2742aec4e43",
        "accepted_at": "2026-11-03T00:58:33.506371Z",
        "changeset_digest": "sha256:9c10ea64eca201ebd2be37836f590c0181f96e266d7e4e86df998c08f58eca42",
        "proposal": "sha256:6ac7b04693e8216b18a95bba61b8bbff8313c2393a20262a9f3408cbbf3df020",
        "proposer": "pilot-owner",
        "members": 1
      },
      {
        "sequence": 2,
        "git_oid": "d9357c100af8319ff5164f47c191e0dacf8eadae",
        "accepted_at": "2026-11-03T00:58:24.424836Z",
        "changeset_digest": "sha256:1b52280852325170c0bcaec05e1da1137cea47bae68bf2908d778ad98ed9cb41",
        "proposal": "sha256:403bef0e25bc436e940c36c9beaddd58ff192392030bc54a2850ea05aa72f8ec",
        "proposer": "pilot-owner",
        "members": 1
      },
      {
        "sequence": 1,
        "git_oid": "dd1ad147394c9cf1e3dae22ee305acadc9210a90",
        "accepted_at": "2026-11-03T00:58:23.075097Z",
        "changeset_digest": "sha256:8a1520b52ac28ac302d97c07ba139509fc441236d913eeafba7dd88f0a9ce7e0",
        "proposal": "sha256:22daa10e73922ae265d87d13a55e1470354e8f8b0647f9d43e7a465e1545d515",
        "proposer": "pilot-owner",
        "because": "The Contracts cruxible-provider-web's operations pin, as shipped.",
        "members": 24
      },
      {
        "sequence": 0,
        "git_oid": "6b9b4fdfef2fe100ede0cd0d5e58f6f02fa3374b",
        "accepted_at": "2026-11-03T00:58:20Z",
        "members": 0
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb\")"
    ]
  }
});
