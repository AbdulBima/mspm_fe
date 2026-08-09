"use client";

import { useState } from "react";
import type { Alignment } from "@/lib/types";
import type { Contributor } from "../_lib/types";
import { GoalRow } from "./GoalRow";

interface GoalsTableProps {
  goals: Alignment["goals"];
  contributorsByGoal: Map<string, Contributor[]>;
}

export function GoalsTable({ goals, contributorsByGoal }: GoalsTableProps) {
  // Only one goal's detail row can be open at a time — scoped here since
  // it's pure UI state, not data the rest of the page needs to know about.
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-[#E7E5E2] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E5E2]">
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] w-12">#</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C]">Goal</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] text-center w-28">Tasks</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] w-36">Team</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] w-40">Status</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] text-right w-48">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEDEB]">
            {goals.map((g, index) => (
              <GoalRow
                key={g.goal_id}
                goal={g}
                index={index}
                contributors={contributorsByGoal.get(g.goal_id) ?? []}
                isExpanded={expandedGoalId === g.goal_id}
                onToggleExpand={() => setExpandedGoalId((cur) => (cur === g.goal_id ? null : g.goal_id))}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
