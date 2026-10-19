// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 8b7136ef
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
    "limit": 50
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
    "evaluation_time": "2026-10-19T22:16:32.893179Z",
    "section": "generations",
    "generations": [
      {
        "sequence": 58,
        "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
        "accepted_at": "2026-10-19T21:49:14.351998Z",
        "changeset_digest": "sha256:57a3d57a40a6ce738b72fce149de8b593075565c5404849842862b1d7f27fe3c",
        "proposal": "sha256:d4f81305020c67d65197711f51fe417c764215d0ee7448d931ee6f880521ca99",
        "proposer": "gate-owner",
        "because": "Verify the bundles before replacing a release asset.",
        "members": 3
      },
      {
        "sequence": 57,
        "git_oid": "3e3a4bb9b9012aa6d144899b1ef4fdf7b24548d8",
        "accepted_at": "2026-10-19T21:49:10.764035Z",
        "changeset_digest": "sha256:802b473aec2eaa7664b98803eee6514ee617e8a0811471a27bbfafadc2130498",
        "proposal": "sha256:2cc804774b422297cbe81a8bf711bb27d1a467290d31bd2946a1633ecc4362fb",
        "proposer": "gate-owner",
        "because": "build_kit_bundles.py last changed in this commit before v0.3.2.",
        "members": 4
      },
      {
        "sequence": 56,
        "git_oid": "a5ac3eb7a2a341a5f30f0de68dd58aae3ad116aa",
        "accepted_at": "2026-10-19T21:49:07.449528Z",
        "changeset_digest": "sha256:ce8f6d0fa7991c44a282d79bc5385320b27231397c6ee6647446414a29f3690f",
        "proposal": "sha256:c2b7f3f28b3ccc8f543f96fb87f461e3983b4241e2583daeaf904d90b5b2feb2",
        "proposer": "gate-owner",
        "because": "The uploader is the release bot and the run times match: not a hand upload.",
        "members": 1
      },
      {
        "sequence": 55,
        "git_oid": "eb4d01ab4efcebb6dde355396fcdbcdf0cc0b570",
        "accepted_at": "2026-10-19T21:49:00.006258Z",
        "changeset_digest": "sha256:c3412cf0225e48ba9447c8b5bfa0dcc92eb1869cf8db3b3dd2398807b834a923",
        "proposal": "sha256:610035115f6ff7dd7236ac6a6078e790544454517d1a2edd7305bba0aa49c801",
        "proposer": "gate-owner",
        "because": "Hypothesis H2.",
        "members": 1
      },
      {
        "sequence": 54,
        "git_oid": "b7e204a56103e68dcb21d15e967157ecf052d918",
        "accepted_at": "2026-10-19T21:48:58.193091Z",
        "changeset_digest": "sha256:b597a2c3c106215048ba7d2e32af9f56d65145e768ed805612f4cf17bd23a914",
        "proposal": "sha256:7926a66c073b13d097bef482653975f6942a79370bfd64d2d7b2949635b445c2",
        "proposer": "gate-owner",
        "because": "Hypothesis H1.",
        "members": 1
      },
      {
        "sequence": 53,
        "git_oid": "b7cf4151bbbf4c9112b698469c6f4fa79f13cdf3",
        "accepted_at": "2026-10-19T21:48:54.248303Z",
        "changeset_digest": "sha256:b9cbdb9381b30b4179113298aee085f4673ceffb8ffb54c402e9b941aeb618ff",
        "proposal": "sha256:3aa43db5be3073fadfcf3d7ad95e554a6ad7137094edf20bf2456f59cd1cd42b",
        "proposer": "gate-owner",
        "because": "The release API names the uploader.",
        "members": 1
      },
      {
        "sequence": 52,
        "git_oid": "5161efafa986bb087a992f48a73736816332ea58",
        "accepted_at": "2026-10-19T21:48:47.230260Z",
        "changeset_digest": "sha256:b2d106969f78703e571d71b3cc4e315359a2fbd4f11cee8437d0462999cb1c3b",
        "proposal": "sha256:d5c4bb5260675f158282506e3a49594a658c31f69a496189c583c6dee63fc8d3",
        "proposer": "gate-owner",
        "because": "HQ5: the served agent-release asset does not match the v0.3.2 manifest.",
        "members": 5
      },
      {
        "sequence": 51,
        "git_oid": "4d95d864db1fcbaefe3142e7ec8d3ec94cb15722",
        "accepted_at": "2026-10-19T21:47:58.670871Z",
        "changeset_digest": "sha256:fe6c5abea3a1eabdb9f6fd413b5637d47711c2cb0cc09811ee39ddfb2b9dc4d3",
        "proposal": "sha256:f5ec76d1facd82f028faeaf913b272849eeb96fe8595a9d52ac7641c94c93127",
        "proposer": "gate-owner",
        "because": "The release serves these bytes (security.asset-fetch).",
        "members": 1
      },
      {
        "sequence": 50,
        "git_oid": "36764557ad52c5e5667470778618a8782604296c",
        "accepted_at": "2026-10-19T21:47:45.436923Z",
        "changeset_digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285",
        "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.repo-parse run RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6 terminal propose\n\n24 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 40
      },
      {
        "sequence": 49,
        "git_oid": "f2d32139c8bdbb6d00bcb1f405d4102116cf25ed",
        "accepted_at": "2026-10-19T21:47:35.287445Z",
        "changeset_digest": "sha256:99a86d820be95c9772e9347622397e90aace42f25b075a7373b1892f09f070d2",
        "proposal": "sha256:8533feed68655f809109ca08e0fd665c58e569236d451c5ea4cae396600e604a",
        "proposer": "gate-owner",
        "because": "Model github.com/cruxible-ai/cruxible@v0.3.2:src/cruxible_core/kit_distribution/manifest.json too.",
        "members": 2
      },
      {
        "sequence": 48,
        "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
        "accepted_at": "2026-10-19T21:47:00.552880Z",
        "changeset_digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98",
        "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.repo-parse run RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c terminal propose\n\n137 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 173
      },
      {
        "sequence": 47,
        "git_oid": "466a0029335b71b93a3fe698be535ceccbccd5d4",
        "accepted_at": "2026-10-19T21:46:28.819882Z",
        "changeset_digest": "sha256:27c30001cdf4d4be9a382d51c581bfdd5997818a8ec65f2b6b3baf085a8f2ea7",
        "proposal": "sha256:1bc9ac675db8cde23280e9d93df966d1ff13649db2b7dd9ed88cca1a771c4726",
        "proposer": "gate-owner",
        "because": "Model github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ too.",
        "members": 2
      },
      {
        "sequence": 46,
        "git_oid": "4a9ba49083b37adeeb1a8e76f7a8cdf9177e6138",
        "accepted_at": "2026-10-19T21:45:42.923122Z",
        "changeset_digest": "sha256:defc97f9a954f850cd9f2a3108298e49f1ac1960fce41d49844a07af9fe519d4",
        "proposal": "sha256:9b939e6ad2a085990112d53ed7043eb5d3c2747f16da44d8084edf26d23dbfaf",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.repo-parse run RUN-640593fbd694d9ccadf8c69fcd6b0723002f2859da47698598b46961f05f0326 terminal propose\n\n27 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 33
      },
      {
        "sequence": 45,
        "git_oid": "25b9153a139d3ccb146cf8282961321d74aef367",
        "accepted_at": "2026-10-19T21:44:27.682472Z",
        "changeset_digest": "sha256:e3ae5e966d066403706bc927af7087b49041675f0f0f148abc3a5ae947cc9a03",
        "proposal": "sha256:bf8e90e1a76a696e98228cd85c32b0638c653c7ace1d6d352c66abe67647480d",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.repo-parse run RUN-61180aba6ed2b48f0393946239c2c0f0a387d9b1b72233d4635ea5fee82f4601 terminal propose\n\n112 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 144
      },
      {
        "sequence": 44,
        "git_oid": "d3e0ffb4e9a241cb2ace3758e7173e6debd626eb",
        "accepted_at": "2026-10-19T21:44:13.315942Z",
        "changeset_digest": "sha256:d8202f3284972a2197ad0efa1553108598db396d7e2429d2f54574d7f6510a65",
        "proposal": "sha256:cefae45e5cbc605d0f58c25b2185734dcf40d4d99cc647ea7c2d62ba6e70dde3",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.registry-parse run RUN-b71612ab5ebdffbb612f1bb8677d51b22e928786bbffabf329fbbc87d08b146b terminal propose\n\n56 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 69
      },
      {
        "sequence": 43,
        "git_oid": "5aa6617c12678386c0edbde650da5d4d5054ae02",
        "accepted_at": "2026-10-19T21:43:58.363337Z",
        "changeset_digest": "sha256:9ac59b1be7b2745ea06ddf899bef3506c009bac7946d734deabe8e871a668ee1",
        "proposal": "sha256:b1a39f249bf003856a277f6d8c377301007a49f94ddb2a84044097e4ff651948",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.registry-parse run RUN-eaa68a6eec5a67a64105ad675371bc8ae41a531bba03d9499d82f315a14b7cbf terminal propose\n\n56 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 87
      },
      {
        "sequence": 42,
        "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
        "accepted_at": "2026-10-19T21:43:44.788859Z",
        "changeset_digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321",
        "proposal": "sha256:662094f301f3004bba4230407311d10d9ac84e503253a51e0072b108409f1caa",
        "proposer": "gate-owner",
        "because": "Ask the hardening questions.",
        "members": 21
      },
      {
        "sequence": 41,
        "git_oid": "4306cb96a477f1f6e7792d5b6558a31217226be3",
        "accepted_at": "2026-10-19T21:41:34.386070Z",
        "changeset_digest": "sha256:b1109dd181e05dd79208154729bd60c5b06afab3df315f801717bab5d2207b2e",
        "proposal": "sha256:d7c6582e70207a151072d72a6402aca27e9b0df5599371040f74f8ca680b41f2",
        "proposer": "gate-owner",
        "because": "Review EPSS results after the deliberate retirement/restoration probe.",
        "members": 1
      },
      {
        "sequence": 40,
        "git_oid": "d3d2052f2b2a01f234d4c5e575ebc108e9cf5d18",
        "accepted_at": "2026-10-19T21:41:14.317003Z",
        "changeset_digest": "sha256:7fc10f0d82f7255e83263afd0eb1a5c9c7563eb3dc649f37258c6a3970870465",
        "proposal": "sha256:7a4dd5ca8d39e1aab5db4b022661bda8e1aae05917a0efc66a8130fa58eb34d5",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.osv-applicability run RUN-b1de4d22eb457253cbb65a8000c3328baf113847ee5e54fe0271c68abf0d2531 terminal propose\n\n65 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 91
      },
      {
        "sequence": 39,
        "git_oid": "509a8342c5e7c51b3bdbacade05b4b3257fecbb4",
        "accepted_at": "2026-10-19T21:41:06.624703Z",
        "changeset_digest": "sha256:505452782b45b6094782f066d4f1748c5781e10c59f5702b43ba29fd89c501e9",
        "proposal": "sha256:ff1b7b9a2021127e62899ea3275d6e13a278eb1ff3a81ce5b952c8b4b28d51ef",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.sbom-import run RUN-9a28529f7d1e161b4ed134cc8e738b05ce27d1ff68281d6aff3d63556ff4c73f terminal propose\n\n5 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 7
      },
      {
        "sequence": 38,
        "git_oid": "0fd808dd5c343b4b5d1d445f26b4605ac762b100",
        "accepted_at": "2026-10-19T21:40:58.505900Z",
        "changeset_digest": "sha256:514796f4d483f136602fc8a899bd9274941aa9b5590d69e13142de88e8856410",
        "proposal": "sha256:8a94ffe54d234272fc0ff71239d7f27c01a3d6079294f02de4989d5d8a72c270",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.sbom-import run RUN-4c0f83b0dedc69e2c9b5bbde6bdd222338d81a50e55508fd9ae2c089be06d992 terminal propose\n\n1 item; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 1
      },
      {
        "sequence": 37,
        "git_oid": "3609013948cc4cdf3c40c9cc4191035207ab264f",
        "accepted_at": "2026-10-19T21:40:44.194601Z",
        "changeset_digest": "sha256:62361baaf5521479bafd15e0ffa02b269db7042aa2c024d8d6f6bdf4d987b0b9",
        "proposal": "sha256:498f330ed1cd9b48b25e5d7b129f9c6c20b9d8d3042a43daaf1cc22e23ff6cbc",
        "proposer": "gate-owner",
        "because": "Gate: KEV/EPSS upgrade probe completed.",
        "members": 1
      },
      {
        "sequence": 36,
        "git_oid": "d4d3d2f414f69d56ee0b48c3749bcdf99a0ad826",
        "accepted_at": "2026-10-19T21:40:33.667031Z",
        "changeset_digest": "sha256:a95dcf940dd3e51fa6bb801a04b04799a854c306fdc3ddfd0c3bc657382eff8b",
        "proposal": "sha256:8241e0bf9d41651428e7b752f1ad87cf1d9fa8f573fd7142af9664dd13fa517d",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.epss-triage run RUN-fd36335269ed1aa8234a5b4cae933b3ad75f022c740941dbec80ae49e5ef4b22 terminal settle\n\n1 item; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 1
      },
      {
        "sequence": 35,
        "git_oid": "132935e08c453a2c98386a872c8def36f51ee65d",
        "accepted_at": "2026-10-19T21:40:28.522836Z",
        "changeset_digest": "sha256:348c8d39d2dc5fc1adebdeb346a9f270e5bc217490e828e1fe7680640ca7a3d4",
        "proposal": "sha256:b38dc0e5536d8a942bc4f2f64adf9d8b0469b233922c7a0b32e9dd5286894249",
        "proposer": "gate-owner",
        "because": "Gate: verify score restoration after re-grant.",
        "members": 1
      },
      {
        "sequence": 34,
        "git_oid": "96bb8207018368a727ebbe7ffa6dee4a283b3e10",
        "accepted_at": "2026-10-19T21:40:15.617945Z",
        "changeset_digest": "sha256:57cd87cba3e4e026903224f632d9b1ca2a21b89fec854bfc2135eb1fe9dceea8",
        "proposal": "sha256:5c2e03310e3c88e40ec4658ee69f1b09c14ebbb806b835b60ed096a1b1ff5321",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.kev-triage run RUN-8d834321eb0ff9d3c6a9e152dd53b3cd821d63b22ba72181188d01c93201a97a terminal settle\n\n4 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 4
      },
      {
        "sequence": 33,
        "git_oid": "e9334c8e10400f503330b303d6ac15060b766e58",
        "accepted_at": "2026-10-19T21:40:04.868872Z",
        "changeset_digest": "sha256:df48c265bb0549f5a7a9127f3b13f56b2c65ea5e98aed3260e6bed34fed7cd9c",
        "proposal": "sha256:da6668b615c62f1c0a78c969ff2957f11072493cedf1a260e1ebd2923342aa6e",
        "proposer": "gate-owner",
        "because": "Graduate KEV and EPSS triage to settle under mandates.",
        "members": 2
      },
      {
        "sequence": 32,
        "git_oid": "f7655b893c7a528e376dd929501823e6e06eefaf",
        "accepted_at": "2026-10-19T21:39:50.394534Z",
        "changeset_digest": "sha256:a5e28f12511e88cbb3d7db8bc6695f8d14bd383c854081fc106675f8ebc62010",
        "proposal": "sha256:b1b9258a473e4e66a177dd1654cfa34283a9f6a9cb8aede9b869b58f0f38fc29",
        "proposer": "gate-owner",
        "because": "Watch vulnerabilities.",
        "members": 3
      },
      {
        "sequence": 31,
        "git_oid": "b7e3795dcddcc00d767946c8df61200d8ab1d2be",
        "accepted_at": "2026-10-19T21:38:01.326849Z",
        "changeset_digest": "sha256:f2321570e0c4061a57593b61608cc8d9b5f6cb084421e22f6fe2d1a01524db3a",
        "proposal": "sha256:b843fe4573847f54a10f61a4cb268434b83b28f26412664f460eba0b7cc1e650",
        "proposer": "gate-owner",
        "because": "Upgrade kit security from 1.1.0 to 1.1.1.",
        "members": 32
      },
      {
        "sequence": 30,
        "git_oid": "d4b2fd1d92b54a193b6debefdcaffc24dc841cae",
        "accepted_at": "2026-10-19T21:38:01.861907Z",
        "changeset_digest": "sha256:4095b328f0dc2f26eae37366c65e794c35694c81d8f5c3f2f04c7ade4faca3f2",
        "proposal": "sha256:203fc070e76e8878af8137582b8ba2d658dc0cf158ed9c7543c80093a9c9ebf8",
        "proposer": "gate-owner",
        "members": 1
      },
      {
        "sequence": 29,
        "git_oid": "37b97b88d7bc1421422e287fa951214f2f0677c4",
        "accepted_at": "2026-10-19T21:36:39.281243Z",
        "changeset_digest": "sha256:6aa7b88c343bdddeaede19be49062d7064c56e61c16ecf2897e18dfb7c4f7919",
        "proposal": "sha256:893e14dcee1053b2ad5253c64d313e7d4867f0098f90d9c41c928887f0a0e516",
        "proposer": "gate-owner",
        "because": "Show up to 250 KEV exposures by default.",
        "members": 1
      },
      {
        "sequence": 28,
        "git_oid": "8b45b33ce7116bb5d53095a950ea801f710c616b",
        "accepted_at": "2026-10-19T21:36:30.340245Z",
        "changeset_digest": "sha256:d4e359e22cf69eb6a7a18b0fbcd65b9d379181a1cdd6f80633f2fb7585fb0b77",
        "proposal": "sha256:d031338ecda7a9e700f9e4eeb9be4a3c65d980c0b32e46c702d95619fd3faac0",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.epss-triage run RUN-c9024e78e0511f51c457f9b82629a7fd1ce158da249b7565ebd274724a3af851 terminal settle\n\n2 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 2
      },
      {
        "sequence": 27,
        "git_oid": "934374dffd768220002ca011c6512005f33242c5",
        "accepted_at": "2026-10-19T21:36:18.946893Z",
        "changeset_digest": "sha256:94523720073c461ea1804b2356bad590f6fc101e2824477b87d2e4b68110fea9",
        "proposal": "sha256:28e905e35d319cb86c386f3758ff57d8bb72570c6e9445bdb5853c01fdc817ef",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.kev-triage run RUN-f2d6ddcd37361cc6605a7a4fafc839d162253141d97fc4fb245f88852e23351f terminal settle\n\n4 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 4
      },
      {
        "sequence": 26,
        "git_oid": "03f943679e20f94b82540b450e80866eb6363f72",
        "accepted_at": "2026-10-19T21:36:15.206354Z",
        "changeset_digest": "sha256:bfd1d31e6c1d4fee9b65b60e02cb17b41bbece9f90ef935640e2f2311d7f0a10",
        "proposal": "sha256:9a7f8657a5a2d56e13620b17c4c8dded83b8da35893d6619a0145883ea9a1921",
        "proposer": "gate-owner",
        "because": "Watch vulnerabilities.",
        "members": 3
      },
      {
        "sequence": 25,
        "git_oid": "cbff7e3847c5af9c8be7a38a251bbeb41e4aa28a",
        "accepted_at": "2026-10-19T21:35:55.663781Z",
        "changeset_digest": "sha256:92a5db1d3fde8e80de68516cb2a89be18105e381df43de31bdfcaed3942bccdf",
        "proposal": "sha256:9c587b021299ce84430afb46af1d5fe00d82163088ea91d1e27afa722221b5af",
        "proposer": "gate-owner",
        "because": "Graduate KEV and EPSS triage to settle under mandates.",
        "members": 4
      },
      {
        "sequence": 24,
        "git_oid": "2e940320ded901d2a0754c8a14a0db0df9bbb6b4",
        "accepted_at": "2026-10-19T21:33:46.882866Z",
        "changeset_digest": "sha256:71cd9aaaaa4f2c155f309b81935c358ed2983e9f34f4a6abc68dfc38901c0c13",
        "proposal": "sha256:c6792d1c37a88e847c8d4c8d7953d3b44cced9baea500c3b47b5315889c350b8",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.epss-triage run RUN-653d9fa615a373030e0a97874792e49b969ae901a2da6ca9386f30858e881fb8 terminal settle\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 12
      },
      {
        "sequence": 23,
        "git_oid": "dc72328986392b2fe419c63002a907b3d862350c",
        "accepted_at": "2026-10-19T21:32:33.849985Z",
        "changeset_digest": "sha256:3346780752891e31fed3781aa2674f3d41dea9a371c3a6149c68c88871f80fcb",
        "proposal": "sha256:a6238b3bff341d1aa4f085cb704c023be4f922477e53999d642e82a312b5384e",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.kev-triage run RUN-beafb0f8c86dd84ecb55ec586236783e224a5f1d1e29e02225bad9aa1fe82f50 terminal settle\n\n23 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 23
      },
      {
        "sequence": 22,
        "git_oid": "4ec5641e59b8dff41d6259d356cfcb26935430e1",
        "accepted_at": "2026-10-19T21:32:01.388016Z",
        "changeset_digest": "sha256:7fcbb52d8e321b0785000b589ba9f9654c9f0ce8ff1cd2bcc89e6f36a98eeb06",
        "proposal": "sha256:104218eab96f0c8a047ddf69c28212a29afeebc31120b2fec68c34198f3196b4",
        "proposer": "gate-owner",
        "members": 1
      },
      {
        "sequence": 21,
        "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
        "accepted_at": "2026-10-19T21:31:46.272392Z",
        "changeset_digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e",
        "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.cve-applicability run RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d terminal propose\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 16
      },
      {
        "sequence": 20,
        "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
        "accepted_at": "2026-10-19T21:31:36.339750Z",
        "changeset_digest": "sha256:537f593dcbcc42901baed9f8512d8a09984a003b68465029b48a52e32600da7b",
        "proposal": "sha256:6c5e25f0c81edaa35b6b21ae304e084d57b999b31c6d1192b0a4c44ebedf5496",
        "proposer": "gate-owner",
        "members": 1
      },
      {
        "sequence": 19,
        "git_oid": "5913068c999ace3f72b179c6ef8b0d9fc5baf249",
        "accepted_at": "2026-10-19T21:31:31.232247Z",
        "changeset_digest": "sha256:2814fd118d74ad179ce219f1e908d002a134ae32af957154fb636ebc368c48a5",
        "proposal": "sha256:6ca66381a5d5764cca7877c0bf43ca622b5e98c7cebb156141b387eee2caeafe",
        "proposer": "gate-owner",
        "because": "State a bet.",
        "members": 6
      },
      {
        "sequence": 18,
        "git_oid": "df206509f19b81c4b2c325ef220ca88096778651",
        "accepted_at": "2026-10-19T21:31:27.982024Z",
        "changeset_digest": "sha256:c2f38be19a2807a96963f71772c8c149d84c75ef74b16e41d165d93264982b05",
        "proposal": "sha256:a8b7a7a4e0cea12787ea4133b4b0a491288946fc15a8ddda13aa9d2883056924",
        "proposer": "gate-owner",
        "members": 1
      },
      {
        "sequence": 17,
        "git_oid": "51421779d0a357c720d85b2b4699301b3f1d276d",
        "accepted_at": "2026-10-19T21:31:22.788509Z",
        "changeset_digest": "sha256:164d10f4a57e2e05d7bc908d9383246f961d455a0167774679bca4ea214eb9d4",
        "proposal": "sha256:c953195c3dc9611819ece83f17d28ff917059fc36dffcb7a5f67c2fa23f22faf",
        "proposer": "gate-owner",
        "because": "State a bet.",
        "members": 6
      },
      {
        "sequence": 16,
        "git_oid": "575450497a880cd8aa5aa9b7c25683654b77e060",
        "accepted_at": "2026-10-19T21:31:06.226177Z",
        "changeset_digest": "sha256:a2badb91166fa6aa98c16f02bafa6db7e6596b362e511a7c3c2618c468dc62bf",
        "proposal": "sha256:5fd29aa20575b18bb19d3e5b99836d55c32aced37c6ea1f3431fd535a95d11bd",
        "proposer": "gate-owner",
        "because": "Analyst review of the OSV verdict: the vulnerable path is unreachable.",
        "members": 2
      },
      {
        "sequence": 15,
        "git_oid": "1d12406408a848a9c1290efebb18af9b2252161f",
        "accepted_at": "2026-10-19T21:30:42.107298Z",
        "changeset_digest": "sha256:6dd9d9b7bb24b01a85069d8b2a64056563899cf5d9f373fb21b11bf230ae956a",
        "proposal": "sha256:aadbb428cb53e50071822a90e34adb7c81c5d502090dbed19ed467ea498b6e4f",
        "proposer": "gate-owner",
        "because": "Proposed by Procedure security.osv-applicability run RUN-52cd4c23ef6f01fcbb49f610ffb586b671a3b714ace71194400fdbda3f239fcb terminal propose\n\n68 items; each item's reason is recorded with the Claim or Subject it explains.",
        "members": 107
      },
      {
        "sequence": 14,
        "git_oid": "e0a13b86fab804650342512794fe4e7e96cc9d88",
        "accepted_at": "2026-10-19T21:30:32.174197Z",
        "changeset_digest": "sha256:58872fb3b2e5da2504d983da7577d8380a35a9883f78451a985c4c226a75785e",
        "proposal": "sha256:010086e12c01760b4b73a0130a9c2e4dc6a16b329767ed4a75dd26ff0c28053f",
        "proposer": "gate-owner",
        "because": "We ship requests.",
        "members": 3
      },
      {
        "sequence": 13,
        "git_oid": "0a2626d2a2bf12e303951c0c88823046c04fb25d",
        "accepted_at": "2026-10-19T21:30:30.415820Z",
        "changeset_digest": "sha256:54589aee86fca86f94ca0b803295d9d16842b42e64ee123b48fbc648a2724d28",
        "proposal": "sha256:342a9fac137ed1eac052972d4e196fca6bcb08dc114cc5e5b6475ba04f59f489",
        "proposer": "gate-owner",
        "because": "A CVE we only mention.",
        "members": 2
      },
      {
        "sequence": 12,
        "git_oid": "2bfcd8d76e05fd62c86d23118f9a6c5862b2ed73",
        "accepted_at": "2026-10-19T21:30:28.378119Z",
        "changeset_digest": "sha256:64f8fa8e4ddd97a0c6a05b0089d6f18161603dbc90b58e97c946ba2f4392b2e4",
        "proposal": "sha256:ff784bfd63ab08b285ed230808c2160805b422e22f1a0863a6e8499fecfd449a",
        "proposer": "gate-owner",
        "because": "Watch vulnerabilities.",
        "members": 9
      },
      {
        "sequence": 11,
        "git_oid": "f1321c4827f9c620b8b650dafff1fd5822b2c1ad",
        "accepted_at": "2026-10-19T21:30:24.950993Z",
        "changeset_digest": "sha256:e87a5394cb7b974901e122879ea45eb93e7bcc39eb07bab1d2e90ad812c9646c",
        "proposal": "sha256:7cecf9e2db5fa917d23b9cf496a6d2980f26fd4c62ea07af6a63a191c4b34346",
        "proposer": "gate-owner",
        "because": "web-1 runs gate-app--1.0.0.",
        "members": 1
      },
      {
        "sequence": 10,
        "git_oid": "17ff4cf0b75dee54864442a1c056f202de60dafd",
        "accepted_at": "2026-10-19T21:30:23.138430Z",
        "changeset_digest": "sha256:1eebc1d03f5e3b548469901d58db91446a156e5a49fef59935943e744ea7c5d7",
        "proposal": "sha256:f1e711e152a65a6899155bb4a5800800f0c8c5145ece85e484b7a2b94385b1b7",
        "proposer": "gate-owner",
        "because": "web-1 runs zammad--6.0.0.",
        "members": 1
      },
      {
        "sequence": 9,
        "git_oid": "e1fb8711c27d2d7b50c852f5ded886b9068afa25",
        "accepted_at": "2026-10-19T21:30:20.456927Z",
        "changeset_digest": "sha256:9062d8a0d9143e9959d31aa63c08f3b24fe1cdefa809cbbcef20eb3a02232969",
        "proposal": "sha256:b55585cd7ec743b6a55e6deda7815222f69faf9a5bcc27f62b52f7b4153657bc",
        "proposer": "gate-owner",
        "because": "The gate's inventory.",
        "members": 45
      }
    ],
    "truncated": true,
    "next_cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1Njo4YjFmYzRjNDI5ZmJiZGM5ZWVlMzkxNWRjM2MyMmFmNjRmZGJkYmEzNDY1Nzk1Y2ViMjcwYjAxMzcxZjg5OWJkIiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjE0OWQyOTI5NjEwZGJlMWY2YjljNzhkMWYxYmJlYjBlMTQzODZhMGY5ZTk2ZGZmMWQzMDIzMWU3MjBhY2NjYmYiLCJnaXRfb2lkIjoiOTcwNDBkYmZkZDFlN2UyODQwOThiNDllY2M2NTA0YWVjYjIxMWQ4MCIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6ODg4ZDM5ZWRkM2VkOGY3YzYzNzE5MTIxZGIyODg5NDEwNWM3NGEzY2ZiN2FmYzMyNjA4ODg0ZjhmNzI3ZjFkMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OjdmZGY1YWJlODVlOTMzMmY5MGQ2OTIyZGY2YTNjMGQ4NzFjNzcwOGY4ZWQ2NzAwNGUyNzhiOTQ1MDllZmY5Y2QiLCJsYXN0X2tleSI6WyI5Il0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6ImdlbmVyYXRpb25zIn0sInNuYXBzaG90Ijoia2V5c2V0In0=",
    "next": [
      "cx.get(\"sha256:d4f81305020c67d65197711f51fe417c764215d0ee7448d931ee6f880521ca99\")",
      "cx.orient(section=\"generations\", cursor=\"eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1Njo4YjFmYzRjNDI5ZmJiZGM5ZWVlMzkxNWRjM2MyMmFmNjRmZGJkYmEzNDY1Nzk1Y2ViMjcwYjAxMzcxZjg5OWJkIiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjE0OWQyOTI5NjEwZGJlMWY2YjljNzhkMWYxYmJlYjBlMTQzODZhMGY5ZTk2ZGZmMWQzMDIzMWU3MjBhY2NjYmYiLCJnaXRfb2lkIjoiOTcwNDBkYmZkZDFlN2UyODQwOThiNDllY2M2NTA0YWVjYjIxMWQ4MCIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6ODg4ZDM5ZWRkM2VkOGY3YzYzNzE5MTIxZGIyODg5NDEwNWM3NGEzY2ZiN2FmYzMyNjA4ODg0ZjhmNzI3ZjFkMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OjdmZGY1YWJlODVlOTMzMmY5MGQ2OTIyZGY2YTNjMGQ4NzFjNzcwOGY4ZWQ2NzAwNGUyNzhiOTQ1MDllZmY5Y2QiLCJsYXN0X2tleSI6WyI5Il0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6ImdlbmVyYXRpb25zIn0sInNuYXBzaG90Ijoia2V5c2V0In0=\")"
    ]
  }
});
