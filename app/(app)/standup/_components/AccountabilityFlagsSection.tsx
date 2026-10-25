import type { AccountabilityFlag, Member } from "@/lib/types";
import { CARD_SHADOW } from "@/lib/card-styles";
import { CustomSelect } from "@/components/CustomSelect";
import { FlagCard } from "./FlagCard";

interface AccountabilityFlagsSectionProps {
  flags: AccountabilityFlag[];
  members: Member[];
  memberFilter: string;
  onMemberFilterChange: (value: string) => void;
}

export function AccountabilityFlagsSection({
  flags,
  members,
  memberFilter,
  onMemberFilterChange,
}: AccountabilityFlagsSectionProps) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-ink">Accountability flags · {flags.length}</h2>
        <CustomSelect
          value={memberFilter}
          onChange={onMemberFilterChange}
          widthCls="w-44"
          options={[{ value: "all", label: "Everyone" }, ...members.map((m) => ({ value: m.member_id, label: m.name, color: m.color_tag }))]}
        />
      </div>

      {flags.length === 0 ? (
        <div className={`rounded-2xl border border-dashed border-line-strong bg-white p-6 text-center ${CARD_SHADOW}`}>
          <p className="text-sm font-bold text-ink">No repeated commitments without progress</p>
          <p className="mt-1 text-xs text-ink-mute">Nothing&apos;s been promised twice and stalled. Nice.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {flags.map((f) => (
            <FlagCard key={`${f.member_id}-${f.task_id}`} flag={f} />
          ))}
        </div>
      )}
    </div>
  );
}
