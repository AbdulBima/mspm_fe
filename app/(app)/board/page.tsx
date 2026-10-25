"use client";

import { useMemo, useState } from "react";
import { useSprint } from "@/lib/sprint-context";
import { PageLoader } from "@/components/PageLoader";
import type { TaskStatus } from "@/lib/types";

import { BoardHeader } from "./_components/BoardHeader";
import { BoardFilterBar } from "./_components/BoardFilterBar";
import { BoardTable } from "./_components/BoardTable";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";
import { NoTasksState } from "./_components/NoTasksState";

import { useBoardData } from "./_hooks/useBoardData";
import { filterAndSortTasks } from "./_lib/filter-tasks";

export default function BoardPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const { tasks, members, goals, loading, reload } = useBoardData(sprint?.sprint_id);

  const [memberFilter, setMemberFilter] = useState("");
  const [goalFilter, setGoalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");

  const memberById = useMemo(() => new Map(members.map((m) => [m.member_id, m])), [members]);
  const goalById = useMemo(() => new Map(goals.map((g) => [g.goal_id, g])), [goals]);

  const filtered = useMemo(
    () => filterAndSortTasks(tasks, { memberId: memberFilter, goalId: goalFilter, status: statusFilter }),
    [tasks, memberFilter, goalFilter, statusFilter]
  );

  if (sprintLoading) return <PageLoader label="Loading board" />;

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <BoardHeader sprintName={sprint.name} />
        <BoardFilterBar
          members={members}
          goals={goals}
          memberFilter={memberFilter}
          goalFilter={goalFilter}
          statusFilter={statusFilter}
          onMemberFilterChange={setMemberFilter}
          onGoalFilterChange={setGoalFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      {loading ? (
        <PageLoader label="Loading tasks" />
      ) : tasks.length === 0 ? (
        <NoTasksState />
      ) : (
        <BoardTable tasks={filtered} memberById={memberById} goalById={goalById} onTaskChanged={reload} />
      )}
    </div>
  );
}
