import type { Alignment } from "@/lib/types";

export function AlignmentScoreCard({ alignment }: { alignment: Alignment }) {
  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-xs font-medium text-[#84828C]">Alignment score</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-[#0B0C0F]">
            {alignment.alignment_score}%
          </p>
        </div>
        <p className="max-w-xs text-right text-sm leading-relaxed text-[#84828C]">
          Share of logged tasks this sprint that map to a goal below.
          {alignment.unaligned_tasks.length > 0 &&
            ` ${alignment.unaligned_tasks.length} task${alignment.unaligned_tasks.length !== 1 ? "s" : ""} don't.`}
        </p>
      </div>
    </div>
  );
}
