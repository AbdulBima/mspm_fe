import { TONE_CLASS } from "../_lib/constants";

interface ReportSectionProps {
  title: string;
  items?: string[];
  tone?: keyof typeof TONE_CLASS;
}

export function ReportSection({ title, items, tone }: ReportSectionProps) {
  if (!items || items.length === 0) return null;
  const color = tone ? TONE_CLASS[tone] : "text-ink-soft";
  return (
    <div className="mt-5">
      <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-ink-mute uppercase">{title}</p>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className={`text-sm ${color}`}>
            · {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
