"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

const FIELD =
  "h-12 w-full rounded-xl border bg-white pr-4 pl-11 text-[15px] text-ink placeholder:text-ink-faint transition-all outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 disabled:bg-subtle disabled:text-ink-mute sm:text-sm";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string | null;
  hint?: ReactNode;
  trailing?: ReactNode;
}

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
  { label, icon: Icon, error, hint, trailing, id, className = "", ...props },
  ref
) {
  const inputId = id ?? props.name;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={inputId} className="text-sm font-semibold text-ink">
          {label}
        </label>
        {hint}
      </div>
      <div className="relative">
        <Icon size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-faint" />
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          className={`${FIELD} ${trailing ? "pr-12" : ""} ${error ? "border-rose-400" : "border-line-strong"} ${className}`}
          {...props}
        />
        {trailing && <div className="absolute top-1/2 right-2 -translate-y-1/2">{trailing}</div>}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
});

export const PasswordField = forwardRef<HTMLInputElement, Omit<AuthFieldProps, "trailing" | "type">>(
  function PasswordField(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <AuthField
        ref={ref}
        {...props}
        type={visible ? "text" : "password"}
        trailing={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-mute transition-colors hover:bg-subtle hover:text-ink"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />
    );
  }
);

export function AuthAlert({ tone = "error", children }: { tone?: "error" | "info" | "success"; children: ReactNode }) {
  const styles = {
    error: "border-rose-200 bg-rose-50 text-rose-700",
    info: "border-accent/20 bg-accent-soft text-accent",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`animate-fade-in rounded-xl border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

export function SubmitButton({ busy, children, busyLabel }: { busy: boolean; children: ReactNode; busyLabel: string }) {
  return (
    <button type="submit" disabled={busy} className="btn-primary h-12 w-full text-[15px]">
      {busy ? (
        <>
          <span className="spinner" />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function friendlyAuthError(err: unknown, fallback = "Something went wrong. Try again."): string {
  if (err && typeof err === "object" && "message" in err && typeof err.message === "string" && err.message) {
    return err.message.replace(/^(body\.)?\w+: Value error, /, "");
  }
  return fallback;
}
