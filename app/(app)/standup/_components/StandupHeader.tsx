import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export function StandupHeader({ disabled, onLogCommitment }: { disabled: boolean; onLogCommitment: () => void }) {
  return (
    <PageHeader
      eyebrow="People"
      title="Standup commitments"
      description="What each person says they'll work on, checked against what actually moved in the days after."
      actions={
        <button onClick={onLogCommitment} disabled={disabled} className="btn-primary">
          <Plus size={16} /> Log commitment
        </button>
      }
    />
  );
}
