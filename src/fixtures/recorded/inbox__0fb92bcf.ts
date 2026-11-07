// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/inbox 035cfb05
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/inbox",
  "query": {
    "limit": 50,
    "line": "security.osv-query"
  },
  "response": {
    "tag": "cruxible-inbox-list-v1",
    "line_filter": "Line:security.osv-query",
    "status_filter": null,
    "entries": [],
    "truncated": false,
    "next_cursor": null
  }
});
