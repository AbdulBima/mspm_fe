import type { LoginStatus } from "@/lib/types";

const STYLE: Record<LoginStatus, { label: string; cls: string }> = {
  active: { label: "Has login", cls: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Invite pending", cls: "bg-gold-soft text-[#A65F00]" },
  expired: { label: "Code expired", cls: "bg-rose-50 text-rose-700" },
  none: { label: "No login", cls: "bg-zinc-100 text-zinc-500" },
};

export function LoginBadge({ status = "none" }: { status?: LoginStatus }) {
  const s = STYLE[status];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${s.cls}`}>{s.label}</span>;
}
