interface SaveBarProps {
  error: string | null;
  dirty: boolean;
  saving: boolean;
  disabled: boolean;
  onSave: () => void;
}

export function SaveBar({ error, dirty, saving, disabled, onSave }: SaveBarProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {error && <p className="text-xs text-[#9b4a42]">{error}</p>}
      {dirty && !saving && <span className="h-1.5 w-1.5 rounded-full bg-[#ad8a3d]" aria-hidden />}
      <button
        onClick={onSave}
        disabled={disabled}
        className="rounded-lg bg-[#ad8a3d] px-4 py-2.5 text-sm font-semibold text-[#1c1917] transition-all hover:-translate-y-px disabled:translate-y-0 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save attendance"}
      </button>
    </div>
  );
}
