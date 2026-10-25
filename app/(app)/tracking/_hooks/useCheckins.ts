"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Checkin, Member } from "@/lib/types";

export function useCheckins(sprintId: string) {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const reload = useCallback(async () => {
    try {
      const [c, m] = await Promise.all([api.checkins.list(sprintId), api.members.list()]);
      setCheckins(c);
      setMembers(m);
    } catch (err) {
      notify.error(err, "Couldn't load check-ins.");
    }
  }, [sprintId]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reload();
    });
    return () => {
      cancelled = true;
    };
  }, [reload]);

  return { checkins, members, reload };
}
