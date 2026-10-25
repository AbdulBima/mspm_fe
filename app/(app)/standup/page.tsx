"use client";

import { useMemo, useState } from "react";
import { PageLoader } from "@/components/PageLoader";
import { Drawer } from "@/components/Drawer";
import { paginate } from "@/lib/pagination";
import { useSprint } from "@/lib/sprint-context";

import { AccountabilityFlagsSection } from "./_components/AccountabilityFlagsSection";
import { CommitmentLogSection } from "./_components/CommitmentLogSection";
import { DaySummaryCard } from "./_components/DaySummaryCard";
import { LogCommitmentForm } from "./_components/LogCommitmentForm";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";
import { StandupHeader } from "./_components/StandupHeader";
import { StandupStats } from "./_components/StandupStats";

import { useStandupData } from "./_hooks/useStandupData";
import { PAGE_SIZE } from "./_lib/constants";
import { computeAccountabilityStats } from "./_lib/stats";

export default function StandupPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const { entries, flags, members, tasks, loading, reload } = useStandupData(sprint?.sprint_id);
  const [memberFilter, setMemberFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showLog, setShowLog] = useState(false);

  const filteredEntries = useMemo(
    () => (memberFilter === "all" ? entries : entries.filter((e) => e.member_id === memberFilter)),
    [entries, memberFilter]
  );
  const filteredFlags = useMemo(
    () => (memberFilter === "all" ? flags : flags.filter((f) => f.member_id === memberFilter)),
    [flags, memberFilter]
  );

  function changeMemberFilter(v: string) {
    setMemberFilter(v);
    setPage(1);
  }

  const stats = useMemo(() => computeAccountabilityStats(entries, flags), [entries, flags]);

  const { totalPages, safePage, pageItems: pagedEntries } = useMemo(
    () => paginate(filteredEntries, page, PAGE_SIZE),
    [filteredEntries, page]
  );

  if (sprintLoading) {
    return (
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <StandupHeader disabled={members.length === 0} onLogCommitment={() => setShowLog(true)} />

      {showLog && (
        <Drawer eyebrow="Standup" title="Log commitment" maxWidthCls="max-w-xl" onClose={() => setShowLog(false)}>
          <LogCommitmentForm
            sprintId={sprint.sprint_id}
            members={members}
            tasks={tasks}
            entries={entries}
            onDone={() => {
              setShowLog(false);
              reload();
            }}
          />
        </Drawer>
      )}

      <StandupStats stats={stats} />

      <DaySummaryCard sprintId={sprint.sprint_id} />

      {loading ? (
        <PageLoader label="Loading commitments" />
      ) : (
        <>
          <AccountabilityFlagsSection
            flags={filteredFlags}
            members={members}
            memberFilter={memberFilter}
            onMemberFilterChange={changeMemberFilter}
          />

          <CommitmentLogSection
            filteredCount={filteredEntries.length}
            pagedEntries={pagedEntries}
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
