"use client";

import { useCallback, useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { api } from "@/lib/api";
import type { Member } from "@/lib/types";

/**
 * Loads active team members, sorted by name. Owns exactly this — nothing
 * about attendance, sprints, or tasks belongs here.
 */
export function useRoster() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const list = await api.members.list();
      setMembers(list.filter((m) => m.active).sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      notify.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reload();
    });
    return () => {
      cancelled = true;
    };
  }, [reload]);

  return { members, loading, reload };
}
