import Link from "next/link";
import { EmptyMark } from "@/components/EmptyMark";

export function NoActiveSprintState() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-[#E7E5E2] bg-white p-10 text-center">
        <EmptyMark borderColor="#E7E5E2" />
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#0B0C0F]">No active sprint</h3>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#84828C]">
          Tracking follows whichever sprint is active. Create or select one to start logging check-ins and risks.
        </p>
        <Link
          href="/sprints"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-[#0B0C0F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64]"
        >
          Go to sprints
        </Link>
      </div>
    </div>
  );
}
