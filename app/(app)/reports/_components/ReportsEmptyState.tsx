export function ReportsEmptyState() {
  return (
    <div className="card flex min-h-85 flex-col items-center justify-center p-8 sm:p-10 text-center">
      <svg width="112" height="52" viewBox="0 0 112 52" fill="none" className="mb-5">
        <rect x="3" y="28" width="14" height="21" rx="3" stroke="#ECEAF3" strokeWidth="1.5" />
        <rect x="29" y="17" width="14" height="32" rx="3" stroke="#ECEAF3" strokeWidth="1.5" />
        <rect x="55" y="7" width="14" height="42" rx="3" stroke="#ECEAF3" strokeWidth="1.5" />
        <rect x="81" y="2" width="14" height="47" rx="3" fill="#6F01D0" />
      </svg>
      <h3 className="text-lg font-bold tracking-tight text-ink">No reports yet</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-mute">
        Generate your first one from the panel on the left.
      </p>
    </div>
  );
}
