"use client";

import { useState } from "react";
import { Check, Copy, KeyRound } from "lucide-react";

export function activationLink(email: string | null | undefined, code: string) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams({ code });
  if (email) params.set("email", email);
  return `${window.location.origin}/activate?${params.toString()}`;
}

function expiryLabel(iso?: string | null) {
  if (!iso) return null;
  const normalized = /[zZ]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`;
  return new Date(normalized).toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export function AccessCodeCard({
  name,
  email,
  code,
  expiresAt,
}: {
  name: string;
  email?: string | null;
  code: string;
  expiresAt?: string | null;
}) {
  const [copied, setCopied] = useState<"code" | "message" | null>(null);
  const link = activationLink(email, code);
  const message = `Hi ${name.split(" ")[0]}, you now have access to Mently Sprint Ops for your daily reports.\n\nActivate your account here: ${link}\nAccess code: ${code}\n\nReports for each day close at midnight.`;

  async function copy(kind: "code" | "message") {
    const text = kind === "code" ? code : message;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        el.remove();
      }
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="rounded-2xl border border-accent/20 bg-accent-soft/60 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-bold text-ink">
        <KeyRound size={16} className="text-accent" /> One-time access code
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
        Share this with {name.split(" ")[0]}. It&apos;s shown only once{expiryLabel(expiresAt) ? ` and expires ${expiryLabel(expiresAt)}` : ""}.
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line-strong bg-white px-4 py-3">
        <span className="font-mono text-xl font-bold tracking-[0.25em] text-brand">{code}</span>
        <button
          type="button"
          onClick={() => copy("code")}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-accent hover:bg-accent-soft"
        >
          {copied === "code" ? <Check size={14} /> : <Copy size={14} />}
          {copied === "code" ? "Copied" : "Copy"}
        </button>
      </div>
      <button type="button" onClick={() => copy("message")} className="btn-secondary mt-3 w-full text-xs">
        {copied === "message" ? <Check size={14} /> : <Copy size={14} />}
        {copied === "message" ? "Invite message copied" : "Copy invite message with link"}
      </button>
    </div>
  );
}
