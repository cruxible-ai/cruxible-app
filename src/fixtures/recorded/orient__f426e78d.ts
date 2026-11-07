// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 904cef3c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "section": "generations",
    "limit": 50
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "accepted_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-07T22:23:00.009457Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "generations",
    "generations": [
      {
        "sequence": 22,
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "accepted_at": "2026-11-07T22:22:25.432116Z",
        "changeset_digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea",
        "proposal": "sha256:bc959b0f82807408680cae8d6bd4be5b55fbcaf2548210f3cb8874e88cd55323",
        "proposer": "reviewer",
        "because": "The demo app wraps every log call in a sanitizing filter.",
        "members": 1
      },
      {
        "sequence": 21,
        "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
        "accepted_at": "2026-11-07T22:22:25.229631Z",
        "changeset_digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8",
        "proposal": "sha256:92a7feb20ef2e183138845db4b641919c3bb447bd314169e1986c918d61aa51f",
        "proposer": "owner",
        "because": "The demo app never logs attacker-controlled input through log4j-api.",
        "members": 4
      },
      {
        "sequence": 20,
        "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
        "accepted_at": "2026-11-07T22:22:24.799862Z",
        "changeset_digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612",
        "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915",
        "proposer": "owner",
        "because": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
        "members": 7
      },
      {
        "sequence": 19,
        "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
        "accepted_at": "2026-11-07T18:00:00Z",
        "changeset_digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6",
        "proposal": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
        "proposer": "owner",
        "because": "Proposed by Procedure security.epss-triage run RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165 terminal write\n\n3 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 3
      },
      {
        "sequence": 18,
        "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
        "accepted_at": "2026-11-07T18:00:00Z",
        "changeset_digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc",
        "proposal": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
        "proposer": "owner",
        "because": "Proposed by Procedure security.kev-triage run RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3 terminal write\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 12
      },
      {
        "sequence": 17,
        "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
        "accepted_at": "2026-11-07T18:00:00Z",
        "changeset_digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10",
        "proposal": "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9",
        "proposer": "owner",
        "because": "Proposed by Procedure security.osv-query run RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051 terminal write\n\n18 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 27
      },
      {
        "sequence": 16,
        "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
        "accepted_at": "2026-11-07T18:00:00Z",
        "changeset_digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322",
        "proposal": "sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed",
        "proposer": "owner",
        "because": "Proposed by Procedure security.sbom-import run RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5 terminal write\n\n10 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 20
      },
      {
        "sequence": 15,
        "git_oid": "c61c0166bbc6eb492a543ef826661e31c69e1db7",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:a490dec06c1ef68d5279e9414a54da06b4f1675ca15130b3eb5e3c6296b261e6",
        "proposal": "sha256:45aa860700c2758d54cf5c018cd4884138b376940f85b68bf18caf3001016bf1",
        "proposer": "owner",
        "members": 1
      },
      {
        "sequence": 14,
        "git_oid": "66904417581f815a4557f2c8ad830a129bc7cb4a",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:fe4bb5dbdc42959de08bfb6fe107d7c74c1e46f5dcc82ef50ad1c683ae048e34",
        "proposal": "sha256:88d23d2c65398b8d7bdbee8cc27c5bb245a35488861b90d38c2ef3fb64aea989",
        "proposer": "owner",
        "members": 1
      },
      {
        "sequence": 13,
        "git_oid": "8f461b8654c9b200f68f5fc656f7d0f4f0293059",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:7407d15bab769e2cb157017e496f562862c4ea51b301056514cd482ad9e05620",
        "proposal": "sha256:6a9456d2888de9a07bcaa61ec504ca24476f0e47492d45f2ae95d7e08a32fd7f",
        "proposer": "owner",
        "members": 16
      },
      {
        "sequence": 12,
        "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
        "accepted_at": "2026-10-29T11:59:00Z",
        "changeset_digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be",
        "proposal": "sha256:e2c7121d2ae56c503ff7efa71f4050048e3e34e480f84c2ea7cb0e5cb92afd58",
        "proposer": "owner",
        "members": 1
      },
      {
        "sequence": 11,
        "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71",
        "proposal": "sha256:1edcddb9dfd46f118d509331d6b049f0010dd8101fcf48c151f85c2266fafb86",
        "proposer": "owner",
        "members": 2
      },
      {
        "sequence": 10,
        "git_oid": "e8b6ab899d62d1280a73a64cae4bdae5b2f86ed5",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:ce4f848fc7c893d38ab16c9f36ba07c6d072d8506acc90c8c42d4ee17aae02bd",
        "proposal": "sha256:6eddafb201869f6d435606af18fee1bdfa18ff658005b4547239862784f637aa",
        "proposer": "owner",
        "members": 4
      },
      {
        "sequence": 9,
        "git_oid": "4281ccf924132d621a5196159f6a2eeb9a3d4168",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:daf62b1f3ab16cae3f0e49c30d26f47ef6c6013bde4c7aae8aaf359c506f687a",
        "proposal": "sha256:31ef897abd5ab7eed629db14a1ba145ad4ec969f77631f10a72bee6d752df8a1",
        "proposer": "owner",
        "members": 4
      },
      {
        "sequence": 8,
        "git_oid": "986563c4f88e8a83d37a03af729c1cf20933c690",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:bd7d6db89cde18cfe68efa639d0f4f7191a20f8ba15b74a41a220f047751dd66",
        "proposal": "sha256:bda1ebcd6a87b97c56dee972596896d5d7f6ba3c652146436f9abe43fc960cb5",
        "proposer": "owner",
        "members": 4
      },
      {
        "sequence": 7,
        "git_oid": "c00b7b0848882530cc87270e68502e20a00ae46a",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:bcd3f7a5f035fdcd321a13111dcb0aaafe361e52f0f0206f11ff61124769c321",
        "proposal": "sha256:c68f33363b96bad52e24b170159fb7471e44bf9d522839d13ee9c33adb678021",
        "proposer": "owner",
        "members": 4
      },
      {
        "sequence": 6,
        "git_oid": "ebdf9055373d647c38042d1c27e2a4663d644a3a",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:c10ffa8e02045f55ec2f6f025af538dc0abce99b8d7c96ccb40c54172b5cad60",
        "proposal": "sha256:939f79ec5240df01443571e30c97aee0e5943a67205321fdbfa767f473775a69",
        "proposer": "owner",
        "members": 48
      },
      {
        "sequence": 5,
        "git_oid": "38f81f2f923a0e40edd08985fbcceef15a5d40c2",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:613e5f50291ce4f42ece4a58505361e35afcc62da3f7904de2c3ed6af39d68e2",
        "proposal": "sha256:3567562cdf8b8ce9349346423d6e4dcf1d55bd56eddd718126ff5804c6dfd7a2",
        "proposer": "owner",
        "members": 6
      },
      {
        "sequence": 4,
        "git_oid": "946c256719767dbdce7e47b5f98f227c69d80db9",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:56fd9391aa6eed293c9c0656ff14f46a72704ff5564e8941d954d97255646f43",
        "proposal": "sha256:09eb2ab9ff5d4c7515f872ab7172488c6ead6dc39b5704c393fc6fa9bb0304ed",
        "proposer": "owner",
        "members": 1
      },
      {
        "sequence": 3,
        "git_oid": "7a92bbaf8edad04c143d0859c9481086d443c895",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:6a71663366ef22275e80e54942e60b4597d50326579074fea190c41da6a3fbb7",
        "proposal": "sha256:cc62b13be7003ac2eae7261e9531b88a198762ba99ffa6db2c75d7dd42cf4085",
        "proposer": "owner",
        "members": 9
      },
      {
        "sequence": 2,
        "git_oid": "09d61b17129ce582854710c2a14bf65766f6ed8e",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:6b8c2dd373ed7e7c3511501c4ff27d2624a53f7bebbd1f51301ff346d4745a80",
        "proposal": "sha256:911d39a0f6f5aaa053af90e230b4f793a3d70bbe548280b5eceabec8df3c9f1d",
        "proposer": "owner",
        "members": 1
      },
      {
        "sequence": 1,
        "git_oid": "6e9debee28711cb348c6f436e4a6e259dbf7966f",
        "accepted_at": "2026-10-09T11:59:00Z",
        "changeset_digest": "sha256:53fd14d40fa9e8d84e4073211d00705adc8d8f698256415db56ee3e59944f6f8",
        "proposal": "sha256:b4d9d6318512fecd2c9988b82b32539308b4c41d2444d3f3d90804c8f22c3a02",
        "proposer": "owner",
        "members": 35
      },
      {
        "sequence": 0,
        "git_oid": "b74bcb84d04945a7677eda68af5a254caa64778e",
        "accepted_at": "2026-11-07T22:22:19Z",
        "members": 0
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"sha256:bc959b0f82807408680cae8d6bd4be5b55fbcaf2548210f3cb8874e88cd55323\")"
    ]
  }
});
