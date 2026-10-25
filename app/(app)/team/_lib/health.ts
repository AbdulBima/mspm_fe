import type { SprintHealth } from "@/lib/types";

export type Rollup = SprintHealth["per_member"][number];
export type Health = "blocked" | "stale" | "done" | "progress" | "none";

export function healthOf(rollup?: Rollup): Health {
  if (!rollup || rollup.task_count === 0) return "none";
  if (rollup.blocked_count > 0) return "blocked";
  if (rollup.stale_count > 0) return "stale";
  if (rollup.done_count >= rollup.task_count) return "done";
  return "progress";
}

export const RING_COLOR: Record<Health, string> = {
  blocked: "#e11d48",
  stale: "#b45309",
  done: "#059669",
  progress: "#6F01D0",
  none: "#ECEAF3",
};
