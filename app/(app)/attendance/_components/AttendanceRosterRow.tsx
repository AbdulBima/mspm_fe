import type { AttendanceStatus, Member, Task } from "@/lib/types";
import { initials } from "@/lib/initials";
import type { LocalEntry } from "../_lib/types";
import { StatusButtonGroup } from "./StatusButtonGroup";
import { TaskAttachmentPicker } from "./TaskAttachmentPicker";

interface AttendanceRosterRowProps {
  member: Member;
  entry: LocalEntry | undefined;
  openTasksForMember: Task[];
  taskById: Record<string, Task>;
  isTaskPickerOpen: boolean;
  onToggleTaskPicker: () => void;
  onSetStatus: (status: AttendanceStatus) => void;
  onSetJoinedAt: (joinedAt: string) => void;
  onSetTodayPlan: (todayPlan: string) => void;
  onToggleTask: (taskId: string) => void;
  onSetNote: (note: string) => void;
}

export function AttendanceRosterRow({
  member,
  entry,
  openTasksForMember,
  taskById,
  isTaskPickerOpen,
  onToggleTaskPicker,
  onSetStatus,
  onSetJoinedAt,
  onSetTodayPlan,
  onToggleTask,
  onSetNote,
}: AttendanceRosterRowProps) {
  const joined = entry?.status === "present" || entry?.status === "late";
  const excusedOrAbsent = entry?.status === "absent" || entry?.status === "excused";

  return (
    <li className="flex flex-col gap-2.5 px-5 py-3.5">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
            style={{ backgroundColor: `${member.color_tag}22`, color: member.color_tag }}
          >
            {initials(member.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#1c1917]">{member.name}</p>
            <p className="truncate text-xs text-[#766f60]">{member.role_title}</p>
          </div>
        </div>

        <StatusButtonGroup activeStatus={entry?.status} onSelect={onSetStatus} />
      </div>

      {joined && (
        <div className="flex flex-col gap-2 pl-11">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex items-center gap-1.5 text-xs text-[#766f60]">
              Joined at
              <input
                type="time"
                value={entry?.joinedAt ?? ""}
                onChange={(e) => onSetJoinedAt(e.target.value)}
                className="rounded-md border border-[#e3e0d8] bg-[#efede7] px-2 py-1 text-xs text-[#1c1917] outline-none focus:border-[#ad8a3d]"
              />
            </label>
            <input
              value={entry?.todayPlan ?? ""}
              onChange={(e) => onSetTodayPlan(e.target.value)}
              placeholder="Working on today…"
              className="flex-1 rounded-md border border-[#e3e0d8] bg-[#efede7] px-2.5 py-1.5 text-xs text-[#1c1917] outline-none focus:border-[#ad8a3d]"
            />
          </div>

          <TaskAttachmentPicker
            attachedTaskIds={entry?.taskIds ?? []}
            openTasks={openTasksForMember}
            taskById={taskById}
            isOpen={isTaskPickerOpen}
            onToggleOpen={onToggleTaskPicker}
            onToggleTask={onToggleTask}
          />
        </div>
      )}

      {excusedOrAbsent && (
        <div className="pl-11">
          <input
            value={entry?.note ?? ""}
            onChange={(e) => onSetNote(e.target.value)}
            placeholder="Reason (optional)"
            className="w-full rounded-md border border-[#e3e0d8] bg-[#efede7] px-2.5 py-1.5 text-xs text-[#1c1917] outline-none focus:border-[#ad8a3d] sm:w-72"
          />
        </div>
      )}
    </li>
  );
}
