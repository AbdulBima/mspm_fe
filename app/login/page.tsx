"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";


const inputClass =
  "w-full rounded-[0.6rem] border border-[#e3e0d8] bg-[#efede7] px-[0.9rem] py-[0.7rem] text-sm text-[#1c1917] outline-none " +
  "transition-[border-color,box-shadow] duration-150 focus:border-[#ad8a3d] focus:shadow-[0_0_0_3px_rgba(173,138,61,0.14)]";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(name, email, password, inviteCode || undefined);
      }
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white text-[#1c1917]">
      {/* ── Branding panel — the register's cover page ───────────────────── */}
      <div className="relative hidden w-full max-w-xl flex-col justify-between overflow-hidden bg-[#1c1917] px-14 py-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px)]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-112 w-md rounded-full bg-[#ad8a3d]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-[#ad8a3d]/10 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
        
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">BIMA</p>
        </div>

        <div className="relative">
          <h1 className="mt-4 max-w-md text-[2.75rem] font-medium leading-[1.12] text-white">
            Every sprint,
            <br />
            accounted for.
          </h1>
       

        </div>

        <p className="relative text-[10px] uppercase tracking-[0.2em] text-white/30">Internal use only</p>
      </div>

      {/* ── Form panel ────────────────────────────────────────────────────── */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#ad8a3d]/12">
              <span className="text-lg font-semibold text-[#ad8a3d]">Δ</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#1c1917]">Sprint Ops</p>
              <p className="text-[10px] uppercase tracking-wider text-[#766f60]">Executive console</p>
            </div>
          </div>

          <h1 className="text-[1.75rem] font-medium text-[#1c1917]">
            {mode === "login" ? "Sign in" : "Set up your console"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#766f60]">
            {mode === "login"
              ? "Track the sprint, the team, and where things stand."
              : "First run creates the manager account for this tracker."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <Field label="Name">
                <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="Abdul" />
              </Field>
            )}
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className={inputClass}
                placeholder="••••••••"
              />
            </Field>
            {mode === "signup" && (
              <Field label="Invite code (only needed after the first account exists)">
                <input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className={inputClass}
                  placeholder="optional"
                />
              </Field>
            )}

            {error && <p className="rounded-lg bg-[#9b4a42]/10 px-3 py-2.5 text-xs text-[#9b4a42]">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="mt-3 w-full rounded-lg bg-[#ad8a3d] py-3 text-sm font-semibold tracking-wide text-[#1c1917] shadow-[0_1px_2px_rgba(28,25,23,0.06),0_10px_24px_-8px_rgba(173,138,61,0.5)] transition-all hover:-translate-y-px hover:shadow-[0_1px_2px_rgba(28,25,23,0.08),0_14px_28px_-8px_rgba(173,138,61,0.55)] disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
            >
              {busy ? "Working…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => {
              setError(null);
              setMode(mode === "login" ? "signup" : "login");
            }}
            className="mt-6 w-full text-center text-xs text-[#766f60] transition-colors hover:text-[#1c1917]"
          >
            {mode === "login" ? "First time here? Set up your console" : "Already set up? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-[#56534a]">{label}</span>
      {children}
    </label>
  );
}
