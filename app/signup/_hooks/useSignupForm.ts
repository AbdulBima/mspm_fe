"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { friendlyAuthError } from "@/components/auth/AuthField";

export function useSignupForm() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (submitting) return;
    if (password.length < 8) {
      setError("Your password needs at least 8 characters.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await signup(name, email, password, inviteCode || undefined);
    } catch (err) {
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    inviteCode,
    setInviteCode,
    submitting,
    error,
    submit,
  };
}
