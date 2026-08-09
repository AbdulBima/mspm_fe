import type { AccountabilityEntry, AccountabilityFlag } from "@/lib/types";

export interface AccountabilityStats {
  total: number;
  fulfilled: number;
  stale: number;
  flagged: number;
}

/** Tallies commitment fulfillment across every logged entry: how many were kept, how many stalled. */
export function computeAccountabilityStats(
  entries: AccountabilityEntry[],
  flags: AccountabilityFlag[]
): AccountabilityStats {
  let total = 0;
  let fulfilled = 0;
  let stale = 0;
  for (const e of entries) {
    for (const t of e.committed_tasks) {
      total += 1;
      if (t.status === "done" || t.status === "progressing") fulfilled += 1;
      if (t.status === "stale") stale += 1;
    }
  }
  return { total, fulfilled, stale, flagged: flags.length };
}
