import type { Task, TaskStatus } from "@/lib/types";

/** Filters by status (or "all") and sorts by priority (1 = highest, shown first). */
export function filterAndSortTasks(tasks: Task[], statusFilter: TaskStatus | "all"): Task[] {
  return (statusFilter === "all" ? tasks : tasks.filter((t) => t.status === statusFilter)).sort(
    (a, b) => a.priority - b.priority
  );
}
