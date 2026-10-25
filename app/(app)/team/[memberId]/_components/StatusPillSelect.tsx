import { ChevronDown } from "lucide-react";
import type { TaskStatus } from "@/lib/types";
import { STATUS_META, STATUS_OPTIONS } from "../_lib/constants";

interface StatusPillSelectProps {
  status: TaskStatus;
  busy: boolean;
  onChange: (status: TaskStatus) => void;
}

export function StatusPillSelect({ status, busy, onChange }: StatusPillSelectProps) {
  const s = STATUS_META[status];
  return (
    <div className="relative inline-flex">
      <select
        value={status}
        disabled={busy}
        onChange={(e) => onChange(e.target.value as TaskStatus)}
        className="peer cursor-pointer appearance-none rounded-full border-0 py-1.5 pl-3 pr-7 text-[11px] font-semibold outline-none transition-opacity hover:opacity-80 focus:ring-2 focus:ring-black/10 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ color: s.color, backgroundColor: s.bg }}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {STATUS_META[opt].label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={11}
        style={{ color: s.color }}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 peer-disabled:opacity-40"
      />
    </div>
  );
}
