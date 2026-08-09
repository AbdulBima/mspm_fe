"use client";

import { useMemo, useState } from "react";
import { useSprint } from "@/lib/sprint-context";
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

  if (sprintLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#DEDCD8] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading</p>
      </div>
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 md:p-4">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#DEDCD8] pb-6">
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
        <div className="flex items-center gap-2.5 py-10 justify-center">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#DEDCD8] border-t-[#1D2B64]" />
        </div>
      ) : tasks.length === 0 ? (
        <NoTasksState />
      ) : (
        <BoardTable tasks={filtered} memberById={memberById} goalById={goalById} onTaskChanged={reload} />
      )}
    </div>
  );
}
