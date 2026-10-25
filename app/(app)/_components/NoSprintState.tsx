import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EmptyMark } from "@/components/EmptyMark";

export function NoSprintState() {
  return (
    <div className="card flex min-h-105 flex-col items-center justify-center p-8 text-center sm:p-10">
      <EmptyMark borderColor="#ECEAF3" size={48} />
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">No sprint yet</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-mute">
        Create your first sprint to start tracking goals, tasks, and daily health.
      </p>
      <Link
        href="/sprints"
        className="btn-primary group mt-7"
      >
        Set up a sprint
        <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
