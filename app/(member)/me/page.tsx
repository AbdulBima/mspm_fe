"use client";

import { useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { PageLoader } from "@/components/PageLoader";
import { useAuth } from "@/lib/auth-context";
import { DailyReportForm } from "./_components/DailyReportForm";
import { MyTasksCard } from "./_components/MyTasksCard";
import { ReportHero } from "./_components/ReportHero";
import { ReportHistory } from "./_components/ReportHistory";
import { useCountdown } from "./_hooks/useCountdown";
import { usePortalData } from "./_hooks/usePortalData";

export default function MemberHomePage() {
  const { member } = useAuth();
  const { profile, today, setToday, tasks, history, loading, error, reload, refreshHistory } = usePortalData();
  const { remainingMs, closed } = useCountdown(today?.closes_at, today?.server_now);
  const reloadedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!today || !closed || reloadedFor.current === today.report_date) return;
    reloadedFor.current = today.report_date;
    const timer = setTimeout(() => void reload(), 4000);
    return () => clearTimeout(timer);
  }, [closed, today, reload]);

  if (loading) return <PageLoader label="Loading your day" />;

  if (error || !profile || !today || !member) {
    return (
      <div className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
        <p className="text-base font-bold text-ink">We couldn&apos;t load your workspace</p>
        <p className="max-w-sm text-sm text-ink-mute">{error}</p>
        <button onClick={() => void reload()} className="btn-secondary">
          <RefreshCw size={15} /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReportHero profile={profile} today={today} remainingMs={remainingMs} closed={closed} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <DailyReportForm
          key={`${today.report_date}:${today.report?.revision ?? 0}`}
          memberId={member.member_id}
          today={today}
          tasks={tasks}
          closed={closed}
          onSaved={(next) => {
            setToday(next);
            void refreshHistory();
          }}
        />
        <div className="space-y-6">
          {history && <ReportHistory history={history} />}
          <MyTasksCard tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
