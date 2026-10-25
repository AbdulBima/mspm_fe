import { FileDown, Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

interface TeamHeaderProps {
  downloadingReview: boolean;
  exportDisabled: boolean;
  onExport: () => void;
  onAddMember: () => void;
}

export function TeamHeader({ downloadingReview, exportDisabled, onExport, onAddMember }: TeamHeaderProps) {
  return (
    <PageHeader
      eyebrow="People"
      title="Team"
      description="Everyone with work this sprint, so no one goes invisible."
      actions={
        <>
          <button onClick={onExport} disabled={downloadingReview || exportDisabled} className="btn-secondary">
            {downloadingReview ? <span className="spinner" /> : <FileDown size={16} />}
            {downloadingReview ? "Preparing…" : "Export in review"}
          </button>
          <button onClick={onAddMember} className="btn-primary">
            <Plus size={16} /> Add member
          </button>
        </>
      }
    />
  );
}
