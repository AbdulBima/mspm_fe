"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export function useSignupForm() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      await signup(name.trim(), email.trim(), password, inviteCode.trim() || undefined);
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Something went wrong. Try again.");
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