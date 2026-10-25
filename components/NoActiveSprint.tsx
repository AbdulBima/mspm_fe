import Link from "next/link";
import { Rocket } from "lucide-react";

export function NoActiveSprint({ description }: { description: string }) {
  return (
    <div className="card mx-auto flex min-h-72 max-w-3xl flex-col items-center justify-center p-8 text-center sm:p-10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Rocket size={20} />
      </div>
      <h3 className="text-lg font-bold tracking-tight text-ink">No active sprint</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-mute">{description}</p>
      <Link href="/sprints" className="btn-primary mt-6">
        Go to sprints
      </Link>
    </div>
  );
}
