"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBlobDownload } from "@/hooks/useBlobDownload";
import { api } from "@/lib/api";
import { useSprint } from "@/lib/sprint-context";
import type { Discipline, Member } from "@/lib/types";

import { AddMemberDrawer } from "./_components/AddMemberDrawer";
import { MembersTable } from "./_components/MembersTable";
import { NoMatches } from "./_components/NoMatches";
import { SkeletonTable } from "./_components/SkeletonTable";
import { TeamEmptyState } from "./_components/TeamEmptyState";
import { TeamHeader } from "./_components/TeamHeader";
import { TeamSummary } from "./_components/TeamSummary";

import { useSprintHealth } from "./_hooks/useSprintHealth";
import { useTeamMembers } from "./_hooks/useTeamMembers";
import { DISCIPLINE_ORDER } from "./_lib/constants";
import type { Rollup } from "./_lib/health";

export default function TeamPage() {
  const router = useRouter();
  const { sprint } = useSprint();
  const { members, loading: membersLoading, refresh } = useTeamMembers();
  const { health, loading: healthLoading } = useSprintHealth(sprint?.sprint_id);
  const { downloading: downloadingReview, download } = useBlobDownload();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const rollupByMember = useMemo(() => {
    const map = new Map<string, Rollup>();
    health?.per_member.forEach((m) => map.set(m.member_id, m));
    return map;
  }, [health]);

  const activeMembers = useMemo(() => members.filter((m) => m.active), [members]);

  const summary = useMemo(() => {
    let blocked = 0;
    let stale = 0;
    health?.per_member.forEach((m) => {
      blocked += m.blocked_count;
      stale += m.stale_count;
    });
    return { total: activeMembers.length, blocked, stale };
  }, [activeMembers, health]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const groups: Record<string, Member[]> = {};
    for (const m of activeMembers) {
      if (q && !m.name.toLowerCase().includes(q) && !m.role_title.toLowerCase().includes(q)) continue;
      (groups[m.discipline] ||= []).push(m);
    }
    return DISCIPLINE_ORDER.filter((d) => groups[d]?.length).map((d) => [d, groups[d]] as [Discipline, Member[]]);
  }, [activeMembers, query]);

  function goToMember(id: string) {
    router.push(`/team/${id}`);
  }

  function downloadInReviewPdf() {
    if (!sprint) return;
    download(() => api.tasks.downloadInReviewPdf(sprint.sprint_id), `in-review-${sprint.name.replace(/\s+/g, "-")}.pdf`);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <TeamHeader
        downloadingReview={downloadingReview}
        exportDisabled={!sprint}
        onExport={downloadInReviewPdf}
        onAddMember={() => setShowForm(true)}
      />

      {!membersLoading && members.length > 0 && (
        <TeamSummary total={summary.total} blocked={summary.blocked} stale={summary.stale} query={query} onQueryChange={setQuery} />
      )}

      {showForm && (
        <AddMemberDrawer
          onClose={() => setShowForm(false)}
          onDone={() => {
            setShowForm(false);
            refresh();
          }}
        />
      )}

      {membersLoading ? (
        <SkeletonTable />
      ) : members.length === 0 ? (
        <TeamEmptyState />
      ) : grouped.length === 0 ? (
        <NoMatches query={query} />
      ) : (
        <MembersTable grouped={grouped} rollupByMember={rollupByMember} healthLoading={healthLoading} onSelectMember={goToMember} />
      )}
    </div>
  );
}
