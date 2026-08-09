"use client";

import type { Sprint } from "@/lib/types";

export type DayHealth = "on_track" | "at_risk" | "blocked" | "unknown";

// Calibrated for optimal WCAG contrast ratios on clean white/gray surfaces
const HEALTH_THEME: Record<DayHealth, { text: string; bg: string; dot: string }> = {
  on_track: { text: "text-emerald-600", bg: "bg-emerald-500", dot: "bg-emerald-500" },
  at_risk: { text: "text-amber-600", bg: "bg-amber-500", dot: "bg-amber-500" },
  blocked: { text: "text-rose-600", bg: "bg-rose-500", dot: "bg-rose-500" },
  unknown: { text: "text-zinc-500", bg: "bg-zinc-200", dot: "bg-zinc-400" },
};

const HEALTH_LABEL: Record<DayHealth, string> = {
  on_track: "On Track",
  at_risk: "At Risk",
  blocked: "Blocked",
  unknown: "No Check-in",
};

export function SprintClock({
  sprint,
  dayNumber,
  dayHealth,
  compact = false,
}: {
  sprint: Sprint;
  dayNumber: number;
  dayHealth: Record<number, DayHealth>;
  compact?: boolean;
}) {
  const days = Array.from({ length: sprint.working_days }, (_, i) => i + 1);
  const currentDay = Math.min(dayNumber, sprint.working_days);
  const todayHealth = dayHealth[currentDay] ?? "unknown";

  const timelineStrip = (
    <div className="flex items-center gap-1">
      {days.map((d) => {
        const isCurrent = d === dayNumber;
        const isFuture = d > dayNumber;
        const health = dayHealth[d] ?? "unknown";
        const theme = HEALTH_THEME[health];

        return (
          <div key={d} className="group relative flex flex-1 flex-col items-center gap-2">
            {/* Segmented Progress Track */}
            <div
              className={`h-0.5 w-full rounded-full transition-all duration-300 ease-out
                ${isFuture ? "bg-zinc-100" : theme.bg}
                ${isCurrent ? "h-1 ring-2 ring-white scale-y-110" : ""}
              `}
            />

            {/* Micro-Typography for Day Number */}
            <span
              className={`font-mono text-[9px] tracking-tight transition-colors duration-200
                ${isCurrent ? "font-bold text-zinc-900" : "text-zinc-400 font-medium"}
                ${isFuture ? "opacity-40" : "opacity-100"}
              `}
            >
              {String(d).padStart(2, "0")}
            </span>

            {/* Premium, Light-Mode Tooltip Anchor */}
            <div
              role="tooltip"
              className="pointer-events-none absolute bottom-full z-20 mb-3 flex origin-bottom scale-95 flex-col items-center opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100"
            >
              <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-2.5 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <span className={`h-1 w-1 rounded-full ${theme.dot}`} />
                <span className="font-sans text-[10px] font-medium text-zinc-700">
                  Day {d} • {isFuture ? "Upcoming" : HEALTH_LABEL[health]}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (compact) return timelineStrip;

  return (
    <div className="rounded-xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="p-6">
        {/* Component Header Block */}
        <div className="mb-6 flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                Sprint Engine
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-200" />
              <span className="font-mono text-[10px] text-zinc-500">
                {sprint.working_days} Days Total
              </span>
            </div>
            
            <h2 className="mt-1 font-sans text-lg font-semibold tracking-tight text-zinc-900">
              {sprint.name}
            </h2>
            
            {sprint.theme && (
              <p className="mt-0.5 max-w-xl truncate font-sans text-xs text-zinc-500">
                {sprint.theme}
              </p>
            )}
          </div>

          {/* Status HUD Control */}
          <div className="flex shrink-0 items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50/50 px-3 py-1.5">
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-medium">
                Current
              </span>
              <span className="font-mono text-xs font-semibold tabular-nums text-zinc-900">
                Day {currentDay}
              </span>
            </div>
            
            <div className="h-5 w-px bg-zinc-200" />

            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${HEALTH_THEME[todayHealth].dot}`} />
              <span className="font-sans text-[10px] font-semibold tracking-wide uppercase text-zinc-600">
                {HEALTH_LABEL[todayHealth]}
              </span>
            </div>
          </div>
        </div>

        {timelineStrip}
      </div>
    </div>
  );
}