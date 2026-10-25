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
      ? "flex w-full items-center justify-between gap-2 rounded-xl border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink transition-colors hover:border-line-strong focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
      : "flex w-full items-center justify-between gap-2 rounded-xl border border-line-strong bg-white py-2 pl-3.5 pr-3 text-xs font-medium text-ink-soft transition-colors hover:border-line-strong focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10";

  return (
    <div ref={ref} className={`relative ${widthCls}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={triggerCls}>
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          {selected?.color && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
          )}
          <span className={`truncate ${!selected ? "text-ink-faint" : ""}`}>{selected ? selected.label : placeholder}</span>
        </span>
        <ChevronDown
          size={variant === "field" ? 14 : 12}
          className={`shrink-0 text-ink-mute transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1.5 max-h-64 min-w-full overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_4px_8px_rgba(22,18,46,0.06),0_20px_36px_-12px_rgba(22,18,46,0.18)]">
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
                  isSelected ? "bg-accent-soft text-accent" : "text-ink hover:bg-subtle"
                }`}
              >
                {o.color && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: o.color }} />}
                <span className="min-w-0 flex-1 truncate">
                  <span className={isSelected ? "font-medium" : ""}>{o.label}</span>
                  {o.subLabel && <span className="ml-1.5 text-ink-mute">— {o.subLabel}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
