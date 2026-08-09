"use client";

import { useSprint } from "@/lib/sprint-context";
import { ChevronDown } from "lucide-react";

export function SprintSwitcher() {
  const { sprint, sprints, selectSprint } = useSprint();

  if (!sprint) return null;

  return (
    <div className="relative">
      <select
        value={sprint.sprint_id}
        onChange={(e) => selectSprint(e.target.value)}
        className="appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-3 pr-8 questrial-regular text-xs text-zinc-700 outline-none transition-colors hover:bg-zinc-50 focus:ring-2 focus:ring-amber-500/15"
      >
        {sprints.map((s) => (
          <option key={s.sprint_id} value={s.sprint_id}>
            {s.name} · {s.status}
          </option>
        ))}
      </select>
      <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
    </div>
  );
}