"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KeyRound, Lock, Mail, User } from "lucide-react";
import { api } from "@/lib/api";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthAlert, AuthField, PasswordField, SubmitButton } from "@/components/auth/AuthField";
import { useGuestOnly } from "@/components/auth/useGuestOnly";
import { SplashScreen } from "@/components/SplashScreen";
import { useSignupForm } from "../_hooks/useSignupForm";

export function SignupForm() {
  const status = useGuestOnly();
  const form = useSignupForm();
  const [inviteRequired, setInviteRequired] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.auth
      .setupStatus()
      .then((s) => !cancelled && setInviteRequired(s.invite_required))
      .catch(() => !cancelled && setInviteRequired(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if ((status === "loading" || status === "authenticated") && !form.submitting) return <SplashScreen />;

  const firstRun = inviteRequired === false;

  return (
    <AuthShell
      title={firstRun ? "Set up your workspace" : "Add a manager"}
      subtitle={
        firstRun
          ? "This creates the first manager account for your team's Sprint Ops."
          : "A manager account already exists. Ask an existing manager for the invite code."
      }
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.submit();
        }}
        className="space-y-5"
      >
        {form.error && <AuthAlert>{form.error}</AuthAlert>}
        <AuthField
          label="Full name"
          icon={User}
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          autoFocus
          required
        />
        <AuthField
          label="Work email"
          icon={Mail}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => form.setEmail(e.target.value)}
          required
        />
        <PasswordField
          label="Password"
          icon={Lock}
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={(e) => form.setPassword(e.target.value)}
          minLength={8}
          error={form.password && form.password.length < 8 ? "Use at least 8 characters." : null}
          required
        />
        {inviteRequired !== false && (
          <AuthField
            label="Invite code"
            icon={KeyRound}
            name="invite_code"
            autoComplete="off"
            placeholder="From an existing manager"
            value={form.inviteCode}
            onChange={(e) => form.setInviteCode(e.target.value)}
            required={inviteRequired === true}
          />
        )}
        <SubmitButton busy={form.submitting} busyLabel="Creating account…">
          Create account
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
