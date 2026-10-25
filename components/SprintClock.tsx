"use client";

import type { Sprint } from "@/lib/types";

export type DayHealth = "on_track" | "at_risk" | "blocked" | "unknown";

const HEALTH_THEME: Record<DayHealth, { bar: string; dot: string }> = {
  on_track: { bar: "bg-emerald-400", dot: "bg-emerald-400" },
  at_risk: { bar: "bg-gold", dot: "bg-gold" },
  blocked: { bar: "bg-rose-400", dot: "bg-rose-400" },
  unknown: { bar: "bg-white/35", dot: "bg-white/50" },
};

const HEALTH_LABEL: Record<DayHealth, string> = {
  on_track: "On track",
  at_risk: "At risk",
  blocked: "Blocked",
  unknown: "No check-in",
};

export function SprintClock({
  sprint,
  dayNumber,
  dayHealth,
}: {
  sprint: Sprint;
  dayNumber: number;
  dayHealth: Record<number, DayHealth>;
}) {
  const days = Array.from({ length: sprint.working_days }, (_, i) => i + 1);
  const currentDay = Math.min(dayNumber, sprint.working_days);
  const todayHealth = dayHealth[currentDay] ?? "unknown";
  const pct = sprint.working_days ? Math.round((currentDay / sprint.working_days) * 100) : 0;
  const daysLeft = Math.max(0, sprint.working_days - currentDay);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand p-5 text-white shadow-pop sm:p-7">
      <div className="pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full bg-accent/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">
            {sprint.status === "active" ? "Active sprint" : sprint.status === "planning" ? "Planning" : "Completed"}
          </p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">{sprint.name}</h2>
          {sprint.theme && <p className="mt-1.5 max-w-xl text-sm text-white/70">{sprint.theme}</p>}
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-2xl bg-white/10 px-3 py-2.5 sm:px-4">
            <p className="text-[10px] font-semibold tracking-wider text-white/55 uppercase">Today</p>
            <p className="text-lg font-bold tabular-nums">
              Day {currentDay}
              <span className="text-sm font-medium text-white/50">/{sprint.working_days}</span>
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-2.5 sm:px-4">
            <p className="text-[10px] font-semibold tracking-wider text-white/55 uppercase">Left</p>
            <p className="text-lg font-bold tabular-nums">{daysLeft}d</p>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-2.5 sm:px-4">
            <p className="text-[10px] font-semibold tracking-wider text-white/55 uppercase">Health</p>
            <p className="flex items-center gap-1.5 text-sm font-bold">
              <span className={`h-2 w-2 rounded-full ${HEALTH_THEME[todayHealth].dot}`} />
              {HEALTH_LABEL[todayHealth]}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-white/55">
          <span>Sprint timeline</span>
          <span className="tabular-nums">{pct}% elapsed</span>
        </div>
        <div className="flex items-end gap-1 sm:gap-1.5">
          {days.map((d) => {
            const isCurrent = d === dayNumber;
            const isFuture = d > dayNumber;
            const health = dayHealth[d] ?? "unknown";
            return (
              <div key={d} className="group relative flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`w-full rounded-full transition-all duration-300 ${
                    isFuture ? "h-1.5 bg-white/12" : `${HEALTH_THEME[health].bar} ${isCurrent ? "h-2.5 ring-2 ring-white/70" : "h-1.5"}`
                  }`}
                />
                <span
                  className={`hidden text-[10px] tabular-nums sm:block ${
                    isCurrent ? "font-bold text-white" : isFuture ? "text-white/30" : "text-white/55"
                  }`}
                >
                  {d}
                </span>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full z-20 mb-2 scale-95 opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
                >
                  <div className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-ink shadow-pop">
                    Day {d} · {isFuture ? "Upcoming" : HEALTH_LABEL[health]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
