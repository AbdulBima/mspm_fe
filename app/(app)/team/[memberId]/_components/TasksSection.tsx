import { ChevronDown } from "lucide-react";
import { PaginationControls } from "@/components/PaginationControls";
import type { Goal, Task, TaskStatus } from "@/lib/types";
import { STATUS_META, STATUS_OPTIONS } from "../_lib/constants";
import { TaskTable } from "./TaskTable";
import { TasksEmptyState } from "./TasksEmptyState";

interface TasksSectionProps {
  filteredTasks: Task[];
  totalTaskCount: number;
  statusFilter: TaskStatus | "all";
  onStatusFilterChange: (value: TaskStatus | "all") => void;
  pagedTasks: Task[];
  goalById: Map<string, Goal>;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onChanged: () => void;
  onEdit: (task: Task) => void;
}

export function TasksSection({
  filteredTasks,
  totalTaskCount,
  statusFilter,
  onStatusFilterChange,
  pagedTasks,
  goalById,
  page,
  totalPages,
  onPageChange,
  onChanged,
  onEdit,
}: TasksSectionProps) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xs font-medium text-[#84828C]">
          Tasks · {filteredTasks.length}
          {statusFilter !== "all" ? ` of ${totalTaskCount}` : ""}
        </h2>
        <div className="relative inline-flex">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | "all")}
            className="appearance-none rounded-lg border border-[#E7E5E2] bg-white py-1.5 pl-3 pr-7 text-xs font-medium text-[#54525C] outline-none transition-colors hover:border-[#D4D2CC] focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#84828C]" />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <TasksEmptyState filtered={statusFilter !== "all"} />
      ) : (
        <>
          <TaskTable tasks={pagedTasks} goalById={goalById} onChanged={onChanged} onEdit={onEdit} />
          {totalPages > 1 && (
            <PaginationControls page={page} totalPages={totalPages} onPageChange={onPageChange} className="mt-3 flex items-center justify-between" />
          )}
        </>
      )}
    </div>
  );
}
