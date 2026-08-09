export type GoalStatusKind = "blocked" | "no_activity" | "on_track";

export interface GoalStatusDescriptor {
  kind: GoalStatusKind;
  label: string;
  textClass: string;
}

/**
 * Which status a goal's row shows, in priority order: any blocked task
 * wins regardless of how much else is moving, then "no activity" if
 * nothing's logged against it yet, otherwise "on track". Previously three
 * JSX ternary branches inline in the table row — pulled out so the rule
 * itself is readable (and testable) independent of how it's rendered.
 */
export function resolveGoalStatus(g: { task_count: number; blocked_count: number }): GoalStatusDescriptor {
  if (g.blocked_count > 0) {
    return { kind: "blocked", label: `${g.blocked_count} blocked`, textClass: "text-[#B42318]" };
  }
  if (g.task_count === 0) {
    return { kind: "no_activity", label: "No activity", textClass: "text-[#92590A]" };
  }
  return { kind: "on_track", label: "On track", textClass: "text-[#16794D]" };
}
