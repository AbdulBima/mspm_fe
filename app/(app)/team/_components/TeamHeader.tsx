import { FileDown, Plus } from "lucide-react";

interface TeamHeaderProps {
  downloadingReview: boolean;
  exportDisabled: boolean;
  onExport: () => void;
  onAddMember: () => void;
}

export function TeamHeader({ downloadingReview, exportDisabled, onExport, onAddMember }: TeamHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="questrial-regular text-[9px] uppercase tracking-widest text-amber-700 mb-1">Sprint workspace</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">Team</h1>
        <p className="mt-1 text-sm text-zinc-500">Everyone with active work this sprint — no one goes invisible.</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          disabled={downloadingReview || exportDisabled}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-600 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <FileDown size={14} className="text-amber-600" />
          {downloadingReview ? "Preparing…" : "Export in review"}
        </button>
        <button
          onClick={onAddMember}
          className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 hover:shadow-md active:scale-[0.98]  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <Plus size={14} className="text-amber-400" /> Add member
        </button>
      </div>
    </div>
  );
}
