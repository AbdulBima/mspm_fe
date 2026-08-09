import { Plus } from "lucide-react";

interface NotesHeaderProps {
  disabled: boolean;
  onAddNote: () => void;
}

export function NotesHeader({ disabled, onAddNote }: NotesHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E7E5E2] pb-6">
      <div>
        <p className="mb-1.5 text-xs font-medium text-[#1D2B64]">Sprint workspace</p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#0B0C0F]">Notes</h1>
        <p className="mt-1.5 max-w-md text-sm text-[#84828C]">
          Every update, blocker, question, decision, and callout logged against this sprint&apos;s tasks, in one
          place.
        </p>
      </div>
      <button
        onClick={onAddNote}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-b from-[#16171B] to-[#0B0C0F] px-4 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(11,12,15,0.08),0_10px_20px_-8px_rgba(11,12,15,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(11,12,15,0.1),0_16px_28px_-10px_rgba(11,12,15,0.5)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
      >
        <Plus size={15} /> Add note
      </button>
    </div>
  );
}
