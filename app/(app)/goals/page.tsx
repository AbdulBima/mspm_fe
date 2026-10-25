"use client";

import { useMemo, useState } from "react";
import { PageLoader } from "@/components/PageLoader";
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
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="space-y-6">
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
        <PageLoader label="Loading goals" />
      ) : goals.length === 0 ? (
        <NoGoalsState />
      ) : (
        <GoalsTable goals={alignment?.goals ?? []} contributorsByGoal={contributorsByGoal} />
      )}

      {alignment && alignment.unaligned_tasks.length > 0 && <UnalignedActivity tasks={alignment.unaligned_tasks} />}
    </div>
  );
}
