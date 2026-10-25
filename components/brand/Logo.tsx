/* eslint-disable @next/next/no-img-element */

export function MentlyLogo({
  variant = "indigo",
  className = "h-7 w-auto",
}: {
  variant?: "indigo" | "white";
  className?: string;
}) {
  return (
    <img
      src={variant === "white" ? "/brand/mently-white.svg" : "/brand/mently-indigo.svg"}
      alt="Mently"
      width={124}
      height={31}
      className={className}
    />
  );
}

export function ProductMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
        tone === "light" ? "bg-white/10 text-gold" : "bg-gold-soft text-[#A65F00]"
      }`}
    >
      Sprint Ops
    </span>
  );
}
