"use client";

import { useState } from "react";
import { PageLoader } from "@/components/PageLoader";
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
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="space-y-6">
      <TrackingHeader />

      <TrackingTabBar tab={tab} onChange={setTab} />

      {tab === "Check-ins" && <CheckinsTab sprintId={sprint.sprint_id} />}
      {tab === "Risks & blockers" && <RisksTab sprintId={sprint.sprint_id} />}
      {tab === "Decisions" && <DecisionsTab sprintId={sprint.sprint_id} />}
      {tab === "Meetings" && <MeetingsTab sprintId={sprint.sprint_id} />}
    </div>
  );
}
