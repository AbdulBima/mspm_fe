import { CheckCircle2, Clock3, Lock } from "lucide-react";
import type { MyDailyReport, MyProfile } from "@/lib/types";
import { formatRemaining, greeting, longDate, timeOf } from "../_lib/format";

export function ReportHero({
  profile,
  today,
  remainingMs,
  closed,
}: {
  profile: MyProfile;
  today: MyDailyReport;
  remainingMs: number;
  closed: boolean;
}) {
  const submitted = Boolean(today.report);
  const urgent = !closed && !submitted && remainingMs < 2 * 60 * 60 * 1000;
  const firstName = profile.name.split(" ")[0];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand p-6 text-white shadow-pop sm:p-8">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-accent/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">{longDate(today.report_date)}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {greeting()}, {firstName}
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/70">
            {submitted
              ? "Your report for today is in. You can still refine it until midnight."
              : "Share what you got done today. Reports close at midnight and can't be filed after that."}
          </p>
          {profile.sprint && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {profile.sprint.name} · Day {profile.sprint.day_number} of {profile.sprint.working_days}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <div
            className={`flex min-w-0 items-center gap-3 rounded-2xl px-3.5 py-3 sm:min-w-[10.5rem] sm:px-4 ${
              urgent ? "bg-gold text-brand" : "bg-white/10 text-white"
            }`}
          >
            {closed ? <Lock size={20} /> : <Clock3 size={20} className={`shrink-0 ${urgent ? "" : "text-gold"}`} />}
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase ${urgent ? "text-brand/70" : "text-white/55"}`}>
                {closed ? "Window" : "Closes in"}
              </p>
              <p className="text-lg font-bold tabular-nums">{closed ? "Closed" : formatRemaining(remainingMs)}</p>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/10 px-3.5 py-3 sm:min-w-[10.5rem] sm:px-4">
            <CheckCircle2 size={20} className={`shrink-0 ${submitted ? "text-emerald-400" : "text-white/40"}`} />
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-white/55 uppercase">Status</p>
              <p className="truncate text-sm font-bold">
                {submitted ? `Submitted ${timeOf(today.report!.updated_at)}` : "Not submitted"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
