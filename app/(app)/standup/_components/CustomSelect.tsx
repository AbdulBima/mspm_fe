"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectOption {
  value: string;
  label: string;
  color?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  widthCls?: string;
  variant?: "filter" | "field";
}

/**
 * A styled dropdown with click-outside + Escape handling. This is a
 * different implementation from the notes page's CustomSelect — that one
 * uses Tailwind hover: classes and supports a subLabel; this one tracks
 * hover state in JS and uses inline styles throughout, and has no subLabel
 * concept. Both solve the same problem but diverged enough in approach
 * that merging them isn't a mechanical rename — it's a real design
 * decision (which hover approach wins, whether to add subLabel here)
 * worth doing deliberately as a follow-up, not silently folded into this
 * restructuring pass.
 */
export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  widthCls = "w-full",
  variant = "filter",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const selected = options.find((o) => o.value === value);
  const isField = variant === "field";

  return (
    <div ref={ref} className={`relative ${widthCls}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 border transition-colors focus:outline-none focus:ring-2 ${
          isField ? "rounded-xl px-3.5 py-2.5 text-sm" : "rounded-full py-2 pl-3.5 pr-3 text-xs font-medium"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E7E5E2",
          color: selected ? (isField ? "#0B0C0F" : "#54525C") : "#B4B2AC",
        }}
      >
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          {selected?.color && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />}
          <span className="truncate">{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown
          size={isField ? 14 : 12}
          color="#84828C"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 z-20 mt-1.5 max-h-64 min-w-full overflow-y-auto rounded-xl border p-1.5 shadow-[0_4px_8px_rgba(11,12,15,0.06),0_20px_36px_-12px_rgba(11,12,15,0.18)]"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E7E5E2" }}
        >
          {options.map((o) => {
            const isSelected = o.value === value;
            const isHovered = hoveredValue === o.value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setHoveredValue(o.value)}
                onMouseLeave={() => setHoveredValue(null)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                style={{
                  backgroundColor: isSelected ? "rgba(29,43,100,0.08)" : isHovered ? "#FAFAF9" : "#FFFFFF",
                  color: isSelected ? "#1D2B64" : "#0B0C0F",
                }}
              >
                {o.color && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: o.color }} />}
                <span className="min-w-0 flex-1 truncate">{o.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
