import type { Task } from "@/lib/types";

export interface MemberTaskStats {
  total: number;
  notStarted: number;
  inProgress: number;
  inReview: number;
  blocked: number;
  done: number;
}

export function computeMemberTaskStats(tasks: Task[]): MemberTaskStats {
  return {
    total: tasks.length,
    notStarted: tasks.filter((t) => t.status === "not_started").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    inReview: tasks.filter((t) => t.status === "in_review").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
    done: tasks.filter((t) => t.status === "done").length,
  };
}
