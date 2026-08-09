import type { ComponentType } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterSelectProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

export function FilterSelect({ icon: Icon, value, onChange, placeholder, options }: FilterSelectProps) {
  const active = value !== "";
  return (
    <div className="group relative flex items-center first:rounded-l-lg last:rounded-r-lg">
      <Icon
        size={13}
        className={`pointer-events-none absolute left-3 transition-colors ${
          active ? "text-[#1D2B64]" : "text-[#84828C] group-focus-within:text-[#1D2B64]"
        }`}
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none bg-transparent py-2.5 pl-8 pr-8 text-xs font-medium outline-none transition-colors first:rounded-l-lg last:rounded-r-lg hover:bg-[#F3F2EF] focus:bg-[#F3F2EF] ${
          active ? "text-[#0B0C0F]" : "text-[#54525C]"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {active ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={`Clear ${placeholder.toLowerCase()}`}
          className="absolute right-2 flex h-4 w-4 items-center justify-center rounded text-[#84828C] transition-colors hover:bg-[#EEEDEB] hover:text-[#54525C]"
        >
          <X size={11} />
        </button>
      ) : (
        <ChevronDown size={12} className="pointer-events-none absolute right-2.5 text-[#84828C]" />
      )}
    </div>
  );
}
