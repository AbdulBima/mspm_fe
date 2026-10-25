"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface DrawerProps {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthCls?: string;
}

export function Drawer({
  title,
  eyebrow = "Sprint workspace",
  onClose,
  children,
  footer,
  maxWidthCls = "max-w-md",
}: DrawerProps) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 animate-fade-in bg-brand/30 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed inset-y-0 right-0 z-50 flex w-full ${maxWidthCls} animate-slide-in-right flex-col overflow-hidden bg-white shadow-pop sm:rounded-l-3xl`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-1 truncate text-lg font-bold text-ink">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-ink-mute transition-colors hover:bg-subtle hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">{children}</div>

        {footer && (
          <div className="flex shrink-0 gap-3 border-t border-line bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
