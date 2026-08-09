import type { TaskNoteWithContext } from "@/lib/types";
import { PaginationControls } from "@/components/PaginationControls";
import { NoteRow } from "./NoteRow";

interface NotesListProps {
  notes: TaskNoteWithContext[];
  page: number;
  totalPages: number;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

export function NotesList({ notes, page, totalPages, onDelete, onPageChange }: NotesListProps) {
  return (
    <>
      <div className="space-y-3">
        {notes.map((n) => (
          <NoteRow key={n.note_id} note={n} onDelete={onDelete} />
        ))}
      </div>

      {totalPages > 1 && <PaginationControls page={page} totalPages={totalPages} onPageChange={onPageChange} />}
    </>
  );
}
