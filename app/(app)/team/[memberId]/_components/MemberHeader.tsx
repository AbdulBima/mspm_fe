import { FileDown, Plus } from "lucide-react";
import type { Member } from "@/lib/types";

interface MemberHeaderProps {
  member: Member;
  downloading: boolean;
  onDownload: () => void;
  onNewTask: () => void;
}

export function MemberHeader({ member, downloading, onDownload, onNewTask }: MemberHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E7E5E2] bg-white p-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold text-[#0B0C0F]"
          style={{ backgroundColor: member.color_tag }}
        >
          {member.name.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#0B0C0F]">{member.name}</h1>
          <p className="text-sm text-[#84828C]">{member.role_title}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDownload}
          disabled={downloading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E7E5E2] px-4 py-2.5 text-sm font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FileDown size={15} /> {downloading ? "Preparing…" : "Download open tasks"}
        </button>
        <button
          onClick={onNewTask}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B0C0F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2B64]"
        >
          <Plus size={15} /> New task
        </button>
      </div>
    </div>
  );
}
