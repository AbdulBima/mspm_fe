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
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e3e0d8] bg-white p-3">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onSelectDate(shiftIsoDate(selectedDate, -1))}
          aria-label="Previous day"
          className="rounded-md p-1.5 text-[#766f60] transition-colors hover:bg-[#efede7] hover:text-[#1c1917]"
        >
          <ChevronLeft size={16} />
        </button>
        <input
          type="date"
          value={selectedDate}
          max={todayIso()}
          onChange={(e) => onSelectDate(e.target.value)}
          className="rounded-md border border-[#e3e0d8] bg-[#efede7] px-2.5 py-1.5 text-sm text-[#1c1917] outline-none focus:border-[#ad8a3d]"
        />
        <button
          onClick={() => onSelectDate(shiftIsoDate(selectedDate, 1))}
          aria-label="Next day"
          disabled={isToday}
          className="rounded-md p-1.5 text-[#766f60] transition-colors hover:bg-[#efede7] hover:text-[#1c1917] disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} />
        </button>
        {!isToday && (
          <button
            onClick={() => onSelectDate(todayIso())}
            className="ml-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-[#ad8a3d] transition-colors hover:bg-[#ad8a3d]/10"
          >
            Today
          </button>
        )}
        <span className="ml-2 rounded-full bg-[#efede7] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-[#766f60]">
          {dayNumber >= 1 ? `Day ${dayNumber} of ${workingDays}` : "Before sprint start"}
        </span>
      </div>

      <button
        onClick={onMarkAllPresent}
        disabled={markAllDisabled}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e3e0d8] px-3.5 py-2 text-xs font-medium text-[#1c1917] transition-colors hover:border-[#ad8a3d] hover:bg-[#ad8a3d]/5 disabled:opacity-40"
      >
        <Check size={13} /> Mark all present
      </button>
    </div>
  );
}
