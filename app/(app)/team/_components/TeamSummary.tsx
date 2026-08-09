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
    <>
      <div className="flex flex-wrap gap-3">
        <StatTile label="Active" value={total} tone="neutral" />
        <StatTile label="Blocked" value={blocked} tone="rose" />
        <StatTile label="Quiet" value={stale} tone="amber" />
      </div>

      <div className="relative max-w-xs">
        <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name or role"
          className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-300 transition-colors focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15"
        />
      </div>
    </>
  );
}
