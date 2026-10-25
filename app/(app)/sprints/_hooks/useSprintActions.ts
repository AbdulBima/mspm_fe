"use client";

import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Sprint, SprintStatus } from "@/lib/types";

export function useSprintActions(refresh: () => Promise<void> | void) {
  async function setStatus(sprint: Sprint, status: SprintStatus) {
    try {
      await api.sprints.update(sprint.sprint_id, { status });
      await refresh();
      notify.success(`${sprint.name} is now ${status}.`);
    } catch (err) {
      notify.error(err, "Couldn't update the sprint.");
    }
  }

  async function remove(sprint: Sprint) {
    if (!confirm(`Delete "${sprint.name}"? This deletes all its tasks, goals, and logs.`)) return;
    try {
      await api.sprints.remove(sprint.sprint_id);
      await refresh();
      notify.success(`${sprint.name} deleted.`);
    } catch (err) {
      notify.error(err, "Couldn't delete the sprint.");
    }
  }

  return { setStatus, remove };
}
