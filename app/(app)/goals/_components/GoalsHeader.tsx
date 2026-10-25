import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export function GoalsHeader({ onAddGoal }: { onAddGoal: () => void }) {
  return (
    <PageHeader
      eyebrow="Workspace"
      title="Goal alignment"
      description="Whether day-to-day work is tracking toward what this sprint set out to do."
      actions={
        <button onClick={onAddGoal} className="btn-primary">
          <Plus size={16} /> Add goal
        </button>
      }
    />
  );
}
