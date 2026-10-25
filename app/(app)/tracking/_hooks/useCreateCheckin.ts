"use client";

import { localISODate } from "@/lib/dates";
import { notify } from "@/lib/notify";
import { useState } from "react";
import { api } from "@/lib/api";
import type { CheckinFlag, Member } from "@/lib/types";
import type { CreateCheckinInput } from "../_lib/types";

export function useCreateCheckin(sprintId: string, members: Member[], onDone: () => void) {
  const [memberId, setMemberId] = useState(members[0]?.member_id ?? "");
  const [date, setDate] = useState(localISODate());
  const [yesterday, setYesterday] = useState("");
  const [todayPlan, setTodayPlan] = useState("");
  const [blockers, setBlockers] = useState("");
  const [needs, setNeeds] = useState("");
  const [flag, setFlag] = useState<CheckinFlag>("on_track");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!memberId) return;
    setBusy(true);
    try {
      const payload = {
        sprint_id: sprintId,
        member_id: memberId,
        checkin_date: date,
        yesterday: yesterday || undefined,
        today_plan: todayPlan || undefined,
        blockers: blockers || undefined,
        needs_from_pm: needs || undefined,
        flag,
      } satisfies CreateCheckinInput;
      await api.checkins.create(payload);
      onDone();
    } catch (err) {
      notify.error(err);
    } finally {
      setBusy(false);
    }
  }

  return {
    memberId,
    setMemberId,
    date,
    setDate,
    yesterday,
    setYesterday,
    todayPlan,
    setTodayPlan,
    blockers,
    setBlockers,
    needs,
    setNeeds,
    flag,
    setFlag,
    busy,
    submit,
  };
}
