import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MentlyLogo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-center">
      <MentlyLogo className="h-7 w-auto" />
      <p className="mt-10 text-7xl font-bold tracking-tight text-brand sm:text-8xl">
        4<span className="text-accent">0</span>4
      </p>
      <h1 className="mt-4 text-xl font-bold text-ink">This page doesn&apos;t exist</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-mute">
        The link may be broken or the page may have moved. Head back to your workspace.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft size={16} /> Back to workspace
      </Link>
    </main>
  );
}
