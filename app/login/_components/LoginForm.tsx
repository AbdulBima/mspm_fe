"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthAlert, AuthField, PasswordField, SubmitButton, friendlyAuthError } from "@/components/auth/AuthField";
import { useGuestOnly } from "@/components/auth/useGuestOnly";
import { SplashScreen } from "@/components/SplashScreen";

export function LoginForm() {
  const { login } = useAuth();
  const status = useGuestOnly();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if ((status === "loading" || status === "authenticated") && !busy) return <SplashScreen />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      await login(email, password, params.get("next"));
    } catch (err) {
      setError(friendlyAuthError(err));
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Sprint Ops workspace. Managers and team members use the same login."
      footer={
        <div className="space-y-2">
          <p>
            New team member?{" "}
            <Link href="/activate" className="font-semibold text-accent hover:underline">
              Activate your account
            </Link>
          </p>
          <p>
            Setting up for your team?{" "}
            <Link href="/signup" className="font-semibold text-accent hover:underline">
              Create a manager account
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
        {params.get("expired") && !error && (
          <AuthAlert tone="info">Your session expired. Sign in again to pick up where you left off.</AuthAlert>
        )}
        {error && <AuthAlert>{error}</AuthAlert>}
        <AuthField
          label="Email address"
          icon={Mail}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
        <PasswordField
          label="Password"
          icon={Lock}
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint={
            <Link href="/activate?reset=1" className="text-xs font-semibold text-accent hover:underline">
              Forgot password?
            </Link>
          }
          required
        />
        <SubmitButton busy={busy} busyLabel="Signing in…">
          Sign in
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
