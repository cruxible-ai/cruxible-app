// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/inbox e6c037b6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/inbox",
  "query": {
    "limit": 50,
    "line": "security.sbom-import.app"
  },
  "response": {
    "tag": "cruxible-inbox-list-v1",
    "line_filter": "Line:security.sbom-import.app",
    "status_filter": null,
    "entries": [],
    "truncated": false,
    "next_cursor": null
  }
});
