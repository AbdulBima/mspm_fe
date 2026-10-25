import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { shiftIsoDate, todayIso } from "../_lib/date";

interface AttendanceToolbarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  dayNumber: number;
  workingDays: number;
  onMarkAllPresent: () => void;
  markAllDisabled: boolean;
}

export function AttendanceToolbar({
  selectedDate,
  onSelectDate,
  dayNumber,
  workingDays,
  onMarkAllPresent,
  markAllDisabled,
}: AttendanceToolbarProps) {
  const isToday = selectedDate === todayIso();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 card p-3">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onSelectDate(shiftIsoDate(selectedDate, -1))}
          aria-label="Previous day"
          className="rounded-md p-1.5 text-ink-mute transition-colors hover:bg-subtle hover:text-brand"
        >
          <ChevronLeft size={16} />
        </button>
        <input
          type="date"
          value={selectedDate}
          max={todayIso()}
          onChange={(e) => onSelectDate(e.target.value)}
          className="rounded-lg border border-line-strong bg-white px-2.5 py-1.5 text-sm text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
        <button
          onClick={() => onSelectDate(shiftIsoDate(selectedDate, 1))}
          aria-label="Next day"
          disabled={isToday}
          className="rounded-md p-1.5 text-ink-mute transition-colors hover:bg-subtle hover:text-brand disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} />
        </button>
        {!isToday && (
          <button
            onClick={() => onSelectDate(todayIso())}
            className="ml-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Today
          </button>
        )}
        <span className="ml-2 rounded-full bg-subtle px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-mute">
          {dayNumber >= 1 ? `Day ${dayNumber} of ${workingDays}` : "Before sprint start"}
        </span>
      </div>

      <button
        onClick={onMarkAllPresent}
        disabled={markAllDisabled}
        className="btn-secondary px-3.5 py-2 text-xs"
      >
        <Check size={13} /> Mark all present
      </button>
    </div>
  );
}
