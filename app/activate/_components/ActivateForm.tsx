"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { KeyRound, Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthAlert, AuthField, PasswordField, SubmitButton, friendlyAuthError } from "@/components/auth/AuthField";
import { useGuestOnly } from "@/components/auth/useGuestOnly";
import { SplashScreen } from "@/components/SplashScreen";

function formatCode(raw: string) {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  return clean.length > 4 ? `${clean.slice(0, 4)}-${clean.slice(4)}` : clean;
}

export function ActivateForm() {
  const { activate } = useAuth();
  const status = useGuestOnly();
  const params = useSearchParams();
  const isReset = params.get("reset") === "1";
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [code, setCode] = useState(formatCode(params.get("code") ?? ""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if ((status === "loading" || status === "authenticated") && !busy) return <SplashScreen />;

  const mismatch = confirm.length > 0 && confirm !== password;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (password.length < 8) return setError("Your password needs at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setError(null);
    setBusy(true);
    try {
      await activate(email, code, password);
    } catch (err) {
      setError(friendlyAuthError(err));
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title={isReset ? "Reset your password" : "Activate your account"}
      subtitle={
        isReset
          ? "Ask your manager for a fresh access code, then choose a new password."
          : "Use the access code your manager shared with you to set your password."
      }
      footer={
        <p>
          Already activated?{" "}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <AuthAlert>{error}</AuthAlert>}
        <AuthField
          label="Work email"
          icon={Mail}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="The email your manager added"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus={!email}
          required
        />
        <AuthField
          label="Access code"
          icon={KeyRound}
          name="access_code"
          autoComplete="one-time-code"
          placeholder="XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(formatCode(e.target.value))}
          className="font-mono tracking-[0.2em] uppercase"
          required
        />
        <PasswordField
          label="New password"
          icon={Lock}
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        <PasswordField
          label="Confirm password"
          icon={Lock}
          name="confirm_password"
          autoComplete="new-password"
          placeholder="Type it again"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={mismatch ? "Passwords don't match yet." : null}
          required
        />
        <SubmitButton busy={busy} busyLabel="Activating…">
          {isReset ? "Save new password" : "Activate & sign in"}
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
