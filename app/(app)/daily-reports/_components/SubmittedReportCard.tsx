"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { TeamDailyReports } from "@/lib/types";
import { initials } from "@/lib/initials";
import { FlagBadge, TaskStatusBadge } from "@/components/StatusBadge";

type Item = TeamDailyReports["submitted"][number];

function clock(iso: string) {
  const normalized = /[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`;
  return new Date(normalized).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function SubmittedReportCard({ item }: { item: Item }) {
  const [open, setOpen] = useState(item.flag !== "on_track" || Boolean(item.blockers));

  return (
    <article className="card overflow-hidden transition-shadow hover:shadow-pop">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-brand"
          style={{ backgroundColor: item.member.color_tag || "#F19A0D" }}
        >
          {initials(item.member.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-bold text-ink">{item.member.name}</p>
            <FlagBadge flag={item.flag} />
          </div>
          <p className="mt-0.5 text-xs text-ink-mute">
            {item.member.role_title} · {item.revision && item.revision > 1 ? "updated" : "sent"} {clock(item.updated_at)}
          </p>
          {!open && <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{item.summary}</p>}
        </div>
        <ChevronDown size={16} className={`mt-1 shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="animate-fade-in space-y-4 border-t border-line px-4 py-4 sm:px-5">
          <p className="text-sm leading-relaxed whitespace-pre-line text-ink-soft">{item.summary}</p>
          {item.tasks && item.tasks.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-mute uppercase">Worked on</p>
              <ul className="space-y-1.5">
                {item.tasks.map((t) => (
                  <li key={t.task_id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-subtle px-3 py-2">
                    <span className="text-sm text-ink">{t.title}</span>
                    <TaskStatusBadge status={t.status} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(item.blockers || item.plan_tomorrow) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {item.blockers && (
                <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3">
                  <p className="text-[11px] font-semibold tracking-wide text-rose-700 uppercase">Blockers</p>
                  <p className="mt-1 text-sm whitespace-pre-line text-rose-900/80">{item.blockers}</p>
                </div>
              )}
              {item.plan_tomorrow && (
                <div className="rounded-xl border border-line bg-subtle p-3">
                  <p className="text-[11px] font-semibold tracking-wide text-ink-mute uppercase">Tomorrow</p>
                  <p className="mt-1 text-sm whitespace-pre-line text-ink-soft">{item.plan_tomorrow}</p>
                </div>
              )}
            </div>
          )}
          <Link
            href={`/team/${item.member_id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            Open {item.member.name.split(" ")[0]}&apos;s tasks <ArrowUpRight size={12} />
          </Link>
        </div>
      )}
    </article>
  );
}
