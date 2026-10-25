"use client";

import { RefreshCw } from "lucide-react";
import { useSprint } from "@/lib/sprint-context";
import { SprintClock } from "@/components/SprintClock";
import { PageLoader } from "@/components/PageLoader";
import { EmptyState } from "@/components/EmptyState";
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

  if (!sprintLoading && !sprint) return <NoSprintState />;
  if (sprintLoading || !sprint) return <PageLoader label="Loading sprint overview" />;

  return <SprintDashboard key={sprint.sprint_id} sprint={sprint} />;
}

function SprintDashboard({ sprint }: { sprint: NonNullable<ReturnType<typeof useSprint>["sprint"]> }) {
  const { health, alignment, burndown, checkins, loading, error, reload } = useSprintDashboardData(sprint.sprint_id);

  if (loading && !health) return <PageLoader label="Loading sprint overview" />;

  if (error || !health) {
    return (
      <EmptyState
        icon={RefreshCw}
        title="Couldn't load the overview"
        description={error ?? undefined}
        action={
          <button onClick={() => void reload()} className="btn-secondary">
            Try again
          </button>
        }
      />
    );
  }

  const dayHealth = computeDayHealth(sprint, checkins);
  const alignmentScore = alignment?.alignment_score ?? 0;

  return (
    <div className="space-y-6">
      <SprintClock sprint={sprint} dayNumber={health.day_number} dayHealth={dayHealth} />

      <MetricsRow health={health} alignmentScore={alignmentScore} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <BurndownChart data={burndown} />
        <NeedsAttention health={health} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <PerPersonRollup perMember={health.per_member} />
        <GoalBreakdown goals={alignment?.goals ?? []} />
      </div>
    </div>
  );
}
