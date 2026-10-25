import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export function NotesHeader({ disabled, onAddNote }: { disabled: boolean; onAddNote: () => void }) {
  return (
    <PageHeader
      eyebrow="Insight"
      title="Notes"
      description="Every update, blocker, question, decision and callout logged against this sprint's tasks, in one place."
      actions={
        <button onClick={onAddNote} disabled={disabled} className="btn-primary">
          <Plus size={16} /> Add note
        </button>
      }
    />
  );
}
