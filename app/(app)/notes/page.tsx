"use client";

import { useMemo, useState } from "react";
import { Drawer } from "@/components/Drawer";
import { useSprint } from "@/lib/sprint-context";
import type { NoteType } from "@/lib/types";

import { AddNoteForm } from "./_components/AddNoteForm";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";
import { NotesEmptyState } from "./_components/NotesEmptyState";
import { NotesHeader } from "./_components/NotesHeader";
import { NotesList } from "./_components/NotesList";
import { NoteTypeFilterBar } from "./_components/NoteTypeFilterBar";

import { useNotesData } from "./_hooks/useNotesData";
import { PAGE_SIZE } from "./_lib/constants";
import { paginate } from "@/lib/pagination";

export default function NotesPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const [typeFilter, setTypeFilter] = useState<NoteType | "all">("all");
  const [memberFilter, setMemberFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);

  const { notes, countsSource, tasks, members, loading, reload, removeNote } = useNotesData(
    sprint?.sprint_id,
    typeFilter,
    memberFilter
  );

  const countsByType = useMemo(() => {
    const counts: Record<NoteType, number> = { update: 0, blocker: 0, question: 0, decision: 0, praise: 0 };
    for (const n of countsSource) {
      if (n.note_type in counts) counts[n.note_type as NoteType] += 1;
    }
    return counts;
  }, [countsSource]);

  const { totalPages, safePage, pageItems: pagedNotes } = useMemo(
    () => paginate(notes, page, PAGE_SIZE),
    [notes, page]
  );

  function changeTypeFilter(value: NoteType | "all") {
    setTypeFilter(value);
    setPage(1);
  }

  function changeMemberFilter(value: string) {
    setMemberFilter(value);
    setPage(1);
  }

  if (sprintLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading</p>
      </div>
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  const filtered = typeFilter !== "all" || memberFilter !== "all";
  const totalCount = countsSource.length;

  return (
    <div className="max-w-5xl mx-auto space-y-7 p-6 md:p-8">
      <NotesHeader disabled={tasks.length === 0} onAddNote={() => setShowAdd(true)} />

      {showAdd && (
        <Drawer title="Add Note" maxWidthCls="max-w-xl" onClose={() => setShowAdd(false)}>
          <AddNoteForm
            tasks={tasks}
            members={members}
            onDone={() => {
              setShowAdd(false);
              reload();
            }}
          />
        </Drawer>
      )}

      <NoteTypeFilterBar
        typeFilter={typeFilter}
        memberFilter={memberFilter}
        totalCount={totalCount}
        countsByType={countsByType}
        members={members}
        onTypeFilterChange={changeTypeFilter}
        onMemberFilterChange={changeMemberFilter}
      />

      {loading ? (
        <div className="flex items-center gap-2.5 justify-center py-10">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
          <p className="text-xs text-[#84828C]">Loading</p>
        </div>
      ) : notes.length === 0 ? (
        <NotesEmptyState filtered={filtered} />
      ) : (
        <NotesList notes={pagedNotes} page={safePage} totalPages={totalPages} onDelete={removeNote} onPageChange={setPage} />
      )}
    </div>
  );
}
