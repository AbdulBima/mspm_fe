import { EmptyMark } from "@/components/EmptyMark";

export function NoGoalsState() {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center rounded-xl border border-[#E7E5E2] bg-white p-10 text-center">
      <EmptyMark borderColor="#E7E5E2" />
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#0B0C0F]">No goals defined</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#84828C]">
        Add the sprint&apos;s stated objectives so activity can be checked against them.
      </p>
    </div>
  );
}
