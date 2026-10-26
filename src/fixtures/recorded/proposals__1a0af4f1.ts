// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
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
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "status_filter": "settled",
    "entries": [
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:1e3f764915b1acba1e10fb7bfd32448560fe6bd5556079b9371102553e099286",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/kit-security-738247d7bb3e5e7cdb14926136ee6d41",
        "admitted_at": "2026-10-26T17:42:00.919051Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:458b9b34634feb2d5141a77ffd376f48f04a45307ee02615522522507f51b264",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:b78c6ce1208e9fa45469f4976affa0ab66f6ff7f85d8b8d106683eedd0f8e72b",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/provider-install-b7ce36bf099c278a933e86f7dac1ec74914ae7abf41a13422902b81a3a8a81ce",
        "admitted_at": "2026-10-26T17:42:01.557628Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:0abd5a63ab076c41087efa987cec38f5678c01c6bcaaf293c911c921879fe4ba",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:1e87dfd08395a2375d63db5cdf1ba0046b6eac62e35b3cbaea0a4ac56084bb01",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/provider-install-cbcaa9c2c6fe029a010ab959372461856ddfd2bec2bf599be6d8d7638af67981",
        "admitted_at": "2026-10-26T17:42:07.199408Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:a28ce2ebf9414d41d53e031c77ac91d05b0549fe1b15cc5a3b003444ecd214fe",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:156e9c3e95494753f355938dde3a90a889528219356110331a1e3f278d176a87",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/provider-install-f9b0fd0431b2fe5d2152db8fb179402ce4cb18a334fd860a1c9ac209c39b5865",
        "admitted_at": "2026-10-26T17:42:08.544760Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:6e3126d0ec08bc2b444ef0c43d706fa4b5d0a190d9088f1e4235589a38996b76",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:94753130d41002b2a6e6f857f935bd204f3e6544fe634b397604bdd19619b653",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/intent-5ee3afdcf09f513d5dacf29c541c1463",
        "admitted_at": "2026-10-26T17:42:27.361165Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:7e85ac8951bd4948144d525804659766054c6a7e897deb9d75302f9ceb855146",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/procedure-80ab239f7a517fbfdfae1eea60a684c675de64c71fead52627731d43abe453c6",
        "admitted_at": "2026-10-26T17:43:01.517331Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/procedure-8eb8fc9641b8e4c50efecfca8ebecaa360c84ade271dab18ee180ba3aad1fa79",
        "admitted_at": "2026-10-26T17:44:38.124878Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/procedure-ef63aa890f9bf3c287d32486207c3701d5b582fc24411f1f2eb9acda8e168f44",
        "admitted_at": "2026-10-26T17:45:00.485705Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:97b013f25a672edf9cd5d8fe4c1a0641d4df2b3a7d89974835efa5305016eaa9",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/procedure-8e285d55d73eb42f1eb4062a7837c72068fc3c49e3207e519725681c23daa14e",
        "admitted_at": "2026-10-26T18:55:53.263624Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:4ae73e170d7719f23d69aaa20cc155eff23000a34b09c1e91f514d89ff241dd2",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/readmit-00277f5cb0ac913ac5b5f35f",
        "admitted_at": "2026-10-26T18:55:55.268912Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:a7253aa42d92a3ce2fddaf7cf89123a3d1700366f2fb2dad1c0f53c039cf77c9",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:bc1ac5ef38bceb1a2c214d3b348e3e10bf3f12a705e229e60939840c4be51146",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/procedure-67f494f73f36f84b1092b1d402a52738cb16e51c90d089bea473519d4ba7bb12",
        "admitted_at": "2026-10-26T18:55:55.268912Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:c54dadaa3b214b57a33cdc593deb77ce13ecf897704acf173cf7e121deef326f",
        "status": "settled",
        "terminal_reason": "withdrawn",
        "incomplete_reasons": [],
        "withdrawal_present": true
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/intent-db1c055e35b923f42746efa236d251ec",
        "admitted_at": "2026-10-26T19:00:07.921167Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d",
        "status": "settled",
        "terminal_reason": "accepted",
        "incomplete_reasons": [],
        "withdrawal_present": false
      },
      {
        "tag": "playbill-proposal-list-entry-v1",
        "proposal_id": "sha256:082cdfbfea18fc362afba30963c4f516a62adecd8c372abe14dcb536405f4db0",
        "actor_id": "robertmalone",
        "target_ref": "refs/proposals/robertmalone/intent-d64d0092540ccc3ab28401bce28bc7ad",
        "admitted_at": "2026-10-26T19:00:09.706610Z",
        "verdict": "candidate",
        "candidate_digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16",
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
