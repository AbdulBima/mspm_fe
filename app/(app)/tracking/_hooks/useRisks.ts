"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Member, Risk } from "@/lib/types";

export function useRisks(sprintId: string) {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const reload = useCallback(async () => {
    try {
      const [r, m] = await Promise.all([api.risks.list(sprintId), api.members.list()]);
      setRisks(r);
      setMembers(m);
    } catch (err) {
      notify.error(err, "Couldn't load risks.");
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

  async function setStatus(riskId: string, status: Risk["status"]) {
    try {
      await api.risks.update(riskId, { status });
      await reload();
    } catch (err) {
      notify.error(err, "Couldn't update the risk.");
    }
  }

  return { risks, members, reload, setStatus };
}
