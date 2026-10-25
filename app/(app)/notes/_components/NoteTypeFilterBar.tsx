import type { Member, NoteType } from "@/lib/types";
import { NOTE_TYPE_META, NOTE_TYPE_OPTIONS } from "../_lib/constants";
import { CustomSelect } from "@/components/CustomSelect";
import { TypeChip } from "./TypeChip";

interface NoteTypeFilterBarProps {
  typeFilter: NoteType | "all";
  memberFilter: string;
  totalCount: number;
  countsByType: Record<NoteType, number>;
  members: Member[];
  onTypeFilterChange: (value: NoteType | "all") => void;
  onMemberFilterChange: (value: string) => void;
}

export function NoteTypeFilterBar({
  typeFilter,
  memberFilter,
  totalCount,
  countsByType,
  members,
  onTypeFilterChange,
  onMemberFilterChange,
}: NoteTypeFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TypeChip
        active={typeFilter === "all"}
        label="All"
        count={totalCount}
        color="#16122E"
        bg="#ECEAF3"
        onClick={() => onTypeFilterChange("all")}
      />
      {NOTE_TYPE_OPTIONS.map((t) => (
        <TypeChip
          key={t}
          active={typeFilter === t}
          label={NOTE_TYPE_META[t].label}
          count={countsByType[t]}
          color={NOTE_TYPE_META[t].color}
          bg={NOTE_TYPE_META[t].bg}
          onClick={() => onTypeFilterChange(t)}
        />
      ))}

      <div className="w-full sm:ml-auto sm:w-auto">
        <CustomSelect
          value={memberFilter}
          onChange={onMemberFilterChange}
          widthCls="w-full sm:w-48"
          options={[
            { value: "all", label: "Everyone" },
            ...members.map((m) => ({ value: m.member_id, label: m.name, color: m.color_tag })),
          ]}
        />
      </div>
    </div>
  );
}
