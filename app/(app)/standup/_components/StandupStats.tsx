import { AlertTriangle, CheckCircle2, ListChecks, Repeat } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import type { AccountabilityStats } from "../_lib/stats";

export function StandupStats({ stats }: { stats: AccountabilityStats }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard label="Commitments logged" value={stats.total} icon={ListChecks} tone="default" />
      <StatCard label="Fulfilled" value={stats.fulfilled} icon={CheckCircle2} tone="track" />
      <StatCard label="No progress" value={stats.stale} icon={AlertTriangle} tone="danger" />
      <StatCard label="Flagged repeats" value={stats.flagged} icon={Repeat} tone="signal" />
    </div>
  );
}
