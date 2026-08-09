"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectOption {
  value: string;
  label: string;
  subLabel?: string;
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
 * A styled dropdown with its own open/close, click-outside, and Escape
 * handling — used here for both the member filter (compact "filter"
 * variant) and the task picker in AddNoteForm (roomier "field" variant,
 * with colored dots and sub-labels). Native <select> elsewhere in the app
 * (Board, Attendance) covers simpler cases that don't need that.
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

  const triggerCls =
    variant === "field"
      ? "flex w-full items-center justify-between gap-2 rounded-xl border border-[#E7E5E2] bg-white px-3.5 py-2.5 text-sm text-[#0B0C0F] transition-colors hover:border-[#D4D2CC] focus:outline-none focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
      : "flex w-full items-center justify-between gap-2 rounded-full border border-[#E7E5E2] bg-white py-2 pl-3.5 pr-3 text-xs font-medium text-[#54525C] transition-colors hover:border-[#D4D2CC] focus:outline-none focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10";

  return (
    <div ref={ref} className={`relative ${widthCls}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={triggerCls}>
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          {selected?.color && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
          )}
          <span className={`truncate ${!selected ? "text-[#B4B2AC]" : ""}`}>{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown
          size={variant === "field" ? 14 : 12}
          className={`shrink-0 text-[#84828C] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1.5 max-h-64 min-w-full overflow-y-auto rounded-xl border border-[#E7E5E2] bg-white p-1.5 shadow-[0_4px_8px_rgba(11,12,15,0.06),0_20px_36px_-12px_rgba(11,12,15,0.18)]">
          {options.map((o) => {
            const isSelected = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isSelected ? "bg-[#1D2B64]/8 text-[#1D2B64]" : "text-[#0B0C0F] hover:bg-[#FAFAF9]"
                }`}
              >
                {o.color && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: o.color }} />}
                <span className="min-w-0 flex-1 truncate">
                  <span className={isSelected ? "font-medium" : ""}>{o.label}</span>
                  {o.subLabel && <span className="ml-1.5 text-[#84828C]">— {o.subLabel}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
