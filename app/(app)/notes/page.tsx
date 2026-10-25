"use client";

import { useMemo, useState } from "react";
import { PageLoader } from "@/components/PageLoader";
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
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  const filtered = typeFilter !== "all" || memberFilter !== "all";
  const totalCount = countsSource.length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <NotesHeader disabled={tasks.length === 0} onAddNote={() => setShowAdd(true)} />

      {showAdd && (
        <Drawer eyebrow="Notes" title="Add note" maxWidthCls="max-w-xl" onClose={() => setShowAdd(false)}>
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
        <PageLoader label="Loading notes" />
      ) : notes.length === 0 ? (
        <NotesEmptyState filtered={filtered} />
      ) : (
        <NotesList notes={pagedNotes} page={safePage} totalPages={totalPages} onDelete={removeNote} onPageChange={setPage} />
      )}
    </div>
  );
}
