"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Drawer } from "@/components/Drawer";
import { AccessCodeCard } from "@/components/AccessCodeCard";
import { inputCls, labelCls } from "@/lib/form-styles";
import type { Discipline, Member } from "@/lib/types";
import { DISCIPLINE_LABEL } from "../_lib/constants";
import { useAddMember } from "../_hooks/useAddMember";

export function AddMemberDrawer({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [created, setCreated] = useState<Member | null>(null);
  const form = useAddMember((member) => {
    if (member.access_code) setCreated(member);
    else onDone();
  });

  if (created) {
    return (
      <Drawer
        eyebrow="Team"
        title={`${created.name} added`}
        onClose={onDone}
        footer={
          <button onClick={onDone} className="btn-primary flex-1">
            Done
          </button>
        }
      >
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <CheckCircle2 size={18} /> {created.name} can now sign in once they activate.
        </div>
        <AccessCodeCard
          name={created.name}
          email={created.email}
          code={created.access_code!}
          expiresAt={created.access_code_expires_at}
        />
      </Drawer>
    );
  }

  return (
    <Drawer
      eyebrow="Team"
      title="Add member"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={form.submit}
            disabled={form.busy || !form.name.trim() || !form.roleTitle.trim()}
            className="btn-primary flex-1"
          >
            {form.busy && <span className="spinner" />}
            {form.busy ? "Adding…" : "Add member"}
          </button>
        </>
      }
    >
      {form.error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{form.error}</p>}
      <div>
        <label className={labelCls}>Name *</label>
        <input autoFocus value={form.name} onChange={(e) => form.setName(e.target.value)} required className={inputCls} placeholder="Ada Chen" />
      </div>
      <div>
        <label className={labelCls}>Role title *</label>
        <input value={form.roleTitle} onChange={(e) => form.setRoleTitle(e.target.value)} required placeholder="Backend Engineer" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Work email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => form.setEmail(e.target.value)}
          placeholder="ada@company.com"
          className={inputCls}
          autoComplete="off"
        />
        <p className="mt-1.5 text-[11px] text-ink-mute">Add an email to give them a login for daily reports.</p>
      </div>
      <div>
        <label className={labelCls}>Discipline</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(DISCIPLINE_LABEL).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => form.setDiscipline(value as Discipline)}
              aria-pressed={form.discipline === value}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                form.discipline === value
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line-strong text-ink-soft hover:border-accent/40 hover:bg-subtle"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
