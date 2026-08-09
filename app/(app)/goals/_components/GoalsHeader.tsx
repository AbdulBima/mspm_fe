import { Plus } from "lucide-react";

interface GoalsHeaderProps {
  onAddGoal: () => void;
}

export function GoalsHeader({ onAddGoal }: GoalsHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E7E5E2] pb-6">
      <div>
        <p className="text-xs font-medium text-[#1D2B64] mb-1.5">Sprint workspace</p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#0B0C0F]">Goal alignment</h1>
        <p className="mt-1.5 text-sm text-[#84828C] max-w-md">
          Whether day-to-day work is tracking toward what this sprint set out to do.
        </p>
      </div>
      <button
        onClick={onAddGoal}
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B0C0F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64]"
      >
        <Plus size={15} /> Add goal
      </button>
    </div>
  );
}
