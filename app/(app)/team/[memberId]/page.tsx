"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, UserX } from "lucide-react";
import { Drawer } from "@/components/Drawer";
import { NewTaskForm } from "@/components/NewTaskForm";
import { useBlobDownload } from "@/hooks/useBlobDownload";
import { api } from "@/lib/api";
import { paginate } from "@/lib/pagination";
import { useSprint } from "@/lib/sprint-context";
import type { Task, TaskStatus } from "@/lib/types";

import { PageLoader } from "@/components/PageLoader";
import { EmptyState } from "@/components/EmptyState";
import { AccessPanel } from "./_components/AccessPanel";
import { EditTaskForm } from "./_components/EditTaskForm";
import { MemberReports } from "./_components/MemberReports";
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
  const { sprint, loading: sprintLoading } = useSprint();
  const { member, tasks, checkins, goals, loading, error, reload } = useMemberDashboard(memberId, sprint?.sprint_id);
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

  if (!sprintLoading && !sprint) {
    return (
      <div className="space-y-6">
        <Link href="/team" className="inline-flex items-center gap-1 text-xs font-semibold text-ink-mute transition-colors hover:text-accent">
          <ChevronLeft size={14} /> Back to team
        </Link>
        <EmptyState
          icon={UserX}
          title="No sprint yet"
          description="Create a sprint to assign and track this member's tasks."
          action={
            <Link href="/sprints" className="btn-primary">
              Go to sprints
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <AccessPanel memberId={memberId} />
          <MemberReports memberId={memberId} />
        </div>
      </div>
    );
  }

  if (error && !member) {
    return (
      <EmptyState
        icon={UserX}
        title="Couldn't open this member"
        description={error}
        action={
          <Link href="/team" className="btn-secondary">
            Back to team
          </Link>
        }
      />
    );
  }

  if (!sprint || loading || !member) return <PageLoader label="Loading team member" />;

  return (
    <div className="space-y-6">
      <Link href="/team" className="inline-flex items-center gap-1 text-xs font-semibold text-ink-mute transition-colors hover:text-accent">
        <ChevronLeft size={14} /> Back to team
      </Link>

      <MemberHeader member={member} downloading={downloadingPdf} onDownload={downloadOpenTasksPdf} onNewTask={() => setShowNewTask(true)} />

      <MemberStats stats={stats} />

      {(showNewTask || editingTask) && (
        <Drawer
          eyebrow={member.name}
          title={editingTask ? "Edit task" : "New task"}
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
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
          <RecentCheckins checkins={checkins} />
        </div>
        <div className="space-y-6">
          <AccessPanel memberId={member.member_id} />
          <MemberReports memberId={member.member_id} />
        </div>
      </div>
    </div>
  );
}
