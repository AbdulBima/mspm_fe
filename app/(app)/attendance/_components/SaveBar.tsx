interface SaveBarProps {
  error: string | null;
  dirty: boolean;
  saving: boolean;
  disabled: boolean;
  onSave: () => void;
}

export function SaveBar({ error, dirty, saving, disabled, onSave }: SaveBarProps) {
  return (
    <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-line bg-white/90 p-3 shadow-pop backdrop-blur-md sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
      {error && <p className="flex-1 text-xs font-medium text-rose-600">{error}</p>}
      {dirty && !saving && <span className="text-xs font-medium text-ink-mute">Unsaved changes</span>}
      <button onClick={onSave} disabled={disabled} className="btn-primary">
        {saving && <span className="spinner" />}
        {saving ? "Saving…" : "Save attendance"}
      </button>
    </div>
  );
}
