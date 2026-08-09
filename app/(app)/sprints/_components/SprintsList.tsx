import type { Sprint, SprintStatus } from "@/lib/types";
import { SprintCard } from "./SprintCard";

interface SprintsListProps {
  sprints: Sprint[];
  activeSprintId: string | undefined;
  onStatusChange: (sprint: Sprint, status: SprintStatus) => void;
  onView: (sprintId: string) => void;
  onHandover: (sprint: Sprint) => void;
  onEdit: (sprint: Sprint) => void;
  onDelete: (sprint: Sprint) => void;
}

export function SprintsList({ sprints, activeSprintId, onStatusChange, onView, onHandover, onEdit, onDelete }: SprintsListProps) {
  return (
    <div className="space-y-3">
      {sprints.map((s) => (
        <SprintCard
          key={s.sprint_id}
          sprint={s}
          isActive={s.sprint_id === activeSprintId}
          onStatusChange={(status) => onStatusChange(s, status)}
          onView={() => onView(s.sprint_id)}
          onHandover={() => onHandover(s)}
          onEdit={() => onEdit(s)}
          onDelete={() => onDelete(s)}
        />
      ))}
    </div>
  );
}
