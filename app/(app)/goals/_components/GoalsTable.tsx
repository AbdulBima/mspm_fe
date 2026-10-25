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
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute w-12">#</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute">Goal</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute text-center w-28">Tasks</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute w-36">Team</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute w-40">Status</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute text-right w-48">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
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
