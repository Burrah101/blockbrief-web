export interface ArchivedBrief {
  id: string;
  createdAt: string;

  insights: unknown[];

  metadata: {
    marketCount: number;
    builderCount: number;
    defiCount: number;
    whaleCount: number;
  };
}

const archive: ArchivedBrief[] = [];

/**
 * Save a generated brief.
 * (Temporary in-memory implementation.
 * Later this becomes Supabase.)
 */
export function saveBrief(
  brief: ArchivedBrief
) {
  archive.unshift(brief);

  return brief;
}

/**
 * Latest brief.
 */
export function getLatestBrief() {
  return archive[0] ?? null;
}

/**
 * All briefs.
 */
export function getAllBriefs() {
  return archive;
}

/**
 * Lookup by id.
 */
export function getBrief(id: string) {
  return archive.find(b => b.id === id);
}