import type { AttendanceStatus } from "@/lib/types";
import { STATUS_META, STATUS_ORDER } from "../_lib/constants";

interface StatusButtonGroupProps {
  activeStatus: AttendanceStatus | null | undefined;
  onSelect: (status: AttendanceStatus) => void;
}

export function StatusButtonGroup({ activeStatus, onSelect }: StatusButtonGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {STATUS_ORDER.map((s) => {
        const meta = STATUS_META[s];
        const Icon = meta.icon;
        const active = activeStatus === s;
        return (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition-colors"
            style={
              active
                ? { color: meta.color, backgroundColor: meta.bg, borderColor: meta.color }
                : { color: "#A8A5BA", backgroundColor: "transparent", borderColor: "#ECEAF3" }
            }
          >
            <Icon size={11} />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
