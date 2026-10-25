/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { MentlyLogo, ProductMark } from "@/components/brand/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-white">
      <aside className="relative hidden w-[38%] max-w-xl flex-col justify-between overflow-hidden bg-brand px-12 py-12 text-white lg:flex">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-24 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex items-center gap-3">
          <MentlyLogo variant="white" className="h-7 w-auto" />
          <ProductMark tone="light" />
        </div>

        <div className="relative max-w-sm">
          <h2 className="text-[2.4rem] leading-[1.1] font-bold tracking-tight">
            Every sprint,
            <br />
            <span className="text-gold">accounted for.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            Plan the sprint, follow the team, and get everyone&apos;s end-of-day report in one place.
          </p>
        </div>

        <p className="relative max-w-[16rem] text-xs leading-relaxed text-white/45">
          &ldquo;People will forget what you said, but people will never forget how you made them feel.&rdquo;
        </p>

        <img
          src="/brand/mascot.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-16 h-72 w-auto select-none"
        />
      </aside>

      <main className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 pt-6 lg:hidden">
          <MentlyLogo className="h-6 w-auto" />
          <ProductMark />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[420px] animate-fade-up">
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-mute">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-8 text-center text-sm text-ink-mute">{footer}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
