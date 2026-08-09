import { EmptyMark } from "@/components/EmptyMark";

export function NoActiveSprintState() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-[#E7E5E2] bg-white p-10 text-center">
        <EmptyMark borderColor="#E7E5E2" />
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#0B0C0F]">No active sprint</h3>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#84828C]">
          Reports are compiled from an active sprint&apos;s tracker data. Create or select one to continue.
        </p>
      </div>
    </div>
  );
}
