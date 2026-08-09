import type { Checkin, Sprint } from "./types";
import type { DayHealth } from "@/components/SprintClock";

/** Working-day number (Mon-Fri only) that `asOf` falls on within the sprint, clamped to [0, working_days]. */
export function dayNumberFor(sprint: Sprint, asOf: Date = new Date()): number {
  const start = new Date(sprint.start_date);
  start.setHours(0, 0, 0, 0);
  const target = new Date(asOf);
  target.setHours(0, 0, 0, 0);

  if (target < start) return 0;

  let count = 0;
  const cursor = new Date(start);
  while (cursor <= target) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return Math.min(count, sprint.working_days);
}

const FLAG_RANK: Record<string, number> = { on_track: 0, no_update: 1, at_risk: 2, blocked: 3 };
const RANK_TO_HEALTH: DayHealth[] = ["on_track", "unknown", "at_risk", "blocked"];

/** Worst-case check-in flag per working day, keyed by day number (1-indexed). */
export function computeDayHealth(sprint: Sprint, checkins: Checkin[]): Record<number, DayHealth> {
  const result: Record<number, DayHealth> = {};
  for (const c of checkins) {
    const day = dayNumberFor(sprint, new Date(c.checkin_date));
    if (day < 1) continue;
    const rank = FLAG_RANK[c.flag] ?? 0;
    const existingRank = result[day] ? FLAG_RANK[result[day] === "unknown" ? "no_update" : result[day]] : -1;
    if (rank >= existingRank) result[day] = RANK_TO_HEALTH[rank];
  }
  return result;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
