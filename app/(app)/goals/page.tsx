"use client";

import { useMemo, useState } from "react";
import { useSprint } from "@/lib/sprint-context";

import { AlignmentScoreCard } from "./_components/AlignmentScoreCard";
import { GoalsHeader } from "./_components/GoalsHeader";
import { GoalsTable } from "./_components/GoalsTable";
import { NewGoalDrawer } from "./_components/NewGoalDrawer";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";
import { NoGoalsState } from "./_components/NoGoalsState";
import { UnalignedActivity } from "./_components/UnalignedActivity";

import { useGoalsData } from "./_hooks/useGoalsData";
import { buildContributorsByGoal } from "./_lib/contributors";

export default function GoalsPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const { goals, alignment, tasks, members, loading, reload } = useGoalsData(sprint?.sprint_id);
  const [showForm, setShowForm] = useState(false);

  const contributorsByGoal = useMemo(
    () => buildContributorsByGoal(goals, tasks, members),
    [goals, tasks, members]
  );

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
    <div className="max-w-7xl mx-auto space-y-8 p-6 md:p-8">
      <GoalsHeader onAddGoal={() => setShowForm(true)} />

      {showForm && (
        <NewGoalDrawer
          sprintId={sprint.sprint_id}
          onClose={() => setShowForm(false)}
          onDone={() => {
            setShowForm(false);
            reload();
          }}
        />
      )}

      {alignment && <AlignmentScoreCard alignment={alignment} />}

      {loading ? (
        <div className="flex items-center gap-2.5 py-10 justify-center">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
          <p className="text-xs text-[#84828C]">Loading</p>
        </div>
      ) : goals.length === 0 ? (
        <NoGoalsState />
      ) : (
        <GoalsTable goals={alignment?.goals ?? []} contributorsByGoal={contributorsByGoal} />
      )}

      {alignment && alignment.unaligned_tasks.length > 0 && <UnalignedActivity tasks={alignment.unaligned_tasks} />}
    </div>
  );
}
