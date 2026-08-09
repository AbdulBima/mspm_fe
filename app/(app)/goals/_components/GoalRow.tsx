import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import type { Alignment } from "@/lib/types";
import type { Contributor } from "../_lib/types";
import { ContributorList } from "./ContributorList";
import { ContributorStack } from "./ContributorStack";
import { GoalStatusPill } from "./GoalStatusPill";

interface GoalRowProps {
  goal: Alignment["goals"][number];
  index: number;
  contributors: Contributor[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function GoalRow({ goal, index, contributors, isExpanded, onToggleExpand }: GoalRowProps) {
  return (
    <Fragment>
      <tr onClick={onToggleExpand} className="cursor-pointer hover:bg-[#FAFAF9] transition-colors">
        <td className="px-5 py-4">
          <span className="text-sm tabular-nums text-[#B4B2AC]">{String(index + 1).padStart(2, "0")}</span>
        </td>
        <td className="px-5 py-4">
          <div className="flex items-center gap-2">
            <ChevronDown
              size={13}
              className={`shrink-0 text-[#B4B2AC] transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
            <span className="text-sm font-medium text-[#0B0C0F]">{goal.title}</span>
          </div>
        </td>

        <td className="px-5 py-4 text-center">
          <span className="text-sm tabular-nums text-[#54525C]">{goal.task_count}</span>
        </td>

        <td className="px-5 py-4">
          <ContributorStack contributors={contributors} />
        </td>

        <td className="px-5 py-4">
          <GoalStatusPill taskCount={goal.task_count} blockedCount={goal.blocked_count} />
        </td>

        <td className="px-5 py-4">
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-sm font-medium tabular-nums text-[#0B0C0F]">{goal.completion_pct}%</span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-[#EEEDEB]">
              <div
                className="h-full rounded-full bg-[#1D2B64] transition-all duration-500"
                style={{ width: `${goal.completion_pct}%` }}
              />
            </div>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-[#FAFAF9]">
          <td />
          <td colSpan={5} className="px-5 pb-4">
            <ContributorList contributors={contributors} />
          </td>
        </tr>
      )}
    </Fragment>
  );
}
