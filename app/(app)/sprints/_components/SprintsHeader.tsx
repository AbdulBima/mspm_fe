import { Plus } from "lucide-react";

export function SprintsHeader({ onNewSprint }: { onNewSprint: () => void }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="questrial-regular text-[9px] uppercase tracking-widest text-amber-700 mb-1">Sprint workspace</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">Sprints</h1>
        <p className="mt-1 text-sm text-zinc-500">One sprint is active at a time — that&apos;s what drives the console.</p>
      </div>
      <button
        onClick={onNewSprint}
        className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:bg-zinc-800 hover:shadow-md active:scale-[0.98]  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        <Plus size={14} className="text-amber-400" /> New sprint
      </button>
    </div>
  );
}
