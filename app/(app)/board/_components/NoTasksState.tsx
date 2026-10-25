export function NoTasksState() {
  return (
    <div className="card flex min-h-70 flex-col items-center justify-center p-10 text-center">
      <svg width="120" height="52" viewBox="0 0 120 52" fill="none" className="mb-5">
        <rect x="3" y="3" width="32" height="46" rx="6" stroke="#DCD8E8" strokeWidth="1.5" />
        <rect x="44" y="3" width="32" height="46" rx="6" stroke="#DCD8E8" strokeWidth="1.5" />
        <rect x="85" y="3" width="32" height="46" rx="6" stroke="#DCD8E8" strokeWidth="1.5" />
        <rect x="50" y="11" width="20" height="12" rx="3" fill="#6F01D0" />
      </svg>
      <h3 className="text-lg font-bold tracking-tight text-ink">No tasks yet</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-mute">
        Add tasks from a team member&apos;s page to see them here.
      </p>
    </div>
  );
}
