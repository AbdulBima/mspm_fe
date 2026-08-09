import { EmptyMark } from "@/components/EmptyMark";

export function NoActiveSprintState() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <div className="flex min-h-70 flex-col items-center justify-center rounded-xl border border-[#DEDCD8] bg-white p-10 text-center">
        <EmptyMark borderColor="#DEDCD8" />
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#0B0C0F]">No active sprint</h3>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#84828C]">
          The board follows an active sprint&apos;s tasks. Create or select one to continue.
        </p>
      </div>
    </div>
  );
}
