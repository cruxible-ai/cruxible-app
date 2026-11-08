// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/providers 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/providers",
  "response": {
    "tag": "playbill-provider-catalog-v1",
    "installed": [
      {
        "provider": "cruxible-builtin",
        "package": "cruxible-builtin",
        "version": "1",
        "operations": [
          "workspace.file"
        ],
        "build": "cruxible-builtin",
        "newest": true,
        "pinned_by": 1
      },
      {
        "provider": "cruxible-provider-web",
        "package": "cruxible-provider-web",
        "version": "0.5.0",
        "operations": [
          "search.web",
          "web.fetch",
          "web.fetch.pages",
          "web.render",
          "web.render.dom"
        ],
        "build": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688",
        "newest": true,
        "pinned_by": 17
      },
      {
        "provider": "security-osv-provider",
        "package": "security-osv-provider",
        "version": "0.1.0.dev0",
        "operations": [
          "osv.match",
          "osv.query",
          "sbom.components"
        ],
        "build": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec",
        "newest": true,
        "pinned_by": 32
      }
    ],
    "packages": [],
    "detail": "No provider repository configured; packages install by name from the provider index, and built wheels can still be transferred."
  }
});
