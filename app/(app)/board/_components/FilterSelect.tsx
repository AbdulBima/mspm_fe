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
    <div className="group relative flex min-w-0 items-center">
      <Icon
        size={13}
        className={`pointer-events-none absolute left-3 transition-colors ${
          active ? "text-accent" : "text-ink-mute group-focus-within:text-accent"
        }`}
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none truncate bg-transparent py-2.5 pr-8 pl-8 text-xs font-semibold outline-none transition-colors hover:bg-subtle focus:bg-subtle sm:max-w-[13rem] ${
          active ? "text-ink" : "text-ink-soft"
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
          className="absolute right-2 flex h-4 w-4 items-center justify-center rounded text-ink-mute transition-colors hover:bg-line hover:text-ink-soft"
        >
          <X size={11} />
        </button>
      ) : (
        <ChevronDown size={12} className="pointer-events-none absolute right-2.5 text-ink-mute" />
      )}
    </div>
  );
}
