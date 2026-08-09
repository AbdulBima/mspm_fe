import type { AccountabilityFlag, Member } from "@/lib/types";
import { CARD_SHADOW } from "@/lib/card-styles";
import { CustomSelect } from "./CustomSelect";
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
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-medium text-[#84828C]">Accountability flags · {flags.length}</h2>
        <CustomSelect
          value={memberFilter}
          onChange={onMemberFilterChange}
          widthCls="w-44"
          options={[{ value: "all", label: "Everyone" }, ...members.map((m) => ({ value: m.member_id, label: m.name, color: m.color_tag }))]}
        />
      </div>

      {flags.length === 0 ? (
        <div className={`rounded-2xl border border-dashed border-[#E7E5E2] bg-white p-6 text-center ${CARD_SHADOW}`}>
          <p className="text-sm font-medium text-[#0B0C0F]">No repeated commitments without progress</p>
          <p className="mt-1 text-xs text-[#84828C]">Nothing&apos;s been promised twice and stalled. Nice.</p>
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
