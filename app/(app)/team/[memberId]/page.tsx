"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Drawer } from "@/components/Drawer";
import { NewTaskForm } from "@/components/NewTaskForm";
import { useBlobDownload } from "@/hooks/useBlobDownload";
import { api } from "@/lib/api";
import { paginate } from "@/lib/pagination";
import { useSprint } from "@/lib/sprint-context";
import type { Task, TaskStatus } from "@/lib/types";

import { EditTaskForm } from "./_components/EditTaskForm";
import { MemberHeader } from "./_components/MemberHeader";
import { MemberStats } from "./_components/MemberStats";
import { RecentCheckins } from "./_components/RecentCheckins";
import { TasksSection } from "./_components/TasksSection";

import { useMemberDashboard } from "./_hooks/useMemberDashboard";
import { PAGE_SIZE } from "./_lib/constants";
import { filterAndSortTasks } from "./_lib/filter-tasks";
import { computeMemberTaskStats } from "./_lib/stats";

export default function MemberDetailPage() {
  const { memberId } = useParams<{ memberId: string }>();
  const { sprint } = useSprint();
  const { member, tasks, checkins, goals, loading, reload } = useMemberDashboard(memberId, sprint?.sprint_id);
  const { downloading: downloadingPdf, download } = useBlobDownload();

  const [showNewTask, setShowNewTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [page, setPage] = useState(1);

  const goalById = useMemo(() => new Map(goals.map((g) => [g.goal_id, g])), [goals]);
  const filteredTasks = useMemo(() => filterAndSortTasks(tasks, statusFilter), [tasks, statusFilter]);
  const { totalPages, safePage, pageItems: pagedTasks } = useMemo(
    () => paginate(filteredTasks, page, PAGE_SIZE),
    [filteredTasks, page]
  );
  const stats = useMemo(() => computeMemberTaskStats(tasks), [tasks]);

  function changeStatusFilter(value: TaskStatus | "all") {
    setStatusFilter(value);
    setPage(1);
  }

  function downloadOpenTasksPdf() {
    if (!sprint || !member) return;
    download(
      () => api.members.downloadOpenTasksPdf(member.member_id, sprint.sprint_id),
      `${member.name.replace(/\s+/g, "-")}-open-tasks.pdf`
    );
  }

  if (!sprint || loading || !member) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 md:p-8">
      <Link href="/team" className="inline-flex items-center gap-1 text-xs text-[#84828C] transition-colors hover:text-[#0B0C0F]">
        <ChevronLeft size={14} /> Back to team
      </Link>

      <MemberHeader member={member} downloading={downloadingPdf} onDownload={downloadOpenTasksPdf} onNewTask={() => setShowNewTask(true)} />

      <MemberStats stats={stats} />

      {(showNewTask || editingTask) && (
        <Drawer
          title={editingTask ? "Edit Task" : "New Task"}
          maxWidthCls="max-w-xl"
          onClose={() => {
            setShowNewTask(false);
            setEditingTask(null);
          }}
        >
          {editingTask ? (
            <EditTaskForm
              task={editingTask}
              goals={goals}
              onDone={() => {
                setEditingTask(null);
                reload();
              }}
            />
          ) : (
            <NewTaskForm
              sprintId={sprint.sprint_id}
              memberId={member.member_id}
              goals={goals}
              onDone={() => {
                setShowNewTask(false);
                reload();
              }}
            />
          )}
        </Drawer>
      )}

      <RecentCheckins checkins={checkins} />

      <TasksSection
        filteredTasks={filteredTasks}
        totalTaskCount={tasks.length}
        statusFilter={statusFilter}
        onStatusFilterChange={changeStatusFilter}
        pagedTasks={pagedTasks}
        goalById={goalById}
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
        onChanged={reload}
        onEdit={setEditingTask}
      />
    </div>
  );
}
