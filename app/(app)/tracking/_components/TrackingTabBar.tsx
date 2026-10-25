import { TABS, type Tab } from "../_lib/constants";

interface TrackingTabBarProps {
  tab: Tab;
  onChange: (tab: Tab) => void;
}

export function TrackingTabBar({ tab, onChange }: TrackingTabBarProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div role="tablist" className="flex w-max gap-1 rounded-2xl border border-line bg-white p-1 shadow-card">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => onChange(t)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
              tab === t ? "bg-brand text-white shadow-sm" : "text-ink-mute hover:bg-subtle hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
