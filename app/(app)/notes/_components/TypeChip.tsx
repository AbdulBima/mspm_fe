import { hexToRgba } from "@/lib/color";

interface TypeChipProps {
  active: boolean;
  label: string;
  count: number;
  color: string;
  bg: string;
  onClick: () => void;
}

export function TypeChip({ active, label, count, color, bg, onClick }: TypeChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200"
      style={
        active
          ? { color, backgroundColor: bg, borderColor: hexToRgba(color, 0.25) }
          : { color: "#75728A", backgroundColor: "#FFFFFF", borderColor: "#ECEAF3" }
      }
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: active ? color : "#DCD8E8" }} />
      {label}
      <span
        className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
        style={
          active ? { backgroundColor: hexToRgba(color, 0.14), color } : { backgroundColor: "#F0EEF6", color: "#75728A" }
        }
      >
        {count}
      </span>
    </button>
  );
}
