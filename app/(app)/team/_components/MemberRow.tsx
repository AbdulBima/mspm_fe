import { AlertTriangle, Clock } from "lucide-react";
import type { Member } from "@/lib/types";
import { healthOf, RING_COLOR, type Rollup } from "../_lib/health";
import { AvatarRing } from "./AvatarRing";

interface MemberRowProps {
  member: Member;
  rollup?: Rollup;
  healthLoading: boolean;
  onSelect: () => void;
}

export function MemberRow({ member: m, rollup, healthLoading, onSelect }: MemberRowProps) {
  const status = healthOf(rollup);
  const pct = rollup && rollup.task_count > 0 ? rollup.done_count / rollup.task_count : 0;

  return (
    <tr
      role="link"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect();
      }}
      className="cursor-pointer border-b border-zinc-100 transition-colors last:border-0 hover:bg-amber-50/40 focus-visible:bg-amber-50/60 focus-visible:outline-none"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <AvatarRing name={m.name} color={m.color_tag} rollup={rollup} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">{m.name}</p>
            <p className="truncate text-xs text-zinc-500">{m.role_title}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        {healthLoading ? (
          <div className="h-2 w-24 animate-pulse rounded-full bg-zinc-100" />
        ) : rollup ? (
          <div className="flex items-center gap-2">
            <span className="questrial-regular whitespace-nowrap text-xs tabular-nums text-zinc-500">
              <span className="text-zinc-900">{rollup.done_count}</span>/{rollup.task_count}
            </span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, backgroundColor: RING_COLOR[status] }} />
            </div>
          </div>
        ) : (
          <span className="questrial-regular text-xs text-zinc-400">No tasks this sprint</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {rollup && rollup.blocked_count > 0 && (
            <span className="questrial-regular inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-600">
              <AlertTriangle size={10} /> {rollup.blocked_count} blocked
            </span>
          )}
          {rollup && rollup.stale_count > 0 && (
            <span className="questrial-regular inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
              <Clock size={10} /> {rollup.stale_count} quiet
            </span>
          )}
          {rollup && rollup.blocked_count === 0 && rollup.stale_count === 0 && (
            <span className="questrial-regular text-[11px] text-zinc-400">On track</span>
          )}
        </div>
      </td>
    </tr>
  );
}
