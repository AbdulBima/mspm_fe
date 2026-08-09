"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Checkin, Member } from "@/lib/types";

export function useCheckins(sprintId: string) {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const reload = useCallback(async () => {
    const [c, m] = await Promise.all([api.checkins.list(sprintId), api.members.list()]);
    setCheckins(c);
    setMembers(m);
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
