import { inputCls, labelCls } from "@/lib/form-styles";

export function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className={inputCls} />
    </div>
  );
}
