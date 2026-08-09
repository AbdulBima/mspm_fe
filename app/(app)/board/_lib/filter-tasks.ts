import type { Task, TaskStatus } from "@/lib/types";

export interface TaskFilters {
  memberId: string;
  goalId: string;
  status: TaskStatus | "";
}

/** Applies the board's member/goal/status filters and sorts by priority (1 = highest, shown first). */
export function filterAndSortTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks
    .filter(
      (t) =>
        (!filters.memberId || t.member_id === filters.memberId) &&
        (!filters.goalId || t.goal_id === filters.goalId) &&
        (!filters.status || t.status === filters.status)
    )
    .sort((a, b) => a.priority - b.priority);
}
