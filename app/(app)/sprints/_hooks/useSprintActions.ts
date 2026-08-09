"use client";

import { api } from "@/lib/api";
import type { Sprint, SprintStatus } from "@/lib/types";

/** Sprint-level mutations available from the list page: inline status change and delete-with-confirm. */
export function useSprintActions(refresh: () => Promise<void> | void) {
  async function setStatus(sprint: Sprint, status: SprintStatus) {
    await api.sprints.update(sprint.sprint_id, { status });
    await refresh();
  }

  async function remove(sprint: Sprint) {
    if (!confirm(`Delete "${sprint.name}"? This deletes all its tasks, goals, and logs.`)) return;
    await api.sprints.remove(sprint.sprint_id);
    await refresh();
  }

  return { setStatus, remove };
}
