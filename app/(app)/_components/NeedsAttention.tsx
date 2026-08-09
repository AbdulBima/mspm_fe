import { useMemo } from "react";
import type { SprintHealth } from "@/lib/types";
import { TAG_STYLE } from "../_lib/constants";
import { buildNeedsAttentionList } from "../_lib/needs-attention";

export function NeedsAttention({ health }: { health: SprintHealth }) {
  const items = useMemo(() => buildNeedsAttentionList(health), [health]);

  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <p className="text-xs font-medium text-[#1D2B64] mb-1">Focus</p>
          <h3 className="text-sm font-semibold tracking-tight text-[#0B0C0F]">Needs attention</h3>
        </div>
        <span className="text-[11px] tabular-nums text-[#B4B2AC]">
          {items.length} task{items.length === 1 ? "" : "s"}
        </span>
      </div>
      {items.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[#E7E5E2]">
          <p className="text-xs text-[#B4B2AC]">Nothing blocked, stale, overdue, or waiting on review.</p>
        </div>
      ) : (
        <ul className="divide-y divide-[#EEEDEB]">
          {items.slice(0, 8).map((it) => (
            <li key={it.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="truncate text-xs text-[#54525C]">{it.title}</span>
              <div className="flex shrink-0 gap-1.5">
                {it.tags.map((tag) => (
                  <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TAG_STYLE[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      {items.length > 8 && <p className="mt-3 text-right text-[11px] text-[#B4B2AC]">+{items.length - 8} more</p>}
    </div>
  );
}
