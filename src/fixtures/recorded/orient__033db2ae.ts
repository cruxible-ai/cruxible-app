// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 8aece620
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
    "limit": 500
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
    "evaluation_time": "2026-10-21T19:49:21.672619Z",
    "section": "pins",
    "pins": [
      {
        "source": "Blueprint:security.asset-fetch",
        "role": "capture-contract",
        "target": "CaptureContract:security.release-asset-v1",
        "target_digest": "sha256:18b69778e037aa061492f60101645755c5e393fba7ead9358c17e8637b5874c0",
        "current": true
      },
      {
        "source": "Blueprint:security.asset-fetch",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Blueprint:security.asset-fetch",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Blueprint:security.asset-fetch",
        "role": "provider-interface",
        "target": "ProviderInterface:security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798",
        "target_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
        "current": true
      },
      {
        "source": "Blueprint:security.cve-record-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.cve-record-http-v1",
        "target_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
        "current": true
      },
      {
        "source": "Blueprint:security.cve-record-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Blueprint:security.cve-record-acquire",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Blueprint:security.cve-record-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Blueprint:security.epss-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-daily-v1",
        "target_digest": "sha256:1cf4b39dae1713d2675fd138b5589f36219e9085d1c9354c564fa24934cca7bb",
        "current": true
      },
      {
        "source": "Blueprint:security.epss-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "target_digest": "sha256:204609ce92af2744651e9dd40ac2073b74b0129cba3e44511266e6bbc0ea0c3f",
        "current": true
      },
      {
        "source": "Blueprint:security.epss-acquire",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Blueprint:security.epss-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Blueprint:security.epss-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8",
        "target_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
        "current": true
      },
      {
        "source": "Blueprint:security.history-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.github-api-v1",
        "target_digest": "sha256:39773002ba38b01e058f7e2c552dd226e820987e7923c7af47bc77a7349b6c80",
        "current": true
      },
      {
        "source": "Blueprint:security.history-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Blueprint:security.history-acquire",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Blueprint:security.history-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Blueprint:security.kev-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Blueprint:security.kev-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "target_digest": "sha256:204609ce92af2744651e9dd40ac2073b74b0129cba3e44511266e6bbc0ea0c3f",
        "current": true
      },
      {
        "source": "Blueprint:security.kev-acquire",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Blueprint:security.kev-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Blueprint:security.kev-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "capture-contract",
        "target": "CaptureContract:security.osv-query-v1",
        "target_digest": "sha256:675cf750e2f9a8ca72e79685016692827846cbe0e8c2b5a4ece41a17eb483ef8",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "contract-in",
        "target": "Contract:security-osv-applicability-request",
        "target_digest": "sha256:d556f6928944f023cfb4b60515370543372fd495cc65b3c9dc28cc7569865e9f"
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "contract-out",
        "target": "Contract:security-osv-applicability-result",
        "target_digest": "sha256:34d1f070c5e1188f10b434cb009b53593d8e4ddf424f75d911e5e25fe9e5e173"
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "contract-out",
        "target": "Contract:security-osv-applicability-summary",
        "target_digest": "sha256:2801d0b88c09035bccc8b969e0a0ff5e762ad2f962587416deec6f43cd1705dc"
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-applicability/cd02d7da5e83f085dd2b337c570b2bc0fda31c708d0021e5e9af3ac897b5fa75",
        "target_digest": "sha256:317dadefe00e69348b4994f0fac60a22192ea20dc13685a6fc25779699718e80",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312",
        "target_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "target_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "target_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7",
        "current": true
      },
      {
        "source": "Blueprint:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "target_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
        "current": true
      },
      {
        "source": "Blueprint:security.registry-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Blueprint:security.registry-acquire",
        "role": "contract-in",
        "target": "Contract:security-registry-input",
        "target_digest": "sha256:618ed433d74d151a98ad51bcd4c0b25a7a553d1fc5681608ebb34b951d4e46ad"
      },
      {
        "source": "Blueprint:security.registry-acquire",
        "role": "contract-out",
        "target": "Contract:security-registry-summary",
        "target_digest": "sha256:469d06f5cd4495a915e40d5eb264fac4f74f24b07d051d93d182fc820866389c"
      },
      {
        "source": "Blueprint:security.registry-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009",
        "target_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
        "current": true
      },
      {
        "source": "Blueprint:security.release-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.github-release-v1",
        "target_digest": "sha256:448914b7c29fb3c95c1a6550ae0d0302b032bdf273ad7875177a8393f17a9c7a",
        "current": true
      },
      {
        "source": "Blueprint:security.release-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Blueprint:security.release-acquire",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Blueprint:security.release-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Blueprint:security.repo-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Blueprint:security.repo-acquire",
        "role": "contract-in",
        "target": "Contract:security-repo-input",
        "target_digest": "sha256:4a947d7ec730a0f07b9b1595b7bc0df6eac041f3c2093023b6ac7fbe247db0c4"
      },
      {
        "source": "Blueprint:security.repo-acquire",
        "role": "contract-out",
        "target": "Contract:security-repo-snapshot-summary",
        "target_digest": "sha256:cf12b6e7cfbe1e76890c9d494c2bed53c422da3159db5eaefeb14c3b830f5829"
      },
      {
        "source": "Blueprint:security.repo-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0",
        "target_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
        "current": true
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.coordinator-claim-self-source-v1",
        "target_digest": "sha256:8cae85d45871ddeb4cac43655707daa363755bfc82b0ada92085cc8647019ece"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.coordinator-proposer-observed-v1",
        "target_digest": "sha256:8043b1a893e7332fd869868f37b4c21d59ae2448367f068809a1d4f5b57bdd53"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.coordinator-retained-cas-v1",
        "target_digest": "sha256:90ec5877200bbcc682c75af28b988899ac2ea9388914c48370ea91c9a0391593"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.claim-statement-span-v1",
        "target_digest": "sha256:060a4e95d6ff8f93cc9a54ed5d098bb6e57345a40d95748cb83133d83ea06e00"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.proposer-asserted-v1",
        "target_digest": "sha256:6097cb5d00c016b113ccfc4abfae919cd4d057c73818114941fd3d3e645636ad"
      },
      {
        "source": "CaptureContract:playbill.foreign-source.doc-investigations-84e283f0451cc97a.md",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1",
        "target_digest": "sha256:d663dd2b7e29038971149a8e8c30ba5aa07e77de7217ed3524bd2d6743162cc7"
      },
      {
        "source": "CaptureContract:security.cve-record-http-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.cve-record-http-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.cve-record-http-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.cyclonedx-sbom-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.epss-daily-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.epss-daily-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.epss-daily-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.github-api-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.github-api-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.github-api-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.github-release-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.github-release-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.github-release-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.kev-http-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.kev-http-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.kev-http-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.osv-query-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.osv-query-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.osv-query-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.pypi-release-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.pypi-release-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.pypi-release-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.release-asset-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.release-asset-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.release-asset-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.repo-snapshot-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.repo-snapshot-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.repo-snapshot-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "CaptureContract:security.workspace-evidence-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1",
        "target_digest": "sha256:3209d7813a9932cc7bdfb02d19e1ccecf5e7c4b401aa0a33b1bec17b4dc5ca63"
      },
      {
        "source": "CaptureContract:security.workspace-evidence-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1",
        "target_digest": "sha256:f64960ed08091396f34bac6511f8e1daffc5d45339e4f57b34b5b5c950efb6ea"
      },
      {
        "source": "CaptureContract:security.workspace-evidence-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1",
        "target_digest": "sha256:d4811b19cac6947dfc72fbc6346b8eaeeb69b1dd78b663342be2e6bcc851e5d9"
      },
      {
        "source": "Line:security.cve-applicability",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.cve-record-http-v1",
        "target_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
        "current": true
      },
      {
        "source": "Line:security.cve-applicability",
        "role": "procedure",
        "target": "Procedure:security.cve-applicability",
        "target_digest": "sha256:96d5e33dd1ca384bb4079624daa7695a54331684c0aded465482789e88c43222",
        "current": true
      },
      {
        "source": "Line:security.cve-applicability",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.epss-daily",
        "role": "procedure",
        "target": "Procedure:security.epss-acquire",
        "target_digest": "sha256:e1ae5f1f6421b476cc1a6e1626cb62dad3c65ea25509603e5fc7e9be1e03ee7a",
        "current": true
      },
      {
        "source": "Line:security.epss-daily",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.epss-daily-v1",
        "target_digest": "sha256:1cf4b39dae1713d2675fd138b5589f36219e9085d1c9354c564fa24934cca7bb",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "procedure",
        "target": "Procedure:security.epss-triage",
        "target_digest": "sha256:1dafa4576ed87a6c8765c92f9a20bfaad8597f7a04a973d7528dc940641086b4",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.harden",
        "role": "procedure",
        "target": "Procedure:security.harden",
        "target_digest": "sha256:2e7b696da9265fc8b284ec9b3b42590a211295c4d36a020be97d2a2cd12fcb6c",
        "current": true
      },
      {
        "source": "Line:security.kev-attention",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Line:security.kev-attention",
        "role": "procedure",
        "target": "Procedure:security.kev-attention",
        "target_digest": "sha256:bc629e11fa10fd5595545ebb1067116f6cb7dd729014a724217307c0c5118625",
        "current": true
      },
      {
        "source": "Line:security.kev-attention",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.kev-daily",
        "role": "procedure",
        "target": "Procedure:security.kev-acquire",
        "target_digest": "sha256:ee84a30126ef63686471ee102fab349fa7dcabc92097f55c36168104cc8e411e",
        "current": true
      },
      {
        "source": "Line:security.kev-daily",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "procedure",
        "target": "Procedure:security.kev-triage",
        "target_digest": "sha256:1b704307b138045dd8f7e8c7fd8f6e237493795bf978732a27f955b1c55db153",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.osv-applicability",
        "role": "procedure",
        "target": "Procedure:security.osv-applicability",
        "target_digest": "sha256:07de7d44b718e32fd58c9f79aca3dcc47278579cb0e31f949129628d2544f358",
        "current": true
      },
      {
        "source": "Line:security.osv-applicability",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible",
        "role": "procedure",
        "target": "Procedure:security.registry-parse",
        "target_digest": "sha256:844a8850bde2366392240b70b8f259b20f2b2c33380ca8559fe29bafe2cf54aa",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible-client",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible-client",
        "role": "procedure",
        "target": "Procedure:security.registry-parse",
        "target_digest": "sha256:844a8850bde2366392240b70b8f259b20f2b2c33380ca8559fe29bafe2cf54aa",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible-client",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.registry-pull.cruxible",
        "role": "procedure",
        "target": "Procedure:security.registry-acquire",
        "target_digest": "sha256:fdaf58f33486a946f32011a48446013681608309badc4e46056544d571883f3e",
        "current": true
      },
      {
        "source": "Line:security.registry-pull.cruxible",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.registry-pull.cruxible-client",
        "role": "procedure",
        "target": "Procedure:security.registry-acquire",
        "target_digest": "sha256:fdaf58f33486a946f32011a48446013681608309badc4e46056544d571883f3e",
        "current": true
      },
      {
        "source": "Line:security.registry-pull.cruxible-client",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-ci",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-ci",
        "role": "procedure",
        "target": "Procedure:security.repo-parse",
        "target_digest": "sha256:c0fdbf26d5e754277f546b1be7a536d8dafc1b7cddb85ba0330b59f6b6d5b44f",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-ci",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-released",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-released",
        "role": "procedure",
        "target": "Procedure:security.repo-parse",
        "target_digest": "sha256:c0fdbf26d5e754277f546b1be7a536d8dafc1b7cddb85ba0330b59f6b6d5b44f",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-released",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
        "role": "procedure",
        "target": "Procedure:security.repo-parse",
        "target_digest": "sha256:c0fdbf26d5e754277f546b1be7a536d8dafc1b7cddb85ba0330b59f6b6d5b44f",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.repo-pull.cruxible-ci",
        "role": "procedure",
        "target": "Procedure:security.repo-acquire",
        "target_digest": "sha256:e974b5811420a81f9320ce6592bb24d180d015f9cc3369b88bfa81717a3e956f",
        "current": true
      },
      {
        "source": "Line:security.repo-pull.cruxible-ci",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Line:security.sbom-import",
        "role": "trigger-capture-contract",
        "target": "CaptureContract:security.cyclonedx-sbom-v1",
        "target_digest": "sha256:26391ef005ecab1dbedf0b68849b5aea1cab2e35161c3a52bcd1e0a626332eef",
        "current": true
      },
      {
        "source": "Line:security.sbom-import",
        "role": "procedure",
        "target": "Procedure:security.sbom-import",
        "target_digest": "sha256:8c383dc2c1fcb8a913dac28048b3fa6273caab36b4256d7f6b1cd71fee9e1a86",
        "current": true
      },
      {
        "source": "Line:security.sbom-import",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "capture-contract",
        "target": "CaptureContract:security.release-asset-v1",
        "target_digest": "sha256:18b69778e037aa061492f60101645755c5e393fba7ead9358c17e8637b5874c0",
        "current": true
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "provider-interface",
        "target": "ProviderInterface:security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798",
        "target_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
        "current": true
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "capture-contract",
        "target": "CaptureContract:security.cve-record-http-v1",
        "target_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "contract-in",
        "target": "Contract:security-cve-applicability-request",
        "target_digest": "sha256:22e80e2da42813885c6817595f871b601f73d68dcc87d0a60d43d5e704db2033"
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "contract-out",
        "target": "Contract:security-cve-applicability-result",
        "target_digest": "sha256:8f2b762fb25be42aff804b4d1d67cbcebc74dd687b0153d8029ca909821f88ab"
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "contract-out",
        "target": "Contract:security-cve-applicability-summary",
        "target_digest": "sha256:3821ac9e4333bf40959ffa5c99163a55030ee67d20f1ed397be8532e203061ff"
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "provider",
        "target": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "target_digest": "sha256:75f19062850133aa30ca5c2845d590a0025c8a3121a2b518080751e34ceca44c",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cve-applicability/fa65ba8a159a3fedd4114b3cfe0d61f02e950f71dc7cd22f54d9139fc0b6b7ab",
        "target_digest": "sha256:4ae58ed19fc0df0e1ac157d4933b78e9326dd5ea49e3f9682a71a35df3832fdf",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "target_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "target_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "target_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.cve-record-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.cve-record-http-v1",
        "target_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
        "current": true
      },
      {
        "source": "Procedure:security.cve-record-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Procedure:security.cve-record-acquire",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Procedure:security.cve-record-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.cve-record-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.cve-record-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-daily-v1",
        "target_digest": "sha256:1cf4b39dae1713d2675fd138b5589f36219e9085d1c9354c564fa24934cca7bb",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "target_digest": "sha256:204609ce92af2744651e9dd40ac2073b74b0129cba3e44511266e6bbc0ea0c3f",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8",
        "target_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.epss-daily-v1",
        "target_digest": "sha256:1cf4b39dae1713d2675fd138b5589f36219e9085d1c9354c564fa24934cca7bb",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-in",
        "target": "Contract:security-epss-request",
        "target_digest": "sha256:ea4f7625cd8e813d86ad49d14666a28680349727857f8580857d8f66c0079d07"
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-out",
        "target": "Contract:security-epss-result",
        "target_digest": "sha256:d54675de90bd23c76a09818c9c457bb826d0942bab51d0a3fa0551ad11bf338d"
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-out",
        "target": "Contract:security-epss-summary",
        "target_digest": "sha256:e3cb55ae88a0780aea6a68bf718a337fd2e9f42bc18f7690a4a68e53c0455217"
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "provider",
        "target": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "target_digest": "sha256:059585beea056c72036451160cb291de3e0337451defa15270c6ae1e3d9ecfd7",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8",
        "target_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-scores/449662d06f51954b811871dd37b9bb4494d017388f75bfd257edc672088b660b",
        "target_digest": "sha256:59dd7f2cffc0c0bcf2e13541885dbe2914844ba7427fa3961d8269f41bd0cfd7",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "target_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.workspace-evidence-v1",
        "target_digest": "sha256:81b3a9f16874728f586c394a7f5af852004ffb9debbe0b77bfd9750f2076cc7c",
        "current": true
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence",
        "target_digest": "sha256:1752420ab9752c2310e77810ede7472a7976302840cc4023d0f92bb4edb38178"
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input",
        "target_digest": "sha256:cab7dec5ca71b93074efc8e2e16e14595ecb629b142c72472ee3fa0210788b13"
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "provider",
        "target": "Provider:cruxible-builtin",
        "target_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
        "current": true
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "target_digest": "sha256:f8e4a73e987e92313393d5008c5091af5b6b351249ae69012edfcc8269ddf639",
        "current": true
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "contract-in",
        "target": "Contract:security-harden-input",
        "target_digest": "sha256:e8d1a14380f1757c6c61a1dbb253142d028b3c42f75e796fdb7033a5bae86f19"
      },
      {
        "source": "Procedure:security.harden",
        "role": "contract-in",
        "target": "Contract:security-harden-request",
        "target_digest": "sha256:7b0797330b7120551f60d3b16e2ecb97add1ec5e66969a2e65a97dbd82a75d3f"
      },
      {
        "source": "Procedure:security.harden",
        "role": "contract-out",
        "target": "Contract:security-harden-result",
        "target_digest": "sha256:fcc419d899912dad99a2cc664ac9d58e5ba9b3904a3fbc699860795af1bd68df"
      },
      {
        "source": "Procedure:security.harden",
        "role": "contract-out",
        "target": "Contract:security-harden-summary",
        "target_digest": "sha256:c03b7dd93775efb0dd04d44fd2c4d1030c41ef80d07ce84fcfa804247dfe611f"
      },
      {
        "source": "Procedure:security.harden",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "provider-interface",
        "target": "ProviderInterface:security.harden/4c1c3e516a05da470950d1ac86de580ab36e9b22cb5efaa00cc25f2c426c09b3",
        "target_digest": "sha256:6ee3b5755aa95298a40bd7c65c1f30b2ab33f903ad3ffe5ef3e804d5d52d2a7d",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.credentialed_jobs",
        "target_digest": "sha256:f6294cc8b89fa77af025a7a3032fd695c1bc5da3e612431977a4ab8ce5240fc4",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.mutable_actions",
        "target_digest": "sha256:de0dc5cbb718335622cb32bc99f47a81edc4247f455649c41b559b03d600ac0f",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.publish_paths",
        "target_digest": "sha256:00558916299c88d6c44ad281d52ac2340184a277022fd8163023458bca6ac742",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.served_vs_declared",
        "target_digest": "sha256:b0133fd5756add7ff05082d01abc2efcd1aa432f10aac2646ed96c587e69de04",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.shared_dependencies",
        "target_digest": "sha256:4c0cc2c219b673ed791da9d9ffe07d49650e966b91061e0ab624554332a6dced",
        "current": true
      },
      {
        "source": "Procedure:security.history-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.github-api-v1",
        "target_digest": "sha256:39773002ba38b01e058f7e2c552dd226e820987e7923c7af47bc77a7349b6c80",
        "current": true
      },
      {
        "source": "Procedure:security.history-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Procedure:security.history-acquire",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Procedure:security.history-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.history-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.history-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "target_digest": "sha256:204609ce92af2744651e9dd40ac2073b74b0129cba3e44511266e6bbc0ea0c3f",
        "current": true
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.kev-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "contract-in",
        "target": "Contract:security-kev-attention-request",
        "target_digest": "sha256:ef5cc9cfc9704844779ed92c720fd251c5f723b02ed5dc2f11f645e7908849bb"
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "contract-out",
        "target": "Contract:security-kev-attention-result",
        "target_digest": "sha256:d18a46ffc033eabdf6250ff3dc9c11d456bc5cc0321a1ef9003f54ae18d6ea72"
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "contract-out",
        "target": "Contract:security-kev-attention-summary",
        "target_digest": "sha256:9c2936bd13fd04e56450798fe281faac5ae2d67b36ac1369c9c47574d7a77364"
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "provider",
        "target": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "target_digest": "sha256:75f19062850133aa30ca5c2845d590a0025c8a3121a2b518080751e34ceca44c",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-attention/d08d48a4915284f7ddc3c5be4693ec15a439563d56610c93a1145090be15d0fa",
        "target_digest": "sha256:822c2b97da5883eef2024c9bb3231a4fca2a7d1bc42681bf5564423a097054f1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "target_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "target_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "target_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.kev-http-v1",
        "target_digest": "sha256:3515cb2a04e6e17a3343968e325cc7eec97a9617b8eb419a879a9df845de8bfc",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-in",
        "target": "Contract:security-kev-catalog-request",
        "target_digest": "sha256:736eff159c134fe6d7a096f3e34e6f924c6b3011be59f38ebff521aeaceb03c8"
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-out",
        "target": "Contract:security-kev-catalog-result",
        "target_digest": "sha256:13c637a6c5fd43193addf1de361656f974ce5bdec5229f1fcb1e47cef5debd47"
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-out",
        "target": "Contract:security-kev-triage-summary",
        "target_digest": "sha256:10399e2c919e1c4163dbaa6cad1fd2c46e815d61dc5b053bbeea8bdfa0b3f81b"
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "provider",
        "target": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "target_digest": "sha256:75f19062850133aa30ca5c2845d590a0025c8a3121a2b518080751e34ceca44c",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-catalog/dcccdc811dca2b383a9c3a32c7d5ba107db7c8703deb461925b942c67eb4b4ac",
        "target_digest": "sha256:eba00ef81a68d5bcac4ec4cc92c9c3f83e2843f00f6fdf04a73675455fe6ed76",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "query",
        "target": "QueryDefinition:security.kev_triage_backlog",
        "target_digest": "sha256:21229b5e046fe9eacbf71e5d7719ce5488074b439ea3050babce9083a656827d",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "target_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "capture-contract",
        "target": "CaptureContract:security.osv-query-v1",
        "target_digest": "sha256:675cf750e2f9a8ca72e79685016692827846cbe0e8c2b5a4ece41a17eb483ef8",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "contract-in",
        "target": "Contract:security-osv-applicability-request",
        "target_digest": "sha256:d556f6928944f023cfb4b60515370543372fd495cc65b3c9dc28cc7569865e9f"
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "contract-out",
        "target": "Contract:security-osv-applicability-result",
        "target_digest": "sha256:34d1f070c5e1188f10b434cb009b53593d8e4ddf424f75d911e5e25fe9e5e173"
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "contract-out",
        "target": "Contract:security-osv-applicability-summary",
        "target_digest": "sha256:2801d0b88c09035bccc8b969e0a0ff5e762ad2f962587416deec6f43cd1705dc"
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-applicability/cd02d7da5e83f085dd2b337c570b2bc0fda31c708d0021e5e9af3ac897b5fa75",
        "target_digest": "sha256:317dadefe00e69348b4994f0fac60a22192ea20dc13685a6fc25779699718e80",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312",
        "target_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "target_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "target_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "target_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "contract-in",
        "target": "Contract:security-registry-input",
        "target_digest": "sha256:618ed433d74d151a98ad51bcd4c0b25a7a553d1fc5681608ebb34b951d4e46ad"
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "contract-out",
        "target": "Contract:security-registry-summary",
        "target_digest": "sha256:469d06f5cd4495a915e40d5eb264fac4f74f24b07d051d93d182fc820866389c"
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009",
        "target_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
        "current": true
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "capture-contract",
        "target": "CaptureContract:security.pypi-release-v1",
        "target_digest": "sha256:a4172c526e76abc4e19d94856a66bad01304b293bb6358c578b0d9ca58897d08",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "contract-in",
        "target": "Contract:security-registry-facts-request",
        "target_digest": "sha256:36f643b8ae1b3560d594630b1ec9a7efb563d5c595a83fa297fc6100bc9c97c1"
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "contract-out",
        "target": "Contract:security-registry-facts-result",
        "target_digest": "sha256:33a32198ae44fe677f7cc66da8384ebf7ab2706b8d2f81e97e13eae1a1b9470c"
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "contract-in",
        "target": "Contract:security-registry-parse-input",
        "target_digest": "sha256:fe47e18ab6c0cd828d2a91a2f02cb7202f42fedf9602e9e754553b5f975b3f84"
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "contract-out",
        "target": "Contract:security-registry-parse-summary",
        "target_digest": "sha256:312249aa9f0b949c0525260a747f1d0f03b2f6dcea17b181a898baced3ed14d2"
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "provider",
        "target": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "target_digest": "sha256:059585beea056c72036451160cb291de3e0337451defa15270c6ae1e3d9ecfd7",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009",
        "target_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.registry-facts/f6b4c74b65bc775bccd87d205e0f391f76c1c5a74d085b79062f27f2dc3f5238",
        "target_digest": "sha256:d7449c993ae5721f93e18ea84d095e448322285bc7df63792538cdd43490c137",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "query",
        "target": "QueryDefinition:security.coverage_index",
        "target_digest": "sha256:f839b343f3089f59f829b6130530a58dc4187c5645014756f3b81505e3b70fc6",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "query",
        "target": "QueryDefinition:security.registry_facts",
        "target_digest": "sha256:9bceccc97ff29217a2efafb4b76f30f822e01a762cf232b6831cfc404590004f",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.release-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.github-release-v1",
        "target_digest": "sha256:448914b7c29fb3c95c1a6550ae0d0302b032bdf273ad7875177a8393f17a9c7a",
        "current": true
      },
      {
        "source": "Procedure:security.release-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence",
        "target_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
      },
      {
        "source": "Procedure:security.release-acquire",
        "role": "contract-in",
        "target": "Contract:security-url-input",
        "target_digest": "sha256:19d0dab3f35d05136f1089cedb2aadc8f04c6704c20d2bdcdc27130f9069c43f"
      },
      {
        "source": "Procedure:security.release-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.release-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Procedure:security.release-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "contract-in",
        "target": "Contract:security-repo-input",
        "target_digest": "sha256:4a947d7ec730a0f07b9b1595b7bc0df6eac041f3c2093023b6ac7fbe247db0c4"
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "contract-out",
        "target": "Contract:security-repo-snapshot-summary",
        "target_digest": "sha256:cf12b6e7cfbe1e76890c9d494c2bed53c422da3159db5eaefeb14c3b830f5829"
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "provider",
        "target": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "target_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
        "current": true
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0",
        "target_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
        "current": true
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "capture-contract",
        "target": "CaptureContract:security.repo-snapshot-v1",
        "target_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "contract-in",
        "target": "Contract:security-repo-parse-input",
        "target_digest": "sha256:9e237699c27b43e6216888a211c99fd83c3c602a47611ee3ce42d1bf1b08943a"
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "contract-out",
        "target": "Contract:security-repo-parse-summary",
        "target_digest": "sha256:6e21c1dab4c1be270cc8e0c32642a8361167b43e2099d2d1af55a20d4b319ea9"
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "contract-in",
        "target": "Contract:security-workflow-facts-request",
        "target_digest": "sha256:722ed3f337aedba327ff32ec4723514bb3c11e063d459d741298ac3765b2d449"
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "contract-out",
        "target": "Contract:security-workflow-facts-result",
        "target_digest": "sha256:5ec7210037d7137049e66df851fce598d8c9fde033980e293f55dfd75c7022ea"
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "provider",
        "target": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "target_digest": "sha256:059585beea056c72036451160cb291de3e0337451defa15270c6ae1e3d9ecfd7",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0",
        "target_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.workflow-facts/e3200100ece5ebb6c4278201a00b17df146ac15504be8745cbc472bc526f558f",
        "target_digest": "sha256:3840a013711fafa9cffa1b6f63b476fd8fdcbf3d2bfef0af36e32305f16f1760",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.coverage_index",
        "target_digest": "sha256:f839b343f3089f59f829b6130530a58dc4187c5645014756f3b81505e3b70fc6",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.registry_facts",
        "target_digest": "sha256:9bceccc97ff29217a2efafb4b76f30f822e01a762cf232b6831cfc404590004f",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.repo_targets",
        "target_digest": "sha256:0a9e61179d62a22e71eb472aeedae6289244383bc6bdb42332b3ea80a3cb9343",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.source_facts",
        "target_digest": "sha256:07ec35c7a7d55b904e8be59f984bf428ab8e29569cca87a5a1eedef055f60329",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.cyclonedx-sbom-v1",
        "target_digest": "sha256:26391ef005ecab1dbedf0b68849b5aea1cab2e35161c3a52bcd1e0a626332eef",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence",
        "target_digest": "sha256:1752420ab9752c2310e77810ede7472a7976302840cc4023d0f92bb4edb38178"
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input",
        "target_digest": "sha256:cab7dec5ca71b93074efc8e2e16e14595ecb629b142c72472ee3fa0210788b13"
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "provider",
        "target": "Provider:cruxible-builtin",
        "target_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "target_digest": "sha256:f8e4a73e987e92313393d5008c5091af5b6b351249ae69012edfcc8269ddf639",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.cyclonedx-sbom-v1",
        "target_digest": "sha256:26391ef005ecab1dbedf0b68849b5aea1cab2e35161c3a52bcd1e0a626332eef",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-in",
        "target": "Contract:security-empty-input",
        "target_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-in",
        "target": "Contract:security-sbom-request",
        "target_digest": "sha256:33ad43062a954acfff2fe30f76e337bd28c4961506359af4ac5d46c2b3b04e91"
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-out",
        "target": "Contract:security-sbom-result",
        "target_digest": "sha256:1b2899c8a38176d82b923acca280a00805d600a04abb7ab9621d4fa66b4a0a12"
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-out",
        "target": "Contract:security-sbom-summary",
        "target_digest": "sha256:3d04492c954c1e9cdf32830a660de02d88c5a131e8712ea0b0d48f231422a2dc"
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "provider",
        "target": "Provider:cruxible-builtin",
        "target_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "provider",
        "target": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "target_digest": "sha256:f52bd3718ce82cadcc0358be89d23e9a828bc2b3b4b3e2a04535c4d37933f6e0",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cyclonedx-components/c711c19cc83515ce9bf5f2b3c2f6bb649fee93af71aea655438dd82474ea638e",
        "target_digest": "sha256:9929d23a19f0348c30e35832c8f966258a10018905f00344184aaffdab059895",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "target_digest": "sha256:f8e4a73e987e92313393d5008c5091af5b6b351249ae69012edfcc8269ddf639",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "target_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "acquisition-policy",
        "target": "SourceAcquisitionPolicy:security.acquisition",
        "target_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.cve-applicability-propose",
        "role": "procedure",
        "target": "Procedure:security.cve-applicability",
        "target_digest": "sha256:96d5e33dd1ca384bb4079624daa7695a54331684c0aded465482789e88c43222",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-propose",
        "role": "procedure",
        "target": "Procedure:security.epss-triage",
        "target_digest": "sha256:1dafa4576ed87a6c8765c92f9a20bfaad8597f7a04a973d7528dc940641086b4",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "target_digest": "sha256:675416196623443fab7368f0324dd0b7091385940c62bcdaf04394923176c054",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "target_digest": "sha256:f247297a4958490cf976a06f8ce1bb40081a9e15c57acf1a8eb8759bf35a0d40",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "procedure",
        "target": "Procedure:security.epss-triage",
        "target_digest": "sha256:1dafa4576ed87a6c8765c92f9a20bfaad8597f7a04a973d7528dc940641086b4",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-settle",
        "role": "condition-query",
        "target": "QueryDefinition:security.settle_condition",
        "target_digest": "sha256:5c6e717c80a043e5d23c341d5495bca4db43ad764a5dd9089a6545e2c4947032",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-propose",
        "role": "procedure",
        "target": "Procedure:security.kev-triage",
        "target_digest": "sha256:1b704307b138045dd8f7e8c7fd8f6e237493795bf978732a27f955b1c55db153",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "target_digest": "sha256:4d7063ebe228e51f59707c89315683e4c814a904fb154d17ac9ec938b8dbb8c4",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "target_digest": "sha256:7b7f1fa9a3325314b526e3fdbb8f665b57c56e2d2d5b4f3c19d4d73f9c5e5d67",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "target_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "target_digest": "sha256:1a865ab32f408e30aba6e6919a3fffceaf36620dcbedee139ea830b810feab79",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "procedure",
        "target": "Procedure:security.kev-triage",
        "target_digest": "sha256:1b704307b138045dd8f7e8c7fd8f6e237493795bf978732a27f955b1c55db153",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-settle",
        "role": "condition-query",
        "target": "QueryDefinition:security.settle_condition",
        "target_digest": "sha256:5c6e717c80a043e5d23c341d5495bca4db43ad764a5dd9089a6545e2c4947032",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.osv-applicability-propose",
        "role": "procedure",
        "target": "Procedure:security.osv-applicability",
        "target_digest": "sha256:07de7d44b718e32fd58c9f79aca3dcc47278579cb0e31f949129628d2544f358",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.registry-parse-propose",
        "role": "procedure",
        "target": "Procedure:security.registry-parse",
        "target_digest": "sha256:844a8850bde2366392240b70b8f259b20f2b2c33380ca8559fe29bafe2cf54aa",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.repo-parse-propose",
        "role": "procedure",
        "target": "Procedure:security.repo-parse",
        "target_digest": "sha256:c0fdbf26d5e754277f546b1be7a536d8dafc1b7cddb85ba0330b59f6b6d5b44f",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.sbom-import-propose",
        "role": "procedure",
        "target": "Procedure:security.sbom-import",
        "target_digest": "sha256:8c383dc2c1fcb8a913dac28048b3fa6273caab36b4256d7f6b1cd71fee9e1a86",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "target_digest": "sha256:f8e4a73e987e92313393d5008c5091af5b6b351249ae69012edfcc8269ddf639",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "role": "provider-interface",
        "target": "ProviderInterface:search.web/0e1c68a52525929d82045f175095031de116bedfa0bdaffaabeda39a0fb44a3c",
        "target_digest": "sha256:4731f1a820ff453e52079fb6859b75492e44c66cb8c9ac3b2f3f809111c33878",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cve-applicability/fa65ba8a159a3fedd4114b3cfe0d61f02e950f71dc7cd22f54d9139fc0b6b7ab",
        "target_digest": "sha256:4ae58ed19fc0df0e1ac157d4933b78e9326dd5ea49e3f9682a71a35df3832fdf",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cyclonedx-components/c711c19cc83515ce9bf5f2b3c2f6bb649fee93af71aea655438dd82474ea638e",
        "target_digest": "sha256:9929d23a19f0348c30e35832c8f966258a10018905f00344184aaffdab059895",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-scores/449662d06f51954b811871dd37b9bb4494d017388f75bfd257edc672088b660b",
        "target_digest": "sha256:59dd7f2cffc0c0bcf2e13541885dbe2914844ba7427fa3961d8269f41bd0cfd7",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.harden/4c1c3e516a05da470950d1ac86de580ab36e9b22cb5efaa00cc25f2c426c09b3",
        "target_digest": "sha256:6ee3b5755aa95298a40bd7c65c1f30b2ab33f903ad3ffe5ef3e804d5d52d2a7d",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-attention/d08d48a4915284f7ddc3c5be4693ec15a439563d56610c93a1145090be15d0fa",
        "target_digest": "sha256:822c2b97da5883eef2024c9bb3231a4fca2a7d1bc42681bf5564423a097054f1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-catalog/dcccdc811dca2b383a9c3a32c7d5ba107db7c8703deb461925b942c67eb4b4ac",
        "target_digest": "sha256:eba00ef81a68d5bcac4ec4cc92c9c3f83e2843f00f6fdf04a73675455fe6ed76",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-applicability/cd02d7da5e83f085dd2b337c570b2bc0fda31c708d0021e5e9af3ac897b5fa75",
        "target_digest": "sha256:317dadefe00e69348b4994f0fac60a22192ea20dc13685a6fc25779699718e80",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.registry-facts/f6b4c74b65bc775bccd87d205e0f391f76c1c5a74d085b79062f27f2dc3f5238",
        "target_digest": "sha256:d7449c993ae5721f93e18ea84d095e448322285bc7df63792538cdd43490c137",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167",
        "role": "provider-interface",
        "target": "ProviderInterface:security.workflow-facts/e3200100ece5ebb6c4278201a00b17df146ac15504be8745cbc472bc526f558f",
        "target_digest": "sha256:3840a013711fafa9cffa1b6f63b476fd8fdcbf3d2bfef0af36e32305f16f1760",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cve-applicability/fa65ba8a159a3fedd4114b3cfe0d61f02e950f71dc7cd22f54d9139fc0b6b7ab",
        "target_digest": "sha256:4ae58ed19fc0df0e1ac157d4933b78e9326dd5ea49e3f9682a71a35df3832fdf",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cyclonedx-components/c711c19cc83515ce9bf5f2b3c2f6bb649fee93af71aea655438dd82474ea638e",
        "target_digest": "sha256:9929d23a19f0348c30e35832c8f966258a10018905f00344184aaffdab059895",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-scores/449662d06f51954b811871dd37b9bb4494d017388f75bfd257edc672088b660b",
        "target_digest": "sha256:59dd7f2cffc0c0bcf2e13541885dbe2914844ba7427fa3961d8269f41bd0cfd7",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.harden/4c1c3e516a05da470950d1ac86de580ab36e9b22cb5efaa00cc25f2c426c09b3",
        "target_digest": "sha256:6ee3b5755aa95298a40bd7c65c1f30b2ab33f903ad3ffe5ef3e804d5d52d2a7d",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-attention/d08d48a4915284f7ddc3c5be4693ec15a439563d56610c93a1145090be15d0fa",
        "target_digest": "sha256:822c2b97da5883eef2024c9bb3231a4fca2a7d1bc42681bf5564423a097054f1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-catalog/dcccdc811dca2b383a9c3a32c7d5ba107db7c8703deb461925b942c67eb4b4ac",
        "target_digest": "sha256:eba00ef81a68d5bcac4ec4cc92c9c3f83e2843f00f6fdf04a73675455fe6ed76",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-applicability/cd02d7da5e83f085dd2b337c570b2bc0fda31c708d0021e5e9af3ac897b5fa75",
        "target_digest": "sha256:317dadefe00e69348b4994f0fac60a22192ea20dc13685a6fc25779699718e80",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.registry-facts/f6b4c74b65bc775bccd87d205e0f391f76c1c5a74d085b79062f27f2dc3f5238",
        "target_digest": "sha256:d7449c993ae5721f93e18ea84d095e448322285bc7df63792538cdd43490c137",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/fb8ab30a1e1a97bb9ab91dddf4d39453edfd25be2c7df0dd6826d4a2b7fa3ef5",
        "role": "provider-interface",
        "target": "ProviderInterface:security.workflow-facts/e3200100ece5ebb6c4278201a00b17df146ac15504be8745cbc472bc526f558f",
        "target_digest": "sha256:3840a013711fafa9cffa1b6f63b476fd8fdcbf3d2bfef0af36e32305f16f1760",
        "current": true
      },
      {
        "source": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8",
        "target_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
        "current": true
      },
      {
        "source": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312",
        "target_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
        "current": true
      },
      {
        "source": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009",
        "target_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
        "current": true
      },
      {
        "source": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "role": "provider-interface",
        "target": "ProviderInterface:security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798",
        "target_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
        "current": true
      },
      {
        "source": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0",
        "target_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
        "current": true
      },
      {
        "source": "Provider:security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c",
        "target_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8",
        "target_digest": "sha256:6d6b4034fd0f0c87936b7786e4df5152f3dc35efb1fe21f82716637dd5ba67b2",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312",
        "target_digest": "sha256:251acceec4f0960e8dd6fac9488ba145fc5e963717ec6accf919616d832a46ce",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009",
        "target_digest": "sha256:e83e25f7d196718e3fb86db6a7ceee39485b50c55566bc8763cfb955a861ba5c",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "role": "provider-interface",
        "target": "ProviderInterface:security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798",
        "target_digest": "sha256:4db53e7ee851c45920bc70fd51d84878ee5daf0ad9412fa6cec1b2934b263771",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0",
        "target_digest": "sha256:d36742e86ee6c452416b8f7b51f168df199e578f4adb565a02d9091c89dac8a4",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "target_digest": "sha256:a1a832258aad077603d902135e14777300e7e33b29e2547761c41b4f762eeec8",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.cve_id",
        "target_digest": "sha256:0b62bdc6ed1ef9c6f669fc5f7c52f232a53bb6ef7a33e1ce5275901d460644f2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.expected_status",
        "target_digest": "sha256:8a26385285d9070cf4bbe6cd668ab1552085ccda821002ae5501d438ada1781b",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "target_digest": "sha256:a1a832258aad077603d902135e14777300e7e33b29e2547761c41b4f762eeec8",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release_id",
        "target_digest": "sha256:a24aa7d4af2dcd216ec99481a708e1961888815dace147c5a0f6eb3a0074eb64",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "target_digest": "sha256:a1a832258aad077603d902135e14777300e7e33b29e2547761c41b4f762eeec8",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "target_digest": "sha256:cb22ba0b3584b93bd221f7d07ed776c57422f37c67279eb3e2b8296396a738d5",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "target_digest": "sha256:62ff1936036ef6b36a7223c478fc31bbae2076450f1e524b5296cf18781320fe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.control.activation",
        "target_digest": "sha256:581d2f4dec7b9ab977ec6d5b528bc943e68cd294a28c70c52e3e922fb9c2a3dd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.control.kind",
        "target_digest": "sha256:e12d219f64e8c7d32294d1dc62d307aedc78ea10240eb3fe68240ca412b7822a",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "target_digest": "sha256:2a29f2494840a6dea9e7da0c7d0bf458b6022a1e45cdefc78476c95c29239857",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "target_digest": "sha256:62ff1936036ef6b36a7223c478fc31bbae2076450f1e524b5296cf18781320fe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "target_digest": "sha256:abb8f39dc629f6ae6f50d876b396740e3cced99d65d22c8e9da0bb5b6b9b75c7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "target_digest": "sha256:0954f2ac7a329507371c62a37de294cd171f5e7fb5ebb02d85d77031cda3379c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.review_at",
        "target_digest": "sha256:8fe9f54a64e2876aa1d71365b70635e9d808f2e2ea36b23cbfe061b5b96e3f41",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "target_digest": "sha256:f766b99bb745df3a1f9f98842f00d173d2b116cd8d3d0f18d9cbb33d7205b27f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "target_digest": "sha256:a1a832258aad077603d902135e14777300e7e33b29e2547761c41b4f762eeec8",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "target_digest": "sha256:ddea413b9b6c49a893031f6310e2ebed4f928eab460da7a5687581e38a66bafe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "target_digest": "sha256:d302b222262bee299e7b6a87054b38745b34e3e471fd65c5d30c93f11a28173c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "target_digest": "sha256:b307d0a375b6a266d2f18119911789c493c2a480cac5af84ebc0ad76af1cd3cd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "target_digest": "sha256:a6846a46b26a75d602958b58d4d881d7866ff6cf4175131275f973959d39a4f1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "target_digest": "sha256:ddea413b9b6c49a893031f6310e2ebed4f928eab460da7a5687581e38a66bafe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "target_digest": "sha256:d302b222262bee299e7b6a87054b38745b34e3e471fd65c5d30c93f11a28173c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "target_digest": "sha256:b307d0a375b6a266d2f18119911789c493c2a480cac5af84ebc0ad76af1cd3cd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "target_digest": "sha256:a6846a46b26a75d602958b58d4d881d7866ff6cf4175131275f973959d39a4f1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.environment",
        "target_digest": "sha256:f1bbdbfa2df81778d8e71d4eabc167b216c7fa32b89d47508c5a64ae150b8100",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "target_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.permission",
        "target_digest": "sha256:eaf3554965a0a46f147605f599cf901bc4240f4f32f4614d1042fb06564e414c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "target_digest": "sha256:936c2c537d53a1273d469508ca22a85c2c626a57894265ace917837a3c6be23a",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "target_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "target_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "target_digest": "sha256:55258561099684e65cf64d202d050409b684897a8178db5c853b9fbe8093a4b0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "target_digest": "sha256:4bc4b2ee7de83953a0f99792d97118c56ce0d73f5395f172620dcbf46ed2dcf9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "target_digest": "sha256:83fdbafc2053880a4df5acf636eaaf85a2cf0b4e2cfd1072fe3f465600697ddd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.approval",
        "target_digest": "sha256:50a489ce0116180bd1ea088ce3a791521a3a0179c61646fd784189d11ae1a644",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.expires_at",
        "target_digest": "sha256:12174a74ba83dcd47fe896a5ea8d6c6109ec657682f1f4249907fddc7c93c9c0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "target_digest": "sha256:2a29f2494840a6dea9e7da0c7d0bf458b6022a1e45cdefc78476c95c29239857",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "target_digest": "sha256:62ff1936036ef6b36a7223c478fc31bbae2076450f1e524b5296cf18781320fe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "target_digest": "sha256:abb8f39dc629f6ae6f50d876b396740e3cced99d65d22c8e9da0bb5b6b9b75c7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "target_digest": "sha256:0954f2ac7a329507371c62a37de294cd171f5e7fb5ebb02d85d77031cda3379c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.review_at",
        "target_digest": "sha256:8fe9f54a64e2876aa1d71365b70635e9d808f2e2ea36b23cbfe061b5b96e3f41",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.approval",
        "target_digest": "sha256:50a489ce0116180bd1ea088ce3a791521a3a0179c61646fd784189d11ae1a644",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.expires_at",
        "target_digest": "sha256:12174a74ba83dcd47fe896a5ea8d6c6109ec657682f1f4249907fddc7c93c9c0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "target_digest": "sha256:2a29f2494840a6dea9e7da0c7d0bf458b6022a1e45cdefc78476c95c29239857",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "target_digest": "sha256:62ff1936036ef6b36a7223c478fc31bbae2076450f1e524b5296cf18781320fe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "target_digest": "sha256:abb8f39dc629f6ae6f50d876b396740e3cced99d65d22c8e9da0bb5b6b9b75c7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "target_digest": "sha256:0954f2ac7a329507371c62a37de294cd171f5e7fb5ebb02d85d77031cda3379c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.review_at",
        "target_digest": "sha256:8fe9f54a64e2876aa1d71365b70635e9d808f2e2ea36b23cbfe061b5b96e3f41",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "target_digest": "sha256:f52be32f6a2997c6d1672ce52f2b6afb41f76430adf76a2520311308e99886c6",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "target_digest": "sha256:cb22ba0b3584b93bd221f7d07ed776c57422f37c67279eb3e2b8296396a738d5",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "target_digest": "sha256:506d6d673a397aee7fb9a43114a1c51d5196abc454c927ccb48dedabc1d66edd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "target_digest": "sha256:2a29f2494840a6dea9e7da0c7d0bf458b6022a1e45cdefc78476c95c29239857",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "target_digest": "sha256:62ff1936036ef6b36a7223c478fc31bbae2076450f1e524b5296cf18781320fe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "target_digest": "sha256:abb8f39dc629f6ae6f50d876b396740e3cced99d65d22c8e9da0bb5b6b9b75c7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "target_digest": "sha256:0954f2ac7a329507371c62a37de294cd171f5e7fb5ebb02d85d77031cda3379c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "target_digest": "sha256:f766b99bb745df3a1f9f98842f00d173d2b116cd8d3d0f18d9cbb33d7205b27f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.environment",
        "target_digest": "sha256:6ba2024e6826b5454642b7ca6339b1ff197678c0d9521aaea9e9352fabd13150",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.product.supplied_by",
        "target_digest": "sha256:bdf132d406f6cb60826db49c6dc7c7df67a155b7e680da0fe09aaef555f64dee",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.release.product",
        "target_digest": "sha256:be90dfcb4fc01f54a01f86f95ac00141c3cd769c5c833a4d9a68a9189ac60e11",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "target_digest": "sha256:4f00800056fb9c2af1d558a2ebdc688148172e319f5fdf9bcf8aaf121305a283",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "target_digest": "sha256:3c41f5f9c98a498dfc23382838af60685e59e22c9186ef5d9d9bca6aff29d9c9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "target_digest": "sha256:d6a354160e5eff130a244fcfbd6015d7f771a7dcfe511978d34d0b00eab5e196",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "target_digest": "sha256:7b7f1fa9a3325314b526e3fdbb8f665b57c56e2d2d5b4f3c19d4d73f9c5e5d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "target_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "target_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "target_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "target_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "target_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "target_digest": "sha256:ddea413b9b6c49a893031f6310e2ebed4f928eab460da7a5687581e38a66bafe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "target_digest": "sha256:d302b222262bee299e7b6a87054b38745b34e3e471fd65c5d30c93f11a28173c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "target_digest": "sha256:b307d0a375b6a266d2f18119911789c493c2a480cac5af84ebc0ad76af1cd3cd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "target_digest": "sha256:a6846a46b26a75d602958b58d4d881d7866ff6cf4175131275f973959d39a4f1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "target_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.permission",
        "target_digest": "sha256:eaf3554965a0a46f147605f599cf901bc4240f4f32f4614d1042fb06564e414c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "target_digest": "sha256:936c2c537d53a1273d469508ca22a85c2c626a57894265ace917837a3c6be23a",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.uses",
        "target_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "target_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "target_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "target_digest": "sha256:55258561099684e65cf64d202d050409b684897a8178db5c853b9fbe8093a4b0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "target_digest": "sha256:4bc4b2ee7de83953a0f99792d97118c56ce0d73f5395f172620dcbf46ed2dcf9",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "target_digest": "sha256:ca957a2cca04ef30b9fb70c0bf91c9d2133b3c84dca0cb8237c1c5617f459890",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "target_digest": "sha256:83fdbafc2053880a4df5acf636eaaf85a2cf0b4e2cfd1072fe3f465600697ddd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.ownership_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "target_digest": "sha256:7a39322364e2e1059c8c73dd4cc0331169550be8aa32d05f40a3e99473fe4aae",
        "current": true
      },
      {
        "source": "QueryDefinition:security.ownership_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "target_digest": "sha256:ec3456c6a80c2313607ed1a1060293cc6b71bd18cffd449d5eb6c7466b500959",
        "current": true
      },
      {
        "source": "QueryDefinition:security.ownership_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "target_digest": "sha256:d91ba8d6d651d1632629f945fe6e4ea3f21411bbbbb819855e7521437135f6cb",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "target_digest": "sha256:ddea413b9b6c49a893031f6310e2ebed4f928eab460da7a5687581e38a66bafe",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "target_digest": "sha256:d302b222262bee299e7b6a87054b38745b34e3e471fd65c5d30c93f11a28173c",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "target_digest": "sha256:b307d0a375b6a266d2f18119911789c493c2a480cac5af84ebc0ad76af1cd3cd",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "target_digest": "sha256:a6846a46b26a75d602958b58d4d881d7866ff6cf4175131275f973959d39a4f1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "target_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "target_digest": "sha256:fc1fc7efff273c5867937aa137612da6b8b8b0f95e4c39cc8c3865ea8124cc85",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "target_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "target_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "target_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "target_digest": "sha256:0ca0e36aacfd1050f35d9eca5d0533b3150d0fbb53ec0f92dbb9a0737b4dfe5f",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "target_digest": "sha256:55258561099684e65cf64d202d050409b684897a8178db5c853b9fbe8093a4b0",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "target_digest": "sha256:d2f9babf7661e03eff75d50df0f1371ecdf9d9292197ba05c8c3f1a7b953ea4d",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "target_digest": "sha256:d5c1130aa1c7ad6a51a5888303e8e4ae6ce43db6afb96cb5b32d92fbbfccddb7",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "target_digest": "sha256:4bc4b2ee7de83953a0f99792d97118c56ce0d73f5395f172620dcbf46ed2dcf9",
        "current": true
      }
    ],
    "truncated": true,
    "next_cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1Njo4YjFmYzRjNDI5ZmJiZGM5ZWVlMzkxNWRjM2MyMmFmNjRmZGJkYmEzNDY1Nzk1Y2ViMjcwYjAxMzcxZjg5OWJkIiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjE0OWQyOTI5NjEwZGJlMWY2YjljNzhkMWYxYmJlYjBlMTQzODZhMGY5ZTk2ZGZmMWQzMDIzMWU3MjBhY2NjYmYiLCJnaXRfb2lkIjoiOTcwNDBkYmZkZDFlN2UyODQwOThiNDllY2M2NTA0YWVjYjIxMWQ4MCIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6ODg4ZDM5ZWRkM2VkOGY3YzYzNzE5MTIxZGIyODg5NDEwNWM3NGEzY2ZiN2FmYzMyNjA4ODg0ZjhmNzI3ZjFkMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OmQ1N2M3MGVjZjYxZmZiNGFiMjA1OTczNWZhMmUyM2VkODZjYjkxOGYyODdkNzVmMGJjZjU5ZTY1NjEyMjZjNGUiLCJsYXN0X2tleSI6WyJRdWVyeURlZmluaXRpb246c2VjdXJpdHkucHVibGlzaF9wYXRocyIsIjEzIl0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6InBpbnMifSwic25hcHNob3QiOiJrZXlzZXQifQ==",
    "next": [
      "cx.get(\"Blueprint:security.asset-fetch\")",
      "cx.orient(section=\"pins\", cursor=\"eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1Njo4YjFmYzRjNDI5ZmJiZGM5ZWVlMzkxNWRjM2MyMmFmNjRmZGJkYmEzNDY1Nzk1Y2ViMjcwYjAxMzcxZjg5OWJkIiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjE0OWQyOTI5NjEwZGJlMWY2YjljNzhkMWYxYmJlYjBlMTQzODZhMGY5ZTk2ZGZmMWQzMDIzMWU3MjBhY2NjYmYiLCJnaXRfb2lkIjoiOTcwNDBkYmZkZDFlN2UyODQwOThiNDllY2M2NTA0YWVjYjIxMWQ4MCIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6ODg4ZDM5ZWRkM2VkOGY3YzYzNzE5MTIxZGIyODg5NDEwNWM3NGEzY2ZiN2FmYzMyNjA4ODg0ZjhmNzI3ZjFkMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OmQ1N2M3MGVjZjYxZmZiNGFiMjA1OTczNWZhMmUyM2VkODZjYjkxOGYyODdkNzVmMGJjZjU5ZTY1NjEyMjZjNGUiLCJsYXN0X2tleSI6WyJRdWVyeURlZmluaXRpb246c2VjdXJpdHkucHVibGlzaF9wYXRocyIsIjEzIl0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6InBpbnMifSwic25hcHNob3QiOiJrZXlzZXQifQ==\")"
    ]
  }
});
