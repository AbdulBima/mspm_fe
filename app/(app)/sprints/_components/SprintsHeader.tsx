import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export function SprintsHeader({ onNewSprint }: { onNewSprint: () => void }) {
  return (
    <PageHeader
      eyebrow="Workspace"
      title="Sprints"
      description="One sprint is active at a time, and that's what drives the console."
      actions={
        <button onClick={onNewSprint} className="btn-primary">
          <Plus size={16} /> New sprint
        </button>
      }
    />
  );
}
