import { ArrowUpRight, CalendarDays, CheckCircle2, PencilLine, Repeat2, Trash2 } from "lucide-react";
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

const ACTION =
  "inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent";

export function SprintCard({ sprint: s, isActive, onStatusChange, onView, onHandover, onEdit, onDelete }: SprintCardProps) {
  const tone = STATUS_TONE[s.status];

  return (
    <div className={`card p-5 transition-all duration-200 hover:shadow-pop sm:p-6 ${isActive ? "ring-2 ring-accent/25" : ""}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-ink">{s.name}</h3>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone.pill}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
              {STATUS_LABEL[s.status]}
            </span>
            {isActive && <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-semibold text-[#A65F00]">Viewing</span>}
          </div>
          {s.theme && <p className="mt-1.5 max-w-xl text-sm text-ink-soft">{s.theme}</p>}
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-mute">
            <CalendarDays size={13} /> Starts {formatDate(s.start_date)} · {s.working_days} working days
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={s.status}
            onChange={(e) => onStatusChange(e.target.value as SprintStatus)}
            aria-label="Sprint status"
            className="rounded-xl border border-line-strong bg-white px-3 py-2 text-xs font-semibold text-ink-soft transition-colors focus:ring-4 focus:ring-accent/10 focus:outline-none"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={onView} className={ACTION}>
            <ArrowUpRight size={14} /> View
          </button>
          <button onClick={onHandover} className={ACTION}>
            <Repeat2 size={14} /> Handover
          </button>
          <button onClick={onEdit} className={ACTION}>
            <PencilLine size={14} /> Edit
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete sprint"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-xl border border-line text-ink-mute transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {s.success_measures.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-mute uppercase">Success measures</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {s.success_measures.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-soft">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
