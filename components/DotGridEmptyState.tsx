import type { ReactNode } from "react";

interface DotGridEmptyStateProps {
  illustration: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
}

export function DotGridEmptyState({ illustration, eyebrow = "Sprint workspace", title, description }: DotGridEmptyStateProps) {
  return (
    <div className="relative flex min-h-95 items-center justify-center overflow-hidden rounded-3xl border border-dashed border-line-strong bg-white p-8 text-center sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, #DCD8E8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 55% 55% at 50% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 50% 45%, black, transparent)",
        }}
      />
      <div className="relative flex max-w-sm flex-col items-center">
        {illustration}
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-mute">{description}</p>
      </div>
    </div>
  );
}
