"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { inputCls, labelCls } from "@/lib/form-styles";
import { useSignupForm } from "../_hooks/useSignupForm";
import { DARK_GRADIENT } from "@/lib/gradients";

export function SignupForm() {
  const {
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
  } = useSignupForm();
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && password.length >= 8 && !submitting;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-4"
    >
      <div>
        <label className={labelCls}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label className={labelCls}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label className={labelCls}>Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputCls} pr-10`}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84828C] hover:text-[#54525C]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className={labelCls}>Invite code</label>
        <input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className={inputCls}
          placeholder="Only needed if a manager account already exists"
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-[#F5C4B3] bg-[#FAECE7] px-3 py-2 text-sm text-[#992B0E]">{error}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ background: DARK_GRADIENT }}
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}