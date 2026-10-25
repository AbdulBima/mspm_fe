import Link from "next/link";
import { initials } from "@/lib/initials";
import { Trash2 } from "lucide-react";
import type { NoteType, TaskNoteWithContext } from "@/lib/types";
import { formatDateTime } from "@/lib/sprint-utils";
import { CARD_SHADOW } from "@/lib/card-styles";
import { hexToRgba } from "@/lib/color";
import { CARD_SHADOW_HOVER, NOTE_TYPE_META } from "../_lib/constants";

interface NoteRowProps {
  note: TaskNoteWithContext;
  onDelete: (id: string) => void;
}

export function NoteRow({ note, onDelete }: NoteRowProps) {
  const meta = NOTE_TYPE_META[note.note_type as NoteType];
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-line bg-white p-5 pl-6 transition-all duration-200 hover:-translate-y-0.5 ${CARD_SHADOW} ${CARD_SHADOW_HOVER}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${hexToRgba(meta.color, 0.05)}, transparent 12%)`,
      }}
    >
      <span className="absolute left-0 top-0 h-full w-0.75" style={{ backgroundColor: meta.color }} />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ color: meta.color, backgroundColor: meta.bg }}
          >
            {meta.label}
          </span>

          {note.member_id ? (
            <Link href={`/team/${note.member_id}`} className="flex items-center gap-1.5 group/member">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-brand"
                style={{ backgroundColor: note.member_color ?? "#ECEAF3" }}
              >
                {initials(note.member_name)}
              </span>
              <span className="text-xs font-medium text-ink-soft transition-colors group-hover/member:text-accent">
                {note.member_name}
              </span>
            </Link>
          ) : (
            <span className="text-xs font-medium text-ink-mute">{note.member_name}</span>
          )}
          <span className="truncate text-xs text-ink-faint">· {note.task_title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-ink-faint">{formatDateTime(note.created_at)}</span>
          <button
            onClick={() => onDelete(note.note_id)}
            aria-label="Delete note"
            className="rounded-lg p-1.5 text-ink-faint transition-colors lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 hover:bg-[#FBEAE8] hover:text-[#B42318]"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-ink">{note.content}</p>
      {note.author && <p className="mt-2 text-[11px] text-ink-faint">— {note.author}</p>}
    </div>
  );
}
