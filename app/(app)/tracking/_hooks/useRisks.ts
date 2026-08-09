"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Member, Risk } from "@/lib/types";

export function useRisks(sprintId: string) {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const reload = useCallback(async () => {
    const [r, m] = await Promise.all([api.risks.list(sprintId), api.members.list()]);
    setRisks(r);
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

  async function setStatus(riskId: string, status: Risk["status"]) {
    await api.risks.update(riskId, { status });
    reload();
  }

  return { risks, members, reload, setStatus };
}
