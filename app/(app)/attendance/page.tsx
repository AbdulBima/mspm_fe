"use client";

import { useMemo, useState } from "react";
import { PageLoader } from "@/components/PageLoader";
import { NoActiveSprint } from "@/components/NoActiveSprint";
import { useSprint } from "@/lib/sprint-context";
import { dayNumberFor } from "@/lib/sprint-utils";

import { AttendanceHeader } from "./_components/AttendanceHeader";
import { AttendanceToolbar } from "./_components/AttendanceToolbar";
import { AttendanceSummaryCards } from "./_components/AttendanceSummaryCards";
import { AttendanceRoster } from "./_components/AttendanceRoster";
import { SaveBar } from "./_components/SaveBar";
import { AttendanceHistoryTable } from "./_components/AttendanceHistoryTable";
import { AttendanceRateTable } from "./_components/AttendanceRateTable";

import { useRoster } from "./_hooks/useRoster";
import { useSprintTasks } from "./_hooks/useSprintTasks";
import { useAttendanceDay } from "./_hooks/useAttendanceDay";
import { useAttendanceHistory } from "./_hooks/useAttendanceHistory";
import { todayIso } from "./_lib/date";

export default function AttendancePage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const [selectedDate, setSelectedDate] = useState(todayIso());

  const { members, loading: membersLoading } = useRoster();
  const { openTasksByMember, taskById } = useSprintTasks(sprint?.sprint_id);
  const {
    history,
    stats,
    loading: historyLoading,
    reload: reloadHistory,
  } = useAttendanceHistory(sprint?.sprint_id);
  const {
    entries,
    loading: dayLoading,
    saving,
    dirty,
    error,
    setStatus,
    setJoinedAt,
    setTodayPlan,
    toggleTask,
    setNote,
    markAllPresent,
    save,
  } = useAttendanceDay(sprint?.sprint_id, selectedDate, members);

  const counts = useMemo(() => {
    const c = { present: 0, late: 0, absent: 0, excused: 0, unmarked: 0 };
    for (const m of members) {
      const st = entries[m.member_id]?.status;
      if (st) c[st]++;
      else c.unmarked++;
    }
    return c;
  }, [members, entries]);

  const dayNumber = sprint ? dayNumberFor(sprint, new Date(`${selectedDate}T00:00:00`)) : 0;

  function handleSave() {
    if (!sprint) return;
    save(() => reloadHistory(sprint.sprint_id));
  }

  if (sprintLoading) {
    return (
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return (
      <NoActiveSprint description="Attendance follows whichever sprint is active. Create or select one to start taking roll call." />
    );
  }

  return (
    <div className="space-y-6">
      <AttendanceHeader />

      <AttendanceToolbar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        dayNumber={dayNumber}
        workingDays={sprint.working_days}
        onMarkAllPresent={markAllPresent}
        markAllDisabled={membersLoading || members.length === 0}
      />

      <AttendanceSummaryCards counts={counts} />

      <AttendanceRoster
        members={members}
        membersLoading={membersLoading}
        entries={entries}
        dayLoading={dayLoading}
        selectedDate={selectedDate}
        openTasksByMember={openTasksByMember}
        taskById={taskById}
        onSetStatus={setStatus}
        onSetJoinedAt={setJoinedAt}
        onSetTodayPlan={setTodayPlan}
        onToggleTask={toggleTask}
        onSetNote={setNote}
      />

      <SaveBar
        error={error}
        dirty={dirty}
        saving={saving}
        disabled={saving || membersLoading || members.length === 0}
        onSave={handleSave}
      />

      <AttendanceHistoryTable history={history} loading={historyLoading} onSelectDate={setSelectedDate} />

      {stats && stats.per_member.length > 0 && <AttendanceRateTable stats={stats} />}
    </div>
  );
}
