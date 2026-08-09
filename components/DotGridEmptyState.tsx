import type { ReactNode } from "react";

interface DotGridEmptyStateProps {
  illustration: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
}

/**
 * Shared "nothing here yet" wrapper for the zinc/amber design-system pages
 * (sprints, team) — the dot-grid background, card, and eyebrow/title/
 * description layout were byte-identical between the two; only the SVG
 * illustration and copy differ.
 */
export function DotGridEmptyState({
  illustration,
  eyebrow = "Sprint workspace",
  title,
  description,
}: DotGridEmptyStateProps) {
  return (
    <div className="relative flex min-h-95 items-center justify-center overflow-hidden rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 55% 55% at 50% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 50% 45%, black, transparent)",
        }}
      />
      <div className="relative flex max-w-sm flex-col items-center">
        {illustration}
        <p className="questrial-regular text-[9px] uppercase tracking-widest text-amber-700 mb-2">{eyebrow}</p>
        <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
