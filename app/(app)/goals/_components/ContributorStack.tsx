import type { Contributor } from "../_lib/types";
import { firstInitial } from "../_lib/first-initial";

export function ContributorStack({ contributors }: { contributors: Contributor[] }) {
  if (contributors.length === 0) {
    return <span className="text-[13px] text-[#B4B2AC]">No one yet</span>;
  }

  const shown = contributors.slice(0, 4);
  const extra = contributors.length - shown.length;

  return (
    <div className="flex items-center -space-x-2">
      {shown.map(({ member }) => (
        <div
          key={member.member_id}
          title={member.name}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-semibold text-[#0B0C0F]"
          style={{ backgroundColor: member.color_tag }}
        >
          {firstInitial(member.name)}
        </div>
      ))}
      {extra > 0 && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#EEEDEB] text-[10px] font-medium text-[#54525C]">
          +{extra}
        </div>
      )}
    </div>
  );
}
