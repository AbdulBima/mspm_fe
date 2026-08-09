"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface DrawerProps {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
  /** Optional pinned footer (e.g. Cancel/Submit) that stays outside the scrollable content area. */
  footer?: ReactNode;
  maxWidthCls?: string;
}

/**
 * Right-side slide-over: backdrop, header with a close button, scrollable
 * content, and an optional pinned footer. Portals to document.body so it
 * escapes any parent's overflow/stacking context.
 *
 * This is one component doing the job two near-identical ones used to do:
 * the goals page's "add goal" drawer and the notes page's "add note"
 * drawer were both hand-rolled portal + backdrop + header markup, differing
 * only in width and whether the action buttons were pinned below the
 * scroll area. Both now use this, with `footer` covering the difference.
 */
export function Drawer({
  title,
  eyebrow = "Sprint workspace",
  onClose,
  children,
  footer,
  maxWidthCls = "max-w-md",
}: DrawerProps) {
  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-[#0B0C0F]/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`fixed right-0 top-0 bottom-0 z-50 flex w-full ${maxWidthCls} flex-col overflow-hidden bg-white shadow-2xl`}>
        <div className="flex shrink-0 items-center justify-between border-b border-[#E7E5E2] px-6 py-5">
          <div>
            <p className="mb-1 text-xs font-medium text-[#1D2B64]">{eyebrow}</p>
            <h2 className="text-base font-semibold text-[#0B0C0F]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#84828C] transition-colors hover:bg-[#FAFAF9]"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">{children}</div>

        {footer && <div className="flex shrink-0 gap-3 border-t border-[#E7E5E2] px-6 py-5">{footer}</div>}
      </div>
    </>,
    document.body
  );
}
