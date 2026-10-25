import { Search } from "lucide-react";
import { StatTile } from "./StatTile";

interface TeamSummaryProps {
  total: number;
  blocked: number;
  stale: number;
  query: string;
  onQueryChange: (q: string) => void;
}

export function TeamSummary({ total, blocked, stale, query, onQueryChange }: TeamSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="Active" value={total} tone="neutral" />
        <StatTile label="Blocked" value={blocked} tone="rose" />
        <StatTile label="Quiet" value={stale} tone="amber" />
      </div>
      <div className="relative sm:max-w-xs">
        <Search size={15} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name or role"
          className="w-full rounded-xl border border-line-strong bg-white py-2.5 pr-4 pl-10 text-sm text-ink placeholder:text-ink-faint transition-all focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none"
        />
      </div>
    </div>
  );
}
