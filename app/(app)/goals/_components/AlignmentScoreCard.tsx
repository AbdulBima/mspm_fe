import type { Alignment } from "@/lib/types";

export function AlignmentScoreCard({ alignment }: { alignment: Alignment }) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="text-xs font-medium text-ink-mute">Alignment score</p>
          <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-accent">
            {alignment.alignment_score}%
          </p>
        </div>
        <p className="max-w-xs text-sm sm:text-right leading-relaxed text-ink-mute">
          Share of logged tasks this sprint that map to a goal below.
          {alignment.unaligned_tasks.length > 0 &&
            ` ${alignment.unaligned_tasks.length} task${alignment.unaligned_tasks.length !== 1 ? "s" : ""} don't.`}
        </p>
      </div>
    </div>
  );
}
