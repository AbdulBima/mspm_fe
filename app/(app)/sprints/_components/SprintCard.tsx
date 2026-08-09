import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/sprint-utils";
import type { Sprint, SprintStatus } from "@/lib/types";
import { STATUS_LABEL, STATUS_TONE } from "../_lib/constants";

interface SprintCardProps {
  sprint: Sprint;
  isActive: boolean;
  onStatusChange: (status: SprintStatus) => void;
  onView: () => void;
  onHandover: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SprintCard({ sprint: s, isActive, onStatusChange, onView, onHandover, onEdit, onDelete }: SprintCardProps) {
  const tone = STATUS_TONE[s.status];
  return (
    <div
      className={`rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md ${
        isActive ? "border-amber-300 ring-1 ring-amber-100" : "border-zinc-100 hover:border-zinc-200"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-zinc-900">{s.name}</h3>
            <span className={`inline-flex items-center gap-1.5 questrial-regular text-[10px] uppercase tracking-wide ${tone.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
              {STATUS_LABEL[s.status]}
            </span>
          </div>
          {s.theme && <p className="mt-1 max-w-xl text-sm text-zinc-600">{s.theme}</p>}
          <p className="mt-1.5 questrial-regular text-[11px] text-zinc-400">
            Starts {formatDate(s.start_date)} · {s.working_days} working days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={s.status}
            onChange={(e) => onStatusChange(e.target.value as SprintStatus)}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/15"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={onView}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
          >
            View
          </button>
          <button
            onClick={onHandover}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
          >
            Handover
          </button>
          <button
            onClick={onEdit}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete sprint"
            className="rounded-lg border border-zinc-200 p-2 text-zinc-400 transition-colors hover:border-rose-200 hover:text-rose-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {s.success_measures.length > 0 && (
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <p className="mb-1.5 questrial-regular text-[9px] uppercase tracking-widest text-zinc-400">Success measures</p>
          <ul className="space-y-1">
            {s.success_measures.map((m, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-zinc-600">
                <span className="mt-0.5 text-emerald-600">✓</span> {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
