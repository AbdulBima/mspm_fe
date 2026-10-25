import { FileDown, Plus } from "lucide-react";
import type { Member } from "@/lib/types";
import { initials } from "@/lib/initials";

interface MemberHeaderProps {
  member: Member;
  downloading: boolean;
  onDownload: () => void;
  onNewTask: () => void;
}

export function MemberHeader({ member, downloading, onDownload, onNewTask }: MemberHeaderProps) {
  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-brand"
          style={{ backgroundColor: member.color_tag }}
        >
          {initials(member.name)}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight text-ink">{member.name}</h1>
          <p className="text-sm text-ink-mute">
            {member.role_title}
            {member.email ? ` · ${member.email}` : ""}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={onDownload} disabled={downloading} className="btn-secondary">
          {downloading ? <span className="spinner" /> : <FileDown size={16} />}
          {downloading ? "Preparing…" : "Open tasks PDF"}
        </button>
        <button onClick={onNewTask} className="btn-primary">
          <Plus size={16} /> New task
        </button>
      </div>
    </div>
  );
}
