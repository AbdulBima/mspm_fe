import type { Goal, Member, Task } from "@/lib/types";
import type { Contributor } from "./types";

/**
 * Who's working on each goal, derived from tasks — no separate endpoint
 * needed since every task already carries goal_id + member_id. Each goal's
 * contributor list is sorted by task count, most-active first.
 */
export function buildContributorsByGoal(goals: Goal[], tasks: Task[], members: Member[]): Map<string, Contributor[]> {
  const memberById = new Map(members.map((m) => [m.member_id, m]));
  const map = new Map<string, Contributor[]>();

  for (const goal of goals) {
    const byMember = new Map<string, Contributor>();
    for (const t of tasks) {
      if (t.goal_id !== goal.goal_id) continue;
      const member = memberById.get(t.member_id);
      if (!member) continue;
      const entry = byMember.get(member.member_id) ?? { member, taskCount: 0, doneCount: 0, blockedCount: 0 };
      entry.taskCount += 1;
      if (t.status === "done") entry.doneCount += 1;
      if (t.status === "blocked") entry.blockedCount += 1;
      byMember.set(member.member_id, entry);
    }
    map.set(goal.goal_id, Array.from(byMember.values()).sort((a, b) => b.taskCount - a.taskCount));
  }

  return map;
}
