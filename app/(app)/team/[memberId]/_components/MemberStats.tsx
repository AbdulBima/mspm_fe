import { AlertTriangle, CheckCircle2, CircleDashed, Clock, Eye, ListChecks } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import type { MemberTaskStats } from "../_lib/stats";

export function MemberStats({ stats }: { stats: MemberTaskStats }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <StatCard label="Total tasks" value={stats.total} icon={ListChecks} tone="default" />
      <StatCard label="Not started" value={stats.notStarted} icon={CircleDashed} tone="default" />
      <StatCard label="In progress" value={stats.inProgress} icon={Clock} tone="signal" />
      <StatCard label="In review" value={stats.inReview} icon={Eye} tone="signal" />
      <StatCard label="Blocked" value={stats.blocked} icon={AlertTriangle} tone="danger" />
      <StatCard label="Done" value={stats.done} icon={CheckCircle2} tone="track" />
    </div>
  );
}
