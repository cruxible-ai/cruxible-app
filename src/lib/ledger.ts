/**
 * The generation timeline seam (design gap G3). Core is building a paged
 * read over accepted change sets by sequence (claude/app-read-gaps): one row
 * per generation with its oid, proposal, actor, approvals, reason and member
 * count, O(page). Until the pinned contract serves it, the ledger is the
 * interim list of accepted proposals (GET /proposals?status=settled), which
 * carries no generation number and is ordered by proposal id, not time.
 * Implement `generationTimelineReader` over the new route and the ledger
 * switches to it.
 */

export interface TimelineEntry {
  sequence: number;
  gitOid: string;
  proposalId: string;
  actor: string | null;
  approvals: string[];
  because: string | null;
  memberCount: number;
}

export interface TimelinePage {
  entries: TimelineEntry[];
  nextCursor: string | null;
}

export type GenerationTimelineReader = (cursor: string | null) => Promise<TimelinePage>;

/** No timeline read is served at the pinned contract. */
export const generationTimelineReader: GenerationTimelineReader | null = null;
