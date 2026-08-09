"use client";

import { useSprint } from "@/lib/sprint-context";
import { SprintClock } from "@/components/SprintClock";
import { computeDayHealth } from "@/lib/sprint-utils";

import { BurndownChart } from "./_components/BurndownChart";
import { GoalBreakdown } from "./_components/GoalBreakdown";
import { MetricsRow } from "./_components/MetricsRow";
import { NeedsAttention } from "./_components/NeedsAttention";
import { NoSprintState } from "./_components/NoSprintState";
import { PerPersonRollup } from "./_components/PerPersonRollup";

import { useSprintDashboardData } from "./_hooks/useSprintDashboardData";

export default function DashboardPage() {
  const { sprint, loading: sprintLoading } = useSprint();

  if (!sprintLoading && !sprint) {
    return <NoSprintState />;
  }

  if (sprintLoading || !sprint) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading sprint telemetry</p>
      </div>
    );
  }

  // Keying on sprint_id remounts this on sprint change, so its loading state
  // resets naturally instead of via a synchronous setState inside an effect.
  return <SprintDashboard key={sprint.sprint_id} sprint={sprint} />;
}

function SprintDashboard({ sprint }: { sprint: NonNullable<ReturnType<typeof useSprint>["sprint"]> }) {
  const { health, alignment, burndown, checkins, loading } = useSprintDashboardData(sprint.sprint_id);

  if (loading || !health) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading sprint telemetry</p>
      </div>
    );
  }

  const dayHealth = computeDayHealth(sprint, checkins);
  const alignmentScore = alignment?.alignment_score ?? 0;

  return (
    <div className="space-y-6 max-w-400 mx-auto p-6 md:p-8 text-[#54525C]">
      <SprintClock sprint={sprint} dayNumber={health.day_number} dayHealth={dayHealth} />

      <MetricsRow health={health} alignmentScore={alignmentScore} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BurndownChart data={burndown} />
        <div className="lg:col-span-1">
          <NeedsAttention health={health} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PerPersonRollup perMember={health.per_member} />
        <div className="lg:col-span-1">
          <GoalBreakdown goals={alignment?.goals ?? []} />
        </div>
      </div>
    </div>
  );
}
