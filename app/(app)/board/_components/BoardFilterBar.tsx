import { CircleDot, Target, Users } from "lucide-react";
import type { Goal, Member, TaskStatus } from "@/lib/types";
import { STATUS_META, STATUS_OPTIONS } from "../_lib/constants";
import { FilterSelect } from "./FilterSelect";

interface BoardFilterBarProps {
  members: Member[];
  goals: Goal[];
  memberFilter: string;
  goalFilter: string;
  statusFilter: TaskStatus | "";
  onMemberFilterChange: (v: string) => void;
  onGoalFilterChange: (v: string) => void;
  onStatusFilterChange: (v: TaskStatus | "") => void;
}

export function BoardFilterBar({
  members,
  goals,
  memberFilter,
  goalFilter,
  statusFilter,
  onMemberFilterChange,
  onGoalFilterChange,
  onStatusFilterChange,
}: BoardFilterBarProps) {
  return (
    <div className="flex items-stretch divide-x divide-[#DEDCD8] rounded-lg border border-[#DEDCD8] bg-[#FAFAF9]">
      <FilterSelect
        icon={Users}
        value={memberFilter}
        onChange={onMemberFilterChange}
        placeholder="All members"
        options={members.map((m) => ({ value: m.member_id, label: m.name }))}
      />
      <FilterSelect
        icon={Target}
        value={goalFilter}
        onChange={onGoalFilterChange}
        placeholder="All goals"
        options={goals.map((g) => ({ value: g.goal_id, label: g.title }))}
      />
      <FilterSelect
        icon={CircleDot}
        value={statusFilter}
        onChange={(v) => onStatusFilterChange(v as TaskStatus | "")}
        placeholder="All statuses"
        options={STATUS_OPTIONS.map((s) => ({ value: s, label: STATUS_META[s].label }))}
      />
    </div>
  );
}
