export function TasksEmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-line-strong bg-white p-6 text-center">
      <div className="flex flex-col items-center">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="mb-3">
          <circle cx="18" cy="18" r="17" stroke="#ECEAF3" strokeWidth="1.5" />
          <path d="M11.5 18.5 L15.5 22.5 L24.5 12.5" stroke="#6F01D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm font-medium text-ink">{filtered ? "No tasks match this filter" : "Nothing open"}</p>
        <p className="mt-1 text-xs text-ink-mute">
          {filtered ? "Try a different status, or clear the filter." : "All caught up, or nothing assigned yet this sprint."}
        </p>
      </div>
    </div>
  );
}
