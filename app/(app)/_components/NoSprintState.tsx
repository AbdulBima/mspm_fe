import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EmptyMark } from "@/components/EmptyMark";

export function NoSprintState() {
  return (
    <div className="flex min-h-105 flex-col items-center justify-center rounded-xl border border-[#E7E5E2] bg-white p-10 text-center">
      <EmptyMark borderColor="#E7E5E2" size={48} />
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#0B0C0F]">No sprint yet</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#84828C]">
        Create your first sprint to start tracking goals, tasks, and daily health.
      </p>
      <Link
        href="/sprints"
        className="group mt-7 inline-flex items-center gap-1.5 rounded-lg bg-[#0B0C0F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2B64]"
      >
        Set up a sprint
        <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
