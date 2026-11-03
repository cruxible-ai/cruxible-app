// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/proposals 3a4242f1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/proposals",
  "query": {
    "limit": 50,
    "status": "settled"
  },
  "response": {
    "tag": "playbill-proposal-list-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "status_filter": "settled",
    "entries": [
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:22daa10e73922ae265d87d13a55e1470354e8f8b0647f9d43e7a465e1545d515",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/intent-ca606ea4eea4ebea24770c75d49ac8ae",
        "admitted_at": "2026-11-03T00:58:23.075097Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:3c3c6aa841fb70f18677fbc1ccfaa02d693ea00683844b2a9f11a6450384246e",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:403bef0e25bc436e940c36c9beaddd58ff192392030bc54a2850ea05aa72f8ec",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/provider-install-fe663d9509d42a1f068e075a8f39750e41c6f172b5e9eac13ccde939e60e8944",
        "admitted_at": "2026-11-03T00:58:24.424836Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:4c31986da7e2441a074c5fc6699c2bfdfae0c499ba532e1a385488c420cbd503",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:6ac7b04693e8216b18a95bba61b8bbff8313c2393a20262a9f3408cbbf3df020",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/security.kev-catalog",
        "admitted_at": "2026-11-03T00:58:33.506371Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:6ff95b3314bf82097a71076d3bbb179f337284ba2e98ec14b61b7d33c0c38ec1",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:f6224cb943b8a9213887c059c2f5340825ada91e670190e1afa58e1475ad6540",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/security.epss-scores",
        "admitted_at": "2026-11-03T00:58:34.760038Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:2a3f80c90ebd70eb287cddc308e50efc36b8302e022cfec1c49181ea769eef01",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:ebbf602ba826f129634fb6113de1e90c0cdeec44387253b179ef01af64500e03",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/intent-6bca904eac8a588df83970c28a57e968",
        "admitted_at": "2026-11-03T00:58:36.041669Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:7d5cc4f49f4bdbb031501362ec4ab09e56569592622afef7be03cb9a55c28a82",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:b01954e7712fa3d8fe9c23385cb174828900634f46ab58ced4c4cdf9079b085f",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/intent-fb656826baddf6405697b9368fd8ff75",
        "admitted_at": "2026-11-03T00:58:37.438414Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:ed9fd13e7fcd0f2bdc08ae5d9b31d7df3db0294d2f723fa79fcc04af27e2f35e",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/intent-308ea301396fce0a821de552e7e0e744",
        "admitted_at": "2026-11-03T00:58:38.787504Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:fd953fdd490da9b5b6034a2bff1ec7826891887adf6ffa9d98cb1731fb551a70",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/intent-f1aaa3951f612904a078da4b522f7dcc",
        "admitted_at": "2026-11-03T00:58:40.256215Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:9ff9b23ee490f74a15a1900317d4e24a72c991d7b85aa3212245a5f8986741b5",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/procedure-2b4c7ab1a4c830ced83784ab397f1bf6b3337260fa72ff8625baf8ae1d932c26",
        "admitted_at": "2026-11-03T00:58:48.471271Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
        "actor_id": "pilot-owner",
        "target_ref": "refs/proposals/pilot-owner/procedure-356a7a809686fb33aa167eec5cbf8ab587d910cd25f2743ca1f934ca9526cee7",
        "admitted_at": "2026-11-03T00:58:54.573196Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      }
    ],
    "truncated": false,
    "next_cursor": null
  }
});
