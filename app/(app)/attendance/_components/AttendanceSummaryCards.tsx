import { StatCard } from "@/components/StatCard";

interface AttendanceCounts {
  present: number;
  late: number;
  absent: number;
  unmarked: number;
}

export function AttendanceSummaryCards({ counts }: { counts: AttendanceCounts }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Present" value={counts.present} tone="track" />
      <StatCard label="Late" value={counts.late} tone="signal" />
      <StatCard label="Absent" value={counts.absent} tone="danger" />
      <StatCard label="Not marked" value={counts.unmarked} tone="default" />
    </div>
  );
}
