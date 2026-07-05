/**
 * Hand-written mirrors of the source-artifact read contracts from
 * cruxible_client.contracts (SourceArtifactListItem, SourceArtifactListResult,
 * SourceArtifactReadChunk, SourceArtifactReadResult). The daemon routes
 * (GET /source-artifacts, GET /source-artifacts/{artifact_id}) are not in
 * api/openapi.json yet — the serving branch merges after this one. Once it
 * lands, regenerate (`pnpm gen:api`) and replace these with the generated
 * schema types.
 *
 * The read route serializes with response_model_exclude_none, so nullable
 * fields may be entirely absent — every nullable field here is also optional.
 */

export type SourceKind = "markdown";
export type SourceRetention = "manifest_only" | "archive";
export type DereferenceBodyOrigin = "archive" | "local_path";

export interface SourceArtifactListItem {
  source_artifact_id: string;
  kind: SourceKind;
  retention: SourceRetention;
  original_uri?: string | null;
  label?: string | null;
  content_hash: string;
  registered_at: string;
  chunk_count: number;
  byte_count: number;
}

/** Standard list envelope (ListEnvelopeFields) + items. */
export interface SourceArtifactListResult {
  total: number;
  limit?: number | null;
  offset: number;
  truncated: boolean;
  items: SourceArtifactListItem[];
}

export interface SourceArtifactReadChunk {
  chunk_id: string;
  heading_path: string[];
  block_selector: string;
  block_type: string;
  line_start: number;
  line_end: number;
  content_hash: string;
  text?: string | null;
}

export interface SourceArtifactReadResult extends SourceArtifactListItem {
  parser_version: string;
  archived?: boolean;
  archive_content_hash?: string | null;
  content_available: boolean;
  content_unavailable_reason?: string | null;
  body_origin?: DereferenceBodyOrigin | null;
  current_artifact_hash?: string | null;
  chunks: SourceArtifactReadChunk[];
}
