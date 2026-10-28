"use client";

import { useCallback, useEffect, useState } from "react";
import { KeyRound, Mail, ShieldOff } from "lucide-react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Member, MemberAccess } from "@/lib/types";
import { AccessCodeCard } from "@/components/AccessCodeCard";
import { inputCls } from "@/lib/form-styles";
import { LoginBadge } from "../../_components/LoginBadge";

function when(iso?: string | null) {
  if (!iso) return null;
  const normalized = /[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`;
  return new Date(normalized).toLocaleString(undefined, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export function AccessPanel({ memberId }: { memberId: string }) {
  const [member, setMember] = useState<Member | null>(null);
  const [issued, setIssued] = useState<MemberAccess | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");

  const load = useCallback(async () => {
    try {
      setMember(await api.members.get(memberId));
    } catch {
      setMember(null);
    }
  }, [memberId]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  async function issue() {
    if (busy) return;
    setBusy(true);
    try {
      const access = await api.members.issueAccess(memberId);
      setIssued(access);
      await load();
    } catch (err) {
      notify.error(err, "Couldn't create an access code.");
    } finally {
      setBusy(false);
    }
  }

  async function saveEmailAndInvite() {
    if (busy || !email.trim()) return;
    setBusy(true);
    try {
      await api.members.update(memberId, { email: email.trim() });
      setIssued(await api.members.issueAccess(memberId));
      setEmail("");
      await load();
    } catch (err) {
      notify.error(err, "Couldn't save that email.");
    } finally {
      setBusy(false);
    }
  }

  async function revoke() {
    if (busy || !confirm("Remove this member's login? They won't be able to file daily reports until you invite them again.")) return;
    setBusy(true);
    try {
      await api.members.revokeAccess(memberId);
      setIssued(null);
      await load();
      notify.success("Login removed.");
    } catch (err) {
      notify.error(err, "Couldn't remove access.");
    } finally {
      setBusy(false);
    }
  }

  if (!member) return null;
  const status = member.login_status ?? "none";

  return (
    <section className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Login</p>
          <h3 className="mt-1 text-base font-bold text-ink">Daily report access</h3>
        </div>
        <LoginBadge status={status} />
      </div>

      <p className="mt-2 text-sm text-ink-mute">
        {!member.email
          ? "Add their email below to give them a login for daily reports."
          : status === "active"
            ? `Signed in as ${member.email}${member.last_login_at ? ` · last seen ${when(member.last_login_at)}` : ""}.`
            : status === "pending"
              ? `Waiting for ${member.name.split(" ")[0]} to activate with their code (expires ${when(member.access_code_expires_at)}).`
              : status === "expired"
                ? "Their access code expired before they activated. Send a new one."
                : `${member.name.split(" ")[0]} doesn't have a login yet.`}
      </p>

      {issued && (
        <div className="mt-4">
          <AccessCodeCard name={member.name} email={member.email} code={issued.access_code} expiresAt={issued.access_code_expires_at} />
        </div>
      )}

      {!member.email && !issued && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void saveEmailAndInvite();
          }}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="their@email.com"
            className={inputCls}
            required
          />
          <button type="submit" disabled={busy || !email.trim()} className="btn-primary shrink-0 text-xs">
            {busy ? <span className="spinner" /> : <Mail size={14} />}
            Save & invite
          </button>
        </form>
      )}

      {member.email && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={issue} disabled={busy} className="btn-primary text-xs">
            {busy ? <span className="spinner" /> : <KeyRound size={14} />}
            {status === "active" ? "Reset password" : status === "none" ? "Give access" : "New access code"}
          </button>
          {status !== "none" && (
            <button onClick={revoke} disabled={busy} className="btn-secondary text-xs hover:border-rose-200 hover:text-rose-600">
              <ShieldOff size={14} /> Remove login
            </button>
          )}
        </div>
      )}
    </section>
  );
}
