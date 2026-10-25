"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { notify, type ToastMessage } from "@/lib/notify";

const ICON = { success: CheckCircle2, error: AlertCircle, info: Info };
const TONE = {
  success: "text-emerald-600",
  error: "text-rose-600",
  info: "text-accent",
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    function onToast(e: Event) {
      const toast = (e as CustomEvent<ToastMessage>).detail;
      setToasts((list) => [...list.slice(-3), toast]);
      window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== toast.id)), 4500);
    }
    window.addEventListener(notify.EVENT, onToast);
    return () => window.removeEventListener(notify.EVENT, onToast);
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
    >
      {toasts.map((t) => {
        const Icon = ICON[t.tone];
        return (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-pop"
          >
            <Icon size={18} className={`mt-0.5 shrink-0 ${TONE[t.tone]}`} />
            <p className="flex-1 text-sm font-medium text-ink">{t.message}</p>
            <button
              onClick={() => setToasts((list) => list.filter((x) => x.id !== t.id))}
              aria-label="Dismiss"
              className="text-ink-faint hover:text-ink"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
