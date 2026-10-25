import Link from "next/link";
import type { DailyReportMember, LoginStatus } from "@/lib/types";
import { initials } from "@/lib/initials";

const ACCESS_HINT: Record<LoginStatus, string | null> = {
  active: null,
  pending: "Hasn't activated their login",
  expired: "Access code expired",
  none: "No login yet",
};

export function MissingList({ members, closed }: { members: DailyReportMember[]; closed: boolean }) {
  return (
    <section className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">{closed ? "Missed" : "Still waiting on"}</p>
          <h2 className="mt-1 text-sm font-semibold text-ink">{members.length} {members.length === 1 ? "person" : "people"}</h2>
        </div>
      </div>
      {members.length === 0 ? (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">Everyone has reported.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {members.map((m) => {
            const hint = ACCESS_HINT[m.login_status];
            return (
              <li key={m.member_id}>
                <Link
                  href={`/team/${m.member_id}`}
                  className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 transition-colors hover:border-line-strong hover:bg-subtle"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-brand"
                    style={{ backgroundColor: m.color_tag || "#DCD8E8" }}
                  >
                    {initials(m.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{m.name}</span>
                    <span className={`block truncate text-[11px] ${hint ? "text-amber-700" : "text-ink-mute"}`}>
                      {hint ?? m.role_title}
                    </span>
                  </span>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${closed ? "bg-rose-400" : "bg-gold"}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
