"use client";

import { useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { formatDate } from "@/lib/sprint-utils";
import type { AttendanceStatus, Member, Task } from "@/lib/types";
import type { LocalEntry } from "../_lib/types";
import { AttendanceRosterRow } from "./AttendanceRosterRow";

interface AttendanceRosterProps {
  members: Member[];
  membersLoading: boolean;
  entries: Record<string, LocalEntry>;
  dayLoading: boolean;
  selectedDate: string;
  openTasksByMember: Record<string, Task[]>;
  taskById: Record<string, Task>;
  onSetStatus: (memberId: string, status: AttendanceStatus) => void;
  onSetJoinedAt: (memberId: string, joinedAt: string) => void;
  onSetTodayPlan: (memberId: string, todayPlan: string) => void;
  onToggleTask: (memberId: string, taskId: string) => void;
  onSetNote: (memberId: string, note: string) => void;
}

export function AttendanceRoster({
  members,
  membersLoading,
  entries,
  dayLoading,
  selectedDate,
  openTasksByMember,
  taskById,
  onSetStatus,
  onSetJoinedAt,
  onSetTodayPlan,
  onToggleTask,
  onSetNote,
}: AttendanceRosterProps) {
  const [openTaskPickerFor, setOpenTaskPickerFor] = useState<string | null>(null);

  return (
    <div className="card">
      <div className="flex items-center justify-between rounded-t-2xl border-b border-line bg-subtle px-5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mute">
          Roll call — {formatDate(`${selectedDate}T00:00:00`)}
        </p>
        {dayLoading && <span className="text-[11px] text-ink-faint">Loading…</span>}
      </div>

      {membersLoading ? (
        <p className="px-5 py-10 text-center text-sm text-ink-mute">Loading team…</p>
      ) : members.length === 0 ? (
        <div className="px-5 py-10">
          <EmptyState
            title="No active team members yet"
            description="Add people to the sprint team before taking attendance."
            action={
              <Link href="/team" className="text-sm font-medium text-accent hover:underline">
                Go to Team
              </Link>
            }
          />
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {members.map((m) => (
            <AttendanceRosterRow
              key={m.member_id}
              member={m}
              entry={entries[m.member_id]}
              openTasksForMember={openTasksByMember[m.member_id] ?? []}
              taskById={taskById}
              isTaskPickerOpen={openTaskPickerFor === m.member_id}
              onToggleTaskPicker={() =>
                setOpenTaskPickerFor((cur) => (cur === m.member_id ? null : m.member_id))
              }
              onSetStatus={(status) => onSetStatus(m.member_id, status)}
              onSetJoinedAt={(joinedAt) => onSetJoinedAt(m.member_id, joinedAt)}
              onSetTodayPlan={(todayPlan) => onSetTodayPlan(m.member_id, todayPlan)}
              onToggleTask={(taskId) => onToggleTask(m.member_id, taskId)}
              onSetNote={(note) => onSetNote(m.member_id, note)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
