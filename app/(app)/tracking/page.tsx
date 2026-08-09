"use client";

import { useState } from "react";
import { useSprint } from "@/lib/sprint-context";

import { CheckinsTab } from "./_components/CheckinsTab";
import { DecisionsTab } from "./_components/DecisionsTab";
import { MeetingsTab } from "./_components/MeetingsTab";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";
import { RisksTab } from "./_components/RisksTab";
import { TrackingHeader } from "./_components/TrackingHeader";
import { TrackingTabBar } from "./_components/TrackingTabBar";

import type { Tab } from "./_lib/constants";

export default function TrackingPage() {
  const [tab, setTab] = useState<Tab>("Check-ins");
  const { sprint, loading: sprintLoading } = useSprint();

  if (sprintLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading</p>
      </div>
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 md:p-8">
      <TrackingHeader />

      <TrackingTabBar tab={tab} onChange={setTab} />

      {tab === "Check-ins" && <CheckinsTab sprintId={sprint.sprint_id} />}
      {tab === "Risks & blockers" && <RisksTab sprintId={sprint.sprint_id} />}
      {tab === "Decisions" && <DecisionsTab sprintId={sprint.sprint_id} />}
      {tab === "Meetings" && <MeetingsTab sprintId={sprint.sprint_id} />}
    </div>
  );
}
