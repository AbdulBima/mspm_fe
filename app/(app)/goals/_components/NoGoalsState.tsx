import { EmptyMark } from "@/components/EmptyMark";

export function NoGoalsState() {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center card p-8 sm:p-10 text-center">
      <EmptyMark borderColor="#ECEAF3" />
      <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">No goals defined</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-mute">
        Add the sprint&apos;s stated objectives so activity can be checked against them.
      </p>
    </div>
  );
}
