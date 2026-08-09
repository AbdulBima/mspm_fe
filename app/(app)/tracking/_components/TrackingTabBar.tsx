import { TABS, type Tab } from "../_lib/constants";

interface TrackingTabBarProps {
  tab: Tab;
  onChange: (tab: Tab) => void;
}

export function TrackingTabBar({ tab, onChange }: TrackingTabBarProps) {
  return (
    <div className="flex w-fit gap-1 rounded-lg border border-[#E7E5E2] bg-[#FAFAF9] p-1">
      {TABS.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
            tab === t ? "bg-white text-[#0B0C0F] shadow-sm" : "text-[#84828C] hover:text-[#0B0C0F]"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
