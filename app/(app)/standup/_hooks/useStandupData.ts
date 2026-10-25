"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { AccountabilityEntry, AccountabilityFlag, Member, Task } from "@/lib/types";

export function useStandupData(sprintId: string | undefined) {
  const [entries, setEntries] = useState<AccountabilityEntry[]>([]);
  const [flags, setFlags] = useState<AccountabilityFlag[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFor = useCallback(async (id: string) => {
    try {
      const [acc, m, t] = await Promise.all([api.checkins.accountability(id), api.members.list(), api.tasks.list(id)]);
      // Newest-first: the accountability endpoint returns entries oldest-first.
      setEntries([...acc.entries].reverse());
      setFlags(acc.flags);
      setMembers(m);
      setTasks(t);
    } catch (err) {
      notify.error(err, "Couldn't load standup data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reloadFor(sprintId);
    });
    return () => {
      cancelled = true;
    };
  }, [sprintId, reloadFor]);

  const reload = useCallback(() => {
    if (sprintId) return reloadFor(sprintId);
  }, [sprintId, reloadFor]);

  return { entries, flags, members, tasks, loading, reload };
}
